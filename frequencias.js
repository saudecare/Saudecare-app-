/* Frequências — músicas de frequência (Solfeggio, 432 Hz…) com descrição, para que serve, como fazer e tempo.
   Ferramenta exclusiva da Hikari Fafe (tenant hikari-terapias). O áudio vem de um link (Google Drive ou outro site):
   cola-se o link, a pessoa carrega em «Ouvir». Guarda no documento da conta, por isso não precisa de regras novas. */
export const TENANT_FREQ = 'hikari-terapias';

const AVISO = 'Prática de relaxamento e bem-estar. Não substitui acompanhamento médico.';
const BASE = [
  { id: 'f174', hz: '174 Hz', titulo: 'Solfeggio 174 Hz', link: 'frequencias/174hz.mp3',
    para: 'Associada ao relaxamento do corpo e à sensação de segurança. Usa-se para aliviar a tensão e acalmar o corpo e as emoções.',
    como: 'Deita-te ou senta-te com apoio, com auscultadores. Faz uma respiração lenta e vai soltando os ombros, a barriga e o maxilar de cada vez que expiras.',
    tempo: '10 a 20 minutos' },
  { id: 'f285', hz: '285 Hz', titulo: 'Solfeggio 285 Hz', link: 'frequencias/285hz.mp3',
    para: 'Associada à renovação, ao equilíbrio e à calma mental. Boa para recomeçar o dia ou depois de um período cansativo.',
    como: 'Fecha os olhos e imagina o corpo a ser envolvido por uma luz suave. Respira devagar e deixa o corpo pesar.',
    tempo: '10 a 15 minutos' },
  { id: 'f396', hz: '396 Hz', titulo: 'Solfeggio 396 Hz', link: 'frequencias/396hz.mp3',
    para: 'Nas tradições vibracionais é associada a libertar medos, culpa e bloqueios, e a sentir mais segurança e confiança.',
    como: 'Põe auscultadores, senta-te ou deita-te confortavelmente e fecha os olhos. Respira devagar. Se te vierem pensamentos, deixa-os passar e volta à respiração. Mantém o volume baixo e agradável.',
    tempo: '10 a 15 minutos' },
  { id: 'f417', hz: '417 Hz', titulo: 'Solfeggio 417 Hz', link: 'frequencias/417hz.mp3',
    para: 'Associada a largar o que já não serve, a mudar e a recomeçar. Muita gente usa-a para limpar a energia e ganhar ideias novas.',
    como: 'Ouve com os olhos fechados. A cada expiração, imagina que deixas ir uma preocupação. No fim, escreve numa folha uma coisa que queres mudar.',
    tempo: '10 a 15 minutos' },
  { id: 'f432', hz: '432 Hz', titulo: 'Música a 432 Hz', link: 'frequencias/432hz.mp3',
    para: 'Associada à harmonia, à calma e ao equilíbrio. Muita gente usa-a para relaxar, meditar e acalmar a mente ao fim do dia.',
    como: 'Ouve num sítio calmo, sem interrupções. Podes ficar a olhar para uma vela ou fechar os olhos. Acompanha o som com respirações lentas e profundas.',
    tempo: '15 a 30 minutos' },
  { id: 'f528', hz: '528 Hz', titulo: 'Solfeggio 528 Hz', link: 'frequencias/528hz.mp3',
    para: 'Conhecida como a frequência do amor e da transformação. Associada ao bem-estar, à alegria e à reconexão com a nossa energia.',
    como: 'Ouve com auscultadores, de olhos fechados, com uma mão no coração. Imagina uma luz verde ou dourada a encher o peito a cada respiração.',
    tempo: '10 a 20 minutos' },
  { id: 'f639', hz: '639 Hz', titulo: 'Solfeggio 639 Hz', link: 'frequencias/639hz.mp3',
    para: 'Associada à ligação com os outros, às relações e à comunicação. Boa antes de uma conversa importante ou para abrir o coração.',
    como: 'Senta-te com a coluna direita e uma mão no peito. Pensa numa pessoa de quem gostas e envia-lhe, em silêncio, uma intenção de paz.',
    tempo: '10 a 15 minutos' },
  { id: 'f741', hz: '741 Hz', titulo: 'Solfeggio 741 Hz', link: 'frequencias/741hz.mp3',
    para: 'Associada à limpeza, à clareza e à expressão. Usa-se para sentir a mente mais leve e arrumada.',
    como: 'Ouve com a coluna direita e os ombros soltos. A cada expiração, imagina que largas o que já não precisas. Bebe um copo de água no fim.',
    tempo: '10 a 15 minutos' },
  { id: 'f852', hz: '852 Hz', titulo: 'Solfeggio 852 Hz', link: 'frequencias/852hz.mp3',
    para: 'Associada à intuição, ao silêncio interior e à ligação espiritual. Boa para meditar e acalmar o ruído mental.',
    como: 'Ouve em silêncio, de olhos fechados, com atenção na zona entre as sobrancelhas. Não precisas de fazer nada, só de estar presente.',
    tempo: '15 a 20 minutos' },
  { id: 'f963', hz: '963 Hz', titulo: 'Solfeggio 963 Hz', link: 'frequencias/963hz.mp3',
    para: 'Associada à ligação espiritual, à expansão da consciência e à sensação de unidade. Usa-se em meditações mais profundas.',
    como: 'Fica sentado, com a coluna direita, de olhos fechados. Sente o topo da cabeça e imagina uma luz a descer devagar pelo corpo. Faz esta prática com calma e sem pressa.',
    tempo: '15 a 20 minutos' }
];

export function linkParaPlayer(url){
  const u = String(url || '').trim();
  if (/^frequencias\/[\w-]+\.mp3$/.test(u)) return { tipo: 'local', src: u }; // som criado na própria app
  if (!/^https:\/\//i.test(u)) return null;
  const d = u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^#]*&)?id=)([\w-]{15,})/i);
  if (d) return { tipo: 'drive', src: 'https://drive.google.com/file/d/' + d[1] + '/preview' };
  if (/\.(mp3|m4a|wav|ogg|aac)(\?|#|$)/i.test(u)) return { tipo: 'audio', src: u };
  const y = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/i);
  if (y) return { tipo: 'youtube', src: 'https://www.youtube-nocookie.com/embed/' + y[1] + '?rel=0' };
  return { tipo: 'site', src: u }; // qualquer outro site: abre noutra janela
}

/* Imagem de cada frequência, desenhada na hora (SVG): cores, anéis e pétalas diferentes por frequência. Sem ficheiros. */
const CORES = { 174: ['#c9826b', '#3a1f33'], 285: ['#f08a5d', '#3d1f2e'], 396: ['#e0524a', '#33142a'], 417: ['#f2a93b', '#3a1d2a'], 432: ['#45b8b0', '#10303a'],
  528: ['#58c27d', '#0f3226'], 639: ['#4cc3dd', '#0d2d45'], 741: ['#5b8def', '#14234f'], 852: ['#7a6af0', '#1d1a52'], 963: ['#b36ee6', '#2a1650'] };
export function imagemSvg(f){
  const n = parseInt(String(f.hz || f.titulo || '').replace(/[^\d]/g, ''), 10) || 0;
  let h = 0; for (const c of String(f.id || 'x')) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const par = CORES[n] || ['hsl(' + (h % 360) + ',65%,62%)', 'hsl(' + ((h + 40) % 360) + ',55%,16%)'];
  const k = ((n || h) % 5) + 6, id = 'g' + (n || h);
  let petalas = '';
  for (let i = 0; i < k; i++) petalas += `<ellipse cx="200" cy="150" rx="14" ry="64" transform="rotate(${(360 / k) * i} 200 150) translate(0 -46)" fill="#fff" fill-opacity=".13" stroke="#fff" stroke-opacity=".35" stroke-width="1"/>`;
  let estrelas = ''; for (let i = 0; i < 16; i++){ const x = (h * (i + 3) * 37) % 400, y = (h * (i + 5) * 53) % 300; estrelas += `<circle cx="${x}" cy="${y}" r="${(i % 3) * 0.6 + 0.7}" fill="#fff" fill-opacity="${0.3 + (i % 4) * 0.12}"/>`; }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${String(f.titulo || '').replace(/[<>&"]/g, '')}" style="display:block;width:100%;height:100%">
    <defs><radialGradient id="${id}" cx="50%" cy="50%" r="75%"><stop offset="0" stop-color="${par[0]}"/><stop offset="1" stop-color="${par[1]}"/></radialGradient>
    <radialGradient id="${id}c" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
    <rect width="400" height="300" fill="url(#${id})"/>${estrelas}
    <circle cx="200" cy="150" r="118" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="1.5"/><circle cx="200" cy="150" r="92" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1.5"/>
    <circle cx="200" cy="150" r="66" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="1.5"/>${petalas}
    <path d="M0 232 Q50 212 100 232 T200 232 T300 232 T400 232 V300 H0Z" fill="#000" fill-opacity=".14"/><path d="M0 254 Q50 238 100 254 T200 254 T300 254 T400 254 V300 H0Z" fill="#000" fill-opacity=".16"/>
    <circle cx="200" cy="150" r="34" fill="url(#${id}c)"/></svg>`;
}

/* Jornada: todas as frequências seguidas, cada uma o tempo adequado, com transição suave. Usa os mesmos sons, sem ficheiros novos. */
const TEMPOS = { f174: 10, f285: 10, f396: 12, f417: 12, f432: 15, f528: 15, f639: 10, f741: 10, f852: 15, f963: 15 };
const TEMPO_CURTA = 5, FADE = 3500;
export function imagemJornada(){
  const cs = ['#c9826b', '#f08a5d', '#e0524a', '#f2a93b', '#45b8b0', '#58c27d', '#4cc3dd', '#5b8def', '#7a6af0', '#b36ee6'];
  let an = ''; cs.forEach((c, i) => { an += `<circle cx="200" cy="150" r="${128 - i * 11}" fill="none" stroke="${c}" stroke-width="7" stroke-opacity=".85"/>`; });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Jornada completa" style="display:block;width:100%;height:100%">
    <defs><radialGradient id="gj" cx="50%" cy="50%" r="75%"><stop offset="0" stop-color="#2b2063"/><stop offset="1" stop-color="#0c0a26"/></radialGradient><radialGradient id="gjc" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
    <rect width="400" height="300" fill="url(#gj)"/>${an}<circle cx="200" cy="150" r="22" fill="url(#gjc)"/></svg>`;
}

export function renderFrequencias(main, ctx){
  if (ctx.tenantId !== TENANT_FREQ){
    main.innerHTML = '<div class="card"><h2>🔒 Ferramenta indisponível</h2><p class="muted">Esta ferramenta é exclusiva de uma conta específica e não está disponível na sua subscrição.</p></div>';
    return;
  }
  const esc = ctx.escapeHtml;
  let lista = ctx.get();
  if (!lista.length) lista = BASE.map(x => Object.assign({}, x));
  else lista = lista.map(x => { const b = BASE.find(y => y.id === x.id); return b && (!x.link || /zenmix\.io/i.test(x.link)) ? Object.assign({}, x, { link: b.link }) : x; });
  let editarId = null;

  const guardar = async nova => { await ctx.save(nova); lista = nova; };

  function cartao(f){
    const pl = linkParaPlayer(f.link);
    return `<div class="card" data-f="${esc(f.id)}" style="margin-bottom:12px;padding-top:0;overflow:hidden;">
      <div style="margin:0 -18px 12px;height:190px;">${imagemSvg(f)}</div>
      <h3 style="margin:0 0 2px;">🎶 ${esc(f.titulo)}</h3>
      ${f.hz ? `<p class="muted" style="margin:0 0 8px;">${esc(f.hz)}</p>` : ''}
      ${f.para ? `<p style="margin:8px 0 0;"><strong>✨ Para que serve</strong><br>${esc(f.para).replace(/\n/g, '<br>')}</p>` : ''}
      ${f.como ? `<p style="margin:8px 0 0;"><strong>🧘 Como fazer</strong><br>${esc(f.como).replace(/\n/g, '<br>')}</p>` : ''}
      ${f.tempo ? `<p style="margin:8px 0 0;"><strong>⏱️ Quanto tempo</strong><br>${esc(f.tempo)}</p>` : ''}
      <div class="fq-palco" style="margin-top:10px;"></div>
      <div class="row" style="margin-top:10px;gap:8px;flex-wrap:wrap;">
        ${pl ? `<button class="primary fq-ouvir">${pl.tipo === 'site' ? '🔗 Abrir a música' : '▶ Ouvir'}</button>` : `<span class="muted">Ainda sem música. Carrega em ✏️ Editar e cola o link.</span>`}
        <button class="ghost fq-partilhar">📤 Partilhar</button>
        <button class="ghost fq-editar">✏️ Editar</button>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:.8rem;">${AVISO}</p>
    </div>`;
  }

  function curto(t){ const x = String(t || '').split(/(?<=[.!?])\s/)[0]; return x.length > 120 ? x.slice(0, 117) + '…' : x; }
  function botao(f){
    return `<button type="button" data-abrir="${esc(f.id)}" class="fq-tile" style="all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;border-radius:16px;overflow:hidden;background:var(--card,#fff);box-shadow:0 2px 10px rgba(0,0,0,.14);min-width:0;" aria-label="${esc(f.titulo)}">
      <div style="height:110px;">${imagemSvg(f)}</div>
      <div style="padding:10px 12px 12px;"><strong style="display:block;font-size:1rem;">${esc(f.titulo)}</strong>
      <span class="muted" style="display:block;font-size:.82rem;margin-top:4px;line-height:1.3;">${esc(curto(f.para))}</span>
      ${f.tempo ? `<span class="muted" style="display:block;font-size:.78rem;margin-top:6px;">⏱️ ${esc(f.tempo)}</span>` : ''}</div></button>`;
  }

  function botaoJornada(){
    return `<button type="button" data-abrir="jornada" class="fq-tile" style="all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;border-radius:16px;overflow:hidden;background:var(--card,#fff);box-shadow:0 2px 10px rgba(0,0,0,.14);min-width:0;grid-column:1/-1;" aria-label="Jornada completa">
      <div style="height:110px;">${imagemJornada()}</div>
      <div style="padding:10px 12px 12px;"><strong style="display:block;font-size:1rem;">🌈 Jornada completa</strong>
      <span class="muted" style="display:block;font-size:.82rem;margin-top:4px;line-height:1.3;">Todas as frequências seguidas, cada uma pelo tempo adequado, numa só audição.</span>
      <span class="muted" style="display:block;font-size:.78rem;margin-top:6px;">⏱️ Completa 2 h 4 min · Curta 50 min</span></div></button>`;
  }

  function editor(f){
    return `<div class="card" style="border:2px solid var(--primary);margin-bottom:12px;">
      <h3>✏️ ${f._novo ? 'Nova frequência' : 'Editar frequência'}</h3>
      <label class="muted" for="fq-t">Título</label><input type="text" id="fq-t" value="${esc(f.titulo)}" placeholder="Ex.: Solfeggio 528 Hz" style="margin:4px 0 8px;">
      <label class="muted" for="fq-h">Frequência</label><input type="text" id="fq-h" value="${esc(f.hz)}" placeholder="Ex.: 528 Hz" style="margin:4px 0 8px;">
      <label class="muted" for="fq-l">Link da música (já vem preenchido; podes trocar por Drive, YouTube, mp3 ou outro site)</label><input type="url" id="fq-l" value="${esc(f.link)}" placeholder="https://drive.google.com/file/d/…" style="margin:4px 0 4px;">
      <p class="muted" style="font-size:.8rem;margin:0 0 8px;">No Drive: abre o ficheiro, toca em Partilhar e escolhe «Qualquer pessoa com o link», depois copia o link.</p>
      <label class="muted" for="fq-p">Para que serve</label><textarea id="fq-p" rows="3" style="margin:4px 0 8px;">${esc(f.para)}</textarea>
      <label class="muted" for="fq-c">Como fazer</label><textarea id="fq-c" rows="3" style="margin:4px 0 8px;">${esc(f.como)}</textarea>
      <label class="muted" for="fq-d">Quanto tempo</label><input type="text" id="fq-d" value="${esc(f.tempo)}" placeholder="Ex.: 10 a 15 minutos" style="margin:4px 0 10px;">
      <div class="row" style="gap:8px;flex-wrap:wrap;">
        <button class="primary" id="fq-guardar">Guardar</button><button class="ghost" id="fq-cancelar">Cancelar</button>
        ${f._novo ? '' : '<button class="ghost" id="fq-apagar">🗑️ Apagar</button>'}
      </div></div>`;
  }

  let novo = null, aberto = null, jor = null;
  function pararJornada(){ if (jor){ clearInterval(jor.iv); try { jor.au.pause(); jor.au.src = ''; } catch(e){} jor = null; } }
  const mmss = ms => { const t = Math.max(0, Math.round(ms / 1000)); return String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0'); };
  function seqJornada(curta){
    return BASE.map(b => { const x = lista.find(y => y.id === b.id) || b; const pl = linkParaPlayer(x.link) || linkParaPlayer(b.link); return { hz: b.hz, titulo: b.titulo, min: curta ? TEMPO_CURTA : TEMPOS[b.id], src: pl && (pl.tipo === 'local' || pl.tipo === 'audio') ? pl.src : b.link }; });
  }
  function jornadaCard(){
    const tot = m => BASE.reduce((a, b) => a + (m ? TEMPO_CURTA : TEMPOS[b.id]), 0), fmt = m => m >= 60 ? Math.floor(m / 60) + ' h' + (m % 60 ? ' ' + (m % 60) + ' min' : '') : m + ' min';
    return `<div class="card" id="fq-jornada" style="margin-bottom:12px;padding-top:0;overflow:hidden;">
      <div style="margin:0 -18px 12px;height:190px;">${imagemJornada()}</div>
      <h3 style="margin:0 0 2px;">🌈 Jornada completa</h3><p class="muted" style="margin:0 0 8px;">As ${BASE.length} frequências seguidas</p>
      <p style="margin:8px 0 0;"><strong>✨ Para que serve</strong><br>Uma viagem sonora com todas as frequências, da mais grave à mais aguda, cada uma pelo tempo adequado e com transições suaves entre elas. Para quando queres um momento longo de relaxamento ou meditação, sem teres de mexer no telemóvel.</p>
      <p style="margin:8px 0 0;"><strong>🧘 Como fazer</strong><br>Prepara um sítio calmo, deita-te ou senta-te confortavelmente, usa auscultadores e põe o volume baixo. Deixa o telemóvel a tocar e o ecrã ligado. Podes saltar para a seguinte quando quiseres.</p>
      <p style="margin:8px 0 0;"><strong>⏱️ Ordem e tempo</strong></p>
      <ol style="margin:4px 0 0 18px;padding:0;">${BASE.map(b => `<li>${esc(b.hz)} · ${TEMPOS[b.id]} min <span class="muted">(curta: ${TEMPO_CURTA} min)</span></li>`).join('')}</ol>
      <div class="row" style="margin-top:12px;gap:8px;flex-wrap:wrap;" id="fq-jbtns"><button class="primary" id="fq-jc">▶ Jornada completa (${fmt(tot(false))})</button><button class="ghost" id="fq-jk">▶ Jornada curta (${fmt(tot(true))})</button></div>
      <div id="fq-jplayer" style="margin-top:12px;" hidden>
        <p id="fq-jstat" style="margin:0 0 6px;font-weight:600;"></p>
        <div style="height:8px;border-radius:6px;background:rgba(128,128,128,.25);overflow:hidden;"><i id="fq-jbar" style="display:block;height:100%;width:0;background:var(--primary);"></i></div>
        <div class="row" style="margin-top:10px;gap:8px;flex-wrap:wrap;"><button class="ghost" id="fq-jpausa">⏸️ Pausa</button><button class="ghost" id="fq-jseg">⏭️ Seguinte</button><button class="ghost" id="fq-jpara">⏹️ Parar</button></div>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:.8rem;">${AVISO}</p></div>`;
  }
  function ligarJornada(){
    const q = id => main.querySelector(id);
    function iniciar(curta){
      pararJornada();
      const seq = seqJornada(curta), au = new Audio(); au.loop = true; au.preload = 'auto';
      jor = { seq, au, i: 0, t0: 0, pausado: false, pAt: 0 };
      const ir = i => { jor.i = i; au.src = seq[i].src; au.volume = 0; jor.t0 = Date.now(); au.play().catch(() => ctx.toast('Não consegui tocar. Toca outra vez no botão.', true)); };
      q('#fq-jbtns').hidden = true; q('#fq-jplayer').hidden = false;
      jor.iv = setInterval(() => {
        if (!jor || jor.pausado) return;
        const it = jor.seq[jor.i], dur = it.min * 60000, el = Date.now() - jor.t0;
        if (el >= dur){ if (jor.i + 1 < jor.seq.length){ ir(jor.i + 1); } else { pararJornada(); ctx.toast('Jornada terminada. 🙏'); desenhar(); } return; }
        jor.au.volume = Math.max(0, Math.min(1, el / FADE, (dur - el) / FADE));
        q('#fq-jstat').textContent = `🎶 ${it.hz} · ${jor.i + 1} de ${jor.seq.length} · faltam ${mmss(dur - el)}`;
        const totalMs = jor.seq.reduce((a, x) => a + x.min * 60000, 0), feito = jor.seq.slice(0, jor.i).reduce((a, x) => a + x.min * 60000, 0) + el;
        q('#fq-jbar').style.width = (feito / totalMs * 100).toFixed(1) + '%';
      }, 500);
      ir(0);
      q('#fq-jpausa').onclick = () => { if (!jor) return; if (jor.pausado){ jor.t0 += Date.now() - jor.pAt; jor.pausado = false; jor.au.play(); q('#fq-jpausa').textContent = '⏸️ Pausa'; } else { jor.pausado = true; jor.pAt = Date.now(); jor.au.pause(); q('#fq-jpausa').textContent = '▶ Continuar'; } };
      q('#fq-jseg').onclick = () => { if (!jor) return; if (jor.i + 1 < jor.seq.length){ if (jor.pausado){ jor.pausado = false; q('#fq-jpausa').textContent = '⏸️ Pausa'; } ir(jor.i + 1); } else ctx.toast('Esta é a última frequência.'); };
      q('#fq-jpara').onclick = () => { pararJornada(); desenhar(); };
    }
    q('#fq-jc').onclick = () => iniciar(false); q('#fq-jk').onclick = () => iniciar(true);
  }
  function desenhar(){
    const emEdicao = novo || editarId, fa = aberto && aberto !== 'jornada' && lista.find(x => x.id === aberto);
    if (emEdicao) main.innerHTML = `<h2>🎶 Frequências</h2>` + (novo ? editor(novo) : editor(lista.find(x => x.id === editarId)));
    else if (aberto === 'jornada') { main.innerHTML = `<div class="row" style="margin-bottom:10px;"><button class="ghost" id="fq-voltar">← Todas as frequências</button></div>` + jornadaCard(); ligarJornada(); }
    else if (fa) main.innerHTML = `<div class="row" style="margin-bottom:10px;"><button class="ghost" id="fq-voltar">← Todas as frequências</button></div>` + cartao(fa);
    else main.innerHTML = `<h2>🎶 Frequências</h2>
      <p class="muted">Escolhe uma frequência. Dentro de cada uma tens a descrição, como fazer, o tempo e a música.</p>
      <div class="row" style="margin-bottom:12px;gap:8px;flex-wrap:wrap;"><button class="primary" id="fq-novo">+ Nova frequência</button><button class="ghost" id="fq-repor">↻ Repor as da lista</button></div>
      <div id="fq-lista" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;">${botaoJornada()}${lista.map(botao).join('')}</div>`;
    if (aberto !== 'jornada') pararJornada();
    main.querySelectorAll('[data-abrir]').forEach(b => b.onclick = () => { aberto = b.dataset.abrir; desenhar(); window.scrollTo(0, 0); });
    const vv = main.querySelector('#fq-voltar'); if (vv) vv.onclick = () => { pararJornada(); aberto = null; desenhar(); };
    const bn = main.querySelector('#fq-novo'); if (bn) bn.onclick = () => { editarId = null; novo = { id: 'f' + Date.now().toString(36), hz: '', titulo: '', link: '', para: '', como: '', tempo: '', _novo: true }; desenhar(); window.scrollTo(0, 0); };
    const br = main.querySelector('#fq-repor'); if (br) br.onclick = async () => {
      const faltam = BASE.filter(b => !lista.some(x => x.id === b.id));
      if (!faltam.length){ ctx.toast('A lista já tem todas as frequências.'); return; }
      try { await guardar(lista.concat(faltam.map(x => Object.assign({}, x)))); ctx.toast('Juntei ' + faltam.length + ' frequência(s) à lista ✓'); desenhar(); } catch(e){ ctx.toast('Não consegui guardar: ' + (e.message || e), true); }
    };
    main.querySelectorAll('[data-f]').forEach(c => {
      const f = lista.find(x => x.id === c.dataset.f); if (!f) return;
      const o = c.querySelector('.fq-ouvir');
      if (o) o.onclick = () => {
        const pl = linkParaPlayer(f.link), pa = c.querySelector('.fq-palco'); if (!pl) return;
        if (pl.tipo === 'site'){ window.open(pl.src, '_blank', 'noopener'); return; }
        if (pl.tipo === 'local' || pl.tipo === 'audio'){
          pa.innerHTML = `<audio controls loop ${pl.tipo === 'local' ? 'autoplay ' : ''}preload="auto" src="${esc(pl.src)}" style="width:100%"></audio>
            <div class="row" style="margin-top:8px;gap:8px;align-items:center;flex-wrap:wrap;"><label class="muted" for="fqt-${esc(f.id)}">⏲️ Parar sozinho ao fim de</label>
            <select id="fqt-${esc(f.id)}" style="width:auto;"><option value="0">Não parar</option><option value="10">10 minutos</option><option value="15">15 minutos</option><option value="20">20 minutos</option><option value="30">30 minutos</option></select></div>`;
          const au = pa.querySelector('audio'), sel = pa.querySelector('select'); let tm = null;
          sel.onchange = () => { clearTimeout(tm); const m = Number(sel.value); if (!m) return; ctx.toast('Vai parar sozinho daqui a ' + m + ' minutos.'); tm = setTimeout(() => { let v = au.volume; const id = setInterval(() => { v = Math.max(0, v - 0.05); au.volume = v; if (v <= 0){ clearInterval(id); au.pause(); au.volume = 1; } }, 200); }, m * 60000); };
        }
        else pa.innerHTML = `<iframe src="${esc(pl.src)}" title="${esc(f.titulo)}" width="100%" height="${pl.tipo === 'youtube' ? 220 : 90}" style="border:0;border-radius:10px;" allow="autoplay; encrypted-media" loading="lazy"></iframe>`;
        o.style.display = 'none';
      };
      c.querySelector('.fq-editar').onclick = () => { novo = null; editarId = f.id; desenhar(); };
      c.querySelector('.fq-partilhar').onclick = async () => {
        const txt = `🎶 ${f.titulo}${f.hz ? ' (' + f.hz + ')' : ''}\n\n✨ Para que serve: ${f.para || ''}\n\n🧘 Como fazer: ${f.como || ''}\n\n⏱️ Quanto tempo: ${f.tempo || ''}${f.link ? '\n\n🔊 Ouvir: ' + f.link : ''}\n\n${AVISO}`;
        try { if (navigator.share) await navigator.share({ title: f.titulo, text: txt }); else { await navigator.clipboard.writeText(txt); ctx.toast('Texto copiado. Cola na mensagem.'); } }
        catch(e){ if (!e || e.name !== 'AbortError'){ try { await navigator.clipboard.writeText(txt); ctx.toast('Texto copiado. Cola na mensagem.'); } catch(_){ ctx.toast('Não consegui partilhar.', true); } } }
      };
    });
    const g = main.querySelector('#fq-guardar');
    if (g){
      const atual = novo || lista.find(x => x.id === editarId);
      main.querySelector('#fq-cancelar').onclick = () => { novo = null; editarId = null; desenhar(); };
      const ap = main.querySelector('#fq-apagar');
      if (ap) ap.onclick = async () => {
        if (!await ctx.confirmar('Apagar frequência', 'Apagar "' + atual.titulo + '"?')) return;
        try { await guardar(lista.filter(x => x.id !== atual.id)); editarId = null; aberto = null; ctx.toast('Apagada.'); desenhar(); } catch(e){ ctx.toast('Não consegui apagar: ' + (e.message || e), true); }
      };
      g.onclick = async () => {
        const v = id => main.querySelector(id).value.trim();
        const item = { id: atual.id, titulo: v('#fq-t').slice(0, 80), hz: v('#fq-h').slice(0, 20), link: v('#fq-l'), para: v('#fq-p').slice(0, 600), como: v('#fq-c').slice(0, 800), tempo: v('#fq-d').slice(0, 60) };
        if (!item.titulo){ ctx.toast('Escreve o título.', true); return; }
        if (item.link && !linkParaPlayer(item.link)){ ctx.toast('O link tem de começar por https://. Confirma-o.', true); return; }
        const nova = novo ? lista.concat([item]) : lista.map(x => x.id === item.id ? item : x);
        g.disabled = true;
        try { await guardar(nova); novo = null; editarId = null; ctx.toast('Guardado ✓'); desenhar(); }
        catch(e){ g.disabled = false; ctx.toast('Não consegui guardar: ' + (e.message || e), true); }
      };
    }
  }
  desenhar();
}
