import { render, screen, within } from '@testing-library/react'
import { Navbar } from './Navbar'

describe('Navbar', () => {
  it('Should render the logo image', () => {
    render(<Navbar />)

    const logoLink = screen.getByRole('link', { name: 'Ir para pagina inicial' })
    const logoImage = within(logoLink).getByRole('img', { name: 'Econverse' })

    expect(logoImage).toBeInTheDocument()
    expect(logoImage).toHaveAttribute('src', expect.stringContaining('img-logo.png'))
  })

  it('Should render the search form with input and button', () => {
    render(<Navbar />)

    expect(screen.getByRole('search', { name: 'Buscar produtos' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Buscar produtos' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument()
  })

  it('Should render the four user action buttons', () => {
    render(<Navbar />)

    expect(screen.getByRole('button', { name: 'Pedidos' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Favoritos' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Conta' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Carrinho' })).toBeInTheDocument()
  })

  it('Should hide decorative icons from assistive technology', () => {
    const { container } = render(<Navbar />)

    const decorativeIcons = container.querySelectorAll('svg[aria-hidden="true"]')
    expect(decorativeIcons).toHaveLength(5)
  })
})
