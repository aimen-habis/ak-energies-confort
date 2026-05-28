import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Durée indicative avant rétablissement, en secondes (1 jour). */
const RETRY_AFTER_SECONDS = 86400;

/**
 * Interrupteur de mise en suspension du site.
 *
 * Quand `SITE_SUSPENDED` vaut "true", toute requête (hors assets statiques
 * exclus par le matcher) renvoie un vrai statut HTTP 503 tout en affichant
 * l'écran de suspension à l'URL demandée — via un rewrite interne, donc sans
 * redirection. Sinon le site fonctionne normalement. On coupe/rétablit l'accès
 * en changeant une seule variable d'environnement puis en redéployant.
 *
 * Note Next 16 : ce fichier remplace l'ancien `middleware.ts` (déprécié) et
 * tourne sur le runtime Node.js, donc `process.env` est lu à l'exécution.
 */
export function proxy(request: NextRequest) {
  if (process.env.SITE_SUSPENDED !== "true") {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL("/suspended", request.url), {
    status: 503,
    headers: {
      "Retry-After": String(RETRY_AFTER_SECONDS),
    },
  });
}

export const config = {
  matcher: [
    // Tout sauf : API, fichiers internes Next, métadonnées et tout fichier
    // statique (chemin contenant un point).
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|opengraph-image|.*\\..*).*)",
  ],
};
