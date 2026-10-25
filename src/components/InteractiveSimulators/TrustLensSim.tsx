import React, { useState } from "react";
import { ShieldAlert, ShieldCheck, AlertTriangle, RefreshCw, CheckCircle2 } from "lucide-react";

interface SampleItem {
  id: string;
  label: string;
  type: "text" | "link" | "email";
  content: string;
  riskLevel: "High Risk" | "Suspicious" | "Likely Safe";
  score: number;
  flags: string[];
  explanation: string;
  advice: string;
}

const PRESET_SAMPLES: SampleItem[] = [
  {
    id: "sample-1",
    label: "Urgent Bank SMS",
    type: "text",
    content: "ALERT: Your SBI bank account will be suspended in 2 hours due to pending KYC update. Click http://sbi-kyc-verify-portal.net/update immediately to avoid block.",
    riskLevel: "High Risk",
    score: 94,
    flags: [
      "Artificial urgency trigger ('suspended in 2 hours')",
      "Spoofed domain ('sbi-kyc-verify-portal.net' instead of official banking domain)",
      "Unsolicited credential solicitation"
    ],
    explanation: "This pattern exhibits classic phishing indicators: manufactured deadline pressure designed to bypass critical thinking, paired with an unofficial domain.",
    advice: "Never click unsolicited links in SMS. Always navigate to the official banking application or portal directly."
  },
  {
    id: "sample-2",
    label: "Fake Job Offer Email",
    type: "email",
    content: "Congratulations! You have been selected for an online AI Annotation Intern role ($45/hr). No interview required. Send ₹1,500 registration deposit for equipment clearance.",
    riskLevel: "High Risk",
    score: 89,
    flags: [
      "Upfront registration fee requested before employment",
      "Unrealistic compensation without screening",
      "Generic non-corporate recruitment phrasing"
    ],
    explanation: "Legitimate technology employers never require candidates to pay clearance or registration fees for internships or jobs.",
    advice: "Verify company recruiters directly through verified corporate career pages or university placement cells."
  },
  {
    id: "sample-3",
    label: "Official Academic Notice",
    type: "text",
    content: "AMS College of Engineering: Semester examinations schedule for Department of Computer Science has been published on the official student intranet portal.",
    riskLevel: "Likely Safe",
    score: 8,
    flags: [
      "No urgency threats or penalty warnings",
      "Directs to standard official internal portal",
      "Standard academic communication format"
    ],
    explanation: "Text contains neutral informative tone without coercion, external suspicious redirects, or credential requests.",
    advice: "Content matches normal campus notices. Verify details against internal academic calendars."
  }
];

export const TrustLensSim: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState<SampleItem>(PRESET_SAMPLES[0]);
  const [customText, setCustomText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [customResult, setCustomResult] = useState<SampleItem | null>(null);

  const runCustomAnalysis = () => {
    if (!customText.trim()) return;
    setAnalyzing(true);
    setCustomResult(null);

    setTimeout(() => {
      const lower = customText.toLowerCase();
      const hasUrgency =
        lower.includes("urgent") ||
        lower.includes("immediately") ||
        lower.includes("suspended") ||
        lower.includes("hours") ||
        lower.includes("expire");
      const hasMoney =
        lower.includes("deposit") ||
        lower.includes("fee") ||
        lower.includes("rupees") ||
        lower.includes("₹") ||
        lower.includes("dollar") ||
        lower.includes("$") ||
        lower.includes("prize") ||
        lower.includes("lottery");
      const hasLink =
        lower.includes("http") ||
        lower.includes(".net") ||
        lower.includes(".xyz") ||
        lower.includes("click");

      const flags: string[] = [];
      let score = 15;

      if (hasUrgency) {
        flags.push("Detected urgency language or coercive deadline framing");
        score += 35;
      }
      if (hasMoney) {
        flags.push("Identified monetary payment or financial clearance claim");
        score += 30;
      }
      if (hasLink) {
        flags.push("Contains external link requiring scrutiny against official domains");
        score += 20;
      }

      if (flags.length === 0) {
        flags.push("No obvious urgent or coercive patterns identified in text sample");
      }

      const riskLevel: "High Risk" | "Suspicious" | "Likely Safe" =
        score >= 70 ? "High Risk" : score >= 35 ? "Suspicious" : "Likely Safe";

      setCustomResult({
        id: "custom",
        label: "Custom Input",
        type: "text",
        content: customText,
        riskLevel,
        score: Math.min(score, 98),
        flags,
        explanation:
          score >= 70
            ? "Multiple red flags detected in natural language structure. Exercise caution before clicking or responding."
            : score >= 35
            ? "Contains elements that warrant verification through known secondary channels."
            : "Heuristic evaluation indicates low risk based on text patterns.",
        advice:
          score >= 35
            ? "Confirm the identity of the sender independently without using contact details inside the message."
            : "Always maintain general digital awareness when interacting with unfamiliar senders."
      });
      setAnalyzing(false);
    }, 450);
  };

  const activeResult = customResult || selectedSample;

  return (
    <div className="space-y-6 text-[#151515]">
      <div className="border border-[rgba(21,21,21,0.12)] rounded-lg p-4 bg-white">
        <div className="flex items-center justify-between gap-4 mb-3">
          <span className="text-xs uppercase tracking-wider font-mono text-[#686868]">
            Interactive Concept Demo · Simulated Threat Inspection
          </span>
          <span className="text-xs font-mono px-2 py-0.5 bg-[#F0EDE6] rounded text-[#4A4A4A]">
            Heuristic Rule Engine v0.3
          </span>
        </div>

        {/* Preset selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs text-[#686868] self-center mr-1">Preset Samples:</span>
          {PRESET_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => {
                setSelectedSample(sample);
                setCustomResult(null);
              }}
              className={`text-xs px-3 py-1.5 rounded transition-colors font-medium ${
                selectedSample.id === sample.id && !customResult
                  ? "bg-[#151515] text-white"
                  : "bg-[#F7F5F0] text-[#4A4A4A] hover:bg-[#EAE6DE]"
              }`}
            >
              {sample.label}
            </button>
          ))}
        </div>

        {/* Custom text tester */}
        <div className="space-y-2">
          <label htmlFor="trustlens-input" className="block text-xs font-medium text-[#4A4A4A]">
            Or enter custom message to evaluate:
          </label>
          <div className="flex gap-2">
            <input
              id="trustlens-input"
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="e.g., Click here to claim your free reward..."
              className="flex-1 text-xs px-3 py-2 border border-[rgba(21,21,21,0.18)] rounded bg-[#FAF9F5] focus:outline-none focus:border-[#4263EB]"
            />
            <button
              onClick={runCustomAnalysis}
              disabled={analyzing || !customText.trim()}
              className="text-xs px-4 py-2 bg-[#151515] text-white rounded hover:bg-[#2A2A2A] disabled:opacity-50 transition-colors flex items-center gap-1.5 font-medium whitespace-nowrap"
            >
              {analyzing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
              Analyze
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Output */}
      <div className="border border-[rgba(21,21,21,0.12)] rounded-lg p-5 bg-[#FAF9F5] space-y-4">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[rgba(21,21,21,0.08)]">
          <div>
            <span className="text-xs font-mono text-[#686868] block mb-1">EVALUATED CONTENT</span>
            <p className="text-xs font-mono bg-white p-2.5 rounded border border-[rgba(21,21,21,0.10)] text-[#2A2A2A] max-w-xl">
              "{activeResult.content}"
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-mono text-[#686868] block mb-1">THREAT SCORE</span>
            <div className="flex items-center gap-1.5 justify-end">
              {activeResult.riskLevel === "High Risk" ? (
                <ShieldAlert className="w-5 h-5 text-red-600" />
              ) : activeResult.riskLevel === "Suspicious" ? (
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              )}
              <span className="text-lg font-bold font-mono tabular-nums">
                {activeResult.score}/100
              </span>
            </div>
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                activeResult.riskLevel === "High Risk"
                  ? "text-red-700"
                  : activeResult.riskLevel === "Suspicious"
                  ? "text-amber-700"
                  : "text-emerald-700"
              }`}
            >
              {activeResult.riskLevel}
            </span>
          </div>
        </div>

        {/* Red flags */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4A4A] block mb-2">
            Identified Heuristics & Signals
          </span>
          <ul className="space-y-1.5">
            {activeResult.flags.map((flag, idx) => (
              <li key={idx} className="text-xs flex items-start gap-2 text-[#2A2A2A]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4263EB] shrink-0 mt-0.5" />
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Explainability & Advice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[rgba(21,21,21,0.08)]">
          <div className="p-3 bg-white rounded border border-[rgba(21,21,21,0.06)]">
            <span className="text-xs font-mono uppercase text-[#686868] block mb-1">Explainability</span>
            <p className="text-xs text-[#4A4A4A] leading-relaxed">{activeResult.explanation}</p>
          </div>
          <div className="p-3 bg-white rounded border border-[rgba(21,21,21,0.06)]">
            <span className="text-xs font-mono uppercase text-[#686868] block mb-1">Actionable Advice</span>
            <p className="text-xs text-[#4A4A4A] leading-relaxed">{activeResult.advice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
