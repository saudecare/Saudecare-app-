// ╔══════════════════════════════════════════════════════════════════╗
// ║  MÓDULO: PESQUISA EMOCIONAL CLÍNICA                              ║
// ║  Adicionar este bloco ao final do <script> em app.html║
// ║  NOTA: expõe todas as funções via window.X para <script module>  ║
// ╚══════════════════════════════════════════════════════════════════╝

// ─── DADOS BASE ───────────────────────────────────────────────────

const PE_CAT = [
  { id:'vital', name:'Centros Vitais (7)', cor:'#16a34a', points:[
    {id:'v1',name:'Topo da Cabeça (Coroa)',x:100,y:10,organ:'Pineal',desc:'Vazio existencial, crise de fé.',r:'Tens sentido que a tua vida perdeu o rumo?'},
    {id:'v2',name:'Pescoço',x:100,y:55,organ:'Tiroide',desc:'Silenciamento forçado.',r:'Quantas vezes tens engolido a tua verdade?'},
    {id:'v3',name:'Coração (Centro do peito)',x:100,y:115,organ:'Timo/Coração',desc:'Mágoas e isolamento.',r:'Sentes que fechaste o teu peito para te protegeres?'},
    {id:'v4',name:'Boca do Estômago',x:100,y:140,organ:'Estômago',desc:'Dificuldade de aceitação.',r:'Existe algo recente que não estás a conseguir digerir?'},
    {id:'v5',name:'Plexo Solar',x:100,y:160,organ:'Fígado/Pâncreas',desc:'Perda de poder e controlo.',r:'Tens sentido necessidade de controlar tudo à tua volta?'},
    {id:'v6',name:'Esplénico',x:100,y:185,organ:'Baço/Reprodutor',desc:'Bloqueio de criatividade/prazer.',r:'Permites-te sentir prazer nas pequenas coisas?'},
    {id:'v7',name:'Raiz',x:100,y:215,organ:'Base Pélvica',desc:'Insegurança material e territorial.',r:'Sentes que não tens estabilidade para avançar?'}
  ]},
  { id:'impact', name:'Zonas de Entrada (13)', cor:'#b45309', points:[
    {id:'i1',name:'Topo da Cabeça',x:100,y:10,organ:'Vértice',desc:'Choque existencial.',r:'Houve algum acontecimento súbito que te fez questionar tudo?'},
    {id:'i2',name:'Ombro Direito',x:132,y:70,organ:'Articulação Dir',desc:'Carga exterior.',r:'Estás a carregar responsabilidades de outros nas tuas costas?'},
    {id:'i3',name:'Ombro Esquerdo',x:68,y:70,organ:'Articulação Esq',desc:'Carga afetiva.',r:'Tens tentado salvar toda a tua família?'},
    {id:'i4',name:'Costelas Direitas',x:129,y:140,organ:'Tórax Dir',desc:'Proteção exterior.',r:'De quem é que te estás a tentar proteger?'},
    {id:'i5',name:'Costelas Esquerdas',x:71,y:140,organ:'Tórax Esq',desc:'Proteção íntima.',r:'Que ferida íntima tentas esconder para não voltar a doer?'},
    {id:'i6',name:'Mão Direita',x:165,y:190,organ:'Ext. Dir',desc:'Ação bloqueada.',r:'O que gostarias de fazer no mundo, mas não tens tido força?'},
    {id:'i7',name:'Mão Esquerda',x:35,y:190,organ:'Ext. Esq',desc:'Retenção afetiva.',r:'Existe alguém do passado que ainda não conseguiste largar?'},
    {id:'i8',name:'Anca Direita',x:125,y:195,organ:'Pélvis Dir',desc:'Impasse material.',r:'O que te impede de dar o próximo passo na carreira?'},
    {id:'i9',name:'Anca Esquerda',x:75,y:195,organ:'Pélvis Esq',desc:'Impasse afetivo.',r:'Sentes-te paralisado perante uma decisão familiar?'},
    {id:'i10',name:'Joelho Direito',x:126,y:285,organ:'Joelho Dir',desc:'Resistência.',r:'A que exigência exterior tens resistido em dobrar-te?'},
    {id:'i11',name:'Joelho Esquerdo',x:74,y:285,organ:'Joelho Esq',desc:'Humilhação.',r:'Sentiste-te humilhado por alguém muito próximo?'},
    {id:'i12',name:'Pé Direito',x:122,y:375,organ:'Pé Dir',desc:'Dúvida material.',r:'Sentes-te perdido sem saber que direção profissional tomar?'},
    {id:'i13',name:'Pé Esquerdo',x:78,y:375,organ:'Pé Esq',desc:'Desenraizamento.',r:'Tens a sensação de que não pertences ao teu núcleo?'}
  ]},
  { id:'lateral', name:'Lateralidade', cor:'#b45309', points:[] },
  { id:'superior', name:'Sistema Superior', cor:'#1e3a8a', points:[
    {id:'S1',name:'Epífise',x:100,y:30,organ:'Pineal',desc:'Distúrbio circadiano.',r:'Como tem sido o teu sono?'},
    {id:'S2',name:'Hipotálamo',x:100,y:45,organ:'SNC',desc:'Alarme e fobias.',r:'Sentes o teu corpo sempre em alerta?'},
    {id:'S3',name:'Hipófise',x:100,y:55,organ:'Pituitária',desc:'Autoimagem fragilizada.',r:'Tens duvidado do teu próprio valor?'},
    {id:'S4',name:'Amígdalas',x:100,y:65,organ:'Garganta',desc:'Incapacidade de engolir.',r:'Existe alguma situação "entalada"?'},
    {id:'S5',name:'Paratiroides',x:100,y:73,organ:'Paratiroides',desc:'Fadiga e urgência.',r:'Vives numa luta constante contra o relógio?'},
    {id:'S6',name:'Timo',x:100,y:110,organ:'Timo',desc:'Carência de reconhecimento.',r:'Sentes que ninguém te valoriza?'},
    {id:'S7',name:'Glândulas Salivares',x:93,y:65,organ:'G. Salivares',desc:'Choro retido.',r:'Quantas lágrimas já engoliste?'},
    {id:'S8',name:'Tiroide',x:100,y:82,organ:'Tiroide',desc:'Impotência em agir.',r:'As tuas ações parecem lentas?'},
    {id:'S9',name:'Esófago',x:100,y:95,organ:'Esófago',desc:'Engolir calado.',r:'Quantas vezes tens calado a tua própria voz?'}
  ]},
  { id:'central', name:'Sistema Central', cor:'#1e3a8a', points:[
    {id:'C1',name:'Linfáticos',x:100,y:100,organ:'Linfáticos',desc:'Sobrecarga familiar.',r:'O sistema familiar pesa sobre ti?'},
    {id:'C2',name:'Intestino Grosso',x:100,y:195,organ:'Int. Grosso',desc:'Apego, culpas.',r:'O que precisas urgentemente de perdoar?'},
    {id:'C3',name:'Coração',x:110,y:120,organ:'Coração',desc:'Autoabandono.',r:'Tens-te abandonado para ser aceite?'},
    {id:'C4',name:'Brônquios',x:90,y:120,organ:'Brônquios',desc:'Invasão territorial.',r:'O teu espaço pessoal é invadido?'},
    {id:'C5',name:'Alvéolos',x:120,y:135,organ:'Pulmão',desc:'Receio de perda.',r:'Qual é o teu maior medo?'},
    {id:'C6',name:'Intestino Delgado',x:100,y:185,organ:'Int. Delgado',desc:'Crença na escassez.',r:'Acreditas que não há amor suficiente para ti?'},
    {id:'C7',name:'Baço',x:130,y:155,organ:'Baço',desc:'Cansaço relacional.',r:'Qual é a relação que te drena a energia?'},
    {id:'C8',name:'Fígado',x:70,y:155,organ:'Fígado',desc:'Raiva e injustiça.',r:'O que te foi tirado injustamente?'},
    {id:'C9',name:'Estômago',x:105,y:165,organ:'Estômago',desc:'Ansiedade mental.',r:'Digeres excessivamente preocupações?'},
    {id:'C10',name:'Duodeno',x:95,y:175,organ:'Duodeno',desc:'Frustração por perdas.',r:'Sentes-te bloqueado após uma frustração?'},
    {id:'C11',name:'Vesícula Biliar',x:75,y:175,organ:'Vesícula',desc:'Decisões adiadas.',r:'Que escolha continuas a adiar?'},
    {id:'C12',name:'Pâncreas',x:120,y:175,organ:'Pâncreas',desc:'Perda de doçura.',r:'Quando é que a vida perdeu a doçura?'}
  ]},
  { id:'inferior', name:'Sistema Inferior', cor:'#1e3a8a', points:[
    {id:'f1d',name:'Mamárias Direito',x:114,y:205,organ:'Mamas',desc:'Conflitos no cuidar.',r:'Tens sentido exaustão na tua forma de cuidar?'},
    {id:'f1e',name:'Mamárias Esquerdo',x:86,y:205,organ:'Mamas',desc:'Conflitos afetivos.',r:'Sentes falta de carinho da infância?'},
    {id:'f2d',name:'Útero / Próstata Direito',x:115,y:230,organ:'Útero/Próstata',desc:'Invasão íntima.',r:'O teu espaço sagrado foi invadido?'},
    {id:'f2e',name:'Útero / Próstata Esquerdo',x:85,y:230,organ:'Útero/Próstata',desc:'Perda estabilidade.',r:'Alguma separação fez desmoronar o teu lar?'},
    {id:'f3d',name:'Suprarrenal Direito',x:116,y:255,organ:'Suprarrenais',desc:'Esgotamento alerta.',r:'O teu corpo já não tem reservas para lutar?'},
    {id:'f3e',name:'Suprarrenal Esquerdo',x:84,y:255,organ:'Suprarrenais',desc:'Exaustão forças.',r:'O que te fez desistir de lutar?'},
    {id:'f4d',name:'Gonadal Direito',x:117,y:285,organ:'Ovários/Testículos',desc:'Lutos projetos.',r:'Que projeto profundo tiveste de ver morrer?'},
    {id:'f4e',name:'Gonadal Esquerdo',x:83,y:285,organ:'Ovários/Testículos',desc:'Perda de linhagem.',r:'Que perda a tua família ainda não curou?'},
    {id:'f5d',name:'Rim Direito',x:119,y:320,organ:'Rins',desc:'Insegurança perdas.',r:'Tens medo de falhar financeiramente?'},
    {id:'f5e',name:'Rim Esquerdo',x:81,y:320,organ:'Rins',desc:'Quebra confiança.',r:'Foste atraiçoado por alguém?'},
    {id:'f6d',name:'Bexiga Direito',x:121,y:360,organ:'Bexiga',desc:'Perda de rumo.',r:'Já não sabes que lugar ocupas na sociedade?'},
    {id:'f6e',name:'Bexiga Esquerdo',x:79,y:360,organ:'Bexiga',desc:'Espaço territorial.',r:'Sentes que não podes ser quem és?'}
  ]}
];

const PE_MEDOS = [
  {name:"Bloco 1 — Medo da Pobreza",q:["Passei por muitas situações difíceis relacionadas ao dinheiro","A minha relação com o meu pai foi bastante conturbada","Presenciei escassez de alimento em casa","Preocupo-me e acredito que o meu futuro não será promissor"]},
  {name:"Bloco 2 — Medo da Doença",q:["Não me sinto confortável quando sei que tenho que ir ao médico","Sempre que sinto algo diferente no meu corpo vou pesquisar","Sofro só de pensar em ter uma doença","Já perdi pessoas que eu amava por doença"]},
  {name:"Bloco 3 — Medo da Crítica",q:["Preocupo-me com o que pensam sobre mim","Não gosto de como sou fisicamente","Sinto dificuldades em expressar a minha opinião","Sou extremamente insegura"]},
  {name:"Bloco 4 — Medo da Morte",q:["Não lido bem com cerimónias fúnebres","Fico preocupada em perder pessoas que amo","Estou sempre a pensar no dia de amanhã","Situações de perigo assustam-me"]},
  {name:"Bloco 5 — Medo de Relacionamento",q:["Sou insegura e ciumenta","Tenho necessidade de agradar a quem amo","Sofro de um vazio interior constante","Tenho dificuldade em acreditar nos outros"]},
  {name:"Bloco 6 — Medo de Envelhecer",q:["Sinto-me cansada constantemente","Não vejo graça na vida","Faço tudo para estar bem na minha velhice","Sinto-me incompreendida"]},
  {name:"Bloco 7 — Medo de Perder a Liberdade",q:["Tenho tendência a ficar entediada com rotinas","Não consigo estar muito tempo com a mesma pessoa","Não gosto de me sentir pressionada","Não aceito bem ordens"]}
];

const PE_FICHAS = {
  'pre-consulta':[{q:'Nome Completo'},{q:'Idade e Data de Nascimento'},{q:'Trabalha atualmente? Profissão?'},{q:'Estado Civil'},{q:'Tem irmãos?'},{q:'Qual a sua ordem de nascimento?'},{q:'Foi filho planeado?'},{q:'Acompanhamento médico ou terapêutico?'},{q:'Medicamentos para depressão ou ansiedade?'},{q:'Cite 3 dores físicas recorrentes:'},{q:'Sente-se mais ansioso ou desanimado?'},{q:'Quais os seus objetivos com esta consulta?'},{q:'Quais os 3 momentos mais difíceis que viveu?'}],
  'pos-consulta':[{q:'Como te sentiste desde a nossa última sessão?'},{q:'Notaste alterações nos sintomas físicos?'},{q:'Conseguiste realizar os exercícios propostos?'},{q:'Houve algum pico de stress nestes dias?'},{q:'O que gostarias de focar na sessão de hoje?'}],
  'crianca':[{q:'Nome e idade?'},{q:'Brincadeiras preferidas?'},{q:'O que gostas de fazer na escola?'},{q:'Quando te sentes triste ou com raiva, o que fazes?'},{q:'O que te deixa com medo?'},{q:'O que te deixa muito feliz?'}],
  'cuidador':[{q:'Nome do Cuidador e Parentesco'},{q:'Motivo da Consulta'},{q:'Eventos significativos relacionados à queixa?'},{q:'Complicações na gravidez ou parto?'},{q:'Desenvolvimento motor e linguagem?'},{q:'Como é o sono e a alimentação?'}]
};

const PE_ESCUDOS_AFINIDADES = {
  "Desproteção": { libera:"injustiça; insegurança; acusação; dúvida", afi:"«Eu comando que todas as experiências de desproteção sejam transformadas em força interior e segurança. Eu comando que a minha sensação de proteção e bem-estar sejam restauradas e reforçadas.»" },
  "Desvalorização": { libera:"inferioridade; baixa estima; incompreensão; insegurança; rejeição", afi:"«Eu comando que todas as experiências de desvalorização sejam transformadas em força e confiança. Eu comando que a minha autoestima seja restaurada e reforçada.»" },
  "Impotência": { libera:"incapacidade; medo; insegurança; paralisia; pressão", afi:"«Eu comando que todas as experiências de impotência e incapacidade sejam liberadas gentilmente agora. Eu comando que o meu ser seja preenchido com poder, confiança e autossuficiência.»" },
  "Sobrevivência": { libera:"escassez; sufoco; indignação; pressão", afi:"«Eu comando que todas as experiências de insegurança e medo pela minha sobrevivência sejam transformadas em força e resiliência. Eu comando que a minha sensação de segurança e sustento sejam restauradas e reforçadas.»" },
  "Perda": { libera:"falta; separação; abandono; insegurança; rejeição; medo; incertezas", afi:"«Eu comando que toda a dor, tristeza e sensação de perda sejam liberadas gentilmente agora. Eu comando que todo o meu ser seja preenchido com paz, amor e aceitação.»" }
};

const PE_CORPO_SVG = `<g fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"><circle cx="100" cy="35" r="22"/><rect x="94" y="56" width="12" height="14" rx="2"/><path d="M 68 70 L 132 70 C 140 95 134 160 125 185 L 75 185 C 66 160 60 95 68 70 Z"/><path d="M 68 70 L 46 135 L 38 190 L 30 190 L 40 130 L 64 70 Z"/><path d="M 132 70 L 154 135 L 162 190 L 170 190 L 160 130 L 136 70 Z"/><path d="M 76 185 L 74 285 L 72 375 L 84 375 L 92 285 L 97 185 Z"/><path d="M 124 185 L 126 285 L 128 375 L 116 375 L 108 285 L 103 185 Z"/></g>`;

// ─── ESTADO ───────────────────────────────────────────────────────

let peState = {};

function peReset() {
  peState = {
    patientId: null, patientName: '', step: '0', path: 2,
    quadrants: [], qIdx: 0, mappingData: {}, catId: 'vital',
    shieldCalc: 'Indefinido', finalShield: 'Não Especificado',
    hasBack: false, editMode: false, formEditMode: false,
    formId: 'pre-consulta', activePoint: null,
    formsDB: null, appData: null,
  };
}
peReset();

// ─── ACESSO ───────────────────────────────────────────────────────

window.__peAtivo = false;

async function peVerificarAcesso() {
  if (tenantId() === 'hikari-terapias') { window.__peAtivo = true; return; }
  try {
    const snap = await db().doc(`tenants/${tenantId()}`).get();
    const d = snap.data() || {};
    window.__peAtivo = !!(d.modulos && d.modulos.pesquisaEmocional === true);
  } catch(_) { window.__peAtivo = false; }
}

function temPesquisaEmocional() {
  return tenantId() === 'hikari-terapias' || window.__peAtivo === true;
}

// ─── CONFIG LOCAL (por tenant) ────────────────────────────────────

function peLerConfig() {
  const key = `pe_cfg_${tenantId()}`;
  try {
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  } catch(_) {}
  return { categories: JSON.parse(JSON.stringify(PE_CAT)), forms: JSON.parse(JSON.stringify(PE_FICHAS)) };
}

function peGuardarConfig(cfg) {
  try { localStorage.setItem(`pe_cfg_${tenantId()}`, JSON.stringify(cfg)); } catch(_) {}
}

// ─── VISTA PRINCIPAL ──────────────────────────────────────────────

async function renderPesquisaEmocional(main) {
  if (!main) main = document.querySelector('main, #main, .main-content') || document.body;
  if (!temPesquisaEmocional()) { renderSolicitarPE(main); return; }
  peReset();
  main.innerHTML = `
    <div style="max-width:900px;margin:0 auto;padding:0 4px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;background:linear-gradient(135deg,#1e3a8a,#0f172a);color:white;padding:18px;border-radius:12px;margin-bottom:16px;">
        <div>
          <div style="font-size:1.3rem;font-weight:700;">🔬 Pesquisa Emocional Clínica</div>
          <div style="font-size:0.85rem;color:#bfdbfe;">Ferramenta de Mapeamento Clínico Avançado</div>
        </div>
        ${tenantId()==='hikari-terapias' ? `<button onclick="window.renderAdminPedidosPE(document.querySelector('main,#main,.main-content')||document.body)" style="background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);color:white;padding:8px 14px;border-radius:8px;font-size:0.8rem;font-weight:600;cursor:pointer;">⚙️ Pedidos Pendentes</button>` : ''}
      </div>

      <div id="pe-step-0" class="pe-step" style="display:block;">
        <div class="card" style="padding:20px;">
          <div style="font-size:1.1rem;font-weight:700;color:#1e3a8a;margin-bottom:16px;border-bottom:2px solid #fef3c7;padding-bottom:10px;">Selecionar Paciente</div>
          <div id="pe-lista-pacientes" style="display:grid;gap:10px;"></div>
        </div>
      </div>

      <div id="pe-step-1" class="pe-step" style="display:none;">
        <div class="card" style="padding:20px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px;border-bottom:2px solid #fef3c7;padding-bottom:10px;">
            <div>
              <span style="font-size:1.1rem;font-weight:700;color:#1e3a8a;">Passo 1 — Fichas e Questionários</span>
              <span id="pe-badge-paciente" style="display:inline-block;background:#fef3c7;color:#b45309;padding:4px 12px;border-radius:20px;font-size:0.85rem;font-weight:700;margin-left:10px;"></span>
            </div>
            <button id="pe-btn-edit-form" onclick="window.peToggleFormEdit()" style="background:#e2e8f0;border:1px solid #cbd5e1;color:#334155;padding:8px 14px;border-radius:20px;font-size:0.8rem;font-weight:700;cursor:pointer;">✏️ Editar Perguntas</button>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
            ${['pre-consulta','pos-consulta','crianca','cuidador','medos'].map(id=>`<button onclick="window.peMudarFicha('${id}',this)" class="pe-tab-btn ${id==='pre-consulta'?'pe-tab-ativo':''}" style="padding:9px 14px;border:1px solid ${id==='pre-consulta'?'#b45309':'#cbd5e1'};background:${id==='pre-consulta'?'#b45309':'white'};color:${id==='pre-consulta'?'white':'#64748b'};border-radius:8px;font-size:0.82rem;font-weight:600;cursor:pointer;">${{pre:'Pré-Consulta',pos:'Pós-Consulta',crianca:'Criança',cuidador:'Cuidador',medos:'Medos'}[id.split('-')[0]]||'Medos'}</button>`).join('')}
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
            <button onclick="window.peCopiarFicha()" style="background:#e2e8f0;border:1px solid #cbd5e1;padding:8px 14px;border-radius:8px;font-size:0.82rem;font-weight:600;cursor:pointer;">📋 Copiar para WhatsApp</button>
            <button onclick="window.peToggleColarArea()" style="background:#25D366;color:white;border:none;padding:8px 14px;border-radius:8px;font-size:0.82rem;font-weight:600;cursor:pointer;">📥 Colar Respostas</button>
            <button onclick="window.peGerarEnvioOnline()" style="background:#1e3a8a;color:white;border:none;padding:8px 14px;border-radius:8px;font-size:0.82rem;font-weight:600;cursor:pointer;">📤 Enviar Online</button>
          </div>
          <div id="pe-colar-area" style="display:none;background:#f0fdf4;border:1px solid #86efac;border-radius:10px;padding:16px;margin-bottom:10px;">
            <label style="font-size:0.85rem;font-weight:700;color:#166534;display:block;margin-bottom:8px;">Cole aqui as respostas do paciente:</label>
            <textarea id="pe-colar-texto" rows="6" style="width:100%;padding:10px;border:1px solid #86efac;border-radius:8px;font-size:0.9rem;font-family:inherit;" placeholder="Cole o texto com as respostas do paciente..."></textarea>
            <div style="display:flex;gap:8px;margin-top:10px;">
              <button onclick="window.peColarRespostasGuardar()" style="background:#16a34a;color:white;border:none;padding:9px 18px;border-radius:8px;font-size:0.85rem;font-weight:700;cursor:pointer;">💾 Guardar no Histórico</button>
              <button onclick="window.peToggleColarArea()" style="background:white;border:1px solid #e2e8f0;padding:9px 14px;border-radius:8px;font-size:0.85rem;font-weight:600;cursor:pointer;">✕ Fechar</button>
            </div>
          </div>
          <div id="pe-link-panel" style="display:none;margin-bottom:10px;"></div>
          <div id="pe-form-wrapper" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px;"></div>
          <div id="pe-medos-wrapper" style="display:none;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px;"></div>
          <button onclick="window.peGuardarFicha()" style="background:#16a34a;color:white;width:100%;padding:14px;border:none;border-radius:8px;font-size:1rem;font-weight:700;cursor:pointer;margin-top:16px;">💾 Guardar Ficha no Histórico</button>
          <div style="display:flex;justify-content:flex-end;margin-top:16px;padding-top:16px;border-top:1px solid #e2e8f0;">
            <button onclick="window.peIrPasso('2')" style="background:#1e3a8a;color:white;padding:12px 24px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">Avançar para Investigação ➔</button>
          </div>
        </div>
      </div>

      <div id="pe-step-2" class="pe-step" style="display:none;">
        <div class="card" style="padding:20px;">
          <div style="font-size:1.1rem;font-weight:700;color:#1e3a8a;margin-bottom:16px;border-bottom:2px solid #fef3c7;padding-bottom:10px;">Passo 2 — Via de Investigação Clínica</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:20px;">
            ${[1,2,3].map(n=>`<div onclick="window.peEscolherVia(${n},this)" id="pe-via-${n}" style="border:2px solid ${n===2?'#1e3a8a':'#e2e8f0'};background:${n===2?'#eff6ff':'white'};border-radius:10px;padding:16px;cursor:pointer;transition:.2s;">
              <div style="font-weight:700;color:#0f172a;margin-bottom:6px;">${n}. ${{1:'Padrões Conscientes',2:'Pesquisa Subconsciente',3:'Estressores Ativos'}[n]}</div>
              <div style="font-size:0.8rem;color:#64748b;">${{1:'Pontuação direta dos Escudos (0 a 10).',2:'Mapeamento visual anatómico.',3:'Avaliação de gatilhos e ciclos.'}[n]}</div>
            </div>`).join('')}
          </div>
          <div id="pe-quadrantes-area">
            <label style="color:#1e3a8a;font-weight:700;display:block;margin-bottom:8px;">Zonas a Mapear:</label>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
              <button onclick="window.peSelecionarZonas('all')" style="font-size:0.78rem;padding:5px 12px;border:1px solid #bfdbfe;background:#eff6ff;color:#1e3a8a;border-radius:20px;font-weight:700;cursor:pointer;">🔵 Corpo Completo</button>
              <button onclick="window.peSelecionarZonas('frente')" style="font-size:0.78rem;padding:5px 12px;border:1px solid #e2e8f0;background:white;border-radius:20px;font-weight:600;cursor:pointer;">Só Frente</button>
              <button onclick="window.peSelecionarZonas('costas')" style="font-size:0.78rem;padding:5px 12px;border:1px solid #e2e8f0;background:white;border-radius:20px;font-weight:600;cursor:pointer;">Só Costas</button>
              <button onclick="window.peSelecionarZonas('direito')" style="font-size:0.78rem;padding:5px 12px;border:1px solid #e2e8f0;background:white;border-radius:20px;font-weight:600;cursor:pointer;">Lado Direito</button>
              <button onclick="window.peSelecionarZonas('esquerdo')" style="font-size:0.78rem;padding:5px 12px;border:1px solid #e2e8f0;background:white;border-radius:20px;font-weight:600;cursor:pointer;">Lado Esquerdo</button>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;">
              ${[['Frente - Lado Direito','Reação imediata · Conflitos exteriores'],['Frente - Lado Esquerdo','Reação lógica · Conflitos com laços'],['Costas - Lado Direito','Dor internalizada e ruminada'],['Costas - Lado Esquerdo','Somatização crónica analítica']].map(([v,d])=>`
                <div onclick="window.peToggleQuadrante('${v}',this)" id="pe-q-${v.replace(/ /g,'_').replace(/-/g,'_')}" style="border:2px solid #e2e8f0;border-radius:10px;padding:14px;cursor:pointer;transition:.2s;">
                  <div style="font-weight:700;font-size:0.9rem;color:#0f172a;margin-bottom:4px;">${v}</div>
                  <div style="font-size:0.78rem;color:#64748b;">${d}</div>
                </div>`).join('')}
            </div>
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:20px;padding-top:16px;border-top:1px solid #e2e8f0;">
            <button onclick="window.peIrPasso('1')" style="background:white;border:1px solid #e2e8f0;padding:12px 20px;border-radius:8px;font-weight:600;cursor:pointer;">⬅ Voltar</button>
            <button onclick="window.peIniciarVia()" style="background:#1e3a8a;color:white;padding:12px 24px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">Iniciar Mapeamento ➔</button>
          </div>
        </div>
      </div>

      <div id="pe-step-3a" class="pe-step" style="display:none;">
        <div class="card" style="padding:20px;">
          <div style="font-size:1.1rem;font-weight:700;color:#1e3a8a;margin-bottom:20px;border-bottom:2px solid #fef3c7;padding-bottom:10px;">Pesquisa 1 — Mente Consciente / Padrões</div>
          ${['Desproteção','Desvalorização','Impotência','Sobrevivência','Perda'].map((e,i)=>`
            <div style="background:white;border:1px solid #e2e8f0;border-radius:10px;padding:16px;margin-bottom:12px;">
              <div style="font-weight:700;color:#1e3a8a;margin-bottom:8px;">${i+1}. Mecanismo de ${e}</div>
              <select id="pe-sel-${e.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[ç]/g,'c')}" onchange="window.peCalcEscudo()" style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;">
                ${Array.from({length:11},(_,v)=>`<option value="${v}">${v}${v===0?' — Nulo':v===10?' — Máximo':''}</option>`).join('')}
              </select>
            </div>`).join('')}
          <div id="pe-escudo-resultado" style="background:#eff6ff;border:1px solid #bfdbfe;padding:14px;border-radius:8px;text-align:center;font-weight:700;color:#0f172a;margin-bottom:16px;">Aguarda pontuação...</div>
          <div><label style="font-size:0.85rem;font-weight:700;color:#334155;margin-bottom:6px;display:block;">Notas Clínicas:</label>
            <textarea id="pe-notas-path1" rows="3" style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:8px;" placeholder="Dados do paciente que validam a pontuação..."></textarea>
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:20px;padding-top:16px;border-top:1px solid #e2e8f0;">
            <button onclick="window.peIrPasso('2')" style="background:white;border:1px solid #e2e8f0;padding:12px 20px;border-radius:8px;font-weight:600;cursor:pointer;">⬅ Voltar</button>
            <button onclick="window.peIrPasso('4')" style="background:#1e3a8a;color:white;padding:12px 24px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">Avançar para Fecho ➔</button>
          </div>
        </div>
      </div>

      <div id="pe-step-3b" class="pe-step" style="display:none;">
        <div class="card" style="padding:20px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px;border-bottom:2px solid #fef3c7;padding-bottom:10px;">
            <div id="pe-mapa-titulo" style="font-size:1.05rem;font-weight:700;color:#dc2626;"></div>
            <button onclick="window.peToggleEditMapa()" id="pe-btn-edit-mapa" style="background:#e2e8f0;border:1px solid #cbd5e1;color:#334155;padding:8px 14px;border-radius:20px;font-size:0.8rem;font-weight:700;cursor:pointer;">✏️ Modo Edição</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:20px;">
            <div style="max-width:320px;margin:0 auto;width:100%;">
              <div id="pe-svg-wrapper" style="background:white;border:1px solid #e2e8f0;border-radius:10px;width:100%;aspect-ratio:1/1.8;overflow:hidden;touch-action:none;position:relative;">
                <svg id="pe-svg" viewBox="0 0 200 400" style="width:100%;height:100%;"></svg>
              </div>
            </div>
            <div>
              <div id="pe-categorias-tabs" style="display:flex;gap:6px;overflow-x:auto;padding-bottom:10px;margin-bottom:14px;border-bottom:2px solid #e2e8f0;scrollbar-width:none;"></div>
              <p style="font-size:0.82rem;color:#64748b;margin-bottom:10px;">Toque no mapa ou nos botões para selecionar os bloqueios:</p>
              <div id="pe-pontos-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;max-height:40vh;overflow-y:auto;"></div>
              <div id="pe-lateral-area" style="display:none;margin-top:12px;">
                <label style="color:#b45309;font-weight:700;font-size:0.9rem;display:block;margin-bottom:6px;">Anotações da Varredura Lateral:</label>
                <textarea id="pe-lateral-notas" rows="3" style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:8px;" placeholder="Descreva resistências ao longo do percurso lateral..."></textarea>
              </div>
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;margin-top:16px;">
                <div style="font-weight:700;color:#1e3a8a;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #e2e8f0;">Fecho Deste Eixo</div>
                <label style="font-size:0.85rem;font-weight:700;color:#334155;display:block;margin-bottom:8px;">Padrão de Defesa Ativo:</label>
                <div id="pe-escudos-mapa" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;">
                  ${['Desproteção','Desvalorização','Impotência','Sobrevivência','Perda'].map(e=>`
                    <div onclick="window.peEscolherEscudoMapa('${e}',this)" style="flex:1;min-width:100px;padding:10px;border:2px solid #e2e8f0;background:white;border-radius:8px;cursor:pointer;text-align:center;font-size:0.82rem;font-weight:600;color:#64748b;transition:.2s;">${e}</div>`).join('')}
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px;">
                  <div>
                    <label style="font-size:0.82rem;font-weight:700;color:#334155;display:block;margin-bottom:6px;">Origem do Gatilho:</label>
                    <select id="pe-epoca" onchange="window.peAtualizarEpocaLabel()" style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;">
                      <option value="Transgeracional">Transgeracional (Herança)</option>
                      <option value="Gestacional">Durante a Gestação</option>
                      <option value="Pós-parto / Biográfico">Depois do Parto (Biográfico)</option>
                    </select>
                  </div>
                  <div>
                    <label id="pe-epoca-label" style="font-size:0.82rem;font-weight:700;color:#334155;display:block;margin-bottom:6px;">Gerações:</label>
                    <input type="text" id="pe-epoca-tempo" placeholder="Ex: Há 1 geração..." style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:8px;">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:20px;padding-top:16px;border-top:1px solid #e2e8f0;">
            <button onclick="window.peIrPasso('2')" style="background:white;border:1px solid #e2e8f0;padding:12px 20px;border-radius:8px;font-weight:600;cursor:pointer;">Cancelar</button>
            <button onclick="window.peProximoQuadrante()" style="background:#1e3a8a;color:white;padding:12px 24px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">Gravar e Avançar ➔</button>
          </div>
        </div>
      </div>

      <div id="pe-step-3c" class="pe-step" style="display:none;">
        <div class="card" style="padding:20px;">
          <div style="font-size:1.1rem;font-weight:700;color:#1e3a8a;margin-bottom:20px;border-bottom:2px solid #fef3c7;padding-bottom:10px;">Pesquisa 3 — Estressores Ativos e Gatilhos</div>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:20px;display:flex;flex-direction:column;gap:16px;">
            ${[['pe-p3-1','Quem do convívio atual mais altera o seu humor?','text'],['pe-p3-2','O que essa pessoa faz ou diz que desestabiliza?','textarea'],['pe-p3-3','Situações em que perde o foco?','textarea'],['pe-p3-4','Alguém no passado com esse papel?','text'],['pe-p3-5','O que essas pessoas tinham em comum?','textarea']].map(([id,q,t],i)=>`
              <div>
                <label style="font-size:0.85rem;font-weight:700;color:#334155;display:block;margin-bottom:6px;">${i+1}. ${q}</label>
                ${t==='textarea'?`<textarea id="${id}" rows="2" style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:8px;"></textarea>`:`<input type="text" id="${id}" style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:8px;">`}
              </div>`).join('')}
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:20px;padding-top:16px;border-top:1px solid #e2e8f0;">
            <button onclick="window.peIrPasso('2')" style="background:white;border:1px solid #e2e8f0;padding:12px 20px;border-radius:8px;font-weight:600;cursor:pointer;">⬅ Voltar</button>
            <button onclick="window.peIrPasso('4')" style="background:#1e3a8a;color:white;padding:12px 24px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">Avançar para Fecho ➔</button>
          </div>
        </div>
      </div>

      <div id="pe-step-4" class="pe-step" style="display:none;">
        <div class="card" style="padding:20px;">
          <div style="font-size:1.1rem;font-weight:700;color:#1e3a8a;margin-bottom:20px;border-bottom:2px solid #fef3c7;padding-bottom:10px;">Passo 4 — Fecho e Plano Terapêutico</div>
          <div id="pe-escudos-resumo-mapa" style="display:none;margin-bottom:20px;"></div>
          <div id="pe-fecho-geral" style="display:none;margin-bottom:20px;background:white;border:1px solid #e2e8f0;border-radius:10px;padding:18px;">
            <div style="font-weight:700;color:#1e3a8a;margin-bottom:12px;">Confirmar Escudo Dominante Final:</div>
            <div id="pe-escudos-final" style="display:flex;gap:8px;flex-wrap:wrap;">
              ${['Desproteção','Desvalorização','Impotência','Sobrevivência','Perda'].map(e=>`
                <div onclick="window.peEscolherEscudoFinal('${e}',this)" style="flex:1;min-width:100px;padding:10px;border:2px solid #e2e8f0;background:white;border-radius:8px;cursor:pointer;text-align:center;font-size:0.82rem;font-weight:600;color:#64748b;transition:.2s;">${e}</div>`).join('')}
            </div>
          </div>
          <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:20px;">
            <label style="color:#b45309;font-size:1rem;font-weight:700;display:block;margin-bottom:8px;">Plano Terapêutico (Receita Visual):</label>
            <p style="font-size:0.82rem;color:#64748b;margin-bottom:12px;">Gerado automaticamente cruzando o Escudo, as Massagens e os Pontos. Edite antes de emitir.</p>
            <textarea id="pe-receita" rows="16" style="width:100%;padding:12px;border:1px solid #fde68a;border-radius:8px;font-size:0.9rem;line-height:1.6;"></textarea>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:20px;padding-top:16px;border-top:1px solid #e2e8f0;flex-wrap:wrap;">
            <button onclick="window.peVoltarFecho()" style="background:white;border:1px solid #e2e8f0;padding:12px 20px;border-radius:8px;font-weight:600;cursor:pointer;">⬅ Rever</button>
            <button onclick="window.peEmitirRelatorio()" style="background:#16a34a;color:white;padding:14px 28px;border:none;border-radius:8px;font-size:1.05rem;font-weight:700;cursor:pointer;box-shadow:0 4px 12px rgba(22,163,74,.2);">💾 Gravar no Histórico e Emitir ✔</button>
          </div>
        </div>
      </div>

      <div id="pe-step-relatorio" class="pe-step" style="display:none;"></div>
    </div>
  `;
  await peLerPacientes();
  peConstruirMedos();
}

// ─── PACIENTES ────────────────────────────────────────────────────

async function peLerPacientes() {
  const container = document.getElementById('pe-lista-pacientes');
  if (!container) return;
  container.innerHTML = '<div style="text-align:center;padding:20px;color:#64748b;">A carregar...</div>';
  try {
    const snap = await db().collection(`tenants/${tenantId()}/patients`).where('active','!=',false).orderBy('active').orderBy('fullName').limit(100).get();
    if (snap.empty) {
      container.innerHTML = '<div style="text-align:center;padding:20px;color:#64748b;">Nenhum paciente ativo. Crie pacientes primeiro.</div>';
      return;
    }
    container.innerHTML = '';
    snap.forEach(doc => {
      const p = doc.data();
      const div = document.createElement('div');
      div.style.cssText = 'background:white;border:1px solid #e2e8f0;border-radius:10px;padding:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;';
      div.innerHTML = `
        <div>
          <div style="font-weight:700;color:#0f172a;font-size:1rem;">${p.fullName||p.nome||'—'}</div>
          <div style="font-size:0.82rem;color:#64748b;">${p.phone||p.email||''}</div>
        </div>
        <button onclick="window.peIniciarConsulta('${doc.id}','${(p.fullName||p.nome||'').replace(/'/g,"\\'")}')" style="background:#1e3a8a;color:white;padding:10px 18px;border:none;border-radius:8px;font-weight:700;font-size:0.85rem;cursor:pointer;">Nova Consulta</button>
      `;
      container.appendChild(div);
    });
  } catch(e) {
    console.error(e);
    container.innerHTML = '<div style="color:#dc2626;padding:16px;">Erro ao carregar pacientes.</div>';
  }
}

function peIniciarConsulta(patientId, patientName) {
  peState.patientId = patientId;
  peState.patientName = patientName;
  const cfg = peLerConfig();
  peState.formsDB = JSON.parse(JSON.stringify(cfg.forms));
  peState.appData = { categories: JSON.parse(JSON.stringify(cfg.categories)) };
  const badge = document.getElementById('pe-badge-paciente');
  if (badge) badge.textContent = patientName;
  peState.formId = 'pre-consulta';
  peRenderizarFicha('pre-consulta');
  peIrPasso('1');
  setTimeout(() => peVerificarQExistente('pre-consulta'), 200);
}

// ─── NAVEGAÇÃO ────────────────────────────────────────────────────

function peIrPasso(s) {
  ['0','1','2','3a','3b','3c','4','relatorio'].forEach(id => {
    const el = document.getElementById(`pe-step-${id}`);
    if (el) el.style.display = 'none';
  });
  const next = document.getElementById(`pe-step-${s}`);
  if (next) { next.style.display = 'block'; window.scrollTo(0,0); }
  peState.step = s;
  if (s === '4') pePreencherReceita();
}

function peVoltarFecho() {
  if (peState.path===1) peIrPasso('3a');
  else if (peState.path===3) peIrPasso('3c');
  else peIrPasso('3b');
}

// ─── FICHAS ───────────────────────────────────────────────────────

function peMudarFicha(id, btn) {
  document.querySelectorAll('.pe-tab-btn').forEach(b => { b.style.background='white'; b.style.color='#64748b'; b.style.borderColor='#cbd5e1'; });
  if (btn) { btn.style.background='#b45309'; btn.style.color='white'; btn.style.borderColor='#b45309'; }
  if (id==='medos') {
    document.getElementById('pe-form-wrapper').style.display='none';
    document.getElementById('pe-medos-wrapper').style.display='block';
    document.getElementById('pe-btn-edit-form').style.display='none';
  } else {
    document.getElementById('pe-medos-wrapper').style.display='none';
    document.getElementById('pe-form-wrapper').style.display='block';
    document.getElementById('pe-btn-edit-form').style.display='inline-block';
    peState.formId = id;
    peRenderizarFicha(id);
  }
}

function peToggleFormEdit() {
  peState.formEditMode = !peState.formEditMode;
  const btn = document.getElementById('pe-btn-edit-form');
  if (btn) { btn.textContent = peState.formEditMode ? '✅ Edição Concluída' : '✏️ Editar Perguntas'; btn.style.background = peState.formEditMode ? '#dc2626' : '#e2e8f0'; btn.style.color = peState.formEditMode ? 'white' : '#334155'; }
  const wrapper = document.getElementById('pe-form-wrapper');
  if (wrapper) wrapper.dataset.editMode = peState.formEditMode ? '1' : '0';
  peRenderizarFicha(peState.formId);
}

function peRenderizarFicha(id) {
  const container = document.getElementById('pe-form-wrapper');
  if (!container) return;
  const fichas = peState.formsDB || peLerConfig().forms;
  const lista = fichas[id] || [];
  const tit = {'pre-consulta':'Questionário Pré-Consulta','pos-consulta':'Questionário de Pós-Consulta','crianca':'Anamnese com a Criança','cuidador':'Anamnese para Cuidador'}[id] || id;
  const TIPOS = { texto:'texto', sim_nao:'sim/não', escala:'escala 1-10', multi:'múltipla escolha' };
  const editMode = container.dataset.editMode === '1';
  let html = `<h4 id="pe-form-titulo" style="color:#1e3a8a;margin-bottom:14px;">${tit}</h4>`;
  lista.forEach((item, idx) => {
    const tipo = item.tipo || 'texto';
    const qEsc = (item.q || '').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
    const opcoesVal = (item.opcoes || []).join(', ').replace(/"/g,'&quot;');
    html += `<div id="pe-q-card-${idx}" style="background:white;border:1px solid #e2e8f0;border-radius:8px;padding:14px;margin-bottom:10px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:6px;">
        <div>
          <div style="font-weight:700;font-size:0.9rem;color:#0f172a;">${idx+1}. ${item.q||''}</div>
          ${editMode ? `<span style="font-size:0.72rem;background:#e8f4f8;color:#0369a1;padding:2px 8px;border-radius:10px;margin-top:4px;display:inline-block;">${TIPOS[tipo]||tipo}</span>` : ''}
        </div>
        ${editMode ? `<div style="display:flex;gap:4px;flex-shrink:0;">
          <button onclick="window.peMoverQ(${idx},-1,'${id}')" style="background:#e2e8f0;border:none;padding:4px 8px;border-radius:6px;cursor:pointer;font-size:0.75rem;" title="Subir">⬆</button>
          <button onclick="window.peMoverQ(${idx},1,'${id}')" style="background:#e2e8f0;border:none;padding:4px 8px;border-radius:6px;cursor:pointer;font-size:0.75rem;" title="Descer">⬇</button>
          <button onclick="window.peToggleEditInline(${idx},'${id}')" style="background:#e2e8f0;border:none;padding:4px 8px;border-radius:6px;cursor:pointer;font-size:0.75rem;" title="Editar">✏️</button>
          <button onclick="window.peConfirmarApagar(${idx},'${id}')" style="background:#fee2e2;border:none;padding:4px 8px;border-radius:6px;cursor:pointer;font-size:0.75rem;color:#dc2626;" title="Apagar">🗑️</button>
        </div>` : ''}
      </div>
      ${editMode ? `
      <div id="pe-inline-edit-${idx}" style="display:none;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px;margin-bottom:8px;">
        <input id="pe-edit-q-${idx}" type="text" value="${qEsc}" style="width:100%;padding:8px;border:1px solid #e2e8f0;border-radius:6px;font-size:0.9rem;margin-bottom:8px;">
        <select id="pe-edit-tipo-${idx}" onchange="window.peToggleOpcoesEQ(${idx})" style="width:100%;padding:8px;border:1px solid #e2e8f0;border-radius:6px;margin-bottom:8px;">
          <option value="texto" ${tipo==='texto'?'selected':''}>Resposta livre (texto)</option>
          <option value="sim_nao" ${tipo==='sim_nao'?'selected':''}>Sim / Não</option>
          <option value="escala" ${tipo==='escala'?'selected':''}>Escala 1–10</option>
          <option value="multi" ${tipo==='multi'?'selected':''}>Múltipla Escolha</option>
        </select>
        <div id="pe-edit-opcoes-area-${idx}" style="display:${tipo==='multi'?'block':'none'};margin-bottom:8px;">
          <input id="pe-edit-opcoes-${idx}" type="text" value="${opcoesVal}" placeholder="Opção 1, Opção 2, Opção 3..." style="width:100%;padding:8px;border:1px solid #e2e8f0;border-radius:6px;font-size:0.85rem;">
          <div style="font-size:0.74rem;color:#64748b;margin-top:4px;">Separe as opções por vírgula.</div>
        </div>
        <div id="pe-inline-confirm-${idx}" style="display:none;background:#fee2e2;border:1px solid #fca5a5;border-radius:6px;padding:10px;margin-bottom:8px;text-align:center;">
          <span style="font-size:0.85rem;color:#dc2626;font-weight:600;">Confirma que quer apagar esta pergunta?</span>
          <div style="display:flex;gap:8px;justify-content:center;margin-top:8px;">
            <button onclick="window.peApagarQConfirmado(${idx},'${id}')" style="background:#dc2626;color:white;border:none;padding:6px 14px;border-radius:6px;font-size:0.82rem;font-weight:700;cursor:pointer;">Sim, apagar</button>
            <button onclick="document.getElementById('pe-inline-confirm-${idx}').style.display='none'" style="background:white;border:1px solid #e2e8f0;padding:6px 14px;border-radius:6px;font-size:0.82rem;cursor:pointer;">Cancelar</button>
          </div>
        </div>
        <div style="display:flex;gap:8px;">
          <button onclick="window.peGuardarEdicaoQ(${idx},'${id}')" style="background:#1e3a8a;color:white;border:none;padding:7px 14px;border-radius:6px;font-size:0.82rem;font-weight:700;cursor:pointer;">💾 Guardar</button>
          <button onclick="document.getElementById('pe-inline-edit-${idx}').style.display='none'" style="background:white;border:1px solid #e2e8f0;padding:7px 14px;border-radius:6px;font-size:0.82rem;cursor:pointer;">Cancelar</button>
        </div>
      </div>` : ''}
      <textarea id="pe-r-${idx}" rows="2" style="width:100%;padding:8px;border:1px solid #e2e8f0;border-radius:6px;font-size:0.9rem;" placeholder="Resposta..."></textarea>
    </div>`;
  });
  if (editMode) {
    html += `
    <div id="pe-add-q-form-${id}" style="display:none;background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:14px;margin-top:8px;margin-bottom:8px;">
      <div style="font-weight:700;color:#166534;font-size:0.9rem;margin-bottom:10px;">Nova Pergunta</div>
      <input id="pe-nova-q-texto" type="text" placeholder="Texto da pergunta..." style="width:100%;padding:8px;border:1px solid #e2e8f0;border-radius:6px;font-size:0.9rem;margin-bottom:8px;">
      <select id="pe-nova-q-tipo" onchange="window.peToggleOpcoesNQ()" style="width:100%;padding:8px;border:1px solid #e2e8f0;border-radius:6px;margin-bottom:8px;">
        <option value="texto">Resposta livre (texto)</option>
        <option value="sim_nao">Sim / Não</option>
        <option value="escala">Escala 1–10</option>
        <option value="multi">Múltipla Escolha</option>
      </select>
      <div id="pe-nova-q-opcoes-area" style="display:none;margin-bottom:8px;">
        <input id="pe-nova-q-opcoes" type="text" placeholder="Opção 1, Opção 2, Opção 3..." style="width:100%;padding:8px;border:1px solid #e2e8f0;border-radius:6px;font-size:0.85rem;">
        <div style="font-size:0.74rem;color:#64748b;margin-top:4px;">Separe as opções por vírgula.</div>
      </div>
      <div style="display:flex;gap:8px;">
        <button onclick="window.peGuardarNovaQ('${id}')" style="background:#16a34a;color:white;border:none;padding:8px 18px;border-radius:6px;font-size:0.85rem;font-weight:700;cursor:pointer;">+ Adicionar</button>
        <button onclick="document.getElementById('pe-add-q-form-${id}').style.display='none'" style="background:white;border:1px solid #e2e8f0;padding:8px 14px;border-radius:6px;font-size:0.85rem;cursor:pointer;">Cancelar</button>
      </div>
    </div>
    <button onclick="window.peAdicionarQ('${id}')" style="width:100%;padding:12px;border:2px dashed #e2e8f0;background:white;border-radius:8px;color:#64748b;font-size:0.85rem;font-weight:600;cursor:pointer;margin-top:4px;">+ Adicionar Pergunta</button>`;
  }
  container.innerHTML = html;
}

function peMoverQ(idx, dir, formId) {
  const cfg = peLerConfig(); const lista = cfg.forms[formId];
  if (!lista || idx+dir < 0 || idx+dir >= lista.length) return;
  [lista[idx], lista[idx+dir]] = [lista[idx+dir], lista[idx]];
  peState.formsDB = cfg.forms; peGuardarConfig(cfg); peRenderizarFicha(formId);
}

function peToggleEditInline(idx, formId) {
  const el = document.getElementById(`pe-inline-edit-${idx}`);
  if (!el) return;
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
  if (el.style.display === 'block') {
    const inp = document.getElementById(`pe-edit-q-${idx}`);
    if (inp) inp.focus();
  }
}

function peConfirmarApagar(idx, formId) {
  const inlineEdit = document.getElementById(`pe-inline-edit-${idx}`);
  if (inlineEdit) inlineEdit.style.display = 'block';
  const confirmEl = document.getElementById(`pe-inline-confirm-${idx}`);
  if (confirmEl) confirmEl.style.display = 'block';
}

function peApagarQConfirmado(idx, formId) {
  const cfg = peLerConfig();
  cfg.forms[formId].splice(idx, 1);
  peState.formsDB = cfg.forms; peGuardarConfig(cfg); peRenderizarFicha(formId);
}

function peApagarQ(idx, formId) { peConfirmarApagar(idx, formId); }
function peEditarQ(idx, formId) { peToggleEditInline(idx, formId); }

function peAdicionarQ(formId) {
  const form = document.getElementById(`pe-add-q-form-${formId}`);
  if (form) {
    form.style.display = 'block';
    const inp = document.getElementById('pe-nova-q-texto');
    if (inp) { inp.value = ''; inp.focus(); }
    const tipoSel = document.getElementById('pe-nova-q-tipo');
    if (tipoSel) tipoSel.value = 'texto';
    const area = document.getElementById('pe-nova-q-opcoes-area');
    if (area) area.style.display = 'none';
  }
}

function peToggleOpcoesNQ() {
  const tipo = document.getElementById('pe-nova-q-tipo')?.value;
  const area = document.getElementById('pe-nova-q-opcoes-area');
  if (area) area.style.display = tipo === 'multi' ? 'block' : 'none';
}

function peGuardarNovaQ(formId) {
  const texto = document.getElementById('pe-nova-q-texto')?.value?.trim();
  if (!texto) return mostrarAviso('⚠️ Escreva o texto da pergunta antes de adicionar.');
  const tipo = document.getElementById('pe-nova-q-tipo')?.value || 'texto';
  const opcoesTxt = document.getElementById('pe-nova-q-opcoes')?.value || '';
  const opcoes = tipo === 'multi' ? opcoesTxt.split(',').map(o => o.trim()).filter(Boolean) : [];
  const cfg = peLerConfig();
  const novaQ = { q: texto, tipo };
  if (opcoes.length) novaQ.opcoes = opcoes;
  cfg.forms[formId].push(novaQ);
  peState.formsDB = cfg.forms; peGuardarConfig(cfg); peRenderizarFicha(formId);
}

function peToggleOpcoesEQ(idx) {
  const tipo = document.getElementById(`pe-edit-tipo-${idx}`)?.value;
  const area = document.getElementById(`pe-edit-opcoes-area-${idx}`);
  if (area) area.style.display = tipo === 'multi' ? 'block' : 'none';
}

function peGuardarEdicaoQ(idx, formId) {
  const texto = document.getElementById(`pe-edit-q-${idx}`)?.value?.trim();
  if (!texto) return mostrarAviso('⚠️ A pergunta não pode estar vazia.');
  const tipo = document.getElementById(`pe-edit-tipo-${idx}`)?.value || 'texto';
  const opcoesTxt = document.getElementById(`pe-edit-opcoes-${idx}`)?.value || '';
  const opcoes = tipo === 'multi' ? opcoesTxt.split(',').map(o => o.trim()).filter(Boolean) : [];
  const cfg = peLerConfig();
  cfg.forms[formId][idx] = { q: texto, tipo, ...(opcoes.length ? { opcoes } : {}) };
  peState.formsDB = cfg.forms; peGuardarConfig(cfg); peRenderizarFicha(formId);
}

function peCopiarFicha() {
  const tit=document.getElementById('pe-form-titulo')?.textContent||'Ficha';
  const fichas=peState.formsDB||peLerConfig().forms;
  let txt=`📝 *${tit}*\n\nPreencha com sinceridade:\n\n`;
  (fichas[peState.formId]||[]).forEach(item=>{ txt+=`Q: ${item.q}\nR: \n\n`; });
  copiarTexto(txt);
}

function peToggleColarArea() {
  const area = document.getElementById('pe-colar-area');
  if (!area) return;
  const isOpen = area.style.display !== 'none';
  area.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) {
    const txt = document.getElementById('pe-colar-texto');
    if (txt) { txt.value = ''; setTimeout(() => txt.focus(), 50); }
  }
}

function peColarRespostasGuardar() {
  const txt = document.getElementById('pe-colar-texto')?.value?.trim();
  if (!txt) return mostrarAviso('⚠️ Nenhum texto para guardar.');
  if (!peState.patientId) return mostrarAviso('⚠️ Selecione primeiro um paciente.');
  const data = new Date().toLocaleDateString('pt-PT');
  guardarNaFicha(peState.patientId, {
    tipo: 'pesquisa_emocional_ficha',
    titulo: 'Respostas do Paciente (Manual)',
    texto: `Respostas recebidas em ${data}:\n\n${txt}`,
    dados: { fonte: 'colar_manual' }
  });
  mostrarAviso('✅ Respostas guardadas no histórico do paciente!');
  peToggleColarArea();
}

function peColarRespostas() { peToggleColarArea(); }

function peGuardarFicha() {
  if (!peState.patientId) return mostrarAviso('⚠️ Selecione um paciente antes de guardar.');
  const medosWrap=document.getElementById('pe-medos-wrapper');
  const isMedos=medosWrap&&medosWrap.style.display!=='none';
  const data=new Date().toLocaleDateString('pt-PT');
  let texto=''; let hasData=false;
  if (isMedos) {
    const res=document.getElementById('pe-medo-resultado');
    if (res&&res.dataset.val) { hasData=true; texto=`Medo Predominante: ${res.dataset.val}`; }
  } else {
    const fichas=peState.formsDB||peLerConfig().forms;
    const tit=document.getElementById('pe-form-titulo')?.textContent||'Ficha';
    texto=`FICHA: ${tit}\nData: ${data}\n\n`;
    (fichas[peState.formId]||[]).forEach((item,idx)=>{ const val=document.getElementById(`pe-r-${idx}`)?.value?.trim()||''; if(val){hasData=true; texto+=`• ${item.q}:\n  R: ${val}\n\n`;} });
  }
  if (!hasData) return mostrarAviso('⚠️ A ficha está vazia.');
  guardarNaFicha(peState.patientId,{ tipo:'pesquisa_emocional_ficha', titulo:isMedos?'Avaliação de Medos Subconscientes':(document.getElementById('pe-form-titulo')?.textContent||'Ficha'), texto, dados:{formId:peState.formId} });
  mostrarAviso('✅ Ficha guardada no histórico!');
}

// ─── MEDOS ────────────────────────────────────────────────────────

function peConstruirMedos() {
  const container=document.getElementById('pe-medos-wrapper');
  if (!container) return;
  let html=`<h4 style="color:#1e3a8a;margin-bottom:12px;">Avaliação de Medos Subconscientes</h4>
    <p style="font-size:0.85rem;color:#64748b;margin-bottom:16px;">Peça ao paciente para avaliar de 1 (Discordo) a 5 (Concordo totalmente).</p>`;
  PE_MEDOS.forEach((bloco,bIdx)=>{
    html+=`<div style="background:#fff1f2;padding:10px 14px;border-radius:6px;font-weight:700;color:#dc2626;margin-top:16px;margin-bottom:10px;">${bloco.name}</div>
      <table style="width:100%;border-collapse:collapse;">
        <tr><th style="text-align:left;padding:8px;font-size:0.82rem;color:#1e3a8a;background:#f8fafc;border:1px solid #e2e8f0;">Afirmação</th>
        ${[1,2,3,4,5].map(n=>`<th style="padding:8px;font-size:0.82rem;color:#1e3a8a;background:#f8fafc;border:1px solid #e2e8f0;">${n}</th>`).join('')}</tr>`;
    bloco.q.forEach((q,qIdx)=>{
      html+=`<tr><td style="padding:10px 8px;font-size:0.82rem;border:1px solid #e2e8f0;">${q}</td>`;
      for(let i=1;i<=5;i++) html+=`<td style="text-align:center;border:1px solid #e2e8f0;"><input type="radio" name="pem_${bIdx}_${qIdx}" value="${i}" onchange="window.peCalcMedos()"></td>`;
      html+=`</tr>`;
    });
    html+=`</table>`;
  });
  html+=`<div id="pe-medo-resultado" style="background:#eff6ff;border:1px solid #bfdbfe;padding:14px;border-radius:8px;text-align:center;font-weight:700;color:#0f172a;margin-top:20px;">Aguarda preenchimento...</div>`;
  container.innerHTML=html;
}

function peCalcMedos() {
  let maxScore=0; let topFear='';
  PE_MEDOS.forEach((bloco,bIdx)=>{ let soma=0; bloco.q.forEach((_,qIdx)=>{ const sel=document.querySelector(`input[name="pem_${bIdx}_${qIdx}"]:checked`); if(sel)soma+=parseInt(sel.value); }); if(soma>maxScore){maxScore=soma;topFear=bloco.name;} });
  const el=document.getElementById('pe-medo-resultado');
  if (el&&maxScore>0) { el.textContent=`Medo Predominante: ${topFear} (${maxScore} pontos).`; el.dataset.val=topFear; }
}

// ─── VIA DE INVESTIGAÇÃO ──────────────────────────────────────────

function peEscolherVia(n,el) {
  peState.path=n;
  [1,2,3].forEach(i=>{ const c=document.getElementById(`pe-via-${i}`); if(c){c.style.borderColor=i===n?'#1e3a8a':'#e2e8f0';c.style.background=i===n?'#eff6ff':'white';} });
  const q=document.getElementById('pe-quadrantes-area'); if(q) q.style.display=n===2?'block':'none';
}

function peToggleQuadrante(val,el) {
  el.dataset.sel=el.dataset.sel==='1'?'':'1';
  el.style.borderColor=el.dataset.sel?'#1e3a8a':'#e2e8f0';
  el.style.background=el.dataset.sel?'#eff6ff':'white';
}

function peSelecionarZonas(preset) {
  const mapa = {
    'all':      ['Frente - Lado Direito','Frente - Lado Esquerdo','Costas - Lado Direito','Costas - Lado Esquerdo'],
    'frente':   ['Frente - Lado Direito','Frente - Lado Esquerdo'],
    'costas':   ['Costas - Lado Direito','Costas - Lado Esquerdo'],
    'direito':  ['Frente - Lado Direito','Costas - Lado Direito'],
    'esquerdo': ['Frente - Lado Esquerdo','Costas - Lado Esquerdo']
  };
  const selecionadas = mapa[preset] || [];
  document.querySelectorAll('#pe-quadrantes-area [id^="pe-q-"]').forEach(el => {
    const label = el.querySelector('div:first-child')?.textContent.trim() || '';
    const ativo = selecionadas.includes(label);
    el.dataset.sel = ativo ? '1' : '';
    el.style.borderColor = ativo ? '#1e3a8a' : '#e2e8f0';
    el.style.background = ativo ? '#eff6ff' : 'white';
  });
}

function peIniciarVia() {
  if (peState.path===1) { peIrPasso('3a'); }
  else if (peState.path===3) { peIrPasso('3c'); }
  else {
    const sel=Array.from(document.querySelectorAll('#pe-quadrantes-area [data-sel="1"]')).map(el=>({ val:el.querySelector('div:first-child').textContent.trim(), desc:el.querySelector('div:last-child').textContent.trim() }));
    if (sel.length===0) return mostrarAviso('⚠️ Selecione pelo menos uma Zona a mapear.');
    peState.quadrants=sel; peState.qIdx=0; peState.mappingData={};
    peState.hasBack=sel.some(q=>q.val.includes('Costas'));
    sel.forEach(q=>{ if(!peState.mappingData[q.val]) { const cfg=peLerConfig(); peState.mappingData[q.val]={desc:q.desc,selectedPoints:new Set(),lateralNotes:'',shield:'Não Especificado',epoch:'Transgeracional',epochTime:'',categories:JSON.parse(JSON.stringify(cfg.categories))}; } });
    peCarregarQuadrante(); peIrPasso('3b');
  }
}

function peCarregarQuadrante() {
  const qName=peState.quadrants[peState.qIdx]?.val;
  const titulo=document.getElementById('pe-mapa-titulo');
  if (titulo) titulo.textContent=`Pesquisa Visual » ${qName} (${peState.qIdx+1}/${peState.quadrants.length})`;
  document.querySelectorAll('#pe-escudos-mapa div').forEach(b=>{b.style.borderColor='#e2e8f0';b.style.background='white';b.style.color='#64748b';});
  peState.catId='vital'; peRenderizarTabs(); peCarregarCategoria('vital');
}

function peProximoQuadrante() {
  const qName=peState.quadrants[peState.qIdx]?.val;
  const qData=peState.mappingData[qName];
  if (!qData) return;
  qData.lateralNotes=document.getElementById('pe-lateral-notas')?.value||'';
  const shieldBtn=document.querySelector('#pe-escudos-mapa div[data-ativo="1"]');
  qData.shield=shieldBtn?shieldBtn.textContent.trim():'Não Especificado';
  qData.epoch=document.getElementById('pe-epoca')?.value||'Transgeracional';
  qData.epochTime=document.getElementById('pe-epoca-tempo')?.value||'';
  peState.qIdx++;
  if (peState.qIdx>=peState.quadrants.length) { peConsolidarEscudosMapa(); peIrPasso('4'); }
  else { peCarregarQuadrante(); }
}

// ─── MAPA SVG ─────────────────────────────────────────────────────

function peRenderizarTabs() {
  const bar=document.getElementById('pe-categorias-tabs');
  if (!bar) return;
  const qData=peState.mappingData[peState.quadrants[peState.qIdx]?.val];
  if (!qData) return;
  bar.innerHTML='';
  qData.categories.forEach(cat=>{
    const btn=document.createElement('button');
    btn.textContent=cat.name;
    btn.style.cssText=`padding:8px 14px;border:1px solid ${cat.id===peState.catId?'#1e3a8a':'#e2e8f0'};background:${cat.id===peState.catId?'#1e3a8a':'white'};color:${cat.id===peState.catId?'white':'#64748b'};border-radius:8px;cursor:pointer;font-size:0.8rem;font-weight:600;white-space:nowrap;`;
    btn.onclick=()=>peCarregarCategoria(cat.id);
    bar.appendChild(btn);
  });
}

function peCarregarCategoria(catId) {
  peState.catId=catId; peRenderizarTabs();
  const qData=peState.mappingData[peState.quadrants[peState.qIdx]?.val];
  if (!qData) return;
  const cat=qData.categories.find(c=>c.id===catId);
  const lateralArea=document.getElementById('pe-lateral-area');
  const pontosGrid=document.getElementById('pe-pontos-grid');
  if (catId==='lateral') {
    if (lateralArea) lateralArea.style.display='block';
    if (pontosGrid) pontosGrid.style.display='none';
    const ln=document.getElementById('pe-lateral-notas'); if(ln) ln.value=qData.lateralNotes||'';
  } else {
    if (lateralArea) lateralArea.style.display='none';
    if (pontosGrid) pontosGrid.style.display='grid';
    peRenderizarPontos(cat,qData.selectedPoints);
  }
  peRenderizarSVG(cat,qData.selectedPoints);
}

function peRenderizarPontos(cat,selectedSet) {
  const container=document.getElementById('pe-pontos-grid');
  if (!container) return;
  container.innerHTML='';
  const zoneVal=peState.quadrants[peState.qIdx]?.val||'';
  const zoneLabel=(()=>{
    if (zoneVal.includes('Frente')&&zoneVal.includes('Direito')) return 'Frente Direita';
    if (zoneVal.includes('Frente')&&zoneVal.includes('Esquerdo')) return 'Frente Esquerda';
    if (zoneVal.includes('Costas')&&zoneVal.includes('Direito')) return 'Costas Direita';
    if (zoneVal.includes('Costas')&&zoneVal.includes('Esquerdo')) return 'Costas Esquerda';
    return zoneVal;
  })();
  const zoneBadge=zoneLabel?`<div style="display:inline-block;background:#eff6ff;color:#1e40af;font-size:0.65rem;font-weight:700;padding:2px 7px;border-radius:20px;margin-bottom:5px;letter-spacing:0.02em;">📍 ${zoneLabel}</div>`:'';
  cat.points.forEach(p=>{
    const isSel=selectedSet.has(p.id);
    const div=document.createElement('div');
    div.id=`pe-btn-${p.id}`;
    div.style.cssText=`background:${isSel?'#fef2f2':'#f8fafc'};border:2px solid ${isSel?'#dc2626':'#e2e8f0'};border-radius:10px;padding:12px;cursor:pointer;transition:.2s;`;
    div.innerHTML=`${zoneBadge}<div style="font-weight:700;font-size:0.88rem;color:#0f172a;">${p.name}</div><div style="font-size:0.75rem;color:${cat.cor};font-weight:600;">${p.organ}</div><div style="font-size:0.72rem;color:#64748b;margin-top:4px;">${p.desc}</div>`;
    div.onclick=()=>peTogglePonto(p.id,!selectedSet.has(p.id));
    container.appendChild(div);
  });
}

function peRenderizarSVG(cat,selectedSet) {
  const svg=document.getElementById('pe-svg');
  if (!svg) return;
  svg.innerHTML=PE_CORPO_SVG;
  if (cat.id==='lateral') svg.innerHTML+=`<path d="M 100 15 C 130 15 145 50 145 90 C 175 130 180 210 170 240 C 145 250 135 300 130 380" fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="4"/>`;
  cat.points.forEach(p=>{
    const isSel=selectedSet.has(p.id);
    const c=document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('cx',p.x); c.setAttribute('cy',p.y); c.setAttribute('r',isSel?'10':'8');
    c.setAttribute('fill',isSel?'#dc2626':cat.cor); c.setAttribute('stroke',isSel?'#fef08a':'white'); c.setAttribute('stroke-width',isSel?'3':'1.5');
    const title=document.createElementNS('http://www.w3.org/2000/svg','title'); title.textContent=p.name; c.appendChild(title);
    const hit=document.createElementNS('http://www.w3.org/2000/svg','circle');
    hit.setAttribute('cx',p.x); hit.setAttribute('cy',p.y); hit.setAttribute('r','16'); hit.setAttribute('fill','transparent');
    hit.addEventListener('pointerdown',(e)=>{ e.preventDefault(); e.stopPropagation(); peTogglePonto(p.id,!selectedSet.has(p.id)); });
    svg.appendChild(c); svg.appendChild(hit);
  });
}

function peTogglePonto(id,isSelected) {
  const qData=peState.mappingData[peState.quadrants[peState.qIdx]?.val];
  if (!qData) return;
  if (isSelected) qData.selectedPoints.add(id); else qData.selectedPoints.delete(id);
  const cat=qData.categories.find(c=>c.id===peState.catId);
  if (cat) { peRenderizarPontos(cat,qData.selectedPoints); peRenderizarSVG(cat,qData.selectedPoints); }
}

function peToggleEditMapa() {
  peState.editMode=!peState.editMode;
  const btn=document.getElementById('pe-btn-edit-mapa');
  if (btn) { btn.textContent=peState.editMode?'✅ Edição Concluída':'✏️ Modo Edição'; btn.style.background=peState.editMode?'#dc2626':'#e2e8f0'; btn.style.color=peState.editMode?'white':'#334155'; }
}

function peEscolherEscudoMapa(shield,el) {
  document.querySelectorAll('#pe-escudos-mapa div').forEach(b=>{ b.dataset.ativo=''; b.style.borderColor='#e2e8f0'; b.style.background='white'; b.style.color='#64748b'; });
  el.dataset.ativo='1'; el.style.borderColor='#1e3a8a'; el.style.background='#eff6ff'; el.style.color='#1e3a8a';
}

function peAtualizarEpocaLabel() {
  const val=document.getElementById('pe-epoca')?.value;
  const lbl=document.getElementById('pe-epoca-label');
  if (!lbl) return;
  lbl.textContent=val==='Transgeracional'?'Gerações:':val==='Gestacional'?'Mês Intrauterino:':'Idade / Época:';
}

// ─── PADRÕES CONSCIENTES ──────────────────────────────────────────

function peCalcEscudo() {
  const chaves=[['desp','Desproteção'],['desv','Desvalorização'],['impo','Impotência'],['sobr','Sobrevivência'],['perd','Perda']];
  const vals=chaves.map(([k,n])=>({n,v:parseInt(document.getElementById(`pe-sel-${k}`)?.value||'0')}));
  const max=Math.max(...vals.map(x=>x.v));
  const el=document.getElementById('pe-escudo-resultado');
  if (!el) return;
  if (max===0) { peState.shieldCalc='Indefinido'; el.textContent='Aguarda pontuação...'; return; }
  const tops=vals.filter(x=>x.v===max);
  peState.shieldCalc=tops.length===1?tops[0].n:'Misto ('+tops.map(t=>t.n).join('+')+')';
  el.textContent=`Escudo Predominante: [${peState.shieldCalc}] com ${max}/10`;
}

function peEscolherEscudoFinal(shield,el) {
  peState.finalShield=shield;
  document.querySelectorAll('#pe-escudos-final div').forEach(b=>{ b.style.borderColor='#e2e8f0'; b.style.background='white'; b.style.color='#64748b'; });
  el.style.borderColor='#1e3a8a'; el.style.background='#eff6ff'; el.style.color='#1e3a8a';
}

// ─── RECEITA ──────────────────────────────────────────────────────

function pePreencherReceita() {
  const fchoGeral=document.getElementById('pe-fecho-geral');
  if (fchoGeral) fchoGeral.style.display='block';
  if (peState.path===2) {
    peRenderEscudosMapa();
    const dominante = (peState.finalShield && !peState.finalShield.startsWith('Misto'))
      ? peState.finalShield
      : (peState.shieldsDetected && peState.shieldsDetected[0]?.[0]) || null;
    if (dominante) {
      document.querySelectorAll('#pe-escudos-final div').forEach(b=>{
        const ativo = b.textContent.trim()===dominante;
        b.style.borderColor=ativo?'#1e3a8a':'#e2e8f0';
        b.style.background=ativo?'#eff6ff':'white';
        b.style.color=ativo?'#1e3a8a':'#64748b';
      });
      peState.finalShield=dominante;
    }
  }
  const escudo=peState.finalShield!=='Não Especificado'?peState.finalShield:peState.shieldCalc;
  let txt="PLANO DE REEQUILÍBRIO (TRABALHOS DE CASA):\nBeber um copo de água, ligar a frequência e iniciar a sequência:\n\n";
  if (escudo&&escudo!=='Indefinido'&&escudo!=='Não Especificado') {
    txt+=`🎧 1. Modulação Neuroplástica (${escudo}): Ouve o áudio específico para desprogramar o Padrão de ${escudo} diariamente, ao deitar, durante 7 dias contínuos.\n\n`;
  } else {
    txt+=`🎧 1. Modulação Neuroplástica: Ouve o áudio de modulação diariamente, ao deitar, durante 7 dias contínuos.\n\n`;
  }
  if (peState.path===2) {
    const pontosFrente=[];
    const costasSC=[];
    const costasInf=[];
    const PASSO_PADRAO=`  a) Massajar o ponto com 3 dedos em pinça durante 3 respirações profundas.\n  b) Bater levemente duas vezes sobre o ponto.\n  c) Rodar os dedos duas vezes sobre o ponto (circular).\n  d) Empurrar suavemente para baixo com os dedos (libertar o sentimento).\n`;
    peState.quadrants.forEach(q=>{
      const qData=peState.mappingData[q.val];
      if (!qData||qData.selectedPoints.size===0) return;
      const isF=q.val.includes('Frente'); const isC=q.val.includes('Costas');
      const zLabel=q.val.includes('Frente')&&q.val.includes('Direito')?'Frente Direita'
        :q.val.includes('Frente')&&q.val.includes('Esquerdo')?'Frente Esquerda'
        :q.val.includes('Costas')&&q.val.includes('Direito')?'Costas Direita'
        :q.val.includes('Costas')&&q.val.includes('Esquerdo')?'Costas Esquerda':q.val;
      qData.selectedPoints.forEach(pid=>{
        let pName=pid; let pOrgan=''; let catId='';
        for (const cat of PE_CAT) { const f=cat.points.find(p=>p.id===pid); if(f){pName=f.name;pOrgan=f.organ;catId=cat.id;break;} }
        const entry=`  • [${zLabel}] ${pName}${pOrgan?` — ${pOrgan}`:''}`;
        if (isF) { pontosFrente.push(entry); }
        else if (isC) {
          if (catId==='inferior') costasInf.push(entry);
          else costasSC.push(entry);
        }
      });
    });
    txt+=`📍 2. Estimulação Física e Frequencial:\nObserva a imagem do teu mapa corporal em anexo e localiza cada ponto marcado.\n\n`;
    if (pontosFrente.length>0) {
      txt+=`🫁 PONTOS DA FRENTE:\n`+pontosFrente.join('\n')+'\n';
      txt+=`Localização: Acede diretamente aos pontos assinalados na frente do corpo.\n`;
      txt+=PASSO_PADRAO+'\n';
    }
    if (costasSC.length>0) {
      txt+=`🫀 PONTOS DAS COSTAS — Sistema Superior (S) e Sistema Central (C):\n`+costasSC.join('\n')+'\n';
      txt+=`Localização: A massagem de todos estes pontos nas costas é feita no osso mais saliente que temos na parte de trás do pescoço.\n`;
      txt+=PASSO_PADRAO+'\n';
    }
    if (costasInf.length>0) {
      txt+=`🦵 PONTOS DAS COSTAS — Sistema Inferior (M):\n`+costasInf.join('\n')+'\n';
      txt+=`Localização: A massagem é feita na parte de trás das pernas (coxas posteriores e gémeos na localização exata assinalada no mapa).\n`;
      txt+=PASSO_PADRAO+'\n';
    }
    if (pontosFrente.length===0&&costasSC.length===0&&costasInf.length===0) {
      txt+=`(Nenhum ponto selecionado no mapeamento — revê os quadrantes antes de emitir o plano.)\n\n`;
    }
  }
  const medoRes=document.getElementById('pe-medo-resultado');
  if (medoRes&&medoRes.dataset.val) txt+=`🧠 3. Limpeza de Medos: Para ajudar a libertar o ${medoRes.dataset.val}, recomendo a frequência de limpeza de medos profundos.\n\n`;
  if (peState.path===3) txt+=`🎵 3. Gatilho Emocional: Quando sentires a pressão do estressor, faz uma pausa de 3 minutos, respira fundo e ouve a música de ancoragem recomendada.\n\n`;
  const af=PE_ESCUDOS_AFINIDADES[escudo];
  if (af) {
    txt+=`✨ Comando de Libertação e Cura (${escudo}):\n`;
    txt+=`Depois da estimulação, dá um autoabraço, respira fundo e repete em voz alta:\n\n`;
    txt+=`«Eu libero todo sentimento de ${escudo.toUpperCase()}; ${af.libera}, que estejam bloqueados no meu corpo. Eu libero todos os sentimentos negativos que não me ajudam a evoluir, fica em mim apenas o necessário para o meu aprendizado, o resto eu libero e solto em gratidão!»\n`;
    txt+=`(Bater no peito esquerdo com a mão 3 vezes): «Está feito, está feito, está feito. Está selado.»\n\n`;
    txt+=`Comando de Reforço:\n${af.afi}\n«Que assim seja.»\n`;
  }
  const el=document.getElementById('pe-receita');
  if (el) el.value=txt;
}

// ─── RELATÓRIO FINAL ──────────────────────────────────────────────

async function peEmitirRelatorio() {
  const data=new Date().toLocaleDateString('pt-PT');
  const escudo=peState.finalShield!=='Não Especificado'?peState.finalShield:peState.shieldCalc;
  let relatorio=`RELATÓRIO CLÍNICO — PESQUISA EMOCIONAL\n${'='.repeat(60)}\nData: ${data}\nPaciente: ${peState.patientName}\n\n`;
  if (peState.path===1) {
    relatorio+=`MÉTODO: AVALIAÇÃO DE PADRÕES CONSCIENTES\n${'-'.repeat(40)}\n`;
    [['desp','Desproteção'],['desv','Desvalorização'],['impo','Impotência'],['sobr','Sobrevivência'],['perd','Perda']].forEach(([k,n])=>{ const val=document.getElementById(`pe-sel-${k}`)?.value||'0'; relatorio+=`• ${n}: ${val}/10\n`; });
    relatorio+=`\nEscudo Predominante — [${peState.shieldCalc}]\nFecho Diagnóstico: ${escudo}\n`;
    const notas=document.getElementById('pe-notas-path1')?.value?.trim();
    if (notas) relatorio+=`\nNotas Clínicas:\n${notas}\n`;
  } else if (peState.path===3) {
    relatorio+=`MÉTODO: ESTRESSORES ATIVOS E GATILHOS\n${'-'.repeat(40)}\n`;
    [['1','Convívio perturbador'],['2','Ação gatilho'],['3','Sintoma'],['4','Passado'],['5','Raiz']].forEach(([n,q])=>{ const val=document.getElementById(`pe-p3-${n}`)?.value?.trim()||''; if(val)relatorio+=`• ${q}: ${val}\n`; });
    relatorio+=`\nFecho Diagnóstico: ${escudo}\n`;
  } else {
    relatorio+=`MÉTODO: MAPEAMENTO SUBCONSCIENTE VISUAL\n${'-'.repeat(40)}\n`;
    peState.quadrants.forEach(q=>{
      const qData=peState.mappingData[q.val];
      if (!qData) return;
      relatorio+=`\n[ ${q.val.toUpperCase()} ]\nSignificado: ${q.desc}\n\nPONTOS DETETADOS:\n`;
      let hasPoints=false;
      qData.categories.forEach(cat=>{ cat.points.forEach(p=>{ if(qData.selectedPoints.has(p.id)){hasPoints=true;relatorio+=`  — ${p.name} (${p.organ}): ${p.desc}\n`;if(p.r)relatorio+=`    > Reflexão: ${p.r}\n`;} }); });
      if (qData.lateralNotes){hasPoints=true;relatorio+=`  — Varredura Lateral: ${qData.lateralNotes.replace(/\n/g,' ')}\n`;}
      if (!hasPoints) relatorio+=`  — Nenhum ponto de retenção assinalado.\n`;
      relatorio+=`\nFECHO DESTE EIXO:\n  • Defesa: ${qData.shield}\n  • Gatilho Temporal: ${qData.epoch} (${qData.epochTime||'Sem data'})\n`;
    });
  }
  relatorio+=`\n${'='.repeat(60)}`;
  const receita=document.getElementById('pe-receita')?.value||'';
  if (peState.patientId) {
    await guardarNaFicha(peState.patientId,{ tipo:'pesquisa_emocional', titulo:`Pesquisa Emocional — ${data}`, texto:relatorio+(receita?`\n\nPLANO TERAPÊUTICO:\n${receita}`:''), dados:{escudo,path:peState.path,data} });
  }
  const el=document.getElementById('pe-step-relatorio');
  if (!el) return;
  el.innerHTML=`
    <div class="card" style="padding:20px;">
      <div style="font-size:1.1rem;font-weight:700;color:#16a34a;margin-bottom:16px;border-bottom:2px solid #dcfce7;padding-bottom:10px;">✅ Relatório Emitido e Guardado na Ficha</div>
      <pre style="background:white;border:2px solid #e2e8f0;border-radius:10px;padding:20px;white-space:pre-wrap;font-family:'Segoe UI',system-ui,sans-serif;font-size:0.88rem;line-height:1.6;color:#1e293b;overflow-x:auto;">${relatorio}</pre>
      ${receita?`<div style="background:#fffbeb;border:2px dashed #b45309;border-radius:12px;padding:20px;margin-top:20px;"><h3 style="color:#b45309;margin-bottom:16px;">Plano de Cura e Reequilíbrio</h3><pre style="white-space:pre-wrap;font-size:0.9rem;color:#92400e;line-height:1.7;">${receita}</pre></div>`:''}
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px;">
        <button onclick="window.print()" style="background:#1e3a8a;color:white;padding:12px 24px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">🖨️ Imprimir / PDF</button>
        <button onclick="window.copiarTexto(document.querySelector('#pe-step-relatorio pre').textContent)" style="background:#e2e8f0;padding:12px 20px;border:none;border-radius:8px;font-weight:600;cursor:pointer;">📋 Copiar</button>
        <button onclick="window.renderPesquisaEmocional(document.getElementById('pe-step-relatorio').closest('main,#main,.main-content')||document.body)" style="background:white;border:1px solid #e2e8f0;padding:12px 20px;border-radius:8px;font-weight:600;cursor:pointer;">🔄 Nova Consulta</button>
      </div>
    </div>`;
  peIrPasso('relatorio');
}

// ─── SOLICITAR ACESSO (tela de termos) ───────────────────────────

async function renderSolicitarPE(main) {
  if (!main) main=document.querySelector('main,#main,.main-content')||document.body;
  let status=null;
  try { const snap=await db().doc(`modulo_requests/${tenantId()}`).get(); if(snap.exists) status=snap.data().status; } catch(_){}
  main.innerHTML=`
    <div style="max-width:640px;margin:40px auto;padding:0 16px;">
      <div style="text-align:center;margin-bottom:28px;">
        <div style="font-size:3rem;margin-bottom:12px;">🔬</div>
        <div style="font-size:1.4rem;font-weight:700;color:#1e3a8a;margin-bottom:8px;">Módulo Clínico Avançado</div>
        <p style="color:#64748b;">Este módulo é disponibilizado pelo administrador da plataforma apenas a profissionais com a formação correspondente.</p>
      </div>
      ${status==='pending'?`
        <div style="background:#fef9c3;border:1px solid #fde047;border-radius:12px;padding:24px;text-align:center;">
          <div style="font-size:1.5rem;margin-bottom:10px;">⏳</div>
          <div style="font-weight:700;color:#854d0e;font-size:1.1rem;margin-bottom:8px;">Pedido em Análise</div>
          <p style="color:#713f12;font-size:0.9rem;">O seu pedido foi recebido. Será contactado e notificado quando o acesso for ativado.</p>
        </div>`
      :status==='approved'?`
        <div style="background:#dcfce7;border:1px solid #86efac;border-radius:12px;padding:24px;text-align:center;">
          <div style="font-size:1.5rem;margin-bottom:10px;">✅</div>
          <div style="font-weight:700;color:#166534;font-size:1.1rem;margin-bottom:8px;">Acesso Aprovado</div>
          <p style="color:#14532d;font-size:0.9rem;">O seu acesso foi aprovado. Recarregue a página para ativar o módulo.</p>
        </div>`
      :`
        <div style="background:white;border:1px solid #e2e8f0;border-radius:14px;padding:28px;">
          <div style="font-weight:700;color:#1e3a8a;margin-bottom:14px;font-size:1rem;">Termos de Utilização</div>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;font-size:0.85rem;color:#334155;line-height:1.7;max-height:200px;overflow-y:auto;margin-bottom:20px;">
            <p style="margin-bottom:10px;">Ao solicitar acesso a este módulo, o utilizador confirma e compromete-se a:</p>
            <p style="margin-bottom:8px;"><strong>1.</strong> O conteúdo disponibilizado neste módulo é de uso exclusivo e pessoal do profissional que solicita o acesso. Não pode ser partilhado, copiado, redistribuído nem cedido a terceiros, total ou parcialmente, em nenhum formato.</p>
            <p style="margin-bottom:8px;"><strong>2.</strong> O acesso é intransmissível e está associado exclusivamente ao consultório/clínica identificado no pedido.</p>
            <p style="margin-bottom:8px;"><strong>3.</strong> O utilizador assume total responsabilidade pela utilização correta e ética do módulo no âmbito da sua prática clínica ou terapêutica.</p>
            <p style="margin-bottom:8px;"><strong>4.</strong> O incumprimento destes termos implica a revogação imediata do acesso, sem direito a reembolso, e pode implicar responsabilidade legal.</p>
            <p><strong>5.</strong> O módulo destina-se exclusivamente a profissionais com a formação adequada. O administrador da plataforma pode solicitar comprovativo dessa formação a qualquer momento.</p>
          </div>
          <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;margin-bottom:22px;">
            <input type="checkbox" id="pe-aceito-termos" style="width:18px;height:18px;margin-top:2px;flex-shrink:0;cursor:pointer;">
            <span style="font-size:0.9rem;color:#334155;line-height:1.5;">Li e aceito os Termos de Utilização. Confirmo que possuo a formação necessária para utilizar este módulo e que o utilizarei exclusivamente para a minha prática profissional.</span>
          </label>
          <button id="pe-btn-pedir" onclick="window.peEnviarPedido()" style="background:#1e3a8a;color:white;width:100%;padding:14px;border:none;border-radius:8px;font-size:1rem;font-weight:700;cursor:pointer;">Solicitar Acesso ao Módulo</button>
          <div id="pe-pedido-status" style="margin-top:12px;"></div>
        </div>`}
    </div>`;
}

async function peEnviarPedido() {
  const checkbox=document.getElementById('pe-aceito-termos');
  const statusEl=document.getElementById('pe-pedido-status');
  const btn=document.getElementById('pe-btn-pedir');
  if (!checkbox?.checked) {
    if (statusEl) statusEl.innerHTML=`<div style="background:#fee2e2;border:1px solid #fca5a5;border-radius:8px;padding:12px;color:#dc2626;font-size:0.9rem;">⚠️ É necessário ler e aceitar os Termos de Utilização.</div>`;
    return;
  }
  btn.disabled=true; btn.textContent='⏳ A enviar pedido...';
  try {
    const token=await firebase.auth().currentUser.getIdToken();
    const resp=await fetch(`${NETLIFY_BASE}/verificarModulo`,{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},
      body:JSON.stringify({tenantId:tenantId(),termosAceites:true})
    });
    const data=await resp.json();
    if (data.ok) {
      if (statusEl) statusEl.innerHTML=`<div style="background:#dcfce7;border:1px solid #86efac;border-radius:8px;padding:14px;color:#166534;font-weight:700;text-align:center;">✅ ${data.message||'Pedido enviado com sucesso!'}</div>`;
      btn.textContent='✅ Pedido Enviado';
    } else {
      if (statusEl) statusEl.innerHTML=`<div style="background:#fee2e2;border:1px solid #fca5a5;border-radius:8px;padding:14px;color:#dc2626;">${data.error||'Erro ao enviar pedido.'}</div>`;
      btn.disabled=false; btn.textContent='Solicitar Acesso ao Módulo';
    }
  } catch(err) {
    console.error(err);
    if (statusEl) statusEl.innerHTML=`<div style="color:#dc2626;">Erro de ligação. Tente novamente.</div>`;
    btn.disabled=false; btn.textContent='Solicitar Acesso ao Módulo';
  }
}

// ─── ADMIN: APROVAR PEDIDOS ───────────────────────────────────────

async function renderAdminPedidosPE(main) {
  if (tenantId()!=='hikari-terapias') return;
  if (!main) main=document.querySelector('main,#main,.main-content')||document.body;
  main.innerHTML=`<div style="max-width:700px;margin:0 auto;padding:0 4px;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <div style="font-size:1.2rem;font-weight:700;color:#1e3a8a;">⚙️ Pedidos de Módulos Clínicos</div>
      <button onclick="window.renderPesquisaEmocional(document.querySelector('main,#main,.main-content')||document.body)" style="background:#e2e8f0;border:none;padding:8px 14px;border-radius:8px;font-size:0.82rem;font-weight:600;cursor:pointer;">← Voltar</button>
    </div>
    <div id="pe-admin-lista" style="text-align:center;padding:20px;color:#64748b;">A carregar...</div>
  </div>`;
  await peListarPedidosAdmin();
}

async function peListarPedidosAdmin() {
  const container=document.getElementById('pe-admin-lista');
  if (!container) return;
  try {
    const token=await firebase.auth().currentUser.getIdToken();
    const resp=await fetch(`${NETLIFY_BASE}/aprovarModulo`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({action:'listar'})});
    const data=await resp.json();
    if (!data.ok||!data.pedidos?.length) { container.innerHTML='<div style="text-align:center;padding:30px;color:#64748b;">Nenhum pedido pendente.</div>'; return; }
    container.innerHTML='';
    data.pedidos.forEach(p=>{
      const div=document.createElement('div');
      div.style.cssText='background:white;border:1px solid #e2e8f0;border-radius:10px;padding:16px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;';
      div.innerHTML=`
        <div>
          <div style="font-weight:700;color:#0f172a;">${p.nomeTenant}</div>
          <div style="font-size:0.82rem;color:#64748b;">Pedido em ${p.requestedAt} · Termos aceites: ${p.termosAceites?'✅ Sim':'—'}</div>
          <div style="font-size:0.78rem;color:#94a3b8;margin-top:2px;">ID: ${p.tenantId}</div>
        </div>
        <div style="display:flex;gap:8px;">
          <button onclick="window.peAprovarPedido('${p.tenantId}',this)" style="background:#16a34a;color:white;padding:10px 18px;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.85rem;">✅ Aprovar</button>
          <button onclick="window.peRejeitarPedido('${p.tenantId}',this)" style="background:#fee2e2;color:#dc2626;border:1px solid #fca5a5;padding:10px 18px;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.85rem;">🚫 Rejeitar</button>
        </div>`;
      container.appendChild(div);
    });
  } catch(err) { container.innerHTML='<div style="color:#dc2626;">Erro ao carregar pedidos.</div>'; }
}

async function peAprovarPedido(targetTenantId,btn) {
  btn.disabled=true; btn.textContent='⏳...';
  const token=await firebase.auth().currentUser.getId
  Token();
  const resp=await fetch(`${NETLIFY_BASE}/aprovarModulo`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({action:'aprovar',targetTenantId})});
  const data=await resp.json();
  if (data.ok) { mostrarAviso('✅ Acesso aprovado!'); await peListarPedidosAdmin(); }
  else { mostrarAviso('❌ Erro: '+(data.error||'')); btn.disabled=false; btn.textContent='✅ Aprovar'; }
}

async function peRejeitarPedido(targetTenantId, btn) {
  const card = btn.closest('div[style*="background:white"]') || btn.parentElement?.parentElement;
  if (!card) return;
  const existing = card.querySelector('.pe-reject-row');
  if (existing) { existing.remove(); return; }
  const row = document.createElement('div');
  row.className = 'pe-reject-row';
  row.style.cssText = 'background:#fee2e2;border:1px solid #fca5a5;border-radius:8px;padding:12px;margin-top:10px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;';
  row.innerHTML = `<span style="font-size:0.88rem;color:#dc2626;font-weight:600;">Confirma a rejeição deste pedido?</span>
    <div style="display:flex;gap:8px;">
      <button class="pe-reject-yes" style="background:#dc2626;color:white;border:none;padding:8px 16px;border-radius:6px;font-size:0.82rem;font-weight:700;cursor:pointer;">Sim, rejeitar</button>
      <button onclick="this.closest('.pe-reject-row').remove()" style="background:white;border:1px solid #e2e8f0;padding:8px 14px;border-radius:6px;font-size:0.82rem;cursor:pointer;">Cancelar</button>
    </div>`;
  card.appendChild(row);
  row.querySelector('.pe-reject-yes').onclick = async () => {
    row.remove();
    btn.disabled = true; btn.textContent = '⏳...';
    try {
      const token = await firebase.auth().currentUser.getIdToken();
      const resp = await fetch(`${NETLIFY_BASE}/aprovarModulo`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ action: 'rejeitar', targetTenantId }) });
      const data = await resp.json();
      if (data.ok) { mostrarAviso('Pedido rejeitado.'); await peListarPedidosAdmin(); }
      else { mostrarAviso('❌ Erro ao rejeitar.'); btn.disabled = false; btn.textContent = '🚫 Rejeitar'; }
    } catch(e) { btn.disabled = false; btn.textContent = '🚫 Rejeitar'; }
  };
}

// ─── CONSOLIDAÇÃO DE ESCUDOS (Via 2 — Mapeamento Visual) ─────────

function peConsolidarEscudosMapa() {
  const shields = Object.values(peState.mappingData)
    .map(q => q.shield)
    .filter(s => s && s !== 'Não Especificado');
  peState.shieldsDetected = [];
  if (shields.length === 0) { peState.finalShield = 'Não Especificado'; return; }
  const counts = {};
  shields.forEach(s => { counts[s] = (counts[s] || 0) + 1; });
  const sorted = Object.entries(counts).sort((a,b) => b[1]-a[1]);
  peState.shieldsDetected = sorted;
  const maxC = sorted[0][1];
  const doms = sorted.filter(([,c])=>c===maxC).map(([s])=>s);
  peState.finalShield = doms.length===1 ? doms[0] : 'Misto ('+doms.join('+')+')';
}

function peRenderEscudosMapa() {
  const el = document.getElementById('pe-escudos-resumo-mapa');
  if (!el) return;
  const detected = peState.shieldsDetected || [];
  if (detected.length === 0) { el.style.display='none'; return; }

  const descMap = {
    'Desproteção':    'O mapeamento revela tensões ligadas a injustiça, insegurança e acusação. O subconsciente regista áreas onde o paciente sente ausência de proteção ou apoio.',
    'Desvalorização': 'Os pontos mapeados apontam para memórias de inferioridade, rejeição ou incompreensão. O corpo retém um padrão de baixa estima e comparação negativa.',
    'Impotência':     'O mapa subconsciente indica retenção de eventos em que o paciente sentiu que nada do que fazia tinha efeito — paralisia ou incapacidade aprendida.',
    'Sobrevivência':  'As tensões mapeadas refletem pressão de sobrevivência — escassez, sufoco e indignação — física, emocional ou económica.',
    'Perda':          'O corpo retém padrões de separação, abandono e falta. O mapa aponta para perdas significativas, reais ou percebidas, ainda não processadas.'
  };

  const total = detected.reduce((a,[,c])=>a+c,0);
  const isMisto = detected.length > 1;
  const corBg  = isMisto ? '#fff7ed' : '#f0f9ff';
  const corBdr = isMisto ? '#fed7aa' : '#bae6fd';
  const corTit = isMisto ? '#c2410c' : '#0369a1';

  let html = `<div style="background:${corBg};border:1px solid ${corBdr};border-radius:12px;padding:18px;">
    <div style="font-weight:700;color:${corTit};font-size:1rem;margin-bottom:14px;">
      ${isMisto?'⚠️ Escudos Mistos Detectados no Mapeamento':'🎯 Escudo Subconsciente Detectado'}
    </div>`;

  detected.forEach(([shield,count],i) => {
    const pct = Math.round(count/total*100);
    const desc = descMap[shield]||'';
    const isDom = i===0;
    html+=`<div style="background:white;border:2px solid ${isDom?'#1e3a8a':'#e2e8f0'};border-radius:10px;padding:14px;margin-bottom:10px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
        <div style="font-weight:700;color:#0f172a;font-size:0.95rem;">${isDom?'★ ':''}${shield}</div>
        <div style="background:${isDom?'#1e3a8a':'#e2e8f0'};color:${isDom?'white':'#64748b'};padding:3px 10px;border-radius:20px;font-size:0.78rem;font-weight:700;">${count} eixo${count>1?'s':''} · ${pct}%</div>
      </div>
      <div style="font-size:0.82rem;color:#334155;line-height:1.55;">${desc}</div>
    </div>`;
  });

  if (isMisto) {
    html+=`<div style="font-size:0.82rem;color:#92400e;margin-top:4px;padding:10px;background:#fff3cd;border-radius:8px;">Em escudos mistos o plano terapêutico é construído a partir do escudo dominante. Confirme ou ajuste a seleção abaixo.</div>`;
  }
  html+=`</div>`;
  el.innerHTML=html; el.style.display='block';
}

// ─── QUESTIONÁRIOS ONLINE ─────────────────────────────────────────

function peGerarQId() {
  return 'peq_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 8);
}

async function peGerarEnvioOnline() {
  if (!peState.patientId) return mostrarAviso('⚠️ Selecione primeiro um paciente.');
  const panel = document.getElementById('pe-link-panel');
  if (!panel) return;

  const lsKey = `pe_lastq_${tenantId()}_${peState.patientId}_${peState.formId}`;
  let existingQId = null;
  try { existingQId = localStorage.getItem(lsKey); } catch(_) {}

  if (existingQId) {
    panel.style.display = 'block';
    panel.innerHTML = `<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:12px;text-align:center;color:#1e3a8a;">⏳ A verificar questionário anterior...</div>`;
    try {
      const snap = await db().collection('pe_questionarios').doc(existingQId).get();
      if (snap.exists) {
        const s = snap.data().status;
        if (s === 'pendente') {
          const link = `https://vindora.pt/pe-questionario.html?d=${existingQId}`;
          peRenderLinkPanel(existingQId, link, 'pendente');
          return;
        } else if (s === 'respondido') {
          peRenderLinkPanel(existingQId, null, 'respondido');
          return;
        }
      }
    } catch(_) {}
    try { localStorage.removeItem(lsKey); } catch(_) {}
  }

  const qId = peGerarQId();
  const fichas = peState.formsDB || peLerConfig().forms;
  const perguntas = fichas[peState.formId] || [];
  const tituloMap = { 'pre-consulta':'Questionário Pré-Consulta', 'pos-consulta':'Questionário Pós-Consulta', 'crianca':'Anamnese — Criança', 'cuidador':'Anamnese — Cuidador' };

  panel.style.display = 'block';
  panel.innerHTML = `<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px;text-align:center;"><span style="color:#1e3a8a;">⏳ A criar questionário online...</span></div>`;

  try {
    await db().collection('pe_questionarios').doc(qId).set({
      tenantId: tenantId(),
      patientId: peState.patientId,
      patientName: peState.patientName,
      formId: peState.formId,
      titulo: tituloMap[peState.formId] || 'Questionário',
      descricao: 'Por favor responda às perguntas abaixo com honestidade. As suas respostas são confidenciais.',
      perguntas: perguntas.map(p => {
        const q = { q: p.q, tipo: p.tipo || 'texto' };
        if (p.opcoes && p.opcoes.length) q.opcoes = p.opcoes;
        return q;
      }),
      status: 'pendente',
      criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });
    try { localStorage.setItem(lsKey, qId); } catch(_) {}
    const link = `https://vindora.pt/pe-questionario.html?d=${qId}`;
    peRenderLinkPanel(qId, link, 'pendente');
  } catch(err) {
    console.error('Erro ao criar questionário:', err);
    panel.innerHTML = `<div style="background:#fee2e2;border:1px solid #fca5a5;border-radius:10px;padding:14px;color:#dc2626;font-weight:600;">❌ Erro ao criar questionário. Verifique a ligação e tente novamente.</div>`;
  }
}

function peRenderLinkPanel(qId, link, status) {
  const panel = document.getElementById('pe-link-panel');
  if (!panel) return;
  panel.style.display = 'block';

  if (status === 'respondido') {
    panel.innerHTML = `
      <div style="background:#dcfce7;border:1px solid #86efac;border-radius:10px;padding:16px;">
        <div style="font-weight:700;color:#166534;margin-bottom:6px;">✅ Questionário respondido!</div>
        <div style="font-size:0.85rem;color:#166534;margin-bottom:14px;">O paciente já respondeu. Carregue as respostas no formulário.</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button onclick="window.peCarregarRespostasQ('${qId}')" style="background:#16a34a;color:white;border:none;padding:10px 20px;border-radius:8px;font-size:0.85rem;font-weight:700;cursor:pointer;">📥 Carregar Respostas no Formulário</button>
          <button onclick="window.peNovoLinkQ()" style="background:#e2e8f0;border:none;padding:10px 14px;border-radius:8px;font-size:0.85rem;font-weight:600;cursor:pointer;">🔄 Criar Novo</button>
        </div>
      </div>`;
  } else {
    panel.innerHTML = `
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:16px;">
        <div style="font-weight:700;color:#1e3a8a;margin-bottom:6px;">📤 Questionário Online Pronto</div>
        <div style="font-size:0.83rem;color:#334155;margin-bottom:8px;">Envie este link ao paciente (válido até ser respondido):</div>
        <div style="background:white;border:1px solid #bfdbfe;border-radius:8px;padding:10px;font-size:0.8rem;color:#1e3a8a;word-break:break-all;margin-bottom:12px;user-select:all;">${link||''}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
          <button onclick="window.peCopiarLinkQ('${(link||'').replace(/'/g,"\\'")}')\" style="background:#1e3a8a;color:white;border:none;padding:9px 16px;border-radius:8px;font-size:0.83rem;font-weight:700;cursor:pointer;">📋 Copiar Link</button>
          <button onclick="window.peCompartilharWA('${(link||'').replace(/'/g,"\\'")}')\" style="background:#25D366;color:white;border:none;padding:9px 16px;border-radius:8px;font-size:0.83rem;font-weight:700;cursor:pointer;">💬 WhatsApp</button>
          <button onclick="window.peVerificarRespostaQ('${qId}')" style="background:#e2e8f0;border:none;padding:9px 14px;border-radius:8px;font-size:0.83rem;font-weight:600;cursor:pointer;">🔄 Verificar Estado</button>
          <button onclick="window.peNovoLinkQ()" style="background:#fee2e2;border:none;padding:9px 12px;border-radius:8px;font-size:0.83rem;font-weight:600;color:#dc2626;cursor:pointer;">✕</button>
        </div>
        <div id="pe-link-status" style="font-size:0.82rem;color:#64748b;">⏳ A aguardar resposta do paciente...</div>
      </div>`;
  }
}

function peCopiarLinkQ(link) {
  if (typeof copiarTexto === 'function') { copiarTexto(link); return; }
  if (navigator.clipboard) { navigator.clipboard.writeText(link).then(() => mostrarAviso('✅ Link copiado!')).catch(() => {}); }
  else { mostrarAviso('✅ Link copiado!'); }
}

function peCompartilharWA(link) {
  const nome = peState.patientName || 'Caro/a utente';
  const msg = `Olá ${nome}! O seu terapeuta enviou um questionário para preencher antes da próxima consulta.\n\nClique aqui para responder:\n${link}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
}

async function peVerificarRespostaQ(qId) {
  const statusEl = document.getElementById('pe-link-status');
  if (statusEl) statusEl.textContent = '⏳ A verificar...';
  try {
    const snap = await db().collection('pe_questionarios').doc(qId).get();
    if (!snap.exists) {
      if (statusEl) statusEl.textContent = '❌ Questionário não encontrado.';
      return;
    }
    if (snap.data().status === 'respondido') {
      peRenderLinkPanel(qId, null, 'respondido');
    } else {
      if (statusEl) statusEl.textContent = '⏳ Ainda não respondido. O paciente ainda não abriu o link.';
    }
  } catch(err) {
    if (statusEl) statusEl.textContent = '❌ Erro de ligação. Tente novamente.';
  }
}

async function peCarregarRespostasQ(qId) {
  try {
    const snap = await db().collection('pe_questionarios').doc(qId).get();
    if (!snap.exists) return mostrarAviso('❌ Questionário não encontrado.');
    const data = snap.data();
    if (data.status !== 'respondido' || !data.respostas) {
      return mostrarAviso('⚠️ Sem respostas disponíveis para carregar.');
    }
    let count = 0;
    Object.entries(data.respostas).forEach(([key, val]) => {
      const idx = parseInt(key.replace('p', ''));
      if (!isNaN(idx)) {
        const el = document.getElementById(`pe-r-${idx}`);
        if (el) { el.value = String(val); count++; }
      }
    });
    mostrarAviso(`✅ ${count} resposta(s) carregadas no formulário!`);
    const panel = document.getElementById('pe-link-panel');
    if (panel) panel.style.display = 'none';
    const lsKey = `pe_lastq_${tenantId()}_${peState.patientId}_${peState.formId}`;
    try { localStorage.removeItem(lsKey); } catch(_) {}
  } catch(err) {
    console.error(err);
    mostrarAviso('❌ Erro ao carregar respostas. Tente novamente.');
  }
}

function peNovoLinkQ() {
  const lsKey = `pe_lastq_${tenantId()}_${peState.patientId}_${peState.formId}`;
  try { localStorage.removeItem(lsKey); } catch(_) {}
  const panel = document.getElementById('pe-link-panel');
  if (panel) panel.style.display = 'none';
}

function peVerificarQExistente(formId) {
  if (!peState.patientId) return;
  const lsKey = `pe_lastq_${tenantId()}_${peState.patientId}_${formId}`;
  let qId = null;
  try { qId = localStorage.getItem(lsKey); } catch(_) {}
  if (!qId) return;
  db().collection('pe_questionarios').doc(qId).get().then(snap => {
    if (!snap.exists) { try { localStorage.removeItem(lsKey); } catch(_) {} return; }
    const data = snap.data();
    if (data.status === 'respondido') {
      const panel = document.getElementById('pe-link-panel');
      if (panel) peRenderLinkPanel(qId, null, 'respondido');
    } else if (data.status === 'pendente') {
      const link = `https://vindora.pt/pe-questionario.html?d=${qId}`;
      const panel = document.getElementById('pe-link-panel');
      if (panel) peRenderLinkPanel(qId, link, 'pendente');
    }
  }).catch(() => {});
}

// ─── EXPOR TUDO NO WINDOW ──────────────────────────────────────────

window.renderPesquisaEmocional = renderPesquisaEmocional;
window.peVerificarAcesso       = peVerificarAcesso;
window.temPesquisaEmocional    = temPesquisaEmocional;
window.peIniciarConsulta       = peIniciarConsulta;
window.peIrPasso               = peIrPasso;
window.peVoltarFecho           = peVoltarFecho;
window.peMudarFicha            = peMudarFicha;
window.peToggleFormEdit        = peToggleFormEdit;
window.peCopiarFicha           = peCopiarFicha;
window.peColarRespostas        = peColarRespostas;
window.peGuardarFicha          = peGuardarFicha;
window.peCalcMedos             = peCalcMedos;
window.peEscolherVia           = peEscolherVia;
window.peToggleQuadrante       = peToggleQuadrante;
window.peIniciarVia            = peIniciarVia;
window.peProximoQuadrante      = peProximoQuadrante;
window.peToggleEditMapa        = peToggleEditMapa;
window.peEscolherEscudoMapa    = peEscolherEscudoMapa;
window.peAtualizarEpocaLabel   = peAtualizarEpocaLabel;
window.peCalcEscudo            = peCalcEscudo;
window.peEscolherEscudoFinal   = peEscolherEscudoFinal;
window.peEmitirRelatorio       = peEmitirRelatorio;
window.renderSolicitarPE       = renderSolicitarPE;
window.peEnviarPedido          = peEnviarPedido;
window.renderAdminPedidosPE    = renderAdminPedidosPE;
window.peAprovarPedido         = peAprovarPedido;
window.peRejeitarPedido        = peRejeitarPedido;
window.peMoverQ                = peMoverQ;
window.peApagarQ               = peApagarQ;
window.peEditarQ               = peEditarQ;
window.peAdicionarQ            = peAdicionarQ;
window.peToggleColarArea       = peToggleColarArea;
window.peColarRespostasGuardar = peColarRespostasGuardar;
window.peGerarEnvioOnline      = peGerarEnvioOnline;
window.peToggleEditInline      = peToggleEditInline;
window.peConfirmarApagar       = peConfirmarApagar;
window.peApagarQConfirmado     = peApagarQConfirmado;
window.peToggleOpcoesNQ        = peToggleOpcoesNQ;
window.peGuardarNovaQ          = peGuardarNovaQ;
window.peToggleOpcoesEQ        = peToggleOpcoesEQ;
window.peGuardarEdicaoQ        = peGuardarEdicaoQ;
window.peGerarQId              = peGerarQId;
window.peRenderLinkPanel       = peRenderLinkPanel;
window.peCopiarLinkQ           = peCopiarLinkQ;
window.peCompartilharWA        = peCompartilharWA;
window.peVerificarRespostaQ    = peVerificarRespostaQ;
window.peCarregarRespostasQ    = peCarregarRespostasQ;
window.peNovoLinkQ             = peNovoLinkQ;
window.peVerificarQExistente   = peVerificarQExistente;
window.peSelecionarZonas       = peSelecionarZonas;
window.peConsolidarEscudosMapa = peConsolidarEscudosMapa;
window.peRenderEscudosMapa     = peRenderEscudosMapa;
