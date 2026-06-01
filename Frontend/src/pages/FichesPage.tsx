import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const filters = {
  categories: [
    { label: 'Peinture', count: '84', checked: true },
    { label: 'Dessin', count: '52' },
    { label: 'Sculpture', count: '31' },
    { label: 'Gravure', count: '28' },
    { label: 'Mixed Media', count: '45' },
  ],
  mediums: [
    { label: 'Huile', count: '67' },
    { label: 'Aquarelle', count: '48' },
    { label: 'Acrylique', count: '55' },
    { label: 'Tempera', count: '22' },
    { label: 'Gouache', count: '31' },
    { label: 'Pastel', count: '18' },
  ],
  levels: [
    { label: 'Tous niveaux', type: 'radio', checked: true },
    { label: 'Débutant', count: '78', type: 'radio' },
    { label: 'Intermédiaire', count: '95', type: 'radio' },
    { label: 'Avancé', count: '67', type: 'radio' },
  ],
  properties: ['Opaque', 'Transparent', 'Granuleux', 'Toxique', 'Non-toxique'],
}

const ficheCards = [
  {
    slug: 'bleu-de-prusse',
    code: 'PB27 · Peinture',
    name: 'Bleu de Prusse',
    summary: 'Pigment bleu intense à base de ferrocyanure ferreux, incontournable depuis le XVIIIe siècle.',
    swatch: ['#0a1f35', '#1a3a5c', '#2a5580', '#3d729e', '#5a90b8'],
    tags: ['Semi-transparent', 'Stable'],
    tagClasses: ['tag', 'tag opaque'],
    views: '2 847',
  },
  {
    slug: 'jaune-de-naples',
    code: 'PY41 · Peinture à l’huile',
    name: 'Jaune de Naples',
    summary: "L'un des plus anciens pigments jaunes - oxyde de plomb antimoniate, chaleur et opacité.",
    swatch: ['#69421f', '#8a6237', '#c79a48', '#d9c182', '#f0dba2'],
    tags: ['Opaque', 'Toxique', 'Traditionnel'],
    tagClasses: ['tag opaque', 'tag toxic', 'tag'],
    views: '1 923',
  },
  {
    slug: 'alizarine-cramoisie',
    code: 'PR83 · Tous médiums',
    name: 'Alizarine Cramoisie',
    summary: "Rouge profond à base d'anthraquinone - somptueux mais sensible à la lumière sur le long terme.",
    swatch: ['#300816', '#62142a', '#8d2444', '#b94d63', '#d69aa0'],
    tags: ['Transparent', 'Non-stable'],
    tagClasses: ['tag', 'tag toxic'],
    views: '3 412',
  },
  {
    slug: 'terre-de-sienne',
    code: 'PBr7 · Aquarelle',
    name: 'Terre de Sienne',
    summary: 'Pigment naturel terreux - granulation caractéristique, compatible avec tous les médiums.',
    swatch: ['#4f2e1d', '#825232', '#a96e3d', '#c28f58', '#dcc19b'],
    tags: ['Granuleux', 'Naturel', 'Stable'],
    tagClasses: ['tag', 'tag opaque', 'tag opaque'],
    views: '2 104',
  },
  {
    slug: 'vert-phtalo',
    code: 'PG7 · Acrylique · Huile',
    name: 'Vert Phtalo',
    summary: "Pigment synthétique d'une puissance tinctoriale extrême - un minimum suffit dans les mélanges.",
    swatch: ['#082d22', '#0e563a', '#1a7d51', '#34a16d', '#6ec58e'],
    tags: ['Transparent', 'Très stable'],
    tagClasses: ['tag', 'tag opaque'],
    views: '1 788',
  },
  {
    slug: 'blanc-de-titane',
    code: 'PW6 · Tous médiums',
    name: 'Blanc de Titane',
    summary: 'Le blanc de référence moderne - opacité maximale, stabilité parfaite, non-toxique.',
    swatch: ['#f7f4ef', '#f0ebe4', '#e5ddd1', '#d8cbb7', '#c2b29b'],
    tags: ['Opaque', 'Non-toxique'],
    tagClasses: ['tag opaque', 'tag opaque'],
    views: '4 231',
  },
  {
    slug: 'quinacridone-violet',
    code: 'PV19 · Aquarelle · Huile',
    name: 'Quinacridone Violet',
    summary: 'Pigment organique synthétique - transparence remarquable, teintes éclatantes et excellente solidité.',
    swatch: ['#2d0c35', '#4e155c', '#7b2c8f', '#a553b0', '#cf9ce0'],
    tags: ['Transparent', 'Très stable'],
    tagClasses: ['tag', 'tag opaque'],
    views: '1 342',
  },
  {
    slug: 'noir-de-mars',
    code: 'PBk11 · Huile · Acrylique',
    name: 'Noir de Mars',
    summary: "Oxyde de fer noir - plus chaud et moins absorbant que le noir d'ivoire, idéal pour les mélanges.",
    swatch: ['#090909', '#1a1a1a', '#303030', '#555555', '#7b7b7b'],
    tags: ['Opaque', 'Stable'],
    tagClasses: ['tag opaque', 'tag opaque'],
    views: '2 018',
  },
  {
    slug: 'ocre-jaune',
    code: 'PY43 · Acrylique · Huile',
    name: 'Ocre jaune',
    summary: 'Terre naturelle lumineuse qui sert de base à des harmonies chaudes et architecturées.',
    swatch: ['#5d4820', '#8e6a2c', '#b48a43', '#d1b06b', '#ead8a2'],
    tags: ['Opaque', 'Naturel'],
    tagClasses: ['tag opaque', 'tag opaque'],
    views: '1 762',
  },
]

export function FichesPage() {
  useEffect(() => {
    const canvases = document.querySelectorAll<HTMLCanvasElement>('.fiches-grid .fiche-swatch canvas[data-swatch]')

    canvases.forEach((canvas) => {
      const context = canvas.getContext('2d')
      const colorSpec = canvas.dataset.swatch
      if (!context || !colorSpec) return

      const colors = colorSpec.split(',').map((item) => item.trim()).filter(Boolean)
      if (colors.length === 0) return

      const width = 300
      const height = 96
      canvas.width = width
      canvas.height = height

      const segmentWidth = width / colors.length
      colors.forEach((color, index) => {
        context.fillStyle = color
        context.fillRect(index * segmentWidth, 0, segmentWidth + 1, height)
      })

      for (let index = 0; index < 850; index += 1) {
        const x = Math.random() * width
        const y = Math.random() * height
        context.fillStyle = `rgba(0,0,0,${Math.random() * 0.13})`
        context.fillRect(x, y, 1, 1)
      }
    })
  }, [])

  return (
    <div className="fiches-page">
      <div className="page-header fiche-page-header">
        <div className="page-header-eyebrow">Ressources · 240 fiches</div>
        <h1>Fiches <em>techniques</em></h1>
        <p>Pigments, médiums, supports et techniques - chaque fiche est une référence complète pour l'artiste.</p>
      </div>

      <div className="search-bar-wrap">
        <div className="search-bar">
          <input type="text" placeholder="Rechercher un pigment, une technique..." defaultValue="" />
          <button type="button">Rechercher</button>
        </div>
      </div>

      <div className="content-layout fiches-layout">
        <aside className="filters-sidebar fiches-sidebar">
          <div className="filter-section">
            <span className="filter-label">Catégorie</span>
            {filters.categories.map((filter) => (
              <label key={filter.label} className="filter-option">
                <input type="checkbox" defaultChecked={filter.checked} />
                {filter.label}
                <span className="filter-count">{filter.count}</span>
              </label>
            ))}
          </div>

          <div className="filter-divider" />

          <div className="filter-section">
            <span className="filter-label">Médium</span>
            {filters.mediums.map((filter) => (
              <label key={filter.label} className="filter-option">
                <input type="checkbox" />
                {filter.label}
                <span className="filter-count">{filter.count}</span>
              </label>
            ))}
          </div>

          <div className="filter-divider" />

          <div className="filter-section">
            <span className="filter-label">Niveau</span>
            {filters.levels.map((filter) => (
              <label key={filter.label} className="filter-option">
                <input type={filter.type ?? 'checkbox'} name="level" defaultChecked={filter.checked} />
                {filter.label}
                {'count' in filter && filter.count ? <span className="filter-count">{filter.count}</span> : null}
              </label>
            ))}
          </div>

          <div className="filter-divider" />

          <div className="filter-section">
            <span className="filter-label">Propriétés</span>
            {filters.properties.map((property) => (
              <label key={property} className="filter-option">
                <input type="checkbox" />
                {property}
              </label>
            ))}
          </div>

          <button type="button" className="filter-reset">
            Réinitialiser les filtres
          </button>
        </aside>

        <div className="main-content fiches-main">
          <div className="active-filters">
            <div className="filter-chip">Peinture ×</div>
          </div>

          <div className="results-header">
            <div className="results-count">
              Affichage de <strong>1–9</strong> sur <strong>84</strong> fiches
            </div>
            <select className="sort-select" defaultValue="popularite">
              <option value="popularite">Trier : Popularité</option>
              <option value="date">Trier : Date</option>
              <option value="alpha">Trier : Alphabétique</option>
            </select>
          </div>

          <div className="fiches-grid">
            {ficheCards.map((fiche) => (
              <Link key={fiche.slug} to={`/fiches/${fiche.slug}`} className="fiche-card">
                <div className="fiche-swatch" aria-hidden="true">
                  <canvas id={fiche.slug} width={300} height={96} data-swatch={fiche.swatch.join(',')} />
                </div>
                <div className="fiche-card-body">
                  <div className="fiche-code">{fiche.code}</div>
                  <div className="fiche-card-name">{fiche.name}</div>
                  <div className="fiche-card-summary">{fiche.summary}</div>
                  <div className="fiche-tags">
                    {fiche.tags.map((tag, index) => (
                      <span key={tag} className={fiche.tagClasses[index] ?? 'tag'}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="fiche-footer">
                  <span className="fiche-views-icon">◎</span> {fiche.views} vues
                </div>
                <div className="fiche-card-arrow" />
              </Link>
            ))}
          </div>

          <div className="pagination">
            <a href="#" className="page-btn active">1</a>
            <a href="#" className="page-btn">2</a>
            <a href="#" className="page-btn">3</a>
            <span className="page-btn dots">...</span>
            <a href="#" className="page-btn">9</a>
          </div>
        </div>
      </div>
    </div>
  )
}
