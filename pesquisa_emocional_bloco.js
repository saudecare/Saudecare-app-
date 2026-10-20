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
  { id:'superior', name:'Sistema Superior', cor:'#1e3a8a', v:2, points:[
    {id:'N1',name:'Epífise',x:100,y:100,organ:'Pineal',desc:'Distúrbio circadiano.',r:'Como tem sido o teu sono?'},
    {id:'N2',name:'Hipotálamo',x:100,y:118,organ:'SNC',desc:'Alarme e fobias.',r:'Sentes o teu corpo sempre em alerta?'},
    {id:'N3',name:'Hipófise',x:100,y:136,organ:'Pituitária',desc:'Autoimagem fragilizada.',r:'Tens duvidado do teu próprio valor?'},
    {id:'N4',name:'Amígdalas',x:100,y:154,organ:'Garganta',desc:'Incapacidade de engolir.',r:'Existe alguma situação "entalada"?'},
    {id:'N5',name:'Paratiroides',x:100,y:173,organ:'Paratiroides',desc:'Fadiga e urgência.',r:'Vives numa luta constante contra o relógio?'},
    {id:'N6',name:'Timo',x:100,y:191,organ:'Timo',desc:'Carência de reconhecimento.',r:'Sentes que ninguém te valoriza?'},
    {id:'N7',name:'Glândulas Salivares e Lacrimais',x:100,y:209,organ:'G. Salivares',desc:'Choro retido.',r:'Quantas lágrimas já engoliste?'},
    {id:'N8',name:'Tiroide',x:100,y:227,organ:'Tiroide',desc:'Impotência em agir.',r:'As tuas ações parecem lentas?'},
    {id:'N9',name:'Esófago',x:100,y:245,organ:'Esófago',desc:'Engolir calado.',r:'Quantas vezes tens calado a tua própria voz?'}
  ]},
  { id:'central', name:'Sistema Central', cor:'#1e3a8a', v:3, points:[
    {id:'C1',name:'I – Vasos Linfáticos, Artérias e Veias',x:100,y:49,organ:'Linfáticos',desc:'Sobrecarga familiar.',r:'O sistema familiar pesa sobre ti?'},
    {id:'C2',name:'II – Intestino Grosso',x:100,y:69,organ:'Int. Grosso',desc:'Apego, culpas.',r:'O que precisas urgentemente de perdoar?'},
    {id:'C3',name:'III – Coração',x:100,y:92,organ:'Coração',desc:'Autoabandono.',r:'Tens-te abandonado para ser aceite?'},
    {id:'C4',name:'IV – Brônquios',x:100,y:112,organ:'Brônquios',desc:'Invasão territorial.',r:'O teu espaço pessoal é invadido?'},
    {id:'C5',name:'V – Alvéolos Pulmonares',x:100,y:132,organ:'Pulmão',desc:'Receio de perda.',r:'Qual é o teu maior medo?'},
    {id:'C6',name:'VI – Intestino Delgado',x:100,y:158,organ:'Int. Delgado',desc:'Crença na escassez.',r:'Acreditas que não há amor suficiente para ti?'},
    {id:'C7',name:'VII – Baço',x:100,y:180,organ:'Baço',desc:'Cansaço relacional.',r:'Qual é a relação que te drena a energia?'},
    {id:'C8',name:'VIII – Fígado',x:100,y:208,organ:'Fígado',desc:'Raiva e injustiça.',r:'O que te foi tirado injustamente?'},
    {id:'C9',name:'IX – Estômago',x:100,y:236,organ:'Estômago',desc:'Ansiedade mental.',r:'Digeres excessivamente preocupações?'},
    {id:'C10',name:'X – Duodeno',x:100,y:262,organ:'Duodeno',desc:'Frustração por perdas.',r:'Sentes-te bloqueado após uma frustração?'},
    {id:'C11',name:'XI – Vesícula Biliar',x:100,y:291,organ:'Vesícula',desc:'Decisões adiadas.',r:'Que escolha continuas a adiar?'},
    {id:'C12',name:'XII – Pâncreas',x:100,y:320,organ:'Pâncreas',desc:'Perda de doçura.',r:'Quando é que a vida perdeu a doçura?'}
  ]},
  { id:'inferior', name:'Sistema Inferior', cor:'#1e3a8a', v:3, points:[
    {id:'f1d',name:'LA1 – Glândulas Mamárias',x:138,y:153,organ:'Perna direita',desc:'Conflitos no cuidar.',r:'Tens sentido exaustão na tua forma de cuidar?'},
    {id:'f1e',name:'LA1 – Glândulas Mamárias',x:62,y:153,organ:'Perna esquerda',desc:'Conflitos afetivos.',r:'Sentes falta de carinho da infância?'},
    {id:'f2d',name:'LA2 – Útero / Próstata',x:138,y:185,organ:'Perna direita',desc:'Invasão íntima.',r:'O teu espaço sagrado foi invadido?'},
    {id:'f2e',name:'LA2 – Útero / Próstata',x:62,y:185,organ:'Perna esquerda',desc:'Perda estabilidade.',r:'Alguma separação fez desmoronar o teu lar?'},
    {id:'f3d',name:'LA3 – Suprarrenais',x:138,y:216,organ:'Perna direita',desc:'Esgotamento alerta.',r:'O teu corpo já não tem reservas para lutar?'},
    {id:'f3e',name:'LA3 – Suprarrenais',x:62,y:216,organ:'Perna esquerda',desc:'Exaustão forças.',r:'O que te fez desistir de lutar?'},
    {id:'f4d',name:'LA4 – Testículos / Ovários',x:138,y:243,organ:'Perna direita',desc:'Lutos projetos.',r:'Que projeto profundo tiveste de ver morrer?'},
    {id:'f4e',name:'LA4 – Testículos / Ovários',x:62,y:243,organ:'Perna esquerda',desc:'Perda de linhagem.',r:'Que perda a tua família ainda não curou?'},
    {id:'f5d',name:'LA5 – Rim',x:138,y:276,organ:'Perna direita',desc:'Insegurança perdas.',r:'Tens medo de falhar financeiramente?'},
    {id:'f5e',name:'LA5 – Rim',x:62,y:276,organ:'Perna esquerda',desc:'Quebra confiança.',r:'Foste atraiçoado por alguém?'},
    {id:'f6d',name:'LA6 – Bexiga',x:138,y:304,organ:'Perna direita',desc:'Perda de rumo.',r:'Já não sabes que lugar ocupas na sociedade?'},
    {id:'f6e',name:'LA6 – Bexiga',x:62,y:304,organ:'Perna esquerda',desc:'Espaço territorial.',r:'Sentes que não podes ser quem és?'}
  ]}
];

// Imagem grande do queixo, pescoço e ombros (vista de frente) para o Sistema Superior.
const PE_PESCOCO_SVG = `<defs>
<linearGradient id="pesc" x1="0" x2="1"><stop offset="0" stop-color="#e9c9b0"/><stop offset=".5" stop-color="#f4dcc8"/><stop offset="1" stop-color="#e9c9b0"/></linearGradient>
<linearGradient id="sombra" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b98f72" stop-opacity=".55"/><stop offset="1" stop-color="#b98f72" stop-opacity="0"/></linearGradient>
</defs>
<g stroke-linejoin="round" stroke-linecap="round">
<!-- pescoço e ombros -->
<path d="M 54 60 C 52 110 50 170 46 214 C 30 222 10 232 0 250 L 0 400 L 200 400 L 200 250 C 190 232 170 222 154 214 C 150 170 148 110 146 60 Z" fill="url(#pesc)" stroke="#c9a68a" stroke-width="1.5"/>
<!-- sombra por baixo do queixo -->
<path d="M 54 70 C 70 112 130 112 146 70 L 146 60 L 54 60 Z" fill="url(#sombra)" stroke="none"/>
<!-- esternocleidomastoideos -->
<path d="M 66 92 C 74 140 88 200 98 244" fill="none" stroke="#c9a68a" stroke-width="1.2" opacity=".7"/>
<path d="M 134 92 C 126 140 112 200 102 244" fill="none" stroke="#c9a68a" stroke-width="1.2" opacity=".7"/>
<!-- maçã de Adão -->
<path d="M 93 146 C 96 140 104 140 107 146 C 106 154 94 154 93 146 Z" fill="none" stroke="#c9a68a" stroke-width="1.1" opacity=".8"/>
<!-- clavículas -->
<path d="M 100 246 C 80 238 56 236 36 242" fill="none" stroke="#c9a68a" stroke-width="1.3" opacity=".8"/>
<path d="M 100 246 C 120 238 144 236 164 242" fill="none" stroke="#c9a68a" stroke-width="1.3" opacity=".8"/>
<!-- maxilar e queixo (parte de baixo do rosto) -->
<path d="M 14 0 C 16 40 34 72 62 86 C 78 94 90 98 100 98 C 110 98 122 94 138 86 C 166 72 184 40 186 0 Z" fill="url(#pesc)" stroke="#c9a68a" stroke-width="1.5"/>
<path d="M 62 86 C 78 94 90 98 100 98 C 110 98 122 94 138 86" fill="none" stroke="#a97f63" stroke-width="2" opacity=".55"/>
<!-- camisola polo -->
<path d="M 0 262 C 30 244 54 238 70 236 L 100 298 L 130 236 C 146 238 170 244 200 262 L 200 400 L 0 400 Z" fill="#8fb0c9" stroke="#6f8fa8" stroke-width="1.5"/>
<path d="M 46 226 L 70 236 L 100 298 L 62 270 Z" fill="#a9c4d8" stroke="#6f8fa8" stroke-width="1.5"/>
<path d="M 154 226 L 130 236 L 100 298 L 138 270 Z" fill="#a9c4d8" stroke="#6f8fa8" stroke-width="1.5"/>
<path d="M 48 230 L 66 241" fill="none" stroke="#1e3a8a" stroke-width="2"/>
<path d="M 152 230 L 134 241" fill="none" stroke="#1e3a8a" stroke-width="2"/>
</g>`;

// Contorno da Lateralidade: percorre o corpo por fora, como se não tivesse braços.
const PE_LATERAL_CONTORNO = `<path d="M 100 9 A 26 26 0 0 1 110 59 L 110 66 L 136 66 C 144 95 138 160 129 185 L 130 285 L 131 376 C 144 376 154 382 154 390 C 154 394 150 395 146 395 L 114 395 C 111 392 111 386 111 380 L 104 285 L 100 196 L 96 285 L 89 380 C 89 386 89 392 86 395 L 54 395 C 50 395 46 394 46 390 C 46 382 56 376 69 376 L 70 285 L 71 185 C 62 160 56 95 64 66 L 90 66 L 90 59 A 26 26 0 0 1 100 9 Z" fill="none" stroke="#dc2626" stroke-width="9" stroke-linejoin="round" opacity=".22"/><path d="M 100 9 A 26 26 0 0 1 110 59 L 110 66 L 136 66 C 144 95 138 160 129 185 L 130 285 L 131 376 C 144 376 154 382 154 390 C 154 394 150 395 146 395 L 114 395 C 111 392 111 386 111 380 L 104 285 L 100 196 L 96 285 L 89 380 C 89 386 89 392 86 395 L 54 395 C 50 395 46 394 46 390 C 46 382 56 376 69 376 L 70 285 L 71 185 C 62 160 56 95 64 66 L 90 66 L 90 59 A 26 26 0 0 1 100 9 Z" fill="none" stroke="#dc2626" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>`;

// Imagem grande do tronco, da cinta para cima, para o Sistema Central (igual na frente e nas costas).
const PE_CENTRAL_SVG = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M 82 18 L 82 38 C 72 46 46 58 24 70 C 14 76 10 86 10 100 L 20 372 L 180 372 L 190 100 C 190 86 186 76 176 70 C 154 58 128 46 118 38 L 118 18 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
<path d="M 34 170 L 32 368 M 166 170 L 168 368" fill="none" stroke="#94a3b8" stroke-width="1.2"/>
<path d="M 100 40 L 100 368" fill="none" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3"/>
<rect x="20" y="364" width="160" height="14" rx="3" fill="#64748b" stroke="#475569" stroke-width="1"/>
</g>
<text x="100" y="375" text-anchor="middle" font-size="7" font-weight="700" fill="white">CINTA</text>
<text x="100" y="11" text-anchor="middle" font-size="10" font-weight="800" fill="#1e3a8a">Da cinta para cima</text>`;

// Imagem grande da cinta para baixo (ancas, coxas e joelhos) para o Sistema Inferior (igual na frente e nas costas).
const PE_INFERIOR_SVG = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M 28 26 C 18 60 16 110 26 170 C 30 220 34 280 38 330 C 40 360 42 385 44 400 L 86 400 C 86 385 86 360 84 330 C 84 280 92 210 99 150 L 100 26 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
<path d="M 172 26 C 182 60 184 110 174 170 C 170 220 166 280 162 330 C 160 360 158 385 156 400 L 114 400 C 114 385 114 360 116 330 C 116 280 108 210 101 150 L 100 26 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
<circle cx="62" cy="332" r="15" fill="none" stroke="#94a3b8" stroke-width="1" opacity=".8"/>
<circle cx="138" cy="332" r="15" fill="none" stroke="#94a3b8" stroke-width="1" opacity=".8"/>
<rect x="26" y="14" width="148" height="14" rx="3" fill="#64748b" stroke="#475569" stroke-width="1"/>
</g>
<text x="100" y="10" text-anchor="middle" font-size="10" font-weight="800" fill="#1e3a8a">Da cinta para baixo</text>
<text x="100" y="25" text-anchor="middle" font-size="7" font-weight="700" fill="white">CINTA</text>`;

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

const PE_CORPO_SVG = `<g fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"><circle cx="100" cy="35" r="22"/><rect x="94" y="56" width="12" height="14" rx="2"/><path d="M 68 70 L 132 70 C 140 95 134 160 125 185 L 75 185 C 66 160 60 95 68 70 Z"/><path d="M 68 70 L 46 135 L 38 190 L 30 190 L 40 130 L 64 70 Z"/><path d="M 132 70 L 154 135 L 162 190 L 170 190 L 160 130 L 136 70 Z"/><path d="M 76 185 L 74 285 L 72 375 L 84 375 L 92 285 L 97 185 Z"/><path d="M 124 185 L 126 285 L 128 375 L 116 375 L 108 285 L 103 185 Z"/><path d="M 162 190 L 170 190 C 175 198 176 212 173 224 C 171 232 164 234 161 227 C 158 216 159 202 162 190 Z"/><path d="M 38 190 L 30 190 C 25 198 24 212 27 224 C 29 232 36 234 39 227 C 42 216 41 202 38 190 Z"/><path d="M 116 375 L 128 375 C 140 375 148 381 148 389 L 118 389 C 116 386 116 381 116 375 Z"/><path d="M 84 375 L 72 375 C 60 375 52 381 52 389 L 82 389 C 84 386 84 381 84 375 Z"/><path d="M 161 200 C 155 204 154 212 158 218 M 39 200 C 45 204 46 212 42 218" fill="none"/></g>`;

// ─── ESTADO ───────────────────────────────────────────────────────

let peState = {};

function peReset() {
  peState = {
    patientId: null, patientName: '', step: '0', path: 2,
    quadrants: [], qIdx: 0, mappingData: {}, catId: 'vital',
    shieldCalc: 'Indefinido', finalShield: 'Não Especificado',
    hasBack: false, editMode: false, editPonto: null, formEditMode: false,
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

// Posições dos pontos do mapa guardadas na conta ({id:[x,y]}), iguais em todos os dispositivos.
window.__pePosicoes = null;

// Chave sob a qual a posição de um ponto fica guardada (muda quando o desenho da categoria muda).
function peChavePos(id) {
  for (const c of PE_CAT) if (c.points.some(p => p.id === id)) return (c.v || 1) > 1 ? `${id}@${c.v}` : id;
  return id;
}

function peAplicarPosicoes(cfg) {
  const m = window.__pePosicoes;
  if (!m) return cfg;
  cfg.categories.forEach(cat => cat.points.forEach(pt => {
    const v = m[peChavePos(pt.id)];
    if (Array.isArray(v) && v.length === 2 && isFinite(v[0]) && isFinite(v[1])) { pt.x = +v[0]; pt.y = +v[1]; }
  }));
  return cfg;
}

function peLerConfig() { return peAplicarPosicoes(peLerConfigBase()); }

// Posições já ajustadas neste dispositivo (diferentes das de origem).
function peMapaLocal() {
  const out = {};
  try {
    const saved = localStorage.getItem(`pe_cfg_${tenantId()}`);
    if (!saved) return out;
    const cfg = JSON.parse(saved);
    (cfg.categories || []).forEach(sc => {
      const def = PE_CAT.find(c => c.id === sc.id);
      if (!def || (sc.v || 1) !== (def.v || 1)) return;   // desenho antigo: não aproveitar
      (sc.points || []).forEach(pt => {
        const o = def.points.find(d => d.id === pt.id);
        if (o && (pt.x !== o.x || pt.y !== o.y)) out[peChavePos(pt.id)] = [pt.x, pt.y];
      });
    });
  } catch(_) {}
  return out;
}

let __peGravTimer = null;
function peGuardarPosicoesRemoto() {
  clearTimeout(__peGravTimer);
  __peGravTimer = setTimeout(async () => {
    try { await db().doc(`tenants/${tenantId()}`).update({ peMapaPosicoes: window.__pePosicoes || {} }); }
    catch(e) { console.warn('Posições do mapa guardadas só neste dispositivo:', e); }
  }, 700);
}

// Lê as posições guardadas na conta; se ainda não existirem, usa as que já foram ajustadas neste dispositivo.
async function peCarregarPosicoes() {
  let remoto = null, leu = false;
  try {
    const snap = await db().doc(`tenants/${tenantId()}`).get();
    leu = true;
    const d = (snap && snap.data && snap.data()) || {};
    if (d.peAudios21 && typeof d.peAudios21 === 'object') window.__peAud21 = d.peAudios21;
    if (d.peMapaPosicoes && typeof d.peMapaPosicoes === 'object' && Object.keys(d.peMapaPosicoes).length) remoto = d.peMapaPosicoes;
  } catch(_) {}
  if (remoto) { window.__pePosicoes = remoto; return; }
  const local = peMapaLocal();
  if (Object.keys(local).length) {
    window.__pePosicoes = local;
    if (leu) peGuardarPosicoesRemoto();
  }
}

// Se a configuração guardada tiver pontos diferentes dos atuais (ex.: Sistema Superior redesenhado), usa os atuais.
function peSanearConfig(cfg) {
  if (!cfg || !Array.isArray(cfg.categories)) return { categories: JSON.parse(JSON.stringify(PE_CAT)), forms: (cfg && cfg.forms) || JSON.parse(JSON.stringify(PE_FICHAS)) };
  const out = [];
  PE_CAT.forEach(def => {
    const sv = cfg.categories.find(c => c.id === def.id);
    const igual = sv && (sv.v || 1) === (def.v || 1) && Array.isArray(sv.points) && sv.points.length === def.points.length && def.points.every(d => sv.points.some(x => x.id === d.id));
    if (igual) {
      const novo = JSON.parse(JSON.stringify(def));
      novo.points.forEach(np => { const sp = sv.points.find(x => x.id === np.id); if (sp && isFinite(sp.x) && isFinite(sp.y)) { np.x = sp.x; np.y = sp.y; } });
      out.push(novo);
    } else out.push(JSON.parse(JSON.stringify(def)));
  });
  cfg.categories = out;
  return cfg;
}

function peLerConfigBase() {
  const key = `pe_cfg_${tenantId()}`;
  try {
    const saved = localStorage.getItem(key);
    if (saved) return peSanearConfig(JSON.parse(saved));
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
  await peCarregarPosicoes();
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
          <button id="pe-btn-nova-consulta" onclick="window.peAbrirNovaConsulta()" style="width:100%;background:#1e3a8a;color:white;padding:16px;border:none;border-radius:10px;font-size:1.05rem;font-weight:700;cursor:pointer;">➕ Nova Consulta</button>
          <div id="pe-escolher-paciente" style="display:none;margin-top:18px;">
            <div style="font-size:1.05rem;font-weight:700;color:#1e3a8a;margin-bottom:12px;border-bottom:2px solid #fef3c7;padding-bottom:10px;">Escolher paciente</div>
            <div style="position:relative;margin-bottom:12px;">
              <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:1.1rem;pointer-events:none;">🔍</span>
              <input type="search" id="pe-busca-paciente" oninput="window.peFiltrarPacientes()" placeholder="Procurar por nome, telefone ou email..." autocomplete="off" style="width:100%;padding:13px 12px 13px 40px;border:2px solid #bfdbfe;border-radius:10px;font-size:1rem;background:white;">
            </div>
            <div id="pe-lista-pacientes" style="display:grid;gap:10px;"></div>
          </div>
        </div>
      </div>

      <div id="pe-step-1" class="pe-step" style="display:none;">
        <div class="card" style="padding:20px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px;border-bottom:2px solid #fef3c7;padding-bottom:10px;">
            <div>
              <span style="font-size:1.1rem;font-weight:700;color:#1e3a8a;">Passo 1 — Fichas e Questionários</span>
              <span id="pe-badge-paciente" style="display:inline-block;background:#fef3c7;color:#b45309;padding:4px 12px;border-radius:20px;font-size:0.85rem;font-weight:700;margin-left:10px;"></span>
              <button onclick="window.peIrPasso('0')" style="background:none;border:none;color:#1e3a8a;font-size:0.8rem;font-weight:700;cursor:pointer;text-decoration:underline;margin-left:6px;">⬅ Trocar paciente</button>
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
          <div id="pe-mapa-corpo" style="display:flex;flex-direction:column;gap:20px;">
            <div style="max-width:560px;margin:0 auto;width:100%;">
              <div id="pe-svg-wrapper" style="background:white;border:1px solid #e2e8f0;border-radius:10px;width:100%;aspect-ratio:360/400;overflow:hidden;touch-action:none;position:relative;">
                <svg id="pe-svg" viewBox="-80 0 360 400" style="width:100%;height:100%;"></svg>
              </div>
              <div id="pe-info-ponto" style="display:none;margin-top:10px;background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #1e3a8a;border-radius:10px;padding:10px 12px;"></div>
              <div id="pe-edit-painel" style="display:none;margin-top:10px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:12px;">
                <div style="font-size:0.82rem;color:#1e3a8a;font-weight:700;margin-bottom:6px;">✏️ Mover pontos: arraste o ponto, ou toque num sítio do mapa para o colocar lá</div>
                <div id="pe-edit-ponto" style="font-size:0.9rem;color:#334155;margin-bottom:10px;">Toque num ponto para o escolher.</div>
                <div style="display:grid;grid-template-columns:repeat(3,52px);gap:6px;justify-content:center;margin-bottom:10px;">
                  <span></span><button onpointerdown="window.peNudgeIniciar(0,-1,event)" onpointerup="window.peNudgeParar()" onpointerleave="window.peNudgeParar()" onpointercancel="window.peNudgeParar()" oncontextmenu="return false" style="padding:12px 0;border:1px solid #93c5fd;background:white;border-radius:8px;font-size:1.1rem;cursor:pointer;">▲</button><span></span>
                  <button onpointerdown="window.peNudgeIniciar(-1,0,event)" onpointerup="window.peNudgeParar()" onpointerleave="window.peNudgeParar()" onpointercancel="window.peNudgeParar()" oncontextmenu="return false" style="padding:12px 0;border:1px solid #93c5fd;background:white;border-radius:8px;font-size:1.1rem;cursor:pointer;">◀</button>
                  <span></span>
                  <button onpointerdown="window.peNudgeIniciar(1,0,event)" onpointerup="window.peNudgeParar()" onpointerleave="window.peNudgeParar()" onpointercancel="window.peNudgeParar()" oncontextmenu="return false" style="padding:12px 0;border:1px solid #93c5fd;background:white;border-radius:8px;font-size:1.1rem;cursor:pointer;">▶</button>
                  <span></span><button onpointerdown="window.peNudgeIniciar(0,1,event)" onpointerup="window.peNudgeParar()" onpointerleave="window.peNudgeParar()" onpointercancel="window.peNudgeParar()" oncontextmenu="return false" style="padding:12px 0;border:1px solid #93c5fd;background:white;border-radius:8px;font-size:1.1rem;cursor:pointer;">▼</button><span></span>
                </div>
                <div style="font-size:0.74rem;color:#64748b;text-align:center;margin-bottom:8px;">As setas movem o ponto escolhido (o do anel azul): um toque move pouco; mantenha premida e vai cada vez mais depressa. Toque no ponto ou no nome para escolher outro. As posições ficam guardadas na conta.</div>
                <button onclick="window.peDesfazerMovimento()" style="width:100%;background:#fffbeb;border:1px solid #fde68a;color:#92400e;padding:9px;border-radius:8px;font-size:0.8rem;font-weight:700;cursor:pointer;margin-bottom:8px;">↩ Desfazer o último movimento</button>
                <button onclick="window.peReporPosicoes()" style="width:100%;background:white;border:1px solid #cbd5e1;color:#334155;padding:9px;border-radius:8px;font-size:0.8rem;font-weight:700;cursor:pointer;">↩ Repor todas as posições originais</button>
              </div>
            </div>
            <div>
              <div id="pe-categorias-tabs" style="display:flex;gap:6px;overflow-x:auto;padding-bottom:10px;margin-bottom:14px;border-bottom:2px solid #e2e8f0;scrollbar-width:none;"></div>
              <p style="font-size:0.82rem;color:#64748b;margin-bottom:10px;">Toque no mapa ou nos botões para selecionar os bloqueios:</p>
              <div id="pe-pontos-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;max-height:40vh;overflow-y:auto;"></div>
              <div id="pe-lateral-area" style="display:none;margin-top:12px;">
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:10px 12px;margin-bottom:12px;">
                  <div style="font-size:0.85rem;color:#334155;margin-bottom:8px;">⚫ Toque no mapa, no local onde sente a resistência, para marcar com uma <b>bola preta</b>. Toque numa bola para a retirar.</div>
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <span id="pe-lateral-contador" style="font-size:0.82rem;font-weight:700;color:#0f172a;">Nenhum local marcado</span>
                    <button onclick="window.peLimparMarcas()" style="background:white;border:1px solid #cbd5e1;color:#334155;padding:7px 12px;border-radius:8px;font-size:0.8rem;font-weight:700;cursor:pointer;">🧹 Limpar marcas</button>
                  </div>
                </div>
                <label style="color:#b45309;font-weight:700;font-size:0.9rem;display:block;margin-bottom:6px;">Anotações da Varredura Lateral:</label>
                <textarea id="pe-lateral-notas" rows="3" style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:8px;" placeholder="Descreva resistências ao longo do percurso lateral..."></textarea>
              </div>
            </div>
          </div>
          <div id="pe-fecho-final" style="display:none;"></div>
          <div id="pe-mapa-rodape" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-top:20px;border-top:1px solid #e2e8f0;position:sticky;bottom:0;z-index:20;background:white;box-shadow:0 -6px 12px rgba(15,23,42,.08);padding:12px 4px calc(12px + env(safe-area-inset-bottom));">
            <button onclick="window.peMostrarZonas()" style="background:white;border:1px solid #e2e8f0;padding:12px 16px;border-radius:8px;font-weight:600;cursor:pointer;">⬅ Zonas</button>
            <button onclick="window.peAbrirFecho()" style="background:#16a34a;color:white;padding:12px 16px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">✅ Terminar Mapeamento</button>
            <button id="pe-btn-seguinte" onclick="window.peSeguinte()" style="background:#1e3a8a;color:white;padding:12px 18px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">Seguinte ➔</button>
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
            <div style="font-weight:700;color:#1e3a8a;margin:18px 0 10px;">Quando se deu (Origem e Tempo):</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div><label style="font-size:0.82rem;font-weight:700;color:#334155;display:block;margin-bottom:6px;">Origem do Gatilho:</label>
                <select id="pe-final-epoca" onchange="window.peAtualizarEpocaFinal()" style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;">
                  <option value="Transgeracional">Antes da gravidez (Transgeracional / Herança)</option>
                  <option value="Gestacional">Durante a gravidez (Gestação)</option>
                  <option value="Pós-parto / Biográfico">Depois do parto (Biográfico)</option>
                </select></div>
              <div><label id="pe-final-lbl" style="font-size:0.82rem;font-weight:700;color:#334155;display:block;margin-bottom:6px;">Gerações:</label>
                <input type="text" id="pe-final-tempo" oninput="window.peRenderPrevia()" placeholder="Ex: Há 1 geração..." style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:8px;"></div>
            </div>
          </div>
          <div id="pe-bloco-paciente" style="display:none;margin-bottom:20px;">
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;margin-bottom:14px;">
              <div style="font-weight:700;color:#1e3a8a;margin-bottom:8px;">Decisão do paciente:</div>
              <label style="display:flex;gap:8px;align-items:center;font-size:0.9rem;margin-bottom:6px;"><input type="radio" name="pe-estado" value="tratamento" style="width:18px;height:18px;"> Aceitou — iniciar o tratamento</label>
              <label style="display:flex;gap:8px;align-items:center;font-size:0.9rem;"><input type="radio" name="pe-estado" value="standby" checked style="width:18px;height:18px;"> Fica em stand-by (inicia quando decidir)</label>
            </div>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;margin-bottom:14px;">
              <label style="display:flex;gap:8px;align-items:center;font-weight:700;color:#1e3a8a;"><input type="checkbox" id="pe-incluir-plano" checked onchange="window.peRenderPrevia()" style="width:18px;height:18px;"> 🏠 Enviar plano de tratamento em casa (massagens, afirmações, música)</label>
              <div style="font-size:0.78rem;color:#64748b;margin:4px 0 12px 26px;">Desmarca numa consulta única ou esporádica, se não vais enviar trabalhos de casa: o paciente recebe só o relatório.</div>
              <label style="display:flex;gap:8px;align-items:center;font-weight:700;color:#1e3a8a;margin-bottom:8px;"><input type="checkbox" id="pe-a21-incluir" onchange="window.peRenderPrevia()" style="width:18px;height:18px;"> 🎧 Incluir programa de 21 meditações (3 semanas × 7)</label>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
                <select id="pe-a21-versao" onchange="window.peRenderPrevia()" style="padding:9px;border:1px solid #e2e8f0;border-radius:8px;"><option value="fem">Versão feminina</option><option value="masc">Versão masculina</option></select>
                <select id="pe-a21-modo" onchange="window.peRenderPrevia()" style="padding:9px;border:1px solid #e2e8f0;border-radius:8px;"><option value="dia">Uma por dia</option><option value="semana">7 de uma vez (semana)</option></select>
                <select id="pe-a21-semana" onchange="window.peRenderPrevia()" style="padding:9px;border:1px solid #e2e8f0;border-radius:8px;"><option value="todas">Semanas 1 a 3</option><option value="1">Semana 1</option><option value="2">Semana 2</option><option value="3">Semana 3</option></select>
              </div>
              <button onclick="window.peAbrirLinks21()" style="margin-top:8px;background:none;border:none;color:#1e3a8a;font-weight:700;text-decoration:underline;cursor:pointer;font-size:0.82rem;">⚙️ Links dos 21 áudios (feminino e masculino)</button>
              <div id="pe-a21-links" style="display:none;margin-top:8px;">
                <div style="font-size:0.78rem;color:#64748b;margin-bottom:6px;">Um link por linha, pela ordem das meditações 1 a 21.</div>
                <textarea id="pe-a21-t-fem" rows="6" placeholder="Versão feminina — 21 links" style="width:100%;padding:8px;border:1px solid #e2e8f0;border-radius:8px;margin-bottom:6px;"></textarea>
                <textarea id="pe-a21-t-masc" rows="6" placeholder="Versão masculina — 21 links" style="width:100%;padding:8px;border:1px solid #e2e8f0;border-radius:8px;"></textarea>
                <button onclick="window.peGuardarLinks21()" style="margin-top:6px;background:#1e3a8a;color:white;border:none;padding:9px 16px;border-radius:8px;font-weight:700;cursor:pointer;">Guardar links</button>
              </div>
            </div>
            <div style="font-weight:700;color:#1e3a8a;margin-bottom:8px;">Relatório e plano para o paciente (pré-visualização):</div>
            <div id="pe-previa-paciente" style="background:white;border:1px solid #e2e8f0;border-radius:10px;padding:14px;"></div>
          </div>
          <div id="pe-box-receita" style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:20px;">
            <label id="pe-lbl-receita" style="color:#b45309;font-size:1rem;font-weight:700;display:block;margin-bottom:8px;">Plano Terapêutico (Receita Visual):</label>
            <p id="pe-p-receita" style="font-size:0.82rem;color:#64748b;margin-bottom:12px;">Gerado automaticamente cruzando o Escudo, as Massagens e os Pontos. Edite antes de emitir.</p>
            <textarea id="pe-receita" rows="16" style="width:100%;padding:12px;border:1px solid #fde68a;border-radius:8px;font-size:0.9rem;line-height:1.6;"></textarea>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:20px;padding-top:16px;border-top:1px solid #e2e8f0;flex-wrap:wrap;">
            <button onclick="window.peVoltarFecho()" style="background:white;border:1px solid #e2e8f0;padding:12px 20px;border-radius:8px;font-weight:600;cursor:pointer;">⬅ Rever</button>
            <button onclick="window.peEmitirRelatorio()" style="background:#16a34a;color:white;padding:14px 28px;border:none;border-radius:8px;font-size:1.05rem;font-weight:700;cursor:pointer;box-shadow:0 4px 12px rgba(22,163,74,.2);">💾 Gravar no Histórico e Emitir ✔</button>
          </div>
        </div>
      </div>

      <div id="pe-step-hub" class="pe-step" style="display:none;"></div>
      <div id="pe-step-trat" class="pe-step" style="display:none;"></div>
      <div id="pe-step-relatorio" class="pe-step" style="display:none;"></div>
    </div>
  `;
  await peLerPacientes();
  peConstruirMedos();
}

// ─── PACIENTES ────────────────────────────────────────────────────

function peEsc(t) {
  return String(t == null ? '' : t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function peNorm(t) {
  return String(t || '').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().trim();
}

function peAbrirNovaConsulta() {
  const painel = document.getElementById('pe-escolher-paciente');
  if (!painel) return;
  painel.style.display = 'block';
  const btn = document.getElementById('pe-btn-nova-consulta');
  if (btn) btn.style.display = 'none';
  const inp = document.getElementById('pe-busca-paciente');
  if (inp) { inp.value = ''; setTimeout(() => inp.focus(), 80); }
  peFiltrarPacientes();
}

async function peLerPacientes() {
  const container = document.getElementById('pe-lista-pacientes');
  if (!container) return;
  container.innerHTML = '<div style="text-align:center;padding:20px;color:#64748b;">A carregar...</div>';
  try {
    const snap = await db().collection(`tenants/${tenantId()}/patients`).where('active','!=',false).orderBy('active').orderBy('fullName').limit(1000).get();
    peState.pacientes = [];
    snap.forEach(doc => { peState.pacientes.push({ id: doc.id, ...doc.data() }); });
    peFiltrarPacientes();
  } catch(e) {
    console.error(e);
    container.innerHTML = '<div style="color:#dc2626;padding:16px;">Erro ao carregar pacientes.</div>';
  }
}

function peFiltrarPacientes() {
  const container = document.getElementById('pe-lista-pacientes');
  if (!container) return;
  const lista = peState.pacientes;
  if (!lista) return;
  if (!lista.length) {
    container.innerHTML = '<div style="text-align:center;padding:20px;color:#64748b;">Nenhum paciente ativo. Crie pacientes primeiro.</div>';
    return;
  }
  const q = peNorm(document.getElementById('pe-busca-paciente')?.value);
  const qDig = q.replace(/\D/g,'');
  const filtrados = !q ? lista : lista.filter(p => {
    const nome = peNorm(p.fullName || p.nome);
    const email = peNorm(p.email);
    const tel = String(p.phone || '').replace(/\D/g,'');
    return nome.includes(q) || email.includes(q) || (qDig.length >= 3 && tel.includes(qDig));
  });
  if (!filtrados.length) {
    container.innerHTML = '<div style="text-align:center;padding:20px;color:#64748b;">Nenhum paciente encontrado.</div>';
    return;
  }
  container.innerHTML = '';
  filtrados.slice(0, 60).forEach(p => {
    const div = document.createElement('div');
    div.style.cssText = 'background:white;border:1px solid #e2e8f0;border-radius:10px;padding:14px;cursor:pointer;';
    div.innerHTML = `
      <div style="font-weight:700;color:#0f172a;font-size:1rem;">${peEsc(p.fullName||p.nome||'—')}</div>
      <div style="font-size:0.82rem;color:#64748b;">${peEsc(p.phone||p.email||'')}</div>`;
    div.onclick = () => window.peEscolherPaciente(p.id);
    container.appendChild(div);
  });
  if (filtrados.length > 60) {
    const mais = document.createElement('div');
    mais.style.cssText = 'text-align:center;padding:8px;color:#64748b;font-size:0.82rem;';
    mais.textContent = `A mostrar 60 de ${filtrados.length}. Escreva mais letras para afinar a procura.`;
    container.appendChild(mais);
  }
}

function peEscolherPaciente(id) {
  const p = (peState.pacientes || []).find(x => x.id === id);
  if (!p) return;
  return peIniciarConsulta(id, p.fullName || p.nome || '');
}

async function peIniciarConsulta(patientId, patientName) {
  peState.patientId = patientId;
  peState.patientName = patientName;
  peState.pacienteDados = (peState.pacientes || []).find(x => x.id === patientId) || null;
  peState.fichasAnteriores = [];
  const cfg = peLerConfig();
  peState.formsDB = JSON.parse(JSON.stringify(cfg.forms));
  peState.appData = { categories: JSON.parse(JSON.stringify(cfg.categories)) };
  const badge = document.getElementById('pe-badge-paciente');
  if (badge) badge.textContent = patientName;
  peState.formId = 'pre-consulta';
  await peLerFichasAnteriores(patientId);
  await peLerHistorico(patientId);
  peState.finalShield = 'Não Especificado'; peState.mapId = null; peState.epocaFinal = null;
  peRenderizarFicha('pre-consulta');
  const h = peState.historico;
  if (h.mapeamentos.length || h.tratamentos.length) { peRenderHub(); peIrPasso('hub'); return; }
  peIrPasso('1');
  setTimeout(() => peVerificarQExistente('pre-consulta'), 200);
}

// ─── PREENCHIMENTO AUTOMÁTICO A PARTIR DA FICHA ───────────────────

// Lê, da ficha do paciente, as fichas de Pesquisa Emocional já guardadas (mais recente primeiro).
async function peLerFichasAnteriores(patientId) {
  peState.fichasAnteriores = [];
  try {
    const snap = await db().collection(`tenants/${tenantId()}/patients/${patientId}/reports`).where('tipo','==','pesquisa_emocional_ficha').get();
    const lista = [];
    snap.forEach(d => {
      const r = d.data() || {};
      if (r.tipo !== 'pesquisa_emocional_ficha') return;
      const g = r.generatedAt;
      const t = g && typeof g.toMillis === 'function' ? g.toMillis() : (g && g.seconds ? g.seconds * 1000 : 0);
      lista.push({ t, formId: r.dados && r.dados.formId, respostas: r.dados && r.dados.respostas, texto: r.reportText || '' });
    });
    lista.sort((a, b) => b.t - a.t);
    peState.fichasAnteriores = lista;
  } catch(e) {
    console.error('Não foi possível ler as fichas anteriores:', e);
  }
}

function peRespostasDaFicha(f) {
  if (f.respostas && typeof f.respostas === 'object') return f.respostas;
  const out = {};
  const re = /• ([\s\S]*?):\n  R: ([\s\S]*?)(?=\n\n• |\n*$)/g;
  let m;
  while ((m = re.exec(f.texto)) !== null) out[m[1].trim()] = m[2].trim();
  return out;
}

function peIdadeDe(birthDate) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(birthDate || '');
  if (!m) return null;
  const nasc = new Date(+m[1], +m[2] - 1, +m[3]);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nasc.getFullYear();
  if (hoje.getMonth() < nasc.getMonth() || (hoje.getMonth() === nasc.getMonth() && hoje.getDate() < nasc.getDate())) idade--;
  return { idade, data: `${m[3]}/${m[2]}/${m[1]}` };
}

// Valor vindo diretamente do cadastro do paciente, conforme a pergunta.
function peValorDoCadastro(pergunta) {
  const p = peState.pacienteDados;
  if (!p) return '';
  const q = peNorm(pergunta);
  const nome = p.fullName || p.nome || peState.patientName || '';
  const nasc = peIdadeDe(p.birthDate);
  if (q === 'nome completo') return nome;
  if (q === 'idade e data de nascimento') return nasc ? `${nasc.idade} anos · ${nasc.data}` : '';
  if (q === 'nome e idade?') return nome ? (nasc ? `${nome}, ${nasc.idade} anos` : nome) : '';
  if (q === 'nome do cuidador e parentesco') {
    const r = p.requester;
    if (r && r.nome) return r.relacao ? `${r.nome} (${r.relacao})` : r.nome;
  }
  return '';
}

// Preenche os campos ainda vazios do questionário aberto. Nunca apaga o que já foi escrito.
function peAutoPreencher(formId) {
  const lista = (peState.formsDB || peLerConfig().forms)[formId] || [];
  const usaAnteriores = formId !== 'pos-consulta';
  const anteriores = usaAnteriores
    ? (peState.fichasAnteriores || []).filter(f => f.formId === formId).map(peRespostasDaFicha)
    : [];
  let n = 0;
  lista.forEach((item, idx) => {
    const el = document.getElementById(`pe-r-${idx}`);
    if (!el || el.value.trim()) return;
    let val = peValorDoCadastro(item.q);
    if (!val) {
      for (const resp of anteriores) {
        if (resp[item.q] && String(resp[item.q]).trim()) { val = String(resp[item.q]).trim(); break; }
      }
    }
    if (!val) return;
    el.value = val;
    el.style.background = '#f0fdf4';
    el.style.borderColor = '#86efac';
    n++;
  });
  const titulo = document.getElementById('pe-form-titulo');
  if (n && titulo) {
    titulo.insertAdjacentHTML('afterend', `<div style="background:#f0fdf4;border:1px solid #86efac;color:#166534;border-radius:8px;padding:10px 12px;font-size:0.82rem;font-weight:600;margin-bottom:12px;">✔ ${n} campo${n>1?'s':''} preenchido${n>1?'s':''} automaticamente com os dados já guardados na ficha. Confirme e corrija se for preciso.</div>`);
  }
}

// ─── NAVEGAÇÃO ────────────────────────────────────────────────────

function peIrPasso(s) {
  ['0','1','2','3a','3b','3c','4','hub','trat','relatorio'].forEach(id => {
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
  if (!editMode) peAutoPreencher(id);
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
  let texto=''; let hasData=false; const respostasMap={};
  if (isMedos) {
    const res=document.getElementById('pe-medo-resultado');
    if (res&&res.dataset.val) { hasData=true; texto=`Medo Predominante: ${res.dataset.val}`; }
  } else {
    const fichas=peState.formsDB||peLerConfig().forms;
    const tit=document.getElementById('pe-form-titulo')?.textContent||'Ficha';
    texto=`FICHA: ${tit}\nData: ${data}\n\n`;
    (fichas[peState.formId]||[]).forEach((item,idx)=>{ const val=document.getElementById(`pe-r-${idx}`)?.value?.trim()||''; if(val){hasData=true; texto+=`• ${item.q}:\n  R: ${val}\n\n`; respostasMap[item.q]=val;} });
  }
  if (!hasData) return mostrarAviso('⚠️ A ficha está vazia.');
  guardarNaFicha(peState.patientId,{ tipo:'pesquisa_emocional_ficha', titulo:isMedos?'Avaliação de Medos Subconscientes':(document.getElementById('pe-form-titulo')?.textContent||'Ficha'), texto, dados:{formId:peState.formId, respostas:respostasMap} });
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
    peState.quadrants=sel; peState.qIdx=0; peState.mappingData={}; if(!peState.mapId) peState.mapId='m'+Date.now();
    peState.hasBack=sel.some(q=>q.val.includes('Costas'));
    sel.forEach(q=>{ if(!peState.mappingData[q.val]) { const cfg=peLerConfig(); peState.mappingData[q.val]={visitada:false,desc:q.desc,selectedPoints:new Set(),lateralNotes:'',lateralMarks:[],shield:'Não Especificado',epoch:'Transgeracional',epochTime:'',categories:JSON.parse(JSON.stringify(cfg.categories))}; } });
    peIrPasso('3b'); peMostrarZonas();
  }
}

function peCarregarQuadrante() {
  const qName=peState.quadrants[peState.qIdx]?.val;
  if (peState.mappingData[qName]) peState.mappingData[qName].visitada=true;
  const be=document.getElementById('pe-btn-edit-mapa'); if(be) be.style.display='';
  const titulo=document.getElementById('pe-mapa-titulo');
  if (titulo) titulo.textContent=`Pesquisa Visual » ${qName}`;
  const corpo=document.getElementById('pe-mapa-corpo'); if(corpo) corpo.style.display='flex';
  const fin=document.getElementById('pe-fecho-final'); if(fin) fin.style.display='none';
  const rod=document.getElementById('pe-mapa-rodape'); if(rod) rod.style.display='flex';
  peState.catId='vital'; peRenderizarTabs(); peCarregarCategoria('vital');
}

function peRolarTopo() {
  const t=document.getElementById('pe-mapa-titulo');
  try { if (t&&t.scrollIntoView) t.scrollIntoView({block:'start'}); } catch(e){}
  try { window.scrollTo(0,0); } catch(e){}
}

function peGuardarNotasLaterais() {
  const qData=peState.mappingData[peState.quadrants[peState.qIdx]?.val];
  if (qData && peState.catId==='lateral') qData.lateralNotes=document.getElementById('pe-lateral-notas')?.value||'';
}

function peAtualizarBotaoSeguinte() {
  const btn=document.getElementById('pe-btn-seguinte'); if (!btn) return;
  const qData=peState.mappingData[peState.quadrants[peState.qIdx]?.val];
  const cats=qData?.categories||[];
  const i=cats.findIndex(c=>c.id===peState.catId);
  const ultimaCat=i>=cats.length-1;
  const ultimaZona=peState.qIdx>=peState.quadrants.length-1;
  btn.textContent=!ultimaCat?'Seguinte ➔':'Concluir Zona ➔';
}

// Ordem por zona: Vitais → Entrada → Lateralidade → Superior → Central → Inferior
function peSeguinte() {
  const qData=peState.mappingData[peState.quadrants[peState.qIdx]?.val];
  if (!qData) return;
  peGuardarNotasLaterais();
  const cats=qData.categories;
  const i=cats.findIndex(c=>c.id===peState.catId);
  if (i<cats.length-1) { peCarregarCategoria(cats[i+1].id); return; }
  peMostrarZonas();
}

// ─── ESCOLHA DA ZONA A MAPEAR ─────────────────────────────────────
function peMostrarZonas() {
  peGuardarNotasLaterais();
  const box=document.getElementById('pe-fecho-final'); if (!box) return;
  const corpo=document.getElementById('pe-mapa-corpo'); if (corpo) corpo.style.display='none';
  const rod=document.getElementById('pe-mapa-rodape'); if (rod) rod.style.display='none';
  const be=document.getElementById('pe-btn-edit-mapa'); if (be) be.style.display='none';
  const titulo=document.getElementById('pe-mapa-titulo'); if (titulo) titulo.textContent='Pesquisa Visual » Zonas a Mapear';
  const nVis=peState.quadrants.filter(q=>peState.mappingData[q.val]?.visitada).length;
  box.style.display='block';
  box.innerHTML=`<div style="font-size:0.85rem;color:#64748b;margin-bottom:12px;">${nVis} de ${peState.quadrants.length} zona${peState.quadrants.length===1?'':'s'} mapeada${nVis===1?'':'s'}. Escolha a zona a mapear:</div>`+peState.quadrants.map((q,i)=>{
    const d=peState.mappingData[q.val]||{}; const n=d.selectedPoints?d.selectedPoints.size:0;
    const lado=q.val.replace(/^Frente - /,'frente · ').replace(/^Costas - /,'costas · ');
    return `<button onclick="window.peIniciarZona(${i})" style="display:block;width:100%;text-align:left;margin-bottom:10px;padding:16px;border:2px solid ${d.visitada?'#16a34a':'#1e3a8a'};background:${d.visitada?'#f0fdf4':'#eff6ff'};border-radius:10px;cursor:pointer;">
      <div style="font-weight:700;color:#0f172a;font-size:0.95rem;">${d.visitada?'✅ Continuar':'▶ Iniciar'} mapeamento ${q.val.includes('Direito')?'lado direito':'lado esquerdo'} ${q.val.startsWith('Costas')?'costas':'frente'}</div>
      <div style="font-size:0.78rem;color:#64748b;margin-top:4px;">${q.val}${d.visitada?` · ${n} ponto${n===1?'':'s'} marcado${n===1?'':'s'}`:''}</div></button>`;
  }).join('')+
  `<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-top:20px;padding-top:16px;border-top:1px solid #e2e8f0;">
    <button onclick="window.peCancelarMapeamento()" style="background:white;border:1px solid #e2e8f0;padding:12px 16px;border-radius:8px;font-weight:600;cursor:pointer;">Cancelar</button>
    <button onclick="window.peAbrirFecho()" style="background:#16a34a;color:white;padding:12px 18px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">✅ Terminar Mapeamento${nVis?` (${nVis})`:''}</button>
  </div>`;
  peRolarTopo();
}

function peIniciarZona(i) {
  peState.qIdx=i;
  const fin=document.getElementById('pe-fecho-final'); if (fin) fin.style.display='none';
  peCarregarQuadrante();
}

function peProximoQuadrante() { peSeguinte(); }

// ─── FECHO (só quando se decide terminar o mapeamento) ────────────

const PE_ESCUDOS=['Desproteção','Desvalorização','Impotência','Sobrevivência','Perda'];

function peCancelarMapeamento() {
  const feito=peState.quadrants.some(q=>peState.mappingData[q.val]?.visitada);
  if (feito && !confirm('Cancelar o mapeamento? O que já marcou será perdido.')) return;
  peIrPasso('2');
}

function peAbrirFecho() {
  peGuardarNotasLaterais();
  if (!peState.quadrants.some(q=>peState.mappingData[q.val]?.visitada)) { mostrarAviso('⚠️ Mapeie pelo menos uma zona antes de terminar.'); return; }
  const box=document.getElementById('pe-fecho-final'); if (!box) return;
  const corpo=document.getElementById('pe-mapa-corpo'); if (corpo) corpo.style.display='none';
  const rod=document.getElementById('pe-mapa-rodape'); if (rod) rod.style.display='none';
  const be=document.getElementById('pe-btn-edit-mapa'); if (be) be.style.display='none';
  const titulo=document.getElementById('pe-mapa-titulo'); if (titulo) titulo.textContent='Fecho do Mapeamento';
  box.style.display='block';
  box.innerHTML=`<div style="font-size:0.85rem;color:#64748b;margin-bottom:12px;">Indique o padrão de defesa e a origem/tempo de cada zona mapeada.</div>`+
  peState.quadrants.map((q,i)=>{
    const d=peState.mappingData[q.val]; if(!d) return '';
    if (!d.visitada && peState.quadrants.some(z=>peState.mappingData[z.val]?.visitada)) return '';
    const n=d.selectedPoints?d.selectedPoints.size:0;
    return `<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;margin-bottom:14px;">
      <div style="font-weight:700;color:#1e3a8a;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #e2e8f0;">${q.val} <span style="font-weight:500;color:#64748b;font-size:0.8rem;">· ${n} ponto${n===1?'':'s'}</span></div>
      <label style="font-size:0.85rem;font-weight:700;color:#334155;display:block;margin-bottom:8px;">Padrão de Defesa Ativo:</label>
      <div id="pe-fz-esc-${i}" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;">
        ${PE_ESCUDOS.map(e=>{const on=d.shield===e;return `<div onclick="window.peEscolherEscudoZona(${i},'${e}',this)" data-ativo="${on?'1':''}" style="flex:1;min-width:100px;padding:10px;border:2px solid ${on?'#1e3a8a':'#e2e8f0'};background:${on?'#eff6ff':'white'};color:${on?'#1e3a8a':'#64748b'};border-radius:8px;cursor:pointer;text-align:center;font-size:0.82rem;font-weight:600;">${e}</div>`}).join('')}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div><label style="font-size:0.82rem;font-weight:700;color:#334155;display:block;margin-bottom:6px;">Origem do Gatilho:</label>
          <select id="pe-fz-epoca-${i}" onchange="window.peAtualizarEpocaZona(${i})" style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;">
            ${[['Transgeracional','Transgeracional (Herança)'],['Gestacional','Durante a Gestação'],['Pós-parto / Biográfico','Depois do Parto (Biográfico)']].map(([v,t])=>`<option value="${v}"${d.epoch===v?' selected':''}>${t}</option>`).join('')}
          </select></div>
        <div><label id="pe-fz-lbl-${i}" style="font-size:0.82rem;font-weight:700;color:#334155;display:block;margin-bottom:6px;"></label>
          <input type="text" id="pe-fz-tempo-${i}" value="${(d.epochTime||'').replace(/"/g,'&quot;')}" placeholder="Ex: Há 1 geração..." style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:8px;"></div>
      </div></div>`;
  }).join('')+
  `<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-top:20px;border-top:1px solid #e2e8f0;position:sticky;bottom:0;z-index:20;background:white;box-shadow:0 -6px 12px rgba(15,23,42,.08);padding:12px 4px calc(12px + env(safe-area-inset-bottom));">
    <button onclick="window.peVoltarAoMapa()" style="background:white;border:1px solid #e2e8f0;padding:12px 18px;border-radius:8px;font-weight:600;cursor:pointer;">⬅ Voltar ao Mapeamento</button>
    <button onclick="window.peConcluirFecho()" style="background:#1e3a8a;color:white;padding:12px 24px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">Gravar e Avançar ➔</button>
  </div>`;
  peState.quadrants.forEach((q,i)=>peAtualizarEpocaZona(i));
  peRolarTopo();
}

function peAtualizarEpocaZona(i) {
  const v=document.getElementById(`pe-fz-epoca-${i}`)?.value;
  const l=document.getElementById(`pe-fz-lbl-${i}`); if (!l) return;
  l.textContent=v==='Transgeracional'?'Gerações:':v==='Gestacional'?'Mês Intrauterino:':'Idade / Época:';
}

function peEscolherEscudoZona(i,shield,el) {
  document.querySelectorAll(`#pe-fz-esc-${i} div`).forEach(b=>{b.dataset.ativo='';b.style.borderColor='#e2e8f0';b.style.background='white';b.style.color='#64748b';});
  el.dataset.ativo='1'; el.style.borderColor='#1e3a8a'; el.style.background='#eff6ff'; el.style.color='#1e3a8a';
  const d=peState.mappingData[peState.quadrants[i]?.val]; if (d) d.shield=shield;
}

function peLerFecho() {
  peState.quadrants.forEach((q,i)=>{
    const d=peState.mappingData[q.val]; if(!d) return;
    const b=document.querySelector(`#pe-fz-esc-${i} div[data-ativo="1"]`);
    d.shield=b?b.textContent.trim():'Não Especificado';
    d.epoch=document.getElementById(`pe-fz-epoca-${i}`)?.value||'Transgeracional';
    d.epochTime=document.getElementById(`pe-fz-tempo-${i}`)?.value||'';
  });
}

function peVoltarAoMapa() { peLerFecho(); peMostrarZonas(); }

function peConcluirFecho() {
  peLerFecho();
  const fin=document.getElementById('pe-fecho-final'); if (fin) fin.style.display='none';
  peConsolidarEscudosMapa(); peIrPasso('4');
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

function peCentrarMapa() {
  setTimeout(()=>{
    const w=document.getElementById('pe-svg-wrapper');
    try { if (w&&w.scrollIntoView) w.scrollIntoView({block:'center',behavior:'auto'}); } catch(e){}
  },60);
}

function peCarregarCategoria(catId) {
  peState.catId=catId; peRenderizarTabs();
  peMostrarInfoPonto(null);
  const qData=peState.mappingData[peState.quadrants[peState.qIdx]?.val];
  if (!qData) return;
  const cat=qData.categories.find(c=>c.id===catId);
  const lateralArea=document.getElementById('pe-lateral-area');
  const pontosGrid=document.getElementById('pe-pontos-grid');
  if (catId==='lateral') {
    if (lateralArea) lateralArea.style.display='block';
    if (pontosGrid) pontosGrid.style.display='none';
    const ln=document.getElementById('pe-lateral-notas'); if(ln) ln.value=qData.lateralNotes||'';
    peAtualizarContadorMarcas(qData);
  } else {
    if (lateralArea) lateralArea.style.display='none';
    if (pontosGrid) pontosGrid.style.display='grid';
    peRenderizarPontos(cat,qData.selectedPoints);
  }
  peRenderizarSVG(cat,qData.selectedPoints);
  peAtualizarBotaoSeguinte();
  peCentrarMapa();
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

// Parte um nome comprido em linhas curtas (máx. 3) para caber ao lado do corpo.
function peQuebrar(texto,max) {
  const palavras=String(texto||'').split(/\s+/).filter(Boolean);
  const linhas=[]; let atual='';
  palavras.forEach(w=>{
    if (atual && (atual+' '+w).length>max) { linhas.push(atual); atual=w; }
    else atual=atual?atual+' '+w:w;
  });
  if (atual) linhas.push(atual);
  if (linhas.length>3) { linhas.length=3; linhas[2]=linhas[2].replace(/.{0,2}$/,'…'); }
  return linhas;
}

// Escreve o nome (e o órgão) de cada ponto nas margens do mapa, com uma linha até ao ponto.
function peDesenharRotulos(cat,selectedSet,g,edit) {
  const NS='http://www.w3.org/2000/svg';
  g.innerHTML='';
  const lado=new Map();
  const centrais=[];
  cat.points.forEach(p=>{
    if (p.x<96) lado.set(p.id,'L'); else if (p.x>104) lado.set(p.id,'R'); else centrais.push(p);
  });
  centrais.sort((a,b)=>a.y-b.y).forEach((p,k)=>lado.set(p.id,k%2?'R':'L'));
  ['L','R'].forEach(side=>{
    const arr=cat.points.filter(p=>lado.get(p.id)===side).map(p=>{
      const lines=peQuebrar(p.name,16);
      const mostraOrgao=!!p.organ && peNorm(p.organ)!==peNorm(p.name);
      return { p, lines, mostraOrgao, h:lines.length*10+(mostraOrgao?9:0)-(mostraOrgao?0:1), top:0 };
    }).sort((a,b)=>a.p.y-b.p.y);
    let prev=2;
    arr.forEach(l=>{ l.top=Math.max(l.p.y-l.h/2,prev); prev=l.top+l.h+4; });
    let limite=398;
    for (let k=arr.length-1;k>=0;k--) { const l=arr[k]; if (l.top+l.h>limite) l.top=limite-l.h; limite=l.top-4; }
    const ex=side==='L'?0:200;
    arr.forEach(l=>{
      const p=l.p; const sel=selectedSet.has(p.id);
      const ln=document.createElementNS(NS,'line');
      ln.setAttribute('x1',p.x); ln.setAttribute('y1',p.y); ln.setAttribute('x2',ex); ln.setAttribute('y2',l.top+5);
      ln.setAttribute('stroke',sel?'#dc2626':'#94a3b8'); ln.setAttribute('stroke-width',sel?'0.9':'0.5'); ln.setAttribute('pointer-events','none');
      g.appendChild(ln);
      const t=document.createElementNS(NS,'text');
      t.setAttribute('x',side==='L'?-3:203); t.setAttribute('text-anchor',side==='L'?'end':'start');
      t.setAttribute('pointer-events','none');
      l.lines.forEach((txt,i)=>{
        const ts=document.createElementNS(NS,'tspan');
        ts.setAttribute('x',side==='L'?-3:203); ts.setAttribute('y',l.top+8+i*10);
        ts.setAttribute('font-size','8.5'); ts.setAttribute('font-weight','700'); ts.setAttribute('fill',sel?'#dc2626':'#0f172a');
        ts.textContent=txt; t.appendChild(ts);
      });
      if (l.mostraOrgao) {
        const org=document.createElementNS(NS,'tspan');
        org.setAttribute('x',side==='L'?-3:203); org.setAttribute('y',l.top+8+l.lines.length*10-1);
        org.setAttribute('font-size','7'); org.setAttribute('font-weight','600'); org.setAttribute('fill',sel?'#dc2626':cat.cor);
        org.textContent=p.organ; t.appendChild(org);
      }
      g.appendChild(t);
      const r=document.createElementNS(NS,'rect');
      r.setAttribute('x',side==='L'?-82:200); r.setAttribute('y',l.top-2); r.setAttribute('width',82); r.setAttribute('height',l.h+4);
      r.setAttribute('fill','transparent'); r.style.cursor='pointer';
      r.addEventListener('pointerdown',(e)=>{
        e.preventDefault(); e.stopPropagation();
        if (edit) { peState.editPonto=p.id; peAtualizarPainelEdicao(p); peMoverAnel(p); }
        else peTogglePonto(p.id,!selectedSet.has(p.id));
      });
      g.appendChild(r);
    });
  });
}

function peRenderizarSVG(cat,selectedSet) {
  const svg=document.getElementById('pe-svg');
  if (!svg) return;
  svg.innerHTML=({superior:PE_PESCOCO_SVG,central:PE_CENTRAL_SVG,inferior:PE_INFERIOR_SVG})[cat.id]||PE_CORPO_SVG;
  if (cat.id==='lateral') svg.innerHTML+=PE_LATERAL_CONTORNO;
  const edit=peState.editMode;
  if (edit && cat.points.length && !cat.points.some(pt=>pt.id===peState.editPonto)) peState.editPonto=cat.points[0].id;
  const gRot=document.createElementNS('http://www.w3.org/2000/svg','g'); gRot.setAttribute('id','pe-rotulos'); svg.appendChild(gRot);
  peDesenharRotulos(cat,selectedSet,gRot,edit);
  cat.points.forEach(p=>{
    const isSel=selectedSet.has(p.id);
    const escolhido=edit&&peState.editPonto===p.id;
    const c=document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('data-pid',p.id);
    c.setAttribute('cx',p.x); c.setAttribute('cy',p.y); c.setAttribute('r',isSel?'10':'8');
    c.setAttribute('fill',isSel?'#dc2626':cat.cor); c.setAttribute('stroke',escolhido?'#1e3a8a':(isSel?'#fef08a':'white')); c.setAttribute('stroke-width',escolhido?'3':(isSel?'3':'1.5'));
    const title=document.createElementNS('http://www.w3.org/2000/svg','title'); title.textContent=p.name; c.appendChild(title);
    const hit=document.createElementNS('http://www.w3.org/2000/svg','circle');
    hit.setAttribute('data-hit',p.id);
    hit.setAttribute('cx',p.x); hit.setAttribute('cy',p.y); hit.setAttribute('r',edit?'20':'16'); hit.setAttribute('fill','transparent');
    if (edit) {
      hit.style.cursor='grab'; hit.style.touchAction='none';
      hit.addEventListener('pointerdown',(e)=>{
        e.preventDefault(); e.stopPropagation();
        peState.editPonto=p.id; peAtualizarPainelEdicao(p); peMoverAnel(p);
        peState.desfazer={id:p.id,x:p.x,y:p.y};
        try { hit.setPointerCapture(e.pointerId); } catch(_) {}
        const ctm=svg.getScreenCTM();
        if (!ctm) return;
        const inv=ctm.inverse();
        const aoPonto=(ev)=>{ const pt=svg.createSVGPoint(); pt.x=ev.clientX; pt.y=ev.clientY; return pt.matrixTransform(inv); };
        const ini=aoPonto(e); const dx0=p.x-ini.x, dy0=p.y-ini.y;
        // linhas-guia para ver o local exato por baixo do dedo
        const gv=document.createElementNS('http://www.w3.org/2000/svg','line'); const gh=document.createElementNS('http://www.w3.org/2000/svg','line');
        [gv,gh].forEach(g=>{ g.setAttribute('stroke','#1e3a8a'); g.setAttribute('stroke-width','0.6'); g.setAttribute('stroke-dasharray','2 2'); g.setAttribute('pointer-events','none'); svg.insertBefore(g,svg.firstChild.nextSibling); });
        const desenhar=()=>{
          peAgendarRotulos(cat,selectedSet); peMoverAnel(p);
          c.setAttribute('cx',p.x); c.setAttribute('cy',p.y); hit.setAttribute('cx',p.x); hit.setAttribute('cy',p.y);
          gv.setAttribute('x1',p.x); gv.setAttribute('x2',p.x); gv.setAttribute('y1',0); gv.setAttribute('y2',400);
          gh.setAttribute('y1',p.y); gh.setAttribute('y2',p.y); gh.setAttribute('x1',0); gh.setAttribute('x2',200);
        };
        c.setAttribute('stroke','#1e3a8a'); c.setAttribute('stroke-width','3');
        desenhar();
        const mover=(ev)=>{
          const q=aoPonto(ev);
          p.x=Math.round(Math.max(0,Math.min(200,q.x+dx0))*10)/10;
          p.y=Math.round(Math.max(0,Math.min(400,q.y+dy0))*10)/10;
          desenhar(); peMoverAnel(p);
        };
        const fim=()=>{
          hit.removeEventListener('pointermove',mover); hit.removeEventListener('pointerup',fim); hit.removeEventListener('pointercancel',fim);
          gv.remove(); gh.remove();
          peGravarPosicao(p.id,p.x,p.y);
        };
        hit.addEventListener('pointermove',mover); hit.addEventListener('pointerup',fim); hit.addEventListener('pointercancel',fim);
      });
    } else {
      hit.addEventListener('pointerdown',(e)=>{ e.preventDefault(); e.stopPropagation(); peTogglePonto(p.id,!selectedSet.has(p.id)); });
    }
    svg.appendChild(c); svg.appendChild(hit);
  });
  if (cat.id==='lateral') {
    const qD=peState.mappingData[peState.quadrants[peState.qIdx]?.val];
    if (qD) {
      qD.lateralMarks=qD.lateralMarks||[];
      qD.lateralMarks.forEach(m=>{
        const b=document.createElementNS('http://www.w3.org/2000/svg','circle');
        b.setAttribute('cx',m.x); b.setAttribute('cy',m.y); b.setAttribute('r','6'); b.setAttribute('fill','#0f172a'); b.setAttribute('stroke','white'); b.setAttribute('stroke-width','1.5'); b.setAttribute('pointer-events','none');
        svg.appendChild(b);
      });
      svg.style.touchAction='none';
      svg.onpointerdown=(e)=>{
        const ctm=svg.getScreenCTM(); if (!ctm) return;
        const pt=svg.createSVGPoint(); pt.x=e.clientX; pt.y=e.clientY;
        const q=pt.matrixTransform(ctm.inverse());
        const x=Math.round(Math.max(0,Math.min(200,q.x))*10)/10, y=Math.round(Math.max(0,Math.min(400,q.y))*10)/10;
        const perto=qD.lateralMarks.findIndex(m=>Math.hypot(m.x-x,m.y-y)<=8);
        if (perto>=0) qD.lateralMarks.splice(perto,1); else qD.lateralMarks.push({x,y});
        peRenderizarSVG(cat,qD.selectedPoints);
        peAtualizarContadorMarcas(qD);
      };
    }
    return;
  }
  if (edit) {
    const pe=cat.points.find(pt=>pt.id===peState.editPonto); peMoverAnel(pe); peAtualizarPainelEdicao(pe||null);
    // Tocar num sítio vazio do mapa coloca lá o ponto escolhido (muito mais rápido que as setas).
    svg.style.touchAction='none';
    svg.onpointerdown=(e)=>{
      const escolhido=cat.points.find(pt=>pt.id===peState.editPonto);
      const ctm=svg.getScreenCTM();
      if (!escolhido||!ctm) return;
      const pt=svg.createSVGPoint(); pt.x=e.clientX; pt.y=e.clientY;
      const q=pt.matrixTransform(ctm.inverse());
      peState.desfazer={id:escolhido.id,x:escolhido.x,y:escolhido.y};
      escolhido.x=Math.round(Math.max(0,Math.min(200,q.x))*10)/10;
      escolhido.y=Math.round(Math.max(0,Math.min(400,q.y))*10)/10;
      peAtualizarPontoSVG(cat,escolhido,selectedSet);
      peGravarPosicao(escolhido.id,escolhido.x,escolhido.y);
    };
  } else { svg.onpointerdown=null; }
}

function peAtualizarContadorMarcas(qData) {
  const el=document.getElementById('pe-lateral-contador');
  if (!el||!qData) return;
  const n=(qData.lateralMarks||[]).length;
  el.textContent=n?`${n} ${n>1?'locais marcados':'local marcado'}`:'Nenhum local marcado';
}

function peLimparMarcas() {
  const qData=peState.mappingData[peState.quadrants[peState.qIdx]?.val];
  if (!qData) return;
  qData.lateralMarks=[];
  const cat=qData.categories.find(c=>c.id==='lateral');
  if (cat) peRenderizarSVG(cat,qData.selectedPoints);
  peAtualizarContadorMarcas(qData);
}

// Mostra o nome, o órgão e a descrição do ponto tocado, por baixo do mapa.
function peMostrarInfoPonto(p,cor) {
  const el=document.getElementById('pe-info-ponto');
  if (!el) return;
  if (!p) { el.style.display='none'; return; }
  el.style.display='block';
  el.innerHTML=`<div style="font-weight:800;color:#0f172a;font-size:0.95rem;">${peEsc(p.name)}</div>`
    +(p.organ?`<div style="font-weight:700;color:${cor||'#1e3a8a'};font-size:0.8rem;margin-bottom:4px;">${peEsc(p.organ)}</div>`:'')
    +(p.desc?`<div style="font-size:0.85rem;color:#334155;">${peEsc(p.desc)}</div>`:'')
    +(p.r?`<div style="font-size:0.8rem;color:#64748b;margin-top:4px;font-style:italic;">${peEsc(p.r)}</div>`:'');
}

// Atualiza só o ponto (e os nomes) sem redesenhar o mapa todo: é isto que torna o movimento rápido.
function peAtualizarPontoSVG(cat,p,selectedSet) {
  const svg=document.getElementById('pe-svg');
  if (!svg) return;
  svg.querySelectorAll(`[data-pid="${p.id}"],[data-hit="${p.id}"]`).forEach(el=>{ el.setAttribute('cx',p.x); el.setAttribute('cy',p.y); });
  peMoverAnel(p);
  peAgendarRotulos(cat,selectedSet);
}

let __peRaf=null;
function peAgendarRotulos(cat,selectedSet) {
  if (__peRaf) return;
  const f=()=>{
    __peRaf=null;
    const g=document.getElementById('pe-rotulos');
    if (g) peDesenharRotulos(cat,selectedSet,g,peState.editMode);
  };
  __peRaf=(typeof requestAnimationFrame==='function')?requestAnimationFrame(f):setTimeout(f,16);
}

// Guarda a nova posição do ponto (para todas as zonas desta consulta e para as próximas).
function peGravarPosicao(id,x,y) {
  window.__pePosicoes=window.__pePosicoes||{}; window.__pePosicoes[peChavePos(id)]=[x,y];
  peGuardarPosicoesRemoto();
  const cfg=peLerConfig();
  cfg.categories.forEach(cat=>cat.points.forEach(pt=>{ if(pt.id===id){ pt.x=x; pt.y=y; } }));
  peGuardarConfig(cfg);
  Object.values(peState.mappingData||{}).forEach(q=>q.categories.forEach(cat=>cat.points.forEach(pt=>{ if(pt.id===id){ pt.x=x; pt.y=y; } })));
  if (peState.appData) peState.appData.categories.forEach(cat=>cat.points.forEach(pt=>{ if(pt.id===id){ pt.x=x; pt.y=y; } }));
}

function peAtualizarPainelEdicao(p) {
  const el=document.getElementById('pe-edit-ponto');
  if (!el) return;
  el.innerHTML=p?`Ponto escolhido: <b>${peEsc(p.name)}</b>`:'Toque num ponto para o escolher.';
}

function peNudge(dx,dy,passo) {
  const qData=peState.mappingData[peState.quadrants[peState.qIdx]?.val];
  if (!qData) return;
  const cat=qData.categories.find(c=>c.id===peState.catId);
  if (!cat||!cat.points.length) return mostrarAviso('⚠️ Esta categoria não tem pontos para mover.');
  const p=cat.points.find(pt=>pt.id===peState.editPonto)||cat.points[0];
  peState.editPonto=p.id;
  const k=passo||1;
  p.x=Math.round(Math.max(0,Math.min(200,p.x+dx*k))*10)/10;
  p.y=Math.round(Math.max(0,Math.min(400,p.y+dy*k))*10)/10;
  peState.nudgePendente=p.id;
  peAtualizarPontoSVG(cat,p,qData.selectedPoints);
}

let __peNudgeTimer=null, __peNudgeRep=null;
function peNudgeIniciar(dx,dy,ev) {
  if (ev && ev.preventDefault) ev.preventDefault();
  peNudgeParar();
  const qData=peState.mappingData[peState.quadrants[peState.qIdx]?.val];
  const cat=qData&&qData.categories.find(c=>c.id===peState.catId);
  const p0=cat&&cat.points.find(pt=>pt.id===peState.editPonto);
  if (p0) peState.desfazer={id:p0.id,x:p0.x,y:p0.y};
  peNudge(dx,dy,1);
  let n=0;
  // Mantendo premido: começa devagar e vai acelerando (2 → 4 → 8 → 14 por passo).
  __peNudgeTimer=setTimeout(()=>{
    __peNudgeRep=setInterval(()=>{ n++; peNudge(dx,dy,n<8?2:n<20?4:n<40?8:14); },40);
  },280);
}
function peNudgeParar() {
  if (__peNudgeTimer) { clearTimeout(__peNudgeTimer); __peNudgeTimer=null; }
  if (__peNudgeRep) { clearInterval(__peNudgeRep); __peNudgeRep=null; }
  if (peState.nudgePendente) {
    const id=peState.nudgePendente; peState.nudgePendente=null;
    const qData=peState.mappingData[peState.quadrants[peState.qIdx]?.val];
    const cat=qData&&qData.categories.find(c=>c.id===peState.catId);
    const p=cat&&cat.points.find(pt=>pt.id===id);
    if (p) peGravarPosicao(p.id,p.x,p.y);
  }
}

// Volta o último ponto mexido ao sítio onde estava antes.
function peDesfazerMovimento() {
  const d=peState.desfazer;
  if (!d) return mostrarAviso('⚠️ Ainda não há nenhum movimento para desfazer.');
  const qData=peState.mappingData[peState.quadrants[peState.qIdx]?.val];
  if (!qData) return;
  qData.categories.forEach(cat=>cat.points.forEach(pt=>{ if(pt.id===d.id){ pt.x=d.x; pt.y=d.y; } }));
  peGravarPosicao(d.id,d.x,d.y);
  peState.desfazer=null;
  const cat=qData.categories.find(c=>c.id===peState.catId);
  if (cat) peRenderizarSVG(cat,qData.selectedPoints);
}

// Anel azul à volta do ponto escolhido no modo edição.
function peMoverAnel(p) {
  const svg=document.getElementById('pe-svg');
  if (!svg||!p) return;
  let a=document.getElementById('pe-anel');
  if (!a) {
    a=document.createElementNS('http://www.w3.org/2000/svg','circle');
    a.setAttribute('id','pe-anel'); a.setAttribute('r','13'); a.setAttribute('fill','none');
    a.setAttribute('stroke','#1e3a8a'); a.setAttribute('stroke-width','2'); a.setAttribute('stroke-dasharray','3 2'); a.setAttribute('pointer-events','none');
    svg.appendChild(a);
  }
  a.setAttribute('cx',p.x); a.setAttribute('cy',p.y);
}

function peReporPosicoes() {
  window.__pePosicoes={}; peGuardarPosicoesRemoto();
  const cfg=peLerConfig();
  const orig={}; PE_CAT.forEach(cat=>cat.points.forEach(pt=>{ orig[pt.id]={x:pt.x,y:pt.y}; }));
  const rep=(cats)=>cats.forEach(cat=>cat.points.forEach(pt=>{ if(orig[pt.id]){ pt.x=orig[pt.id].x; pt.y=orig[pt.id].y; } }));
  rep(cfg.categories); peGuardarConfig(cfg);
  Object.values(peState.mappingData||{}).forEach(q=>rep(q.categories));
  if (peState.appData) rep(peState.appData.categories);
  peState.editPonto=null; peAtualizarPainelEdicao(null);
  peCarregarCategoria(peState.catId);
  mostrarAviso('✅ Posições originais repostas.');
}

function peTogglePonto(id,isSelected) {
  const qData=peState.mappingData[peState.quadrants[peState.qIdx]?.val];
  if (!qData) return;
  if (isSelected) qData.selectedPoints.add(id); else qData.selectedPoints.delete(id);
  const cat=qData.categories.find(c=>c.id===peState.catId);
  if (cat) { peRenderizarPontos(cat,qData.selectedPoints); peRenderizarSVG(cat,qData.selectedPoints); peMostrarInfoPonto(cat.points.find(pt=>pt.id===id),cat.cor); }
}

function peToggleEditMapa() {
  peState.editMode=!peState.editMode;
  const btn=document.getElementById('pe-btn-edit-mapa');
  if (btn) { btn.textContent=peState.editMode?'✅ Edição Concluída':'✏️ Modo Edição'; btn.style.background=peState.editMode?'#dc2626':'#e2e8f0'; btn.style.color=peState.editMode?'white':'#334155'; }
  const painel=document.getElementById('pe-edit-painel');
  if (painel) painel.style.display=peState.editMode?'block':'none';
  peState.editPonto=null; peAtualizarPainelEdicao(null);
  peCarregarCategoria(peState.catId);
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

function peAtualizarEpocaFinal() {
  const v=document.getElementById('pe-final-epoca')?.value;
  const l=document.getElementById('pe-final-lbl'); if (!l) return;
  l.textContent=v==='Transgeracional'?'Gerações:':v==='Gestacional'?'Mês da gravidez:':'Idade / Época:';
  const t=document.getElementById('pe-final-tempo');
  if (t) t.placeholder=v==='Transgeracional'?'Ex: Há 1 geração...':v==='Gestacional'?'Ex: 3.º mês de gestação':'Ex: Aos 7 anos';
  peRenderPrevia();
}

function peEscolherEscudoFinal(shield,el) {
  peState.finalShield=shield;
  document.querySelectorAll('#pe-escudos-final div').forEach(b=>{ b.style.borderColor='#e2e8f0'; b.style.background='white'; b.style.color='#64748b'; });
  el.style.borderColor='#1e3a8a'; el.style.background='#eff6ff'; el.style.color='#1e3a8a';
  peRenderPrevia();
}

// ─── RECEITA ──────────────────────────────────────────────────────

function pePreencherReceita() {
  const fchoGeral=document.getElementById('pe-fecho-geral');
  if (fchoGeral) fchoGeral.style.display='block';
  if (peState.path===2) {
    const z=peState.quadrants.map(q=>peState.mappingData[q.val]).find(d=>d&&d.visitada&&(d.epochTime||d.epoch));
    const se=document.getElementById('pe-final-epoca'), st=document.getElementById('pe-final-tempo');
    if (z&&se&&!st.value) { se.value=z.epoch||'Transgeracional'; st.value=z.epochTime||''; }
  }
  peAtualizarEpocaFinal();
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
  const novoP=peState.path===2;
  const bP=document.getElementById('pe-bloco-paciente'); if (bP) bP.style.display=novoP?'block':'none';
  const lbR=document.getElementById('pe-lbl-receita'), pR=document.getElementById('pe-p-receita'), tR=document.getElementById('pe-receita');
  if (lbR) lbR.textContent=novoP?'Notas do terapeuta (opcional):':'Plano Terapêutico (Receita Visual):';
  if (pR) pR.textContent=novoP?'Aparecem no fim do relatório do paciente.':'Gerado automaticamente cruzando o Escudo, as Massagens e os Pontos. Edite antes de emitir.';
  if (tR) tR.rows=novoP?4:16;
  if (novoP) {
    if (tR && tR.value.startsWith('PLANO DE REEQUIL')) tR.value='';
    peAtualizarEpocaFinal(); peRenderPrevia(); return;
  }
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

// ─── RELATÓRIO PARA O PACIENTE · PLANO VISUAL · HISTÓRICO · EVOLUÇÃO ───

const PE_EXEMPLOS = {
  v1:['Uma perda de sentido na vida depois de um divórcio, despedimento ou luto','Deixar de acreditar em algo (fé, projeto, pessoa) em que se confiava muito'],
  v2:['Ter engolido em seco uma injustiça no trabalho ou em família sem poder responder','Ter sido calado/a ou proibido/a de dar opinião desde criança'],
  v3:['Uma traição, separação ou desilusão amorosa que ainda dói','Sentir-se rejeitado/a ou abandonado/a por alguém muito próximo'],
  v4:['Uma notícia ou decisão de alguém que ainda "não desce"','Ter de aceitar uma situação (doença, mudança, perda) contra a vontade'],
  v5:['Ter sentido que perdeu o controlo de uma relação, do dinheiro ou da própria vida','Ter sido mandado/a ou dominado/a por alguém autoritário'],
  v6:['Anos sem se permitir prazer ou criatividade por obrigação ou culpa','Uma relação íntima que apagou a alegria de viver'],
  v7:['Mudanças de casa, falta de dinheiro ou medo de perder o lar ou o emprego','Ter crescido sem estabilidade material ou emocional'],
  i1:['Uma notícia súbita (morte, acidente, diagnóstico) que caiu "do céu"','Um susto grande que fez questionar tudo'],
  i2:['Ter assumido responsabilidades que eram de outros (irmãos mais novos, pais doentes)','Ter sustentado a família sozinho/a'],
  i3:['Querer salvar ou proteger toda a família emocionalmente','Carregar as dores dos pais ou do/a companheiro/a'],
  i4:['Ter de se proteger de críticas ou ameaças vindas de fora','Defender-se num ambiente de trabalho ou escolar hostil'],
  i5:['Guardar uma mágoa íntima que nunca contou a ninguém','Esconder uma ferida para não voltar a sofrer'],
  i6:['Uma vontade de agir ou realizar que foi travada (projeto, emprego, mudança)','Sentir-se impedido/a de fazer aquilo que sabe fazer'],
  i7:['Não conseguir largar alguém do passado (ex-companheiro/a, pessoa falecida)','Dificuldade em soltar objetos, casas ou memórias'],
  i8:['Um bloqueio na carreira ou nas finanças','Sentir que não consegue dar o passo seguinte na vida profissional'],
  i9:['Uma decisão familiar ou afetiva sempre adiada','Um impasse numa relação (ficar ou partir)'],
  i10:['Ter de ceder a exigências de fora contra a própria vontade','Resistir a obedecer a chefes ou a regras impostas'],
  i11:['Uma humilhação por parte de alguém próximo, à frente de outras pessoas','Ter de se "dobrar" por amor ou por dependência'],
  i12:['Dúvida sobre o caminho profissional ou de vida a seguir','Mudanças (emprego, país) feitas sem segurança'],
  i13:['Não sentir que pertence à família, ao grupo ou ao local onde vive','Ter sido deslocado/a (mudanças, adoção, emigração)'],
  N1:['Fases de insónia ou sono leve depois de um acontecimento marcante','Trocar o dia pela noite por ansiedade ou trabalho por turnos'],
  N2:['Viver períodos longos em alerta (conflitos em casa, ameaça, medo constante)','Fobias que surgiram depois de um susto ou de um trauma'],
  N3:['Comentários repetidos que fizeram duvidar do próprio valor ("tu não és capaz")','Comparações constantes com irmãos ou colegas'],
  N4:['Ter de engolir uma situação injusta sem poder falar','Uma discussão ou insulto que ficou "entalado" na garganta'],
  N5:['Longos períodos de pressa, prazos e cansaço','Sentir que o tempo nunca chega para tudo'],
  N6:['Falta de reconhecimento por parte de pais, chefes ou companheiro/a','Um esforço grande que ninguém valorizou'],
  N7:['Choro contido em momentos de luto ou dor ("homem não chora", "tens de ser forte")','Ter de ser forte para os outros e nunca poder desabafar'],
  N8:['Sentir-se impotente para mudar uma situação (doença de alguém, problemas no trabalho)','Adiar ações por medo de errar ou de desiludir'],
  N9:['Aguentar calado/a ordens, abusos ou injustiças','Engolir opiniões para evitar conflitos em família'],
  C1:['Pesos de família: dívidas, doenças, segredos ou expectativas herdadas','Ser a pessoa que resolve os problemas de todos'],
  C2:['Culpas antigas ou rancor que ainda não foram perdoados','Apego a pessoas, coisas ou situações do passado'],
  C3:['Anular-se para ser aceite ou amado/a','Ficar numa relação por medo de ficar só'],
  C4:['Alguém que invade o espaço pessoal (casa, quarto, privacidade)','Conflitos de território com familiares ou vizinhos'],
  C5:['Medo de perder alguém querido (morte, separação)','Um susto de quase-perda (acidente, internamento)'],
  C6:['Ter crescido com falta de afeto, atenção ou dinheiro','Pensar que "nunca é suficiente" ou que "não há para mim"'],
  C7:['Uma relação que cansa e consome (familiar, amorosa ou de trabalho)','Cuidar muito dos outros e receber pouco em troca'],
  C8:['Uma injustiça que ainda causa raiva (partilhas, traições, despedimento)','Ter sido enganado/a ou prejudicado/a por alguém de confiança'],
  C9:['Preocupações constantes com o futuro, os filhos, o dinheiro ou a saúde','Remoer conversas e decisões durante horas'],
  C10:['Uma frustração forte (projeto falhado, perda de um negócio)','Ficar paralisado/a depois de ouvir um "não"'],
  C11:['Uma decisão importante sempre adiada (separação, mudança, mudar de emprego)','Raiva engolida por não conseguir decidir'],
  C12:['Uma perda (luto, divórcio) depois da qual a vida perdeu a alegria','Fases em que "tudo sabe a pouco"'],
  f1:['Exaustão de cuidar de filhos, pais ou companheiro/a sem receber cuidado','Falta de colo e de carinho na infância'],
  f2:['Uma situação em que a tua intimidade ou privacidade não foi respeitada','Uma separação ou perda que desfez a estabilidade do lar'],
  f3:['Longos períodos de luta e stress sem descanso','Chegar à exaustão depois de anos a aguentar tudo'],
  f4:['Projetos de vida que "morreram" (filhos que não vieram, perdas de gravidez, sonhos)','Lutos na família que nunca foram curados'],
  f5:['Medo de falhar financeiramente ou de perder o sustento','Uma traição que quebrou a confiança'],
  f6:['Sentir que não tem lugar na família, no trabalho ou na sociedade','Ter de ser quem não é para pertencer']
};
function peExemplosDe(id) { return PE_EXEMPLOS[String(id).replace(/^(f\d)[de]$/,'$1')] || []; }

const PE_ESCUDO_TXT = {
  'Desproteção':{ desc:'Um padrão ligado a injustiça, insegurança e acusação. O subconsciente guarda a sensação de não ter tido proteção ou apoio quando mais foi preciso.', ex:['Sentir que ninguém o/a defendeu','Ter sido acusado/a ou castigado/a injustamente','Viver com insegurança em casa, na escola ou no trabalho'] },
  'Desvalorização':{ desc:'Um padrão ligado a inferioridade, rejeição e incompreensão. O corpo retém memórias de baixa estima e de comparação negativa.', ex:['Ser comparado/a com irmãos ou colegas','Ouvir que não era capaz ou que não era suficiente','Sentir-se posto/a de lado ou ignorado/a'] },
  'Impotência':{ desc:'Um padrão ligado a momentos em que nada do que se fazia tinha efeito. Fica a sensação de paralisia ou de incapacidade aprendida.', ex:['Ver alguém sofrer sem poder ajudar','Querer mudar uma situação e não conseguir','Sentir que "não vale a pena tentar"'] },
  'Sobrevivência':{ desc:'Um padrão ligado a pressão de sobrevivência: escassez, sufoco e indignação, seja física, emocional ou económica.', ex:['Épocas de aperto financeiro ou de falta de recursos','Ter de aguentar tudo sozinho/a para "safar" a família','Sentir-se sufocado/a por uma situação sem saída'] },
  'Perda':{ desc:'Um padrão ligado a separação, abandono e falta. Aponta para perdas reais ou sentidas que ainda não foram processadas.', ex:['Um luto, divórcio ou afastamento que ainda dói','Ter sido deixado/a ou abandonado/a','Perder um projeto, um lar ou uma pessoa muito importante'] }
};
const PE_CATS_ORDEM = ['vital','impact','superior','central','inferior'];
const PE_CAT_NOME = { vital:'Centros Vitais', impact:'Zonas de Entrada', superior:'Sistema Superior', central:'Sistema Central', inferior:'Sistema Inferior' };

function peLadoDe(z) { return String(z).startsWith('Costas') ? 'costas' : 'frente'; }
function peZonaCurta(z) { return String(z).replace('Frente - ','Frente · ').replace('Costas - ','Costas · '); }
function peEscudoFinal() {
  const f = peState.finalShield;
  if (f && f !== 'Não Especificado') return f;
  return (peState.shieldCalc && peState.shieldCalc !== 'Indefinido') ? peState.shieldCalc : 'Não Especificado';
}

function peColetarPontos() {
  const out = [];
  (peState.quadrants || []).forEach(q => {
    const d = peState.mappingData[q.val];
    if (!d || d.visitada === false || !d.selectedPoints) return;
    d.categories.forEach(cat => cat.points.forEach(p => {
      if (d.selectedPoints.has(p.id)) out.push({ k:q.val+'|'+p.id, id:p.id, nome:p.name, organ:p.organ||'', desc:p.desc||'', r:p.r||'', cat:cat.id, zona:q.val, x:p.x, y:p.y });
    }));
  });
  return out;
}
function peUnicos(pts) {
  const m = new Map();
  pts.forEach(p => { if (!m.has(p.id)) m.set(p.id, { ...p, zonas:[p.zona] }); else m.get(p.id).zonas.push(p.zona); });
  return Array.from(m.values());
}

function peTextoOrigem(ep) {
  if (!ep || !ep.epoca) return '';
  const t = ep.tempo ? ` (${ep.tempo})` : '';
  if (ep.epoca === 'Transgeracional') return `Esta memória parece vir de antes da tua gravidez, herdada da família${t}.`;
  if (ep.epoca === 'Gestacional') return `Esta memória parece ter-se formado durante a gravidez${t}.`;
  return `Esta memória parece ter-se formado depois do nascimento${t}.`;
}

function peConstruirRelatorioPaciente() {
  const un = peUnicos(peColetarPontos());
  const data = new Date().toLocaleDateString('pt-PT');
  const escudo = peEscudoFinal();
  const ep = peLerEpocaFinal();
  const consulta = ((peState.historico && peState.historico.mapeamentos && peState.historico.mapeamentos.length) || 0) + 1;
  const nome = peState.patientName || '';
  let h = `<div style="background:linear-gradient(135deg,#1e3a8a,#0f172a);color:white;border-radius:12px;padding:18px;margin-bottom:14px;">
    <div style="font-size:1.2rem;font-weight:800;">O Teu Mapa Emocional</div>
    <div style="font-size:0.88rem;opacity:.9;margin-top:4px;">${peEsc(nome)} · Consulta n.º ${consulta} · ${data}</div></div>`;
  let t = `O TEU MAPA EMOCIONAL\n${nome} · Consulta n.º ${consulta} · ${data}\n\n`;
  const intro = 'O corpo guarda a memória das emoções que não conseguimos viver ou expressar no momento. Cada ponto assinalado neste mapeamento mostra uma zona onde essa memória ficou retida. Lê com calma: não tens de te identificar com tudo — repara naquilo que te desperta uma emoção, uma imagem ou uma recordação. É aí que está o que precisa de ser olhado.';
  h += `<p style="font-size:0.92rem;line-height:1.6;color:#334155;">${intro}</p>`; t += intro + '\n\n';
  h += `<h3 style="color:#1e3a8a;margin:18px 0 8px;font-size:1.05rem;">O que o teu corpo revelou</h3>`; t += 'O QUE O TEU CORPO REVELOU\n\n';
  PE_CATS_ORDEM.forEach(cid => {
    const lista = un.filter(p => p.cat === cid);
    if (!lista.length) return;
    h += `<div style="font-weight:700;color:#b45309;margin:14px 0 6px;">${PE_CAT_NOME[cid]}</div>`; t += `— ${PE_CAT_NOME[cid].toUpperCase()} —\n`;
    lista.forEach(p => {
      const ex = peExemplosDe(p.id);
      h += `<div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #1e3a8a;border-radius:10px;padding:12px;margin-bottom:10px;break-inside:avoid;page-break-inside:avoid;">
        <div style="font-weight:700;color:#0f172a;">${peEsc(p.nome)}</div>
        <div style="font-size:0.76rem;color:#64748b;margin-bottom:6px;">${peEsc(p.zonas.map(peZonaCurta).join(' · '))}</div>
        <div style="font-size:0.88rem;color:#334155;margin-bottom:6px;">🔎 <b>Tema:</b> ${peEsc(p.desc)}</div>
        ${ex.length ? `<div style="font-size:0.88rem;color:#334155;margin-bottom:6px;">📌 <b>Situações que podem ter acontecido:</b><ul style="margin:4px 0 0 18px;padding:0;">${ex.map(e => `<li>${peEsc(e)}</li>`).join('')}</ul></div>` : ''}
        ${p.r ? `<div style="font-size:0.88rem;color:#1e3a8a;">❓ <b>Pergunta para te questionares:</b> ${peEsc(p.r)}</div>` : ''}</div>`;
      t += `• ${p.nome}\n  Tema: ${p.desc}\n`;
      if (ex.length) t += `  Situações que podem ter acontecido:\n` + ex.map(e => `   - ${e}`).join('\n') + '\n';
      if (p.r) t += `  Pergunta para te questionares: ${p.r}\n`;
      t += '\n';
    });
  });
  let marcas = 0; const notas = [];
  (peState.quadrants || []).forEach(q => { const d = peState.mappingData[q.val]; if (!d || d.visitada === false) return; marcas += (d.lateralMarks || []).length; if (d.lateralNotes) notas.push(d.lateralNotes); });
  if (marcas || notas.length) {
    h += `<div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:12px;margin-bottom:10px;"><div style="font-weight:700;color:#b45309;">Lateralidade</div><div style="font-size:0.88rem;color:#334155;">${marcas ? `Foram assinalados ${marcas} ${marcas === 1 ? 'local' : 'locais'} no contorno do corpo, que mostram onde sentes tensão ou peso.` : ''} ${notas.map(peEsc).join(' · ')}</div></div>`;
    t += `LATERALIDADE\n${marcas ? `Foram assinalados ${marcas} ${marcas === 1 ? 'local' : 'locais'} no contorno do corpo.\n` : ''}${notas.join(' · ')}\n\n`;
  }
  if (escudo !== 'Não Especificado') {
    const e = PE_ESCUDO_TXT[escudo];
    const origem = peTextoOrigem(ep);
    h += `<h3 style="color:#1e3a8a;margin:18px 0 8px;font-size:1.05rem;">O teu padrão de defesa: ${peEsc(escudo)}</h3>`;
    t += `O TEU PADRÃO DE DEFESA: ${escudo.toUpperCase()}\n`;
    if (e) {
      h += `<p style="font-size:0.9rem;line-height:1.6;color:#334155;">${e.desc}</p><ul style="font-size:0.88rem;color:#334155;margin:0 0 8px 18px;padding:0;">${e.ex.map(x => `<li>${x}</li>`).join('')}</ul>`;
      t += e.desc + '\n' + e.ex.map(x => ` - ${x}`).join('\n') + '\n';
    }
    if (origem) { h += `<p style="font-size:0.9rem;color:#334155;">⏳ ${origem}</p>`; t += origem + '\n'; }
    t += '\n';
  }
  const refl = ['Que acontecimento ou pessoa te veio à cabeça enquanto lias?','Com quem poderias falar sobre isto?','Escreve num caderno, esta semana, o que te vier à memória — sem julgar.'];
  h += `<h3 style="color:#1e3a8a;margin:18px 0 8px;font-size:1.05rem;">Para refletires esta semana</h3><ul style="font-size:0.9rem;color:#334155;margin:0 0 8px 18px;padding:0;">${refl.map(x => `<li>${x}</li>`).join('')}</ul>`;
  t += 'PARA REFLETIRES ESTA SEMANA\n' + refl.map(x => ` - ${x}`).join('\n') + '\n\n';
  const aviso = 'Este relatório é uma ferramenta de autoconhecimento no âmbito de uma terapia complementar e não substitui o acompanhamento médico ou psicológico.';
  h += `<p style="font-size:0.74rem;color:#64748b;border-top:1px solid #e2e8f0;padding-top:8px;">${aviso}</p>`; t += aviso + '\n';
  return { html:h, texto:t };
}

const PE_PAC_CORPO = `<ellipse cx="447" cy="652" rx="63" ry="68" fill="#e2e8f0" stroke="#475569" stroke-width="5"/><path d="M 484,722 C 483.7 733.3 476.0 776.7 482.0 790.0 C 488.0 803.3 502.8 797.8 520.0 802.0 C 537.2 806.2 566.7 809.0 585.0 815.0 C 603.3 821.0 618.8 828.0 630.0 838.0 C 641.2 848.0 646.7 860.5 652.0 875.0 C 657.3 889.5 658.2 904.2 662.0 925.0 C 665.8 945.8 668.7 970.8 675.0 1000.0 C 681.3 1029.2 692.2 1066.7 700.0 1100.0 C 707.8 1133.3 716.8 1175.0 722.0 1200.0 C 727.2 1225.0 727.3 1234.7 731.0 1250.0 C 734.7 1265.3 741.2 1277.0 744.0 1292.0 C 746.8 1307.0 748.8 1324.5 748.0 1340.0 C 747.2 1355.5 740.5 1377.5 739.0 1385.0 C 736.2 1385.8 728.5 1389.8 722.0 1390.0 C 715.5 1390.2 706.3 1395.2 700.0 1386.0 C 693.7 1376.8 687.8 1350.7 684.0 1335.0 C 680.2 1319.3 679.0 1305.2 677.0 1292.0 C 675.0 1278.8 672.8 1262.0 672.0 1256.0 C 669.5 1240.0 661.2 1192.7 657.0 1160.0 C 652.8 1127.3 649.3 1085.3 647.0 1060.0 C 644.7 1034.7 643.7 1016.7 643.0 1008.0 C 639.2 1006.3 627.8 999.3 620.0 998.0 C 612.2 996.7 600.0 999.7 596.0 1000.0 C 593.5 1010.0 584.5 1035.0 581.0 1060.0 C 577.5 1085.0 575.7 1121.7 575.0 1150.0 C 574.3 1178.3 574.7 1205.0 577.0 1230.0 C 579.3 1255.0 587.7 1280.8 589.0 1300.0 C 590.3 1319.2 586.7 1318.3 585.0 1345.0 C 583.3 1371.7 581.8 1417.5 579.0 1460.0 C 576.2 1502.5 569.8 1576.7 568.0 1600.0 L 456 1608 L 452 1312 Q 447 1296 442 1312 L 438 1608 L 326 1600 C 324.2 1576.7 317.8 1502.5 315.0 1460.0 C 312.2 1417.5 310.7 1371.7 309.0 1345.0 C 307.3 1318.3 303.7 1319.2 305.0 1300.0 C 306.3 1280.8 314.7 1255.0 317.0 1230.0 C 319.3 1205.0 319.7 1178.3 319.0 1150.0 C 318.3 1121.7 316.5 1085.0 313.0 1060.0 C 309.5 1035.0 300.5 1010.0 298.0 1000.0 C 294.0 999.7 281.8 996.7 274.0 998.0 C 266.2 999.3 254.8 1006.3 251.0 1008.0 C 250.3 1016.7 249.3 1034.7 247.0 1060.0 C 244.7 1085.3 241.2 1127.3 237.0 1160.0 C 232.8 1192.7 224.5 1240.0 222.0 1256.0 C 221.2 1262.0 219.0 1278.8 217.0 1292.0 C 215.0 1305.2 213.8 1319.3 210.0 1335.0 C 206.2 1350.7 200.3 1376.8 194.0 1386.0 C 187.7 1395.2 178.5 1390.2 172.0 1390.0 C 165.5 1389.8 157.8 1385.8 155.0 1385.0 C 153.5 1377.5 146.8 1355.5 146.0 1340.0 C 145.2 1324.5 147.2 1307.0 150.0 1292.0 C 152.8 1277.0 159.3 1265.3 163.0 1250.0 C 166.7 1234.7 166.8 1225.0 172.0 1200.0 C 177.2 1175.0 186.2 1133.3 194.0 1100.0 C 201.8 1066.7 212.7 1029.2 219.0 1000.0 C 225.3 970.8 228.2 945.8 232.0 925.0 C 235.8 904.2 236.7 889.5 242.0 875.0 C 247.3 860.5 252.8 848.0 264.0 838.0 C 275.2 828.0 290.7 821.0 309.0 815.0 C 327.3 809.0 356.8 806.2 374.0 802.0 C 391.2 797.8 406.0 803.3 412.0 790.0 C 418.0 776.7 410.3 733.3 410.0 722.0 Z" fill="#e2e8f0" stroke="#475569" stroke-width="5" stroke-linejoin="round"/><path d="M 396 702 L 447 744 L 498 702" fill="none" stroke="#94a3b8" stroke-width="3"/>`;
// Posições exatas (mapa de referência do método): central C1–C12 na linha do meio; inferior LA1–LA6 da virilha ao joelho; superior S1–S9 logo abaixo da barbela até ao fim do pescoço
const PE_PAC_Y_CENTRAL = [845,882,913,942,972,1009,1040,1082,1122,1162,1203,1247];
const PE_PAC_Y_INFERIOR = [1322,1372,1419,1467,1516,1564];

function peFiguraCorpo(zona, pts) {
  const lado = peLadoDe(zona);
  const vistos = new Set(); const L = [];
  const ordem = { superior:0, central:1, inferior:2 };
  pts.filter(p => p.zona === zona && ordem[p.cat] !== undefined)
     .sort((a, b) => ordem[a.cat] - ordem[b.cat])
     .forEach(p => { if (!vistos.has(p.id)) { vistos.add(p.id); L.push({ ...p }); } });
  if (!L.length) return null;
  L.forEach((p, i) => { p.n = i + 1; });
  const dot = (x, y, n, r, fs) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#dc2626" stroke="#fff" stroke-width="${(r*0.22).toFixed(2)}"/><text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="${fs}" font-weight="700" fill="#fff" font-family="sans-serif">${n}</text>`;
  let corpo = '', pesc = ''; let temSup = false;
  L.forEach(p => {
    if (p.cat === 'central') { const n = parseInt(String(p.id).replace(/\D/g, ''), 10) || 1; corpo += dot(447, PE_PAC_Y_CENTRAL[n - 1] || 845, p.n, 13, 16); }
    else if (p.cat === 'inferior') { const m = String(p.id).match(/^f(\d)([de])$/); const n = m ? parseInt(m[1], 10) : 1; corpo += dot(m && m[2] === 'e' ? 374 : 520, PE_PAC_Y_INFERIOR[n - 1] || 1322, p.n, 13, 16); }
    else { temSup = true; pesc += dot(p.x, p.y, p.n, 10, 12); const k = parseInt(String(p.id).replace(/\D/g, ''), 10) || 1; corpo += `<circle cx="447" cy="${(745 + (k - 1) * 9.6).toFixed(1)}" r="4.6" fill="#dc2626" stroke="#fff" stroke-width="1.2"/>`; }
  });
  if (temSup) corpo += `<ellipse cx="447" cy="783" rx="17" ry="48" fill="none" stroke="#dc2626" stroke-width="2.4" stroke-dasharray="6 4"/>`;
  const svgCorpo = `<svg viewBox="150 575 610 1045" style="width:100%;max-width:380px;" role="img" aria-label="Mapa do corpo — ${lado}">${PE_PAC_CORPO}${corpo}</svg>`;
  const svgPesc = temSup ? `<svg viewBox="0 0 200 400" style="width:100%;max-width:190px;" role="img" aria-label="Pescoço ampliado">${PE_PESCOCO_SVG}${pesc}</svg>` : '';
  return { L, svgCorpo, svgPesc };
}

function peLocalDoPonto(p, lado) {
  if (p.cat === 'superior') return lado === 'costas' ? 'nas costas, no osso mais saliente da parte de trás do pescoço (nuca)' : 'no pescoço, entre a zona debaixo da barbela e o fim do pescoço (ver imagem ampliada)';
  if (p.cat === 'central') return lado === 'costas' ? 'nas costas, no pescoço, mais ou menos a meio, no osso mais saliente' : 'na linha do meio do tronco, da base do pescoço até à cinta';
  return `na perna ${/e$/.test(p.id) ? 'esquerda' : 'direita'}, entre a virilha e o joelho (mesma localização da frente)`;
}

function peLerAudios21Cfg() {
  const ck = document.getElementById('pe-a21-incluir');
  if (ck && peState.step === '4') return { incluir: ck.checked, versao: document.getElementById('pe-a21-versao')?.value || 'fem', modo: document.getElementById('pe-a21-modo')?.value || 'dia', semana: document.getElementById('pe-a21-semana')?.value || 'todas' };
  return peState.audios21 || { incluir:false };
}

function peAud21Local() {
  try { return JSON.parse(localStorage.getItem('pe_aud21_' + tenantId()) || '{}') || {}; } catch(_) { return {}; }
}
function peAbrirLinks21() {
  const box = document.getElementById('pe-a21-links'); if (!box) return;
  const v = window.__peAud21 || peAud21Local();
  document.getElementById('pe-a21-t-fem').value = (v.fem || []).join('\n');
  document.getElementById('pe-a21-t-masc').value = (v.masc || []).join('\n');
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
}
async function peGuardarLinks21() {
  const l = id => (document.getElementById(id)?.value || '').split('\n').map(x => x.trim()).filter(Boolean).slice(0, 21);
  const v = { fem: l('pe-a21-t-fem'), masc: l('pe-a21-t-masc') };
  window.__peAud21 = v;
  try { localStorage.setItem('pe_aud21_' + tenantId(), JSON.stringify(v)); } catch(_) {}
  try { await db().doc(`tenants/${tenantId()}`).update({ peAudios21: v }); mostrarAviso('✅ Links dos 21 áudios guardados.'); }
  catch(e) { mostrarAviso('Guardado neste aparelho (não foi possível guardar na conta).'); }
  const box = document.getElementById('pe-a21-links'); if (box) box.style.display = 'none';
  peRenderPrevia();
}

function peConstruirPlano() {
  const pts = peColetarPontos();
  const escudo = peEscudoFinal();
  const passos = [
    'Lava as mãos, senta-te ou deita-te com conforto e respira fundo 3 vezes.',
    'Encontra no mapa o ponto pelo seu número e coloca nele 3 dedos juntos, em pinça.',
    'Massaja o ponto com os 3 dedos durante 3 respirações profundas (inspira pelo nariz, expira pela boca).',
    'Bate levemente duas vezes sobre o ponto.',
    'Roda os dedos duas vezes sobre o ponto, em círculo.',
    'Empurra suavemente para baixo com os dedos, como quem liberta o sentimento.',
    'Passa ao ponto seguinte, pela ordem dos números. Nunca deve doer: faz tudo com suavidade.'
  ];
  const dica = 'O mapa mostra a localização de cada ponto. Se tiveres dúvida sobre se estás a massajar o local correto, faz a massagem ao mesmo tempo que dizes em voz alta o nome da glândula ou do órgão desse ponto: a energia ajusta-se e chega ao local correto.';
  let h = `<h3 style="color:#1e3a8a;margin:22px 0 8px;font-size:1.05rem;">Plano Terapêutico — em casa</h3>
    <div style="font-weight:700;color:#b45309;margin:10px 0 6px;">1 · Como fazer a massagem</div>
    <ol style="font-size:0.9rem;line-height:1.55;color:#334155;margin:0 0 8px 18px;padding:0;">${passos.map(x => `<li style="margin-bottom:4px;">${x}</li>`).join('')}</ol>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px;font-size:0.86rem;color:#166534;margin-bottom:8px;">💡 ${dica}</div>`;
  let t = '\nPLANO TERAPÊUTICO — EM CASA\n\n1 · COMO FAZER A MASSAGEM\n' + passos.map((x, i) => `${i + 1}. ${x}`).join('\n') + '\nDica: ' + dica + '\n\n';
  const regra = 'Trata um lado de cada vez, começando pelo lado direito. Enquanto massajas os pontos de um lado, mantém uma mão na têmpora (fonte) desse mesmo lado. Quando terminares todos os pontos desse lado (frente e costas), troca a mão para a têmpora do outro lado e repete com os pontos desse lado. Se o mesmo ponto saiu nos dois lados, massaja-o em cada lado, cada um do seu lado.';
  h += `<div style="font-weight:700;color:#b45309;margin:14px 0 6px;">2 · Tratamento lado a lado — o teu mapa</div>
    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:10px;font-size:0.86rem;color:#1e3a8a;margin-bottom:10px;">✋ ${regra}</div>`;
  t += `2 · TRATAMENTO LADO A LADO — O TEU MAPA\n${regra}\n`;
  let algum = false;
  ['Direito', 'Esquerdo'].forEach(lado => {
    const zonasLado = ['Frente', 'Costas'].map(f => `${f} - Lado ${lado}`).filter(z => pts.some(p => p.zona === z));
    if (!zonasLado.length) return;
    algum = true;
    const lbl = lado === 'Direito' ? 'direita' : 'esquerda';
    h += `<div style="background:#1e3a8a;color:white;border-radius:8px;padding:10px 12px;margin:14px 0 8px;font-weight:700;break-after:avoid;page-break-after:avoid;">LADO ${lado.toUpperCase()} — mão na têmpora ${lbl}</div>`;
    t += `\n===== LADO ${lado.toUpperCase()} — mão na têmpora ${lbl} =====\n`;
    zonasLado.forEach(z => {
      const lf = peLadoDe(z);
      const f = peFiguraCorpo(z, pts);
      const outros = peUnicos(pts.filter(p => p.zona === z)).filter(p => p.cat === 'vital' || p.cat === 'impact');
      h += `<div style="background:white;border:1px solid #e2e8f0;border-radius:10px;padding:12px;margin-bottom:12px;break-inside:avoid;page-break-inside:avoid;">
        <div style="font-weight:700;color:#0f172a;margin-bottom:8px;text-transform:uppercase;font-size:0.82rem;">${lf === 'frente' ? 'Frente do corpo' : 'Costas'} · lado ${lado.toLowerCase()}</div>`;
      t += `\n${lf === 'frente' ? 'FRENTE DO CORPO' : 'COSTAS'} · lado ${lado.toLowerCase()}:\n`;
      if (f) {
        h += `<div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;align-items:flex-start;">${f.svgCorpo}${f.svgPesc}</div>
          ${lf === 'costas' && f.L.some(p => p.cat !== 'inferior') ? `<div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:10px;margin-top:10px;font-size:0.84rem;color:#92400e;"><b>Atenção — procedimento diferente nas costas:</b> os pontos do Sistema Superior e do Sistema Central, nas costas, não se massajam no local onde aparecem desenhados. Os do <b>Sistema Superior</b> massajam-se no <b>osso mais saliente da parte de trás do pescoço (nuca)</b>. Os do <b>Sistema Central</b> massajam-se também atrás, no <b>pescoço, mais ou menos a meio, no osso mais saliente</b>. Em cada sistema, um a um, pela ordem dos números. Os do <b>Sistema Inferior</b> mantêm a mesma localização da frente, nas pernas.</div>` : ''}
          <ol style="list-style:none;margin:10px 0 0;padding:0;font-size:0.86rem;color:#334155;">${f.L.map(p => `<li style="margin-bottom:6px;"><b style="display:inline-block;background:#dc2626;color:white;border-radius:50%;width:20px;height:20px;line-height:20px;text-align:center;font-size:0.72rem;margin-right:6px;">${p.n}</b><b>${peEsc(p.nome)}</b> <span style="color:#64748b;">(${PE_CAT_NOME[p.cat]})</span><br><span style="color:#64748b;margin-left:26px;display:inline-block;">${peLocalDoPonto(p, lf)}</span></li>`).join('')}</ol>`;
        if (lf === 'costas' && f.L.some(p => p.cat !== 'inferior')) t += '  ATENÇÃO — procedimento diferente nas costas: os pontos do Sistema Superior e do Sistema Central não se massajam onde aparecem desenhados. Os do Sistema Superior massajam-se no osso mais saliente da parte de trás do pescoço (nuca); os do Sistema Central, também atrás, no pescoço, mais ou menos a meio, no osso mais saliente. Em cada sistema, um a um, pela ordem dos números. Os do Sistema Inferior mantêm a mesma localização da frente, nas pernas.\n';
        t += f.L.map(p => `  ${p.n}. ${p.nome} (${PE_CAT_NOME[p.cat]}) — ${peLocalDoPonto(p, lf)}`).join('\n') + '\n';
      }
      if (outros.length) {
        h += `<div style="font-size:0.86rem;color:#334155;margin-top:8px;"><b>Centros vitais e zonas de entrada:</b> ${outros.map(p => peEsc(p.nome)).join(', ')}. Massaja diretamente o local indicado no mapa da consulta.</div>`;
        t += '  Centros vitais e zonas de entrada: ' + outros.map(p => p.nome).join(', ') + '. Massaja diretamente o local indicado no mapa da consulta.\n';
      }
      h += '</div>';
    });
  });
  if (!algum) { h += `<p style="font-size:0.86rem;color:#64748b;">(Nenhum ponto selecionado no mapeamento.)</p>`; t += '(Nenhum ponto selecionado no mapeamento.)\n'; }
  const af = PE_ESCUDOS_AFINIDADES[escudo];
  if (af) {
    const cmd = `«Eu libero todo sentimento de ${escudo.toUpperCase()}; ${af.libera}, que estejam bloqueados no meu corpo. Eu libero todos os sentimentos negativos que não me ajudam a evoluir, fica em mim apenas o necessário para o meu aprendizado, o resto eu libero e solto em gratidão!»`;
    h += `<div style="font-weight:700;color:#b45309;margin:14px 0 6px;">3 · Autoabraço e afirmações do escudo ${peEsc(escudo)}</div>
      <p style="font-size:0.9rem;line-height:1.55;color:#334155;">Só depois de massajares todos os pontos, dos dois lados: dá um autoabraço, respira fundo e repete em voz alta:</p>
      <p style="font-size:0.9rem;line-height:1.55;color:#1e3a8a;font-style:italic;">${peEsc(cmd)}</p>
      <p style="font-size:0.9rem;color:#334155;">(Bate no peito esquerdo com a mão 3 vezes): «Está feito, está feito, está feito. Está selado.»</p>
      <div style="font-weight:700;color:#334155;margin-top:8px;font-size:0.88rem;">Afirmações positivas — comando de reforço:</div>
      <p style="font-size:0.9rem;line-height:1.55;color:#334155;">${peEsc(af.afi)} «Que assim seja.»</p>`;
    t += `\n3 · AUTOABRAÇO E AFIRMAÇÕES DO ESCUDO ${escudo.toUpperCase()}\nSó depois de massajares todos os pontos, dos dois lados: dá um autoabraço, respira fundo e repete em voz alta:\n${cmd}\n(Bate no peito esquerdo com a mão 3 vezes): «Está feito, está feito, está feito. Está selado.»\n\nAfirmações positivas — comando de reforço:\n${af.afi}\n«Que assim seja.»\n`;
  }
  if (escudo !== 'Não Especificado') {
    h += `<div style="font-weight:700;color:#b45309;margin:14px 0 6px;">4 · Música e modulação neuroplástica</div>
      <p style="font-size:0.9rem;line-height:1.55;color:#334155;">🎧 Coloca a música relativa ao teu escudo detetado (<b>${peEsc(escudo)}</b>) e ouve a modulação neuroplástica do escudo <b>${peEsc(escudo)}</b> diariamente, ao deitar, durante 7 dias contínuos.</p>`;
    t += `\n4 · MÚSICA E MODULAÇÃO NEUROPLÁSTICA\nColoca a música relativa ao teu escudo detetado (${escudo}) e ouve a modulação neuroplástica do escudo ${escudo} diariamente, ao deitar, durante 7 dias contínuos.\n`;
  }
  const a = peLerAudios21Cfg();
  if (a && a.incluir) {
    const vf = a.versao === 'masc' ? 'masculina' : 'feminina';
    const lista = ((window.__peAud21 || peAud21Local())[a.versao === 'masc' ? 'masc' : 'fem']) || [];
    const semanas = a.semana === 'todas' ? [1, 2, 3] : [parseInt(a.semana, 10) || 1];
    const modo = a.modo === 'semana' ? 'As 7 meditações da semana são enviadas de uma vez; ouve uma por dia, pela ordem.' : 'É enviada uma meditação por dia.';
    h += `<div style="font-weight:700;color:#b45309;margin:14px 0 6px;">5 · Meditações guiadas — programa de 21 dias (versão ${vf})</div>
      <p style="font-size:0.9rem;line-height:1.55;color:#334155;">São 21 meditações, 7 por semana, todas diferentes, ao longo de 3 semanas. ${modo}</p>`;
    t += `\n5 · MEDITAÇÕES GUIADAS — PROGRAMA DE 21 DIAS (versão ${vf})\nSão 21 meditações, 7 por semana, todas diferentes, ao longo de 3 semanas. ${modo}\n`;
    semanas.forEach(sw => {
      const itens = []; for (let d = 1; d <= 7; d++) { const n = (sw - 1) * 7 + d; itens.push({ n, url: lista[n - 1] || '' }); }
      h += `<div style="font-size:0.86rem;color:#334155;margin:6px 0 2px;"><b>Semana ${sw}</b></div><ul style="margin:0 0 6px 18px;padding:0;font-size:0.86rem;color:#334155;">${itens.map(i => `<li>Meditação ${i.n}${i.url ? ` — <a href="${peEsc(i.url)}">${peEsc(i.url)}</a>` : ''}</li>`).join('')}</ul>`;
      t += `Semana ${sw}:\n` + itens.map(i => `  Meditação ${i.n}${i.url ? ' — ' + i.url : ''}`).join('\n') + '\n';
    });
  }
  return { html:h, texto:t };
}

function peIncluirPlano() {
  const ck = document.getElementById('pe-incluir-plano');
  if (ck && peState.step === '4') return ck.checked;
  return true;
}

function peConstruirDocumentoPaciente() {
  const r = peConstruirRelatorioPaciente();
  const incl = peIncluirPlano();
  const p = incl ? peConstruirPlano() : { html:'', texto:'' };
  const notas = (document.getElementById('pe-receita')?.value || '').trim();
  let html = `<div id="pe-doc-paciente">${r.html}${p.html}`;
  let texto = r.texto + p.texto;
  if (notas) { html += `<div style="font-weight:700;color:#b45309;margin:14px 0 6px;">Notas do terapeuta</div><p style="font-size:0.9rem;line-height:1.55;white-space:pre-wrap;color:#334155;">${peEsc(notas)}</p>`; texto += `\nNOTAS DO TERAPEUTA\n${notas}\n`; }
  html += '</div>';
  return { html, texto };
}

function peRenderPrevia() {
  if (peState.path !== 2) return;
  const el = document.getElementById('pe-previa-paciente');
  if (!el) return;
  try { el.innerHTML = peConstruirDocumentoPaciente().html; } catch(e) { console.error(e); }
}

// ─── DOCUMENTO FINAL, ENVIO, HISTÓRICO, TRATAMENTO E EVOLUÇÃO ───

function peLerEpocaFinal() {
  const sel = document.getElementById('pe-final-epoca');
  if (sel && peState.step === '4') return { epoca: sel.value || '', tempo: (document.getElementById('pe-final-tempo')?.value || '').trim() };
  return peState.epocaFinal || { epoca:'', tempo:'' };
}

function peInjetarPrint() {
  if (document.getElementById('pe-print-css')) return;
  const st = document.createElement('style'); st.id = 'pe-print-css';
  st.textContent = '@media print{body *{visibility:hidden}#pe-doc-paciente,#pe-doc-paciente *{visibility:visible}#pe-doc-paciente{position:absolute;left:0;top:0;width:100%}}';
  document.head.appendChild(st);
}

async function peLerHistorico(patientId) {
  peState.historico = { mapeamentos:[], tratamentos:[] };
  const ts = g => g && typeof g.toMillis === 'function' ? g.toMillis() : (g && g.seconds ? g.seconds * 1000 : 0);
  try {
    const col = db().collection(`tenants/${tenantId()}/patients/${patientId}/reports`);
    const [a, b] = await Promise.all([ col.where('tipo','==','pesquisa_emocional').get(), col.where('tipo','==','pesquisa_emocional_tratamento').get() ]);
    a.forEach(d => { const r = d.data() || {}; peState.historico.mapeamentos.push({ docId:d.id, t:ts(r.generatedAt), titulo:r.protocolName || '', texto:r.reportText || '', dados:r.dados || {} }); });
    b.forEach(d => { const r = d.data() || {}; peState.historico.tratamentos.push({ docId:d.id, t:ts(r.generatedAt), texto:r.reportText || '', dados:r.dados || {} }); });
    peState.historico.mapeamentos.sort((x, y) => x.t - y.t);
    peState.historico.tratamentos.sort((x, y) => x.t - y.t);
  } catch(e) { console.error('Não foi possível ler o histórico:', e); }
}

function peFmtData(t) { return t ? new Date(t).toLocaleDateString('pt-PT') : 'agora'; }
function peDiasDesde(t) { return t ? Math.floor((Date.now() - t) / 86400000) : 0; }

function peEstadoDe(m) {
  const trat = (peState.historico.tratamentos || []).filter(x => x.dados && x.dados.mapId && x.dados.mapId === (m.dados || {}).mapId);
  if (trat.length || (m.dados || {}).estado === 'tratamento') return { id:'tratamento', n:trat.length };
  return { id:'standby', n:0 };
}

function peCorSerie(i, n) {
  if (n <= 1) return '#1e3a8a';
  const a = [203, 213, 225], b = [30, 58, 138];
  const f = i / (n - 1);
  return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * f)).join(',')})`;
}

function peContarPorCat(m) {
  const c = { vital:0, impact:0, superior:0, central:0, inferior:0 };
  const vistos = new Set();
  ((m.dados || {}).pontos || []).forEach(p => { if (vistos.has(p.k)) return; vistos.add(p.k); if (c[p.cat] !== undefined) c[p.cat]++; });
  return c;
}

function peGraficoEvolucao(lista) {
  const L = lista.filter(m => m.dados && Array.isArray(m.dados.pontos)).slice(-6);
  if (L.length < 2) return '';
  const cats = PE_CATS_ORDEM; const W = 340, H = 200, pb = 28, pt = 18;
  const dados = L.map(peContarPorCat);
  const max = Math.max(1, ...dados.flatMap(d => cats.map(c => d[c])));
  const gw = W / cats.length, bw = (gw - 10) / L.length;
  let s = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:420px;" role="img" aria-label="Evolução do número de pontos por sistema">`;
  s += `<line x1="0" y1="${H - pb}" x2="${W}" y2="${H - pb}" stroke="#cbd5e1"/>`;
  cats.forEach((c, ci) => {
    L.forEach((m, mi) => {
      const v = dados[mi][c]; const h = (H - pb - pt) * v / max;
      const x = ci * gw + 5 + mi * bw, y = H - pb - h;
      s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(bw - 2).toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${peCorSerie(mi, L.length)}"/>`;
      s += `<text x="${(x + (bw - 2) / 2).toFixed(1)}" y="${(y - 3).toFixed(1)}" text-anchor="middle" font-size="9" fill="#334155" font-family="sans-serif">${v}</text>`;
    });
    s += `<text x="${(ci * gw + gw / 2).toFixed(1)}" y="${H - 10}" text-anchor="middle" font-size="9.5" fill="#475569" font-family="sans-serif">${({ vital:'Vitais', impact:'Entrada', superior:'Superior', central:'Central', inferior:'Inferior' })[c]}</text>`;
  });
  s += '</svg>';
  const leg = L.map((m, i) => `<span style="display:inline-flex;align-items:center;gap:5px;margin:2px 10px 2px 0;font-size:0.78rem;color:#334155;"><span style="width:12px;height:12px;border-radius:3px;background:${peCorSerie(i, L.length)};display:inline-block;"></span>Consulta ${m.dados.consulta || '?'} · ${peFmtData(m.t)}</span>`).join('');
  const ult = L[L.length - 1], pen = L[L.length - 2];
  const kU = new Set(ult.dados.pontos.map(p => p.k)), kP = new Set(pen.dados.pontos.map(p => p.k));
  const nomeDe = (arr, k) => (arr.find(p => p.k === k) || {}).nome + ' (' + peZonaCurta((arr.find(p => p.k === k) || {}).zona || '') + ')';
  const livres = [...kP].filter(k => !kU.has(k)).map(k => nomeDe(pen.dados.pontos, k));
  const novos = [...kU].filter(k => !kP.has(k)).map(k => nomeDe(ult.dados.pontos, k));
  const iguais = [...kU].filter(k => kP.has(k)).length;
  const lst = (arr, cor) => arr.length ? `<ul style="margin:4px 0 0 18px;padding:0;font-size:0.82rem;color:${cor};">${arr.map(x => `<li>${peEsc(x)}</li>`).join('')}</ul>` : '<div style="font-size:0.82rem;color:#64748b;">Nenhum</div>';
  const escMudou = (pen.dados.escudo || '—') === (ult.dados.escudo || '—') ? `O escudo manteve-se: <b>${peEsc(ult.dados.escudo || '—')}</b>.` : `O escudo mudou de <b>${peEsc(pen.dados.escudo || '—')}</b> para <b>${peEsc(ult.dados.escudo || '—')}</b>.`;
  return `<div style="background:white;border:1px solid #e2e8f0;border-radius:12px;padding:14px;margin-top:16px;">
    <div style="font-weight:700;color:#1e3a8a;margin-bottom:4px;">📈 Evolução entre consultas</div>
    <div style="font-size:0.8rem;color:#64748b;margin-bottom:8px;">Número de pontos assinalados em cada sistema. Menos pontos indica menos retenção.</div>
    ${s}<div style="margin-top:6px;">${leg}</div>
    <div style="margin-top:12px;font-size:0.86rem;color:#334155;"><b>O que mudou desde a última consulta:</b> ${escMudou}</div>
    <div style="margin-top:8px;font-size:0.84rem;"><b style="color:#16a34a;">✔ Já não foram assinalados (${livres.length}):</b>${lst(livres, '#166534')}</div>
    <div style="margin-top:8px;font-size:0.84rem;"><b style="color:#dc2626;">● Novos (${novos.length}):</b>${lst(novos, '#991b1b')}</div>
    <div style="margin-top:8px;font-size:0.84rem;color:#334155;"><b>= Mantêm-se:</b> ${iguais}</div></div>`;
}

function peRenderHub() {
  const el = document.getElementById('pe-step-hub'); if (!el) return;
  const H = peState.historico || { mapeamentos:[], tratamentos:[] };
  const n = H.mapeamentos.length + 1;
  const ult = H.mapeamentos[H.mapeamentos.length - 1];
  let sug = '';
  if (ult && ult.t) { const d = new Date(ult.t + 7 * 86400000).toLocaleDateString('pt-PT'); sug = `Última consulta há ${peDiasDesde(ult.t)} dia(s). Próxima sugerida a partir de ${d} (ideal: 4 consultas, uma a cada 7 dias ou mais espaçadas, conforme a evolução).`; }
  const cartoes = H.mapeamentos.slice().reverse().map(m => {
    const d = m.dados || {}; const est = peEstadoDe(m);
    const idade = peDiasDesde(m.t);
    const aviso = (est.id === 'standby' && idade > 60) ? `<div style="font-size:0.78rem;color:#b45309;margin-top:6px;">⚠️ Já passaram ${idade} dias. Pode ser melhor fazer um novo mapeamento antes de tratar.</div>` : '';
    const nPts = Array.isArray(d.pontos) ? new Set(d.pontos.map(p => p.k)).size : null;
    return `<div style="background:white;border:1px solid #e2e8f0;border-radius:10px;padding:14px;margin-bottom:10px;">
      <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center;">
        <div style="font-weight:700;color:#0f172a;">Consulta ${d.consulta || '—'} · ${peFmtData(m.t)}</div>
        <span style="font-size:0.74rem;font-weight:700;padding:3px 10px;border-radius:20px;background:${est.id === 'tratamento' ? '#dcfce7' : '#fef3c7'};color:${est.id === 'tratamento' ? '#166534' : '#92400e'};">${est.id === 'tratamento' ? `✅ Em tratamento (${est.n} sessão${est.n === 1 ? '' : 'ões'})` : '⏳ Stand-by'}</span></div>
      <div style="font-size:0.82rem;color:#64748b;margin-top:4px;">${d.escudo ? 'Escudo: ' + peEsc(d.escudo) : ''}${nPts !== null ? ' · ' + nPts + ' ponto' + (nPts === 1 ? '' : 's') : ''}</div>${aviso}
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;">
        ${d.mapa ? `<button onclick="window.peIniciarTratamento('${m.docId}')" style="background:#16a34a;color:white;border:none;padding:10px 14px;border-radius:8px;font-weight:700;cursor:pointer;">▶ Iniciar tratamento</button>` : ''}
        <button onclick="window.peVerRegisto('${m.docId}')" style="background:#e2e8f0;border:none;padding:10px 14px;border-radius:8px;font-weight:600;cursor:pointer;">📄 Ver / reenviar relatório</button></div></div>`;
  }).join('');
  el.innerHTML = `<div class="card" style="padding:20px;">
    <div style="font-size:1.1rem;font-weight:700;color:#1e3a8a;margin-bottom:6px;border-bottom:2px solid #fef3c7;padding-bottom:10px;">${peEsc(peState.patientName || '')}</div>
    <div style="font-size:0.84rem;color:#64748b;margin-bottom:14px;">${sug || 'Ainda não há consultas de mapeamento guardadas.'}</div>
    <button onclick="window.peNovaConsultaDoHub()" style="width:100%;background:#1e3a8a;color:white;padding:14px;border:none;border-radius:10px;font-size:1rem;font-weight:700;cursor:pointer;margin-bottom:14px;">➕ Nova consulta de mapeamento (n.º ${n})</button>
    ${cartoes || ''}
    ${peGraficoEvolucao(H.mapeamentos)}
    <div style="margin-top:16px;"><button onclick="window.peIrPasso('0')" style="background:white;border:1px solid #e2e8f0;padding:10px 16px;border-radius:8px;font-weight:600;cursor:pointer;">⬅ Escolher outro paciente</button></div></div>`;
}

function peNovaConsultaDoHub() {
  peState.finalShield = 'Não Especificado'; peState.shieldsDetected = []; peState.mapId = null; peState.epocaFinal = null;
  const t = document.getElementById('pe-final-tempo'); if (t) t.value = '';
  document.querySelectorAll('#pe-escudos-final div').forEach(b => { b.style.borderColor = '#e2e8f0'; b.style.background = 'white'; b.style.color = '#64748b'; });
  peIrPasso('1');
  setTimeout(() => peVerificarQExistente('pre-consulta'), 200);
}

function peVerRegisto(docId) {
  const m = (peState.historico.mapeamentos || []).find(x => x.docId === docId); if (!m) return;
  const d = m.dados || {};
  peState.docAtual = { html: d.htmlPaciente || `<pre style="white-space:pre-wrap;font-family:inherit;">${peEsc(m.texto)}</pre>`, texto: m.texto, dados: d, docId };
  peMostrarDocumento(true);
}

function peMostrarDocumento(deHistorico) {
  const el = document.getElementById('pe-step-relatorio'); if (!el) return;
  peInjetarPrint();
  const D = peState.docAtual || { html:'', texto:'', dados:{} };
  const podeTratar = D.dados && D.dados.mapa;
  el.innerHTML = `<div class="card" style="padding:20px;">
    <div style="font-size:1.1rem;font-weight:700;color:#16a34a;margin-bottom:14px;border-bottom:2px solid #dcfce7;padding-bottom:10px;">${deHistorico ? '📄 Relatório do paciente' : '✅ Relatório guardado na ficha'}</div>
    <div style="background:white;border:1px solid #e2e8f0;border-radius:10px;padding:14px;">${D.html}</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:18px;">
      <button onclick="window.peEnviarWhatsApp()" style="background:#25D366;color:white;padding:12px 18px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">📱 Enviar por WhatsApp</button>
      <button onclick="window.peEnviarEmail()" style="background:#1e3a8a;color:white;padding:12px 18px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">✉️ Enviar por e-mail</button>
      <button onclick="window.print()" style="background:#e2e8f0;padding:12px 18px;border:none;border-radius:8px;font-weight:600;cursor:pointer;">🖨️ PDF / Imprimir</button>
      <button onclick="window.copiarTexto(window.peState_docTexto())" style="background:#e2e8f0;padding:12px 18px;border:none;border-radius:8px;font-weight:600;cursor:pointer;">📋 Copiar texto</button></div>
    <div style="font-size:0.78rem;color:#64748b;text-align:center;margin-top:8px;">Dica: o PDF mostra o relatório completo com as imagens. Guarda-o e envia-o ao paciente em anexo.</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:space-between;margin-top:18px;padding-top:14px;border-top:1px solid #e2e8f0;">
      <button onclick="window.peVoltarAoPaciente()" style="background:white;border:1px solid #e2e8f0;padding:12px 16px;border-radius:8px;font-weight:600;cursor:pointer;">👤 Voltar ao paciente</button>
      ${podeTratar ? `<button onclick="window.peIniciarTratamentoAtual()" style="background:#16a34a;color:white;padding:12px 18px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">▶ Iniciar tratamento</button>` : ''}</div></div>`;
  peIrPasso('relatorio');
}

function peDocTexto() { return (peState.docAtual && peState.docAtual.texto) || ''; }

function peTelefoneWA() {
  const d = String((peState.pacienteDados && peState.pacienteDados.phone) || '').replace(/\D/g, '');
  if (!d) return '';
  return d.length === 9 ? '351' + d : d;
}
function peAbrirLink(url) { if (typeof window.openExternalLink === 'function') window.openExternalLink(url); else window.open(url, '_blank'); }

function peEnviarWhatsApp() {
  const nome = (peState.patientName || '').split(' ')[0];
  let txt = `Olá ${nome}! Segue o teu relatório da consulta de mapeamento.\n\n` + peDocTexto();
  if (txt.length > 3500) txt = txt.slice(0, 3400) + '\n\n[…] O relatório completo, com as imagens, segue em PDF.';
  peAbrirLink(`https://wa.me/${peTelefoneWA()}?text=${encodeURIComponent(txt)}`);
}
function peEnviarEmail() {
  const mail = (peState.pacienteDados && peState.pacienteDados.email) || '';
  const corpo = peDocTexto().slice(0, 1500) + '\n\n[…] O relatório completo, com as imagens, segue em anexo (PDF).';
  peAbrirLink(`mailto:${mail}?subject=${encodeURIComponent('O teu relatório de mapeamento')}&body=${encodeURIComponent(corpo)}`);
}

async function peVoltarAoPaciente() {
  if (peState.patientId) { await peLerHistorico(peState.patientId); peRenderHub(); peIrPasso('hub'); }
  else peIrPasso('0');
}

async function peEmitirPaciente(relatorioTec, escudo, data) {
  const ep = peLerEpocaFinal();
  const estado = document.querySelector('input[name="pe-estado"]:checked')?.value || 'standby';
  const doc = peConstruirDocumentoPaciente();
  const pontos = peColetarPontos();
  const mapId = peState.mapId || (peState.mapId = 'm' + Date.now());
  const consulta = ((peState.historico && peState.historico.mapeamentos && peState.historico.mapeamentos.length) || 0) + 1;
  const zonas = (peState.quadrants || []).filter(q => peState.mappingData[q.val] && peState.mappingData[q.val].visitada !== false).map(q => {
    const d = peState.mappingData[q.val];
    return { val:q.val, desc:q.desc || '', pontos:Array.from(d.selectedPoints), lateralMarks:d.lateralMarks || [], lateralNotes:d.lateralNotes || '', shield:d.shield || '', epoch:d.epoch || '', epochTime:d.epochTime || '' };
  });
  const dados = JSON.parse(JSON.stringify({
    escudo, path:2, data, mapId, estado, consulta, epoca:ep.epoca || '', tempo:ep.tempo || '',
    notas:(document.getElementById('pe-receita')?.value || '').trim(),
    pontos:pontos.map(p => ({ k:p.k, id:p.id, nome:p.nome, cat:p.cat, zona:p.zona })),
    mapa:{ zonas }, htmlPaciente:doc.html, audios21:peLerAudios21Cfg(), semPlano:!peIncluirPlano()
  }));
  let ok = true;
  if (peState.patientId) ok = await guardarNaFicha(peState.patientId, { tipo:'pesquisa_emocional', titulo:`Pesquisa Emocional — ${data}`, texto:relatorioTec + '\n\nRELATÓRIO PARA O PACIENTE:\n' + doc.texto, dados });
  if (!ok && peState.patientId) mostrarAviso('⚠️ Não consegui gravar na ficha do paciente. Copie o relatório antes de sair.');
  if (!peState.historico) peState.historico = { mapeamentos:[], tratamentos:[] };
  peState.historico.mapeamentos.push({ docId:'novo-' + mapId, t:Date.now(), texto:doc.texto, dados });
  peState.docAtual = { html:doc.html, texto:doc.texto, dados };
  peMostrarDocumento(false);
}

function peIniciarTratamentoAtual() {
  const D = peState.docAtual; if (!D || !D.dados || !D.dados.mapa) return;
  peCarregarMapaGuardado(D.dados);
  peRenderTratamento(D.dados.mapId);
  peIrPasso('trat');
}

function peCarregarMapaGuardado(d) {
  const cfg = peLerConfig();
  peState.path = 2;
  peState.quadrants = d.mapa.zonas.map(z => ({ val:z.val, desc:z.desc || '' }));
  peState.mappingData = {};
  d.mapa.zonas.forEach(z => {
    peState.mappingData[z.val] = { visitada:true, desc:z.desc || '', selectedPoints:new Set(z.pontos || []), lateralNotes:z.lateralNotes || '', lateralMarks:z.lateralMarks || [], shield:z.shield || 'Não Especificado', epoch:z.epoch || '', epochTime:z.epochTime || '', categories:JSON.parse(JSON.stringify(cfg.categories)) };
  });
  peState.finalShield = d.escudo || 'Não Especificado';
  peState.epocaFinal = { epoca:d.epoca || '', tempo:d.tempo || '' };
  peState.mapId = d.mapId;
  peState.audios21 = d.audios21 || { incluir:false };
}

function peIniciarTratamento(docId) {
  const m = (peState.historico.mapeamentos || []).find(x => x.docId === docId);
  if (!m || !m.dados || !m.dados.mapa) { mostrarAviso('⚠️ Este registo é antigo e não tem os pontos guardados. Faça uma nova consulta de mapeamento.'); return; }
  peCarregarMapaGuardado(m.dados);
  peRenderTratamento(m.dados.mapId);
  peIrPasso('trat');
}

function peRenderTratamento(mapId) {
  const el = document.getElementById('pe-step-trat'); if (!el) return;
  peInjetarPrint();
  const H = peState.historico || { mapeamentos:[], tratamentos:[] };
  const base = H.mapeamentos.find(x => (x.dados || {}).mapId === mapId);
  const anteriores = H.tratamentos.filter(x => (x.dados || {}).mapId === mapId);
  const un = peUnicos(peColetarPontos());
  const plano = peConstruirPlano();
  el.innerHTML = `<div class="card" style="padding:20px;">
    <div style="font-size:1.1rem;font-weight:700;color:#16a34a;margin-bottom:6px;border-bottom:2px solid #dcfce7;padding-bottom:10px;">▶ Consulta de Tratamento · sessão ${anteriores.length + 1}</div>
    <div style="font-size:0.84rem;color:#64748b;margin-bottom:12px;">${peEsc(peState.patientName || '')} · mapeamento de ${base ? peFmtData(base.t) : 'hoje'}${peEscudoFinal() !== 'Não Especificado' ? ' · Escudo: ' + peEsc(peEscudoFinal()) : ''}</div>
    ${anteriores.length ? `<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:10px;margin-bottom:12px;font-size:0.82rem;color:#166534;"><b>Sessões anteriores:</b><ul style="margin:4px 0 0 18px;padding:0;">${anteriores.map(a => `<li>${peFmtData(a.t)}${a.dados.notas ? ' — ' + peEsc(a.dados.notas) : ''}</li>`).join('')}</ul></div>` : ''}
    <div id="pe-doc-paciente" style="background:white;border:1px solid #e2e8f0;border-radius:10px;padding:14px;">${plano.html}</div>
    <div style="font-weight:700;color:#1e3a8a;margin:16px 0 6px;">Pontos trabalhados hoje</div>
    ${peColetarPontos().map(p => `<label style="display:flex;gap:8px;align-items:center;padding:6px 0;font-size:0.88rem;color:#334155;"><input type="checkbox" class="pe-tr-ck" value="${peEsc(p.k)}" checked style="width:18px;height:18px;"> ${peEsc(p.nome)} <span style="color:#64748b;font-size:0.76rem;">(${peEsc(peZonaCurta(p.zona))})</span></label>`).join('')}
    <label style="font-weight:700;color:#334155;display:block;margin:14px 0 6px;">Notas da sessão:</label>
    <textarea id="pe-tr-notas" rows="4" style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:8px;" placeholder="Como correu, o que o paciente sentiu..."></textarea>
    <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:space-between;margin-top:18px;padding-top:14px;border-top:1px solid #e2e8f0;">
      <button onclick="window.peVoltarAoPaciente()" style="background:white;border:1px solid #e2e8f0;padding:12px 16px;border-radius:8px;font-weight:600;cursor:pointer;">⬅ Voltar</button>
      <button onclick="window.print()" style="background:#e2e8f0;border:none;padding:12px 16px;border-radius:8px;font-weight:600;cursor:pointer;">🖨️ Plano em PDF</button>
      <button onclick="window.peGravarTratamento('${peEsc(mapId || '')}')" style="background:#16a34a;color:white;border:none;padding:12px 20px;border-radius:8px;font-weight:700;cursor:pointer;">Gravar sessão</button></div></div>`;
}

async function peGravarTratamento(mapId) {
  const feitos = Array.from(document.querySelectorAll('.pe-tr-ck:checked')).map(c => c.value);
  const notas = (document.getElementById('pe-tr-notas')?.value || '').trim();
  const data = new Date().toLocaleDateString('pt-PT');
  const sessao = (peState.historico.tratamentos || []).filter(x => (x.dados || {}).mapId === mapId).length + 1;
  const texto = `SESSÃO DE TRATAMENTO ${sessao} — ${data}\nPaciente: ${peState.patientName}\nEscudo: ${peEscudoFinal()}\nPontos trabalhados: ${feitos.length}\n${notas ? 'Notas: ' + notas : ''}`;
  let ok = true;
  if (peState.patientId) ok = await guardarNaFicha(peState.patientId, { tipo:'pesquisa_emocional_tratamento', titulo:`Tratamento — ${data}`, texto, dados:{ mapId, data, sessao, feitos, notas } });
  if (!ok) { mostrarAviso('⚠️ Não consegui gravar a sessão.'); return; }
  mostrarAviso('✅ Sessão de tratamento guardada.');
  peState.historico.tratamentos.push({ docId:'novo', t:Date.now(), texto, dados:{ mapId, data, sessao, feitos, notas } });
  peRenderHub(); peIrPasso('hub');
}

// ─── RELATÓRIO FINAL ──────────────────────────────────────────────

function peLinhaEpoca() {
  const e=peLerEpocaFinal();
  if (!e.epoca) return '';
  const nome={'Transgeracional':'Antes da gravidez (Transgeracional)','Gestacional':'Durante a gravidez (Gestação)','Pós-parto / Biográfico':'Depois do parto (Biográfico)'}[e.epoca]||e.epoca;
  return `Origem do Gatilho: ${nome}${e.tempo?' — '+e.tempo:''}\n`;
}

async function peEmitirRelatorio() {
  const data=new Date().toLocaleDateString('pt-PT');
  const escudo=peState.finalShield!=='Não Especificado'?peState.finalShield:peState.shieldCalc;
  let relatorio=`RELATÓRIO CLÍNICO — PESQUISA EMOCIONAL\n${'='.repeat(60)}\nData: ${data}\nPaciente: ${peState.patientName}\n\n`;
  if (peState.path===1) {
    relatorio+=`MÉTODO: AVALIAÇÃO DE PADRÕES CONSCIENTES\n${'-'.repeat(40)}\n`;
    [['desp','Desproteção'],['desv','Desvalorização'],['impo','Impotência'],['sobr','Sobrevivência'],['perd','Perda']].forEach(([k,n])=>{ const val=document.getElementById(`pe-sel-${k}`)?.value||'0'; relatorio+=`• ${n}: ${val}/10\n`; });
    relatorio+=`\nEscudo Predominante — [${peState.shieldCalc}]\nFecho Diagnóstico: ${escudo}\n`;
    relatorio+=peLinhaEpoca();
    const notas=document.getElementById('pe-notas-path1')?.value?.trim();
    if (notas) relatorio+=`\nNotas Clínicas:\n${notas}\n`;
  } else if (peState.path===3) {
    relatorio+=`MÉTODO: ESTRESSORES ATIVOS E GATILHOS\n${'-'.repeat(40)}\n`;
    [['1','Convívio perturbador'],['2','Ação gatilho'],['3','Sintoma'],['4','Passado'],['5','Raiz']].forEach(([n,q])=>{ const val=document.getElementById(`pe-p3-${n}`)?.value?.trim()||''; if(val)relatorio+=`• ${q}: ${val}\n`; });
    relatorio+=`\nFecho Diagnóstico: ${escudo}\n`;
    relatorio+=peLinhaEpoca();
  } else {
    relatorio+=`MÉTODO: MAPEAMENTO SUBCONSCIENTE VISUAL\n${'-'.repeat(40)}\n`;
    peState.quadrants.forEach(q=>{
      const qData=peState.mappingData[q.val];
      if (!qData) return;
      if (qData.visitada===false) return;
      relatorio+=`\n[ ${q.val.toUpperCase()} ]\nSignificado: ${q.desc}\n\nPONTOS DETETADOS:\n`;
      let hasPoints=false;
      qData.categories.forEach(cat=>{ cat.points.forEach(p=>{ if(qData.selectedPoints.has(p.id)){hasPoints=true;relatorio+=`  — ${p.name} (${p.organ}): ${p.desc}\n`;if(p.r)relatorio+=`    > Reflexão: ${p.r}\n`;} }); });
      if (qData.lateralNotes){hasPoints=true;relatorio+=`  — Varredura Lateral: ${qData.lateralNotes.replace(/\n/g,' ')}\n`;}
      if (qData.lateralMarks&&qData.lateralMarks.length){hasPoints=true;relatorio+=`  — Lateralidade: ${qData.lateralMarks.length} local(is) marcado(s) no mapa.\n`;}
      if (!hasPoints) relatorio+=`  — Nenhum ponto de retenção assinalado.\n`;
      relatorio+=`\nFECHO DESTE EIXO:\n  • Defesa: ${qData.shield}\n  • Gatilho Temporal: ${qData.epoch} (${qData.epochTime||'Sem data'})\n`;
    });
    relatorio+=`\nFECHO FINAL:\n  • Escudo Dominante: ${escudo}\n  • ${peLinhaEpoca().trim()}\n`;
  }
  relatorio+=`\n${'='.repeat(60)}`;
  const receita=document.getElementById('pe-receita')?.value||'';
  if (peState.path===2) { return peEmitirPaciente(relatorio, escudo, data); }
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
window.peAbrirNovaConsulta     = peAbrirNovaConsulta;
window.peFiltrarPacientes      = peFiltrarPacientes;
window.peEscolherPaciente      = peEscolherPaciente;
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
window.peSeguinte = peSeguinte;
window.peAbrirLinks21 = peAbrirLinks21;
window.peGuardarLinks21 = peGuardarLinks21;
window.peRenderPrevia = peRenderPrevia;
window.peNovaConsultaDoHub = peNovaConsultaDoHub;
window.peIniciarTratamento = peIniciarTratamento;
window.peIniciarTratamentoAtual = peIniciarTratamentoAtual;
window.peGravarTratamento = peGravarTratamento;
window.peVerRegisto = peVerRegisto;
window.peVoltarAoPaciente = peVoltarAoPaciente;
window.peEnviarWhatsApp = peEnviarWhatsApp;
window.peEnviarEmail = peEnviarEmail;
window.peState_docTexto = peDocTexto;
window.peAtualizarEpocaFinal = peAtualizarEpocaFinal;
window.peCancelarMapeamento = peCancelarMapeamento;
window.peMostrarZonas = peMostrarZonas;
window.peIniciarZona = peIniciarZona;
window.peAbrirFecho = peAbrirFecho;
window.peAtualizarEpocaZona = peAtualizarEpocaZona;
window.peEscolherEscudoZona = peEscolherEscudoZona;
window.peVoltarAoMapa = peVoltarAoMapa;
window.peConcluirFecho = peConcluirFecho;
window.peToggleEditMapa        = peToggleEditMapa;
window.peNudge                 = peNudge;
window.peNudgeIniciar          = peNudgeIniciar;
window.peNudgeParar            = peNudgeParar;
window.peLimparMarcas          = peLimparMarcas;
window.peDesfazerMovimento     = peDesfazerMovimento;
window.peReporPosicoes         = peReporPosicoes;
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
