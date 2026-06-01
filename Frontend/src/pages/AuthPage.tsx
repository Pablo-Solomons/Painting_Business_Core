import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { appLogoUrl } from '../data/assets'

type AuthTab = 'login' | 'signup'

function GrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const width = canvas.clientWidth || 640
    const height = canvas.clientHeight || 900

    canvas.width = width
    canvas.height = height

    for (let index = 0; index < 4200; index += 1) {
      const x = Math.random() * width
      const y = Math.random() * height
      const alpha = Math.random() * 0.17
      context.fillStyle = `rgba(255,255,255,${alpha})`
      context.fillRect(x, y, 1, 1)
    }
  }, [])

  return <canvas ref={canvasRef} className="grain-overlay" aria-hidden="true" />
}

export function AuthPage() {
  const [activeTab, setActiveTab] = useState<AuthTab>('login')

  return (
    <div className="auth-page">
      <nav className="auth-nav">
        <Link to="/" className="nav-logo" aria-label="ArtPlastique">
          <img src={appLogoUrl} alt="ArtPlastique logo" />
        </Link>
        <Link to="/" className="nav-back">
          Retour à l'accueil
        </Link>
      </nav>

      <div className="auth-wrapper">
        <section className="auth-panel-left">
          <GrainCanvas />
          <div className="panel-bg-letter">A</div>
          <div className="panel-content">
            <div className="panel-chips">
              <div className="panel-chip" style={{ background: '#d4a847' }} />
              <div className="panel-chip" style={{ background: '#8c1a1a' }} />
              <div className="panel-chip" style={{ background: '#7a4a1a' }} />
              <div className="panel-chip" style={{ background: '#1a3a5c' }} />
              <div className="panel-chip" style={{ background: '#4a7c59' }} />
            </div>
            <div className="panel-label">Rejoindre la plateforme</div>
            <h2 className="panel-title">
              La technique au<br />
              service de <em>l'art.</em>
            </h2>
            <p className="panel-desc">
              Accède à 240+ fiches techniques, des roadmaps structurées et une bibliothèque complète de pigments, médiums et supports.
            </p>
            <div className="panel-stats">
              <div>
                <div className="pstat-num">240+</div>
                <div className="pstat-label">Fiches techniques</div>
              </div>
              <div>
                <div className="pstat-num">18</div>
                <div className="pstat-label">Roadmaps</div>
              </div>
              <div>
                <div className="pstat-num">12</div>
                <div className="pstat-label">Disciplines</div>
              </div>
            </div>
          </div>
        </section>

        <section className="auth-panel-right">
          <div className="auth-box">
            <div className="auth-tabs">
              <button type="button" className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>
                Connexion
              </button>
              <button type="button" className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>
                Inscription
              </button>
            </div>

            <div className="access-banner">
              <strong>Accès réservé</strong> aux peintres.
            </div>

            <div className={`form-pane ${activeTab === 'login' ? 'active' : ''}`}>
              <div className="form-header">
                <div className="form-eyebrow">Bon retour</div>
                <h1 className="form-title">
                  Connexion à<br /><em>votre compte</em>
                </h1>
                <p className="form-subtitle">Utilisez vos identifiants pour accéder à votre espace peintre.</p>
              </div>

              <div className="social-buttons">
                <button type="button" className="btn-social">
                  Google
                </button>
                <button type="button" className="btn-social">
                  Apple
                </button>
              </div>

              <div className="divider">
                <span className="divider-text">ou avec email</span>
              </div>

              <div id="login-message" className="form-message" />

              <div className="form-group">
                <label htmlFor="login-email">Adresse email</label>
                <input type="email" id="login-email" placeholder="vous@exemple.com" autoComplete="email" />
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Mot de passe</label>
                <div className="input-wrap">
                  <input type="password" id="login-password" placeholder="••••••••" autoComplete="current-password" />
                  <span className="pwd-toggle" title="Afficher le mot de passe">👁</span>
                </div>
              </div>

              <a href="#" className="forgot-link">
                Mot de passe oublié ?
              </a>

              <div className="form-check">
                <input type="checkbox" id="remember" defaultChecked />
                <label className="check-label" htmlFor="remember">Rester connecté(e) sur cet appareil</label>
              </div>

              <button type="button" className="btn-submit">
                Se connecter
                <span className="arrow-icon" />
              </button>

              <div className="auth-switch">
                Pas encore de compte ?{' '}
                <button type="button" onClick={() => setActiveTab('signup')}>
                  S'inscrire gratuitement
                </button>
              </div>
            </div>

            <div className={`form-pane ${activeTab === 'signup' ? 'active' : ''}`}>
              <div className="form-header">
                <div className="form-eyebrow">Créer un compte peintre</div>
                <h1 className="form-title">
                  Rejoindre<br /><em>ArtPlastique</em>
                </h1>
                <p className="form-subtitle">L'inscription reste réservée aux peintres.</p>
              </div>

              <div className="role-lock">
                <strong>Compte peintre uniquement</strong> : l'inscription publique n'est pas ouverte aux visiteurs non professionnels.
              </div>

              <div className="social-buttons">
                <button type="button" className="btn-social">
                  Google
                </button>
                <button type="button" className="btn-social">
                  Apple
                </button>
              </div>

              <div className="divider">
                <span className="divider-text">ou avec email</span>
              </div>

              <div id="signup-message" className="form-message" />

              <div className="form-row form-row-auth">
                <div className="form-group">
                  <label htmlFor="signup-firstname">Prénom</label>
                  <input type="text" id="signup-firstname" placeholder="Marie" autoComplete="given-name" />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-lastname">Nom</label>
                  <input type="text" id="signup-lastname" placeholder="Dupont" autoComplete="family-name" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="signup-email">Adresse email</label>
                <input type="email" id="signup-email" placeholder="vous@exemple.com" autoComplete="email" />
              </div>

              <div className="form-group">
                <label htmlFor="signup-password">Mot de passe</label>
                <div className="input-wrap">
                  <input type="password" id="signup-password" placeholder="8 caractères minimum" autoComplete="new-password" />
                  <span className="pwd-toggle" title="Afficher le mot de passe">👁</span>
                </div>
                <div className="pwd-strength">
                  <div className="strength-bar">
                    <div className="strength-seg" />
                    <div className="strength-seg" />
                    <div className="strength-seg" />
                    <div className="strength-seg" />
                  </div>
                  <span className="strength-label">Trop court</span>
                </div>
              </div>

              <div className="form-group">
                <label>Vos disciplines <span className="label-note">(optionnel)</span></label>
                <div className="discipline-grid">
                  <button type="button" className="discipline-btn">🎨 Peinture</button>
                  <button type="button" className="discipline-btn">✏️ Dessin</button>
                  <button type="button" className="discipline-btn">🗿 Sculpture</button>
                  <button type="button" className="discipline-btn">🖨️ Gravure</button>
                  <button type="button" className="discipline-btn">🖌️ Mixed</button>
                  <button type="button" className="discipline-btn">📷 Photo</button>
                </div>
              </div>

              <div className="form-check">
                <input type="checkbox" id="terms" />
                <label className="check-label" htmlFor="terms">
                  J'accepte les <a href="#">conditions d'utilisation</a> et la <a href="#">politique de confidentialité</a> d'ArtPlastique.
                </label>
              </div>

              <button type="button" className="btn-submit">
                Créer mon compte
                <span className="arrow-icon" />
              </button>

              <div className="auth-switch">
                Déjà un compte ?{' '}
                <button type="button" onClick={() => setActiveTab('login')}>
                  Se connecter
                </button>
              </div>
            </div>

            <div className="auth-footer">
              <div className="auth-footer-note">© 2025 ArtPlastique — Sécurisé & gratuit</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
