const CACHE_NAME = 'frases-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/ico/corazon-192.png',
  '/ico/corazon-512.png'
];

// Al instalar el SW, cacheamos los archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
  );
});

// Al activar el SW, borramos caches antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      )
    )
  );
});

// Cuando se haga fetch, responder con el cache o hacer la petición normal
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => response || fetch(event.request))
  );
});