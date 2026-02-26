import { routing } from "@/i18n/routing";

const SITE_NAME = "Damir Andrijanic";
const PERSON_NAME = "Damir Andrijanic";
const GITHUB_URL = "https://github.com/hans992";
const LINKEDIN_URL = "https://www.linkedin.com/in/andrijanic-damir/";

type Props = { baseUrl: string; locale: string };

export function JsonLd({ baseUrl, locale }: Props) {
  const personUrl = `${baseUrl}/${locale}`;
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: baseUrl,
    inLanguage: routing.locales,
    description:
      "Full-stack engineer building AI-powered web applications for the European market. GDPR, SGB XI, logistics.",
    author: {
      "@type": "Person",
      name: PERSON_NAME,
      url: personUrl,
      sameAs: [GITHUB_URL, LINKEDIN_URL],
    },
  };
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON_NAME,
    url: personUrl,
    sameAs: [GITHUB_URL, LINKEDIN_URL],
    jobTitle: "Full-Stack AI Engineer",
    description:
      "Full-stack engineer building AI-powered web applications for the European market. GDPR, SGB XI, logistics.",
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
