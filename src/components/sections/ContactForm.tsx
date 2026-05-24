"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, X, Loader2, Send } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import {
  buildDevisMessage,
  openWhatsApp,
  type ServiceChoice,
} from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const SERVICE_OPTIONS: ServiceChoice[] = [
  "Chauffage",
  "Climatisation",
  "CTA (traitement d'air)",
  "Ballon d'eau chaude",
  "Autre",
];

const schema = z.object({
  name: z.string().min(2, "Indiquez votre nom complet"),
  phone: z
    .string()
    .min(8, "Numéro trop court")
    .regex(/^[0-9+\s().-]{8,}$/, "Numéro invalide"),
  email: z
    .union([z.string().email("Email invalide"), z.literal("")])
    .optional(),
  service: z.enum([
    "Chauffage",
    "Climatisation",
    "CTA (traitement d'air)",
    "Ballon d'eau chaude",
    "Autre",
  ]),
  message: z.string().min(5, "Décrivez votre besoin en quelques mots"),
  // Honeypot — must stay empty (bots tend to fill every field)
  company: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

type Status = "idle" | "success";

const ANTI_SPAM_DELAY = 3000; // min ms before submit is enabled
const SUCCESS_ANIM = 800; // success flash before WhatsApp opens

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [armed, setArmed] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, dirtyFields },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { service: "Chauffage" },
  });

  // Anti-spam: arm the submit button only after 3s on screen
  useEffect(() => {
    const t = window.setTimeout(() => setArmed(true), ANTI_SPAM_DELAY);
    return () => window.clearTimeout(t);
  }, []);

  const service = useWatch({ control, name: "service" });

  const onSubmit = (values: FormValues) => {
    // Honeypot tripped → silently ignore (looks successful to the bot)
    if (values.company) return;

    setStatus("success");
    const message = buildDevisMessage({
      name: values.name,
      phone: values.phone,
      email: values.email,
      service: values.service,
      message: values.message,
    });

    window.setTimeout(() => {
      openWhatsApp(message, { source: "contact_form", service: values.service });
      setStatus("idle");
    }, SUCCESS_ANIM);
  };

  const fieldState = (name: keyof FormValues) => {
    if (errors[name]) return "error";
    if (dirtyFields[name]) return "valid";
    return "idle";
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 pb-16 sm:pb-0"
    >
      {/* Honeypot — hidden from humans & assistive tech */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>
          Société
          <input type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FloatingField
          label="Nom complet *"
          state={fieldState("name")}
          error={errors.name?.message}
        >
          <input
            type="text"
            placeholder=" "
            autoComplete="name"
            {...register("name")}
            className={inputCls}
          />
        </FloatingField>

        <FloatingField
          label="Téléphone *"
          state={fieldState("phone")}
          error={errors.phone?.message}
        >
          <input
            type="tel"
            placeholder=" "
            autoComplete="tel"
            {...register("phone")}
            className={inputCls}
          />
        </FloatingField>
      </div>

      <FloatingField
        label="Email (optionnel)"
        state={fieldState("email")}
        error={errors.email?.message}
      >
        <input
          type="email"
          placeholder=" "
          autoComplete="email"
          {...register("email")}
          className={inputCls}
        />
      </FloatingField>

      {/* Service chips */}
      <fieldset>
        <legend className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-platinum/45">
          Service souhaité
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {SERVICE_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              aria-pressed={service === opt}
              onClick={() =>
                setValue("service", opt, { shouldDirty: true, shouldValidate: true })
              }
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                service === opt
                  ? "border-transparent bg-[image:var(--gradient-fire)] text-void"
                  : "border-white/15 text-platinum/70 hover:border-white/40 hover:text-platinum",
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </fieldset>

      <FloatingField
        label="Votre besoin *"
        state={fieldState("message")}
        error={errors.message?.message}
      >
        <textarea
          rows={4}
          placeholder=" "
          {...register("message")}
          className={cn(inputCls, "resize-none")}
        />
      </FloatingField>

      <button
        type="submit"
        disabled={!armed || status === "success"}
        className={cn(
          "group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl px-8 py-4 text-base font-semibold text-void transition-all disabled:cursor-not-allowed",
          status === "success"
            ? "bg-[#25D366]"
            : "bg-[image:var(--gradient-signature)] hover:shadow-[0_18px_50px_-12px_rgba(255,77,46,0.6)]",
          !armed && "opacity-60",
        )}
      >
        {status === "success" ? (
          <>
            <Check className="h-5 w-5" /> Ouverture de WhatsApp…
          </>
        ) : !armed ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Un instant…
          </>
        ) : (
          <>
            <WhatsAppIcon className="h-5 w-5" />
            Envoyer via WhatsApp
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-platinum/40">
        En envoyant, WhatsApp s&apos;ouvre avec votre demande pré-remplie. Aucune
        donnée n&apos;est stockée sur ce site.
      </p>
    </form>
  );
}

const inputCls =
  "peer w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 pb-2.5 pt-6 text-platinum outline-none transition-colors placeholder-shown:pt-4 focus:border-frost";

function FloatingField({
  label,
  error,
  state,
  children,
}: {
  label: string;
  error?: string;
  state: "idle" | "valid" | "error";
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="relative">
        {children}
        <label className="pointer-events-none absolute left-4 top-2 font-mono text-[11px] uppercase tracking-wider text-platinum/45 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider">
          {label}
        </label>
        {state !== "idle" && (
          <span className="absolute right-4 top-4">
            {state === "valid" ? (
              <Check className="h-5 w-5 text-frost" />
            ) : (
              <X className="h-5 w-5 text-flame" />
            )}
          </span>
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-flame">{error}</p>}
    </div>
  );
}
