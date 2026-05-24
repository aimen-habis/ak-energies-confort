"use client";

import { ArrowRight, Phone } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { openWhatsApp, PHONE_DISPLAY, PHONE_TEL } from "@/lib/whatsapp";

interface LocalCtaProps {
  /** Libellé contextuel injecté dans le message (ex. le H1 de la page). */
  context: string;
  city: string;
  slug: string;
  variant?: "hero" | "band";
}

/** Boutons de conversion d'une page locale : WhatsApp pré-rempli + appel. */
export function LocalCta({ context, city, slug, variant = "hero" }: LocalCtaProps) {
  const message = [
    "Bonjour AK Énergies Confort 👋",
    "",
    `Je vous contacte au sujet de : ${context} (${city}).`,
    "Je souhaite un devis gratuit.",
    "",
    "Merci !",
  ].join("\n");

  const onWhatsApp = () => openWhatsApp(message, { source: "local_page", slug });

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <MagneticButton
        onClick={onWhatsApp}
        aria-label="Demander un devis gratuit via WhatsApp"
        className="gap-2 rounded-full bg-[image:var(--gradient-fire)] px-8 py-4 text-base font-semibold text-void shadow-[0_18px_50px_-12px_rgba(255,77,46,0.7)]"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Demander un devis gratuit
        <ArrowRight className="h-5 w-5" />
      </MagneticButton>

      <MagneticButton
        onClick={() => (window.location.href = `tel:${PHONE_TEL}`)}
        aria-label={`Appeler le ${PHONE_DISPLAY}`}
        className={
          variant === "hero"
            ? "gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-platinum backdrop-blur-md"
            : "gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-platinum"
        }
      >
        <Phone className="h-5 w-5 text-frost" />
        {PHONE_DISPLAY}
      </MagneticButton>
    </div>
  );
}
