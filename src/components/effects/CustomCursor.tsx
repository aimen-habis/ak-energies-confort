"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { Z } from "@/lib/z-index";

type CursorVariant = "default" | "link" | "view" | "hidden";

/**
 * Custom cursor with lerped follow.
 * - Grows into a filled disc over links/buttons
 * - Shows "VOIR" over media (data-cursor="view")
 * - Hides over inputs so the native caret is usable
 * Auto-disabled on touch / reduced-motion.
 */
export function CustomCursor() {
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<CursorVariant>("default");

  useEffect(() => {
    if (isMobile || reduced) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { ...pos };
    let raf = 0;

    const render = () => {
      pos.x += (mouse.x - pos.x) * 0.18;
      pos.y += (mouse.y - pos.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const el = (e.target as HTMLElement).closest<HTMLElement>(
        "a, button, [data-cursor], input, textarea, select, label",
      );
      if (!el) return setVariant("default");
      const tag = el.tagName.toLowerCase();
      if (["input", "textarea", "select"].includes(tag))
        return setVariant("hidden");
      const data = el.getAttribute("data-cursor");
      if (data === "view") return setVariant("view");
      setVariant("link");
    };

    const onLeave = () => setVariant("hidden");

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [isMobile, reduced]);

  if (isMobile || reduced) return null;

  const size =
    variant === "view" ? 72 : variant === "link" ? 52 : variant === "hidden" ? 0 : 14;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 hidden lg:flex items-center justify-center rounded-full mix-blend-difference transition-[width,height,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        width: size,
        height: size,
        zIndex: Z.cursor,
        backgroundColor: variant === "view" ? "#38bdf8" : "#ffffff",
      }}
    >
      {variant === "view" && (
        <span className="font-mono text-[10px] font-semibold tracking-widest text-void">
          VOIR
        </span>
      )}
    </div>
  );
}
