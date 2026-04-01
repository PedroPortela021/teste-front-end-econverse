import type { ProductsApiResponse } from '../../types/product'
import { apiClient } from './client'

/** URL direta (produção ou quando o servidor da API permite CORS). */
export const DEFAULT_PRODUCTS_JSON_URL =
  'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json'

/** Caminho no dev server; o Vite faz proxy para a Econverse (ver vite.config.ts). */
export const DEV_PRODUCTS_PROXY_PATH = '/api/products.json'

export function getProductsUrl(): string {
  const fromEnv = import.meta.env.VITE_PRODUCTS_API_URL
  if (fromEnv) return fromEnv
  if (import.meta.env.DEV) return DEV_PRODUCTS_PROXY_PATH
  return DEFAULT_PRODUCTS_JSON_URL
}

export async function fetchProducts(): Promise<ProductsApiResponse> {
  const { data } = await apiClient.get<ProductsApiResponse>(getProductsUrl())

  if (data == null || typeof data !== 'object') {
    throw new Error('Resposta da API de produtos em formato inválido.')
  }
  if (typeof data.success !== 'boolean' || !Array.isArray(data.products)) {
    throw new Error('Resposta da API de produtos em formato inválido.')
  }
  if (!data.success) {
    throw new Error('A listagem de produtos retornou success: false.')
  }

  return data
}
