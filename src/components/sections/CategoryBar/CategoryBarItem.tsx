import type { ReactNode } from 'react'
import styles from './CategoryBarItem.module.scss'

type CategoryBarItemProps = {
  label: string
  active?: boolean
  onClick?: () => void
  children: ReactNode
}

export function CategoryBarItem({
  label,
  active = false,
  onClick,
  children,
}: CategoryBarItemProps) {
  return (
    <button
      type="button"
      className={`${styles.barItem} ${active ? styles.active : ''}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <span className={styles.surface}>{children}</span>
      <span className={styles.label}>{label}</span>
    </button>
  )
}
