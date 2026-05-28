/**
 * Hiérarchie z-index — source de vérité unique pour toutes les couches
 * superposées du site. Toute couche `fixed`/`absolute` qui peut chevaucher
 * une autre DOIT utiliser une de ces constantes (via `style={{ zIndex }}`),
 * jamais une valeur magique inline.
 *
 *  9999  CURSOR     Curseur custom (desktop, pointer-events-none, toujours au-dessus)
 *   200  SUSPENDED  Écran de suspension plein écran (recouvre toute la nav)
 *   100  SKIP_LINK  Lien d'évitement clavier (visible au focus uniquement)
 *    90  LIGHTBOX   Modale galerie réalisations
 *    80  MENU       Menu mobile plein écran (au-dessus du header)
 *    70  HEADER      Barre de navigation fixe
 *    60  FLOAT      Bouton flottant WhatsApp
 *    50  NOISE      Grain plein écran (décoratif, pointer-events-none)
 *    20  TRUST_BAR  Bandeau de confiance sous le hero
 *  0-10  CONTENT    Contenu normal du document
 */
export const Z = {
  content: 10,
  trustBar: 20,
  noise: 50,
  float: 60,
  header: 70,
  menu: 80,
  lightbox: 90,
  skipLink: 100,
  suspended: 200,
  cursor: 9999,
} as const;

export type ZLayer = keyof typeof Z;
