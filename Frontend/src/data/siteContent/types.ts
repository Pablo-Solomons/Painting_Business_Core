export type FicheSection = {
  label: string
  title: string
  paragraphs: string[]
}

export type Fiche = {
  slug: string
  title: string
  question: string
  category: string
  tool: string
  duration: string
  level: string
  summary: string
  tags: string[]
  sections: FicheSection[]
  pigmentCode?: string
  swatch?: string[]
}

export type RoadmapStep = {
  title: string
  description: string
  ficheSlugs: string[]
}

export type Roadmap = {
  slug: string
  title: string
  audience: string
  duration: string
  level: string
  summary: string
  steps: RoadmapStep[]
}

export type ThemeVariant = {
  slug: string
  name: string
  description: string
  background: string
  accent: string
}