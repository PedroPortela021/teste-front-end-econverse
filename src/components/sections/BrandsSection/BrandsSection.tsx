import logoImage from '../../../assets/img-logo.png'
import styles from './BrandsSection.module.scss'

const BRAND_SLOTS = [0, 1, 2, 3, 4] as const

export function BrandsSection() {
  return (
    <section className={styles.section} aria-labelledby="brands-section-heading">
      <div className={styles.inner}>
        <h2 id="brands-section-heading" className={styles.title}>
          Navegue por marcas
        </h2>
        <ul className={styles.list}>
          {BRAND_SLOTS.map((index) => (
            <li key={index} className={styles.item}>
              <a
                className={styles.sphere}
                href="#"
                aria-label={`Econverse, marca ${index + 1} de ${BRAND_SLOTS.length}`}
                onClick={(e) => e.preventDefault()}
              >
                <img src={logoImage} alt="" className={styles.logo} width={120} height={36} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
