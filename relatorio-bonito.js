// Relatórios bonitos e interativos para enviar aos pacientes.
// Gera HTML autónomo (sem scripts): a interação é feita só com CSS (<details>, hover, animações),
// por isso funciona na pré-visualização, no portal do paciente (innerHTML) e na impressão/PDF.
// Todas as ilustrações são SVG desenhados aqui. As fotos do próprio terapeuta entram em "imagens".

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const nl = s => esc(s).replace(/\n/g, '<br>');
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

const TEMAS = {
  cartas:  { a: '#5b2a86', b: '#c0398b', c: '#f6c453', fundo: '#fbf6ff', emoji: '🔮' },
  triagem: { a: '#0f6b73', b: '#4aa3c7', c: '#f3b85c', fundo: '#f3fbfb', emoji: '🌿' },
  alma:    { a: '#7a3d12', b: '#d98b2b', c: '#f7dc8a', fundo: '#fffaf1', emoji: '🌟' },
  geral:   { a: '#2f5d8a', b: '#6aa7d6', c: '#f4c76b', fundo: '#f5f9fd', emoji: '✨' }
};

const CSS = `
.rbx{--a:#5b2a86;--b:#c0398b;--c:#f6c453;--fundo:#fbf6ff;--tx:#2b2236;--mut:#6d6477;font-family:'Segoe UI',system-ui,-apple-system,Roboto,sans-serif;color:var(--tx);background:var(--fundo);border-radius:22px;overflow:hidden;max-width:760px;margin:0 auto;line-height:1.55;box-shadow:0 10px 40px rgba(60,30,90,.18)}
.rbx *{box-sizing:border-box}
.rbx .hero{position:relative;padding:34px 22px 56px;color:#fff;text-align:center;background:linear-gradient(135deg,var(--a),var(--b));overflow:hidden}
.rbx .hero svg.estrelas{position:absolute;inset:0;width:100%;height:100%;opacity:.55}
.rbx .hero .emo{font-size:46px;display:block;animation:rbfloat 4s ease-in-out infinite}
.rbx .hero h1{margin:6px 0 4px;font-size:25px;letter-spacing:.3px}
.rbx .hero p{margin:2px 0;opacity:.92;font-size:14px}
.rbx .hero .onda{position:absolute;left:0;right:0;bottom:-1px;height:34px}
.rbx .corpo{padding:6px 16px 22px}
.rbx .bloco{background:#fff;border-radius:18px;padding:16px 16px 14px;margin:14px 0;box-shadow:0 3px 14px rgba(60,30,90,.09);animation:rbsobe .6s ease both}
.rbx .bloco h2{margin:0 0 10px;font-size:17px;color:var(--a);display:flex;align-items:center;gap:8px}
.rbx .bloco h2 .ic{display:inline-flex;width:30px;height:30px;border-radius:50%;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--c),#fff);font-size:16px}
.rbx .bloco p{margin:6px 0;font-size:15px}
.rbx .mut{color:var(--mut);font-size:13px}
.rbx .cartas{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin:6px 0 4px}
.rbx .cartaBox{width:118px;text-align:center;perspective:700px}
.rbx .cartaBox svg{width:100%;height:auto;display:block;filter:drop-shadow(0 6px 8px rgba(40,20,60,.28));transition:transform .35s ease;animation:rbvira .9s ease both}
.rbx .cartaBox:hover svg{transform:translateY(-6px) rotate(-2deg) scale(1.05)}
.rbx .cartaBox .rot{font-size:12px;font-weight:700;color:var(--a);margin-top:6px}
.rbx .cartaBox .nm{font-size:12px;color:var(--mut)}
.rbx .cartaBox details{margin-top:4px;text-align:left}
.rbx .cartaBox summary{cursor:pointer;font-size:12px;color:var(--b);text-align:center;list-style:none}
.rbx .cartaBox summary::-webkit-details-marker{display:none}
.rbx .cartaBox details p{font-size:12px;background:var(--fundo);border-radius:10px;padding:6px 8px;margin:4px 0}
.rbx .gauge{display:flex;align-items:center;gap:14px;flex-wrap:wrap;justify-content:center}
.rbx .gauge svg{width:190px;height:auto}
.rbx .gauge .leg{flex:1;min-width:150px}
.rbx .gauge .leg b{font-size:22px;color:var(--a)}
.rbx .arco{stroke-dasharray:var(--len) 400;stroke-dashoffset:var(--len);animation:rbarco 1.4s .2s ease forwards}
.rbx .barra{margin:9px 0}
.rbx .barra .t{display:flex;justify-content:space-between;font-size:14px;gap:8px}
.rbx .barra .t b{font-weight:600}
.rbx .barra .t span{color:var(--mut);white-space:nowrap}
.rbx .trilho{height:14px;border-radius:99px;background:#efe9f5;overflow:hidden;margin-top:4px}
.rbx .enche{height:100%;border-radius:99px;width:var(--w);background:linear-gradient(90deg,var(--c),var(--b),var(--a));animation:rbenche 1.2s ease both;transform-origin:left}
.rbx .barra .nota{font-size:12.5px;color:var(--mut);margin-top:2px}
.rbx .radar{display:block;margin:0 auto;max-width:330px;width:100%;height:auto}
.rbx .radar .area{fill:rgba(192,57,139,.28);stroke:var(--b);stroke-width:2;animation:rbfade 1.2s ease both}
.rbx .caminhos{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.rbx .placa{flex:1 1 130px;max-width:210px;border-radius:14px;padding:10px 8px;text-align:center;font-size:13px;color:#fff;position:relative;transition:transform .25s}
.rbx .placa:hover{transform:translateY(-4px) rotate(-1deg)}
.rbx .placa b{display:block;font-size:22px}
.rbx .placa.aberto{background:linear-gradient(135deg,#2f9e6b,#7bd389)}
.rbx .placa.fechado{background:linear-gradient(135deg,#b4483c,#e58b6b)}
.rbx .placa.meio{background:linear-gradient(135deg,#d99a1e,#f3cf6b);color:#4a3200}
.rbx .lista{list-style:none;margin:0;padding:0}
.rbx .lista li{padding:8px 10px 8px 34px;margin:6px 0;border-radius:12px;background:var(--fundo);position:relative;font-size:14.5px}
.rbx .lista li:before{content:attr(data-i);position:absolute;left:9px;top:7px;font-size:16px}
.rbx .passos{position:relative;margin:4px 0 0 10px;padding-left:22px;border-left:3px dashed var(--b)}
.rbx .passo{position:relative;margin:0 0 14px}
.rbx .passo:before{content:'';position:absolute;left:-31px;top:3px;width:14px;height:14px;border-radius:50%;background:var(--c);border:3px solid var(--a);animation:rbpulso 2.4s infinite}
.rbx .passo b{color:var(--a)}
.rbx details.det{border:1px solid #eadff3;border-radius:12px;margin:7px 0;background:#fff;transition:box-shadow .2s}
.rbx details.det[open]{box-shadow:0 4px 14px rgba(91,42,134,.14)}
.rbx details.det summary{cursor:pointer;padding:9px 12px;font-weight:600;font-size:14.5px;color:var(--a);list-style:none;display:flex;justify-content:space-between;gap:8px;align-items:center}
.rbx details.det summary::-webkit-details-marker{display:none}
.rbx details.det summary:after{content:'ℹ️';font-size:14px}
.rbx details.det .in{padding:0 12px 10px;font-size:14px}
.rbx details.det .in i{display:block;margin-top:5px;color:var(--mut)}
.rbx .nums{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.rbx .num{width:46%;min-width:140px;background:var(--fundo);border-radius:16px;padding:10px 8px;text-align:center;animation:rbvira .8s ease both}
.rbx .num summary{cursor:pointer;list-style:none;display:flex;flex-direction:column;align-items:center;gap:6px}
.rbx .num summary::-webkit-details-marker{display:none}
.rbx .bola{width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700;color:#fff;background:radial-gradient(circle at 30% 25%,var(--c),var(--b) 55%,var(--a));box-shadow:0 4px 10px rgba(60,30,90,.3);transition:transform .3s}
.rbx .num:hover .bola{transform:scale(1.12) rotate(8deg)}
.rbx .num .nr{font-size:12.5px;font-weight:600;color:var(--a)}
.rbx .num p{font-size:12.5px;margin:6px 0 0;text-align:left}
.rbx .galeria{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.rbx .galeria img{max-width:100%;width:220px;border-radius:14px;box-shadow:0 4px 12px rgba(0,0,0,.18)}
.rbx .msg{background:linear-gradient(135deg,#fff,var(--fundo));border:2px dashed var(--b);border-radius:18px;padding:16px;margin:14px 0}
.rbx .msg h2{margin:0 0 6px;font-size:16px;color:var(--a)}
.rbx .rodape{text-align:center;padding:14px 18px 22px;font-size:12px;color:var(--mut)}
.rbx .rodape .ass{font-size:15px;color:var(--a);font-weight:700;margin-bottom:6px}
.rbx .imprimir{display:block;margin:0 auto 6px;border:0;background:none}
@keyframes rbfloat{50%{transform:translateY(-7px)}}
@keyframes rbsobe{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes rbvira{from{opacity:0;transform:rotateY(90deg)}to{opacity:1;transform:none}}
@keyframes rbarco{to{stroke-dashoffset:0}}
@keyframes rbenche{from{width:0}}
@keyframes rbfade{from{opacity:0}}
@keyframes rbpulso{50%{box-shadow:0 0 0 7px rgba(192,57,139,.18)}}
@media print{.rbx{box-shadow:none;border-radius:0}.rbx *{animation:none!important}.rbx .arco{stroke-dashoffset:0!important}.rbx .bloco{break-inside:avoid}.rbx details.det .in{display:block}}
`;

// ---------- Ilustrações ----------
function estrelas() {
  let s = '';
  for (let i = 0; i < 26; i++) {
    const x = (i * 37 + 11) % 100, y = (i * 53 + 7) % 100, r = 0.5 + (i % 4) * 0.35;
    s += `<circle cx="${x}%" cy="${y}%" r="${r}" fill="#fff"/>`;
  }
  return `<svg class="estrelas" aria-hidden="true">${s}</svg>`;
}

const PIPS = {
  A: [[50, 70]], 2: [[50, 32], [50, 108]], 3: [[50, 32], [50, 70], [50, 108]],
  4: [[34, 32], [66, 32], [34, 108], [66, 108]], 5: [[34, 32], [66, 32], [50, 70], [34, 108], [66, 108]],
  6: [[34, 32], [66, 32], [34, 70], [66, 70], [34, 108], [66, 108]],
  7: [[34, 32], [66, 32], [50, 51], [34, 70], [66, 70], [34, 108], [66, 108]],
  8: [[34, 32], [66, 32], [50, 51], [34, 70], [66, 70], [50, 89], [34, 108], [66, 108]],
  9: [[34, 30], [66, 30], [34, 56], [66, 56], [50, 70], [34, 84], [66, 84], [34, 110], [66, 110]],
  10: [[34, 30], [66, 30], [50, 44], [34, 56], [66, 56], [34, 84], [66, 84], [50, 96], [34, 110], [66, 110]]
};
const SUIT = { paus: ['♣', '#1f2430'], copas: ['♥', '#c4252f'], espadas: ['♠', '#1f2430'], ouros: ['♦', '#c4252f'] };

export function rbCartaSVG(naipe, valor, pequena) {
  const [g, cor] = SUIT[naipe] || ['?', '#333'];
  const id = 'g' + Math.random().toString(36).slice(2, 8);
  let miolo = '';
  const v = String(valor);
  if (PIPS[v]) {
    const grande = v === 'A';
    miolo = PIPS[v].map(([x, y]) => `<text x="${x}" y="${y + (grande ? 16 : 7)}" font-size="${grande ? 52 : 20}" text-anchor="middle" fill="${cor}">${g}</text>`).join('');
  } else {
    // Figuras: moldura, coroa/estrela e naipe grande
    const coroa = v === 'K' ? 'M30 42 L38 28 L50 40 L62 28 L70 42 Z' : (v === 'Q' ? 'M32 42 Q50 20 68 42 Z' : 'M34 42 L50 26 L66 42 Z');
    miolo = `<rect x="22" y="22" width="56" height="96" rx="6" fill="none" stroke="${cor}" stroke-width="1.6" opacity=".6"/>
      <rect x="26" y="26" width="48" height="88" rx="4" fill="url(#${id}f)" opacity=".35"/>
      <path d="${coroa}" fill="#e7b73c" stroke="#8a6410" stroke-width="1.2" transform="translate(0,6)"/>
      <circle cx="50" cy="62" r="11" fill="#f4d9b8" stroke="${cor}" stroke-width="1"/>
      <text x="50" y="104" font-size="30" text-anchor="middle" fill="${cor}">${g}</text>`;
  }
  const canto = `<text x="9" y="20" font-size="15" font-weight="700" fill="${cor}" font-family="Georgia,serif">${esc(v)}</text><text x="9" y="34" font-size="13" fill="${cor}">${g}</text>`;
  return `<svg viewBox="0 0 100 140" role="img" aria-label="${esc(v)} ${g}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f1ead9"/></linearGradient>
    <linearGradient id="${id}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e7b73c"/><stop offset="1" stop-color="${cor}"/></linearGradient></defs>
    <rect x="1.5" y="1.5" width="97" height="137" rx="9" fill="url(#${id})" stroke="#cdbf9f" stroke-width="1.5"/>
    <rect x="5" y="5" width="90" height="130" rx="6" fill="none" stroke="#e5dcc4" stroke-width=".8"/>
    ${miolo}${canto}
    <g transform="rotate(180 50 70)">${canto}</g></svg>`;
}

function gauge(valor, cor1, cor2) {
  const v = clamp(Number(valor) || 0, 0, 100), len = 251.3;
  return `<svg viewBox="0 0 200 118" aria-hidden="true"><defs><linearGradient id="gg" x1="0" x2="1"><stop offset="0" stop-color="${cor1}"/><stop offset="1" stop-color="${cor2}"/></linearGradient></defs>
    <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="#efe9f5" stroke-width="16" stroke-linecap="round"/>
    <path class="arco" style="--len:${(len * v / 100).toFixed(1)}" d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="url(#gg)" stroke-width="16" stroke-linecap="round"/>
    <text x="100" y="92" text-anchor="middle" font-size="30" font-weight="700" fill="${cor1}">${Math.round(v)}%</text></svg>`;
}

function radar(itens) {
  const n = itens.length; if (n < 3) return '';
  const cx = 160, cy = 160, R = 105;
  const pt = (i, f) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return [cx + Math.cos(a) * R * f, cy + Math.sin(a) * R * f]; };
  let grelha = '';
  [0.25, 0.5, 0.75, 1].forEach(f => { grelha += `<polygon points="${itens.map((_, i) => pt(i, f).map(x => x.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#e3d7ee" stroke-width="1"/>`; });
  const eixos = itens.map((_, i) => { const [x, y] = pt(i, 1); return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#e3d7ee"/>`; }).join('');
  const poly = itens.map((it, i) => pt(i, clamp(it.valor, 3, 100) / 100).map(x => x.toFixed(1)).join(',')).join(' ');
  const rot = itens.map((it, i) => { const [x, y] = pt(i, 1.2); return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="#6d6477">${esc(it.rotulo || it.nome)}</text>`; }).join('');
  const pts = itens.map((it, i) => { const [x, y] = pt(i, clamp(it.valor, 3, 100) / 100); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${it.valor >= 70 ? '#c4252f' : '#c0398b'}" stroke="#fff" stroke-width="1.5"/>`; }).join('');
  return `<svg class="radar" viewBox="0 0 320 320" role="img" aria-label="Gráfico radar">${grelha}${eixos}<polygon class="area" points="${poly}"/>${pts}${rot}</svg>`;
}

// ---------- Blocos ----------
function bloco(b, T) {
  const tit = b.titulo ? `<h2><span class="ic">${esc(b.icone || '✨')}</span>${esc(b.titulo)}</h2>` : '';
  switch (b.tipo) {
    case 'texto':
      return `<section class="bloco">${tit}${(b.paras || []).filter(Boolean).map(p => `<p>${nl(p)}</p>`).join('')}</section>`;
    case 'cartas':
      return `<section class="bloco">${tit}<div class="cartas">${(b.cartas || []).map((c, i) => `<div class="cartaBox" style="animation-delay:${i * .12}s">${rbCartaSVG(c.naipe, c.valor)}<div class="rot">${esc(c.rotulo || '')}</div><div class="nm">${esc(c.nome || '')}</div>${c.significado ? `<details><summary>ver significado</summary><p>${esc(c.significado)}</p></details>` : ''}</div>`).join('')}</div></section>`;
    case 'medidor':
      return `<section class="bloco">${tit}<div class="gauge">${gauge(b.valor, T.a, T.b)}<div class="leg"><b>${esc(b.destaque || '')}</b><p>${nl(b.legenda || '')}</p></div></div></section>`;
    case 'barras':
      return `<section class="bloco">${tit}${b.intro ? `<p class="mut">${nl(b.intro)}</p>` : ''}${(b.itens || []).map(it => `<div class="barra"><div class="t"><b>${esc(it.nome)}</b><span>${esc(it.texto != null ? it.texto : Math.round(it.valor) + '%')}</span></div><div class="trilho"><div class="enche" style="--w:${clamp(it.valor, 2, 100)}%"></div></div>${it.nota ? `<div class="nota">${esc(it.nota)}</div>` : ''}</div>`).join('')}</section>`;
    case 'radar':
      return `<section class="bloco">${tit}${b.intro ? `<p class="mut">${nl(b.intro)}</p>` : ''}${radar(b.itens || [])}</section>`;
    case 'caminhos':
      return `<section class="bloco">${tit}<div class="caminhos">${(b.itens || []).map(it => { const k = it.estado === 'aberto' ? 'aberto' : (it.estado === 'fechado' ? 'fechado' : 'meio'); return `<div class="placa ${k}"><b>${k === 'aberto' ? '🟢' : (k === 'fechado' ? '🔴' : '🟡')}</b>${esc(it.rotulo)}<br><small>${k === 'aberto' ? 'Caminho aberto' : (k === 'fechado' ? 'Caminho fechado por agora' : 'Aberto, com condições')}</small></div>`; }).join('')}</div>${b.texto ? `<p>${nl(b.texto)}</p>` : ''}</section>`;
    case 'lista':
      return `<section class="bloco">${tit}<ul class="lista">${(b.itens || []).map(x => `<li data-i="${esc(b.marca != null ? b.marca : '•')}"${b.marca === '' ? ' style="padding-left:12px"' : ''}>${nl(x)}</li>`).join('')}</ul></section>`;
    case 'linha':
      return `<section class="bloco">${tit}<div class="passos">${(b.passos || []).map(p => `<div class="passo"><b>${esc(p.rotulo)}</b><br>${nl(p.texto)}</div>`).join('')}</div></section>`;
    case 'detalhe':
      return `<section class="bloco">${tit}${b.intro ? `<p class="mut">${nl(b.intro)}</p>` : ''}${(b.itens || []).map(it => `<details class="det"><summary>${esc(it.nome)}${it.valor != null ? ` <small style="color:#6d6477;font-weight:400">${Math.round(it.valor)}%</small>` : ''}</summary><div class="in">${it.descricao ? nl(it.descricao) : ''}${it.exemplo ? `<i>Exemplo: ${nl(it.exemplo)}</i>` : ''}</div></details>`).join('')}</section>`;
    case 'numeros':
      return `<section class="bloco">${tit}<div class="nums">${(b.itens || []).map((it, i) => `<details class="num" style="animation-delay:${i * .08}s"><summary><span class="bola">${esc(it.valor)}</span><span class="nr">${esc(it.rotulo)}</span></summary><p>${nl(it.texto || '')}</p></details>`).join('')}</div></section>`;
    case 'secoes':
      return `<section class="bloco">${tit}${(b.itens || []).map(it => `<details class="det"><summary>${esc(it.nome)}</summary><div class="in">${(it.paras || []).filter(Boolean).map(p => `<p>${nl(p)}</p>`).join('')}</div></details>`).join('')}</section>`;
    case 'imagens':
      return (b.urls && b.urls.length) ? `<section class="bloco">${tit}<div class="galeria">${b.urls.map(u => `<img src="${esc(u)}" alt="" loading="lazy">`).join('')}</div></section>` : '';
    default: return '';
  }
}

// modelo: { tema, titulo, subtitulo, nome, data, assinatura, blocos:[], mensagem, aviso }
export function rbFragmento(m) {
  const T = TEMAS[m.tema] || TEMAS.geral;
  const estilo = `--a:${T.a};--b:${T.b};--c:${T.c};--fundo:${T.fundo}`;
  const onda = `<svg class="onda" viewBox="0 0 400 34" preserveAspectRatio="none" aria-hidden="true"><path d="M0 18 Q50 0 100 16 T200 16 T300 16 T400 14 V34 H0Z" fill="${T.fundo}"/></svg>`;
  return `<style>${CSS}</style><div class="rbx" style="${estilo}">
    <div class="hero">${estrelas()}<span class="emo">${m.emoji || T.emoji}</span><h1>${esc(m.titulo || 'O seu relatório')}</h1>
      ${m.subtitulo ? `<p>${esc(m.subtitulo)}</p>` : ''}<p>${m.nome ? '✦ ' + esc(m.nome) + ' ✦ ' : ''}${esc(m.data || '')}</p>${onda}</div>
    <div class="corpo">${(m.blocos || []).map(b => bloco(b, T)).join('')}
      ${m.mensagem ? `<div class="msg"><h2>💌 Palavras para si</h2><p>${nl(m.mensagem)}</p></div>` : ''}
    </div>
    <div class="rodape">${m.assinatura ? `<div class="ass">${esc(m.assinatura)}</div>` : ''}${esc(m.aviso || 'Este relatório mostra tendências e energias do momento. É um trabalho complementar e não substitui o acompanhamento médico ou psicológico. As decisões são sempre suas.')}</div></div>`;
}

// Documento completo (para pré-visualizar, imprimir/guardar em PDF ou descarregar)
export function rbDocumento(m) {
  return `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(m.titulo || 'Relatório')}</title>
<style>body{margin:0;padding:14px;background:#e9e2f0}@page{margin:10mm}@media print{body{padding:0;background:#fff}}</style></head><body>${rbFragmento(m)}</body></html>`;
}

// Abre a pré-visualização em ecrã completo, com botões Imprimir/PDF, Descarregar e Fechar.
export function rbPreVisualizar(m, opcoes) { return rbPreVisualizarHtml(rbDocumento(m), m.titulo, opcoes); }
export function rbDocumentoDeFragmento(frag, titulo) {
  return `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(titulo || 'Relatório')}</title>
<style>body{margin:0;padding:14px;background:#e9e2f0}@page{margin:10mm}@media print{body{padding:0;background:#fff}}</style></head><body>${frag}</body></html>`;
}
export function rbPreVisualizarHtml(html, titulo, opcoes) {
  const m = { titulo };
  const ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(20,10,30,.78);display:flex;flex-direction:column';
  ov.innerHTML = `<div style="display:flex;gap:8px;flex-wrap:wrap;padding:10px;background:#2b1a3d;justify-content:center">
    <button data-a="pdf" style="padding:9px 14px;border:0;border-radius:10px;background:#f6c453;font-weight:700">🖨️ Imprimir / guardar PDF</button>
    <button data-a="html" style="padding:9px 14px;border:0;border-radius:10px;background:#fff">⬇️ Descarregar página</button>
    ${opcoes && opcoes.aoGuardar ? '<button data-a="guardar" style="padding:9px 14px;border:0;border-radius:10px;background:#7bd389;font-weight:700">💾 Guardar na ficha</button>' : ''}
    <button data-a="x" style="padding:9px 14px;border:0;border-radius:10px;background:#ddd">✖ Fechar</button></div>
    <iframe style="flex:1;border:0;background:#e9e2f0;width:100%"></iframe>`;
  document.body.appendChild(ov);
  const fr = ov.querySelector('iframe'); fr.srcdoc = html;
  ov.addEventListener('click', e => {
    const a = e.target && e.target.getAttribute && e.target.getAttribute('data-a'); if (!a) return;
    if (a === 'x') ov.remove();
    else if (a === 'pdf') { try { fr.contentWindow.focus(); fr.contentWindow.print(); } catch (_) {} }
    else if (a === 'html') {
      const url = URL.createObjectURL(new Blob([html], { type: 'text/html' })), l = document.createElement('a');
      l.href = url; l.download = (String(m.titulo || 'relatorio').replace(/[^\w\-]+/g, '_')) + '.html'; l.click(); setTimeout(() => URL.revokeObjectURL(url), 4000);
    } else if (a === 'guardar') { opcoes.aoGuardar(html); }
  });
  return ov;
}
