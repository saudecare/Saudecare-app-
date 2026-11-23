// Reflexologia podal — registo da consulta (pés direito e esquerdo), relatório automático editável e guardado na ficha.
// Zonas gerais, descritas com palavras próprias. Leitura orientativa e complementar. Não é diagnóstico médico.
(function(){
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
  const $ = id => document.getElementById(id);
  const hoje = () => new Date().toLocaleDateString('pt-PT');
  const AVISO = 'Registo e leitura orientativos, de uma terapia complementar. Não é um diagnóstico nem substitui o acompanhamento médico.';

  // Estados de cada zona
  const ESTADOS = [['ok','Normal','#16a34a'],['sens','Sensível','#ca8a04'],['dor','Dor','#dc2626'],['nod','Nódulo / grânulos','#7c3aed'],['ten','Tensão / dureza','#ea580c']];
  const NOME_ESTADO = { sens:'sensível', dor:'dor', nod:'nódulos ou grânulos', ten:'tensão ou dureza' };

  // Zonas: id, nome, onde (no pé), sistema, lado ('D','E' ou 'A' = ambos), chakra e tema (ligação à linguagem do resto da app)
  const ZONAS = [
    { id:'cabeca', nome:'Cabeça e cérebro', onde:'Ponta do dedo grande', sist:'Nervoso', lado:'A', chakra:'Terceiro Olho', tema:'pensamento, preocupação e excesso de mente' },
    { id:'seios', nome:'Seios nasais e zona da cabeça', onde:'Pontas dos outros dedos', sist:'Respiratório', lado:'A', chakra:'Terceiro Olho', tema:'tensão na cabeça e vias respiratórias' },
    { id:'pescoco', nome:'Pescoço e garganta', onde:'Base do dedo grande', sist:'Cervical', lado:'A', chakra:'Garganta', tema:'o que não se diz e a expressão' },
    { id:'olhos', nome:'Olhos e ouvidos', onde:'Base dos dedos 2 a 5', sist:'Sentidos', lado:'A', chakra:'Terceiro Olho', tema:'ver e ouvir o que se vive' },
    { id:'tiroide', nome:'Tiroide', onde:'Almofada sob o dedo grande', sist:'Endócrino', lado:'A', chakra:'Garganta', tema:'ritmo, energia e vontade de se expressar' },
    { id:'ombros', nome:'Ombros e trapézio', onde:'Faixa sob os dedos pequenos', sist:'Músculo-esquelético', lado:'A', chakra:'Coração', tema:'responsabilidades e cargas assumidas' },
    { id:'pulmoes', nome:'Pulmões e peito', onde:'Almofada da frente do pé', sist:'Respiratório', lado:'A', chakra:'Coração', tema:'tristeza, luto e respiração presa' },
    { id:'coracao', nome:'Coração', onde:'Almofada do pé esquerdo', sist:'Circulatório', lado:'E', chakra:'Coração', tema:'afetos, mágoas e abertura' },
    { id:'figado', nome:'Fígado', onde:'Zona média do pé direito', sist:'Digestivo', lado:'D', chakra:'Plexo Solar', tema:'raiva e frustração guardadas' },
    { id:'vesicula', nome:'Vesícula biliar', onde:'Junto ao fígado, pé direito', sist:'Digestivo', lado:'D', chakra:'Plexo Solar', tema:'amargura e decisões difíceis' },
    { id:'estomago', nome:'Estômago', onde:'Arco interno, zona alta', sist:'Digestivo', lado:'A', chakra:'Plexo Solar', tema:'o que custa a digerir na vida' },
    { id:'pancreas', nome:'Pâncreas', onde:'Arco interno, zona média', sist:'Endócrino', lado:'A', chakra:'Plexo Solar', tema:'doçura da vida e controlo' },
    { id:'baco', nome:'Baço', onde:'Zona média do pé esquerdo', sist:'Imunitário', lado:'E', chakra:'Plexo Solar', tema:'preocupação e defesas' },
    { id:'suprarrenais', nome:'Supra-renais', onde:'Acima do arco, lado interno', sist:'Endócrino', lado:'A', chakra:'Plexo Solar', tema:'stress, alerta e esgotamento' },
    { id:'rins', nome:'Rins', onde:'Centro do arco do pé', sist:'Urinário', lado:'A', chakra:'Sacro', tema:'medo e insegurança' },
    { id:'bexiga', nome:'Bexiga', onde:'Arco interno, zona baixa', sist:'Urinário', lado:'A', chakra:'Sacro', tema:'o que se retém e o que custa soltar' },
    { id:'intdelgado', nome:'Intestino delgado', onde:'Zona baixa do arco', sist:'Digestivo', lado:'A', chakra:'Plexo Solar', tema:'absorver o que nutre e deixar o resto' },
    { id:'colon', nome:'Cólon (intestino grosso)', onde:'Faixa baixa do arco, em U', sist:'Digestivo', lado:'A', chakra:'Raiz', tema:'soltar e deixar ir' },
    { id:'coluna', nome:'Coluna vertebral', onde:'Todo o bordo interno do pé', sist:'Músculo-esquelético', lado:'A', chakra:'Raiz', tema:'apoio, sustento e firmeza' },
    { id:'pelvis', nome:'Pélvis e órgãos reprodutores', onde:'Calcanhar e à volta do tornozelo', sist:'Reprodutor', lado:'A', chakra:'Sacro', tema:'criatividade, relações e segurança' },
    { id:'ciatico', nome:'Zona do nervo ciático', onde:'Parte de trás do calcanhar', sist:'Nervoso', lado:'A', chakra:'Raiz', tema:'bloqueio de avançar e pressão' },
    { id:'joelho', nome:'Joelho e anca', onde:'Bordo externo do pé', sist:'Músculo-esquelético', lado:'A', chakra:'Raiz', tema:'flexibilidade e mudança' }
  ];

  const OBS_PELE = ['Pele seca ou gretada','Calosidades','Pé frio','Pé quente ou suado','Inchaço ligeiro','Joanetes','Dedos em martelo','Unhas encravadas ou frágeis','Micose ou fungos','Arco muito alto','Pé chato'];
  const CONTRA = ['Feridas abertas ou infeção nos pés','Suspeita de trombose ou flebite','Febre ou doença aguda','Diabetes com perda de sensibilidade nos pés','Gravidez (usar pressão suave e evitar zonas pélvicas)','Cirurgia ou fratura recente no pé ou perna'];
  const TECNICAS = ['Relaxamento do pé','Pressão com o polegar','Rotação do tornozelo','Drenagem suave','Trabalho nas zonas sensíveis','Finalização com contacto suave'];

  let S = null;
  const novo = (patientId, nome) => ({ patientId, nome, passo:1, motivo:'', queixas:'', contra:{}, obs:{ D:{}, E:{} }, obsTxt:'', zonas:{ D:{}, E:{} }, notasZ:{ D:'', E:'' }, tecnicas:{}, duracao:'', reacao:'', notas:'', recomend:'', secoes:null });

  function overlay(){
    let o = $('rpOverlay');
    if (!o){
      o = document.createElement('div'); o.className = 'patientOverlay'; o.id = 'rpOverlay'; o.style.zIndex = 2100;
      o.innerHTML = '<div class="patientOverlayHeader"><strong id="rpTitulo"></strong><button onclick="rpFechar()">✕</button></div><div class="patientOverlayBody" id="rpCorpo"></div>';
      document.body.appendChild(o);
    }
    return o;
  }
  window.rpFechar = function(){ $('rpOverlay')?.remove(); S = null; };
  window.rpAbrir = function(patientId, nome){ S = novo(patientId, nome); overlay(); render(); };

  const barra = () => `<div style="display:flex;gap:4px;margin-bottom:12px;">${[1,2,3,4].map(i => `<div style="flex:1;height:5px;border-radius:3px;background:${i <= S.passo ? 'var(--primary,#2f6f5e)' : '#e5e5e5'};"></div>`).join('')}</div>`;
  const nav = (v, s, txt) => `<div class="row" style="margin-top:14px;gap:8px;">${v ? '<button class="ghost" onclick="rpIr(-1)">← Anterior</button>' : ''}${s ? `<button class="primary" onclick="rpIr(1)">${txt || 'Seguinte →'}</button>` : ''}</div>`;

  function ler(){
    if (!S) return;
    if (S.passo === 1){ S.motivo = $('rpMotivo')?.value ?? S.motivo; S.queixas = $('rpQueixas')?.value ?? S.queixas; }
    if (S.passo === 2){ S.obsTxt = $('rpObsTxt')?.value ?? S.obsTxt; }
    if (S.passo === 3){ S.notasZ.D = $('rpNotaD')?.value ?? S.notasZ.D; S.notasZ.E = $('rpNotaE')?.value ?? S.notasZ.E; }
    if (S.passo === 4){ S.duracao = $('rpDur')?.value ?? S.duracao; S.reacao = $('rpReac')?.value ?? S.reacao; S.notas = $('rpNotas')?.value ?? S.notas; S.recomend = $('rpRec')?.value ?? S.recomend; }
  }
  window.rpIr = function(d){
    ler();
    S.passo = Math.max(1, Math.min(5, S.passo + d));
    if (S.passo === 5) S.secoes = gerar();
    render();
  };
  window.rpToggle = function(grupo, chave, lado){
    ler();
    if (lado){ S.obs[lado][chave] = !S.obs[lado][chave]; } else { S[grupo][chave] = !S[grupo][chave]; }
    render();
  };
  window.rpZona = function(lado, id, v){
    ler(); S.zonas[lado][id] = v; render();
  };

  // ── Passo 1
  function p1(){
    const alerta = Object.keys(S.contra).some(k => S.contra[k]);
    return `<div class="card"><h3 style="margin-top:0;">1. Motivo e cuidados</h3>
      <label>Motivo da consulta</label><input id="rpMotivo" value="${esc(S.motivo)}" placeholder="ex: cansaço, stress, dores de costas…">
      <label>Queixas, com as palavras da pessoa</label><textarea id="rpQueixas" rows="3" placeholder="O que sente, desde quando…">${esc(S.queixas)}</textarea>
      <label style="margin-top:10px;">Cuidados — marca se se aplicar</label>
      ${CONTRA.map((c, i) => `<label style="display:flex;gap:8px;align-items:flex-start;font-weight:400;margin:5px 0;font-size:.9rem;"><input type="checkbox" style="width:20px;height:20px;flex-shrink:0;margin-top:2px;" ${S.contra[i] ? 'checked' : ''} onchange="rpToggle('contra', ${i})"> <span>${esc(c)}</span></label>`).join('')}
      ${alerta ? '<div style="background:#fff7e6;border:1px solid #f0d9a8;border-radius:8px;padding:8px 10px;font-size:.85rem;">⚠️ Há cuidados marcados. Usa pressão muito suave, evita as zonas afetadas e, se for preciso, confirma primeiro com o médico.</div>' : ''}
    </div>${nav(false, true)}`;
  }

  // ── Passo 2
  function p2(){
    const bloco = (lado, t) => `<div style="margin-top:8px;"><b>${t}</b><div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">${OBS_PELE.map((o, i) => { const on = !!S.obs[lado][i]; return `<button type="button" class="${on ? 'primary' : 'ghost'}" style="width:auto;padding:5px 10px;font-size:.8rem;" onclick="rpToggle('obs', ${i}, '${lado}')">${esc(o)}</button>`; }).join('')}</div></div>`;
    return `<div class="card"><h3 style="margin-top:0;">2. Observação dos pés</h3>
      <p class="muted">Marca o que observas em cada pé.</p>${bloco('D', '🦶 Pé direito')}${bloco('E', '🦶 Pé esquerdo')}
      <label style="margin-top:10px;">Outras observações</label><textarea id="rpObsTxt" rows="2" placeholder="ex: assimetria, cor, temperatura…">${esc(S.obsTxt)}</textarea>
    </div>${nav(true, true)}`;
  }

  // ── Passo 3
  const zonasDoLado = l => ZONAS.filter(z => z.lado === 'A' || z.lado === l);
  function p3(){
    const bloco = (lado, titulo) => `<div class="card" style="margin-top:10px;"><h3 style="margin:0 0 4px;">🦶 ${titulo}</h3><p class="muted" style="font-size:.8rem;margin:0 0 6px;">Deixa em «Normal» o que não estiver alterado.</p>
      ${zonasDoLado(lado).map(z => `<div style="padding:8px 0;border-top:1px solid #eee;"><div style="font-weight:600;">${esc(z.nome)} <span class="muted" style="font-weight:400;font-size:.78rem;">· ${esc(z.onde)}</span></div>
        <div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:4px;">${ESTADOS.map(([v, t, cor]) => { const on = (S.zonas[lado][z.id] || 'ok') === v; return `<button type="button" onclick="rpZona('${lado}','${z.id}','${v}')" style="flex:1;min-width:64px;padding:6px 3px;border-radius:9px;border:2px solid ${cor};font-weight:700;font-size:11px;cursor:pointer;background:${on ? cor : '#fff'};color:${on ? '#fff' : cor};">${t}</button>`; }).join('')}</div></div>`).join('')}
      <label style="margin-top:8px;">Notas deste pé</label><textarea id="rpNota${lado}" rows="2">${esc(S.notasZ[lado])}</textarea></div>`;
    return `<div class="card"><h3 style="margin-top:0;">3. Zonas dos pés</h3><p class="muted">Regista o que encontras em cada zona, pé direito e pé esquerdo.</p></div>${bloco('D', 'Pé direito')}${bloco('E', 'Pé esquerdo')}${nav(true, true)}`;
  }

  // ── Passo 4
  function p4(){
    return `<div class="card"><h3 style="margin-top:0;">4. Sessão</h3>
      <label>O que fizeste</label>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 8px;">${TECNICAS.map((t, i) => `<button type="button" class="${S.tecnicas[i] ? 'primary' : 'ghost'}" style="width:auto;padding:5px 10px;font-size:.8rem;" onclick="rpToggle('tecnicas', ${i})">${esc(t)}</button>`).join('')}</div>
      <label>Duração (minutos)</label><input id="rpDur" type="number" inputmode="numeric" value="${esc(S.duracao)}" placeholder="ex: 45">
      <label>Reação durante a sessão</label><input id="rpReac" value="${esc(S.reacao)}" placeholder="ex: relaxou, bocejou, sentiu calor…">
      <label>Notas clínicas (só tuas)</label><textarea id="rpNotas" rows="3">${esc(S.notas)}</textarea>
      <label>Recomendações para a pessoa</label><textarea id="rpRec" rows="3" placeholder="ex: beber água, descansar, massajar os pés em casa…">${esc(S.recomend)}</textarea>
    </div>${nav(true, true, 'Gerar relatório →')}`;
  }

  // ── Relatório
  const alterados = lado => zonasDoLado(lado).filter(z => (S.zonas[lado][z.id] || 'ok') !== 'ok');
  function gerar(){
    const sec = [];
    const lis = lado => alterados(lado).map(z => `• ${z.nome} (${z.onde.charAt(0).toLowerCase() + z.onde.slice(1)}): ${NOME_ESTADO[S.zonas[lado][z.id]]}.`);
    const d = lis('D'), e = lis('E');
    const obsL = lado => OBS_PELE.filter((o, i) => S.obs[lado][i]);
    sec.push({ titulo:'Motivo da consulta', texto: (S.motivo || '—') + (S.queixas ? `\nO que a pessoa refere: ${S.queixas}` : '') });
    const cu = CONTRA.filter((c, i) => S.contra[i]);
    if (cu.length) sec.push({ titulo:'Cuidados tidos em conta', texto: cu.map(c => '• ' + c).join('\n') + '\nForam usadas pressões suaves e evitadas as zonas afetadas.' });
    const ob = []; if (obsL('D').length) ob.push('Pé direito: ' + obsL('D').join(', ').toLowerCase() + '.'); if (obsL('E').length) ob.push('Pé esquerdo: ' + obsL('E').join(', ').toLowerCase() + '.'); if (S.obsTxt) ob.push(S.obsTxt);
    sec.push({ titulo:'Observação dos pés', texto: ob.join('\n') || 'Sem alterações a registar.' });
    sec.push({ titulo:'Zonas encontradas — pé direito', texto: (d.length ? d.join('\n') : 'Sem alterações.') + (S.notasZ.D ? `\nNotas: ${S.notasZ.D}` : '') });
    sec.push({ titulo:'Zonas encontradas — pé esquerdo', texto: (e.length ? e.join('\n') : 'Sem alterações.') + (S.notasZ.E ? `\nNotas: ${S.notasZ.E}` : '') });
    // Leitura: agrupa por sistema e liga ao chakra e ao tema
    const todas = {}; ['D','E'].forEach(l => alterados(l).forEach(z => { (todas[z.id] = todas[z.id] || { z, lados:[] }).lados.push(l === 'D' ? 'direito' : 'esquerdo'); }));
    const itens = Object.keys(todas).map(k => todas[k]);
    const porSist = {}; itens.forEach(x => { (porSist[x.z.sist] = porSist[x.z.sist] || []).push(x); });
    const leit = Object.keys(porSist).map(s => `• ${s}: ${porSist[s].map(x => x.z.nome.toLowerCase() + ' (pé ' + x.lados.join(' e ') + ')').join('; ')}.`);
    const chs = {}; itens.forEach(x => { (chs[x.z.chakra] = chs[x.z.chakra] || []).push(x.z.tema); });
    const chL = Object.keys(chs).map(c => `• Chakra ${c}: ${Array.from(new Set(chs[c])).slice(0, 3).join('; ')}.`);
    sec.push({ titulo:'Leitura geral', texto: itens.length ? `Os pés mostraram alterações sobretudo nos sistemas:\n${leit.join('\n')}\n\nEm termos emocionais e energéticos, estas zonas costumam associar-se a:\n${chL.join('\n')}\n\nAs zonas sensíveis mostram onde o corpo pede mais atenção e descanso. Não indicam doença.` : 'Os pés estavam em equilíbrio nesta consulta.' });
    const tec = TECNICAS.filter((t, i) => S.tecnicas[i]);
    sec.push({ titulo:'Sessão realizada', texto: (tec.length ? 'Técnicas: ' + tec.join(', ').toLowerCase() + '.\n' : '') + (S.duracao ? `Duração: ${S.duracao} minutos.\n` : '') + (S.reacao ? `Reação: ${S.reacao}.` : '') });
    if (S.recomend.trim()) sec.push({ titulo:'Recomendações', texto: S.recomend.trim() });
    else sec.push({ titulo:'Recomendações', texto: 'Beber água ao longo do dia, descansar e usar calçado confortável. Se notar dor forte, inchaço ou febre, falar com o médico.' });
    if (S.notas.trim()) sec.push({ titulo:'Notas clínicas (internas)', texto: S.notas.trim() });
    return sec;
  }
  function p5(){
    return `<div class="card"><h3 style="margin-top:0;">Relatório (editável)</h3><p class="muted">Podes alterar qualquer texto antes de guardar.</p>
      ${S.secoes.map((s, i) => `<label style="margin-top:10px;font-weight:700;">${esc(s.titulo)}</label><textarea id="rpS${i}" rows="${Math.min(12, 3 + Math.floor(s.texto.length / 70))}">${esc(s.texto)}</textarea>`).join('')}
      <p class="muted" style="font-size:.78rem;margin-top:10px;">⚠️ ${AVISO}</p></div>
      <div class="row" style="margin-top:12px;gap:8px;flex-wrap:wrap;"><button class="ghost" onclick="rpIr(-1)">← Anterior</button><button class="ghost" onclick="rpCopiar()">📋 Copiar</button><button class="primary" onclick="rpGuardar()">💾 Guardar na ficha</button></div>`;
  }
  const textoFinal = () => {
    S.secoes.forEach((s, i) => { const t = $('rpS' + i); if (t) s.texto = t.value; });
    return `RELATÓRIO — REFLEXOLOGIA PODAL\n${S.nome} · ${hoje()}\n\n` + S.secoes.filter(s => !/internas/.test(s.titulo)).map(s => s.titulo.toUpperCase() + '\n' + s.texto).join('\n\n') + `\n\n${AVISO}`;
  };
  window.rpCopiar = function(){ try { navigator.clipboard.writeText(textoFinal()); toast('Relatório copiado.'); } catch (_) { toast('Não foi possível copiar.', true); } };
  window.rpGuardar = async function(){
    const texto = textoFinal();
    const dados = { data: hoje(), motivo:S.motivo, zonas:S.zonas, observacao:S.obs, tecnicas: TECNICAS.filter((t, i) => S.tecnicas[i]), duracao:S.duracao };
    const ok = window.guardarNaFicha ? await window.guardarNaFicha(S.patientId, { tipo:'reflexologia_podal', titulo:'Reflexologia podal — ' + hoje(), texto, dados, reportHtml: (window.relatorioPessoalDeSeccoes ? window.relatorioPessoalDeSeccoes({ titulo:'A sua reflexologia podal', nome:S.nome, nome1:String(S.nome||'').split(/\s+/)[0], oQueFiz:'a reflexologia podal', pedido:(S.queixas||S.motivo||'') }, S.secoes.filter(x => !/internas/.test(x.titulo))) : '') }) : false;
    if (ok && window.anexarNotasClinicas) await window.anexarNotasClinicas(S.patientId, 'Reflexologia podal', [{ rotulo:'Queixas', valor:S.queixas }, { rotulo:'Notas clínicas', valor:S.notas }]);
    if (ok) toast('Guardado na ficha do paciente ✓ Pode editá-lo mais tarde na ficha, em Relatórios.');
    else { try { const b = new Blob([texto], { type:'text/plain;charset=utf-8' }); const u = URL.createObjectURL(b); const l = document.createElement('a'); l.href = u; l.download = 'reflexologia-' + String(S.nome||'').replace(/\s+/g,'-') + '.txt'; document.body.appendChild(l); l.click(); l.remove(); } catch(_){} }
  };

  function render(){
    if (!S) return;
    $('rpTitulo').textContent = 'Reflexologia podal — ' + S.nome;
    const c = $('rpCorpo');
    c.innerHTML = (S.passo < 5 ? barra() : '') + [p1, p2, p3, p4, p5][S.passo - 1]();
    c.scrollTop = 0;
  }
})();
