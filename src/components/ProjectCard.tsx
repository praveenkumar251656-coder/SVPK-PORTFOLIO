import React from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ProjectItem } from "../data/projects";
import { ProjectVisualPreview } from "./ProjectVisualPreview";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  total: number;
  onExplore: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  total,
  onExplore
}) => {
  return (
    <div
      className="sticky-project-card sticky top-24 md:top-28 w-full bg-white text-[#151515] rounded-xl border border-[rgba(21,21,21,0.12)] shadow-sm overflow-hidden transition-all duration-300 mb-8"
      style={{
        zIndex: index + 1
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 lg:p-10 items-stretch">
        {/* Left Column: Metadata & Narrative */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Unboxed metadata line with typographic separators */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#686868]">
              <span>{project.number} / {String(total).padStart(2, "0")}</span>
              <span aria-hidden="true">·</span>
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#4263EB] font-semibold">{project.status}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#151515]">
              {project.title}
            </h3>

            <p className="text-sm text-[#4A4A4A] leading-relaxed">
              {project.overview}
            </p>

            {/* Key feature highlights */}
            <div className="pt-2">
              <span className="text-xs uppercase font-mono tracking-wider text-[#686868] block mb-2">
                Core Exploration:
              </span>
              <ul className="space-y-1.5">
                {project.conceptualFeatures.slice(0, 3).map((feat, idx) => (
                  <li key={idx} className="text-xs text-[#2A2A2A] flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4263EB] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[rgba(21,21,21,0.08)] flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-[#686868]">
              {project.techStack.slice(0, 2).map((tech, idx) => (
                <span key={idx} className="bg-[#FAF9F5] px-2 py-0.5 rounded border border-[rgba(21,21,21,0.08)]">
                  {tech.split(" ")[0]}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onExplore(project)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#151515] text-[#F7F5F0] rounded text-xs font-semibold hover:bg-[#2A2A2A] transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            >
              <span>Explore Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Visual Preview */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <ProjectVisualPreview demoType={project.demoType} title={project.title} />
        </div>
      </div>
    </div>
  );
};
