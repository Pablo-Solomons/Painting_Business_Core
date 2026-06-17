'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { appLogoUrl } from '@/data/assets'
import { useDemoStore } from '@/context/DemoStoreContext'

type ControlShellProps = {
  children: ReactNode
}

const navGroups = [
  {
    label: 'Général',
    items: [
      { label: "Vue d'ensemble", to: '/admin', icon: '◈' },
      { label: 'Peintres', to: '/admin/peintres', icon: '👤', badge: '7' },
    ],
  },
  {
    label: 'Contenu',
    items: [
      { label: 'Fiches techniques', to: '/admin/fiches', icon: '◧', badge: '3', tone: 'warn' },
      { label: 'Roadmaps', to: '/admin/roadmaps', icon: '⬡' },
      { label: 'Catégories', to: '/admin/categories', icon: '◑' },
    ],
  },
  {
    label: 'Modération',
    items: [
      { label: 'Alertes', to: '/admin?panel=alertes', icon: '⚑', badge: '2' },
      { label: 'Messages', to: '/admin?panel=messages', icon: '✉' },
    ],
  },
  {
    label: 'Paramètres',
    items: [
      { label: 'Configuration', to: '/admin?panel=config', icon: '⚙' },
      { label: 'Mon profil', to: '/admin?panel=profil', icon: '👤' },
    ],
  },
]

export function ControlShell({ children }: ControlShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { session, logout } = useDemoStore()
  const isPeintres = pathname === '/admin/peintres'
  const topbarLabel = isPeintres ? 'Validation des peintres' : "Vue d'ensemble"
  const breadcrumb = isPeintres ? 'Peintres' : 'Dashboard'
  const initial = session?.name.charAt(0).toUpperCase() ?? 'A'

  function handleLogout() {
    logout()
    router.push('/connexion')
  }

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <Link href="/admin" className="sidebar-logo">
          <img src={appLogoUrl} alt="ArtPlastique logo" className="sidebar-logo-img" />
          <div className="sidebar-admin-badge">Admin</div>
        </Link>

        <div className="sidebar-user">
          <div className="user-avatar">{initial}</div>
          <div>
            <div className="user-name">{session?.name ?? 'Administrateur'}</div>
            <div className="user-role">{session?.email ?? 'admin@artplastique.demo'}</div>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Navigation de contrôle">
          {navGroups.map((group) => (
            <div key={group.label}>
              <div className="nav-section-label">{group.label}</div>
              {group.items.map((item) => {
                const isActive = item.to !== '#' && pathname === item.to
                const className = ['nav-item', isActive ? 'active' : ''].filter(Boolean).join(' ')
                return item.to === '#' ? (
                  <a key={item.label} className={className} href="#">
                    <span className="nav-icon">{item.icon}</span>
                    {item.label}
                    {'badge' in item && item.badge ? (
                      <span className={`nav-badge${'tone' in item && item.tone === 'warn' ? ' warn' : ''}`}>{item.badge}</span>
                    ) : null}
                  </a>
                ) : (
                  <Link key={item.label} href={item.to} className={className}>
                    <span className="nav-icon">{item.icon}</span>
                    {item.label}
                    {'badge' in item && item.badge ? (
                      <span className={`nav-badge${'tone' in item && item.tone === 'warn' ? ' warn' : ''}`}>{item.badge}</span>
                    ) : null}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link className="sidebar-footer-item" href="/">
            ← Retour au site public
          </Link>
          <button type="button" className="sidebar-footer-item sidebar-footer-btn" onClick={handleLogout}>
            ⎋ Déconnexion
          </button>
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
