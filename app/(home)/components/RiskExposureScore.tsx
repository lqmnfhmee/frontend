"use client";

import { useEffect, useState, useCallback } from "react";
import {
  AlertTriangle,
  TrendingUp,
  ClipboardCheck,
  ShieldAlert,
  Activity,
  BarChart3,
  ArrowRight,
  X,
} from "lucide-react";

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const RISK_SCORE = 82;

const riskExposureData = {
  score: RISK_SCORE,
  factors: [
    { label: "Active High Priority Anomalies", total: 5,  impact: -10, unit: "Active Items" },
    { label: "Anomaly Trend",                  total: 12, impact: -5,  unit: "Trend Score"  },
    { label: "Overdue Inspection",             total: 3,  impact: -10, unit: "Overdue Items" },
    { label: "SCE Assessment Coverage",        total: 90, impact: 5,   unit: "% Coverage"  },
    { label: "High Risk Assets",               total: 1,  impact: -3,  unit: "Assets"       },
    { label: "Inspection Completion Rate",     total: 95, impact: 5,   unit: "% Completed"  },
  ],
};

const factorIcons: Record<string, React.ElementType> = {
  "Active High Priority Anomalies": AlertTriangle,
  "Anomaly Trend":                  TrendingUp,
  "Overdue Inspection":             ClipboardCheck,
  "SCE Assessment Coverage":        BarChart3,
  "High Risk Assets":               ShieldAlert,
  "Inspection Completion Rate":     Activity,
};

// ─── Drawer data ───────────────────────────────────────────────────────────────

/**
 * Plant-wide score contributors shown inside the drawer.
 * Higher pct = healthier / lower risk contribution.
 */
const SCORE_BREAKDOWN: {
  label: string;
  pct: number;
  icon: React.ElementType;
  supporting: string;
}[] = [
  { label: "Inspection Health",       pct: 95, icon: Activity,     supporting: "Based on completion rate and due/overdue inspection status" },
  { label: "Coverage & Compliance",   pct: 90, icon: BarChart3,    supporting: "Based on SCE assessment coverage and compliance level"      },
  { label: "High Risk Asset Exposure",pct: 76, icon: ShieldAlert,  supporting: "Based on critical assets currently under risk monitoring"   },
  { label: "Overdue Action Exposure", pct: 72, icon: ClipboardCheck,supporting:"Based on overdue inspections or overdue actions"            },
  { label: "Anomaly Exposure",        pct: 68, icon: AlertTriangle, supporting:"Based on active high-priority anomalies and trend"          },
];

const TOP_DRIVERS = [
  { text: "5 active high-priority anomalies impacting plant risk", color: "#ef4444" },
  { text: "3 overdue inspections requiring immediate review",       color: "#f97316" },
  { text: "1 high-risk asset currently under active monitoring",   color: "#eab308" },
];

const RECOMMENDED_ACTIONS = [
  { label: "Review High Priority Anomalies", href: "/anomalies",           color: "#ef4444" },
  { label: "View Overdue Inspections",       href: "/inspection-management",color: "#f97316" },
  { label: "Review High Risk Assets",        href: "/integrity",            color: "#2F80ED" },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

function getRiskStatus(score: number) {
  if (score >= 80) return { label: "LOW RISK",    color: "#22c55e" };
  if (score >= 60) return { label: "MEDIUM RISK", color: "#facc15" };
  return                  { label: "HIGH RISK",   color: "#ef4444" };
}

function getFactorStatus(impact: number) {
  if (impact <= -8) return { label: "Investigate", color: "text-red-400",     bar: "bg-red-500"     };
  if (impact <= -4) return { label: "Review",      color: "text-orange-400",  bar: "bg-orange-500"  };
  if (impact  <  0) return { label: "Monitor",     color: "text-yellow-400",  bar: "bg-yellow-500"  };
  return                   { label: "Stable",      color: "text-emerald-400", bar: "bg-emerald-500" };
}

function getBreakdownStatus(pct: number) {
  if (pct >= 85) return { label: "Stable",   textColor: "text-emerald-400", barColor: "#22c55e", pillBg: "bg-emerald-500/10" };
  if (pct >= 70) return { label: "Monitor",  textColor: "text-yellow-400",  barColor: "#eab308", pillBg: "bg-yellow-500/10"  };
  if (pct >= 55) return { label: "Review",   textColor: "text-orange-400",  barColor: "#f97316", pillBg: "bg-orange-500/10"  };
  return                { label: "Critical", textColor: "text-red-400",     barColor: "#ef4444", pillBg: "bg-red-500/10"     };
}

// ─── Drawer Sub-components ─────────────────────────────────────────────────────

function BreakdownSliderRow({
  label, pct, icon: Icon, supporting, animate,
}: {
  label: string; pct: number; icon: React.ElementType; supporting: string; animate: boolean;
}) {
  const s = getBreakdownStatus(pct);
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <Icon size={12} className="text-slate-400 shrink-0" />
          <span className="text-xs font-medium text-slate-300 truncate">{label}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${s.pillBg} ${s.textColor}`}>
            {s.label}
          </span>
          <span className="text-xs font-bold tabular-nums text-slate-100 w-8 text-right">{pct}%</span>
        </div>
      </div>

      <div className="relative w-full h-1.5 rounded-full bg-slate-700/70 overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: animate ? `${pct}%` : "0%", backgroundColor: s.barColor }}
        />
      </div>

      <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{supporting}</p>
    </div>
  );
}

// ─── Score Drawer ──────────────────────────────────────────────────────────────

function RiskScoreDrawer({
  score,
  open,
  onClose,
}: {
  score: number;
  open: boolean;
  onClose: () => void;
}) {
  const status = getRiskStatus(score);
  const [slidersReady, setSlidersReady] = useState(false);

  // Animate sliders only after drawer opens
  useEffect(() => {
    if (!open) { setSlidersReady(false); return; }
    const t = setTimeout(() => setSlidersReady(true), 300);
    return () => clearTimeout(t);
  }, [open]);

  // Escape key closes
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
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Risk Exposure Score Breakdown"
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm
                    bg-slate-950 border-l border-slate-800
                    shadow-2xl shadow-black/60 flex flex-col
                    transition-transform duration-300 ease-out
                    ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-white">Risk Exposure Score Breakdown</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Plant-Wide · Overall Dashboard</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">

          {/* Score hero */}
          <div
            className="flex items-center gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900"
            style={{ boxShadow: `0 0 24px ${status.color}15` }}
          >
            <div className="text-5xl font-bold" style={{ color: status.color }}>{score}</div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: status.color }}>
                {status.label}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Risk Exposure Level</p>
              <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-emerald-400">
                <TrendingUp size={11} />Stable · Plant-Wide
              </span>
            </div>
          </div>

          {/* Score breakdown sliders */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">
              Score Breakdown
            </p>
            <div className="space-y-4">
              {SCORE_BREAKDOWN.map((item) => (
                <BreakdownSliderRow
                  key={item.label}
                  label={item.label}
                  pct={item.pct}
                  icon={item.icon}
                  supporting={item.supporting}
                  animate={slidersReady}
                />
              ))}
            </div>
          </div>

          {/* Top Drivers */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">
              Top Drivers
            </p>
            <div className="space-y-2">
              {TOP_DRIVERS.map(({ text, color }, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900 border border-slate-800"
                >
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color }} />
                  <p className="text-xs text-slate-300 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Actions */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">
              Recommended Actions
            </p>
            <div className="space-y-2">
              {RECOMMENDED_ACTIONS.map(({ label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900
                             hover:border-slate-600 transition-colors group"
                >
                  <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                    {label}
                  </span>
                  <ArrowRight
                    size={13}
                    style={{ color }}
                    className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                  />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function RiskExposureScore() {
  const [score, setScore] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer  = useCallback(() => setDrawerOpen(true),  []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setScore(current);
      if (current >= riskExposureData.score) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, []);

  const status       = getRiskStatus(score);
  const radius       = 52;
  const circumference = 2 * Math.PI * radius;
  const maxImpact    = Math.max(...riskExposureData.factors.map(f => Math.abs(f.impact)));

  return (
    <>
      <RiskScoreDrawer score={riskExposureData.score} open={drawerOpen} onClose={closeDrawer} />

      <div className="
        w-full rounded-xl p-4 sm:p-6 lg:p-8
        bg-white dark:bg-[var(--color-brand-darkCard)]
        border border-slate-200 dark:border-[var(--color-brand-darkBorder)]
        shadow-md shadow-slate-200/50 dark:shadow-none
        hover:shadow-lg hover:shadow-slate-200 dark:hover:shadow-none max-h-min
        transition-all duration-300
      ">
        <h2 className="text-lg font-semibold mb-4 sm:mb-6 text-slate-900 dark:text-slate-100">
          Risk Exposure Score
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start lg:items-center">

          {/* ── LEFT: Clickable gauge ── */}
          <div className="flex items-center gap-6 sm:gap-8 w-full lg:w-auto lg:shrink-0">

            {/* Donut ring — click to open drawer */}
            <button
              onClick={openDrawer}
              aria-label="View Risk Exposure Score Breakdown"
              className="relative w-32 h-32 sm:w-40 sm:h-40 shrink-0 rounded-full
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                         group cursor-pointer"
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
                className="absolute inset-0 rounded-full flex items-center justify-center
                           bg-black/0 group-hover:bg-black/20 transition-colors duration-200"
                aria-hidden
              >
                <span className="text-[9px] font-bold tracking-widest text-white/0 group-hover:text-white/80 transition-colors duration-200 uppercase">
                  View Details
                </span>
              </div>
            </button>

            <div>
              <p className="text-base sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
                {score}% Risk Exposure Level
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Current Risk Status:{" "}
                <span className="ml-1 font-bold" style={{ color: status.color }}>
                  {status.label}
                </span>
              </p>

              {/* Click-to-explain prompt */}
              <button
                onClick={openDrawer}
                className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium
                           text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300
                           transition-colors underline-offset-2 hover:underline"
              >
                <span>Why this score?</span>
                <ArrowRight size={11} />
              </button>
            </div>
          </div>

          {/* ── RIGHT: Factor cards (original layout) ── */}
          <div className="w-full lg:border-l lg:border-slate-200 lg:dark:border-[var(--color-brand-darkBorder)] lg:pl-10 border-t border-slate-200 dark:border-[var(--color-brand-darkBorder)] pt-4 lg:border-t-0 lg:pt-0">

            <h3 className="text-sm font-semibold border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] pb-2 mb-4 text-slate-700 dark:text-slate-300">
              FACTORS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {riskExposureData.factors.map((factor) => {
                const Icon        = factorIcons[factor.label];
                const barWidth    = (Math.abs(factor.impact) / maxImpact) * 100;
                const factorStatus = getFactorStatus(factor.impact);

                return (
                  <div
                    key={factor.label}
                    className="
                      rounded-lg p-3
                      bg-slate-50 dark:bg-slate-800
                      border border-slate-200 dark:border-[var(--color-brand-darkBorder)]
                      hover:bg-white dark:hover:bg-[var(--color-brand-darkHover)]
                      transition-colors duration-200
                    "
                  >
                    {/* Icon + label */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="
                        w-8 h-8 rounded-md shrink-0
                        bg-white dark:bg-slate-700
                        border border-slate-200 dark:border-slate-600
                        flex items-center justify-center
                      ">
                        <Icon size={16} className="text-slate-600 dark:text-slate-300" />
                      </div>
                      <span className="font-medium text-slate-900 dark:text-slate-100 leading-tight">
                        {factor.label}
                      </span>
                    </div>

                    {/* Value + status */}
                    <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">
                      <span>{factor.total} {factor.unit}</span>
                      <span className={`font-semibold ${factorStatus.color}`}>{factorStatus.label}</span>
                    </div>

                    {/* Impact bar */}
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${factorStatus.bar}`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
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