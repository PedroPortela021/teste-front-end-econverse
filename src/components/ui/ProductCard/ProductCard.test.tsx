import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Product } from '../../../types/product'
import buttonStyles from '../Button/Button.module.scss'
import { ProductCard } from './ProductCard'
import styles from './ProductCard.module.scss'

const baseProduct: Product = {
  productName: 'Produto teste',
  descriptionShort: 'Descrição curta do produto',
  photo: 'https://example.com/foto.png',
  price: 99_90,
}

describe('ProductCard', () => {
  it('Should render product image with src and accessible name', () => {
    render(<ProductCard product={baseProduct} />)

    const img = screen.getByRole('img', { name: baseProduct.productName })
    expect(img).toHaveAttribute('src', baseProduct.photo)
    expect(img).toHaveClass(styles.image)
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  it('Should show description and formatted current price', () => {
    render(<ProductCard product={baseProduct} />)

    expect(screen.getByText(baseProduct.descriptionShort)).toHaveClass(styles.description)
    expect(screen.getByText('R$ 99,90')).toHaveClass(styles.currentPrice)
  })

  it('Should show list price when listPriceCents is greater than current price', () => {
    render(<ProductCard product={baseProduct} listPriceCents={120_00} />)

    expect(screen.getByText('R$ 120,00')).toHaveClass(styles.listPrice)
    expect(screen.getByText('R$ 99,90')).toBeInTheDocument()
  })

  it('Should not show list price when listPriceCents is omitted or not above current price', () => {
    const { rerender, container } = render(<ProductCard product={baseProduct} />)
    expect(screen.queryByText('R$ 120,00')).not.toBeInTheDocument()
    expect(container.querySelector(`.${styles.listPrice}`)).toBeNull()

    rerender(<ProductCard product={baseProduct} listPriceCents={99_90} />)
    expect(container.querySelector(`.${styles.listPrice}`)).toBeNull()
  })

  it('Should show installment line when installmentLabel is provided', () => {
    render(
      <ProductCard product={baseProduct} installmentLabel="ou 2x de R$ 50,00 sem juros" />,
    )

    expect(screen.getByText('ou 2x de R$ 50,00 sem juros')).toHaveClass(styles.installment)
  })

  it('Should omit installment when installmentLabel is not passed', () => {
    render(<ProductCard product={baseProduct} />)
    expect(screen.queryByText(/sem juros/)).not.toBeInTheDocument()
  })

  it('Should show free shipping by default and hide when freeShipping is false', () => {
    const { rerender } = render(<ProductCard product={baseProduct} />)
    expect(screen.getByText('Frete grátis')).toHaveClass(styles.shipping)

    rerender(<ProductCard product={baseProduct} freeShipping={false} />)
    expect(screen.queryByText('Frete grátis')).not.toBeInTheDocument()
  })

  it('Should render Comprar as secondary Button with card layout class', () => {
    render(<ProductCard product={baseProduct} />)

    const buy = screen.getByRole('button', { name: 'Comprar' })
    expect(buy).toHaveClass(buttonStyles.buttonBase)
    expect(buy).toHaveClass(buttonStyles.buttonSecondary)
    expect(buy).toHaveClass(styles.buyButton)
  })

  it('Should call onBuy when Comprar is clicked', async () => {
    const user = userEvent.setup()
    const onBuy = vi.fn()
    render(<ProductCard product={baseProduct} onBuy={onBuy} />)

    await user.click(screen.getByRole('button', { name: 'Comprar' }))
    expect(onBuy).toHaveBeenCalledTimes(1)
  })

  it('Should call onOpen when card is activated and not propagate Comprar when onBuy is set', async () => {
    const user = userEvent.setup()
    const onOpen = vi.fn()
    const onBuy = vi.fn()
    render(<ProductCard product={baseProduct} onOpen={onOpen} onBuy={onBuy} />)

    await user.click(screen.getByRole('button', { name: 'Comprar' }))
    expect(onBuy).toHaveBeenCalledTimes(1)
    expect(onOpen).not.toHaveBeenCalled()

    await user.click(screen.getByText(baseProduct.descriptionShort))
    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('Should call onOpen when Comprar is clicked if onBuy is omitted', async () => {
    const user = userEvent.setup()
    const onOpen = vi.fn()
    render(<ProductCard product={baseProduct} onOpen={onOpen} />)

    await user.click(screen.getByRole('button', { name: 'Comprar' }))
    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('Should use article root with card class', () => {
    const { container } = render(<ProductCard product={baseProduct} />)
    const article = container.querySelector('article')
    expect(article).toHaveClass(styles.card)
  })
})
