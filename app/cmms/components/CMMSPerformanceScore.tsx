"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Info,
  Crosshair,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import CMMSScoreExplainableModal from "./CMMSScoreExplainableModal";

export default function CMMSPerformanceScore() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ── Score data ─────────────────────────────────────────────────────────────
  // Formula: (Completion×30%) + (Open WO×15%) + (Overdue×30%) + (Backlog×15%) + (Execution×10%)
  // (72×0.30) + (60×0.15) + (40×0.30) + (50×0.15) + (65×0.10) = 21.6+9+12+7.5+6.5 = 56.6 ≈ 57
  const score = 57;
  const circumference = 364.4; // 2π × 58

  // ── Classification bands ──────────────────────────────────────────────────
  const getClassification = (s: number) => {
    if (s >= 85) return { label: "Optimal",   color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
    if (s >= 70) return { label: "Stable",    color: "text-blue-500",    bg: "bg-blue-500/10",    border: "border-blue-500/20" };
    if (s >= 60) return { label: "Attention", color: "text-amber-500",   bg: "bg-amber-500/10",   border: "border-amber-500/20" };
    return           { label: "Critical",  color: "text-red-500",     bg: "bg-red-500/10",     border: "border-red-500/20" };
  };
  const classification = getClassification(score);
  const scoreColor = classification.color;
  const gaugeColor = classification.color;

  const handleTraceableClick = () => {
    router.push("/?highlight=cmms_performance#plant-health-score-card");
  };

  return (
    <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md p-4 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            CMMS Performance Score
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Derived from maintenance execution indicators
          </p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group"
        >
          <Info size={12} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
          <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
            Explainable Score
          </span>
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start flex-1">

        {/* LEFT — Gauge */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className="relative flex items-center justify-center p-2">
            <svg className="w-32 h-32 transform -rotate-90">
              {/* Track */}
              <circle
                cx="64" cy="64" r="58"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-slate-100 dark:text-slate-800"
              />
              {/* Progress */}
              <circle
                cx="64" cy="64" r="58"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - score / 100)}
                strokeLinecap="round"
                className={`${gaugeColor} transition-all duration-1000 ease-out`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold leading-none ${scoreColor}`}>
                {score}
              </span>
            </div>
          </div>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            CMMS Performance
          </span>
          {/* Classification band pill */}
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${classification.bg} ${classification.color} ${classification.border}`}>
            {classification.label}
          </span>
        </div>

        {/* RIGHT — Content */}
        <div className="flex-1 space-y-4 py-2 w-full text-left">

          {/* Description */}
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Composite performance index reflecting work order completion, overdue maintenance, backlog accumulation, and execution efficiency.
          </p>

          {/* Score Drivers mini-list */}
          <div className="space-y-2">
            {[
              { label: "Completion Rate", value: "72%", weight: "30%", color: "bg-amber-500" },
              { label: "Overdue WO Status", value: "12 Overdue", weight: "30%", color: "bg-red-500" },
              { label: "Backlog Status", value: "24 Backlog", weight: "15%", color: "bg-orange-500" },
              { label: "Open WO Status", value: "38 Open", weight: "15%", color: "bg-amber-500" },
              { label: "Execution / Deferred", value: "8 Deferred", weight: "10%", color: "bg-blue-500" },
            ].map((d) => (
              <div key={d.label} className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${d.color}`} />
                <span className="text-[11px] text-slate-600 dark:text-slate-300 flex-1">{d.label}</span>
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">{d.value}</span>
                <span className="text-[10px] text-slate-400 w-7 text-right">{d.weight}</span>
              </div>
            ))}
          </div>

          {/* Key impact message */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/5 border border-red-500/10 text-xs font-semibold text-red-600 dark:text-red-400">
            <AlertTriangle size={14} className="shrink-0" />
            <span>12 overdue WOs and high backlog are significantly reducing the score</span>
          </div>

          {/* To improve score */}
          <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <ArrowRight size={12} className="text-blue-500" />
              To Improve Score
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
              Prioritise closure of overdue work orders and reduce backlog by actioning deferred maintenance. Improving completion rate by 10% can move the score above the 60-point threshold.
            </p>
          </div>
        </div>
      </div>

      {/* Footer — Plant Health Traceability */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50">
        <button
          onClick={(e) => { e.stopPropagation(); handleTraceableClick(); }}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-500/5 to-transparent border border-blue-500/10 hover:border-blue-500/30 hover:from-blue-500/10 transition-all group text-left"
        >
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Crosshair size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                Plant Health Contribution
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Contributes to Overall Equipment Effectiveness
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-blue-500 text-xs font-bold uppercase tracking-wider group-hover:gap-2 transition-all">
            <span>Traceable</span>
            <ArrowRight size={14} />
          </div>
        </button>
      </div>

      {/* Modal */}
      <CMMSScoreExplainableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        score={score}
      />
    </div>
  );
}
