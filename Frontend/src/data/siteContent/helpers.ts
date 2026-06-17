import type { Fiche, Roadmap } from './types'

export function findFiche(fiches: Fiche[], slug: string | undefined) {
  return fiches.find((fiche) => fiche.slug === slug) ?? fiches[0]
}

export function findRoadmap(roadmaps: Roadmap[], slug: string | undefined) {
  return roadmaps.find((roadmap) => roadmap.slug === slug) ?? roadmaps[0]
}

export function countRoadmapFiches(roadmap: Roadmap) {
  const slugs = new Set<string>()
  roadmap.steps.forEach((step) => step.ficheSlugs.forEach((s) => slugs.add(s)))
  return slugs.size
}

export function findRoadmapsForFiche(ficheSlug: string, roadmaps: Roadmap[]) {
  return roadmaps
    .map((roadmap) => {
      const stepIndex = roadmap.steps.findIndex((step) => step.ficheSlugs.includes(ficheSlug))
      if (stepIndex === -1) return null
      return { roadmap, stepIndex, step: roadmap.steps[stepIndex] }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
}

export function getRelatedFiches(fiche: Fiche, fiches: Fiche[], limit = 3) {
  return fiches.filter((item) => item.slug !== fiche.slug && item.category === fiche.category).slice(0, limit)
}