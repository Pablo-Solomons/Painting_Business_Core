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

        <Link href="/connexion" className="cta-link">
          Commencer
        </Link>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div>
          <div className="footer-brand"><img src={appLogoUrl} alt="ArtPlastique logo" style={{ maxWidth: 140 }} /></div>
          <p>Référence pour les fiches techniques, les roadmaps et les espaces peintres.</p>
        </div>
        <div className="footer-links">
          <Link href="/fiches">Fiches</Link>
          <Link href="/roadmaps">Roadmaps</Link>
          <Link href="/themes">Themes</Link>
        </div>
      </footer>
    </div>
  )
}
