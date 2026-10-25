import React, { useState } from "react";
import { Mic, Send, DollarSign, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

interface Transaction {
  id: string;
  rawText: string;
  category: "Sale" | "Expense" | "Inventory";
  item: string;
  amount: number;
  paymentMode: "Cash" | "UPI / Digital" | "Credit / Due";
  timestamp: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    rawText: "Sold 5 bags of grain for ₹1400 cash",
    category: "Sale",
    item: "5 bags grain",
    amount: 1400,
    paymentMode: "Cash",
    timestamp: "10:15 AM"
  },
  {
    id: "tx-2",
    rawText: "Paid ₹350 for shop electricity bill via UPI",
    category: "Expense",
    item: "Electricity bill",
    amount: 350,
    paymentMode: "UPI / Digital",
    timestamp: "11:42 AM"
  },
  {
    id: "tx-3",
    rawText: "Purchased packaging cartons for ₹600 cash",
    category: "Inventory",
    item: "Packaging cartons",
    amount: 600,
    paymentMode: "Cash",
    timestamp: "02:10 PM"
  }
];

const PRESET_VOICE_SNIPPETS = [
  "Sold 8 notebooks for ₹400 cash",
  "Received ₹950 UPI from Kumar for print job",
  "Paid ₹220 for delivery auto fare",
  "Purchased 10 ball pens packet for ₹180 cash"
];

export const BusinessSim: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [inputText, setInputText] = useState("");
  const [isSimulatingAudio, setIsSimulatingAudio] = useState(false);

  const parseAndAdd = (text: string) => {
    if (!text.trim()) return;

    const lower = text.toLowerCase();
    const isExpense =
      lower.includes("paid") ||
      lower.includes("bill") ||
      lower.includes("fare") ||
      lower.includes("bought");
    const isInventory = lower.includes("purchased") || lower.includes("stock");
    const category: "Sale" | "Expense" | "Inventory" = isExpense
      ? "Expense"
      : isInventory
      ? "Inventory"
      : "Sale";

    // Extract amount
    const numbers = text.match(/\d+/g);
    let amount = 250;
    if (numbers && numbers.length > 0) {
      // Find highest number if multiple or last number
      amount = parseInt(numbers[numbers.length - 1], 10);
    }

    const paymentMode: "Cash" | "UPI / Digital" | "Credit / Due" = lower.includes("upi")
      ? "UPI / Digital"
      : lower.includes("credit") || lower.includes("due")
      ? "Credit / Due"
      : "Cash";

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      rawText: text,
      category,
      item: text.split("for")[0]?.trim() || "Item entry",
      amount,
      paymentMode,
      timestamp: "Just now"
    };

    setTransactions((prev) => [newTx, ...prev]);
    setInputText("");
  };

  const simulateVoiceInput = (snippet: string) => {
    setIsSimulatingAudio(true);
    setInputText("");
    let charIndex = 0;
    const interval = setInterval(() => {
      charIndex++;
      setInputText(snippet.slice(0, charIndex));
      if (charIndex >= snippet.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulatingAudio(false);
          parseAndAdd(snippet);
        }, 300);
      }
    }, 28);
  };

  const totalSales = transactions
    .filter((t) => t.category === "Sale")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.category === "Expense" || t.category === "Inventory")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalSales - totalExpenses;

  return (
    <div className="space-y-6 text-[#151515]">
      <div className="border border-[rgba(21,21,21,0.12)] rounded-lg p-4 bg-white">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="text-xs uppercase tracking-wider font-mono text-[#686868]">
            Interactive Concept Demo · Conversational Bookkeeping
          </span>
          <span className="text-xs font-mono px-2 py-0.5 bg-[#F0EDE6] rounded text-[#4A4A4A]">
            Natural Language Ledger
          </span>
        </div>
        <p className="text-xs text-[#686868]">
          Test conversational entry by typing in plain phrasing or tapping simulated voice snippets below.
        </p>
      </div>

      {/* Voice Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-[#686868] flex items-center gap-1 font-medium">
          <Mic className="w-3.5 h-3.5 text-[#4263EB]" /> Simulate Speech:
        </span>
        {PRESET_VOICE_SNIPPETS.map((snippet, idx) => (
          <button
            key={idx}
            type="button"
            disabled={isSimulatingAudio}
            onClick={() => simulateVoiceInput(snippet)}
            className="text-xs px-2.5 py-1 bg-[#FAF9F5] border border-[rgba(21,21,21,0.12)] rounded hover:bg-[#F0EDE6] text-[#2A2A2A] transition-colors disabled:opacity-50"
          >
            "{snippet}"
          </button>
        ))}
      </div>

      {/* Input row */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          parseAndAdd(inputText);
        }}
        className="flex gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g., Sold 3 shirts for ₹1200 via UPI..."
            className="w-full text-xs px-3 py-2.5 border border-[rgba(21,21,21,0.18)] rounded bg-white focus:outline-none focus:border-[#4263EB]"
          />
          {isSimulatingAudio && (
            <span className="absolute right-3 top-2.5 text-xs text-[#4263EB] font-mono animate-pulse">
              [transcribing audio...]
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={!inputText.trim() || isSimulatingAudio}
          className="text-xs px-4 py-2.5 bg-[#151515] text-white rounded font-medium hover:bg-[#2A2A2A] disabled:opacity-40 transition-colors flex items-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Record</span>
        </button>
      </form>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-white rounded border border-[rgba(21,21,21,0.08)]">
          <span className="text-xs text-[#686868] block mb-0.5">Total Sales</span>
          <span className="text-base font-bold font-mono text-emerald-700 tabular-nums">
            ₹{totalSales.toLocaleString()}
          </span>
        </div>
        <div className="p-3 bg-white rounded border border-[rgba(21,21,21,0.08)]">
          <span className="text-xs text-[#686868] block mb-0.5">Expenses/Stock</span>
          <span className="text-base font-bold font-mono text-red-600 tabular-nums">
            ₹{totalExpenses.toLocaleString()}
          </span>
        </div>
        <div className="p-3 bg-white rounded border border-[rgba(21,21,21,0.08)]">
          <span className="text-xs text-[#686868] block mb-0.5">Net Daily Cash</span>
          <span className="text-base font-bold font-mono text-[#151515] tabular-nums">
            ₹{netBalance.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Parsed Ledger List */}
      <div className="border border-[rgba(21,21,21,0.10)] rounded-lg bg-[#FAF9F5] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[rgba(21,21,21,0.08)] bg-[#F5F2EB] flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4A4A]">
            Parsed Ledger Stream
          </span>
          <span className="text-xs text-[#686868]">{transactions.length} entries</span>
        </div>

        <div className="divide-y divide-[rgba(21,21,21,0.06)] max-h-56 overflow-y-auto">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-3 flex items-center justify-between text-xs gap-3">
              <div>
                <span className="font-medium text-[#151515] block">{tx.rawText}</span>
                <span className="text-xs text-[#686868]">
                  {tx.category} · {tx.paymentMode} · {tx.timestamp}
                </span>
              </div>
              <div className="text-right shrink-0">
                <span
                  className={`font-mono font-bold ${
                    tx.category === "Sale" ? "text-emerald-700" : "text-red-600"
                  }`}
                >
                  {tx.category === "Sale" ? "+₹" : "-₹"}
                  {tx.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
