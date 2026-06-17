import type { Fiche } from '../types'

export const ficheOutremer: Fiche = {
  slug: 'outremer',
  title: 'Outremer',
  question: 'Qu\'est-ce que Outremer ?',
  category: 'Outil',
  tool: 'Tous médiums',
  duration: '10 min',
  level: 'Débutant',
  summary: 'Description de Outremer.',
  tags: ['art', 'peinture'],
  sections: [
    { label: 'Présentation', title: 'Présentation', paragraphs: ['Section à enrichir.', 'Contenu détaillé à venir.'] },
    { label: 'Pratique', title: 'En pratique', paragraphs: ['Conseils à développer.', 'Exemples à ajouter.'] },
  ],
}
