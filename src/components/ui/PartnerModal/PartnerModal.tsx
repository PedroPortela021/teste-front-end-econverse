import { useCallback, useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { PartnerSpotlight } from '../../../types/partner'
import styles from './PartnerModal.module.scss'

export type PartnerModalProps = {
  partner: PartnerSpotlight | null
  onClose: () => void
}

export function PartnerModal({ partner, onClose }: PartnerModalProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!partner) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => {
      closeRef.current?.focus()
    }, 0)
    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = prevOverflow
    }
  }, [partner])

  useEffect(() => {
    if (!partner) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [partner, handleClose])

  if (!partner) {
    return null
  }

  const { title, description, imageUrl, imageAlt } = partner

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

        <div
          className={styles.hero}
          style={{ backgroundImage: `url(${imageUrl})` }}
          role="img"
          aria-label={imageAlt}
        >
          <div className={styles.heroOverlay} aria-hidden="true" />
        </div>

        <div className={styles.body}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <p className={styles.description}>{description}</p>
          <button type="button" className={styles.cta} onClick={handleClose}>
            Confira
          </button>
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
