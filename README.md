# Teste Front-end Econverse

SPA em React para listagem e vitrine de produtos, com integração à API pública da Econverse, layout responsivo e testes automatizados.

## Tecnologias

| Área | Ferramenta |
|------|------------|
| Runtime / UI | React 19, React Router 7 |
| Build / dev server | Vite 8 |
| Linguagem | TypeScript (modo strict via `tsconfig`) |
| Estilos | Sass, CSS Modules (`.module.scss`) |
| HTTP | Axios (cliente centralizado em `src/data/api`) |
| Testes | Vitest, jsdom, Testing Library (React + user-event) |
| Qualidade | ESLint 9, Prettier |
| Deploy (opcional) | Docker (Nginx servindo o build estático) |

## Arquitetura

O código em `src/` segue uma separação por responsabilidade:

- **`main.tsx` / `routes/`** — bootstrap da aplicação e definição das rotas (`createBrowserRouter`).
- **`pages/`** — páginas de alto nível que compõem seções (ex.: `Home`). Pouca lógica; orquestram layout e blocos.
- **`components/layout/`** — shell da página: header, footer, barras globais.
- **`components/sections/`** — blocos da home (hero, categorias, carrossel de produtos, marcas, parceiros, etc.).
- **`components/ui/`** — componentes reutilizáveis (botão, input, cards, modais, carrossel genérico).
- **`data/api/`** — instância Axios e funções que chamam endpoints (ex.: `productsApi`).
- **`data/hooks/`** — hooks que encapsulam estado assíncrono (ex.: `useProducts`).
- **`lib/`** — utilitários puros (ex.: formatação de preço em BRL).
- **`types/`** — tipos compartilhados (produto, parceiro).

Fluxo de dados dos produtos: **`client` → `productsApi` → `useProducts` → `ProductCarousel` / modais** — facilita testar a API e o hook em isolamento e manter a UI desacoplada da URL exata do JSON.

### Proxy e CORS

Em desenvolvimento e `vite preview`, o Vite faz **proxy** de `/api/products.json` para o host da Econverse, evitando CORS no navegador. Em produção com Docker, o **Nginx** replica essa regra para o mesmo caminho relativo.

Variáveis relevantes estão documentadas em `.env.example` (quando existir no repositório).

## Boas práticas adotadas

- **TypeScript** em componentes, hooks e camada de dados; contratos explícitos com tipos em `types/`.
- **Estilos por componente** com CSS Modules e **tokens semânticos** em `src/tokens.scss` (evitar hex solto nos módulos).
- **Acessibilidade** onde aplicável: botões com `aria-label`, modais com papéis e foco, interações testáveis com RTL.
- **Componentes pequenos** e testes próximos do código (`*.test.tsx` / `*.test.ts`).
- **Pipeline de qualidade** local: `npm run check` executa typecheck, lint, testes e build.

## Testes e cobertura

- **108 testes** em **21 arquivos** (`*.test.ts` / `*.test.tsx`), cobrindo UI, hooks, API client e utilitários.
- Comando interativo: `npm run test`  
- CI local / CI: `npm run test:run`  
- **Cobertura (Vitest + v8):** `npm run test:coverage`

Última execução de cobertura (agregado dos arquivos instrumentados em `src/**/*.ts(x)` excluindo testes, `main.tsx`, `setupTests` e `vite-env.d.ts`):

| Métrica | Valor aproximado |
|---------|------------------|
| Linhas | **~90%** |
| Statements | **~88%** |
| Funções | **~87%** |
| Branches | **~81%** |

Arquivos puramente de **tipos** (`types/*.ts`), **composição mínima** de rotas (`routes/index.tsx`) e a página **`Design`** tendem a aparecer com 0% ou baixa cobertura porque não executam lógica instrumentável; a página **`Home`** é principalmente composição — o comportamento crítico fica nos componentes e hooks testados.

## Scripts úteis

```bash
npm run dev          # desenvolvimento
npm run build        # build de produção
npm run preview      # servir o build (com proxy de produtos como no dev)
npm run check        # typecheck + lint + testes + build
npm run test:coverage
```

## Style Guide (tokens)

Os tokens globais ficam em **`src/tokens.scss`**.

- Fonte base: `Poppins`
- Tamanhos: `12, 14, 16, 20, 32, 40, 48`
- Cores de referência: `#3442B5`, `#3019B2`, `#F7CA11`, `#271C47`, `#3F3F40`, `#9F9F9F`, `#FFFFFF`

Use sempre os **aliases semânticos** (ex.: `--color-text-primary`, `--color-brand-primary`) em vez de hex direto nos componentes.

## Docker

Build multi-stage e Nginx com configuração alinhada ao proxy de `/api/products.json` — ver `Dockerfile`, `docker-compose.yml` e `nginx/default.conf` na raiz do projeto.
