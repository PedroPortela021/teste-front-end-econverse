import { useState } from 'react'
import type { Product } from '../../../types/product'
import { formatPriceBRLFromCents } from '../../../lib/formatPriceBRL'
import { CarouselWrapper } from '../../ui/CarouselWrapper/CarouselWrapper'
import { ProductCard } from '../../ui/ProductCard/ProductCard'
import styles from './ProductCarousel.module.scss'

const RELATED_TABS = [
  'Celular',
  'Acessórios',
  'Tablets',
  'Notebooks',
  'TVs',
  'Ver todos',
] as const

/** Dados mockados espelhando a API; substituídos por fetch na integração. */
const MOCK_PRODUCTS: Product[] = [
  {
    productName: 'Iphone 11 PRO MAX BRANCO 1',
    descriptionShort: 'Iphone 11 PRO MAX BRANCO 1',
    photo:
      'https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png',
    price: 150_00,
  },
  {
    productName: 'IPHONE 13 MINI 1',
    descriptionShort: 'IPHONE 13 MINI 1',
    photo:
      'https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png',
    price: 90_00,
  },
  {
    productName: 'Iphone 11 PRO MAX BRANCO 2',
    descriptionShort: 'Iphone 11 PRO MAX BRANCO 2',
    photo:
      'https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png',
    price: 149_90,
  },
  {
    productName: 'IPHONE 13 MINI 2',
    descriptionShort: 'IPHONE 13 MINI 2',
    photo:
      'https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png',
    price: 120_00,
  },
  {
    productName: 'Iphone 11 PRO MAX BRANCO 3',
    descriptionShort: 'Iphone 11 PRO MAX BRANCO 3',
    photo:
      'https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png',
    price: 45_50,
  },
  {
    productName: 'IPHONE 13 MINI 3',
    descriptionShort: 'IPHONE 13 MINI 3',
    photo:
      'https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png',
    price: 380_00,
  },
  {
    productName: 'Iphone 11 PRO MAX BRANCO 4',
    descriptionShort: 'Iphone 11 PRO MAX BRANCO 4',
    photo:
      'https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png',
    price: 420_00,
  },
  {
    productName: 'IPHONE 13 MINI 4',
    descriptionShort: 'IPHONE 13 MINI 4',
    photo:
      'https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png',
    price: 5_20,
  },
  {
    productName: 'Iphone 11 PRO MAX BRANCO 5',
    descriptionShort: 'Iphone 11 PRO MAX BRANCO 5',
    photo:
      'https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png',
    price: 1499_90,
  },
  {
    productName: 'IPHONE 13 MINI 5',
    descriptionShort: 'IPHONE 13 MINI 5',
    photo:
      'https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png',
    price: 1000_00,
  },
]

function listPriceFromCurrent(cents: number): number {
  return Math.round(cents * 1.08)
}

function installmentLabelFor(cents: number): string {
  const half = Math.ceil(cents / 2)
  return `ou 2x de ${formatPriceBRLFromCents(half)} sem juros`
}

export function ProductCarousel() {
  const [activeTab, setActiveTab] = useState<(typeof RELATED_TABS)[number]>(RELATED_TABS[0])

  return (
    <section className={styles.section} aria-labelledby="related-products-heading">
      <div className={styles.inner}>
        <div className={styles.titleRow}>
          <span className={styles.titleLine} aria-hidden="true" />
          <h2 id="related-products-heading" className={styles.title}>
            Produtos relacionados
          </h2>
          <span className={styles.titleLine} aria-hidden="true" />
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Categorias de produtos relacionados">
          {RELATED_TABS.map((label) => {
            const active = activeTab === label
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={active}
                className={`${styles.tab} ${active ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(label)}
              >
                {label.toUpperCase()}
              </button>
            )
          })}
        </div>

        <CarouselWrapper
          className={styles.carousel}
          ariaLabel="Lista de produtos relacionados"
        >
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard
              key={product.productName}
              product={product}
              listPriceCents={listPriceFromCurrent(product.price)}
              installmentLabel={installmentLabelFor(product.price)}
            />
          ))}
        </CarouselWrapper>
      </div>
    </section>
  )
}
