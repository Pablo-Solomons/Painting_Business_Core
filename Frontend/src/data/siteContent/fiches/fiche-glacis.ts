import type { Fiche } from '../types'

export const ficheGlacis: Fiche = {
  slug: 'glacis',
  title: 'Le glacis',
  question: 'Qu\'est-ce que le glacis et comment le maîtriser ?',
  category: 'Technique',
  tool: 'Peinture à l\'huile',
  duration: '35 min',
  level: 'Intermédiaire',
  summary: 'Technique fondamentale de superposition de couches transparentes. Le glacis est l\'une des plus importantes techniques de la peinture à l\'huile, utilisée par les plus grands maîtres depuis le XVe siècle pour obtenir une profondeur et une luminosité inégalées.',
  tags: ['transparence', 'huile', 'couches', 'profondeur', 'médium', 'Van Eyck', 'Rembrandt', 'superposition'],
  sections: [
    { label: 'Définition', title: 'Principe optique du glacis', paragraphs: [
      'Un glacis est une couche de peinture très diluée, posée sur une couche déjà parfaitement sèche. Contrairement à une couche opaque qui masque ce qui se trouve en dessous, le glacis agit comme un filtre coloré translucide. La lumière traverse la couche supérieure, rebondit sur la couche inférieure et remonte vers l\'œil du spectateur — c\'est ce double trajet lumineux qui confère au glacis sa profondeur caractéristique.',
      'Physiquement, ce phénomène est comparable à celui d\'un vitrail : la lumière est partiellement absorbée et partiellement réfléchie à chaque interface air/peinture et peinture/sous-couche. Le résultat est une couleur composite que l\'on ne peut pas obtenir par simple mélange sur palette. Un rouge glacé sur un bleu ne donne pas du violet, mais un rouge profond vibrant que seul l\'œil peut percevoir dans toute sa complexité.',
      'Cette technique exploite le principe de la synthèse soustractive : chaque couche de glacis absorbe certaines longueurs d\'onde et en transmet d\'autres. En superposant des glacis de couleurs différentes, on peut créer des teintes d\'une richesse inouïe — c\'est ce qui explique la luminosité quasi surnaturelle des portraits de Van Eyck ou des natures mortes de Chardin.',
      'La différence fondamentale avec une couche opaque réside dans le fait que le glacis laisse lire la valeur et la texture sous-jacentes. C\'est un outil de nuance et de modulation, pas de couverture. Là où une couche opaque écrase ce qui se trouve en dessous, le glacis le sublime.',
    ]},
    { label: 'Histoire', title: 'Cinq siècles de glacis', paragraphs: [
      'L\'histoire du glacis est indissociable de celle de la peinture à l\'huile elle-même. Au début du XVe siècle, les frères Van Eyck perfectionnent la technique de la peinture à l\'huile en Flandre. Jan van Eyck, en particulier, pousse le glacis à un niveau de maîtrise inégalé. Son retable de L\'Agneau Mystique (1432) présente des glacis superposés qui donnent aux rouges et aux bleus une intensité jamais vue auparavant. Chaque couleur semble émettre sa propre lumière.',
      'Au XVIe siècle, les peintres vénitiens — Titien, Véronèse, Tintoret — adoptent et transforment la technique. Titien aurait superposé jusqu\'à trente glacis sur certaines zones de ses tableaux. Il utilisait des glacis chauds sur des fonds froids pour créer des carnations d\'une sensualité troublante. Sa technique, appelée "velatura" en italien, consistait à voiler progressivement la surface de couches toujours plus transparentes.',
      'Rubens, au XVIIe siècle, systématise l\'usage du glacis dans la peinture flamande baroque. Il applique des glacis sur des empâtements blancs pour créer des rehauts de lumière spectaculaires. Rembrandt, son contemporain hollandais, utilise le glacis de manière radicalement différente : il le pose sur des empâtements très épais (impasto) pour créer des effets de clair-obscur dramatiques où la lumière semble jaillir de l\'obscurité.',
      'Au XIXe siècle, les peintres académiques comme Ingres perpétuent la tradition du glacis pour la finition des portraits. Les Impressionnistes, en revanche, rejettent largement cette technique au profit de la touche directe et de la peinture alla prima. Mais au XXe siècle, les peintres réalistes et hyperréalistes redécouvrent le glacis pour sa capacité à produire des effets de profondeur photoréalistes.',
    ]},
    { label: 'Matériaux', title: 'Chimie et matériaux du glacis', paragraphs: [
      'Le choix du médium est crucial. Pour la peinture à l\'huile, l\'huile de lin clarifiée est le liant traditionnel. Elle jaunit légèrement avec le temps mais offre une excellente transparence. L\'huile de noix jaunit moins et était préférée par les grands maîtres pour les glacis clairs. L\'huile de carthame est encore plus stable mais plus coûteuse.',
      'Les résines naturelles comme la résine dammar ou la résine mastic sont souvent ajoutées au médium à glacis. Elles augmentent la brillance, la dureté du film et réduisent le temps de séchage. Un médium à glacis classique se compose d\'une part de résine dammar dissoute dans de l\'essence de térébenthine, mélangée à de l\'huile de lin standolie (pré-polymérisée par chauffage).',
      'Pour l\'acrylique, les médiums glacis sont à base de liant acrylique dilué dans de l\'eau avec des agents mouillants qui améliorent la fluidité. Ils permettent des transparences remarquables sans les problèmes de jaunissement de l\'huile. Le médium brillant acrylique dilué à 50% avec de l\'eau constitue un excellent glacis pour débuter.',
      'Le choix des pigments est tout aussi déterminant. Seuls certains pigments sont suffisamment transparents pour réaliser des glacis efficaces. Les pigments opaques (comme le blanc de titane, les cadmiums ou l\'ocre jaune) ne conviennent pas — ils produiraient un voile laiteux et non un glacis transparent. Les pigments idéaux pour le glacis sont les laques organiques (alizarine cramoisie, laque de garance, jaune indien), les phtalocyanines (bleu et vert), les terres naturelles (en couche très fine), le jaune de Naples, et le noir d\'ivoire (pour les glacis sombres).',
      'Une astuce de peintre confirmé : ajouter une micro-pointe de blanc de zinc (pas de titane !) dans un glacis peut le rendre légèrement laiteux tout en conservant sa transparence. Cela produit un effet vaporeux très utile pour les ciels et les lointains atmosphériques.',
    ]},
    { label: 'Préparation', title: 'Préparer la surface avant le glacis', paragraphs: [
      'La réussite d\'un glacis dépend à 50% de la qualité de la surface sous-jacente. La couche sur laquelle on glace doit être parfaitement sèche — au moins 48 heures pour l\'acrylique, et jusqu\'à 2 semaines pour l\'huile selon l\'épaisseur. Un test simple : poser le dos de la main sur la surface. Si elle est froide ou collante, elle n\'est pas sèche.',
      'La surface doit être impeccablement propre. La moindre poussière, le moindre cheveu sera piégé dans le glacis et restera visible. Nettoyer la surface avec un chiffon doux légèrement humide, ou mieux, avec un pinceau propre et sec. Les peintres professionnels travaillent dans un atelier soigneusement dépoussiéré avant une séance de glacis.',
      'Si la sous-couche présente des empâtements, le glacis va s\'accumuler dans les creux et glisser sur les reliefs. Cela peut produire un bel effet de vieillissement, mais pour un glacis uniforme, la surface doit être lisse. On peut poncer très légèrement au papier de verre grain 800 à 1200 pour égaliser la surface avant de glacer.',
    ]},
    { label: 'Tutoriel', title: 'Tutoriel pas à pas : réaliser son premier glacis', paragraphs: [
      'Étape 1 — Préparer le médium : dans un petit godet, mélanger 2 parts d\'huile de lin standolie avec 1 part d\'essence de térébenthine. Ajouter éventuellement 1/2 part de résine dammar dissoute pour plus de brillance.',
      'Étape 2 — Prélever une très petite quantité de couleur (l\'équivalent d\'un grain de riz) et la déposer sur la palette. Ajouter 5 à 10 fois son volume de médium. Le mélange doit ressembler à de l\'encre colorée, pas à de la peinture.',
      'Étape 3 — Charger un pinceau souple (martre ou synthétique doux) et l\'essorer légèrement sur un chiffon. Le pinceau doit être chargé mais pas dégoulinant.',
      'Étape 4 — Appliquer le glacis en une passe continue, sans revenir. Travailler dans un seul sens, de gauche à droite pour les droitiers. La couche doit être parfaitement uniforme.',
      'Étape 5 — Avec un pinceau propre et sec (un blaireau ou un pinceau éventail), tapoter très légèrement la surface pour éliminer les bulles d\'air et uniformiser la couche. Ne pas frotter, juste tamponner.',
      'Étape 6 — Laisser sécher 24 à 48 heures dans un endroit sans poussière, à température ambiante. Ne jamais accélérer le séchage avec un sèche-cheveux — cela ferait cloquer le glacis.',
      'Étape 7 — Évaluer le résultat. Si la teinte est trop faible, appliquer un second glacis identique après séchage complet. Trois glacis fins valent toujours mieux qu\'un seul épais.',
    ]},
    { label: 'Erreurs', title: 'Les 7 erreurs courantes du glacis', paragraphs: [
      'Erreur n°1 — Appliquer sur une couche pas assez sèche. Résultat : le glacis se mélange à la sous-couche et devient opaque. La transparence est perdue.',
      'Erreur n°2 — Utiliser trop de couleur. Un glacis doit être transparent. Si on voit la couleur du glacis avant de voir la sous-couche, il y a trop de pigment.',
      'Erreur n°3 — Revenir sur le glacis en cours de séchage. Dès que le glacis commence à "tirer" (devenir poisseux), il ne faut plus y toucher. Toute retouche créera des traces et des marbrures.',
      'Erreur n°4 — Utiliser des pigments opaques. Un glacis au blanc de titane n\'est pas un glacis, c\'est un voile. Réserver les pigments opaques pour les empâtements.',
      'Erreur n°5 — Appliquer un glacis trop épais. Plus un glacis est épais, plus il risque de craqueler en séchant. Les glacis épais jaunissent également davantage.',
      'Erreur n°6 — Négliger la règle du "gras sur maigre". Si la sous-couche est plus grasse que le glacis, le glacis va craqueler. Toujours ajouter plus de médium dans le glacis que dans la sous-couche.',
      'Erreur n°7 — Travailler dans un environnement poussiéreux. Chaque poussière sera emprisonnée dans le glacis et visible pour toujours.',
    ]},
    { label: 'Avancé', title: 'Glacis superposés : la maîtrise avancée', paragraphs: [
      'La superposition de glacis est l\'étape ultime de la maîtrise. Les grands maîtres superposaient couramment 5 à 10 glacis, parfois jusqu\'à 30 pour les zones de carnation les plus délicates. Chaque couche doit être parfaitement sèche avant la suivante.',
      'La règle d\'or de la superposition : commencer par les couleurs chaudes, terminer par les froides. Un glacis bleu sur un fond orangé crée une vibration optique que l\'on ne peut obtenir autrement. Les ombres des portraits de Rembrandt sont construites sur ce principe : fond chaud, glacis froid par-dessus.',
      'Pour contrôler la saturation, alterner des glacis de couleurs complémentaires. Un glacis vert sur un fond rouge assombrit et neutralise progressivement la teinte sans la rendre terne — contrairement à un mélange direct sur palette qui produirait un gris sale.',
      'La technique du "glacis à l\'essence" consiste à diluer la couleur uniquement dans de l\'essence de térébenthine, sans huile. Ces glacis ultra-maigres sèchent en quelques heures et peuvent être superposés rapidement. Ils sont parfaits pour les premières couches de glacis, mais doivent être suivis de glacis plus gras pour respecter la règle du "gras sur maigre".',
    ]},
    { label: 'Arts', title: 'Les grands maîtres du glacis', paragraphs: [
      'Jan van Eyck (1390-1441) — Le père du glacis à l\'huile. Ses portraits comme "L\'Homme au turban rouge" ou "Les Époux Arnolfini" présentent des glacis d\'une perfection technique jamais égalée. Chaque perle, chaque reflet sur le métal est construit par superposition de glacis transparents.',
      'Titien (1488-1576) — Le maître vénitien du glacis coloré. Sa technique de la "velatura" consistait à appliquer des glacis extrêmement dilués qui modifiaient subtilement la teinte sous-jacente sans jamais la masquer. Ses derniers tableaux, presque monochromes en dessous, sont entièrement construits par glacis.',
      'Rembrandt (1606-1669) — Le génie du glacis sur empâtement. Il appliquait d\'abord des empâtements très épais (parfois au couteau) puis les recouvrait de glacis transparents qui s\'accumulaient dans les creux. Cette technique produit un effet tridimensionnel saisissant où la lumière semble émaner de l\'intérieur de la peinture.',
      'Vermeer (1632-1675) — Le maître de la lumière diffuse. Ses intérieurs doivent leur luminosité exceptionnelle à des glacis superposés de bleu et de jaune qui créent une lumière douce et enveloppante. Sa "Jeune Fille à la perle" doit l\'éclat de sa perle à un unique glacis blanc sur fond gris.',
    ]},
    { label: 'Conservation', title: 'Conservation et vieillissement des glacis', paragraphs: [
      'Le principal ennemi des glacis est le jaunissement. L\'huile de lin jaunit naturellement avec le temps, surtout à l\'obscurité. Un glacis clair peut ainsi virer au jaune-brun en quelques décennies. C\'est pourquoi les restaurateurs utilisent aujourd\'hui des médiums synthétiques non jaunissants.',
      'Les glacis anciens sont extrêmement fragiles. Ils ne doivent jamais être nettoyés avec des solvants, sous peine de les dissoudre. La restauration des glacis est l\'une des opérations les plus délicates de la conservation de peinture.',
      'Pour protéger un glacis, appliquer un vernis final une fois le tableau parfaitement sec (6 à 12 mois pour l\'huile). Le vernis protège le glacis des poussières, des UV et des variations d\'humidité. Choisir un vernis réversible (à base de résine acrylique) pour permettre une restauration future.',
    ]},
  ],
}