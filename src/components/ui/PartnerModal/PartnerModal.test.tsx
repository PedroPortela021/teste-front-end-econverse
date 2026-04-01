import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { PartnerSpotlight } from '../../../types/partner'
import { PartnerModal } from './PartnerModal'
import styles from './PartnerModal.module.scss'

const partner: PartnerSpotlight = {
  id: 'p1',
  title: 'Parceiros',
  description: 'Texto do parceiro',
  imageUrl: 'https://example.com/x.jpg',
  imageAlt: 'Foto',
}

describe('PartnerModal', () => {
  it('Should render nothing when partner is null', () => {
    render(<PartnerModal partner={null} onClose={vi.fn()} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('Should render dialog with partner content', () => {
    render(<PartnerModal partner={partner} onClose={vi.fn()} />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: partner.title })).toHaveClass(styles.title)
    expect(screen.getByText(partner.description)).toHaveClass(styles.description)
  })

  it('Should call onClose from close button', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<PartnerModal partner={partner} onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: 'Fechar' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('Should call onClose on Escape', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<PartnerModal partner={partner} onClose={onClose} />)

    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('Should call onClose when overlay is clicked', () => {
    const onClose = vi.fn()
    const { baseElement } = render(<PartnerModal partner={partner} onClose={onClose} />)

    const overlay = baseElement.querySelector(`.${styles.overlay}`)
    expect(overlay).not.toBeNull()
    fireEvent.click(overlay as HTMLElement)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
