# Vindora

Plataforma SaaS multi-tenant para terapeutas e profissionais de bem-estar.
Domínio: **vindora.pt** · Firebase: `saudecare-app` · Alojamento: GitHub Pages

> Este ficheiro é a memória do projecto. Quem chegar aqui de novo — pessoa
> ou assistente — deve lê-lo antes de tocar no código.

**Autor:** Hikari Fafe (Ricardo Correia), Fafe, Portugal. Terapeuta e Mestre
de Reiki. Sem experiência de programação: todo o código é escrito e validado
com assistência, e os ficheiros são editados directamente no GitHub, pelo
telemóvel.

---

## Estrutura

| Ficheiro | O que é |
|---|---|
| `saudecare-core.html` | Painel do subscritor autenticado. Ficheiro principal, ~12.600 linhas, todo num `<script type="module">`. |
| `saudecare-admin.html` | Painel de administração da plataforma. |
| `reiki-biblioteca.html` | Sala de Estudo do aluno de Reiki. Abre por link pessoal com código, sem conta. |
| `saudecare-portal-paciente.html` | Portal do paciente. |
| `saudecare-pagina-publica.html` | Página pública do terapeuta. |
| `mapa-da-alma.html` | Ferramenta de numerologia. Tem modo público e modo interno. |
| `cartomancia.html` | Leitura de cartas. |
| `triagem-baixa-vibracao.html` | Triagem com pêndulo hebraico. |
| `certificado-reiki.png` | Modelo do certificado (1346×1920). Não substituir sem refazer as coordenadas. |

Funções serverless noutro repositório: **`saudecare/saudecare-claims`**, na
pasta `netlify/functions/`. O `netlify.toml` lê só dessa pasta — um ficheiro
na raiz é ignorado pelo Netlify.

---

## Regras de código

**As funções de um módulo não são globais.** O ficheiro corre em
`<script type="module">`. Uma função declarada com `function foo(){}` não
fica acessível ao HTML. Todo o `onclick="foo()"` exige:

```js
window.foo = function(){ ... };
```

É o erro que mais vezes se repetiu neste projecto.

**Não usar `confirm()` nem `alert()`** no painel. São bloqueados nos browsers
embutidos: o `confirm()` devolve "não" sem mostrar nada e o botão parece
morto. Usar a caixa própria (`reikiConfirmar` e equivalentes).

**Nunca carregar várias colecções com um `Promise.all` cru.** Se uma falhar
por permissões, cai o módulo inteiro. Ler cada colecção à parte, com `try`,
devolvendo um objecto vazio em caso de falha. Já aconteceu e partiu o módulo
dos alunos.

**Incrementar `APP_VERSION` a cada entrega.** É como se confirma no rodapé
que a versão certa está publicada.

**Validar antes de publicar:** sintaxe do módulo, handlers expostos a
`window`, IDs duplicados, termos proibidos.

**O raw.githubusercontent serve conteúdo em cache.** Para ver o estado real,
usar a API do GitHub ou a listagem do repositório.

**Entregas:** sempre o ficheiro completo, com link para descarregar, e o
código também colado no chat pronto a copiar.

---

## Regras do Firestore

Vivem na consola do Firebase, não no repositório. Quando mudarem,
**entregar sempre o ficheiro completo**, nunca só o trecho novo.

`https://console.firebase.google.com/project/saudecare-app/firestore/rules`

---

## Escola de Reiki

Módulo dentro do `saudecare-core.html`, visível apenas no tenant
`hikari-terapias`. Separadores: **Alunos, Níveis, Biblioteca, Turmas,
Testes, Mensagens**.

### Níveis

| Nível | Nome | Habilita |
|---|---|---|
| 1 | Shoden | Uso próprio. Recebe o Cho Ku Rei. |
| 2 | Okuden | Uso próprio e aplicação a outras pessoas, incluindo à distância. |
| 3A | Shinpiden | Trabalhar como terapeuta de Reiki. |
| 3B | Shinpiden | Mestre: dá formação e sintoniza. |

Só o 3B sintoniza. Sem prazo fixo entre níveis: conta o ritmo do aluno e o
trabalho entregue.

**Linhagem:** níveis 1, 2 e 3A em Reiki Tradicional / Usui Reiki Ryoho;
nível 3B em Reiki Essencial / Usui Shiki Ryoho, de onde vêm o Dai Ko Myo
tibetano e o Raku, que só se ensinam no 3B.

**O Cho Ku Rei é ensinado já no Nível 1**, contra a prática mais comum. A
razão é do Mestre: a energia de hoje está mais densa e o aluno deve ter
logo uma ferramenta que funcione.

**Os cinco princípios recitam-se na forma afirmativa:** «Só por hoje, sou
calmo, confio, sou grato, trabalho honestamente, sou bondoso». Não na forma
negativa.

**No Nível 1 a regra é uso próprio.** Se surgir necessidade, admite-se a
família de casa e os animais. Mais ninguém, e nunca cobrando.

### Níveis: concluído vs em estudo

Distinção importante, e origem de um bug já corrigido:

- `nivelAtual` no documento do aluno = nível **concluído** (com certificado).
  Um aluno novo tem `null`.
- O **nível em estudo** é o seguinte ao concluído. Aluno novo estuda o Nível 1.

Regra de visibilidade:
- **Materiais**: cumulativos até ao nível em estudo. Nível `0` = todos.
- **Testes**: só os do nível em estudo. Não são cumulativos.

### Colecções Firestore

```
tenants/{t}/reikiStudents/{id}               alunos e percurso
tenants/{t}/reikiConfig/{nivel}              descrições editáveis dos níveis
tenants/{t}/reikiLibrary/{id}                materiais (links do Drive)
tenants/{t}/reikiClasses/{id}                turmas + links WhatsApp e Jitsi
tenants/{t}/reikiAccess/{codigo}             cartão de acesso + notas do aluno
tenants/{t}/reikiQuizzes/{id}                testes
tenants/{t}/reikiQuizResults/{id}            entregas (só criar, nunca alterar)
tenants/{t}/reikiThreads/{codigo}/mensagens  conversa privada Mestre-aluno
tenants/{t}/reikiChat/{sala}/mensagens       salas de grupo (geral, nivel-1…)
```

`reikiAccess` permite `get` mas não `list`: só abre quem souber o código
exacto, e ninguém percorre a lista de alunos.

### Sala de Estudo (`reiki-biblioteca.html`)

Link pessoal: `reiki-biblioteca.html?t=hikari-terapias&c=CODIGO`

Cinco secções com barra de navegação em baixo: **Início** (progresso e
turma), **Estudo** (materiais), **Testes**, **Mestre** (conversa privada),
**Conversa** (sala geral e sala do nível).

### Arquitectura sem custos

Fica no plano **Spark**, sem Firebase Storage:

- Materiais em PDF → Google Drive, link partilhado
- Vídeos → YouTube **não listado** (o Drive é lento a abrir vídeo no telemóvel)
- Comunidade → grupos de WhatsApp, um por turma
- Encontros ao vivo → salas Jitsi com nome difícil de adivinhar

Só se aceitam links de convite de grupo (`chat.whatsapp.com`), nunca
conversas individuais.

### Método de ensino pretendido

Não é "mais uma app". É um método próprio: simples, bem explicado, lúdico,
com sentido de família — **"a família Reiki Hikari Fafe"** — em que os
alunos continuam ligados depois de terminarem.

Desenho acordado, ainda por construir:

- Cada módulo tem três partes: **ler** (2-3 páginas) → **praticar** (botão de
  feito e três linhas do que sentiu) → **responder** (3-4 perguntas de treino
  com explicação na hora, que não reprovam mas ficam registadas)
- O Mestre vê o que o aluno não vê: percentagem de acerto, práticas feitas,
  tempo entre módulos
- Barra de progresso por nível; o teste final só abre depois dos seis módulos
- Certificado automático **mediante aprovação do Mestre**
- Ritmo real: uma aula ao vivo por semana ou de 15 em 15 dias, mais vídeos
  curtos de 3 a 5 minutos. Cada módulo fecha num encontro ao vivo — é a data
  marcada que evita o abandono

---

## Mapa da Alma e Cartomancia

Ambos exclusivos do tenant `hikari-terapias`, com bloqueio real no código.

**Mapa da Alma** tem dois caminhos:
- **Público**: cliente entra pela página, vê a parte gratuita, paga, e o
  Mestre confirma o pagamento no painel
- **Interno**: `mapa-da-alma.html?interno=1`, aberto a partir do botão
  "Novo mapa para cliente". Para quem é atendido presencialmente ou por
  telefone. Grava já como pago (`paymentMethod: 'presencial'`,
  `origem: 'interno'`) e mostra o mapa completo de imediato

**Cartomancia** já tinha separador **Nova** para leituras presenciais, com
cartas sorteadas na app ou introduzidas do baralho físico.

---

## Limites de conteúdo

- Manuais da Associação Portuguesa de Reiki e apontamentos da Prof.ª Vera de
  Melo são obra de terceiros. **Não podem ser copiados nem adaptados.** Tudo
  o que entra nos materiais da escola é escrito de raiz.
- Nunca usar os termos "Regiane Cunha" nem "padrão ouro".
- Não descarregar imagens da internet nem desenhar símbolos: as imagens são
  inseridas à mão pelo Mestre.
- Reiki e terapias são **sempre complementares**. Nunca substituem
  acompanhamento médico, e isso tem de constar em todo o material.

---

## Material já escrito (fora do repositório)

Quatro manuais em PDF, escritos de raiz, com a marca Hikari Fafe: níveis 1,
2, 3A e 3B. Mais um plano de avaliação que divide cada nível em seis
módulos — 47 perguntas no Nível 1, 50 no Nível 2, 48 no 3A, 145 ao todo com
os testes globais. Guardados no Google Drive do Mestre.

---

## Por fazer, por ordem

1. **Painel de materiais por níveis e categorias.** Um botão por nível,
   categorias e subcategorias lá dentro, ordem editável (mover para cima e
   para baixo), criar e remover. É a estrutura onde tudo o resto assenta.
2. **Conteúdo das lições dentro da app**, escrito de raiz e editável pelo
   Mestre, com sítio para ele meter imagens e símbolos.
3. **Banco de perguntas** (as 145 do plano), e a partir dele quizes
   aleatórios e desafios na Sala de Estudo.
4. **Percurso interativo por módulos** (ler → praticar → responder).
5. Multilíngua no portal do paciente — há subscritores na Alemanha, Suíça e
   França que atendem online.
6. Permissões delegadas de gestão de marcações.
7. Visual do admin organizado por categorias, estilo app de telemóvel.
8. Formação de radiestesia cabalística: método próprio do Mestre, que junta
   o pêndulo hebraico ao comum, com um método de pesquisa numerado.
   **Bloqueado** — o método ainda não está escrito.
