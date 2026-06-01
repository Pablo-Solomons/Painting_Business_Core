import { Link, useParams } from 'react-router-dom'
import { findRoadmap } from '../data/siteContent'
import type { Fiche, Roadmap } from '../data/siteContent'

type RoadmapDetailPageProps = {
  roadmaps: Roadmap[]
  fiches: Fiche[]
}

export function RoadmapDetailPage({ roadmaps, fiches }: RoadmapDetailPageProps) {
  const { slug } = useParams()
  const roadmap = roadmaps.length > 0 ? roadmaps.find((item) => item.slug === slug) ?? findRoadmap(slug) : findRoadmap(slug)
  
  return (
    <article className="detail-page">
      <nav className="breadcrumb" aria-label="Fil d’Ariane">
        <Link to="/">Accueil</Link>
        <span>/</span>
        <Link to="/roadmaps">Roadmaps</Link>
        <span>/</span>
        <span>{roadmap.title}</span>
      </nav>

      <section className="detail-hero roadmap-hero">
        <div>
          <p className="eyebrow">{roadmap.audience}</p>
          <h1>{roadmap.title}</h1>
          <p className="hero-text">{roadmap.summary}</p>
        </div>
        <div className="detail-badges">
          <span>{roadmap.duration}</span>
          <span>{roadmap.level}</span>
          <span>{roadmap.featuredFiches.length} fiches liées</span>
        </div>
      </section>

      <section className="two-column">
        <div className="detail-block">
          <p className="eyebrow">Timeline</p>
          <div className="timeline">
            {roadmap.chapters.map((chapter, idx) => (
              <div key={chapter} className={`step ${idx === 0 ? 'active' : ''}`}>
                <div className="step-left">
                  <div className="step-dot">{idx + 1}</div>
                </div>
                <div className="step-body">
                  <div className="step-title">{chapter}</div>
                  <div className="step-text">Description et objectifs du chapitre {idx + 1}.</div>
                  <div className="step-footer">
                    <div className="step-fiches">
                      <strong>Fiches liées :</strong>
                      <div className="linked-list">
                        {roadmap.featuredFiches.map((title) => {
                          const fiche = fiches.find((f) => f.title === title)
                          if (!fiche) return null
                          return (
                            <Link key={fiche.slug} to={`/fiches/${fiche.slug}`} className="linked-item linked-item-roadmap">
                              <strong>{fiche.title}</strong>
                              <span>{fiche.category}</span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="detail-block sidebar-col">
          <div className="sidebar-card">
            <div className="sidebar-card-head">
              <div className="editor-section-label">Auteur</div>
              <div />
            </div>
            <div className="sidebar-card-body">
              <div className="author-name">Art Plastique Team</div>
              <div className="author-meta">Contributeurs · 3</div>
            </div>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-card-head">
              <div className="editor-section-label">Informations</div>
              <div />
            </div>
            <div className="sidebar-card-body">
              <div className="meta-row">
                <div className="meta-key">Chapitres</div>
                <div className="meta-val">{roadmap.chapters.length}</div>
              </div>
              <div className="meta-row">
                <div className="meta-key">Fiches liées</div>
                <div className="meta-val">{roadmap.featuredFiches.length}</div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </article>
  )
}
