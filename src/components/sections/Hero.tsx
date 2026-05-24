"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Star, Phone, ArrowRight } from "lucide-react";
import { HeroShader } from "@/components/sections/HeroShader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CountUp } from "@/components/ui/CountUp";
import { STATS, SITE } from "@/lib/content";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/whatsapp";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const TITLE_LINES = [
  ["Le", "confort", "thermique,"],
  ["réinventé", "à", "Strasbourg."],
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-word > span", {
        yPercent: 115,
        filter: "blur(12px)",
        duration: 1.1,
        stagger: 0.045,
      })
        .from(
          ".hero-badge",
          { y: 20, opacity: 0, duration: 0.8 },
          "-=0.9",
        )
        .from(
          ".hero-sub",
          { y: 24, opacity: 0, duration: 0.8 },
          "-=0.7",
        )
        .from(
          ".hero-cta",
          { y: 24, opacity: 0, duration: 0.7, stagger: 0.12 },
          "-=0.6",
        )
        .from(
          ".hero-stat",
          { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 },
          "-=0.5",
        )
        .from(".hero-scroll", { opacity: 0, duration: 0.6 }, "-=0.3");
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      <HeroShader />
      {/* Legibility overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,15,0.95),rgba(10,10,15,0.35)_45%,rgba(10,10,15,0.55))]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-24 pt-28 sm:px-8">
        {/* Badge */}
        <div className="hero-badge mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-md">
          <Star className="h-4 w-4 fill-flame-glow text-flame-glow" />
          <span className="text-sm font-medium text-platinum/90">
            Noté {SITE.rating}/5 par nos clients
          </span>
        </div>

        {/* Title with masked split-words */}
        <h1 className="max-w-[16ch] font-display text-[clamp(2.75rem,9vw,9rem)] font-extrabold leading-[0.92] tracking-tight">
          {TITLE_LINES.map((line, li) => (
            <span key={li} className="block">
              {line.map((word, wi) => {
                const isAccent = word === "réinventé";
                return (
                  <span
                    key={wi}
                    className="hero-word mr-[0.25em] inline-block overflow-hidden align-bottom"
                  >
                    <span
                      className={`inline-block ${isAccent ? "text-gradient" : ""}`}
                    >
                      {word}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="hero-sub mt-8 max-w-2xl text-lg text-platinum/75 sm:text-xl">
          Chauffagiste à Strasbourg — chauffage, climatisation et traitement
          d&apos;air. {SITE.yearsExperience} ans d&apos;expertise au service de
          votre bien-être.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <MagneticButton
            href="#contact"
            className="hero-cta gap-2 rounded-full bg-[image:var(--gradient-fire)] px-8 py-4 text-base font-semibold text-void shadow-[0_18px_50px_-12px_rgba(255,77,46,0.7)]"
          >
            Demander un devis gratuit
            <ArrowRight className="h-5 w-5" />
          </MagneticButton>

          <MagneticButton
            onClick={() => (window.location.href = `tel:${PHONE_TEL}`)}
            aria-label={`Appeler le ${PHONE_DISPLAY}`}
            className="hero-cta gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-platinum backdrop-blur-md"
          >
            <Phone className="h-5 w-5 text-frost" />
            {PHONE_DISPLAY}
          </MagneticButton>
        </div>

        {/* Stats */}
        <dl className="mt-16 flex flex-wrap gap-x-12 gap-y-6">
          {STATS.map((s) => (
            <div key={s.label} className="hero-stat">
              <dt className="font-mono text-4xl font-bold text-pure sm:text-5xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </dt>
              <dd className="mt-1 text-sm uppercase tracking-wider text-platinum/50">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={() =>
          document
            .querySelector("#expertise")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="hero-scroll absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-platinum/50"
        aria-label="Faire défiler vers le bas"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Défiler
        </span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-white/25">
          <span
            className="mt-1.5 h-1.5 w-1.5 rounded-full bg-platinum"
            style={{ animation: "scroll-hint 1.8s infinite" }}
          />
        </span>
      </button>
    </section>
  );
}
