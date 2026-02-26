import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export default async function Croatia360Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("croatia360Page");
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
                {t("featuresTitle")}
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li><span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 mr-2 align-middle" />{t("feature1")}</li>
                <li><span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 mr-2 align-middle" />{t("feature2")}</li>
                <li><span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 mr-2 align-middle" />{t("feature3")}</li>
                <li><span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 mr-2 align-middle" />{t("feature4")}</li>
                <li><span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 mr-2 align-middle" />{t("feature5")}</li>
                <li><span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 mr-2 align-middle" />{t("feature6")}</li>
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
          </section>
        </div>
      </article>
    </div>
  );
}
