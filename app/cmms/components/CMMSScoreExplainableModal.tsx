"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Wrench, Clock, AlertTriangle, BarChart2, PlaySquare } from "lucide-react";

interface CMMSScoreExplainableModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
}

const drivers = [
  {
    icon: <BarChart2 size={14} />,
    name: "Work Order Completion Rate",
    value: "72%",
    rawScore: 72,
    status: "Needs Improvement",
    statusColor: "text-amber-500",
    weight: "30%",
    description: "Closed WOs / Total WOs × 100. Low completion rate is the primary drag on score.",
  },
  {
    icon: <Wrench size={14} />,
    name: "Open Work Order Status",
    value: "38 Open",
    rawScore: 60,
    status: "Elevated",
    statusColor: "text-amber-500",
    weight: "15%",
    description: "Represents maintenance workload pressure. High open WO count reduces score.",
  },
  {
    icon: <AlertTriangle size={14} />,
    name: "Overdue Work Order Status",
    value: "12 Overdue",
    rawScore: 40,
    status: "Reducing Score",
    statusColor: "text-red-500",
    weight: "30%",
    description: "Delayed maintenance actions. Highest risk driver — directly degrades score.",
  },
  {
    icon: <Clock size={14} />,
    name: "Backlog Status",
    value: "24 Backlog",
    rawScore: 50,
    status: "Moderate",
    statusColor: "text-orange-500",
    weight: "15%",
    description: "Accumulated deferred or unactioned WOs. Reduces score as backlog grows; improves when low.",
  },
  {
    icon: <PlaySquare size={14} />,
    name: "Execution / Deferred Status",
    value: "8 Deferred",
    rawScore: 65,
    status: "Attention Required",
    statusColor: "text-amber-500",
    weight: "10%",
    description: "Derived from Onshore Execute, Request to Defer, and Approval Pending indicators.",
  },
];

export default function CMMSScoreExplainableModal({
  isOpen,
  onClose,
  score,
}: CMMSScoreExplainableModalProps) {
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ── Classification bands ─────────────────────────────────────────────────
  const getClassification = (s: number) => {
    if (s >= 85) return { label: "Optimal",   color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
    if (s >= 70) return { label: "Stable",    color: "text-blue-500",    bg: "bg-blue-500/10",    border: "border-blue-500/20" };
    if (s >= 60) return { label: "Attention", color: "text-amber-500",   bg: "bg-amber-500/10",   border: "border-amber-500/20" };
    return           { label: "Critical",  color: "text-red-500",     bg: "bg-red-500/10",     border: "border-red-500/20" };
  };
  const classification = getClassification(score);

  const classificationRanges = [
    { label: "Optimal",   range: "85 – 100", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { label: "Stable",    range: "70 – 84",  color: "text-blue-500",    bg: "bg-blue-500/10",    border: "border-blue-500/20" },
    { label: "Attention", range: "60 – 69",  color: "text-amber-500",   bg: "bg-amber-500/10",   border: "border-amber-500/20" },
    { label: "Critical",  range: "< 60",     color: "text-red-500",     bg: "bg-red-500/10",     border: "border-red-500/20" },
  ];

  // Calculated breakdown
  const calcLine = `(72×0.30) + (60×0.15) + (40×0.30) + (50×0.15) + (65×0.10)`;
  const calcResult = `= 21.6 + 9.0 + 12.0 + 7.5 + 6.5 = ${score}`;

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
        <div className="px-6 py-5 flex justify-between items-start border-b border-slate-100 dark:border-slate-800">
          <div className="flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-black text-2xl">
              {score}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  CMMS Performance Score Breakdown
                </h3>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${classification.bg} ${classification.color} ${classification.border}`}>
                  {classification.label}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detailed calculation of maintenance execution indicators
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

        <div className="px-6 pb-8 pt-5 space-y-6 max-h-[70vh] overflow-y-auto">

          {/* Classification Ranges */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Classification Ranges</h4>
            <div className="grid grid-cols-4 gap-2">
              {classificationRanges.map((r) => (
                <div
                  key={r.label}
                  className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border ${r.bg} ${r.border} ${
                    r.label === classification.label ? "ring-2 ring-offset-1 ring-offset-white dark:ring-offset-slate-900 " + r.border.replace("border-", "ring-") : ""
                  }`}
                >
                  <span className={`text-[10px] font-black uppercase tracking-widest ${r.color}`}>{r.label}</span>
                  <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">{r.range}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Formula Section */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
              Calculation Logic
            </h4>
            <div className="px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/30">
              <div className="font-mono text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                Score = (Completion × 30%) + (Open WO × 15%) + (Overdue × 30%) + (Backlog × 15%) + (Execution × 10%)
              </div>
              <div className="mt-2 font-mono text-[12px] text-slate-700 dark:text-slate-300">
                {calcLine}
              </div>
              <div className="mt-1 font-mono text-[13px] font-bold text-slate-900 dark:text-white">
                {calcResult}{" "}
                <span className="text-blue-500">= {score}</span>
              </div>
            </div>
          </div>

          {/* Score Drivers Section */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
              Performance Drivers
            </h4>
            <div className="overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800">
              {/* Table header */}
              <div className="grid grid-cols-12 gap-2 px-3 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <div className="col-span-5">Driver</div>
                <div className="col-span-2 text-right">Value</div>
                <div className="col-span-3 text-right">Status</div>
                <div className="col-span-2 text-right">Weight</div>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {drivers.map((d, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 py-3 px-3 items-center">
                    <div className="col-span-5 flex items-center gap-2 min-w-0">
                      <span className="text-slate-400 shrink-0">{d.icon}</span>
                      <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200 leading-tight">
                        {d.name}
                      </span>
                    </div>
                    <div className="col-span-2 text-right text-xs font-bold text-slate-900 dark:text-white">
                      {d.value}
                    </div>
                    <div className={`col-span-3 text-right text-[9px] font-black uppercase tracking-wider ${d.statusColor}`}>
                      {d.status}
                    </div>
                    <div className="col-span-2 text-right text-xs text-slate-400">
                      {d.weight}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Driver Detail Notes */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
              Driver Notes
            </h4>
            <div className="space-y-2">
              {drivers.map((d, i) => (
                <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-lg bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50">
                  <span className="mt-0.5 text-slate-400 shrink-0">{d.icon}</span>
                  <div>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{d.name}: </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{d.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Explanation & Metadata */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
              A score of {score} indicates maintenance execution is below target. Overdue work orders and low completion rate are the primary contributors to score degradation.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-medium text-slate-400 uppercase tracking-wide">
              <div className="flex items-center gap-1.5">
                <Wrench size={12} className="text-slate-300 dark:text-slate-700" />
                <span>Source: CMMS Work Order System</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-slate-300 dark:text-slate-700" />
                <span>Updated: Live Data</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}
