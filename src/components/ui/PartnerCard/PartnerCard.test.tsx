import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { PartnerSpotlight } from '../../../types/partner'
import { PartnerCard } from './PartnerCard'
import styles from './PartnerCard.module.scss'

const partner: PartnerSpotlight = {
  id: 'p1',
  title: 'Parceiros',
  description: 'Lorem ipsum dolor sit amet',
  imageUrl: 'https://example.com/bg.jpg',
  imageAlt: 'Loja parceira',
}

describe('PartnerCard', () => {
  it('Should render title, description and CTA', () => {
    render(<PartnerCard partner={partner} onOpen={vi.fn()} />)

    expect(screen.getByRole('heading', { level: 2, name: partner.title })).toHaveClass(styles.title)
    expect(screen.getByText(partner.description)).toHaveClass(styles.description)
    expect(screen.getByRole('button', { name: 'Confira' })).toHaveClass(styles.cta)
  })

  it('Should call onOpen when card is activated with click', async () => {
    const user = userEvent.setup()
    const onOpen = vi.fn()
    render(<PartnerCard partner={partner} onOpen={onOpen} />)

    await user.click(screen.getByRole('heading', { level: 2 }))
    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('Should call onOpen when Confira is clicked', async () => {
    const user = userEvent.setup()
    const onOpen = vi.fn()
    render(<PartnerCard partner={partner} onOpen={onOpen} />)

    await user.click(screen.getByRole('button', { name: 'Confira' }))
    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('Should call onOpen with Enter on focused card', async () => {
    const user = userEvent.setup()
    const onOpen = vi.fn()
    render(<PartnerCard partner={partner} onOpen={onOpen} />)

    screen.getByRole('heading', { level: 2 }).closest('article')!.focus()
    await user.keyboard('{Enter}')
    expect(onOpen).toHaveBeenCalledTimes(1)
  })
})
