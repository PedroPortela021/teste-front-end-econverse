import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getSiteUrl } from '../../lib/siteUrl'

const DEFAULT_TITLE = 'Econverse — Vitrine de produtos'
const DEFAULT_DESCRIPTION =
  'Explore categorias, marcas e ofertas em uma vitrine de produtos responsiva integrada à API Econverse.'

export type SeoProps = {
  title?: string
  /** Se true, inclui o sufixo " | Econverse" após title. */
  titleSuffix?: boolean
  description?: string
  noIndex?: boolean
  /** Caminho em /public para og:image (ex.: /og.png). */
  ogImagePath?: string
}

export function Seo({
  title,
  titleSuffix = true,
  description = DEFAULT_DESCRIPTION,
  noIndex,
  ogImagePath = '/og.png',
}: SeoProps) {
  const { pathname } = useLocation()
  const site = getSiteUrl()

  const pageTitle = title
    ? titleSuffix
      ? `${title} | Econverse`
      : title
    : DEFAULT_TITLE

  const pathForUrl = pathname === '' ? '/' : pathname
  const canonical = site ? `${site}${pathForUrl}` : undefined
  const ogImage = site && ogImagePath ? `${site}${ogImagePath}` : undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Econverse',
        url: site || undefined,
        description: DEFAULT_DESCRIPTION,
      },
      {
        '@type': 'Organization',
        name: 'Econverse',
        url: site || undefined,
      },
    ],
  }

  return (
    <Helmet htmlAttributes={{ lang: 'pt-BR' }}>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}
      <meta property="og:locale" content="pt_BR" />

      <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}
