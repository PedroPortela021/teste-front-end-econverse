import { Seo } from '../../components/seo/Seo'
import { NewsletterBar } from '../../components/layout/Footer/NewsletterBar'
import { SiteFooter } from '../../components/layout/Footer/SiteFooter'
import { NavMenu } from '../../components/layout/Header/NavMenu/NavMenu'
import { Navbar } from '../../components/layout/Header/Navbar/Navbar'
import { TopBar } from '../../components/layout/Header/TopBar/TopBar'
import { BrandsSection } from '../../components/sections/BrandsSection/BrandsSection'
import { CategoryBar } from '../../components/sections/CategoryBar/CategoryBar'
import { PartnersSection } from '../../components/sections/PartnersSection/PartnersSection'
import { ProductCarousel } from '../../components/sections/ProductCarousel/ProductCarousel'
import { HeroBanner } from '../../components/sections/Herobanner/heroBanner'
import styles from './Home.module.scss'

export function Home() {
  return (
    <main className={styles.home}>
      <Seo />
      <header>
        <TopBar />
        <Navbar />
        <NavMenu />
      </header>

      <section className={styles.fullWidthSection}>
        <HeroBanner />
      </section>
      <CategoryBar />
      <ProductCarousel />
      <PartnersSection />
      <BrandsSection />
      <NewsletterBar />
      <SiteFooter />
    </main>
  )
}
