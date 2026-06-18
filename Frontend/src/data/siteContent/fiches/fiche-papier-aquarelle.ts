import type { Fiche } from '../types'

export const fichePapier_aquarelle: Fiche = {
  slug: 'papier-aquarelle',
  title: 'Papier aquarelle',
  question: 'Comment choisir le bon papier pour l\'aquarelle ?',
  category: 'Support',
  tool: 'Aquarelle / Gouache',
  duration: '20 min',
  level: 'Débutant',
  summary: 'Le papier est le support le plus déterminant en aquarelle. Son grammage, sa texture et sa composition influencent l\'absorption, les lavis et la luminosité des couleurs. Un bon papier transforme la pratique ; un mauvais la rend frustrante.',
  tags: ['papier', 'aquarelle', 'grammage', 'texture', 'coton', 'lavis', 'support'],
  sections: [
    { label: 'Définition', title: 'Anatomie du papier aquarelle', paragraphs: [
      'Le papier aquarelle est conçu pour absorber l\'eau sans se déformer ni se déliter. Il est composé de fibres (coton ou cellulose), de charge (craie) et de taille (colle) qui régule l\'absorption.',
      'Le grammage s\'exprime en g/m² : 200 g pour les croquis, 300 g pour l\'usage standard, 640 g pour les techniques lourdes (frottis, reprises). Plus le grammage est élevé, moins le papier gondole.',
      'La texture (grain) se classe en trois types : fin (hot press), demi-fin (cold press, le plus polyvalent) et grain torchon (rough, pour les effets texturés).',
    ]},
    { label: 'Composition', title: 'Coton ou cellulose ?', paragraphs: [
      'Papier 100% coton : le standard professionnel. Les fibres longues résistent au frottage, au grattage et aux reprises. Il ne jaunit pas et conserve les couleurs vives. Marques de référence : Arches, Fabriano, Saunders Waterford.',
      'Papier cellulose (bois) : plus économique, adapté aux débutants et aux études. Moins résistant aux reprises et au frottage. Peut jaunir légèrement avec le temps.',
      'Pour un usage sérieux, investir dans du papier coton 300 g demi-fin. La différence de comportement avec l\'eau et les pigments est immédiatement perceptible.',
    ]},
    { label: 'Technique', title: 'Adapter le papier à la technique', paragraphs: [
      'Lavis et fonds : papier 300 g demi-fin, incliné à 15-30°. L\'eau s\'écoule régulièrement, les pigments se déposent en dégradé naturel.',
      'Glaçures et détails : papier fin (hot press), surface lisse pour les traits précis et les rehauts au pinceau fin.',
      'Frottis et textures : papier grain torchon, épais (640 g). Le relief du grain crée des effets naturels lors du frottis au couteau ou à l\'éponge.',
      'Techniques mixtes : papier 300 g minimum, éventuellement collage de morceaux pour les formats grands.',
    ]},
    { label: 'Préparation', title: 'Étirer et préparer', paragraphs: [
      'Pour éviter le gondolage sur les formats grands, étirer le papier : humidifier le verso, poser sur un panneau, fixer les bords avec du ruban crêpe. Sécher à plat.',
      'Certains papiers sont « bloc » (collés sur 4 côtés) : le papier reste tendu pendant le travail. À détacher au couteau une fois sec.',
      'Tester toujours le papier avant une œuvre importante : un essai de lavis et de reprise révèle son comportement.',
    ]},
    { label: 'Erreurs', title: 'Pièges à éviter', paragraphs: [
      'Ne pas utiliser de papier à dessin ou de papier copieur — ils ne sont pas dimensionnés pour l\'eau et se délitent.',
      'Éviter le papier trop fin (moins de 200 g) pour les lavis : il gondole et les couleurs se mélangent de façon incontrôlable.',
      'Ne pas oublier que le papier blanc participe à la luminosité de l\'aquarelle — préserver les zones blanches est aussi important que poser les couleurs.',
    ]},
  ],
}
