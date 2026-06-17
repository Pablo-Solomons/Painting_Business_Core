export type FicheSection = {
  label: string
  title: string
  paragraphs: string[]
}

export type Fiche = {
  slug: string
  title: string
  question: string
  category: string
  tool: string
  duration: string
  level: string
  summary: string
  tags: string[]
  sections: FicheSection[]
  pigmentCode?: string
  swatch?: string[]
}

export type RoadmapStep = {
  title: string
  description: string
  ficheSlugs: string[]
}

export type Roadmap = {
  slug: string
  title: string
  audience: string
  duration: string
  level: string
  summary: string
  steps: RoadmapStep[]
}

export type ThemeVariant = {
  slug: string
  name: string
  description: string
  background: string
  accent: string
}

export const publicNav = [
  { label: 'Accueil', to: '/' },
  { label: 'Fiches', to: '/fiches' },
  { label: 'Roadmaps', to: '/roadmaps' },
  { label: 'Catégories', to: '/categories' },
  { label: 'Techniques', to: '/techniques' },
  { label: 'Œuvres', to: '/oeuvres' },
  { label: 'Connexion', to: '/connexion' },
]

export const heroStats = [
  { value: '320+', label: 'Fiches' },
  { value: '48', label: 'Roadmaps guidées' },
  { value: '1 200', label: 'Membres actifs' },
]

export const categories = [
  {
    title: 'Peinture',
    description: 'Gouache, acrylique, huile et mélanges de médiums.',
    metric: '14 univers',
  },
  {
    title: 'Supports',
    description: 'Papier, toile, bois, carton et préparation des fonds.',
    metric: '9 familles',
  },
  {
    title: 'Pigments',
    description: 'Couleurs, transparence, opacité et stabilité lumineuse.',
    metric: '28 fiches',
  },
  {
    title: 'Médiums',
    description: 'Textures, siccatifs, diluants et gels de travail.',
    metric: '12 usages',
  },
  {
    title: 'Communauté',
    description: 'Itinéraires, partages de tests et retours d’atelier.',
    metric: '100% vivant',
  },
]

export const fiches: Fiche[] = [
  {
    slug: 'glacis',
    title: 'Le glacis',
    question: 'Qu’est-ce que le glacis ?',
    category: 'Technique',
    tool: 'Peinture à l’huile',
    duration: '12 min',
    level: 'Intermédiaire',
    summary: 'Couche transparente de couleur posée sur un séchage pour modifier la teinte sans masquer les valeurs.',
    tags: ['transparence', 'huile', 'couches'],
    sections: [
      {
        label: 'Définition',
        title: 'Principe du glacis',
        paragraphs: [
          'Un glacis est une couche de peinture très diluée, posée sur une couche déjà sèche. La lumière traverse la couche supérieure, rebondit sur celle du dessous et remonte — d’où la profondeur caractéristique.',
          'Contrairement à un voile opaque, le glacis laisse lire la valeur et la texture sous-jacentes. C’est un outil de nuance, pas de couverture.',
        ],
      },
      {
        label: 'Pratique',
        title: 'Comment l’appliquer',
        paragraphs: [
          'Attendre que la couche inférieure soit bien sèche (au toucher, sans transfert). Diluer la couleur avec un médium adapté — huile de lin pour l’huile, medium glacis pour l’acrylique.',
          'Appliquer en passes légères avec un pinceau souple. Plusieurs glacis fins valent mieux qu’une couche épaisse qui risque de craqueler.',
        ],
      },
    ],
  },
  {
    slug: 'huile-de-lin',
    title: 'Huile de lin',
    question: 'À quoi sert l’huile de lin en peinture ?',
    category: 'Médium',
    tool: 'Peinture à l’huile',
    duration: '15 min',
    level: 'Débutant',
    summary: 'Base d’un liant classique pour enrichir la pâte et ralentir le séchage.',
    tags: ['liant', 'glacis', 'huile'],
    sections: [
      {
        label: 'Rôle',
        title: 'Liant et médium',
        paragraphs: [
          'L’huile de lin clarifiée sert de liant dans la peinture à l’huile : elle suspend les pigments, facilite l’étalement et retarde le séchage par oxydation.',
          'Utilisée seule ou en mélange, elle permet d’ajuster la fluidité de la pâte et de réaliser des glacis transparents.',
        ],
      },
      {
        label: 'Usage',
        title: 'Bonnes pratiques',
        paragraphs: [
          'Ajouter le médium par petites quantités — trop d’huile rend la couche grasse et favorise les craquelures.',
          'Respecter la règle « gras sur maigre » : chaque couche successives contient un peu plus de liant que la précédente.',
        ],
      },
    ],
  },
  {
    slug: 'gesso-acrylique',
    title: 'Gesso acrylique',
    question: 'Comment préparer une toile avec du gesso ?',
    category: 'Support',
    tool: 'Préparation de toile',
    duration: '20 min',
    level: 'Débutant',
    summary: 'Sous-couche pour uniformiser l’absorption et sécuriser le fond.',
    tags: ['apprêt', 'toile', 'fond'],
    sections: [
      {
        label: 'Préparation',
        title: 'Appliquer le gesso',
        paragraphs: [
          'Poncer légèrement le support brut pour favoriser l’accroche, puis dépoussiérer.',
          'Appliquer deux à trois couches croisées (horizontal puis vertical), en laissant sécher entre chaque passage.',
        ],
      },
      {
        label: 'Finition',
        title: 'Après séchage',
        paragraphs: [
          'Une fois sec, poncer très légèrement à grain fin pour obtenir une surface lisse et uniforme.',
          'Le gesso blanc crée un fond réfléchissant qui fait ressortir les couleurs transparentes posées par-dessus.',
        ],
      },
    ],
  },
  {
    slug: 'blanc-titane',
    title: 'Blanc titane',
    question: 'Pourquoi utiliser le blanc de titane ?',
    category: 'Pigment',
    tool: 'Acrylique / huile',
    duration: '10 min',
    level: 'Intermédiaire',
    summary: 'Blanc couvrant utile pour les mélanges opaques et les rehauts.',
    tags: ['opacité', 'rehaut', 'mélange'],
    pigmentCode: 'PW6',
    swatch: ['#f7f4ef', '#f0ebe4', '#e5ddd1', '#d8cbb7', '#c2b29b'],
    sections: [
      {
        label: 'Propriétés',
        title: 'Un blanc de référence',
        paragraphs: [
          'Le blanc de titane (dioxyde de titane) offre la plus forte opacité parmi les blancs courants. Il est stable à la lumière et non toxique.',
          'Il sert aux rehauts, aux mélanges clairs et à la correction de valeurs trop sombres — avec parcimonie pour ne pas « ternir » les couleurs.',
        ],
      },
    ],
  },
  {
    slug: 'imprimature',
    title: 'Imprimature',
    question: 'Qu’est-ce qu’une imprimature ?',
    category: 'Support',
    tool: 'Ébauche',
    duration: '25 min',
    level: 'Intermédiaire',
    summary: 'Teinte de fond qui donne une valeur moyenne et guide les ombres.',
    tags: ['fond', 'valeur', 'croquis'],
    sections: [
      {
        label: 'Principe',
        title: 'Valeur moyenne',
        paragraphs: [
          'L’imprimature est une couche de couleur diluée posée sur le gesso. Elle établit une valeur moyenne — ni trop claire, ni trop sombre — sur laquelle construire le tableau.',
          'Les zones laissées visibles deviennent des demi-teintes ; les rehauts et ombres se posent par-dessus.',
        ],
      },
      {
        label: 'Pratique',
        title: 'Poser l’imprimature',
        paragraphs: [
          'Choisir une teinte selon l’ambiance recherchée : terre de Sienne pour la chaleur, gris neutre pour un fond froid.',
          'Essuyer les zones lumineuses avec un chiffon avant séchage pour préserver des réserves claires.',
        ],
      },
    ],
  },
  {
    slug: 'bleu-de-prusse',
    title: 'Bleu de Prusse',
    question: 'Qu’est-ce que le Bleu de Prusse ?',
    category: 'Pigment',
    tool: 'Tous médiums',
    duration: '15 min',
    level: 'Intermédiaire',
    summary: 'Pigment bleu intense à base de ferrocyanure ferreux, incontournable depuis le XVIIIe siècle.',
    tags: ['Semi-transparent', 'Stable', 'Glacis'],
    pigmentCode: 'PB27',
    swatch: ['#0a1f35', '#1a3a5c', '#2a5580', '#3d729e', '#5a90b8'],
    sections: [
      {
        label: 'Description',
        title: 'Histoire & caractéristiques',
        paragraphs: [
          'Le Bleu de Prusse est l’un des premiers pigments bleus synthétiques. Découvert accidentellement à Berlin vers 1704, il a révolutionné la peinture européenne.',
          'Chimiquement, il s’agit d’un ferrocyanure ferreux. Son bleu intense tire vers le vert ou le violet selon la dilution — idéal pour les glacis et les ombres profondes.',
        ],
      },
      {
        label: 'Propriétés techniques',
        title: 'Tableau des propriétés',
        paragraphs: [
          'Semi-transparent · Résistance à la lumière excellente · Pouvoir couvrant moyen · Légèrement toxique à l’inhalation.',
          'Compatible huile, aquarelle et acrylique. Instable en milieu alcalin — déconseillé en fresque.',
        ],
      },
    ],
  },
]

export const roadmaps: Roadmap[] = [
  {
    slug: 'initiation-huile',
    title: 'Initiation à la peinture à l’huile',
    audience: 'Débutant curieux',
    duration: '5 semaines',
    level: 'Progressif',
    summary: 'Un parcours pour apprendre le matériel, les couches et les temps de séchage.',
    steps: [
      {
        title: 'Matériel et sécurité',
        description: 'Découvrir les outils essentiels, les solvants et les règles de base de l’atelier.',
        ficheSlugs: [],
      },
      {
        title: 'Préparer le support',
        description: 'Gesso, ponçage et imprimature pour un fond prêt à recevoir la peinture.',
        ficheSlugs: ['gesso-acrylique', 'imprimature'],
      },
      {
        title: 'Couleurs et valeurs',
        description: 'Construire un tableau à partir d’une palette limitée et d’une valeur moyenne.',
        ficheSlugs: ['blanc-titane', 'imprimature'],
      },
      {
        title: 'Glacis et empâtements',
        description: 'Maîtriser les couches transparentes et les médiums pour enrichir la surface.',
        ficheSlugs: ['glacis', 'huile-de-lin'],
      },
    ],
  },
  {
    slug: 'fondations-acrylique',
    title: 'Fondations de l’acrylique',
    audience: 'Créatif polyvalent',
    duration: '3 semaines',
    level: 'Rapide',
    summary: 'Comprendre les textures, les médiums et la construction des masses colorées.',
    steps: [
      {
        title: 'Supports et apprêts',
        description: 'Choisir et préparer le support adapté à l’acrylique.',
        ficheSlugs: ['gesso-acrylique'],
      },
      {
        title: 'Gestes et séchage',
        description: 'Adapter les gestes à la sécheresse rapide de l’acrylique.',
        ficheSlugs: ['imprimature'],
      },
      {
        title: 'Effets de matière',
        description: 'Construire les masses colorées et les textures.',
        ficheSlugs: ['blanc-titane'],
      },
      {
        title: 'Vernis et finitions',
        description: 'Protéger et unifier la surface une fois l’œuvre terminée.',
        ficheSlugs: [],
      },
    ],
  },
]

export const themeVariants: ThemeVariant[] = [
  {
    slug: 'terre',
    name: 'Terre',
    description: 'Palette chaude, matières, contraste brun et lumière ivoire.',
    background: 'linear-gradient(135deg, #36261f 0%, #7d5534 100%)',
    accent: '#d8b089',
  },
  {
    slug: 'nocturne',
    name: 'Nocturne',
    description: 'Ambiance profonde, presque muséale, pensée pour le focus.',
    background: 'linear-gradient(135deg, #111218 0%, #2f3d4f 100%)',
    accent: '#d9cdb7',
  },
  {
    slug: 'neo',
    name: 'Neo',
    description: 'Contrastes nets, surfaces claires et accents plus graphiques.',
    background: 'linear-gradient(135deg, #f3efe9 0%, #d8c6aa 100%)',
    accent: '#4a4a43',
  },
  {
    slug: 'brutalisme',
    name: 'Brutalisme',
    description: 'Grille dense, blocs francs, typographie très visible.',
    background: 'linear-gradient(135deg, #dad4c8 0%, #a0886d 100%)',
    accent: '#1f1813',
  },
]

export const adminMetrics = [
  { label: 'Fiches validées', value: '86%', tone: 'success' },
  { label: 'Roadmaps publiées', value: '48', tone: 'info' },
  { label: 'Demandes en attente', value: '12', tone: 'warn' },
  { label: 'Signalements', value: '3', tone: 'danger' },
]

export const painterRows = [
  { name: 'Maya R.', status: 'En validation', expertise: 'Acrylique', city: 'Lyon' },
  { name: 'Noah V.', status: 'Actif', expertise: 'Huile', city: 'Nantes' },
  { name: 'Lina S.', status: 'À relancer', expertise: 'Médiums', city: 'Paris' },
]

export const dashboardCards = [
  { title: 'Progression du mois', text: '+18 fiches terminées, 7 partages, 3 retours détaillés.' },
  { title: 'À revoir', text: '2 dossiers à relire et 1 série à harmoniser avant publication.' },
  { title: 'Communauté', text: 'Les échanges sont les plus actifs sur les fiches pigments.' },
]

export function findFiche(slug: string | undefined) {
  return fiches.find((fiche) => fiche.slug === slug) ?? fiches[0]
}

export function findRoadmap(slug: string | undefined) {
  return roadmaps.find((roadmap) => roadmap.slug === slug) ?? roadmaps[0]
}

export function countRoadmapFiches(roadmap: Roadmap) {
  const slugs = new Set<string>()
  roadmap.steps.forEach((step) => step.ficheSlugs.forEach((s) => slugs.add(s)))
  return slugs.size
}

export function findRoadmapsForFiche(ficheSlug: string) {
  return roadmaps
    .map((roadmap) => {
      const stepIndex = roadmap.steps.findIndex((step) => step.ficheSlugs.includes(ficheSlug))
      if (stepIndex === -1) return null
      return { roadmap, stepIndex, step: roadmap.steps[stepIndex] }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
}

export function getRelatedFiches(fiche: Fiche, limit = 3) {
  return fiches.filter((item) => item.slug !== fiche.slug && item.category === fiche.category).slice(0, limit)
}
