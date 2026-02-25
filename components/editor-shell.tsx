"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CodeView } from "./code-view";
import type { Line } from "./code-view";
import { FileCode, FolderOpen, FolderGit2, User, Briefcase, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

type FileId = "index" | "projects" | "skills" | "about";

const FILES: { id: FileId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "index", label: "index.ts", icon: FileCode },
  { id: "projects", label: "projects.ts", icon: Briefcase },
  { id: "skills", label: "skills.ts", icon: Wrench },
  { id: "about", label: "about.ts", icon: User },
];

function useEditorContent(activeFile: FileId): Line[] {
  const t = useTranslations("hero");
  const tProjects = useTranslations("projects");
  const tSkills = useTranslations("skills");
  const tAbout = useTranslations("about");

  const projectKeys = ["hausheld", "nexus", "croatia360", "crm"] as const;

  switch (activeFile) {
    case "index": {
      const lines: Line[] = [
        { type: "comment", text: "// Damir Andrijanic — Portfolio" },
        { type: "empty", text: "" },
        { type: "keyword", text: "const" },
        { type: "plain", text: " headline " },
        { type: "plain", text: "=" },
        { type: "string", text: ` "${t("headline")}"` },
        { type: "plain", text: ";" },
        { type: "empty", text: "" },
        { type: "keyword", text: "const" },
        { type: "plain", text: " intro " },
        { type: "plain", text: "=" },
        { type: "string", text: ` "${t("subheadline")}"` },
        { type: "plain", text: ";" },
        { type: "empty", text: "" },
        { type: "comment", text: "// Explore the codebase ↓" },
      ];
      return lines;
    }
    case "projects": {
      const lines: Line[] = [
        { type: "comment", text: `// ${tProjects("title")}` },
        { type: "empty", text: "" },
        { type: "keyword", text: "const" },
        { type: "plain", text: " projects " },
        { type: "plain", text: "=" },
        { type: "plain", text: " [" },
      ];
      projectKeys.forEach((key, i) => {
        const name = tProjects(`${key}.name`);
        const angle = tProjects(`${key}.angle`);
        lines.push({ type: "plain", text: `  { name: "${name}", role: "${angle}" },` });
      });
      lines.push({ type: "plain", text: "];" });
      lines.push({ type: "empty", text: "" });
      lines.push({ type: "comment", text: "// Hausheld, Nexus AI, Croatia 360, CRM — full case studies in repo." });
      return lines;
    }
    case "skills": {
      return [
        { type: "comment", text: `// ${tSkills("title")}` },
        { type: "empty", text: "" },
        { type: "keyword", text: "const" },
        { type: "plain", text: " stack " },
        { type: "plain", text: "=" },
        { type: "plain", text: " {" },
        { type: "string", text: `  ${tSkills("backend")}:` },
        { type: "plain", text: ' "FastAPI, PostGIS, Prisma, PostgreSQL",' },
        { type: "string", text: `  ${tSkills("ai")}:` },
        { type: "plain", text: ' "RAG, Pinecone, Gemini, Vercel AI SDK",' },
        { type: "string", text: `  ${tSkills("frontend")}:` },
        { type: "plain", text: ' "Next.js, React, TypeScript, Tailwind, PWA",' },
        { type: "string", text: `  ${tSkills("devops")}:` },
        { type: "plain", text: ' "Docker, AWS, Vercel, CI/CD",' },
        { type: "plain", text: "};" },
      ];
    }
    case "about": {
      return [
        { type: "comment", text: `// ${tAbout("title")}` },
        { type: "empty", text: "" },
        { type: "keyword", text: "export" },
        { type: "plain", text: " function" },
        { type: "plain", text: " story() {" },
        { type: "comment", text: "// " + tAbout("p1") },
        { type: "comment", text: "// " + tAbout("p2") },
        { type: "comment", text: "// " + tAbout("p3") },
        { type: "plain", text: "}" },
      ];
    }
    default:
      return [];
  }
}

export function EditorShell() {
  const [activeFile, setActiveFile] = useState<FileId>("index");
  const lines = useEditorContent(activeFile);

  return (
    <div className="flex min-h-[75vh] bg-[#0d1117]">
      {/* Sidebar — Explorer */}
      <aside className="flex w-52 shrink-0 flex-col border-r border-[#21262d] bg-[#010409]">
        <div className="flex h-10 items-center gap-2 border-b border-[#21262d] px-3 text-xs font-medium uppercase tracking-wider text-[#8b949e]">
          <FolderGit2 className="h-4 w-4" />
          Explorer
        </div>
        <nav className="flex-1 overflow-auto py-2">
          <div className="flex items-center gap-2 px-3 py-1 text-xs text-[#8b949e]">
            <FolderOpen className="h-4 w-4" />
            portfolio
          </div>
          <ul className="mt-1 space-y-0.5">
            {FILES.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => setActiveFile(id)}
                  className={cn(
                    "flex w-full items-center gap-2 truncate px-6 py-1.5 text-left text-sm",
                    activeFile === id
                      ? "bg-[#21262d] text-[#e6edf3]"
                      : "text-[#8b949e] hover:bg-[#161b22] hover:text-[#e6edf3]"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 text-[#58a6ff]" />
                  <span className="truncate">{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main — Editor */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Tab bar */}
        <div className="flex h-9 items-center border-b border-[#21262d] bg-[#0d1117] px-2">
          <div className="flex items-center gap-1 rounded-t px-3 py-1.5 text-sm bg-[#0d1117] border border-b-0 border-[#21262d] -mb-px">
            <FileCode className="h-3.5 w-3.5 text-[#8b949e]" />
            <span className="text-[#e6edf3]">
              {FILES.find((f) => f.id === activeFile)?.label ?? "index.ts"}
            </span>
          </div>
        </div>

        {/* Code area */}
        <div className="flex-1 overflow-auto">
          <CodeView lines={lines} activeFile={activeFile} />
        </div>
      </div>
    </div>
  );
}
