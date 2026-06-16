import { PublicShell } from '@/components/PublicShell'
import { RoadmapDetailPage } from '@/views/RoadmapDetailPage'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  return (
    <PublicShell>
      <RoadmapDetailPage slug={slug} />
    </PublicShell>
  )
}
