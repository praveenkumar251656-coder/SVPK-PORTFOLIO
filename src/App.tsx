import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { MarqueeSection } from "./sections/MarqueeSection";
import { CinematicBannerSection } from "./sections/CinematicBannerSection";
import { AboutSection } from "./sections/AboutSection";
import { FocusAreasSection } from "./sections/FocusAreasSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { EducationSection } from "./sections/EducationSection";
import { ContactSection } from "./sections/ContactSection";
import { AdminResumeModal } from "./components/AdminResumeModal";
import { useScrollAnimations } from "./hooks/useScrollAnimations";

export default function App() {
  useScrollAnimations();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    // Check URL hash for #admin
    const handleHash = () => {
      if (window.location.hash === "#admin") {
        setIsAdminOpen(true);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);

    // Keyboard shortcut: Ctrl+Shift+A or Cmd+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#151515] font-sans antialiased selection:bg-[#4263EB] selection:text-white">
      {/* Navigation Top Bar */}
      <Navbar onContactClick={scrollToContact} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Cinematic Hero Section with Google Flow sequence & canvas fallback */}
        <HeroSection
          onExploreClick={scrollToProjects}
          onContactClick={scrollToContact}
        />

        {/* 2. Ideas in Motion Marquee */}
        <MarqueeSection />

        {/* 3. Cinematic Transition Banner with Photo B */}
        <CinematicBannerSection />

        {/* 4. About Section: Who I Am & Principles with Photo A */}
        <AboutSection />

        {/* 5. Focus Areas: What I'm Exploring */}
        <FocusAreasSection />

        {/* 6. Selected Projects: Stacked Cards & Interactive Simulators */}
        <ProjectsSection />

        {/* 7. Toolkit: Current Skills & Honest Learning Stages */}
        <SkillsSection />

        {/* 8. Education: AMS College of Engineering & Coursework */}
        <EducationSection />
      </main>

      {/* 9. Contact Section & Polished Footer */}
      <ContactSection
        onBackToProjects={scrollToProjects}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Protected Admin Resume Console */}
      <AdminResumeModal
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash === "#admin") {
            history.pushState(null, "", window.location.pathname);
          }
        }}
      />
    </div>
  );
}
