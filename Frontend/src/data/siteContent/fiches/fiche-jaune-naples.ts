import type { Fiche } from '../types'

export const ficheJauneNaples: Fiche = {
  slug: 'jaune-naples',
  title: 'Jaune de Naples',
  question: 'Quand utiliser le jaune de Naples plutôt qu\'un jaune vif ?',
  category: 'Pigment',
  tool: 'Huile / Acrylique',
  duration: '16 min',
  level: 'Débutant',
  summary: 'Jaune doux, opaque et légèrement rosé, le jaune de Naples est le pigment des lumières chaudes en peinture de portrait et de nature morte. Ni criard ni terne, il capture la lumière diffuse sur la peau et les objets éclairés.',
  tags: ['jaune', 'opaque', 'lumière', 'portrait', 'chaud', 'carnation', 'doux'],
  pigmentCode: 'PBr24',
  swatch: ['#e8d4a8', '#edd9ad', '#f0dfb5', '#f4e6c0', '#f8edcc'],
  sections: [
    { label: 'Définition', title: 'La lumière en tube', paragraphs: [
      'Le jaune de Naples (PBr24) est un pigment opaque à teinte chaude, tirant vers le beige et le rose pâle. Contrairement au jaune cadmium ou au jaune primaire, il ne possède pas de vivacité agressive : sa douceur en fait le pigment idéal pour représenter la lumière naturelle sur les carnations, les drapés clairs et les natures mortes.',
      'Sa composition varie selon les fabricants : mélange de blanc, d\'ocre jaune et de rouge, ou pigment unique à base de chrome et d\'antimoine. Quelle que soit la formulation, le résultat optique est similaire — un jaune pâle, chaud et couvrant.',
      'Le jaune de Naples est semi-opaque à opaque selon la marque. Il couvre bien les sous-couches sombres, ce qui le rend pratique pour les rehauts de lumière en peinture de portrait.',
    ]},
    { label: 'Usage', title: 'Portrait et nature morte', paragraphs: [
      'En portrait, le jaune de Naples sert aux rehauts de lumière sur les pommettes, le front et le nez. Appliqué sur un fond de carnation rosé (mélange d\'ocre jaune, d\'alizarine et de blanc), il crée l\'illusion d\'une peau éclairée par une lumière douce.',
      'En nature morte, il représente la lumière sur les fruits clairs (poires, pommes jaunes), les tissus crème et les céramiques. Sa teinte chaude évite l\'effet « plastique » que donnerait un blanc pur.',
      'En paysage, le jaune de Naples unifie les zones de lumière chaude — sable, murs en pierre claire, champs de blé au soleil couchant. Mélangé à un peu d\'alizarine, il donne des roses pâles pour les nuages au crépuscule.',
    ]},
    { label: 'Mélanges', title: 'Associations utiles', paragraphs: [
      'Jaune de Naples + blanc de titane = lumières encore plus pâles pour les reflets extrêmes.',
      'Jaune de Naples + terre de Sienne = beiges chauds pour les fonds et les ombres portées légères.',
      'Jaune de Naples + alizarine (très peu) = roses chair pour les carnations en lumière directe.',
      'Jaune de Naples + bleu outremer (très peu) = gris verts pour les ombres douces en plein air.',
    ]},
    { label: 'Technique', title: 'Application et séchage', paragraphs: [
      'Le jaune de Naples s\'applique généralement en fin de travail, sur les zones de rehaut. Il peut être posé en empâtement léger pour les touches de lumière les plus intenses, ou en frottis pour les transitions douces.',
      'À l\'huile, il sèche en 3 à 5 jours selon l\'épaisseur. Éviter de glacer par-dessus un jaune de Naples frais — attendre la sécheresse complète.',
      'En acrylique, il sèche en minutes. Idéal pour les retouches rapides de lumière en fin de séance.',
    ]},
    { label: 'Erreurs', title: 'Ce qu\'il faut éviter', paragraphs: [
      'Ne pas utiliser le jaune de Naples pour les zones d\'ombre — il est trop clair et trop chaud. Réserver les terres (Sienne, ocre) pour les ombres.',
      'Éviter de le mélanger avec des bleus vifs en grande quantité — le mélange produit un gris verdâtre terne. Pour les ombres froides, utiliser l\'outremer en très petite quantité.',
      'Ne pas confondre jaune de Naples et ocre jaune : l\'ocre est plus foncé, plus transparent et plus adapté aux fonds.',
    ]},
  ],
}
