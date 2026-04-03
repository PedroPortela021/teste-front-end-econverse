import { writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const base = process.env.VITE_SITE_URL?.replace(/\/$/, '')

const indexablePaths = ['/']

if (!existsSync(dist)) {
  console.warn('[seo-files] Pasta dist/ inexistente; rode o build antes.')
  process.exit(0)
}

if (!base) {
  console.warn(
    '[seo-files] VITE_SITE_URL não definido — sitemap.xml não gerado. robots.txt mínimo escrito.',
  )
  writeFileSync(
    join(dist, 'robots.txt'),
    ['User-agent: *', 'Allow: /', 'Disallow: /desing', ''].join('\n'),
  )
  process.exit(0)
}

const urlset = indexablePaths
  .map((path) => {
    const loc = path === '/' ? `${base}/` : `${base}${path}`
    return `  <url><loc>${loc}</loc><changefreq>weekly</changefreq><priority>1</priority></url>`
  })
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>
`

const robots = [
  'User-agent: *',
  'Allow: /',
  'Disallow: /desing',
  '',
  `Sitemap: ${base}/sitemap.xml`,
  '',
].join('\n')

writeFileSync(join(dist, 'sitemap.xml'), sitemap)
writeFileSync(join(dist, 'robots.txt'), robots)
console.log('[seo-files] sitemap.xml e robots.txt escritos em dist/')
