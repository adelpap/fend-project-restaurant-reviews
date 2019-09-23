/*
** Register service worker
*/

// if service worker is supported
if(navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').then(function() {
    console.log('registration worked');
  }).catch(function() {
    console.log('registration failed!');
  });
}