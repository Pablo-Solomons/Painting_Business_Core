import type { Fiche } from '../types'

export const ficheCouteau_a_peindre: Fiche = {
  slug: 'couteau-a-peindre',
  title: 'Couteau a peindre',
  question: 'Qu\'est-ce que Couteau a peindre ?',
  category: 'Outil',
  tool: 'Tous médiums',
  duration: '10 min',
  level: 'Débutant',
  summary: 'Description de Couteau a peindre.',
  tags: ['art', 'peinture'],
  sections: [
    { label: 'Présentation', title: 'Présentation', paragraphs: ['Section à enrichir.', 'Contenu détaillé à venir.'] },
    { label: 'Pratique', title: 'En pratique', paragraphs: ['Conseils à développer.', 'Exemples à ajouter.'] },
  ],
}
