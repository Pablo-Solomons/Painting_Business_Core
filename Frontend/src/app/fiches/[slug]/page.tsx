import { PublicShell } from '@/components/PublicShell'
import { FicheDetailPage } from '@/views/FicheDetailPage'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  return (
    <PublicShell>
      <FicheDetailPage slug={slug} />
    </PublicShell>
  )
}
