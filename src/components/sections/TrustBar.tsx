import {
  Star,
  BadgeCheck,
  Award,
  MapPin,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { TRUST_ITEMS } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  Star,
  BadgeCheck,
  Award,
  MapPin,
  Zap,
};

/**
 * Bandeau de confiance juste sous le Hero — capitalise sur la note 5/5 Google.
 * Verre dépoli + bordure gradient signature Fire→Frost.
 */
export function TrustBar() {
  return (
    <section
      aria-label="Gages de confiance"
      className="relative z-20 mx-auto -mt-8 max-w-[1400px] px-5 sm:px-8"
    >
      <div className="gradient-border glass rounded-2xl">
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 px-6 py-4 sm:gap-x-9 sm:py-5">
          {TRUST_ITEMS.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.label} className="flex items-center gap-2.5">
                <Icon
                  className={
                    item.icon === "MapPin" || item.icon === "Zap"
                      ? "h-4 w-4 shrink-0 text-frost"
                      : "h-4 w-4 shrink-0 text-flame-glow"
                  }
                  fill={item.icon === "Star" ? "currentColor" : "none"}
                  strokeWidth={1.8}
                />
                <span className="text-sm font-medium text-platinum/85">
                  {item.label}
                </span>
                {i < TRUST_ITEMS.length - 1 && (
                  <span
                    aria-hidden
                    className="ml-5 hidden h-4 w-px bg-white/15 sm:block"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
