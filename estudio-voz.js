/* Estúdio de Voz — ferramenta exclusiva da Hikari Fafe (tenant hikari-terapias).
   Texto a passar ao ritmo dos vídeos de divulgação e das meditações guiadas, com gravação de voz no próprio ecrã.
   As gravações ficam no telemóvel (botão Guardar); as meditações próprias ficam no documento do tenant. */
const VIDEOS = [{"id": "dia1_sab17", "dia": "Sáb 17", "titulo": "Trailer do workshop", "sub": "Vídeo de 72 segundos", "total": 72.47798185941043, "cenas": [{"start": 0, "va": 1.0, "voz": ""}, {"start": 4.0, "va": 1.0, "voz": "Existe uma energia, que sempre esteve contigo."}, {"start": 9.46, "va": 1.0, "voz": "Silenciosa. Paciente. À espera, de ser sentida."}, {"start": 17.4, "va": 1.0, "voz": "Durante três noites, vais descobrir, algo sobre ti."}, {"start": 24.19, "va": 1.0, "voz": "E aprender técnicas simples, para usares no teu dia a dia."}, {"start": 30.9, "va": 1.0, "voz": "Workshop gratuito, de Reiki."}, {"start": 36.4, "va": 1.0, "voz": "Vinte e três, vinte e quatro, e vinte e cinco de outubro. Às vinte e uma horas. Online, e gratuito."}, {"start": 47.8, "va": 1.0, "voz": "E no final, vais descobrir, o teu chakra dominante. Tudo começa, dia vinte e três."}, {"start": 57.98, "va": 1.0, "voz": "Com o mestre Ricardo Correia, formador de Reiki tradicional."}, {"start": 64.98, "va": 1.0, "voz": "Entra no grupo, e reserva o teu lugar. O link está na bio."}]}, {"id": "dia2_dom18", "dia": "Dom 18", "titulo": "O que é o Reiki?", "sub": "Vídeo de 55 segundos", "total": 55.04824263038549, "cenas": [{"start": 0, "va": 1.0, "voz": "Já ouviste falar, de Reiki?"}, {"start": 5.0, "va": 1.0, "voz": "Uma prática japonesa, criada por Mikao Usui, há cerca de cem anos."}, {"start": 12.73, "va": 1.0, "voz": "Rei, é a energia universal. Ki, é a energia vital, que existe em ti."}, {"start": 21.91, "va": 1.0, "voz": "Com as mãos, de forma suave, o praticante canaliza essa energia, num momento de relaxamento e equilíbrio."}, {"start": 31.92, "va": 1.0, "voz": "E qualquer pessoa, pode aprender."}, {"start": 36.92, "va": 1.0, "voz": "Nos dias vinte e três, vinte e quatro, e vinte e cinco de outubro, vais sentir o Reiki, num workshop gratuito."}, {"start": 47.55, "va": 1.0, "voz": "Entra no grupo, e reserva o teu lugar. O link está na bio."}]}, {"id": "dia3_seg19", "dia": "Seg 19", "titulo": "Qual é o teu chakra dominante?", "sub": "Vídeo de 60 segundos", "total": 60.0717029478458, "cenas": [{"start": 0, "va": 1.0, "voz": "Sabias que existem, sete centros de energia, em ti?"}, {"start": 7.17, "va": 1.0, "voz": "Raiz, a segurança. Sacro, a criatividade. Plexo solar, a confiança. Coração, o amor. Garganta, a expressão. Terceiro olho, a intuição. Coroa, a espiritualidade."}, {"start": 28.63, "va": 1.0, "voz": "Mas há um, que fala mais alto, em ti."}, {"start": 34.54, "va": 1.0, "voz": "Qual é, o teu chakra dominante?"}, {"start": 40.04, "va": 1.0, "voz": "Vais descobrir, no workshop gratuito, nos dias vinte e três, vinte e quatro, e vinte e cinco de outubro, às vinte e uma horas."}, {"start": 52.57, "va": 1.0, "voz": "Entra no grupo, e reserva o teu lugar. O link está na bio."}]}, {"id": "dia4_ter20", "dia": "Ter 20", "titulo": "Uma técnica simples", "sub": "Vídeo de 76 segundos", "total": 76.41165986394557, "cenas": [{"start": 0, "va": 1.0, "voz": "Queres experimentar, uma técnica simples? Leva um minuto."}, {"start": 7.05, "va": 1.0, "voz": "Senta-te com a coluna direita, e apoia os pés no chão."}, {"start": 13.25, "va": 1.0, "voz": "Coloca uma mão no peito, e a outra na barriga."}, {"start": 19.15, "va": 1.0, "voz": "Inspira pelo nariz, em quatro tempos. Expira devagar, em seis tempos. Repete, mais duas vezes."}, {"start": 55.15, "va": 1.0, "voz": "Como te sentes, agora?"}, {"start": 60.15, "va": 1.0, "voz": "No workshop gratuito, vais aprender mais técnicas como esta, para usares no teu dia a dia."}, {"start": 68.91, "va": 1.0, "voz": "Entra no grupo, e reserva o teu lugar. O link está na bio."}]}, {"id": "dia5_qua21", "dia": "Qua 21", "titulo": "Quem te vai guiar", "sub": "Vídeo de 57 segundos", "total": 56.64256462585034, "cenas": [{"start": 0, "va": 1.0, "voz": "Olá. Chamo-me Ricardo Correia, e sou mestre e formador de Reiki tradicional."}, {"start": 7.63, "va": 1.0, "voz": "Comecei a praticar Reiki aos trinta e três anos, num workshop, em Guimarães."}, {"start": 15.65, "va": 1.0, "voz": "Hoje, acompanho adultos, jovens e crianças, e ensino quem quer aprender."}, {"start": 24.49, "va": 1.0, "voz": "Criei a Escola de Reiki Hikari Fafe, para aprenderes ao teu ritmo, com acompanhamento, online ou presencial."}, {"start": 34.58, "va": 1.0, "voz": "O workshop gratuito, é o primeiro passo. Nos dias vinte e três, vinte e quatro, e vinte e cinco de outubro, às vinte e uma horas."}, {"start": 46.91, "va": 1.0, "voz": "Vai ser um prazer, receber-te. Entra no grupo, e reserva o teu lugar. O link está na bio."}]}, {"id": "dia6_qui22", "dia": "Qui 22", "titulo": "Amanhã às 21h", "sub": "Vídeo de 39 segundos", "total": 39.38647619047619, "cenas": [{"start": 0, "va": 1.0, "voz": "Amanhã, às vinte e uma horas, começa."}, {"start": 6.46, "va": 1.0, "voz": "Prepara um espaço calmo, onde ninguém te interrompa."}, {"start": 12.46, "va": 1.0, "voz": "Tem contigo um copo de água, e um caderno, para os teus apontamentos."}, {"start": 20.08, "va": 1.0, "voz": "Veste roupa confortável, e liga-te uns minutos antes."}, {"start": 26.36, "va": 1.0, "voz": "Ainda não entraste no grupo? Entra agora, e não percas nada. O link está na bio."}, {"start": 35.39, "va": 1.0, "voz": "Até amanhã."}]}, {"id": "dia7_sex23", "dia": "Sex 23", "titulo": "É hoje", "sub": "Vídeo de 32 segundos", "total": 32.269340136054424, "cenas": [{"start": 0, "va": 1.0, "voz": "É hoje."}, {"start": 4.0, "va": 1.0, "voz": "Às vinte e uma horas, começa o workshop gratuito de Reiki."}, {"start": 10.53, "va": 1.0, "voz": "Vais sentir o Reiki, aprender técnicas simples, e descobrir o teu chakra dominante."}, {"start": 19.18, "va": 1.0, "voz": "Ainda vais a tempo. Entra no grupo, agora. O link está na bio."}, {"start": 27.27, "va": 1.0, "voz": "Vemo-nos, logo à noite."}]}];
const MEDS = [{"id": "respirar", "titulo": "Voltar a ti", "sub": "Meditação de respiração · cerca de 6 min", "linhas": [["Antes de começares, encontra um lugar calmo.", 3], ["Senta-te com conforto, ou deita-te, como o teu corpo preferir.", 4], ["Fecha os olhos, se te sentires bem assim.", 5], ["Vamos começar por aqui, pelo agora.", 4], ["Inspira devagar pelo nariz.", 4], ["E solta o ar pela boca, sem pressa.", 6], ["Mais uma vez. Inspira, enchendo o peito.", 4], ["E expira, deixando ir o dia.", 8], ["Agora, deixa a respiração voltar ao seu ritmo natural.", 6], ["Não precisas de a controlar. Basta observá-la.", 8], ["Sente o ar a entrar. E a sair.", 10], ["Se surgirem pensamentos, está tudo bem.", 4], ["Repara neles, como quem vê nuvens a passar, e volta à respiração.", 10], ["Leva agora a atenção aos pés.", 4], ["Sente o contacto com o chão, ou com a cama.", 6], ["Deixa os pés ficarem pesados, relaxados.", 8], ["Sobe devagar pelas pernas. Deixa-as soltar.", 8], ["Sente a barriga a subir e a descer.", 6], ["Solta os ombros. Deixa-os cair, longe das orelhas.", 8], ["Relaxa o maxilar. A testa. O espaço entre as sobrancelhas.", 10], ["Agora, imagina uma luz suave, dourada, no centro do peito.", 6], ["A cada inspiração, ela cresce um pouco.", 6], ["A cada expiração, espalha calor por todo o corpo.", 12], ["Fica aqui, nesta calma, o tempo que precisares.", 30], ["Agora, vamos regressar devagar.", 4], ["Move os dedos das mãos e dos pés.", 5], ["Faz uma respiração mais funda.", 5], ["E quando estiveres pronto, abre os olhos.", 5], ["Leva contigo esta calma, para o resto do dia.", 4], ["Obrigado.", 2]]}, {"id": "maos", "titulo": "A energia nas mãos", "sub": "Meditação de Reiki · cerca de 8 min", "linhas": [["Senta-te com a coluna direita, mas sem rigidez.", 3], ["Apoia as mãos sobre as pernas, com as palmas para cima.", 4], ["Fecha os olhos e respira fundo, três vezes.", 12], ["Inspira. E solta.", 8], ["Agora, esfrega as palmas das mãos uma na outra, durante dez segundos.", 10], ["Pára. E afasta-as uns centímetros.", 5], ["Sente o que há entre as tuas mãos.", 6], ["Pode ser calor, um formigueiro, uma leve pressão. Ou apenas silêncio.", 8], ["Tudo o que sentires está certo.", 6], ["Aproxima e afasta devagar as mãos, como se tivesses uma bola de energia entre elas.", 14], ["Mantém a atenção nas palmas.", 10], ["Agora, pousa uma mão sobre o peito, e a outra sobre a barriga.", 6], ["Respira para as tuas mãos.", 8], ["Sente o calor das mãos a encontrar o teu corpo.", 12], ["Imagina que cada inspiração traz luz.", 5], ["E que cada expiração solta o que já não precisas de carregar.", 12], ["Se quiseres, diz mentalmente: eu estou em paz.", 10], ["Fica aqui, com as mãos pousadas.", 30], ["Agora, leva as mãos ao rosto, sobre os olhos, sem pressionar.", 6], ["Sente a escuridão suave e o calor.", 20], ["Passa as mãos devagar pela cara, pelo pescoço, até ao peito.", 10], ["Pousa-as de novo sobre as pernas.", 5], ["Agradece a ti próprio por este tempo.", 8], ["Faz uma respiração profunda.", 5], ["Move o corpo devagar. E abre os olhos quando quiseres.", 5], ["Esta energia está sempre contigo.", 3], ["Obrigado.", 2]]}];
export const TENANT_ESTUDIO = 'hikari-terapias';

let limparAnterior = null;

function palavras(t){ return String(t).split(/\s+/).filter(Boolean).length; }
function fmt(s){ s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }

/* "frase | pausa em segundos" — sem pausa indicada, 5 s. Linha em branco acrescenta 8 s à pausa anterior. */
export function lerTexto(txt){
  const out = [];
  String(txt || '').split(/\r?\n/).forEach(l => {
    const s = l.trim();
    if (!s){ if (out.length) out[out.length - 1][1] += 8; return; }
    const m = s.match(/^(.*?)\s*\|\s*(\d{1,3})\s*$/);
    out.push(m ? [m[1].trim(), parseInt(m[2], 10)] : [s, 5]);
  });
  return out.filter(x => x[0]);
}
function paraTexto(linhas){ return linhas.map(([t, p]) => t + ' | ' + p).join('\n'); }

export function renderEstudio(main, ctx){
  if (limparAnterior) { try { limparAnterior(); } catch(e){} limparAnterior = null; }
  if (ctx.tenantId !== TENANT_ESTUDIO){
    main.innerHTML = '<div class="card"><h2>🔒 Ferramenta indisponível</h2><p class="muted">Esta ferramenta é exclusiva de uma conta específica.</p></div>';
    return;
  }
  const esc = ctx.escapeHtml;
  let modo = 'v', cur = 0, correr = false, raf = 0, tmr = 0, t0 = 0, temVid = false;
  let itens = [], total = 0, stream = null, rec = null, pedacos = [], actx = null, ana = null, nTakes = 0, urls = [];

  main.innerHTML = `
  <style>
   .ev{--evbg:#0d0b1f;--evp:#171433;--evl:#2c2757;--evf:#f6eedd;--evm:#a9a3c7;--evg:#e8be64;background:var(--evbg);color:var(--evf);border-radius:18px;padding:16px;display:flex;flex-direction:column;gap:14px}
   .ev [hidden]{display:none!important}
   .ev h2,.ev h3{margin:0;font-family:Georgia,serif;font-weight:600}
   .ev p{margin:0}.ev .evm{color:var(--evm);font-size:.9rem}
   .ev button{font:inherit;cursor:pointer;border-radius:999px;border:1px solid var(--evl);background:var(--evp);color:var(--evf);padding:10px 16px;min-height:44px}
   .ev button[aria-pressed=true],.ev button.evmain{background:var(--evg);color:#1b1230;border-color:var(--evg);font-weight:600}
   .ev button:disabled{opacity:.45}
   .ev .evrow{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
   .ev .evchips{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px}.ev .evchips button{flex:0 0 auto;min-height:40px;padding:8px 14px}
   .ev .evstage{display:grid;grid-template-columns:minmax(0,230px) minmax(0,1fr);gap:14px;align-items:start}
   .ev .evphone{border:1px solid var(--evl);border-radius:18px;overflow:hidden;background:#000;aspect-ratio:9/16;width:100%}
   .ev video{width:100%;height:100%;object-fit:cover;display:block}
   .ev .evread{position:relative;background:var(--evp);border:1px solid var(--evl);border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:12px;min-width:0}
   .ev .evscript{height:min(50vh,400px);overflow-y:auto;scroll-behavior:smooth;display:flex;flex-direction:column;gap:14px;padding:30px 4px;-webkit-mask-image:linear-gradient(transparent,#000 14%,#000 86%,transparent);mask-image:linear-gradient(transparent,#000 14%,#000 86%,transparent)}
   .ev .evln{font:500 1.4rem/1.35 Georgia,serif;color:#6d6a93;transition:color .4s,transform .4s;transform-origin:left}
   .ev .evw{display:inline}
   .ev .evln.now{color:var(--evf);transform:scale(1.06)}
   .ev .evln.now .evw{background-image:linear-gradient(90deg,var(--evg) var(--p,0%),var(--evf) calc(var(--p,0%) + 1%));-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent}.ev .evln.done{color:#55527a}
   .ev .evbar{height:6px;border-radius:3px;background:var(--evl);overflow:hidden}.ev .evbar i{display:block;height:100%;width:0;background:var(--evg)}
   .ev .evlvl i{background:#7fd1a8;transition:width .08s}
   .ev .evcount{position:absolute;inset:0;display:grid;place-items:center;font:600 6rem Georgia,serif;color:var(--evg);background:rgba(13,11,31,.85);border-radius:16px}
   .ev .evtake{display:flex;gap:8px;flex-wrap:wrap;align-items:center;background:var(--evbg);border:1px solid var(--evl);border-radius:12px;padding:8px 10px}
   .ev .evtake span{flex:1 1 130px;min-width:0}.ev .evtake audio{flex:2 1 200px;min-width:0;max-width:100%}
   .ev a.evmain{display:inline-flex;align-items:center;text-decoration:none;border-radius:999px;padding:10px 16px;min-height:44px;background:var(--evg);color:#1b1230;font-weight:600}
   .ev input[type=text],.ev textarea{width:100%;box-sizing:border-box;background:var(--evbg);color:var(--evf);border:1px solid var(--evl);border-radius:10px;padding:10px;font:inherit}
   .ev .everr{color:#f0a0a0}
   .ev .evrec{display:inline-block;width:10px;height:10px;border-radius:50%;background:#ff6b6b;margin-right:8px;animation:evp 1s infinite}
   @keyframes evp{50%{opacity:.25}}
   @media(max-width:700px){.ev .evstage{grid-template-columns:1fr}.ev .evphone{max-width:220px;margin:0 auto}}
  </style>
  <div class="ev" id="ev-root">
   <div><h2 style="font-size:1.7rem;">🎙️ Estúdio de Voz</h2>
    <p class="evm">Lê o texto que vai passando e grava a tua voz. Escolhe um vídeo da semana ou uma meditação guiada. Exclusivo da Hikari Fafe.</p></div>
   <div class="evrow"><button id="ev-tv" aria-pressed="true">Vídeos da semana</button><button id="ev-tm" aria-pressed="false">Meditações guiadas</button><button id="ev-tp" aria-pressed="false">Plano de publicações</button></div>
   <div class="evchips" id="ev-chips"></div>
   <div class="evstage" id="ev-stage">
    <div class="evphone" id="ev-phone" hidden><video id="ev-vid" playsinline muted></video></div>
    <div class="evread">
     <div><h3 id="ev-t" style="font-size:1.5rem;"></h3><p class="evm" id="ev-s"></p></div>
     <div class="evscript" id="ev-script"></div>
     <div class="evbar" id="ev-pz" hidden><i id="ev-pzi"></i></div>
     <div class="evbar evlvl" aria-hidden="true"><i id="ev-lvl"></i></div>
     <div class="evrow">
      <button class="evmain" id="ev-go">Gravar e ler</button><button id="ev-stop" disabled>Parar</button>
      <span class="evm" id="ev-clock" style="margin-left:auto;font-variant-numeric:tabular-nums;">0:00</span>
     </div>
     <div class="evm" id="ev-vrow">Vídeo (opcional, para veres as imagens): <input type="file" id="ev-vf" accept="video/*"> <button id="ev-mus" aria-pressed="false">Música do vídeo: desligada</button><br>Com a música ligada, usa auscultadores.</div>
     <div class="evrow" id="ev-medtools" hidden>
      <button id="ev-new">+ Nova meditação</button><button id="ev-edit" hidden>✏️ Editar</button><button id="ev-del" hidden>🗑️ Apagar</button>
     </div>
     <div class="everr" id="ev-err" role="alert"></div>
     <div class="evcount" id="ev-count" hidden>3</div>
    </div>
   </div>
   <div id="ev-editor" hidden>
    <h3 style="font-size:1.2rem;margin-bottom:8px;">Meditação própria</h3>
    <input type="text" id="ev-et" placeholder="Título (ex.: Meditação do coração)">
    <textarea id="ev-ex" rows="12" style="margin-top:8px;" placeholder="Uma frase por linha. No fim da linha podes pôr | e os segundos de pausa.&#10;Exemplo:&#10;Fecha os olhos e respira fundo. | 6&#10;Sente o corpo a pesar. | 10"></textarea>
    <p class="evm" style="margin:6px 0;">Sem número, a pausa é de 5 segundos. Uma linha em branco acrescenta mais 8 segundos de silêncio.</p>
    <div class="evrow"><button class="evmain" id="ev-save">Guardar</button><button id="ev-cancel">Cancelar</button></div>
   </div>
   <div id="ev-plan" hidden>
    <div class="evread">
     <div><h3 style="font-size:1.5rem;">Pedir um plano de publicações</h3>
      <p class="evm">Escreve o tema e quantos dias queres. O pedido fica guardado aqui. O Claude vê-o quando lho enviares pelo chat e prepara os textos, vídeos e imagens de cada dia.</p></div>
     <label class="evm" for="ev-ptema">Tema</label>
     <input type="text" id="ev-ptema" placeholder="Ex.: workshop de Reiki, chakras, meditação para dormir">
     <div class="evrow">
      <div style="flex:1 1 120px"><label class="evm" for="ev-pdias">Quantos dias</label><input type="text" id="ev-pdias" inputmode="numeric" value="7"></div>
      <div style="flex:2 1 200px"><label class="evm" for="ev-pvoz">Voz</label>
       <select id="ev-pvoz" style="width:100%;box-sizing:border-box;background:var(--evbg);color:var(--evf);border:1px solid var(--evl);border-radius:10px;padding:10px;font:inherit;min-height:44px">
        <option value="Decidir depois">Decidir depois</option><option value="Tugão (masculina, Portugal)">Tugão (masculina, Portugal)</option><option value="Dora (feminina)">Dora (feminina)</option><option value="Alex (masculina)">Alex (masculina)</option><option value="Santa (masculina, grave)">Santa (masculina, grave)</option><option value="A minha voz (gravada por mim)">A minha voz (gravada por mim)</option>
       </select></div>
     </div>
     <label class="evm" for="ev-pnotas">Notas (opcional)</label>
     <textarea id="ev-pnotas" rows="3" placeholder="Ex.: tom calmo, terminar sempre com o link do grupo, sem falar de preços"></textarea>
     <div class="evrow"><button class="evmain" id="ev-ppedir">Guardar pedido</button></div>
    </div>
    <h3 style="font-size:1.2rem;margin:14px 0 8px;">Os teus pedidos</h3>
    <div style="display:grid;gap:8px;" id="ev-plist"></div>
   </div>
   <div id="ev-takesbox"><h3 style="font-size:1.2rem;margin-bottom:8px;">As tuas gravações</h3>
    <div style="display:grid;gap:8px;" id="ev-takes"><span class="evm">Ainda não gravaste nada nesta sessão. Cada gravação fica no telemóvel quando carregares em Guardar; envia-a depois para montar o vídeo ou a meditação.</span></div></div>
  </div>`;

  const $ = id => main.querySelector('#' + id);
  const vid = $('ev-vid');
  let editId = null;

  function lista(){
    if (modo === 'v') return VIDEOS;
    const proprias = (ctx.getCustom() || []).map(m => ({ id: m.id, titulo: m.titulo, sub: 'Meditação própria', linhas: lerTexto(m.texto), propria: true, texto: m.texto }));
    return MEDS.concat(proprias);
  }
  function desenhar(){
    const L = lista();
    if (cur >= L.length) cur = 0;
    const chips = $('ev-chips'); chips.innerHTML = '';
    L.forEach((x, i) => { const b = document.createElement('button'); b.textContent = modo === 'v' ? x.dia : x.titulo; b.setAttribute('aria-pressed', i === cur); b.onclick = () => { if (correr) parar(false); cur = i; temVid = false; vid.removeAttribute('src'); desenhar(); }; chips.appendChild(b); });
    const x = L[cur];
    $('ev-t').textContent = x.titulo;
    $('ev-phone').hidden = !(modo === 'v' && temVid);
    $('ev-stage').style.gridTemplateColumns = (modo === 'v' && temVid) ? '' : '1fr';
    $('ev-vrow').hidden = modo !== 'v'; $('ev-pz').hidden = modo === 'v'; $('ev-medtools').hidden = modo !== 'm';
    $('ev-edit').hidden = $('ev-del').hidden = !x.propria;
    const sc = $('ev-script'); sc.innerHTML = '';
    if (modo === 'v'){ itens = x.cenas.filter(c => c.voz).map(c => ({ t: c.start + c.va, text: c.voz })); total = x.total; $('ev-s').textContent = x.sub; }
    else { let t = 1.5; itens = []; x.linhas.forEach(([text, p]) => { const d = palavras(text) / 2.0 + 0.6; itens.push({ t, text, pausa: p, dur: d }); t += d + p; }); total = t; $('ev-s').textContent = x.sub + ' · cerca de ' + Math.max(1, Math.round(total / 60)) + ' min'; }
    itens.forEach((it, i) => {
      const gap = (itens[i + 1] ? itens[i + 1].t : total) - it.t;
      if (it.dur == null) it.dur = Math.min(Math.max(gap - 0.3, 1), Math.max(1.5, palavras(it.text) / 2.1));
      const d = document.createElement('div'); d.className = 'evln';
      const ws = it.text.split(/\s+/).filter(Boolean); const tot = ws.reduce((a, w) => a + w.length + 1, 0); let ac = 0; it.ws = [];
      ws.forEach((w, j) => { const sp = document.createElement('span'); sp.className = 'evw'; sp.textContent = w; sp._a = ac / tot; ac += w.length + 1; sp._b = ac / tot; it.ws.push(sp); d.appendChild(sp); if (j < ws.length - 1) d.appendChild(document.createTextNode(' ')); });
      it.el = d; sc.appendChild(d);
    });
    sc.scrollTop = 0; $('ev-clock').textContent = '0:00 / ' + fmt(total);
  }
  const agora = () => (modo === 'v' && temVid) ? vid.currentTime : (performance.now() - t0) / 1000;
  function pintar(t){
    let k = -1; itens.forEach((it, i) => { if (it.t <= t + 0.2) k = i; });
    itens.forEach((it, i) => { it.el.className = 'evln' + (i === k ? ' now' : i < k ? ' done' : ''); });
    if (k >= 0){
      const it = itens[k], f = Math.min(1, Math.max(0, (t - it.t) / it.dur));
      it.ws.forEach(sp => { sp.style.setProperty('--p', (Math.min(1, Math.max(0, (f - sp._a) / (sp._b - sp._a))) * 100).toFixed(1) + '%'); });
    }
    if (k >= 0){ const el = itens[k].el, sc = $('ev-script'); sc.scrollTop = el.offsetTop - sc.clientHeight / 2 + el.clientHeight / 2; }
    if (modo === 'm'){ const it = itens[k]; let f = 0; if (it){ const fim = it.t + it.dur; f = t > fim ? Math.min(1, (t - fim) / it.pausa) : 0; } $('ev-pzi').style.width = (f * 100) + '%'; }
  }
  function nivel(){ if (!ana) return; const a = new Uint8Array(ana.fftSize); ana.getByteTimeDomainData(a); let m = 0; for (const v of a) m = Math.max(m, Math.abs(v - 128)); $('ev-lvl').style.width = Math.min(100, m * 1.6) + '%'; }
  function tick(){
    if (!correr) return;
    if (!document.getElementById('ev-root')){ parar(false); return; }
    const t = agora(); $('ev-clock').textContent = fmt(t) + ' / ' + fmt(total); nivel();
    if (t > total + 1 || (modo === 'v' && temVid && vid.ended)){ parar(true); return; }
    pintar(t); raf = requestAnimationFrame(tick);
  }
  function soltarMic(){ if (stream){ stream.getTracks().forEach(tr => tr.stop()); stream = null; } if (actx){ try { actx.close(); } catch(e){} actx = null; ana = null; } }
  async function abrirMic(){
    stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: true, autoGainControl: false } });
    actx = new (window.AudioContext || window.webkitAudioContext)(); ana = actx.createAnalyser(); ana.fftSize = 512; actx.createMediaStreamSource(stream).connect(ana);
  }
  function comecar(){
    const tipos = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm'];
    const mt = tipos.find(m => window.MediaRecorder && MediaRecorder.isTypeSupported(m)) || '';
    pedacos = []; rec = new MediaRecorder(stream, mt ? { mimeType: mt } : {});
    const nome = lista()[cur];
    rec.ondataavailable = e => { if (e.data.size) pedacos.push(e.data); };
    const tipo = mt;
    rec.onstop = () => { guardarTake(rec.mimeType || tipo || 'audio/webm', nome); soltarMic(); };
    rec.start(1000);
    correr = true; $('ev-go').innerHTML = '<span class="evrec"></span>A gravar'; $('ev-go').disabled = true; $('ev-stop').disabled = false;
    if (modo === 'v' && temVid){ vid.currentTime = 0; vid.muted = $('ev-mus').getAttribute('aria-pressed') !== 'true'; vid.play().catch(() => {}); }
    t0 = performance.now(); raf = requestAnimationFrame(tick);
  }
  function guardarTake(tipo, x){
    const blob = new Blob(pedacos, { type: tipo }); const ext = tipo.includes('mp4') ? 'm4a' : 'webm';
    nTakes++; const url = URL.createObjectURL(blob); urls.push(url);
    const nomeF = (modo === 'v' ? x.id : 'meditacao_' + String(x.id)) + '_take' + nTakes + '.' + ext;
    if (nTakes === 1) $('ev-takes').innerHTML = '';
    const d = document.createElement('div'); d.className = 'evtake';
    d.innerHTML = '<span></span><audio controls></audio><a class="evmain" download>Guardar</a>';
    d.querySelector('span').textContent = x.titulo + ' · take ' + nTakes; d.querySelector('audio').src = url;
    const a = d.querySelector('a'); a.href = url; a.download = nomeF; $('ev-takes').prepend(d);
  }
  function parar(fim){
    correr = false; cancelAnimationFrame(raf); clearInterval(tmr); $('ev-count').hidden = true; $('ev-lvl').style.width = '0';
    if (rec && rec.state !== 'inactive') rec.stop(); else soltarMic();
    if (temVid) vid.pause();
    $('ev-go').disabled = false; $('ev-go').textContent = fim ? 'Gravar outra vez' : 'Gravar e ler'; $('ev-stop').disabled = true;
    if (!fim){ itens.forEach(it => it.el.className = 'evln'); $('ev-script').scrollTop = 0; }
  }
  $('ev-go').onclick = async () => {
    $('ev-err').textContent = '';
    try { await abrirMic(); } catch(e){ $('ev-err').textContent = 'Não consegui aceder ao microfone. Permite o microfone para este site nas definições do browser e tenta outra vez.'; return; }
    let n = 3; $('ev-count').hidden = false; $('ev-count').textContent = n; $('ev-go').disabled = true;
    tmr = setInterval(() => { n--; if (n <= 0){ clearInterval(tmr); $('ev-count').hidden = true; comecar(); } else $('ev-count').textContent = n; }, 1000);
  };
  $('ev-stop').onclick = () => parar(false);
  $('ev-vf').onchange = () => { const f = $('ev-vf').files[0]; if (!f) return; const u = URL.createObjectURL(f); urls.push(u); vid.src = u; temVid = true; desenhar(); };
  $('ev-mus').onclick = () => { const on = $('ev-mus').getAttribute('aria-pressed') !== 'true'; $('ev-mus').setAttribute('aria-pressed', on); $('ev-mus').textContent = 'Música do vídeo: ' + (on ? 'ligada' : 'desligada'); vid.muted = !on; };
  function trocar(m){
    if (correr) parar(false); modo = m; cur = 0; temVid = false; vid.removeAttribute('src'); $('ev-editor').hidden = true;
    $('ev-tv').setAttribute('aria-pressed', m === 'v'); $('ev-tm').setAttribute('aria-pressed', m === 'm'); $('ev-tp').setAttribute('aria-pressed', m === 'p');
    const plano = m === 'p';
    $('ev-chips').hidden = plano; $('ev-stage').hidden = plano; $('ev-takesbox').hidden = plano; $('ev-plan').hidden = !plano;
    if (plano) desenharPlano(); else desenhar();
  }
  $('ev-tv').onclick = () => trocar('v'); $('ev-tm').onclick = () => trocar('m'); $('ev-tp').onclick = () => trocar('p');

  /* Plano de publicações: pedidos guardados no tenant (estudioPedidos) */
  const ESTADOS = [['pendente', 'Pendente'], ['preparacao', 'Em preparação'], ['pronto', 'Pronto']];
  function desenharPlano(){
    const L = (ctx.getPedidos() || []).slice().sort((a, b) => String(b.criadoEm).localeCompare(String(a.criadoEm)));
    const box = $('ev-plist');
    if (!L.length){ box.innerHTML = '<span class="evm">Ainda não fizeste nenhum pedido.</span>'; return; }
    box.innerHTML = '';
    L.forEach(p => {
      const d = document.createElement('div'); d.className = 'evtake'; d.style.display = 'grid'; d.style.gap = '8px';
      const data = new Date(p.criadoEm).toLocaleDateString('pt-PT');
      d.innerHTML = '<div><strong></strong><div class="evm"></div></div><div class="evrow"><select aria-label="Estado do pedido" style="background:var(--evbg);color:var(--evf);border:1px solid var(--evl);border-radius:10px;padding:8px;font:inherit;min-height:44px"></select><input type="text" placeholder="Link dos ficheiros (quando estiver pronto)" style="flex:1 1 200px;width:auto"><button data-a="copiar">Copiar pedido</button><button data-a="apagar">🗑️</button></div>';
      d.querySelector('strong').textContent = p.tema + ' · ' + p.dias + ' dias';
      d.querySelector('.evm').textContent = 'Pedido a ' + data + ' · Voz: ' + p.voz + (p.notas ? ' · ' + p.notas : '');
      const sel = d.querySelector('select'); ESTADOS.forEach(([v, t]) => { const o = document.createElement('option'); o.value = v; o.textContent = t; if (p.estado === v) o.selected = true; sel.appendChild(o); });
      const lk = d.querySelector('input'); lk.value = p.link || '';
      const guardar = async () => { const nova = (ctx.getPedidos() || []).map(x => x.id === p.id ? Object.assign({}, x, { estado: sel.value, link: /^https:\/\//i.test(lk.value.trim()) ? lk.value.trim() : '' }) : x); try { await ctx.savePedidos(nova); ctx.toast('Guardado.'); } catch(e){ ctx.toast('Não consegui guardar: ' + (e.message || e), true); } };
      sel.onchange = guardar; lk.onchange = guardar;
      d.querySelector('[data-a=copiar]').onclick = async () => {
        const txt = 'Pedido de plano de publicações (Estúdio de Voz)\nTema: ' + p.tema + '\nDias: ' + p.dias + '\nVoz: ' + p.voz + (p.notas ? '\nNotas: ' + p.notas : '');
        try { await navigator.clipboard.writeText(txt); ctx.toast('Copiado. Cola no chat com o Claude.'); } catch(e){ ctx.toast('Não consegui copiar. Seleciona o texto à mão.', true); }
      };
      d.querySelector('[data-a=apagar]').onclick = async () => {
        if (!await ctx.confirmar('Apagar pedido', 'Apagar o pedido "' + p.tema + '"?')) return;
        try { await ctx.savePedidos((ctx.getPedidos() || []).filter(x => x.id !== p.id)); desenharPlano(); } catch(e){ ctx.toast('Não consegui apagar: ' + (e.message || e), true); }
      };
      box.appendChild(d);
    });
  }
  $('ev-ppedir').onclick = async () => {
    const tema = $('ev-ptema').value.trim(); const dias = parseInt($('ev-pdias').value, 10);
    if (!tema){ ctx.toast('Escreve o tema.', true); return; }
    if (!(dias >= 1 && dias <= 60)){ ctx.toast('Indica entre 1 e 60 dias.', true); return; }
    const pedido = { id: 'p' + Date.now().toString(36), tema, dias, voz: $('ev-pvoz').value, notas: $('ev-pnotas').value.trim(), criadoEm: new Date().toISOString(), estado: 'pendente', link: '' };
    try { await ctx.savePedidos((ctx.getPedidos() || []).concat([pedido])); ctx.toast('Pedido guardado. Carrega em «Copiar pedido» e cola-o no chat.'); $('ev-ptema').value = ''; $('ev-pnotas').value = ''; desenharPlano(); }
    catch(e){ ctx.toast('Não consegui guardar: ' + (e.message || e), true); }
  };

  function abrirEditor(x){ editId = x ? x.id : null; $('ev-et').value = x ? x.titulo : ''; $('ev-ex').value = x ? (x.texto || paraTexto(x.linhas)) : ''; $('ev-editor').hidden = false; $('ev-et').focus(); }
  $('ev-new').onclick = () => abrirEditor(null);
  $('ev-edit').onclick = () => { const x = lista()[cur]; if (x && x.propria) abrirEditor(x); };
  $('ev-cancel').onclick = () => { $('ev-editor').hidden = true; };
  $('ev-save').onclick = async () => {
    const titulo = $('ev-et').value.trim(), texto = $('ev-ex').value.trim();
    if (!titulo || !lerTexto(texto).length){ ctx.toast('Escreve o título e pelo menos uma frase.', true); return; }
    const atual = ctx.getCustom() || [];
    const item = { id: editId || ('m' + Date.now().toString(36)), titulo, texto };
    const nova = editId ? atual.map(m => m.id === editId ? item : m) : atual.concat([item]);
    try { await ctx.save(nova); ctx.toast('Meditação guardada.'); $('ev-editor').hidden = true; cur = MEDS.length + nova.findIndex(m => m.id === item.id); desenhar(); }
    catch(e){ ctx.toast('Não consegui guardar: ' + (e.message || e), true); }
  };
  $('ev-del').onclick = async () => {
    const x = lista()[cur]; if (!x || !x.propria) return;
    if (!await ctx.confirmar('Apagar meditação', 'Apagar "' + x.titulo + '"?\n\nEsta acção não pode ser desfeita.')) return;
    try { await ctx.save((ctx.getCustom() || []).filter(m => m.id !== x.id)); ctx.toast('Meditação apagada.'); cur = 0; desenhar(); }
    catch(e){ ctx.toast('Não consegui apagar: ' + (e.message || e), true); }
  };
  limparAnterior = () => { correr = false; cancelAnimationFrame(raf); clearInterval(tmr); if (rec && rec.state !== 'inactive'){ rec.onstop = null; rec.stop(); } soltarMic(); };
  desenhar();
}
