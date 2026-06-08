'use client'

import Link from 'next/link'
import { useDemoStore } from '@/context/DemoStoreContext'

export function RoadmapsPage() {
  const { publishedRoadmaps, isHydrated } = useDemoStore()

  if (!isHydrated) {
    return (
      <div className="auth-guard-loading">
        <div className="auth-guard-spinner" aria-hidden />
        <p>Chargement…</p>
      </div>
    )
  }

  return (
    <section className="catalog-layout roadmap-layout">
      <aside className="filters-panel roadmap-intro">
        <p className="eyebrow">Roadmaps</p>
        <h1>Parcours guidés</h1>
        <p>Des trajectoires d’apprentissage ordonnées, étape par étape, avec des fiches à consulter au fil du parcours.</p>
        <div className="roadmap-summary">
          <strong>Programmes structurés</strong>
          <span>Chaque étape référence des fiches indépendantes que vous pouvez aussi lire seules.</span>
        </div>
        <Link href="/connexion" className="button button-dark full-width">
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
          {publishedRoadmaps.length === 0 ? (
            <p className="step-empty">Aucune roadmap publiée pour le moment.</p>
          ) : (
            publishedRoadmaps.map((roadmap, index) => (
              <Link key={roadmap.slug} href={`/roadmaps/${roadmap.slug}`} className="roadmap-card-item">
                <div className="roadmap-card-num">{String(index + 1).padStart(2, '0')}</div>
                <div>
                  <div className="roadmap-card-title">{roadmap.title}</div>
                  <div className="roadmap-card-desc">{roadmap.summary}</div>
                </div>

                <div className="roadmap-progress">
                  <div className="roadmap-progress-bar roadmap-progress-bar--public" aria-hidden>
                    <div
                      className="roadmap-progress-fill roadmap-progress-fill--public"
                      style={{ width: `${Math.min(100, roadmap.steps.length * 25)}%` }}
                    />
                  </div>
                  <div className="roadmap-steps-count">{roadmap.steps.length} étapes</div>
                </div>

                <div className="roadmap-card-footer">
                  <span className="badge">{roadmap.duration}</span>
                  <span className="roadmap-card-label">{roadmap.level}</span>
                </div>

                <div className="roadmap-card-arrow" />
              </Link>
            ))
          )}

          <Link href="/connexion" className="roadmap-new-card">
            <div className="roadmap-new-plus">+</div>
            <div className="roadmap-new-label">Créer une roadmap</div>
          </Link>
        </div>
      </div>
    </section>
  )
}
