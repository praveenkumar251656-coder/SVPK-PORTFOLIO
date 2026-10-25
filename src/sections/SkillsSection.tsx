import React from "react";
import { Check, BookOpen, Sparkles, Terminal } from "lucide-react";
import { skillsData, SkillCategory } from "../data/skills";
import { FadeIn } from "../components/FadeIn";

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="toolkit"
      aria-label="My Toolkit"
      className="py-20 md:py-32 bg-[#F7F5F0] text-[#151515] border-b border-[rgba(21,21,21,0.10)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#686868] mb-3">
            <span className="text-[#4263EB] font-bold">04 //</span>
            <span>CURRENT TOOLKIT & LEARNING</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#151515]">
                MY TOOLKIT
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#686868] max-w-md">
              Honest representation of my current technical foundation, coursework, and tools I actively experiment with. No fabricated proficiency meters.
            </p>
          </div>
        </FadeIn>

        {/* 3 Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillsData.map((category, idx) => (
            <FadeIn key={category.title} delay={0.1 * (idx + 1)}>
              <div className="p-6 sm:p-8 bg-white rounded-xl border border-[rgba(21,21,21,0.12)] shadow-2xs h-full flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[rgba(21,21,21,0.08)] mb-4">
                    <h3 className="text-base font-bold tracking-tight text-[#151515]">
                      {category.title}
                    </h3>
                    <span className="text-xs font-mono text-[#686868]">
                      0{idx + 1}
                    </span>
                  </div>

                  <p className="text-xs text-[#686868] mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="space-y-4">
                    {category.items.map((item, itemIdx) => {
                      const stageColor =
                        item.stage === "Core Foundation"
                          ? "text-[#151515] bg-[#F0EDE6]"
                          : item.stage === "Actively Learning"
                          ? "text-[#4263EB] bg-blue-50 border border-blue-200"
                          : "text-emerald-800 bg-emerald-50 border border-emerald-200";

                      return (
                        <div
                          key={itemIdx}
                          className="p-3 bg-[#FAF9F5] rounded-lg border border-[rgba(21,21,21,0.06)] space-y-1.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-[#151515]">
                              {item.name}
                            </span>
                            <span
                              className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded ${stageColor}`}
                            >
                              {item.stage}
                            </span>
                          </div>
                          {item.notes && (
                            <p className="text-[11px] text-[#555] leading-relaxed">
                              {item.notes}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 border-t border-[rgba(21,21,21,0.06)] flex items-center justify-between text-[11px] font-mono text-[#888]">
                  <span>{category.items.length} FOCUS ITEMS</span>
                  <span>ACADEMIC & BUILD</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Transparent Disclaimer */}
        <FadeIn delay={0.35}>
          <div className="mt-12 p-4 rounded-lg bg-[#FAF9F5] border border-[rgba(21,21,21,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#686868]">
            <p>
              <strong className="text-[#151515]">Curriculum & Practice Disclaimer:</strong> Technologies listed reflect my current academic coursework, hands-on lab experiments, and learning milestones — not claims of production mastery.
            </p>
            <span className="font-mono text-[#4263EB] shrink-0">B.E. CSE (AI/ML) · AMS</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
