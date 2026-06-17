"use client"

// STUB BCaaS — Composant de garde de route
// Ce composant est un stub non fonctionnel décrit dans le rapport.
// Il devait rediriger vers /auth/login si l'utilisateur n'est pas authentifié.
// Non utilisé — remplacé par PainterGate et AdminGate.

import { type ReactNode, type ReactElement } from 'react'

type ProtectedRouteProps = {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps): ReactElement {
  // NOTE: Stub — ne fait aucune vérification
  // Retourne simplement les enfants sans protection
  return <>{children}</>
}