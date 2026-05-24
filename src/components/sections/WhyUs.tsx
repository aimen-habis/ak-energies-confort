"use client";

import { PiggyBank, Leaf, Sofa, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { PILLARS, type ThermalTheme } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = { PiggyBank, Leaf, Sofa };

const THEME_GLOW: Record<ThermalTheme, string> = {
  fire: "from-flame/25",
  frost: "from-frost/25",
  mixed: "from-flame/20",
};
const THEME_TEXT: Record<ThermalTheme, string> = {
  fire: "text-gradient-fire",
  frost: "text-gradient-frost",
  mixed: "text-gradient",
};

export function WhyUs() {
  return (
    <section
      id="expertise"
      className="relative mx-auto max-w-[1400px] scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading
        eyebrow="Pourquoi nous"
        title={
          <>
            Trois raisons de
            <br />
            <span className="text-gradient">nous faire confiance.</span>
          </>
        }
        intro="Un savoir-faire qui se mesure : sur votre facture, sur votre empreinte, et sur votre confort au quotidien."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {PILLARS.map((p, i) => {
          const Icon = ICONS[p.icon];
          return (
            <Reveal key={p.title} delay={i * 0.1}>
              <TiltCard className="gradient-border h-full rounded-3xl">
                <div
                  className={`glass relative h-full overflow-hidden rounded-3xl p-8`}
                >
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${THEME_GLOW[p.theme]} to-transparent blur-2xl`}
                  />
                  <Icon className="h-9 w-9 text-platinum" strokeWidth={1.4} />
                  <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-platinum/45">
                    {p.eyebrow}
                  </p>
                  <p className="mt-3 font-display text-6xl font-extrabold leading-none">
                    <span className={THEME_TEXT[p.theme]}>
                      <CountUp
                        to={p.metric}
                        prefix={p.metricPrefix}
                        suffix={p.metricSuffix}
                      />
                    </span>
                  </p>
                  <h3 className="mt-4 text-2xl font-bold text-platinum">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-platinum/65">{p.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
