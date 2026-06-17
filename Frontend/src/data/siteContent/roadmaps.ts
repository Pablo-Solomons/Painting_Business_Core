import type { Roadmap } from './types'

export const roadmaps: Roadmap[] = [
  {
    slug: 'initiation-huile',
    title: 'Initiation à la peinture à l\'huile',
    audience: 'Débutant curieux',
    duration: '5 semaines',
    level: 'Progressif',
    summary: 'Un parcours pour apprendre le matériel, les couches et les temps de séchage.',
    steps: [
      { title: 'Matériel et sécurité', description: 'Découvrir les outils essentiels, les solvants et les règles de base de l\'atelier.', ficheSlugs: ['pinceaux', 'ventilation-atelier', 'toxicite-pigments'] },
      { title: 'Préparer le support', description: 'Gesso, ponçage et imprimature pour un fond prêt.', ficheSlugs: ['gesso-acrylique', 'imprimature'] },
      { title: 'Couleurs et valeurs', description: 'Construire un tableau avec palette limitée.', ficheSlugs: ['blanc-titane', 'ocre-jaune', 'terre-sienne', 'imprimature'] },
      { title: 'Glacis et empâtements', description: 'Maîtriser les couches transparentes et les médiums.', ficheSlugs: ['glacis', 'huile-de-lin', 'impasto', 'medium-a-peindre'] },
    ],
  },
  {
    slug: 'fondations-acrylique',
    title: 'Fondations de l\'acrylique',
    audience: 'Créatif polyvalent',
    duration: '3 semaines',
    level: 'Rapide',
    summary: 'Comprendre les textures, les médiums et la construction des masses colorées.',
    steps: [
      { title: 'Supports et apprêts', description: 'Choisir et préparer le support adapté.', ficheSlugs: ['gesso-acrylique', 'toile-lin-vs-coton'] },
      { title: 'Gestes et séchage', description: 'Adapter les gestes à la sécheresse rapide.', ficheSlugs: ['alla-prima', 'imprimature'] },
      { title: 'Effets de matière', description: 'Textures, empâtements et médiums.', ficheSlugs: ['impasto', 'blanc-titane', 'couteau-a-peindre'] },
      { title: 'Vernis et finitions', description: 'Protéger et unifier la surface.', ficheSlugs: ['vernis-final'] },
    ],
  },
  {
    slug: 'maitrise-pigments',
    title: 'Maîtrise des pigments',
    audience: 'Peintre intermédiaire',
    duration: '4 semaines',
    level: 'Progressif',
    summary: 'Parcours colorimétrique pour comprendre les pigments : opacité, transparence, mélanges et sécurité.',
    steps: [
      { title: 'Les bases : blanc et terres', description: 'Commencer avec les pigments les plus fondamentaux.', ficheSlugs: ['blanc-titane', 'ocre-jaune', 'terre-sienne'] },
      { title: 'Les bleus', description: 'Explorer la gamme des bleus.', ficheSlugs: ['bleu-de-prusse', 'outremer'] },
      { title: 'Les rouges et jaunes', description: 'Compléter la palette.', ficheSlugs: ['jaune-naples', 'alizarine'] },
      { title: 'Sécurité pigmentaire', description: 'Connaître les risques et se protéger.', ficheSlugs: ['toxicite-pigments', 'ventilation-atelier'] },
    ],
  },
  {
    slug: 'techniques-glacis',
    title: 'Techniques de glacis avancées',
    audience: 'Peintre confirmé',
    duration: '6 semaines',
    level: 'Avancé',
    summary: 'Perfectionner l\'art du glacis : transparence, superposition et profondeur optique.',
    steps: [
      { title: 'Principe du glacis', description: 'Comprendre la physique de la transparence.', ficheSlugs: ['glacis', 'huile-de-lin', 'medium-a-peindre'] },
      { title: 'Grisaille préparatoire', description: 'Établir les valeurs en monochrome.', ficheSlugs: ['grisaille', 'imprimature'] },
      { title: 'Superposition des couleurs', description: 'Jouer avec les pigments transparents.', ficheSlugs: ['alizarine', 'bleu-de-prusse', 'vert-emeraude'] },
      { title: 'Finition et vernis', description: 'Protéger l\'œuvre et sublimer les glacis.', ficheSlugs: ['vernis-final'] },
    ],
  },
]