import type { Fiche } from '../types'

export const ficheVernis_final: Fiche = {
  slug: 'vernis-final',
  title: 'Vernis final',
  question: 'Quand et comment vernir un tableau à l\'huile ?',
  category: 'Médium',
  tool: 'Peinture à l\'huile',
  duration: '20 min',
  level: 'Intermédiaire',
  summary: 'Le vernis final protège la peinture des poussières, des UV et des variations d\'humidité tout en unifiant les brillances. Appliqué trop tôt ou mal choisi, il peut jaunir, craqueler ou devenir irréversible.',
  tags: ['vernis', 'protection', 'finition', 'brillance', 'conservation', 'huile', 'séchage'],
  sections: [
    { label: 'Définition', title: 'Rôle du vernis final', paragraphs: [
      'Le vernis final est une couche transparente appliquée sur une peinture à l\'huile parfaitement sèche. Il forme un film protecteur réversible qui isole la peinture des agressions extérieures : poussières, fumée, variations d\'humidité, UV.',
      'Le vernis unifie également les brillances : une peinture à l\'huile fraîche présente des zones mates (couches maigres) et brillantes (couches grasses). Le vernis harmonise l\'ensemble et fait ressortir les couleurs.',
      'Un bon vernis doit être réversible — dissolvable par un restaurateur sans endommager la peinture. Les vernis à base de résine acrylique ou de ketone modernes répondent à cette exigence.',
    ]},
    { label: 'Timing', title: 'Quand vernir ?', paragraphs: [
      'La règle d\'or : attendre que la peinture soit sèche « au cœur ». Pour une peinture à l\'huile standard, compter 6 à 12 mois minimum. Pour les empâtements épais, jusqu\'à 2 ans.',
      'Test du doigt : poser un mouchoir sur la surface et appuyer avec le doigt. Si le mouchoir ne colle pas et ne laisse pas d\'empreinte, la peinture est prête. Si elle colle, attendre encore.',
      'Ne jamais vernir une peinture encore collante — le vernis se mélange à la peinture fraîche et forme un film irrégulier impossible à corriger.',
    ]},
    { label: 'Types', title: 'Vernis disponibles', paragraphs: [
      'Vernis dammar : résine naturelle, brillant, séchage rapide (24-48h). Jaunit avec le temps. Encore utilisé mais déconseillé pour les œuvres destinées à durer.',
      'Vernis acrylique (MSA, Polymer) : non jaunissant, réversible, séchage en 24h. Le standard actuel pour la peinture à l\'huile moderne.',
      'Vernis rétouchage : vernis mat ou satiné pour corriger les brillances inégales avant le vernis final. Sèche en quelques heures.',
    ]},
    { label: 'Application', title: 'Technique d\'application', paragraphs: [
      'Travailler dans un atelier sans poussière. Poser le tableau à plat ou légèrement incliné. Utiliser un pinceau large et souple (pinceau à vernis).',
      'Verser un peu de vernis dans un récipient. Charger le pinceau et l\'essuyer légèrement sur le bord. Appliquer en passes croisées régulières, sans revenir sur les zones déjà vernies.',
      'Une couche suffit généralement. Pour un vernis plus épais, attendre 24h et appliquer une seconde couche. Ne pas surcharger — un vernis trop épais jaunit et craquelle.',
    ]},
    { label: 'Erreurs', title: 'Pièges courants', paragraphs: [
      'Vernir trop tôt — la peinture continue de sécher sous le vernis et peut craqueler. Patience !',
      'Appliquer sur une surface poussiéreuse — chaque grain sera piégé pour toujours. Nettoyer soigneusement avant.',
      'Utiliser un vernis non réversible — en cas de besoin de restauration, le restaurateur ne pourra pas retirer le vernis sans risque.',
    ]},
  ],
}
