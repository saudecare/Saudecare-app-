/* Sala de Estudo — Hikari Fafe Escola de Reiki.
   Rede primeiro (as páginas mudam muitas vezes), com cópia guardada para quando não há ligação. */
const CACHE = 'sala-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== location.origin) return;                 // Firebase, YouTube, etc. seguem direto
  e.respondWith(
    fetch(r).then(res => {
      if (res && res.ok){ const c = res.clone(); caches.open(CACHE).then(ca => ca.put(r, c)).catch(() => {}); }
      return res;
    }).catch(() => caches.match(r).then(m => m || (r.mode === 'navigate' ? caches.match('reiki-biblioteca.html') : undefined)))
  );
});
