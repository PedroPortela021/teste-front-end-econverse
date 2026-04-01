import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CategoryBar } from './CategoryBar'
import itemStyles from './CategoryBarItem.module.scss'
import styles from './CategoryBar.module.scss'

const CATEGORY_LABELS = [
  'Tecnologia',
  'Supermercado',
  'Bebidas',
  'Ferramentas',
  'Saúde',
  'Esportes e Fitness',
  'Moda',
] as const

describe('CategoryBar', () => {
  it('Should expose a section landmark with accessible name', () => {
    render(<CategoryBar />)

    expect(screen.getByRole('region', { name: 'Categorias de produtos' })).toBeInTheDocument()
  })

  it('Should render a list with one item per category', () => {
    render(<CategoryBar />)

    const region = screen.getByRole('region', { name: 'Categorias de produtos' })
    const list = within(region).getByRole('list')

    expect(list).toHaveClass(styles.row)
    const items = within(list).getAllByRole('listitem')
    expect(items).toHaveLength(7)
  })

  it('Should render a button for each category label', () => {
    render(<CategoryBar />)

    for (const label of CATEGORY_LABELS) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument()
    }
  })

  it('Should mark first category as selected by default', () => {
    render(<CategoryBar />)

    const first = screen.getByRole('button', { name: 'Tecnologia' })
    expect(first).toHaveAttribute('aria-pressed', 'true')
    expect(first).toHaveClass(itemStyles.active)

    const second = screen.getByRole('button', { name: 'Supermercado' })
    expect(second).toHaveAttribute('aria-pressed', 'false')
    expect(second).not.toHaveClass(itemStyles.active)
  })

  it('Should move selection when another category is clicked', async () => {
    const user = userEvent.setup()
    render(<CategoryBar />)

    await user.click(screen.getByRole('button', { name: 'Moda' }))

    expect(screen.getByRole('button', { name: 'Tecnologia' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    expect(screen.getByRole('button', { name: 'Moda' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Moda' })).toHaveClass(itemStyles.active)
  })

  it('Should use category icon assets for each item', () => {
    const { container } = render(<CategoryBar />)

    const images = container.querySelectorAll('img')
    expect(images).toHaveLength(7)
    images.forEach((img) => {
      expect(img).toHaveAttribute('alt', '')
      expect(img).toHaveAttribute('src', expect.stringContaining('categoria-'))
      expect(img).toHaveClass(itemStyles.icon)
    })
  })
})
