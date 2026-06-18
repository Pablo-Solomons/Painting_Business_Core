'use client'

import { useEffect, useRef, useState } from 'react'
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
  const { publishedFiches, publishedRoadmaps, questions, askQuestion, isHydrated } = useDemoStore()
  const [questionText, setQuestionText] = useState('')
  const [visitorName, setVisitorName] = useState('')
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const featuredRoadmap = publishedRoadmaps[0]
  const recentFiches = publishedFiches.slice(0, 3)
  const exampleFiche = publishedFiches.find((f) => f.slug === 'glacis') ?? publishedFiches[0]

  function handleQuestionSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!questionText.trim()) return

    try {
      askQuestion(questionText, visitorName)
      setQuestionText('')
      setVisitorName('')
      setFormMessage({ type: 'success', text: 'Votre question a été enregistrée avec succès ! Les peintres pourront y répondre.' })
      setTimeout(() => setFormMessage(null), 5000)
    } catch {
      setFormMessage({ type: 'error', text: 'Une erreur est survenue lors de l’enregistrement.' })
    }
  }

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
          <li><Link href="/categories">Catégories</Link></li>
          <li><Link href="/roadmaps">Roadmap</Link></li>
          <li><Link href="/fiches">Fiches</Link></li>
          <li><Link href="/techniques">Techniques</Link></li>
          <li><Link href="/oeuvres">Œuvres</Link></li>
        </ul>
        <Link href="/connexion" className="nav-cta">👤 Se connecter</Link>
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
          <Link href="/categories" className="see-all">Voir tout</Link>
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
          <Link href="/categories" className="cat-card">
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
          <Link href="/categories" className="cat-card">
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
            <p className="roadmap-lead" style={{ color: 'var(--bone)' }}>
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
          {recentFiches.map((fiche) => (
            <Link key={fiche.slug} href={`/fiches/${fiche.slug}`} className="fiche-card">
              {fiche.swatch ? (
                <div className="fiche-swatch"><FicheSwatch id={`swatch-${fiche.slug}`} colors={fiche.swatch} /></div>
              ) : (
                <div className="fiche-swatch fiche-swatch-text" data-category={fiche.category}><span>{fiche.category}</span></div>
              )}
              <div className="fiche-card-name">{fiche.title}</div>
              <div className="fiche-card-question">❓ {fiche.question}</div>
              <div className="fiche-card-sub">{fiche.category} · {fiche.tool}</div>
              <div className="fiche-tags">
                {fiche.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <span className="fiche-card-badge">Unité de connaissance</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="questions-section" style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
        <div className="section-header" style={{ marginBottom: '1.5rem' }}>
          <div>
            <div className="section-label">Échanges</div>
            <h2 className="section-title">Questions des <em>visiteurs</em></h2>
          </div>
        </div>

        <div className="questions-layout" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }}>
          <div className="questions-list-card card" style={{ padding: '1.5rem' }}>
            <div className="card-header" style={{ borderBottom: '1px solid var(--stroke)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <h3 className="card-title" style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'Playfair Display, serif' }}>Interrogations récentes</h3>
            </div>
            <div className="card-body">
              {questions.length === 0 ? (
                <p className="no-questions" style={{ color: 'var(--bone-muted)', fontStyle: 'italic' }}>Aucune question n'a encore été posée. Soyez le premier !</p>
              ) : (
                <div className="questions-list-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                  {questions.map((q) => {
                    const dateStr = new Date(q.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                    return (
                      <div key={q.id} className="question-public-item" style={{ borderBottom: '1px solid var(--stroke)', paddingBottom: '1rem' }}>
                        <div className="question-public-header" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--bone-muted)', marginBottom: '0.4rem', fontFamily: 'DM Mono, monospace' }}>
                          <span className="question-public-author">👤 {q.authorName || 'Anonyme'}</span>
                          <span className="question-public-date">{dateStr}</span>
                        </div>
                        <p className="question-public-text" style={{ margin: '0 0 0.5rem 0', fontSize: '0.92rem', lineHeight: '1.5', fontWeight: 500 }}>{q.text}</p>
                        {q.status === 'answered' ? (
                          <div className="question-status-answered" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span className="badge badge-published" style={{ background: 'rgba(74, 124, 89, 0.15)', color: '#2b5037', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>● Répondu</span>
                            {q.ficheSlug ? (
                              <Link href={`/fiches/${q.ficheSlug}`} className="question-fiche-link" style={{ fontSize: '0.78rem', color: 'var(--ochre)', textDecoration: 'underline', fontWeight: 'bold' }}>
                                Voir la réponse →
                              </Link>
                            ) : q.roadmapSlug ? (
                              <Link href={`/roadmaps/${q.roadmapSlug}`} className="question-fiche-link" style={{ fontSize: '0.78rem', color: 'var(--ochre)', textDecoration: 'underline', fontWeight: 'bold' }}>
                                Voir la réponse →
                              </Link>
                            ) : null}
                          </div>
                        ) : (
                          <div className="question-status-pending">
                            <span className="badge badge-review" style={{ background: 'rgba(157, 106, 59, 0.15)', color: 'var(--ochre)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>○ En attente d'un peintre</span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="questions-form-card card" style={{ padding: '1.5rem', alignSelf: 'start' }}>
            <div className="card-header" style={{ borderBottom: '1px solid var(--stroke)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <h3 className="card-title" style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'Playfair Display, serif' }}>Poser une question</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted)', margin: '0.25rem 0 0 0', lineHeight: 1.4 }}>
                Un de nos peintres partenaires rédigera une fiche de connaissance dédiée pour y répondre.
              </p>
            </div>
            <div className="card-body">
              <form onSubmit={handleQuestionSubmit} className="stack-form">
                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  <span>Votre question *</span>
                  <textarea
                    required
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      border: '1px solid var(--stroke)',
                      background: 'rgba(255,255,255,0.9)',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      fontSize: '0.88rem'
                    }}
                    placeholder="Ex: Quelle est la différence de séchage entre l'huile de lin et l'huile d'œillette ?"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  <span>Votre nom ou pseudonyme (optionnel)</span>
                  <input
                    type="text"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      border: '1px solid var(--stroke)',
                      background: 'rgba(255,255,255,0.9)',
                      fontSize: '0.88rem'
                    }}
                    placeholder="Ex: Léonard"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                  />
                </label>
                <button type="submit" className="button button-primary full-width" style={{ marginTop: '0.5rem', width: '100%', cursor: 'pointer', border: 'none', background: 'var(--ochre)', color: 'white', fontWeight: 'bold' }}>
                  Soumettre ma question
                </button>
                {formMessage && (
                  <div
                    className={`form-message form-message--${formMessage.type}`}
                    style={{
                      padding: '0.75rem 1rem',
                      fontSize: '0.82rem',
                      marginTop: '1rem',
                      border: '1px solid',
                      borderRadius: '4px',
                      borderColor: formMessage.type === 'success' ? '#4a7c59' : '#8c2a2a',
                      color: formMessage.type === 'success' ? '#1f3a25' : '#4a1515',
                      background: formMessage.type === 'success' ? '#eef7f0' : '#fcedcd',
                    }}
                  >
                    {formMessage.text}
                  </div>
                )}
              </form>
            </div>
          </div>
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
          <p className="footer-desc">La référence francophone pour les arts plastiques — fiches de connaissance, roadmaps structurées et communauté de peintres.</p>
        </div>
        <div>
          <div className="footer-col-title">Apprendre</div>
          <ul className="footer-links">
            <li><Link href="/roadmaps">Roadmaps</Link></li>
            <li><Link href="/fiches">Fiches de connaissance</Link></li>
            <li><Link href="/categories">Catégories</Link></li>
            <li><Link href="/techniques">Techniques</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Explorer</div>
          <ul className="footer-links">
            <li><Link href="/oeuvres">Œuvres</Link></li>
            <li><Link href="/fiches/blanc-titane">Pigments</Link></li>
            <li><Link href="/fiches/huile-de-lin">Médiums</Link></li>
            <li><Link href="/categories">Supports</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Plateforme</div>
          <ul className="footer-links">
            <li><Link href="/">À propos</Link></li>
            <li><Link href="/connexion">Contribuer</Link></li>
            <li><Link href="/connexion">Nous contacter</Link></li>
            <li><Link href="/">Mentions légales</Link></li>
          </ul>
        </div>
      </footer>
    </div>
  )
}
