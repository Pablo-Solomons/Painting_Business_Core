import type { Fiche } from '../types'

export const ficheTerreSienne: Fiche = {
  slug: 'terre-sienne',
  title: 'Terre de Sienne',
  question: 'Comment utiliser la Terre de Sienne ?',
  category: 'Pigment',
  tool: 'Tous médiums',
  duration: '11 min',
  level: 'Débutant',
  summary: 'Pigment naturel brun-rouge chaud, tiré de l\'argile toscane. Semi-transparent, idéal pour les glacis chauds et les ombres.',
  tags: ['terre', 'brun', 'chaud', 'naturel', 'glacis'],
  pigmentCode: 'PBr7',
  swatch: ['#8c5a35', '#a0683d', '#b07848', '#c48a55', '#d6a068'],
  sections: [
    { label: 'Origine', title: 'Un pigment toscan', paragraphs: ['La Terre de Sienne tire son nom de Sienne, en Toscane, où cette argile riche en oxyde de fer est extraite depuis la Renaissance.', 'La version naturelle est brun-rouge chaud. La version brûlée est calcinée pour un rouge plus intense et opaque.'] },
    { label: 'Usage', title: 'Polyvalence', paragraphs: ['Semi-transparente, parfaite pour les glacis chauds sur carnations. En mélange avec du blanc, donne des tons chair délicats.', 'Sert aussi pour les ombres de paysages. Compatible avec tous les médiums.'] },
  ],
}