"use client";

import { useRef, type ReactNode } from "react";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  /** Pull strength (0–1). */
  strength?: number;
  type?: "button" | "submit";
  "aria-label"?: string;
}

/**
 * Button/link that drifts toward the cursor and adds a click ripple.
 * Magnetism is disabled on touch and reduced-motion.
 */
export function MagneticButton({
  children,
  className,
  onClick,
  href,
  strength = 0.35,
  type = "button",
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const disabled = isMobile || reduced;

  const onMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const ripple = (e: React.MouseEvent) => {
    const host = ref.current;
    if (!host) return;
    const circle = document.createElement("span");
    const d = Math.max(host.clientWidth, host.clientHeight);
    const rect = host.getBoundingClientRect();
    circle.style.cssText = `position:absolute;border-radius:9999px;pointer-events:none;width:${d}px;height:${d}px;left:${e.clientX - rect.left - d / 2}px;top:${e.clientY - rect.top - d / 2}px;background:rgba(255,255,255,0.35);transform:scale(0);opacity:1;transition:transform .6s cubic-bezier(0.16,1,0.3,1),opacity .6s;`;
    host.appendChild(circle);
    requestAnimationFrame(() => {
      circle.style.transform = "scale(2.4)";
      circle.style.opacity = "0";
    });
    setTimeout(() => circle.remove(), 650);
  };

  const handleClick = (e: React.MouseEvent) => {
    ripple(e);
    onClick?.();
  };

  const classes = cn(
    "relative inline-flex items-center justify-center overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
    className,
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      className={classes}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
}
