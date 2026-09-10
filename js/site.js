// Sidebar "Snapshot" widget: rotates through a curated set of photos every
// 2 days. The pick is based on the date (days-since-epoch / 2), not random,
// so every visitor sees the same photo on a given day and it doesn't change
// on every reload. The HTML ships with one photo hardcoded as a no-JS/
// crawler fallback; this swaps it out once the page loads.
// Safe on any page — no-op if .snapshot-widget isn't present.
(function () {
  var widget = document.querySelector('.snapshot-widget');
  if (!widget) return;
  var img = widget.querySelector('img');
  var source = widget.querySelector('source');
  var caption = widget.querySelector('p');
  if (!img) return;

  // sizes: which width variants actually exist in /assets for this photo
  // (see ASSETS_README.md naming convention). Most trip photos have
  // 480/800/1600; the four newest Seoul ones only go up to 800.
  var photos = [
    { slug: 'photo9-marina-promenade', sizes: [480, 800, 1600],
      alt: 'Pedestrians and cars on a promenade lined with Dubai Marina skyscrapers at dusk',
      caption: 'Marina Walk at Dusk — Dubai Marina, UAE' },
    { slug: 'photo10-marina-skyline-bluehour', sizes: [480, 800, 1600],
      alt: 'Dubai Marina skyline at blue hour with a car passing in the foreground',
      caption: 'Blue Hour Over the Marina — Dubai Marina, UAE' },
    { slug: 'photo11-marina-boat', sizes: [480, 800, 1600],
      alt: "A boat and jet skis moving through Dubai Marina's waterway at dusk, with illuminated towers reflected in the water",
      caption: 'Cruising Dubai Marina — Dubai Marina, UAE' },
    { slug: 'photo8-addis-aerial', sizes: [480, 800, 1600],
      alt: 'Aerial view of a city and surrounding neighborhoods seen from above',
      caption: 'Good Morning, Addis — Addis Ababa, Ethiopia' },
    { slug: 'photo5-parisian', sizes: [480, 800, 1600],
      alt: 'Night view of a grand, illuminated building façade along a boulevard',
      caption: 'The Parisian at Night — Macao' },
    { slug: 'photo4-le-carre', sizes: [480, 800, 1600],
      alt: 'DJ performing at a club with purple and red lighting',
      caption: "Nightlife at Le Carré d'As — Liège, Belgium" },
    { slug: 'photo7-la-pecera', sizes: [480, 800, 1600],
      alt: 'Narrow sunlit street with tall, warm-colored buildings and a van driving uphill',
      caption: 'Strolling Near La Pecera — Madrid, Spain' },
    { slug: 'photo2-monserrate', sizes: [480, 800, 1600],
      alt: 'Wooden trail sign showing route information in a forest setting',
      caption: 'Camino Peatonal de Monserrate — Bogotá, Colombia' },
    { slug: 'photo6-mirador-norte', sizes: [480, 800, 1600],
      alt: 'Fence with many padlocks overlooking a valley and distant city below',
      caption: 'Mirador al Norte, Monserrate — Bogotá, Colombia' },
    { slug: 'photo1-botero', sizes: [480, 800, 1600],
      alt: 'Interior of a museum gallery with a still-life painting and wooden floor',
      caption: 'Botero Museum — Bogotá, Colombia' },
    { slug: 'photo3-el-dorado', sizes: [480, 800, 1600],
      alt: 'Airport apron with aircraft and mountains visible in the distance',
      caption: 'El Dorado Apron — Bogotá, Colombia' },
    { slug: 'photo13-bukchon-namsan-view', sizes: [480, 800],
      alt: 'Traditional tiled hanok rooftops in Bukchon with N Seoul Tower visible on a hill in the distance',
      caption: 'Rooftops and a Distant Tower — Bukchon Hanok Village, Seoul' },
    { slug: 'photo14-myeongdong-souvenirs', sizes: [480, 800],
      alt: 'A Myeongdong souvenir stall hung with rows of squishy bread- and cat-shaped toys in mesh bags',
      caption: 'Wall of Squishy Souvenirs — Myeongdong, Seoul' },
    { slug: 'photo15-namsan-summit-snack', sizes: [480, 800],
      alt: 'A cup of spicy instant noodles held up at the Namsan Tower summit plaza, with the plaza and other visitors behind',
      caption: 'A Snack at the Summit — Namsan Tower, Seoul' },
    { slug: 'photo16-namsan-tower-cablecar', sizes: [480, 800],
      alt: 'N Seoul Tower rising above a green hillside with a cable car crossing overhead and a yellow ginkgo tree in the foreground',
      caption: 'Looking Up at the Tower — Namsan Park, Seoul' }
  ];

  var MS_PER_DAY = 24 * 60 * 60 * 1000;
  var ROTATE_EVERY_N_DAYS = 2;
  var daysSinceEpoch = Math.floor(Date.now() / MS_PER_DAY);
  var pick = photos[Math.floor(daysSinceEpoch / ROTATE_EVERY_N_DAYS) % photos.length];

  img.src = 'assets/' + pick.slug + '-800.jpg';
  img.alt = pick.alt;
  if (source) {
    source.srcset = pick.sizes.map(function (w) {
      return 'assets/' + pick.slug + '-' + w + '.webp ' + w + 'w';
    }).join(', ');
  }
  if (caption) caption.textContent = pick.caption;
})();

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
