import React from "react";
import { profileData } from "../data/profile";
import { FadeIn } from "../components/FadeIn";
import { MapPin, Sparkles, Compass } from "lucide-react";

export const CinematicBannerSection: React.FC = () => {
  return (
    <section
      aria-label="Cinematic Profile Banner"
      className="py-12 md:py-20 bg-[#F7F5F0] overflow-hidden border-b border-[rgba(21,21,21,0.10)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          {/* Outer cinematic frame */}
          <div className="relative group rounded-2xl overflow-hidden border border-[rgba(21,21,21,0.14)] bg-[#0C0C0C] shadow-lg shadow-black/5">
            {/* The 16:9 banner image */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] max-h-[540px] overflow-hidden bg-[#18181B]">
              <img
                src={profileData.photos.banner}
                alt="S.V. Praveen Kumar — Aspiring AI and Machine Learning developer in casual professional black attire"
                className="w-full h-full object-cover object-[center_32%] filter brightness-[0.98] contrast-[1.02] transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                loading="eager"
              />

              {/* Cinematic Vignette & Bottom Gradient for Content Contrast */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/90 via-[#0C0C0C]/25 to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C]/50 via-transparent to-[#0C0C0C]/30 pointer-events-none"
                aria-hidden="true"
              />

              {/* Top-Right Ambient Badge */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider text-white/90 bg-black/40 backdrop-blur-md border border-white/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  BUILDING & EXPERIMENTING
                </span>
              </div>

              {/* Bottom In-Image Typography */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A5B4FC]">
                    <Compass className="w-3.5 h-3.5" />
                    <span>ENGINEER IN TRAINING</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
                    {profileData.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 line-clamp-2 font-normal">
                    {profileData.department} · {profileData.institution}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-white/75 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10 shrink-0 self-start sm:self-end">
                  <MapPin className="w-3.5 h-3.5 text-[#4263EB]" />
                  <span>{profileData.contact.location}</span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
