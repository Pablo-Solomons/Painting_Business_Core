import type { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { appLogoUrl } from '../data/assets'

type ControlShellProps = {
  children: ReactNode
}

const navGroups = [
  {
    label: 'Général',
    items: [
      { label: "Vue d'ensemble", to: '/admin', icon: '◈' },
      { label: 'Peintres', to: '/admin/peintres', icon: '👤', badge: '7' },
      { label: 'Fiches techniques', to: '/fiches', icon: '◧', badge: '3', tone: 'warn' },
      { label: 'Roadmaps', to: '/roadmaps', icon: '⬡' },
    ],
  },
  {
    label: 'Modération',
    items: [
      { label: 'Alertes', to: '/admin', icon: '⚑', badge: '2' },
      { label: 'Messages', to: '/admin', icon: '✉' },
    ],
  },
  {
    label: 'Paramètres',
    items: [
      { label: 'Configuration', to: '/admin', icon: '⚙' },
      { label: 'Catégories', to: '/themes', icon: '◑' },
    ],
  },
]

export function ControlShell({ children }: ControlShellProps) {
  const location = useLocation()
  const isPeintres = location.pathname === '/admin/peintres'
  const topbarLabel = isPeintres ? 'Validation des peintres' : "Vue d'ensemble"
  const breadcrumb = isPeintres ? 'Peintres' : 'Dashboard'

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <NavLink to="/admin" className="sidebar-logo">
          <img src={appLogoUrl} alt="ArtPlastique logo" className="sidebar-logo-img" />
          <div className="sidebar-admin-badge">Admin</div>
        </NavLink>

        <div className="sidebar-user">
          <div className="user-avatar">A</div>
          <div>
            <div className="user-name">Administrateur</div>
            <div className="user-role">admin@artplastique.fr</div>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Navigation de contrôle">
          {navGroups.map((group) => (
            <div key={group.label}>
              <div className="nav-section-label">{group.label}</div>
              {group.items.map((item) => {
                const isActive = item.to !== '#' && location.pathname === item.to
                const className = ['nav-item', isActive ? 'active' : ''].filter(Boolean).join(' ')
                return item.to === '#' ? (
                  <a key={item.label} className={className} href="#">
                    <span className="nav-icon">{item.icon}</span>
                    {item.label}
                    {'badge' in item && item.badge ? (
                      <span className={`nav-badge${item.tone === 'warn' ? ' warn' : ''}`}>{item.badge}</span>
                    ) : null}
                  </a>
                ) : (
                  <NavLink key={item.label} to={item.to} className={className} end={item.to === '/admin'}>
                    <span className="nav-icon">{item.icon}</span>
                    {item.label}
                    {'badge' in item && item.badge ? (
                      <span className={`nav-badge${item.tone === 'warn' ? ' warn' : ''}`}>{item.badge}</span>
                    ) : null}
                  </NavLink>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <a className="sidebar-footer-item" href="/">
            ← Retour au site public
          </a>
          <a className="sidebar-footer-item" href="/connexion">
            ⎋ Déconnexion
          </a>
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <span className="topbar-title">{topbarLabel}</span>
          <span className="topbar-sep">·</span>
          <span className="topbar-breadcrumb">
            Admin <span className="accent">›</span> <span>{breadcrumb}</span>
          </span>
          <div className="topbar-actions">
            <button type="button" className="topbar-icon-btn">
              📊
            </button>
            <button type="button" className="topbar-icon-btn">
              🔔
              <span className="notif-dot" />
            </button>
            <button type="button" className="topbar-icon-btn">
              ⚙
            </button>
          </div>
        </div>

        {children}
      </main>
    </div>
  )
}
