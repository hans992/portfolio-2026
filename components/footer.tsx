"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Logo } from "./logo";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="border-t border-border/30 bg-muted/20">
      <div className="container mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 font-display text-lg font-semibold text-foreground transition-colors hover:opacity-90"
          aria-label="Damir Andrijanic – Home"
        >
          <Logo size={32} />
          <span>Damir Andrijanic</span>
        </Link>
        <p className="mt-6 text-base text-muted-foreground sm:text-lg">{t("openSource")}</p>
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
