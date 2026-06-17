// STUB BCaaS — Couche d'abstraction API
// Ce fichier est un stub non fonctionnel décrit dans le rapport.
// Il devait exposer getFiches(), getFicheById(), creerFiche(), rechercher(),
// getRoadmaps(), getRoadmapById(), login(), register(), getActeurs(), validerCompte().
// Non utilisé dans la version démo — remplacé par DemoStoreContext.

export type ApiResponse<T> = {
  status: number
  data?: T
  error?: string
  trace_id?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getBCaaSHeaders(_authenticated = false): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'X-Tenant-Id': 'painting',
    'X-Locale': 'fr-CM',
    'X-Trace-Id': '00000000-0000-0000-0000-000000000000',
  }
}

export async function getFiches(_page = 0, _categorieId?: number): Promise<ApiResponse<unknown[]>> {
  return { status: 501, error: 'Stub — non implémenté' }
}

export async function getFicheById(_id: string): Promise<ApiResponse<unknown>> {
  return { status: 501, error: 'Stub — non implémenté' }
}

export async function creerFiche(_payload: unknown): Promise<ApiResponse<unknown>> {
  return { status: 501, error: 'Stub — non implémenté' }
}

export async function modifierFiche(_id: string, _payload: unknown): Promise<ApiResponse<unknown>> {
  return { status: 501, error: 'Stub — non implémenté' }
}

export async function rechercher(_query: string): Promise<ApiResponse<unknown[]>> {
  return { status: 501, error: 'Stub — non implémenté' }
}

export async function getRoadmaps(): Promise<ApiResponse<unknown[]>> {
  return { status: 501, error: 'Stub — non implémenté' }
}

export async function getRoadmapById(_id: string): Promise<ApiResponse<unknown>> {
  return { status: 501, error: 'Stub — non implémenté' }
}

export async function login(_email: string, _password: string): Promise<ApiResponse<{ token: string }>> {
  return { status: 501, error: 'Stub — non implémenté' }
}

export async function register(_name: string, _email: string, _password: string): Promise<ApiResponse<unknown>> {
  return { status: 501, error: 'Stub — non implémenté' }
}

export async function getActeurs(): Promise<ApiResponse<unknown[]>> {
  return { status: 501, error: 'Stub — non implémenté' }
}

export async function validerCompte(_actorId: string): Promise<ApiResponse<unknown>> {
  return { status: 501, error: 'Stub — non implémenté' }
}