'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { homePathForRole, type UserRole } from '@/data/mockUsers'
import { useDemoStore } from '@/context/DemoStoreContext'

type RequireRoleProps = {
  role: UserRole
  children: ReactNode
}

export function RequireRole({ role, children }: RequireRoleProps) {
  const { session, isHydrated } = useDemoStore()
  const router = useRouter()

  useEffect(() => {
    if (!isHydrated) return

    if (!session) {
      router.replace('/connexion')
      return
    }

    if (session.role !== role) {
      router.replace(homePathForRole(session.role))
    }
  }, [isHydrated, session, role, router])

  if (!isHydrated) {
    return (
      <div className="auth-guard-loading">
        <div className="auth-guard-spinner" aria-hidden />
        <p>Chargement de la session…</p>
      </div>
    )
  }

  if (!session || session.role !== role) {
    return null
  }

  return children
}
