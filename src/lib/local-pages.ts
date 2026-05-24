/**
 * Pages locales SEO (landing pages par prestation × ville).
 * Chaque page a un contenu UNIQUE (pas de duplication) pour ranker sur une
 * requête précise. Route : src/app/[slug]/page.tsx (prerender statique).
 */
import type { ServiceChoice } from "@/lib/whatsapp";
import type { ThermalTheme } from "@/lib/content";
import type { FaqItem } from "@/lib/content";

export type WhyIcon =
  | "BadgeCheck"
  | "Clock"
  | "Euro"
  | "Wrench"
  | "Gauge"
  | "Leaf"
  | "ShieldCheck"
  | "Snowflake"
  | "VolumeX"
  | "CalendarCheck"
  | "Flame"
  | "Wind";

export interface WhyPoint {
  icon: WhyIcon;
  title: string;
  body: string;
}

export interface PricingRow {
  label: string;
  price: string;
  note?: string;
}

export interface LocalPage {
  slug: string;
  /** Service pré-rempli dans le message WhatsApp. */
  ctaService: ServiceChoice;
  city: string;
  theme: ThermalTheme;
  breadcrumb: string;
  h1: string;
  heroLead: string;
  metaTitle: string;
  metaDescription: string;
  /** Type de service pour le Service JSON-LD. */
  serviceType: string;
  intro: string[];
  why: WhyPoint[];
  /** Tableau de tarifs — optionnel (la page hub n'en a pas). */
  pricingIntro?: string;
  pricing?: PricingRow[];
  pricingNote?: string;
  /** Mini-paragraphes par commune — uniquement pour la page hub Bas-Rhin. */
  communes?: Commune[];
  faq: FaqItem[];
  /** Slugs des pages liées (maillage interne). */
  related: string[];
}

export interface Commune {
  name: string;
  blurb: string;
}

export const LOCAL_PAGES: LocalPage[] = [
  {
    slug: "chauffagiste-strasbourg",
    ctaService: "Chauffage",
    city: "Strasbourg",
    theme: "fire",
    breadcrumb: "Chauffagiste Strasbourg",
    h1: "Chauffagiste à Strasbourg",
    heroLead:
      "Installation, dépannage et entretien de votre chauffage par un artisan RGE, à Strasbourg et dans tout le Bas-Rhin.",
    metaTitle: "Chauffagiste Strasbourg | AK Énergies Confort RGE",
    metaDescription:
      "Chauffagiste RGE à Strasbourg : installation, dépannage et entretien de chaudières et pompes à chaleur. 5/5 Google, devis gratuit ☎ 06 30 26 93 08.",
    serviceType: "Chauffagiste",
    intro: [
      "Basé à Strasbourg, AK Énergies Confort est votre chauffagiste de proximité depuis 15 ans. Nous accompagnons les particuliers et les professionnels du Bas-Rhin sur l'ensemble de leurs besoins en chauffage : installation de chaudières gaz à condensation, pose de pompes à chaleur, remplacement d'équipements vétustes, dépannage en cas de panne et entretien annuel obligatoire.",
      "Le climat alsacien, avec ses hivers rigoureux, ne pardonne pas un chauffage mal dimensionné. C'est pourquoi chaque intervention démarre par un diagnostic précis de votre logement : surface, isolation, type d'émetteurs et habitudes de consommation. Cette étude nous permet de vous proposer la solution la plus sobre et la plus confortable, sans surdimensionnement inutile.",
      "Certifiés RGE (Reconnu Garant de l'Environnement), nous vous ouvrons l'accès aux aides de l'État — MaPrimeRénov', primes CEE, Éco-PTZ — et nous gérons les démarches administratives à votre place. Réactivité, devis transparent et travail soigné : c'est ce qui nous vaut une note de 5/5 sur Google auprès de nos clients strasbourgeois.",
    ],
    why: [
      {
        icon: "BadgeCheck",
        title: "Artisan RGE local",
        body: "Une entreprise strasbourgeoise certifiée RGE : vous bénéficiez des aides et d'un interlocuteur unique qui connaît votre secteur.",
      },
      {
        icon: "Clock",
        title: "Intervention sous 24h",
        body: "Une panne de chauffage ? Nous intervenons rapidement à Strasbourg et dans un rayon de 30 km.",
      },
      {
        icon: "Euro",
        title: "Devis clair et gratuit",
        body: "Un chiffrage détaillé, sans frais cachés. Vous savez exactement ce que vous payez avant de vous engager.",
      },
    ],
    pricingIntro:
      "Quelques repères tarifaires pour le chauffage à Strasbourg. Chaque chantier fait l'objet d'un devis gratuit et personnalisé.",
    pricing: [
      { label: "Dépannage chauffage (déplacement + diagnostic)", price: "dès 90 € TTC" },
      { label: "Entretien annuel chaudière gaz", price: "90 – 150 € TTC" },
      {
        label: "Installation chaudière gaz à condensation",
        price: "à partir de 3 500 €",
        note: "pose comprise",
      },
      {
        label: "Installation pompe à chaleur air/eau",
        price: "8 000 – 15 000 €",
        note: "avant aides MaPrimeRénov' & CEE",
      },
    ],
    pricingNote:
      "Tarifs indicatifs au 2026, hors aides. Le reste à charge réel est souvent bien inférieur grâce aux subventions.",
    faq: [
      {
        question: "Quel chauffage choisir pour une maison à Strasbourg ?",
        answer:
          "Pour une maison bien isolée, la pompe à chaleur air/eau est aujourd'hui le meilleur compromis économies-confort. Pour un logement de centre-ville raccordé au gaz, une chaudière à condensation reste pertinente. Nous vous conseillons après diagnostic.",
      },
      {
        question: "Êtes-vous bien certifié RGE ?",
        answer:
          "Oui. Notre certification RGE est vérifiable et vous permet de bénéficier de MaPrimeRénov' et des primes CEE pour vos travaux de chauffage.",
      },
      {
        question: "Intervenez-vous en dehors de Strasbourg ?",
        answer:
          "Nous couvrons tout le Bas-Rhin dans un rayon de 30 km : Schiltigheim, Illkirch, Lingolsheim, Bischheim, Ostwald et les communes environnantes.",
      },
    ],
    related: [
      "depannage-chaudiere-strasbourg",
      "installation-pompe-a-chaleur-strasbourg",
      "entretien-chaudiere-strasbourg",
    ],
  },
  {
    slug: "depannage-chaudiere-strasbourg",
    ctaService: "Chauffage",
    city: "Strasbourg",
    theme: "fire",
    breadcrumb: "Dépannage chaudière Strasbourg",
    h1: "Dépannage de chaudière à Strasbourg",
    heroLead:
      "Plus d'eau chaude, code erreur, chaudière en sécurité ? On intervient rapidement à Strasbourg, toutes marques.",
    metaTitle: "Dépannage chaudière Strasbourg | Intervention 24h",
    metaDescription:
      "Dépannage de chaudière à Strasbourg sous 24h, toutes marques. Diagnostic et devis gratuits. Chauffagiste RGE noté 5/5 ☎ 06 30 26 93 08.",
    serviceType: "Dépannage de chaudière",
    intro: [
      "Une chaudière qui tombe en panne en plein hiver strasbourgeois, c'est l'urgence numéro un. AK Énergies Confort intervient rapidement à Strasbourg et dans le Bas-Rhin pour diagnostiquer et réparer votre installation, quelle que soit sa marque : Saunier Duval, De Dietrich, Vaillant, Frisquet, Chaffoteaux, Viessmann et bien d'autres.",
      "Perte de pression, voyant rouge, code erreur, plus d'eau chaude, bruit anormal, fumées ou odeur suspecte : ces symptômes nécessitent un œil professionnel. Nous arrivons équipés des pièces de rechange les plus courantes pour résoudre un maximum de pannes dès la première visite, sans vous laisser dans le froid.",
      "Chaque dépannage commence par un diagnostic clair : nous vous expliquons l'origine de la panne, le coût de la réparation et, le cas échéant, si un remplacement est plus rentable qu'une réparation. Notre objectif : une décision éclairée et un chauffage qui repart vite. Nos clients strasbourgeois nous notent 5/5 pour notre réactivité et notre honnêteté.",
    ],
    why: [
      {
        icon: "Clock",
        title: "Réactivité sous 24h",
        body: "Une panne ne s'anticipe pas. Nous priorisons les urgences chauffage à Strasbourg pour vous remettre au chaud vite.",
      },
      {
        icon: "Wrench",
        title: "Toutes marques",
        body: "Gaz, fioul ou condensation : nos techniciens dépannent l'ensemble des marques du marché.",
      },
      {
        icon: "Euro",
        title: "Diagnostic transparent",
        body: "Le coût de l'intervention vous est annoncé avant réparation. Aucune mauvaise surprise sur la facture.",
      },
    ],
    pricingIntro:
      "Repères tarifaires pour un dépannage de chaudière à Strasbourg. Devis gratuit confirmé avant toute réparation.",
    pricing: [
      { label: "Déplacement + diagnostic", price: "dès 90 € TTC" },
      { label: "Réparation courante (allumage, sonde, pressostat)", price: "120 – 250 € TTC" },
      { label: "Remplacement de pièce (circulateur, vase, carte)", price: "sur devis" },
      {
        label: "Entretien annuel (recommandé après dépannage)",
        price: "90 – 150 € TTC",
      },
    ],
    pricingNote:
      "Tarifs indicatifs. Le prix exact dépend de la pièce et du temps d'intervention, communiqué avant accord.",
    faq: [
      {
        question: "Combien coûte un dépannage de chaudière à Strasbourg ?",
        answer:
          "Le déplacement, le diagnostic et la réparation sont chiffrés sur devis — gratuit et validé avant toute intervention. Vous connaissez le coût exact avant que nous intervenions.",
      },
      {
        question: "Intervenez-vous le jour même ?",
        answer:
          "Nous priorisons les urgences chauffage et intervenons le plus souvent sous 24h à Strasbourg, du lundi au vendredi. Contactez-nous par WhatsApp ou téléphone pour le créneau le plus proche.",
      },
      {
        question: "Vaut-il mieux réparer ou remplacer ma chaudière ?",
        answer:
          "Au-delà de 15 ans ou si les pannes se répètent, le remplacement par une chaudière à condensation ou une pompe à chaleur devient souvent plus rentable. Nous vous donnons un avis honnête après diagnostic.",
      },
    ],
    related: [
      "chauffagiste-strasbourg",
      "entretien-chaudiere-strasbourg",
      "installation-pompe-a-chaleur-strasbourg",
    ],
  },
  {
    slug: "installation-pompe-a-chaleur-strasbourg",
    ctaService: "Chauffage",
    city: "Strasbourg",
    theme: "mixed",
    breadcrumb: "Pompe à chaleur Strasbourg",
    h1: "Installation de pompe à chaleur à Strasbourg",
    heroLead:
      "Divisez votre facture de chauffage avec une pompe à chaleur dimensionnée sur-mesure. Artisan RGE, aides gérées.",
    metaTitle: "Pompe à chaleur Strasbourg | Installation PAC RGE",
    metaDescription:
      "Installation de pompe à chaleur à Strasbourg par un artisan RGE. Jusqu'à -40% sur vos factures, aides MaPrimeRénov' gérées. Devis gratuit ☎ 06 30 26 93 08.",
    serviceType: "Installation de pompe à chaleur",
    intro: [
      "La pompe à chaleur est devenue la solution de chauffage la plus performante pour les logements de Strasbourg et du Bas-Rhin. En captant les calories de l'air extérieur, elle restitue jusqu'à 3 à 4 fois plus d'énergie qu'elle n'en consomme — de quoi réduire vos factures jusqu'à 40 %, tout en chauffant l'hiver et en rafraîchissant l'été pour les modèles air/air.",
      "AK Énergies Confort installe des PAC air/eau (raccordées à vos radiateurs ou planchers chauffants) et des PAC air/air des plus grandes marques. La réussite d'une installation tient au dimensionnement : une PAC sous-dimensionnée peine en cas de grand froid alsacien, une PAC surdimensionnée gaspille. Notre étude thermique garantit le bon équilibre pour votre maison.",
      "En tant qu'entreprise RGE, nous vous faisons bénéficier de MaPrimeRénov' (jusqu'à 5 000 €), des primes CEE (jusqu'à 4 000 €), de l'Éco-PTZ et de la TVA à 5,5 %. Nous montons les dossiers d'aides pour vous : votre reste à charge tombe souvent entre 3 000 € et 7 000 €. Installation propre, mise en service et réglages inclus.",
    ],
    why: [
      {
        icon: "Leaf",
        title: "Jusqu'à -40% de facture",
        body: "Une PAC bien dimensionnée allège durablement vos dépenses d'énergie et votre empreinte carbone.",
      },
      {
        icon: "Gauge",
        title: "Dimensionnement sur-mesure",
        body: "Étude thermique de votre logement pour une PAC qui tient même lors des hivers alsaciens les plus froids.",
      },
      {
        icon: "BadgeCheck",
        title: "Aides RGE gérées",
        body: "MaPrimeRénov', CEE, Éco-PTZ : nous montons les dossiers et réduisons votre reste à charge.",
      },
    ],
    pricingIntro:
      "Repères de prix pour l'installation d'une pompe à chaleur à Strasbourg, avant déduction des aides.",
    pricing: [
      { label: "PAC air/air (mono-split réversible)", price: "à partir de 3 000 €" },
      { label: "PAC air/air multi-split", price: "5 000 – 9 000 €" },
      {
        label: "PAC air/eau (chauffage + eau chaude)",
        price: "8 000 – 15 000 €",
        note: "selon surface",
      },
      {
        label: "Reste à charge estimé avec aides",
        price: "3 000 – 7 000 €",
        note: "RGE requis",
      },
    ],
    pricingNote:
      "Tarifs indicatifs avant aides. Le montant final dépend du modèle, de la surface et de votre éligibilité aux subventions.",
    faq: [
      {
        question: "Quel est le prix d'une pompe à chaleur à Strasbourg ?",
        answer:
          "Comptez entre 8 000 € et 15 000 € pour une PAC air/eau avant aides. Avec MaPrimeRénov' et les CEE, le reste à charge tombe souvent entre 3 000 € et 7 000 €.",
      },
      {
        question: "Une PAC est-elle efficace par grand froid en Alsace ?",
        answer:
          "Oui, à condition d'être correctement dimensionnée. Les PAC actuelles fonctionnent jusqu'à -15 °C et plus. Notre étude thermique garantit la performance même en plein hiver alsacien.",
      },
      {
        question: "Quelles aides pour une pompe à chaleur ?",
        answer:
          "MaPrimeRénov' (jusqu'à 5 000 €), primes CEE (jusqu'à 4 000 €), Éco-PTZ et TVA à 5,5 %, cumulables. En tant qu'artisan RGE, nous gérons l'ensemble des démarches.",
      },
    ],
    related: [
      "chauffagiste-strasbourg",
      "installation-climatisation-strasbourg",
      "depannage-chaudiere-strasbourg",
    ],
  },
  {
    slug: "installation-climatisation-strasbourg",
    ctaService: "Climatisation",
    city: "Strasbourg",
    theme: "frost",
    breadcrumb: "Climatisation Strasbourg",
    h1: "Installation de climatisation à Strasbourg",
    heroLead:
      "Gardez le frais l'été à Strasbourg : splits, multi-splits et gainables silencieux, posés par des pros toutes marques.",
    metaTitle: "Climatisation Strasbourg | Installation & pose clim",
    metaDescription:
      "Installation de climatisation à Strasbourg : splits, multi-splits et gainables toutes marques. Silencieux, économes, devis gratuit ☎ 06 30 26 93 08.",
    serviceType: "Installation de climatisation",
    intro: [
      "Les étés strasbourgeois sont de plus en plus chauds, et une climatisation bien conçue change radicalement le confort de votre logement. AK Énergies Confort installe à Strasbourg et dans le Bas-Rhin des climatiseurs splits muraux, multi-splits, cassettes plafonnières et gainables discrets, adaptés aussi bien à l'appartement de centre-ville qu'à la maison individuelle.",
      "Nous travaillons toutes les grandes marques (Daikin, Mitsubishi, Atlantic, Hitachi…) et privilégions des modèles réversibles : vous rafraîchissez l'été et bénéficiez d'un appoint de chauffage économique l'hiver. Le choix de l'emplacement des unités, le niveau sonore et le dimensionnement sont étudiés pour une diffusion homogène, sans courant d'air ni nuisance pour le voisinage.",
      "L'installation est réalisée dans les règles de l'art, avec une mise en service complète et des conseils de réglage. Rappel important : l'entretien d'une climatisation est essentiel pour préserver les performances et la qualité de l'air. Nous proposons un suivi annuel pour garder votre clim performante et saine, été après été.",
    ],
    why: [
      {
        icon: "VolumeX",
        title: "Discrétion & silence",
        body: "Choix d'unités silencieuses et emplacements étudiés pour un confort sans nuisance sonore.",
      },
      {
        icon: "Wrench",
        title: "Toutes marques",
        body: "Daikin, Mitsubishi, Atlantic, Hitachi… nous installons et réglons la solution la plus adaptée.",
      },
      {
        icon: "Snowflake",
        title: "Réversible & économe",
        body: "Des modèles qui rafraîchissent l'été et chauffent l'hiver, pour un confort toute l'année.",
      },
    ],
    pricingIntro:
      "Repères tarifaires pour l'installation d'une climatisation à Strasbourg, pose comprise.",
    pricing: [
      { label: "Climatiseur mono-split (1 pièce)", price: "à partir de 1 500 €" },
      { label: "Multi-split (2 à 4 pièces)", price: "3 500 – 8 000 €" },
      { label: "Gainable (diffusion invisible)", price: "sur devis" },
      { label: "Entretien annuel climatisation", price: "dès 90 € TTC" },
    ],
    pricingNote:
      "Tarifs indicatifs pose incluse. Le prix dépend du nombre d'unités, de la puissance et de la configuration du logement.",
    faq: [
      {
        question: "Quel est le prix d'une climatisation à Strasbourg ?",
        answer:
          "Le prix dépend du nombre de pièces à climatiser, de la puissance et de la configuration du logement. Nous établissons un devis gratuit et personnalisé après une courte étude sur place.",
      },
      {
        question: "L'entretien de la climatisation est-il obligatoire ?",
        answer:
          "Au-delà d'une certaine charge de fluide frigorigène, un contrôle d'étanchéité est obligatoire. Dans tous les cas, un entretien annuel est fortement recommandé pour la performance et la qualité de l'air.",
      },
      {
        question: "Une clim réversible peut-elle chauffer l'hiver ?",
        answer:
          "Oui. Une climatisation réversible assure un chauffage d'appoint économique en mi-saison et lors des hivers doux, en complément de votre chauffage principal.",
      },
    ],
    related: [
      "installation-pompe-a-chaleur-strasbourg",
      "chauffagiste-strasbourg",
      "entretien-chaudiere-strasbourg",
    ],
  },
  {
    slug: "entretien-chaudiere-strasbourg",
    ctaService: "Chauffage",
    city: "Strasbourg",
    theme: "fire",
    breadcrumb: "Entretien chaudière Strasbourg",
    h1: "Entretien de chaudière à Strasbourg",
    heroLead:
      "Entretien annuel obligatoire de votre chaudière à Strasbourg : sécurité, économies et attestation remise sur place.",
    metaTitle: "Entretien chaudière Strasbourg | Chauffagiste RGE",
    metaDescription:
      "Entretien annuel de chaudière gaz à Strasbourg : obligation légale, attestation remise sur place. Chauffagiste RGE noté 5/5, devis gratuit ☎ 06 30 26 93 08.",
    serviceType: "Entretien de chaudière",
    intro: [
      "L'entretien annuel de votre chaudière n'est pas qu'une formalité : c'est une obligation légale depuis 2009 pour les appareils de 4 à 400 kW, et surtout un gage de sécurité pour votre foyer. À Strasbourg et dans le Bas-Rhin, AK Énergies Confort réalise l'entretien de votre chaudière gaz, fioul ou à condensation avec sérieux et ponctualité.",
      "Lors de la visite, nous contrôlons la combustion, mesurons le taux de monoxyde de carbone, vérifions les organes de sécurité, nettoyons le corps de chauffe et le brûleur, puis ajustons les réglages. Une chaudière bien entretenue consomme moins, tombe moins souvent en panne et dure plus longtemps : l'entretien se rentabilise sur votre facture d'énergie.",
      "À l'issue de l'intervention, nous vous remettons l'attestation d'entretien exigée par votre assurance et la réglementation. Pour ne plus y penser, nous proposons un contrat annuel avec rappel automatique et tarif préférentiel. Un service de proximité qui explique notre note de 5/5 sur Google auprès des Strasbourgeois.",
    ],
    why: [
      {
        icon: "ShieldCheck",
        title: "Sécurité & conformité",
        body: "Contrôle complet et attestation remise sur place, conforme à l'obligation légale et exigée par votre assurance.",
      },
      {
        icon: "Euro",
        title: "Moins de consommation",
        body: "Une chaudière entretenue consomme moins et tombe moins en panne : l'entretien se rentabilise.",
      },
      {
        icon: "CalendarCheck",
        title: "Rappel annuel",
        body: "Avec notre contrat d'entretien, on vous rappelle chaque année. Vous n'avez plus à y penser.",
      },
    ],
    pricingIntro:
      "Repères tarifaires pour l'entretien d'une chaudière à Strasbourg, attestation comprise.",
    pricing: [
      { label: "Entretien chaudière gaz", price: "90 – 150 € TTC" },
      { label: "Entretien chaudière à condensation", price: "110 – 160 € TTC" },
      {
        label: "Contrat d'entretien annuel",
        price: "à partir de 130 €/an",
        note: "rappel + tarif préférentiel",
      },
      { label: "Ramonage (si nécessaire)", price: "sur devis" },
    ],
    pricingNote:
      "Tarifs indicatifs. L'attestation d'entretien réglementaire est systématiquement remise après l'intervention.",
    faq: [
      {
        question: "L'entretien annuel de la chaudière est-il obligatoire ?",
        answer:
          "Oui, c'est une obligation légale depuis 2009 pour les chaudières de 4 à 400 kW. L'attestation remise après notre passage est exigée par votre assurance.",
      },
      {
        question: "Combien coûte un entretien de chaudière à Strasbourg ?",
        answer:
          "Le tarif vous est communiqué sur devis, avec une estimation gratuite sous 24h. Nous proposons aussi un contrat d'entretien annuel, avec rappel automatique et tarif préférentiel.",
      },
      {
        question: "Que comprend l'entretien d'une chaudière ?",
        answer:
          "Contrôle de la combustion et du monoxyde de carbone, vérification des sécurités, nettoyage du corps de chauffe et du brûleur, réglages, puis remise de l'attestation réglementaire.",
      },
    ],
    related: [
      "chauffagiste-strasbourg",
      "depannage-chaudiere-strasbourg",
      "installation-pompe-a-chaleur-strasbourg",
    ],
  },
  {
    slug: "ballon-thermodynamique-strasbourg",
    ctaService: "Ballon d'eau chaude",
    city: "Strasbourg",
    theme: "frost",
    breadcrumb: "Ballon thermodynamique Strasbourg",
    h1: "Installation de ballon thermodynamique à Strasbourg",
    heroLead:
      "Jusqu'à 70 % d'économies sur votre eau chaude grâce à un chauffe-eau thermodynamique, éligible à MaPrimeRénov'.",
    metaTitle: "Ballon thermodynamique Strasbourg | Eau chaude RGE",
    metaDescription:
      "Installation de ballon thermodynamique à Strasbourg : jusqu'à -70% sur l'eau chaude, éligible MaPrimeRénov'. Chauffagiste RGE noté 5/5, devis gratuit ☎ 06 30 26 93 08.",
    serviceType: "Installation de ballon thermodynamique",
    intro: [
      "Le chauffe-eau thermodynamique est aujourd'hui la solution la plus économe pour produire l'eau chaude sanitaire d'un logement à Strasbourg. Son principe : une petite pompe à chaleur intégrée capte les calories de l'air ambiant ou extérieur pour chauffer le ballon, en consommant jusqu'à trois fois moins d'électricité qu'un cumulus classique. À la clé, jusqu'à 70 % d'économies sur la part eau chaude de votre facture.",
      "AK Énergies Confort installe et remplace les ballons thermodynamiques de 200 à 270 litres, adaptés aussi bien à une maison qu'à un appartement disposant d'un local technique ventilé. Nous étudions la configuration de votre logement — volume d'eau chaude nécessaire, emplacement, source d'air — pour choisir le modèle au meilleur rendement, silencieux et durable.",
      "En tant qu'entreprise RGE, nous vous faisons bénéficier de MaPrimeRénov' et des primes CEE dédiées au chauffe-eau thermodynamique, et nous montons les dossiers d'aides à votre place. L'installation, propre et rapide, est généralement réalisée en une journée, avec mise en service et conseils d'utilisation inclus.",
    ],
    why: [
      {
        icon: "Leaf",
        title: "Jusqu'à -70% d'eau chaude",
        body: "Un chauffe-eau thermodynamique divise par trois la consommation électrique liée à votre eau chaude sanitaire.",
      },
      {
        icon: "BadgeCheck",
        title: "Éligible aux aides",
        body: "MaPrimeRénov' et primes CEE : en tant qu'artisan RGE, nous montons les dossiers et réduisons votre reste à charge.",
      },
      {
        icon: "Clock",
        title: "Installé en 24h",
        body: "Pose rapide et soignée, généralement en une journée, avec mise en service et réglages compris.",
      },
    ],
    pricingIntro:
      "Repères pour l'installation d'un ballon thermodynamique à Strasbourg. Chaque projet fait l'objet d'un devis gratuit.",
    pricing: [
      { label: "Ballon thermodynamique 200 – 270 L (posé)", price: "2 500 – 4 000 €" },
      { label: "Remplacement d'un chauffe-eau électrique", price: "sur devis" },
      { label: "Entretien de ballon thermodynamique", price: "sur devis" },
    ],
    pricingNote:
      "Tarifs indicatifs avant aides. Le reste à charge réel est réduit par MaPrimeRénov' et les CEE.",
    faq: [
      {
        question: "Quelles économies avec un ballon thermodynamique ?",
        answer:
          "Un chauffe-eau thermodynamique consomme jusqu'à 3 fois moins qu'un cumulus électrique classique, soit jusqu'à 70 % d'économies sur la part eau chaude de votre facture.",
      },
      {
        question: "Le ballon thermodynamique est-il éligible à MaPrimeRénov' ?",
        answer:
          "Oui. Le chauffe-eau thermodynamique ouvre droit à MaPrimeRénov' et aux primes CEE. En tant qu'entreprise RGE, nous nous occupons des démarches pour vous.",
      },
      {
        question: "Quel volume de ballon choisir ?",
        answer:
          "Pour un foyer de 2 à 3 personnes, un ballon de 200 litres suffit généralement ; au-delà, on s'oriente vers 250 à 270 litres. Nous dimensionnons selon vos besoins réels après étude.",
      },
    ],
    related: [
      "installation-pompe-a-chaleur-strasbourg",
      "chauffagiste-strasbourg",
      "entretien-chaudiere-strasbourg",
    ],
  },
  {
    slug: "chauffagiste-bas-rhin",
    ctaService: "Chauffage",
    city: "Bas-Rhin",
    theme: "mixed",
    breadcrumb: "Chauffagiste Bas-Rhin",
    h1: "Chauffagiste dans le Bas-Rhin",
    heroLead:
      "AK Énergies Confort intervient dans 16 communes autour de Strasbourg, dans un rayon de 30 km : chauffage, climatisation, traitement d'air et eau chaude.",
    metaTitle: "Chauffagiste Bas-Rhin | AK Énergies Confort RGE",
    metaDescription:
      "Chauffagiste RGE dans le Bas-Rhin : Strasbourg, Schiltigheim, Illkirch, Lingolsheim et 12 autres communes. Installation, dépannage, entretien. Devis ☎ 06 30 26 93 08.",
    serviceType: "Chauffagiste",
    intro: [
      "Implantée à Strasbourg, AK Énergies Confort rayonne sur l'ensemble de l'Eurométropole et du Bas-Rhin dans un rayon de 30 km. Cette proximité nous permet d'intervenir vite — souvent sous 24h — pour l'installation, le dépannage et l'entretien de vos équipements de chauffage, de climatisation et d'eau chaude sanitaire.",
      "Chaque commune a son habitat et ses contraintes : immeubles anciens du faubourg, copropriétés récentes, pavillons des années 70 mal isolés, fermes alsaciennes rénovées… Notre connaissance du terrain nous aide à proposer la solution réellement adaptée, qu'il s'agisse d'une pompe à chaleur, d'une chaudière à condensation ou d'un ballon thermodynamique.",
      "Artisan certifié RGE et noté 5/5 sur Google, nous appliquons partout les mêmes exigences : diagnostic précis, devis transparent, chantier propre et délais tenus. Voici les communes où nous intervenons le plus régulièrement.",
    ],
    communes: [
      {
        name: "Strasbourg",
        blurb:
          "Du Neudorf à la Robertsau, appartements anciens et copropriétés du centre : remplacement de chaudières et installation de PAC malgré les contraintes patrimoniales.",
      },
      {
        name: "Schiltigheim",
        blurb:
          "Immeubles anciens et maisons de ville : nous remplaçons les chaudières vétustes et améliorons le rendement sans gros travaux.",
      },
      {
        name: "Illkirch-Graffenstaden",
        blurb:
          "Copropriétés et pavillons récents : entretien régulier, mise aux normes et installation de climatisation réversible.",
      },
      {
        name: "Lingolsheim",
        blurb:
          "Pavillons et maisons individuelles : ballons thermodynamiques et PAC air/eau pour alléger la facture des familles.",
      },
      {
        name: "Bischheim",
        blurb:
          "Logements collectifs et maisons mitoyennes : dépannage rapide et entretien annuel des chaudières gaz.",
      },
      {
        name: "Hoenheim",
        blurb:
          "Quartiers résidentiels calmes : installation de pompes à chaleur silencieuses et climatisation discrète.",
      },
      {
        name: "Ostwald",
        blurb:
          "Maisons des années 70-80 souvent peu isolées : remplacement des chaudières fioul par des solutions performantes.",
      },
      {
        name: "Eckbolsheim",
        blurb:
          "Lotissements pavillonnaires : plancher chauffant, PAC et eau chaude sanitaire dimensionnés sur-mesure.",
      },
      {
        name: "Mundolsheim",
        blurb:
          "Maisons individuelles en périphérie : installation et entretien de chaudières à condensation.",
      },
      {
        name: "Reichstett",
        blurb:
          "Pavillons et anciennes fermes alsaciennes : modernisation du chauffage et amélioration du confort thermique.",
      },
      {
        name: "Wolfisheim",
        blurb:
          "Habitat résidentiel récent : pompes à chaleur dimensionnées pour des logements bien isolés.",
      },
      {
        name: "Vendenheim",
        blurb:
          "Zone résidentielle en expansion : installations neuves chauffage et climatisation pour constructions récentes.",
      },
      {
        name: "Souffelweyersheim",
        blurb:
          "Maisons de ville et pavillons : entretien de chaudières et dépannage sous 24h.",
      },
      {
        name: "Geispolsheim",
        blurb:
          "Village résidentiel et secteur pavillonnaire : PAC air/eau et ballons thermodynamiques économes.",
      },
      {
        name: "Oberhausbergen",
        blurb:
          "Maisons sur les hauteurs : chauffage performant adapté à l'exposition et installation de climatisation.",
      },
      {
        name: "Mittelhausbergen",
        blurb:
          "Petite commune résidentielle : interventions de proximité, entretien et remplacement d'équipements.",
      },
    ],
    why: [
      {
        icon: "Clock",
        title: "Proximité 30 km",
        body: "Basés à Strasbourg, nous intervenons vite dans toute l'Eurométropole et le Bas-Rhin.",
      },
      {
        icon: "BadgeCheck",
        title: "Artisan RGE noté 5/5",
        body: "Une entreprise locale certifiée RGE, qui connaît l'habitat alsacien et ouvre droit aux aides.",
      },
      {
        icon: "Wrench",
        title: "Tous vos besoins",
        body: "Chauffage, climatisation, traitement d'air et eau chaude : un seul interlocuteur de confiance.",
      },
    ],
    faq: [
      {
        question: "Dans quelles communes intervenez-vous ?",
        answer:
          "Strasbourg et 15 autres communes du Bas-Rhin dans un rayon de 30 km : Schiltigheim, Illkirch, Lingolsheim, Bischheim, Hoenheim, Ostwald, Eckbolsheim, Mundolsheim, Reichstett, Wolfisheim, Vendenheim, Souffelweyersheim, Geispolsheim, Oberhausbergen et Mittelhausbergen.",
      },
      {
        question: "Le déplacement est-il facturé ?",
        answer:
          "Le devis et l'estimation sont gratuits dans toute notre zone d'intervention. Les éventuels frais de déplacement vous sont indiqués clairement avant toute intervention.",
      },
      {
        question: "Ma commune n'est pas dans la liste, intervenez-vous quand même ?",
        answer:
          "Très probablement. Nous étudions chaque demande dans le Bas-Rhin au-delà des communes citées. Contactez-nous par WhatsApp ou téléphone pour vérifier.",
      },
    ],
    related: [
      "chauffagiste-strasbourg",
      "depannage-chaudiere-strasbourg",
      "installation-pompe-a-chaleur-strasbourg",
      "installation-climatisation-strasbourg",
      "entretien-chaudiere-strasbourg",
      "ballon-thermodynamique-strasbourg",
    ],
  },
];

/**
 * Tant que la grille tarifaire réelle n'est pas confirmée par le client, on
 * masque les montants et on affiche « Sur devis » (protection juridique).
 * Les fourchettes restent dans `pricing` ci-dessus : repasser ce flag à
 * `false` les réaffiche instantanément.
 */
export const PRICING_ON_QUOTE = true;
export const PRICING_QUOTE_VALUE = "Sur devis";
export const PRICING_QUOTE_NOTE =
  "Tarifs communiqués sur devis. Estimation gratuite sous 24h, devis personnalisé et sans engagement après diagnostic de votre installation.";

export const localSlugs = LOCAL_PAGES.map((p) => p.slug);

export function getLocalPage(slug: string): LocalPage | undefined {
  return LOCAL_PAGES.find((p) => p.slug === slug);
}
