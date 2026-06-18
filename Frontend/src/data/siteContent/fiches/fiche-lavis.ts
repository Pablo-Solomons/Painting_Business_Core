import type { Fiche } from '../types'

export const ficheLavis: Fiche = {
  slug: 'lavis',
  title: 'Le lavis',
  question: 'Comment maîtriser le lavis en peinture ?',
  category: 'Technique',
  tool: 'Aquarelle / Encre / Huile diluée',
  duration: '22 min',
  level: 'Débutant',
  summary: 'Le lavis est une couche de couleur diluée, transparente, déposée sur le support. Technique reine de l\'aquarelle, il s\'applique aussi à l\'encre et à l\'huile diluée. Maîtriser le lavis, c\'est maîtriser la transparence et la lumière.',
  tags: ['lavis', 'transparent', 'aquarelle', 'dilution', 'fond', 'superposition', 'eau'],
  sections: [
    { label: 'Définition', title: 'La couche transparente', paragraphs: [
      'Un lavis est une couleur fortement diluée (à l\'eau pour l\'aquarelle, à l\'essence pour l\'huile) appliquée en couche uniforme sur le support. La transparence laisse transparaître le blanc du papier ou la sous-couche, ce qui donne aux couleurs une luminosité caractéristique.',
      'En aquarelle, le lavis est la technique fondamentale : on construit l\'image par superposition de lavis successifs, du plus clair au plus foncé. Chaque lavis modifie la teinte globale sans masquer les précédents.',
      'Le lavis diffère du glacis à l\'huile par le liant (eau vs huile) et le support (papier vs toile), mais le principe optique est identique : la lumière traverse la couche colorée et rebondit sur le fond.',
    ]},
    { label: 'Aquarelle', title: 'Lavis à l\'aquarelle', paragraphs: [
      'Lavis plat : couleur uniforme sur toute une zone. Humidifier le papier si besoin pour un dépôt régulier. Incliner le papier pour éviter les marques de séchage.',
      'Lavis dégradé : voir la fiche dégradé. Le pigment s\'accumule naturellement en bas si le papier est incliné.',
      'Lavis superposés : attendre le séchage complet entre chaque couche. Le papier blanc + lavis 1 + lavis 2 crée une teinte composite que l\'on ne peut pas obtenir en un seul passage.',
      'Glaçure (glazing) : lavis très dilué sur une couleur déjà sèche pour modifier la teinte sans la masquer.',
    ]},
    { label: 'Encre', title: 'Lavis à l\'encre', paragraphs: [
      'Le lavis d\'encre (de Chine, Sepia) est une technique de dessin et d\'illustration. L\'encre diluée à l\'eau crée des valeurs du gris pâle au noir profond.',
      'Travailler du clair au foncé. Les zones blanches sont préservées (ou masquées au liquide de masquage). Chaque lavis assombrit progressivement.',
      'Le pinceau à lavis (large, plat) permet des aplats réguliers. Éviter de repasser sur une zone en cours de séchage — les marques restent visibles.',
    ]},
    { label: 'Huile', title: 'Lavis à l\'huile diluée', paragraphs: [
      'À l\'huile, le lavis se fait avec de la peinture diluée à l\'essence de térébenthine (couche maigre). La peinture doit être fluide, presque aqueuse.',
      'Utilisé pour les esquisses, les sous-couches et les premiers lavis de ciel. Sèche rapidement (24-48h) et permet de superposer des glacis plus gras ensuite.',
      'Respecter la règle du gras sur maigre : les lavis à l\'essence sont les plus maigres, ils constituent la base.',
    ]},
    { label: 'Erreurs', title: 'Pièges à éviter', paragraphs: [
      'Ne pas repasser sur un lavis en cours de séchage — les bords laissent des marques (coulures, bavures). Attendre ou travailler sur papier humide.',
      'Éviter un lavis trop chargé en pigment — il devient opaque et perd la luminosité. Mieux vaut plusieurs lavis légers.',
      'Ne pas oublier de préserver les blancs en aquarelle — planifier les zones à laisser vides dès le début.',
    ]},
  ],
}
