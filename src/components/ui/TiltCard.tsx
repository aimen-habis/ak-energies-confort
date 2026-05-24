"use client";

import { useRef, type ReactNode } from "react";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  max?: number;
}

/**
 * 3D perspective tilt that follows the cursor, with a moving glare.
 * Falls back to a static card on touch / reduced-motion.
 */
export function TiltCard({ children, className, max = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const disabled = isMobile || reduced;

  const onMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    ref.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.18), transparent 55%)`;
    }
  };

  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg)";
    if (glareRef.current) glareRef.current.style.background = "transparent";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "relative transition-transform duration-200 ease-out will-change-transform",
        className,
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
      <div
        ref={glareRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
      />
    </div>
  );
}
