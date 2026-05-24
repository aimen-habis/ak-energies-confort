"use client";

import dynamic from "next/dynamic";

/**
 * Leaflet touches `window` on import, so the actual map is loaded
 * client-side only (Next 16 requires ssr:false inside a Client Component).
 */
const MapInner = dynamic(() => import("@/components/sections/MapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[320px] w-full items-center justify-center bg-carbon">
      <span className="font-mono text-xs uppercase tracking-widest text-platinum/40">
        Chargement de la carte…
      </span>
    </div>
  ),
});

export function ContactMap() {
  return <MapInner />;
}
