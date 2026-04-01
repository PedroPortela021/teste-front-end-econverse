import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const ECONVERSE_PRODUCTS_PATH =
  '/teste-front-end/junior/tecnologia/lista-produtos/produtos.json'

/** Dev e preview: browser → mesmo origin; Node repassa à Econverse (sem CORS no cliente). */
const productsJsonProxy = {
  '/api/products.json': {
    target: 'https://app.econverse.com.br',
    changeOrigin: true,
    secure: true,
    rewrite: () => ECONVERSE_PRODUCTS_PATH,
  },
} as const

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { ...productsJsonProxy },
  },
  preview: {
    proxy: { ...productsJsonProxy },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/vite-env.d.ts',
        'src/setupTests.ts',
        'src/main.tsx',
      ],
    },
  },
})
