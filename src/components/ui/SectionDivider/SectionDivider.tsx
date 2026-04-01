import styles from './SectionDivider.module.scss'

type SectionDividerProps = {
  position?: 'top' | 'bottom'
}

export function SectionDivider({ position = 'top' }: SectionDividerProps) {
  const positionClass = position === 'bottom' ? styles.bottom : styles.top

  return (
    <div className={styles.divider} aria-hidden="true">
      <div className={`${styles.container} ${positionClass}`} />
    </div>
  )
}
