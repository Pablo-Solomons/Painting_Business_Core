import type { Metadata } from 'next'
import { DemoProvider } from '@/components/DemoProvider'
import PaintCanvas from '@/components/PaintCanvas'
import { FloatingQuestionWidget } from '@/components/FloatingQuestionWidget'
import './globals.css'

export const metadata: Metadata = {
  title: 'ArtPlastique',
  description: 'Référence pour les fiches techniques, les roadmaps et les espaces peintres.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body>
        <DemoProvider>
          {children}
          <PaintCanvas />
          <FloatingQuestionWidget />
        </DemoProvider>
      </body>
    </html>
  )
}
