"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FileText,
  Search,
  PencilRuler,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESS } from "@/lib/content";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  FileText,
  Search,
  PencilRuler,
  Wrench,
};

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 70%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      className="relative mx-auto max-w-[1400px] scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading
        eyebrow="Notre process"
        title={
          <>
            De l&apos;idée à
            <br />
            <span className="text-gradient-frost">l&apos;installation.</span>
          </>
        }
        intro="Quatre étapes limpides, sans jargon ni mauvaise surprise. Vous gardez la main du premier message au dernier réglage."
      />

      <div ref={ref} className="relative mt-20">
        {/* Rail */}
        <div className="absolute left-[27px] top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-[image:var(--gradient-signature)]"
          />
        </div>

        <ol className="space-y-14 md:space-y-24">
          {PROCESS.map((step, i) => {
            const Icon = ICONS[step.icon];
            const right = i % 2 === 1;
            return (
              <li
                key={step.index}
                className="relative grid grid-cols-[56px_1fr] gap-5 md:grid-cols-2 md:gap-12"
              >
                {/* Node */}
                <div
                  className={cn(
                    "relative z-10 md:absolute md:left-1/2 md:top-2 md:-translate-x-1/2",
                  )}
                >
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-void">
                    <span
                      className="absolute inset-0 rounded-full bg-flame/30"
                      style={{ animation: "ping-dot 2.4s infinite" }}
                    />
                    <Icon className="h-6 w-6 text-platinum" strokeWidth={1.6} />
                  </span>
                </div>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: right ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "glass rounded-3xl p-7",
                    right
                      ? "md:col-start-2"
                      : "md:col-start-1 md:row-start-1 md:text-right",
                  )}
                >
                  <span className="font-mono text-sm text-flame">
                    {step.index}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold text-platinum">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-platinum/65">{step.body}</p>
                  <p
                    className={cn(
                      "mt-4 inline-block rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-platinum/50",
                    )}
                  >
                    {step.meta}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
