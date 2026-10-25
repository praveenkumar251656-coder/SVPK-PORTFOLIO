import React from "react";

export const MarqueeSection: React.FC = () => {
  const rowOneItems = [
    "BUILD WITH PURPOSE",
    "EXPERIMENT FREQUENTLY",
    "LEARN BY BUILDING",
    "ARTIFICIAL INTELLIGENCE",
    "TURN IDEAS INTO SYSTEMS",
    "CREATE PRACTICAL SOLUTIONS"
  ];

  const rowTwoItems = [
    "FROM CURIOSITY TO CODE",
    "PRACTICAL PROBLEM SOLVING",
    "RAPID PROTOTYPING",
    "MACHINE LEARNING CONCEPTS",
    "CONTINUOUS TECHNICAL GROWTH",
    "CSE · AI/ML 2028"
  ];

  return (
    <section
      aria-label="Ideas in Motion Marquee"
      className="py-12 md:py-16 bg-[#F7F5F0] border-y border-[rgba(21,21,21,0.10)] overflow-hidden select-none"
    >
      <div className="space-y-4">
        {/* Row 1: Left to right */}
        <div className="relative flex overflow-hidden group">
          <div className="flex shrink-0 animate-marquee items-center gap-6 whitespace-nowrap">
            {rowOneItems.concat(rowOneItems).map((text, idx) => (
              <div key={idx} className="flex items-center gap-6">
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight uppercase text-[#151515]/90 hover:text-[#4263EB] transition-colors">
                  {text}
                </span>
                <span className="text-[#4263EB] text-sm" aria-hidden="true">
                  ✦
                </span>
              </div>
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee items-center gap-6 whitespace-nowrap" aria-hidden="true">
            {rowOneItems.concat(rowOneItems).map((text, idx) => (
              <div key={`dup-${idx}`} className="flex items-center gap-6">
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight uppercase text-[#151515]/90 hover:text-[#4263EB] transition-colors">
                  {text}
                </span>
                <span className="text-[#4263EB] text-sm">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to left */}
        <div className="relative flex overflow-hidden group">
          <div className="flex shrink-0 animate-marquee-reverse items-center gap-6 whitespace-nowrap">
            {rowTwoItems.concat(rowTwoItems).map((text, idx) => (
              <div key={idx} className="flex items-center gap-6">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight uppercase text-[#686868] hover:text-[#151515] transition-colors">
                  {text}
                </span>
                <span className="text-[rgba(21,21,21,0.25)] text-sm" aria-hidden="true">
                  ■
                </span>
              </div>
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee-reverse items-center gap-6 whitespace-nowrap" aria-hidden="true">
            {rowTwoItems.concat(rowTwoItems).map((text, idx) => (
              <div key={`dup2-${idx}`} className="flex items-center gap-6">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight uppercase text-[#686868] hover:text-[#151515] transition-colors">
                  {text}
                </span>
                <span className="text-[rgba(21,21,21,0.25)] text-sm">■</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
