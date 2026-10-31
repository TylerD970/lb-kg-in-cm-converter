const CACHE_NAME = "unit-converter-v2";
const FILES_TO_CACHE = [
    "./",
    "./background.jpg",
    "./icon.png",
    "./index.html",
    "./manifest.json",
    "./script.js",
    "./style.css"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName.startsWith("unit-converter-") && cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            self.clients.claim();
        })
    );
});

self.addEventListener("fetch", event => {
    if (new URL(event.request.url).origin !== self.location.origin) {
        return;
    }
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});