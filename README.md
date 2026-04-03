# Teste Front-end Econverse

SPA em React para listagem e vitrine de produtos, com integração à API pública da Econverse, layout responsivo e pipeline de qualidade (TypeScript strict, testes, lint e build otimizado).

---

## Organização do projeto

A árvore em `src/` separa **rotas**, **páginas**, **UI**, **dados** e **tipos**, para facilitar navegação, testes isolados e evolução sem acoplamento excessivo.

| Pasta / arquivo | Responsabilidade |
|-----------------|------------------|
| `main.tsx` | Bootstrap: `StrictMode`, `HelmetProvider`, `RouterProvider`. |
| `routes/` | Definição do roteador (`createBrowserRouter`) e lazy loading onde fizer sentido. |
| `pages/` | Páginas de alto nível (ex.: `Home`): compõem seções; pouca lógica de negócio. |
| `components/layout/` | Casca global: header, footer, barras. |
| `components/sections/` | Blocos da home (hero, categorias, carrossel, marcas, parceiros). |
| `components/ui/` | Componentes reutilizáveis (botão, input, cards, modais, carrossel genérico). |
| `components/seo/` | Metadados e SEO por rota (`Seo`). |
| `data/api/` | Cliente HTTP centralizado e funções por endpoint (ex.: `productsApi`). |
| `data/hooks/` | Hooks que encapsulam estado assíncrono (ex.: `useProducts`). |
| `lib/` | Funções puras (ex.: `formatPriceBRL`, `getSiteUrl`). |
| `types/` | Contratos compartilhados (`product`, `partner`). |

**Fluxo típico dos produtos:** `client` → `productsApi` → `useProducts` → seções/UI. A API e o hook podem ser testados sem montar a página inteira.

**Arquivos na raiz relevantes:** `vite.config.ts` (build, proxy, Vitest), `Dockerfile`, `docker-compose.yml`, `nginx/default.conf`, `scripts/seo-files.mjs` (pós-build SEO), `.env.example`.

---

## Estilos: Sass e CSS Modules (sem bibliotecas de UI/CSS)

Não há frameworks de componentes nem utilitários CSS prontos (ex.: Tailwind, Bootstrap, Material UI). O visual é construído com:

- **Sass (SCSS)** compilado pelo Vite;
- **CSS Modules** (`*.module.scss`) por componente, evitando conflito de nomes;
- **Tokens semânticos** em `src/tokens.scss` (variáveis CSS consumidas nos módulos — preferir `--color-*` em vez de hex soltos);
- **`src/index.scss`** apenas para reset leve, fonte base (Poppins) e estilos globais mínimos.

Isso mantém dependências de estilo enxutas e o design sob controle do projeto.

---

## Boas práticas adotadas

- **Separação por camada:** páginas orquestram; dados vivem em `data/`; apresentação em `components/`.
- **Contratos explícitos:** tipos compartilhados em `types/` e props tipadas nos componentes.
- **Acessibilidade:** onde aplicável, `aria-label`, papéis em modais, foco e testes com Testing Library (incentiva uso semântico).
- **Componentes coesos:** arquivos de teste colocados ao lado do código (`*.test.ts` / `*.test.tsx`).
- **Build reproduzível:** `npm run check` encadeia typecheck, lint, testes e build.
- **CORS em dev/preview:** proxy Vite para `/api/products.json`; em Docker, Nginx replica a mesma ideia para o browser sempre falar com o mesmo origin.

---

## SEO

- **`index.html`:** `lang="pt-BR"`, viewport, título e meta description padrão para primeira pintura e crawlers estáticos.
- **Componente `Seo` (`react-helmet-async`):** título por página (com sufixo opcional), description, `canonical`, `robots` (`noindex` quando necessário), **Open Graph** e **Twitter Cards**, imagem OG configurável, **`lang` no `<html>`**.
- **JSON-LD (schema.org):** grafo com `WebSite` e `Organization` para rich results básicos.
- **`getSiteUrl()` + `VITE_SITE_URL`:** URL pública consistente para canonical e imagens absolutas.
- **Pós-build (`scripts/seo-files.mjs`):** gera `dist/sitemap.xml` e `dist/robots.txt` quando `VITE_SITE_URL` está definido; referência ao sitemap no `robots.txt`; rota interna de design (`/desing`) pode ser bloqueada para indexação.

Detalhes de variáveis: `.env.example`.

---

## Tipagem (TypeScript)

- **`tsconfig.app.json` com `strict: true`** e regras adicionais: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports`, `erasableSyntaxOnly`, etc.
- **`verbatimModuleSyntax`** e resolução **bundler**, alinhados ao Vite.
- Tipos de ambiente em `src/vite-env.d.ts` para `import.meta.env`.

---

## Testes

- **Vitest** + **jsdom** + **Testing Library** (React e user-event).
- **108 testes** em **21 arquivos** (`*.test.ts` / `*.test.tsx`).
- Comandos: `npm run test` (watch), `npm run test:run` (CI), `npm run test:coverage` (v8, `json-summary` + texto).

Cobertura instrumenta `src/**/*.{ts,tsx}` excluindo testes, `main.tsx`, `setupTests.ts` e `vite-env.d.ts`. Páginas muito compostas, rotas, apenas tipos e alguns utilitários podem aparecer com baixa ou 0% de linhas — o comportamento crítico tende a estar em componentes e hooks testados. Execute `npm run test:coverage` para números atualizados.

---

## Lint e Prettier

- **ESLint 9 (flat config):** `eslint.config.js` com `@eslint/js`, `typescript-eslint` (recommended), `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` (Vite), **`eslint-config-prettier`** para não disputar formatação com o Prettier.
- **`npm run lint`** com `--max-warnings 0`; **`npm run lint:fix`** para correções automáticas onde possível.
- **Prettier** (`.prettierrc`: sem ponto e vírgula, aspas simples, `printWidth` 100): `npm run format` / `npm run format:check`.

O script **`npm run check`** não inclui `format:check` nem `prettier --check`; você pode adicionar ao fluxo local ou CI se quiser falhar o pipeline por divergência de formatação.

---

## Docker

- **Multi-stage:** `node:22-alpine` instala dependências (`npm ci`) e gera o build; estágio final **`nginx:1.27-alpine`** serve `dist/` com `nginx/default.conf`.
- **Build args:** `VITE_PRODUCTS_API_URL` (padrão relativo `/api/products.json` para o Nginx fazer proxy) e opcionalmente `VITE_SITE_URL` para SEO no cliente e geração de `sitemap.xml` / `robots.txt`.
- **`docker compose up --build`:** serviço `web` na porta **8080**.
- **Perfil `dev`:** `docker compose --profile dev up dev` — Vite com hot reload na **5173** (volume montado).

---

## Proxy e CORS

Em desenvolvimento e `vite preview`, o Vite faz **proxy** de `/api/products.json` para o host da Econverse. Em produção com Docker, o **Nginx** aplica regra equivalente, mantendo requisições no mesmo origin no browser.

---

## Scripts úteis

```bash
npm run dev              # desenvolvimento
npm run build            # tsc -b + vite build + seo-files.mjs
npm run preview          # build estático + proxy de produtos (como no dev)
npm run typecheck        # apenas TypeScript
npm run lint             # ESLint
npm run lint:fix
npm run format           # Prettier --write
npm run format:check     # Prettier --check
npm run test             # Vitest (watch)
npm run test:run
npm run test:coverage
npm run check            # typecheck + lint + test:run + build
```

---

## Tokens de design (`src/tokens.scss`)

- Fonte base: **Poppins**
- Escala de tamanhos: `12, 14, 16, 20, 32, 40, 48`
- Paleta de referência documentada no arquivo; use **aliases semânticos** (`--color-text-primary`, `--color-brand-primary`, etc.) nos módulos SCSS.

---

## Tecnologias principais

| Área | Ferramenta |
|------|------------|
| Runtime / UI | React 19, React Router 7 |
| Build / dev | Vite 8 |
| Linguagem | TypeScript (strict) |
| Estilos | Sass, CSS Modules (`.module.scss`) |
| HTTP | Axios (`src/data/api`) |
| SEO no app | react-helmet-async |
| Testes | Vitest, jsdom, Testing Library |
| Qualidade | ESLint 9, Prettier |
| Deploy opcional | Docker + Nginx |
