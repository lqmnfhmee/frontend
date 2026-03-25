"use client";

import React, { useState } from "react";
import { ShieldCheck, Crosshair, AlertTriangle, ArrowRight, Info, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import SCEScoreExplainableModal from "./SCEScoreExplainableModal";

export default function SCEPerformanceScore() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const score = 75;

  const drivers = [
    {
      name: "SCE Testing Compliance",
      value: "82%",
      description: "Reflects adherence to safety critical testing schedules.",
      status: "Healthy",
      icon: <CheckCircle2 size={16} />,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      name: "Overdue SCE Tests",
      value: "3 Overdue",
      description: "Overdue tests directly reduce the performance score.",
      status: "Reducing Score",
      icon: <AlertTriangle size={16} />,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      name: "Performance Standard Status",
      value: "Validation Pending",
      description: "Verification status against safety performance standards.",
      status: "Requires Attention",
      icon: <ShieldCheck size={16} />,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  const handleTraceableClick = () => {
    router.push("/?highlight=sce_performance#plant-health-score-card");
  };

  return (
    <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md p-4 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            SCE Performance Score
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Integrated score from SCE assurance KPIs
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group"
        >
          <Info size={12} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
          <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
            Explainable Score
          </span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start flex-1">
        {/* LEFT SIDE (Score Area) */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className="relative flex items-center justify-center p-2">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-slate-100 dark:text-slate-800"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={364.4}
                strokeDashoffset={364.4 * (1 - score / 100)}
                strokeLinecap="round"
                className="text-amber-500 transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-slate-900 dark:text-white leading-none">
                {score}
              </span>
            </div>
          </div>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            SCE Performance
          </span>
        </div>

        {/* RIGHT SIDE (Content Area) */}
        <div className="flex-1 space-y-4 py-2 w-full text-left">
          {/* 1. Short description */}
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Composite performance index reflecting testing compliance, overdue safety critical elements, and performance standard validation status.
          </p>

          {/* 2. Key impact message */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/5 border border-red-500/10 text-xs font-semibold text-red-600 dark:text-red-400">
            <AlertTriangle size={14} className="shrink-0" />
            <span>3 overdue SCE tests are reducing the score</span>
          </div>

          {/* 3. "To improve score" action hint */}
          <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <ArrowRight size={12} className="text-amber-500" />
              To Improve Score
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
              Resolve overdue tests and complete verification to move score towards healthy range.
            </p>
          </div>
        </div>
      </div>

      {/* Integration Context Footer (Standardized Traceability) */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50">
        <button 
          onClick={handleTraceableClick}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-500/5 to-transparent border border-blue-500/10 hover:border-blue-500/30 hover:from-blue-500/10 transition-all group text-left"
        >
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <ShieldCheck size={20} />
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

      <SCEScoreExplainableModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        score={score} 
      />
    </div>
  );
}
