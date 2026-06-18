import type { Fiche } from '../types'

export const ficheDegrade: Fiche = {
  slug: 'degrade',
  title: 'Le dégradé',
  question: 'Comment réaliser un dégradé fluide en peinture ?',
  category: 'Technique',
  tool: 'Peinture à l\'huile / Acrylique / Aquarelle',
  duration: '20 min',
  level: 'Débutant',
  summary: 'Le dégradé est une transition progressive entre deux valeurs ou deux teintes. Fondamental en peinture de ciel, de paysage et de fond, il demande contrôle du médium, du geste et du timing selon le médium utilisé.',
  tags: ['dégradé', 'transition', 'ciel', 'lavis', 'fond', 'valeur', 'fondu'],
  sections: [
    { label: 'Définition', title: 'Une transition maîtrisée', paragraphs: [
      'Le dégradé (ou fondu) est une transition progressive d\'une couleur ou d\'une valeur vers une autre, sans rupture visible. En peinture, il peut être vertical (ciel), horizontal (horizon), radial (vignette) ou libre.',
      'Contrairement à un mélange sur palette qui produit une couleur intermédiaire uniforme, le dégradé sur la toile crée une progression optique où l\'œil perçoit une infinité de nuances.',
      'La réussite d\'un dégradé dépend du médium : l\'aquarelle utilise le comportement de l\'eau ; l\'huile et l\'acrylique exigent un travail humide sur humide ou des glacis superposés.',
    ]},
    { label: 'Aquarelle', title: 'Dégradé au lavis', paragraphs: [
      'Humidifier le papier uniformément. Déposer la couleur en haut (ou sur un côté) et incliner le papier pour laisser l\'eau entraîner le pigment.',
      'Pour un dégradé sec : poser la couleur sur papier sec, puis immédiatement rincer le pinceau et estomper la bordure avec de l\'eau claire. Agir vite — l\'aquarelle sèche en minutes.',
      'Le blanc du papier participe au dégradé : ne pas couvrir toute la surface. Laisser le blanc pour les zones les plus claires.',
    ]},
    { label: 'Huile et acrylique', title: 'Fondu humide sur humide', paragraphs: [
      'Préparer les deux couleurs extrêmes sur la palette. Appliquer la première sur la zone concernée, puis la seconde à côté, sans laisser sécher.',
      'Avec un pinceau propre et sec (éventail ou brosse douce), croiser les bords des deux couleurs en passes légères jusqu\'à obtenir une transition fluide. Ne pas trop travailler — le mélange peut devenir boueux.',
      'Pour les grands dégradés (ciels), travailler en une seule session. L\'acrylique sèche vite : utiliser un médium retardateur ou peindre par sections.',
    ]},
    { label: 'Ciel', title: 'Le dégradé de ciel', paragraphs: [
      'Observer la nature : le ciel est plus foncé au zénith, plus clair à l\'horizon. Reproduire cette progression avec un bleu outremer en haut et un blanc teinté en bas.',
      'À l\'huile : glacis superposés d\'outremer dilué, du foncé au clair. Chaque couche doit sécher avant la suivante pour un fondu par transparence.',
      'À l\'aquarelle : un seul lavis en inclinant le papier. Le pigment se dépose naturellement en dégradé.',
    ]},
    { label: 'Erreurs', title: 'Pièges à éviter', paragraphs: [
      'Ne pas laisser sécher entre les deux couleurs en travail humide — la transition devient impossible sans reprise.',
      'Éviter de trop mélanger — un dégradé boueux perd sa fraîcheur. Mieux vaut des passes légères et répétées.',
      'Ne pas oublier la valeur : un dégradé de ciel nécessite un contraste suffisant entre zénith et horizon pour être convaincant.',
    ]},
  ],
}
