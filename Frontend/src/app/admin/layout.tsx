import { AdminGate } from '@/components/AdminGate'
import { ControlShell } from '@/components/ControlShell'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AdminGate>
      <ControlShell>{children}</ControlShell>
    </AdminGate>
  )
}
