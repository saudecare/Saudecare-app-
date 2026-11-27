// Dados partilhados dos vouchers de Natal da Hikari Fafe (página de compra, voucher e painel).
export const TENANT = 'hikari-terapias';
export const FIREBASE_CFG = {
  apiKey: 'AIzaSyDKWdXYEG6PO9KEMQMklyPGngtXuZlP7Cg', authDomain: 'saudecare-app.firebaseapp.com', projectId: 'saudecare-app',
  storageBucket: 'saudecare-app.firebasestorage.app', messagingSenderId: '455466438728', appId: '1:455466438728:web:61cfbf9fac85d59e18c87d'
};
export const SITE = 'https://vindora.pt/';
export const MBWAY = '928 122 918';
export const WA = { ricardo: '351928122918', natalia: '351934744633' };
export const PRECO_UNICA = 40, PRECO_PACK = 35, VALIDADE_DIAS = 180;
export const TERAPIAS = {
  reiki: { nome: 'Reiki', emoji: '🌿', sessao: 'Sessão de Reiki', desc: 'Uma sessão de relaxamento e equilíbrio energético, para acalmar o corpo e a mente.', wa: 'ricardo' },
  reflexologia: { nome: 'Reflexologia podal', emoji: '🦶', sessao: 'Sessão de Reflexologia podal', desc: 'Massagem nos pés que ajuda a descontrair, aliviar o cansaço e sentir o corpo mais leve.', wa: 'natalia' },
  apoio: { nome: 'Apoio à ansiedade e ao estado de espírito', emoji: '💙', sessao: 'Sessão de apoio à ansiedade e ao estado de espírito (consulta e tratamento)', desc: 'Consulta e tratamento energético numa só sessão, para acalmar a ansiedade e apoiar o bem-estar emocional. Complementar, não substitui acompanhamento médico ou psicológico.', wa: 'ricardo' },
  pendulo: { nome: 'Avaliação energética com pêndulo', emoji: '🔮', sessao: 'Avaliação energética com pêndulo e limpeza (triagem e limpeza)', desc: 'Triagem energética para perceber o que pesa, e limpeza na mesma sessão.', wa: 'ricardo' }
};
export const PRENDA = ['pendulo', 'reflexologia', 'reiki'];
export const PACOTES = {
  unica: { nome: 'Sessão única', emoji: '🎁', valor: PRECO_UNICA, texto: 'Uma sessão à escolha.' },
  pack3: { nome: 'Pack de 3 sessões', emoji: '🎄', valor: PRECO_PACK * 3, texto: 'Três sessões da mesma terapia, a 35 € cada.' },
  prenda: { nome: 'Prenda completa · corpo, mente e alma', emoji: '✨', valor: PRECO_PACK * 3, texto: 'Três sessões, por esta ordem: avaliação energética e limpeza, reflexologia podal e Reiki para harmonizar. 35 € cada.' }
};
export function sessoesDe(pacote, terapia) {
  if (pacote === 'unica') return [terapia];
  if (pacote === 'pack3') return [terapia, terapia, terapia];
  return PRENDA.slice();
}
export const descreve = (pacote, terapia) => pacote === 'prenda' ? PACOTES.prenda.nome : (pacote === 'pack3' ? '3 × ' : '') + (TERAPIAS[terapia] || {}).nome;
export const soDigitos = (s) => String(s || '').replace(/\D/g, '');
export function waNumero(contacto) { let d = soDigitos(contacto); if (d.length === 9) d = '351' + d; return d; }
export function novoCodigo() {
  const al = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', b = new Uint8Array(14); crypto.getRandomValues(b);
  const s = Array.from(b, (x) => al[x % al.length]).join('');
  return 'HF-' + s.slice(0, 4) + '-' + s.slice(4, 9) + '-' + s.slice(9, 14);
}
export const fmtData = (d) => d ? d.toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' }) : '';
export const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const CSS_BASE = `
:root{--verde:#12372a;--verde2:#1f5a43;--vermelho:#b3262e;--ouro:#d4a94b;--creme:#fbf6ea;--tinta:#1d2a24}
*{box-sizing:border-box;margin:0;padding:0}body{background:var(--creme);color:var(--tinta);font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;line-height:1.5}
.hero{background:linear-gradient(160deg,var(--verde),var(--verde2));color:#fff;text-align:center;padding:30px 18px 26px;position:relative;overflow:hidden}
.hero:before{content:"❄ ✦ ❄ ✦ ❄ ✦ ❄";position:absolute;top:6px;left:0;right:0;opacity:.25;letter-spacing:10px;font-size:14px}
.hero img{width:58px;height:58px;border-radius:14px;background:#fff;object-fit:cover;margin-bottom:10px}
.hero h1{font-family:Georgia,serif;font-size:1.65rem;line-height:1.2;margin-bottom:6px}.hero p{opacity:.92;font-size:.98rem}
.w{max-width:540px;margin:0 auto;padding:16px}
.card{background:#fff;border-radius:18px;padding:18px;margin-bottom:14px;box-shadow:0 2px 10px rgba(0,0,0,.07)}
.btn{display:block;width:100%;text-align:center;border:0;border-radius:100px;padding:15px;font-size:1rem;font-weight:700;cursor:pointer;text-decoration:none;color:#fff;background:var(--vermelho);margin-top:12px}
.btn.v{background:var(--verde2)}.btn.o{background:var(--ouro);color:#2b2108}.btn.c{background:#e8e2d0;color:var(--tinta)}.btn:disabled{opacity:.55}
label{display:block;font-size:.85rem;font-weight:700;color:#55645d;margin:12px 0 5px}
input,select,textarea{width:100%;padding:13px;border:1.5px solid #ddd6c2;border-radius:12px;font:inherit;background:#fff}
.muted{color:#6b7a73;font-size:.88rem}.hidden{display:none!important}
.vc{border-radius:20px;padding:22px 18px;color:#fff;text-align:center;background:linear-gradient(150deg,#12372a,#1f5a43 60%,#b3262e);box-shadow:0 8px 22px rgba(0,0,0,.25);position:relative;overflow:hidden;border:2px solid var(--ouro)}
.vc small{opacity:.85;letter-spacing:.14em;text-transform:uppercase;font-size:.7rem}.vc h2{font-family:Georgia,serif;font-size:1.5rem;margin:6px 0}
.vc .cod{display:inline-block;margin-top:10px;padding:8px 14px;border-radius:10px;background:rgba(255,255,255,.14);font-family:ui-monospace,Menlo,monospace;letter-spacing:.08em;font-size:1.05rem}
.aviso{color:#6b7a73;font-size:.78rem;text-align:center;margin:18px 6px}
`;
