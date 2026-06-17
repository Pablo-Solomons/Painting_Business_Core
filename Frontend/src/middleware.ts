// STUB BCaaS — Interception des requêtes Next.js
// Ce fichier est un stub non fonctionnel décrit dans le rapport.
// Il devait gérer le routage linguistique (locale: fr-CM), la vérification JWT,
// et l'injection de l'en-tête X-Tenant-Id.
// Non implémenté dans la version démo.

import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // NOTE: Stub — code non exécuté dans la version démo
  // Ce middleware est destiné à la phase 2 avec backend
  return
}

export const config = {
  matcher: [], // Aucune route activée — stub uniquement
}