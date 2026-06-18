import type { Fiche } from '../types'

export const ficheVentilation_atelier: Fiche = {
  slug: 'ventilation-atelier',
  title: 'Ventilation de l\'atelier',
  question: 'Comment bien ventiler son atelier de peinture ?',
  category: 'Sécurité',
  tool: 'Tous médiums',
  duration: '18 min',
  level: 'Débutant',
  summary: 'Solvants, huiles et poussières de pigments s\'accumulent dans l\'air d\'un atelier fermé. Une ventilation adaptée réduit les risques respiratoires et les maux de tête, tout en améliorant le séchage des œuvres.',
  tags: ['ventilation', 'sécurité', 'solvant', 'air', 'atelier', 'extraction', 'santé'],
  sections: [
    { label: 'Enjeux', title: 'Pourquoi ventiler ?', paragraphs: [
      'Les solvants (térébenthine, white spirit, diluants acryliques) libèrent des composés organiques volatils (COV) irritants et parfois neurotoxiques. Une exposition prolongée peut provoquer maux de tête, vertiges, allergies et troubles respiratoires.',
      'Les huiles sèchent par oxydation — un processus qui consomme de l\'oxygène et libère des odeurs. Un espace mal ventilé ralentit le séchage et concentre les odeurs.',
      'Les poussières de pigments (ponçage, pastels) et les aérosols nécessitent une extraction à la source pour éviter l\'inhalation.',
    ]},
    { label: 'Solutions', title: 'Naturelles et mécaniques', paragraphs: [
      'Ventilation naturelle : ouvrir au moins deux fenêtres en créant un courant d\'air (entrée basse, sortie haute). 10 minutes toutes les heures pendant le travail avec solvants.',
      'Ventilateur d\'extraction : installer un extracteur près de la zone de travail, évacuant vers l\'extérieur. Indispensable pour les ateliers sans fenêtre ou en sous-sol.',
      'Purificateur d\'air : complément utile pour les particules fines, mais ne remplace pas l\'extraction des COV. Choisir un modèle avec filtre HEPA et charbon actif.',
    ]},
    { label: 'Organisation', title: 'Aménager l\'atelier', paragraphs: [
      'Séparer la zone de mélange (solvants) de la zone de peinture. Effectuer les opérations à forte émission (nettoyage pinceaux, pulvérisation) près de l\'extraction.',
      'Stocker les solvants dans des récipients fermés, loin des sources de chaleur. Ne pas laisser des godets de térébenthine ouverts.',
      'Pour les enfants et les animaux : atelier fermé ou hors de portée. Ne jamais laisser de produits à portée de main.',
    ]},
    { label: 'Médiums', title: 'Adapter selon le médium', paragraphs: [
      'Huile + térébenthine : ventilation forte obligatoire. Les COV sont élevés. Limiter les sessions longues ou porter un masque à vapours organiques (A2).',
      'Acrylique : moins de solvants, mais les médiums et vernis en spray nécessitent ventilation. L\'eau suffit pour le nettoyage.',
      'Aquarelle et gouache : risques faibles. Ventilation standard suffit. Attention aux pastels secs (poussières).',
    ]},
    { label: 'Erreurs', title: 'Pièges à éviter', paragraphs: [
      'Ne pas se fier aux masques chirurgicaux — ils ne filtrent pas les vapeurs de solvants. Utiliser des masques certifiés A2 pour les COV.',
      'Éviter de peindre dans une chambre sans extraction — les vapeurs s\'accumulent la nuit et le séchage est mauvais.',
      'Ne pas bloquer les grilles d\'aération ou les entrées d\'air frais — une extraction sans renouvellement crée une dépression inefficace.',
    ]},
  ],
}
