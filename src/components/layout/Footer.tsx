"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { NAV_LINKS, SITE } from "@/lib/content";
import { LOCAL_PAGES } from "@/lib/local-pages";
import {
  openWhatsApp,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/lib/whatsapp";

export function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(
      `Bonjour, je souhaite recevoir vos conseils thermiques mensuels.${
        email ? ` Mon email : ${email}` : ""
      }`,
      { source: "newsletter" },
    );
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-void pt-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 pb-16 md:grid-cols-3">
          {/* Col 1 */}
          <div>
            <Logo className="h-9" />
            <p className="mt-6 max-w-xs text-lg leading-relaxed text-platinum/70">
              {SITE.tagline}
            </p>
            <div className="mt-6 h-1 w-28 rounded-full bg-[image:var(--gradient-signature)]" />
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-platinum/40">
              Navigation
            </h3>
            <ul className="mt-6 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-platinum/70 transition-colors hover:text-flame"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-platinum/70 transition-colors hover:text-flame"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="text-platinum/70 transition-colors hover:text-flame"
                >
                  Confidentialité (RGPD)
                </Link>
              </li>
            </ul>

            <h3 className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-platinum/40">
              Prestations à Strasbourg
            </h3>
            <ul className="mt-5 space-y-3">
              {LOCAL_PAGES.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${p.slug}`}
                    className="text-platinum/70 transition-colors hover:text-flame"
                  >
                    {p.breadcrumb}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-platinum/40">
              Conseils thermiques mensuels
            </h3>
            <p className="mt-6 text-platinum/70">
              Astuces d&apos;économies d&apos;énergie, directement via WhatsApp.
            </p>
            <form onSubmit={subscribe} className="mt-5 flex max-w-sm gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email (optionnel)"
                className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-platinum outline-none transition-colors placeholder:text-platinum/40 focus:border-frost"
              />
              <button
                type="submit"
                aria-label="S'abonner via WhatsApp"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-platinum text-void transition-transform hover:scale-105"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <ul className="mt-8 space-y-2.5 text-sm text-platinum/60">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-flame" />
                <a href={`tel:${PHONE_TEL}`} className="hover:text-platinum">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-flame" />
                <a href={`mailto:${SITE.email}`} className="hover:text-platinum">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-frost" /> {SITE.city}, {SITE.region}
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-frost" /> {SITE.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 py-8 sm:flex-row">
          <p className="text-sm text-platinum/50">
            © {new Date().getFullYear()} {SITE.name}. Tous droits réservés.
          </p>
          <p className="text-sm text-platinum/50">
            Conçu avec <span className="text-flame">❤</span> à Strasbourg
          </p>
          <div className="flex gap-3">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-platinum/70 transition-colors hover:border-flame hover:text-flame"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.9.07s-3.6 0-4.86-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5 0-4.74.07-.9.04-1.38.19-1.7.31-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.27.8-.31 1.7C3.43 8.5 3.43 8.85 3.43 12s0 3.5.07 4.74c.04.9.19 1.38.31 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.8.27 1.7.31 1.24.07 1.59.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.38-.19 1.7-.31.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.27-.8.31-1.7.07-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.04-.9-.19-1.38-.31-1.7a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.12-.8-.27-1.7-.31C15.5 4 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 7.06 12 4.94 4.94 0 0 1 12 7.06Zm0 1.8A3.14 3.14 0 1 0 15.14 12 3.14 3.14 0 0 0 12 8.86Zm5.14-.93a1.15 1.15 0 1 1-1.15-1.15 1.15 1.15 0 0 1 1.15 1.15Z" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-platinum/70 transition-colors hover:border-frost hover:text-frost"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.3-.04-1.3-.13-2.45-.13-2.43 0-4.1 1.48-4.1 4.2v2.34H7.6V13h2.7v8h3.2Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Oversized outline wordmark */}
      <div
        aria-hidden
        className="select-none overflow-hidden px-2 pb-2"
      >
        <p className="text-outline whitespace-nowrap text-center font-display text-[13vw] font-extrabold leading-none">
          AK·ÉNERGIES·CONFORT
        </p>
      </div>
    </footer>
  );
}
