import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalPageView } from "@/components/local/LocalPageView";
import { getLocalPage, localSlugs } from "@/lib/local-pages";
import { SITE } from "@/lib/content";

// Only the known local-SEO slugs are valid; anything else → 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return localSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocalPage(slug);
  if (!page) return {};

  const url = `${SITE.url}/${slug}`;
  return {
    // `absolute` bypasses the root layout's "%s | AK Énergies Confort" template
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url,
      siteName: SITE.name,
      title: page.metaTitle,
      description: page.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function LocalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLocalPage(slug);
  if (!page) notFound();
  return <LocalPageView page={page} />;
}
