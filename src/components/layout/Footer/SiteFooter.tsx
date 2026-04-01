import logoImage from '../../../assets/img-logo.png'
import socialFacebook from '../../../assets/social-facebook.png'
import socialInstagram from '../../../assets/social-instagram.png'
import socialLinkedin from '../../../assets/social-linkedin.png'
import styles from './SiteFooter.module.scss'

const FOOTER_COLUMNS = [
  {
    title: 'Institucional',
    links: [
      { label: 'Sobre Nós', href: '#' },
      { label: 'Movimento', href: '#' },
      { label: 'Trabalhe conosco', href: '#' },
    ],
  },
  {
    title: 'Ajuda',
    links: [
      { label: 'Suporte', href: '#' },
      { label: 'Fale Conosco', href: '#' },
      { label: 'Perguntas Frequentes', href: '#' },
    ],
  },
  {
    title: 'Termos',
    links: [
      { label: 'Termos e Condições', href: '#' },
      { label: 'Política de Privacidade', href: '#' },
      { label: 'Troca e Devolução', href: '#' },
    ],
  },
] as const

const SOCIAL_LINKS = [
  { href: '#', label: 'Instagram', icon: socialInstagram },
  { href: '#', label: 'Facebook', icon: socialFacebook },
  { href: '#', label: 'LinkedIn', icon: socialLinkedin },
] as const

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <a className={styles.logoLink} href="/" aria-label="Econverse, página inicial">
              <img src={logoImage} alt="Econverse" className={styles.logo} width={139} height={42} />
            </a>
            <p className={styles.blurb}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <div className={styles.social}>
              {SOCIAL_LINKS.map(({ href, label, icon }) => (
                <a
                  key={label}
                  className={styles.socialLink}
                  href={href}
                  aria-label={label}
                  onClick={(e) => e.preventDefault()}
                >
                  <img src={icon} alt="" className={styles.socialIcon} width={24} height={24} />
                </a>
              ))}
            </div>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <nav className={styles.columns} aria-label="Links do rodapé">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className={styles.colTitle}>{col.title}</h3>
                <ul className={styles.linkList}>
                  {col.links.map((item) => (
                    <li key={item.label}>
                      <a className={styles.link} href={item.href} onClick={(e) => e.preventDefault()}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} Econverse. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
