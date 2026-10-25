import React, { useState, useEffect } from "react";
import { X, Play, FileText, CheckCircle2, AlertTriangle, ArrowRight, Wrench, Lightbulb } from "lucide-react";
import { ProjectItem } from "../data/projects";
import { TrustLensSim } from "./InteractiveSimulators/TrustLensSim";
import { SmartEduSim } from "./InteractiveSimulators/SmartEduSim";
import { BusinessSim } from "./InteractiveSimulators/BusinessSim";
import { LaptopSim } from "./InteractiveSimulators/LaptopSim";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<"simulator" | "details">("simulator");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white text-[#151515] rounded-xl shadow-2xl border border-[rgba(21,21,21,0.14)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[rgba(21,21,21,0.10)] bg-[#FAF9F5] flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#686868] mb-1">
              <span>PROJECT {project.number}</span>
              <span aria-hidden="true">·</span>
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-[#4263EB]">{project.status}</span>
            </div>
            <h2 id="modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-[#151515]">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1 max-w-2xl">{project.tagline}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project modal"
            className="p-2 text-[#686868] hover:text-[#151515] hover:bg-[rgba(21,21,21,0.06)] rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="px-6 border-b border-[rgba(21,21,21,0.08)] bg-white flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("simulator")}
            className={`py-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === "simulator"
                ? "border-[#4263EB] text-[#4263EB]"
                : "border-transparent text-[#686868] hover:text-[#151515]"
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Interactive Concept Simulator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("details")}
            className={`py-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === "details"
                ? "border-[#4263EB] text-[#4263EB]"
                : "border-transparent text-[#686868] hover:text-[#151515]"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Architecture & Lessons Learned</span>
          </button>
        </div>

        {/* Body content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
          {activeTab === "simulator" ? (
            <div>
              {project.demoType === "trustlens" && <TrustLensSim />}
              {project.demoType === "smart-edu" && <SmartEduSim />}
              {project.demoType === "business" && <BusinessSim />}
              {project.demoType === "laptop" && <LaptopSim />}
            </div>
          ) : (
            <div className="space-y-6 text-xs sm:text-sm">
              {/* Problem & Proposed Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#FAF9F5] border border-[rgba(21,21,21,0.08)] space-y-1.5">
                  <span className="text-xs font-mono uppercase text-red-700 font-semibold block flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> Problem Explored
                  </span>
                  <p className="text-[#3A3A3A] leading-relaxed">{project.problem}</p>
                </div>

                <div className="p-4 rounded-lg bg-[#FAF9F5] border border-[rgba(21,21,21,0.08)] space-y-1.5">
                  <span className="text-xs font-mono uppercase text-[#4263EB] font-semibold block flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" /> Proposed Approach
                  </span>
                  <p className="text-[#3A3A3A] leading-relaxed">{project.solution}</p>
                </div>
              </div>

              {/* Conceptual Features */}
              <div>
                <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-[#151515] mb-3">
                  Key Capabilities Explored
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.conceptualFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded border border-[rgba(21,21,21,0.08)] bg-white flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#4263EB] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#2A2A2A] leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Actually Used */}
              <div>
                <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-[#151515] mb-2">
                  Technologies Applied in Current Prototype
                </h4>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#333]">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#FAF9F5] border border-[rgba(21,21,21,0.12)] rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Current Implementation Status Truthfulness Note */}
              <div className="p-4 rounded-lg bg-[#F5F2EB] border border-[rgba(21,21,21,0.12)]">
                <span className="text-xs font-mono font-bold uppercase text-[#151515] block mb-1">
                  Honest Implementation Status
                </span>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  {project.currentStatusDetails}
                </p>
              </div>

              {/* Challenges and Lessons Learned */}
              <div>
                <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-[#151515] mb-2 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#4263EB]" /> Challenges & Technical Lessons
                </h4>
                <ul className="space-y-2">
                  {project.challengesAndLessons.map((item, idx) => (
                    <li key={idx} className="text-xs text-[#3A3A3A] flex items-start gap-2 leading-relaxed">
                      <span className="text-[#4263EB] font-bold">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Steps */}
              <div>
                <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-[#151515] mb-2 flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#4263EB]" /> Planned Next Steps
                </h4>
                <ul className="space-y-1.5">
                  {project.nextSteps.map((step, idx) => (
                    <li key={idx} className="text-xs text-[#4A4A4A] flex items-start gap-2">
                      <span className="font-mono text-[#888]">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-[rgba(21,21,21,0.08)] bg-[#FAF9F5] flex items-center justify-between shrink-0">
          <div className="text-xs text-[#686868]">
            <span>Status: </span>
            <span className="font-medium text-[#151515]">{project.status}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-xs px-4 py-2 border border-[rgba(21,21,21,0.20)] text-[#151515] rounded hover:bg-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
