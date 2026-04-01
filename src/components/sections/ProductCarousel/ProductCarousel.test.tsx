import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Product } from '../../../types/product'
import { useProducts } from '../../../data/hooks/useProducts'
import carouselStyles from '../../ui/CarouselWrapper/CarouselWrapper.module.scss'
import { ProductCarousel } from './ProductCarousel'
import styles from './ProductCarousel.module.scss'

vi.mock('../../../data/hooks/useProducts', () => ({
  useProducts: vi.fn(),
}))

/** Dados estáveis para testes de UI (espelha a API sem rede). */
const STUB_PRODUCTS: Product[] = [
  {
    productName: 'Iphone 11 PRO MAX BRANCO 1',
    descriptionShort: 'Iphone 11 PRO MAX BRANCO 1',
    photo:
      'https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png',
    price: 150_00,
  },
  ...Array.from({ length: 9 }, (_, i) => ({
    productName: `IPHONE STUB ${i + 2}`,
    descriptionShort: `IPHONE STUB ${i + 2}`,
    photo:
      'https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png',
    price: 90_00,
  })),
]

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
    vi.mocked(useProducts).mockReturnValue({
      products: STUB_PRODUCTS,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    })

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

  it('Should open product modal when a card is clicked', async () => {
    const user = userEvent.setup()
    render(<ProductCarousel />)

    const [firstCard] = screen.getAllByRole('article')
    await user.click(within(firstCard).getByText('Iphone 11 PRO MAX BRANCO 1'))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Iphone 11 PRO MAX BRANCO 1' }),
    ).toBeInTheDocument()
  })

  it('Should show loading status while products are fetching', () => {
    vi.mocked(useProducts).mockReturnValue({
      products: [],
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    })

    render(<ProductCarousel />)

    const status = screen.getByRole('status')
    expect(status).toHaveTextContent('Carregando produtos…')
    expect(screen.queryByRole('region', { name: 'Lista de produtos relacionados' })).not.toBeInTheDocument()
  })

  it('Should show error alert and call refetch on retry', async () => {
    const user = userEvent.setup()
    const refetch = vi.fn()
    vi.mocked(useProducts).mockReturnValue({
      products: [],
      isLoading: false,
      error: 'Falha de rede',
      refetch,
    })

    render(<ProductCarousel />)

    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Falha de rede')
    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))
    expect(refetch).toHaveBeenCalledTimes(1)
  })

  it('Should show empty message when API returns no products', () => {
    vi.mocked(useProducts).mockReturnValue({
      products: [],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    })

    render(<ProductCarousel />)

    expect(screen.getByText('Nenhum produto encontrado.')).toBeInTheDocument()
  })
})
