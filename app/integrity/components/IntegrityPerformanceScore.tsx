"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Search, 
  AlertTriangle, 
  ArrowRight, 
  Activity,
  CheckCircle2,
  CalendarClock,
  Crosshair,
  Info
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ModuleType } from "./types";
import IntegrityScoreDetailModal from "./IntegrityScoreDetailModal";

interface ModuleData {
  type: ModuleType;
  title: string;
  score: number;
  description: string;
  impactMessage: string;
  improveHint: string;
  icon: React.ReactNode;
  color: string;
}

export default function IntegrityPerformanceScore() {
  const router = useRouter();
  const [selectedModule, setSelectedModule] = useState<ModuleType | null>(null);

  const modules: ModuleData[] = [
    {
      type: "inspection",
      title: "Inspection Performance",
      score: 92,
      description: "Reflects inspection compliance and scheduling performance",
      impactMessage: "2 overdue inspections reducing score",
      improveHint: "Resolve overdue inspections to improve score",
      icon: <CalendarClock size={16} />,
      color: "text-emerald-500",
    },
    {
      type: "rbi",
      title: "RBI Performance",
      score: 68,
      description: "Based on risk assessment coverage and evaluation status",
      impactMessage: "12 high-risk assets impacting performance",
      improveHint: "Review high-risk assets to improve score",
      icon: <Search size={16} />,
      color: "text-amber-500",
    },
    {
      type: "anomaly",
      title: "Anomaly Performance",
      score: 80,
      description: "Measures anomaly closure and exposure management",
      impactMessage: "5 active anomalies increasing exposure",
      improveHint: "Address high-priority anomalies to improve score",
      icon: <Activity size={16} />,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-4 pt-2">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {modules.map((module) => (
          <div 
            key={module.type}
            className="group bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-sm hover:shadow-md hover:border-[var(--color-brand-primary-soft)] transition-all p-4 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                {module.title}
              </span>
              <button 
                onClick={() => setSelectedModule(module.type)}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group/btn"
              >
                <Info size={10} className="text-slate-400 group-hover/btn:text-amber-500 transition-colors" />
                <span className="text-[8px] font-medium text-slate-600 dark:text-slate-300 group-hover/btn:text-slate-900 dark:group-hover/btn:text-white uppercase tracking-wider">
                  Explainable
                </span>
              </button>
            </div>

            <div className="flex gap-4 mb-4">
              {/* LEFT SIDE (Score Area) */}
              <div 
                className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer"
                onClick={() => setSelectedModule(module.type)}
              >
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="transparent"
                      className="text-slate-100 dark:text-slate-800"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={226.2}
                      strokeDashoffset={226.2 * (1 - module.score / 100)}
                      strokeLinecap="round"
                      className={`${module.color} transition-all duration-1000 ease-out`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      {module.score}
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  Performance
                </span>
              </div>

              {/* RIGHT SIDE (Content Area) */}
              <div className="flex-1 space-y-3 py-1 text-left">
                {/* 1. Short description */}
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
                  {module.description}
                </p>
                
                {/* 2. Key impact message */}
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-orange-500/5 border border-orange-500/10 text-[9px] font-semibold text-orange-600 dark:text-orange-400">
                  <Activity size={10} className="shrink-0" />
                  <span className="line-clamp-1">{module.impactMessage}</span>
                </div>

                {/* 3. "To improve score" action hint */}
                <div className="p-2 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50">
                  <h5 className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <ArrowRight size={8} className="text-blue-500" />
                    To Improve
                  </h5>
                  <p className="text-[9px] text-slate-600 dark:text-slate-300 leading-tight">
                    {module.improveHint}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer: Traceability */}
            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50">
              <button 
                onClick={() => {
                  const targetId = module.type === 'inspection' ? 'inspection_management' : 
                                 module.type === 'anomaly' ? 'anomaly_management' : 'rbi';
                  router.push(`/?highlight=${targetId}#plant-health-score-card`);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-blue-500/5 to-transparent border border-blue-500/10 hover:border-blue-500/30 hover:from-blue-500/10 transition-all group/footer text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/20 group-hover/footer:scale-105 transition-transform">
                    <Crosshair size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-900 dark:text-white leading-tight">
                      Plant Health Contribution
                    </p>
                    <p className="text-[8px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Contributes to Overall Equipment Effectiveness
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-blue-500 text-[9px] font-bold uppercase tracking-wider group-hover/footer:gap-1.5 transition-all">
                  <span>Traceable</span>
                  <ArrowRight size={12} />
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedModule && (
        <IntegrityScoreDetailModal
          isOpen={!!selectedModule}
          onClose={() => setSelectedModule(null)}
          moduleType={selectedModule}
        />
      )}
    </div>
  );
}
