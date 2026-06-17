import type { Fiche } from '../types'

export const ficheAlizarine: Fiche = {
  slug: 'alizarine',
  title: 'Alizarine cramoisie',
  question: 'Qu\'est-ce que l\'Alizarine cramoisie ?',
  category: 'Pigment',
  tool: 'Tous médiums',
  duration: '12 min',
  level: 'Intermédiaire',
  summary: 'Rouge profond et transparent, idéal pour les glacis rouges intenses et les mélanges violets.',
  tags: ['rouge', 'transparent', 'glacis', 'intense', 'violet'],
  pigmentCode: 'PR83',
  swatch: ['#8c1a2a', '#a82835', '#c44048', '#d65a5e', '#e87878'],
  sections: [
    { label: 'Propriétés', title: 'Un rouge de glacis', paragraphs: ['L\'Alizarine cramoisie (PR83) est un pigment organique synthétique dérivé de la garance naturelle.', 'Très transparente, idéale pour les glacis rouges profonds. Sa teinte froide tire vers le violet à l\'éclaircissement.'] },
    { label: 'Précautions', title: 'Stabilité', paragraphs: ['L\'alizarine traditionnelle a une tenue à la lumière moyenne. Pour exposition, préférer les alternatives modernes (quinacridone).', 'Très intense : une pointe suffit pour teinter une grande quantité de blanc.'] },
  ],
}
