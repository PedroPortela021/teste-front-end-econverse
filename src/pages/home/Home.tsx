import { NavMenu } from '../../components/layout/Header/NavMenu/NavMenu'
import { Navbar } from '../../components/layout/Header/Navbar/Navbar'
import { TopBar } from '../../components/layout/Header/TopBar/TopBar'
import styles from './Home.module.scss'

export function Home() {
  return (
    <main className={styles.home}>
      <header>
        <TopBar />
        <Navbar />
        <NavMenu />
      </header>

      <section className={styles.section}>
        <div className={styles.container}>Conteudo da secao 1</div>
      </section>

      <section className={styles.fullWidthSection}>
        <div className={styles.container}>Conteudo da secao full width</div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>Conteudo da secao 2</div>
      </section>
    </main>
  )
}
