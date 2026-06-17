'use client'

// STUB BCaaS — Barre de navigation principale
// Ce composant est un stub non fonctionnel décrit dans le rapport.
// Il devait afficher des liens contextuels selon le rôle (visiteur/peintre/admin).
// Non utilisé — remplacé par les composants PublicShell, PainterShell, ControlShell.

import { type ReactElement } from 'react'

export default function Navbar(): ReactElement {
  // NOTE: Stub — barre de navigation fixe et vide
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      borderBottom: '1px solid rgba(42,32,25,0.11)',
      background: 'rgba(248,241,231,0.94)',
      backdropFilter: 'blur(12px)',
    }}>
      <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
        Painting Business Core
      </span>
      <span style={{ color: '#7b6b5d', fontSize: '0.75rem' }}>
        Navbar — Stub non fonctionnel
      </span>
    </nav>
  )
}