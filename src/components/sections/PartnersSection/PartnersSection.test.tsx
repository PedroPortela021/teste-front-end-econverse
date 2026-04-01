import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PartnersSection } from './PartnersSection'

describe('PartnersSection', () => {
  it('Should render section landmark and two partner cards', () => {
    render(<PartnersSection />)

    expect(screen.getByRole('region', { name: 'Parceiros' })).toBeInTheDocument()
    const headings = screen.getAllByRole('heading', { level: 2, name: 'Parceiros' })
    expect(headings).toHaveLength(2)
  })

  it('Should open modal when a partner card is activated', async () => {
    const user = userEvent.setup()
    render(<PartnersSection />)

    const [firstTitle] = screen.getAllByRole('heading', { level: 2, name: 'Parceiros' })
    await user.click(firstTitle)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(within(dialog).getByRole('heading', { level: 2, name: 'Parceiros' })).toBeInTheDocument()
  })
})
