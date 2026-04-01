import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import styles from './CarouselWrapper.module.scss'

type CarouselWrapperProps = {
  children: ReactNode
  /** Rótulo acessível da região do carrossel. */
  ariaLabel: string
  className?: string
}

function ChevronLeft() {
  return (
    <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
      />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
      />
    </svg>
  )
}

export function CarouselWrapper({ children, ariaLabel, className }: CarouselWrapperProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = viewportRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    const maxScroll = scrollWidth - clientWidth
    const epsilon = 2
    setCanScrollPrev(scrollLeft > epsilon)
    setCanScrollNext(scrollLeft < maxScroll - epsilon)
  }, [])

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    updateScrollState()
    const ro = new ResizeObserver(() => updateScrollState())
    ro.observe(el)
    return () => ro.disconnect()
  }, [updateScrollState, children])

  const scrollByDirection = (direction: -1 | 1) => {
    const el = viewportRef.current
    if (!el) return
    const delta = Math.max(el.clientWidth * 0.75, 200) * direction
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }

  const rootClassName = className ? `${styles.root} ${className}` : styles.root

  return (
    <div className={rootClassName}>
      <button
        type="button"
        className={`${styles.navButton} ${styles.navPrev}`}
        aria-label="Ver itens anteriores"
        disabled={!canScrollPrev}
        onClick={() => scrollByDirection(-1)}
      >
        <ChevronLeft />
      </button>
      <div
        ref={viewportRef}
        className={styles.viewport}
        role="region"
        aria-roledescription="carrossel"
        aria-label={ariaLabel}
        onScroll={updateScrollState}
        tabIndex={0}
      >
        <div className={styles.track}>{children}</div>
      </div>
      <button
        type="button"
        className={`${styles.navButton} ${styles.navNext}`}
        aria-label="Ver próximos itens"
        disabled={!canScrollNext}
        onClick={() => scrollByDirection(1)}
      >
        <ChevronRight />
      </button>
    </div>
  )
}
