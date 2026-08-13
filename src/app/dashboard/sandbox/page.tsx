"use client";

import {
    CheckCircle,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    ChevronUp,
    Circle,
    Download,
    FileCode2,
    FileSpreadsheet,
    Lightbulb,
    Play,
    Save,
    Table2,
    Terminal,
    Trash2,
} from "lucide-react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Static dummy data
// ---------------------------------------------------------------------------

const lessonSteps = [
  {
    id: 1,
    title: "Importing Libraries",
    status: "complete" as const,
    description:
      "Start by importing Pandas and NumPy. These are essential for data manipulation and numerical operations in Python.",
  },
  {
    id: 2,
    title: "Loading Data",
    status: "active" as const,
    description:
      "Use the read_csv function to load the local DatasetryHub sandbox file. Our environment pre-loads datasets into the current working directory.",
  },
  {
    id: 3,
    title: "Grouping and Aggregation",
    status: "upcoming" as const,
    description:
      "Perform a group-by operation on the segment column and calculate the mean of the churned indicator.",
  },
  {
    id: 4,
    title: "Filtering High-Risk Segments",
    status: "upcoming" as const,
    description:
      "Filter the aggregated results to isolate segments with a churn rate greater than 15%.",
  },
];

const codeLines = [
  { n: 1, tokens: [{ t: "import pandas as pd", c: "text-sky-300" }] },
  { n: 2, tokens: [{ t: "import numpy as np", c: "text-sky-300" }] },
  { n: 3, tokens: [] },
  { n: 4, tokens: [{ t: "# Load our curated dataset", c: "text-slate-500" }] },
  {
    n: 5,
    tokens: [
      { t: "df", c: "text-slate-200" },
      { t: " = ", c: "text-slate-400" },
      { t: "pd", c: "text-sky-300" },
      { t: ".", c: "text-slate-400" },
      { t: "read_csv", c: "text-violet-300" },
      { t: "(", c: "text-slate-400" },
      { t: "'user_churn_data.csv'", c: "text-emerald-300" },
      { t: ")", c: "text-slate-400" },
    ],
  },
  { n: 6, tokens: [] },
  { n: 7, tokens: [{ t: "# Calculate churn rates by segment", c: "text-slate-500" }] },
  {
    n: 8,
    tokens: [
      { t: "churn_summary", c: "text-slate-200" },
      { t: " = ", c: "text-slate-400" },
      { t: "df", c: "text-slate-200" },
      { t: ".", c: "text-slate-400" },
      { t: "groupby", c: "text-violet-300" },
      { t: "(", c: "text-slate-400" },
      { t: "'segment'", c: "text-emerald-300" },
      { t: ")", c: "text-slate-400" },
      { t: "[", c: "text-slate-400" },
      { t: "'churned'", c: "text-emerald-300" },
      { t: "]", c: "text-slate-400" },
      { t: ".", c: "text-slate-400" },
      { t: "mean", c: "text-violet-300" },
      { t: "()", c: "text-slate-400" },
      { t: ".", c: "text-slate-400" },
      { t: "reset_index", c: "text-violet-300" },
      { t: "()", c: "text-slate-400" },
    ],
  },
  {
    n: 9,
    tokens: [
      { t: "churn_summary", c: "text-slate-200" },
      { t: "[", c: "text-slate-400" },
      { t: "'churn_rate'", c: "text-emerald-300" },
      { t: "] = ", c: "text-slate-400" },
      { t: "churn_summary", c: "text-slate-200" },
      { t: "[", c: "text-slate-400" },
      { t: "'churned'", c: "text-emerald-300" },
      { t: "] * ", c: "text-slate-400" },
      { t: "100", c: "text-amber-300" },
    ],
  },
  { n: 10, tokens: [] },
  {
    n: 11,
    tokens: [
      { t: "print", c: "text-violet-300" },
      { t: "(", c: "text-slate-400" },
      { t: '"Analysis complete."', c: "text-emerald-300" },
      { t: ")", c: "text-slate-400" },
    ],
  },
  { n: 12, tokens: [] },
  { n: 13, tokens: [{ t: "# Filter high-risk segments", c: "text-slate-500" }] },
  {
    n: 14,
    tokens: [
      { t: "high_risk", c: "text-slate-200" },
      { t: " = ", c: "text-slate-400" },
      { t: "churn_summary", c: "text-slate-200" },
      { t: "[", c: "text-slate-400" },
      { t: "churn_summary", c: "text-slate-200" },
      { t: "[", c: "text-slate-400" },
      { t: "'churn_rate'", c: "text-emerald-300" },
      { t: "] > ", c: "text-slate-400" },
      { t: "15", c: "text-amber-300" },
      { t: "]", c: "text-slate-400" },
    ],
  },
  {
    n: 15,
    tokens: [
      { t: "print", c: "text-violet-300" },
      { t: "(high_risk)", c: "text-slate-400" },
    ],
  },
];

const previewRows = [
  { segment: "Enterprise", rate: "12.0%", users: "450", status: "Stable" },
  { segment: "Mid-Market", rate: "18.0%", users: "1,200", status: "At Risk" },
  { segment: "SMB", rate: "24.0%", users: "3,400", status: "Critical" },
  { segment: "Startup", rate: "8.0%", users: "890", status: "Low Risk" },
  { segment: "Freelance", rate: "15.0%", users: "2,100", status: "Warning" },
];

const statusStyles: Record<string, string> = {
  Stable: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "At Risk": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Critical: "bg-red-50 text-red-700 ring-red-600/20",
  "Low Risk": "bg-sky-50 text-sky-700 ring-sky-600/20",
  Warning: "bg-orange-50 text-orange-700 ring-orange-600/20",
};

const consoleLogs = [
  { level: "info", text: "Kernel started · Datastery Engine · 32GB isolated sandbox" },
  { level: "info", text: "Loaded user_churn_data.csv (8,040 rows, 6 columns)" },
  { level: "success", text: "Analysis complete." },
  { level: "info", text: "churn_summary computed for 5 segments" },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SandboxPage() {
  const [activeOutputTab, setActiveOutputTab] = useState<"preview" | "console">("preview");
  const [hintOpen, setHintOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-slate-50">
      {/* Sub-header */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          <span className="text-slate-400">Tracks</span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          <span className="text-slate-400">Pandas Fundamentals</span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          <span className="font-medium text-slate-700">Data Aggregation</span>
        </nav>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
            <Save className="h-4 w-4" />
            Save Draft
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition hover:bg-indigo-700">
            <CheckCircle2 className="h-4 w-4" />
            Complete Lesson
          </button>
        </div>
      </div>

      {/* Main split-pane body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Instruction panel */}
        <aside className="flex w-full max-w-md flex-shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-white lg:max-w-[38%]">
          <div className="flex-1 px-6 py-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
              Module 4 · Data Aggregation
            </p>
            <h1 className="mt-1.5 text-xl font-semibold text-slate-900">
              Analyzing Customer Retention
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              In this sandbox, you&apos;ll apply advanced Pandas functions to calculate risk
              profiles across user segments using a real curated dataset.
            </p>

            {/* Lesson progress */}
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">Lesson Progress</h2>
                <span className="text-xs font-medium text-slate-400">Step 2 of 4</span>
              </div>

              <ol className="space-y-1">
                {lessonSteps.map((step, idx) => (
                  <li key={step.id} className="relative flex gap-3 pb-5 last:pb-0">
                    {idx !== lessonSteps.length - 1 && (
                      <span
                        className={`absolute left-[11px] top-6 h-full w-px ${
                          step.status === "complete" ? "bg-emerald-200" : "bg-slate-200"
                        }`}
                      />
                    )}
                    <span className="relative z-10 mt-0.5 flex-shrink-0">
                      {step.status === "complete" ? (
                        <CheckCircle className="h-[22px] w-[22px] fill-emerald-500 text-white" />
                      ) : step.status === "active" ? (
                        <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
                          <span className="h-2 w-2 rounded-full bg-indigo-600" />
                        </span>
                      ) : (
                        <Circle className="h-[22px] w-[22px] text-slate-300" />
                      )}
                    </span>
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          step.status === "upcoming" ? "text-slate-400" : "text-slate-800"
                        }`}
                      >
                        {step.title}
                      </p>
                      {step.status === "active" && (
                        <p className="mt-1 text-sm leading-relaxed text-slate-500">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Rich content block */}
            <div className="mt-2 space-y-4 border-t border-slate-100 pt-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Why grouping matters</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  When you call{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px] text-indigo-700">
                    groupby()
                  </code>{" "}
                  on a categorical column, Pandas splits the DataFrame into buckets so you can
                  apply an aggregate function &mdash; like{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px] text-indigo-700">
                    mean()
                  </code>{" "}
                  or{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px] text-indigo-700">
                    sum()
                  </code>{" "}
                  &mdash; independently to each bucket.
                </p>
              </div>

              <ul className="ml-4 list-disc space-y-1.5 text-sm leading-relaxed text-slate-500 marker:text-indigo-400">
                <li>Split the DataFrame by the segment column</li>
                <li>Apply mean() to the churned indicator</li>
                <li>Combine the results back into a summary table</li>
              </ul>
            </div>
          </div>

          {/* Hint accordion */}
          <div className="sticky bottom-0 border-t border-slate-200 bg-white px-6 py-4">
            <button
              onClick={() => setHintOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-lg bg-indigo-50 px-4 py-3 text-left transition hover:bg-indigo-100"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-indigo-700">
                <Lightbulb className="h-4 w-4" />
                Need a hint?
              </span>
              {hintOpen ? (
                <ChevronUp className="h-4 w-4 text-indigo-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-indigo-500" />
              )}
            </button>
            {hintOpen && (
              <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-sm leading-relaxed text-slate-600">
                  Ask the AI Tutor to explain the groupby() parameters for complex
                  multi-indexing, or check that your column names match the dataset schema
                  exactly.
                </p>
                <button className="mt-3 w-full rounded-lg border border-slate-300 bg-white py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                  Ask AI Assistant
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Right: Editor + Output */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top right: Code editor */}
          <div className="flex flex-[3] flex-col overflow-hidden border-b border-slate-200 bg-slate-900">
            {/* Tab bar */}
            <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950/40 px-3">
              <div className="flex items-center">
                <div className="flex items-center gap-2 border-r border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-slate-200">
                  <FileCode2 className="h-3.5 w-3.5 text-sky-400" />
                  main.py
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-500">
                  <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500" />
                  user_churn_data.csv
                </div>
              </div>

              <div className="flex items-center gap-2 py-1.5">
                <span className="rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
                  Python 3.10
                </span>
                <button className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-500">
                  <Play className="h-3.5 w-3.5 fill-white" />
                  Run Analysis
                </button>
              </div>
            </div>

            {/* Code body */}
            <div className="flex-1 overflow-auto px-0 py-3 font-mono text-[13px] leading-6">
              {codeLines.map((line) => (
                <div key={line.n} className="flex px-4 hover:bg-white/[0.03]">
                  <span className="mr-4 w-5 flex-shrink-0 select-none text-right text-slate-600">
                    {line.n}
                  </span>
                  <span className="whitespace-pre">
                    {line.tokens.length === 0
                      ? "\u00A0"
                      : line.tokens.map((tok, i) => (
                          <span key={i} className={tok.c}>
                            {tok.t}
                          </span>
                        ))}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom right: Output & Terminal */}
          <div className="flex flex-[2] flex-col overflow-hidden bg-white">
            {/* Tab bar */}
            <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-200 px-4">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveOutputTab("preview")}
                  className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-medium transition ${
                    activeOutputTab === "preview"
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Table2 className="h-4 w-4" />
                  Data Preview
                </button>
                <button
                  onClick={() => setActiveOutputTab("console")}
                  className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-medium transition ${
                    activeOutputTab === "console"
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Terminal className="h-4 w-4" />
                  Console Logs
                </button>
              </div>

              <div className="flex items-center gap-1.5 py-1.5">
                <button className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
                  <Download className="h-3.5 w-3.5" />
                  Export .CSV
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-auto">
              {activeOutputTab === "preview" ? (
                <table className="min-w-full text-left text-sm">
                  <thead className="sticky top-0 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-2.5 font-medium">Segment</th>
                      <th className="px-4 py-2.5 font-medium">Churn Rate</th>
                      <th className="px-4 py-2.5 font-medium">Total Users</th>
                      <th className="px-4 py-2.5 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {previewRows.map((row) => (
                      <tr key={row.segment} className="transition hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-medium text-slate-800">{row.segment}</td>
                        <td className="px-4 py-2.5 text-slate-600">{row.rate}</td>
                        <td className="px-4 py-2.5 text-slate-600">{row.users}</td>
                        <td className="px-4 py-2.5">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyles[row.status]}`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="space-y-1.5 px-4 py-3 font-mono text-[13px] leading-6">
                  {consoleLogs.map((log, i) => (
                    <div key={i} className="flex gap-2">
                      <span
                        className={
                          log.level === "success" ? "text-emerald-600" : "text-slate-400"
                        }
                      >
                        {log.level === "success" ? "✓" : "›"}
                      </span>
                      <span className="text-slate-600">{log.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
