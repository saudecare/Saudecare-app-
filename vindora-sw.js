// Serve só para mostrar avisos do sistema (som/vibração) com a app aberta em segundo plano.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil((async () => {
    const lista = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of lista) { if ('focus' in c) { return c.focus(); } }
    if (self.clients.openWindow) return self.clients.openWindow('./app.html');
  })());
});
