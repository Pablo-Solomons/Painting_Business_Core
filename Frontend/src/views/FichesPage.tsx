'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useDemoStore } from '@/context/DemoStoreContext'
import type { DemoFiche } from '@/types/content'

const LEVEL_ORDER: Record<string, number> = {
  'Débutant': 1,
  'Intermédiaire': 2,
  'Avancé': 3,
}

export function FichesPage() {
  const { publishedFiches, isHydrated } = useDemoStore()
  const fiches = publishedFiches

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState<string>('alpha')

  const allCategories = useMemo(() => [...new Set(fiches.map((f) => f.category))].sort(), [fiches])

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    let result = fiches.filter((f) => {
      const matchesCategory = selectedCategories.size === 0 || selectedCategories.has(f.category)
      if (!matchesCategory) return false

      if (!query) return true

      return (
        f.title.toLowerCase().includes(query) ||
        f.question.toLowerCase().includes(query) ||
        f.category.toLowerCase().includes(query) ||
        f.tool.toLowerCase().includes(query) ||
        f.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        (f.summary && f.summary.toLowerCase().includes(query))
      )
    })

    switch (sortBy) {
      case 'alpha':
        result = [...result].sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'level':
        result = [...result].sort((a, b) => (LEVEL_ORDER[a.level] ?? 99) - (LEVEL_ORDER[b.level] ?? 99))
        break
      case 'duration':
        result = [...result].sort((a, b) => {
          const da = parseInt(a.duration, 10) || 0
          const db = parseInt(b.duration, 10) || 0
          return da - db
        })
        break
      case 'popularity':
      case 'date':
      default:
        break
    }

    return result
  }, [fiches, searchQuery, selectedCategories, sortBy])

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) {
        next.delete(cat)
      } else {
        next.add(cat)
      }
      return next
    })
  }

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedCategories(new Set())
    setSortBy('alpha')
  }

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
      for (let i = 0; i < 850; i += 1) {
        const x = Math.random() * width
        const y = Math.random() * height
        context.fillStyle = `rgba(0,0,0,${Math.random() * 0.13})`
        context.fillRect(x, y, 1, 1)
      }
    })
  }, [filtered])

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
        <div className="search-bar on">
          <input
            type="text"
            placeholder="Rechercher une fiche, une technique…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="button" onClick={() => {}}>Rechercher</button>
        </div>
      </div>

      <div className="content-layout fiches-layout">
        <aside className="filters-sidebar fiches-sidebar">
          <div className="filter-section">
            <span className="filter-label">Catégorie</span>
            {allCategories.map((category) => (
              <label key={category} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedCategories.has(category)}
                  onChange={() => toggleCategory(category)}
                />
                {category}
                <span className="filter-count">{fiches.filter((f) => f.category === category).length}</span>
              </label>
            ))}
          </div>

          <button type="button" className="filter-reset" onClick={resetFilters}>
            Réinitialiser les filtres
          </button>
        </aside>

        <div className="main-content fiches-main">
          <div className="results-header">
            <div className="results-count">
              {filtered.length === fiches.length ? (
                <>Affichage de <strong>{filtered.length}</strong> fiches</>
              ) : (
                <>Affichage de <strong>{filtered.length}</strong> sur <strong>{fiches.length}</strong> fiches</>
              )}
            </div>
            <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="alpha">Trier : Alphabétique</option>
              <option value="level">Trier : Niveau</option>
              <option value="duration">Trier : Durée</option>
              <option value="popularity">Trier : Popularité</option>
              <option value="date">Trier : Date</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="admin-empty" style={{ padding: '3rem 0' }}>
              <p>Aucune fiche ne correspond à votre recherche.</p>
              <button type="button" className="filter-reset" onClick={resetFilters} style={{ marginTop: '0.75rem', cursor: 'pointer' }}>
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="fiches-grid">
              {filtered.map((fiche) => (
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
          )}
        </div>
      </div>
    </div>
  )
}