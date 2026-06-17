import type { Fiche } from '../types'

export const ficheFrottis: Fiche = {
  slug: 'frottis',
  title: 'Le frottis',
  question: 'Qu\'est-ce que le frottis en peinture ?',
  category: 'Technique',
  tool: 'Peinture à l\'huile',
  duration: '8 min',
  level: 'Intermédiaire',
  summary: 'Couche très mince de peinture opaque frottée sur la toile pour créer une transition douce entre deux tons.',
  tags: ['mince', 'transition', 'huile', 'unifier'],
  sections: [
    { label: 'Définition', title: 'Qu\'est-ce qu\'un frottis ?', paragraphs: ['Le frottis est une couche de peinture opacifiée (souvent avec un peu de blanc) appliquée en frottant avec un pinceau sec ou très peu chargé.', 'Contrairement au glacis transparent, le frottis est semi-opaque : il couvre partiellement la couche inférieure tout en la laissant transparaître.'] },
    { label: 'Usage', title: 'Quand utiliser le frottis ?', paragraphs: ['Idéal pour unifier des zones de valeurs proches, créer des transitions atmosphériques ou adoucir des contours trop durs.', 'Appliquer avec un pinceau éventail ou un blaireau en mouvements circulaires légers.'] },
  ],
}