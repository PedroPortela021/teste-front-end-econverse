/**
 * Resposta da API de listagem de produtos.
 * @see https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json
 */
export type ProductsApiResponse = {
  success: boolean
  products: Product[]
}

/**
 * Produto retornado pela API de produtos.
 */
export type Product = {
  productName: string
  descriptionShort: string
  photo: string
  /** Valor em centavos (ex.: 2890 → R$ 28,90). */
  price: number
}
