# AK Énergies Confort — Site vitrine premium

Site one-page haut de gamme pour **AK Énergies Confort**, chauffagiste /
climaticien à Strasbourg. Direction artistique **« Fire & Frost »** : la
dualité chaud/froid du métier traverse toute l'expérience (shader WebGL,
smooth scroll, scroll horizontal pinné, timeline animée, galerie bento,
marquee d'avis).

**Toutes les conversions passent par WhatsApp** — aucun backend email.

---

## ✨ Stack technique

| Domaine     | Choix                                                        |
| ----------- | ------------------------------------------------------------ |
| Framework   | Next.js 16 (App Router) · React 19 · TypeScript strict       |
| Styling     | Tailwind CSS v4 (`@theme`) + variables CSS custom            |
| Animations  | GSAP + ScrollTrigger · Lenis (smooth scroll) · Framer Motion |
| WebGL       | OGL (shader feu ↔ glace réactif à la souris)                 |
| Formulaires | React Hook Form + Zod                                        |
| Carte       | Leaflet + OpenStreetMap (aucun token requis)                 |
| Icônes      | Lucide React + SVG sur-mesure                                |
| Polices     | Cabinet Grotesk + Satoshi (Fontshare) · JetBrains Mono       |

---

## 🚀 Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
```

### Scripts

| Commande        | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Serveur de développement (Turbopack) |
| `npm run build` | Build de production                  |
| `npm run start` | Sert le build de production          |
| `npm run lint`  | ESLint (config Next 16)              |

### Variables d'environnement

**Aucune.** Le site fonctionne entièrement sans clé API ni service externe.

---

## 💬 Intégration WhatsApp

Tout est centralisé dans [`src/lib/whatsapp.ts`](src/lib/whatsapp.ts) :

- **Numéro** : `WHATSAPP_NUMBER = "33630269308"` (format international).
- **Détection device** : mobile → `api.whatsapp.com/send` (app native),
  desktop → `web.whatsapp.com/send` (WhatsApp Web).
- **Message de devis pré-rempli** : `buildDevisMessage()` génère le texte à
  partir du formulaire, encodé via `encodeURIComponent`.
- **Tracking sans cookie** : `trackEvent()` émet un log JSON en console
  (`{ event, ts, device, ... }`), prêt à brancher sur Plausible / Umami.

Le **bouton flottant** (`WhatsAppFloat`) est visible sur tout le site :
pulse doux, shake toutes les 30 s, expansion « 💬 Devis WhatsApp » au survol,
retrait après 5 min d'inactivité (reste accessible), 56 px tap-target.

Le **formulaire** (`ContactForm`) : validation Zod en temps réel, chips de
service, honeypot anti-bot, bouton armé après 3 s, animation de succès (0,8 s)
puis ouverture de WhatsApp.

> Pour changer le numéro, éditez `WHATSAPP_NUMBER` / `PHONE_TEL` /
> `PHONE_DISPLAY` dans `src/lib/whatsapp.ts`.

---

## 📁 Structure

```
src/
├── app/
│   ├── layout.tsx              # fonts, SEO, JSON-LD, providers, chrome
│   ├── page.tsx                # assemblage des sections (home)
│   ├── globals.css             # design system "Fire & Frost"
│   ├── opengraph-image.tsx     # image OG dynamique
│   ├── sitemap.ts · robots.ts
│   ├── mentions-legales/ · confidentialite/
├── components/
│   ├── providers/SmoothScroll  # Lenis ↔ GSAP
│   ├── effects/                # CustomCursor, NoiseOverlay
│   ├── ui/                     # Reveal, ScrambleText, MagneticButton,
│   │                           #   TiltCard, CountUp, SectionHeading
│   ├── layout/                 # Navbar, Footer, WhatsAppFloat, Logo
│   ├── icons/                  # WhatsAppIcon
│   └── sections/               # Hero(+Shader), WhyUs, Services, Process,
│                               #   Realisations, Testimonials, Contact(+Map)
├── hooks/use-media-query.ts    # useIsMobile, usePrefersReducedMotion
└── lib/                        # whatsapp.ts, content.ts, utils.ts
```

Tout le contenu éditorial (services, avis, réalisations, etc.) est typé dans
[`src/lib/content.ts`](src/lib/content.ts) — un seul fichier à éditer.

---

## ♿ Accessibilité & performance

- `prefers-reduced-motion` respecté : smooth scroll, shader, curseur, scramble
  et marquees sont désactivés automatiquement.
- Focus visible custom, skip-link, navigation clavier (lightbox ← → Échap).
- Effets WebGL et curseur custom désactivés sur mobile / pointeur grossier.
- Pages 100 % statiques (prerender), `font-display: swap`, OG image dynamique.
- Build propre : `npm run build` + `npm run lint` sans erreur.

---

## 🎨 Crédits & notes

- **Polices** : [Fontshare](https://fontshare.com) (Cabinet Grotesk, Satoshi)
  + Google Fonts (JetBrains Mono), auto-hébergée via `next/font`.
- **Carte** : © OpenStreetMap contributors.
- **Visuels des réalisations** : panneaux « thermiques » procéduraux (dégradés
  + grain + iconographie), pensés pour être **remplacés par de vraies photos
  de chantier**. Pour cela, ajoutez les images dans `public/` et remplacez le
  composant `ThermalVisual` dans `src/components/sections/Realisations.tsx` par
  `next/image`.

---

## 🌍 Déploiement

Compatible Vercel (zéro config) ou tout hôte Node. Pensez à définir l'URL
réelle dans `SITE.url` (`src/lib/content.ts`) pour les métadonnées, le sitemap
et le JSON-LD.
