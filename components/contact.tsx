"use client";

import { useLocale, useTranslations } from "next-intl";
import { ContactForm } from "@/components/contact-form";

export function Contact() {
  const t = useTranslations("contactSection");
  const locale = useLocale();

  return (
    <section
      id="contact"
      className="border-b border-border/40 px-4 py-12 sm:py-16"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto max-w-2xl">
        <h2
          id="contact-heading"
          className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {t("title")}
        </h2>
        <p className="mt-3 text-muted-foreground">
          {t("subtitle")}
        </p>
        <div className="mt-8">
          <ContactForm key={locale} />
        </div>
      </div>
    </section>
  );
}
