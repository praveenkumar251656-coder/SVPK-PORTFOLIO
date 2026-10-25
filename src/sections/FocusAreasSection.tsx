import React, { useState } from "react";
import { Plus, Minus, ArrowRight, Sparkles } from "lucide-react";
import { focusAreasData, FocusArea } from "../data/skills";
import { FadeIn } from "../components/FadeIn";

export const FocusAreasSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section
      id="focus-areas"
      aria-label="What I'm Exploring"
      className="py-20 md:py-32 bg-[#F7F5F0] text-[#151515] border-b border-[rgba(21,21,21,0.10)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#686868] mb-3">
            <span className="text-[#4263EB] font-bold">02 //</span>
            <span>DEVELOPMENT AREAS</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#151515]">
                WHAT I'M EXPLORING
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#686868] max-w-md">
              Current technical interests, active study topics, and experimentation domains as an AI/ML undergraduate.
            </p>
          </div>
        </FadeIn>

        {/* 5 Editorial Rows */}
        <div className="divide-y divide-[rgba(21,21,21,0.12)] border-y border-[rgba(21,21,21,0.12)]">
          {focusAreasData.map((area, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div
                key={area.number}
                className={`focus-area-row transition-colors duration-200 ${
                  isExpanded ? "bg-white" : "hover:bg-white/50"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(idx)}
                  aria-expanded={isExpanded}
                  className="w-full text-left py-6 sm:py-8 px-4 sm:px-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 flex-1">
                    <span className="text-xl sm:text-2xl font-black font-mono text-[#4263EB] shrink-0">
                      {area.number}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#151515]">
                        {area.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#686868] mt-1 font-normal">
                        {area.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="p-2 rounded-full border border-[rgba(21,21,21,0.12)] shrink-0 self-center text-[#151515]">
                    {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expandable Details */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-6 pt-0 sm:pl-20 border-t border-[rgba(21,21,21,0.06)] bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
                      <div className="md:col-span-8">
                        <p className="text-sm text-[#3A3A3A] leading-relaxed">
                          {area.description}
                        </p>
                      </div>

                      <div className="md:col-span-4">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#686868] block mb-2">
                          Key Concepts & Focus Topics
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {area.keyTopics.map((topic, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-xs font-mono px-2.5 py-1 bg-[#FAF9F5] border border-[rgba(21,21,21,0.08)] rounded text-[#333]"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
