'use client'

import type { ReactNode } from 'react'
import { RequireRole } from '@/components/RequireRole'

export function PainterGate({ children }: { children: ReactNode }) {
  return <RequireRole role="peintre">{children}</RequireRole>
}
