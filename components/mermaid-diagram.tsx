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

  useEffect(() => {
    if (!chart.trim() || !containerRef.current) return;

    const run = async () => {
      try {
        setError(null);
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          theme: "neutral",
          securityLevel: "loose",
          flowchart: { useMaxWidth: true, htmlLabels: true },
        });
        const { svg } = await mermaid.render(`mermaid-${id}`, chart);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to render diagram");
      }
    };

    run();
  }, [chart, id]);

  if (error) {
    return (
      <div className={`rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground ${className ?? ""}`}>
        <p>Diagram could not be rendered: {error}</p>
        <pre className="mt-2 overflow-x-auto text-xs opacity-80">{chart}</pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`mermaid-diagram flex min-h-[200px] justify-center rounded-xl border border-border bg-muted/30 p-6 [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:min-w-[280px] ${className ?? ""}`}
      aria-hidden
    />
  );
}
