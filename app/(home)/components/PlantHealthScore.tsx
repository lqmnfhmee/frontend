"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  ArrowRight, 
  X, 
  Info, 
  HelpCircle, 
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import { useSearchParams } from "next/navigation";

// ─── Constants & Types ─────────────────────────────────────────────────────────

const MODULE_WEIGHTS = {
  asset_performance: 0.10,
  sce_performance: 0.20,
  inspection_management: 0.25,
  rbi: 0.25,
  anomaly_management: 0.20,
};

const HEALTH_THRESHOLD = 85;

const SCORE_RANGES = [
  { label: "Healthy", range: "85 – 100", min: 85, max: 100, color: "#22c55e", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  { label: "Degrading", range: "60 – 84", min: 60, max: 84, color: "#eab308", bg: "bg-yellow-50 dark:bg-yellow-500/10" },
  { label: "Critical", range: "0 – 59", min: 0, max: 59, color: "#ef4444", bg: "bg-red-50 dark:bg-red-500/10" },
];

interface Indicator {
  label: string;
  value: string;
  statusColor?: string;
}

interface ModuleData {
  id: string;
  title: string;
  weight: number;
  scoreValue: number;
  indicators: Indicator[];
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const INITIAL_MODULES: ModuleData[] = [
  {
    id: "asset_performance",
    title: "Asset Performance",
    weight: 10,
    scoreValue: 88,
    indicators: [
      { label: "Asset Operational Status", value: "Normal", statusColor: "text-emerald-600 dark:text-emerald-400" },
      { label: "Asset Availability Indicators", value: "94.5%" }
    ]
  },
  {
    id: "sce_performance",
    title: "SCE Performance",
    weight: 20,
    scoreValue: 75,
    indicators: [
      { label: "SCE Testing Compliance", value: "82%" },
      { label: "Overdue SCE Tests", value: "3 Overdue", statusColor: "text-red-600 dark:text-red-400" },
      { label: "SCE Performance Standard Status", value: "Needs Review", statusColor: "text-yellow-600 dark:text-yellow-400" }
    ]
  },
  {
    id: "inspection_management",
    title: "Inspection Management",
    weight: 25,
    scoreValue: 92,
    indicators: [
      { label: "Inspection Compliance", value: "98%", statusColor: "text-emerald-600 dark:text-emerald-400" },
      { label: "Overdue Inspections", value: "2" },
      { label: "Inspection Completion Status", value: "On Track", statusColor: "text-emerald-600 dark:text-emerald-400" },
      { label: "Upcoming Inspection Schedule", value: "5 Planned" }
    ]
  },
  {
    id: "rbi",
    title: "Risk-Based Inspection (RBI)",
    weight: 25,
    scoreValue: 68,
    indicators: [
      { label: "Risk Matrix Evaluation Status", value: "Current", statusColor: "text-emerald-600 dark:text-emerald-400" },
      { label: "High-Risk Asset Count", value: "12 High Risk", statusColor: "text-orange-600 dark:text-orange-400" },
      { label: "RBI Coverage Percentage", value: "88%" },
      { label: "Inspection Prioritization", value: "Active", statusColor: "text-emerald-600 dark:text-emerald-400" }
    ]
  },
  {
    id: "anomaly_management",
    title: "Anomaly Management",
    weight: 20,
    scoreValue: 80,
    indicators: [
      { label: "Open Anomalies", value: "5 Active", statusColor: "text-red-600 dark:text-red-400" },
      { label: "Deferred Anomalies", value: "8 Deferred", statusColor: "text-yellow-600 dark:text-yellow-400" },
      { label: "Completed Anomalies", value: "14 Closed", statusColor: "text-emerald-600 dark:text-emerald-400" },
      { label: "High-Priority Anomaly Exposure", value: "High", statusColor: "text-orange-600 dark:text-orange-400" }
    ]
  }
];

function getStatusByScore(score: number) {
  if (score >= 85) return { label: "Healthy", color: "#22c55e" };
  if (score >= 60) return { label: "Degrading", color: "#eab308" };
  return { label: "Critical", color: "#ef4444" };
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function FormulaModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Info size={20} className="text-blue-500" />
            Score Calculation Formula
          </h3>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="p-5 bg-blue-50/30 dark:bg-blue-900/10 rounded-xl border border-blue-100/50 dark:border-blue-900/20">
            <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Mathematical Definition</p>
            <div className="font-mono text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Plant Health Score = <br />
              <div className="pl-4 mt-2 space-y-1 text-slate-500 dark:text-slate-400">
                <span className="text-blue-600/80 dark:text-blue-400/80">(Asset Perf. × 10%)</span> + <br />
                <span className="text-blue-600/80 dark:text-blue-400/80">(SCE Perf. × 20%)</span> + <br />
                <span className="text-blue-600/80 dark:text-blue-400/80">(Insp. Mgmt × 25%)</span> + <br />
                <span className="text-blue-600/80 dark:text-blue-400/80">(RBI × 25%)</span> + <br />
                <span className="text-blue-600/80 dark:text-blue-400/80">(Anomaly Mgmt × 20%)</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weighted Allocation</p>
            <div className="grid grid-cols-1 gap-2">
              {INITIAL_MODULES.map((m) => (
                <div key={m.id} className="flex justify-between items-center text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-400">{m.title}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{m.weight}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 text-[11px] text-slate-500 dark:text-slate-500 italic border-t border-slate-100 dark:border-slate-800">
          * Each module contributes its internal score multiplied by its assigned weight to create the final Plant Health Score.
        </div>
      </div>
    </div>
  );
}

function BreakdownAccordionItem({ 
  title, weight, scoreValue, indicators, isOpen, onToggle, isHighlighted
}: { 
  title: string; weight: number; scoreValue: number; indicators: Indicator[]; isOpen: boolean; onToggle: () => void; isHighlighted?: boolean;
}) {
  const contribution = (scoreValue * weight) / 100;
  const isImpacted = scoreValue < HEALTH_THRESHOLD;
  const barColor = scoreValue >= 85 ? "bg-emerald-500" : scoreValue >= 60 ? "bg-yellow-500" : "bg-red-500";
  
  return (
    <div className={`transition-all duration-500 rounded-xl overflow-hidden border ${
      isHighlighted 
        ? 'ring-2 ring-emerald-500/50 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)] bg-emerald-500/5' 
        : isOpen 
          ? 'bg-slate-50/80 dark:bg-slate-800/60 border-slate-200 dark:border-white/10 shadow-lg' 
          : 'bg-white dark:bg-slate-900/40 border-slate-100 dark:border-white/5 shadow-sm'
    }`}>
      <button 
        onClick={onToggle}
        className="w-full text-left px-5 py-5 focus:outline-none group transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100">{title}</span>
                {isImpacted && (
                  <span className="flex items-center gap-1 text-[9px] font-bold text-red-600 dark:text-red-400 bg-red-100/50 dark:bg-red-500/10 px-1.5 py-0.5 rounded-full border border-red-200/50 dark:border-red-500/20 uppercase tracking-tighter">
                    <AlertTriangle size={8} /> Impacting
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-500">
                <span>Score: {scoreValue}%</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span>Wt: {weight}%</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-slate-900 dark:text-slate-300 font-bold">+{contribution.toFixed(1)}%</span>
              </div>
            </div>
            
            <div className="shrink-0 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>

          <div className="h-1 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden">
            <div 
              className={`h-full ${barColor} transition-all duration-1000 ease-out`} 
              style={{ width: `${scoreValue}%` }} 
            />
          </div>
        </div>
      </button>
      
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-5 pb-6 pt-2 bg-slate-100/50 dark:bg-black/20 border-t border-slate-200/50 dark:border-white/5 space-y-4">
            <div className="flex items-center gap-1.5 border-b border-slate-200/50 dark:border-white/5 pb-2">
              <HelpCircle size={10} className="text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Score Drivers
              </span>
            </div>
            <div className="space-y-3">
              {indicators.map((ind, idx) => (
                <div key={idx} className="flex justify-between items-center text-[13px]">
                  <span className="text-slate-500 dark:text-slate-400 leading-none">{ind.label}</span>
                  <span className={`font-semibold leading-none ${ind.statusColor || 'text-slate-900 dark:text-slate-200'}`}>
                    {ind.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Score Breakdown Drawer ────────────────────────────────────────────────────

function ScoreBreakdownDrawer({
  score,
  modules,
  open,
  onClose,
  highlightedModuleId,
  showVisualGlow,
}: {
  score: number;
  modules: ModuleData[];
  open: boolean;
  onClose: () => void;
  highlightedModuleId?: string | null;
  showVisualGlow?: boolean;
}) {
  const status = getStatusByScore(score);
  const [openSection, setOpenSection] = useState<string | null>("asset_performance");

  useEffect(() => {
    if (highlightedModuleId) {
      setOpenSection(highlightedModuleId);
    }
  }, [highlightedModuleId]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <>
      <div
        aria-hidden
        className={`fixed inset-0 z-[80] bg-slate-900/40 dark:bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        role="dialog"
        className={`fixed top-14 right-0 z-[150] h-[calc(100vh-3.5rem)] w-full max-w-md
                    bg-white dark:bg-[var(--color-brand-darkCard)]
                    border-l border-slate-200 dark:border-[var(--color-brand-darkBorder)]
                    shadow-2xl flex flex-col
                    transition-transform duration-300 ease-out
                    ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-6 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Score Breakdown</h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 uppercase tracking-wide font-medium">Detailed Module Performance</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-10">
          <div className="flex items-center gap-6 p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-white/10 shadow-lg">
             <div className="space-y-0.5">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Aggregate</p>
              <div className="text-3xl font-black tabular-nums" style={{ color: status.color }}>{score}</div>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800/80" />
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Condition</p>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white shadow-sm" style={{ backgroundColor: status.color }}>
                {status.label}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 px-1 mb-4">
              Module Contributions
            </h3>
            <div className="space-y-2.5">
              {modules.map((section) => (
                <BreakdownAccordionItem
                  key={section.id}
                  title={section.title}
                  weight={section.weight}
                  scoreValue={section.scoreValue}
                  indicators={section.indicators}
                  isOpen={openSection === section.id}
                  onToggle={() => setOpenSection(openSection === section.id ? null : section.id)}
                  isHighlighted={showVisualGlow && highlightedModuleId === section.id}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6 mt-auto space-y-3">
          {highlightedModuleId === "asset_performance" && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider animate-pulse">
              <ExternalLink size={12} />
              Source: Asset Management Dashboard
            </div>
          )}
          <div className="p-4 rounded-xl bg-blue-50/30 dark:bg-blue-900/10 border border-blue-200/20 flex items-start gap-3">
             <Info size={14} className="text-blue-500 mt-0.5 shrink-0" />
             <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
               This score represents the weighted average of real-time integrity and performance indicators. "Impacting" areas are those performing below the health threshold of {HEALTH_THRESHOLD}%.
             </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function PlantHealthScore() {
  const searchParams = useSearchParams();
  const [currentDisplayScore, setCurrentDisplayScore] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formulaOpen, setFormulaOpen] = useState(false);
  const [highlightedModule, setHighlightedModule] = useState<string | null>(null);

  const highlightParam = searchParams.get("highlight");

  useEffect(() => {
    if (highlightParam === "asset_performance") {
      setDrawerOpen(true);
      setHighlightedModule("asset_performance");
      
      const timer = setTimeout(() => {
        // We keep the highlightedModule for the source label, 
        // but we'll use a separate state or just a longer duration for the "fading" part if needed.
        // For now, let's just make the highlight fade but keep the label.
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [highlightParam]);

  // Let's add a separate state for the visual highlight glow to make it "temporary"
  const [showVisualGlow, setShowVisualGlow] = useState(false);
  useEffect(() => {
    if (highlightParam === "asset_performance") {
      setShowVisualGlow(true);
      const timer = setTimeout(() => setShowVisualGlow(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [highlightParam]);

  const modules = INITIAL_MODULES;

  const finalScoreValue = useMemo(() => {
    return Math.round(
      modules.reduce((acc, m) => acc + (m.scoreValue * m.weight) / 100, 0)
    );
  }, [modules]);

  const status = getStatusByScore(finalScoreValue);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= finalScoreValue) {
        setCurrentDisplayScore(finalScoreValue);
        clearInterval(interval);
      } else {
        setCurrentDisplayScore(current);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [finalScoreValue]);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  return (
    <>
      <ScoreBreakdownDrawer 
        score={finalScoreValue} 
        modules={modules} 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        highlightedModuleId={highlightedModule}
        showVisualGlow={showVisualGlow}
      />
      
      <FormulaModal 
        isOpen={formulaOpen} 
        onClose={() => setFormulaOpen(false)} 
      />

      <div 
        id="plant-health-score-card"
        className="
        w-full rounded-2xl p-6 sm:p-8
        bg-white dark:bg-[var(--color-brand-darkCard)]/80
        border border-slate-200 dark:border-white/10
        shadow-lg transition-all duration-300
      ">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Plant Health Score
          </h2>
          <button 
            onClick={() => setFormulaOpen(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all p-1.5"
          >
            <Info size={14} />
            <span className="hidden sm:inline">How is this calculated?</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Gauge & Status ── */}
          <div className="flex flex-col items-center text-center sm:text-left sm:flex-row gap-10 w-full lg:w-auto">
            
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative w-36 h-36 shrink-0 group cursor-pointer transition-transform hover:scale-105 active:scale-95 duration-500"
            >
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="50%" cy="50%" r={radius}
                  strokeWidth="8"
                  stroke="currentColor"
                  className="text-slate-100 dark:text-slate-800/50"
                  fill="transparent"
                />
                <circle
                  cx="50%" cy="50%" r={radius}
                  strokeWidth="8"
                  stroke={status.color}
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={(1 - currentDisplayScore / 100) * circumference}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black tabular-nums" style={{ color: status.color }}>
                  {currentDisplayScore}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  Health
                </span>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-white/10 dark:bg-black/10 backdrop-blur-[1px] rounded-full transition-all duration-300">
                  <span className="text-[9px] font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full shadow-lg border border-slate-200 dark:border-slate-700">
                    DETAILS
                  </span>
                </div>
              </div>
            </button>

            <div className="flex flex-col items-center sm:items-start space-y-5">
              <div className="space-y-1">
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-none">
                  {status.label}
                </p>
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <TrendingUp size={12} className="text-emerald-500" />
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tight">
                    Performance Stable
                  </span>
                </div>
              </div>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[240px] leading-relaxed">
                The score integrates asset integrity, safety standards, and management compliance data.
              </p>

              <button 
                onClick={() => setDrawerOpen(true)}
                className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
              >
                <span>Score Breakdown</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* ── RIGHT: Score Range ── */}
          <div className="w-full flex-1 space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 px-1">
              Health Classification
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {SCORE_RANGES.map((range) => {
                const isCurrent = finalScoreValue >= range.min && finalScoreValue <= range.max;
                
                return (
                  <div
                      key={range.label}
                      className={`flex items-center justify-between rounded-xl px-5 py-4 transition-all duration-300 border ${
                        isCurrent 
                          ? "bg-emerald-50/5 dark:bg-emerald-500/[0.03] border-emerald-500/20 dark:border-emerald-500/20 shadow-md" 
                          : "bg-white dark:bg-slate-900/20 border-slate-100 dark:border-white/5 opacity-40 shadow-sm"
                      }`}
                  >
                      <div className="flex items-center gap-4">
                          <div
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ 
                                backgroundColor: range.color,
                                boxShadow: isCurrent ? `0 0 10px ${range.color}` : 'none'
                              }}
                          />
                          <span className={`text-sm font-bold ${isCurrent ? "text-slate-900 dark:text-white" : "text-slate-500"}`}>
                            {range.label}
                          </span>
                      </div>
                      <span className={`text-[12px] font-mono font-medium ${isCurrent ? "text-slate-700 dark:text-slate-400" : "text-slate-400"}`}>
                        {range.range}
                      </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}