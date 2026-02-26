import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MermaidDiagram } from "@/components/mermaid-diagram";

const HAUSHELD_CHART = `flowchart LR
  subgraph Clients
    PWA["Mobile PWA - Next.js"]
    Admin["Admin - Vite + React"]
  end
  subgraph Backend["Backend API"]
    API["FastAPI / PostgreSQL + PostGIS"]
  end
  PWA <-->|JWT| API
  Admin <-->|JWT| API`;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hausheldPage");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://damir-andrijanic.com";
  const canonical = `${baseUrl}/${locale}/projects/hausheld`;
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

export default async function HausheldPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hausheldPage");
  const tNav = await getTranslations("nav");
  const tProjects = await getTranslations("projects");

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

          <section className="space-y-12">
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
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                {t("featuresTitle")}
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li><strong className="text-foreground">Mobile PWA:</strong> {t("featureMobilePWA")}</li>
                <li><strong className="text-foreground">Admin dashboard:</strong> {t("featureAdmin")}</li>
                <li><strong className="text-foreground">Substitution engine:</strong> {t("featureSubstitution")}</li>
                <li><strong className="text-foreground">Budget & billing:</strong> {t("featureBudget")}</li>
                <li><strong className="text-foreground">Audit trail:</strong> {t("featureAudit")}</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-2">
                {t("architectureTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("architectureIntro")}
              </p>
              <div className="mt-4">
                <MermaidDiagram chart={HAUSHELD_CHART} />
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><strong className="text-foreground">Backend:</strong> {t("backendDesc")}</li>
                <li><strong className="text-foreground">Mobile:</strong> {t("mobileDesc")}</li>
                <li><strong className="text-foreground">Admin:</strong> {t("adminDesc")}</li>
              </ul>
              <p className="mt-3 text-sm text-muted-foreground italic">
                {t("dataFlow")}
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                {t("techStackTitle")}
              </h2>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-4 py-3 text-left font-medium text-foreground">Path</th>
                      <th className="px-4 py-3 text-left font-medium text-foreground">Stack</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/60"><td className="px-4 py-3 font-medium text-foreground">/backend</td><td className="px-4 py-3">{t("techBackend")}</td></tr>
                    <tr className="border-b border-border/60"><td className="px-4 py-3 font-medium text-foreground">/frontend</td><td className="px-4 py-3">{t("techFrontend")}</td></tr>
                    <tr><td className="px-4 py-3 font-medium text-foreground">/admin</td><td className="px-4 py-3">{t("techAdmin")}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-2">
                {t("geospatialTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("geospatialIntro")}
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>{t("geospatialBullet1")}</li>
                <li>{t("geospatialBullet2")}</li>
                <li>{t("geospatialBullet3")}</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                {t("gdprTitle")}
              </h2>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-4 py-3 text-left font-medium text-foreground">Measure</th>
                      <th className="px-4 py-3 text-left font-medium text-foreground">Implementation</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/60"><td className="px-4 py-3 font-medium text-foreground">Health data encryption</td><td className="px-4 py-3">{t("gdprEncryption")}</td></tr>
                    <tr className="border-b border-border/60"><td className="px-4 py-3 font-medium text-foreground">Audit log</td><td className="px-4 py-3">{t("gdprAudit")}</td></tr>
                    <tr className="border-b border-border/60"><td className="px-4 py-3 font-medium text-foreground">Soft deletes</td><td className="px-4 py-3">{t("gdprSoftDeletes")}</td></tr>
                    <tr><td className="px-4 py-3 font-medium text-foreground">Data residency</td><td className="px-4 py-3">{t("gdprResidency")}</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                  {t("gdprLinkText")}
                </a>
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-2">
                {t("shiftTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("shiftIntro")}
              </p>
              <div className="mt-4 overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-4 py-3 text-left font-medium text-foreground">Status</th>
                      <th className="px-4 py-3 text-left font-medium text-foreground">Meaning</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/60"><td className="px-4 py-3 font-medium text-foreground">Scheduled</td><td className="px-4 py-3">{t("shiftScheduled")}</td></tr>
                    <tr className="border-b border-border/60"><td className="px-4 py-3 font-medium text-foreground">In_Progress</td><td className="px-4 py-3">{t("shiftInProgress")}</td></tr>
                    <tr className="border-b border-border/60"><td className="px-4 py-3 font-medium text-foreground">Completed</td><td className="px-4 py-3">{t("shiftCompleted")}</td></tr>
                    <tr className="border-b border-border/60"><td className="px-4 py-3 font-medium text-foreground">Unassigned</td><td className="px-4 py-3">{t("shiftUnassigned")}</td></tr>
                    <tr><td className="px-4 py-3 font-medium text-foreground">Cancelled</td><td className="px-4 py-3">{t("shiftCancelled")}</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-muted-foreground italic">
                {t("shiftTransitions")}
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                {t("apiTitle")}
              </h2>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-4 py-3 text-left font-medium text-foreground">Area</th>
                      <th className="px-4 py-3 text-left font-medium text-foreground">Endpoints</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/60"><td className="px-4 py-3 font-medium text-foreground">Auth</td><td className="px-4 py-3">{t("apiAuth")}</td></tr>
                    <tr className="border-b border-border/60"><td className="px-4 py-3 font-medium text-foreground">Shifts</td><td className="px-4 py-3">{t("apiShifts")}</td></tr>
                    <tr className="border-b border-border/60"><td className="px-4 py-3 font-medium text-foreground">Workers</td><td className="px-4 py-3">{t("apiWorkers")}</td></tr>
                    <tr className="border-b border-border/60"><td className="px-4 py-3 font-medium text-foreground">Clients</td><td className="px-4 py-3">{t("apiClients")}</td></tr>
                    <tr className="border-b border-border/60"><td className="px-4 py-3 font-medium text-foreground">Billing</td><td className="px-4 py-3">{t("apiBilling")}</td></tr>
                    <tr><td className="px-4 py-3 font-medium text-foreground">Audit</td><td className="px-4 py-3">{t("apiAudit")}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
              {t("disclaimer")}
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                {tProjects("linksTitle")}
              </h2>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/hans992/Hausheld_App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {tProjects("repo")}
                  <span aria-hidden>↗</span>
                </a>
                <a
                  href="https://hausheld-app.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {tProjects("live")}
                  <span aria-hidden>↗</span>
                </a>
                <a
                  href="https://hausheld-app-admin.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {tProjects("admin")}
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
