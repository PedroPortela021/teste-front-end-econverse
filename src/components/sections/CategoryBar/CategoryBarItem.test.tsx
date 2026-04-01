import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CategoryBarItem } from './CategoryBarItem'
import styles from './CategoryBarItem.module.scss'

describe('CategoryBarItem', () => {
  it('Should render label and children', () => {
    render(
      <CategoryBarItem label="Tecnologia">
        <span data-testid="icon" aria-hidden>
          icon
        </span>
      </CategoryBarItem>,
    )

    expect(screen.getByRole('button', { name: 'Tecnologia' })).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('Should use primary bar item classes and not active by default', () => {
    render(
      <CategoryBarItem label="Moda">
        <span aria-hidden>x</span>
      </CategoryBarItem>,
    )

    const button = screen.getByRole('button', { name: 'Moda' })
    expect(button).toHaveClass(styles.barItem)
    expect(button).not.toHaveClass(styles.active)
    expect(button).toHaveAttribute('aria-pressed', 'false')
  })

  it('Should apply active class and aria-pressed when active', () => {
    render(
      <CategoryBarItem label="Bebidas" active>
        <span aria-hidden>x</span>
      </CategoryBarItem>,
    )

    const button = screen.getByRole('button', { name: 'Bebidas' })
    expect(button).toHaveClass(styles.barItem, styles.active)
    expect(button).toHaveAttribute('aria-pressed', 'true')
  })

  it('Should call onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <CategoryBarItem label="Ferramentas" onClick={handleClick}>
        <span aria-hidden>x</span>
      </CategoryBarItem>,
    )

    await user.click(screen.getByRole('button', { name: 'Ferramentas' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('Should render surface and label structure', () => {
    const { container } = render(
      <CategoryBarItem label="Saúde">
        <img src="/x.png" alt="" />
      </CategoryBarItem>,
    )

    const button = screen.getByRole('button', { name: 'Saúde' })
    expect(button.querySelector(`.${styles.surface}`)).toBeInTheDocument()
    expect(button.querySelector(`.${styles.label}`)).toHaveTextContent('Saúde')
    expect(container.querySelector('img')).toHaveAttribute('alt', '')
  })
})
