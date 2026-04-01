import { useState } from 'react'
import partnersStoreBg from '../../../assets/partners-store-bg.png'
import type { PartnerSpotlight } from '../../../types/partner'
import { PartnerCard } from '../../ui/PartnerCard/PartnerCard'
import { PartnerModal } from '../../ui/PartnerModal/PartnerModal'
import styles from './PartnersSection.module.scss'

const PARTNERS: PartnerSpotlight[] = [
  {
    id: 'partner-1',
    title: 'Parceiros',
    description: 'Lorem ipsum dolor sit amet, consectetur',
    imageUrl: partnersStoreBg,
    imageAlt: 'Loja de eletrônicos com produtos em exposição',
  },
  {
    id: 'partner-2',
    title: 'Parceiros',
    description: 'Lorem ipsum dolor sit amet, consectetur',
    imageUrl: partnersStoreBg,
    imageAlt: 'Loja de eletrônicos com produtos em exposição',
  },
]

export function PartnersSection() {
  const [activePartner, setActivePartner] = useState<PartnerSpotlight | null>(null)
  const [modalKey, setModalKey] = useState(0)

  const openPartner = (partner: PartnerSpotlight) => {
    setActivePartner(partner)
    setModalKey((k) => k + 1)
  }

  return (
    <section className={styles.section} aria-label="Parceiros">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {PARTNERS.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} onOpen={() => openPartner(partner)} />
          ))}
        </div>
      </div>

      <PartnerModal
        key={modalKey}
        partner={activePartner}
        onClose={() => setActivePartner(null)}
      />
    </section>
  )
}
