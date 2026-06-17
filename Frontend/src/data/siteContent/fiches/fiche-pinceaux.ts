import type { Fiche } from '../types'

export const fichePinceaux: Fiche = {
  slug: 'pinceaux',
  title: 'Pinceaux',
  question: 'Qu\'est-ce que Pinceaux ?',
  category: 'Outil',
  tool: 'Tous médiums',
  duration: '10 min',
  level: 'Débutant',
  summary: 'Description de Pinceaux.',
  tags: ['art', 'peinture'],
  sections: [
    { label: 'Présentation', title: 'Présentation', paragraphs: ['Section à enrichir.', 'Contenu détaillé à venir.'] },
    { label: 'Pratique', title: 'En pratique', paragraphs: ['Conseils à développer.', 'Exemples à ajouter.'] },
  ],
}
