import type { Fiche } from '../types'

export const ficheToxicite_pigments: Fiche = {
  slug: 'toxicite-pigments',
  title: 'Toxicité des pigments',
  question: 'Quels pigments sont dangereux et comment se protéger ?',
  category: 'Sécurité',
  tool: 'Tous médiums',
  duration: '22 min',
  level: 'Débutant',
  summary: 'Certains pigments historiques contiennent des métaux lourds toxiques (plomb, cadmium, cobalt). Connaître les risques, lire les étiquettes et adopter de bonnes pratiques d\'hygiène protège la santé du peintre sans limiter sa créativité.',
  tags: ['toxicité', 'sécurité', 'pigment', 'plomb', 'cadmium', 'hygiène', 'protection'],
  sections: [
    { label: 'Risques', title: 'Pigments à connaître', paragraphs: [
      'Le blanc de plomb (créa) et le jaune de chrome contiennent du plomb, hautement toxique. Inhalation de poussières ou ingestion par les doigts contaminés peuvent provoquer une intoxication chronique (saturnisme).',
      'Les pigments cadmium (rouge, jaune, orange) contiennent du cadmium, cancérigène par inhalation. Les versions modernes sont encapsulées et moins dangereuses, mais restent à manipuler avec précaution.',
      'Le cobalt (bleu, vert) et le manganese peuvent provoquer des allergies et des troubles respiratoires. Les terres naturelles (ocre, Sienne) sont généralement non toxiques.',
    ]},
    { label: 'Étiquetage', title: 'Lire les labels', paragraphs: [
      'Les peintures artistiques portent des pictogrammes de danger (GHS) : tête de mort pour les toxiques, flamme pour les inflammables, exclamation pour les irritants.',
      'La mention « Conforme à la norme ASTM D-4236 » indique que le produit a été évalué pour la toxicité. Les marques professionnelles (Winsor & Newton, Sennelier, Lefranc) respectent ces normes.',
      'Les pastels secs génèrent des poussières — porter un masque lors du ponçage ou du travail intensif. Les aérosols et sprays nécessitent une ventilation adéquate.',
    ]},
    { label: 'Hygiène', title: 'Bonnes pratiques en atelier', paragraphs: [
      'Ne jamais manger, boire ou fumer dans l\'atelier. Se laver les mains soigneusement après chaque session, même si on a porté des gants.',
      'Ne pas poncer ou gratter des peintures sèches sans masque — les poussières de pigments sont les plus dangereuses. Humidifier la surface avant ponçage pour limiter les particules.',
      'Conserver les peintures dans leurs tubes ou pots d\'origine, étiquetés. Ne pas transférer dans des récipients alimentaires.',
      'Éviter de se lécher les pinceaux pour les pointer — utiliser de l\'eau ou un essuie-pinceaux.',
    ]},
    { label: 'Alternatives', title: 'Pigments plus sûrs', paragraphs: [
      'Le blanc de titane remplace le blanc de plomb sans perte d\'opacité. Les jaunes et rouges pyrrole remplacent les cadmiums pour la plupart des usages.',
      'Les terres naturelles (ocre, Sienne, umber) sont non toxiques et offrent une palette chaude complète. Les phtalocyanines (bleu, vert) sont stables et sûres.',
      'Pour les enfants et les espaces mal ventilés, privilégier les gouaches et acryliques sans métaux lourds, labellisées non toxiques.',
    ]},
    { label: 'Urgence', title: 'En cas d\'exposition', paragraphs: [
      'Contact cutané : laver abondamment à l\'eau et au savon. Retirer les vêtements contaminés.',
      'Contact oculaire : rincer à l\'eau claire pendant 15 minutes. Consulter un médecin si irritation persistante.',
      'Ingestion : ne pas faire vomir. Consulter immédiatement un centre antipoison ou un médecin en indiquant le produit concerné.',
      'Inhalation : sortir à l\'air frais. Consulter si malaise, toux ou difficultés respiratoires.',
    ]},
  ],
}
