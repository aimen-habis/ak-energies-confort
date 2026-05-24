import Link from "next/link";
import {
  BadgeCheck,
  Clock,
  Euro,
  Wrench,
  Gauge,
  Leaf,
  ShieldCheck,
  Snowflake,
  VolumeX,
  CalendarCheck,
  Flame,
  Wind,
  ChevronRight,
  Star,
  Plus,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LocalCta } from "@/components/local/LocalCta";
import {
  getLocalPage,
  PRICING_ON_QUOTE,
  PRICING_QUOTE_NOTE,
  PRICING_QUOTE_VALUE,
  type LocalPage,
  type WhyIcon,
} from "@/lib/local-pages";
import { SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

const WHY_ICONS: Record<WhyIcon, LucideIcon> = {
  BadgeCheck,
  Clock,
  Euro,
  Wrench,
  Gauge,
  Leaf,
  ShieldCheck,
  Snowflake,
  VolumeX,
  CalendarCheck,
  Flame,
  Wind,
};

const HERO_BG: Record<LocalPage["theme"], string> = {
  fire: "radial-gradient(circle at 25% 20%, #3a1206, transparent 55%), radial-gradient(circle at 80% 60%, #2a0d04, transparent 50%)",
  frost:
    "radial-gradient(circle at 25% 20%, #06304a, transparent 55%), radial-gradient(circle at 80% 60%, #042033, transparent 50%)",
  mixed:
    "radial-gradient(circle at 22% 25%, #3a1206, transparent 52%), radial-gradient(circle at 78% 65%, #06304a, transparent 52%)",
};

const ACCENT: Record<LocalPage["theme"], string> = {
  fire: "text-flame",
  frost: "text-frost",
  mixed: "text-flame-glow",
};

export function LocalPageView({ page }: { page: LocalPage }) {
  const related = page.related
    .map((slug) => getLocalPage(slug))
    .filter((p): p is LocalPage => Boolean(p));

  const pageUrl = `${SITE.url}/${page.slug}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
      { "@type": "ListItem", position: 2, name: page.breadcrumb, item: pageUrl },
    ],
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: page.serviceType,
    name: page.h1,
    areaServed: page.communes
      ? page.communes.map((c) => ({ "@type": "City", name: c.name }))
      : { "@type": "City", name: page.city },
    provider: {
      "@type": "HVACBusiness",
      name: SITE.name,
      telephone: "+33630269308",
      url: SITE.url,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating,
      reviewCount: SITE.reviewCount,
      bestRating: 5,
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* HERO */}
      <section
        className="relative overflow-hidden pb-20 pt-36 sm:pt-44"
        style={{ background: HERO_BG[page.theme] }}
      >
        <div className="grid-noise absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'Ariane" className="mb-8">
            <ol className="flex items-center gap-1.5 text-sm text-platinum/55">
              <li>
                <Link href="/" className="transition-colors hover:text-flame">
                  Accueil
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" aria-hidden />
              <li className="text-platinum/80" aria-current="page">
                {page.breadcrumb}
              </li>
            </ol>
          </nav>

          <h1 className="max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight text-platinum">
            {page.h1}
          </h1>
          <p className="mt-7 max-w-2xl text-lg text-platinum/75 sm:text-xl">
            {page.heroLead}
          </p>

          <div className="mt-10">
            <LocalCta context={page.h1} city={page.city} slug={page.slug} />
          </div>

          {/* Mini trust line */}
          <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-platinum/70">
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-flame-glow text-flame-glow" /> 5,0/5
              sur Google
            </li>
            <li className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-flame-glow" /> Entreprise RGE
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-frost" /> Intervention sous 24h
            </li>
          </ul>
        </div>
      </section>

      {/* CONTENU LOCALISÉ */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow={page.city}
          title={
            <>
              Votre spécialiste{" "}
              <span className={ACCENT[page.theme]}>{page.serviceType}</span>
              <br />à {page.city}.
            </>
          }
        />
        <div className="mt-10 grid max-w-3xl gap-6">
          {page.intro.map((para, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-lg leading-relaxed text-platinum/75">{para}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COMMUNES (page hub uniquement) */}
      {page.communes && page.communes.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8 sm:pb-28">
          <SectionHeading
            eyebrow="Zone d'intervention"
            title={
              <>
                {page.communes.length} communes,{" "}
                <span className={ACCENT[page.theme]}>un seul artisan.</span>
              </>
            }
            intro="Pour chaque commune, des problématiques typiques que nous connaissons bien."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.communes.map((commune, i) => (
              <Reveal key={commune.name} delay={(i % 3) * 0.06}>
                <div className="glass h-full rounded-2xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-platinum">
                    <span
                      className={cn("h-1.5 w-1.5 rounded-full bg-current", ACCENT[page.theme])}
                    />
                    {commune.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-platinum/65">
                    {commune.blurb}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* POURQUOI NOUS */}
      <section className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8 sm:pb-28">
        <SectionHeading eyebrow="Pourquoi nous choisir" title="Le bon choix, localement." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {page.why.map((point, i) => {
            const Icon = WHY_ICONS[point.icon];
            return (
              <Reveal key={point.title} delay={i * 0.08}>
                <div className="glass h-full rounded-3xl p-8">
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5",
                      ACCENT[page.theme],
                    )}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-platinum">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-platinum/65">{point.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* TARIFS (optionnel — absent sur la page hub) */}
      {page.pricing && page.pricing.length > 0 && (
      <section className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8 sm:pb-28">
        <SectionHeading
          eyebrow="Tarifs indicatifs"
          title="Des prix transparents."
          intro={page.pricingIntro}
        />
        <Reveal className="mt-12 overflow-hidden rounded-3xl border border-white/10">
          <table className="w-full text-left">
            <tbody>
              {page.pricing.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-white/8 last:border-0 even:bg-white/[0.02]"
                >
                  <th
                    scope="row"
                    className="px-5 py-5 font-normal text-platinum/85 sm:px-7"
                  >
                    {row.label}
                    {row.note && (
                      <span className="mt-0.5 block text-sm text-platinum/45">
                        {row.note}
                      </span>
                    )}
                  </th>
                  <td
                    className={cn(
                      "whitespace-nowrap px-5 py-5 text-right font-mono font-semibold sm:px-7",
                      PRICING_ON_QUOTE ? "text-flame" : "text-platinum",
                    )}
                  >
                    {PRICING_ON_QUOTE ? PRICING_QUOTE_VALUE : row.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="mt-4 text-sm text-platinum/45">
          {PRICING_ON_QUOTE ? PRICING_QUOTE_NOTE : page.pricingNote}
        </p>
      </section>
      )}

      {/* FAQ locale (native <details> = SSR + accessible) */}
      <section className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8 sm:pb-28">
        <SectionHeading eyebrow="Questions fréquentes" title="On vous répond." />
        <div className="mt-12 grid max-w-3xl gap-3">
          {page.faq.map((item) => (
            <details
              key={item.question}
              className="group glass rounded-2xl px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold text-platinum/90 transition-colors hover:text-flame">
                {item.question}
                <Plus className="h-5 w-5 shrink-0 text-flame transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="mt-4 text-platinum/65">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* MAILLAGE INTERNE */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8 sm:pb-28">
          <SectionHeading eyebrow="À découvrir aussi" title="Nos autres prestations." />
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/${rel.slug}`}
                className="group glass flex items-center justify-between gap-4 rounded-2xl p-6 transition-colors hover:border-flame/40"
              >
                <span className="text-lg font-semibold text-platinum group-hover:text-flame">
                  {rel.breadcrumb}
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-platinum/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-flame" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA FINAL */}
      <section className="mx-auto max-w-[1400px] px-5 pb-28 sm:px-8">
        <div className="gradient-border glass flex flex-col items-center gap-7 rounded-3xl px-6 py-14 text-center sm:px-12">
          <h2 className="max-w-2xl font-display text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight text-platinum">
            Un projet à {page.city} ? Parlons-en.
          </h2>
          <p className="max-w-xl text-platinum/65">
            Devis gratuit et sans engagement. Votre message part directement sur
            WhatsApp, pré-rempli.
          </p>
          <LocalCta
            context={page.h1}
            city={page.city}
            slug={page.slug}
            variant="band"
          />
        </div>
      </section>
    </>
  );
}
