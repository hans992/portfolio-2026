import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nexusPage");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://damir-andrijanic.com";
  const canonical = `${baseUrl}/${locale}/projects/nexus`;
  const title = t("title");
  const description = t("tagline");
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" as const },
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

export default async function NexusPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nexusPage");
  const tNav = await getTranslations("nav");

  return (
    <div className="min-h-screen">
      <article className="border-b border-border/40 px-4 py-12 sm:py-16">
        <div className="container mx-auto max-w-3xl">
          <Link
            href={`/${locale}#projects`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {tNav("backToProjects")}
          </Link>

          <header className="mb-10">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
              {t("tagline")}
            </p>
          </header>

          <section className="space-y-10">
            <p className="text-muted-foreground leading-relaxed">
              {t("overview")}
            </p>

            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                {t("architectureTitle")}
              </h2>
              <div className="rounded-lg border border-border bg-muted/30 p-4 overflow-x-auto">
                <pre className="text-xs text-muted-foreground whitespace-pre font-mono">
{`flowchart LR
  subgraph Client
    App["Next.js App"]
  end
  subgraph API
    Chat["/api/chat"]
    Ingest["Ingest pipeline"]
  end
  subgraph Data
    Pinecone["Pinecone"]
    DB["Prisma / PostgreSQL"]
    Gemini["Gemini"]
  end
  App -->|query| Chat
  Chat -->|embed + search| Pinecone
  Chat -->|stream| Gemini
  App -->|upload| Ingest
  Ingest -->|chunk + embed| Pinecone
  Chat -->|sessions| DB`}
                </pre>
              </div>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                {t("featuresTitle")}
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li><span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 mr-2 align-middle" />{t("feature1")}</li>
                <li><span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 mr-2 align-middle" />{t("feature2")}</li>
                <li><span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 mr-2 align-middle" />{t("feature3")}</li>
                <li><span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 mr-2 align-middle" />{t("feature4")}</li>
                <li><span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 mr-2 align-middle" />{t("feature5")}</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                {t("techStackTitle")}
              </h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{t("tech1")}</li>
                <li>{t("tech2")}</li>
                <li>{t("tech3")}</li>
                <li>{t("tech4")}</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                {t("ingestTitle")}
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>{t("ingest1")}</li>
                <li>{t("ingest2")}</li>
                <li>{t("ingest3")}</li>
                <li>{t("ingest4")}</li>
              </ol>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
