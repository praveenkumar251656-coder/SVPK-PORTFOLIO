import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { profileData } from "../data/profile";

interface NavbarProps {
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Focus Areas", href: "#focus-areas" },
    { label: "Projects", href: "#projects" },
    { label: "Toolkit", href: "#toolkit" },
    { label: "Education", href: "#education" }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[rgba(21,21,21,0.08)] py-3.5 shadow-2xs"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className={`text-sm sm:text-base font-extrabold tracking-tight uppercase whitespace-nowrap shrink-0 transition-colors ${
              scrolled ? "text-[#151515]" : "text-[#F7F5F0]"
            }`}
          >
            {profileData.name}
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`transition-colors py-1 ${
                  scrolled
                    ? "text-[#686868] hover:text-[#151515]"
                    : "text-[#D0CECE] hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onContactClick}
              className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-tight rounded transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                scrolled
                  ? "bg-[#151515] text-[#F7F5F0] hover:bg-[#2A2A2A]"
                  : "bg-white text-[#151515] hover:bg-[#EBEBEB]"
              }`}
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              className={`md:hidden p-2 rounded transition-colors ${
                scrolled
                  ? "text-[#151515] hover:bg-[rgba(21,21,21,0.06)]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-30 bg-[#0C0C0C]/95 text-white md:hidden pt-24 px-6 pb-8 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="text-xs uppercase font-mono tracking-wider text-[#888] pb-2 border-b border-white/10">
              Navigation
            </div>
            <nav className="flex flex-col space-y-4 text-base font-semibold">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-[#E0E0E0] hover:text-white py-1 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-[#666]">→</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="w-full py-3 bg-white text-[#151515] font-semibold text-center rounded text-sm hover:bg-[#EBEBEB]"
            >
              Get in Touch
            </button>
            <p className="text-xs text-[#888] text-center font-mono">
              CSE · AI & ML · AMS College of Engineering
            </p>
          </div>
        </div>
      )}
    </>
  );
};
