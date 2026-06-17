import type { Fiche } from '../types'

export const ficheDegrade: Fiche = {
  slug: 'degrade',
  title: 'Le dégradé',
  question: 'Comment réussir un dégradé parfait ?',
  category: 'Technique',
  tool: 'Tous médiums',
  duration: '10 min',
  level: 'Débutant',
  summary: 'Transition progressive entre deux couleurs ou deux valeurs — fondamentale pour les ciels, les fonds et les volumes.',
  tags: ['dégradé', 'transition', 'fond', 'ciel', 'volume'],
  sections: [
    { label: 'Technique humide', title: 'Dégradé dans le frais', paragraphs: ['Pour l\'huile et l\'acrylique, appliquer les deux couleurs côte à côte puis travailler la jonction avec un pinceau propre et sec en mouvements croisés.', 'À l\'aquarelle, travailler sur papier humide : le pigment se diffuse naturellement. Incliner le support pour guider la migration.'] },
    { label: 'Astuces', title: 'Éviter les erreurs', paragraphs: ['Ne pas sur-travailler la zone de transition : trop de passages créent de la boue. Laisser le mélange optique faire son travail.', 'Pour un dégradé régulier, diviser mentalement la zone en segments et traiter chaque transition l\'une après l\'autre.'] },
  ],
}