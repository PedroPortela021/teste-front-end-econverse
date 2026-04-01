import { NavMenu } from '../../components/layout/Header/NavMenu/NavMenu'
import { Navbar } from '../../components/layout/Header/Navbar/Navbar'
import { TopBar } from '../../components/layout/Header/TopBar/TopBar'
import { CategoryBar } from '../../components/sections/CategoryBar/CategoryBar'
import { HeroBanner } from '../../components/sections/Herobanner/heroBanner'
import styles from './Home.module.scss'

export function Home() {
  return (
    <main className={styles.home}>
      <header>
        <TopBar />
        <Navbar />
        <NavMenu />
      </header>

      <section className={styles.fullWidthSection}>
        <HeroBanner />
      </section>
      <CategoryBar />
    </main>
  )
}
