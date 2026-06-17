'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { appLogoUrl } from '@/data/assets'
import { publicNav } from '@/data/siteContent'

type PublicShellProps = {
  children: React.ReactNode
}

export function PublicShell({ children }: PublicShellProps) {
  const pathname = usePathname()

  if (pathname === '/') {
    return <>{children}</>
  }

  return (
    <div className="app-shell public-shell">
      <header className="topbar">
        <Link href="/" className="brand">
          <img src={appLogoUrl} alt="ArtPlastique logo" className="brand-img" />
        </Link>

        <nav className="topnav" aria-label="Navigation principale">
          {publicNav.map((item) => (
            <Link key={item.to} href={item.to} className="topnav-link">
              {item.label}
            </Link>
          ))}
        </nav>

      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div>
          <div className="footer-brand"><img src={appLogoUrl} alt="ArtPlastique logo" style={{ maxWidth: 140 }} /></div>
          <p>Référence pour les fiches de connaissance, les roadmaps et les espaces peintres.</p>
        </div>
        <div>
          <div className="footer-col-title">Apprendre</div>
          <div className="footer-links">
            <Link href="/roadmaps">Roadmaps</Link>
            <Link href="/fiches">Fiches</Link>
            <Link href="/categories">Catégories</Link>
            <Link href="/techniques">Techniques</Link>
          </div>
        </div>
        <div>
          <div className="footer-col-title">Explorer</div>
          <div className="footer-links">
            <Link href="/oeuvres">Œuvres</Link>
            <Link href="/categories">Disciplines</Link>
            <Link href="/connexion">Contribuer</Link>
          </div>
        </div>
        <div>
          <div className="footer-col-title">Plateforme</div>
          <div className="footer-links">
            <Link href="/connexion">Nous contacter</Link>
            <Link href="/">À propos</Link>
            <Link href="/">Mentions légales</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
