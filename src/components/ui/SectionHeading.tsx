import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}

/** Consistent eyebrow + display title block used by every section. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-flame">
          <span className="h-px w-8 bg-flame" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 font-display text-[clamp(2rem,5.5vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight text-platinum">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.16}>
          <p className="mt-6 text-lg text-platinum/65">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
