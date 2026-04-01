import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Product } from '../../../types/product'
import { formatPriceBRLFromCents } from '../../../lib/formatPriceBRL'
import { Button } from '../Button/Button'
import styles from './ProductModal.module.scss'

export type ProductModalProps = {
  product: Product | null
  onClose: () => void
  /** Preço “de” em centavos; exibido riscado quando maior que o preço atual. */
  listPriceCents?: number
}

export function ProductModal({ product, onClose, listPriceCents }: ProductModalProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const [quantity, setQuantity] = useState(1)

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!product) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => {
      closeRef.current?.focus()
    }, 0)
    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = prevOverflow
    }
  }, [product])

  useEffect(() => {
    if (!product) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [product, handleClose])

  if (!product) {
    return null
  }

  const { photo, descriptionShort, price, productName } = product
  const showListPrice = listPriceCents != null && listPriceCents > price
  const qtyLabel = String(quantity).padStart(2, '0')

  const modal = (
    <div
      className={styles.overlay}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          aria-label="Fechar"
          onClick={handleClose}
        >
          ×
        </button>

        <div className={styles.imageCol}>
          <img
            className={styles.image}
            src={photo}
            alt=""
            width={400}
            height={400}
          />
        </div>

        <div className={styles.content}>
          <h2 id={titleId} className={styles.title}>
            {productName}
          </h2>

          <div className={styles.prices}>
            {showListPrice ? (
              <span className={styles.listPrice}>{formatPriceBRLFromCents(listPriceCents)}</span>
            ) : null}
            <span className={styles.currentPrice}>{formatPriceBRLFromCents(price)}</span>
          </div>

          <p className={styles.description}>{descriptionShort}</p>

          <button type="button" className={styles.detailsLink}>
            Veja mais detalhes do produto &gt;
          </button>

          <div className={styles.actions}>
            <div className={styles.quantity} role="group" aria-label="Quantidade">
              <button
                type="button"
                className={styles.qtyBtn}
                aria-label="Diminuir quantidade"
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className={styles.qtyValue} aria-live="polite">
                {qtyLabel}
              </span>
              <button
                type="button"
                className={styles.qtyBtn}
                aria-label="Aumentar quantidade"
                disabled={quantity >= 99}
                onClick={() => setQuantity((q) => Math.min(99, q + 1))}
              >
                +
              </button>
            </div>

            <Button type="button" variant="primary" className={styles.buyButton}>
              Comprar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
