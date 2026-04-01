import { useState } from 'react'
import categoriaBebidas from '../../../assets/categoria-bebidas.png'
import categoriaEsportes from '../../../assets/categoria-esportes.png'
import categoriaFerramentas from '../../../assets/categoria-ferramentas.png'
import categoriaModa from '../../../assets/categoria-moda.png'
import categoriaSaude from '../../../assets/categoria-saude.png'
import categoriaSupermercado from '../../../assets/categoria-supermercado.png'
import categoriaTecnologia from '../../../assets/categoria-tecnologia.png'
import { CategoryBarItem } from './CategoryBarItem'
import styles from './CategoryBar.module.scss'
import itemStyles from './CategoryBarItem.module.scss'

const CATEGORIES = [
  { id: 'tecnologia', label: 'Tecnologia', iconSrc: categoriaTecnologia },
  { id: 'supermercado', label: 'Supermercado', iconSrc: categoriaSupermercado },
  { id: 'bebidas', label: 'Bebidas', iconSrc: categoriaBebidas },
  { id: 'ferramentas', label: 'Ferramentas', iconSrc: categoriaFerramentas },
  { id: 'saude', label: 'Saúde', iconSrc: categoriaSaude },
  { id: 'esportes', label: 'Esportes e Fitness', iconSrc: categoriaEsportes },
  { id: 'moda', label: 'Moda', iconSrc: categoriaModa },
] as const

export function CategoryBar() {
  const [activeId, setActiveId] = useState<string>(CATEGORIES[0].id)

  return (
    <section className={styles.section} aria-label="Categorias de produtos">
      <div className={styles.scroll}>
        <ul className={styles.row}>
          {CATEGORIES.map(({ id, label, iconSrc }) => (
            <li key={id} className={styles.listItem}>
              <CategoryBarItem
                label={label}
                active={activeId === id}
                onClick={() => setActiveId(id)}
              >
                <img src={iconSrc} alt="" className={itemStyles.icon} width={64} height={64} />
              </CategoryBarItem>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
