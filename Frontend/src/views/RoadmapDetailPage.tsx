'use client'

import Link from 'next/link'
import { useDemoStore } from '@/context/DemoStoreContext'
import { countRoadmapFiches } from '@/lib/roadmapUtils'

type RoadmapDetailPageProps = {
  slug: string
}

export function RoadmapDetailPage({ slug }: RoadmapDetailPageProps) {
  const { getRoadmapBySlug, publishedFiches, isHydrated } = useDemoStore()
  const roadmap = getRoadmapBySlug(slug)
  const isPublished = roadmap?.status === 'published'

  if (!isHydrated) {
    return (
      <div className="auth-guard-loading">
        <div className="auth-guard-spinner" aria-hidden />
        <p>Chargement…</p>
      </div>
    )
  }

  if (!roadmap || !isPublished) {
    return (
      <article className="detail-page roadmap-detail-page">
        <nav className="breadcrumb" aria-label="Fil d’Ariane">
          <Link href="/">Accueil</Link>
          <span>/</span>
          <Link href="/roadmaps">Roadmaps</Link>
        </nav>
        <div className="detail-hero roadmap-hero">
          <h1>Roadmap introuvable</h1>
          <p className="hero-text">Ce parcours n’existe pas ou n’est pas encore publié.</p>
          <Link href="/roadmaps" className="see-all">Retour aux roadmaps</Link>
        </div>
      </article>
    )
  }

  const linkedCount = countRoadmapFiches(roadmap)

  return (
    <article className="detail-page roadmap-detail-page">
      <nav className="breadcrumb" aria-label="Fil d’Ariane">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <Link href="/roadmaps">Roadmaps</Link>
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
          <span>{linkedCount} fiche{linkedCount > 1 ? 's' : ''} liée{linkedCount > 1 ? 's' : ''}</span>
        </div>
      </section>

      <section className="two-column">
        <div className="detail-block">
          <p className="eyebrow">Parcours</p>
          <div className="timeline">
            {roadmap.steps.map((step, idx) => {
              const stepFiches = step.ficheSlugs
                .map((ficheSlug) => publishedFiches.find((f) => f.slug === ficheSlug))
                .filter((f) => f !== undefined)

              return (
                <div key={step.title} className={`step ${idx === 0 ? 'active' : ''}`}>
                  <div className="step-left">
                    <div className="step-dot">{idx + 1}</div>
                  </div>
                  <div className="step-body">
                    <div className="step-title">{step.title}</div>
                    <div className="step-text">{step.description}</div>
                    {stepFiches.length > 0 ? (
                      <div className="step-footer">
                        <div className="step-fiches">
                          <strong>Fiches à lire :</strong>
                          <div className="linked-list">
                            {stepFiches.map((fiche) => (
                              <Link key={fiche.slug} href={`/fiches/${fiche.slug}`} className="linked-item linked-item-roadmap linked-item-fiche">
                                <span className="linked-fiche-category">{fiche.category}</span>
                                <strong>{fiche.title}</strong>
                                <span className="linked-fiche-question">{fiche.question}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="step-footer">
                        <p className="step-empty">Contenu à venir — fiches en cours de rédaction.</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
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
                <div className="meta-key">Étapes</div>
                <div className="meta-val">{roadmap.steps.length}</div>
              </div>
              <div className="meta-row">
                <div className="meta-key">Fiches liées</div>
                <div className="meta-val">{linkedCount}</div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </article>
  )
}
