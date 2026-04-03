import type { FormEvent } from 'react'
import { Button } from '../../ui/Button/Button'
import { Input } from '../../ui/Input/Input'
import styles from './NewsletterBar.module.scss'

export function NewsletterBar() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <section className={styles.bar} aria-labelledby="newsletter-heading">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id="newsletter-heading" className={styles.title}>
            Inscreva-se na nossa newsletter
          </h2>
          <p className={styles.subtitle}>
            Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.
          </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.fields}>
            <div className={styles.field}>
              <Input variant="light" name="name" type="text" autoComplete="name" placeholder="Digite seu nome" />
            </div>
            <div className={styles.field}>
              <Input
                variant="light"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Digite seu e-mail"
              />
            </div>
            <Button type="submit" variant="primary" className={styles.submit}>
              Inscrever
            </Button>
          </div>
          <label className={styles.checkboxRow}>
            <input className={styles.checkbox} type="checkbox" name="terms" required />
            <span>Aceito os termos e condições</span>
          </label>
        </form>
      </div>
    </section>
  )
}
