import type { Metadata } from "next";

import { SITE } from "@/lib/content";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { Z } from "@/lib/z-index";

export const metadata: Metadata = {
  title: "Site temporairement indisponible",
  description: "Le site est momentanément hors ligne. Contactez-nous directement.",
  robots: { index: false, follow: false },
};

export default function SuspendedPage() {
  return (
    <div
      style={{ zIndex: Z.suspended }}
      className="fixed inset-0 flex flex-col items-center justify-center overflow-y-auto bg-void px-6 py-16 text-center text-platinum"
    >
      <div className="flex max-w-xl flex-col items-center gap-6">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-flame">
          {SITE.name}
        </span>

        <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
          Site temporairement indisponible
        </h1>

        <p className="text-base leading-relaxed text-platinum/70">
          Notre site est momentanément hors ligne pour maintenance. Nous restons
          joignables — n&apos;hésitez pas à nous contacter directement.
        </p>

        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={`tel:${PHONE_TEL}`}
            className="rounded-full bg-flame px-7 py-3 font-medium text-void transition hover:opacity-90"
          >
            Appeler le {PHONE_DISPLAY}
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-platinum/20 px-7 py-3 font-medium text-platinum transition hover:bg-platinum/10"
          >
            WhatsApp
          </a>
        </div>

        <p className="mt-2 font-mono text-xs text-platinum/40">{SITE.hours}</p>
      </div>
    </div>
  );
}
