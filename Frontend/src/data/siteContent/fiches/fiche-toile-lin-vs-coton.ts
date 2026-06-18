import type { Fiche } from '../types'

export const ficheToile_lin_vs_coton: Fiche = {
  slug: 'toile-lin-vs-coton',
  title: 'Toile de lin vs toile de coton',
  question: 'Lin ou coton : quel support choisir pour peindre ?',
  category: 'Support',
  tool: 'Huile / Acrylique',
  duration: '18 min',
  level: 'Débutant',
  summary: 'Le lin et le coton sont les deux fibres dominantes pour les toiles de peinture. Le lin offre rigidité et durabilité ; le coton, souplesse et économie. Le choix dépend du format, du style de peinture et du budget.',
  tags: ['toile', 'lin', 'coton', 'support', 'fibre', 'châssis', 'texture'],
  sections: [
    { label: 'Définition', title: 'Deux fibres, deux caractères', paragraphs: [
      'La toile de lin est tissée à partir des fibres du plant de lin. Elle est plus rigide, plus résistante et possède une texture irrégulière caractéristique. Elle jaunit légèrement avec le temps, ce qui peut être esthétique pour les œuvres classiques.',
      'La toile de coton est plus souple, plus régulière et moins chère. Sa texture est plus fine et uniforme. Elle convient bien aux détails précis et aux formats moyens. Elle est aujourd\'hui le support le plus répandu chez les peintres amateurs et professionnels.',
      'Les deux fibres se présentent sur châssis (toiles tendues) ou en rouleau. Elles doivent être préparées au gesso avant la peinture à l\'huile.',
    ]},
    { label: 'Comparaison', title: 'Avantages et inconvénients', paragraphs: [
      'Lin : très durable (plusieurs siècles), rigide (moins de déformation), texture vivante. Inconvénients : cher, peut se détendre par humidité, texture parfois trop marquée pour les détails fins.',
      'Coton : abordable, texture fine, bonne accroche au gesso. Inconvénients : moins durable à long terme, plus sensible à l\'humidité, peut se détendre sur les grands formats.',
      'Pour les grands formats (plus de 1 m), le lin est recommandé pour sa rigidité. Pour les petits et moyens formats, le coton est un excellent choix.',
    ]},
    { label: 'Choix', title: 'Quel support pour quel usage ?', paragraphs: [
      'Portraits et détails fins : coton fin ou lin fin, surface lisse (gesso poncé). La texture discrète ne perturbe pas les détails.',
      'Paysages et impasto : lin moyen ou épais. La texture du lin ajoute du caractère aux empâtements et aux coups de brosse.',
      'Grands formats : lin de qualité supérieure, châssis renforcé. Le poids de la peinture et du châssis exige une fibre résistante.',
      'Études et esquisses : coton économique. Pas besoin d\'investir dans du lin pour des travaux d\'exercice.',
    ]},
    { label: 'Entretien', title: 'Conservation du support', paragraphs: [
      'Stocker les toiles à l\'abri de l\'humidité et de la lumière directe. L\'humidité détend la toile ; la chaleur la tend excessivement.',
      'Pour les toiles enroulées, rouler peinture vers l\'extérieur pour éviter de fissurer le film de peinture.',
      'Un châssis de qualité (bois dur, clés de tension) prolonge la vie du support. Vérifier la tension régulièrement et ajuster avec les clés si nécessaire.',
    ]},
    { label: 'Erreurs', title: 'Pièges à éviter', paragraphs: [
      'Ne pas peindre à l\'huile sur une toile non gessoïtée — l\'huile pourrit les fibres naturelles.',
      'Éviter les toiles trop détendues — la peinture peut craqueler si la toile bouge pendant le séchage.',
      'Ne pas confondre toile brute et toile préparée — toujours vérifier si le gesso est appliqué.',
    ]},
  ],
}
