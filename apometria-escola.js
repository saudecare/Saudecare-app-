/* 🌀 Apometria — aprender, treinar e guardar os teus próprios comandos. Exclusivo da Hikari Fafe.
   Os textos são de raiz. Os «comandos» da tua formação escreves tu aqui: ficam só na tua conta. */
import { CORPOS, LICOES, TECNICAS, PROCEDIMENTO } from './apometria-dados.js';

export function renderApometria(main, ctx) {
  if (ctx.tenantId !== 'hikari-terapias') { main.innerHTML = '<div class="card"><h2>🔒 Ferramenta indisponível</h2><p class="muted">Esta ferramenta é exclusiva de uma conta específica.</p></div>'; return; }
  const esc = ctx.escapeHtml;
  let aba = 'procedimento'; let meus = {}; let sujo = false;
  const ABAS = [['procedimento', '🧭 Procedimento'], ['aprender', '📖 Aprender'], ['tecnicas', '🧰 Técnicas'], ['comandos', '✍️ Os meus comandos'], ['contador', '🔢 Contador']];
  const paragrafos = (t) => String(t).split('\n\n').map((p) => `<p style="margin:0 0 .7em;">${esc(p).replace(/\n/g, '<br>')}</p>`).join('');

  function ver() {
    main.innerHTML = `<h2 style="margin:0 0 4px;">🌀 Apometria</h2><p class="muted" style="margin:0 0 10px;">Aprende, treina e guarda os teus próprios comandos. Para usar numa sessão, abre o 🧭 Atendimento Guiado.</p>
      <div style="display:flex;gap:6px;overflow-x:auto;margin-bottom:12px;">${ABAS.map(([id, t]) => `<button data-aba="${id}" class="${aba === id ? 'primary' : 'ghost'}" style="white-space:nowrap;">${t}</button>`).join('')}</div><div id="ap-c"></div>`;
    main.querySelectorAll('[data-aba]').forEach((b) => b.onclick = () => { aba = b.dataset.aba; ver(); });
    const c = main.querySelector('#ap-c');
    if (aba === 'procedimento') c.innerHTML = procedimento();
    else if (aba === 'aprender') c.innerHTML = aprender();
    else if (aba === 'tecnicas') c.innerHTML = tecnicas();
    else if (aba === 'comandos') { c.innerHTML = comandos(); ligarComandos(c); }
    else { c.innerHTML = contador(); ligarContador(c); }
  }
  const rt = (s) => esc(String(s).split('[NOME]').join('(nome da pessoa)')).split('\n').map((l) => l.startsWith('🗣️') ? `<div style="margin:3px 0;padding:6px 8px;background:#eef4ff;border-left:3px solid #1e3a5f;border-radius:6px;font-style:italic;">${l}</div>` : `<div style="margin:2px 0;">${l}</div>`).join('');
  const procedimento = () => { const tot = PROCEDIMENTO.reduce((a, p) => a + p.min, 0); return `<div class="card" style="margin-bottom:10px;background:#eef6ff;"><b>O procedimento certo, passo a passo</b><div class="muted" style="font-size:.85rem;margin-top:4px;">São ${PROCEDIMENTO.length} fases, por esta ordem, com cerca de ${Math.round(tot / 5) * 5} minutos no total (uma sessão completa). Numa 1.ª consulta ou com pessoas sensíveis, faz só as fases 1 a 4, 6, 9, 10 e 11. Para trabalhar com a pessoa à frente, abre o 🧭 Atendimento Guiado.</div></div>` + PROCEDIMENTO.map((p) => `<details class="card" style="margin-bottom:8px;" ${p.n === 1 ? 'open' : ''}><summary style="cursor:pointer;font-weight:700;min-height:42px;display:flex;align-items:center;gap:8px;"><span style="background:#1e3a5f;color:#fff;border-radius:50%;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">${p.n}</span><span>${esc(p.titulo)}<br><span class="muted" style="font-size:.75rem;font-weight:400;">${esc(p.fase)} · ${p.min} min</span></span></summary>
      <div style="margin-top:8px;font-size:.92rem;"><b>🎯 Objetivo:</b> ${esc(p.objetivo)}<ol style="margin:8px 0 0 18px;">${p.fazer.map((f) => `<li style="margin-bottom:8px;">${rt(f)}</li>`).join('')}</ol>
      ${p.cuidado ? `<div style="color:#b45309;margin-top:6px;">⚠️ ${esc(p.cuidado)}</div>` : ''}${p.dist ? `<div style="color:#0369a1;margin-top:6px;">📡 À distância: ${esc(p.dist)}</div>` : ''}
      ${meus[p.tec] ? `<div style="background:#f3f6fa;border-radius:10px;padding:10px;margin-top:8px;"><b>✍️ O teu comando (${esc((TECNICAS.find((t) => t.id === p.tec) || {}).nome || '')})</b><div style="white-space:pre-wrap;font-size:.85rem;margin-top:4px;max-height:220px;overflow:auto;">${esc(meus[p.tec])}</div></div>` : ''}</div></details>`).join(''); };
  const aprender = () => LICOES.map((l, i) => `<details class="card" style="margin-bottom:8px;" ${i === 0 ? 'open' : ''}><summary style="cursor:pointer;font-weight:700;font-size:1.02rem;min-height:40px;display:flex;align-items:center;">${l.emoji} ${esc(l.titulo)}</summary><div style="margin-top:8px;">${paragrafos(l.texto)}</div></details>`).join('')
    + `<div class="card"><b>🧍 Os 7 corpos num relance</b>${CORPOS.map((c) => `<div style="margin-top:6px;font-size:.9rem;">${c.emoji} <b>${esc(c.nome)}</b><br><span class="muted">${esc(c.sobre)}</span></div>`).join('')}</div>`;
  const tecnicas = () => TECNICAS.map((t) => `<details class="card" style="margin-bottom:8px;"><summary style="cursor:pointer;font-weight:700;min-height:40px;display:flex;align-items:center;">${t.nome} <span class="muted" style="font-size:.78rem;margin-left:8px;">${esc(t.dur)}</span></summary>
    ${t.nota ? `<div style="color:#b45309;font-size:.85rem;margin:6px 0;">⚠️ ${esc(t.nota)}</div>` : ''}<ol style="margin:8px 0 0 18px;">${t.passos.map((p) => `<li style="margin-bottom:8px;">${rt(p)}</li>`).join('')}</ol>${meus[t.id] ? `<div class="card" style="background:#f3f6fa;margin-top:8px;"><b>✍️ O teu comando</b><div style="white-space:pre-wrap;font-size:.9rem;margin-top:4px;">${esc(meus[t.id])}</div></div>` : ''}</details>`).join('');
  const comandos = () => `<p class="muted" style="margin:0 0 8px;">Escreve aqui, nas tuas palavras ou como aprendeste na tua formação, o que dizes em cada técnica. Fica só na tua conta e aparece no Atendimento Guiado, no momento certo.</p>`
    + TECNICAS.map((t) => `<div class="card" style="margin-bottom:8px;"><b>${t.nome}</b><textarea data-cmd="${t.id}" rows="3" placeholder="O teu comando para esta técnica…" style="width:100%;margin-top:6px;">${esc(meus[t.id] || '')}</textarea></div>`).join('')
    + `<div class="card" style="background:#eef6ff;margin-top:8px;"><b>⚡ Importar os comandos da formação em 3 toques</b><ol style="margin:6px 0 8px 18px;font-size:.9rem;"><li>Abre o ficheiro «meus-comandos-apometria.txt» e copia tudo.</li><li>Volta aqui e toca em «Importar o que copiei».</li><li>Toca em «Guardar os meus comandos».</li></ol><button class="primary" id="ap-clip" style="width:100%;">📋 Importar o que copiei</button></div>
    <button class="primary" id="ap-gravar" style="width:100%;margin-top:6px;">💾 Guardar os meus comandos</button>
    <details class="card" style="margin-top:12px;"><summary style="cursor:pointer;font-weight:700;">📥 Importar de um texto</summary><p class="muted" style="font-size:.85rem;margin:6px 0;">Cola aqui um texto em que cada técnica começa por uma linha <b>### nome</b> (por exemplo ### preparar). Os comandos entram nas caixas acima; depois carrega em Guardar.</p><textarea id="ap-imp" rows="6" style="width:100%"></textarea><button class="ghost" id="ap-imp-b" style="margin-top:6px;">Importar</button></details>`;
  function ligarComandos(c) {
    c.querySelectorAll('[data-cmd]').forEach((t) => t.oninput = () => { meus[t.dataset.cmd] = t.value; sujo = true; });
    const importar = (txt) => { const ids = TECNICAS.map((t) => t.id); let n = 0;
      txt.split(/^###\s*/m).slice(1).forEach((bloco) => { const nl = bloco.indexOf('\n'); const id = bloco.slice(0, nl < 0 ? undefined : nl).trim().split(/\s+/)[0]; const corpo = nl < 0 ? '' : bloco.slice(nl + 1).trim(); if (ids.includes(id) && corpo) { meus[id] = corpo; n++; } });
      if (!n) return ctx.toast('Não encontrei nenhuma técnica. Cada bloco tem de começar por ### nome.', true);
      sujo = true; ctx.toast(n + ' técnicas importadas. Confirma e carrega em Guardar.'); aba = 'comandos'; ver();
    };
    c.querySelector('#ap-imp-b').onclick = () => importar(c.querySelector('#ap-imp').value);
    c.querySelector('#ap-clip').onclick = async () => { try { importar(await navigator.clipboard.readText()); } catch (_) { ctx.toast('Não consegui ler o que copiaste. Usa a caixa «Importar de um texto» e cola lá.', true); } };
    c.querySelector('#ap-gravar').onclick = async () => { try { await ctx.gravarMeus(meus); sujo = false; ctx.toast('Guardado. ✅'); } catch (e) { ctx.toast('Não consegui guardar: ' + (e.message || e), true); } };
  }
  const contador = () => `<div class="card" style="text-align:center;"><p class="muted" style="margin:0 0 8px;">Conta os «impulsos» de um comando. Toca no botão grande a cada repetição.</p>
    <div>Repetir <select id="ct-n" style="font-size:1.1rem;"><option>3</option><option>5</option><option selected>7</option><option>9</option><option>12</option></select> vezes</div>
    <div id="ct-v" style="font-size:5rem;font-weight:800;color:#1e3a5f;margin:6px 0;">0</div><div id="ct-m" class="muted" style="min-height:1.4em;"></div>
    <button id="ct-b" class="primary" style="width:100%;min-height:90px;font-size:1.4rem;margin-top:8px;">＋ Impulso</button><button id="ct-z" class="ghost" style="margin-top:8px;">↺ Zerar</button></div>`;
  function ligarContador(c) {
    let n = 0; const v = c.querySelector('#ct-v'), m = c.querySelector('#ct-m'), sel = c.querySelector('#ct-n');
    const pinta = () => { v.textContent = n; const alvo = +sel.value; m.textContent = n >= alvo ? '✅ Completo. Está feito.' : `Faltam ${alvo - n}`; };
    c.querySelector('#ct-b').onclick = () => { n++; try { navigator.vibrate && navigator.vibrate(n >= +sel.value ? [80, 60, 80] : 30); } catch (_) {} pinta(); };
    c.querySelector('#ct-z').onclick = () => { n = 0; pinta(); }; sel.onchange = pinta;
  }
  (async () => { try { meus = (await ctx.carregarMeus()) || {}; } catch (_) {} ver(); })();
}
