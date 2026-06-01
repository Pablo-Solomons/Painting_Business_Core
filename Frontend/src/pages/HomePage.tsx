import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { appLogoUrl } from '../data/assets'

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
  return (
    <div className="homepage-page">
      <nav className="home-nav">
        <Link to="/" className="nav-logo" aria-label="ArtPlastique">
          <img src={appLogoUrl} alt="ArtPlastique logo" />
        </Link>
        <ul className="nav-links">
          <li><Link to="/themes">Catégories</Link></li>
          <li><Link to="/roadmaps">Roadmap</Link></li>
          <li><Link to="/fiches">Fiches</Link></li>
          <li><Link to="/themes">Techniques</Link></li>
          <li><Link to="/connexion">Communauté</Link></li>
        </ul>
        <Link to="/connexion" className="nav-cta">Commencer</Link>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">Plateforme de référence</div>
          <h1 className="hero-title">
            L'art plastique,
            <em>maîtrisé.</em>
          </h1>
          <p className="hero-desc">
            Roadmaps complètes, fiches techniques sur chaque pigment, médium et support — tout ce qu'il faut pour progresser dans les arts plastiques, structuré et clair.
          </p>
          <div className="hero-actions">
            <Link to="/fiches" className="btn-primary">Explorer la plateforme &nbsp;&nbsp;&nbsp;</Link>
            <Link to="/themes" className="btn-ghost">Voir les catégories</Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-num">240+</div>
              <div className="stat-label">Fiches techniques</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">18</div>
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
          <Link to="/themes" className="see-all">Voir tout</Link>
        </div>

        <div className="cat-grid">
          <Link to="/fiches" className="cat-card featured">
            <div className="cat-num">01</div>
            <span className="cat-icon">🎨</span>
            <div className="cat-name">Peinture</div>
            <p className="cat-desc">Huile, acrylique, aquarelle, tempera — maîtrisez chaque médium avec des guides complets et des fiches pigments.</p>
            <span className="cat-count">84 fiches</span>
            <div className="cat-arrow" />
          </Link>
          <Link to="/themes" className="cat-card">
            <div className="cat-num">02</div>
            <span className="cat-icon">✏️</span>
            <div className="cat-name">Dessin</div>
            <p className="cat-desc">Du croquis à la perspective avancée.</p>
            <span className="cat-count">52 fiches</span>
            <div className="cat-arrow" />
          </Link>
          <Link to="/roadmaps" className="cat-card">
            <div className="cat-num">03</div>
            <span className="cat-icon">🗿</span>
            <p className="cat-desc">Argile, bronze, résine et matières.</p>
            <span className="cat-count">31 fiches</span>
            <div className="cat-arrow" />
          </Link>
          <Link to="/fiches" className="cat-card">
            <div className="cat-num">04</div>
            <span className="cat-icon">🖨️</span>
            <div className="cat-name">Gravure</div>
            <p className="cat-desc">Taille-douce, lithographie, sérigraphie.</p>
            <span className="cat-count">28 fiches</span>
            <div className="cat-arrow" />
          </Link>
          <Link to="/themes" className="cat-card">
            <div className="cat-num">05</div>
            <span className="cat-icon">🖌️</span>
            <div className="cat-name">Mixed Media</div>
            <p className="cat-desc">Collage, assemblage, art numérique.</p>
            <span className="cat-count">45 fiches</span>
            <div className="cat-arrow" />
          </Link>
        </div>
      </section>

      <section className="roadmap-section">
        <div className="roadmap-grid">
          <div>
            <div className="section-label">Progresser</div>
            <h2 className="section-title">Roadmaps<br /><em>structurées</em></h2>
            <p className="roadmap-lead">
              Des parcours d'apprentissage clairs du débutant au professionnel, adaptés à chaque discipline.
            </p>

            <div className="roadmap-steps">
              <div className="step active">
                <div className="step-dot">01</div>
                <div className="step-content">
                  <div className="step-title">Les fondamentaux</div>
                  <div className="step-text">Outils, matériaux essentiels, premiers gestes et vocabulaire de l'art plastique.</div>
                </div>
              </div>
              <div className="step">
                <div className="step-dot">02</div>
                <div className="step-content">
                  <div className="step-title">Techniques de base</div>
                  <div className="step-text">Maîtrise du médium choisi, exercices progressifs et projets guidés.</div>
                </div>
              </div>
              <div className="step">
                <div className="step-dot">03</div>
                <div className="step-content">
                  <div className="step-title">Développer son style</div>
                  <div className="step-text">Expérimentation, influences, construction d'une signature artistique.</div>
                </div>
              </div>
              <div className="step">
                <div className="step-dot">04</div>
                <div className="step-content">
                  <div className="step-title">Niveau professionnel</div>
                  <div className="step-text">Portfolio, expositions, commercialisation de son travail.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="roadmap-visual">
            <div className="roadmap-card">
              <div className="roadmap-card-label">Fiche pigment — Exemple</div>
              <div className="paint-chip">
                <div className="chip" style={{ background: '#1a3a5c' }}>
                  <span className="chip-label">Pr. Blue</span>
                </div>
                <div className="chip" style={{ background: '#3d6b8c' }}>
                  <span className="chip-label">Mélange</span>
                </div>
                <div className="chip" style={{ background: '#c8922a' }}>
                  <span className="chip-label">Ocre</span>
                </div>
                <div className="chip" style={{ background: '#7a2020' }}>
                  <span className="chip-label">Carmin</span>
                </div>
                <div className="chip" style={{ background: '#2a3d1a' }}>
                  <span className="chip-label">V. Émer.</span>
                </div>
              </div>

              <div className="roadmap-fiche-table">
                <div className="fiche-row"><span className="fiche-key">Nom</span><span className="fiche-val">Bleu de Prusse</span></div>
                <div className="fiche-row"><span className="fiche-key">Code pigment</span><span className="fiche-val ochre">PB27</span></div>
                <div className="fiche-row"><span className="fiche-key">Opacité</span><span className="fiche-val">Semi-transparent</span></div>
                <div className="fiche-row"><span className="fiche-key">Résistance lumière</span><span className="fiche-val ochre">⭑⭑⭑⭑⭑</span></div>
                <div className="fiche-row"><span className="fiche-key">Compatibilité</span><span className="fiche-val">Huile · Acryl · Aqua.</span></div>
                <div className="fiche-row"><span className="fiche-key">Toxicité</span><span className="fiche-val fiche-good">Faible</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fiches-section">
        <div className="section-header">
          <div>
            <div className="section-label">Ressources</div>
            <h2 className="section-title">Fiches <em>récentes</em></h2>
          </div>
          <Link to="/fiches" className="see-all">Voir tout</Link>
        </div>

        <div className="fiches-scroll">
          <Link to="/fiches/huile-de-lin" className="fiche-card">
            <div className="fiche-swatch"><FicheSwatch id="swatch1" colors={['#d4a847', '#c8922a', '#b07820', '#8a5c10', '#6b440a']} /></div>
            <div className="fiche-card-name">Jaune de Naples</div>
            <div className="fiche-card-sub">PY41 · Peinture à l'huile</div>
            <div className="fiche-tags">
              <span className="tag">Opaque</span>
              <span className="tag">Toxique</span>
              <span className="tag">Traditionnel</span>
            </div>
          </Link>
          <Link to="/fiches/blanc-titane" className="fiche-card">
            <div className="fiche-swatch"><FicheSwatch id="swatch2" colors={['#8c1a1a', '#a02020', '#c43030', '#d44040', '#b82828']} /></div>
            <div className="fiche-card-name">Alizarine Cramoisie</div>
            <div className="fiche-card-sub">PR83 · Tous médiums</div>
            <div className="fiche-tags">
              <span className="tag">Transparent</span>
              <span className="tag">Non-stable</span>
            </div>
          </Link>
          <Link to="/fiches/imprimature" className="fiche-card">
            <div className="fiche-swatch"><FicheSwatch id="swatch3" colors={['#7a4a1a', '#9a6020', '#b87830', '#c89040', '#a06828']} /></div>
            <div className="fiche-card-name">Terre de Sienne</div>
            <div className="fiche-card-sub">PBr7 · Aquarelle</div>
            <div className="fiche-tags">
              <span className="tag">Granuleux</span>
              <span className="tag">Naturel</span>
              <span className="tag">Stable</span>
            </div>
          </Link>
        </div>
      </section>

      <div className="cta-banner">
        <div>
          <h2 className="cta-title">Rejoins la<br /><em>communauté.</em></h2>
        </div>
        <Link to="/connexion" className="btn-dark">S'inscrire gratuitement</Link>
      </div>

      <footer className="home-footer">
        <div className="footer-brand">
          <Link to="/" className="nav-logo"><img src={appLogoUrl} alt="ArtPlastique logo" style={{ maxWidth: 140 }} /></Link>
          <p className="footer-desc">La référence francophone pour les arts plastiques — technique, pratique, accessible.</p>
        </div>
        <div>
          <div className="footer-col-title">Apprendre</div>
          <ul className="footer-links">
            <li><Link to="/roadmaps">Roadmaps</Link></li>
            <li><Link to="/fiches">Fiches techniques</Link></li>
            <li><Link to="/themes">Guides débutants</Link></li>
            <li><Link to="/themes">Glossaire</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Explorer</div>
          <ul className="footer-links">
            <li><Link to="/themes">Catégories</Link></li>
            <li><Link to="/fiches/blanc-titane">Pigments</Link></li>
            <li><Link to="/fiches/huile-de-lin">Médiums</Link></li>
            <li><Link to="/themes">Supports</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Plateforme</div>
          <ul className="footer-links">
            <li><Link to="/">À propos</Link></li>
            <li><Link to="/connexion">Contribuer</Link></li>
            <li><Link to="/connexion">Contact</Link></li>
            <li><Link to="/">Mentions légales</Link></li>
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
