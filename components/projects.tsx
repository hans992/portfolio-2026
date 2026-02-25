"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ProjectCard } from "./project-card";

const projectKeys = ["hausheld", "nexus", "croatia360", "crm"] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section
      id="projects"
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
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-10"
        >
          {projectKeys.map((key, index) => (
            <ProjectCard key={key} projectKey={key} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
