"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { 
  X, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Activity,
  CalendarClock
} from "lucide-react";
import { ModuleType } from "./types";

interface IntegrityScoreDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleType: ModuleType;
}

const MODULE_CONFIG = {
  inspection: {
    title: "Inspection Management",
    score: 92,
    formula: "Score = (Compliance × 50%) + (Overdue × 30%) + (Completion × 20%)",
    calculation: "(95 × 0.5) + (85 × 0.3) + (90 × 0.2)",
    drivers: [
      { name: "Inspection Compliance", value: "95%", weight: "50%", status: "Healthy", color: "text-emerald-500" },
      { name: "Overdue Inspections", value: "2 Overdue", weight: "30%", status: "Reducing Score", color: "text-red-500" },
      { name: "Completion Status", value: "90%", weight: "20%", status: "Healthy", color: "text-emerald-500" },
      { name: "Upcoming Inspection Schedule", value: "12 Scheduled", weight: "N/A", status: "Healthy", color: "text-blue-500" },
    ],
    icon: <CalendarClock size={24} className="text-emerald-500" />,
    bg: "bg-emerald-500/10",
  },
  rbi: {
    title: "Risk-Based Inspection (RBI)",
    score: 68,
    formula: "Score = (Coverage × 40%) + (High Risk × 40%) + (Matrix Status × 20%)",
    calculation: "(70 × 0.4) + (60 × 0.4) + (80 × 0.2)",
    drivers: [
      { name: "RBI Coverage", value: "70%", weight: "40%", status: "Requires Attention", color: "text-amber-500" },
      { name: "High-Risk Asset Count", value: "12 Assets", weight: "40%", status: "Reducing Score", color: "text-red-500" },
      { name: "Risk Matrix Evaluation Status", value: "80%", weight: "20%", status: "Healthy", color: "text-emerald-500" },
      { name: "Inspection Prioritization", value: "Implemented", weight: "N/A", status: "Healthy", color: "text-blue-500" },
    ],
    icon: <Search size={24} className="text-amber-500" />,
    bg: "bg-amber-500/10",
  },
  anomaly: {
    title: "Anomaly Management",
    score: 80,
    formula: "Score = (Closure Rate × 40%) + (Priority Exposure × 40%) + (Deferred × 20%)",
    calculation: "(85 × 0.4) + (75 × 0.4) + (80 × 0.2)",
    drivers: [
      { name: "Anomaly Closure Rate", value: "85%", weight: "40%", status: "Healthy", color: "text-emerald-500" },
      { name: "High-Priority Anomaly Exposure", value: "Low", weight: "40%", status: "Healthy", color: "text-emerald-500" },
      { name: "Deferred Anomalies", value: "5 Deferred", weight: "20%", status: "Requires Attention", color: "text-amber-500" },
      { name: "Open Anomalies", value: "15 Open", weight: "N/A", status: "Reducing Score", color: "text-red-500" },
    ],
    icon: <Activity size={24} className="text-orange-500" />,
    bg: "bg-orange-500/10",
  },
} as Record<ModuleType, any>;

export default function IntegrityScoreDetailModal({
  isOpen,
  onClose,
  moduleType,
}: IntegrityScoreDetailModalProps) {
  const config = MODULE_CONFIG[moduleType];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 isolate">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      {/* Modal Content */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-300"
      >
        
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-start">
          <div className="flex gap-4">
            <div className={`shrink-0 w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center font-black text-2xl`}>
              {config.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {config.title} Breakdown
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Performance breakdown for integrity management module
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 pb-8 space-y-8">
          
          {/* Hero Score */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/30">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overall Score</span>
              <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{config.score}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
              <p className={`text-sm font-bold uppercase tracking-wider mt-1 ${config.score >= 90 ? 'text-emerald-500' : config.score >= 75 ? 'text-blue-500' : 'text-amber-500'}`}>
                {config.score >= 90 ? 'OPTIMAL' : config.score >= 75 ? 'HEALTHY' : 'ATTENTION'}
              </p>
            </div>
          </div>

          {/* Formula Section */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Calculation Logic</h4>
            <div className="px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/30">
              <div className="font-mono text-[13px] leading-relaxed">
                <div className="text-slate-500 text-[11px]">
                  {config.formula}
                </div>
                <div className="mt-1 text-slate-900 dark:text-slate-200 font-medium">
                  Score = {config.calculation} = <span className={`font-bold ${config.score >= 90 ? 'text-emerald-500' : config.score >= 75 ? 'text-blue-500' : 'text-amber-500'}`}>{config.score}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Score Drivers Section */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Performance Drivers (used in score calculation)</h4>
            <div className="overflow-hidden">
              <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                <div className="col-span-6">Driver Name</div>
                <div className="col-span-2 text-right">Value</div>
                <div className="col-span-2 text-right">Status</div>
                <div className="col-span-2 text-right">Weight</div>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {config.drivers.map((driver: any, idx: number) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 py-3 px-1 items-center">
                    <div className="col-span-6 text-sm font-medium text-slate-700 dark:text-slate-200 line-clamp-1">{driver.name}</div>
                    <div className="col-span-2 text-right text-xs font-bold text-slate-900 dark:text-white">{driver.value}</div>
                    <div className={`col-span-2 text-right text-[9px] font-black uppercase tracking-wider ${driver.color}`}>{driver.status}</div>
                    <div className="col-span-2 text-right text-xs text-slate-400">{driver.weight}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Explanation & Metadata */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-medium text-slate-400 uppercase tracking-wide">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-slate-300 dark:text-slate-700" />
                <span>Source: Asset Integrity Management System</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-slate-300 dark:text-slate-700" />
                <span>Updated: 10 mins ago</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}
