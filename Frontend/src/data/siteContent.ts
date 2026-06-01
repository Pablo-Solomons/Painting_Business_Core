export type Fiche = {
  slug: string
  title: string
  category: string
  tool: string
  duration: string
  level: string
  summary: string
  tags: string[]
  steps: string[]
  ingredients: string[]
}

export type Roadmap = {
  slug: string
  title: string
  audience: string
  duration: string
  level: string
  summary: string
  chapters: string[]
  featuredFiches: string[]
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
  { label: 'Themes', to: '/themes' },
  { label: 'Connexion', to: '/connexion' },
]

export const heroStats = [
  { value: '320+', label: 'Fiches techniques' },
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
    slug: 'huile-de-lin',
    title: 'Huile de lin',
    category: 'Médium',
    tool: 'Peinture à l’huile',
    duration: '15 min',
    level: 'Débutant',
    summary: 'Base d’un liant classique pour enrichir la pâte et ralentir le séchage.',
    tags: ['liant', 'glacis', 'huile'],
    ingredients: ['Huile de lin clarifiée', 'Pigment ou couleur prête à l’emploi', 'Palette non absorbante'],
    steps: ['Préparer la pâte avec peu de médium.', 'Ajouter en fines couches.', 'Laisser sécher sur un support ventilé.'],
  },
  {
    slug: 'gesso-acrylique',
    title: 'Gesso acrylique',
    category: 'Support',
    tool: 'Préparation de toile',
    duration: '20 min',
    level: 'Débutant',
    summary: 'Sous-couche pour uniformiser l’absorption et sécuriser le fond.',
    tags: ['apprêt', 'toile', 'fond'],
    ingredients: ['Gesso', 'Spatule ou large brosse', 'Support brut'],
    steps: ['Poncer légèrement le support.', 'Appliquer deux couches croisées.', 'Lisser après séchage.'],
  },
  {
    slug: 'blanc-titane',
    title: 'Blanc titane',
    category: 'Pigment',
    tool: 'Acrylique / huile',
    duration: '10 min',
    level: 'Intermédiaire',
    summary: 'Blanc couvrant utile pour les mélanges opaques et les rehauts.',
    tags: ['opacité', 'rehaut', 'mélange'],
    ingredients: ['Pigment blanc titane', 'Médium adapté', 'Palette'],
    steps: ['Tester le pouvoir couvrant.', 'Évaluer le voile dans un mélange.', 'Conserver à l’abri de l’air.'],
  },
  {
    slug: 'imprimature',
    title: 'Imprimature',
    category: 'Support',
    tool: 'Ébauche',
    duration: '25 min',
    level: 'Intermédiaire',
    summary: 'Teinte de fond qui donne une valeur moyenne et guide les ombres.',
    tags: ['fond', 'valeur', 'croquis'],
    ingredients: ['Couleur diluée', 'Brosse large', 'Chiffon'],
    steps: ['Poser une teinte chaude ou neutre.', 'Essuyer les zones lumineuses.', 'Tracer la structure principale.'],
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
    chapters: ['Matériel et sécurité', 'Préparer le support', 'Couleurs et valeurs', 'Glacis et empâtements'],
    featuredFiches: ['Huile de lin', 'Blanc titane', 'Imprimature'],
  },
  {
    slug: 'fondations-acrylique',
    title: 'Fondations de l’acrylique',
    audience: 'Créatif polyvalent',
    duration: '3 semaines',
    level: 'Rapide',
    summary: 'Comprendre les textures, les médiums et la construction des masses colorées.',
    chapters: ['Supports et apprêts', 'Gestes et séchage', 'Effets de matière', 'Vernis et finitions'],
    featuredFiches: ['Gesso acrylique', 'Imprimature', 'Blanc titane'],
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
