/**
 * Single source of truth for editorial content.
 * Keeping copy here lets sections stay presentational and typed.
 */
import type { ServiceChoice } from "@/lib/whatsapp";

export const SITE = {
  name: "AK Énergies Confort",
  tagline: "Le confort thermique, réinventé à Strasbourg.",
  city: "Strasbourg",
  region: "Bas-Rhin", // département (affichage)
  adminRegion: "Grand Est", // région administrative (schema.org)
  postalCode: "67000",
  yearsExperience: 15,
  rating: 5.0,
  reviewCount: 26, // avis Google réels
  email: "contact@ak-energies-confort.com",
  hours: "Lun – Ven · 08h00 – 17h00",
  hoursClosed: "Samedi & Dimanche fermé",
  coords: { lat: 48.5734, lng: 7.7521 },
  url: "https://ak-energies-confort.com",
} as const;

/** Communes citées dans le JSON-LD `areaServed` (cœur de zone). */
export const AREAS_SERVED: string[] = [
  "Strasbourg",
  "Schiltigheim",
  "Illkirch-Graffenstaden",
  "Lingolsheim",
  "Bischheim",
  "Hoenheim",
  "Ostwald",
  "Eckbolsheim",
];

/** Liste complète affichée dans la section « Zones d'intervention ». */
export const INTERVENTION_ZONES: string[] = [
  "Strasbourg",
  "Schiltigheim",
  "Illkirch-Graffenstaden",
  "Lingolsheim",
  "Bischheim",
  "Hoenheim",
  "Ostwald",
  "Eckbolsheim",
  "Mundolsheim",
  "Reichstett",
  "Wolfisheim",
  "Vendenheim",
  "Souffelweyersheim",
  "Geispolsheim",
  "Oberhausbergen",
  "Mittelhausbergen",
];

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Expertise", href: "#expertise" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Avis", href: "#temoignages" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const STATS = [
  { value: 15, suffix: " ans", label: "d'expertise" },
  { value: 500, suffix: "+", label: "installations" },
  { value: 100, suffix: "%", label: "satisfaction" },
] as const;

export type ThermalTheme = "fire" | "frost" | "mixed";

export interface PillarCard {
  icon: "PiggyBank" | "Leaf" | "Sofa";
  eyebrow: string;
  metric: number;
  metricPrefix?: string;
  metricSuffix: string;
  title: string;
  body: string;
  theme: ThermalTheme;
}

export const PILLARS: PillarCard[] = [
  {
    icon: "PiggyBank",
    eyebrow: "Économies",
    metricPrefix: "-",
    metric: 40,
    metricSuffix: "%",
    title: "Sur vos factures",
    body: "Une pompe à chaleur correctement dimensionnée allège durablement vos dépenses énergétiques, hiver comme été.",
    theme: "fire",
  },
  {
    icon: "Leaf",
    eyebrow: "Écologie",
    metricPrefix: "-",
    metric: 60,
    metricSuffix: "%",
    title: "D'émissions CO₂",
    body: "Des solutions bas carbone qui réduisent votre empreinte sans jamais sacrifier votre confort au quotidien.",
    theme: "frost",
  },
  {
    icon: "Sofa",
    eyebrow: "Confort",
    metric: 365,
    metricSuffix: " j",
    title: "De bien-être",
    body: "Une température idéale toute l'année, pilotée au degré près, dans chaque pièce de votre logement.",
    theme: "mixed",
  },
];

export interface ServiceItem {
  index: string;
  key: ServiceChoice;
  title: string;
  lead: string;
  features: string[];
  theme: ThermalTheme;
  icon: "Flame" | "Snowflake" | "Wind" | "Droplets";
}

export const SERVICES: ServiceItem[] = [
  {
    index: "01",
    key: "Chauffage",
    title: "Chauffage",
    lead: "Des installations performantes pour traverser l'hiver sereinement.",
    features: [
      "Chaudières gaz, fioul & condensation",
      "Pompes à chaleur Air/Eau & Air/Air",
      "Plancher chauffant",
      "Radiateurs nouvelle génération",
      "Mise en service & dépannage",
    ],
    theme: "fire",
    icon: "Flame",
  },
  {
    index: "02",
    key: "Climatisation",
    title: "Climatisation",
    lead: "La fraîcheur maîtrisée, silencieuse et économe en énergie.",
    features: [
      "Splits muraux & multi-splits",
      "Cassettes plafond & gainables",
      "Toutes marques du marché",
      "Entretien annuel obligatoire",
      "Mise en service & dépannage",
    ],
    theme: "frost",
    icon: "Snowflake",
  },
  {
    index: "03",
    key: "CTA (traitement d'air)",
    title: "Traitement d'air",
    lead: "Un air sain et renouvelé, pour les espaces qui l'exigent.",
    features: [
      "CTA double flux",
      "Récupération de chaleur",
      "Filtration HEPA",
      "Maintenance préventive trimestrielle",
      "Diagnostic qualité d'air",
    ],
    theme: "mixed",
    icon: "Wind",
  },
  {
    index: "04",
    key: "Ballon d'eau chaude",
    title: "Eau chaude sanitaire",
    lead: "De l'eau chaude à la demande, sans gaspillage.",
    features: [
      "Ballons électriques",
      "Ballons thermodynamiques (-70%)",
      "Chauffe-eau solaire",
      "Installation rapide en 24h",
      "Entretien & détartrage",
    ],
    theme: "fire",
    icon: "Droplets",
  },
];

export interface ProcessStep {
  index: string;
  title: string;
  body: string;
  meta: string;
  icon: "FileText" | "Search" | "PencilRuler" | "Wrench";
}

export const PROCESS: ProcessStep[] = [
  {
    index: "01",
    title: "Devis en ligne",
    body: "Décrivez votre projet en 30 secondes. Nous revenons vers vous rapidement, par WhatsApp ou téléphone.",
    meta: "Formulaire 30s · Réponse sous 2h",
    icon: "FileText",
  },
  {
    index: "02",
    title: "Visite technique",
    body: "Un diagnostic précis réalisé chez vous pour dimensionner la solution la plus adaptée à votre logement.",
    meta: "Diagnostic gratuit à domicile",
    icon: "Search",
  },
  {
    index: "03",
    title: "Proposition sur-mesure",
    body: "Un devis détaillé, transparent et sans surprise. Vous savez exactement ce que vous payez, et pourquoi.",
    meta: "Devis détaillé & transparent",
    icon: "PencilRuler",
  },
  {
    index: "04",
    title: "Installation",
    body: "Une pose réalisée dans les règles de l'art, avec un chantier propre et des délais tenus.",
    meta: "Pose professionnelle · Délais respectés",
    icon: "Wrench",
  },
];

export type RealisationCategory = "Chauffage" | "Climatisation" | "CTA";

export interface Realisation {
  title: string;
  location: string;
  category: RealisationCategory;
  theme: ThermalTheme;
  /** Bento span on large screens. */
  span: "sm" | "md" | "lg" | "wide" | "tall";
  icon: "Flame" | "Snowflake" | "Wind" | "Droplets" | "Thermometer" | "Fan";
}

export const REALISATIONS: Realisation[] = [
  {
    title: "PAC Air/Eau Daikin",
    location: "Maison · Robertsau",
    category: "Chauffage",
    theme: "fire",
    span: "lg",
    icon: "Flame",
  },
  {
    title: "Multi-split 4 zones",
    location: "Appartement · Krutenau",
    category: "Climatisation",
    theme: "frost",
    span: "tall",
    icon: "Snowflake",
  },
  {
    title: "CTA double flux",
    location: "Bureaux · Schiltigheim",
    category: "CTA",
    theme: "mixed",
    span: "sm",
    icon: "Wind",
  },
  {
    title: "Plancher chauffant",
    location: "Villa · Illkirch",
    category: "Chauffage",
    theme: "fire",
    span: "sm",
    icon: "Thermometer",
  },
  {
    title: "Gainable invisible",
    location: "Loft · Centre-ville",
    category: "Climatisation",
    theme: "frost",
    span: "wide",
    icon: "Fan",
  },
  {
    title: "Ballon thermodynamique",
    location: "Maison · Lingolsheim",
    category: "Chauffage",
    theme: "fire",
    span: "sm",
    icon: "Droplets",
  },
  {
    title: "Cassette plafond",
    location: "Commerce · Hautepierre",
    category: "Climatisation",
    theme: "frost",
    span: "sm",
    icon: "Snowflake",
  },
  {
    title: "Filtration HEPA",
    location: "Clinique · Strasbourg",
    category: "CTA",
    theme: "mixed",
    span: "md",
    icon: "Wind",
  },
];

export const REALISATION_FILTERS: ("Tout" | RealisationCategory)[] = [
  "Tout",
  "Chauffage",
  "Climatisation",
  "CTA",
];

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
  detail: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Intervention rapide, prix honnête, travail impeccable. Je recommande sans hésiter.",
    author: "Sophie M.",
    location: "Schiltigheim",
    detail: "Installation PAC · Mars 2025",
  },
  {
    quote:
      "Une clim posée en une journée, propre et silencieuse. Conseils précieux sur le réglage.",
    author: "Karim B.",
    location: "Krutenau",
    detail: "Multi-split · Juin 2024",
  },
  {
    quote:
      "Diagnostic clair, devis sans surprise. On sent les 15 ans de métier derrière chaque geste.",
    author: "Hélène R.",
    location: "Robertsau",
    detail: "Chaudière condensation · Janvier 2025",
  },
  {
    quote:
      "Dépannage le jour même en plein hiver. Réactivité et professionnalisme au rendez-vous.",
    author: "Thomas G.",
    location: "Illkirch",
    detail: "Dépannage chauffage · Décembre 2024",
  },
  {
    quote:
      "Le ballon thermodynamique a fait fondre ma facture d'eau chaude. Bluffant.",
    author: "Nadia L.",
    location: "Lingolsheim",
    detail: "Ballon thermo · Septembre 2024",
  },
  {
    quote:
      "Chantier nickel, équipe ponctuelle et de bons conseils. Rien à redire.",
    author: "Pierre D.",
    location: "Centre-ville",
    detail: "Gainable · Mai 2024",
  },
  {
    quote:
      "Très à l'écoute, ils ont trouvé la solution parfaite pour mon vieux logement.",
    author: "Amélie V.",
    location: "Neudorf",
    detail: "PAC Air/Air · Février 2025",
  },
  {
    quote:
      "Entretien annuel sérieux et transparent. Je leur confie ma clim sans inquiétude.",
    author: "Julien F.",
    location: "Hautepierre",
    detail: "Entretien clim · Avril 2025",
  },
];

export interface TrustItem {
  icon: "Star" | "BadgeCheck" | "Award" | "MapPin" | "Zap";
  label: string;
}

export const TRUST_ITEMS: TrustItem[] = [
  { icon: "Star", label: "5,0/5 sur Google (26 avis)" },
  { icon: "BadgeCheck", label: "Entreprise certifiée RGE" },
  { icon: "Award", label: "15 ans d'expérience" },
  { icon: "MapPin", label: "Strasbourg & Bas-Rhin" },
  { icon: "Zap", label: "Devis sous 24h" },
];

export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQ ciblée SEO local — alimente aussi le FAQPage JSON-LD. */
export const FAQ: FaqItem[] = [
  {
    question: "Quel est le prix d'une pompe à chaleur à Strasbourg ?",
    answer:
      "Le tarif varie selon la surface et le type de PAC. Comptez entre 8 000 € et 15 000 € avant aides. Avec MaPrimeRénov' et les CEE, le reste à charge tombe souvent entre 3 000 € et 7 000 €.",
  },
  {
    question: "Combien coûte un dépannage de chaudière à Strasbourg ?",
    answer:
      "Le déplacement et le diagnostic sont chiffrés sur devis, gratuit et sans engagement. Nous intervenons sous 24h à Strasbourg et dans tout le Bas-Rhin, toutes marques de chaudières.",
  },
  {
    question: "L'entretien annuel d'une chaudière gaz est-il obligatoire ?",
    answer:
      "Oui, c'est une obligation légale depuis 2009 pour les chaudières entre 4 et 400 kW. Le tarif vous est communiqué sur devis, et nous remettons l'attestation réglementaire après chaque intervention.",
  },
  {
    question: "Quelles aides pour installer une PAC à Strasbourg ?",
    answer:
      "Elles sont cumulables : MaPrimeRénov' (jusqu'à 5 000 €), CEE (jusqu'à 4 000 €), Éco-PTZ (prêt à 0 %) et TVA à 5,5 %. Nous gérons les démarches pour vous.",
  },
  {
    question: "Quelle est votre zone d'intervention ?",
    answer:
      "Strasbourg et tout le Bas-Rhin : Schiltigheim, Illkirch, Lingolsheim, Bischheim, Hoenheim, Ostwald, Eckbolsheim, dans un rayon de 30 km.",
  },
  {
    question: "Êtes-vous certifié RGE ?",
    answer:
      "Oui, notre entreprise est certifiée RGE (Reconnu Garant de l'Environnement), ce qui vous permet de bénéficier des aides MaPrimeRénov' et CEE.",
  },
  {
    question: "Quels délais pour installer une chaudière ?",
    answer:
      "Après acceptation du devis, comptez 1 à 3 semaines. L'installation elle-même prend 1 à 2 jours sur place.",
  },
  {
    question: "Faites-vous le dépannage en urgence ?",
    answer:
      "Nous sommes disponibles du lundi au vendredi de 8h à 17h. Pour toute urgence, contactez-nous directement via WhatsApp ou par téléphone.",
  },
];
