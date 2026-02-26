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
        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
          <Link
            href={`/${locale}`}
            className="shrink-0"
            aria-label="Home"
          >
            <Logo size={56} className="rounded sm:h-14 sm:w-14" />
          </Link>
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-base text-muted-foreground sm:text-lg">{t("openSource")}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
              <a
                href="https://github.com/hans992"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/andrijanic-damir/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                LinkedIn
              </a>
              <span className="text-muted-foreground">
                {t("copyright", { year: new Date().getFullYear() })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
