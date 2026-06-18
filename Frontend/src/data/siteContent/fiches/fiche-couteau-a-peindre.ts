import type { Fiche } from '../types'

export const ficheCouteau_a_peindre: Fiche = {
  slug: 'couteau-a-peindre',
  title: 'Couteau à peindre',
  question: 'Comment maîtriser le couteau à peindre ?',
  category: 'Outil',
  tool: 'Peinture à l\'huile / Acrylique',
  duration: '20 min',
  level: 'Intermédiaire',
  summary: 'Le couteau à peindre permet d\'appliquer la matière en relief, de mélanger sur la toile et de créer des textures impossibles au pinceau. De l\'empasto expressif aux glacis au couteau, c\'est l\'outil de la matière picturale.',
  tags: ['couteau', 'spatule', 'impasto', 'texture', 'relief', 'huile', 'matière'],
  sections: [
    { label: 'Définition', title: 'L\'outil de la matière', paragraphs: [
      'Le couteau à peindre est une lame flexible en acier montée sur une manche. Contrairement au pinceau qui dépose et étale, le couteau prélève, étale, gratte et sculpte la peinture. Il laisse des traces nettes et des reliefs caractéristiques.',
      'Les formes courantes : couteau losange (le plus polyvalent), couteau droit (spatule, pour les grandes surfaces), couteau rond (pour les courbes et les mélanges sur palette).',
      'Le couteau s\'utilise pour l\'impasto (matière épaisse), le frottis, le mélange direct sur la toile et parfois pour les glacis (lame chargée et essorée).',
    ]},
    { label: 'Techniques', title: 'Gestes et effets', paragraphs: [
      'Empâtement : prélever la peinture épaisse du tube, l\'étaler d\'un geste ferme. Varier l\'angle et la pression pour des crêtes, des stries ou des aplats.',
      'Frottis : étaler une couche mince semi-opaque sur une sous-couche. Le couteau crée des textures régulières et des transitions douces.',
      'Mélange sur toile : poser deux couleurs côte à côte et les mélanger directement sur le support avec la lame. Produit des transitions vibrantes.',
      'Grattage (sgraffito) : gratter la peinture fraîche pour révéler la couche inférieure. Effet graphique et expressif.',
    ]},
    { label: 'Histoire', title: 'De Courbet à l\'abstraction', paragraphs: [
      'Gustave Courbet (1819-1877) est l\'un des premiers à utiliser systématiquement le couteau pour ses paysages. Sa matière épaisse et ses coups de lame visibles annoncent l\'impressionnisme.',
      'Vincent van Gogh a poussé le couteau à un niveau d\'expressivité extrême. Ses empâtements tourbillonnants dans « La Nuit étoilée » sont presque sculpturaux.',
      'Les expressionnistes abstraits — de Kooning, Auerbach — ont fait du couteau l\'outil principal d\'une peinture où la matière est le sujet.',
    ]},
    { label: 'Choix', title: 'Sélectionner son couteau', paragraphs: [
      'Lame souple pour l\'huile et les mélanges délicats. Lame rigide pour l\'acrylique et les empâtements épais.',
      'Un couteau losange n°18-22 (5-7 cm) convient à la plupart des usages. Compléter avec une spatule large pour les fonds.',
      'Nettoyer immédiatement après usage — la peinture sèche sur la lame et devient difficile à retirer.',
    ]},
    { label: 'Erreurs', title: 'Pièges à éviter', paragraphs: [
      'Ne pas surcharger la lame — un excès de peinture coule et crée des effets boueux. Prélever par petites quantités.',
      'Éviter de mélanger des couleurs opposées directement sur la toile en grande quantité — le mélange produit souvent un gris terne.',
      'Ne pas utiliser un couteau émoussé ou cabossé — la lame doit rester lisse pour des effets nets.',
    ]},
  ],
}
