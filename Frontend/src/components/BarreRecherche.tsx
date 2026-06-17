'use client'

// STUB BCaaS — Barre de recherche avec debounce
// Ce composant est un stub non fonctionnel décrit dans le rapport.
// Il devait implémenter un debounce de 400ms pour la recherche full-text.
// Non utilisé — la recherche est intégrée dans les pages directement.

import { type ReactElement } from 'react'

export default function BarreRecherche(): ReactElement {
  // NOTE: Stub — retourne une barre de recherche statique
  return (
    <div style={{
      display: 'flex',
      gap: '0.6rem',
      border: '1px solid rgba(42,32,25,0.11)',
      padding: '0 0.9rem',
      height: '2.4rem',
      maxWidth: 360,
      alignItems: 'center',
      background: '#fffdfa',
    }}>
      <span style={{ color: '#7b6b5d', fontSize: '0.9rem' }}>⌕</span>
      <input
        type="text"
        placeholder="Rechercher… (stub)"
        style={{ border: 'none', background: 'transparent', flex: 1, outline: 'none' }}
        readOnly
      />
    </div>
  )
}