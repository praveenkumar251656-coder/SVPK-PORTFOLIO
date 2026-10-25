import React from "react";
import { Shield, Brain, BookOpen, MessageSquare, Laptop, CheckCircle2, AlertCircle } from "lucide-react";

interface ProjectVisualPreviewProps {
  demoType: "trustlens" | "smart-edu" | "business" | "laptop";
  title: string;
}

export const ProjectVisualPreview: React.FC<ProjectVisualPreviewProps> = ({
  demoType,
  title
}) => {
  if (demoType === "trustlens") {
    return (
      <div className="relative w-full h-full min-h-[220px] bg-[#111113] rounded-lg p-5 flex flex-col justify-between overflow-hidden border border-[#222226]">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#4263EB 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#4263EB]" />
            <span className="text-xs font-mono tracking-wider text-[#A0A0A5]">
              TRUSTLENS // HEURISTIC SCANNER
            </span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-800/50">
            FLAGGED: URGENCY SPOOF
          </span>
        </div>

        {/* Waveform graphic */}
        <div className="relative z-10 my-auto py-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#777780] mb-1">
            <span>SYNTHETIC PROBABILITY</span>
            <span className="text-red-400 font-bold">88.4%</span>
          </div>
          <div className="h-2 w-full bg-[#1C1C22] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 w-[88%]" />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 text-[10px] font-mono">
            <div className="bg-[#1A1A22] p-2 rounded border border-[#2A2A35]">
              <span className="text-[#888] block">DOMAIN</span>
              <span className="text-red-300">MISMATCH</span>
            </div>
            <div className="bg-[#1A1A22] p-2 rounded border border-[#2A2A35]">
              <span className="text-[#888] block">COERCION</span>
              <span className="text-amber-300">HIGH (2 HR)</span>
            </div>
            <div className="bg-[#1A1A22] p-2 rounded border border-[#2A2A35]">
              <span className="text-[#888] block">CREDENTIALS</span>
              <span className="text-red-300">SOLICITED</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px] text-[#8E8E98] font-mono border-t border-[#222228] pt-2">
          <span>INPUT: SMS / WEBHOOK</span>
          <span>STATUS: ACTIVE PROTOTYPE</span>
        </div>
      </div>
    );
  }

  if (demoType === "smart-edu") {
    return (
      <div className="relative w-full h-full min-h-[220px] bg-[#FAF8F5] rounded-lg p-5 flex flex-col justify-between overflow-hidden border border-[rgba(21,21,21,0.08)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-[#4263EB]" />
            <span className="text-xs font-mono tracking-wider text-[#555]">
              SMART EDUCATION // KNOWLEDGE GRAPH
            </span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
            ADAPTIVE PREREQUISITES
          </span>
        </div>

        {/* Node graph representation */}
        <div className="my-auto py-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 bg-white p-2.5 rounded border border-[rgba(21,21,21,0.08)] text-center">
              <span className="text-[10px] uppercase font-mono text-emerald-700 block font-semibold">
                ✓ Mastered
              </span>
              <span className="text-xs font-bold text-[#151515]">Arrays & Big-O</span>
            </div>

            <div className="text-[#4263EB] font-bold text-sm">→</div>

            <div className="flex-1 bg-white p-2.5 rounded border-2 border-amber-500/50 text-center shadow-xs">
              <span className="text-[10px] uppercase font-mono text-amber-700 block font-semibold">
                ▲ Gap Detected
              </span>
              <span className="text-xs font-bold text-[#151515]">BST In-Order</span>
            </div>

            <div className="text-[#888] font-bold text-sm">→</div>

            <div className="flex-1 bg-[#F0EDE6] p-2.5 rounded border border-[rgba(21,21,21,0.06)] text-center opacity-70">
              <span className="text-[10px] uppercase font-mono text-[#888] block">Locked</span>
              <span className="text-xs font-medium text-[#666]">AVL Rotations</span>
            </div>
          </div>

          <div className="mt-3 p-2 bg-white rounded border border-[rgba(21,21,21,0.06)] text-[11px] text-[#4A4A4A] flex items-center justify-between">
            <span>Prescribed: Targeted 20-min Tree Invariant Walkthrough</span>
            <span className="text-[#4263EB] font-medium font-mono">STEP 1/3</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#666] font-mono border-t border-[rgba(21,21,21,0.06)] pt-2">
          <span>CURRICULUM: CS FUNDAMENTALS</span>
          <span>DIAGNOSTIC ENGINE</span>
        </div>
      </div>
    );
  }

  if (demoType === "business") {
    return (
      <div className="relative w-full h-full min-h-[220px] bg-[#F7F9F7] rounded-lg p-5 flex flex-col justify-between overflow-hidden border border-emerald-900/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-mono tracking-wider text-[#444]">
              VOICE LEDGER // NATURAL LANGUAGE
            </span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
            AUTO-PARSED
          </span>
        </div>

        {/* Chat / Ledger entry mockup */}
        <div className="my-auto space-y-2 py-2">
          <div className="bg-white p-2.5 rounded-lg border border-[rgba(21,21,21,0.08)] shadow-2xs max-w-sm">
            <span className="text-[10px] text-[#888] block mb-0.5">Voice Transcribed Audio:</span>
            <p className="text-xs text-[#151515] font-medium">
              "Sold 5 bags of grain for ₹1,400 cash"
            </p>
          </div>

          <div className="ml-auto bg-emerald-700 text-white p-2.5 rounded-lg text-xs max-w-xs shadow-2xs">
            <div className="flex items-center justify-between text-[10px] opacity-90 mb-0.5">
              <span>RECORDED TO DAILY LEDGER</span>
              <span className="font-mono">10:15 AM</span>
            </div>
            <div className="flex items-center justify-between font-mono font-bold">
              <span>5 bags grain (Sale)</span>
              <span>+₹1,400 Cash</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-emerald-900/70 font-mono border-t border-emerald-900/10 pt-2">
          <span>TODAY'S CASH BALANCE: ₹3,450</span>
          <span>NO ACCOUNTING OVERHEAD</span>
        </div>
      </div>
    );
  }

  // Laptop Recommender
  return (
    <div className="relative w-full h-full min-h-[220px] bg-[#141416] rounded-lg p-5 flex flex-col justify-between overflow-hidden border border-[#26262B]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Laptop className="w-4 h-4 text-[#4263EB]" />
          <span className="text-xs font-mono tracking-wider text-[#A0A0A5]">
            HARDWARE RECOMMENDER // MATRIX
          </span>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-950/70 text-indigo-300 border border-indigo-800/50">
          AI/ML WORKLOAD MATCH
        </span>
      </div>

      <div className="my-auto py-2">
        <div className="bg-[#1D1D24] p-3 rounded border border-[#2F2F3B] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white font-bold">Lenovo Legion Pro 5 (RTX 4060)</span>
            <span className="text-emerald-400 font-mono font-bold">₹1,19,990</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono text-[#AAA]">
            <div className="bg-[#15151A] p-1.5 rounded">
              <span className="text-[#666] block">CUDA VRAM</span>
              <span className="text-white">8GB GDDR6</span>
            </div>
            <div className="bg-[#15151A] p-1.5 rounded">
              <span className="text-[#666] block">MEMORY</span>
              <span className="text-white">32GB DDR5</span>
            </div>
            <div className="bg-[#15151A] p-1.5 rounded">
              <span className="text-[#666] block">LOCAL LLM</span>
              <span className="text-emerald-300">7B/8B OK</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#8E8E98] font-mono border-t border-[#26262B] pt-2">
        <span>CRITERIA: LOCAL PYTORCH & CUDA</span>
        <span>EXPLAINABLE SPECS</span>
      </div>
    </div>
  );
};
