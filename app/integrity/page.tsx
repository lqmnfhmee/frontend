"use client";

import React from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    PieChart, Pie, Cell,
    LineChart, Line,
} from "recharts";
import {
    ShieldAlert, AlertTriangle, CalendarClock, AlertCircle,
    Download, FileSpreadsheet, FileText, TrendingDown, CheckCircle2,
} from "lucide-react";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const riskDistribution = [
    { name: "Low", value: 20, fill: "#22c55e" },
    { name: "Medium", value: 6, fill: "#eab308" },
    { name: "High", value: 2, fill: "#f97316" },
    { name: "Very High", value: 0, fill: "#ef4444" },
];

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

// ─── Score config ─────────────────────────────────────────────────────────────
const SCORE = 85;

function getScoreStatus(score: number) {
    if (score >= 90) return { label: "OPTIMAL", color: "#22c55e", ring: "#dcfce7", dark: "#16a34a" };
    if (score >= 75) return { label: "HEALTHY", color: "#6366f1", ring: "#e0e7ff", dark: "#4f46e5" };
    if (score >= 60) return { label: "ATTENTION", color: "#eab308", ring: "#fef9c3", dark: "#ca8a04" };
    return { label: "CRITICAL", color: "#ef4444", ring: "#fee2e2", dark: "#b91c1c" };
}

// ─── Gauge SVG Component ──────────────────────────────────────────────────────

function GaugeIndicator({ score }: { score: number }) {
    const status = getScoreStatus(score);
    const cx = 110;
    const cy = 110;
    const radius = 82;

    // Gauge: 270° arc from 7-o'clock (225°) clockwise to 5-o'clock (135°)
    const gaugeStart = 225;   // degrees clockwise from 12 o'clock
    const gaugeTotal = 270;   // total arc span in degrees
    const fillSweep = (score / 100) * gaugeTotal;

    function toXY(angleDeg: number) {
        const rad = (angleDeg - 90) * (Math.PI / 180);
        return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
    }

    // Build an SVG arc path from `start` sweeping `sweep` degrees clockwise
    function arcPath(start: number, sweep: number) {
        const s = toXY(start);
        const e = toXY(start + sweep);
        const large = sweep > 180 ? 1 : 0;
        return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${radius} ${radius} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
    }

    return (
        <svg viewBox="0 0 220 195" className="w-full max-w-[240px]">
            {/* Track */}
            <path
                d={arcPath(gaugeStart, gaugeTotal)}
                fill="none"
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-700"
                strokeWidth={14}
                strokeLinecap="round"
            />
            {/* Fill */}
            <path
                d={arcPath(gaugeStart, fillSweep)}
                fill="none"
                stroke={status.color}
                strokeWidth={14}
                strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 6px ${status.color}80)` }}
            />
            {/* Score text */}
            <text x={cx} y={cy - 8} textAnchor="middle" fill={status.color} fontSize={34} fontWeight={700}>
                {score}
            </text>
            <text x={cx} y={cy + 16} textAnchor="middle" fill={status.color} fontSize={11} fontWeight={600} letterSpacing={2}>
                {status.label}
            </text>
        </svg>
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

export default function IntegrityPage() {
    const status = getScoreStatus(SCORE);
    const totalInspections = inspectionCompliance.reduce((a, b) => a + b.value, 0);
    const compliancePct = Math.round((inspectionCompliance[0].value / totalInspections) * 100);

    return (
        <div className="space-y-4">

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

            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none overflow-hidden">
                {/* Gradient accent */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: `radial-gradient(ellipse at top right, ${status.color}18 0%, transparent 60%)`
                }} />
                <div className="relative p-5 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    {/* Gauge */}
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Plant Integrity Score</p>
                        <GaugeIndicator score={SCORE} />
                        <div className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border"
                            style={{ color: status.color, borderColor: `${status.color}40`, backgroundColor: `${status.color}12` }}>
                            Program Status: STABLE
                        </div>
                    </div>

                    {/* Score ranges */}
                    <div className="space-y-2.5 md:col-span-2">
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Score Ranges</p>
                        {[
                            { range: "90 – 100", label: "Optimal", color: "#22c55e", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
                            { range: "75 – 89", label: "Healthy", color: "#6366f1", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
                            { range: "60 – 74", label: "Attention", color: "#eab308", bg: "bg-yellow-50 dark:bg-yellow-500/10" },
                            { range: "< 60", label: "Critical", color: "#ef4444", bg: "bg-red-50 dark:bg-red-500/10" },
                        ].map(({ range, label, color, bg }) => (
                            <div key={label} className={`flex items-center justify-between rounded-xl px-4 py-2.5 ${bg} border`}
                                style={{ borderColor: `${color}30` }}>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                                    <span className="text-sm font-semibold" style={{ color }}>{label}</span>
                                </div>
                                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{range}</span>
                                {label === "Healthy" && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: color }}>
                                        CURRENT
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════ */}
            {/* OPERATIONAL STATUS                     */}
            {/* ══════════════════════════════════════ */}
            <SectionHeader label="Operational Status" />

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {/* High Risk Equipment */}
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

                {/* Inspections Due Soon */}
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

                {/* Open Anomalies */}
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

                {/* Low Remaining Life */}
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
            </div>

            {/* ══════════════════════════════════════ */}
            {/* INTEGRITY ANALYTICS  (70 / 30)         */}
            {/* ══════════════════════════════════════ */}
            <SectionHeader label="Integrity Analytics" />

            <div className="flex gap-5">
                {/* Risk Distribution — 70% */}
                <div className="flex-[7] min-w-0">
                    <DashboardCard title="Risk Distribution" className="h-full">
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={riskDistribution} barSize={32} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.15)" />
                                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "currentColor" }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 11, fill: "currentColor" }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(148,163,184,0.08)" }} />
                                    <Bar dataKey="value" radius={[6, 6, 0, 0]} label={{ position: "top", fontSize: 11, fontWeight: 600, fill: "currentColor" }}>
                                        {riskDistribution.map((entry, i) => (
                                            <Cell key={i} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            {riskDistribution.map(({ name, value, fill }) => (
                                <div key={name} className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: fill }} />
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{name}</span>
                                    <span className="text-xs font-bold text-slate-800 dark:text-white">{value}</span>
                                </div>
                            ))}
                        </div>
                    </DashboardCard>
                </div>

                {/* Inspection Compliance — 30% */}
                <div className="flex-[3] min-w-0">
                    <DashboardCard title="Inspection Compliance" className="h-full">
                        <div className="flex flex-col items-center gap-3">
                            <div className="relative w-full" style={{ height: 180 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={inspectionCompliance} cx="50%" cy="50%" innerRadius={50} outerRadius={72} paddingAngle={2} dataKey="value" stroke="none">
                                            {inspectionCompliance.map((entry, i) => (
                                                <Cell key={i} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={tooltipStyle} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{compliancePct}%</span>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide">Compliance</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-y-2 w-full">
                                {inspectionCompliance.map(({ name, value, color }) => (
                                    <div key={name} className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                                        <span className="text-xs text-slate-500 dark:text-slate-400">{name}</span>
                                        <span className="text-xs font-bold text-slate-800 dark:text-white ml-auto">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DashboardCard>
                </div>
            </div>

            {/* ══════════════════════════════════════ */}
            {/* INTEGRITY MONITORING  (70 / 30)        */}
            {/* ══════════════════════════════════════ */}
            <SectionHeader label="Integrity Monitoring" />

            <div className="flex gap-5">
                {/* Upcoming Inspection Timeline — 60% */}
                <div className="flex-[6] min-w-0">
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
                </div>

                {/* Anomaly Priority Distribution — 40% */}
                <div className="flex-[4] min-w-0">
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
                </div>
            </div>

            {/* ══════════════════════════════════════ */}
            {/* PROGRAM PERFORMANCE  (40 / 60)         */}
            {/* ══════════════════════════════════════ */}
            <SectionHeader label="Program Performance" />

            <div className="flex gap-5">
                {/* Integrity Alerts — 40% */}
                <div className="flex-[4] min-w-0">
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
                </div>

                {/* Plant Risk Reduction Trend — 60% */}
                <div className="flex-[6] min-w-0">
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
                </div>
            </div>

        </div>
    );
}
