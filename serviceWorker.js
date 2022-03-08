const cacheName = 'Temporas';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
      ]);
    })
  )
});

// self.addEventListener('')