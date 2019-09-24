const urlsToCache = [
  '/',
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
];

// install a restaurants cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('restaurant-reviews').then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// fetch request
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // respond with an entry from the cache if there is one
    caches.match(event.request).then(function(response) {
      if(response) {
        return response;
      }
      // if there isn't fetch from the network
      else {
        return fetch(event.request)
        // put the fetch response in a new cache
        .then(function(response) {
          // clone the response so we can use it again
          const clonedResponse = response.clone();
          caches.open('restaurant-reviews-1').then(function(cache) {
            cache.put(event.request, clonedResponse);
          })
          // return the response to the fetch request
          return response;
        }).catch(function(error){
            console.log(error);
        });
      }
    })
  );
});