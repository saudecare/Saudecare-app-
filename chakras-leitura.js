// Leitura energética dos 7 chakras a partir do "Reiki — Questionário dos 7 Chakras".
// Orientativa: indica onde vale a pena trabalhar. NÃO é diagnóstico médico.
(function(){
  const CH = [
    { k:'Chakra Raiz', nome:'Raiz (Muladhara)', emoji:'🔴', glandula:'suprarrenais', orgaos:'base da coluna, ossos, pernas e pés, intestino grosso e reto',
      reflexo:'Insegurança, medo constante, ansiedade com dinheiro, casa ou mudanças; sensação de não ter chão. No corpo, é comum cansaço, tensão nas pernas e na zona lombar baixa, e alterações do intestino.',
      eventos:'Dificuldades financeiras, perda de emprego ou de casa, mudanças bruscas, infância instável, doença ou perda na família.',
      perguntas:['Em que área da vida sente menos segurança neste momento?','Houve alguma mudança ou perda que lhe tirou o chão?','Sente-se presente no seu corpo ou "desligado(a)"?'] },
    { k:'Chakra Sacral', nome:'Sacral (Svadhisthana)', emoji:'🟠', glandula:'gónadas (ovários e testículos)', orgaos:'órgãos reprodutores, bexiga, rins, baixo ventre e região lombar',
      reflexo:'Bloqueio criativo, culpa ligada ao prazer, emoções reprimidas ou muito oscilantes, dificuldade na intimidade. No corpo, pode surgir desconforto no baixo ventre e na zona lombar.',
      eventos:'Términos, relações difíceis, experiências de vergonha ou de repressão emocional, perdas ligadas à fertilidade ou à intimidade.',
      perguntas:['Permite-se sentir prazer e criar sem se julgar?','Há emoções que guarda e não deixa sair?','Como está a sua relação com a intimidade?'] },
    { k:'Chakra Plexo Solar', nome:'Plexo Solar (Manipura)', emoji:'🟡', glandula:'pâncreas', orgaos:'estômago, fígado, vesícula biliar, baço e intestino delgado',
      reflexo:'Baixa autoestima, dificuldade em dizer "não", necessidade de controlo, raiva guardada. No corpo, é frequente sentir o estômago "apertado", digestão sensível e tensão no meio das costas.',
      eventos:'Críticas ou humilhações, ambientes de trabalho exigentes, dificuldade em impor limites, momentos em que se calou ou cedeu.',
      perguntas:['Em que situações lhe custa dizer "não"?','Sente que decide por si ou pelos outros?','Onde sente a tensão quando está sob pressão?'] },
    { k:'Chakra Cardíaco', nome:'Cardíaco (Anahata)', emoji:'💚', glandula:'timo', orgaos:'coração, pulmões, sistema circulatório, peito, braços e mãos',
      reflexo:'Mágoa por resolver, dificuldade em dar ou receber afeto, ciúme, isolamento emocional. No corpo, pode sentir peso ou aperto no peito, respiração curta e tensão nos ombros.',
      eventos:'Luto, separações, traições, relações desgastantes, falta de afeto na infância, dificuldade em perdoar.',
      perguntas:['Há alguma mágoa que ainda carrega?','Consegue receber carinho com facilidade?','Quem lhe faz falta neste momento?'] },
    { k:'Chakra Laríngeo', nome:'Laríngeo (Vishuddha)', emoji:'🔵', glandula:'tiroide e paratiroides', orgaos:'garganta, cordas vocais, pescoço, boca, dentes e ouvidos',
      reflexo:'Dificuldade em dizer o que sente, medo de julgamento, voz "presa", evasão. No corpo, é comum sentir nó na garganta, tensão no pescoço e na mandíbula, ou rouquidão sem causa.',
      eventos:'Ter sido calado(a) ou desvalorizado(a) ao falar, falar em público com medo, segredos guardados, conflitos que não conseguiu expressar.',
      perguntas:['O que gostaria de dizer e não diz?','Com quem é mais difícil ser sincero(a)?','Sente que é ouvido(a)?'] },
    { k:'Chakra Frontal', nome:'Frontal / Terceiro Olho (Ajna)', emoji:'🟣', glandula:'hipófise (pituitária)', orgaos:'cérebro, olhos, nariz, seios nasais e sistema nervoso',
      reflexo:'Confusão mental, pensamento excessivo, dificuldade em decidir, desconfiança da própria intuição. No corpo, podem surgir dores de cabeça, cansaço visual e sono agitado.',
      eventos:'Períodos de stress mental prolongado, decisões importantes, excesso de informação, ter sido desencorajado(a) a confiar em si.',
      perguntas:['Que decisão está a adiar?','Confia na sua intuição? Quando foi a última vez que a seguiu?','Consegue desligar a mente ao fim do dia?'] },
    { k:'Chakra Coronário', nome:'Coronário (Sahasrara)', emoji:'⚪', glandula:'pineal (epífise)', orgaos:'topo da cabeça, córtex cerebral e sistema nervoso central',
      reflexo:'Sensação de vazio, falta de sentido ou de propósito, desconexão espiritual, isolamento. No corpo, é comum cansaço profundo, sensibilidade a estímulos e dificuldade em descansar.',
      eventos:'Crises de sentido, perda de fé, luto profundo, mudanças de fase de vida, sentir-se sem rumo mesmo com a vida material resolvida.',
      perguntas:['O que dá sentido aos seus dias?','Sente ligação a algo maior do que si?','Quando se sentiu em paz pela última vez?'] }
  ];
  const OPC = [0, 1, 0.5, null]; // peso da escolha: equilibrado, bloqueio, às vezes, não sei
  function calc(respostas){
    const res = [];
    CH.forEach(c => {
      let esc = null, opc = null;
      (respostas || []).forEach(a => {
        const lab = String(a.label || a.q || '');
        if (!lab.startsWith(c.k)) return;
        const v = String(a.value ?? a.resposta ?? '').trim();
        if (v === '') return;
        if (/Quanto esta área/i.test(lab)) { const n = parseFloat(v); if (!isNaN(n)) esc = Math.max(0, Math.min(10, n)); }
        else {
          const t = v.toLowerCase();
          if (/^sim/.test(t)) opc = 0; else if (/^n[ãa]o sei/.test(t)) opc = null; else if (/^n[ãa]o/.test(t)) opc = 1; else if (/vezes|depende/.test(t)) opc = 0.5;
          else if (/aberto|dar e receber|dar\/receber/.test(t)) opc = 0; else if (/m[áa]goa|bloqueio/.test(t)) opc = 1;
        }
      });
      if (esc === null && opc === null) { res.push({ c, score: null }); return; }
      const partes = []; if (opc !== null) partes.push(opc * 10); if (esc !== null) partes.push(esc);
      res.push({ c, score: Math.round(partes.reduce((a, b) => a + b, 0) / partes.length * 10) / 10 });
    });
    return res;
  }
  const nivel = s => s === null ? ['Sem dados', '#94a3b8'] : s >= 6.5 ? ['Muito afetado', '#dc2626'] : s >= 3.5 ? ['Merece atenção', '#d97706'] : ['Equilibrado', '#16a34a'];
  const esc = s => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const AVISO = 'Leitura energética orientativa, com base nas respostas dadas. Não é um diagnóstico e não substitui a avaliação médica. Perante sintomas, consulte o seu médico.';

  window.chakraTemLeitura = respostas => calc(respostas).some(x => x.score !== null);

  window.chakraLeituraHtml = function(respostas){
    const r = calc(respostas);
    if (!r.some(x => x.score !== null)) return '';
    const ord = r.slice().sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
    const barras = ord.map(x => { const [n, cor] = nivel(x.score); return `<div style="margin:6px 0;font-size:.85rem;"><div style="display:flex;justify-content:space-between;"><span>${x.c.emoji} ${esc(x.c.nome)}</span><b style="color:${cor};">${x.score === null ? '—' : x.score + '/10'} · ${n}</b></div><div style="background:#e2e8f0;border-radius:6px;height:8px;"><div style="width:${(x.score || 0) * 10}%;background:${cor};height:8px;border-radius:6px;"></div></div></div>`; }).join('');
    const foco = ord.filter(x => x.score !== null && x.score >= 3.5);
    const cartoes = foco.map(x => { const [n, cor] = nivel(x.score); const c = x.c; return `<details style="margin-top:8px;border:1px solid #e2e8f0;border-radius:10px;padding:10px;background:#fff;"><summary style="cursor:pointer;font-weight:700;">${c.emoji} ${esc(c.nome)} — <span style="color:${cor};">${n} (${x.score}/10)</span></summary>
      <div style="font-size:.88rem;margin-top:8px;line-height:1.5;">
        <p><b>Área a observar:</b> glândula ${esc(c.glandula)}; ${esc(c.orgaos)}.</p>
        <p><b>Como se pode refletir na pessoa:</b> ${esc(c.reflexo)}</p>
        <p><b>Acontecimentos que costumam estar na origem:</b> ${esc(c.eventos)}</p>
        <p style="margin-bottom:2px;"><b>Perguntas para a consulta:</b></p><ul style="margin:0 0 0 18px;">${c.perguntas.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
      </div></details>`; }).join('');
    return `<div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:12px;padding:14px;margin-bottom:12px;">
      <div style="font-weight:800;color:#6b21a8;margin-bottom:6px;">🌈 Leitura energética dos chakras (automática)</div>
      ${barras}
      ${foco.length ? `<div style="font-weight:700;margin-top:12px;">Onde vale a pena trabalhar</div>${cartoes}` : '<p style="margin-top:10px;">Nenhum chakra com indicação forte. 🌿</p>'}
      <p class="muted" style="font-size:.78rem;margin-top:10px;">⚠️ ${AVISO}</p>
      <button class="ghost" style="width:100%;margin-top:8px;" onclick="chakraCopiarPaciente()">📋 Copiar texto para o paciente</button>
    </div>`;
  };

  window.chakraTextoPaciente = function(respostas){
    const r = calc(respostas).filter(x => x.score !== null).sort((a, b) => b.score - a.score);
    const foco = r.filter(x => x.score >= 3.5);
    let t = '🌈 A sua leitura energética dos 7 chakras\n\n';
    t += r.map(x => `${x.c.emoji} ${x.c.nome}: ${x.score}/10 — ${nivel(x.score)[0]}`).join('\n') + '\n\n';
    if (foco.length) {
      t += 'Onde vale a pena dar atenção:\n';
      foco.forEach(x => { t += `\n${x.c.emoji} ${x.c.nome}\n${x.c.reflexo}\n`; });
    } else t += 'As suas respostas não indicam nenhuma área com desequilíbrio forte. 🌿\n';
    t += '\n' + AVISO;
    return t;
  };
})();
