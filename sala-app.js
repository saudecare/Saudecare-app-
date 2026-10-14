/* Instalar a Sala de Estudo como app no telemóvel (ecrã inicial, ecrã inteiro). */
let pedido = null;
const ja = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); pedido = e; });
window.addEventListener('appinstalled', () => { pedido = null; });

export function prepararApp(nome){
  try {
    const base = new URL('.', location.href).href;
    const manifest = {
      name: 'Sala de Estudo — ' + (nome || 'Escola de Reiki'),
      short_name: 'Escola de Reiki',
      description: 'A tua sala de estudo e templo de paz.',
      start_url: location.href.split('#')[0],
      scope: base,
      display: 'standalone',
      background_color: '#faf6ef',
      theme_color: '#8a5518',
      icons: [
        { src: base + 'sala-icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: base + 'sala-icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: base + 'sala-icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
      ]
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(manifest)], { type: 'application/manifest+json' }));
    let l = document.querySelector('link[rel="manifest"]');
    if (!l){ l = document.createElement('link'); l.rel = 'manifest'; document.head.appendChild(l); }
    l.href = url;
    let a = document.querySelector('link[rel="apple-touch-icon"]');
    if (!a){ a = document.createElement('link'); a.rel = 'apple-touch-icon'; document.head.appendChild(a); }
    a.href = base + 'sala-icon-180.png';
    const m = document.createElement('meta'); m.name = 'theme-color'; m.content = '#8a5518'; document.head.appendChild(m);
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('sala-sw.js').catch(() => {});
  } catch(e){ console.warn('app: preparação falhou', e); }
}

export const jaInstalada = ja;
export function podeInstalar(){ return !ja(); }

window.__instalarApp = async function(){
  if (pedido){
    pedido.prompt();
    try { await pedido.userChoice; } catch(e){}
    pedido = null;
    return;
  }
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const txt = ios
    ? 'No iPhone ou iPad: toca no botão Partilhar (o quadrado com a seta, em baixo) e escolhe "Adicionar ao ecrã principal".'
    : 'No telemóvel: abre o menu do browser (os três pontos) e escolhe "Instalar app" ou "Adicionar ao ecrã inicial".';
  window.__aviso ? window.__aviso(txt) : alert(txt);
};
