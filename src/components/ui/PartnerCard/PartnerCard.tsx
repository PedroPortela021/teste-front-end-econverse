import type { KeyboardEvent, MouseEvent } from 'react'
import type { PartnerSpotlight } from '../../../types/partner'
import styles from './PartnerCard.module.scss'

export type PartnerCardProps = {
  partner: PartnerSpotlight
  onOpen: () => void
}

export function PartnerCard({ partner, onOpen }: PartnerCardProps) {
  const { title, description, imageUrl, imageAlt } = partner

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onOpen()
    }
  }

  const handleCtaClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onOpen()
  }

  return (
    <article
      className={styles.card}
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`${title}: ${description}`}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(${imageUrl})` }}
        role="img"
        aria-label={imageAlt}
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <button type="button" className={styles.cta} onClick={handleCtaClick}>
          Confira
        </button>
      </div>
    </article>
  )
}
