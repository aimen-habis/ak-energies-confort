import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { SITE } from "@/lib/content";
import { PHONE_DISPLAY } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false, follow: true },
};

export default function MentionsLegales() {
  return (
    <LegalShell title="Mentions légales" updated="Mai 2026">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          {SITE.name} — chauffagiste / climaticien établi à {SITE.city} (
          {SITE.region}). Téléphone : {PHONE_DISPLAY}. Email : {SITE.email}.
        </p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>
          Ce site est hébergé par un prestataire d&apos;hébergement web. Les
          coordonnées de l&apos;hébergeur sont disponibles sur simple demande.
        </p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus présents sur ce site (textes, visuels,
          identité graphique) est protégé. Toute reproduction sans autorisation
          est interdite.
        </p>
      </section>
      <section>
        <h2>Responsabilité</h2>
        <p>
          Les informations fournies le sont à titre indicatif. {SITE.name} ne
          saurait être tenu responsable d&apos;éventuelles erreurs ou omissions.
        </p>
      </section>
    </LegalShell>
  );
}
