import React, { useState, useEffect } from "react";
import { Mail, Copy, Check, ArrowUpRight, ArrowUp, Send, Github, Linkedin, FileText, Download, Lock } from "lucide-react";
import { profileData } from "../data/profile";
import { FadeIn } from "../components/FadeIn";

interface ContactSectionProps {
  onBackToProjects: () => void;
  onOpenAdmin?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onBackToProjects, onOpenAdmin }) => {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [resumeFilename, setResumeFilename] = useState("Praveen_Kumar_Resume.pdf");

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch("/api/resume/info");
        if (res.ok) {
          const data = await res.json();
          if (data.downloadFilename) {
            setResumeFilename(data.downloadFilename);
          }
        }
      } catch {
        // Fallback
      }
    };
    fetchInfo();

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ downloadFilename?: string }>;
      if (customEvent.detail?.downloadFilename) {
        setResumeFilename(customEvent.detail.downloadFilename);
      } else {
        fetchInfo();
      }
    };
    window.addEventListener("resume-updated", handleUpdate);
    return () => window.removeEventListener("resume-updated", handleUpdate);
  }, []);

  const handleDownloadClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/resume/download");
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = resumeFilename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      window.location.href = "/api/resume/download";
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Internship / Project Inquiry from ${senderName || "Portfolio Visitor"}`
    );
    const body = encodeURIComponent(
      `Hi Praveen,\n\n${senderMessage}\n\nFrom: ${senderName} (${senderEmail})`
    );
    window.location.href = `mailto:${profileData.contact.email}?subject=${subject}&body=${body}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      aria-label="Contact and Connect"
      className="bg-[#0C0C0C] text-[#F1F0EC] pt-20 md:pt-32 pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Header */}
        <FadeIn>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A0A0A5] mb-3">
            <span className="text-[#4263EB] font-bold">06 //</span>
            <span>GET IN TOUCH</span>
          </div>

          <div className="max-w-3xl space-y-4 mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F7F5F0] leading-tight">
              LET'S BUILD WHAT'S NEXT.
            </h2>
            <p className="text-base sm:text-lg text-[#A0A0AA] leading-relaxed">
              I'm interested in learning, collaborating, and exploring opportunities to build useful technology. Whether you're hiring for student internships or discussing a technical project, my inbox is open.
            </p>
          </div>
        </FadeIn>

        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-white/10">
          {/* Quick Direct Message Generator (7 cols) */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.1}>
              <div className="p-6 sm:p-8 bg-[#141416] rounded-xl border border-white/10 shadow-lg space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs uppercase font-mono tracking-wider text-[#A0A0A5]">
                    Compose Message to Praveen
                  </span>
                  <span className="text-xs font-mono text-[#4263EB]">mailto: protocol</span>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-[#C0C0C8] mb-1">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="e.g., Alex Chen"
                        className="w-full text-xs px-3.5 py-2.5 rounded bg-[#1C1C20] border border-white/15 text-white placeholder-[#777] focus:outline-none focus:border-[#4263EB]"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-[#C0C0C8] mb-1">
                        Your Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="e.g., alex@company.com"
                        className="w-full text-xs px-3.5 py-2.5 rounded bg-[#1C1C20] border border-white/15 text-white placeholder-[#777] focus:outline-none focus:border-[#4263EB]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-[#C0C0C8] mb-1">
                      Project or Internship Note
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={senderMessage}
                      onChange={(e) => setSenderMessage(e.target.value)}
                      placeholder="Hi Praveen, we'd like to chat about an internship opportunity..."
                      className="w-full text-xs px-3.5 py-2.5 rounded bg-[#1C1C20] border border-white/15 text-white placeholder-[#777] focus:outline-none focus:border-[#4263EB] resize-none"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <p className="text-[11px] text-[#888] font-mono">
                      Opens your default email client with verified recipient
                    </p>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-white text-[#0C0C0C] font-semibold text-xs rounded hover:bg-[#EAEAEA] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Direct Email</span>
                    </button>
                  </div>
                </form>
              </div>
            </FadeIn>
          </div>

          {/* Contact Information & Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <FadeIn delay={0.2}>
              <div className="p-6 sm:p-8 bg-[#141416] rounded-xl border border-white/10 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#888] block mb-2">
                    Verified Email
                  </span>
                  <div className="flex items-center justify-between gap-2 p-3 bg-[#1C1C20] rounded border border-white/10">
                    <a
                      href={`mailto:${profileData.contact.email}`}
                      className="text-xs sm:text-sm font-mono text-[#F1F0EC] hover:text-[#4263EB] truncate transition-colors"
                    >
                      {profileData.contact.email}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      className="p-1.5 text-[#AAA] hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  {copied && (
                    <span className="text-[10px] text-emerald-400 font-mono mt-1 block">
                      ✓ Email copied to clipboard
                    </span>
                  )}
                </div>

                {/* Professional Links */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#888]">
                      Developer Channels & Profiles
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400">
                      Active
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {/* LinkedIn */}
                    <div className="p-3 bg-[#1C1C20] rounded border border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-[#DDD]">
                        <Linkedin className="w-4 h-4 text-[#4263EB]" />
                        <span className="font-medium">LinkedIn</span>
                      </div>
                      <a
                        href={profileData.contact.linkedIn.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Connect with S.V. Praveen Kumar on LinkedIn (opens in new tab)"
                        className="text-xs text-[#4263EB] hover:text-[#5C7CFA] flex items-center gap-1 font-mono transition-colors"
                      >
                        <span>Connect</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* GitHub */}
                    <div className="p-3 bg-[#1C1C20] rounded border border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-[#DDD]">
                        <Github className="w-4 h-4 text-[#4263EB]" />
                        <span className="font-medium">GitHub</span>
                      </div>
                      <a
                        href={profileData.contact.github.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit S.V. Praveen Kumar's GitHub profile and repositories (opens in new tab)"
                        className="text-xs text-[#4263EB] hover:text-[#5C7CFA] flex items-center gap-1 font-mono transition-colors"
                      >
                        <span>Repositories</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Resume */}
                    <div className="p-3 bg-[#1C1C20] rounded border border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-[#DDD]">
                        <FileText className="w-4 h-4 text-[#4263EB]" />
                        <span className="font-medium">Curriculum Vitae</span>
                      </div>
                      <a
                        href="/api/resume/download"
                        onClick={handleDownloadClick}
                        download={resumeFilename}
                        aria-label="Download Praveen Kumar's official resume PDF"
                        className="text-xs text-[#4263EB] hover:text-[#5C7CFA] flex items-center gap-1 font-mono transition-colors cursor-pointer"
                      >
                        <span>Download PDF</span>
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={onBackToProjects}
                    className="text-xs font-semibold text-[#C0C0C8] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>← Back to Projects</span>
                  </button>

                  <button
                    type="button"
                    onClick={scrollToTop}
                    className="text-xs font-mono text-[#888] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Back to Top</span>
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Polished Footer Signature */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#777780]">
          <div>
            <span className="font-bold text-[#F1F0EC] tracking-tight">{profileData.name}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>CSE · AI/ML · BUILDING THROUGH CURIOSITY</span>
          </div>

          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} S.V. Praveen Kumar. Crafted with Vite & React.</span>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                title="Admin Console (Ctrl+Shift+A)"
                aria-label="Open Resume Administration Console"
                className="text-[#444] hover:text-[#888] transition-colors p-1 rounded"
              >
                <Lock className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
