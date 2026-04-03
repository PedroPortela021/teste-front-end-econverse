import styles from './Navbar.module.scss'
import { Input } from '../../../ui/Input/Input'
import logoImage from '../../../../assets/img-logo.png'
import iconMagnifyingGlass from '../../../../assets/icon-magnifying-glass.png'
import iconGroup from '../../../../assets/icon-group.png'
import iconHeart from '../../../../assets/icon-heart.png'
import iconUserCircle from '../../../../assets/icon-user-circle.png'
import iconShoppingCart from '../../../../assets/icon-shopping-cart.png'

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
            <img
              src={iconMagnifyingGlass}
              alt=""
              width={24}
              height={24}
              aria-hidden={true}
              className={styles.searchIcon}
            />
          </button>
        </form>

        <nav className={styles.actions} aria-label="Acoes do usuario">
          <ul className={styles.actionsList}>
            <li>
              <button type="button" className={styles.actionBtn} aria-label="Pedidos">
                <img
                  src={iconGroup}
                  alt=""
                  width={32}
                  height={32}
                  aria-hidden={true}
                  className={styles.icon}
                />
              </button>
            </li>

            <li>
              <button type="button" className={styles.actionBtn} aria-label="Favoritos">
                <img
                  src={iconHeart}
                  alt=""
                  width={32}
                  height={32}
                  aria-hidden={true}
                  className={styles.icon}
                />
              </button>
            </li>

            <li>
              <button type="button" className={styles.actionBtn} aria-label="Conta">
                <img
                  src={iconUserCircle}
                  alt=""
                  width={32}
                  height={32}
                  aria-hidden={true}
                  className={styles.icon}
                />
              </button>
            </li>

            <li>
              <button type="button" className={styles.actionBtn} aria-label="Carrinho">
                <img
                  src={iconShoppingCart}
                  alt=""
                  width={32}
                  height={32}
                  aria-hidden={true}
                  className={styles.icon}
                />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
