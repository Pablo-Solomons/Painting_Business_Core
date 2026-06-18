import type { Fiche } from '../types'

export const ficheFrottis: Fiche = {
  slug: 'frottis',
  title: 'Le frottis',
  question: 'Qu\'est-ce que le frottis et quand l\'utiliser ?',
  category: 'Technique',
  tool: 'Peinture à l\'huile',
  duration: '15 min',
  level: 'Intermédiaire',
  summary: 'Le frottis est une couche semi-opaque frottée sur la toile pour unifier des zones, adoucir des transitions ou créer des atmosphères. Entre le glacis transparent et l\'empâtement opaque, c\'est l\'outil de la modulation subtile.',
  tags: ['frottis', 'semi-opaque', 'transition', 'unifier', 'huile', 'atmosphère', 'adoucir'],
  sections: [
    { label: 'Définition', title: 'Qu\'est-ce qu\'un frottis ?', paragraphs: [
      'Le frottis est une couche de peinture opacifiée (souvent avec un peu de blanc) appliquée en frottant avec un pinceau sec ou très peu chargé. Contrairement au glacis transparent, le frottis est semi-opaque : il couvre partiellement la couche inférieure tout en la laissant transparaître.',
      'Le geste consiste à étaler une petite quantité de peinture en mouvements circulaires ou croisés, jusqu\'à obtenir une couche uniforme et légère. Le pinceau éventail ou le blaireau sont les outils idéaux.',
      'Le frottis modifie la teinte et la valeur d\'une zone sans la masquer complètement. C\'est une technique de nuance et d\'harmonisation, pas de couverture.',
    ]},
    { label: 'Usage', title: 'Quand utiliser le frottis ?', paragraphs: [
      'Unifier des zones de valeurs proches : quand deux masses de couleur adjacentes créent une transition trop dure, un frottis de la teinte intermédiaire adoucit le passage.',
      'Créer des atmosphères : un frottis d\'ocre jaune sur un ciel bleu donne une lumière chaude de fin de journée. Un frottis de bleu outremer sur un fond chaud crée une atmosphère froide.',
      'Adoucir des contours : en portrait, un frottis léger sur les bords d\'une forme intègre l\'élément dans le fond sans ligne de démarcation nette.',
    ]},
    { label: 'Technique', title: 'Application pas à pas', paragraphs: [
      'Préparer un mélange semi-opaque : couleur + un peu de blanc de titane ou de couleur claire. La consistance doit être crémeuse, pas fluide.',
      'Charger un pinceau éventail ou un blaireau légèrement. Essorer l\'excédent sur un chiffon — le frottis exige un pinceau presque sec.',
      'Frotter en mouvements circulaires légers sur la zone à traiter. Ne pas appuyer fort — laisser la sous-couche transparaître.',
      'Évaluer à distance. Si l\'effet est trop fort, essuyer immédiatement avec un chiffon propre avant que la peinture ne sèche.',
    ]},
    { label: 'Différences', title: 'Frottis, glacis et empâtement', paragraphs: [
      'Glacis : transparent, dilué au médium. Laisse lire entièrement la sous-couche. Pour les profondeurs et les superpositions.',
      'Frottis : semi-opaque, peu dilué. Couvre partiellement. Pour les transitions et les unifications.',
      'Empâtement : opaque, épais. Masque la sous-couche. Pour les reliefs et les rehauts.',
    ]},
    { label: 'Erreurs', title: 'Pièges à éviter', paragraphs: [
      'Ne pas utiliser un pinceau trop chargé — le frottis devient opaque et perd son caractère semi-transparent.',
      'Éviter de frotter sur une couche pas sèche — le frottis se mélange à la sous-couche et crée une boue.',
      'Ne pas confondre frottis et glacis : le frottis utilise une peinture plus épaisse et plus opaque.',
    ]},
  ],
}
