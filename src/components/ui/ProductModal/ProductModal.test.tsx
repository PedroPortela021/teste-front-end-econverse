import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Product } from '../../../types/product'
import { ProductModal } from './ProductModal'
import styles from './ProductModal.module.scss'

const sampleProduct: Product = {
  productName: 'Produto modal',
  descriptionShort: 'Descrição do item na vitrine.',
  photo: 'https://example.com/p.png',
  price: 1499_90,
}

describe('ProductModal', () => {
  it('Should render nothing when product is null', () => {
    render(<ProductModal product={null} onClose={vi.fn()} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('Should render dialog with product data', () => {
    render(<ProductModal product={sampleProduct} onClose={vi.fn()} listPriceCents={2000_00} />)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: sampleProduct.productName })).toHaveClass(
      styles.title,
    )
    expect(screen.getByText('R$ 1.499,90')).toHaveClass(styles.currentPrice)
    expect(screen.getByText('R$ 2.000,00')).toHaveClass(styles.listPrice)
    expect(screen.getByText(sampleProduct.descriptionShort)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Veja mais detalhes do produto >' })).toHaveClass(
      styles.detailsLink,
    )
  })

  it('Should omit list price when listPriceCents is not above current price', () => {
    render(<ProductModal product={sampleProduct} onClose={vi.fn()} listPriceCents={sampleProduct.price} />)
    expect(screen.queryByText('R$ 2.000,00')).not.toBeInTheDocument()
  })

  it('Should call onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<ProductModal product={sampleProduct} onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: 'Fechar' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('Should call onClose when Escape is pressed', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<ProductModal product={sampleProduct} onClose={onClose} />)

    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('Should call onClose when overlay backdrop is clicked', () => {
    const onClose = vi.fn()
    const { baseElement } = render(<ProductModal product={sampleProduct} onClose={onClose} />)

    const overlay = baseElement.querySelector(`.${styles.overlay}`)
    expect(overlay).not.toBeNull()
    fireEvent.click(overlay as HTMLElement)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('Should not close when clicking inside the dialog panel', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<ProductModal product={sampleProduct} onClose={onClose} />)

    await user.click(screen.getByRole('dialog'))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('Should adjust quantity with stepper controls', async () => {
    const user = userEvent.setup()
    render(<ProductModal product={sampleProduct} onClose={vi.fn()} />)

    expect(screen.getByText('01')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade' }))
    expect(screen.getByText('02')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Diminuir quantidade' }))
    expect(screen.getByText('01')).toBeInTheDocument()
  })

  it('Should disable decrease quantity at minimum', () => {
    render(<ProductModal product={sampleProduct} onClose={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Diminuir quantidade' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Aumentar quantidade' })).not.toBeDisabled()
  })
})
