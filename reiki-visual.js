/* Elementos visuais partilhados das páginas públicas da Hikari Fafe Escola de Reiki. */
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* Flor da vida desenhada em SVG (original). */
export function mandalaSVG(){
  const r = 60, cx = 250, cy = 250;
  let c = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '"/>';
  for (let i = 0; i < 6; i++){ const a = i * Math.PI / 3; c += '<circle cx="' + (cx + r * Math.cos(a)).toFixed(1) + '" cy="' + (cy + r * Math.sin(a)).toFixed(1) + '" r="' + r + '"/>'; }
  for (let i = 0; i < 6; i++){ const a = i * Math.PI / 3 + Math.PI / 6; c += '<circle cx="' + (cx + r * 1.732 * Math.cos(a)).toFixed(1) + '" cy="' + (cy + r * 1.732 * Math.sin(a)).toFixed(1) + '" r="' + r + '"/>'; }
  for (let i = 0; i < 6; i++){ const a = i * Math.PI / 3; c += '<circle cx="' + (cx + 2 * r * Math.cos(a)).toFixed(1) + '" cy="' + (cy + 2 * r * Math.sin(a)).toFixed(1) + '" r="' + r + '"/>'; }
  return '<svg class="mandala" viewBox="0 0 500 500" fill="none" stroke="#f0d878" stroke-width="1.2" aria-hidden="true">' + c + '<circle cx="250" cy="250" r="180" stroke-width="2"/></svg>';
}

export function heroiHTML({ selo, titulo, texto, contagem, cta }){
  let faiscas = '';
  [[12,20],[86,14],[24,62],[78,70],[50,8],[8,88],[92,48],[64,90]].forEach((p, i) => {
    faiscas += '<i class="faisca" style="left:' + p[0] + '%;top:' + p[1] + '%;animation-delay:' + (i * .55).toFixed(2) + 's"></i>';
  });
  return '<div class="heroi2">' + mandalaSVG() + faiscas
    + '<div class="logo"><img src="reiki-img/logo-hikari-circulo.png" alt="Hikari Fafe, Escola de Reiki Tradicional" width="132" height="132"></div>'
    + '<span class="selo">' + esc(selo) + '</span>'
    + '<h2>' + esc(titulo) + '</h2><p>' + esc(texto) + '</p>'
    + (contagem ? '<div class="contagem-tit" id="contTit"></div><div class="contagem" id="cont"></div>' : '')
    + (cta ? '<a class="cta-heroi" href="' + esc(cta.href) + '">' + esc(cta.texto) + '</a>' : '')
    + '</div>';
}

/* Contagem decrescente até um instante (ISO em UTC). */
export function contagem(iso, tituloAntes, tituloDepois){
  const el = document.getElementById('cont'), tit = document.getElementById('contTit');
  if (!el) return;
  const alvo = Date.parse(iso);
  const pinta = () => {
    const s = Math.floor((alvo - Date.now()) / 1000);
    if (s <= 0){ tit.textContent = tituloDepois; el.innerHTML = ''; return false; }
    const v = [[Math.floor(s / 86400), 'dias'], [Math.floor(s % 86400 / 3600), 'horas'], [Math.floor(s % 3600 / 60), 'min'], [s % 60, 'seg']];
    tit.textContent = tituloAntes;
    el.innerHTML = v.map(x => '<div><b>' + String(x[0]).padStart(2, '0') + '</b><span>' + x[1] + '</span></div>').join('');
    return true;
  };
  if (pinta()){ const t = setInterval(() => { if (!pinta()) clearInterval(t); }, 1000); }
}

/* Os 7 chakras: toque para ver luz e sombra. O dominante de cada pessoa descobre-se na 2.ª noite. */
export const CHAKRAS = [
  { n: 'Raiz', c: '#d64545', luz: 'Segurança, estabilidade, os pés bem assentes na terra.', sombra: 'Medo, insegurança, preocupação com o dinheiro e a sobrevivência.' },
  { n: 'Sacral', c: '#e8872e', luz: 'Criatividade, prazer, alegria de viver, emoções fluídas.', sombra: 'Culpa, bloqueio criativo, emoções em excesso ou reprimidas.' },
  { n: 'Plexo solar', c: '#e6c22e', luz: 'Confiança, vontade, força para decidir e agir.', sombra: 'Controlo, dúvida de si, necessidade de aprovação.' },
  { n: 'Cardíaco', c: '#4fae6a', luz: 'Amor, compaixão, perdão e ligação aos outros.', sombra: 'Mágoa guardada, dependência emocional, medo de se abrir.' },
  { n: 'Laríngeo', c: '#3f8fd6', luz: 'Expressão verdadeira, comunicação clara, escuta.', sombra: 'Calar o que sente, medo de falar, falar sem escutar.' },
  { n: 'Terceiro olho', c: '#5a52c9', luz: 'Intuição, clareza, visão para além do óbvio.', sombra: 'Excesso de mente, confusão, viver só na cabeça.' },
  { n: 'Coronário', c: '#9b5fd0', luz: 'Ligação ao todo, paz interior, sentido de vida.', sombra: 'Desligar da realidade, sensação de vazio, isolamento.' }
];

export function chakrasHTML(){
  return '<div class="chakra-linha" id="chakraLinha">'
    + CHAKRAS.map((k, i) => '<button type="button" style="--c:' + k.c + '" data-i="' + i + '" aria-label="Chakra ' + esc(k.n) + '"></button>').join('')
    + '</div><div class="chakra-info" id="chakraInfo">Toca num círculo para ver o lado <b>luz</b> e o lado <b>sombra</b> de cada chakra.</div>';
}

export function ligarChakras(){
  const linha = document.getElementById('chakraLinha'), info = document.getElementById('chakraInfo');
  if (!linha) return;
  linha.addEventListener('click', ev => {
    const b = ev.target.closest('button'); if (!b) return;
    const k = CHAKRAS[+b.dataset.i];
    linha.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
    info.style.setProperty('--c', k.c);
    info.innerHTML = '<b>' + esc(k.n) + '</b><br><span class="luz">☀️ Luz: ' + esc(k.luz) + '</span><br><span class="sombra">🌙 Sombra: ' + esc(k.sombra) + '</span>'
      + '<small>O teu chakra dominante descobre-se na 2.ª noite do workshop.</small>';
  });
}

/* Aparecer ao fazer scroll. */
export function revelar(){
  const els = document.querySelectorAll('.revela');
  if (!('IntersectionObserver' in window)){ els.forEach(e => e.classList.add('visivel')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('visivel'); io.unobserve(e.target); } }), { threshold: .12 });
  els.forEach(e => io.observe(e));
}

/* Botão fixo no fundo (telemóvel) que aparece depois do início e desaparece junto ao formulário. */
export function ctaFixo(texto, alvoId){
  const d = document.createElement('div'); d.className = 'cta-fixo';
  d.innerHTML = '<a href="#' + esc(alvoId) + '">' + esc(texto) + '</a>';
  document.body.appendChild(d); document.body.classList.add('com-cta');
  const alvo = document.getElementById(alvoId);
  const f = () => {
    const r = alvo ? alvo.getBoundingClientRect() : null;
    const visivelAlvo = r && r.top < innerHeight && r.bottom > 0;
    d.classList.toggle('mostra', scrollY > 380 && !visivelAlvo);
  };
  addEventListener('scroll', f, { passive: true }); f();
}

export function confete(){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cores = ['#f0d878', '#d64545', '#e8872e', '#4fae6a', '#3f8fd6', '#9b5fd0'];
  for (let i = 0; i < 70; i++){
    const e = document.createElement('i'); e.className = 'confete';
    e.style.left = Math.random() * 100 + 'vw';
    e.style.background = cores[i % cores.length];
    e.style.animationDelay = (Math.random() * .8).toFixed(2) + 's';
    e.style.animationDuration = (2 + Math.random() * 1.6).toFixed(2) + 's';
    document.body.appendChild(e);
    setTimeout(() => e.remove(), 4800);
  }
}
