const CACHE_NAME = "e-clock-cache-v2";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/world_clock.html",
  "/singapore-time.html",
  "/london-time.html",
  "/new-york-time.html",
  "/los-angeles-time.html",
  "/pomodoro-timer.html",
  "/workout-timer.html",
  "/classroom-timer.html",
  "/meeting-timer.html",
  "/analog-clock.html",
  "/widget.html",
  "/alarm-clock-01.wav",
  "/favicon.png",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ASSETS_TO_CACHE.map((url) => cache.add(url))
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => caches.match("/index.html"))
      );
    })
  );
});
