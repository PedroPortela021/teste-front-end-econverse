import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import carouselStyles from '../../ui/CarouselWrapper/CarouselWrapper.module.scss'
import { ProductCarousel } from './ProductCarousel'
import styles from './ProductCarousel.module.scss'

const TAB_LABELS = [
  'CELULAR',
  'ACESSÓRIOS',
  'TABLETS',
  'NOTEBOOKS',
  'TVS',
  'VER TODOS',
] as const

describe('ProductCarousel', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('Should render section with heading linked by aria-labelledby', () => {
    render(<ProductCarousel />)

    const heading = screen.getByRole('heading', { level: 2, name: 'Produtos relacionados' })
    expect(heading).toHaveAttribute('id', 'related-products-heading')
    expect(heading).toHaveClass(styles.title)

    const section = document.getElementById('related-products-heading')?.closest('section')
    expect(section).toHaveAttribute('aria-labelledby', 'related-products-heading')
  })

  it('Should render tablist with one tab per category', () => {
    render(<ProductCarousel />)

    const tablist = screen.getByRole('tablist', { name: 'Categorias de produtos relacionados' })
    expect(tablist).toBeInTheDocument()

    const tabs = within(tablist).getAllByRole('tab')
    expect(tabs).toHaveLength(6)
    TAB_LABELS.forEach((label) => {
      expect(within(tablist).getByRole('tab', { name: label })).toBeInTheDocument()
    })
  })

  it('Should mark first tab as selected by default', () => {
    render(<ProductCarousel />)

    const first = screen.getByRole('tab', { name: 'CELULAR' })
    expect(first).toHaveAttribute('aria-selected', 'true')
    expect(first).toHaveClass(styles.tabActive)

    const second = screen.getByRole('tab', { name: 'ACESSÓRIOS' })
    expect(second).toHaveAttribute('aria-selected', 'false')
    expect(second).not.toHaveClass(styles.tabActive)
  })

  it('Should update selected tab when another tab is activated', async () => {
    const user = userEvent.setup()
    render(<ProductCarousel />)

    await user.click(screen.getByRole('tab', { name: 'NOTEBOOKS' }))

    expect(screen.getByRole('tab', { name: 'CELULAR' })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('tab', { name: 'NOTEBOOKS' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'NOTEBOOKS' })).toHaveClass(styles.tabActive)
  })

  it('Should render carousel region for product list', () => {
    render(<ProductCarousel />)

    const region = screen.getByRole('region', { name: 'Lista de produtos relacionados' })
    expect(region).toHaveAttribute('aria-roledescription', 'carrossel')
    expect(region).toHaveClass(carouselStyles.viewport)

    const carouselRoot = region.parentElement
    expect(carouselRoot).toHaveClass(styles.carousel)
    expect(carouselRoot).toHaveClass(carouselStyles.root)
  })

  it('Should render one product card per mock product', () => {
    render(<ProductCarousel />)

    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(10)
  })

  it('Should show first mock product name on image and in description', () => {
    render(<ProductCarousel />)

    expect(
      screen.getByRole('img', { name: 'Iphone 11 PRO MAX BRANCO 1' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Iphone 11 PRO MAX BRANCO 1')).toBeInTheDocument()
  })

  it('Should expose carousel navigation controls', () => {
    render(<ProductCarousel />)

    expect(screen.getByRole('button', { name: 'Ver itens anteriores' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ver próximos itens' })).toBeInTheDocument()
  })
})
