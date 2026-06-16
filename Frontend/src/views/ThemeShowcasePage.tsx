import Link from 'next/link'
import type { ThemeVariant } from '../data/siteContent'

type ThemeShowcasePageProps = {
  themeVariants: ThemeVariant[]
}

export function ThemeShowcasePage({ themeVariants }: ThemeShowcasePageProps) {
  return (
    <section className="theme-page">
      <div className="section-head">
        <div>
          <p className="eyebrow">Thèmes</p>
          <h1>Variantes visuelles de la homepage</h1>
        </div>
        <Link href="/" className="section-link">
          Retour à l’accueil
        </Link>
      </div>

      <div className="theme-grid">
        {themeVariants.map((theme) => (
          <article key={theme.slug} className="theme-card">
            <div className="theme-preview" style={{ background: theme.background }}>
              <span style={{ color: theme.accent }}>ArtPlastique</span>
            </div>
            <h2>{theme.name}</h2>
            <p>{theme.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
