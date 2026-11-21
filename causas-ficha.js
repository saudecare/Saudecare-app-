/* Fichas das 40 energias da pesquisa (texto original). Grupo 1: 1 a 10.
   Campos: sinais (como se nota), corpo (corpo subtil mais ligado), chakra, pergunta (tomada de consciência),
   casa (o que a pessoa pode fazer), salmo (sugestão a confirmar pelo terapeuta). */
(function(){
  var F = {
    1:{ sinais:'Cansaço sem explicação, corpo pesado, casa ou quarto "abafados", sono que não repõe. Pode surgir depois de doença, luto ou convívio com ambientes pesados.', corpo:'Etérico', chakra:'Raiz e Plexo Solar',
        pergunta:'Há quanto tempo se sente assim? O que mudou na sua vida, na casa ou nas companhias nessa altura?',
        casa:'Abrir janelas, sal grosso num recipiente no quarto, banho morno com sal, caminhar descalço(a) ao ar livre.', salmo:'Salmo 51 (purificação)' },
    2:{ sinais:'Tudo corria bem e, depois de um elogio exagerado ou de uma visita, começa a correr mal. Cansaço súbito, dor de cabeça, projetos que travam.', corpo:'Etérico e Astral', chakra:'Plexo Solar',
        pergunta:'Há alguém que o(a) admira ou inveja em excesso? Costuma mostrar ou falar muito das suas conquistas?',
        casa:'Falar menos das conquistas antes de se consolidarem, banho de sal grosso, visualizar-se envolvido(a) em luz dourada ao sair de casa.', salmo:'Salmo 91 (proteção)' },
    3:{ sinais:'Sensação de que algo ou alguém trabalha contra si. Problemas que começam de repente em várias áreas ao mesmo tempo. Medo sem razão.', corpo:'Astral e Mental inferior', chakra:'Plexo Solar e Cardíaco',
        pergunta:'Existe alguém com quem tenha terminado mal ou que lhe queira mal? Quando é que sentiu que a sua vida mudou?',
        casa:'Reforçar a rotina de proteção diária, evitar contacto com a pessoa suspeita, não alimentar o medo com conversas e pesquisas na internet.', salmo:'Salmo 35 e Salmo 91' },
    4:{ sinais:'Mal-estar a seguir a discussões ou a ouvir palavras duras. Pensamentos de culpa. Frases como "vais ver" ou "tomara que" que ficaram a ecoar.', corpo:'Astral e Mental inferior', chakra:'Garganta e Plexo Solar',
        pergunta:'Que palavras duras recebeu e ainda lhe ressoam? Que palavras duras já disse a alguém e a que ainda se prende?',
        casa:'Escrever o que ouviu e queimar o papel com segurança, dizer em voz alta "devolvo isto a quem o disse, com amor", perdoar-se pelo que também disse.', salmo:'Salmo 141' },
    5:{ sinais:'Problemas que começam numa data certa e sem lógica: uma relação, o dinheiro, a saúde ou o trabalho. Objetos estranhos em casa ou à porta.', corpo:'Astral', chakra:'Plexo Solar e Raiz',
        pergunta:'Em que data sentiu a mudança? O que estava a acontecer nessa altura? Alguém ficou ressentido consigo?',
        casa:'Registar a data e as circunstâncias, limpar a casa, não mexer em objetos desconhecidos, manter a calma e evitar a culpa.', salmo:'Salmo 91 e Salmo 140' },
    6:{ sinais:'Fases em que tudo cai de uma vez, logo depois de a pessoa ter pedido ou desejado mal a alguém. Culpa escondida, medo de "pagar".', corpo:'Astral e Causal', chakra:'Plexo Solar e Cardíaco',
        pergunta:'Alguma vez desejou, pediu ou fez algo para prejudicar alguém? Está em paz com isso?',
        casa:'Reconhecer com honestidade o que fez, pedir perdão a si e à outra pessoa em oração, e compromisso de não repetir.', salmo:'Salmo 51 e Salmo 32' },
    7:{ sinais:'Pensamentos ou impulsos que não parecem seus, mudanças bruscas de humor, vontade de se isolar, sonhos agitados, arrepios.', corpo:'Astral e Mental inferior', chakra:'Coronário e Plexo Solar',
        pergunta:'Quando começaram esses pensamentos? Houve um luto, um vício, uma doença ou uma separação nessa altura?',
        casa:'Rotina diária, oração de proteção ao deitar, evitar álcool e ambientes pesados, e acompanhamento regular. Em caso de sofrimento forte, falar com o médico.', salmo:'Salmo 23 e Salmo 91' },
    8:{ sinais:'Momentos de "não ser eu", reações fora do carácter e perda de memória do que se fez. Cansaço enorme depois. (Exige cuidado: em caso de doença mental, trabalhar sempre com o médico.)', corpo:'Astral, Mental inferior e Etérico', chakra:'Coronário e Plexo Solar',
        pergunta:'Em que momentos sente que "não é você"? O que aconteceu antes desses momentos?',
        casa:'Acompanhamento regular com o terapeuta e com o médico, sono regular, ambiente calmo, sem álcool nem substâncias.', salmo:'Salmo 91' },
    9:{ sinais:'Hábitos ou vícios que parecem ter vontade própria, raiva ou pensamentos que se repetem, sono agitado, cansaço depois de explosões emocionais.', corpo:'Astral', chakra:'Plexo Solar e Sacral',
        pergunta:'Que emoção se repete mais (raiva, medo, desejo)? Quando é que ela é mais forte durante o dia?',
        casa:'Reconhecer a emoção antes de reagir, respirar fundo 3 vezes, atividade física, e substituir o hábito por outra ação positiva.', salmo:'Salmo 27' },
    10:{ sinais:'Mal-estar súbito ao pensar ou falar com determinada pessoa. Sensação de ser observado(a), aperto no peito, alerta constante.', corpo:'Astral e Mental inferior', chakra:'Plexo Solar e Cardíaco',
        pergunta:'Com que pessoa sente isto? O que existe de mal resolvido entre vocês?',
        casa:'Imaginar uma bolha de luz à sua volta, cortar o diálogo mental com a pessoa, limitar o contacto, e dizer "a minha paz não está disponível para isto".', salmo:'Salmo 91 e Salmo 121' }
  };
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]; }); }
  window.CAUSA_FICHA = F;
  window.causaFichaTem = function(n){ return !!F[n]; };
  /* Bloco para o ℹ️ da lista */
  window.causaFichaInfo = function(n){
    var f = F[n]; if (!f) return '';
    return '<div style="margin-top:4px;"><b>Como se nota:</b> ' + esc(f.sinais) + '</div>' +
      '<div style="margin-top:4px;"><b>Corpo subtil:</b> ' + esc(f.corpo) + ' · <b>Chakra:</b> ' + esc(f.chakra) + '</div>' +
      '<div style="margin-top:4px;"><b>Pergunta para o paciente:</b> ' + esc(f.pergunta) + '</div>' +
      '<div style="margin-top:4px;"><b>Em casa:</b> ' + esc(f.casa) + '</div>' +
      '<div style="margin-top:4px;" class="muted"><b>Salmo (sugestão a confirmar):</b> ' + esc(f.salmo) + '</div>';
  };
  /* Cartão com as fichas das energias detetadas */
  window.causaFichasCard = function(ns, paraRelatorio){
    var l = (ns || []).filter(function(n){ return F[n]; });
    if (!l.length) return '';
    return '<div class="card" style="border-left:4px solid #7c3aed;"><h3>🔎 Energias detetadas — como se notam e o que perguntar</h3>' +
      l.map(function(n){
        var f = F[n], nome = (window.__causaNome && window.__causaNome(n)) || ('Energia ' + n);
        return '<div style="margin:8px 0;padding:8px 10px;background:#faf5ff;border-radius:8px;font-size:.88rem;line-height:1.45;">' +
          '<b>' + n + '. ' + esc(nome) + '</b><br>' + causaFichaInfo(n).replace(/class="muted"/, paraRelatorio ? '' : 'class="muted"') + '</div>';
      }).join('') + '</div>';
  };
})();
