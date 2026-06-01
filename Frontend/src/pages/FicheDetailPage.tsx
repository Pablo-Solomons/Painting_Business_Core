import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findFiche } from '../data/siteContent'
import type { Fiche } from '../data/siteContent'

type FicheDetailPageProps = {
  fiches: Fiche[]
}

export function FicheDetailPage({ fiches }: FicheDetailPageProps) {
  const { slug } = useParams()
  const fiche = fiches.length > 0 ? fiches.find((item) => item.slug === slug) ?? findFiche(slug) : findFiche(slug)

  useEffect(() => {
    const canvas = document.querySelector<HTMLCanvasElement>('.hero-swatch-canvas[data-swatch]')
    if (!canvas) return

    const context = canvas.getContext('2d')
    const colorSpec = canvas.dataset.swatch
    if (!context || !colorSpec) return

    const colors = colorSpec.split(',').map((item) => item.trim()).filter(Boolean)
    if (colors.length === 0) return

    const width = 220
    const height = 280
    canvas.width = width
    canvas.height = height

    const stripeWidth = width / colors.length
    colors.forEach((color, index) => {
      context.fillStyle = color
      context.fillRect(index * stripeWidth, 0, stripeWidth + 1, height)
    })

    for (let index = 0; index < 2200; index += 1) {
      const x = Math.random() * width
      const y = Math.random() * height
      context.fillStyle = `rgba(0,0,0,${Math.random() * 0.15})`
      context.fillRect(x, y, 1, 1)
    }
  }, [slug])

  return (
    <article className="fiche-detail-page">
      <nav className="breadcrumb fiche-breadcrumb" aria-label="Fil d’Ariane">
        <Link to="/">Accueil</Link>
        <span className="breadcrumb-sep">›</span>
        <Link to="/fiches">Fiches</Link>
        <span className="breadcrumb-sep">›</span>
        <a href="#">Peinture</a>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">{fiche.title}</span>
      </nav>

      <section className="fiche-hero">
        <div className="hero-swatch-big" aria-hidden="true">
          <canvas width={220} height={280} className="hero-swatch-canvas" data-swatch="#0a1f35,#1a3a5c,#2a5580,#3d729e,#5a90b8" />
        </div>
        <div className="hero-meta">
          <div className="hero-eyebrow">Pigment · Peinture · Minéral synthétique</div>
          <h1 className="hero-title">{fiche.title}</h1>
          <div className="hero-code">PB27 — Ferrocyanure de Fer</div>
          <div className="hero-badges">
            <span className="badge badge-published">Publié</span>
            <span className="badge badge-semi">Semi-transparent</span>
            <span className="badge badge-toxic">⚠ Légèrement toxique</span>
          </div>
          <button type="button" className="hero-print">
            ⊟ Imprimer cette fiche
          </button>
        </div>
      </section>

      <div className="fiche-body">
        <div className="fiche-left">
          <div className="content-section">
            <span className="section-label">Description</span>
            <h2>Histoire & Caractéristiques</h2>
            <p>
              Le Bleu de Prusse est l'un des premiers pigments bleus synthétiques de l'histoire. Découvert accidentellement à Berlin vers 1704, il a révolutionné la peinture européenne en offrant une alternative aux bleus naturels onéreux.
            </p>
            <p>
              Chimiquement, il s'agit d'un ferrocyanure ferreux. Son bleu intense tire vers le vert ou le violet selon la dilution, ce qui en fait un pigment de choix pour les glacis et les ombres profondes.
            </p>
            <p>
              Utilisé dans tous les médiums - huile, aquarelle, acrylique - il présente une puissance tinctoriale élevée et doit être dosé avec précision dans les mélanges.
            </p>
          </div>

          <div className="content-section">
            <span className="section-label">Propriétés techniques</span>
            <h2>Tableau des propriétés</h2>
            <table className="prop-table">
              <tbody>
                <tr>
                  <td>Opacité</td>
                  <td>
                    <div className="opacity-bar">
                      <div className="opacity-indicator">
                        <div className="opacity-dot half" />
                        <div className="opacity-dot filled" />
                        <div className="opacity-dot filled" />
                        <div className="opacity-dot filled" />
                      </div>
                      Semi-transparent
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Résistance à la lumière</td>
                  <td><span className="prop-stars">⭑⭑⭑⭑⭑</span></td>
                </tr>
                <tr>
                  <td>Pouvoir couvrant</td>
                  <td>Moyen — bon en glacis</td>
                </tr>
                <tr>
                  <td>Granulation</td>
                  <td>Nulle</td>
                </tr>
                <tr>
                  <td>Toxicité</td>
                  <td style={{ color: '#8b5e3c' }}>Légèrement toxique — inhalation à éviter</td>
                </tr>
                <tr>
                  <td>Temps de séchage (huile)</td>
                  <td>Moyen (7–14 jours)</td>
                </tr>
                <tr>
                  <td>Stabilité en mélange</td>
                  <td style={{ color: 'var(--accent-green)' }}>Bonne — instable en milieu alcalin</td>
                </tr>
                <tr>
                  <td>Indice de réfraction</td>
                  <td>1,56</td>
                </tr>
                <tr>
                  <td>Classification CI</td>
                  <td style={{ fontFamily: 'DM Mono, monospace', color: 'var(--ochre)' }}>Pigment Blue 27</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="content-section">
            <span className="section-label">Mélanges recommandés</span>
            <h2>Associations & Harmonies</h2>
            <div className="melanges-grid">
              {[
                { name: '+ Ocre jaune', desc: 'Obtient des verts sourds et des gris chauds très naturels.', swatch: ['#1a3a5c', '#c8922a', '#2d4a3a'] },
                { name: '+ Blanc de Titane', desc: 'Gamme de bleus clairs très utilisée pour les ciels.', swatch: ['#1a3a5c', '#ffffff', '#7ab0d4'] },
                { name: '+ Alizarine', desc: 'Noirs et violets très profonds, utiles pour les ombres.', swatch: ['#1a3a5c', '#8c1a1a', '#1a0d2a'] },
                { name: "+ Terre d'ombre", desc: 'Noirs profonds bleutés pour les reflets sombres et la pénombre.', swatch: ['#1a3a5c', '#c8922a', '#1a1a1a'] },
                { name: '+ Vert Phtalo', desc: 'Profondeurs marines, vert-de-gris intenses et mystérieux.', swatch: ['#1a3a5c', '#1a4a2a', '#0d2a1a'] },
                { name: "+ Sienne brûlée", desc: 'Bleu-gris chauds et nuancés, très atmosphériques.', swatch: ['#1a3a5c', '#7a4a1a', '#3a3020'] },
              ].map((item) => (
                <div key={item.name} className="melange-card">
                  <div className="melange-swatch">
                    {item.swatch.map((color) => (
                      <div key={color} className="melange-swatch-seg" style={{ background: color }} />
                    ))}
                  </div>
                  <div className="melange-name">{item.name}</div>
                  <div className="melange-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="content-section">
            <span className="section-label">Culture & Histoire</span>
            <h2>Œuvres célèbres utilisant ce pigment</h2>
            <div className="oeuvres-list">
              {[
                ['北', 'La Grande Vague de Kanagawa', 'Hokusai — 1831 · Estampe japonaise — Bleu de Prusse importé en masse au Japon'],
                ['P', 'La Période Bleue (1901–1904)', 'Pablo Picasso — Le Bleu de Prusse est central dans les tonalités mélancoliques de cette époque.'],
                ['T', 'Nocturne en bleu et or', 'James McNeill Whistler — 1872 · Huile sur toile — Les nuits venetiennes en bleu de Prusse.'],
              ].map(([mark, title, text], index) => (
                <div key={title} className="oeuvre-item">
                  <div className="oeuvre-dot" style={{ background: ['#1a3a5c', '#1a3065', '#2a4a7c'][index], color: ['#7ab0d4', '#8ab0e4', '#aacae6'][index] }}>
                    {mark}
                  </div>
                  <div className="oeuvre-info">
                    <div className="oeuvre-title">{title}</div>
                    <div className="oeuvre-artist">{text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fiche-right">
          <div className="right-section">
            <span className="section-label">Palette des nuances</span>
            <div className="palette-grid">
              {['#0a1f35', '#0f2a48', '#1a3a5c', '#2a5580', '#3d729e', '#5a90b8', '#7aaed0', '#a0c8e4', '#c8e2f2', '#1a2e1a'].map((color, index) => (
                <button key={color} type="button" className={`palette-swatch${index === 0 ? ' active' : ''}`} style={{ background: color }} aria-label={color} />
              ))}
            </div>
            <div className="swatch-info">Nuit profonde — #0A1F35</div>
          </div>

          <div className="right-section">
            <span className="section-label">Médiums compatibles</span>
            <div className="mediums-list">
              {[
                "Peinture à l'huile",
                'Aquarelle',
                'Acrylique',
                'Tempera (avec précaution pH)',
                'Fresque — déconseillé (alcalinité)',
              ].map((medium, index) => (
                <div key={medium} className="medium-item">
                  <span className="medium-dot" style={{ background: index < 3 ? 'var(--accent-green)' : index === 3 ? 'var(--ochre-light)' : '#c88a6a' }} />
                  {medium}
                </div>
              ))}
            </div>
          </div>

          <div className="right-section">
            <span className="section-label">Tags</span>
            <div className="tags-wrap">
              {['Semi-transparent', 'Synthétique', 'Historique', 'XVIIIe siècle', 'Glacis', 'Haute puissance', 'Paysage'].map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="right-section">
            <span className="section-label">Auteur de la fiche</span>
            <div className="author-card">
              <div className="author-avatar">ML</div>
              <div>
                <div className="author-name">Marie Lefèvre</div>
                <div className="author-role">Peintre · Spécialiste pigments</div>
              </div>
            </div>
          </div>

          <div className="right-section">
            <span className="section-label">Actions</span>
            <button type="button" className="action-btn action-btn-primary">♡ Ajouter aux favoris</button>
            <button type="button" className="action-btn">⊟ Imprimer</button>
            <button type="button" className="action-btn">⊕ Copier le lien</button>
          </div>

          <div className="right-section">
            <span className="section-label">Statistiques</span>
            <div className="stats-row-small">
              <div className="stat-small">
                <span className="stat-small-num">2 847</span>
                <span className="stat-small-label">Vues</span>
              </div>
              <div className="stat-small">
                <span className="stat-small-num">312</span>
                <span className="stat-small-label">Favoris</span>
              </div>
            </div>
          </div>

          <div className="right-section">
            <span className="section-label">Roadmap associée</span>
            <a className="linked-item linked-item-roadmap" href="#">
              <span className="linked-icon">🗺</span>
              <strong>Peinture à l'huile — Débutant</strong>
              <span>Étape 3 · Les pigments essentiels</span>
            </a>
          </div>
        </div>
      </div>

      <section className="related-section">
        <div className="related-header">
          <div>
            <div className="section-label">Même catégorie · Pigments bleus</div>
            <div className="related-title">Fiches similaires</div>
          </div>
          <Link to="/fiches" className="see-all">Voir tout</Link>
        </div>

        <div className="related-grid">
          {[
            { code: 'PB29', name: 'Outremer', swatch: ['#1a2060', '#2a3080', '#3a40a0', '#2a30a0', '#1a2080'] },
            { code: 'PB15', name: 'Bleu Phtalo', swatch: ['#0a3040', '#0a4060', '#0a5080', '#0a3060', '#0a2040'] },
            { code: 'PV15', name: 'Bleu Indigo', swatch: ['#2a2a6a', '#3a3a8a', '#4a4aaa', '#3a3a9a', '#2a2a7a'] },
          ].map((item) => (
            <Link key={item.code} to="/fiches/bleu-de-prusse" className="related-card">
              <div className="related-swatch">
                {item.swatch.map((color) => (
                  <div key={color} className="related-swatch-seg" style={{ background: color }} />
                ))}
              </div>
              <div className="related-body">
                <div className="related-code">{item.code}</div>
                <div className="related-name">{item.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  )
}
