# Blog da Turma — Tech Challenge Fase 03

Interface web para a aplicação de blogging da pós-graduação, permitindo que
professores(as) publiquem, editem e removam posts, e que estudantes leiam e
comentem o conteúdo. O repositório contém dois projetos independentes:

- `backend/` — API REST em Node.js/Express (posts, comentários e login de
  professores). Serve como substituto local para a API já construída na fase
  anterior do curso, mantendo os mesmos contratos de endpoint.
- `frontend/` — SPA em React + TypeScript que consome essa API.

## Arquitetura

```
                 ┌────────────────────┐        ┌───────────────────────┐
                 │   frontend (SPA)   │  REST  │   backend (Express)   │
  usuário  ───▶  │  React + Router +  │ ─────▶ │  posts / comentários / │
                 │  styled-components │ ◀───── │  auth (JWT)            │
                 └────────────────────┘        └───────────────────────┘
```

O front-end não guarda nenhum estado de negócio em servidor — tudo vem da
API via `axios`. Autenticação usa um token JWT guardado em `localStorage` e
injetado automaticamente em toda requisição pelo interceptor em
`frontend/src/api/client.ts`. Rotas que exigem login (criar post, editar post,
área administrativa) ficam atrás do componente `ProtectedRoute`, que redireciona
para `/login` quando não há sessão ativa.

Gerenciamento de estado é feito com hooks (`useState`/`useEffect`) por página
e um `AuthContext` global para dados de sessão — não foi necessário Redux para
o escopo do desafio.

### Estrutura do front-end

```
frontend/src/
├── api/          # client axios + chamadas (posts, auth)
├── components/   # componentes reutilizáveis (Header, PostCard, formulário, etc.)
├── context/      # AuthContext
├── pages/        # uma página por rota
├── styles/       # tema e estilos globais (styled-components)
└── types/        # tipos TypeScript compartilhados
```

### Endpoints do backend

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

## Como rodar localmente

Pré-requisitos: Node.js 20+.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

A API sobe em `http://localhost:3001`. Usuário de teste para login:
usuário `marina.souza`, senha `professor123`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # aponta VITE_API_URL para o backend
npm run dev
```

A aplicação abre em `http://localhost:5173`.

## Rodando com Docker

```bash
docker compose up --build
```

- Frontend disponível em `http://localhost:8080`
- Backend disponível em `http://localhost:3001`

## CI/CD

O workflow em `.github/workflows/ci.yml` roda a cada push/PR para `main`:
instala as dependências do backend e do frontend, executa lint e build do
front, faz um smoke test da API e, por fim, valida que as duas imagens Docker
buildam sem erro.

## Guia de uso rápido

1. Abra a página inicial para ver a lista de posts e buscar por palavra-chave.
2. Clique em um post para ler o conteúdo completo e deixar um comentário.
3. Faça login (topo direito) com a conta de professor para liberar o menu
   **Nova postagem** e a **Administração**.
4. Na administração é possível editar ou excluir qualquer post existente.

## Notas de desenvolvimento

O backend deste repositório é um mock construído para desenvolver e demonstrar
o front-end de forma independente, seguindo o mesmo contrato de API descrito
no enunciado do desafio (fase anterior, back-end em Node.js). Para apontar o
front para uma API real, basta ajustar `VITE_API_URL` no `.env` do frontend.

O maior cuidado durante a implementação foi manter as rotas protegidas
(`/posts/novo`, `/posts/:id/editar`, `/admin`) realmente inacessíveis sem
sessão válida, e garantir que o token expirado ou ausente retorne 401 tanto no
backend quanto no front (o usuário é redirecionado para `/login`
automaticamente).
