"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectKey = "hausheld" | "nexus" | "croatia360" | "crm";

const projectLinks: Record<ProjectKey, { live?: string; adminDemo?: string; repo?: string; caseStudy?: boolean }> = {
  hausheld: {
    caseStudy: true,
    repo: "https://github.com/hans992/Hausheld_App",
    live: "https://hausheld-app.vercel.app/",
    adminDemo: "https://hausheld-app-admin.vercel.app/",
  },
  nexus: { repo: "https://github.com/hans992/NexusAI" },
  croatia360: {
    repo: "https://github.com/hans992/croatia360-v0.2",
    live: "https://croatia360.vercel.app/en",
  },
  crm: { repo: "https://github.com/hans992/CRM-app" },
};

type Props = {
  projectKey: ProjectKey;
  index: number;
};

export function ProjectCard({ projectKey, index }: Props) {
  const t = useTranslations("projects");
  const locale = useLocale();
  const links = projectLinks[projectKey];
  const name = t(`${projectKey}.name`);
  const angle = t(`${projectKey}.angle`);
  const bullets = t.raw(`${projectKey}.bullets`) as string[];

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={cn(
        "group rounded-2xl border border-border/60 bg-card/50 p-6 text-card-foreground backdrop-blur-sm",
        "transition-all duration-300 hover:border-border hover:bg-card hover:shadow-lg hover:shadow-foreground/5"
      )}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
            {name}
          </h3>
          <span className="text-sm text-muted-foreground">{angle}</span>
        </div>
        <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-4 pt-3">
          {links.caseStudy && (
            <Link
              href={`/${locale}/projects/hausheld`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:underline"
            >
              {t("caseStudy")}
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          )}
          {links.live && (
            <a
              href={links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("live")}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          {links.adminDemo && (
            <a
              href={links.adminDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("admin")}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          {links.repo && (
            <a
              href={links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("repo")}
              <Github className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
