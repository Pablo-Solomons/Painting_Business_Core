import type { Fiche } from '../types'

export const ficheJauneNaples: Fiche = {
  slug: 'jaune-naples',
  title: 'Jaune de Naples',
  question: 'À quoi sert le Jaune de Naples ?',
  category: 'Pigment',
  tool: 'Peinture à l\'huile',
  duration: '12 min',
  level: 'Intermédiaire',
  summary: 'Jaune chaud et opaque, indispensable pour les carnations délicates et les paysages méditerranéens.',
  tags: ['jaune', 'opaque', 'chair', 'chaud', 'paysage'],
  pigmentCode: 'PY41',
  swatch: ['#f4e8c1', '#edd99a', '#e0c472', '#d4a847', '#c29235'],
  sections: [
    { label: 'Origine', title: 'Un jaune historique', paragraphs: ['Le véritable Jaune de Naples (PY41) est un antimoniate de plomb utilisé depuis l\'Antiquité. On le trouve dans les fresques de Pompéi.', 'Sa teinte chaude et sa texture onctueuse en font un favori des portraitistes. Les versions modernes sans plomb offrent une teinte proche sans toxicité.'] },
    { label: 'Usage', title: 'Peindre avec le Jaune de Naples', paragraphs: ['Excellent pour les ciels de fin de journée, les chairs, les pierres chaudes. Se mélange magnifiquement avec les terres et les ocres.', 'En mélange avec du blanc, il produit des tons chair lumineux incomparables.'] },
  ],
}