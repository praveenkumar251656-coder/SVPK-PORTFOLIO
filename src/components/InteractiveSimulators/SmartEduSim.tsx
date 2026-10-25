import React, { useState } from "react";
import { BookOpen, CheckCircle, HelpCircle, ArrowRight } from "lucide-react";

interface Question {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    topic: "Algorithmic Complexity",
    question: "What is the average time complexity of searching an element in a balanced Binary Search Tree (BST)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctIndex: 1,
    explanation: "Because a balanced BST halves the search space at each node comparison, the average height is log₂(n), yielding O(log n)."
  },
  {
    id: 2,
    topic: "Data Structure Mechanics",
    question: "Which traversal order yields sorted values when executed on a valid Binary Search Tree?",
    options: ["Pre-order (Root, Left, Right)", "In-order (Left, Root, Right)", "Post-order (Left, Right, Root)", "Level-order (BFS)"],
    correctIndex: 1,
    explanation: "In-order traversal visits the left subtree (smaller values), then the current node, then the right subtree (larger values), naturally yielding sorted order."
  },
  {
    id: 3,
    topic: "Memory & Cache Locality",
    question: "Why do sequential Array lookups generally achieve faster CPU cache utilization than Linked List traversals of equal length?",
    options: [
      "Arrays store elements in contiguous memory blocks",
      "Linked lists require recursive stack memory",
      "Pointers consume zero CPU cycles",
      "Arrays automatically compile to GPU memory"
    ],
    correctIndex: 0,
    explanation: "Arrays occupy contiguous memory addresses, enabling the CPU's spatial prefetcher to load adjacent items directly into L1/L2 cache lines."
  }
];

export const SmartEduSim: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId: number, optionIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateMastery = () => {
    let correct = 0;
    QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / QUESTIONS.length) * 100);
  };

  const masteryScore = calculateMastery();

  return (
    <div className="space-y-6 text-[#151515]">
      <div className="border border-[rgba(21,21,21,0.12)] rounded-lg p-4 bg-white">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="text-xs uppercase tracking-wider font-mono text-[#686868]">
            Interactive Concept Demo · Adaptive Diagnostic Assessment
          </span>
          <span className="text-xs font-mono px-2 py-0.5 bg-[#F0EDE6] rounded text-[#4A4A4A]">
            CS Fundamentals: Data Structures
          </span>
        </div>
        <p className="text-xs text-[#686868]">
          Answer the 3 diagnostic questions below to generate an automated knowledge-gap analysis and targeted study path.
        </p>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {QUESTIONS.map((q) => {
          const selected = answers[q.id];
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className="border border-[rgba(21,21,21,0.10)] rounded-lg p-4 bg-[#FAF9F5] space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase text-[#4263EB] font-medium">
                  Concept {q.id} · {q.topic}
                </span>
                {submitted && (
                  <span
                    className={`text-xs font-semibold ${
                      isCorrect ? "text-emerald-700" : "text-amber-700"
                    }`}
                  >
                    {isCorrect ? "Mastered" : "Gap Identified"}
                  </span>
                )}
              </div>

              <p className="text-xs font-semibold text-[#151515] leading-snug">{q.question}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  let btnStyle = "bg-white border-[rgba(21,21,21,0.12)] text-[#2A2A2A] hover:bg-[#F0EDE6]";
                  if (selected === optIdx) {
                    btnStyle = "bg-[#151515] text-white border-[#151515]";
                  }
                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = "bg-emerald-600 text-white border-emerald-600 font-medium";
                    } else if (selected === optIdx && !isCorrect) {
                      btnStyle = "bg-amber-600 text-white border-amber-600";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`text-xs p-2.5 rounded border text-left transition-colors flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {submitted && optIdx === q.correctIndex && (
                        <CheckCircle className="w-3.5 h-3.5 shrink-0 ml-1 text-white" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="pt-2 border-t border-[rgba(21,21,21,0.06)] text-xs text-[#555] leading-relaxed">
                  <span className="font-semibold text-[#151515]">Concept Note: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submission CTA or Diagnostic Analysis Output */}
      {!submitted ? (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(answers).length < QUESTIONS.length}
            className="text-xs px-5 py-2.5 bg-[#151515] text-white rounded font-medium hover:bg-[#2A2A2A] disabled:opacity-40 transition-colors"
          >
            Generate Diagnostic Assessment
          </button>
        </div>
      ) : (
        <div className="border border-[rgba(21,21,21,0.12)] rounded-lg p-5 bg-white space-y-4">
          <div className="flex items-center justify-between gap-4 pb-3 border-b border-[rgba(21,21,21,0.08)]">
            <div>
              <span className="text-xs font-mono uppercase text-[#686868] block">DIAGNOSTIC RESULT</span>
              <h4 className="text-sm font-bold text-[#151515]">
                {masteryScore === 100
                  ? "Strong Foundation Across Evaluated Topics"
                  : masteryScore >= 66
                  ? "Solid Foundation with Specific Conceptual Gaps"
                  : "Targeted Foundation Reinforcement Recommended"}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-[#686868] block">ESTIMATED MASTERY</span>
              <span className="text-xl font-bold font-mono text-[#4263EB] tabular-nums">
                {masteryScore}%
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4A4A] block mb-2">
              Recommended Study Sequence
            </span>
            <div className="space-y-2">
              <div className="p-2.5 bg-[#FAF9F5] rounded border border-[rgba(21,21,21,0.08)] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#4263EB]" />
                  <span>Module 1: Binary Search Tree Invariants & Recursive In-Order Traversals</span>
                </div>
                <span className="text-xs font-mono text-[#686868]">Estimated 25 min</span>
              </div>
              <div className="p-2.5 bg-[#FAF9F5] rounded border border-[rgba(21,21,21,0.08)] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#4263EB]" />
                  <span>Module 2: CPU Cache Lines, Spatial Locality & Memory Layouts in C/Python</span>
                </div>
                <span className="text-xs font-mono text-[#686868]">Estimated 35 min</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
              }}
              className="text-xs text-[#4263EB] hover:underline font-medium"
            >
              Retake Diagnostic Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
