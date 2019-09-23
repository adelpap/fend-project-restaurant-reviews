const appName = "restaurant-reviews";
const staticCacheName = appName;
const imageCacheName = appName + "-images";
const allCaches = [
  staticCacheName,
  imageCacheName
];
const urlsToCache = [
  '/',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('appName').then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if(response) return response;
      return fetch(event.request);
    })
  );
});