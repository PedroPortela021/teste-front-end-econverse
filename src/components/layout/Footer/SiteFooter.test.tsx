import { render, screen, within } from '@testing-library/react'
import { SiteFooter } from './SiteFooter'

describe('SiteFooter', () => {
  it('Should render branding, columns and copyright', () => {
    render(<SiteFooter />)

    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Econverse' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Econverse, página inicial' })).toBeInTheDocument()

    const nav = screen.getByRole('navigation', { name: 'Links do rodapé' })
    expect(within(nav).getByRole('heading', { name: 'Institucional' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'Sobre Nós' })).toBeInTheDocument()
    expect(within(nav).getByRole('heading', { name: 'Ajuda' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'Suporte' })).toBeInTheDocument()
    expect(within(nav).getByRole('heading', { name: 'Termos' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'Termos e Condições' })).toBeInTheDocument()

    expect(screen.getByRole('link', { name: 'Instagram' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Facebook' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument()

    expect(screen.getByText(/Todos os direitos reservados/i)).toBeInTheDocument()
  })
})
