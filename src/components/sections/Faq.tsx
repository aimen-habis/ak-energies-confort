"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ } from "@/lib/content";
import { cn } from "@/lib/utils";

// FAQPage structured data → éligibilité aux featured snippets Google.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative mx-auto max-w-[1400px] scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <SectionHeading
        eyebrow="Questions fréquentes"
        title={
          <>
            Tout savoir avant
            <br />
            <span className="text-gradient">de vous lancer.</span>
          </>
        }
        intro="Prix, aides, délais, obligations : les réponses claires aux questions que se posent nos clients à Strasbourg."
      />

      <div className="mt-14 grid gap-3">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.question} delay={i * 0.04}>
              <div
                className={cn(
                  "glass overflow-hidden rounded-2xl transition-colors",
                  isOpen && "border-flame/40",
                )}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "text-lg font-semibold transition-colors",
                        isOpen
                          ? "text-platinum"
                          : "text-platinum/85 group-hover:text-flame",
                      )}
                    >
                      {item.question}
                    </span>
                    <Plus
                      className={cn(
                        "h-5 w-5 shrink-0 text-flame transition-transform duration-300",
                        isOpen && "rotate-45",
                      )}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-platinum/65">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
