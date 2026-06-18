import type { Fiche } from '../types'

export const ficheTerreSienne: Fiche = {
  slug: 'terre-sienne',
  title: 'Terre de Sienne',
  question: 'Quelle différence entre Sienne naturelle et Sienne brûlée ?',
  category: 'Pigment',
  tool: 'Huile / Acrylique / Aquarelle',
  duration: '18 min',
  level: 'Débutant',
  summary: 'Pigment naturel aux teintes chaudes, la terre de Sienne existe en version naturelle (jaune-brun) et brûlée (rouge-brun). Indispensable pour les fonds, les ombres et les carnations, c\'est l\'un des pigments les plus polyvalents de la palette.',
  tags: ['terre', 'chaud', 'ombre', 'fond', 'brun', 'naturel', 'polyvalent'],
  pigmentCode: 'PBr7',
  swatch: ['#8b5a2b', '#a06830', '#b87838', '#c88848', '#d8a060'],
  sections: [
    { label: 'Définition', title: 'Deux terres complémentaires', paragraphs: [
      'La terre de Sienne naturelle (PBr7) est un pigment brun-jaune, semi-transparent, extrait de gisements d\'argile colorée. Sa teinte rappelle la terre de la région de Sienne en Toscane, d\'où son nom. Semi-opaque et chaude, elle sert principalement aux fonds et aux ombres légères.',
      'La terre de Sienne brûlée (PBr7 calcinée) est obtenue par chauffage de la Sienne naturelle, qui transforme l\'hydrate de fer en oxyde de fer rouge. Le résultat est un brun-rouge plus foncé et plus chaud, idéal pour les ombres profondes et les carnations.',
      'Les deux versions sont stables à la lumière, non toxiques et sèchent rapidement à l\'huile. Elles constituent souvent les premiers pigments qu\'un peintre ajoute à sa palette, avant même les couleurs vives.',
    ]},
    { label: 'Histoire', title: 'Un pigment universel', paragraphs: [
      'Les terres de Sienne sont utilisées depuis l\'Antiquité. Les Romains les employaient pour les fresques et les décorations murales. Au Moyen Âge et à la Renaissance, elles figurent sur toutes les palettes des ateliers flamands et italiens.',
      'Les peintres de la Renaissance — Léonard de Vinci, Michel-Ange, Raphaël — utilisaient abondamment la Sienne naturelle pour les dessins préparatoires (sinopia) et les fonds de fresques. La Sienne brûlée servait aux ombres des carnations et aux drapés bruns.',
      'Rembrandt et les peintres hollandais du XVIIe siècle ont poussé l\'usage de la terre de Sienne à un niveau de raffinement extrême. Rembrandt construisait ses portraits entièrement à partir de terres, de noirs et de blancs, n\'ajoutant les couleurs vives qu\'en finition.',
    ]},
    { label: 'Usage', title: 'Applications pratiques', paragraphs: [
      'Sienne naturelle : fonds de carnation, sous-couches de paysage, esquisses et dessins à l\'huile. Mélangée à du blanc, elle donne des beiges chauds. Avec du bleu outremer, des gris chauds pour les ombres légères.',
      'Sienne brûlée : ombres des carnations, drapés bruns, bois, terre. Mélangée à de l\'alizarine, elle produit des rouges profonds. Avec du vert émeraude, des bruns verdâtres pour les troncs et les zones d\'ombre forestière.',
      'Les deux Sienne s\'utilisent en glacis, en frottis ou en couche opaque selon la dilution. Leur séchage rapide à l\'huile en fait des pigments pratiques pour les sous-couches.',
    ]},
    { label: 'Mélanges', title: 'Recettes de base', paragraphs: [
      'Sienne naturelle + blanc = beiges et crèmes pour les fonds clairs.',
      'Sienne brûlée + alizarine = rouges brique et ombres chaudes de carnation.',
      'Sienne brûlée + bleu outremer = gris chauds et bruns profonds pour les ombres.',
      'Sienne naturelle + ocre jaune = fonds de paysage unifiés et chauds.',
    ]},
    { label: 'Erreurs', title: 'Pièges à éviter', paragraphs: [
      'Ne pas utiliser la Sienne brûlée seule pour les carnations — elle est trop rouge et trop foncée. Toujours la nuancer avec de l\'ocre jaune, du blanc ou de l\'alizarine.',
      'Éviter de confondre Sienne naturelle et ocre jaune : la Sienne est plus brune et plus transparente.',
      'Ne pas surcharger les mélanges de Sienne brûlée — elle domine rapidement et assombrit les couleurs vives.',
    ]},
  ],
}
