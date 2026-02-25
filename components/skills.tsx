"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const skillGroups = [
  {
    key: "backend",
    items: ["FastAPI", "SQLAlchemy", "PostGIS", "Alembic", "Prisma", "PostgreSQL"],
  },
  {
    key: "ai",
    items: ["RAG", "Pinecone", "Gemini", "Vercel AI SDK"],
  },
  {
    key: "frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind", "PWA", "i18n", "Framer Motion", "Shadcn/Radix"],
  },
  {
    key: "devops",
    items: ["Docker", "AWS (eu-central-1)", "Vercel", "CI/CD"],
  },
] as const;

export function Skills() {
  const t = useTranslations("skills");

  return (
    <section
      id="skills"
      className="scroll-mt-24 border-b border-border/30 px-4 py-24 sm:py-32 md:py-40"
    >
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          {t("title")}
        </motion.h2>
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-border hover:bg-card"
            >
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {t(group.key)}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-muted/80 px-3 py-1.5 text-sm font-medium text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
