import React from "react";
import { GraduationCap, BookOpen, Calendar, Award } from "lucide-react";
import { educationData } from "../data/skills";
import { profileData } from "../data/profile";
import { FadeIn } from "../components/FadeIn";

export const EducationSection: React.FC = () => {
  return (
    <section
      id="education"
      aria-label="Education & Academic Background"
      className="py-20 md:py-32 bg-[#F7F5F0] text-[#151515] border-b border-[rgba(21,21,21,0.10)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#686868] mb-3">
            <span className="text-[#4263EB] font-bold">05 //</span>
            <span>ACADEMIC FOUNDATION</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#151515]">
                EDUCATION
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#686868] max-w-md">
              Undergraduate engineering curriculum balancing core computer science disciplines with specialized artificial intelligence theory.
            </p>
          </div>
        </FadeIn>

        {/* Academic Card */}
        <FadeIn delay={0.15}>
          <div id="education-card" className="p-6 sm:p-10 bg-white rounded-xl border border-[rgba(21,21,21,0.12)] shadow-sm space-y-8">
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[rgba(21,21,21,0.08)]">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#4263EB]">
                  <GraduationCap className="w-4 h-4" />
                  <span>UNDERGRADUATE DEGREE PROGRAM</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#151515]">
                  {educationData.degree}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-[#4263EB]">
                  {educationData.specialization}
                </p>
                <p className="text-sm text-[#4A4A4A]">
                  {educationData.institution} · {profileData.contact.location}
                </p>
              </div>

              <div className="p-4 bg-[#FAF9F5] rounded-lg border border-[rgba(21,21,21,0.08)] text-right self-start">
                <span className="text-[10px] font-mono uppercase text-[#888] block">Academic Timeline</span>
                <span className="text-sm font-bold font-mono text-[#151515] block mt-0.5">
                  {educationData.period}
                </span>
                <span className="text-xs text-emerald-700 font-medium block mt-1">
                  Expected Graduation: 2028
                </span>
              </div>
            </div>

            {/* Curriculum Description */}
            <p className="text-sm text-[#4A4A4A] leading-relaxed max-w-3xl">
              {educationData.description}
            </p>

            {/* Relevant Coursework Areas */}
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider text-[#686868] mb-4">
                <BookOpen className="w-3.5 h-3.5 text-[#4263EB]" />
                <span>Relevant Coursework & Areas of Study</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {educationData.courseworkAreas.map((course, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAF9F5] rounded-lg border border-[rgba(21,21,21,0.06)] hover:border-[rgba(21,21,21,0.18)] transition-colors"
                  >
                    <span className="text-xs font-bold text-[#151515] block mb-1">
                      {course.name}
                    </span>
                    <span className="text-[11px] text-[#686868] leading-tight block">
                      {course.focus}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(21,21,21,0.08)] flex items-center justify-between text-xs text-[#888] font-mono">
              <span>STATUS: ENROLLED B.E. UNDERGRADUATE</span>
              <span>GRADUATION YEAR: 2028</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
