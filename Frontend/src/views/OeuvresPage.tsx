'use client'

import Link from 'next/link'

const oeuvres = [
  { id: 1, title: 'Composition en bleu', artist: 'Marie Durand', technique: 'Huile sur toile', year: '2024', img: '/assets/img/AdobeStock_343421667.jpeg' },
  { id: 2, title: 'Paysage automnal', artist: 'Marc Renaud', technique: 'Aquarelle', year: '2023', img: '/assets/img/AdobeStock_374970185.jpeg' },
  { id: 3, title: 'Abstraction minérale', artist: 'Sophie Dumas', technique: 'Acrylique', year: '2025', img: '/assets/img/joseph-morris-Tac8FvqAnEw-unsplash.jpg' },
  { id: 4, title: 'Nature morte aux pigments', artist: 'Pierre Lavigne', technique: 'Huile sur panneau', year: '2024', img: '/assets/img/mick-haupt-8tN0Uq0GjCs-unsplash.jpg' },
  { id: 5, title: 'Fresque urbaine', artist: 'Jean-Marc Olivier', technique: 'Fresque', year: '2023', img: '/assets/img/steptodown.com255980.jpg' },
  { id: 6, title: 'Étude botanique', artist: 'Marie-Hélène Vu', technique: 'Aquarelle', year: '2025', img: '/assets/img/steptodown.com559072.jpg' },
  { id: 7, title: 'Portrait en glacis', artist: 'Nathalie Perrin', technique: 'Huile', year: '2024', img: '/assets/img/steptodown.com917188.jpg' },
  { id: 8, title: 'Gravure atmosphérique', artist: 'Thomas Collet', technique: 'Linogravure', year: '2025', img: '/assets/img/steptodown.com999905.jpg' },
  { id: 9, title: 'Pastel provençal', artist: 'Élise Pontier', technique: 'Pastel sec', year: '2023', img: '/assets/img/378583.png' },
]

export function OeuvresPage() {
  return (
    <div className="oeuvres-page">
      <div className="page-header">
        <div className="page-eyebrow">Galerie</div>
        <h1 className="page-title">Exposition <em>d'œuvres</em></h1>
        <p className="page-subtitle">Découvrez les créations des peintres de la communauté — une vitrine de l'excellence artisanale.</p>
      </div>

      <div className="oeuvres-grid">
        {oeuvres.map((oeuvre) => (
          <article key={oeuvre.id} className="oeuvre-card">
            <div className="oeuvre-card-img" style={{ backgroundImage: `url(${oeuvre.img})` }}>
              <div className="oeuvre-card-overlay">
                <span className="oeuvre-card-view">Voir l'œuvre</span>
              </div>
            </div>
            <div className="oeuvre-card-body">
              <div className="oeuvre-card-title">{oeuvre.title}</div>
              <div className="oeuvre-card-artist">{oeuvre.artist}</div>
              <div className="oeuvre-card-meta">{oeuvre.technique} · {oeuvre.year}</div>
            </div>
          </article>
        ))}
      </div>

      <div className="oeuvres-footer-note">
        <p>Ces œuvres sont présentées à titre d'exposition virtuelle. Pour contribuer, <Link href="/connexion">connectez-vous</Link> en tant que peintre.</p>
      </div>
    </div>
  )
}