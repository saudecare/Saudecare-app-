# Vindora

Plataforma SaaS multi-tenant para terapeutas e profissionais de bem-estar.
Domínio: **vindora.pt** · Firebase: `saudecare-app` · Alojamento: GitHub Pages

> Este ficheiro é a memória do projecto. Quem chegar aqui de novo — pessoa
> ou assistente — deve lê-lo antes de tocar no código.

---

## Estrutura

| Ficheiro | O que é |
|---|---|
| `saudecare-core.html` | Painel do subscritor autenticado. É o ficheiro principal, com cerca de 12.400 linhas, todo num `<script type="module">`. |
| `saudecare-admin.html` | Painel de administração da plataforma. |
| `reiki-biblioteca.html` | Página do aluno de Reiki. Abre por link pessoal com código, sem conta. |
| `saudecare-portal-paciente.html` | Portal do paciente. |
| `saudecare-pagina-publica.html` | Página pública do terapeuta. |
| `mapa-da-alma.html`, `cartomancia.html`, `triagem-baixa-vibracao.html` | Ferramentas autónomas. |
| `certificado-reiki.png` | Modelo do certificado de Reiki (1346×1920). Não substituir sem refazer as coordenadas. |

Funções serverless estão noutro repositório: **`saudecare/saudecare-claims`**,
na pasta `netlify/functions/`. O `netlify.toml` lê só dessa pasta — um
ficheiro na raiz é ignorado pelo Netlify.

---

## Regras de código

**As funções de um módulo não são globais.** O ficheiro corre em
`<script type="module">`. Uma função declarada com `function foo(){}` não
fica acessível ao HTML. Todo o `onclick="foo()"` exige:

```js
window.foo = function(){ ... };
```

É o erro que mais vezes se repetiu neste projecto.

**Não usar `confirm()` nem `alert()`.** São bloqueados nos browsers
embutidos (o que abre dentro de outra app). O `confirm()` devolve "não"
sem mostrar nada, e o botão parece morto. Usar a caixa própria da app.

**Incrementar `APP_VERSION` a cada entrega.** É como se confirma no rodapé
que a versão certa está publicada.

**Validar antes de publicar:** sintaxe do módulo, handlers expostos a
`window`, IDs duplicados, termos proibidos.

**O raw.githubusercontent serve conteúdo em cache.** Para confirmar o
estado real, usar a API do GitHub ou a listagem do repositório.

---

## Regras do Firestore

As regras vivem na consola do Firebase, não aqui. Quando forem alteradas,
**entregar sempre o ficheiro completo**, nunca só o trecho novo — o
ficheiro é substituído por inteiro na consola.

Console: `https://console.firebase.google.com/project/saudecare-app/firestore/rules`

---

## Escola de Reiki

Módulo dentro do `saudecare-core.html`, visível apenas no tenant
`hikari-terapias`. Separadores: **Alunos, Níveis, Biblioteca, Turmas, Testes**.

### Níveis e o que habilitam

| Nível | Nome | Habilita |
|---|---|---|
| 1 | Shoden | Uso próprio. Recebe o Cho Ku Rei. |
| 2 | Okuden | Uso próprio e aplicação a outras pessoas, incluindo à distância. |
| 3A | Shinpiden | Trabalhar como terapeuta de Reiki. |
| 3B | Shinpiden | Mestre: dá formação e sintoniza. |

Só o 3B sintoniza. O acesso aos materiais é **cumulativo**: quem está no 3B
vê tudo o que está abaixo. O nível `0` é visível a todos.

### Linhagem

Níveis 1, 2 e 3A em **Reiki Tradicional / Usui Reiki Ryoho**.
Nível 3B em **Reiki Essencial / Usui Shiki Ryoho**, de onde vêm dois
símbolos que não pertencem ao núcleo Usui e só se ensinam no 3B: o Dai Ko
Myo tibetano e o Raku.

### Colecções Firestore

```
tenants/{tenantId}/reikiStudents/{id}      alunos e percurso
tenants/{tenantId}/reikiConfig/{nivel}     descrições editáveis dos níveis
tenants/{tenantId}/reikiLibrary/{id}       materiais (links do Drive)
tenants/{tenantId}/reikiClasses/{id}       turmas + links WhatsApp e Jitsi
tenants/{tenantId}/reikiAccess/{codigo}    cartão de acesso do aluno
tenants/{tenantId}/reikiQuizzes/{id}       testes
tenants/{tenantId}/reikiQuizResults/{id}   entregas (só criar, nunca alterar)
```

O `reikiAccess` permite `get` mas não `list`: só abre quem souber o código
exacto, e ninguém consegue percorrer a lista de alunos.

### Decisões de arquitectura

**Os alunos não têm conta.** Acedem por link pessoal com código:
`reiki-biblioteca.html?t=hikari-terapias&c=CODIGO`

**O projecto fica no plano Spark, sem Firebase Storage.** Por isso:

- Materiais em PDF → Google Drive, partilhados como "qualquer pessoa com o link"
- Vídeos → YouTube não listado (o Drive é lento a abrir vídeo no telemóvel)
- Comunidade → grupos de WhatsApp, um por turma
- Encontros ao vivo → salas Jitsi, com nome difícil de adivinhar

Só se aceitam links de convite de grupo (`chat.whatsapp.com`), nunca
conversas individuais — para o número pessoal não ir parar à página de um
aluno.

---

## Limites de conteúdo

- Manuais da Associação Portuguesa de Reiki e apontamentos da Prof.ª Vera
  de Melo são obra de terceiros. **Não podem ser copiados nem adaptados.**
  Tudo o que entra nos manuais da escola é escrito de raiz.
- Reiki e terapias são **sempre complementares**. Nunca substituem
  acompanhamento médico, e isso tem de estar escrito em todo o material.
- Os símbolos tradicionais e a fotografia histórica de Mikao Usui são de
  uso livre.

---

## Por fazer

1. Percurso interativo por módulos: ler → praticar → responder, com
   encontro ao vivo a fechar cada módulo
2. As 145 perguntas dos testes (6 módulos por nível)
3. Multilíngua no portal do paciente
4. Permissões delegadas de gestão de marcações
5. Visual do admin organizado por categorias
6. Formação de radiestesia cabalística (método próprio, por escrever)
