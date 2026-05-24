/**
 * WhatsApp integration — AK Énergies Confort
 * --------------------------------------------------------------
 * The whole site routes conversions to WhatsApp instead of email.
 * This module owns: number config, device-aware deep links, the
 * pre-filled devis message template, and cookie-less event tracking.
 */

/** International number, digits only (required by WhatsApp deep links). */
export const WHATSAPP_NUMBER = "33630269308";

/** Human-readable phone used in the UI / click-to-call. */
export const PHONE_DISPLAY = "06 30 26 93 08";
export const PHONE_TEL = "+33630269308";

export type ServiceChoice =
  | "Chauffage"
  | "Climatisation"
  | "CTA (traitement d'air)"
  | "Ballon d'eau chaude"
  | "Autre";

/**
 * Detect a mobile/tablet client from the user agent.
 * Mobiles open the native app, desktops open WhatsApp Web.
 */
export function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /android|iphone|ipad|ipod|iemobile|blackberry|opera mini|mobile/i.test(
    navigator.userAgent,
  );
}

/**
 * Build the correct WhatsApp endpoint for the current device.
 * - Mobile  → api.whatsapp.com/send (hands off to the installed app)
 * - Desktop → web.whatsapp.com/send (WhatsApp Web)
 */
export function buildWhatsAppUrl(message: string): string {
  const text = encodeURIComponent(message);
  const base = isMobileDevice()
    ? "https://api.whatsapp.com/send"
    : "https://web.whatsapp.com/send";
  return `${base}?phone=${WHATSAPP_NUMBER}&text=${text}`;
}

/**
 * Cookie-less analytics stub. Emits a structured JSON line so it can be
 * picked up later by Plausible / Umami custom events without any rework.
 */
export function trackEvent(
  event: string,
  payload: Record<string, unknown> = {},
): void {
  const entry = {
    event,
    ts: new Date().toISOString(),
    device: isMobileDevice() ? "mobile" : "desktop",
    ...payload,
  };
  // Intentional, single source of truth for client-side conversion tracking.
  console.log(JSON.stringify(entry));
}

/** Open WhatsApp in a new tab and log the conversion event. */
export function openWhatsApp(
  message: string,
  meta: Record<string, unknown> = {},
): void {
  trackEvent("whatsapp_click", meta);
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

export interface DevisPayload {
  name: string;
  phone: string;
  email?: string;
  service: ServiceChoice;
  message: string;
}

/** Compose the rich pre-filled message sent from the contact form. */
export function buildDevisMessage({
  name,
  phone,
  email,
  service,
  message,
}: DevisPayload): string {
  return [
    "Bonjour AK Énergies Confort 👋",
    "",
    `Je souhaite un devis pour : ${service}`,
    "",
    `👤 Nom : ${name}`,
    `📞 Téléphone : ${phone}`,
    `📧 Email : ${email?.trim() ? email.trim() : "non renseigné"}`,
    "",
    "💬 Mon besoin :",
    message,
    "",
    "Merci !",
  ].join("\n");
}

/** Short message used by the floating button and quick CTAs. */
export const QUICK_MESSAGE =
  "Bonjour, j'aimerais des renseignements sur vos services.";
