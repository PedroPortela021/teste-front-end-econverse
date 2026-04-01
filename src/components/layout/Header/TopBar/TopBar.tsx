import { SectionDivider } from '../../../ui/SectionDivider/SectionDivider'
import styles from './TopBar.module.scss'

export function TopBar() {
  return (
    <aside className={styles.topBar} aria-label="Informacoes de compra">
      <div className={styles.container}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
              <path d="M12 3l7 3v6c0 4.4-3.1 8.3-7 9-3.9-.7-7-4.6-7-9V6l7-3z" />
              <path d="M8.5 12.5l2.1 2.1 4.9-4.9" />
            </svg>
            <p className={styles.text}>
              Compra <strong>100% segura</strong>
            </p>
          </li>

          <li className={styles.item}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
              <path d="M2 7h13v8H2z" />
              <path d="M15 10h3l3 3v2h-6z" />
              <circle cx="7" cy="17" r="1.5" />
              <circle cx="17" cy="17" r="1.5" />
            </svg>
            <p className={styles.text}>
              <strong>Frete gratis</strong> acima de R$ 200
            </p>
          </li>

          <li className={styles.item}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 10h18" />
            </svg>
            <p className={styles.text}>
              <strong>Parcele</strong> suas compras
            </p>
          </li>
        </ul>
      </div>
      <SectionDivider position="bottom" />
    </aside>
  )
}
