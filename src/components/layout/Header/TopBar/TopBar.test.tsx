import { render, screen, within } from '@testing-library/react'
import { TopBar } from './TopBar'

describe('TopBar', () => {
  it('Should expose a complementary landmark with accessible name', () => {
    render(<TopBar />)

    expect(
      screen.getByRole('complementary', { name: 'Informacoes de compra' })
    ).toBeInTheDocument()
  })

  it('Should render purchase information container', () => {
    render(<TopBar />)

    expect(screen.getByLabelText('Informacoes de compra')).toBeInTheDocument()
  })

  it('Should display the three top bar benefits', () => {
    render(<TopBar />)

    const list = screen.getByRole('list')
    const items = within(list).getAllByRole('listitem')

    expect(items).toHaveLength(3)
    expect(screen.getByText('100% segura')).toBeInTheDocument()
    expect(screen.getByText('Frete gratis')).toBeInTheDocument()
    expect(screen.getByText('Parcele')).toBeInTheDocument()
  })

  it('Should render the decorative bottom divider', () => {
    const { container } = render(<TopBar />)

    const decorators = container.querySelectorAll('[aria-hidden="true"]')
    expect(decorators.length).toBeGreaterThanOrEqual(4)
  })

  it('Should hide decorative icons from assistive technology', () => {
    const { container } = render(<TopBar />)

    const decorativeIcons = container.querySelectorAll('svg[aria-hidden="true"]')
    expect(decorativeIcons).toHaveLength(3)
  })
})
