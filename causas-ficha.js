/* Fichas das 40 energias da pesquisa (texto original). Todas as 40 energias.
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
        casa:'Imaginar uma bolha de luz à sua volta, cortar o diálogo mental com a pessoa, limitar o contacto, e dizer "a minha paz não está disponível para isto".', salmo:'Salmo 91 e Salmo 121' },
    11:{ sinais:'Peso, picada ou pressão num ponto do corpo sem causa física. Sensação de ter "algo" lá dentro que drena ou condiciona. Pode surgir depois de cirurgias, acidentes ou trabalhos espirituais.', corpo:'Etérico e Astral', chakra:'Chakra da zona afetada',
        pergunta:'Desde quando sente isto naquele ponto? O que aconteceu na sua vida nessa altura?',
        casa:'Respirar para essa zona com a mão em cima, banhos de sal, beber água, e dizer em voz alta que só aceita o que é seu e é luz.', salmo:'Salmo 51 e Salmo 91' },
    12:{ sinais:'Sensação de ser vigiado(a) ou influenciado(a) à distância. Dificuldade em sentir os pensamentos como seus. Cabeça sempre ligada. (Se houver ideias persecutórias fortes, orientar para o médico.)', corpo:'Mental inferior e Astral', chakra:'Frontal e Coronário',
        pergunta:'Em que momentos sente mais essa vigilância? Consegue ter momentos de silêncio sem esse pensamento?',
        casa:'Silêncio e respiração lenta 10 minutos por dia, menos ecrãs à noite, caminhar na natureza, e falar com o médico se o medo for forte.', salmo:'Salmo 23 e Salmo 121' },
    13:{ sinais:'Insónia, irritação, dor de cabeça ou cansaço que pioram sempre no mesmo quarto ou perto de aparelhos. Melhoram fora de casa.', corpo:'Etérico', chakra:'Coronário e Frontal',
        pergunta:'Em que zona da casa dorme pior? Há aparelhos, router ou carregadores junto à cama?',
        casa:'Tirar telemóvel e aparelhos do quarto, desligar o wifi à noite, afastar a cama de quadros elétricos, e arejar o espaço.', salmo:'Salmo 4 (descanso)' },
    14:{ sinais:'Sono mau ou queixas que se repetem sempre no mesmo local, mesmo mudando de colchão. Plantas ou animais que fogem ou secam num certo sítio.', corpo:'Etérico', chakra:'Raiz',
        pergunta:'O problema aparece em que divisão da casa ou do trabalho? Quando começou a viver ali?',
        casa:'Mudar a cama de sítio, testar dormir noutro quarto uma semana, e, se persistir, pedir avaliação do local a um especialista.', salmo:'Salmo 24' },
    15:{ sinais:'Exaustão depois de estar com certa pessoa, mesmo sem conflito. Sensação de ligação antiga e inexplicável, e padrões que se repetem em várias relações.', corpo:'Astral e Causal', chakra:'Cardíaco e Plexo Solar',
        pergunta:'Que pessoa lhe vem à cabeça? O que sente no corpo quando pensa nela?',
        casa:'Imaginar um fio de luz entre os dois e, com respeito, agradecer e soltar. Escrever uma carta que não se envia.', salmo:'Salmo 130' },
    16:{ sinais:'Permanece numa relação que já não quer e não consegue explicar porque não sai. Pensamento fixo na pessoa, apesar de sofrer.', corpo:'Astral e Mental inferior', chakra:'Sacral e Cardíaco',
        pergunta:'Se não tivesse medo nem culpa, o que faria nesta relação? O que a prende a ela?',
        casa:'Reforçar a vida própria (amigos, rotina, atividades), reduzir o contacto e escrever, todos os dias, uma coisa que é só sua.', salmo:'Salmo 25' },
    17:{ sinais:'Fica sem energia depois de falar ou estar com certa pessoa. Faz tudo para agradar e sente-se esvaziado(a).', corpo:'Astral e Etérico', chakra:'Plexo Solar',
        pergunta:'Quem lhe tira energia? O que é que dá a essa pessoa que não consegue negar?',
        casa:'Treinar dizer "não" com calma, limitar o tempo de contacto, e depois de estar com ela lavar as mãos e respirar fundo.', salmo:'Salmo 27' },
    18:{ sinais:'Repete o mesmo problema que viu na mãe, no pai ou nos avós (dinheiro, saúde, relações). Sente um peso que vem de trás.', corpo:'Causal e Etérico', chakra:'Raiz',
        pergunta:'Que problema se repete na sua família? O que costumavam dizer sobre isso em casa?',
        casa:'Fazer a árvore genealógica com o que sabe, agradecer aos antepassados e dizer "devolvo o que não é meu e fico com o que me serve".', salmo:'Salmo 103' },
    19:{ sinais:'Tragédias ou doenças repetidas em várias gerações. Frases na família como "connosco é sempre assim". (Textos devem ser tratados com cuidado e sem alarmar.)', corpo:'Causal e Astral', chakra:'Raiz e Coronário',
        pergunta:'Que acontecimentos se repetem na sua família? Conhece alguma história por trás?',
        casa:'Oração pela linhagem, acender uma vela pelos antepassados e quebrar a frase "connosco é sempre assim" com uma intenção nova.', salmo:'Salmo 91 e Salmo 103' },
    20:{ sinais:'Ciclos que se repetem: relações parecidas, empregos que acabam da mesma forma, doenças ou separações na mesma idade dos pais.', corpo:'Mental inferior e Causal', chakra:'Raiz e Plexo Solar',
        pergunta:'Que padrão reconhece nos seus pais e em si? Em que idade costuma acontecer?',
        casa:'Escolher uma ação diferente da dos pais da próxima vez que o padrão aparecer, e registar o que mudou.', salmo:'Salmo 90' },
    21:{ sinais:'Medos, atrações ou bloqueios sem origem nesta vida. Ligação forte a épocas, lugares ou pessoas que acabou de conhecer. Padrões que se repetem desde sempre.', corpo:'Causal e Búdico', chakra:'Coronário e Cardíaco',
        pergunta:'Que medo ou atração tem que não consegue explicar com a sua história? Desde quando existe?',
        casa:'Meditação curta diária, diário de sonhos e intuições, e agradecer à lição em vez de lutar contra o padrão.', salmo:'Salmo 139' },
    22:{ sinais:'Dinheiro que "foge" sempre, culpa ao ter ou ganhar mais, sentir que ter é errado ou pouco espiritual, e vergonha de cobrar.', corpo:'Causal e Mental superior', chakra:'Raiz',
        pergunta:'O que pensa de quem tem dinheiro? Sente que merece receber pelo que faz?',
        casa:'Cobrar com clareza, agradecer cada valor recebido e repetir "posso ter abundância e continuar a ser bom(boa) pessoa".', salmo:'Salmo 23 e Salmo 34' },
    23:{ sinais:'Dificuldade em manter relações íntimas, medo de se entregar, sensação de que está destinado(a) a ficar só, frieza afetiva ou afastamento do corpo.', corpo:'Causal e Astral', chakra:'Sacral e Cardíaco',
        pergunta:'O que sente quando alguém se aproxima demais? Em que momento sentiu que ficar só era mais seguro?',
        casa:'Pequenos gestos de aproximação com pessoas de confiança, autocuidado do corpo e escrever o que deseja numa relação.', salmo:'Salmo 25 e Salmo 139' },
    24:{ sinais:'Dificuldade em dizer o que sente ou em se expressar, garganta presa, medo de falar em público, e sensação de que não vale a pena falar.', corpo:'Causal e Astral', chakra:'Garganta',
        pergunta:'O que nunca disse e gostaria de dizer? Quem nunca o(a) deixou falar?',
        casa:'Cantar ou trautear 5 minutos por dia, escrever o que não diz, dizer uma frase verdadeira por dia a alguém seguro.', salmo:'Salmo 51 e Salmo 100' },
    25:{ sinais:'Dependência de uma pessoa, de uma substância ou de aprovação. Sente que sozinho(a) não consegue, e que precisa de ser salvo(a) ou de salvar.', corpo:'Causal e Astral', chakra:'Plexo Solar e Sacral',
        pergunta:'De que ou de quem sente que não consegue viver sem? O que faria se fosse livre?',
        casa:'Pequenas tarefas feitas a sós que reforcem a autonomia, apoio de grupo ou profissional quando há dependência, e paciência.', salmo:'Salmo 121' },
    26:{ sinais:'Emoções guardadas há muito tempo, raiva que "explode do nada", corpo tenso, dores nas costas e no pescoço, e dificuldade em chorar.', corpo:'Astral e Etérico', chakra:'Plexo Solar e Cardíaco',
        pergunta:'Que emoção engoliu durante anos? Em que situação sentiu que não podia reagir?',
        casa:'Escrever sem filtro e rasgar o papel, caminhar a passo rápido, chorar sem culpa, e falar com um psicólogo se for muito pesado.', salmo:'Salmo 42' },
    27:{ sinais:'Acontecimento que ainda dói quando recordado. Sobressaltos, evitar certos sítios ou pessoas, pesadelos, e sensação de reviver. (Sofrimento forte pede também apoio psicológico.)', corpo:'Astral e Etérico', chakra:'Raiz e Plexo Solar',
        pergunta:'Que momento da sua vida gostaria de apagar? Já conseguiu falar dele com alguém?',
        casa:'Falar do que aconteceu com alguém de confiança ou com um psicólogo, respiração lenta e rotina de sono regular.', salmo:'Salmo 23 e Salmo 34' },
    28:{ sinais:'Pensamentos como "não consigo", "não mereço" ou "vai correr mal". Desiste perto do fim, adia, e critica-se mais do que aos outros.', corpo:'Mental inferior', chakra:'Frontal e Plexo Solar',
        pergunta:'Que frase repete a si mesmo(a) quando falha? A quem pertencia essa voz primeiro?',
        casa:'Anotar o pensamento, escrever uma frase verdadeira e gentil em troca, e celebrar pequenas vitórias todos os dias.', salmo:'Salmo 139' },
    29:{ sinais:'Sente que não merece coisas boas, pede desculpa por tudo, aceita o que lhe fazem de mal, ou castiga-se sem saber porquê.', corpo:'Mental inferior e Causal', chakra:'Plexo Solar e Cardíaco',
        pergunta:'Do que se culpa que talvez já pudesse perdoar? A quem deve um perdão, ou a si próprio(a)?',
        casa:'Carta de perdão a si mesmo(a), pequenos atos de reparação possível e repetir "fiz o que sabia na altura".', salmo:'Salmo 32 e Salmo 51' },
    30:{ sinais:'Medo que paralisa: de mudar, de falhar, de ficar sozinho(a), de morrer. Aperto no estômago, adiar decisões, evitar. (Se for intenso, procurar apoio psicológico.)', corpo:'Astral e Etérico', chakra:'Raiz e Plexo Solar',
        pergunta:'O que teria coragem de fazer se este medo desaparecesse? Quando apareceu pela primeira vez?',
        casa:'Dar um passo mínimo por dia, respiração 4-6, andar descalço(a) e contar a alguém de confiança.', salmo:'Salmo 27 e Salmo 56' },
    31:{ sinais:'Agitação interior sem motivo, coração acelerado, mente que não pára, pernas inquietas, sono leve. (Se for frequente, acompanhar também com o médico.)', corpo:'Astral e Etérico', chakra:'Plexo Solar e Cardíaco',
        pergunta:'Quando é que o corpo está mais acelerado? O que está à espera que aconteça?',
        casa:'Respiração lenta 5 minutos duas vezes por dia, menos cafeína, caminhar e escrever as preocupações à noite.', salmo:'Salmo 4 e Salmo 121' },
    32:{ sinais:'Reações do corpo desproporcionadas a certos cheiros, sons ou toques, medo sem história aparente, dores sem causa física, ou algo que vem da família.', corpo:'Etérico e Astral', chakra:'Raiz',
        pergunta:'Que situação o corpo parece lembrar mesmo quando a cabeça não lembra? Na família alguém passou por algo semelhante?',
        casa:'Movimento suave (yoga, alongar, dança), banhos mornos, toque amigo no corpo e escuta sem pressa.', salmo:'Salmo 139' },
    33:{ sinais:'Pesadume depois de multidões, notícias, grupos ou ambientes de queixa. Sentir-se arrastado(a) por ideias do grupo, família ou trabalho.', corpo:'Mental inferior e Astral', chakra:'Plexo Solar e Frontal',
        pergunta:'Que grupo ou ambiente o(a) deixa sempre pior? Que ideias dele tomou como suas?',
        casa:'Reduzir notícias e redes sociais, escolher companhias, e rezar ou meditar antes de entrar em ambientes pesados.', salmo:'Salmo 1 e Salmo 91' },
    34:{ sinais:'Sente que "parte de si ficou para trás", distração, dificuldade em sentir alegria, estar no corpo, ou lembrar-se de partes da vida. Após choques ou perdas.', corpo:'Todos, em especial Astral e Causal', chakra:'Coronário e Raiz',
        pergunta:'Em que momento sentiu que parte de si ficou para trás? O que gostaria de recuperar?',
        casa:'Atividades que o(a) tragam ao corpo (caminhar, cozinhar, tocar na terra), rituais de gratidão e rotina estável.', salmo:'Salmo 23 e Salmo 139' },
    35:{ sinais:'Pesadelos, sonhos com presenças, acordar cansado(a) ou com medo, paralisia ao dormir, sonhos de queda ou perseguição.', corpo:'Astral', chakra:'Frontal e Coronário',
        pergunta:'Que sonhos se repetem? Como se sente ao deitar?',
        casa:'Orar ou agradecer antes de dormir, quarto arejado e sem ecrãs, sal grosso no canto do quarto, e anotar os sonhos.', salmo:'Salmo 4 e Salmo 91' },
    36:{ sinais:'Absorve o estado de quem está perto, cansa-se em locais cheios, sente emoções que não são suas, e tem dificuldade em dizer não.', corpo:'Astral e Etérico', chakra:'Cardíaco e Plexo Solar',
        pergunta:'Em que lugares ou com que pessoas se sente a absorver o que é dos outros?',
        casa:'Lavar mãos e rosto depois de contactos intensos, pausas a sós, e imaginar uma bolha de luz à volta de si.', salmo:'Salmo 91' },
    37:{ sinais:'Cansaço duradouro apesar de dormir e de exames normais. Sem vontade, sem "fogo". (Convém excluir antes causas físicas com o médico.)', corpo:'Etérico', chakra:'Raiz e Plexo Solar',
        pergunta:'O que lhe dá energia e o que lha tira? Há quanto tempo não faz algo só por prazer?',
        casa:'Exames de rotina, sono regular, sol de manhã, alimentação simples, movimento leve e pausas reais.', salmo:'Salmo 121' },
    38:{ sinais:'Ganha e perde, trabalha muito e não prospera, frases da família como "o dinheiro é sujo" ou "quem tem não é feliz".', corpo:'Mental inferior e Causal', chakra:'Raiz e Plexo Solar',
        pergunta:'O que ouviu em criança sobre dinheiro? Que crença mantém por lealdade à família?',
        casa:'Escrever as frases ouvidas e trocá-las por frases verdadeiras, organizar as contas e agradecer o que já tem.', salmo:'Salmo 23 e Salmo 112' },
    39:{ sinais:'Perto do sucesso, atrasa, desiste ou estraga. Medo de brilhar, de ser invejado(a) ou de mudar de nível.', corpo:'Mental inferior e Astral', chakra:'Plexo Solar e Garganta',
        pergunta:'O que perderia se tivesse sucesso? Quem poderia ficar chateado consigo?',
        casa:'Dividir metas em passos pequenos, partilhar vitórias com gente segura e imaginar o sucesso sem culpa.', salmo:'Salmo 27 e Salmo 37' },
    40:{ sinais:'Ideias que não saem do papel, bloqueio de criar, projetos parados. Também dificuldade em conceber (apenas se não houver causa médica).', corpo:'Etérico e Astral', chakra:'Sacral',
        pergunta:'O que gostaria de criar ou gerar? O que o(a) impede de começar?',
        casa:'Criar sem fim útil (desenhar, cozinhar, dançar), tempo livre semanal e, em fertilidade, acompanhamento médico.', salmo:'Salmo 113 e Salmo 127' }
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
