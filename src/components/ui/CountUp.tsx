"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Animated number that counts up once it scrolls into view. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1800,
  className,
}: CountUpProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (reduced) return; // reduced-motion renders the final value directly
    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return;
        done.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(eased * to));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {reduced ? to : value}
      {suffix}
    </span>
  );
}
