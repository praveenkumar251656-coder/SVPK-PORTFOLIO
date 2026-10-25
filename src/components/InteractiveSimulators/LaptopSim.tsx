import React, { useState } from "react";
import { Laptop, Cpu, Check, Layers, Battery } from "lucide-react";

interface LaptopModel {
  id: string;
  name: string;
  category: "AI/ML Workstation" | "Balanced Developer" | "Budget Engineering";
  specs: {
    cpu: string;
    ram: string;
    gpu: string;
    storage: string;
    battery: string;
  };
  approxPriceInr: number;
  bestFor: string;
  rationale: string;
}

const LAPTOPS_CATALOG: LaptopModel[] = [
  {
    id: "laptop-1",
    name: "MacBook Air M3 (16GB RAM)",
    category: "Balanced Developer",
    specs: {
      cpu: "Apple M3 (8-core CPU)",
      ram: "16GB Unified Memory",
      gpu: "10-core Neural Engine",
      storage: "512GB NVMe SSD",
      battery: "Up to 18 hrs"
    },
    approxPriceInr: 104900,
    bestFor: "Full-Stack Development, Mobile App Dev, Long Battery Life",
    rationale: "Exceptional unified memory bandwidth and battery efficiency. Great for Unix terminal workflows, containerized development, and lightweight local LLM inference via Metal."
  },
  {
    id: "laptop-2",
    name: "Lenovo Legion Pro 5 (RTX 4060)",
    category: "AI/ML Workstation",
    specs: {
      cpu: "AMD Ryzen 7 7745HX (8C/16T)",
      ram: "32GB DDR5 5200MHz",
      gpu: "NVIDIA RTX 4060 8GB GDDR6 (140W)",
      storage: "1TB PCIe Gen 4",
      battery: "4-5 hrs (Heavy load)"
    },
    approxPriceInr: 119990,
    bestFor: "Local AI/ML Model Training, CUDA Acceleration, PyTorch/TensorFlow",
    rationale: "Dedicated 8GB VRAM with CUDA support is critical for running quantized local models (7B/8B params) and GPU-accelerated PyTorch workflows."
  },
  {
    id: "laptop-3",
    name: "ASUS Vivobook 16X (RTX 3050)",
    category: "Budget Engineering",
    specs: {
      cpu: "Intel Core i5-12450H",
      ram: "16GB DDR4 (Upgradable)",
      gpu: "NVIDIA RTX 3050 4GB",
      storage: "512GB NVMe SSD",
      battery: "5-6 hrs"
    },
    approxPriceInr: 58990,
    bestFor: "CS Engineering Coursework, Web Dev, Intro to Machine Learning",
    rationale: "Best entry-point value for engineering students. Provides basic discrete CUDA cores for hands-on deep learning assignments while staying budget-friendly."
  },
  {
    id: "laptop-4",
    name: "ThinkPad E14 Gen 5 (Ryzen 7)",
    category: "Balanced Developer",
    specs: {
      cpu: "AMD Ryzen 7 7730U",
      ram: "16GB RAM",
      gpu: "Radeon Graphics (Integrated)",
      storage: "512GB SSD",
      battery: "Up to 10 hrs"
    },
    approxPriceInr: 64990,
    bestFor: "Linux Dual-Boot, DSA Practice, Competitive Programming, Backend APIs",
    rationale: "Legendary keyboard durability and excellent Linux kernel compatibility. Ideal for students prioritizing typing ergonomics, compile speed, and battery."
  }
];

export const LaptopSim: React.FC = () => {
  const [workflow, setWorkflow] = useState<"aiml" | "webdev" | "student">("aiml");
  const [budgetLimit, setBudgetLimit] = useState<number>(125000);

  const filteredLaptops = LAPTOPS_CATALOG.filter(
    (laptop) => laptop.approxPriceInr <= budgetLimit + 5000
  ).sort((a, b) => {
    if (workflow === "aiml") {
      // Prioritize dedicated GPU
      const aGpu = a.specs.gpu.includes("RTX") ? 1 : 0;
      const bGpu = b.specs.gpu.includes("RTX") ? 1 : 0;
      return bGpu - aGpu;
    }
    return 0;
  });

  return (
    <div className="space-y-6 text-[#151515]">
      <div className="border border-[rgba(21,21,21,0.12)] rounded-lg p-4 bg-white">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="text-xs uppercase tracking-wider font-mono text-[#686868]">
            Interactive Concept Demo · Specification Decision Matrix
          </span>
          <span className="text-xs font-mono px-2 py-0.5 bg-[#F0EDE6] rounded text-[#4A4A4A]">
            Curated Student & Dev Hardware
          </span>
        </div>
        <p className="text-xs text-[#686868]">
          Select your workflow requirement and budget constraint to observe multi-criteria matching in action.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#FAF9F5] border border-[rgba(21,21,21,0.10)] rounded-lg">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4A4A] block mb-2">
            Primary Target Workload
          </span>
          <div className="flex flex-col gap-2">
            {[
              { id: "aiml", label: "AI/ML & Local Models (CUDA, PyTorch, Ollama)" },
              { id: "webdev", label: "Full-Stack Web Dev & Mobile (Docker, VS Code)" },
              { id: "student", label: "CS Fundamentals & Daily Coursework (DSA, Linux)" }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setWorkflow(item.id as any)}
                className={`text-xs px-3 py-2 rounded text-left transition-colors border ${
                  workflow === item.id
                    ? "bg-[#151515] text-white border-[#151515]"
                    : "bg-white text-[#2A2A2A] border-[rgba(21,21,21,0.12)] hover:bg-[#F0EDE6]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4A4A]">
              Max Budget Ceiling
            </span>
            <span className="text-xs font-mono font-bold text-[#4263EB]">
              ₹{budgetLimit.toLocaleString()}
            </span>
          </div>

          <input
            type="range"
            min={50000}
            max={130000}
            step={5000}
            value={budgetLimit}
            onChange={(e) => setBudgetLimit(Number(e.target.value))}
            className="w-full accent-[#4263EB] cursor-pointer"
          />

          <div className="flex justify-between text-xs text-[#686868] font-mono mt-1">
            <span>₹50,000</span>
            <span>₹90,000</span>
            <span>₹1,30,000+</span>
          </div>

          <div className="mt-4 p-3 bg-white rounded border border-[rgba(21,21,21,0.08)] text-xs text-[#4A4A4A]">
            <span className="font-semibold text-[#151515] block mb-0.5">
              {workflow === "aiml"
                ? "Key Spec Focus for AI/ML:"
                : workflow === "webdev"
                ? "Key Spec Focus for Dev:"
                : "Key Spec Focus for Students:"}
            </span>
            {workflow === "aiml"
              ? "Minimum 16GB RAM + dedicated NVIDIA GPU (>= 4GB VRAM) for local CUDA tensor training."
              : workflow === "webdev"
              ? "High RAM (16GB+) for Docker daemon containers and high single-core CPU speeds."
              : "Great keyboard ergonomics, dependable battery life (8+ hrs), and reliable thermal design."}
          </div>
        </div>
      </div>

      {/* Matched Laptops Catalog */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4A4A] block">
          Matching Hardware Configurations ({filteredLaptops.length} Results)
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredLaptops.map((laptop) => (
            <div
              key={laptop.id}
              className="p-4 bg-white border border-[rgba(21,21,21,0.12)] rounded-lg space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-mono text-[#4263EB] block">{laptop.category}</span>
                  <h4 className="text-xs font-bold text-[#151515]">{laptop.name}</h4>
                </div>
                <span className="text-xs font-mono font-bold text-[#151515]">
                  ₹{laptop.approxPriceInr.toLocaleString()}
                </span>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-[#4A4A4A] bg-[#FAF9F5] p-2 rounded">
                <div>
                  <span className="text-[#888] block text-[10px] uppercase">CPU</span>
                  <span className="truncate block font-mono">{laptop.specs.cpu}</span>
                </div>
                <div>
                  <span className="text-[#888] block text-[10px] uppercase">Memory</span>
                  <span className="truncate block font-mono">{laptop.specs.ram}</span>
                </div>
                <div>
                  <span className="text-[#888] block text-[10px] uppercase">Graphics</span>
                  <span className="truncate block font-mono">{laptop.specs.gpu}</span>
                </div>
                <div>
                  <span className="text-[#888] block text-[10px] uppercase">Battery</span>
                  <span className="truncate block font-mono">{laptop.specs.battery}</span>
                </div>
              </div>

              <div className="text-xs text-[#4A4A4A] leading-relaxed pt-1 border-t border-[rgba(21,21,21,0.06)]">
                <span className="font-semibold text-[#151515]">Decision Rationale: </span>
                {laptop.rationale}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
