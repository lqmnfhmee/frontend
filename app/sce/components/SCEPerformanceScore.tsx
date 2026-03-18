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
    <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left: Main Score & Actionable Insights */}
        <div className="flex-[0.7] space-y-4">
          <div className="flex items-start justify-between">
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
                Explainable
              </span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Gauge - Improved Spacing */}
            <div className="relative flex items-center justify-center shrink-0">
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
                <span className="text-3xl font-bold text-slate-900 dark:text-white leading-none">
                  {score}
                </span>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-1">
                  Out of 100
                </span>
              </div>
            </div>

            <div className="space-y-3 flex-1 w-full">
              {/* Slim Alert */}
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-red-500/5 border border-red-500/10 text-[10px] font-semibold text-red-600 dark:text-red-400">
                <AlertTriangle size={12} className="shrink-0" />
                <span>3 overdue SCE tests are reducing the score</span>
              </div>

              {/* Compact Actionable Insight */}
              <div className="p-3 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50">
                <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <ArrowRight size={10} className="text-amber-500" />
                  To Improve Score
                </h5>
                <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-normal">
                  Resolve overdue tests and complete verification to move score towards healthy range.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Drivers & Integration */}
        <div className="flex-1 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">
              Performance Drivers
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {drivers.map((driver, idx) => (
                <div 
                  key={idx}
                  className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/40 hover:border-amber-500/20 transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${driver.bg} ${driver.color} group-hover:scale-105 transition-transform`}>
                        {driver.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight">
                          {driver.name}
                        </span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full border ${driver.bg} border-current/20 uppercase tracking-wider`}>
                            {driver.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-sm font-black ${driver.color}`}>
                      {driver.value}
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 pl-9 leading-tight">
                    {driver.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleTraceableClick}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-500/5 to-transparent border border-blue-500/10 hover:border-blue-500/30 hover:from-blue-500/10 transition-all group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Crosshair size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  Plant Health Contribution
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Feeds into the Plant Health Score Breakdown.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-blue-500 text-[9px] font-bold uppercase tracking-widest group-hover:gap-1.5 transition-all">
              <span>View in Plant Health</span>
              <ArrowRight size={12} />
            </div>
          </button>
        </div>

      </div>

      <SCEScoreExplainableModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        score={score} 
      />
    </div>
  );
}
