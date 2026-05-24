import type Lenis from "lenis";

/**
 * Shared handle to the single Lenis instance owned by <SmoothScroll>.
 * Lets other components (e.g. the mobile menu) truly freeze scrolling —
 * setting `body { overflow: hidden }` alone does NOT stop Lenis.
 */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}
export function stopLenis() {
  instance?.stop();
}
export function startLenis() {
  instance?.start();
}
