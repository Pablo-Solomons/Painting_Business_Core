import { AdminGate } from '@/components/AdminGate'
import { ControlShell } from '@/components/ControlShell'
import { AdminRoadmapsPage } from '@/views/AdminRoadmapsPage'

export default function Page() {
  return (
    <AdminGate>
      <ControlShell>{<AdminRoadmapsPage />}</ControlShell>
    </AdminGate>
  )
}