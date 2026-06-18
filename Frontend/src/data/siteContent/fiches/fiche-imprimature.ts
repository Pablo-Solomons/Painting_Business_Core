import type { Fiche } from '../types'

export const ficheImprimature: Fiche = {
  slug: 'imprimature',
  title: 'Imprimature',
  question: 'Quelle couleur d\'imprimature choisir pour son tableau ?',
  category: 'Support',
  tool: 'Peinture à l\'huile',
  duration: '20 min',
  level: 'Intermédiaire',
  summary: 'L\'imprimature est la première couche de peinture posée sur le gesso. Elle teinte le fond, unifie la surface et influence toute la palette du tableau. Gris, terre ou couleur vive : le choix de l\'imprimature est une décision artistique fondamentale.',
  tags: ['fond', 'préparation', 'sous-couche', 'teinte', 'harmonie', 'huile', 'valeur'],
  sections: [
    { label: 'Définition', title: 'La première couche colorée', paragraphs: [
      'L\'imprimature (ou « ground » en anglais) est une couche de peinture semi-transparente appliquée sur le gesso sec. Elle remplace le blanc du gesso par une teinte unie qui servira de base à toute la composition.',
      'Contrairement au gesso qui scelle et prépare, l\'imprimature participe à l\'effet optique final. Les zones laissées apparentes ou les glacis transparents laisseront transparaître cette teinte de fond, influençant l\'harmonie générale.',
      'L\'imprimature se fait généralement à l\'huile, en couche mince et uniforme. Elle doit sécher complètement (48h à 1 semaine) avant de commencer la peinture proprement dite.',
    ]},
    { label: 'Couleurs', title: 'Gris, terre ou couleur ?', paragraphs: [
      'Imprimature grise (gris neutre, gris chaud) : la plus polyvalente. Convient aux portraits, natures mortes et paysages. Le gris moyen (valeur 5 sur une échelle de 1 à 10) est un excellent point de départ.',
      'Imprimature terre (ocre jaune, terre de Sienne, terre d\'ombre) : chaude et enveloppante. Idéale pour les portraits, les intérieurs et les scènes au crépuscule. Rembrandt utilisait souvent une Sienne naturelle.',
      'Imprimature colorée (rouge, bleu, vert) : audacieuse. Un fond rouge sous un portrait donne une carnation vibrante. Un fond bleu sous un paysage renforce les atmosphères froides.',
    ]},
    { label: 'Technique', title: 'Application pas à pas', paragraphs: [
      'Mélanger la couleur choisie avec un peu de blanc (pour les terres) ou diluer à l\'essence de térébenthine pour obtenir une consistance fluide. L\'imprimature doit être semi-opaque — on devine le gesso en dessous.',
      'Appliquer au pinceau large en passes croisées régulières. Couvrir toute la surface, y compris les bords. Essuyer les coulures sur les tranches du châssis.',
      'Laisser sécher à plat, à l\'abri de la poussière. Ne pas accélérer le séchage — une imprimature mal sèche peut cloquer sous les couches suivantes.',
    ]},
    { label: 'Histoire', title: 'Tradition et maîtres', paragraphs: [
      'Les peintres de la Renaissance appliquaient souvent une imprimature rouge (sinopia) visible dans les zones d\'ombre. Cette tradition vénitienne donnait une chaleur aux carnations et aux drapés.',
      'Les peintres hollandais du XVIIe siècle préféraient les imprimatures grises ou brunes, plus neutres, qui laissaient la palette parler sans influencer les couleurs.',
      'Les Impressionnistes ont parfois laissé l\'imprimature apparente dans les zones non peintes, créant un effet de vibration entre le fond et les touches de couleur.',
    ]},
    { label: 'Erreurs', title: 'Pièges à éviter', paragraphs: [
      'Ne pas appliquer l\'imprimature sur du gesso humide — attendre le séchage complet du gesso.',
      'Éviter une imprimature trop foncée — elle assombrit toute la composition et fatigue l\'œil. Viser une valeur moyenne.',
      'Ne pas peindre directement sur l\'imprimature fraîche — elle doit être parfaitement sèche avant la couche suivante.',
    ]},
  ],
}
