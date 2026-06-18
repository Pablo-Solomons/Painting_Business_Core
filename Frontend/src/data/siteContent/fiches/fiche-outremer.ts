import type { Fiche } from '../types'

export const ficheOutremer: Fiche = {
  slug: 'outremer',
  title: 'Outremer',
  question: 'Pourquoi l\'outremer reste-t-il le roi des bleus en peinture ?',
  category: 'Pigment',
  tool: 'Huile / Acrylique / Aquarelle',
  duration: '22 min',
  level: 'Intermédiaire',
  summary: 'Pigment semi-transparent d\'une profondeur inégalée, l\'outremer (lapis-lazuli) a été pendant des siècles plus précieux que l\'or. Aujourd\'hui synthétisé mais toujours irremplaçable, il est le bleu de référence pour les ombres, les ciels et les glacis.',
  tags: ['bleu', 'semi-transparent', 'glacis', 'froid', 'profond', 'ciel', 'ombre'],
  pigmentCode: 'PB29',
  swatch: ['#1a2a5e', '#243a78', '#2e4a92', '#3a5caa', '#4a70c0'],
  sections: [
    { label: 'Définition', title: 'Le bleu le plus profond', paragraphs: [
      'L\'outremer (bleu d\'ultramarine, PB29) est un pigment semi-transparent à teinte rougeâtre, ce qui signifie qu\'il tire légèrement vers le violet plutôt que vers le vert. Cette qualité le distingue du bleu de Prusse (plus froid et vert) et du bleu phtalo (plus vif et transparent).',
      'Sa semi-transparence en fait un pigment de choix pour les glacis, les ombres et les ciels. Appliqué en couche épaisse, il est modérément opaque ; dilué, il laisse transparaître la sous-couche tout en imprégnant la surface d\'une teinte bleue profonde et chaleureuse.',
      'L\'outremer naturel, extrait du lapis-lazuli, est aujourd\'hui rare et très coûteux. L\'outremer synthétique, inventé en 1826, reproduit fidèlement ses propriétés optiques à une fraction du prix.',
    ]},
    { label: 'Histoire', title: 'Plus précieux que l\'or', paragraphs: [
      'Le lapis-lazuli était importé d\'Afghanistan (Badakhchan) dès l\'Antiquité. Les Égyptiens l\'utilisaient pour les parures ; les Byzantins pour les fonds dorés des icônes. Au Moyen Âge, l\'outremer naturel coûtait jusqu\'à cinq fois le prix de l\'or — seuls les tableaux les plus importants pouvaient se l\'offrir.',
      'La Vierge Marie, vêtue de bleu outremer dans des milliers de tableaux médiévaux et de la Renaissance, témoigne de la valeur symbolique et matérielle de ce pigment. Raphaël, Véronèse et Giotto réservaient l\'outremer aux zones les plus sacrées de leurs compositions.',
      'L\'invention de l\'outremer synthétique par le chimiste français Jean-Baptiste Guimet en 1826 démocratisa ce bleu extraordinaire. Dès les années 1830, tous les peintres pouvaient enfin utiliser l\'outremer sans contrainte budgétaire.',
    ]},
    { label: 'Usage', title: 'Applications en peinture', paragraphs: [
      'L\'outremer est le pigment idéal pour les ombres froides en peinture de portrait et de figure. Mélangé à de l\'alizarine ou de la terre de Sienne, il produit des violets et des bruns profonds pour les zones d\'ombre des carnations.',
      'Pour les ciels, l\'outremer dilué en glacis sur un fond blanc ou ocra donne des bleus atmosphériques d\'une grande douceur. Les peintres impressionnistes l\'utilisaient abondamment pour les ombres des nuages et les reflets dans l\'eau.',
      'En mélange avec de l\'ocre jaune, il donne des verts naturels et terreux. Avec du blanc de titane, il produit des bleus ciel. Avec de l\'alizarine, des violets profonds pour les drapés et les fleurs.',
    ]},
    { label: 'Technique', title: 'Glacis et superpositions', paragraphs: [
      'L\'outremer excelle en glacis superposés. Une première couche d\'outremer dilué sur un fond chaud (ocre jaune ou terre de Sienne) crée une profondeur impossible à obtenir par mélange direct. Chaque couche supplémentaire intensifie la teinte sans la rendre opaque.',
      'Pour les ciels au coucher du soleil, superposer un glacis d\'outremer sur un fond d\'alizarine ou de terre de Sienne brute produit des violets et des bleus profonds d\'une grande poésie.',
      'Attention à la règle du « gras sur maigre » : les glacis d\'outremer doivent être plus gras (plus de liant) que les sous-couches pour éviter les craquelures.',
    ]},
    { label: 'Erreurs', title: 'Pièges courants', paragraphs: [
      'Ne pas utiliser l\'outremer pur pour les grandes surfaces de ciel — sa teinte rougeâtre peut paraître violette. Le nuancer avec un peu de blanc ou l\'appliquer en glacis sur un fond adapté.',
      'Éviter de le mélanger avec du jaune cadmium vif — le mélange produit un vert terne. Préférer l\'ocre jaune pour obtenir des verts naturels.',
      'Ne pas confondre outremer (PB29, semi-transparent, chaud) et bleu de Prusse (PB27, transparent, froid) — leurs usages sont complémentaires mais distincts.',
    ]},
  ],
}
