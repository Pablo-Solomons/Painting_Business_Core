import { AdminGate } from '@/components/AdminGate'
import { ControlShell } from '@/components/ControlShell'
import { AdminCategoriesPage } from '@/views/AdminCategoriesPage'

export default function Page() {
  return (
    <AdminGate>
      <ControlShell>{<AdminCategoriesPage />}</ControlShell>
    </AdminGate>
  )
}