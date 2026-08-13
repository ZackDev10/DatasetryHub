"use client";

import Link from "next/link";
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import {
  Database,
  Cpu,
  Code2,
  GitCommit,
  Flame,
  Mail,
  Briefcase,
  Zap,
  Layers,
  Trophy,
  Star,
  CheckCircle2,
  ExternalLink,
  Quote,
  Bell,
  HelpCircle,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Static mock data
// ---------------------------------------------------------------------------

const quickStats = [
  { label: "Computing Power", value: "4.2 TFLOPS", icon: Cpu },
  { label: "Clean Code Score", value: "98.5%", icon: Code2 },
  { label: "Contributions", value: "1.2k", icon: GitCommit },
  { label: "Current Streak", value: "24 Days", icon: Flame },
];

const expertise = [
  { label: "Neural Architectures", value: 95 },
  { label: "ETL Optimization", value: 88 },
  { label: "Statistical Modeling", value: 92 },
  { label: "Big Data Strategy", value: 84 },
];

const masteryStats = [
  { label: "Total Verified XP", value: "450k+", icon: Zap },
  { label: "Projects Completed", value: "156", icon: Layers },
  { label: "Endorsements", value: "892", icon: Trophy },
  { label: "Community Rank", value: "#12", icon: Star },
];

const projects = [
  {
    title: "Customer Churn Prediction Engine",
    date: "Oct 2023",
    stars: 156,
    description:
      "Developed a high-accuracy predictive model using Random Forest and XGBoost to identify at-risk customers.",
    tags: ["Machine Learning", "Python", "Scikit-Learn"],
    accent: "from-indigo-500/30 via-slate-800 to-slate-900",
  },
  {
    title: "Neural Network Architecture Viz",
    date: "Dec 2023",
    stars: 89,
    description:
      "Created an interactive 3D visualization tool for complex neural networks to assist in model interpretation.",
    tags: ["Deep Learning", "PyTorch", "WebGL"],
    accent: "from-fuchsia-500/20 via-slate-800 to-slate-900",
  },
  {
    title: "Real-time Data Pipeline Monitor",
    date: "Jan 2024",
    stars: 210,
    description:
      "Architecture of a resilient ETL pipeline monitor using Apache Kafka and custom Grafana dashboards.",
    tags: ["Data Engineering", "Kafka", "SQL"],
    accent: "from-sky-500/20 via-slate-800 to-slate-900",
  },
];

const endorsements = [
  {
    quote:
      "This creator has a unique ability to translate complex statistical theory into production-ready models. The churn prediction project is a masterclass.",
    name: "Marcus Chen",
    title: "CTO, DataStream",
  },
  {
    quote:
      "The datasets curated here are always of the highest quality — perfectly structured and documented. A true asset to the platform.",
    name: "Sarah Jenkins",
    title: "Senior Data Engineer",
  },
  {
    quote:
      "Level 42 is no small feat. This journey from SQL novice to Elite Architect is an inspiration to everyone here.",
    name: "Alex Rivera",
    title: "ML.E, Neural-9",
  },
];

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Left Side: Logo & Dashboard Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
              <Database className="h-4.5 w-4.5 text-white" size={18} />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-white">
              DatasetryHub
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/dashboard" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
              Dashboard
            </Link>
            <Link href="/dashboard/explore" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
              Explore
            </Link>
            <Link href="/quiz-demo" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
              Quiz
            </Link>
            <Link href="/community" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
              Community
            </Link>
          </nav>
        </div>

        {/* Right Side: Logged-in Avatar & Icons (Dark Mode) */}
        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-4 text-slate-400 sm:flex">
            <button className="transition-colors hover:text-white">
              <HelpCircle size={20} />
            </button>
            <button className="relative transition-colors hover:text-white">
              <Bell size={20} />
              {/* Notification Badge */}
              <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-slate-950 bg-red-500"></span>
            </button>
          </div>

          {/* Divider */}
          <div className="hidden h-6 w-px bg-white/10 sm:block"></div>

          {/* User Avatar Link */}
          <Link href="/zack" className="group relative flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-sm font-bold text-white shadow-sm ring-2 ring-transparent transition-all group-hover:ring-indigo-500/50">
              ZA
            </div>
            {/* Online Status Indicator */}
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-500"></span>
          </Link>
        </div>

      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-500">
                <Database className="text-white" size={14} />
              </span>
              <span className="text-sm font-semibold text-white">
                DatasetryHub
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              Curated datasets and secure learning environments designed to
              empower data professionals.
            </p>
          </div>

          {[
            { title: "Company", items: ["About Us", "Careers", "Blog", "Contact"] },
            {
              title: "Resources",
              items: ["Datasets", "Tutorials", "Documentation", "Community"],
            },
            {
              title: "Legal",
              items: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Licenses"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-slate-500 transition-colors hover:text-slate-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-slate-600">
            © 2026 DatasetryHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-600">
            <FaTwitter size={16} className="cursor-pointer hover:text-indigo-400 transition-colors" />
            <FaLinkedin size={16} className="cursor-pointer hover:text-indigo-400 transition-colors" />
            <FaGithub size={16} className="cursor-pointer hover:text-indigo-400 transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 shadow-[0_0_8px_rgba(129,140,248,0.6)]"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CreatorProfile({ params }: { params: { username: string } }) {
  // Capitalize the username from the URL for the display name
  const displayName = params.username.charAt(0).toUpperCase() + params.username.slice(1);
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 antialiased">
      <NavBar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* ---------------------------------------------------------------- */}
        {/* Hero: identity + mastery                                         */}
        {/* ---------------------------------------------------------------- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
          {/* Left column — identity card */}
          <section className="rounded-2xl border border-white/5 bg-gradient-to-b from-slate-900 to-slate-900/60 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="h-24 w-24 overflow-hidden rounded-full ring-2 ring-indigo-500/50 ring-offset-4 ring-offset-slate-900">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-3xl font-semibold text-white">
                    {displayName.substring(0, 2).toUpperCase()}
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-slate-900 bg-emerald-500 text-[10px] font-bold text-white">
                  ✓
                </span>
              </div>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1">
                <Trophy size={12} className="text-indigo-400" />
                <span className="text-[11px] font-semibold uppercase tracking-wide text-indigo-300">
                  Rank: Elite Architect
                </span>
              </div>

              <h1 className="mt-3 text-xl font-bold text-white">
                {displayName}
              </h1>
              <span className="mt-1 rounded-md bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-400">
                Level 42
              </span>

              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                Specializing in deep learning architectures and
                high-integrity financial datasets. Contributing to open
                science since 2018.
              </p>
            </div>

            {/* XP bar */}
            <div className="mt-6">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-400">
                  124,500 / 150,000 XP
                </span>
                <span className="text-slate-600">25,000 XP to next level</span>
              </div>
              <ProgressBar value={(124500 / 150000) * 100} />
            </div>

            {/* Quick stats */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {quickStats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/5 bg-slate-950/60 p-3"
                >
                  <Icon size={16} className="mb-2 text-indigo-400" />
                  <p className="text-sm font-semibold text-white">{value}</p>
                  <p className="text-[11px] leading-tight text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-2">
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400">
                <Mail size={15} />
                Contact {displayName}
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10">
                <Briefcase size={15} />
                Hire Creator
              </button>
            </div>
          </section>

          {/* Right column — mastery & achievements */}
          <section className="flex flex-col gap-6">
            {/* Technical expertise */}
            <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-6">
              <div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-2.5 py-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
                  Technical Expertise
                </span>
              </div>
              <h2 className="mt-2 text-lg font-bold text-white">
                Mastery in specialized data domains
              </h2>
              <p className="mt-1 max-w-xl text-sm text-slate-500">
                {displayName} has demonstrated consistent excellence across the most
                challenging tracks, reflecting deep understanding of scalable
                data infrastructure and predictive modeling.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                {expertise.map((item) => (
                  <div key={item.label}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-slate-300">{item.label}</span>
                      <span className="font-semibold text-indigo-400">
                        {item.value}%
                      </span>
                    </div>
                    <ProgressBar value={item.value} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mastery stat cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {masteryStats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/5 bg-slate-900/60 p-5 transition-colors hover:border-indigo-400/30"
                >
                  <Icon
                    size={20}
                    className="mb-3 text-indigo-400 drop-shadow-[0_0_6px_rgba(129,140,248,0.5)]"
                  />
                  <p className="text-2xl font-bold text-indigo-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.35)]">
                    {value}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Verified projects                                                 */}
        {/* ---------------------------------------------------------------- */}
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Verified Projects</h2>
            <Link
              href="#"
              className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300"
            >
              Explore all projects
              <ExternalLink size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group overflow-hidden rounded-2xl border border-white/5 bg-slate-900/60 transition-colors hover:border-indigo-400/30"
              >
                <div
                  className={`flex h-36 items-center justify-center bg-gradient-to-br ${project.accent}`}
                >
                  <Layers
                    size={32}
                    className="text-white/20 transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
                      <CheckCircle2 size={11} />
                      Verified
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {project.stars}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Endorsements                                                      */}
        {/* ---------------------------------------------------------------- */}
        <section className="mt-10">
          <div className="mb-1 text-center">
            <h2 className="text-lg font-bold text-white">
              Endorsed by the Community
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Industry leaders and peers recognize {displayName}'s contributions to
              the DatasetryHub ecosystem.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {endorsements.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-white/5 bg-slate-900/60 p-5"
              >
                <Quote size={18} className="mb-3 text-indigo-400/60" />
                <p className="text-sm leading-relaxed text-slate-300">
                  "{item.quote}"
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800 text-xs font-semibold text-slate-300">
                    {item.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-slate-500">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* CTA banner                                                        */}
        {/* ---------------------------------------------------------------- */}
        <section className="mt-10 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-white">
            Collaborate with {displayName}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-indigo-100">
            Looking for an expert data scientist or technical curator for
            your next project? {displayName} is currently open to select consulting
            opportunities.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 transition-transform hover:scale-[1.02]">
              Send Message
            </button>
            <button className="rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20">
              View Resume
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
