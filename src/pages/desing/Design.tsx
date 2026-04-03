import { Seo } from '../../components/seo/Seo'
import styles from './DesignTokens.module.scss'

const colorTokens = [
  { name: 'Primaria 500', value: '#3442B5' },
  { name: 'Primaria 700', value: '#3019B2' },
  { name: 'Accent 400', value: '#F7CA11' },
  { name: 'Neutral 900', value: '#271C47' },
  { name: 'Neutral 700', value: '#3F3F40' },
  { name: 'Neutral 400', value: '#9F9F9F' },
  { name: 'White', value: '#FFFFFF' },
]

const fontScale = [
  { px: 12, rem: 0.75 },
  { px: 14, rem: 0.875 },
  { px: 16, rem: 1 },
  { px: 20, rem: 1.25 },
  { px: 32, rem: 2 },
  { px: 40, rem: 2.5 },
  { px: 48, rem: 3 },
]

export function DesignTokensPage() {
  return (
    <main className={styles.styleGuide}>
      <Seo
        title="Design tokens"
        description="Referência de cores e tipografia (Poppins) utilizadas no projeto Econverse."
        noIndex
      />
      <header>
        <p className={styles.kicker}>Design tokens</p>
        <h1>Cores e tipografia do projeto</h1>
      </header>

      <section className={styles.section}>
        <h2>Fonte: Poppins</h2>
        <div className={styles.fontGrid}>
          {fontScale.map((size) => (
            <p key={size.px} style={{ fontSize: `${size.rem}rem` }}>
              Poppins {size.px}px ({size.rem}rem)
            </p>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Paleta de cores</h2>
        <div className={styles.colorGrid}>
          {colorTokens.map((token) => (
            <article key={token.value} className={styles.swatch}>
              <div className={styles.sample} style={{ backgroundColor: token.value }} />
              <p>{token.name}</p>
              <code>{token.value}</code>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
