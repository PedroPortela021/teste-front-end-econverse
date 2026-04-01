import { render, screen } from '@testing-library/react'
import { Input } from './Input'
import styles from './Input.module.scss'

describe('Input', () => {
  it('Should use primary variant by default', () => {
    render(<Input placeholder="Buscar produtos" />)

    const input = screen.getByPlaceholderText('Buscar produtos')
    expect(input).toHaveClass(styles.inputBase)
    expect(input).toHaveClass(styles.inputPrimary)
  })

  it('Should apply secondary variant when provided', () => {
    render(<Input variant="secondary" placeholder="Email" />)

    const input = screen.getByPlaceholderText('Email')
    expect(input).toHaveClass(styles.inputBase)
    expect(input).toHaveClass(styles.inputSecondary)
  })

  it('Should apply light variant when provided', () => {
    render(<Input variant="light" placeholder="Nome" />)

    const input = screen.getByPlaceholderText('Nome')
    expect(input).toHaveClass(styles.inputBase)
    expect(input).toHaveClass(styles.inputLight)
  })

  it('Should forward native input attributes', () => {
    render(<Input id="search-products" type="search" defaultValue="notebook" />)

    const input = screen.getByDisplayValue('notebook')
    expect(input).toHaveAttribute('id', 'search-products')
    expect(input).toHaveAttribute('type', 'search')
  })
})
