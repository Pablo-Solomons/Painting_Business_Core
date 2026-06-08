import type { DemoSession } from '@/data/mockUsers'
import type { DemoData } from '@/types/content'

const SESSION_KEY = 'artplastique-demo-session'
const DATA_KEY = 'artplastique-demo-data'

export function loadSession(): DemoSession | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as DemoSession
  } catch {
    return null
  }
}

export function saveSession(session: DemoSession) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(SESSION_KEY)
}

export function loadDemoData(): DemoData | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(DATA_KEY)
    if (!raw) return null
    return JSON.parse(raw) as DemoData
  } catch {
    return null
  }
}

export function saveDemoData(data: DemoData) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(DATA_KEY, JSON.stringify(data))
}

export function clearDemoData() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(DATA_KEY)
}

export function clearAllDemoStorage() {
  clearSession()
  clearDemoData()
}
