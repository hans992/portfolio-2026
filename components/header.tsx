"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", labelKey: "home" },
  { href: "/#projects", labelKey: "projects" },
  { href: "/#about", labelKey: "about" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const otherLocale = locale === "en" ? "de" : "en";
  const isHome = pathname === "" || pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 48));

  const closeMobile = () => setMobileOpen(false);

  // Pathname from next/navigation includes locale (e.g. /en or /de/projects/hausheld).
  // Strip it so the locale switcher doesn't produce /de/en or /en/de.
  const pathnameWithoutLocale = pathname?.replace(/^\/(en|de)(\/|$)/, "$2") ?? "";
  const pathForOtherLocale = pathnameWithoutLocale === "" || pathnameWithoutLocale === "/"
    ? `/${otherLocale}`
    : `/${otherLocale}${pathnameWithoutLocale}`;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border/50 bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-14 min-h-[3.5rem] max-w-5xl items-center justify-between gap-4 px-4 sm:h-16 sm:min-h-[4rem]">
        <Link
          href={`/${locale}`}
          className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl"
          onClick={closeMobile}
        >
          Damir Andrijanic
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 sm:flex sm:gap-8" aria-label="Main">
          {navLinks.map(({ href, labelKey }) => {
            const path = `/${locale}${href === "/" ? "" : href}`;
            const isActive = href === "/" ? isHome : pathname?.startsWith(href.replace("#", ""));
            return (
              <Link
                key={labelKey}
                href={path}
                className={cn(
                  "min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-sm font-medium transition-colors sm:inline-flex sm:min-w-0 sm:text-base",
                  "text-muted-foreground hover:text-foreground",
                  isActive && "text-foreground"
                )}
              >
                {t(labelKey)}
              </Link>
            );
          })}
          <a
            href="https://github.com/hans992"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground sm:min-w-0"
            aria-label="GitHub"
          >
            <span className="text-sm font-medium sm:text-base">{t("github")}</span>
          </a>
          <a
            href="https://www.linkedin.com/in/andrijanic-damir/"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground sm:min-w-0"
            aria-label="LinkedIn"
          >
            <span className="text-sm font-medium sm:text-base">{t("linkedin")}</span>
          </a>
          <ThemeToggle />
          <Link
            href={pathForOtherLocale}
            className="rounded-full border border-border/60 px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground min-h-[44px] inline-flex items-center sm:min-h-0 sm:py-1.5"
          >
            {otherLocale === "en" ? "EN" : "DE"}
          </Link>
        </nav>

        {/* Mobile: hamburger + menu */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <Link
            href={pathForOtherLocale}
            className="rounded-full border border-border/60 px-3 py-2 text-xs font-medium uppercase text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            aria-label={otherLocale === "en" ? "Switch to English" : "Switch to German"}
          >
            {otherLocale === "en" ? "EN" : "DE"}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-md text-foreground hover:bg-accent"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      <div
        id="mobile-nav"
        className={cn(
          "border-t border-border/40 bg-background/95 backdrop-blur-xl sm:hidden",
          mobileOpen ? "block" : "hidden"
        )}
        role="dialog"
        aria-label="Navigation"
      >
        <nav className="container mx-auto max-w-5xl px-4 py-4" aria-label="Main">
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ href, labelKey }) => {
              const path = `/${locale}${href === "/" ? "" : href}`;
              const isActive = href === "/" ? isHome : pathname?.startsWith(href.replace("#", ""));
              return (
                <li key={labelKey}>
                  <Link
                    href={path}
                    onClick={closeMobile}
                    className={cn(
                      "flex min-h-[48px] items-center rounded-md px-3 text-base font-medium transition-colors",
                      "text-muted-foreground hover:bg-accent hover:text-foreground",
                      isActive && "text-foreground"
                    )}
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href="https://github.com/hans992"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] items-center rounded-md px-3 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                onClick={closeMobile}
              >
                {t("github")}
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/andrijanic-damir/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] items-center rounded-md px-3 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                onClick={closeMobile}
              >
                {t("linkedin")}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
