"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Flame,
  Snowflake,
  Wind,
  Droplets,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, type ThermalTheme } from "@/lib/content";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, LucideIcon> = { Flame, Snowflake, Wind, Droplets };

const ACCENT: Record<ThermalTheme, string> = {
  fire: "text-flame",
  frost: "text-frost",
  mixed: "text-flame-glow",
};
const GLOW: Record<ThermalTheme, string> = {
  fire: "bg-flame/20",
  frost: "bg-frost/20",
  mixed: "bg-flame-glow/15",
};

export function Services() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();
    // Horizontal pinned scroll — desktop only, motion allowed
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const panels = gsap.utils.toArray<HTMLElement>(".service-panel");
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            pin: true,
            scrub: 1,
            snap: 1 / (panels.length - 1),
            end: () => "+=" + window.innerWidth * (panels.length - 1),
            onUpdate: (self) =>
              setActive(Math.round(self.progress * (panels.length - 1))),
          },
        });
      },
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      id="services"
      ref={section}
      className="relative scroll-mt-24 overflow-hidden bg-carbon lg:h-screen"
    >
      {/* Progress indicator (desktop) */}
      <div className="pointer-events-none absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex">
        {SERVICES.map((s, i) => (
          <div key={s.index} className="flex items-center gap-3">
            <span
              className={cn(
                "font-mono text-xs transition-colors",
                active === i ? "text-platinum" : "text-platinum/30",
              )}
            >
              {s.index}
            </span>
            <span
              className={cn(
                "h-px bg-platinum transition-all duration-500",
                active === i ? "w-10 opacity-100" : "w-5 opacity-30",
              )}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:h-screen lg:flex-row lg:flex-nowrap">
        {SERVICES.map((s) => {
          const Icon = ICONS[s.icon];
          return (
            <article
              key={s.index}
              className="service-panel relative flex min-h-screen w-full shrink-0 items-center overflow-hidden border-b border-white/5 lg:h-screen lg:w-screen lg:border-b-0"
            >
              {/* Giant background number */}
              <span
                aria-hidden
                className="text-outline pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 font-display text-[40vw] font-extrabold leading-none lg:text-[28vw]"
              >
                {s.index}
              </span>
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute left-1/4 top-1/3 h-72 w-72 rounded-full blur-[120px]",
                  GLOW[s.theme],
                )}
              />

              <div className="relative z-10 mx-auto grid w-full max-w-[1400px] gap-10 px-5 py-28 sm:px-8 lg:grid-cols-12 lg:items-center lg:py-0">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5",
                        ACCENT[s.theme],
                      )}
                    >
                      <Icon className="h-7 w-7" strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-sm text-platinum/40">
                      Service {s.index} / 04
                    </span>
                  </div>

                  <h3 className="mt-7 font-display text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-[0.92] tracking-tight text-platinum">
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-xl text-platinum/70">
                    {s.lead}
                  </p>

                  <a
                    href="#contact"
                    className={cn(
                      "group mt-9 inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-base font-semibold text-platinum transition-colors",
                      s.theme === "frost"
                        ? "hover:border-frost hover:text-frost"
                        : "hover:border-flame hover:text-flame",
                    )}
                  >
                    Demander un devis
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

                <ul className="space-y-px lg:col-span-5">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 border-t border-white/10 py-4 text-platinum/80 last:border-b"
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full bg-current", ACCENT[s.theme])} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
