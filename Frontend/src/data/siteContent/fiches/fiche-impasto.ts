import type { Fiche } from '../types'

export const ficheImpasto: Fiche = {
  slug: 'impasto',
  title: 'L\'impasto',
  question: 'Qu\'est-ce que l\'impasto et comment le maîtriser ?',
  category: 'Technique',
  tool: 'Peinture à l\'huile / Acrylique',
  duration: '30 min',
  level: 'Intermédiaire',
  summary: 'Technique de peinture en relief où la matière est appliquée en couches épaisses. L\'impasto donne une présence physique à la peinture — les coups de brosse et de couteau deviennent des éléments sculpturaux.',
  tags: ['texture', 'relief', 'huile', 'acrylique', 'matière', 'Van Gogh', 'Rembrandt', 'couteau'],
  sections: [
    { label: 'Définition', title: 'Qu\'est-ce que l\'impasto ?', paragraphs: [
      'L\'impasto (de l\'italien impastare, "pétrir") consiste à appliquer la peinture en couche épaisse, directement sortie du tube ou très peu diluée. Contrairement aux techniques de glacis qui recherchent la transparence et la planéité, l\'impasto revendique la présence physique de la matière picturale. Les coups de brosse ou de couteau restent visibles et créent un relief tridimensionnel qui capte la lumière réelle de la pièce.',
      'L\'effet est double : d\'une part, la texture en relief crée des ombres portées microscopiques qui enrichissent la perception visuelle ; d\'autre part, la surface irrégulière accroche la lumière différemment selon l\'angle de vue, donnant au tableau une vie changeante au fil de la journée. C\'est cette qualité sculpturale qui distingue l\'impasto des techniques de peinture lisse.',
      'Physiquement, un impasto réussi repose sur trois facteurs : la viscosité de la peinture (qui doit tenir le relief sans s\'affaisser), l\'outil utilisé (brosse dure, couteau, spatule) et le geste du peintre (rapide et décidé). Une peinture trop liquide s\'étalera ; une peinture trop épaisse se craquellera en séchant.',
    ]},
    { label: 'Histoire', title: 'De Rembrandt à l\'expressionnisme abstrait', paragraphs: [
      'Rembrandt (1606-1669) est l\'un des premiers grands utilisateurs de l\'impasto. Il appliquait d\'épaisses couches de blanc de plomb pour les rehauts de lumière — cols de dentelle, reflets sur le métal, perles — qui semblent littéralement jaillir du tableau. Ses autoportraits tardifs montrent des empâtements si épais qu\'ils en deviennent presque abstraits vus de près.',
      'Vincent van Gogh (1853-1890) a poussé la technique à son paroxysme émotionnel. Dans "La Nuit étoilée" ou "Les Tournesols", chaque coup de pinceau est un événement. La peinture est appliquée en virgules épaisses qui suivent le mouvement de la main, créant un tourbillon d\'énergie. Van Gogh utilisait la peinture directement du tube, sans dilution, ce qui explique la fraîcheur et l\'immédiateté de sa touche.',
      'Au XXe siècle, l\'impasto devient un langage à part entière. Les expressionnistes abstraits américains — Jackson Pollock, Willem de Kooning, Franz Kline — utilisent des empâtements monumentaux. De Kooning appliquait la peinture au couteau en couches si épaisses qu\'elles mettaient des années à sécher complètement. Frank Auerbach, peintre britannique, construit ses portraits par accumulation de dizaines de couches d\'impasto, créant des surfaces presque sculpturales.',
    ]},
    { label: 'Outils', title: 'Les outils de l\'impasto', paragraphs: [
      'Le couteau à peindre est l\'outil roi de l\'impasto. Sa lame flexible en acier permet de prélever, d\'étaler et de sculpter la peinture comme du beurre. Les couteaux en forme de losange (pointe) sont les plus polyvalents. Les couteaux droits (spatule) conviennent aux grandes surfaces. La pression exercée, l\'angle de la lame et la vitesse du geste déterminent l\'aspect final de l\'empâtement.',
      'Les brosses dures en soie de porc sont idéales pour l\'impasto à l\'huile. Contrairement aux pinceaux souples en martre, elles permettent de déposer une charge importante de peinture et de travailler la matière sans s\'écraser. Les pinceaux éventails et les brosses à pocher créent des textures spécifiques (pointillés, stries).',
      'Les médiums d\'empâtement (gels, cires, médiums structurés) permettent d\'épaissir la peinture sans en altérer la couleur. Les gels acryliques existent en différentes viscosités (souple, lourd, extra-lourd) et peuvent être mélangés directement à la peinture. Pour l\'huile, les médiums oléo-résineux et les cires (medium de Venetia, cire d\'abeille) donnent du corps à la pâte.',
    ]},
    { label: 'Tutoriel', title: 'Tutoriel : peindre un paysage en impasto', paragraphs: [
      'Étape 1 — Préparer sa palette : disposer les couleurs en tas généreux. Pour l\'impasto, on consomme 3 à 5 fois plus de peinture que pour une technique classique.',
      'Étape 2 — Ébaucher les grandes masses avec une brosse large et de la peinture légèrement diluée. Cette sous-couche permet de ne pas avoir à couvrir la toile blanche en impasto.',
      'Étape 3 — Commencer par le fond (ciel, lointains) avec des empâtements modérés. Plus on avance vers le premier plan, plus on épaissit la matière.',
      'Étape 4 — Pour le premier plan, prélever la peinture au couteau et l\'étaler d\'un geste ferme. Ne pas hésiter à laisser des crêtes, des stries. Varier l\'angle du couteau pour créer différents effets.',
      'Étape 5 — Les rehauts de lumière se posent en dernier, en empâtement maximal. C\'est le blanc le plus épais qui captera la lumière réelle.',
      'Étape 6 — Laisser sécher plusieurs semaines. Ne jamais empiler du frais sur du sec en impasto — les couches se décolleraient.',
    ]},
    { label: 'Erreurs', title: 'Les erreurs à éviter', paragraphs: [
      'Erreur n°1 — Peinture trop diluée. L\'impasto exige une peinture peu ou pas diluée. Si la peinture coule, ce n\'est plus de l\'impasto.',
      'Erreur n°2 — Surcharger la toile. Un impasto trop épais (plus de 3-4 mm) peut ne jamais sécher complètement, ou se craqueler en séchant de l\'extérieur vers l\'intérieur.',
      'Erreur n°3 — Empâter sur une couche trop grasse. Respecter la règle du "gras sur maigre" même en impasto : les sous-couches doivent être plus maigres que les empâtements finaux.',
      'Erreur n°4 — Négliger la composition. L\'impasto attire l\'œil. Un empâtement mal placé déséquilibre le tableau. Réserver les plus forts reliefs aux points focaux.',
      'Erreur n°5 — Utiliser des pigments bon marché. Les pigments de faible qualité contiennent trop de charge (craie, baryte) et produisent des empâtements ternes et cassants.',
    ]},
    { label: 'Maîtres', title: 'Les grands maîtres de l\'impasto', paragraphs: [
      'Rembrandt — Le maître du clair-obscur empâté. Ses autoportraits tardifs (1659-1669) présentent des empâtements qui semblent jaillir de l\'obscurité.',
      'Van Gogh — L\'impasto comme expression émotionnelle. "La Nuit étoilée" (1889) est un tourbillon d\'empâtements qui donne vie au ciel.',
      'Frank Auerbach — L\'extrême de l\'accumulation. Ses portraits sont construits par superposition de dizaines de couches d\'impasto, créant des reliefs de plusieurs centimètres.',
      'Lucian Freud — L\'impasto au service de la chair. Ses nus présentent des empâtements qui restituent la texture même de la peau.',
      'Jackson Pollock — L\'impasto par projection. Ses drippings sont une forme d\'empâtement aérien où la peinture atterrit en couches superposées.',
    ]},
    { label: 'Conservation', title: 'Conservation des empâtements', paragraphs: [
      'Les empâtements à l\'huile peuvent mettre des années à sécher complètement. Un impasto de 5 mm peut rester mou au cœur pendant 5 à 10 ans. Ne jamais vernir un impasto avant séchage complet.',
      'La poussière est l\'ennemie des empâtements : elle s\'accumule dans les creux et les reliefs. Un dépoussiérage délicat au pinceau doux est recommandé une fois par an.',
      'Les craquelures de séchage sont normales dans les très forts empâtements. Elles font partie de l\'esthétique de la technique. Pour les éviter, ajouter un médium qui ralentit le séchage et améliore l\'élasticité du film.',
    ]},
  ],
}