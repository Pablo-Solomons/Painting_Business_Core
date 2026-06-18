'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useDemoStore } from '@/context/DemoStoreContext'
import { getRelatedFiches } from '@/lib/ficheUtils'
import { findRoadmapsForFiche } from '@/lib/roadmapUtils'

type FicheDetailPageProps = {
  slug: string
}

export function FicheDetailPage({ slug }: FicheDetailPageProps) {
  const { getFicheBySlug, isHydrated, publishedFiches, publishedRoadmaps } = useDemoStore()
  const fiche = getFicheBySlug(slug)
  const isPublished = fiche?.status === 'published'
  const referencingRoadmaps = isPublished ? findRoadmapsForFiche(slug, publishedRoadmaps) : []
  const relatedFiches = isPublished && fiche
    ? getRelatedFiches(fiche, publishedFiches, 4)
    : []

  useEffect(() => {
    if (!fiche?.swatch) return

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
  }, [slug, fiche?.swatch])

  if (!isHydrated) {
    return (
      <div className="auth-guard-loading">
        <div className="auth-guard-spinner" aria-hidden />
        <p>Chargement…</p>
      </div>
    )
  }

  if (!fiche || !isPublished) {
    return (
      <article className="fiche-detail-page">
        <nav className="breadcrumb fiche-breadcrumb" aria-label="Fil d’Ariane">
          <Link href="/">Accueil</Link>
          <span className="breadcrumb-sep">›</span>
          <Link href="/fiches">Fiches</Link>
        </nav>
        <div className="content-section" style={{ padding: '4rem 0' }}>
          <h1>Fiche introuvable</h1>
          <p>Cette fiche n’existe pas ou n’est pas encore publiée.</p>
          <Link href="/fiches" className="see-all">Retour aux fiches</Link>
        </div>
      </article>
    )
  }

  return (
    <article className="fiche-detail-page">
      <nav className="breadcrumb fiche-breadcrumb" aria-label="Fil d’Ariane">
        <Link href="/">Accueil</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href="/fiches">Fiches</Link>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">{fiche.title}</span>
      </nav>

      <section className="fiche-hero">
        {fiche.swatch ? (
          <div className="hero-swatch-big" aria-hidden="true">
            <canvas width={220} height={280} className="hero-swatch-canvas" data-swatch={fiche.swatch.join(',')} />
          </div>
        ) : (
          <div className="hero-swatch-big hero-swatch-placeholder" data-category={fiche.category} aria-hidden="true">
            <span className="hero-swatch-letter">{fiche.category.charAt(0)}</span>
            <span className="hero-swatch-category">{fiche.category}</span>
          </div>
        )}
        <div className="hero-meta">
          <div className="hero-eyebrow">Unité de connaissance · lisible indépendamment</div>
          <h1 className="hero-title">{fiche.title}</h1>
          <p className="hero-question">❓ {fiche.question}</p>
          {fiche.pigmentCode ? (
            <div className="hero-code">{fiche.pigmentCode}</div>
          ) : null}
          <div className="hero-badges">
            <span className="badge badge-published">{fiche.level}</span>
            <span className="badge badge-semi">{fiche.duration}</span>
          </div>
          <button type="button" className="hero-print">
            ⊟ Imprimer cette fiche
          </button>
        </div>
      </section>

      <div className="fiche-body">
        <div className="fiche-left">
          <div className="content-section content-section--lead">
            <span className="section-label">Cette fiche répond à la question</span>
            <h2 className="fiche-question-highlight">{fiche.question}</h2>
            <p className="lead-paragraph">{fiche.summary}</p>
          </div>

          {fiche.sections.map((section) => (
            <div key={section.title} className="content-section">
              <span className="section-label">{section.label}</span>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="fiche-right">
          <div className="right-section">
            <span className="section-label">Tags</span>
            <div className="tags-wrap">
              {fiche.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="right-section">
            <span className="section-label">Informations</span>
            <dl className="fiche-meta-list">
              <div className="fiche-meta-item"><dt>Catégorie</dt><dd>{fiche.category}</dd></div>
              <div className="fiche-meta-item"><dt>Médium</dt><dd>{fiche.tool}</dd></div>
              <div className="fiche-meta-item"><dt>Niveau</dt><dd>{fiche.level}</dd></div>
              <div className="fiche-meta-item"><dt>Durée</dt><dd>{fiche.duration}</dd></div>
            </dl>
          </div>

          {referencingRoadmaps.length > 0 ? (
            <div className="right-section right-section--roadmaps">
              <span className="section-label">Présente dans</span>
              <div className="roadmap-links-stack">
                {referencingRoadmaps.map(({ roadmap, stepIndex, step }) => (
                  <Link
                    key={roadmap.slug}
                    href={`/roadmaps/${roadmap.slug}`}
                    className="linked-item linked-item-roadmap"
                  >
                    <span className="linked-icon">🗺</span>
                    <strong>{roadmap.title}</strong>
                    <span>Étape {stepIndex + 1} · {step.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {relatedFiches.length > 0 ? (
        <section className="related-section" aria-labelledby="related-fiches-title">
          <div className="related-header">
            <div>
              <div className="section-label">Continuer à explorer</div>
              <h2 id="related-fiches-title" className="related-title">Fiches similaires</h2>
              <p className="related-subtitle">
                Sélectionnées selon vos tags et la catégorie <strong>{fiche.category}</strong>
              </p>
            </div>
            <Link href={`/fiches?cat=${encodeURIComponent(fiche.category)}`} className="see-all related-see-all">
              Tout voir →
            </Link>
          </div>

          <div className="related-track">
            {relatedFiches.map(({ fiche: item, reason, sharedTags }) => (
              <Link key={item.slug} href={`/fiches/${item.slug}`} className="related-card">
                <div className="related-card-top">
                  {item.swatch ? (
                    <div className="related-swatch" aria-hidden>
                      {item.swatch.map((color) => (
                        <div key={color} className="related-swatch-seg" style={{ background: color }} />
                      ))}
                    </div>
                  ) : (
                    <div className="related-swatch related-swatch-text" data-category={item.category} aria-hidden>
                      <span>{item.category.charAt(0)}</span>
                    </div>
                  )}
                  <span className="related-reason">{reason}</span>
                </div>

                <div className="related-body">
                  <div className="related-meta-row">
                    <span className="related-code">{item.category}</span>
                    <span className="related-duration">{item.duration}</span>
                  </div>
                  <div className="related-name">{item.title}</div>
                  <p className="related-question">{item.question}</p>
                  <p className="related-excerpt">{item.summary}</p>
                  <div className="related-tags">
                    {(sharedTags.length > 0 ? sharedTags : item.tags).slice(0, 3).map((tag) => (
                      <span key={tag} className="related-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <span className="related-arrow" aria-hidden />
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
