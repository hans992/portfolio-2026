import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LangSetter } from "@/components/lang-setter";
import { Toaster } from "sonner";
import { JsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "de")) return {};
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://damir-andrijanic.com";
  const canonical = `${baseUrl}/${locale}`;
  const titles: Record<string, string> = {
    en: "Damir Andrijanic | Portfolio page",
    de: "Damir Andrijanic | Portfolio-Seite",
  };
  const descriptions: Record<string, string> = {
    en:
      "Full-stack engineer building AI-powered web applications for the European market. GDPR, SGB XI, logistics.",
    de:
      "Full-Stack-Ingenieur für KI-Webanwendungen im europäischen Markt. GDPR, SGB XI, Logistik.",
  };
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical,
      languages: { en: `${baseUrl}/en`, de: `${baseUrl}/de` },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: canonical,
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "de")) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://damir-andrijanic.com";

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <JsonLd baseUrl={baseUrl} locale={locale} />
      <LangSetter locale={locale} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
      >
        Skip to main content
      </a>
      <NextIntlClientProvider messages={messages}>
        <Header />
        <main id="main-content" className="flex-1 flex flex-col" role="main">
          {children}
        </main>
        <Footer />
        <Toaster richColors position="top-center" closeButton />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
