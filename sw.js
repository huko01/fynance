/* Service worker de Fynance Capital.
   Estrategia "red primero": con conexión siempre se descarga la última versión
   (así los cambios de GitHub se ven solos, sin tocar nada y sin subir versión);
   sin conexión se usa la copia guardada. No toca localStorage, así que los datos
   de la app no se borran nunca al actualizar. */
const C='fynance',F=['./','index.html','manifest.json','logo.png','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png','icons/favicon-32.png','fonts/SymphonieGrotesque-Regular.otf','fonts/SymphonieGrotesque-Medium.otf','fonts/SymphonieGrotesque-Bold.otf'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>fetch(u,{cache:'reload'}).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith(fetch(r.url,{cache:'no-cache'}).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r.url,cp)).catch(()=>{})}return res})
  .catch(()=>caches.match(r.url,{ignoreSearch:true}).then(m=>m||(r.mode==='navigate'?caches.match('index.html'):Response.error()))))});
