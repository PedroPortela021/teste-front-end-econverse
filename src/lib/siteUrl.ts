/** URL pública do site (sem barra final). Prioriza VITE_SITE_URL; no browser usa o origin atual. */
export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '')
  if (fromEnv) return fromEnv
  if (typeof window !== 'undefined') return window.location.origin
  return ''
}
