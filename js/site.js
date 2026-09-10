// Post-submit confirmation: after Formspree redirects back via the form's
// _next field (?sent=1 in the URL), show the page's .form-success message
// and hide the form itself instead of leaving the empty inputs visible.
// Safe on any page — no-op if the query flag or the elements aren't present.
(function () {
  if (!/[?&]sent=1(&|$)/.test(window.location.search)) return;
  var success = document.querySelector('.form-success');
  var form = document.querySelector('.site-form');
  if (success) success.hidden = false;
  if (form) form.hidden = true;
})();

// Mobile nav toggle: shows/hides .nav-links as a dropdown under 768px.
// Safe to include on any page — does nothing if the toggle button isn't present.
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close the menu after tapping a link (single-page-style nav feel).
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// The Journey filmstrip: lazy-load each clip's source only when it scrolls
// into view, then play; pause and keep the source once loaded (no re-fetch
// on scroll-away) to keep this cheap on mobile data.
// Safe to include on any page — does nothing if no .journey-card videos exist.
(function () {
  var videos = document.querySelectorAll('.journey-card video[data-src]');
  if (!('IntersectionObserver' in window) || !videos.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var video = entry.target;
      if (entry.isIntersecting) {
        if (!video.src) {
          video.src = video.dataset.src;
        }
        video.play().catch(function () { /* autoplay may be blocked; poster stays visible */ });
      } else {
        video.pause();
      }
    });
  }, { root: null, threshold: 0.6 });

  videos.forEach(function (video) { observer.observe(video); });
})();

// "Everywhere We've Been" map: one pin per country visited so far,
// each linking back to that location's entry-card in the gallery page.
// Safe to include on any page — does nothing if #travel-map isn't present.
(function () {
  var mapEl = document.getElementById('travel-map');
  if (!mapEl || typeof L === 'undefined') return;

  var stops = [
    { name: 'Seoul, South Korea',    lat: 37.5512, lng: 126.9882, anchor: 'gallery.html#entry-korea' },
    { name: 'Dubai, UAE',            lat: 25.2048, lng: 55.2708, anchor: 'gallery.html#entry-dubai' },
    { name: 'Addis Ababa, Ethiopia', lat: 9.0300,  lng: 38.7400, anchor: 'gallery.html#entry-addis' },
    { name: 'Macao',                 lat: 22.1987, lng: 113.5439, anchor: 'gallery.html#entry-macao' },
    { name: 'Liège, Belgium',        lat: 50.6326, lng: 5.5797,  anchor: 'gallery.html#entry-liege' },
    { name: 'Madrid, Spain',         lat: 40.4168, lng: -3.7038, anchor: 'gallery.html#entry-madrid' },
    { name: 'Bogotá, Colombia',      lat: 4.7110,  lng: -74.0721, anchor: 'gallery.html#entry-bogota' }
  ];

  var map = L.map('travel-map', { scrollWheelZoom: false }).setView([20, 20], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var bounds = [];
  stops.forEach(function (stop) {
    var marker = L.marker([stop.lat, stop.lng]).addTo(map);
    marker.bindPopup('<strong>' + stop.name + '</strong><br><a href="' + stop.anchor + '">See photos &rarr;</a>');
    bounds.push([stop.lat, stop.lng]);
  });
  map.fitBounds(bounds, { padding: [30, 30] });

  // Safety net: some browsers report the container's size late (fonts/
  // layout still settling), which can leave Leaflet's tiles blank until
  // the next resize. Recalculating once after load fixes that.
  setTimeout(function () { map.invalidateSize(); }, 300);
})();
