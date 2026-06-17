import type { Fiche } from '../types'

export const ficheGrisaille: Fiche = {
  slug: 'grisaille',
  title: 'La grisaille',
  question: 'Comment peindre une grisaille et pourquoi l\'utiliser ?',
  category: 'Technique',
  tool: 'Tous médiums',
  duration: '25 min',
  level: 'Intermédiaire',
  summary: 'Art du monochrome préparatoire. La grisaille est la fondation invisible des plus grands chefs-d\'œuvre — une peinture en nuances de gris qui sert de squelette aux glacis colorés.',
  tags: ['monochrome', 'gris', 'sous-couche', 'valeurs', 'préparation', 'glacis'],
  sections: [
    { label: 'Définition', title: 'Qu\'est-ce que la grisaille ?', paragraphs: [
      'La grisaille (du français "gris") est une peinture exécutée intégralement en nuances de gris — noir, blanc, et tous leurs mélanges intermédiaires. Elle constitue une étape préparatoire fondamentale dans la technique de peinture par couches successives (glacis).',
      'Son rôle est double : d\'une part, établir le dessin et la composition ; d\'autre part, définir précisément toutes les valeurs lumineuses du tableau, des ombres les plus profondes aux lumières les plus éclatantes. Une fois la grisaille achevée et sèche, les couleurs sont appliquées par-dessus sous forme de glacis transparents.',
      'Cette séparation radicale entre le travail de la valeur (grisaille) et celui de la couleur (glacis) est l\'une des grandes inventions de la peinture occidentale. Elle permet au peintre de résoudre tous les problèmes de dessin et de modelé avant même de se préoccuper de la couleur.',
    ]},
    { label: 'Histoire', title: 'La grisaille à travers les siècles', paragraphs: [
      'Les Flamands du XVe siècle (Van Eyck, Van der Weyden, Memling) utilisaient systématiquement la grisaille comme sous-couche. Leurs tableaux étaient d\'abord entièrement peints en valeurs de gris, puis colorés par glacis. Cette méthode explique la perfection de leur modelé.',
      'En Italie, les peintres de fresques utilisaient une variante appelée "verdaccio" — une grisaille teintée de vert (terre verte) qui servait de sous-couche pour les carnations. Cette teinte verdâtre, transparente sous les glacis roses et ocres, produisait des chairs d\'un réalisme saisissant.',
      'Au XVIIe siècle, Rubens systématise la grisaille dans son atelier. Ses esquisses à l\'huile (les "modelli") sont souvent de pures grisailles, destinées à être présentées au commanditaire avant l\'exécution du tableau définitif en couleurs.',
      'La grisaille n\'est pas qu\'une étape préparatoire : certains artistes en ont fait une fin en soi. Les volets extérieurs des retables flamands sont souvent peints en grisaille pour imiter la sculpture de pierre (trompe-l\'œil). Au XXe siècle, Picasso a réalisé son chef-d\'œuvre "Guernica" (1937) en quasi-grisaille.',
    ]},
    { label: 'Palette', title: 'La palette de la grisaille', paragraphs: [
      'La palette classique se compose de : blanc de titane, noir d\'ivoire, et éventuellement une terre d\'ombre ou une terre de Sienne pour réchauffer légèrement les gris. Éviter le noir de vigne (trop bleuté) qui donne des gris froids peu flatteurs.',
      'Certains peintres ajoutent une pointe de bleu (outremer) et de brun (terre de Sienne brûlée) dans leur grisaille pour obtenir des gris colorés plus subtils. Cette "grisaille colorée" offre plus de richesse à l\'étape du glacis.',
      'Pour la grisaille acrylique, le noir de Mars (PBk11) est recommandé car il est plus neutre que le noir d\'ivoire. Le médium mat permet de contrôler la brillance et d\'obtenir une surface idéale pour les glacis ultérieurs.',
    ]},
    { label: 'Tutoriel', title: 'Tutoriel : peindre une nature morte en grisaille', paragraphs: [
      'Étape 1 — Établir un dessin précis au fusain ou au crayon sur la toile apprêtée. Fixer le dessin.',
      'Étape 2 — Préparer 5 valeurs de gris sur la palette : blanc pur, gris clair, gris moyen, gris foncé, noir. C\'est la gamme de valeurs qui servira pour tout le tableau.',
      'Étape 3 — Poser les grandes masses : fond en gris moyen, ombres en gris foncé, lumières en blanc. Ne pas détailler à ce stade.',
      'Étape 4 — Modeler les volumes en travaillant les transitions entre les valeurs. Le pinceau doit être propre pour fondre les passages.',
      'Étape 5 — Ajouter les détails fins (reflets, textures) en dernier, avec les valeurs extrêmes (blanc pur, noir).',
      'Étape 6 — Laisser sécher complètement (48h minimum) avant d\'appliquer le premier glacis de couleur.',
    ]},
    { label: 'Erreurs', title: 'Erreurs à éviter', paragraphs: [
      'Erreur n°1 — Empâter la grisaille. Elle doit rester fine et lisse, sinon les glacis s\'accumuleront dans les creux et glisseront sur les bosses.',
      'Erreur n°2 — Utiliser des contrastes excessifs. La grisaille doit couvrir toute la gamme des valeurs, mais sans aller jusqu\'au blanc pur partout — réserver les extrêmes aux points focaux.',
      'Erreur n°3 — Ne pas laisser sécher assez longtemps. Un glacis sur une grisaille encore fraîche se mélange et perd sa transparence.',
    ]},
  ],
}