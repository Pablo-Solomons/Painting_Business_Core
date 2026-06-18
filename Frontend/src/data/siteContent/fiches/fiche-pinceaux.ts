import type { Fiche } from '../types'

export const fichePinceaux: Fiche = {
  slug: 'pinceaux',
  title: 'Pinceaux',
  question: 'Comment choisir et entretenir ses pinceaux ?',
  category: 'Outil',
  tool: 'Huile / Acrylique / Aquarelle',
  duration: '22 min',
  level: 'Débutant',
  summary: 'Le pinceau est l\'extension de la main du peintre. Forme, fibre et monture déterminent le geste, la matière déposée et la durée de vie de l\'outil. Bien choisir et entretenir ses pinceaux est un investissement pour toute la pratique.',
  tags: ['pinceau', 'brosse', 'poil', 'synthétique', 'martre', 'entretien', 'forme'],
  sections: [
    { label: 'Formes', title: 'Les principales formes de pinceaux', paragraphs: [
      'Pinceau rond : le plus polyvalent. Pointe fine pour les détails, plat pour les traits moyens. Idéal pour l\'aquarelle, les glacis et les finitions.',
      'Pinceau plat (brosse) : pour les aplats, les fonds et les coups de brosse marqués. Les brosses en soie de porc conviennent à l\'huile et à l\'acrylique.',
      'Pinceau éventail : pour les fondus, les frottis et les textures douces. Indispensable pour adoucir les transitions en peinture de portrait.',
      'Pinceau langue de chat : ovale, pour les détails et les touches précises. Très utilisé en aquarelle et en peinture de miniature.',
    ]},
    { label: 'Fibres', title: 'Poils naturels ou synthétiques ?', paragraphs: [
      'Martre (Kolinsky) : la référence pour l\'aquarelle. Excellente rétention d\'eau, pointe fine, réactivité. Coûteux et nécessite un entretien soigneux.',
      'Soie de porc (Chungking) : pour l\'huile et l\'acrylique. Poils raides, bonne charge de peinture, résiste aux solvants. Idéal pour les empâtements et les brosses larges.',
      'Synthétique : progrès remarquables. Bonne alternative pour l\'acrylique et l\'huile. Moins cher, plus résistant, sèche plus vite. Pour l\'aquarelle, les synthétiques haut de gamme rivalisent avec la martre.',
    ]},
    { label: 'Choix', title: 'Constituer sa collection', paragraphs: [
      'Débutant huile/acrylique : 2 brosses plates (n°6 et n°12), 2 ronds (n°4 et n°8), 1 éventail. Compléter selon les besoins.',
      'Aquarelliste : 1 rond n°8 (martre ou synthétique), 1 rond n°4, 1 plat n°12, 1 éventail. Ajouter un langue de chat pour les détails.',
      'Investir dans la qualité des pinceaux qu\'on utilise le plus. Un bon pinceau rond n°8 dure des années avec un entretien correct.',
    ]},
    { label: 'Entretien', title: 'Nettoyer et conserver', paragraphs: [
      'Huile : nettoyer à la térébenthine ou à l\'huile de lin, puis savon à pinceaux et eau tiède. Ne jamais laisser sécher la peinture dans les poils.',
      'Acrylique : rincer immédiatement à l\'eau. L\'acrylique sèché est irréversible — un pinceau négligé est perdu.',
      'Aquarelle : rincer à l\'eau claire, sécher à plat ou tête en bas. Ne pas laisser tremper longtemps — la colle du ferrule peut se détériorer.',
      'Conserver les pinceaux tête en haut dans un pot, ou à plat pour les très longs. Ne pas écraser les poils.',
    ]},
    { label: 'Erreurs', title: 'Pièges à éviter', paragraphs: [
      'Ne pas laisser les pinceaux tremper dans l\'eau ou le solvant — l\'eau remonte dans le ferrule et fait éclater la colle.',
      'Éviter d\'utiliser un pinceau aquarelle pour l\'huile — les poils ne supportent pas les solvants.',
      'Ne pas acheter des sets bon marché en masse — quelques bons pinceaux valent mieux qu\'une dizaine de mauvais.',
    ]},
  ],
}
