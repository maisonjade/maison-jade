// Service worker minimal de la TO DO LIST (portée : dossier /todo/ uniquement).
// Il garde seulement la « coquille » de l'application (page, icônes) pour qu'elle s'ouvre vite.
// Les tâches elles-mêmes ne sont JAMAIS mises en cache : elles viennent de Supabase à chaque ouverture.
const CACHE = 'mj-todo-v4';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('mj-todo-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Uniquement nos propres fichiers du dossier /todo/ ; Supabase, polices et CDN passent sans être touchés.
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL('./', self.location).pathname)) return;
  // Réseau d'abord (pour toujours avoir la dernière version), cache en secours si hors ligne.
  event.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
