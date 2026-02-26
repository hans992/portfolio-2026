import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const PROJECT_SLUGS = ["hausheld", "nexus", "croatia360", "crm"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://damir-andrijanic.com";
  const localeUrls = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  }));
  const projectUrls = routing.locales.flatMap((locale) =>
    PROJECT_SLUGS.map((slug) => ({
      url: `${baseUrl}/${locale}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );
  return [...localeUrls, ...projectUrls];
}
