import styles from './Navbar.module.scss'
import { Input } from '../../../ui/Input/Input'
import logoImage from '../../../../assets/img-logo.png'

export function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <a className={styles.logo} href="/" aria-label="Ir para pagina inicial">
          <img src={logoImage} alt="Econverse" className={styles.logoImage} />
        </a>

        <form className={styles.search} role="search" aria-label="Buscar produtos">
          <label htmlFor="search-products" className={styles.srOnly}>
            Buscar produtos
          </label>
          <Input
            id="search-products"
            type="text"
            placeholder="O que voce esta buscando?"
            variant="primary"
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton} aria-label="Buscar">
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.searchIcon}>
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
          </button>
        </form>

        <nav className={styles.actions} aria-label="Acoes do usuario">
          <ul className={styles.actionsList}>
            <li>
              <button type="button" className={styles.actionBtn} aria-label="Pedidos">
                <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 10h18" />
                  <path d="M8 15h3M13 15h3" />
                </svg>
              </button>
            </li>

            <li>
              <button type="button" className={styles.actionBtn} aria-label="Favoritos">
                <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
                  <path d="M12 20s-7-4.6-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.4-7 10-7 10z" />
                </svg>
              </button>
            </li>

            <li>
              <button type="button" className={styles.actionBtn} aria-label="Conta">
                <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20a8 8 0 0116 0" />
                </svg>
              </button>
            </li>

            <li>
              <button type="button" className={styles.actionBtn} aria-label="Carrinho">
                <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
                  <circle cx="9" cy="19" r="1.5" />
                  <circle cx="17" cy="19" r="1.5" />
                  <path d="M3 4h2l2.2 10.5h10.8l2-7.5H6.2" />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
