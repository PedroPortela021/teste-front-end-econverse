import { renderHook, waitFor } from '@testing-library/react'
import type { Product } from '../../types/product'
import * as productsApi from '../api/productsApi'
import { useProducts } from './useProducts'

const sampleProducts: Product[] = [
  {
    productName: 'Item A',
    descriptionShort: 'Desc A',
    photo: 'https://example.com/a.png',
    price: 1000,
  },
]

describe('useProducts', () => {
  beforeEach(() => {
    vi.spyOn(productsApi, 'fetchProducts').mockReset()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('Should load products on mount', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockResolvedValue({
      success: true,
      products: sampleProducts,
    })

    const { result } = renderHook(() => useProducts())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.products).toEqual([])
    expect(result.current.error).toBeNull()

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.products).toEqual(sampleProducts)
    expect(result.current.error).toBeNull()
  })

  it('Should set error when fetch fails', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockRejectedValue(new Error('Falha de rede'))

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.products).toEqual([])
    expect(result.current.error).toBe('Falha de rede')
  })

  it('Should refetch when refetch is called', async () => {
    const spy = vi
      .spyOn(productsApi, 'fetchProducts')
      .mockResolvedValueOnce({ success: true, products: sampleProducts })
      .mockResolvedValueOnce({
        success: true,
        products: [{ ...sampleProducts[0], productName: 'Item B' }],
      })

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.products[0]?.productName).toBe('Item A')
    })

    result.current.refetch()

    await waitFor(() => {
      expect(result.current.products[0]?.productName).toBe('Item B')
    })

    expect(spy).toHaveBeenCalledTimes(2)
  })
})
