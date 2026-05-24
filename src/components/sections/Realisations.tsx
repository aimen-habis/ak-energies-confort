"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Flame,
  Snowflake,
  Wind,
  Droplets,
  Thermometer,
  Fan,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  REALISATIONS,
  REALISATION_FILTERS,
  type Realisation,
  type ThermalTheme,
} from "@/lib/content";
import { cn } from "@/lib/utils";
import { Z } from "@/lib/z-index";

const ICONS: Record<string, LucideIcon> = {
  Flame,
  Snowflake,
  Wind,
  Droplets,
  Thermometer,
  Fan,
};

const THEME_BG: Record<ThermalTheme, string> = {
  fire: "linear-gradient(135deg,#2a0d04 0%,#c2410c 45%,#ff7a45 100%)",
  frost: "linear-gradient(135deg,#04263b 0%,#0ea5e9 50%,#7dd3fc 100%)",
  mixed: "linear-gradient(135deg,#c2410c 0%,#ffb347 45%,#38bdf8 100%)",
};

const SPAN: Record<Realisation["span"], string> = {
  sm: "lg:col-span-1 lg:row-span-1",
  md: "lg:col-span-2 lg:row-span-1",
  wide: "lg:col-span-2 lg:row-span-1",
  lg: "lg:col-span-2 lg:row-span-2",
  tall: "lg:col-span-1 lg:row-span-2",
};

function ThermalVisual({ item, large }: { item: Realisation; large?: boolean }) {
  const Icon = ICONS[item.icon];
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: THEME_BG[item.theme] }}
    >
      <div className="grid-noise absolute inset-0 opacity-30" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
      <Icon
        aria-hidden
        className={cn(
          "absolute right-4 top-4 text-white/25",
          large ? "h-24 w-24" : "h-12 w-12",
        )}
        strokeWidth={1.2}
      />
    </div>
  );
}

export function Realisations() {
  const [filter, setFilter] = useState<(typeof REALISATION_FILTERS)[number]>(
    "Tout",
  );
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = REALISATIONS.filter(
    (r) => filter === "Tout" || r.category === filter,
  );

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setLightbox((i) =>
        i === null ? i : (i + dir + visible.length) % visible.length,
      ),
    [visible.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  const current = lightbox !== null ? visible[lightbox] : null;

  return (
    <section
      id="realisations"
      className="relative mx-auto max-w-[1400px] scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow="Réalisations"
          title={
            <>
              Du travail
              <br />
              <span className="text-gradient">qui se voit.</span>
            </>
          }
        />
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {REALISATION_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium transition-colors",
                filter === f
                  ? "border-transparent bg-platinum text-void"
                  : "border-white/15 text-platinum/70 hover:border-white/40 hover:text-platinum",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 lg:grid-cols-4 lg:auto-rows-[220px]"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((item, i) => (
            <motion.button
              key={item.title}
              layout
              type="button"
              data-cursor="view"
              onClick={() => setLightbox(i)}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "group relative overflow-hidden rounded-3xl text-left",
                SPAN[item.span],
              )}
            >
              <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                <ThermalVisual item={item} large={item.span === "lg"} />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <span className="w-fit rounded-full bg-void/50 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-platinum backdrop-blur-sm">
                  {item.category}
                </span>
                <h3 className="mt-2 text-lg font-bold text-pure">
                  {item.title}
                </h3>
                <p className="flex items-center gap-1 text-sm text-platinum/70">
                  <MapPin className="h-3.5 w-3.5" /> {item.location}
                </p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: Z.lightbox }}
            className="fixed inset-0 flex items-center justify-center bg-void/85 p-4 backdrop-blur-xl sm:p-10"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`${current.title} — ${current.location}`}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Fermer"
              className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-platinum transition-colors hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Précédent"
              className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-platinum transition-colors hover:bg-white/10 sm:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Suivant"
              className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-platinum transition-colors hover:bg-white/10 sm:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              key={current.title}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10"
            >
              <div className="aspect-[16/10]">
                <ThermalVisual item={current} large />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 bg-carbon p-6">
                <div>
                  <h3 className="text-2xl font-bold text-pure">
                    {current.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-platinum/65">
                    <MapPin className="h-4 w-4" /> {current.location}
                  </p>
                </div>
                <span className="rounded-full bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-platinum/70">
                  {current.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
