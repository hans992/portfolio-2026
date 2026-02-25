import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export default async function HausheldPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hausheldPage");
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
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h1>

          <section className="mt-10 space-y-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                {t("problem")}
              </h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {t("problemText")}
              </p>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                {t("solution")}
              </h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {t("solutionText")}
              </p>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                {t("evidence")}
              </h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {t("gdprLink")}
                  </a>
                </li>
                <li className="text-muted-foreground">
                  {t("architecture")}: diagram below (PWA + Admin ↔ FastAPI ↔ PostgreSQL+PostGIS).
                </li>
              </ul>
              <div className="mt-6 rounded-lg border border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
                [ Architecture diagram: export mermaid from Hausheld README to PNG/SVG and add as Image or img here ]
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
