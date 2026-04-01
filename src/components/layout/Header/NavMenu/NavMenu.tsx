import { SectionDivider } from '../../../ui/SectionDivider/SectionDivider'
import crownIcon from '../../../../assets/CrownSimple.png'
import styles from './NavMenu.module.scss'

const menuItems = [
  'Todas categorias',
  'Supermercado',
  'Livros',
  'Moda',
  'Lancamentos',
  'Ofertas do dia',
]

export function NavMenu() {
  return (
    <nav className={styles.menu} aria-label="Menu principal">
      <SectionDivider />
      <div className={styles.container}>
        <ul className={styles.list}>
          {menuItems.map((item) => (
            <li key={item}>
              <a
                href="/"
                className={item === 'Ofertas do dia' ? styles.offerLink : styles.link}
              >
                {item}
              </a>
            </li>
          ))}
          <li>
            <a href="/" className={styles.subscriptionLink}>
              <img src={crownIcon} alt="" aria-hidden="true" className={styles.icon} />
              Assinatura
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
