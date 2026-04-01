import { render, screen } from '@testing-library/react'
import { NewsletterBar } from './NewsletterBar'
import inputStyles from '../../ui/Input/Input.module.scss'

describe('NewsletterBar', () => {
  it('Should render heading and subscription form with light inputs', () => {
    render(<NewsletterBar />)

    expect(screen.getByRole('region', { name: /newsletter/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Inscreva-se na nossa newsletter' }),
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Digite seu nome')).toHaveClass(inputStyles.inputLight)
    expect(screen.getByPlaceholderText('Digite seu e-mail')).toHaveClass(inputStyles.inputLight)
    expect(screen.getByRole('checkbox', { name: /termos e condições/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Inscrever' })).toBeInTheDocument()
  })
})
