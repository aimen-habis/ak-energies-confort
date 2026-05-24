"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { INTERVENTION_ZONES } from "@/lib/content";

const ZonesMap = dynamic(
  () => import("@/components/sections/ZonesMapInner"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[320px] items-center justify-center bg-carbon">
        <span className="font-mono text-xs uppercase tracking-widest text-platinum/40">
          Chargement de la carte…
        </span>
      </div>
    ),
  },
);

export function Zones() {
  return (
    <section
      id="zones"
      className="relative mx-auto max-w-[1400px] scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading
        eyebrow="Zones d'intervention"
        title={
          <>
            Nous intervenons dans
            <br />
            <span className="text-gradient-frost">tout le Bas-Rhin.</span>
          </>
        }
        intro="Strasbourg et sa couronne, dans un rayon de 30 km. Un chauffagiste réactif, proche de chez vous."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-5 lg:items-center">
        {/* Chips villes */}
        <Reveal className="lg:col-span-3">
          <ul className="flex flex-wrap gap-2.5">
            {INTERVENTION_ZONES.map((city) => (
              <li key={city}>
                <span className="group flex cursor-default items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm font-medium text-platinum/80 transition-all hover:border-transparent hover:bg-[image:var(--gradient-fire)] hover:text-void">
                  <MapPin className="h-3.5 w-3.5 text-frost transition-colors group-hover:text-void" />
                  {city}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-platinum/50">
            Votre commune n&apos;est pas listée ? Contactez-nous, nous étudions
            chaque demande dans le Bas-Rhin.
          </p>
        </Reveal>

        {/* Carte rayon 30 km */}
        <Reveal
          delay={0.1}
          className="h-72 overflow-hidden rounded-3xl border border-white/10 lg:col-span-2"
        >
          <ZonesMap />
        </Reveal>
      </div>
    </section>
  );
}
