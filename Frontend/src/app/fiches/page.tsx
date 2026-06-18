import { Suspense } from 'react'
import { PublicShell } from '@/components/PublicShell'
import { FichesPage } from '@/views/FichesPage'

export default function Page() {
  return (
    <PublicShell>
      <Suspense fallback={
        <div className="auth-guard-loading auth-guard-loading--page">
          <div className="auth-guard-spinner" aria-hidden />
          <p>Chargement…</p>
        </div>
      }>
        <FichesPage />
      </Suspense>
    </PublicShell>
  )
}
