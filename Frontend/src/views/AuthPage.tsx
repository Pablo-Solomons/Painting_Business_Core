'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { appLogoUrl } from '../data/assets'
import { DEMO_PASSWORD, demoUsers, homePathForRole } from '@/data/mockUsers'
import { useDemoStore } from '@/context/DemoStoreContext'

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
  const router = useRouter()
  const { session, isHydrated, login } = useDemoStore()
  const [activeTab, setActiveTab] = useState<AuthTab>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isHydrated || !session) return
    router.replace(homePathForRole(session.role))
  }, [isHydrated, session, router])

  function fillDemoAccount(accountEmail: string) {
    setEmail(accountEmail)
    setPassword(DEMO_PASSWORD)
    setMessage(null)
  }

  function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const result = login(email, password)
    setIsSubmitting(false)

    if (!result.ok) {
      setMessage({ type: 'error', text: result.error })
      return
    }

    setMessage({ type: 'success', text: 'Connexion réussie — redirection…' })
    router.push(result.redirectTo)
  }

  if (!isHydrated) {
    return (
      <div className="auth-guard-loading auth-guard-loading--page">
        <div className="auth-guard-spinner" aria-hidden />
        <p>Chargement…</p>
      </div>
    )
  }

  if (session) {
    return null
  }

  return (
    <div className="auth-page">
      <nav className="auth-nav">
        <Link href="/" className="nav-logo" aria-label="ArtPlastique">
          <img src={appLogoUrl} alt="ArtPlastique logo" />
        </Link>
        <Link href="/" className="nav-back">
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
            <div className="panel-label">Mode démonstration</div>
            <h2 className="panel-title">
              Simulez les<br />
              <em>accès par rôle.</em>
            </h2>
            <p className="panel-desc">
              Connectez-vous avec un compte peintre ou administrateur. Mot de passe pour tous : <strong>{DEMO_PASSWORD}</strong>
            </p>
            <div className="demo-accounts-panel">
              {demoUsers.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  className="demo-account-chip"
                  onClick={() => fillDemoAccount(user.email)}
                >
                  <span className="demo-account-role">{user.role === 'admin' ? 'Admin' : 'Peintre'}</span>
                  <span className="demo-account-email">{user.email}</span>
                </button>
              ))}
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
              <strong>Simulation locale</strong> — données stockées dans votre navigateur.
            </div>

            <div className={`form-pane ${activeTab === 'login' ? 'active' : ''}`}>
              <form onSubmit={handleLogin}>
                <div className="form-header">
                  <div className="form-eyebrow">Bon retour</div>
                  <h1 className="form-title">
                    Connexion à<br /><em>votre compte</em>
                  </h1>
                  <p className="form-subtitle">Utilisez un compte de démonstration ci-contre.</p>
                </div>

                {message ? (
                  <div className={`form-message form-message--${message.type}`} role="alert">
                    {message.text}
                  </div>
                ) : null}

                <div className="form-group">
                  <label htmlFor="login-email">Adresse email</label>
                  <input
                    type="email"
                    id="login-email"
                    placeholder="marie@artplastique.demo"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="login-password">Mot de passe</label>
                  <div className="input-wrap">
                    <input
                      type="password"
                      id="login-password"
                      placeholder={DEMO_PASSWORD}
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                    <span className="pwd-toggle" title="Afficher le mot de passe">👁</span>
                  </div>
                </div>

                <div className="form-check">
                  <input type="checkbox" id="remember" defaultChecked />
                  <label className="check-label" htmlFor="remember">Rester connecté(e) sur cet appareil</label>
                </div>

                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Connexion…' : 'Se connecter'}
                  <span className="arrow-icon" />
                </button>
              </form>

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
                <p className="form-subtitle">Non disponible en mode démo — utilisez la connexion.</p>
              </div>

              <div className="role-lock">
                <strong>Inscription désactivée</strong> pour cette simulation. Les comptes peintre et admin sont préconfigurés à gauche.
              </div>

              <div className="auth-switch">
                Déjà un compte ?{' '}
                <button type="button" onClick={() => setActiveTab('login')}>
                  Se connecter
                </button>
              </div>
            </div>

            <div className="auth-footer">
              <div className="auth-footer-note">© 2025 ArtPlastique — Simulation sans backend</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
