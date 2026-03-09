"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    PieChart, Pie, Cell,
    LineChart, Line,
} from "recharts";
import {
    ShieldAlert, AlertTriangle, CalendarClock, AlertCircle,
    Download, FileSpreadsheet, FileText, TrendingDown, CheckCircle2,
    X, Info, ArrowRight, TrendingUp, Settings2,
} from "lucide-react";
import { loadPreferences, savePreferences, resetPreferences } from "@/app/integrity/utils/dashboard-preferences";
import { WIDGET_REGISTRY } from "@/app/integrity/utils/widget-registry";
import CustomizeModal from "@/app/integrity/components/CustomizeModal";

// ─── Mock Data ───────────────────────────────────────────────────────────────

// POF (row) × COF (col) risk level matrix — rows: POF 5→1, cols: A→E
type RiskLevel = "Low" | "Medium" | "High" | "Very High";

const RISK_LEVELS: Record<"row" | "col", string[]> = {
    row: ["5", "4", "3", "2", "1"],
    col: ["A", "B", "C", "D", "E"],
};

// Color for each cell based on POF/COF intersection
const riskMatrix: RiskLevel[][] = [
    ["Medium", "High", "Very High", "Very High", "Very High"], // POF 5
    ["Low", "Medium", "High", "Very High", "Very High"], // POF 4
    ["Low", "Low", "Medium", "High", "Very High"], // POF 3
    ["Low", "Low", "Low", "Medium", "High"],      // POF 2
    ["Low", "Low", "Low", "Low", "Medium"],    // POF 1
];

const riskLevelColor: Record<RiskLevel, string> = {
    "Low": "#22c55e",
    "Medium": "#eab308",
    "High": "#f97316",
    "Very High": "#ef4444",
};

// Equipment counts per cell [POF row 5→1][COF col A→E]
const riskMatrixCounts: Record<string, number[][]> = {
    Total: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
    ],
    Vessel: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
    ],
    Piping: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
};

const riskTabs = ["Total", "Vessel", "Piping"];

const inspectionCompliance = [
    { name: "Completed", value: 12, color: "#22c55e" },
    { name: "Scheduled", value: 8, color: "#6366f1" },
    { name: "Due Soon", value: 3, color: "#eab308" },
    { name: "Overdue", value: 1, color: "#ef4444" },
];

const anomalyPriority = [
    { name: "P1", total: 1, active: 1, completed: 0, fill: "#ef4444" },
    { name: "P2", total: 1, active: 1, completed: 0, fill: "#f97316" },
    { name: "P3", total: 2, active: 2, completed: 0, fill: "#eab308" },
    { name: "P4", total: 1, active: 1, completed: 0, fill: "#22c55e" },
];

const inspectionTimeline = [
    { name: "Week 1–4", value: 3 },
    { name: "Week 5–8", value: 4 },
    { name: "Week 9–12", value: 2 },
    { name: "90–180 days", value: 5 },
];

const riskTrend = [
    { month: "Mar", score: 72 },
    { month: "Apr", score: 69 },
    { month: "May", score: 74 },
    { month: "Jun", score: 70 },
    { month: "Jul", score: 75 },
    { month: "Aug", score: 78 },
    { month: "Sep", score: 76 },
    { month: "Oct", score: 80 },
    { month: "Nov", score: 79 },
    { month: "Dec", score: 82 },
    { month: "Jan", score: 83 },
    { month: "Feb", score: 85 },
];

const alerts = [
    { id: 1, icon: ShieldAlert, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10", border: "border-red-100 dark:border-red-500/20", text: "1 High-risk equipment detected in RBI assessment", level: "High" },
    { id: 2, icon: CalendarClock, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-100 dark:border-amber-500/20", text: "1 inspection is overdue — immediate action required", level: "Warning" },
    { id: 3, icon: AlertCircle, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10", border: "border-orange-100 dark:border-orange-500/20", text: "2 P2 anomalies remain unresolved past target date", level: "Warning" },
    { id: 4, icon: TrendingDown, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20", text: "1 equipment with remaining life < 3 years identified", level: "Info" },
];

// ─── Score config —————————————————————————————————————————————————————
const SCORE = 85;

// ─── Score breakdown mock data ————————————————————————————————————————

const SCORE_BREAKDOWN = [
    { label: "RBI Risk", pct: 88, color: "#6366f1", icon: ShieldAlert, sub: "1 High-risk equipment item" },
    { label: "Inspection Compliance", pct: 75, color: "#22c55e", icon: CalendarClock, sub: "50% compliance rate" },
    { label: "Anomalies", pct: 80, color: "#f97316", icon: AlertCircle, sub: "5 open, 2 P1/P2" },
    { label: "Remaining Life", pct: 90, color: "#eab308", icon: AlertTriangle, sub: "1 asset < 3 yrs" },
];

const TOP_DRIVERS = [
    { text: "1 high-risk equipment item identified in RBI assessment", color: "#ef4444" },
    { text: "Inspection compliance below target (50% vs 80% KPI)", color: "#f97316" },
    { text: "2 P1/P2 anomalies unresolved past target closure date", color: "#eab308" },
];

const RECOMMENDED_ACTIONS = [
    { label: "View High Risk Equipment", href: "/integrity/rbi", color: "#ef4444" },
    { label: "View Overdue / Due Soon Inspections", href: "/inspections", color: "#f97316" },
    { label: "View P1/P2 Anomalies", href: "/integrity/anomalies", color: "#6366f1" },
];

const LAST_CALCULATED = "04 Mar 2026, 10:42";
const SCORE_CHANGE = "+3 this month";

function getScoreStatus(score: number) {
    if (score >= 90) return { label: "OPTIMAL", color: "#22c55e", ring: "#dcfce7", dark: "#16a34a" };
    if (score >= 75) return { label: "HEALTHY", color: "#6366f1", ring: "#e0e7ff", dark: "#4f46e5" };
    if (score >= 60) return { label: "ATTENTION", color: "#eab308", ring: "#fef9c3", dark: "#ca8a04" };
    return { label: "CRITICAL", color: "#ef4444", ring: "#fee2e2", dark: "#b91c1c" };
}

// ─── Score Range Definitions ─────────────────────────────────────────────────

const SCORE_RANGES = [
    { label: "Optimal", bandLabel: "OPTIMAL", range: "90 – 100", min: 90, max: 100, color: "#22c55e", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Healthy", bandLabel: "HEALTHY", range: "75 – 89", min: 75, max: 89, color: "#6366f1", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
    { label: "Attention", bandLabel: "ATTENTION", range: "60 – 74", min: 60, max: 74, color: "#eab308", bg: "bg-yellow-50 dark:bg-yellow-500/10" },
    { label: "Critical", bandLabel: "CRITICAL", range: "< 60", min: 0, max: 59, color: "#ef4444", bg: "bg-red-50 dark:bg-red-500/10" },
];

// ─── Count-up hook (matches RiskExposureScore: +1 every 40ms) ────────────────────

function useCountUp(target: number) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            current += 1;
            setValue(current);
            if (current >= target) clearInterval(interval);
        }, 40);
        return () => clearInterval(interval);
    }, [target]);
    return value;
}

// ─── Gauge SVG Component ──────────────────────────────────────────────────────

function GaugeIndicator({
    score,
    highlightedBand = null,
}: {
    score: number | null | undefined;
    highlightedBand?: string | null;
}) {
    const isEmpty = score === null || score === undefined;
    const safeScore = isEmpty ? 0 : score;
    const status = getScoreStatus(safeScore);

    const cx = 110;
    const cy = 110;
    const radius = 82;
    const gaugeStart = 225;   // degrees clockwise from 12 o'clock
    const gaugeTotal = 270;   // total arc span in degrees

    // Counter — +1 every 40ms exactly like RiskExposureScore
    const animatedScore = useCountUp(isEmpty ? 0 : safeScore);

    function toXY(angleDeg: number) {
        const rad = (angleDeg - 90) * (Math.PI / 180);
        return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
    }

    function arcPath(start: number, sweep: number) {
        const clamped = Math.max(0.01, sweep);
        const s = toXY(start);
        const e = toXY(start + clamped);
        const large = clamped > 180 ? 1 : 0;
        return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${radius} ${radius} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
    }

    // Pre-compute the total fill arc path and its approximate length
    // Arc length for a 270° arc: 2πr × (270/360)
    const fullArcPath = arcPath(gaugeStart, gaugeTotal);
    const arcLength = 2 * Math.PI * radius * (gaugeTotal / 360);

    // strokeDashoffset drives fill exactly like RiskExposureScore:
    // offset = arcLength × (1 - score/100), CSS transitions it smoothly
    const dashOffset = arcLength * (1 - animatedScore / 100);

    // Compute per-band arc segments for the track
    const bandSegments = SCORE_RANGES.slice().reverse().map((r) => ({
        ...r,
        start: gaugeStart + (r.min / 100) * gaugeTotal,
        sweep: ((r.max - r.min + 1) / 100) * gaugeTotal,
    }));

    return (
        <svg viewBox="0 0 220 195" className="w-full max-w-[240px]" aria-hidden="true">
            {/* Track — grey base */}
            <path
                d={fullArcPath}
                fill="none"
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-700"
                strokeWidth={14}
                strokeLinecap="round"
            />

            {/* Band highlight segments */}
            {bandSegments.map((seg) => {
                const isHighlighted = highlightedBand === seg.bandLabel;
                return (
                    <path
                        key={seg.label}
                        d={arcPath(seg.start, seg.sweep)}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth={isHighlighted ? 14 : 6}
                        strokeLinecap="butt"
                        style={{
                            opacity: isHighlighted ? 0.9 : highlightedBand ? 0.1 : 0.18,
                            transition: "opacity 300ms ease, stroke-width 300ms ease",
                            filter: isHighlighted ? `drop-shadow(0 0 8px ${seg.color}90)` : "none",
                        }}
                    />
                );
            })}

            {/* Fill arc — strokeDashoffset animation (same as RiskExposureScore) */}
            {!isEmpty && (
                <path
                    d={fullArcPath}
                    fill="none"
                    stroke={status.color}
                    strokeWidth={14}
                    strokeLinecap="round"
                    strokeDasharray={arcLength}
                    strokeDashoffset={dashOffset}
                    style={{
                        filter: `drop-shadow(0 0 6px ${status.color}80)`,
                        transition: "stroke-dashoffset 1000ms ease, stroke 300ms ease",
                    }}
                />
            )}

            {/* Centre text */}
            {isEmpty ? (
                <>
                    <text x={cx} y={cy} textAnchor="middle" fill="#64748b" fontSize={13} fontWeight={500}>
                        No Data
                    </text>
                </>
            ) : (
                <>
                    <text x={cx} y={cy - 8} textAnchor="middle" fill={status.color} fontSize={34} fontWeight={700}>
                        {animatedScore}
                    </text>
                    <text x={cx} y={cy + 16} textAnchor="middle" fill={status.color} fontSize={11} fontWeight={600} letterSpacing={2}>
                        {status.label}
                    </text>
                </>
            )}
        </svg>
    );
}

// ─── Gauge Tooltip (compact hover popover) ────────────────────────────────────

function GaugeTooltip({
    score,
    visible,
    highlightedBand,
}: {
    score: number | null | undefined;
    visible: boolean;
    highlightedBand?: string | null;
}) {
    const isEmpty = score === null || score === undefined;
    const safeScore = isEmpty ? 0 : score;
    const status = getScoreStatus(safeScore);

    // Build the range label string for the current status
    const rangeInfo = SCORE_RANGES.find(r => r.bandLabel === status.label);
    const statusLabel = rangeInfo
        ? `${rangeInfo.label} (range ${rangeInfo.range})`
        : status.label;

    // If a band is highlighted, show that band's label instead
    const activeBandLabel = highlightedBand
        ? SCORE_RANGES.find(r => r.bandLabel === highlightedBand)?.label ?? status.label
        : statusLabel;

    // Extract time from LAST_CALCULATED (format: "DD Mon YYYY, HH:MM")
    const lastSync = LAST_CALCULATED.split(", ")[1] ?? LAST_CALCULATED;

    return (
        <div
            role="tooltip"
            className={`absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-50 w-52
                        bg-slate-900 border border-slate-700/80 rounded-xl
                        shadow-2xl shadow-black/50 p-3.5 pointer-events-none
                        transition-all duration-200 ${visible ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-1.5 invisible"
                }`}
        >
            {isEmpty ? (
                <p className="text-xs text-slate-400 text-center">No integrity data available</p>
            ) : (
                <>
                    {/* Title row */}
                    <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            Integrity Score
                        </span>
                        <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: status.color }}
                        >
                            {status.label}
                        </span>
                    </div>

                    {/* Info rows */}
                    <div className="space-y-1.5">
                        {([
                            ["Score", `${safeScore} / 100`],
                            ["Status", activeBandLabel],
                            ["Program Status", "STABLE"],
                            ["Last Sync", lastSync],
                            ["Change", SCORE_CHANGE],
                        ] as [string, string][]).map(([key, val]) => (
                            <div key={key} className="flex items-center justify-between gap-3">
                                <span className="text-[10px] text-slate-500 shrink-0">{key}</span>
                                <span
                                    className="text-[10px] font-semibold text-slate-200 text-right"
                                    style={key === "Change" ? { color: "#34d399" }
                                        : key === "Score" ? { color: status.color }
                                            : {}}
                                >
                                    {val}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}
            {/* Caret */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0
                            border-l-[6px] border-r-[6px] border-t-[6px]
                            border-l-transparent border-r-transparent border-t-slate-700" />
        </div>
    );
}

// ─── Score Drawer (click panel) ───────────────────────────────────────────────

function ScoreDrawer({ score, open, onClose }: { score: number; open: boolean; onClose: () => void }) {
    const status = getScoreStatus(score);

    // Keyboard: Esc closes
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
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />
            {/* Drawer panel */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Integrity Score Breakdown"
                className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm
                            bg-slate-950 border-l border-slate-800
                            shadow-2xl shadow-black/60 flex flex-col
                            transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"
                    }`}>

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
                    <div>
                        <h2 className="text-sm font-semibold text-white">Integrity Score Breakdown</h2>
                        <p className="text-[11px] text-slate-400 mt-0.5">Larut-A (LRA) · {LAST_CALCULATED}</p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close drawer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                        <X size={16} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">

                    {/* Score hero */}
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900"
                        style={{ boxShadow: `0 0 24px ${status.color}20` }}>
                        <div className="text-5xl font-bold" style={{ color: status.color }}>{score}</div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: status.color }}>{status.label}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">Program Status: STABLE</p>
                            <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-emerald-400">
                                <TrendingUp size={11} />{SCORE_CHANGE}
                            </span>
                        </div>
                    </div>

                    {/* Score breakdown cards */}
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Score Breakdown</p>
                        <div className="grid grid-cols-2 gap-3">
                            {SCORE_BREAKDOWN.map(({ label, pct, color, icon: Icon, sub }) => (
                                <div key={label} className="p-3 rounded-xl border border-slate-800 bg-slate-900 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <Icon size={14} style={{ color }} />
                                        <span className="text-sm font-bold" style={{ color }}>{pct}%</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
                                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
                                    </div>
                                    <p className="text-[10px] font-semibold text-slate-300">{label}</p>
                                    <p className="text-[10px] text-slate-500">{sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Drivers */}
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Top Drivers</p>
                        <div className="space-y-2.5">
                            {TOP_DRIVERS.map(({ text, color }, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
                                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
                                    <p className="text-xs text-slate-300 leading-relaxed">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommended Actions */}
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Recommended Actions</p>
                        <div className="space-y-2">
                            {RECOMMENDED_ACTIONS.map(({ label, href, color }) => (
                                <a
                                    key={label}
                                    href={href}
                                    className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900
                                               hover:border-slate-600 transition-colors group">
                                    <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">{label}</span>
                                    <ArrowRight size={13} style={{ color }} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

// ─── Interactive Gauge Wrapper ────────────────────────────────────────────────

function InteractiveGauge({
    score,
    onOpen,
    highlightedBand,
}: {
    score: number | null | undefined;
    onOpen: () => void;
    highlightedBand: string | null;
}) {
    const [hovered, setHovered] = useState(false);
    const safeScore = score ?? 0;
    const status = getScoreStatus(safeScore);

    return (
        <div className="relative flex flex-col items-center gap-2">
            {/* Tooltip */}
            <GaugeTooltip score={score} visible={hovered} highlightedBand={highlightedBand} />

            {/* Hit area: hover + click + keyboard */}
            <div
                role="button"
                tabIndex={0}
                aria-label="View Integrity Score Breakdown"
                className="relative cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ "--tw-ring-color": status.color } as React.CSSProperties}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={onOpen}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } }}
            >
                <GaugeIndicator score={score} highlightedBand={highlightedBand} />
            </div>

            {/* Program Status pill */}
            <div
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border cursor-pointer select-none"
                style={{ color: status.color, borderColor: `${status.color}40`, backgroundColor: `${status.color}12` }}
                onClick={onOpen}
            >
                Program Status: STABLE
            </div>
        </div>
    );
}


// ─── Animated Compliance Donut ───────────────────────────────────────────────

const DONUT_ANIM_CSS = `
@keyframes arcWipe {
  from { stroke-dashoffset: var(--arc-len); }
  to   { stroke-dashoffset: 0; }
}
@keyframes labelFadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
.arc-segment {
  animation: arcWipe var(--dur, 0.8s) cubic-bezier(0.4,0,0.2,1) var(--delay, 0s) both;
}
.arc-label {
  animation: labelFadeIn 0.4s ease var(--label-delay, 1s) both;
}
`;

function AnimatedComplianceDonut({
    data,
    compliancePct,
}: {
    data: { name: string; value: number; color: string }[];
    compliancePct: number;
}) {
    const SIZE = 220;          // SVG canvas size
    const cx = SIZE / 2;     // centre x
    const cy = SIZE / 2;     // centre y
    const R = 78;           // outer radius
    const r = 52;           // inner radius
    const GAP = 3;            // gap between segments in degrees

    const total = data.reduce((s, d) => s + d.value, 0);

    // Build arc segments
    let cursor = -90; // start from 12 o'clock
    const segments = data.map((d, i) => {
        const sweep = (d.value / total) * 360 - GAP;
        const start = cursor;
        cursor += sweep + GAP;
        const mid = start + sweep / 2; // midpoint angle for label placement

        // Convert angle to radians
        const toRad = (deg: number) => (deg * Math.PI) / 180;

        // Arc path helpers
        const pt = (radius: number, deg: number) => ({
            x: cx + radius * Math.cos(toRad(deg)),
            y: cy + radius * Math.sin(toRad(deg)),
        });

        const s1 = pt(R, start); const e1 = pt(R, start + sweep);
        const s2 = pt(r, start + sweep); const e2 = pt(r, start);
        const large = sweep > 180 ? 1 : 0;

        const path =
            `M ${s1.x.toFixed(2)} ${s1.y.toFixed(2)} ` +
            `A ${R} ${R} 0 ${large} 1 ${e1.x.toFixed(2)} ${e1.y.toFixed(2)} ` +
            `L ${s2.x.toFixed(2)} ${s2.y.toFixed(2)} ` +
            `A ${r} ${r} 0 ${large} 0 ${e2.x.toFixed(2)} ${e2.y.toFixed(2)} Z`;

        // Perimeter of the outer arc = used for stroke-dasharray trick on clip path
        // We'll use the path length approximation for the animation
        const arcLen = (sweep / 360) * 2 * Math.PI * R;

        // Label position: push label outward on the midpoint ray
        const labelR = R + 32;
        const labelPt = pt(labelR, mid);

        // Leader: elbow line — inner anchor on arc outer edge, short radial, then horizontal
        const anchorR = R + 6;
        const anchor = pt(anchorR, mid);
        const elbowR = R + 18;
        const elbow = pt(elbowR, mid);
        // Horizontal end of leader line (same y as elbow, nudged toward label)
        const leaderEnd = {
            x: labelPt.x + (labelPt.x < cx ? -14 : 14),
            y: elbow.y,
        };

        const textAnchor = (labelPt.x < cx ? "end" : "start") as "start" | "end";
        const totalDelay = i * 0.15; // stagger each arc by 150ms
        const labelDelay = data.length * 0.15 + 0.2 + i * 0.08; // labels start after all arcs done

        return {
            path, color: d.color, arcLen, sweep, start, mid,
            anchor, elbow, leaderEnd, labelPt, textAnchor,
            name: d.name, value: d.value, totalDelay, labelDelay
        };
    });

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <style>{DONUT_ANIM_CSS}</style>
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE} className="overflow-visible">
                {/* Segments */}
                {segments.map((seg, i) => (
                    <path
                        key={i}
                        d={seg.path}
                        fill={seg.color}
                        className="arc-segment"
                        style={{
                            "--arc-len": `${seg.arcLen}`,
                            "--dur": `${0.65 + seg.sweep / 800}s`,
                            "--delay": `${seg.totalDelay}s`,
                            strokeDasharray: seg.arcLen,
                            strokeDashoffset: seg.arcLen,
                        } as React.CSSProperties}
                    />
                ))}

                {/* Centre label */}
                <text x={cx} y={cy - 8} textAnchor="middle"
                    className="fill-slate-900 dark:fill-white"
                    fontSize={22} fontWeight={700}>
                    {compliancePct}%
                </text>
                <text x={cx} y={cy + 10} textAnchor="middle"
                    className="fill-slate-400 dark:fill-slate-500"
                    fontSize={9} fontWeight={600} letterSpacing={1.5}>
                    COMPLIANCE
                </text>

                {/* Leader lines + labels */}
                {segments.map((seg, i) => (
                    <g key={i} className="arc-label"
                        style={{ "--label-delay": `${seg.labelDelay}s` } as React.CSSProperties}>
                        {/* Leader line: anchor -> elbow -> horizontal tip */}
                        <polyline
                            points={`${seg.anchor.x.toFixed(1)},${seg.anchor.y.toFixed(1)} ${seg.elbow.x.toFixed(1)},${seg.elbow.y.toFixed(1)} ${seg.leaderEnd.x.toFixed(1)},${seg.leaderEnd.y.toFixed(1)}`}
                            fill="none"
                            stroke={seg.color}
                            strokeWidth={1.2}
                            opacity={0.7}
                        />
                        {/* Value */}
                        <text
                            x={seg.leaderEnd.x + (seg.textAnchor === "start" ? 4 : -4)}
                            y={seg.leaderEnd.y - 5}
                            textAnchor={seg.textAnchor}
                            fontSize={11}
                            fontWeight={700}
                            fill={seg.color}>
                            {seg.value}
                        </text>
                        {/* Name */}
                        <text
                            x={seg.leaderEnd.x + (seg.textAnchor === "start" ? 4 : -4)}
                            y={seg.leaderEnd.y + 7}
                            textAnchor={seg.textAnchor}
                            fontSize={8.5}
                            className="fill-slate-400 dark:fill-slate-400"
                            fill="#94a3b8">
                            {seg.name}
                        </text>
                    </g>
                ))}
            </svg>

            {/* Legend grid */}
            <div className="w-full grid grid-cols-2 gap-x-4 gap-y-2 border-t border-slate-100 dark:border-slate-800 pt-3 px-1">
                {data.map(({ name, value, color }) => (
                    <div key={name} className="flex items-center gap-2 min-w-0">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex-1">{name}</span>
                        <span className="text-[11px] font-bold tabular-nums" style={{ color }}>{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Shared Card Wrapper ───────────────────────────────────────────────────────

function DashboardCard({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) {
    return (
        <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 flex flex-col gap-4 ${className}`}>
            {title && <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 tracking-wide">{title}</h2>}
            {children}
        </div>
    );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-3 pt-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 whitespace-nowrap">
                {label}
            </span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700/70" />
        </div>
    );
}

// ─── Chart Tooltip ────────────────────────────────────────────────────────────

const tooltipStyle = {
    borderRadius: "10px",
    border: "none",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    fontSize: 12,
    padding: "8px 12px",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

// ─── Empty Section Placeholder ───────────────────────────────────────────────

function EmptySection() {
    return (
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-700/60 bg-slate-900/20 py-8">
            <p className="text-xs text-slate-500 italic">All widgets in this section are hidden</p>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IntegrityPage() {
    const status = getScoreStatus(SCORE);
    const totalInspections = inspectionCompliance.reduce((a, b) => a + b.value, 0);
    const compliancePct = Math.round((inspectionCompliance[0].value / totalInspections) * 100);
    const [riskTab, setRiskTab] = useState("Total");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [customizeOpen, setCustomizeOpen] = useState(false);
    const [highlightedBand, setHighlightedBand] = useState<string | null>(null);

    // ── Widget preferences ──────────────────────────────────────────────────
    const [prefs, setPrefs] = useState<Record<string, boolean>>(() => {
        const saved = loadPreferences();
        // Merge saved prefs with defaults — any unsaved id falls back to defaultEnabled
        const merged: Record<string, boolean> = {};
        WIDGET_REGISTRY.forEach((w) => {
            merged[w.id] = w.id in saved ? saved[w.id] : w.defaultEnabled;
        });
        return merged;
    });

    const isEnabled = useCallback((id: string) => prefs[id] !== false, [prefs]);

    const handleSavePrefs = useCallback((newPrefs: Record<string, boolean>) => {
        setPrefs(newPrefs);
        savePreferences(newPrefs);
    }, []);

    return (
        <div className="space-y-4">
            {/* Score Drawer */}
            <ScoreDrawer score={SCORE} open={drawerOpen} onClose={() => setDrawerOpen(false)} />

            {/* Customize Modal */}
            <CustomizeModal
                open={customizeOpen}
                prefs={prefs}
                onSave={handleSavePrefs}
                onClose={() => setCustomizeOpen(false)}
            />

            {/* ── PAGE HEADER ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Integrity Dashboard</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        Plant-wide integrity overview ·{" "}
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">Larut-A (LRA)</span>
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCustomizeOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <Settings2 size={14} /> Customize
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <FileText size={14} className="text-red-500" /> Export PDF
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <FileSpreadsheet size={14} className="text-emerald-500" /> Export Excel
                    </button>
                </div>
            </div>

            {/* ══════════════════════════════════════ */}
            {/* INTEGRITY OVERVIEW                     */}
            {/* ══════════════════════════════════════ */}
            <SectionHeader label="Integrity Overview" />

            {isEnabled("integrity-score") ? (
                <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none overflow-hidden">
                    {/* Gradient accent */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                        background: `radial-gradient(ellipse at top right, ${status.color}18 0%, transparent 60%)`
                    }} />
                    <div className="relative p-4 md:p-5 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center">
                        {/* Gauge — interactive */}
                        <InteractiveGauge
                            score={SCORE}
                            onOpen={() => setDrawerOpen(true)}
                            highlightedBand={highlightedBand}
                        />

                        {/* Score ranges — right column */}
                        <div className="space-y-2.5 md:col-span-2">
                            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Score Ranges</p>
                            {SCORE_RANGES.map(({ label, bandLabel, range, color, bg }) => {
                                const isCurrent = status.label === bandLabel;
                                const isActive = highlightedBand === bandLabel;
                                return (
                                    <div
                                        key={label}
                                        role="button"
                                        tabIndex={0}
                                        aria-pressed={isActive}
                                        onClick={() => setHighlightedBand(isActive ? null : bandLabel)}
                                        onKeyDown={e => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                setHighlightedBand(isActive ? null : bandLabel);
                                            }
                                        }}
                                        className={`flex items-center justify-between rounded-xl px-4 py-2.5 ${bg} border
                                                    cursor-pointer select-none transition-all duration-200
                                                    hover:scale-[1.005] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
                                                    ${isActive ? "ring-1 scale-[1.01]" : ""}`}
                                        style={{
                                            borderColor: isActive ? color : `${color}30`,
                                            boxShadow: isActive ? `0 0 14px ${color}28` : undefined,
                                        }}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                                            <span className="text-sm font-semibold" style={{ color }}>{label}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{range}</span>
                                            {isCurrent && (
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: color }}>
                                                    CURRENT
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : <EmptySection />}

            {/* ══════════════════════════════════════ */}
            {/* OPERATIONAL STATUS                     */}
            {/* ══════════════════════════════════════ */}
            <SectionHeader label="Operational Status" />

            {["stat-high-risk", "stat-inspections-due", "stat-open-anomalies", "stat-remaining-life"].some(isEnabled) ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* High Risk Equipment */}
                    {isEnabled("stat-high-risk") && (
                        <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-red-500/8 dark:bg-red-500/10" />
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10">
                                    <ShieldAlert size={18} className="text-red-500" />
                                </div>
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30">RISK</span>
                            </div>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">1</p>
                            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">High Risk Equipment</p>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Very High: 0</p>
                        </div>
                    )}

                    {/* Inspections Due Soon */}
                    {isEnabled("stat-inspections-due") && (
                        <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-yellow-500/8 dark:bg-yellow-500/10" />
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2.5 rounded-xl bg-yellow-50 dark:bg-yellow-500/10">
                                    <CalendarClock size={18} className="text-yellow-500" />
                                </div>
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/30">INSPECTION</span>
                            </div>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">3</p>
                            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">Inspections Due Soon</p>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Overdue: 1</p>
                        </div>
                    )}

                    {/* Open Anomalies */}
                    {isEnabled("stat-open-anomalies") && (
                        <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-orange-500/8 dark:bg-orange-500/10" />
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-500/10">
                                    <AlertCircle size={18} className="text-orange-500" />
                                </div>
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30">ANOMALY</span>
                            </div>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">5</p>
                            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">Open Anomalies</p>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">P1/P2: 2</p>
                        </div>
                    )}

                    {/* Low Remaining Life */}
                    {isEnabled("stat-remaining-life") && (
                        <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-blue-500/8 dark:bg-blue-500/10" />
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10">
                                    <AlertTriangle size={18} className="text-blue-500" />
                                </div>
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">LIFE</span>
                            </div>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">1</p>
                            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">Low Remaining Life</p>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">&lt;3 Years</p>
                        </div>
                    )}
                </div>
            ) : <EmptySection />}

            {/* ══════════════════════════════════════ */}
            {/* INTEGRITY ANALYTICS  (70 / 30)         */}
            {/* ══════════════════════════════════════ */}
            <SectionHeader label="Integrity Analytics" />

            {["risk-distribution", "inspection-compliance"].some(isEnabled) ? (
                <div className="flex gap-5">
                    {/* Risk Distribution Matrix — 70% */}
                    {isEnabled("risk-distribution") && <div className="flex-[7] min-w-0">
                        <DashboardCard title="Risk Distribution" className="h-full">

                            {/* Tab switcher */}
                            <div className="flex border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden self-start">
                                {riskTabs.map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setRiskTab(tab)}
                                        className={`px-4 py-1.5 text-xs font-medium transition-colors ${riskTab === tab
                                            ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                                            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                            }`}>
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Matrix title */}
                            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{riskTab} Risk Matrix</p>

                            {/* Matrix table */}
                            <div className="w-full overflow-x-auto">
                                <table className="w-full border-collapse text-xs">
                                    <thead>
                                        <tr>
                                            <th className="text-left px-2 py-1.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 w-14">
                                                POF/COF
                                            </th>
                                            {RISK_LEVELS.col.map(col => (
                                                <th key={col} className="text-center px-2 py-1.5 font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                                                    {col}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {RISK_LEVELS.row.map((pof, rowIdx) => (
                                            <tr key={pof}>
                                                <td className="text-center px-2 py-2 font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                                                    {pof}
                                                </td>
                                                {RISK_LEVELS.col.map((_, colIdx) => {
                                                    const level = riskMatrix[rowIdx][colIdx];
                                                    const count = riskMatrixCounts[riskTab][rowIdx][colIdx];
                                                    const bg = riskLevelColor[level];
                                                    return (
                                                        <td key={colIdx}
                                                            className="text-center px-2 py-2.5 font-semibold border border-slate-200 dark:border-slate-700"
                                                            style={{ backgroundColor: bg, color: level === "Medium" ? "#713f12" : "white" }}>
                                                            {count}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Legend */}
                            <div className="flex items-center gap-4 flex-wrap">
                                {(Object.entries(riskLevelColor) as [RiskLevel, string][]).map(([level, color]) => (
                                    <div key={level} className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                                        <span className="text-[11px] text-slate-500 dark:text-slate-400">{level}</span>
                                    </div>
                                ))}
                            </div>

                        </DashboardCard>
                    </div>}

                    {/* Inspection Compliance — 30% */}
                    {isEnabled("inspection-compliance") && <div className="flex-[3] min-w-0">
                        <DashboardCard title="Inspection Compliance" className="h-full">
                            <AnimatedComplianceDonut data={inspectionCompliance} compliancePct={compliancePct} />
                        </DashboardCard>
                    </div>}

                </div>
            ) : <EmptySection />}

            {/* ══════════════════════════════════════ */}
            {/* INTEGRITY MONITORING  (70 / 30)        */}
            {/* ══════════════════════════════════════ */}
            <SectionHeader label="Integrity Monitoring" />

            {["inspection-timeline", "anomaly-priority"].some(isEnabled) ? (
                <div className="flex gap-5">
                    {/* Upcoming Inspection Timeline — 60% */}
                    {isEnabled("inspection-timeline") && <div className="flex-[6] min-w-0">
                        <DashboardCard title="Upcoming Inspection Timeline" className="h-full">
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={inspectionTimeline} barSize={36} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.15)" />
                                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: "currentColor" }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fontSize: 11, fill: "currentColor" }} axisLine={false} tickLine={false} />
                                        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(148,163,184,0.08)" }} />
                                        <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} label={{ position: "top", fontSize: 11, fontWeight: 600, fill: "currentColor" }} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">Inspections grouped by upcoming schedule window</p>
                        </DashboardCard>
                    </div>}

                    {/* Anomaly Priority Distribution — 40% */}
                    {isEnabled("anomaly-priority") && <div className="flex-[4] min-w-0">
                        <DashboardCard title="Anomaly Priority Distribution" className="h-full">
                            <div className="w-full overflow-x-auto">
                                <table className="w-full border-collapse text-xs">
                                    <thead>
                                        {/* Priority label header */}
                                        <tr>
                                            <th colSpan={anomalyPriority.length * 2}
                                                className="text-center py-2 text-slate-500 dark:text-slate-400 font-semibold tracking-wide border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                                                Priority
                                            </th>
                                        </tr>
                                        {/* Coloured priority name row */}
                                        <tr>
                                            {anomalyPriority.map(({ name, fill }) => (
                                                <th key={name} colSpan={2}
                                                    className="text-center py-1.5 font-bold text-white border border-slate-200 dark:border-slate-700"
                                                    style={{ backgroundColor: fill }}>
                                                    {name}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Total row */}
                                        <tr>
                                            {anomalyPriority.map(({ name, total }) => (
                                                <td key={name} colSpan={2}
                                                    className="text-center py-1.5 font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
                                                    {total}
                                                </td>
                                            ))}
                                        </tr>
                                        {/* Active / Completed sub-headers */}
                                        <tr>
                                            {anomalyPriority.map(({ name }) => (
                                                <React.Fragment key={name}>
                                                    <th className="text-center py-1.5 font-semibold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 min-w-[52px]">
                                                        Active
                                                    </th>
                                                    <th className="text-center py-1.5 font-semibold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 min-w-[52px]">
                                                        Completed
                                                    </th>
                                                </React.Fragment>
                                            ))}
                                        </tr>
                                        {/* Active / Completed values */}
                                        <tr>
                                            {anomalyPriority.map(({ name, active, completed, fill }) => (
                                                <React.Fragment key={name}>
                                                    <td className="text-center py-1.5 font-medium border border-slate-200 dark:border-slate-700 min-w-[52px]"
                                                        style={{ color: active > 0 ? fill : undefined }}>
                                                        {active}
                                                    </td>
                                                    <td className="text-center py-1.5 font-medium text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 min-w-[52px]">
                                                        {completed}
                                                    </td>
                                                </React.Fragment>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </DashboardCard>
                    </div>}
                </div>
            ) : <EmptySection />}

            {/* ══════════════════════════════════════ */}
            {/* PROGRAM PERFORMANCE  (40 / 60)         */}
            {/* ══════════════════════════════════════ */}
            <SectionHeader label="Program Performance" />

            {["integrity-alerts", "risk-trend"].some(isEnabled) ? (
                <div className="flex gap-5">
                    {/* Integrity Alerts — 40% */}
                    {isEnabled("integrity-alerts") && <div className="flex-[4] min-w-0">
                        <DashboardCard title="Integrity Alerts" className="h-full">
                            <div className="space-y-2.5">
                                {alerts.map(({ id, icon: Icon, color, bg, border, text, level }) => (
                                    <div key={id} className={`flex items-start gap-3 p-3 rounded-xl border ${bg} ${border}`}>
                                        <div className={`mt-0.5 flex-shrink-0 ${color}`}>
                                            <Icon size={15} />
                                        </div>
                                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex-1">{text}</p>
                                        <span className={`flex-shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${color} ${border}`}
                                            style={{ opacity: 0.8 }}>
                                            {level}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 pt-1">
                                <CheckCircle2 size={13} className="text-emerald-500" />
                                <p className="text-[11px] text-slate-400 dark:text-slate-500">All other parameters within acceptable limits</p>
                            </div>
                        </DashboardCard>
                    </div>}

                    {/* Plant Risk Reduction Trend — 60% */}
                    {isEnabled("risk-trend") && <div className="flex-[6] min-w-0">
                        <DashboardCard title="Plant Risk Reduction Trend (12 Months)" className="h-full">
                            <div className="h-[220px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={riskTrend} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
                                        <defs>
                                            <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.15)" />
                                        <XAxis dataKey="month" tick={{ fontSize: 11, fill: "currentColor" }} axisLine={false} tickLine={false} />
                                        <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: "currentColor" }} axisLine={false} tickLine={false} />
                                        <Tooltip contentStyle={tooltipStyle} />
                                        <Line
                                            type="monotone"
                                            dataKey="score"
                                            stroke="#6366f1"
                                            strokeWidth={2.5}
                                            dot={{ fill: "#6366f1", r: 3, strokeWidth: 0 }}
                                            activeDot={{ r: 5, fill: "#6366f1", strokeWidth: 0 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-[11px] text-slate-400 dark:text-slate-500">Integrity score improving month-over-month</p>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">+13 pts YTD</span>
                                </div>
                            </div>
                        </DashboardCard>
                    </div>}
                </div>
            ) : <EmptySection />}

        </div>
    );
}
