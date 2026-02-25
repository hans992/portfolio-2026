"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function About() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="scroll-mt-24 px-4 py-24 sm:py-32 md:py-40"
    >
      <div className="container mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          {t("title")}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p className="font-medium text-foreground">{t("p3")}</p>
        </motion.div>
      </div>
    </section>
  );
}
