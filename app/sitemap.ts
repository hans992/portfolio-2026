import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://damir-andrijanic.com";
  const localeUrls = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  }));
  const hausheldUrls = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}/projects/hausheld`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...localeUrls, ...hausheldUrls];
}
