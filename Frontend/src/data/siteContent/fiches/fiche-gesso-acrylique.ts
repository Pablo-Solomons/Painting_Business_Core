import type { Fiche } from '../types'

export const ficheGesso_acrylique: Fiche = {
  slug: 'gesso-acrylique',
  title: 'Gesso acrylique',
  question: 'Pourquoi préparer sa toile avec du gesso ?',
  category: 'Support',
  tool: 'Acrylique / Huile',
  duration: '18 min',
  level: 'Débutant',
  summary: 'Le gesso acrylique prépare et protège le support avant la peinture. Il scelle la fibre, crée une surface accrocheuse et uniforme, et empêche l\'huile de pénétrer dans la toile. Une bonne préparation conditionne la durabilité de l\'œuvre.',
  tags: ['préparation', 'toile', 'support', 'accroche', 'scellement', 'acrylique', 'base'],
  sections: [
    { label: 'Définition', title: 'Qu\'est-ce que le gesso ?', paragraphs: [
      'Le gesso est une préparation de surface à base de carbonate de calcium (craie) et de liant acrylique. Il forme une couche blanche, mate et légèrement abrasive qui scelle le support et offre une accroche optimale à la peinture.',
      'Le gesso acrylique moderne remplace le gesso traditionnel à base de colle de peau et de plâtre. Il sèche rapidement, ne jaunit pas et est compatible avec l\'acrylique et l\'huile (après séchage complet).',
      'On distingue le gesso blanc (standard) et le gesso transparent ou coloré. Le gesso noir est utile pour les fonds sombres ; le gesso transparent pour les supports déjà teintés.',
    ]},
    { label: 'Usage', title: 'Application sur toile et panneau', paragraphs: [
      'Sur toile non préparée : appliquer 2 à 3 couches de gesso en croisant les passes. Laisser sécher 30 minutes entre chaque couche. Poncer légèrement au papier de verre grain 220 entre les couches pour une surface lisse.',
      'Sur panneau de bois : le gesso scelle le bois et empêche les tanins de migrer dans la peinture. Appliquer au moins 2 couches, en insistant sur les bords.',
      'Sur toile déjà gessoïtée en usine : une couche supplémentaire améliore l\'accroche et permet de contrôler la texture (lisse ou rugueuse selon le ponçage).',
    ]},
    { label: 'Texture', title: 'Surface lisse ou texturée', paragraphs: [
      'Pour une surface lisse (portraits, détails fins) : appliquer le gesso en couches fines avec un pinceau large ou un rouleau mousse. Poncer entre chaque couche au grain 320-400.',
      'Pour une surface texturée (paysages, impasto) : appliquer le gesso épais avec une spatule ou un couteau. Ne pas poncer — la texture sera exploitée par la peinture.',
      'Le gesso peut être teinté avec de l\'acrylique pour créer un fond coloré. Attendre le séchage complet avant de peindre à l\'huile.',
    ]},
    { label: 'Huile sur gesso', title: 'Compatibilité huile / acrylique', paragraphs: [
      'Le gesso acrylique est compatible avec la peinture à l\'huile à condition d\'être parfaitement sec (24-48h minimum). L\'huile ne doit jamais être appliquée directement sur une toile non préparée — elle détruit les fibres de coton.',
      'Ne pas appliquer d\'acrylique sur de l\'huile fraîche — l\'acrylique ne tient pas sur l\'huile. En revanche, le gesso acrylique sous l\'huile est une pratique standard et durable.',
      'Pour les toiles achetées en magasin, vérifier qu\'elles sont bien « triple gesso » ou « acrylic primed ». Sinon, ajouter au moins une couche maison.',
    ]},
    { label: 'Erreurs', title: 'Pièges à éviter', paragraphs: [
      'Ne pas peindre à l\'huile sur du gesso humide — attendre le séchage complet.',
      'Éviter les couches trop épaisses en une passe — le gesso peut craqueler. Mieux vaut plusieurs couches fines.',
      'Ne pas confondre gesso et peinture acrylique — le gesso est plus absorbant et moins flexible. Il sert de préparation, pas de couche picturale.',
    ]},
  ],
}
