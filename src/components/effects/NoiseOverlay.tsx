import { Z } from "@/lib/z-index";

/**
 * Full-screen film grain. Pure CSS/SVG, no JS — sits above everything
 * at very low opacity to add filmic texture (does not block clicks).
 */
const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>
       </filter>
       <rect width='100%' height='100%' filter='url(#n)'/>
     </svg>`,
  );

export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 opacity-[0.04] mix-blend-overlay"
      style={{ backgroundImage: `url("${NOISE}")`, zIndex: Z.noise }}
    />
  );
}
