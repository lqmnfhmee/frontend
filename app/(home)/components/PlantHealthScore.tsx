"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronDown, ChevronUp, TrendingUp, ArrowRight, X } from "lucide-react";

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const SCORE_BREAKDOWN = [
  {
    id: "asset_sce",
    title: "Asset & SCE Performance",
    weight: 30,
    scoreValue: 85,
    expandedContent: (
      <div className="text-sm text-slate-600 dark:text-slate-400 space-y-3 mt-1">
        <p className="font-semibold text-slate-900 dark:text-slate-200">Asset & SCE Performance Health Status (30%)</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[13px] sm:text-sm">
            <span className="text-slate-700 dark:text-slate-300">Asset Performance</span>
            <span className="font-medium text-slate-900 dark:text-slate-300">10%</span>
          </div>
          <div className="flex justify-between items-center text-[13px] sm:text-sm">
            <span className="text-slate-700 dark:text-slate-300">SCE Performance</span>
            <span className="font-medium text-slate-900 dark:text-slate-300">20%</span>
          </div>
        </div>
        <p className="text-[11px] italic text-slate-500 dark:text-slate-400 pt-1 leading-relaxed">
          Note: Based on latest P&ID, vendor drawings and CMMS status.
        </p>
        <div className="p-2.5 bg-red-50 dark:bg-red-500/10 rounded border border-red-100 dark:border-red-500/20 mt-3 flex items-start gap-2">
          <div className="w-1 h-1 rounded-full bg-red-500 mt-1.5 shrink-0" />
          <p className="text-xs font-medium text-red-600 dark:text-red-400">3 overdue tests</p>
        </div>
      </div>
    )
  },
  {
    id: "inspection",
    title: "Inspection Management",
    weight: 25,
    scoreValue: 92,
    expandedContent: (
      <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2.5 mt-1">
        <div className="flex justify-between items-center text-[13px] sm:text-sm">
          <span>Inspection Compliance</span>
          <span className="font-medium text-emerald-600 dark:text-emerald-400">Stable</span>
        </div>
        <div className="flex justify-between items-center text-[13px] sm:text-sm">
          <span>Overdue Inspections</span>
          <span className="font-medium text-red-600 dark:text-red-400">2</span>
        </div>
        <div className="flex justify-between items-center text-[13px] sm:text-sm">
          <span>Upcoming Inspections</span>
          <span className="font-medium text-yellow-600 dark:text-yellow-400">5</span>
        </div>
        <div className="flex justify-between items-center text-[13px] sm:text-sm">
          <span>Completion Status</span>
          <span className="font-medium text-slate-900 dark:text-slate-300">95%</span>
        </div>
      </div>
    )
  },
  {
    id: "rbi",
    title: "Risk-Based Inspection",
    weight: 25,
    scoreValue: 78,
    expandedContent: (
      <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2.5 mt-1">
        <div className="flex justify-between items-center text-[13px] sm:text-sm">
          <span>Risk Matrix Evaluation</span>
          <span className="font-medium text-slate-900 dark:text-slate-300">Updated</span>
        </div>
        <div className="flex justify-between items-center text-[13px] sm:text-sm">
          <span>High-Risk Assets</span>
          <span className="font-medium text-orange-600 dark:text-orange-400">12</span>
        </div>
        <div className="flex justify-between items-center text-[13px] sm:text-sm">
          <span>RBI Coverage</span>
          <span className="font-medium text-slate-900 dark:text-slate-300">88%</span>
        </div>
        <div className="flex justify-between items-center text-[13px] sm:text-sm">
          <span>Inspection Prioritization</span>
          <span className="font-medium text-emerald-600 dark:text-emerald-400">Active</span>
        </div>
      </div>
    )
  },
  {
    id: "anomalies",
    title: "Anomalies",
    weight: 20,
    scoreValue: 80,
    expandedContent: (
      <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2.5 mt-1">
        <div className="flex justify-between items-center text-[13px] sm:text-sm">
          <span>Open Anomalies</span>
          <span className="font-medium text-red-600 dark:text-red-400">5</span>
        </div>
        <div className="flex justify-between items-center text-[13px] sm:text-sm">
          <span>Deferred Anomalies</span>
          <span className="font-medium text-yellow-600 dark:text-yellow-400">5</span>
        </div>
        <div className="flex justify-between items-center text-[13px] sm:text-sm">
          <span>Completed Anomalies</span>
          <span className="font-medium text-slate-900 dark:text-slate-300">3</span>
        </div>
        <div className="flex justify-between items-center text-[13px] sm:text-sm">
          <span>High-Priority Anomaly Exposure</span>
          <span className="font-medium text-orange-600 dark:text-orange-400">Active</span>
        </div>
      </div>
    )
  }
];

const SCORE_RANGES = [
  { label: "Healthy", range: "85 – 100", min: 85, max: 100, color: "#22c55e", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  { label: "Degrading", range: "60 – 84", min: 60, max: 84, color: "#eab308", bg: "bg-yellow-50 dark:bg-yellow-500/10" },
  { label: "Critical", range: "0 – 59", min: 0, max: 59, color: "#ef4444", bg: "bg-red-50 dark:bg-red-500/10" },
];

function getStatusByScore(score: number) {
  if (score >= 85) return { label: "Healthy", color: "#22c55e" };
  if (score >= 60) return { label: "Degrading", color: "#eab308" };
  return { label: "Critical", color: "#ef4444" };
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function BreakdownAccordionItem({ 
  title, weight, scoreValue, expandedContent, isOpen, onToggle 
}: { 
  title: string; weight: number; scoreValue: number; expandedContent: React.ReactNode; isOpen: boolean; onToggle: () => void;
}) {
  const barColor = scoreValue >= 85 ? "bg-emerald-500" : scoreValue >= 60 ? "bg-yellow-500" : "bg-red-500";
  
  return (
    <div className={`border rounded-lg overflow-hidden transition-colors duration-200 ${isOpen ? 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/80' : 'border-slate-200 dark:border-[var(--color-brand-darkBorder)] bg-white dark:bg-slate-800/30 hover:border-slate-300 dark:hover:border-slate-600'}`}>
      <button 
        onClick={onToggle}
        className="w-full text-left px-4 py-3 sm:py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        <div className="flex-1 pr-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 sm:mb-1.5 gap-1 sm:gap-0">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</span>
            <span className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">Contribution: {weight}%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 w-20">Performance:</span>
            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${barColor} transition-all duration-1000 ease-out`} 
                style={{ width: `${scoreValue}%` }} 
              />
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-8 text-right">{scoreValue}%</span>
          </div>
        </div>
        <div className="shrink-0 text-slate-400 dark:text-slate-500 flex items-center justify-center p-1">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>
      
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-700/50">
            {expandedContent}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Score Breakdown Drawer ────────────────────────────────────────────────────

function ScoreBreakdownDrawer({
  score,
  open,
  onClose,
}: {
  score: number;
  open: boolean;
  onClose: () => void;
}) {
  const status = getStatusByScore(score);
  const [openSection, setOpenSection] = useState<string | null>("asset_sce");

  // Escape key closes drawer
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        className={`fixed inset-0 z-40 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Plant Health Score Breakdown"
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md
                    bg-white dark:bg-[var(--color-brand-darkCard)] 
                    border-l border-slate-200 dark:border-[var(--color-brand-darkBorder)]
                    shadow-2xl flex flex-col
                    transition-transform duration-300 ease-out
                    ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] shrink-0 bg-slate-50 dark:bg-slate-900/50">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Plant Health Score Breakdown</h2>
            <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">How the Plant Health Score is calculated</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">

          {/* Score hero summary */}
          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] bg-white dark:bg-slate-800/30 shadow-sm"
               style={{ boxShadow: `0 0 24px ${status.color}15` }}>
            <div className="text-4xl font-bold" style={{ color: status.color }}>{score}</div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Plant Health Level
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: status.color }}>
                  {status.label}
                </span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Plant-Wide</span>
              </div>
            </div>
          </div>

          {/* Score breakdown accordion */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
              Score Contributors
            </p>
            <div className="space-y-3">
              {SCORE_BREAKDOWN.map((section) => (
                <BreakdownAccordionItem
                  key={section.id}
                  title={section.title}
                  weight={section.weight}
                  scoreValue={section.scoreValue}
                  expandedContent={section.expandedContent}
                  isOpen={openSection === section.id}
                  onToggle={() => setOpenSection(openSection === section.id ? null : section.id)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function PlantHealthScore() {
  const [score, setScore] = useState(0);
  const targetScore = 90;
  const status = getStatusByScore(targetScore);
  
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= targetScore) {
        setScore(targetScore);
        clearInterval(interval);
      } else {
        setScore(current);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [targetScore]);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  return (
    <>
      <ScoreBreakdownDrawer score={targetScore} open={drawerOpen} onClose={closeDrawer} />

      <div className="
        w-full rounded-xl p-4 sm:p-6 lg:p-8
        bg-white dark:bg-[var(--color-brand-darkCard)]
        border border-slate-200 dark:border-[var(--color-brand-darkBorder)]
        shadow-md shadow-slate-200/50 dark:shadow-none
        hover:shadow-lg hover:shadow-slate-200 dark:hover:shadow-none max-h-min
        transition-all duration-300
      ">
        <h2 className="text-lg font-semibold mb-6 text-slate-900 dark:text-slate-100">
          Plant Health Score
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">

          {/* ── LEFT: Gauge & Status ── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 w-full lg:w-auto lg:shrink-0 pb-2 lg:pb-0">
            
            <button
              onClick={openDrawer}
              aria-label="View Plant Health Score Breakdown"
              className="relative w-32 h-32 sm:w-40 sm:h-40 shrink-0 rounded-full
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                         group cursor-pointer transition-transform hover:scale-105 active:scale-95 duration-200"
              style={{ "--tw-ring-color": status.color } as React.CSSProperties}
            >
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="50%" cy="50%" r={radius}
                  strokeWidth="20"
                  stroke="rgb(226 232 240)"
                  className="dark:stroke-slate-800"
                  fill="transparent"
                />
                <circle
                  cx="50%" cy="50%" r={radius}
                  strokeWidth="20"
                  stroke={status.color}
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={(1 - score / 100) * circumference}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>

              {/* Hover hint overlay */}
              <div
                className="absolute inset-0 rounded-full flex flex-col items-center justify-center
                           bg-slate-900/0 dark:bg-black/0 group-hover:bg-slate-900/10 dark:group-hover:bg-black/20 
                           transition-colors duration-200"
                aria-hidden
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center gap-1">
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-800 dark:text-white uppercase px-2 text-center">
                    View Details
                  </span>
                </div>
              </div>
            </button>

            <div className="flex flex-col items-start">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-bold tracking-tight transition-colors duration-200" style={{ color: status.color }}>
                  {score}
                </span>
              </div>
              
              <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 mt-1">
                Plant Health Level
              </p>
              
              <span className="inline-flex items-center gap-1.5 mt-2 text-[11px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                <TrendingUp size={12} /> Stable · Plant-Wide
              </span>

              <button 
                onClick={openDrawer}
                className="mt-5 flex items-center justify-center gap-1.5 text-[13px] font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors group"
              >
                <span>Details</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* ── RIGHT: Score Range Display (Integrity Dashboard Style) ── */}
          <div className="w-full flex-1 lg:border-l lg:border-slate-200 lg:dark:border-[var(--color-brand-darkBorder)] lg:pl-10 border-t border-slate-200 dark:border-[var(--color-brand-darkBorder)] pt-6 lg:border-t-0 lg:pt-0">
            
            <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4 sm:mb-5">
              Score Range
            </h3>

            <div className="space-y-2.5">
              {SCORE_RANGES.map((range) => {
                const isCurrent = targetScore >= range.min && targetScore <= range.max;
                
                return (
                  <div
                      key={range.label}
                      className={`flex items-center justify-between rounded-xl px-4 py-2.5 border
                                  transition-all duration-300
                                  ${isCurrent 
                                    ? "scale-[1.01] border-current shadow-lg" 
                                    : `border-slate-200 dark:border-[var(--color-brand-darkBorder)] ${range.bg} opacity-60 hover:opacity-100`}`}
                      style={{
                          backgroundColor: isCurrent ? range.color : undefined,
                          borderColor: isCurrent ? range.color : undefined,
                          boxShadow: isCurrent ? `0 0 18px ${range.color}40` : undefined,
                      }}
                  >
                      <div className="flex items-center gap-2.5">
                          <div
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: isCurrent ? "rgba(255,255,255,0.85)" : range.color }}
                          />
                          <span
                              className="text-sm font-semibold"
                              style={{ color: isCurrent ? "#fff" : range.color }}
                          >
                              {range.label}
                          </span>
                      </div>
                      <div className="flex items-center gap-2">
                          <span
                              className={isCurrent ? "text-xs font-mono text-white/80" : "text-xs font-mono text-slate-500 dark:text-slate-400"}
                          >
                              {range.range}
                          </span>
                      </div>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-6 leading-relaxed max-w-sm">
              The Plant Health Level summarizes operational condition across all integrities and module performances.
            </p>

          </div>

        </div>
      </div>
    </>
  );
}