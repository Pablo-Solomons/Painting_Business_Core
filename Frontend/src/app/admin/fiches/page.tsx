import { AdminGate } from '@/components/AdminGate'
import { ControlShell } from '@/components/ControlShell'
import { AdminFichesPage } from '@/views/AdminFichesPage'

export default function Page() {
  return (
    <AdminGate>
      <ControlShell>{<AdminFichesPage />}</ControlShell>
    </AdminGate>
  )
}