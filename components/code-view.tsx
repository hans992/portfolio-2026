"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export type Line = {
  type: "comment" | "keyword" | "string" | "plain" | "empty";
  text: string;
};

type Props = {
  lines: Line[];
  activeFile: string;
};

function SyntaxSegment({ type, text }: { type: Line["type"]; text: string }) {
  const className = {
    comment: "text-[#8b949e]",
    keyword: "text-[#ff7b72]",
    string: "text-[#a5d6ff]",
    plain: "text-[#e6edf3]",
    empty: "",
  }[type];

  return <span className={className}>{text}</span>;
}

export function CodeView({ lines, activeFile }: Props) {
  const locale = useLocale();
  const t = useTranslations("hero");

  return (
    <div className="flex font-mono text-sm leading-relaxed">
      {/* Line numbers */}
      <div
        className="select-none shrink-0 border-r border-[#21262d] bg-[#0d1117] py-4 pr-4 text-right text-[#484f58]"
        aria-hidden
      >
        {lines.map((_, i) => (
          <div key={i} className="h-[1.5em] px-2">
            {i + 1}
          </div>
        ))}
      </div>

      {/* Code content */}
      <div className="min-w-0 flex-1 py-4 pl-4 text-[#e6edf3]">
        {lines.map((line, i) => (
          <div key={i} className="flex h-[1.5em] items-center overflow-x-auto whitespace-pre">
            <SyntaxSegment type={line.type} text={line.text} />
          </div>
        ))}

        {/* CTA when viewing index.ts */}
        {activeFile === "index" && (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}#projects`}
              className="inline-flex items-center gap-2 rounded border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm text-[#e6edf3] transition-colors hover:border-[#58a6ff] hover:bg-[#161b22]"
            >
              {t("cta")}
            </Link>
            <a
              href="#projects"
              className="text-sm text-[#58a6ff] hover:underline"
            >
              #projects
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
