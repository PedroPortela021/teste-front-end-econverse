import type { Product } from '../../../types/product'
import { formatPriceBRLFromCents } from '../../../lib/formatPriceBRL'
import { Button } from '../Button/Button'
import styles from './ProductCard.module.scss'

export type ProductCardProps = {
  product: Product
  /** Preço “de” em centavos; se omitido, a linha riscada não é exibida. */
  listPriceCents?: number
  /** Texto exibido abaixo do preço (ex.: parcelas). */
  installmentLabel?: string
  freeShipping?: boolean
  onBuy?: () => void
}

export function ProductCard({
  product,
  listPriceCents,
  installmentLabel,
  freeShipping = true,
  onBuy,
}: ProductCardProps) {
  const { photo, descriptionShort, price, productName } = product

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          className={styles.image}
          src={photo}
          alt={productName}
          width={278}
          height={228}
          loading="lazy"
        />
      </div>
      <p className={styles.description}>{descriptionShort}</p>
      <div className={styles.prices}>
        {listPriceCents != null && listPriceCents > price ? (
          <span className={styles.listPrice}>{formatPriceBRLFromCents(listPriceCents)}</span>
        ) : null}
        <span className={styles.currentPrice}>{formatPriceBRLFromCents(price)}</span>
      </div>
      {installmentLabel ? <p className={styles.installment}>{installmentLabel}</p> : null}
      {freeShipping ? <p className={styles.shipping}>Frete grátis</p> : null}
      <Button type="button" variant="secondary" className={styles.buyButton} onClick={onBuy}>
        Comprar
      </Button>
    </article>
  )
}
