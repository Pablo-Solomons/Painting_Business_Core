import { PublicShell } from '@/components/PublicShell'
import { themeVariants } from '@/data/siteContent'
import { ThemeShowcasePage } from '@/views/ThemeShowcasePage'

export default function Page() {
  return (
    <PublicShell>
      <ThemeShowcasePage themeVariants={themeVariants} />
    </PublicShell>
  )
}
