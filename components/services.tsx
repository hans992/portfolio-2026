"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function Services() {
  const t = useTranslations("services");
  const cards = [
    { key: "one", num: "01" },
    { key: "two", num: "02" },
    { key: "three", num: "03" },
  ] as const;

  return (
    <section id="services" className="scroll-mt-24 border-t border-border/40 px-4 py-24 md:py-32">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-16">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {t("title")} <span className="text-muted-foreground">/</span>
          </h2>
          <p className="mt-2 text-muted-foreground">({t("label")})</p>
        </div>
        <div className="space-y-16 md:space-y-24">
          {cards.map(({ key, num }, i) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="grid gap-8 md:grid-cols-[auto_1fr]"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-semibold tabular-nums text-muted-foreground">
                  ({num})
                </span>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {t(`${key}.title`)}
                </h3>
              </div>
              <div className="space-y-4 md:pl-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t(`${key}.desc`)}
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                  {(t.raw(`${key}.tech`) as string[]).map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
