import { formatPriceBRLFromCents } from './formatPriceBRL'

describe('formatPriceBRLFromCents', () => {
  it('Should format centavos as BRL in pt-BR', () => {
    expect(formatPriceBRLFromCents(2890)).toBe('R$ 28,90')
    expect(formatPriceBRLFromCents(150_00)).toBe('R$ 150,00')
    expect(formatPriceBRLFromCents(1499_90)).toBe('R$ 1.499,90')
  })

  it('Should handle zero', () => {
    expect(formatPriceBRLFromCents(0)).toBe('R$ 0,00')
  })

  it('Should handle single-digit centavos', () => {
    expect(formatPriceBRLFromCents(5)).toBe('R$ 0,05')
  })
})
