import type { Fiche } from '../types'

export const ficheSfumato: Fiche = {
  slug: 'sfumato',
  title: 'Le sfumato',
  question: 'Qu\'est-ce que le sfumato et comment le pratiquer ?',
  category: 'Technique',
  tool: 'Peinture à l\'huile',
  duration: '28 min',
  level: 'Avancé',
  summary: 'L\'art du flou léonardien. Le sfumato est l\'une des techniques les plus subtiles de l\'histoire de la peinture — estomper les contours jusqu\'à les faire disparaître dans une brume douce.',
  tags: ['flou', 'dégradé', 'huile', 'portrait', 'Léonard', 'Renaissance', 'estompage'],
  sections: [
    { label: 'Définition', title: 'Qu\'est-ce que le sfumato ?', paragraphs: [
      'Le mot sfumato vient de l\'italien "fumo" (fumée) et du verbe "sfumare" (s\'évaporer, se dissiper comme de la fumée). En peinture, il désigne la technique qui consiste à estomper les contours et les transitions entre les tons de manière si subtile qu\'aucune ligne ou bordure nette n\'est perceptible. Le passage de la lumière à l\'ombre se fait de façon continue, sans rupture.',
      'Léonard de Vinci décrivait lui-même le sfumato comme "sans lignes ni contours, à la façon de la fumée". Il considérait que la nature ne connaît pas de lignes — les contours nets sont une abstraction de l\'esprit humain. Le sfumato vise à restituer la perception naturelle où les formes se fondent les unes dans les autres.',
      'Sur le plan optique, le sfumato exploite le principe de la diffraction de la lumière aux bords des objets. Dans la réalité, aucun contour n\'est parfaitement net — il existe toujours une zone de transition, infime mais réelle. Le sfumato amplifie délibérément cette zone de transition pour créer une atmosphère de mystère et de douceur.',
      'Le sfumato se distingue du simple dégradé par son intention : là où le dégradé est une transition mécanique entre deux valeurs, le sfumato est une dissolution progressive de la forme elle-même dans l\'espace qui l\'entoure.',
    ]},
    { label: 'Histoire', title: 'Léonard et le sfumato', paragraphs: [
      'Léonard de Vinci (1452-1519) est l\'inventeur et le maître absolu du sfumato. Il a passé des années à développer cette technique, étudiant l\'optique, la perception visuelle et la manière dont la lumière se diffuse dans l\'atmosphère. Ses carnets contiennent de nombreuses notes sur la "perspective aérienne" — l\'idée que les objets lointains apparaissent plus flous et plus bleutés à cause de l\'atmosphère interposée.',
      'La Joconde (1503-1519) est l\'exemple le plus célèbre de sfumato. Le sourire de Mona Lisa doit son mystère à l\'absence totale de contour net autour des lèvres et des yeux. Les coins de la bouche se fondent dans la chair environnante, rendant l\'expression insaisissable. C\'est cette ambiguïté visuelle qui fascine depuis cinq siècles.',
      'Dans La Vierge aux rochers (1483-1486), le sfumato est utilisé pour créer une atmosphère mystique dans la grotte. Les personnages émergent doucement de l\'obscurité, leurs contours se dissolvant dans la pénombre du fond rocheux.',
      'Après Léonard, le sfumato a été adopté par ses élèves (Bernardino Luini, Giovanni Antonio Boltraffio) puis par Corrège et Raphaël. Au XVIIe siècle, le Caravage utilise un sfumato dramatique dans ses clairs-obscurs. Au XIXe siècle, les Symbolistes comme Odilon Redon redécouvrent le sfumato pour ses qualités oniriques.',
    ]},
    { label: 'Technique', title: 'Comment réaliser un sfumato', paragraphs: [
      'Le sfumato se pratique exclusivement sur une surface encore fraîche ou semi-sèche. La peinture doit pouvoir se travailler, se fondre, s\'estomper sans laisser de traces. C\'est pourquoi il est traditionnellement associé à la peinture à l\'huile, dont le temps de séchage lent permet de longues séances de travail.',
      'Le pinceau blaireau est l\'outil de prédilection. Ses poils extrêmement doux permettent d\'estomper sans rayer la surface. On peut aussi utiliser un doigt propre (technique traditionnelle des peintres de la Renaissance), un chiffon doux, ou un pinceau éventail sec.',
      'La superposition de glacis ultra-fins est la deuxième composante essentielle. Chaque glacis atténue le contraste de la couche précédente. Après 5 à 10 glacis successifs, les transitions deviennent imperceptibles. C\'est un travail de patience : Léonard aurait passé des mois sur le seul visage de La Joconde.',
    ]},
    { label: 'Tutoriel', title: 'Tutoriel : sfumato sur un portrait', paragraphs: [
      'Étape 1 — Établir le dessin et les valeurs principales en grisaille légère. Les traits doivent être précis mais pas trop marqués.',
      'Étape 2 — Modeler les volumes avec des glacis de gris et de terre, en veillant à ne jamais créer de contour dur.',
      'Étape 3 — Travailler les transitions avec un blaireau sec. Tapoter doucement la zone de jonction entre deux valeurs.',
      'Étape 4 — Pour les zones d\'ombre profonde (orbites, commissures), estomper vers l\'extérieur. L\'ombre doit sembler s\'évaporer dans la lumière.',
      'Étape 5 — Évaluer le résultat à distance. Le sfumato se juge à 2-3 mètres, pas le nez sur la toile.',
    ]},
    { label: 'Erreurs', title: 'Les erreurs à éviter', paragraphs: [
      'Erreur n°1 — Trop estomper. Un sfumato excessif donne un effet "flou de bougé" peu flatteur. Les formes doivent rester lisibles.',
      'Erreur n°2 — Travailler sur une couche déjà sèche. L\'estompage sur le sec crée des traces et des marbrures impossibles à rattraper.',
      'Erreur n°3 — Négliger le dessin sous-jacent. Le sfumato adoucit, il ne corrige pas. Un mauvais dessin restera mauvais, même flouté.',
      'Erreur n°4 — Utiliser des pinceaux sales. La moindre trace de couleur parasite sera étalée sur toute la zone estompée.',
    ]},
  ],
}