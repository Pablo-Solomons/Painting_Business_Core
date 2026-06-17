'use client'

import Link from 'next/link'
import { useDemoStore } from '@/context/DemoStoreContext'

export function TechniquesPage() {
  const { publishedFiches, isHydrated } = useDemoStore()

  const techniquesList = [
    { name: 'Glacis', slug: 'glacis', desc: 'Couche de peinture transparente posée sur une couche sèche pour modifier la teinte sans masquer les valeurs sous-jacentes.', icon: '🎨', level: 'Intermédiaire' },
    { name: 'Imprimature', slug: 'imprimature', desc: 'Teinte de fond qui établit une valeur moyenne et guide les ombres et les lumières dès l\'ébauche.', icon: '🖌️', level: 'Intermédiaire' },
    { name: 'Impasto', slug: null as string | null, desc: 'Application de peinture en couches épaisses, créant relief et texture visibles — typique de la peinture à l\'huile.', icon: '🗿', level: 'Avancé' },
    { name: 'Frottis', slug: null as string | null, desc: 'Couche très mince de peinture opaque frottée sur la toile pour créer une transition douce entre deux tons.', icon: '✏️', level: 'Intermédiaire' },
    { name: 'Sfumato', slug: null as string | null, desc: 'Technique de flou artistique sans contours nets, popularisée par Léonard de Vinci — transition vaporeuse.', icon: '🌫️', level: 'Avancé' },
    { name: 'Grisaille', slug: null as string | null, desc: 'Peinture monochrome en nuances de gris servant de sous-couche pour établir les valeurs avant les glacis colorés.', icon: '⬜', level: 'Intermédiaire' },
    { name: 'Vernis à retoucher', slug: null as string | null, desc: 'Vernis temporaire appliqué sur une couche sèche pour raviver les couleurs et permettre la reprise du travail.', icon: '✨', level: 'Débutant' },
    { name: 'Préparation du support', slug: 'gesso-acrylique', desc: 'Apprêtage avec gesso acrylique pour uniformiser l\'absorption, sécuriser le fond et améliorer l\'accroche.', icon: '📐', level: 'Débutant' },
  ]

  if (!isHydrated) {
    return (
      <div className="auth-guard-loading">
        <div className="auth-guard-spinner" aria-hidden />
        <p>Chargement…</p>
      </div>
    )
  }

  return (
    <div className="techniques-page">
      <div className="page-header">
        <div className="page-eyebrow">Savoir-faire</div>
        <h1 className="page-title">Techniques <em>picturales</em></h1>
        <p className="page-subtitle">
          Les techniques sont des savoir-faire spécifiques listés dans les fiches de connaissance. Chaque fiche peut décrire une ou plusieurs techniques — apprenez-les, maîtrisez-les, combinez-les.
        </p>
      </div>

      <div className="techniques-grid">
        {techniquesList.map((technique) => {
          const fiche = technique.slug ? publishedFiches.find((f: { slug: string }) => f.slug === technique.slug) : null
          return (
            <div key={technique.name} className="technique-card">
              <div className="technique-card-icon">{technique.icon}</div>
              <div className="technique-card-body">
                <div className="technique-card-name">{technique.name}</div>
                <p className="technique-card-desc">{technique.desc}</p>
                <div className="technique-card-meta">
                  <span className="technique-card-badge">{technique.level}</span>
                  {fiche ? (
                    <Link href={`/fiches/${fiche.slug}`} className="technique-card-link">
                      Voir la fiche →
                    </Link>
                  ) : (
                    <span className="technique-card-soon">Fiche à venir</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}