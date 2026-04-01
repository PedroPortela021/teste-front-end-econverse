import { render, screen } from '@testing-library/react'

describe('RTL setup', () => {
  it('renderiza componentes React no ambiente de teste', () => {
    render(<h1>Teste funcionando</h1>)
    expect(screen.getByRole('heading', { name: 'Teste funcionando' })).toBeInTheDocument()
  })
})
