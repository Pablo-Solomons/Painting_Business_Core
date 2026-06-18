import type { Fiche } from '../types'

export const ficheMedium_a_peindre: Fiche = {
  slug: 'medium-a-peindre',
  title: 'Médium à peindre',
  question: 'Comment choisir et utiliser un médium à peindre ?',
  category: 'Médium',
  tool: 'Peinture à l\'huile / Acrylique',
  duration: '22 min',
  level: 'Intermédiaire',
  summary: 'Le médium à peindre modifie la consistance, la brillance et le temps de séchage de la peinture sans altérer sa couleur. Huile, acrylique ou résine : chaque type de médium répond à un besoin précis en atelier.',
  tags: ['médium', 'consistance', 'brillance', 'séchage', 'glacis', 'huile', 'acrylique'],
  sections: [
    { label: 'Définition', title: 'Qu\'est-ce qu\'un médium à peindre ?', paragraphs: [
      'Un médium à peindre est un produit ajouté à la peinture pour modifier ses propriétés : fluidité, transparence, brillance, temps de séchage ou texture. Contrairement aux solvants (térébenthine, eau) qui diluent sans laisser de film, les médiums contiennent un liant qui reste dans la couche sèche.',
      'Pour l\'huile, les médiums classiques combinent huile de lin, essence de térébenthine et parfois des résines (dammar, mastic). Pour l\'acrylique, ce sont des liants acryliques, des gels ou des pâtes de structure.',
      'Chaque médium est formulé pour un usage précis : glacis, empâtement, finition brillante, accélération du séchage. Lire l\'étiquette et tester sur une surface d\'essai avant d\'utiliser sur une œuvre.',
    ]},
    { label: 'Types', title: 'Médiums huile et acrylique', paragraphs: [
      'Médium à glacis (huile) : huile de lin + résine + essence. Rend la peinture transparente et fluide. Idéal pour les superpositions transparentes.',
      'Médium à peindre liquide (acrylique) : liant acrylique dilué. Augmente la transparence et la fluidité sans réduire l\'adhérence.',
      'Gel de structure (acrylique) : épaissit la peinture pour l\'impasto. Existe en finitions mate, satinée ou brillante.',
      'Médium alkyd : accélère le séchage de l\'huile. Utile pour les couches intermédiaires qu\'on veut sécher rapidement.',
    ]},
    { label: 'Usage', title: 'Bonnes pratiques', paragraphs: [
      'Ajouter le médium par petites quantités — quelques gouttes à la fois. Mélanger soigneusement sur la palette avant d\'appliquer. Un excès de médium affaiblit le film et peut provoquer des craquelures.',
      'Respecter la règle du gras sur maigre à l\'huile : les couches avec médium gras (riche en huile/résine) se posent sur les couches maigres. Ne jamais inverser.',
      'Pour l\'acrylique, les médiums permettent de prolonger le temps de travail (médium retardateur) ou d\'accélérer le séchage (médium séchage rapide).',
    ]},
    { label: 'Recettes', title: 'Médiums maison classiques', paragraphs: [
      'Médium de base huile : 1 part huile de lin + 1 part essence de térébenthine. Usage général, couches intermédiaires.',
      'Médium à glacis : 1 part huile standolie + 1 part essence + 1/2 part résine dammar dissoute. Pour les glacis et finitions.',
      'Médium acrylique glacis : liant acrylique brillant dilué à 50% avec de l\'eau. Pour les voiles transparents.',
    ]},
    { label: 'Erreurs', title: 'Pièges à éviter', paragraphs: [
      'Ne pas mélanger médiums huile et acrylique — incompatibles. Nettoyer les outils entre chaque session.',
      'Éviter d\'ajouter trop de médium — la peinture devient trop fluide et perd son pouvoir couvrant. Mieux vaut plusieurs couches fines.',
      'Ne pas utiliser de médium inconnu sans test — certains jaunissent ou craquellent avec le temps. Privilégier les marques professionnelles.',
    ]},
  ],
}
