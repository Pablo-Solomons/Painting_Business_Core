'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { createInitialDemoData, mergeStoredDemoData } from '@/data/demoSeed'
import {
  DEMO_PASSWORD,
  findDemoUser,
  homePathForRole,
  toSession,
  type DemoSession,
  type UserRole,
} from '@/data/mockUsers'
import { uniqueSlug } from '@/lib/slugify'
import {
  clearDemoData,
  loadDemoData,
  loadSession,
  saveDemoData,
  saveSession,
  clearSession,
} from '@/lib/demoStorage'
import {
  buildRoadmapSteps,
  buildSections,
  parseTags,
  type ContentStatus,
  type DemoData,
  type DemoFiche,
  type DemoRoadmap,
  type FicheFormInput,
  type RoadmapFormInput,
  type SaveContentResult,
} from '@/types/content'

type LoginResult = { ok: true; redirectTo: string } | { ok: false; error: string }

type DemoStoreContextValue = {
  session: DemoSession | null
  isHydrated: boolean
  fiches: DemoFiche[]
  roadmaps: DemoRoadmap[]
  publishedFiches: DemoFiche[]
  publishedRoadmaps: DemoRoadmap[]
  login: (email: string, password: string) => LoginResult
  logout: () => void
  resetDemoData: () => void
  getFicheBySlug: (slug: string) => DemoFiche | undefined
  getRoadmapBySlug: (slug: string) => DemoRoadmap | undefined
  getMyFiches: (userId: string) => DemoFiche[]
  getMyRoadmaps: (userId: string) => DemoRoadmap[]
  getModerationQueue: () => DemoFiche[]
  getRoadmapModerationQueue: () => DemoRoadmap[]
  saveFicheDraft: (input: FicheFormInput, existingSlug?: string) => SaveContentResult
  submitFicheForReview: (input: FicheFormInput, existingSlug?: string) => SaveContentResult
  approveFiche: (slug: string) => SaveContentResult
  rejectFiche: (slug: string) => SaveContentResult
  saveRoadmapDraft: (input: RoadmapFormInput, existingSlug?: string) => SaveContentResult
  submitRoadmapForReview: (input: RoadmapFormInput, existingSlug?: string) => SaveContentResult
  approveRoadmap: (slug: string) => SaveContentResult
  rejectRoadmap: (slug: string) => SaveContentResult
}

const DemoStoreContext = createContext<DemoStoreContextValue | null>(null)

function buildDemoFiche(
  input: FicheFormInput,
  authorId: string,
  status: ContentStatus,
  existing?: DemoFiche,
  slug?: string,
): DemoFiche {
  const timestamp = new Date().toISOString()

  return {
    slug: slug ?? existing?.slug ?? '',
    title: input.title.trim(),
    question: input.question.trim(),
    category: input.category,
    tool: input.tool.trim(),
    level: input.level,
    duration: input.duration.trim() || '10 min',
    summary: input.summary.trim(),
    tags: parseTags(input.tags),
    sections: buildSections(input),
    authorId,
    status,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    pigmentCode: existing?.pigmentCode,
    swatch: existing?.swatch,
  }
}

function buildDemoRoadmap(
  input: RoadmapFormInput,
  authorId: string,
  status: ContentStatus,
  existing?: DemoRoadmap,
  slug?: string,
): DemoRoadmap {
  const timestamp = new Date().toISOString()

  return {
    slug: slug ?? existing?.slug ?? '',
    title: input.title.trim(),
    audience: input.audience.trim(),
    duration: input.duration.trim() || '4 semaines',
    level: input.level.trim(),
    summary: input.summary.trim(),
    steps: buildRoadmapSteps(input.steps),
    authorId,
    status,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
  }
}

export function DemoStoreProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<DemoSession | null>(null)
  const [data, setData] = useState<DemoData>(createInitialDemoData())
  const [isHydrated, setIsHydrated] = useState(false)

  const persistData = useCallback((next: DemoData) => {
    setData(next)
    saveDemoData(next)
  }, [])

  useEffect(() => {
    setSession(loadSession())
    setData(mergeStoredDemoData(loadDemoData()))
    setIsHydrated(true)
  }, [])

  const upsertFiche = useCallback(
    (input: FicheFormInput, status: ContentStatus, existingSlug?: string): SaveContentResult => {
      if (!session) {
        return { ok: false, error: 'Vous devez être connecté pour enregistrer une fiche.' }
      }

      if (!input.title.trim() || !input.question.trim()) {
        return { ok: false, error: 'Le titre et la question sont obligatoires.' }
      }

      const existing = existingSlug ? data.fiches.find((f) => f.slug === existingSlug) : undefined

      if (existing && existing.authorId !== session.userId) {
        return { ok: false, error: 'Vous ne pouvez modifier que vos propres fiches.' }
      }

      const slug = existing?.slug ?? uniqueSlug(input.title, data.fiches.map((f) => f.slug))
      const nextFiche = buildDemoFiche(input, session.userId, status, existing, slug)

      const fiches = existing
        ? data.fiches.map((f) => (f.slug === existing.slug ? nextFiche : f))
        : [...data.fiches, nextFiche]

      persistData({ ...data, fiches })
      return { ok: true, slug, status }
    },
    [data, persistData, session],
  )

  const upsertRoadmap = useCallback(
    (input: RoadmapFormInput, status: ContentStatus, existingSlug?: string): SaveContentResult => {
      if (!session) {
        return { ok: false, error: 'Vous devez être connecté pour enregistrer une roadmap.' }
      }

      if (!input.title.trim()) {
        return { ok: false, error: 'Le titre est obligatoire.' }
      }

      if (input.steps.length === 0) {
        return { ok: false, error: 'Ajoutez au moins une étape.' }
      }

      const existing = existingSlug ? data.roadmaps.find((r) => r.slug === existingSlug) : undefined

      if (existing && existing.authorId !== session.userId) {
        return { ok: false, error: 'Vous ne pouvez modifier que vos propres roadmaps.' }
      }

      const slug = existing?.slug ?? uniqueSlug(input.title, data.roadmaps.map((r) => r.slug))
      const nextRoadmap = buildDemoRoadmap(input, session.userId, status, existing, slug)

      const roadmaps = existing
        ? data.roadmaps.map((r) => (r.slug === existing.slug ? nextRoadmap : r))
        : [...data.roadmaps, nextRoadmap]

      persistData({ ...data, roadmaps })
      return { ok: true, slug, status }
    },
    [data, persistData, session],
  )

  const login = useCallback((email: string, password: string): LoginResult => {
    const user = findDemoUser(email)

    if (!user) {
      return { ok: false, error: 'Aucun compte de démonstration pour cet email.' }
    }

    if (password !== DEMO_PASSWORD && password !== user.password) {
      return { ok: false, error: 'Mot de passe incorrect. Utilisez « demo » pour la simulation.' }
    }

    const nextSession = toSession(user)
    saveSession(nextSession)
    setSession(nextSession)

    return { ok: true, redirectTo: homePathForRole(user.role) }
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setSession(null)
  }, [])

  const resetDemoData = useCallback(() => {
    clearDemoData()
    persistData(createInitialDemoData())
  }, [persistData])

  const getFicheBySlug = useCallback(
    (slug: string) => data.fiches.find((f) => f.slug === slug),
    [data.fiches],
  )

  const getRoadmapBySlug = useCallback(
    (slug: string) => data.roadmaps.find((r) => r.slug === slug),
    [data.roadmaps],
  )

  const getMyFiches = useCallback(
    (userId: string) => data.fiches.filter((f) => f.authorId === userId),
    [data.fiches],
  )

  const getMyRoadmaps = useCallback(
    (userId: string) => data.roadmaps.filter((r) => r.authorId === userId),
    [data.roadmaps],
  )

  const getModerationQueue = useCallback(
    () => data.fiches.filter((f) => f.status === 'review'),
    [data.fiches],
  )

  const getRoadmapModerationQueue = useCallback(
    () => data.roadmaps.filter((r) => r.status === 'review'),
    [data.roadmaps],
  )

  const saveFicheDraft = useCallback(
    (input: FicheFormInput, existingSlug?: string) => upsertFiche(input, 'draft', existingSlug),
    [upsertFiche],
  )

  const submitFicheForReview = useCallback(
    (input: FicheFormInput, existingSlug?: string) => upsertFiche(input, 'review', existingSlug),
    [upsertFiche],
  )

  const approveFiche = useCallback(
    (slug: string): SaveContentResult => {
      const fiche = data.fiches.find((f) => f.slug === slug)
      if (!fiche) return { ok: false, error: 'Fiche introuvable.' }
      if (fiche.status !== 'review') return { ok: false, error: 'Cette fiche n’est pas en révision.' }

      const nextFiche: DemoFiche = { ...fiche, status: 'published', updatedAt: new Date().toISOString() }
      persistData({ ...data, fiches: data.fiches.map((f) => (f.slug === slug ? nextFiche : f)) })
      return { ok: true, slug, status: 'published' }
    },
    [data, persistData],
  )

  const rejectFiche = useCallback(
    (slug: string): SaveContentResult => {
      const fiche = data.fiches.find((f) => f.slug === slug)
      if (!fiche) return { ok: false, error: 'Fiche introuvable.' }
      if (fiche.status !== 'review') return { ok: false, error: 'Cette fiche n’est pas en révision.' }

      const nextFiche: DemoFiche = { ...fiche, status: 'rejected', updatedAt: new Date().toISOString() }
      persistData({ ...data, fiches: data.fiches.map((f) => (f.slug === slug ? nextFiche : f)) })
      return { ok: true, slug, status: 'rejected' }
    },
    [data, persistData],
  )

  const saveRoadmapDraft = useCallback(
    (input: RoadmapFormInput, existingSlug?: string) => upsertRoadmap(input, 'draft', existingSlug),
    [upsertRoadmap],
  )

  const submitRoadmapForReview = useCallback(
    (input: RoadmapFormInput, existingSlug?: string) => upsertRoadmap(input, 'review', existingSlug),
    [upsertRoadmap],
  )

  const approveRoadmap = useCallback(
    (slug: string): SaveContentResult => {
      const roadmap = data.roadmaps.find((r) => r.slug === slug)
      if (!roadmap) return { ok: false, error: 'Roadmap introuvable.' }
      if (roadmap.status !== 'review') return { ok: false, error: 'Cette roadmap n’est pas en révision.' }

      const nextRoadmap: DemoRoadmap = { ...roadmap, status: 'published', updatedAt: new Date().toISOString() }
      persistData({ ...data, roadmaps: data.roadmaps.map((r) => (r.slug === slug ? nextRoadmap : r)) })
      return { ok: true, slug, status: 'published' }
    },
    [data, persistData],
  )

  const rejectRoadmap = useCallback(
    (slug: string): SaveContentResult => {
      const roadmap = data.roadmaps.find((r) => r.slug === slug)
      if (!roadmap) return { ok: false, error: 'Roadmap introuvable.' }
      if (roadmap.status !== 'review') return { ok: false, error: 'Cette roadmap n’est pas en révision.' }

      const nextRoadmap: DemoRoadmap = { ...roadmap, status: 'rejected', updatedAt: new Date().toISOString() }
      persistData({ ...data, roadmaps: data.roadmaps.map((r) => (r.slug === slug ? nextRoadmap : r)) })
      return { ok: true, slug, status: 'rejected' }
    },
    [data, persistData],
  )

  const publishedFiches = useMemo(
    () => data.fiches.filter((f) => f.status === 'published'),
    [data.fiches],
  )

  const publishedRoadmaps = useMemo(
    () => data.roadmaps.filter((r) => r.status === 'published'),
    [data.roadmaps],
  )

  const value = useMemo(
    () => ({
      session,
      isHydrated,
      fiches: data.fiches,
      roadmaps: data.roadmaps,
      publishedFiches,
      publishedRoadmaps,
      login,
      logout,
      resetDemoData,
      getFicheBySlug,
      getRoadmapBySlug,
      getMyFiches,
      getMyRoadmaps,
      getModerationQueue,
      getRoadmapModerationQueue,
      saveFicheDraft,
      submitFicheForReview,
      approveFiche,
      rejectFiche,
      saveRoadmapDraft,
      submitRoadmapForReview,
      approveRoadmap,
      rejectRoadmap,
    }),
    [
      session,
      isHydrated,
      data.fiches,
      data.roadmaps,
      publishedFiches,
      publishedRoadmaps,
      login,
      logout,
      resetDemoData,
      getFicheBySlug,
      getRoadmapBySlug,
      getMyFiches,
      getMyRoadmaps,
      getModerationQueue,
      getRoadmapModerationQueue,
      saveFicheDraft,
      submitFicheForReview,
      approveFiche,
      rejectFiche,
      saveRoadmapDraft,
      submitRoadmapForReview,
      approveRoadmap,
      rejectRoadmap,
    ],
  )

  return <DemoStoreContext.Provider value={value}>{children}</DemoStoreContext.Provider>
}

export function useDemoStore() {
  const context = useContext(DemoStoreContext)
  if (!context) {
    throw new Error('useDemoStore must be used within DemoStoreProvider')
  }
  return context
}

export type { UserRole, DemoSession, DemoFiche, DemoRoadmap, FicheFormInput, RoadmapFormInput, ContentStatus }
