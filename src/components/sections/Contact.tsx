"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactMap } from "@/components/sections/ContactMap";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/content";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/whatsapp";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-[1400px] scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading
        eyebrow="Contact"
        title={
          <>
            Parlons de
            <br />
            <span className="text-gradient">votre projet.</span>
          </>
        }
        intro="Décrivez votre besoin : votre message part directement sur WhatsApp, pré-rempli. Réponse rapide, devis gratuit."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-5">
        {/* Form — 60% */}
        <Reveal className="glass rounded-3xl p-6 sm:p-9 lg:col-span-3">
          <ContactForm />
        </Reveal>

        {/* Map + info — 40% */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          <Reveal
            delay={0.1}
            className="h-64 overflow-hidden rounded-3xl border border-white/10"
          >
            <ContactMap />
          </Reveal>

          <Reveal delay={0.15} className="glass grid grid-cols-2 gap-px rounded-3xl">
            <InfoCard
              icon={<Phone className="h-5 w-5 text-flame" />}
              label="Téléphone"
              value={PHONE_DISPLAY}
              href={`tel:${PHONE_TEL}`}
            />
            <InfoCard
              icon={<Mail className="h-5 w-5 text-flame" />}
              label="Email"
              value={SITE.email}
              href={`mailto:${SITE.email}`}
            />
            <InfoCard
              icon={<MapPin className="h-5 w-5 text-frost" />}
              label="Zone"
              value={`${SITE.city}, ${SITE.region}`}
            />
            <InfoCard
              icon={<Clock className="h-5 w-5 text-frost" />}
              label="Horaires"
              value={SITE.hours}
              hint={SITE.hoursClosed}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  value,
  href,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  hint?: string;
}) {
  const body = (
    <div className="flex h-full flex-col gap-2 p-6">
      {icon}
      <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-platinum/40">
        {label}
      </span>
      <span className="text-platinum">{value}</span>
      {hint && <span className="text-xs text-platinum/40">{hint}</span>}
    </div>
  );
  return href ? (
    <a href={href} className="transition-colors hover:bg-white/5">
      {body}
    </a>
  ) : (
    <div>{body}</div>
  );
}
