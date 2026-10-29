// 2025년판이 등록한 PWA 서비스워커를 끝내기 위한 파일(2026 개편).
// 예전 방문자의 브라우저가 이 파일을 새로 받으면 캐시를 모두 지우고 스스로 해제한 뒤 화면을 새로 고친다.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((c) => c.navigate(c.url));
  })());
});
