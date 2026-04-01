import axios from 'axios'

/**
 * Cliente HTTP único do projeto (única integração externa).
 * Requisições usam URL absoluta retornada por {@link getProductsUrl}.
 */
export const apiClient = axios.create({
  timeout: 15_000,
  headers: {
    Accept: 'application/json',
  },
})
