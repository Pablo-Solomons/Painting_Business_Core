'use client'

import type { ReactNode } from 'react'
import { DemoStoreProvider } from '@/context/DemoStoreContext'

export function DemoProvider({ children }: { children: ReactNode }) {
  return <DemoStoreProvider>{children}</DemoStoreProvider>
}
