import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'
import styles from './Button.module.scss'

describe('Button', () => {
  it('Should use primary variant by default', () => {
    render(<Button>Ver produto</Button>)

    const button = screen.getByRole('button', { name: 'Ver produto' })
    expect(button).toHaveClass(styles.buttonBase)
    expect(button).toHaveClass(styles.buttonPrimary)
  })

  it('Should apply secondary variant when provided', () => {
    render(<Button variant="secondary">Saiba mais</Button>)

    const button = screen.getByRole('button', { name: 'Saiba mais' })
    expect(button).toHaveClass(styles.buttonBase)
    expect(button).toHaveClass(styles.buttonSecondary)
  })

  it('Should forward native button attributes', () => {
    render(
      <Button type="submit" disabled aria-label="Enviar formulario">
        Enviar
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Enviar formulario' })
    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toBeDisabled()
  })

  it('Should merge custom className with variant classes', () => {
    render(
      <Button className="custom-btn" variant="primary">
        Acao
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Acao' })
    expect(button).toHaveClass(styles.buttonBase, styles.buttonPrimary, 'custom-btn')
  })

  it('Should call onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Clicar</Button>)

    await user.click(screen.getByRole('button', { name: 'Clicar' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
