import type { Fiche } from '../types'

export const ficheBlancTitane: Fiche = {
  slug: 'blanc-titane',
  title: 'Blanc de titane',
  question: 'Pourquoi utiliser le blanc de titane ?',
  category: 'Pigment',
  tool: 'Acrylique / Huile',
  duration: '15 min',
  level: 'Débutant',
  summary: 'Blanc couvrant à forte opacité, le plus utilisé des blancs modernes. Idéal pour les rehauts et les mélanges opaques, il a remplacé le toxique blanc de plomb au XXe siècle.',
  tags: ['opacité', 'rehaut', 'mélange', 'couvrant', 'base', 'titane', 'moderne'],
  pigmentCode: 'PW6',
  swatch: ['#f7f4ef', '#f0ebe4', '#e5ddd1', '#d8cbb7', '#c2b29b'],
  sections: [
    { label: 'Propriétés', title: 'Un blanc de référence', paragraphs: [
      'Le blanc de titane (dioxyde de titane, PW6) offre la plus forte opacité parmi tous les blancs. Stable à la lumière et non toxique, il a remplacé le blanc de plomb au début du XXe siècle. Son pouvoir couvrant est environ dix fois supérieur à celui du blanc de zinc.',
      'Sa granulométrie fine lui confère une texture lisse et une capacité à masquer complètement les sous-couches sombres. C\'est le blanc de choix pour les empâtements, les rehauts de lumière et les mélanges opaques.',
      'Le blanc de titane jaunit légèrement avec le temps à l\'huile, contrairement au blanc de zinc qui reste neutre. Cet effet est généralement imperceptible sur des œuvres vernies.',
    ]},
    { label: 'Histoire', title: 'Du plomb au titane', paragraphs: [
      'Pendant des siècles, le blanc de plomb (créa) était le seul blanc utilisable en peinture à l\'huile. Puissant et rapide à sécher, il était aussi hautement toxique. Les peintres souffraient de saturnisme, une intoxication au plomb causée par la manipulation répétée du pigment.',
      'Le dioxyde de titane fut isolé en 1916 et commercialisé comme pigment en 1921. Dès les années 1930, il avait remplacé le blanc de plomb dans la plupart des gammes de peinture. Sa non-toxicité et son opacité exceptionnelle en firent immédiatement le standard.',
      'Aujourd\'hui, le blanc de titane est le pigment blanc le plus produit au monde, utilisé bien au-delà de la peinture artistique : plastiques, papiers, cosmétiques, aliments.',
    ]},
    { label: 'Usage', title: 'Bonnes pratiques', paragraphs: [
      'Utiliser avec parcimonie dans les mélanges : trop de blanc de titane rend les couleurs crayeuses et froides. Pour éclaircir une couleur tout en conservant sa saturation, préférer la couleur claire correspondante (jaune de Naples pour éclaircir un jaune, etc.).',
      'Pour les glacis, préférer le blanc de zinc (PW4), plus transparent. Pour les empâtements et les rehauts, le blanc de titane est idéal.',
      'En peinture de paysage, le blanc de titane sert aux nuages, aux écumes, aux reflets sur l\'eau. En portrait, aux rehauts de lumière sur les pommettes et le nez.',
    ]},
    { label: 'Mélanges', title: 'Associations courantes', paragraphs: [
      'Blanc de titane + bleu outremer = bleus ciel opaques pour les nuages et les horizons.',
      'Blanc de titane + ocre jaune = jaunes pâles et beiges pour les fonds clairs.',
      'Blanc de titane + alizarine (très peu) = roses pâles pour les carnations en lumière.',
      'Blanc de titane + terre de Sienne = beiges et crèmes pour les fonds de nature morte.',
    ]},
    { label: 'Erreurs', title: 'Pièges à éviter', paragraphs: [
      'Ne pas utiliser le blanc de titane dans les glacis — sa forte opacité produit un voile laiteux. Réserver le blanc de zinc pour les glacis clairs.',
      'Éviter d\'éclaircir toutes les couleurs uniquement avec du blanc de titane — les mélanges perdent en saturation et deviennent « crayeux ». Apprendre à utiliser les couleurs claires de la palette.',
      'Ne pas confondre blanc de titane (PW6, opaque) et blanc de zinc (PW4, transparent) — leurs usages sont complémentaires.',
    ]},
  ],
}
