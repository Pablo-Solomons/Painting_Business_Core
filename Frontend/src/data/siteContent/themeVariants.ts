import type { ThemeVariant } from './types'

export const themeVariants: ThemeVariant[] = [
  { slug: 'terre', name: 'Terre', description: 'Palette chaude, contraste brun et lumière ivoire.', background: 'linear-gradient(135deg, #36261f 0%, #7d5534 100%)', accent: '#d8b089' },
  { slug: 'nocturne', name: 'Nocturne', description: 'Ambiance profonde, presque muséale.', background: 'linear-gradient(135deg, #111218 0%, #2f3d4f 100%)', accent: '#d9cdb7' },
  { slug: 'neo', name: 'Neo', description: 'Contrastes nets, surfaces claires.', background: 'linear-gradient(135deg, #f3efe9 0%, #d8c6aa 100%)', accent: '#4a4a43' },
  { slug: 'brutalisme', name: 'Brutalisme', description: 'Grille dense, blocs francs.', background: 'linear-gradient(135deg, #dad4c8 0%, #a0886d 100%)', accent: '#1f1813' },
]