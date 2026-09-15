# Blog da Turma — Tech Challenge Fase 03

Este repositório é a entrega do meu Tech Challenge da Fase 03 da pós-graduação.
O desafio pedia uma interface web para o blog da turma, então construí uma SPA
em React onde professores(as) publicam, editam e removam posts, e estudantes
leem o conteúdo e deixam comentários.

O projeto está dividido em dois pacotes independentes:

- `backend/` — API REST em Node.js/Express (posts, comentários e login de
  professores). Implementei esse serviço como um mock local para poder
  desenvolver e demonstrar o front-end de ponta a ponta sem depender da API
  da fase anterior, mas mantendo os mesmos contratos de endpoint.
- `frontend/` — o foco principal desta entrega: uma SPA em React + TypeScript
  que consome essa API. É sobre ela que detalho a documentação abaixo.

## Arquitetura geral

```
                 ┌────────────────────┐        ┌───────────────────────┐
                 │   frontend (SPA)   │  REST  │   backend (Express)   │
  usuário  ───▶  │  React + Router +  │ ─────▶ │  posts / comentários / │
                 │  styled-components │ ◀───── │  auth (JWT)            │
                 └────────────────────┘        └───────────────────────┘
```

Optei por não manter nenhum estado de negócio dentro do front-end: tudo é
buscado da API via `axios`. A autenticação usa um token JWT guardado no
`localStorage` e injetado automaticamente em toda requisição por um
interceptor. As rotas que exigem login (criar post, editar post, área
administrativa) ficam atrás de um componente `ProtectedRoute`, que redireciona
para `/login` quando não há sessão ativa.

Para o gerenciamento de estado, usei apenas hooks nativos do React
(`useState`/`useEffect`) dentro de cada página, mais um `AuthContext` global
para os dados de sessão. Decidi não trazer Redux ou outra lib de estado global
porque o escopo do desafio não justificava essa complexidade extra.

## Front-end

### Stack que usei

| Camada             | Tecnologia                          |
|--------------------|--------------------------------------|
| Build/dev server   | Vite 8                               |
| Linguagem          | TypeScript 6                         |
| UI                 | React 19                             |
| Roteamento         | React Router 7 (`BrowserRouter`)     |
| Estilização        | styled-components 6 (CSS-in-JS)      |
| Requisições HTTP   | axios                                |
| Lint               | oxlint                               |

Escolhi Vite pelo tempo de start/HMR e por não precisar configurar nada além
do plugin do React. Fui de styled-components em vez de um framework de UI
pronto porque o desafio tinha poucas telas e eu queria controlar o design
sem carregar uma lib de componentes inteira.

### Estrutura de pastas

```
frontend/src/
├── api/          # client axios (interceptor de auth) + funções de chamada (posts, auth)
├── components/   # componentes reutilizáveis: Header, PostCard, PostForm,
│                 # SearchBar, ProtectedRoute e os primitivos de UI (ui.ts)
├── context/      # AuthContext — sessão do usuário logado
├── pages/        # uma página por rota (list, read, create, edit, login, admin, 404)
├── styles/       # tema (cores, raio, largura máxima) e GlobalStyle
└── types/        # interfaces TypeScript compartilhadas (Post, Comment, AuthUser...)
```

Segui esse recorte por camada (e não por feature) porque o projeto é pequeno
o bastante para não precisar de pastas por domínio — assim fica fácil achar
"onde mexer" em cada tipo de arquivo.

### Como organizei a aplicação (`main.tsx` → `App.tsx`)

O ponto de entrada (`src/main.tsx`) monta os providers que a aplicação inteira
precisa, nesta ordem:

```tsx
<ThemeProvider theme={theme}>       {/* tema do styled-components */}
  <GlobalStyle />                    {/* reset + estilos globais */}
  <BrowserRouter>
    <AuthProvider>                   {/* sessão do usuário */}
      <App />
    </AuthProvider>
  </BrowserRouter>
</ThemeProvider>
```

Dentro de `App.tsx` ficam só o `Header` (fixo em todas as páginas) e as
`Routes`:

| Rota                  | Página             | Protegida? |
|-----------------------|---------------------|:----------:|
| `/`                   | `PostListPage`      | não        |
| `/posts/:id`          | `PostReadPage`      | não        |
| `/login`              | `LoginPage`         | não        |
| `/posts/novo`         | `PostCreatePage`    | sim        |
| `/posts/:id/editar`   | `PostEditPage`      | sim        |
| `/admin`              | `AdminPage`         | sim        |
| `*`                   | `NotFoundPage`      | não        |

As rotas protegidas são embrulhadas em `<ProtectedRoute>`, que eu implementei
lendo `isAuthenticated` do `AuthContext` — se não houver sessão, redireciono
para `/login` guardando a rota de origem em `state`, para poder voltar depois
do login (embora hoje eu ainda não reaproveite esse `state` no `LoginPage`).

### Autenticação e sessão (`context/AuthContext.tsx`)

Modelei a sessão como um contexto simples:

- `user`: o usuário logado (ou `null`), inicializado lendo `localStorage`
  (chave `blog:user`) para sobreviver a um refresh da página.
- `isAuthenticated`: derivado de `Boolean(user)`.
- `login(username, password)`: chama `POST /auth/login`, e ao receber
  `{ token, user }` gravo os dois no `localStorage` (`blog:token` e
  `blog:user`) e atualizo o estado.
- `logout()`: limpo as duas chaves do `localStorage` e zero o `user`.

Exponho tudo isso pelo hook `useAuth()`, que lança um erro explícito se for
chamado fora do `AuthProvider` — prefiro falhar cedo a deixar um bug silencioso
de contexto `undefined`.

### Camada de API (`src/api/`)

- `client.ts` cria a instância do axios (`baseURL` vindo de
  `VITE_API_URL`) e registra um interceptor de request que lê o token do
  `localStorage` e injeta `Authorization: Bearer <token>` em toda chamada,
  quando existir. Assim nenhuma página precisa se preocupar em passar o
  token manualmente.
- `auth.ts` expõe `login(username, password)`.
- `posts.ts` expõe `fetchPosts(query?)`, `fetchPost(id)`, `createPost(values)`,
  `updatePost(id, values)`, `deletePost(id)`, `fetchComments(postId)` e
  `addComment(postId, author, text)` — um wrapper fino por endpoint, sem
  lógica extra, para manter as páginas simples.

Os tipos usados nessas funções (`Post`, `Comment`, `AuthUser`,
`PostFormValues`) ficam centralizados em `src/types/index.ts`.

### Estilização (`src/styles/`, `src/components/ui.ts`)

O tema (`theme.ts`) concentra a paleta de cores, o raio de borda padrão e a
largura máxima de conteúdo, e é acessado em qualquer styled-component via
`({ theme }) => theme...`. Em `components/ui.ts` guardo os elementos visuais
repetidos entre páginas e formulários (`Page`, `Field`, `Label`, `Input`,
`Textarea`, `Button` com variantes `primary`/`danger`/`ghost`, `ErrorText`,
`ButtonRow`) para não duplicar CSS entre `PostForm`, `LoginPage` e o
formulário de comentário.

### Setup inicial

Pré-requisito: Node.js 20+.

```bash
cd frontend
npm install
cp .env.example .env   
npm run dev
```

A aplicação sobe em `http://localhost:5173` e já espera o backend respondendo
em `http://localhost:3001` (veja a seção do backend abaixo para subir a API).

Scripts que configurei no `package.json`:

| Comando           | O que faz                                                        |
|-------------------|-------------------------------------------------------------------|
| `npm run dev`     | sobe o servidor de desenvolvimento do Vite com HMR                |
| `npm run build`   | roda `tsc -b` (checagem de tipos) e depois gera o build de produção |
| `npm run lint`    | roda o oxlint sobre o código                                       |
| `npm run preview` | serve localmente o build gerado por `npm run build`                |

Variável de ambiente:

| Variável         | Descrição                                   | Default (se ausente)     |
|------------------|-----------------------------------------------|---------------------------|
| `VITE_API_URL`   | URL base da API consumida pelo front           | `http://localhost:3001`  |

### Guia de uso

Este é o fluxo que segui para validar a aplicação manualmente:

1. **Lista de posts (`/`)** — abro a home e vejo os posts mais recentes.
   Digito na busca no topo para filtrar por título, autor ou palavra-chave
   (a busca dispara automaticamente 250ms depois de eu parar de digitar,
   sem precisar de um botão "buscar").
2. **Leitura de um post (`/posts/:id`)** — clico em um card para ler o
   conteúdo completo e a lista de comentários. Ao final da página consigo
   preencher meu nome e o comentário e enviar, sem precisar estar logado.
3. **Login (`/login`, topo direito do header)** — entro com uma conta de
   professor(a) para liberar o menu **Nova postagem** e o link
   **Administração** no cabeçalho. Uso a credencial de teste do backend:
   usuário `marina.souza`, senha `professor123`.
4. **Nova postagem (`/posts/novo`)** — só aparece no menu quando estou
   logado; preencho título, autor, uma descrição curta (opcional, usada na
   listagem) e o conteúdo, e salvo.
5. **Administração (`/admin`)** — também só acessível logado. Vejo uma
   tabela com todos os posts e, em cada linha, posso **editar**
   (`/posts/:id/editar`, reaproveita o mesmo `PostForm` da criação) ou
   **excluir** (com uma confirmação antes de remover).
6. **Logout** — pelo botão **Sair** no header, que limpa a sessão do
   `localStorage` e me leva de volta para a home.

Se eu tentar acessar `/posts/novo`, `/posts/:id/editar` ou `/admin` sem estar
logado, sou redirecionado direto para `/login` — é o `ProtectedRoute` fazendo
esse trabalho.

## Backend (referência)

O backend serve como substituto local para a API da fase anterior, mantendo
os mesmos contratos de endpoint usados pelo front:

| Método | Rota                    | Auth | Descrição                          |
|--------|-------------------------|------|-------------------------------------|
| POST   | `/auth/login`            | -    | Login do professor, retorna JWT     |
| GET    | `/posts`                 | -    | Lista posts (aceita `?q=` para busca) |
| GET    | `/posts/:id`              | -    | Detalhe de um post                  |
| POST   | `/posts`                 | JWT  | Cria post                           |
| PUT    | `/posts/:id`              | JWT  | Edita post                          |
| DELETE | `/posts/:id`              | JWT  | Remove post                         |
| GET    | `/posts/:id/comments`     | -    | Lista comentários de um post        |
| POST   | `/posts/:id/comments`     | -    | Adiciona comentário                 |

Para rodar:

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

A API sobe em `http://localhost:3001`.

## Rodando tudo com Docker

```bash
docker compose up --build
```

- Frontend disponível em `http://localhost:8080`
- Backend disponível em `http://localhost:3001`

## CI/CD

Configurei o workflow `.github/workflows/ci.yml` para rodar a cada push/PR
para `main`: instala as dependências do backend e do frontend, executa lint
e build do front, faz um smoke test da API e, por fim, valida que as duas
imagens Docker buildam sem erro.

## Notas de desenvolvimento

Para apontar o front para uma API real (em vez do mock que construí), basta
ajustar `VITE_API_URL` no `.env` do frontend — nenhum código precisa mudar,
já que toda a comunicação passa pela camada `src/api/`.

O maior cuidado que tomei durante a implementação foi garantir que as rotas
protegidas (`/posts/novo`, `/posts/:id/editar`, `/admin`) ficassem realmente
inacessíveis sem sessão válida, e que um token ausente ou expirado resultasse
em 401 tanto no backend quanto no front — o que faz o usuário ser redirecionado
para `/login` automaticamente.
