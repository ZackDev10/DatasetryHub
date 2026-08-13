"use client";

import { useState } from "react";
import {
  Search,
  FileDown,
  Play,
  Copy,
  Trash2,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  BookOpen,
  Settings,
  Send,
  FileCode,
  Maximize2,
  LayoutTemplate,
  FolderTree,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Static mock data (no backend wiring yet)
// ---------------------------------------------------------------------------

const failingQuery = `SELECT user_name, total_spent
FROM transactions
WHERE date > '2023-01-01'
GROUP BY user_name
HAVING sum(total_spent) > 1000;`;

const passingQuery = `SELECT p.product_name, SUM(o.quantity) as total_units
FROM products p
JOIN orders o ON p.id = o.product_id
WHERE o.order_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY p.product_name
ORDER BY total_units DESC
LIMIT 5;`;

const resultRows = [
  { product_name: "Premium Dataset A", total_units: 450 },
  { product_name: "Analysis Toolkit", total_units: 320 },
  { product_name: "Cloud Credits", total_units: 210 },
];

const chatMessages = [
  {
    role: "ai" as const,
    time: "10:30 AM",
    text: "Hello! I'm your AI Data Tutor. I've analyzed your current SQL query. Would you like me to explain why your `JOIN` might be returning more rows than expected?",
  },
  {
    role: "user" as const,
    time: "10:31 AM",
    text: "Yes, please. I thought I was doing a standard INNER JOIN on customer_id.",
  },
  {
    role: "ai" as const,
    time: "10:32 AM",
    text: "Looking at your schema, `customer_id` is not unique in the `orders` table. When you join on a non-unique key, you get a Cartesian product for those specific matches. Try using `DISTINCT` or checking for duplicates in your source.",
    snippet: `SELECT DISTINCT o.customer_id, o.order_id
FROM orders o
JOIN customers c ON o.customer_id = c.id;`,
  },
];

// ---------------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------------

function SqlCode({ code }: { code: string }) {
  // Lightweight "syntax highlighting" via keyword matching — purely cosmetic.
  const keywords =
    /\b(SELECT|FROM|WHERE|GROUP BY|HAVING|JOIN|ON|ORDER BY|LIMIT|AND|OR|AS|SUM|DISTINCT|INTERVAL|CURRENT_DATE|DESC|ASC)\b/g;

  return (
    <pre className="font-mono text-[13px] leading-6 text-slate-300 whitespace-pre-wrap break-words">
      {code.split("\n").map((line, i) => {
        const parts = line.split(keywords);
        return (
          <div key={i}>
            {parts.map((part, j) =>
              keywords.test(part) ? (
                <span key={j} className="text-indigo-400 font-semibold">
                  {part}
                </span>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </div>
        );
      })}
    </pre>
  );
}

function IconButton({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      className="p-1.5 rounded-md text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-colors"
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function QueryDebuggerPage() {
  const [tab, setTab] = useState<"chat" | "concepts">("chat");
  const [draftQuery, setDraftQuery] = useState("");
  const [chatDraft, setChatDraft] = useState("");

  return (
    <div className="flex h-full flex-col bg-slate-50 text-slate-900">
      {/* ---------------------------------------------------------------- */}
      {/* Debugger sub-header                                              */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-900">
            Query Debugger
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium tracking-wide text-slate-500">
            ACTIVE SESSION: dataset_churn_v2
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
            <Search className="h-3.5 w-3.5" />
            Find
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
            <FileDown className="h-3.5 w-3.5" />
            Export
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-indigo-600">
            <Play className="h-3.5 w-3.5 fill-white" />
            Run All
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Split pane body                                                  */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex flex-1 min-h-0">
        {/* =============================== LEFT: SQL Execution =========== */}
        <main className="flex-1 min-w-0 flex flex-col border-r border-slate-200">
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="mx-auto max-w-3xl">
              {/* Intro */}
              <div className="flex flex-col items-center text-center mb-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
                  <Sparkles className="h-6 w-6 text-indigo-500" />
                </div>
                <h1 className="text-xl font-semibold text-slate-900">
                  Intelligent SQL Debugging
                </h1>
                <p className="mt-1 max-w-md text-sm text-slate-500">
                  Execute your queries below. Our AI Tutor will automatically
                  detect syntax errors and logical pitfalls to help you learn
                  as you debug.
                </p>
              </div>

              {/* ---- Query block #1: failing ---- */}
              <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-900">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wide text-slate-400">
                    <AlertCircle className="h-3.5 w-3.5 text-red-400" />
                    SQL EXECUTION
                  </div>
                  <div className="flex items-center gap-1">
                    <IconButton icon={Copy} label="Copy query" />
                    <IconButton icon={Trash2} label="Delete query" />
                  </div>
                </div>
                <div className="px-4 py-4">
                  <SqlCode code={failingQuery} />
                </div>

                {/* Error message */}
                <div className="border-t border-slate-800 bg-red-950/40 px-4 py-3">
                  <div className="flex items-start gap-2 text-[11px] font-semibold tracking-wide text-red-400">
                    <span className="text-red-400">&gt;_</span>
                    Error Message:
                  </div>
                  <p className="mt-1 pl-4 text-[13px] italic text-red-300">
                    "Column 'transactions.total_spent' must appear in the
                    GROUP BY clause or be used in an aggregate function."
                  </p>

                  {/* Tutor suggestion */}
                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-indigo-950/60 border border-indigo-900/60 px-3 py-2.5">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-400" />
                    <p className="text-[13px] text-indigo-200">
                      <span className="font-semibold">Tutor Suggestion:</span>{" "}
                      Wrap 'total_spent' in an aggregate function like SUM()
                      in your SELECT statement.
                    </p>
                  </div>
                </div>
              </div>

              {/* ---- Query block #2: passing ---- */}
              <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-900">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wide text-slate-400">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    SQL EXECUTION
                  </div>
                  <div className="flex items-center gap-1">
                    <IconButton icon={Copy} label="Copy query" />
                    <IconButton icon={Trash2} label="Delete query" />
                  </div>
                </div>
                <div className="px-4 py-4">
                  <SqlCode code={passingQuery} />
                </div>

                {/* Execution result */}
                <div className="border-t border-slate-800 bg-white px-4 py-4">
                  <p className="mb-2 text-[11px] font-semibold tracking-wide text-slate-400">
                    EXECUTION RESULT (FIRST 3 ROWS)
                  </p>
                  <div className="overflow-hidden rounded-lg border border-slate-200">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                          <th className="px-4 py-2 font-medium">
                            product_name
                          </th>
                          <th className="px-4 py-2 font-medium">
                            total_units
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {resultRows.map((row) => (
                          <tr key={row.product_name}>
                            <td className="px-4 py-2.5 text-slate-700">
                              {row.product_name}
                            </td>
                            <td className="px-4 py-2.5 font-medium text-indigo-600">
                              {row.total_units}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Upload prompt */}
              <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-8 text-center">
                <div className="mb-3 h-16 w-24 rounded-md bg-gradient-to-br from-indigo-100 via-slate-100 to-slate-200" />
                <p className="text-sm text-slate-400">
                  Upload a .sql file or enter a query below to continue
                  debugging...
                </p>
              </div>
            </div>
          </div>

          {/* SQL editor footer */}
          <div className="shrink-0 border-t border-slate-200 bg-white px-6 py-4">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold tracking-wide text-slate-400">
                  SQL EDITOR
                </span>
                <span className="text-[11px] text-slate-400">
                  Press CMD+Enter to execute
                </span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <textarea
                  value={draftQuery}
                  onChange={(e) => setDraftQuery(e.target.value)}
                  rows={2}
                  placeholder="Paste your SQL query here or ask for a template..."
                  className="w-full resize-none bg-transparent font-mono text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                />
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconButton icon={FileCode} label="Attach file" />
                    <IconButton icon={Maximize2} label="Expand editor" />
                  </div>
                  <button className="flex items-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-600">
                    <Play className="h-3.5 w-3.5 fill-white" />
                    Execute
                  </button>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-4 text-[11px] font-medium tracking-wide text-slate-500">
                  <button className="flex items-center gap-1 hover:text-slate-800">
                    <LayoutTemplate className="h-3 w-3" />
                    SELECT TEMPLATE
                  </button>
                  <button className="flex items-center gap-1 hover:text-slate-800">
                    <FolderTree className="h-3 w-3" />
                    SCHEMA EXPLORER
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  CONNECTED TO PSQL:PRODUCTION
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* =============================== RIGHT: AI Data Tutor ========== */}
        <aside className="flex w-[380px] shrink-0 flex-col bg-white">
          {/* Sticky header */}
          <div className="shrink-0 border-b border-slate-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    AI Data Tutor
                  </p>
                  <p className="flex items-center gap-1 text-[11px] text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Ready to explain
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <IconButton icon={Settings} label="Settings" />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1 rounded-lg bg-slate-100 p-1">
              <button
                onClick={() => setTab("chat")}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-colors ${
                  tab === "chat"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Chat
              </button>
              <button
                onClick={() => setTab("concepts")}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-colors ${
                  tab === "concepts"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                Concepts
              </button>
            </div>
          </div>

          {/* Chat feed */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {tab === "chat" ? (
              <div className="flex flex-col gap-4">
                <span className="self-start rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-indigo-500">
                  NEW TOPIC: JOINS &amp; AGGREGATIONS
                </span>
                <p className="text-xs text-slate-400">
                  Focusing on your recent SQL errors. I'm ready to help you
                  master Grouping logic.
                </p>

                {chatMessages.map((m, i) =>
                  m.role === "ai" ? (
                    <div key={i} className="flex flex-col items-start gap-1">
                      <div className="flex items-start gap-2 max-w-[90%]">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100">
                          <Sparkles className="h-3 w-3 text-indigo-500" />
                        </div>
                        <div className="rounded-xl rounded-tl-sm border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                          <p className="text-[13px] leading-relaxed text-slate-700">
                            {m.text}
                          </p>
                          {m.snippet && (
                            <div className="mt-2.5 overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
                              <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800">
                                <span className="text-[10px] font-medium tracking-wide text-slate-400">
                                  sql
                                </span>
                                <button className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-200">
                                  <Copy className="h-3 w-3" />
                                  Copy
                                </button>
                              </div>
                              <pre className="px-3 py-2.5 font-mono text-[11px] leading-5 text-slate-300 whitespace-pre-wrap break-words">
                                {m.snippet}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="pl-8 text-[10px] text-slate-400">
                        {m.time}
                      </span>
                    </div>
                  ) : (
                    <div key={i} className="flex flex-col items-end gap-1">
                      <div className="max-w-[85%] rounded-xl rounded-tr-sm bg-indigo-500 px-3.5 py-2.5">
                        <p className="text-[13px] leading-relaxed text-white">
                          {m.text}
                        </p>
                      </div>
                      <span className="pr-1 text-[10px] text-slate-400">
                        {m.time}
                      </span>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center px-4">
                <BookOpen className="h-6 w-6 text-slate-300 mb-2" />
                <p className="text-sm text-slate-400">
                  Concept explainers for this session will appear here as you
                  debug.
                </p>
              </div>
            )}
          </div>

          {/* Sticky input footer */}
          <div className="shrink-0 border-t border-slate-200 px-4 py-3">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <input
                value={chatDraft}
                onChange={(e) => setChatDraft(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                aria-label="Send message"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-indigo-500 text-white hover:bg-indigo-600"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Explain aggregate", "Why inner join?", "Query fix"].map(
                (chip) => (
                  <button
                    key={chip}
                    className="rounded-full border border-slate-200 px-2.5 py-1 text-[11px] text-slate-500 hover:bg-slate-50"
                  >
                    {chip}
                  </button>
                )
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
