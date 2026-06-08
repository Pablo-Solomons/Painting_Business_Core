'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { appLogoUrl } from '../data/assets'
import { useDemoStore } from '@/context/DemoStoreContext'

function FicheSwatch({ id, colors }: { id: string; colors: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const width = 300
    const height = 96
    canvas.width = width
    canvas.height = height

    const segmentWidth = width / colors.length
    colors.forEach((color, index) => {
      context.fillStyle = color
      context.fillRect(index * segmentWidth, 0, segmentWidth + 1, height)
    })

    for (let index = 0; index < 800; index += 1) {
      const x = Math.random() * width
      const y = Math.random() * height
      context.fillStyle = `rgba(0,0,0,${Math.random() * 0.15})`
      context.fillRect(x, y, 1, 1)
    }
  }, [colors])

  return <canvas ref={canvasRef} id={id} width={300} height={96} />
}

export function HomePage() {
  const { publishedFiches, publishedRoadmaps, isHydrated } = useDemoStore()
  const featuredRoadmap = publishedRoadmaps[0]
  const recentFiches = publishedFiches.slice(0, 3)
  const exampleFiche = publishedFiches.find((f) => f.slug === 'glacis') ?? publishedFiches[0]

  if (!isHydrated) {
    return (
      <div className="auth-guard-loading">
        <div className="auth-guard-spinner" aria-hidden />
        <p>Chargement…</p>
      </div>
    )
  }

  return (
    <div className="homepage-page">
      <nav className="home-nav">
        <Link href="/" className="nav-logo" aria-label="ArtPlastique">
          <img src={appLogoUrl} alt="ArtPlastique logo" />
        </Link>
        <ul className="nav-links">
          <li><Link href="/themes">Catégories</Link></li>
          <li><Link href="/roadmaps">Roadmap</Link></li>
          <li><Link href="/fiches">Fiches</Link></li>
          <li><Link href="/themes">Techniques</Link></li>
          <li><Link href="/connexion">Communauté</Link></li>
        </ul>
        <Link href="/connexion" className="nav-cta">Commencer</Link>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">Plateforme de référence</div>
          <h1 className="hero-title">
            L'art plastique,
            <em>maîtrisé.</em>
          </h1>
          <p className="hero-desc">
            Des fiches de connaissance autonomes et des roadmaps structurées — progressez à votre rythme ou suivez un parcours étape par étape.
          </p>
          <div className="hero-actions">
            <Link href="/fiches" className="btn-primary">Explorer les fiches &nbsp;&nbsp;&nbsp;</Link>
            <Link href="/roadmaps" className="btn-ghost">Voir les roadmaps</Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-num">{publishedFiches.length}+</div>
              <div className="stat-label">Fiches</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">{publishedRoadmaps.length}</div>
              <div className="stat-label">Roadmaps</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">12</div>
              <div className="stat-label">Catégories</div>
            </div>
          </div>
        </div>

        <div className="hero-image" aria-hidden="true" />
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <div className="section-label">Explorer</div>
            <h2 className="section-title">Toutes les <em>disciplines</em></h2>
          </div>
          <Link href="/themes" className="see-all">Voir tout</Link>
        </div>

        <div className="cat-grid">
          <Link href="/fiches" className="cat-card featured">
            <div className="cat-num">01</div>
            <span className="cat-icon">🎨</span>
            <div className="cat-name">Peinture</div>
            <p className="cat-desc">Huile, acrylique, aquarelle, tempera — maîtrisez chaque médium avec des guides complets et des fiches pigments.</p>
            <span className="cat-count">84 fiches</span>
            <div className="cat-arrow" />
          </Link>
          <Link href="/themes" className="cat-card">
            <div className="cat-num">02</div>
            <span className="cat-icon">✏️</span>
            <div className="cat-name">Dessin</div>
            <p className="cat-desc">Du croquis à la perspective avancée.</p>
            <span className="cat-count">52 fiches</span>
            <div className="cat-arrow" />
          </Link>
          <Link href="/roadmaps" className="cat-card">
            <div className="cat-num">03</div>
            <span className="cat-icon">🗿</span>
            <p className="cat-desc">Argile, bronze, résine et matières.</p>
            <span className="cat-count">31 fiches</span>
            <div className="cat-arrow" />
          </Link>
          <Link href="/fiches" className="cat-card">
            <div className="cat-num">04</div>
            <span className="cat-icon">🖨️</span>
            <div className="cat-name">Gravure</div>
            <p className="cat-desc">Taille-douce, lithographie, sérigraphie.</p>
            <span className="cat-count">28 fiches</span>
            <div className="cat-arrow" />
          </Link>
          <Link href="/themes" className="cat-card">
            <div className="cat-num">05</div>
            <span className="cat-icon">🖌️</span>
            <div className="cat-name">Mixed Media</div>
            <p className="cat-desc">Collage, assemblage, art numérique.</p>
            <span className="cat-count">45 fiches</span>
            <div className="cat-arrow" />
          </Link>
        </div>
      </section>

      {featuredRoadmap ? (
      <section className="roadmap-section">
        <div className="roadmap-grid">
          <div>
            <div className="section-label">Progresser</div>
            <h2 className="section-title">Roadmaps<br /><em>structurées</em></h2>
            <p className="roadmap-lead">
              Des parcours ordonnés qui référencent des fiches indépendantes — suivez-les dans l’ordre pour atteindre un objectif.
            </p>

            <div className="roadmap-steps">
              {featuredRoadmap.steps.map((step, index) => (
                <div key={step.title} className={`step${index === 0 ? ' active' : ''}`}>
                  <div className="step-dot">{String(index + 1).padStart(2, '0')}</div>
                  <div className="step-content">
                    <div className="step-title">{step.title}</div>
                    <div className="step-text">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link href={`/roadmaps/${featuredRoadmap.slug}`} className="roadmap-cta-link">
              Voir le parcours complet →
            </Link>
          </div>

          <div className="roadmap-visual">
            {exampleFiche ? (
            <Link href={`/fiches/${exampleFiche.slug}`} className="roadmap-card">
              <div className="roadmap-card-label">Fiche — lue seule ou dans une roadmap</div>
              <div className="roadmap-fiche-table">
                <div className="fiche-row"><span className="fiche-key">Titre</span><span className="fiche-val">{exampleFiche.title}</span></div>
                <div className="fiche-row"><span className="fiche-key">Question</span><span className="fiche-val ochre">{exampleFiche.question}</span></div>
                <div className="fiche-row"><span className="fiche-key">Catégorie</span><span className="fiche-val">{exampleFiche.category}</span></div>
                <div className="fiche-row"><span className="fiche-key">Niveau</span><span className="fiche-val">{exampleFiche.level}</span></div>
                <div className="fiche-row"><span className="fiche-key">Durée</span><span className="fiche-val">{exampleFiche.duration}</span></div>
                <div className="fiche-row"><span className="fiche-key">Roadmap</span><span className="fiche-val fiche-good">{featuredRoadmap.title}</span></div>
              </div>
            </Link>
            ) : null}
          </div>
        </div>
      </section>
      ) : null}

      <section className="fiches-section">
        <div className="section-header">
          <div>
            <div className="section-label">Ressources</div>
            <h2 className="section-title">Fiches <em>récentes</em></h2>
          </div>
          <Link href="/fiches" className="see-all">Voir tout</Link>
        </div>

        <div className="fiches-scroll">
          {recentFiches.map((fiche, index) => (
            <Link key={fiche.slug} href={`/fiches/${fiche.slug}`} className="fiche-card">
              {fiche.swatch ? (
                <div className="fiche-swatch"><FicheSwatch id={`swatch-${fiche.slug}`} colors={fiche.swatch} /></div>
              ) : (
                <div className="fiche-swatch fiche-swatch-text" data-category={fiche.category}><span>{fiche.category}</span></div>
              )}
              <div className="fiche-card-name">{fiche.title}</div>
              <div className="fiche-card-sub">{fiche.category} · {fiche.tool}</div>
              <div className="fiche-tags">
                {fiche.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="cta-banner">
        <div>
          <h2 className="cta-title">Rejoins la<br /><em>communauté.</em></h2>
        </div>
        <Link href="/connexion" className="btn-dark">S'inscrire gratuitement</Link>
      </div>

      <footer className="home-footer">
        <div className="footer-brand">
          <Link href="/" className="nav-logo"><img src={appLogoUrl} alt="ArtPlastique logo" style={{ maxWidth: 140 }} /></Link>
          <p className="footer-desc">La référence francophone pour les arts plastiques — technique, pratique, accessible.</p>
        </div>
        <div>
          <div className="footer-col-title">Apprendre</div>
          <ul className="footer-links">
            <li><Link href="/roadmaps">Roadmaps</Link></li>
            <li><Link href="/fiches">Fiches techniques</Link></li>
            <li><Link href="/themes">Guides débutants</Link></li>
            <li><Link href="/themes">Glossaire</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Explorer</div>
          <ul className="footer-links">
            <li><Link href="/themes">Catégories</Link></li>
            <li><Link href="/fiches/blanc-titane">Pigments</Link></li>
            <li><Link href="/fiches/huile-de-lin">Médiums</Link></li>
            <li><Link href="/themes">Supports</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Plateforme</div>
          <ul className="footer-links">
            <li><Link href="/">À propos</Link></li>
            <li><Link href="/connexion">Contribuer</Link></li>
            <li><Link href="/connexion">Contact</Link></li>
            <li><Link href="/">Mentions légales</Link></li>
          </ul>
        </div>
      </footer>

      <div className="footer-bottom">
        <span className="footer-copy">© 2025 ArtPlastique — Tous droits réservés</span>
        <span className="footer-copy">Fait avec passion pour les artistes</span>
      </div>
    </div>
  )
}
