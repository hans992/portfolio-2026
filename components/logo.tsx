"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: number;
  /** Prefer explicit size (width/height) for layout. */
  width?: number;
  height?: number;
};

export function Logo({ className, size = 40, width, height }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const w = width ?? size;
  const h = height ?? size;
  const isDark = mounted && resolvedTheme === "dark";
  const src = isDark ? "/logo-white.png" : "/logo-black.png";

  if (!mounted) {
    return (
      <span
        className={cn("inline-block shrink-0 bg-muted/30 animate-pulse rounded", className)}
        style={{ width: w, height: h }}
        aria-hidden
      />
    );
  }

  return (
    <Image
      src={src}
      alt=""
      width={w}
      height={h}
      className={cn("shrink-0", className)}
      aria-hidden
    />
  );
}
