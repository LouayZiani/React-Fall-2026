/* Generated during the Vite production build. */
const VERSION = 'nfl-roster-v4';
const SHELL_CACHE = VERSION + '-shell';
const STATIC_CACHE = VERSION + '-static';
const API_CACHE = VERSION + '-public-api';
const PRECACHE_URLS = ["./","./index.html","./offline.html","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png","./nfl.jpg","./chiefs-bg.jpg","./assets/index-B82fQQGc.css","./assets/index-DUrnKcKq.js","./assets/About-BWJhhKRC.js","./assets/Login-DOsAeXU_.js","./assets/Dashboard-Ccv8Rl7L.js","./assets/PlayerDetail-CopKAnr2.js","./assets/Teams-CTP2EOlG.js","./assets/TeamDetail-DiuaDvIF.js","./assets/StatCard-BExLYu0o.js","./assets/Compare-DPER_P66.js","./assets/RandomPlayer-DveKDOYi.js","./assets/Signup-znPl3LCT.js","./assets/Profile-CFTjU5-v.js","./assets/Offline-DrbXUzG2.js"];
const MAX_API_ENTRIES = 40;
const BASE_PATH = new URL(self.registration.scope).pathname;

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    await cache.addAll(PRECACHE_URLS.map((path) => new URL(path, self.registration.scope).href));
    // Keep the new worker waiting until the user explicitly accepts the update.
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keep = new Set([SHELL_CACHE, STATIC_CACHE, API_CACHE]);
    const names = await caches.keys();
    await Promise.all(names.filter((name) =>
      name.startsWith('nfl-roster-') && !keep.has(name)
    ).map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    await Promise.all(keys.slice(0, keys.length - maxEntries).map((key) => cache.delete(key)));
  }
}

function isFirebaseOrPrivateRequest(url) {
  return /firebase|googleapis\.com\/identitytoolkit|securetoken|\/auth(?:\/|$)|token/i.test(url.href);
}

async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request) || await (await caches.open(SHELL_CACHE)).match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    await cache.put(request, response.clone());
    await trimCache(STATIC_CACHE, 100);
  }
  return response;
}

async function networkFirstApi(request) {
  const cache = await caches.open(API_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok && !isFirebaseOrPrivateRequest(new URL(request.url))) {
      await cache.put(request, response.clone());
      await trimCache(API_CACHE, MAX_API_ENTRIES);
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request) || await (await caches.open(SHELL_CACHE)).match(request);
    if (cached) return cached;
    return new Response(JSON.stringify({ error: 'Offline and no cached public data is available.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json', 'X-Offline-Cache': 'miss' },
    });
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (isFirebaseOrPrivateRequest(url)) return;

  // Public list data: network-first, with cached response as the offline fallback.
  if (url.pathname.startsWith(BASE_PATH + 'api/public/')) {
    event.respondWith(networkFirstApi(request));
    return;
  }

  // Navigations: prefer the network; use the cached offline document if unavailable.
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        return await fetch(request);
      } catch {
        const cache = await caches.open(SHELL_CACHE);
        const offlineDocument = await cache.match(new URL('./offline.html', self.registration.scope).href);
        const appShell = await cache.match(new URL('./index.html', self.registration.scope).href);
        // Internal React routes can still load from the pre-cached app shell.
        // The dedicated offline route, or a missing shell, uses the standalone offline document.
        if (url.pathname === BASE_PATH + 'offline' || url.pathname === BASE_PATH + 'offline/') {
          return offlineDocument || appShell;
        }
        return appShell || offlineDocument;
      }
    })());
    return;
  }

  // Images, icons, fonts, and built files: cache-first.
  if (/\.(?:js|css|png|jpe?g|webp|gif|svg|woff2?|ttf|otf)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
  }
});
