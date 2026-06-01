import { NavLink, useLocation } from 'react-router-dom'
import { appLogoUrl } from '../data/assets'
import { publicNav } from '../data/siteContent'

type PublicShellProps = {
  children: React.ReactNode
}

export function PublicShell({ children }: PublicShellProps) {
  const location = useLocation()

  if (location.pathname === '/') {
    return <>{children}</>
  }

  return (
    <div className="app-shell public-shell">
      <header className="topbar">
        <NavLink to="/" className="brand">
          <img src={appLogoUrl} alt="ArtPlastique logo" className="brand-img" />
        </NavLink>

        <nav className="topnav" aria-label="Navigation principale">
          {publicNav.map((item) => (
            <NavLink key={item.to} to={item.to} className="topnav-link">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/connexion" className="cta-link">
          Commencer
        </NavLink>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div>
          <div className="footer-brand"><img src={appLogoUrl} alt="ArtPlastique logo" style={{ maxWidth: 140 }} /></div>
          <p>Référence pour les fiches techniques, les roadmaps et les espaces peintres.</p>
        </div>
        <div className="footer-links">
          <NavLink to="/fiches">Fiches</NavLink>
          <NavLink to="/roadmaps">Roadmaps</NavLink>
          <NavLink to="/themes">Themes</NavLink>
        </div>
      </footer>
    </div>
  )
}
