"use client";

import { useEffect, useState } from "react";

/** Reactive `matchMedia` hook. Returns false during SSR. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True on coarse-pointer / small viewports — used to disable heavy desktop FX. */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 1023px), (pointer: coarse)");
}

/** Respects the user's reduced-motion preference. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
