"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const headlineScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.28]);
  const headlineY = useTransform(scrollYProgress, [0, 0.45], [0, -180]);
  const headlineOpacity = useTransform(scrollYProgress, [0.35, 0.5], [1, 0.85]);
  const subheadOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const subheadY = useTransform(scrollYProgress, [0, 0.2], [0, 12]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="hero-gradient relative min-h-[130vh] overflow-hidden"
      aria-label="Introduction"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full dark:block"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(0,163,255,0.15), transparent)",
        }}
        aria-hidden
      />
      <div className="sticky top-0 flex min-h-screen flex-col items-center justify-center px-4 pt-[4rem] pb-24">
        <motion.div
          style={{
            scale: headlineScale,
            y: headlineY,
            opacity: headlineOpacity,
          }}
          className="flex max-w-5xl flex-col items-center text-center"
        >
          <h1 className="font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] xl:leading-[1.05]">
            {t("headline")}
          </h1>
          <motion.p
            style={{ opacity: subheadOpacity, y: subheadY }}
            className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl md:mt-8 md:text-2xl"
          >
            {t("subheadline")}
          </motion.p>
          <motion.div style={{ opacity: ctaOpacity }} className="mt-8 md:mt-10">
            <a
              href="#projects"
              className="group inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90 active:scale-[0.98]"
            >
              {t("cta")}
              <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden
        >
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
