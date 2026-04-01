import { isAxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import type { Product } from '../../types/product'
import { fetchProducts } from '../api/productsApi'

export type UseProductsState = {
  products: Product[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

function errorMessageFromUnknown(err: unknown): string {
  if (isAxiosError(err)) {
    const msg = err.response?.data
    if (typeof msg === 'string' && msg.trim()) return msg
    if (err.message) return err.message
    return 'Não foi possível carregar os produtos.'
  }
  if (err instanceof Error && err.message) return err.message
  return 'Não foi possível carregar os produtos.'
}

export function useProducts(): UseProductsState {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fetchId, setFetchId] = useState(0)

  const refetch = useCallback(() => {
    setFetchId((id) => id + 1)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchProducts()
        if (!cancelled) {
          setProducts(data.products)
        }
      } catch (err) {
        if (!cancelled) {
          setProducts([])
          setError(errorMessageFromUnknown(err))
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [fetchId])

  return { products, isLoading, error, refetch }
}
