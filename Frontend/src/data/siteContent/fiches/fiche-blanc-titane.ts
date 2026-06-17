import type { Fiche } from '../types'

export const ficheBlancTitane: Fiche = {
  slug: 'blanc-titane',
  title: 'Blanc de titane',
  question: 'Pourquoi utiliser le blanc de titane ?',
  category: 'Pigment',
  tool: 'Acrylique / Huile',
  duration: '10 min',
  level: 'Débutant',
  summary: 'Blanc couvrant à forte opacité, le plus utilisé des blancs modernes. Idéal pour les rehauts et les mélanges opaques.',
  tags: ['opacité', 'rehaut', 'mélange', 'couvrant', 'base'],
  pigmentCode: 'PW6',
  swatch: ['#f7f4ef', '#f0ebe4', '#e5ddd1', '#d8cbb7', '#c2b29b'],
  sections: [
    { label: 'Propriétés', title: 'Un blanc de référence', paragraphs: ['Le blanc de titane (dioxyde de titane, PW6) offre la plus forte opacité parmi tous les blancs. Stable à la lumière et non toxique.', 'Inventé au début du XXe siècle, il a remplacé le blanc de plomb toxique. Pouvoir couvrant environ 10 fois supérieur au blanc de zinc.'] },
    { label: 'Usage', title: 'Bonnes pratiques', paragraphs: ['Utiliser avec parcimonie dans les mélanges : trop de blanc de titane rend les couleurs crayeuses et froides.', 'Pour les glacis, préférer le blanc de zinc (PW4), plus transparent. Pour les empâtements, le blanc de titane est idéal.'] },
  ],
}