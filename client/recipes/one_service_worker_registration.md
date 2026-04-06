# Recipe 1: Service Worker Registration

## What is a Service Worker?

A Service Worker is a JavaScript file that runs in the background, separate from the web page. It intercepts network requests, caches resources, and enables offline functionality — making your app a Progressive Web App (PWA).

## Step 1: Register the Service Worker

We register the service worker in `src/main.tsx` (the root entry point of our app). It **must** be registered at the root so it can control all pages.

```tsx
// src/main.tsx
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('Service Worker registered:', registration)
    })
    .catch((error) => {
      console.log('Registration failed:', error)
    })
}
```

### Key points:
- `'serviceWorker' in navigator` — checks if the browser supports service workers before attempting registration
- `/sw.js` — the path to the service worker file (served from `public/sw.js` by Vite)
- `.then()` — runs when registration succeeds
- `.catch()` — runs when registration fails (e.g. file not found, or not served over HTTPS)

## Step 2: Create the Service Worker file

The service worker file lives at `public/sw.js`. Vite serves everything in `public/` at the root URL, so `public/sw.js` becomes `http://localhost:5173/sw.js`.

```js
// public/sw.js
const CACHE_NAME = 'pwa-cache-v1'
const URLS_TO_CACHE = [
  '/',
  '/index.html',
]

// Install event — cache essential resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  )
})

// Fetch event — serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  )
})

// Activate event — clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  )
})
```

## Service Worker Lifecycle

1. **Install** — The browser downloads and installs the SW. We cache essential files here.
2. **Activate** — The SW takes control. We clean up old caches from previous versions.
3. **Fetch** — Every network request from the page goes through the SW. We serve cached responses when available, otherwise fetch from the network.

## How to verify it's working

1. Run `npm run dev` in the client folder
2. Open `http://localhost:5173` in Chrome
3. Open DevTools → **Application** → **Service Workers**
4. You should see `sw.js` listed as registered and activated
5. Check **Cache Storage** to see the cached resources