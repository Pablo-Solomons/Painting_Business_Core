'use client'

import type { ReactNode } from 'react'
import { RequireRole } from '@/components/RequireRole'

export function AdminGate({ children }: { children: ReactNode }) {
  return <RequireRole role="admin">{children}</RequireRole>
}
