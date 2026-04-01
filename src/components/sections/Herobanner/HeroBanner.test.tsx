import { render, screen, within } from '@testing-library/react'
import { HeroBanner } from './heroBanner'
import buttonStyles from '../../ui/Button/Button.module.scss'
import styles from './HeroBanner.module.scss'

describe('HeroBanner', () => {
  it('Should expose a region landmark with accessible name', () => {
    render(<HeroBanner />)

    expect(screen.getByRole('region', { name: 'Banner de promocoes' })).toBeInTheDocument()
  })

  it('Should render the main heading', () => {
    render(<HeroBanner />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Venha conhecer nossas promocoes/i,
      }),
    ).toBeInTheDocument()
  })

  it('Should render promotional subtitle with highlighted discount', () => {
    render(<HeroBanner />)

    expect(screen.getByText('50% Off')).toBeInTheDocument()
    expect(screen.getByText(/nos produtos/i)).toBeInTheDocument()
  })

  it('Should render background image as decorative with banner asset', () => {
    const { container } = render(<HeroBanner />)

    const bannerImg = container.querySelector('img')
    expect(bannerImg).toBeInTheDocument()
    expect(bannerImg).toHaveAttribute('alt', '')
    expect(bannerImg).toHaveAttribute('src', expect.stringContaining('img-banner.png'))
  })

  it('Should render primary CTA button', () => {
    render(<HeroBanner />)

    const button = screen.getByRole('button', { name: 'Ver produto' })
    expect(button).toHaveClass(buttonStyles.buttonBase)
    expect(button).toHaveClass(buttonStyles.buttonPrimary)
  })

  it('Should apply layout module classes to structure', () => {
    render(<HeroBanner />)

    const region = screen.getByRole('region', { name: 'Banner de promocoes' })
    expect(region).toHaveClass(styles.heroBanner)

    const bannerImg = region.querySelector('img')
    expect(bannerImg).toHaveClass(styles.bannerImage)

    const hasOverlay = Array.from(region.querySelectorAll('div')).some((el) =>
      el.classList.contains(styles.overlay),
    )
    expect(hasOverlay).toBe(true)

    const heading = within(region).getByRole('heading', { level: 1 })
    expect(heading.parentElement).toHaveClass(styles.content)
  })
})
