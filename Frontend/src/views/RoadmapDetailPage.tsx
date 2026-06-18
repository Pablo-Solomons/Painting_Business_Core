'use client'

import Link from 'next/link'
import { useCallback, useState } from 'react'
import { useDemoStore } from '@/context/DemoStoreContext'
import { countRoadmapFiches } from '@/lib/roadmapUtils'

type SlideDirection = 'next' | 'prev'

type RoadmapDetailPageProps = {
  slug: string
}

export function RoadmapDetailPage({ slug }: RoadmapDetailPageProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState<SlideDirection>('next')
  const { getRoadmapBySlug, publishedFiches, isHydrated } = useDemoStore()
  const roadmap = getRoadmapBySlug(slug)
  const isPublished = roadmap?.status === 'published'

  const goToStep = useCallback((index: number) => {
    setCurrentStepIndex((prev) => {
      if (index === prev) return prev
      setSlideDirection(index > prev ? 'next' : 'prev')
      return index
    })
  }, [])

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

  const prevStep = currentStepIndex > 0 ? roadmap.steps[currentStepIndex - 1] : null
  const nextStep = currentStepIndex < roadmap.steps.length - 1 ? roadmap.steps[currentStepIndex + 1] : null
  const currentStep = roadmap.steps[currentStepIndex]
  const stepFiches = currentStep.ficheSlugs
    .map((ficheSlug) => publishedFiches.find((f) => f.slug === ficheSlug))
    .filter((f) => f !== undefined)

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
          <p className="eyebrow">Parcours détaillés</p>

          {/* Info header */}
          <div className="roadmap-info-header">
            <div className="roadmap-info-grid">
              <div className="info-item">
                <div className="info-label">Auteur</div>
                <div className="info-value">Art Plastique Team</div>
                <div className="info-meta">Contributeurs · 3</div>
              </div>
              <div className="info-item">
                <div className="info-label">Étapes</div>
                <div className="info-value">{roadmap.steps.length}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Fiches liées</div>
                <div className="info-value">{linkedCount}</div>
              </div>
            </div>
          </div>

          <div className="roadmap-carousel">
            {/* Progress bar */}
            <div className="roadmap-progress">
              <div className="progress-track">
                <div 
                  className="progress-fill"
                  style={{ width: `${((currentStepIndex + 1) / roadmap.steps.length) * 100}%` }}
                />
              </div>
              <div className="progress-label">{currentStepIndex + 1} / {roadmap.steps.length}</div>
            </div>

            {/* Step slide */}
            <div className="carousel-viewport">
              <div
                key={currentStepIndex}
                className={`carousel-slide carousel-slide--${slideDirection}`}
              >
                <div className="slide-content">
                  <div className="step-header">
                    <div className="step-dot-large">{currentStepIndex + 1}</div>
                    <div>
                      <div className="step-title">{currentStep.title}</div>
                      <div className="step-text">{currentStep.description}</div>
                    </div>
                  </div>

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
            </div>

            {/* Navigation */}
            <div className="carousel-nav">
              <button
                type="button"
                onClick={() => goToStep(currentStepIndex - 1)}
                disabled={!prevStep}
                className="carousel-nav-btn carousel-nav-btn--prev"
                aria-label={prevStep ? `Étape précédente : ${prevStep.title}` : 'Pas d’étape précédente'}
              >
                <span className="carousel-nav-chevron" aria-hidden>‹</span>
                <span className="carousel-nav-copy">
                  <span className="carousel-nav-label">Précédent</span>
                  {prevStep ? (
                    <span className="carousel-nav-hint">{prevStep.title}</span>
                  ) : (
                    <span className="carousel-nav-hint carousel-nav-hint--empty">Début du parcours</span>
                  )}
                </span>
              </button>

              <div className="carousel-steps-indicator" role="tablist" aria-label="Étapes du parcours">
                {roadmap.steps.map((step, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={idx === currentStepIndex}
                    onClick={() => goToStep(idx)}
                    className={`carousel-dot ${idx === currentStepIndex ? 'active' : ''}`}
                    title={step.title}
                    aria-label={`Étape ${idx + 1} : ${step.title}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => goToStep(currentStepIndex + 1)}
                disabled={!nextStep}
                className="carousel-nav-btn carousel-nav-btn--next"
                aria-label={nextStep ? `Étape suivante : ${nextStep.title}` : 'Pas d’étape suivante'}
              >
                <span className="carousel-nav-copy">
                  <span className="carousel-nav-label">Suivant</span>
                  {nextStep ? (
                    <span className="carousel-nav-hint">{nextStep.title}</span>
                  ) : (
                    <span className="carousel-nav-hint carousel-nav-hint--empty">Fin du parcours</span>
                  )}
                </span>
                <span className="carousel-nav-chevron" aria-hidden>›</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

