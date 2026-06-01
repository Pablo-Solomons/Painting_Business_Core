import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { appLogoUrl } from '../data/assets'

type PainterShellProps = {
  children: ReactNode
  activePanel?: string
  onNavigate?: (panel: string) => void
}

const navItems = [
  { label: "Vue d'ensemble", panel: 'overview', icon: '⬡' },
  { label: 'Notifications', panel: 'notifs', icon: '🔔', badge: '3' },
  { label: 'Mes fiches', panel: 'fiches', icon: '📄' },
  { label: 'Nouvelle fiche', panel: 'editeur', icon: '✏️' },
  { label: 'Roadmaps', panel: 'roadmaps', icon: '🗺' },
  { label: 'Analytiques', panel: 'analytics', icon: '📊' },
  { label: 'Mon profil', panel: 'profil', icon: '👤' },
]

export function PainterShell({ children, activePanel = 'overview', onNavigate }: PainterShellProps) {
  return (
    <div className="painter-shell">
      <aside className="sidebar painter-sidebar">
        <NavLink to="/dashboard/peintre" className="sidebar-logo">
          <img src={appLogoUrl} alt="ArtPlastique logo" className="sidebar-logo-img" />
          <span className="sidebar-role-badge">Peintre</span>
        </NavLink>

        <div className="sidebar-user">
          <div className="user-avatar">M</div>
          <div className="user-info">
            <div className="user-name">Marie Durand</div>
            <div className="user-handle">@marie.durand</div>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Navigation peintre">
          <div className="nav-group-label">Tableau de bord</div>
          {navItems.slice(0, 2).map((item) => (
            <button
              key={item.panel}
              type="button"
              className={`nav-item${activePanel === item.panel ? ' active' : ''}`}
              onClick={() => onNavigate?.(item.panel)}
            >
              <span className="nav-icon">{item.icon}</span> {item.label}
              {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
            </button>
          ))}

          <div className="nav-group-label">Contenu</div>
          {navItems.slice(2, 5).map((item) => (
            <button
              key={item.panel}
              type="button"
              className={`nav-item${activePanel === item.panel ? ' active' : ''}`}
              onClick={() => onNavigate?.(item.panel)}
            >
              <span className="nav-icon">{item.icon}</span> {item.label}
            </button>
          ))}

          <div className="nav-group-label">Performance</div>
          <button type="button" className={`nav-item${activePanel === 'analytics' ? ' active' : ''}`} onClick={() => onNavigate?.('analytics')}>
            <span className="nav-icon">📊</span> Analytiques
          </button>

          <div className="nav-group-label">Profil</div>
          <button type="button" className={`nav-item${activePanel === 'profil' ? ' active' : ''}`} onClick={() => onNavigate?.('profil')}>
            <span className="nav-icon">👤</span> Mon profil
          </button>
        </nav>

        <div className="sidebar-footer">
          <a href="/dashboard/peintre" className="sidebar-footer-item">
            ⚙ Paramètres
          </a>
          <a href="/" className="sidebar-footer-item">
            ← Quitter l'espace
          </a>
        </div>
      </aside>

      <main className="main painter-main">
        <div className="topbar" id="topbar">
          <div className="topbar-breadcrumb">
            <img src={appLogoUrl} alt="ArtPlastique logo" className="topbar-logo-img" />
            · <span id="topbar-label">{activePanel === 'overview' ? "Vue d'ensemble" : activePanel === 'fiches' ? 'Mes fiches' : activePanel === 'editeur' ? 'Éditeur de fiche' : activePanel === 'roadmaps' ? 'Roadmaps' : activePanel === 'analytics' ? 'Analytiques' : activePanel === 'notifs' ? 'Notifications' : 'Mon profil'}</span>
          </div>
          <div className="topbar-actions">
            <button type="button" className="topbar-btn topbar-btn-ghost" onClick={() => onNavigate?.('editeur')}>
              + Nouvelle fiche
            </button>
            <button type="button" className="topbar-btn" onClick={() => onNavigate?.('roadmaps')}>
              + Roadmap
            </button>
            <button type="button" className="topbar-icon-btn" onClick={() => onNavigate?.('notifs')} aria-label="Notifications">
              <span className="notif-dot" />
            </button>
          </div>
        </div>

        {children}
      </main>
    </div>
  )
}