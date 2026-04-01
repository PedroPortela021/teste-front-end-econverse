import { render, screen, within } from '@testing-library/react'
import { NavMenu } from './NavMenu'

describe('NavMenu', () => {
  it('Should expose a navigation landmark with accessible name', () => {
    render(<NavMenu />)

    expect(screen.getByRole('navigation', { name: 'Menu principal' })).toBeInTheDocument()
  })

  it('Should render all primary menu links and subscription link', () => {
    render(<NavMenu />)

    const nav = screen.getByRole('navigation', { name: 'Menu principal' })
    const links = within(nav).getAllByRole('link')

    expect(links).toHaveLength(7)
    expect(screen.getByRole('link', { name: 'Todas categorias' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Supermercado' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Livros' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Moda' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Lancamentos' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ofertas do dia' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Assinatura' })).toBeInTheDocument()
  })

  it('Should hide subscription icon from assistive technology', () => {
    const { container } = render(<NavMenu />)

    const decorativeImage = container.querySelector('img[aria-hidden="true"]')
    expect(decorativeImage).toBeInTheDocument()
    expect(decorativeImage).toHaveAttribute('alt', '')
  })
})
