"use client";

import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { openWhatsApp, QUICK_MESSAGE } from "@/lib/whatsapp";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Z } from "@/lib/z-index";

const SHAKE_INTERVAL = 30_000; // periodic attention shake
const INACTIVITY_TIMEOUT = 5 * 60_000; // retreat after 5 min idle

/**
 * Site-wide floating WhatsApp button.
 * - Soft pulse to catch the eye, periodic shake every 30s
 * - Hover/focus expands to reveal "Devis WhatsApp"
 * - After 5 min of inactivity it retreats to a peeking tab (still reachable)
 * - 56px tap target on mobile
 */
export function WhatsAppFloat() {
  const reduced = usePrefersReducedMotion();
  const [shaking, setShaking] = useState(false);
  const [retreated, setRetreated] = useState(false);
  const idleTimer = useRef<number | undefined>(undefined);

  // Periodic shake
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setShaking(true);
      window.setTimeout(() => setShaking(false), 1200);
    }, SHAKE_INTERVAL);
    return () => window.clearInterval(id);
  }, [reduced]);

  // Inactivity → retreat; any activity restores it
  useEffect(() => {
    const resetIdle = () => {
      setRetreated(false);
      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(
        () => setRetreated(true),
        INACTIVITY_TIMEOUT,
      );
    };
    const events = ["mousemove", "scroll", "keydown", "touchstart", "click"];
    events.forEach((e) => window.addEventListener(e, resetIdle, { passive: true }));
    resetIdle();
    return () => {
      window.clearTimeout(idleTimer.current);
      events.forEach((e) => window.removeEventListener(e, resetIdle));
    };
  }, []);

  return (
    <div
      style={{ zIndex: Z.float }}
      className={cn(
        "fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:bottom-7 sm:right-7",
        retreated && "translate-x-[58%]",
      )}
      onMouseEnter={() => setRetreated(false)}
      onFocusCapture={() => setRetreated(false)}
    >
      <button
        type="button"
        aria-label="Discuter sur WhatsApp"
        title="Discuter sur WhatsApp"
        onClick={() => openWhatsApp(QUICK_MESSAGE, { source: "float_button" })}
        style={{ animation: reduced ? undefined : "float-pulse 2.6s infinite" }}
        className={cn(
          "group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_40px_-8px_rgba(37,211,102,0.6)] outline-none transition-[width,border-radius] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:w-auto hover:gap-2.5 hover:rounded-2xl hover:px-5 focus-visible:w-auto focus-visible:gap-2.5 focus-visible:rounded-2xl focus-visible:px-5",
          shaking && "[animation:wa-shake_1.2s_ease-in-out]",
        )}
      >
        <WhatsAppIcon className="h-7 w-7 shrink-0" />
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:inline group-hover:max-w-[160px] group-hover:opacity-100 group-focus-visible:inline group-focus-visible:max-w-[160px] group-focus-visible:opacity-100">
          💬 Devis WhatsApp
        </span>
      </button>
    </div>
  );
}
