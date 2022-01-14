const staticCacheName = 'site-static-v1.1';
const dynamicCacheName = 'site-dynamic-v1';

const assets = [
   '/',
   'manifest.json',

   '/index.html',
   '/p/about.html',
   '/p/contact.html',
   '/p/fallback.html',

   '/src/css/style.css',

   '/src/js/app.js',
   '/src/js/install.js',
   '/src/js/ui.js',
   '/src/js/db.js',

   '/src/img/icon16.png',
   '/src/img/icon20.png',
   '/src/img/icon24.png',
   '/src/img/icon32.png',
   '/src/img/icon48.png',
   '/src/img/icon64.png',
   '/src/img/icon128.png',
   '/src/img/icon144.png',
   '/src/img/icon192.png',
   '/src/img/icon256.png',
   '/src/img/icon512.png',
   '/src/img/papertex.png',
   '/src/img/questicon512.png',

   'https://fonts.gstatic.com/s/materialicons/v121/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
   'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
   'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
   'https://fonts.googleapis.com/icon?family=Material+Icons',
   'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
   'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
   'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',
   'https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js'
];

const limitCacheSize = (name,size) => {
   caches.open(name).then(cache => {
      cache.keys().then(keys => {
         if(keys.length > size){
            cache.delete(keys[0].then(limitCacheSize(name, ResizeObserverSize)))
         }
      })
   })
}

self.addEventListener('install', evt => {
    console.log('Service worker installed');
});

self.addEventListener('activate', evt => {
    console.log('service worker activated');

    evt.waitUntil(
       caches.keys().then(keys=>{
          console.log(keys)
          return Promise.all(keys
            .filter(key => key !== staticCacheName)
            .map(key => caches.delete(key)))
       })
    )
});

self.addEventListener("install",function(event){
    event.waitUntil(
       caches.open(staticCacheName).then(function(cache){
          cache.addAll(assets);
       })
    );
 });


self.addEventListener('fetch', evt => {
   evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
         return cacheRes || fetch(evt.request).then(fetchRes => {
            return caches.open(dynamicCacheName).then(cache => {
               cache.put(evt.request.url, fetchRes.clone());
               limitCacheSize(dynamicCacheName, 3)
            })
         });
      }).catch(() => caches.match('/p/fallback.html'))
   );
})
