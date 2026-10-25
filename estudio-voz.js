/* Estúdio de Voz — ferramenta exclusiva da Hikari Fafe (tenant hikari-terapias).
   Texto a passar ao ritmo dos vídeos de divulgação e das meditações guiadas, com gravação de voz no próprio ecrã.
   ✨ Criar: publicações novas (texto próprio) em áudio, vídeo com legendas animadas ou vídeo com a câmara, em 9:16, 4:5 ou 1:1.
   As gravações ficam no telemóvel (botão Guardar); as meditações e publicações próprias ficam no documento do tenant. */
const VIDEOS = [{"id": "dia1_sab17", "dia": "Sáb 17", "titulo": "Trailer do workshop", "sub": "Vídeo de 72 segundos", "total": 72.47798185941043, "cenas": [{"start": 0, "va": 1.0, "voz": ""}, {"start": 4.0, "va": 1.0, "voz": "Existe uma energia, que sempre esteve contigo."}, {"start": 9.46, "va": 1.0, "voz": "Silenciosa. Paciente. À espera, de ser sentida."}, {"start": 17.4, "va": 1.0, "voz": "Durante três noites, vais descobrir, algo sobre ti."}, {"start": 24.19, "va": 1.0, "voz": "E aprender técnicas simples, para usares no teu dia a dia."}, {"start": 30.9, "va": 1.0, "voz": "Workshop gratuito, de Reiki."}, {"start": 36.4, "va": 1.0, "voz": "Vinte e três, vinte e quatro, e vinte e cinco de outubro. Às vinte e uma horas. Online, e gratuito."}, {"start": 47.8, "va": 1.0, "voz": "E no final, vais descobrir, o teu chakra dominante. Tudo começa, dia vinte e três."}, {"start": 57.98, "va": 1.0, "voz": "Com o mestre Ricardo Correia, formador de Reiki tradicional."}, {"start": 64.98, "va": 1.0, "voz": "Entra no grupo, e reserva o teu lugar. O link está na bio."}]}, {"id": "dia2_dom18", "dia": "Dom 18", "titulo": "O que é o Reiki?", "sub": "Vídeo de 92 segundos", "total": 91.94843083900227, "cenas": [{"start": 0, "va": 1.0, "voz": "E se existisse uma energia, dentro de ti, e à tua volta, que podes aprender a sentir?"}, {"start": 9.05, "va": 1.0, "voz": "Mikao Usui deu o nome de Reiki, a essa energia e prática japonesa, há cerca de cem anos, quando a redescobriu, e sentiu pela primeira vez."}, {"start": 21.81, "va": 1.0, "voz": "Rei, significa energia universal. Ki, é a energia vital, que existe em ti."}, {"start": 31.34, "va": 1.0, "voz": "Muitas pessoas descrevem, mais calma, relaxamento, equilíbrio, e bem-estar."}, {"start": 40.8, "va": 1.0, "voz": "Experimenta agora. Esfrega as palmas das mãos, durante dez segundos. Depois, afasta-as devagar, e sente o que existe entre elas."}, {"start": 60.8, "va": 1.0, "voz": "O que sentiste? Calor? Um leve formigueiro? Isto, é só o início."}, {"start": 70.1, "va": 1.0, "voz": "Nos dias vinte e três, vinte e quatro, e vinte e cinco de outubro, vais aprender a sentir esta energia, e a usá-la no teu dia a dia. Num workshop gratuito."}, {"start": 84.45, "va": 1.0, "voz": "Entra no grupo, e reserva o teu lugar. O link está na bio."}]}, {"id": "dia3_seg19", "dia": "Seg 19", "titulo": "Qual é o teu chakra dominante?", "sub": "Vídeo de 60 segundos", "total": 60.0717029478458, "cenas": [{"start": 0, "va": 1.0, "voz": "Sabias que existem, sete centros de energia, em ti?"}, {"start": 7.17, "va": 1.0, "voz": "Raiz, a segurança. Sacro, a criatividade. Plexo solar, a confiança. Coração, o amor. Garganta, a expressão. Terceiro olho, a intuição. Coroa, a espiritualidade."}, {"start": 28.63, "va": 1.0, "voz": "Mas há um, que fala mais alto, em ti."}, {"start": 34.54, "va": 1.0, "voz": "Qual é, o teu chakra dominante?"}, {"start": 40.04, "va": 1.0, "voz": "Vais descobrir, no workshop gratuito, nos dias vinte e três, vinte e quatro, e vinte e cinco de outubro, às vinte e uma horas."}, {"start": 52.57, "va": 1.0, "voz": "Entra no grupo, e reserva o teu lugar. O link está na bio."}]}, {"id": "dia4_ter20", "dia": "Ter 20", "titulo": "Uma técnica simples", "sub": "Vídeo de 76 segundos", "total": 76.41165986394557, "cenas": [{"start": 0, "va": 1.0, "voz": "Queres experimentar, uma técnica simples? Leva um minuto."}, {"start": 7.05, "va": 1.0, "voz": "Senta-te com a coluna direita, e apoia os pés no chão."}, {"start": 13.25, "va": 1.0, "voz": "Coloca uma mão no peito, e a outra na barriga."}, {"start": 19.15, "va": 1.0, "voz": "Inspira pelo nariz, em quatro tempos. Expira devagar, em seis tempos. Repete, mais duas vezes."}, {"start": 55.15, "va": 1.0, "voz": "Como te sentes, agora?"}, {"start": 60.15, "va": 1.0, "voz": "No workshop gratuito, vais aprender mais técnicas como esta, para usares no teu dia a dia."}, {"start": 68.91, "va": 1.0, "voz": "Entra no grupo, e reserva o teu lugar. O link está na bio."}]}, {"id": "dia5_qua21", "dia": "Qua 21", "titulo": "Quem te vai guiar", "sub": "Vídeo de 57 segundos", "total": 56.64256462585034, "cenas": [{"start": 0, "va": 1.0, "voz": "Olá. Chamo-me Ricardo Correia, e sou mestre e formador de Reiki tradicional."}, {"start": 7.63, "va": 1.0, "voz": "Comecei a praticar Reiki aos trinta e três anos, num workshop, em Guimarães."}, {"start": 15.65, "va": 1.0, "voz": "Hoje, acompanho adultos, jovens e crianças, e ensino quem quer aprender."}, {"start": 24.49, "va": 1.0, "voz": "Criei a Escola de Reiki Hikari Fafe, para aprenderes ao teu ritmo, com acompanhamento, online ou presencial."}, {"start": 34.58, "va": 1.0, "voz": "O workshop gratuito, é o primeiro passo. Nos dias vinte e três, vinte e quatro, e vinte e cinco de outubro, às vinte e uma horas."}, {"start": 46.91, "va": 1.0, "voz": "Vai ser um prazer, receber-te. Entra no grupo, e reserva o teu lugar. O link está na bio."}]}, {"id": "dia6_qui22", "dia": "Qui 22", "titulo": "Amanhã às 21h", "sub": "Vídeo de 39 segundos", "total": 39.38647619047619, "cenas": [{"start": 0, "va": 1.0, "voz": "Amanhã, às vinte e uma horas, começa."}, {"start": 6.46, "va": 1.0, "voz": "Prepara um espaço calmo, onde ninguém te interrompa."}, {"start": 12.46, "va": 1.0, "voz": "Tem contigo um copo de água, e um caderno, para os teus apontamentos."}, {"start": 20.08, "va": 1.0, "voz": "Veste roupa confortável, e liga-te uns minutos antes."}, {"start": 26.36, "va": 1.0, "voz": "Ainda não entraste no grupo? Entra agora, e não percas nada. O link está na bio."}, {"start": 35.39, "va": 1.0, "voz": "Até amanhã."}]}, {"id": "dia7_sex23", "dia": "Sex 23", "titulo": "É hoje", "sub": "Vídeo de 32 segundos", "total": 32.269340136054424, "cenas": [{"start": 0, "va": 1.0, "voz": "É hoje."}, {"start": 4.0, "va": 1.0, "voz": "Às vinte e uma horas, começa o workshop gratuito de Reiki."}, {"start": 10.53, "va": 1.0, "voz": "Vais sentir o Reiki, aprender técnicas simples, e descobrir o teu chakra dominante."}, {"start": 19.18, "va": 1.0, "voz": "Ainda vais a tempo. Entra no grupo, agora. O link está na bio."}, {"start": 27.27, "va": 1.0, "voz": "Vemo-nos, logo à noite."}]}];
const MEDS = [{"id": "respirar", "titulo": "Voltar a ti", "sub": "Meditação de respiração · cerca de 6 min", "linhas": [["Antes de começares, encontra um lugar calmo.", 3], ["Senta-te com conforto, ou deita-te, como o teu corpo preferir.", 4], ["Fecha os olhos, se te sentires bem assim.", 5], ["Vamos começar por aqui, pelo agora.", 4], ["Inspira devagar pelo nariz.", 4], ["E solta o ar pela boca, sem pressa.", 6], ["Mais uma vez. Inspira, enchendo o peito.", 4], ["E expira, deixando ir o dia.", 8], ["Agora, deixa a respiração voltar ao seu ritmo natural.", 6], ["Não precisas de a controlar. Basta observá-la.", 8], ["Sente o ar a entrar. E a sair.", 10], ["Se surgirem pensamentos, está tudo bem.", 4], ["Repara neles, como quem vê nuvens a passar, e volta à respiração.", 10], ["Leva agora a atenção aos pés.", 4], ["Sente o contacto com o chão, ou com a cama.", 6], ["Deixa os pés ficarem pesados, relaxados.", 8], ["Sobe devagar pelas pernas. Deixa-as soltar.", 8], ["Sente a barriga a subir e a descer.", 6], ["Solta os ombros. Deixa-os cair, longe das orelhas.", 8], ["Relaxa o maxilar. A testa. O espaço entre as sobrancelhas.", 10], ["Agora, imagina uma luz suave, dourada, no centro do peito.", 6], ["A cada inspiração, ela cresce um pouco.", 6], ["A cada expiração, espalha calor por todo o corpo.", 12], ["Fica aqui, nesta calma, o tempo que precisares.", 30], ["Agora, vamos regressar devagar.", 4], ["Move os dedos das mãos e dos pés.", 5], ["Faz uma respiração mais funda.", 5], ["E quando estiveres pronto, abre os olhos.", 5], ["Leva contigo esta calma, para o resto do dia.", 4], ["Obrigado.", 2]]}, {"id": "maos", "titulo": "A energia nas mãos", "sub": "Meditação de Reiki · cerca de 8 min", "linhas": [["Senta-te com a coluna direita, mas sem rigidez.", 3], ["Apoia as mãos sobre as pernas, com as palmas para cima.", 4], ["Fecha os olhos e respira fundo, três vezes.", 12], ["Inspira. E solta.", 8], ["Agora, esfrega as palmas das mãos uma na outra, durante dez segundos.", 10], ["Pára. E afasta-as uns centímetros.", 5], ["Sente o que há entre as tuas mãos.", 6], ["Pode ser calor, um formigueiro, uma leve pressão. Ou apenas silêncio.", 8], ["Tudo o que sentires está certo.", 6], ["Aproxima e afasta devagar as mãos, como se tivesses uma bola de energia entre elas.", 14], ["Mantém a atenção nas palmas.", 10], ["Agora, pousa uma mão sobre o peito, e a outra sobre a barriga.", 6], ["Respira para as tuas mãos.", 8], ["Sente o calor das mãos a encontrar o teu corpo.", 12], ["Imagina que cada inspiração traz luz.", 5], ["E que cada expiração solta o que já não precisas de carregar.", 12], ["Se quiseres, diz mentalmente: eu estou em paz.", 10], ["Fica aqui, com as mãos pousadas.", 30], ["Agora, leva as mãos ao rosto, sobre os olhos, sem pressionar.", 6], ["Sente a escuridão suave e o calor.", 20], ["Passa as mãos devagar pela cara, pelo pescoço, até ao peito.", 10], ["Pousa-as de novo sobre as pernas.", 5], ["Agradece a ti próprio por este tempo.", 8], ["Faz uma respiração profunda.", 5], ["Move o corpo devagar. E abre os olhos quando quiseres.", 5], ["Esta energia está sempre contigo.", 3], ["Obrigado.", 2]]}];
export const TENANT_ESTUDIO = 'hikari-terapias';
const FORMATOS = { audio: 'só áudio', cartaz: 'vídeo com legendas', camara: 'vídeo com a tua cara' };
const PROPS = { '9:16': [720, 1280], '4:5': [800, 1000], '1:1': [800, 800] };
const TEMAS = {
  roxo: { txt: '#FAF5EA', dim: '#8F89B4', hi: '#E8BE64' },
  creme: { txt: '#2A2433', dim: '#A79E92', hi: '#8A5A1F' },
  escuro: { txt: '#FAF5EA', dim: '#7C7799', hi: '#E8BE64' },
  foto: { txt: '#FFFFFF', dim: '#C9C4D8', hi: '#E8BE64' }
};
const MODELOS = [
  { nome: 'Anúncio do workshop', titulo: 'Workshop de Reiki', formato: 'cartaz', cta: 'Entra no grupo · link na bio', texto: 'Hoje, às vinte e uma horas, workshop de Reiki, gratuito e online.\nDescobre o que é o Reiki, sem mistérios.\nSente a energia nas tuas mãos.\nEntra no grupo de WhatsApp e recebe o link.' },
  { nome: 'Os 5 princípios', titulo: 'Só por hoje', formato: 'cartaz', cta: 'Os 5 princípios do Reiki', texto: 'Só por hoje, sou calmo.\nSó por hoje, confio.\nSó por hoje, sou grato.\nSó por hoje, trabalho honestamente.\nSó por hoje, sou bondoso.' },
  { nome: 'Dica de 1 minuto', titulo: 'Respirar em um minuto', formato: 'camara', cta: '', texto: 'Queres uma pausa de um minuto?\nSenta-te com a coluna direita e apoia os pés no chão.\nPõe uma mão no peito e a outra na barriga.\nInspira pelo nariz, em quatro tempos. | 4\nExpira devagar, em seis tempos. | 6\nRepete mais duas vezes. | 12\nComo te sentes agora?' },
  { nome: 'Convite para a formação', titulo: 'Aprende Reiki ao teu ritmo', formato: 'cartaz', cta: 'Entra no grupo · link na bio', texto: 'Queres aprender Reiki ao teu ritmo?\nNa Escola de Reiki Hikari Fafe tens acompanhamento, online ou presencial.\nA próxima turma online começa a dois de novembro.\nEntra no grupo e reserva o teu lugar.' }
];

let limparAnterior = null;

function palavras(t){ return String(t).split(/\s+/).filter(Boolean).length; }
function fmt(s){ s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }

/* "frase | pausa em segundos" — sem pausa indicada, 5 s. Linha em branco acrescenta 8 s à pausa anterior. */
export function lerTexto(txt, padrao, extra){
  if (padrao == null) padrao = 5; if (extra == null) extra = 8;
  const out = [];
  String(txt || '').split(/\r?\n/).forEach(l => {
    const s = l.trim();
    if (!s){ if (out.length) out[out.length - 1][1] += extra; return; }
    const m = s.match(/^(.*?)\s*\|\s*(\d{1,3})\s*$/);
    out.push(m ? [m[1].trim(), parseInt(m[2], 10)] : [s, padrao]);
  });
  return out.filter(x => x[0]);
}
/* Texto colado de uma legenda de redes sociais: tira links, #hashtags, @menções, emojis e marcas de formatação,
   e parte em frases curtas, uma por linha, para caberem no ecrã. */
function partirFrase(f){
  const ws = f.split(/\s+/).filter(Boolean);
  if (ws.length <= 12) return [ws.join(' ')];
  const partes = f.replace(/([,;])\s+/g, '$1\n').split('\n'); const out = []; let cur = '';
  partes.forEach(p => { if (cur && (cur + ' ' + p).trim().split(/\s+/).length > 12){ out.push(cur.trim()); cur = p; } else cur = (cur + ' ' + p).trim(); });
  if (cur) out.push(cur.trim());
  return out.flatMap(p => { const w = p.split(/\s+/).filter(Boolean); if (w.length <= 14) return [p]; const r = []; for (let i = 0; i < w.length; i += 10) r.push(w.slice(i, i + 10).join(' ')); return r; });
}
export function prepararTexto(raw){
  let t = String(raw || '');
  t = t.replace(/https?:\/\/\S+/gi, ' ').replace(/\bwww\.\S+/gi, ' ');
  t = t.replace(/[#@][\p{L}\p{N}_]+/gu, ' ');
  t = t.replace(/[\p{Extended_Pictographic}\u200d\ufe0f\u20e3]/gu, ' ');
  t = t.replace(/[*_`>~]+/g, '').replace(/[ \t]+/g, ' ');
  const out = [];
  t.split(/\r?\n/).map(l => l.trim()).forEach(l => {
    if (!l || !/[\p{L}\p{N}]/u.test(l)) return;
    const m = l.match(/^(.*?)\s*\|\s*(\d{1,3})$/); const base = m ? m[1] : l; const pausa = m ? ' | ' + m[2] : '';
    const frases = base.replace(/([.!?…:])\s+/g, '$1\n').split('\n').map(x => x.trim()).filter(x => /[\p{L}\p{N}]/u.test(x));
    frases.forEach((f, i) => { const ps = partirFrase(f); ps.forEach((q, j) => out.push(q + (i === frases.length - 1 && j === ps.length - 1 ? pausa : ''))); });
  });
  return out.join('\n');
}
const lerPub = txt => lerTexto(prepararTexto(txt), 0.8, 1);
function cronometrar(linhas, rate, cta){
  let t = 1.5; const itens = [];
  linhas.forEach(([text, p]) => { const d = palavras(text) / (rate || 2.3) + 0.5; itens.push({ t, text, pausa: p, dur: d }); t += d + p; });
  return { itens, total: t + (cta ? 3.5 : 0.8) };
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
  let fotoEl = null, logoImg = null, pubId = null, falando = false, semVoz = false;
  const ps = { formato: 'cartaz', prop: '9:16', fundo: 'roxo' };

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
   .ev select{background:var(--evbg);color:var(--evf);border:1px solid var(--evl);border-radius:10px;padding:8px;font:inherit;min-height:44px;max-width:100%}
   .ev canvas{width:100%;height:100%;display:block}
   .ev .evphone{position:relative}
   .ev label.evm{display:block;margin:10px 0 4px}
   .ev .evmod button{min-height:38px;padding:6px 12px;font-size:.9rem}
   @media(max-width:700px){.ev .evstage{grid-template-columns:1fr}.ev .evphone{max-width:220px;margin:0 auto}}
  </style>
  <div class="ev" id="ev-root">
   <div><h2 style="font-size:1.7rem;">🎙️ Estúdio de Voz</h2>
    <p class="evm">Lê o texto que vai passando e grava a tua voz. Escolhe um vídeo da semana, uma meditação guiada, ou cria uma publicação nova em áudio ou vídeo. Exclusivo da Hikari Fafe.</p></div>
   <div class="evrow"><button id="ev-tv" aria-pressed="true">Vídeos da semana</button><button id="ev-tm" aria-pressed="false">Meditações guiadas</button><button id="ev-tc" aria-pressed="false">✨ Criar</button><button id="ev-tp" aria-pressed="false">Plano de publicações</button></div>
   <div class="evchips" id="ev-chips"></div>
   <div class="evstage" id="ev-stage">
    <div class="evphone" id="ev-phone" hidden><video id="ev-vid" playsinline muted></video><canvas id="ev-cv" width="720" height="1280" hidden></canvas><video id="ev-cam" playsinline muted style="position:absolute;width:2px;height:2px;opacity:0;pointer-events:none"></video></div>
    <div class="evread">
     <div><h3 id="ev-t" style="font-size:1.5rem;"></h3><p class="evm" id="ev-s"></p></div>
     <div class="evscript" id="ev-script"></div>
     <div class="evbar" id="ev-pz" hidden><i id="ev-pzi"></i></div>
     <div class="evbar evlvl" aria-hidden="true"><i id="ev-lvl"></i></div>
     <div class="evrow">
      <button class="evmain" id="ev-go">Gravar e ler</button><button id="ev-ler">Só ler (sem gravar)</button><button id="ev-stop" disabled>Parar</button>
      <span class="evm" id="ev-clock" style="margin-left:auto;font-variant-numeric:tabular-nums;">0:00</span>
     </div>
     <div class="evm" id="ev-vrow">Vídeo (opcional, para veres as imagens): <input type="file" id="ev-vf" accept="video/*"> <button id="ev-mus" aria-pressed="false">Música do vídeo: desligada</button><br>Com a música ligada, usa auscultadores.</div>
     <div class="evrow" id="ev-medtools" hidden>
      <button id="ev-new">+ Nova meditação</button><button id="ev-edit" hidden>✏️ Editar</button><button id="ev-del" hidden>🗑️ Apagar</button>
     </div>
     <div class="evrow" id="ev-ctools" hidden>
      <button id="ev-cnew">+ Nova publicação</button><button id="ev-ccartaz">🖼️ Cartaz (imagem)</button><button id="ev-cvideo">🎬 Vídeo sem voz</button><button id="ev-cedit">✏️ Editar</button><button id="ev-cdel">🗑️ Apagar</button>
      <select id="ev-voz" aria-label="Voz do aparelho"></select><button id="ev-ouvir">🔊 Ouvir texto</button>
      <p class="evm" style="flex-basis:100%">«Ouvir» usa a voz do telemóvel só para testares o ritmo e não grava. Para publicar, grava a tua voz.</p>
     </div>
     <div class="everr" id="ev-err" role="alert" style="min-height:1.4em"></div>
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
   <div id="ev-peditor" hidden>
    <h3 style="font-size:1.2rem;margin-bottom:8px;">Publicação nova</h3>
    <p class="evm">Começa por um modelo, se quiseres, e muda o texto à tua maneira.</p>
    <div class="evrow evmod" id="ev-pmod"></div>
    <label class="evm" for="ev-pt">Título</label>
    <input type="text" id="ev-pt" placeholder="Ex.: Workshop de Reiki, hoje às 21h">
    <label class="evm" for="ev-px">O texto da publicação (podes colar uma legenda inteira)</label>
    <textarea id="ev-px" rows="9" placeholder="Escreve como falas. Cada linha é uma frase que aparece no ecrã.&#10;Se quiseres uma pausa maior, põe | e os segundos no fim da linha. Exemplo: Respira fundo. | 5"></textarea>
    <div class="evrow"><button id="ev-arrumar" type="button">✨ Arrumar o texto</button><span class="evm">Tira links, hashtags e emojis e separa em frases.</span></div>
    <label class="evm" for="ev-pc">Frase final no ecrã (opcional)</label>
    <input type="text" id="ev-pc" placeholder="Ex.: Entra no grupo · link na bio">
    <label class="evm">Formato</label>
    <div class="evrow" id="ev-pf"><button data-v="audio">Só áudio</button><button data-v="cartaz">Vídeo com legendas</button><button data-v="camara">Vídeo com a minha cara</button></div>
    <label class="evm">Proporção</label>
    <div class="evrow" id="ev-pp"><button data-v="9:16">Stories e reels (9:16)</button><button data-v="4:5">Feed (4:5)</button><button data-v="1:1">Quadrado (1:1)</button></div>
    <label class="evm">Fundo</label>
    <div class="evrow" id="ev-pb"><button data-v="roxo">Roxo e dourado</button><button data-v="creme">Creme</button><button data-v="escuro">Escuro</button><button data-v="foto">Foto ou vídeo meu</button></div>
    <input type="file" id="ev-pbf" accept="image/*,video/*" style="margin-top:6px">
    <p class="evm">A foto ou o vídeo de fundo não ficam guardados: escolhe-os outra vez quando voltares. Com «Vídeo com a minha cara» o fundo é a câmara.</p>
    <label class="evm" for="ev-ia">🎨 Ou cria uma imagem nova (descreve o que queres)</label>
    <textarea id="ev-ia" rows="2" placeholder="Ex.: amanhecer dourado sobre montanhas, luz suave, ambiente calmo"></textarea>
    <div class="evrow" style="margin-top:6px"><button id="ev-iag">Criar imagem</button><a class="evmain" id="ev-iad" download="fundo.png" hidden>Guardar imagem</a></div>
    <p class="evm" id="ev-iam"></p>
    <label class="evm" for="ev-pr">Ritmo da leitura</label>
    <select id="ev-pr"><option value="1.8">Calmo</option><option value="2.3" selected>Normal</option><option value="2.8">Rápido</option></select>
    <p class="evm" id="ev-pe" style="margin-top:8px"></p>
    <div class="evrow" style="margin-top:8px"><button class="evmain" id="ev-pgm">🎙️ Guardar e gravar vídeo com a minha voz</button><button class="evmain" id="ev-pgv">🎬 Guardar e gerar vídeo sem voz</button></div>
    <div class="evrow" style="margin-top:8px"><button class="evmain" id="ev-pgc">🖼️ Guardar e gerar cartaz (imagem)</button></div>
    <div class="evrow" style="margin-top:8px"><button id="ev-psave">Só guardar</button><button id="ev-pcancel">Cancelar</button></div>
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
  const vid = $('ev-vid'); const camEl = $('ev-cam');
  let editId = null;

  function lista(){
    if (modo === 'v') return VIDEOS;
    const custom = ctx.getCustom() || [];
    if (modo === 'c') return custom.filter(m => m.tipo === 'pub').map(m => ({ id: m.id, titulo: m.titulo, sub: 'Publicação · ' + (FORMATOS[m.formato] || 'só áudio'), linhas: lerPub(m.texto), propria: true, pub: true, texto: m.texto, cta: m.cta || '', formato: m.formato || 'audio', prop: m.prop || '9:16', fundo: m.fundo || 'roxo', ritmo: m.ritmo || 2.3 }));
    const proprias = custom.filter(m => m.tipo !== 'pub').map(m => ({ id: m.id, titulo: m.titulo, sub: 'Meditação própria', linhas: lerTexto(m.texto), propria: true, texto: m.texto }));
    return MEDS.concat(proprias);
  }
  function desenhar(){
    const L = lista(); const vazio = !L.length;
    if (cur >= L.length) cur = 0;
    const chips = $('ev-chips'); chips.innerHTML = '';
    L.forEach((x, i) => { const b = document.createElement('button'); b.textContent = modo === 'v' ? x.dia : x.titulo; b.setAttribute('aria-pressed', i === cur); b.onclick = () => { if (correr) parar(false); pararVoz(); cur = i; temVid = false; vid.removeAttribute('src'); desenhar(); }; chips.appendChild(b); });
    const sc = $('ev-script'); sc.innerHTML = '';
    $('ev-vrow').hidden = modo !== 'v'; $('ev-pz').hidden = modo === 'v'; $('ev-medtools').hidden = modo !== 'm'; $('ev-ctools').hidden = modo !== 'c';
    if (vazio){
      $('ev-t').textContent = 'Ainda sem publicações'; $('ev-s').textContent = '';
      sc.innerHTML = '<p class="evm" style="padding:0 6px">Carrega em «+ Nova publicação» e escolhe um modelo para começares.</p>';
      itens = []; total = 0; $('ev-phone').hidden = true; $('ev-stage').style.gridTemplateColumns = '1fr';
      $('ev-cedit').hidden = $('ev-cdel').hidden = $('ev-ouvir').hidden = $('ev-voz').hidden = true;
      $('ev-go').disabled = $('ev-ler').disabled = true; $('ev-clock').textContent = '0:00'; return;
    }
    $('ev-go').disabled = $('ev-ler').disabled = false;
    $('ev-cedit').hidden = $('ev-cdel').hidden = $('ev-ouvir').hidden = false; $('ev-voz').hidden = !vozes().length;
    const x = L[cur];
    $('ev-t').textContent = x.titulo;
    const cv = modo === 'c' && x.formato !== 'audio';
    $('ev-phone').hidden = !(cv || (modo === 'v' && temVid));
    $('ev-vid').hidden = modo === 'c'; $('ev-cv').hidden = modo !== 'c';
    $('ev-phone').style.aspectRatio = cv ? (PROPS[x.prop] || PROPS['9:16']).join('/') : '9/16';
    $('ev-stage').style.gridTemplateColumns = (cv || (modo === 'v' && temVid)) ? '' : '1fr';
    $('ev-edit').hidden = $('ev-del').hidden = !x.propria;
    if (modo === 'v'){ itens = x.cenas.filter(c => c.voz).map(c => ({ t: c.start + c.va, text: c.voz })); total = x.total; $('ev-s').textContent = x.sub; }
    else if (modo === 'c'){
      const r = cronometrar(x.linhas, x.ritmo, x.cta); itens = r.itens; total = r.total;
      $('ev-s').textContent = x.sub + ' · cerca de ' + fmt(total) + (x.fundo === 'foto' && !fotoEl ? ' · escolhe outra vez a foto de fundo' : '');
      const d = PROPS[x.prop] || PROPS['9:16']; const c = $('ev-cv'); if (c.width !== d[0] || c.height !== d[1]){ c.width = d[0]; c.height = d[1]; }
    }
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
    if (modo === 'c') pintarCv(0);
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
    if (modo !== 'v'){ const it = itens[k]; let f = 0; if (it){ const fim = it.t + it.dur; f = t > fim ? Math.min(1, (t - fim) / it.pausa) : 0; } $('ev-pzi').style.width = (f * 100) + '%'; }
  }
  function nivel(){ if (!ana) return; const a = new Uint8Array(ana.fftSize); ana.getByteTimeDomainData(a); let m = 0; for (const v of a) m = Math.max(m, Math.abs(v - 128)); $('ev-lvl').style.width = Math.min(100, m * 1.6) + '%'; }
  function tick(){
    if (!correr) return;
    if (!document.getElementById('ev-root')){ parar(false); return; }
    const t = agora(); $('ev-clock').textContent = fmt(t) + ' / ' + fmt(total); nivel();
    if (t > total + 1 || (modo === 'v' && temVid && vid.ended)){ parar(true); return; }
    pintar(t); if (modo === 'c') pintarCv(t); raf = requestAnimationFrame(tick);
  }
  function soltarMic(){ if (camEl) camEl.srcObject = null; if (stream){ stream.getTracks().forEach(tr => tr.stop()); stream = null; } if (actx){ try { actx.close(); } catch(e){} actx = null; ana = null; } }
  async function abrirMic(video){
    stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: true, autoGainControl: false }, video: video ? { facingMode: 'user', width: { ideal: 1080 }, height: { ideal: 1920 } } : false });
    actx = new (window.AudioContext || window.webkitAudioContext)(); ana = actx.createAnalyser(); ana.fftSize = 512; actx.createMediaStreamSource(stream).connect(ana);
    if (video){ camEl.srcObject = stream; try { await camEl.play(); } catch(e){} }
  }
  function tipoVideo(){ return ['video/mp4;codecs=avc1.42E01E,mp4a.40.2', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'].find(m => window.MediaRecorder && MediaRecorder.isTypeSupported(m)) || ''; }
  function comecar(){
    rec = null;
    if (stream || semVoz){
      const xx = lista()[cur]; const comVideo = modo === 'c' && xx && xx.formato !== 'audio';
      let fonte = stream, mt = '';
      if (comVideo){ mt = tipoVideo(); const cs = $('ev-cv').captureStream(30); if (stream) stream.getAudioTracks().forEach(tr => cs.addTrack(tr)); fonte = cs; }
      else { const tipos = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm']; mt = tipos.find(m => window.MediaRecorder && MediaRecorder.isTypeSupported(m)) || ''; }
      pedacos = []; rec = new MediaRecorder(fonte, mt ? Object.assign({ mimeType: mt }, comVideo ? { videoBitsPerSecond: 4000000 } : {}) : {});
      const nome = lista()[cur];
      rec.ondataavailable = e => { if (e.data.size) pedacos.push(e.data); };
      const tipo = mt;
      rec.onstop = () => { guardarTake(rec.mimeType || tipo || 'audio/webm', nome); soltarMic(); };
      rec.start(1000);
    }
    correr = true; $('ev-go').innerHTML = (stream || semVoz) ? '<span class="evrec"></span>A gravar' : 'A ler…'; $('ev-go').disabled = true; $('ev-ler').disabled = true; $('ev-stop').disabled = false;
    if (modo === 'v' && temVid){ vid.currentTime = 0; vid.muted = $('ev-mus').getAttribute('aria-pressed') !== 'true'; vid.play().catch(() => {}); }
    t0 = performance.now(); raf = requestAnimationFrame(tick);
  }
  function guardarTake(tipo, x){
    const blob = new Blob(pedacos, { type: tipo }); const isVid = String(tipo).startsWith('video');
    const ext = String(tipo).includes('mp4') ? (isVid ? 'mp4' : 'm4a') : 'webm';
    nTakes++; const url = URL.createObjectURL(blob); urls.push(url);
    const base = modo === 'v' ? x.id : modo === 'c' ? (String(x.titulo).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'publicacao') : 'meditacao_' + String(x.id);
    const nomeF = base + '_take' + nTakes + '.' + ext;
    if (nTakes === 1) $('ev-takes').innerHTML = '';
    const d = document.createElement('div'); d.className = 'evtake';
    d.innerHTML = '<span></span>' + (isVid ? '<video controls playsinline style="flex:1 1 150px;max-width:160px;max-height:290px;border-radius:10px"></video>' : '<audio controls></audio>') + '<a class="evmain" download>Guardar</a><button type="button" data-a="partilhar" hidden>Partilhar</button>';
    d.querySelector('span').textContent = x.titulo + ' · take ' + nTakes; d.querySelector(isVid ? 'video' : 'audio').src = url;
    const a = d.querySelector('a'); a.href = url; a.download = nomeF; const ficheiro = new File([blob], nomeF, { type: String(tipo).split(';')[0] });
    const pt = d.querySelector('[data-a=partilhar]');
    try {
      if (navigator.canShare && navigator.canShare({ files: [ficheiro] })){
        pt.hidden = false;
        pt.onclick = async () => { try { await navigator.share({ files: [ficheiro], title: x.titulo }); } catch(e){ if (!e || e.name !== 'AbortError') ctx.toast('Não consegui abrir a partilha. Usa o botão Guardar.', true); } };
      }
    } catch(e){}
    $('ev-takes').prepend(d);
  }
  function parar(fim){
    correr = false; semVoz = false; cancelAnimationFrame(raf); clearInterval(tmr); $('ev-count').hidden = true; $('ev-lvl').style.width = '0';
    if (rec && rec.state !== 'inactive') rec.stop(); else soltarMic();
    if (temVid) vid.pause();
    $('ev-go').disabled = false; $('ev-ler').disabled = false; $('ev-go').textContent = fim ? 'Gravar outra vez' : 'Gravar e ler'; $('ev-stop').disabled = true;
    if (!fim){ itens.forEach(it => it.el.className = 'evln'); $('ev-script').scrollTop = 0; }
    if (modo === 'c') pintarCv(fim ? 0 : 0);
  }
  function avisar(msg){ $('ev-err').textContent = msg; if (msg) ctx.toast(msg, true); }
  function contagem(){
    let n = 3; $('ev-count').hidden = false; $('ev-count').textContent = n; $('ev-go').disabled = true; $('ev-ler').disabled = true;
    tmr = setInterval(() => { n--; if (n <= 0){ clearInterval(tmr); $('ev-count').hidden = true; comecar(); } else $('ev-count').textContent = n; }, 1000);
  }
  $('ev-go').onclick = async () => {
    avisar('');
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder){
      avisar('Este ecrã não permite gravar. Abre a Vindora no Chrome (vindora.pt) ou carrega em «Só ler» e grava com o gravador do telemóvel.'); return;
    }
    const xs = lista()[cur]; const comVideo = modo === 'c' && xs && xs.formato !== 'audio'; const comCam = modo === 'c' && xs && xs.formato === 'camara';
    if (comVideo && !$('ev-cv').captureStream){ avisar('Este telemóvel não grava vídeo a partir do ecrã. Escolhe «Só áudio» na publicação, ou abre a Vindora no Chrome.'); return; }
    $('ev-go').disabled = true; $('ev-err').style.color = '#a9a3c7'; $('ev-err').textContent = comCam ? 'A pedir a câmara e o microfone… aceita a permissão quando o telemóvel perguntar.' : 'A pedir o microfone… aceita a permissão quando o telemóvel perguntar.';
    try {
      await Promise.race([abrirMic(comCam), new Promise((_, rej) => setTimeout(() => rej(new Error('tempo')), 12000))]);
    } catch(e){
      $('ev-go').disabled = false; $('ev-err').style.color = '';
      soltarMic();
      avisar(e && e.message === 'tempo'
        ? 'O telemóvel não respondeu ao pedido do microfone. Abre a Vindora no Chrome, ou carrega em «Só ler» e grava com o gravador do telemóvel.'
        : 'Não consegui aceder ao microfone' + (comCam ? ' ou à câmara' : '') + '. Permite-os para este site nas definições do browser, ou carrega em «Só ler».');
      return;
    }
    $('ev-err').style.color = ''; $('ev-err').textContent = '';
    contagem();
  };
  $('ev-ler').onclick = () => { avisar(''); soltarMic(); contagem(); };
  $('ev-stop').onclick = () => parar(false);
  $('ev-vf').onchange = () => { const f = $('ev-vf').files[0]; if (!f) return; const u = URL.createObjectURL(f); urls.push(u); vid.src = u; temVid = true; desenhar(); };
  $('ev-mus').onclick = () => { const on = $('ev-mus').getAttribute('aria-pressed') !== 'true'; $('ev-mus').setAttribute('aria-pressed', on); $('ev-mus').textContent = 'Música do vídeo: ' + (on ? 'ligada' : 'desligada'); vid.muted = !on; };
  function trocar(m){
    if (correr) parar(false); pararVoz(); modo = m; cur = 0; temVid = false; vid.removeAttribute('src'); $('ev-editor').hidden = true; $('ev-peditor').hidden = true;
    $('ev-tv').setAttribute('aria-pressed', m === 'v'); $('ev-tm').setAttribute('aria-pressed', m === 'm'); $('ev-tc').setAttribute('aria-pressed', m === 'c'); $('ev-tp').setAttribute('aria-pressed', m === 'p');
    const plano = m === 'p';
    $('ev-chips').hidden = plano; $('ev-stage').hidden = plano; $('ev-takesbox').hidden = plano; $('ev-plan').hidden = !plano;
    if (plano) desenharPlano(); else { desenhar(); if (m === 'c' && !lista().length) abrirPub(null); }
  }
  $('ev-tv').onclick = () => trocar('v'); $('ev-tm').onclick = () => trocar('m'); $('ev-tc').onclick = () => trocar('c'); $('ev-tp').onclick = () => trocar('p');

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
    try { await ctx.save(nova); ctx.toast('Meditação guardada.'); $('ev-editor').hidden = true; cur = MEDS.length + nova.filter(m => m.tipo !== 'pub').findIndex(m => m.id === item.id); desenhar(); }
    catch(e){ ctx.toast('Não consegui guardar: ' + (e.message || e), true); }
  };
  $('ev-del').onclick = async () => {
    const x = lista()[cur]; if (!x || !x.propria) return;
    if (!await ctx.confirmar('Apagar meditação', 'Apagar "' + x.titulo + '"?\n\nEsta acção não pode ser desfeita.')) return;
    try { await ctx.save((ctx.getCustom() || []).filter(m => m.id !== x.id)); ctx.toast('Meditação apagada.'); cur = 0; desenhar(); }
    catch(e){ ctx.toast('Não consegui apagar: ' + (e.message || e), true); }
  };

  /* ✨ Criar: publicações novas (áudio, vídeo com legendas, vídeo com a câmara) */
  function logo(){ if (!logoImg){ logoImg = new Image(); logoImg.onload = () => { if (modo === 'c' && !correr) pintarCv(0); }; logoImg.src = './logo-hikari-fafe.png'; } return logoImg; }
  function cobrir(g, el, W, H){
    const sw = el.videoWidth || el.naturalWidth || el.width, sh = el.videoHeight || el.naturalHeight || el.height; if (!sw || !sh) return false;
    const k = Math.max(W / sw, H / sh), w = sw * k, h = sh * k; g.drawImage(el, (W - w) / 2, (H - h) / 2, w, h); return true;
  }
  function quebrar(g, texto, maxW){
    const sp = g.measureText(' ').width; const linhas = [[]]; let cw = 0;
    texto.split(/\s+/).filter(Boolean).forEach(w => { const ww = g.measureText(w).width; if (cw + ww > maxW && linhas[linhas.length - 1].length){ linhas.push([]); cw = 0; } linhas[linhas.length - 1].push({ w, ww }); cw += ww + sp; });
    return { linhas, sp };
  }
  function pintarCv(t){
    if (modo !== 'c') return; const x = lista()[cur]; if (!x || x.formato === 'audio') return;
    const cv = $('ev-cv'), g = cv.getContext('2d'), W = cv.width, H = cv.height;
    const cam = x.formato === 'camara' && stream && camEl.videoWidth > 0;
    const foto = x.formato !== 'camara' && x.fundo === 'foto' && fotoEl;
    const th = TEMAS[(foto || cam) ? 'foto' : (TEMAS[x.fundo] && x.fundo !== 'foto' ? x.fundo : 'roxo')];
    const sobre = !!(cam || foto);
    if (cam) cobrir(g, camEl, W, H);
    else if (foto && cobrir(g, fotoEl, W, H)){}
    else if (x.fundo === 'creme'){ const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#FAF5EA'); gr.addColorStop(1, '#F1E7D3'); g.fillStyle = gr; g.fillRect(0, 0, W, H); }
    else if (x.fundo === 'escuro'){ g.fillStyle = '#2A2433'; g.fillRect(0, 0, W, H); }
    else { const gr = g.createRadialGradient(W / 2, H * 0.25, 10, W / 2, H * 0.25, H * 0.9); gr.addColorStop(0, '#5A4380'); gr.addColorStop(0.45, '#3A2F4F'); gr.addColorStop(1, '#2A2433'); g.fillStyle = gr; g.fillRect(0, 0, W, H); }
    if (sobre){ g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(0, 0, W, H); }
    const lg = logo(); const ls = Math.round(Math.min(W, H) * 0.15);
    if (lg.complete && lg.naturalWidth){ g.save(); g.beginPath(); g.arc(W / 2, H * 0.04 + ls / 2, ls / 2, 0, Math.PI * 2); g.clip(); g.drawImage(lg, (W - ls) / 2, H * 0.04, ls, ls); g.restore(); }
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillStyle = th.hi; g.font = '700 ' + Math.round(W * 0.03) + 'px sans-serif'; g.fillText('HIKARI FAFE ESCOLA DE REIKI', W / 2, H * 0.04 + ls + W * 0.04);
    const final = x.cta && t >= total - 3.5;
    let k = -1; itens.forEach((it, i) => { if (it.t <= t + 0.2) k = i; });
    g.textAlign = 'left';
    if (final){
      const fs = Math.round(W * 0.07); g.font = '700 ' + fs + 'px Georgia, serif';
      const q = quebrar(g, x.cta, W * 0.82); const lh = fs * 1.3; const y0 = H * 0.52 - (q.linhas.length * lh) / 2;
      g.fillStyle = th.hi; q.linhas.forEach((ln, li) => { const lw = ln.reduce((a, o) => a + o.ww, 0) + q.sp * (ln.length - 1); let xx = (W - lw) / 2; ln.forEach(o => { g.fillText(o.w, xx, y0 + li * lh + lh / 2); xx += o.ww + q.sp; }); });
    } else if (k >= 0){
      const it = itens[k]; const fs = Math.round(W * 0.062); g.font = '700 ' + fs + 'px Georgia, serif';
      const q = quebrar(g, it.text, W * 0.84); const lh = fs * 1.35, bh = q.linhas.length * lh;
      const y0 = sobre ? H * 0.78 - bh / 2 : H * 0.54 - bh / 2;
      if (sobre){ g.fillStyle = 'rgba(0,0,0,.5)'; const px = W * 0.06, py = y0 - fs * 0.5, pw = W * 0.88, ph = bh + fs; g.beginPath(); if (g.roundRect) g.roundRect(px, py, pw, ph, 24); else g.rect(px, py, pw, ph); g.fill(); }
      const f = Math.min(1, Math.max(0, (t - it.t) / it.dur)); const tot = it.text.split(/\s+/).filter(Boolean).reduce((a, w) => a + w.length + 1, 0); let ac = 0;
      q.linhas.forEach((ln, li) => { const lw = ln.reduce((a, o) => a + o.ww, 0) + q.sp * (ln.length - 1); let xx = (W - lw) / 2; ln.forEach(o => { const a0 = ac / tot; ac += o.w.length + 1; g.fillStyle = a0 < f ? th.hi : th.txt; g.fillText(o.w, xx, y0 + li * lh + lh / 2); xx += o.ww + q.sp; }); });
    }
    g.fillStyle = th.hi; g.globalAlpha = 0.9; g.fillRect(0, H - 8, W * Math.min(1, t / (total || 1)), 8); g.globalAlpha = 1;
  }
  /* Ouvir com a voz do aparelho (só para testar o ritmo, não grava) */
  const sv = window.speechSynthesis;
  function vozes(){ try { return sv ? sv.getVoices().filter(v => /^pt/i.test(v.lang)).sort((a, b) => (/pt[-_]PT/i.test(b.lang) ? 1 : 0) - (/pt[-_]PT/i.test(a.lang) ? 1 : 0)) : []; } catch(e){ return []; } }
  function listarVozes(){ const L = vozes(), sel = $('ev-voz'); sel.innerHTML = ''; L.forEach((v, i) => { const o = document.createElement('option'); o.value = i; o.textContent = v.name + ' (' + v.lang + ')'; sel.appendChild(o); }); sel.hidden = !L.length || modo !== 'c'; }
  function pararVoz(){ falando = false; try { if (sv) sv.cancel(); } catch(e){} const b = main.querySelector('#ev-ouvir'); if (b) b.textContent = '🔊 Ouvir texto'; }
  if (sv){ try { sv.onvoiceschanged = listarVozes; } catch(e){} listarVozes(); }
  $('ev-ouvir').onclick = () => {
    if (falando){ pararVoz(); return; }
    const x = lista()[cur]; if (!x) return;
    if (!sv){ ctx.toast('Este aparelho não tem voz para ouvir o texto.', true); return; }
    const L = vozes(); const v = L[parseInt($('ev-voz').value, 10) || 0];
    const u = new SpeechSynthesisUtterance(x.linhas.map(l => l[0]).join('. ') + (x.cta ? '. ' + x.cta : '')); u.lang = v ? v.lang : 'pt-PT'; if (v) u.voice = v; u.rate = 0.95;
    u.onend = u.onerror = () => pararVoz(); falando = true; $('ev-ouvir').textContent = '⏹️ Parar de ouvir'; sv.speak(u);
    if (!v) ctx.toast('Não encontrei voz portuguesa neste aparelho; vai usar a voz por defeito.');
  };
  /* editor de publicações */
  function chipsDe(grupo, val){ main.querySelectorAll('#' + grupo + ' button').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === String(val))); }
  function estimar(){ const L = lerPub($('ev-px').value); const r = cronometrar(L, parseFloat($('ev-pr').value) || 2.3, $('ev-pc').value.trim()); $('ev-pe').textContent = L.length ? 'Duração estimada: ' + fmt(r.total) + (r.total > 90 ? ' (acima de 90 s, os stories cortam o vídeo)' : '') : ''; }
  function abrirPub(x){
    pubId = x ? x.id : null; $('ev-pt').value = x ? x.titulo : ''; $('ev-px').value = x ? x.texto : ''; $('ev-pc').value = x ? x.cta : '';
    ps.formato = x ? x.formato : 'cartaz'; ps.prop = x ? x.prop : '9:16'; ps.fundo = x ? x.fundo : 'roxo';
    $('ev-pr').value = String(x ? x.ritmo : 2.3); if (!$('ev-pr').value) $('ev-pr').value = '2.3';
    chipsDe('ev-pf', ps.formato); chipsDe('ev-pp', ps.prop); chipsDe('ev-pb', ps.fundo);
    $('ev-iam').textContent = ''; $('ev-iad').hidden = true; $('ev-ia').value = '';
    $('ev-peditor').hidden = false; estimar(); $('ev-peditor').scrollIntoView({ behavior: 'smooth', block: 'start' }); $('ev-pt').focus();
  }
  [['ev-pf', 'formato'], ['ev-pp', 'prop'], ['ev-pb', 'fundo']].forEach(([g, k]) => main.querySelectorAll('#' + g + ' button').forEach(b => { b.onclick = () => { ps[k] = b.dataset.v; chipsDe(g, ps[k]); }; }));
  MODELOS.forEach((m, i) => { const b = document.createElement('button'); b.textContent = m.nome; b.onclick = () => { $('ev-pt').value = m.titulo; $('ev-px').value = m.texto; $('ev-pc').value = m.cta; ps.formato = m.formato; chipsDe('ev-pf', ps.formato); estimar(); }; $('ev-pmod').appendChild(b); });
  $('ev-px').onpaste = () => setTimeout(() => {
    const v = prepararTexto($('ev-px').value); if (v && v !== $('ev-px').value.trim()){ $('ev-px').value = v; ctx.toast('Texto arrumado: tirei links, hashtags e emojis e separei em frases.'); }
    if (!$('ev-pt').value.trim()) $('ev-pt').value = ($('ev-px').value.split('\n')[0] || '').slice(0, 60);
    estimar();
  }, 0);
  $('ev-arrumar').onclick = () => { $('ev-px').value = prepararTexto($('ev-px').value); estimar(); };
  $('ev-px').oninput = estimar; $('ev-pc').oninput = estimar; $('ev-pr').onchange = estimar;
  $('ev-pbf').onchange = () => {
    const f = $('ev-pbf').files[0]; if (!f) return; const u = URL.createObjectURL(f); urls.push(u);
    if (f.type.startsWith('video')){ const v = document.createElement('video'); v.src = u; v.muted = true; v.loop = true; v.playsInline = true; v.play().catch(() => {}); fotoEl = v; }
    else { const im = new Image(); im.onload = () => { if (modo === 'c' && !correr) pintarCv(0); }; im.src = u; fotoEl = im; }
    ps.fundo = 'foto'; chipsDe('ev-pb', 'foto');
  };
  $('ev-iag').onclick = async () => {
    const d = $('ev-ia').value.trim(); const m = $('ev-iam');
    if (d.length < 4){ m.textContent = 'Descreve a imagem que queres.'; return; }
    if (!ctx.gerarImagem){ m.textContent = 'Esta versão da app ainda não tem a criação de imagens ligada.'; return; }
    $('ev-iag').disabled = true; m.textContent = 'A criar a imagem… pode demorar até 20 segundos.';
    try {
      const r = await ctx.gerarImagem(d, ps.prop);
      if (!r || !r.ok){ m.textContent = (r && (r.mensagem || r.error)) || 'Não consegui criar a imagem agora.'; return; }
      const url = 'data:' + (r.mime || 'image/png') + ';base64,' + r.imagem;
      const im = new Image(); im.onload = () => { fotoEl = im; ps.fundo = 'foto'; chipsDe('ev-pb', 'foto'); m.textContent = 'Imagem pronta e escolhida como fundo. Carrega em Guardar para a usares, ou cria outra.'; if (modo === 'c' && !correr) pintarCv(0); };
      im.onerror = () => { m.textContent = 'A imagem veio danificada. Tenta outra vez.'; };
      im.src = url; const a = $('ev-iad'); a.href = url; a.hidden = false;
    } catch(e){ m.textContent = 'Não consegui criar a imagem agora (a ligação falhou ou demorou demasiado). Tenta outra vez.'; }
    finally { $('ev-iag').disabled = false; }
  };
  function slugDe(t){ return String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'publicacao'; }
  function gerarCartaz(){
    const x = lista()[cur]; if (!x || !x.pub){ ctx.toast('Escolhe uma publicação primeiro.', true); return; }
    const d = PROPS[x.prop] || PROPS['9:16']; const k = 1.5, W = Math.round(d[0] * k), H = Math.round(d[1] * k);
    const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
    const foto = x.fundo === 'foto' && fotoEl; const th = TEMAS[foto ? 'foto' : (x.fundo !== 'foto' && TEMAS[x.fundo] ? x.fundo : 'roxo')];
    if (foto && cobrir(g, fotoEl, W, H)){ g.fillStyle = 'rgba(0,0,0,.45)'; g.fillRect(0, 0, W, H); }
    else if (x.fundo === 'creme'){ const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#FAF5EA'); gr.addColorStop(1, '#F1E7D3'); g.fillStyle = gr; g.fillRect(0, 0, W, H); }
    else if (x.fundo === 'escuro'){ g.fillStyle = '#2A2433'; g.fillRect(0, 0, W, H); }
    else { const gr = g.createRadialGradient(W / 2, H * 0.2, 10, W / 2, H * 0.2, H * 0.9); gr.addColorStop(0, '#5A4380'); gr.addColorStop(0.45, '#3A2F4F'); gr.addColorStop(1, '#2A2433'); g.fillStyle = gr; g.fillRect(0, 0, W, H); }
    const ls = Math.round(Math.min(W, H) * 0.14); const lg = logo();
    if (lg.complete && lg.naturalWidth){ g.save(); g.beginPath(); g.arc(W / 2, H * 0.04 + ls / 2, ls / 2, 0, Math.PI * 2); g.clip(); g.drawImage(lg, (W - ls) / 2, H * 0.04, ls, ls); g.restore(); }
    g.textBaseline = 'middle'; g.textAlign = 'left';
    const centrar = (txt, fs, cor, y0, maxW, peso) => { g.font = (peso || '700') + ' ' + fs + 'px Georgia, serif'; const q = quebrar(g, txt, maxW); const lh = fs * 1.3; g.fillStyle = cor; q.linhas.forEach((ln, i) => { const lw = ln.reduce((a, o) => a + o.ww, 0) + q.sp * (ln.length - 1); let xx = (W - lw) / 2; ln.forEach(o => { g.fillText(o.w, xx, y0 + i * lh + lh / 2); xx += o.ww + q.sp; }); }); return q.linhas.length * lh; };
    g.font = '700 ' + Math.round(W * 0.028) + 'px sans-serif'; g.fillStyle = th.hi; g.textAlign = 'center'; g.fillText('HIKARI FAFE ESCOLA DE REIKI', W / 2, H * 0.04 + ls + W * 0.04); g.textAlign = 'left';
    let y = H * 0.04 + ls + W * 0.09;
    y += centrar(x.titulo, Math.round(W * 0.075), th.hi, y, W * 0.84) + W * 0.04;
    const limite = H * (x.cta ? 0.83 : 0.93); let textos = x.linhas.map(l => l[0]); if (textos.length > 1 && textos[0].trim() === String(x.titulo).trim()) textos = textos.slice(1);
    let fs = Math.round(W * 0.052), altura = 0;
    const medir = f => { g.font = '600 ' + f + 'px Georgia, serif'; return textos.reduce((a, t) => a + quebrar(g, t, W * 0.8).linhas.length * f * 1.3 + f * 0.5, 0); };
    while (fs > W * 0.03 && (altura = medir(fs)) > limite - y) fs -= 2;
    textos.forEach(t => { y += centrar(t, fs, th.txt, y, W * 0.8, '600') + fs * 0.5; });
    if (x.cta){ g.font = '700 ' + Math.round(W * 0.045) + 'px Georgia, serif'; const tw = Math.min(W * 0.88, g.measureText(x.cta).width + W * 0.1); const ph = W * 0.11, py = H * 0.9 - ph / 2; g.fillStyle = th.hi; g.beginPath(); if (g.roundRect) g.roundRect((W - tw) / 2, py, tw, ph, ph / 2); else g.rect((W - tw) / 2, py, tw, ph); g.fill(); g.fillStyle = (x.fundo === 'creme') ? '#FAF5EA' : '#2A2433'; g.textAlign = 'center'; g.fillText(x.cta, W / 2, H * 0.9); g.textAlign = 'left'; }
    c.toBlob(blob => {
      if (!blob){ ctx.toast('Não consegui criar o cartaz.', true); return; }
      nTakes++; const url = URL.createObjectURL(blob); urls.push(url); const nomeF = slugDe(x.titulo) + '_cartaz' + nTakes + '.png';
      if (nTakes === 1) $('ev-takes').innerHTML = '';
      const dv = document.createElement('div'); dv.className = 'evtake';
      dv.innerHTML = '<span></span><img alt="Cartaz" style="flex:1 1 150px;max-width:160px;max-height:290px;object-fit:contain;border-radius:10px"><a class="evmain" download>Guardar</a><button type="button" data-a="partilhar" hidden>Partilhar</button>';
      dv.querySelector('span').textContent = x.titulo + ' · cartaz'; dv.querySelector('img').src = url; const a = dv.querySelector('a'); a.href = url; a.download = nomeF;
      const ficheiro = new File([blob], nomeF, { type: 'image/png' }); const pt = dv.querySelector('[data-a=partilhar]');
      try { if (navigator.canShare && navigator.canShare({ files: [ficheiro] })){ pt.hidden = false; pt.onclick = async () => { try { await navigator.share({ files: [ficheiro], title: x.titulo }); } catch(e){ if (!e || e.name !== 'AbortError') ctx.toast('Não consegui abrir a partilha. Usa o botão Guardar.', true); } }; } } catch(e){}
      $('ev-takes').prepend(dv); ctx.toast('Cartaz pronto. Carrega em Guardar.'); $('ev-takesbox').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 'image/png');
  }
  $('ev-ccartaz').onclick = gerarCartaz;
  $('ev-cvideo').onclick = () => {
    const x = lista()[cur]; if (!x || !x.pub){ ctx.toast('Escolhe uma publicação primeiro.', true); return; }
    if (x.formato !== 'cartaz'){ ctx.toast('O vídeo sem voz usa o formato «Vídeo com legendas». Carrega em Editar e muda o formato.', true); return; }
    if (!$('ev-cv').captureStream || !window.MediaRecorder){ avisar('Este telemóvel não grava vídeo a partir do ecrã. Usa o cartaz (imagem), ou abre a Vindora no Chrome.'); return; }
    if (correr) return; avisar(''); semVoz = true; $('ev-phone').scrollIntoView({ behavior: 'smooth', block: 'center' }); comecar();
  };
  $('ev-cnew').onclick = () => abrirPub(null);
  $('ev-cedit').onclick = () => { const x = lista()[cur]; if (x && x.pub) abrirPub(x); };
  $('ev-pcancel').onclick = () => { $('ev-peditor').hidden = true; };
  async function guardarPub(depois){
    const titulo = $('ev-pt').value.trim(), texto = $('ev-px').value.trim();
    if (!titulo || !lerPub(texto).length){ ctx.toast('Escreve o título e pelo menos uma frase.', true); return false; }
    const item = { id: pubId || ('p' + Date.now().toString(36) + 'x'), tipo: 'pub', titulo, texto, cta: $('ev-pc').value.trim(), formato: ps.formato, prop: ps.prop, fundo: ps.fundo, ritmo: parseFloat($('ev-pr').value) || 2.3 };
    const atual = ctx.getCustom() || []; const nova = pubId ? atual.map(m => m.id === pubId ? item : m) : atual.concat([item]);
    try { await ctx.save(nova); ctx.toast('Publicação guardada.'); $('ev-peditor').hidden = true; cur = nova.filter(m => m.tipo === 'pub').findIndex(m => m.id === item.id); desenhar(); if (depois) depois(); return true; }
    catch(e){ ctx.toast('Não consegui guardar: ' + (e.message || e), true); return false; }
  }
  $('ev-psave').onclick = () => guardarPub();
  $('ev-pgc').onclick = () => guardarPub(gerarCartaz);
  $('ev-pgm').onclick = () => { if (ps.formato !== 'cartaz'){ ps.formato = 'cartaz'; chipsDe('ev-pf', 'cartaz'); } guardarPub(() => { ctx.toast('Carrega em Gravar e fala. O vídeo grava a tua voz e as legendas.'); $('ev-phone').scrollIntoView({ behavior: 'smooth', block: 'center' }); }); };
  $('ev-pgv').onclick = () => { if (ps.formato !== 'cartaz'){ ps.formato = 'cartaz'; chipsDe('ev-pf', 'cartaz'); } guardarPub(() => { $('ev-cvideo').click(); }); };

  $('ev-cdel').onclick = async () => {
    const x = lista()[cur]; if (!x || !x.pub) return;
    if (!await ctx.confirmar('Apagar publicação', 'Apagar "' + x.titulo + '"?\n\nEsta acção não pode ser desfeita.')) return;
    try { await ctx.save((ctx.getCustom() || []).filter(m => m.id !== x.id)); ctx.toast('Publicação apagada.'); cur = 0; desenhar(); }
    catch(e){ ctx.toast('Não consegui apagar: ' + (e.message || e), true); }
  };
  limparAnterior = () => { correr = false; cancelAnimationFrame(raf); clearInterval(tmr); pararVoz(); if (rec && rec.state !== 'inactive'){ rec.onstop = null; rec.stop(); } soltarMic(); };
  desenhar();
}
