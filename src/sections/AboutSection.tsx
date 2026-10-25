import React from "react";
import { Sparkles, Terminal, Code2, Cpu } from "lucide-react";
import { profileData } from "../data/profile";
import { FadeIn } from "../components/FadeIn";

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-label="About Praveen"
      className="py-20 md:py-32 bg-[#F7F5F0] text-[#151515] border-b border-[rgba(21,21,21,0.10)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Narrative & Visual Split with Header aligned opposite to Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Narrative & Header (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Section Header */}
            <FadeIn>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#686868] mb-3">
                <span className="text-[#4263EB] font-bold">01 //</span>
                <span>WHO I AM</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#151515] leading-none">
                ABOUT ME
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-lg sm:text-xl md:text-2xl text-[#151515] font-medium leading-relaxed">
                {profileData.aboutText}
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="p-6 bg-white rounded-xl border border-[rgba(21,21,21,0.10)] shadow-2xs space-y-3">
                <span className="text-xs uppercase font-mono tracking-wider text-[#686868] block">
                  Career Objective
                </span>
                <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
                  {profileData.careerObjective}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-[#686868]">
                  {profileData.personalityTraits.map((trait, idx) => (
                    <span key={idx} className="bg-[#FAF9F5] px-2.5 py-1 rounded border border-[rgba(21,21,21,0.08)]">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Portrait (Photo A) & Profile Metrics Anchor (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:pt-7">
            <FadeIn delay={0.2}>
              {/* Formal Portrait (Photo A) */}
              <div className="relative group rounded-2xl overflow-hidden border border-[rgba(21,21,21,0.14)] bg-white shadow-md">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#121214]">
                  <img
                    src={profileData.photos.portrait}
                    alt="S.V. Praveen Kumar — Professional portrait in formal suit"
                    className="w-full h-full object-cover object-top filter brightness-[0.99] contrast-[1.01] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading="eager"
                  />
                  {/* Subtle edge vignette */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                  {/* Portrait Caption */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                    <span className="font-bold tracking-tight text-sm drop-shadow">{profileData.name}</span>
                    <span className="bg-black/50 backdrop-blur-md px-2 py-0.5 rounded text-[10px] border border-white/20">
                      B.E. CSE (AI/ML)
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="relative p-6 bg-white rounded-xl border border-[rgba(21,21,21,0.12)] shadow-2xs space-y-5 overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(21,21,21,0.08)]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#4263EB]" />
                    <span className="text-xs font-mono tracking-wider font-semibold text-[#151515]">
                      STUDENT PROFILE METRICS
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Active Student
                  </span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="text-[#888] font-mono uppercase block text-[10px]">Institution</span>
                    <span className="text-sm font-bold text-[#151515]">{profileData.institution}</span>
                  </div>

                  <div>
                    <span className="text-[#888] font-mono uppercase block text-[10px]">Degree & Specialization</span>
                    <span className="text-sm font-semibold text-[#151515]">
                      {profileData.degree} in {profileData.specialization}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-[#FAF9F5] rounded border border-[rgba(21,21,21,0.08)]">
                      <span className="text-[#888] font-mono uppercase block text-[10px]">Expected Graduation</span>
                      <span className="text-base font-bold font-mono text-[#151515]">{profileData.graduationYear}</span>
                    </div>

                    <div className="p-3 bg-[#FAF9F5] rounded border border-[rgba(21,21,21,0.08)]">
                      <span className="text-[#888] font-mono uppercase block text-[10px]">Focus Discipline</span>
                      <span className="text-base font-bold font-mono text-[#4263EB]">AI & ML</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[rgba(21,21,21,0.08)] flex items-center justify-between text-[11px] font-mono text-[#686868]">
                  <span>LOCATION: {profileData.contact.location}</span>
                  <span>OPEN TO INTERNSHIPS</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* 3 Principles */}
        <div className="mt-20 pt-16 border-t border-[rgba(21,21,21,0.12)]">
          <FadeIn>
            <span className="text-xs uppercase font-mono tracking-wider text-[#686868] block mb-2">
              Guiding Principles
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#151515] mb-8">
              HOW I THINK & BUILD
            </h3>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {profileData.principles.map((p, idx) => (
              <FadeIn key={p.number} delay={0.1 * (idx + 1)}>
                <div className="p-6 bg-white rounded-xl border border-[rgba(21,21,21,0.10)] shadow-2xs h-full flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-2xl font-black font-mono text-[#4263EB]">
                      {p.number}
                    </span>
                    <h4 className="text-base font-bold tracking-tight text-[#151515]">
                      {p.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
