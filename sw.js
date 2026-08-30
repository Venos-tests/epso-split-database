// EPSO Unlocked — Service Worker
// This small script is what lets a phone or browser "install" the site like an app.
// It also gives visitors a fast, cached repeat-load experience.

const CACHE_NAME = 'epso-unlocked-v1';

// Files that make up the "shell" of the app — these get cached on first visit.
// Add any other CSS/JS/image files your site uses so they're available offline too.
const APP_SHELL = [
  '/epso-split-database/',
  '/epso-split-database/index.html',
  '/epso-split-database/manifest.json',
  '/epso-split-database/android-chrome-192x192.png',
  '/epso-split-database/android-chrome-512x512.png'
];

// Runs once, when the service worker is first installed on a visitor's device.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// Runs when a new version of the service worker takes over — cleans up old caches.
self.addEventListener('activate', (event) => {
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

// Every time the page requests a file, try the cache first, then fall back to the network.
// This is what makes repeat visits fast and lets the app shell load even with a flaky connection.
// Note: this deliberately does NOT cache Supabase API calls (login, questions, attempts) —
// those must always go to the network so login state and question content stay live and secure.
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Never cache calls to Supabase — always hit the network for these.
  if (url.hostname.includes('supabase.co')) {
    return; // let the browser handle it normally
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
