const CACHE_NAME = "meu-tempo-cache-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./fundo.mp4",
  "./c1.jpeg",
  "./c2.jpeg",
  "./c3.jpeg",
  "./c4.jpeg",
  "./icon-192.png",
  "./icon-512.png"
];

// Instalando o Service Worker e armazenando os arquivos no cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

// Ativando o Service Worker e limpando caches antigos, se houver
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Intercepta requisições e responde com cache ou rede
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
