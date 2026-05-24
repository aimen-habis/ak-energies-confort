import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false, follow: true },
};

export default function Confidentialite() {
  return (
    <LegalShell title="Confidentialité" updated="Mai 2026">
      <section>
        <h2>Aucune collecte sur le site</h2>
        <p>
          Ce site ne stocke aucune donnée personnelle et ne dépose aucun cookie
          de suivi. Le formulaire de contact n&apos;envoie rien à un serveur :
          il ouvre simplement WhatsApp avec un message pré-rempli que vous
          choisissez d&apos;envoyer, ou non.
        </p>
      </section>
      <section>
        <h2>Communication via WhatsApp</h2>
        <p>
          Lorsque vous nous contactez via WhatsApp, l&apos;échange est régi par
          la politique de confidentialité de WhatsApp. Nous utilisons les
          informations transmises uniquement pour répondre à votre demande de
          devis.
        </p>
      </section>
      <section>
        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD, vous pouvez demander l&apos;accès, la
          rectification ou la suppression des informations que vous nous avez
          communiquées, en nous écrivant à {SITE.email}.
        </p>
      </section>
    </LegalShell>
  );
}
