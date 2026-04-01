import { render, screen, within } from '@testing-library/react'
import { BrandsSection } from './BrandsSection'
import styles from './BrandsSection.module.scss'

describe('BrandsSection', () => {
  it('Should render heading and five brand spheres', () => {
    render(<BrandsSection />)

    expect(screen.getByRole('heading', { level: 2, name: 'Navegue por marcas' })).toHaveClass(
      styles.title,
    )

    const list = screen.getByRole('list')
    expect(list).toHaveClass(styles.list)
    const items = within(list).getAllByRole('listitem')
    expect(items).toHaveLength(5)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(5)
    links.forEach((link) => {
      expect(link).toHaveClass(styles.sphere)
    })
  })
})
