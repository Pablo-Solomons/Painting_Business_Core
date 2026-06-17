import type { Fiche } from '../types'

export const ficheLavis: Fiche = {
  slug: 'lavis',
  title: 'Le lavis',
  question: 'Qu\'est-ce que la technique du lavis ?',
  category: 'Technique',
  tool: 'Aquarelle / Encre',
  duration: '9 min',
  level: 'Débutant',
  summary: 'Technique consistant à appliquer une couche diluée et uniforme de couleur sur le papier, typique de l\'aquarelle.',
  tags: ['aquarelle', 'encre', 'dilution', 'fond', 'transparence'],
  sections: [
    { label: 'Principe', title: 'Le lavis à l\'aquarelle', paragraphs: ['Un lavis est une couche de couleur très diluée appliquée uniformément sur le papier. C\'est la technique de base de l\'aquarelle.', 'On distingue le lavis uniforme, le lavis dégradé (plus foncé en haut) et le lavis humide-sur-humide (bords diffus).'] },
    { label: 'Pratique', title: 'Réussir un beau lavis', paragraphs: ['Préparer une quantité suffisante de mélange dilué. Travailler sur papier incliné à 15 degrés.', 'Appliquer en une seule passe, sans revenir. Laisser sécher complètement avant de superposer un nouveau lavis.'] },
  ],
}