const staticCacheName = 'site-static-v2';

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
          cache.addAll(["/"]);
       })
    );
 });


self.addEventListener('fetch', evt => {
   evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
         return cacheRes || fetch(evt.request).then(fetchRes => {
            return caches.open(dynamicCacheName).then(cache => {
               cache.put(evt.request.url, fetchRes.clone());
            })
         });
      }).catch(() => caches.match('/p/fallback.html'))
   );
})