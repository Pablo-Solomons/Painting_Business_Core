'use client'

import Link from 'next/link'

const categoriesList = [
  { slug: 'peinture', icon: '🎨', name: 'Peinture', desc: 'Huile, acrylique, aquarelle, tempera — maîtrisez chaque médium avec des guides complets et des fiches pigments.', count: 84, color: '#9d6a3b' },
  { slug: 'dessin', icon: '✏️', name: 'Dessin', desc: 'Du croquis à la perspective avancée — fusain, graphite, sanguine et techniques mixtes sur papier.', count: 52, color: '#4a7c59' },
  { slug: 'sculpture', icon: '🗿', name: 'Sculpture', desc: 'Argile, bronze, résine, pierre et matières — modelage, taille directe et moulage.', count: 31, color: '#5b3221' },
  { slug: 'gravure', icon: '🖨️', name: 'Gravure', desc: 'Taille-douce, lithographie, sérigraphie, linogravure — techniques d\'impression artistique.', count: 28, color: '#1a3a5c' },
  { slug: 'mixed-media', icon: '🖌️', name: 'Mixed Media', desc: 'Collage, assemblage, art numérique, installations — quand les disciplines se rencontrent.', count: 45, color: '#8c1a1a' },
]

export function CategoriesPage() {
  return (
    <div className="categories-page">
      <div className="page-header">
        <div className="page-eyebrow">Taxonomie</div>
        <h1 className="page-title">Catégories <em>de savoirs</em></h1>
        <p className="page-subtitle">
          Chaque catégorie regroupe des fiches de connaissance par domaine. Selon le rapport BCaaS, les catégories forment une hiérarchie structurante &laquo;&nbsp;$(K, \preceq)$&nbsp;&raquo; — chaque fiche appartient à une catégorie qui la contextualise.
        </p>
      </div>

      <div className="categories-grid">
        {categoriesList.map((cat) => (
          <Link key={cat.slug} href={`/fiches?categorie=${cat.slug}`} className="category-card-detail">
            <div className="category-card-detail-icon" style={{ background: cat.color }}>
              <span>{cat.icon}</span>
            </div>
            <div className="category-card-detail-body">
              <div className="category-card-detail-name">{cat.name}</div>
              <p className="category-card-detail-desc">{cat.desc}</p>
              <span className="category-card-detail-count">{cat.count} fiches de connaissance</span>
            </div>
            <div className="category-card-detail-arrow">→</div>
          </Link>
        ))}
      </div>
    </div>
  )
}