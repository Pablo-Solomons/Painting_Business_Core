import { Link } from 'react-router-dom'
import { roadmaps } from '../data/siteContent'

export function RoadmapsPage() {
  return (
    <section className="catalog-layout roadmap-layout">
      <aside className="filters-panel roadmap-intro">
        <p className="eyebrow">Roadmaps</p>
        <h1>Parcours guidés</h1>
        <p>Des trajectoires d’apprentissage plus longues, reliées à des fiches précises et utiles.</p>
        <div className="roadmap-summary">
          <strong>Parcours éditoriaux</strong>
          <span>Chaque roadmap renvoie vers des fiches directement exploitables.</span>
        </div>
        <Link to="/connexion" className="button button-dark full-width">
          + Créer une roadmap
        </Link>
      </aside>

      <div className="catalog-content">
        <div className="search-bar-wrap">
          <div className="search-bar">
            <input type="text" placeholder="Rechercher une roadmap..." defaultValue="" />
            <button type="button">Rechercher</button>
          </div>
        </div>

        <div className="roadmap-grid-cards">
          {roadmaps.map((roadmap, index) => (
            <Link key={roadmap.slug} to={`/roadmaps/${roadmap.slug}`} className="roadmap-card-item">
              <div className="roadmap-card-num">{String(index + 1).padStart(2, '0')}</div>
              <div>
                <div className="roadmap-card-title">{roadmap.title}</div>
                <div className="roadmap-card-desc">{roadmap.summary}</div>
              </div>

              <div className="roadmap-progress">
                <div className="roadmap-progress-bar" aria-hidden>
                  <div
                    style={{
                      height: 8,
                      background: 'var(--stroke)',
                      borderRadius: 4,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.min(100, roadmap.chapters.length * 6)}%`,
                        height: '100%',
                        background: 'var(--ochre)',
                      }}
                    />
                  </div>
                </div>
                <div className="roadmap-steps-count">{roadmap.chapters.length} chapitres</div>
              </div>

              <div className="roadmap-card-footer">
                <span className="badge">{roadmap.duration}</span>
                <span className="roadmap-card-label">{roadmap.level}</span>
              </div>

              <div className="roadmap-card-arrow" />
            </Link>
          ))}

          <Link to="/connexion" className="roadmap-new-card">
            <div className="roadmap-new-plus">+</div>
            <div className="roadmap-new-label">Créer une roadmap</div>
          </Link>
        </div>
      </div>
    </section>
  )
}
