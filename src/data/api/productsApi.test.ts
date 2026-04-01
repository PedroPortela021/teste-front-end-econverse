import type { ProductsApiResponse } from '../../types/product'
import { apiClient } from './client'
import {
  DEFAULT_PRODUCTS_JSON_URL,
  DEV_PRODUCTS_PROXY_PATH,
  fetchProducts,
  getProductsUrl,
} from './productsApi'

vi.mock('./client', () => ({
  apiClient: {
    get: vi.fn(),
  },
}))

const validPayload: ProductsApiResponse = {
  success: true,
  products: [
    {
      productName: 'P1',
      descriptionShort: 'D1',
      photo: 'https://example.com/1.png',
      price: 1000,
    },
  ],
}

describe('productsApi', () => {
  beforeEach(() => {
    vi.mocked(apiClient.get).mockReset()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  describe('getProductsUrl', () => {
    it('Should prefer VITE_PRODUCTS_API_URL when set', () => {
      vi.stubEnv('VITE_PRODUCTS_API_URL', 'https://custom.example/produtos.json')
      expect(getProductsUrl()).toBe('https://custom.example/produtos.json')
    })
  })

  describe('fetchProducts', () => {
    it('Should return data when response is valid', async () => {
      vi.mocked(apiClient.get).mockResolvedValue({ data: validPayload })

      await expect(fetchProducts()).resolves.toEqual(validPayload)
      expect(apiClient.get).toHaveBeenCalledTimes(1)
    })

    it('Should throw when success is false', async () => {
      vi.mocked(apiClient.get).mockResolvedValue({
        data: { success: false, products: [] },
      })

      await expect(fetchProducts()).rejects.toThrow(
        'A listagem de produtos retornou success: false.',
      )
    })

    it('Should throw when data is not an object', async () => {
      vi.mocked(apiClient.get).mockResolvedValue({ data: null as unknown as ProductsApiResponse })

      await expect(fetchProducts()).rejects.toThrow('Resposta da API de produtos em formato inválido.')
    })

    it('Should throw when products is not an array', async () => {
      vi.mocked(apiClient.get).mockResolvedValue({
        data: { success: true, products: {} as unknown as ProductsApiResponse['products'] },
      })

      await expect(fetchProducts()).rejects.toThrow('Resposta da API de produtos em formato inválido.')
    })

    it('Should throw when success is not boolean', async () => {
      vi.mocked(apiClient.get).mockResolvedValue({
        data: { success: 'yes' as unknown as boolean, products: [] },
      })

      await expect(fetchProducts()).rejects.toThrow('Resposta da API de produtos em formato inválido.')
    })

    it('Should propagate axios errors', async () => {
      vi.mocked(apiClient.get).mockRejectedValue(new Error('Network Error'))

      await expect(fetchProducts()).rejects.toThrow('Network Error')
    })
  })
})

describe('productsApi constants', () => {
  it('Should expose default public URL and dev proxy path', () => {
    expect(DEFAULT_PRODUCTS_JSON_URL).toContain('produtos.json')
    expect(DEV_PRODUCTS_PROXY_PATH).toBe('/api/products.json')
  })
})
