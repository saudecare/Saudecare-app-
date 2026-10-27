/* Frequências — músicas de frequência (Solfeggio, 432 Hz…) com descrição, para que serve, como fazer e tempo.
   Ferramenta exclusiva da Hikari Fafe (tenant hikari-terapias). O áudio vem de um link (Google Drive ou outro site):
   cola-se o link, a pessoa carrega em «Ouvir». Guarda no documento da conta, por isso não precisa de regras novas. */
export const TENANT_FREQ = 'hikari-terapias';

const AVISO = 'Prática de relaxamento e bem-estar. Não substitui acompanhamento médico.';
const BASE = [
  { id: 'f396', hz: '396 Hz', titulo: 'Solfeggio 396 Hz',
    para: 'Nas tradições vibracionais é associada a libertar medos, culpa e bloqueios, e a sentir mais segurança e confiança.',
    como: 'Põe auscultadores, senta-te ou deita-te confortavelmente e fecha os olhos. Respira devagar. Se te vierem pensamentos, deixa-os passar e volta à respiração. Mantém o volume baixo e agradável.',
    tempo: '10 a 15 minutos', link: 'https://zenmix.io/mix/Hushed%20Glacier--29a20' },
  { id: 'f432', hz: '432 Hz', titulo: 'Música a 432 Hz',
    para: 'Associada à harmonia, à calma e ao equilíbrio. Muita gente usa-a para relaxar, meditar e acalmar a mente ao fim do dia.',
    como: 'Ouve num sítio calmo, sem interrupções. Podes ficar a olhar para uma vela ou fechar os olhos. Acompanha a música com respirações lentas e profundas.',
    tempo: '15 a 30 minutos' },
  { id: 'f528', hz: '528 Hz', titulo: 'Solfeggio 528 Hz',
    para: 'Conhecida como a frequência do amor e da transformação. Associada ao bem-estar, à alegria e à reconexão com a nossa energia.',
    como: 'Ouve com auscultadores, de olhos fechados, com uma mão no coração. Imagina uma luz verde ou dourada a encher o peito a cada respiração.',
    tempo: '10 a 20 minutos' },
  { id: 'f741', hz: '741 Hz', titulo: 'Solfeggio 741 Hz',
    para: 'Associada à limpeza, à clareza e à expressão. Usa-se para sentir a mente mais leve e arrumada.',
    como: 'Ouve com a coluna direita e os ombros soltos. A cada expiração, imagina que largas o que já não precisas. Bebe um copo de água no fim.',
    tempo: '10 a 15 minutos' },
  { id: 'f852', hz: '852 Hz', titulo: 'Solfeggio 852 Hz',
    para: 'Associada à intuição, ao silêncio interior e à ligação espiritual. Boa para meditar e acalmar o ruído mental.',
    como: 'Ouve em silêncio, de olhos fechados, com atenção na zona entre as sobrancelhas. Não precisas de fazer nada, só de estar presente.',
    tempo: '15 a 20 minutos' }
];

export function linkParaPlayer(url){
  const u = String(url || '').trim();
  if (!/^https:\/\//i.test(u)) return null;
  const d = u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^#]*&)?id=)([\w-]{15,})/i);
  if (d) return { tipo: 'drive', src: 'https://drive.google.com/file/d/' + d[1] + '/preview' };
  if (/\.(mp3|m4a|wav|ogg|aac)(\?|#|$)/i.test(u)) return { tipo: 'audio', src: u };
  const y = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/i);
  if (y) return { tipo: 'youtube', src: 'https://www.youtube-nocookie.com/embed/' + y[1] + '?rel=0' };
  return { tipo: 'site', src: u }; // qualquer outro site: abre noutra janela
}

export function renderFrequencias(main, ctx){
  if (ctx.tenantId !== TENANT_FREQ){
    main.innerHTML = '<div class="card"><h2>🔒 Ferramenta indisponível</h2><p class="muted">Esta ferramenta é exclusiva de uma conta específica e não está disponível na sua subscrição.</p></div>';
    return;
  }
  const esc = ctx.escapeHtml;
  let lista = ctx.get(); if (!lista.length) lista = BASE.map(x => Object.assign({ link: '' }, x));
  let editarId = null;

  const guardar = async nova => { await ctx.save(nova); lista = nova; };

  function cartao(f){
    const pl = linkParaPlayer(f.link);
    return `<div class="card" data-f="${esc(f.id)}" style="margin-bottom:12px;">
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

  function editor(f){
    return `<div class="card" style="border:2px solid var(--primary);margin-bottom:12px;">
      <h3>✏️ ${f._novo ? 'Nova frequência' : 'Editar frequência'}</h3>
      <label class="muted" for="fq-t">Título</label><input type="text" id="fq-t" value="${esc(f.titulo)}" placeholder="Ex.: Solfeggio 528 Hz" style="margin:4px 0 8px;">
      <label class="muted" for="fq-h">Frequência</label><input type="text" id="fq-h" value="${esc(f.hz)}" placeholder="Ex.: 528 Hz" style="margin:4px 0 8px;">
      <label class="muted" for="fq-l">Link da música (Google Drive, YouTube, mp3 ou outro site)</label><input type="url" id="fq-l" value="${esc(f.link)}" placeholder="https://drive.google.com/file/d/…" style="margin:4px 0 4px;">
      <p class="muted" style="font-size:.8rem;margin:0 0 8px;">No Drive: abre o ficheiro, toca em Partilhar e escolhe «Qualquer pessoa com o link», depois copia o link.</p>
      <label class="muted" for="fq-p">Para que serve</label><textarea id="fq-p" rows="3" style="margin:4px 0 8px;">${esc(f.para)}</textarea>
      <label class="muted" for="fq-c">Como fazer</label><textarea id="fq-c" rows="3" style="margin:4px 0 8px;">${esc(f.como)}</textarea>
      <label class="muted" for="fq-d">Quanto tempo</label><input type="text" id="fq-d" value="${esc(f.tempo)}" placeholder="Ex.: 10 a 15 minutos" style="margin:4px 0 10px;">
      <div class="row" style="gap:8px;flex-wrap:wrap;">
        <button class="primary" id="fq-guardar">Guardar</button><button class="ghost" id="fq-cancelar">Cancelar</button>
        ${f._novo ? '' : '<button class="ghost" id="fq-apagar">🗑️ Apagar</button>'}
      </div></div>`;
  }

  let novo = null;
  function desenhar(){
    main.innerHTML = `<h2>🎶 Frequências</h2>
      <p class="muted">Músicas de frequência para relaxar e meditar. Carrega em «Ouvir» e segue as indicações de cada uma.</p>
      <div class="row" style="margin-bottom:12px;"><button class="primary" id="fq-novo">+ Nova frequência</button></div>
      <div id="fq-lista">${novo ? editor(novo) : ''}${lista.map(f => f.id === editarId ? editor(f) : cartao(f)).join('')}</div>`;
    main.querySelector('#fq-novo').onclick = () => { editarId = null; novo = { id: 'f' + Date.now().toString(36), hz: '', titulo: '', link: '', para: '', como: '', tempo: '', _novo: true }; desenhar(); window.scrollTo(0, 0); };
    main.querySelectorAll('[data-f]').forEach(c => {
      const f = lista.find(x => x.id === c.dataset.f); if (!f) return;
      const o = c.querySelector('.fq-ouvir');
      if (o) o.onclick = () => {
        const pl = linkParaPlayer(f.link), pa = c.querySelector('.fq-palco'); if (!pl) return;
        if (pl.tipo === 'site'){ window.open(pl.src, '_blank', 'noopener'); return; }
        if (pl.tipo === 'audio') pa.innerHTML = `<audio controls preload="none" src="${esc(pl.src)}" style="width:100%"></audio>`;
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
        try { await guardar(lista.filter(x => x.id !== atual.id)); editarId = null; ctx.toast('Apagada.'); desenhar(); } catch(e){ ctx.toast('Não consegui apagar: ' + (e.message || e), true); }
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
