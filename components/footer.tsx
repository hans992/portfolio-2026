"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border/30 bg-muted/20">
      <div className="container mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <p className="text-base text-muted-foreground sm:text-lg">{t("openSource")}</p>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <a
            href="https://github.com/hans992"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/andrijanic-damir/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            LinkedIn
          </a>
          <span className="text-sm text-muted-foreground">
            {t("copyright", { year: new Date().getFullYear() })}
          </span>
        </div>
      </div>
    </footer>
  );
}
