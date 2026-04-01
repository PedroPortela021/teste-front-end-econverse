import { useState } from 'react'
import type { Product } from '../../../types/product'
import { useProducts } from '../../../data/hooks/useProducts'
import { formatPriceBRLFromCents } from '../../../lib/formatPriceBRL'
import { Button } from '../../ui/Button/Button'
import { CarouselWrapper } from '../../ui/CarouselWrapper/CarouselWrapper'
import { ProductCard } from '../../ui/ProductCard/ProductCard'
import { ProductModal } from '../../ui/ProductModal/ProductModal'
import styles from './ProductCarousel.module.scss'

const RELATED_TABS = [
  'Celular',
  'Acessórios',
  'Tablets',
  'Notebooks',
  'TVs',
  'Ver todos',
] as const

function listPriceFromCurrent(cents: number): number {
  return Math.round(cents * 1.08)
}

function installmentLabelFor(cents: number): string {
  const half = Math.ceil(cents / 2)
  return `ou 2x de ${formatPriceBRLFromCents(half)} sem juros`
}

export function ProductCarousel() {
  const [activeTab, setActiveTab] = useState<(typeof RELATED_TABS)[number]>(RELATED_TABS[0])
  const [modalProduct, setModalProduct] = useState<Product | null>(null)
  const [modalKey, setModalKey] = useState(0)
  const { products, isLoading, error, refetch } = useProducts()

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

        {isLoading ? (
          <p className={styles.feedback} role="status" aria-live="polite">
            Carregando produtos…
          </p>
        ) : null}

        {error ? (
          <div className={styles.feedback} role="alert">
            <p className={styles.feedbackMessage}>{error}</p>
            <Button type="button" variant="primary" onClick={refetch}>
              Tentar novamente
            </Button>
          </div>
        ) : null}

        {!isLoading && !error && products.length === 0 ? (
          <p className={styles.feedback} role="status">
            Nenhum produto encontrado.
          </p>
        ) : null}

        {!isLoading && !error && products.length > 0 ? (
          <CarouselWrapper
            className={styles.carousel}
            ariaLabel="Lista de produtos relacionados"
          >
            {products.map((product, index) => (
              <ProductCard
                key={`${product.productName}-${index}`}
                product={product}
                listPriceCents={listPriceFromCurrent(product.price)}
                installmentLabel={installmentLabelFor(product.price)}
                onOpen={() => {
                  setModalProduct(product)
                  setModalKey((k) => k + 1)
                }}
              />
            ))}
          </CarouselWrapper>
        ) : null}

        <ProductModal
          key={modalKey}
          product={modalProduct}
          listPriceCents={
            modalProduct ? listPriceFromCurrent(modalProduct.price) : undefined
          }
          onClose={() => setModalProduct(null)}
        />
      </div>
    </section>
  )
}
