import type { Fiche } from '../types'

export const ficheImprimature: Fiche = {
  slug: 'imprimature',
  title: 'Imprimature',
  question: 'Qu\'est-ce que Imprimature ?',
  category: 'Outil',
  tool: 'Tous médiums',
  duration: '10 min',
  level: 'Débutant',
  summary: 'Description de Imprimature.',
  tags: ['art', 'peinture'],
  sections: [
    { label: 'Présentation', title: 'Présentation', paragraphs: ['Section à enrichir.', 'Contenu détaillé à venir.'] },
    { label: 'Pratique', title: 'En pratique', paragraphs: ['Conseils à développer.', 'Exemples à ajouter.'] },
  ],
}
