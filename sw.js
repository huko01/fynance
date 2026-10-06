const C='fynance-v40',F=['./','index.html','manifest.json','logo.png','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png','icons/favicon-32.png','fonts/SymphonieGrotesque-Regular.otf','fonts/SymphonieGrotesque-Medium.otf','fonts/SymphonieGrotesque-Bold.otf'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
