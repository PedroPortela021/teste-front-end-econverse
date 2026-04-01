import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CarouselWrapper } from './CarouselWrapper'
import styles from './CarouselWrapper.module.scss'

const ARIA_LABEL = 'Lista de itens do carrossel'

/** jsdom não layouta scroll; expõe métricas para `updateScrollState` e `scrollByDirection`. */
function attachViewportScrollMock(
  region: HTMLElement,
  opts: { scrollWidth: number; clientWidth: number; scrollLeft?: number },
) {
  let scrollLeft = opts.scrollLeft ?? 0
  Object.defineProperty(region, 'scrollWidth', {
    configurable: true,
    value: opts.scrollWidth,
  })
  Object.defineProperty(region, 'clientWidth', {
    configurable: true,
    value: opts.clientWidth,
  })
  Object.defineProperty(region, 'scrollLeft', {
    configurable: true,
    get: () => scrollLeft,
    set: (v: number) => {
      scrollLeft = v
    },
  })
}

describe('CarouselWrapper', () => {
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

  it('Should render region with carousel semantics and custom aria-label', () => {
    render(
      <CarouselWrapper ariaLabel={ARIA_LABEL}>
        <div>Item A</div>
      </CarouselWrapper>,
    )

    const region = screen.getByRole('region', { name: ARIA_LABEL })
    expect(region).toHaveAttribute('aria-roledescription', 'carrossel')
    expect(region).toHaveAttribute('tabindex', '0')
    expect(region).toHaveClass(styles.viewport)
  })

  it('Should render children inside the track', () => {
    render(
      <CarouselWrapper ariaLabel={ARIA_LABEL}>
        <div data-testid="a">Item A</div>
        <div data-testid="b">Item B</div>
      </CarouselWrapper>,
    )

    const region = screen.getByRole('region', { name: ARIA_LABEL })
    const track = region.querySelector(`.${styles.track}`)
    expect(track).not.toBeNull()
    expect(within(track as HTMLElement).getByTestId('a')).toBeInTheDocument()
    expect(within(track as HTMLElement).getByTestId('b')).toBeInTheDocument()
  })

  it('Should expose previous and next controls with accessible names', () => {
    render(
      <CarouselWrapper ariaLabel={ARIA_LABEL}>
        <div>Item</div>
      </CarouselWrapper>,
    )

    expect(screen.getByRole('button', { name: 'Ver itens anteriores' })).toHaveClass(
      styles.navPrev,
    )
    expect(screen.getByRole('button', { name: 'Ver próximos itens' })).toHaveClass(styles.navNext)
  })

  it('Should merge optional className onto root', () => {
    const { container } = render(
      <CarouselWrapper ariaLabel={ARIA_LABEL} className="extra-carousel">
        <div>Item</div>
      </CarouselWrapper>,
    )

    const root = container.firstElementChild
    expect(root).toHaveClass(styles.root)
    expect(root).toHaveClass('extra-carousel')
  })

  it('Should disable previous at start and enable next when content overflows', async () => {
    render(
      <CarouselWrapper ariaLabel={ARIA_LABEL}>
        <div style={{ width: 2000 }}>Wide</div>
      </CarouselWrapper>,
    )

    const region = screen.getByRole('region', { name: ARIA_LABEL })
    attachViewportScrollMock(region, { scrollWidth: 1000, clientWidth: 200, scrollLeft: 0 })
    fireEvent.scroll(region)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Ver itens anteriores' })).toBeDisabled()
      expect(screen.getByRole('button', { name: 'Ver próximos itens' })).not.toBeDisabled()
    })
  })

  it('Should disable next at end and enable previous when scrolled to the end', async () => {
    render(
      <CarouselWrapper ariaLabel={ARIA_LABEL}>
        <div>Item</div>
      </CarouselWrapper>,
    )

    const region = screen.getByRole('region', { name: ARIA_LABEL })
    attachViewportScrollMock(region, { scrollWidth: 1000, clientWidth: 200, scrollLeft: 800 })
    fireEvent.scroll(region)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Ver itens anteriores' })).not.toBeDisabled()
      expect(screen.getByRole('button', { name: 'Ver próximos itens' })).toBeDisabled()
    })
  })

  it('Should disable both controls when there is nothing to scroll', async () => {
    render(
      <CarouselWrapper ariaLabel={ARIA_LABEL}>
        <div>Item</div>
      </CarouselWrapper>,
    )

    const region = screen.getByRole('region', { name: ARIA_LABEL })
    attachViewportScrollMock(region, { scrollWidth: 400, clientWidth: 400, scrollLeft: 0 })
    fireEvent.scroll(region)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Ver itens anteriores' })).toBeDisabled()
      expect(screen.getByRole('button', { name: 'Ver próximos itens' })).toBeDisabled()
    })
  })

  it('Should call scrollBy on viewport when next is clicked', async () => {
    const user = userEvent.setup()
    render(
      <CarouselWrapper ariaLabel={ARIA_LABEL}>
        <div>Item</div>
      </CarouselWrapper>,
    )

    const region = screen.getByRole('region', { name: ARIA_LABEL })
    attachViewportScrollMock(region, { scrollWidth: 1000, clientWidth: 200, scrollLeft: 0 })
    fireEvent.scroll(region)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Ver próximos itens' })).not.toBeDisabled()
    })

    const scrollBySpy = vi.fn()
    region.scrollBy = scrollBySpy
    await user.click(screen.getByRole('button', { name: 'Ver próximos itens' }))

    expect(scrollBySpy).toHaveBeenCalledWith(
      expect.objectContaining({
        left: expect.any(Number),
        behavior: 'smooth',
      }),
    )
    expect(scrollBySpy.mock.calls[0][0].left).toBeGreaterThan(0)
  })

  it('Should call scrollBy with negative delta when previous is clicked', async () => {
    const user = userEvent.setup()
    render(
      <CarouselWrapper ariaLabel={ARIA_LABEL}>
        <div>Item</div>
      </CarouselWrapper>,
    )

    const region = screen.getByRole('region', { name: ARIA_LABEL })
    attachViewportScrollMock(region, { scrollWidth: 1000, clientWidth: 200, scrollLeft: 400 })
    fireEvent.scroll(region)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Ver itens anteriores' })).not.toBeDisabled()
    })

    const scrollBySpy = vi.fn()
    region.scrollBy = scrollBySpy
    await user.click(screen.getByRole('button', { name: 'Ver itens anteriores' }))

    expect(scrollBySpy).toHaveBeenCalledWith(
      expect.objectContaining({
        left: expect.any(Number),
        behavior: 'smooth',
      }),
    )
    expect(scrollBySpy.mock.calls[0][0].left).toBeLessThan(0)
  })
})
