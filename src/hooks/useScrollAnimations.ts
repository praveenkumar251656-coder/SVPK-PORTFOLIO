import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useScrollAnimations = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Projects Section - Subtle 3D tilt and scale on scroll
      const projectCards = document.querySelectorAll(".sticky-project-card");
      projectCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            scale: 0.95,
            opacity: 0.85,
            y: 40,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 45%",
              scrub: 0.6,
            },
          }
        );
      });

      // 2. Focus Areas Section - Staggered divider line expansion
      const focusRows = document.querySelectorAll(".focus-area-row");
      if (focusRows.length > 0) {
        gsap.from(focusRows, {
          opacity: 0,
          x: -30,
          stagger: 0.12,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#focus-areas",
            start: "top 75%",
          },
        });
      }

      // 3. Education Section - Timeline milestone glow
      const educationCard = document.querySelector("#education-card");
      if (educationCard) {
        gsap.from(educationCard, {
          opacity: 0,
          y: 35,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#education",
            start: "top 80%",
          },
        });
      }
    });

    return () => {
      ctx.revert(); // clean up all GSAP animations & triggers
    };
  }, []);
};
