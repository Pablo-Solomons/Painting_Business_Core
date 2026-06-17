'use client'

// STUB BCaaS — Carte interactive Leaflet.js
// Ce composant est un stub non fonctionnel décrit dans le rapport.
// Il devait afficher une carte Leaflet.js avec géolocalisation des peintres.
// Non utilisé dans la version démo — Leaflet.js non installé.

import { type ReactNode } from 'react'

export default function MapView(): ReactNode {
  // NOTE: Stub — retourne un placeholder
  // L'import dynamique dynamic(() => import('./MapView'), { ssr: false })
  // serait nécessaire pour éviter les erreurs SSR avec Leaflet.
  return (
    <div style={{
      width: '100%',
      height: 300,
      background: '#f0e8dc',
      border: '1px dashed #9d6a3b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#7b6b5d',
      fontFamily: 'DM Mono, monospace',
      fontSize: '0.75rem',
    }}>
      🗺 Carte Leaflet.js — Stub non fonctionnel
    </div>
  )
}