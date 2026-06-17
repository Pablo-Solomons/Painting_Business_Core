import type { Fiche } from './types'

export * from './types'
export * from './meta'
export * from './helpers'
export * from './roadmaps'
export * from './themeVariants'

// Already-enriched fiches (camelCase exports)
export { ficheGlacis } from './fiches/fiche-glacis'
export { ficheImpasto } from './fiches/fiche-impasto'
export { ficheSfumato } from './fiches/fiche-sfumato'
export { ficheGrisaille } from './fiches/fiche-grisaille'
export { ficheAllaPrima } from './fiches/fiche-alla-prima'
export { ficheBleuPrusse } from './fiches/fiche-bleu-prusse'

// Placeholder fiches (underscore-based auto-generated exports)
export { ficheFrottis } from './fiches/fiche-frottis'
export { ficheDegrade } from './fiches/fiche-degrade'
export { ficheLavis } from './fiches/fiche-lavis'
export { ficheBlancTitane } from './fiches/fiche-blanc-titane'
export { ficheJauneNaples } from './fiches/fiche-jaune-naples'
export { ficheTerreSienne } from './fiches/fiche-terre-sienne'
export { ficheAlizarine } from './fiches/fiche-alizarine'
export { ficheVert_emeraude as ficheVertEmeraude } from './fiches/fiche-vert-emeraude'
export { ficheOcre_jaune as ficheOcreJaune } from './fiches/fiche-ocre-jaune'
export { ficheOutremer } from './fiches/fiche-outremer'
export { ficheHuile_lin as ficheHuileLin } from './fiches/fiche-huile-lin'
export { ficheEssence_terebenthine as ficheEssenceTerebenthine } from './fiches/fiche-essence-terebenthine'
export { ficheMedium_a_peindre as ficheMediumPeindre } from './fiches/fiche-medium-a-peindre'
export { ficheVernis_final as ficheVernisFinal } from './fiches/fiche-vernis-final'
export { ficheGesso_acrylique as ficheGessoAcrylique } from './fiches/fiche-gesso-acrylique'
export { ficheImprimature } from './fiches/fiche-imprimature'
export { ficheToile_lin_vs_coton as ficheToileLinCoton } from './fiches/fiche-toile-lin-vs-coton'
export { fichePapier_aquarelle as fichePapierAquarelle } from './fiches/fiche-papier-aquarelle'
export { ficheToxicite_pigments as ficheToxicitePigments } from './fiches/fiche-toxicite-pigments'
export { ficheVentilation_atelier as ficheVentilationAtelier } from './fiches/fiche-ventilation-atelier'
export { fichePinceaux } from './fiches/fiche-pinceaux'
export { ficheCouteau_a_peindre as ficheCouteauPeindre } from './fiches/fiche-couteau-a-peindre'

// Re-import needed for local reference
import { ficheGlacis as _glacis } from './fiches/fiche-glacis'
import { ficheImpasto as _impasto } from './fiches/fiche-impasto'
import { ficheSfumato as _sfumato } from './fiches/fiche-sfumato'
import { ficheGrisaille as _grisaille } from './fiches/fiche-grisaille'
import { ficheAllaPrima as _allaPrima } from './fiches/fiche-alla-prima'
import { ficheBleuPrusse as _bleuPrusse } from './fiches/fiche-bleu-prusse'
import { ficheFrottis as _frottis } from './fiches/fiche-frottis'
import { ficheDegrade as _degrade } from './fiches/fiche-degrade'
import { ficheLavis as _lavis } from './fiches/fiche-lavis'
import { ficheBlancTitane as _blancTitane } from './fiches/fiche-blanc-titane'
import { ficheJauneNaples as _jauneNaples } from './fiches/fiche-jaune-naples'
import { ficheTerreSienne as _terreSienne } from './fiches/fiche-terre-sienne'
import { ficheAlizarine as _alizarine } from './fiches/fiche-alizarine'
import { ficheVert_emeraude as _vertEmeraude } from './fiches/fiche-vert-emeraude'
import { ficheOcre_jaune as _ocreJaune } from './fiches/fiche-ocre-jaune'
import { ficheOutremer as _outremer } from './fiches/fiche-outremer'
import { ficheHuile_lin as _huileLin } from './fiches/fiche-huile-lin'
import { ficheEssence_terebenthine as _essenceTerebenthine } from './fiches/fiche-essence-terebenthine'
import { ficheMedium_a_peindre as _mediumPeindre } from './fiches/fiche-medium-a-peindre'
import { ficheVernis_final as _vernisFinal } from './fiches/fiche-vernis-final'
import { ficheGesso_acrylique as _gessoAcrylique } from './fiches/fiche-gesso-acrylique'
import { ficheImprimature as _imprimature } from './fiches/fiche-imprimature'
import { ficheToile_lin_vs_coton as _toileLinCoton } from './fiches/fiche-toile-lin-vs-coton'
import { fichePapier_aquarelle as _papierAquarelle } from './fiches/fiche-papier-aquarelle'
import { ficheToxicite_pigments as _toxicitePigments } from './fiches/fiche-toxicite-pigments'
import { ficheVentilation_atelier as _ventilationAtelier } from './fiches/fiche-ventilation-atelier'
import { fichePinceaux as _pinceaux } from './fiches/fiche-pinceaux'
import { ficheCouteau_a_peindre as _couteauPeindre } from './fiches/fiche-couteau-a-peindre'

export const fiches: Fiche[] = [
  // Technique (8)
  _glacis,
  _impasto,
  _sfumato,
  _grisaille,
  _allaPrima,
  _frottis,
  _degrade,
  _lavis,

  // Pigment (8)
  _blancTitane,
  _bleuPrusse,
  _jauneNaples,
  _terreSienne,
  _alizarine,
  _vertEmeraude,
  _ocreJaune,
  _outremer,

  // Médium (4)
  _huileLin,
  _essenceTerebenthine,
  _mediumPeindre,
  _vernisFinal,

  // Support (4)
  _gessoAcrylique,
  _imprimature,
  _toileLinCoton,
  _papierAquarelle,

  // Sécurité (2)
  _toxicitePigments,
  _ventilationAtelier,

  // Outil (2)
  _pinceaux,
  _couteauPeindre,
]