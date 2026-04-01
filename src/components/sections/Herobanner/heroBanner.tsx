import bannerImage from '../../../assets/img-banner.png'
import { Button } from '../../ui/Button/Button'
import styles from './HeroBanner.module.scss'

export function HeroBanner() {
  return (
    <section className={styles.heroBanner} aria-label="Banner de promocoes">
      <img src={bannerImage} alt="" className={styles.bannerImage} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>Venha conhecer nossas <br />promocoes</h1>
        <p className={styles.subtitle}>
          <strong>50% Off</strong> nos produtos
        </p>
        <Button variant="primary">Ver produto</Button>
      </div>
    </section>
  )
}