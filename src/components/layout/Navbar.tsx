"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/whatsapp";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
import { Z } from "@/lib/z-index";
import { startLenis, stopLenis } from "@/lib/lenis";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scrolling while the mobile menu is open.
  // Lenis ignores `body { overflow: hidden }`, so we must stop it explicitly.
  useEffect(() => {
    if (open) {
      stopLenis();
      document.body.style.overflow = "hidden";
    } else {
      startLenis();
      document.body.style.overflow = "";
    }
    return () => {
      startLenis();
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header
      style={{ zIndex: Z.header }}
      className={cn(
        "fixed inset-x-0 top-0 transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-void/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:h-20 sm:px-8">
        <a href="#top" aria-label="AK Énergies Confort — accueil">
          <Logo className="h-7 sm:h-8" />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm font-medium text-platinum/80 transition-colors hover:text-pure"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[image:var(--gradient-signature)] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-platinum transition-colors hover:border-flame hover:text-flame md:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <a
            href="#contact"
            className="hidden rounded-full bg-platinum px-5 py-2.5 text-sm font-semibold text-void transition-transform hover:scale-[1.03] sm:inline-block"
          >
            Devis gratuit
          </a>
          <button
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-platinum lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </header>

      {/* Fullscreen mobile menu — rendered as a SIBLING of <header>, NOT inside
          it: the scrolled header has `backdrop-blur`, and a backdrop-filter
          ancestor becomes the containing block for `position: fixed` children
          (the menu would then size to the 64px header instead of the viewport). */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
            style={{ zIndex: Z.menu }}
            className="fixed inset-0 overflow-y-auto overscroll-contain bg-void lg:hidden"
          >
            <div
              className="grid-noise pointer-events-none fixed inset-0 opacity-40"
              aria-hidden
            />
            {/* min-h-full → centers when it fits, scrolls from top when it doesn't */}
            <div className="relative flex min-h-full flex-col px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-5 sm:px-8">
              {/* Top bar: logo + close (self-contained, never overlapped) */}
              <div className="flex items-center justify-between">
                <Logo className="h-7" />
                <button
                  type="button"
                  aria-label="Fermer le menu"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-platinum"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-1 py-10">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="font-display text-4xl font-bold leading-tight text-platinum"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="mt-8 inline-flex w-fit items-center gap-2 text-lg text-frost"
                >
                  <Phone className="h-5 w-5" /> {PHONE_DISPLAY}
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
