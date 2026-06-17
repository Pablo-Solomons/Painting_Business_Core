'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useDemoStore } from '@/context/DemoStoreContext'

export function FichesPage() {
  const { publishedFiches, isHydrated } = useDemoStore()
  const fiches = publishedFiches
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

  const categories = [...new Set(fiches.map((f) => f.category))]

  if (!isHydrated) {
    return (
      <div className="auth-guard-loading auth-guard-loading--page">
        <div className="auth-guard-spinner" aria-hidden />
        <p>Chargement…</p>
      </div>
    )
  }

  return (
    <div className="fiches-page">
      <div className="page-header fiche-page-header">
        <div className="page-header-eyebrow">Ressources · {fiches.length} fiches</div>
        <h1>Fiches <em>de connaissance</em></h1>
        <p>Chaque fiche répond à une question précise — technique, pigment, support ou médium. Lisez-les seules ou suivez une roadmap.</p>
      </div>

      <div className="search-bar-wrap">
        <div className="search-bar">
          <input type="text" placeholder="Rechercher une fiche, une technique…" defaultValue="" />
          <button type="button">Rechercher</button>
        </div>
      </div>

      <div className="content-layout fiches-layout">
        <aside className="filters-sidebar fiches-sidebar">
          <div className="filter-section">
            <span className="filter-label">Catégorie</span>
            {categories.map((category, index) => (
              <label key={category} className="filter-option">
                <input type="checkbox" defaultChecked={index === 0} />
                {category}
                <span className="filter-count">{fiches.filter((f) => f.category === category).length}</span>
              </label>
            ))}
          </div>

          <button type="button" className="filter-reset">
            Réinitialiser les filtres
          </button>
        </aside>

        <div className="main-content fiches-main">
          <div className="results-header">
            <div className="results-count">
              Affichage de <strong>1–{fiches.length}</strong> sur <strong>{fiches.length}</strong> fiches
            </div>
            <select className="sort-select" defaultValue="alpha">
              <option value="popularite">Trier : Popularité</option>
              <option value="date">Trier : Date</option>
              <option value="alpha">Trier : Alphabétique</option>
            </select>
          </div>

          <div className="fiches-grid">
            {fiches.map((fiche) => (
              <Link key={fiche.slug} href={`/fiches/${fiche.slug}`} className="fiche-card">
                {fiche.swatch ? (
                  <div className="fiche-swatch" aria-hidden="true">
                    <canvas id={fiche.slug} width={300} height={96} data-swatch={fiche.swatch.join(',')} />
                  </div>
                ) : (
                  <div className="fiche-swatch fiche-swatch-text" data-category={fiche.category} aria-hidden="true">
                    <span>{fiche.category}</span>
                  </div>
                )}
                <div className="fiche-card-body">
                  <div className="fiche-card-badge fiche-card-badge--knowledge">Unité de connaissance</div>
                  <div className="fiche-card-name">{fiche.title}</div>
                  <div className="fiche-card-question-fiche">❓ {fiche.question}</div>
                  <div className="fiche-code">{fiche.category} · {fiche.tool}</div>
                  <div className="fiche-tags">
                    {fiche.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="fiche-footer">
                  <span className="fiche-views-icon">◎</span> {fiche.duration} · {fiche.level}
                </div>
                <div className="fiche-card-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
