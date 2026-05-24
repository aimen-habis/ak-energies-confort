import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** Shared editorial shell for the legal pages. */
export function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-32 pt-36 sm:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-platinum/60 transition-colors hover:text-flame"
      >
        <ArrowLeft className="h-4 w-4" /> Retour à l&apos;accueil
      </Link>
      <h1 className="mt-8 font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold leading-none tracking-tight">
        {title}
      </h1>
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-platinum/40">
        Dernière mise à jour · {updated}
      </p>
      <div className="prose-invert mt-12 space-y-8 text-platinum/75 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-platinum [&_p]:leading-relaxed">
        {children}
      </div>
    </article>
  );
}
