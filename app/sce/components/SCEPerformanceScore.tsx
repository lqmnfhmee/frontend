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
      description: "Percentage of safety critical tests completed on schedule.",
      icon: <CheckCircle2 size={18} />,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      name: "Overdue SCE Tests",
      value: "3 Overdue",
      description: "Critical safety tests that have exceeded their due date.",
      icon: <AlertTriangle size={18} />,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      name: "Performance Standard Status",
      value: "Review Required",
      description: "Current verification status against safety performance standards.",
      icon: <ShieldCheck size={18} />,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  const handleTraceableClick = () => {
    router.push("/?highlight=sce_performance#plant-health-score-card");
  };

  return (
    <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left: Main Score & Info */}
        <div className="flex-1 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                SCE Performance Score
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Source score derived from SCE assurance indicators
              </p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group"
            >
              <Info size={14} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                Explainable Score
              </span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Gauge */}
            <div className="relative flex items-center justify-center shrink-0">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  className="text-slate-100 dark:text-slate-800"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={402}
                  strokeDashoffset={402 * (1 - score / 100)}
                  strokeLinecap="round"
                  className="text-amber-500 transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-900 dark:text-white tabular-nums">
                  {score}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Compliance
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm">
                This score reflects current **SCE assurance and compliance performance**, 
                integrating testing adherence and performance standard verification.
              </p>
              
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/5 border border-amber-500/10 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                <AlertTriangle size={14} className="shrink-0" />
                Attention required: 3 overdue SCE tests impacting performance.
              </div>
            </div>
          </div>
        </div>

        {/* Right: Drivers & Integration */}
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="grid grid-cols-1 gap-3">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">
              Performance Drivers
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {drivers.map((driver, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/40 hover:border-amber-500/20 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${driver.bg} ${driver.color} group-hover:scale-110 transition-transform`}>
                        {driver.icon}
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        {driver.name}
                      </span>
                    </div>
                    <span className={`text-sm font-black ${driver.color}`}>
                      {driver.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleTraceableClick}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-500/5 to-transparent border border-blue-500/10 hover:border-blue-500/30 hover:from-blue-500/10 transition-all group text-left"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <Crosshair size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  Plant Health Contribution
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  This score contributes directly to the **Plant Health Score Breakdown** as SCE Performance.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-blue-500 text-[10px] font-bold uppercase tracking-widest group-hover:gap-2 transition-all">
              <span>Traceable</span>
              <ArrowRight size={14} />
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
