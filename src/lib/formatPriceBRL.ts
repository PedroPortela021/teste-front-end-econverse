const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

/** Formata centavos para moeda BRL (ex.: 2890 → "R$ 28,90"). */
export function formatPriceBRLFromCents(cents: number): string {
  return formatter.format(cents / 100)
}
