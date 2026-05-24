"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&@░▒▓01";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** ms before the de-scramble starts once in view. */
  delay?: number;
}

/**
 * "Hacker" text-scramble that resolves to the final string when the
 * element scrolls into view. Renders the final text immediately when
 * reduced motion is preferred.
 */
export function ScrambleText({ text, className, delay = 0 }: ScrambleTextProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (reduced) return; // reduced-motion renders the final text directly
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    let frame = 0;

    const run = () => {
      const total = text.length;
      const tick = () => {
        const progress = frame / 3; // ~3 frames per resolved char
        let out = "";
        for (let i = 0; i < total; i++) {
          if (text[i] === " ") out += " ";
          else if (i < progress) out += text[i];
          else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setDisplay(out);
        frame++;
        if (progress <= total) raf = requestAnimationFrame(tick);
        else setDisplay(text);
      };
      tick();
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          window.setTimeout(run, delay);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, delay, reduced]);

  return (
    <span ref={ref} className={cn(className)} aria-label={text}>
      <span aria-hidden>{reduced ? text : display || " "}</span>
    </span>
  );
}
