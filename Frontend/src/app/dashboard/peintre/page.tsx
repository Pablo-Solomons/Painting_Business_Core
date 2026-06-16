import { PainterGate } from '@/components/PainterGate'
import { DashboardPeintrePage } from '@/views/DashboardPeintrePage'

export default function Page() {
  return (
    <PainterGate>
      <DashboardPeintrePage />
    </PainterGate>
  )
}
