"use client";

import { useEffect, useId, useRef, useState } from "react";

type Props = {
  chart: string;
  className?: string;
};

export function MermaidDiagram({ chart, className }: Props) {
  const id = useId().replace(/:/g, "-");
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !chart.trim() || !containerRef.current) return;

    const timeoutId = window.setTimeout(() => {
      setTimedOut(true);
    }, 5000);

    const run = async () => {
      try {
        setError(null);
        const { default: mermaid } = await import("mermaid");
        const isDark =
          typeof document !== "undefined" &&
          document.documentElement.classList.contains("dark");
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "neutral",
          securityLevel: "loose",
          flowchart: { useMaxWidth: true, htmlLabels: true },
        });
        const uniqueId = `mermaid-${id}-${Date.now()}`;
        const { svg, bindFunctions } = await mermaid.render(uniqueId, chart);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          if (typeof bindFunctions === "function") {
            bindFunctions(containerRef.current);
          }
          const svgEl = containerRef.current.querySelector("svg");
          if (svgEl) {
            svgEl.setAttribute("role", "img");
            svgEl.setAttribute("aria-label", "Architecture diagram");
          }
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to render diagram");
      } finally {
        clearTimeout(timeoutId);
      }
    };

    run();
    return () => clearTimeout(timeoutId);
  }, [mounted, chart, id]);

  if (error) {
    return (
      <div
        className={`rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground ${className ?? ""}`}
      >
        <p>Diagram could not be rendered: {error}</p>
        <pre className="mt-2 overflow-x-auto text-xs opacity-80">{chart}</pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`mermaid-diagram flex min-h-[200px] justify-center rounded-xl border border-border bg-muted/30 p-6 text-foreground [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:min-w-[280px] ${className ?? ""}`}
      aria-hidden
    >
      {!mounted && (
        <span className="text-sm text-muted-foreground">Loading diagram…</span>
      )}
      {mounted && timedOut && !containerRef.current?.querySelector("svg") && !error && (
        <pre className="w-full overflow-x-auto text-left text-xs text-muted-foreground">
          {chart}
        </pre>
      )}
    </div>
  );
}
