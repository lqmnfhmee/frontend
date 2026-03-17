"use client";

import React, { useState } from "react";
import { Activity, Gauge, ArrowRight, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import AssetScoreExplainableModal from "./AssetScoreExplainableModal";

export default function AssetPerformanceScore() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const score = 88;
  const indicators = [
    {
      name: "Asset Operational Status",
      value: 92,
      description: "Based on active/running state of critical assets.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      name: "Asset Availability Indicators",
      value: 84,
      description: "Measures uptime and readiness for operation.",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
  ];

  const handleTraceableClick = () => {
    router.push("/?highlight=asset_performance#plant-health-score-card");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Asset Performance Score
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Source score derived from operational indicators
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer group"
        >
          <Info size={14} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
            Explainable Score
          </span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start flex-1 text-center lg:text-left">
        {/* Main Score Display */}
        <div className="relative flex items-center justify-center p-4">
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
              className="text-emerald-500 transition-all duration-1000 ease-out"
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

        {/* Breakdown & Indicators */}
        <div className="flex-1 space-y-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {indicators.map((indicator, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 group hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${indicator.bg} ${indicator.color}`}>
                      {index === 0 ? <Activity size={18} /> : <Gauge size={18} />}
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-tight">
                      {indicator.name}
                    </span>
                  </div>
                  <span className={`text-lg font-bold ${indicator.color}`}>
                    {indicator.value}%
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 pl-11">
                  {indicator.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Integration Context Footer */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50">
        <button 
          onClick={handleTraceableClick}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-transparent border border-emerald-500/10 hover:border-emerald-500/30 hover:from-emerald-500/10 transition-all group text-left"
        >
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                Plant Health Contribution
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[280px]">
                This score contributes directly to the **Plant Health Score Breakdown** as Asset Performance.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold uppercase tracking-wider group-hover:gap-2 transition-all">
            <span>Traceable</span>
            <ArrowRight size={14} />
          </div>
        </button>
      </div>

      {/* Explainable Modal */}
      <AssetScoreExplainableModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        score={score}
      />
    </div>
  );
}
