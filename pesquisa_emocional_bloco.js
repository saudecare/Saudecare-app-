// ╔══════════════════════════════════════════════════════════════════╗
// ║  MÓDULO: PESQUISA EMOCIONAL CLÍNICA                              ║
// ║  Adicionar este bloco ao final do <script> em saudecare-core.html║
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
    {id:'f2e',name:'Útero / Próstata Esquerdo',x:85,y:230,organ:'Útero/Próst
