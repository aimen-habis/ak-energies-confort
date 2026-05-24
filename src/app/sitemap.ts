import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";
import { localSlugs } from "@/lib/local-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const localPages: MetadataRoute.Sitemap = localSlugs.map((slug) => ({
    url: `${SITE.url}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: SITE.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...localPages,
    {
      url: `${SITE.url}/mentions-legales`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE.url}/confidentialite`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
