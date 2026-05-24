"use client";

import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS, type Testimonial } from "@/lib/content";

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="glass mx-3 flex w-[340px] shrink-0 flex-col rounded-3xl p-7 sm:w-[400px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5" aria-label="5 étoiles sur 5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-flame-glow text-flame-glow" />
          ))}
        </div>
        <Quote className="h-7 w-7 text-platinum/15" />
      </div>
      <blockquote className="mt-5 grow text-lg leading-relaxed text-platinum/90">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-6 border-t border-white/10 pt-4">
        <span className="font-semibold text-platinum">
          {t.author} · {t.location}
        </span>
        <span className="mt-0.5 block font-mono text-xs text-platinum/45">
          {t.detail}
        </span>
      </figcaption>
    </figure>
  );
}

function Row({
  items,
  duration,
  reverse,
}: {
  items: Testimonial[];
  duration: number;
  reverse?: boolean;
}) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className="animate-marquee flex hover:[animation-play-state:paused]"
        style={{
          // duplicated content scrolls -50% for a seamless loop
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const half = Math.ceil(TESTIMONIALS.length / 2);
  const rowA = TESTIMONIALS.slice(0, half);
  const rowB = TESTIMONIALS.slice(half);

  return (
    <section
      id="temoignages"
      className="scroll-mt-24 overflow-hidden py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Avis clients"
          align="center"
          title={
            <>
              Ils nous font confiance,
              <br />
              <span className="text-gradient">ils en parlent.</span>
            </>
          }
        />
      </div>

      <div className="mt-16 flex flex-col gap-5">
        <Row items={rowA} duration={48} />
        <Row items={rowB} duration={56} reverse />
      </div>
    </section>
  );
}
