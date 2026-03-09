"use client";

import React, { useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    LineChart, Line, Cell,
} from "recharts";
import {
    ShieldAlert, AlertTriangle, CalendarClock, Activity, FileText,
    FileSpreadsheet, PlusCircle, ClipboardCheck, TrendingUp, ChevronRight,
    Eye, CheckCircle2, Clock, BarChart2,
} from "lucide-react";
import RiskMatrixHeatmap from "@/app/integrity/components/RiskMatrixHeatmap";
import AssetRiskTable, { Asset } from "@/app/integrity/components/AssetRiskTable";
import AssetDetailPanel from "@/app/integrity/components/AssetDetailPanel";
import SlidePanel from "@/app/integrity/components/SlidePanel";
import RiskBadge, { RiskLevel } from "@/app/integrity/components/RiskBadge";
import FilterChips from "@/app/integrity/components/FilterChips";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_ASSETS: Asset[] = [
    { id: "V-1001", name: "HP Separator Vessel", type: "Pressure Vessel", riskLevel: "Critical", cof: 5, pof: 4, nextInspectionDate: "2025-01-15", trend: [{ value: 2 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 4 }, { value: 5 }] },
    { id: "V-1002", name: "LP Flash Drum", type: "Pressure Vessel", riskLevel: "High", cof: 4, pof: 3, nextInspectionDate: "2025-03-01", trend: [{ value: 2 }, { value: 3 }, { value: 3 }, { value: 3 }, { value: 4 }, { value: 4 }] },
    { id: "P-2001", name: "Gas Export Pipeline Riser", type: "Piping", riskLevel: "High", cof: 4, pof: 2, nextInspectionDate: "2025-04-10", trend: [{ value: 3 }, { value: 3 }, { value: 3 }, { value: 4 }, { value: 3 }, { value: 4 }] },
    { id: "HE-3001", name: "Feed/Effluent Exchanger", type: "Heat Exchanger", riskLevel: "Medium", cof: 3, pof: 2, nextInspectionDate: "2025-06-15", trend: [{ value: 2 }, { value: 2 }, { value: 2 }, { value: 3 }, { value: 2 }, { value: 3 }] },
    { id: "P-2002", name: "Condensate Transfer Line", type: "Piping", riskLevel: "Medium", cof: 3, pof: 3, nextInspectionDate: "2025-05-20", trend: [{ value: 1 }, { value: 2 }, { value: 2 }, { value: 2 }, { value: 3 }, { value: 3 }] },
    { id: "TK-4001", name: "Crude Storage Tank", type: "Storage Tank", riskLevel: "Low", cof: 2, pof: 1, nextInspectionDate: "2026-01-01", trend: [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 2 }, { value: 1 }] },
    { id: "RE-5001", name: "Gas Compressor K101", type: "Rotating Equipment", riskLevel: "Critical", cof: 5, pof: 5, nextInspectionDate: "2024-12-20", trend: [{ value: 3 }, { value: 3 }, { value: 4 }, { value: 4 }, { value: 5 }, { value: 5 }] },
    { id: "V-1003", name: "LP Separator", type: "Pressure Vessel", riskLevel: "Low", cof: 2, pof: 2, nextInspectionDate: "2026-03-01", trend: [{ value: 2 }, { value: 2 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 2 }] },
    { id: "P-2003", name: "Fuel Gas Header", type: "Piping", riskLevel: "Medium", cof: 3, pof: 2, nextInspectionDate: "2025-08-10", trend: [{ value: 2 }, { value: 2 }, { value: 2 }, { value: 2 }, { value: 3 }, { value: 2 }] },
    { id: "HE-3002", name: "Aerial Cooler AC201", type: "Heat Exchanger", riskLevel: "Low", cof: 2, pof: 1, nextInspectionDate: "2026-07-01", trend: [{ value: 1 }, { value: 1 }, { value: 2 }, { value: 1 }, { value: 1 }, { value: 1 }] },
];

const LOW_REMAINING_LIFE = [
    { id: "RE-5001", component: "Compressor Casing", remainingLife: 1.8, riskLevel: "Critical" as RiskLevel, nextInspection: "2024-12-20" },
    { id: "V-1001", component: "Shell Plate – Zone 2", remainingLife: 2.5, riskLevel: "Critical" as RiskLevel, nextInspection: "2025-01-15" },
    { id: "P-2001", component: "Riser Clamp Section", remainingLife: 3.2, riskLevel: "High" as RiskLevel, nextInspection: "2025-04-10" },
    { id: "HE-3001", component: "Tube Bundle Row A", remainingLife: 4.1, riskLevel: "Medium" as RiskLevel, nextInspection: "2025-06-15" },
    { id: "V-1002", component: "Nozzle N4 Weld", remainingLife: 4.7, riskLevel: "High" as RiskLevel, nextInspection: "2025-03-01" },
];

const riskDistribution = [
    { name: "Low", value: 3, color: "#22c55e" },
    { name: "Medium", value: 3, color: "#eab308" },
    { name: "High", value: 2, color: "#f97316" },
    { name: "Very High", value: 2, color: "#ef4444" },
];

const topDrivers = [
    { text: "Corrosion under insulation detected on 3 piping segments", color: "#ef4444" },
    { text: "High H2S content increases CoF for separator vessels", color: "#f97316" },
    { text: "Age-related wall thinning observed on 2 heat exchangers", color: "#eab308" },
    { text: "Inspection compliance below 80% KPI target for Q1", color: "#6366f1" },
];

const irpMethods = [
    { name: "External Visual Inspection", interval: "12 months", lastDate: "Mar 2025", nextDate: "Mar 2026", icon: Eye, color: "#6366f1" },
    { name: "UT Thickness Coverage", interval: "24 months", lastDate: "Jan 2024", nextDate: "Jan 2026", icon: Activity, color: "#22c55e" },
    { name: "Internal Inspection", interval: "60 months", lastDate: "Jun 2021", nextDate: "Jun 2026", icon: ClipboardCheck, color: "#f97316" },
];

const inspectionTimeline = [
    { name: "This Month", value: 2, color: "#ef4444" },
    { name: "Next Month", value: 4, color: "#f97316" },
    { name: "Next Quarter", value: 7, color: "#eab308" },
    { name: "Future", value: 5, color: "#6366f1" },
];

const riskTrend = [
    { month: "Mar", risk: 62 },
    { month: "Apr", risk: 58 },
    { month: "May", risk: 55 },
    { month: "Jun", risk: 53 },
    { month: "Jul", risk: 50 },
    { month: "Aug", risk: 48 },
    { month: "Sep", risk: 47 },
    { month: "Oct", risk: 44 },
    { month: "Nov", risk: 43 },
    { month: "Dec", risk: 41 },
    { month: "Jan", risk: 40 },
    { month: "Feb", risk: 38 },
];

const dataCompleteness = [
    { label: "Design Data Completeness", pct: 91, color: "#22c55e" },
    { label: "POF Input Completeness", pct: 78, color: "#6366f1" },
    { label: "COF Input Completeness", pct: 85, color: "#eab308" },
];

const tooltipStyle = {
    borderRadius: "10px",
    border: "none",
    boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
    fontSize: 12,
    padding: "8px 12px",
    background: "#1e293b",
    color: "#e2e8f0",
};

// ─── Shared Components ────────────────────────────────────────────────────────

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

function DashboardCard({ title, subtitle, children, className = "", action }: {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
    action?: React.ReactNode;
}) {
    return (
        <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 flex flex-col gap-4 ${className}`}>
            {(title || action) && (
                <div className="flex items-center justify-between">
                    <div>
                        {title && <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 tracking-wide">{title}</h2>}
                        {subtitle && <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{subtitle}</p>}
                    </div>
                    {action}
                </div>
            )}
            {children}
        </div>
    );
}

function RiskLevelBadge({ level }: { level: RiskLevel }) {
    const styles: Record<string, string> = {
        Critical: "bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30",
        High: "bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/30",
        Medium: "bg-yellow-100 dark:bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30",
        Low: "bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/30",
        None: "bg-slate-100 dark:bg-slate-700/40 text-slate-500 border-slate-200 dark:border-slate-700",
    };
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[level] ?? styles.None}`}>
            {level}
        </span>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RbiPage() {
    const [selectedCell, setSelectedCell] = useState<{ c: number; l: number } | null>(null);
    const [filterRisk, setFilterRisk] = useState<RiskLevel | null>(null);
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
    const [riskTab, setRiskTab] = useState("Total");

    const handleCellClick = (c: number, l: number, level: RiskLevel) => {
        if (selectedCell?.c === c && selectedCell?.l === l) { setSelectedCell(null); setFilterRisk(null); }
        else { setSelectedCell({ c, l }); setFilterRisk(level); }
    };

    const activeChips = filterRisk ? [{ key: "risk", label: `Risk: ${filterRisk}` }] : [];
    const highVeryHighAssets = MOCK_ASSETS.filter(a => a.riskLevel === "Critical" || a.riskLevel === "High");
    const assessedCount = 85;
    const totalCount = 120;

    return (
        <>
            <div className="space-y-5">

                {/* ── PAGE HEADER ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">RBI Dashboard</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                            Risk-Based Inspection overview ·{" "}
                            <span className="font-medium text-indigo-600 dark:text-indigo-400">Larut-A (LRA)</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                            <FileText size={14} className="text-red-500" /> Export PDF
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                            <FileSpreadsheet size={14} className="text-emerald-500" /> Export Excel
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                            <PlusCircle size={14} /> Add Asset to RBI
                        </button>
                    </div>
                </div>

                {/* Filter row */}
                <div className="flex items-center gap-2 flex-wrap">
                    {[
                        { label: "Facility", value: "Larut-A (LRA)" },
                        { label: "System", value: "All Systems" },
                        { label: "Asset Type", value: "All Types" },
                        { label: "Status", value: "All" },
                    ].map(({ label, value }) => (
                        <button key={label} className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors">
                            <span className="text-slate-400 dark:text-slate-500">{label}:</span>
                            <span>{value}</span>
                        </button>
                    ))}
                </div>

                {/* ════════════════════════════════════════ */}
                {/* SECTION 1 — RBI PROGRAM STATUS           */}
                {/* ════════════════════════════════════════ */}
                <SectionHeader label="RBI Program Status" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

                    {/* Total Assets */}
                    <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-indigo-500/8 dark:bg-indigo-500/10" />
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10">
                                <Activity size={18} className="text-indigo-500" />
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30">RBI</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">{MOCK_ASSETS.length}</p>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">Total Assets in RBI</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">All equipment registered</p>
                    </div>

                    {/* Assessment Coverage */}
                    <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-blue-500/8 dark:bg-blue-500/10" />
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10">
                                <BarChart2 size={18} className="text-blue-500" />
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">COVERAGE</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">{assessedCount}<span className="text-base font-medium text-slate-400 dark:text-slate-500">/{totalCount}</span></p>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">Assessment Coverage</p>
                        <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${Math.round((assessedCount / totalCount) * 100)}%` }} />
                        </div>
                    </div>

                    {/* High / Very High Risk */}
                    <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-red-500/8 dark:bg-red-500/10" />
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10">
                                <ShieldAlert size={18} className="text-red-500" />
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30">RISK</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">{highVeryHighAssets.length}</p>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">High / Very High Risk</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Require immediate attention</p>
                    </div>

                    {/* Low Remaining Life */}
                    <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-amber-500/8 dark:bg-amber-500/10" />
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/10">
                                <AlertTriangle size={18} className="text-amber-500" />
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">LIFE</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">{LOW_REMAINING_LIFE.length}</p>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">Low Remaining Life</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">&lt;5 years remaining</p>
                    </div>

                    {/* RBI Reviews Due */}
                    <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-orange-500/8 dark:bg-orange-500/10" />
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-500/10">
                                <CalendarClock size={18} className="text-orange-500" />
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30">REVIEW</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">7</p>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">RBI Reviews Due</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Require reassessment</p>
                    </div>

                </div>

                {/* ════════════════════════════════════════ */}
                {/* SECTION 2 — RISK OVERVIEW                */}
                {/* ════════════════════════════════════════ */}
                <SectionHeader label="Risk Overview" />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">

                    {/* LEFT — Plant Risk Matrix */}
                    <DashboardCard
                        title="Plant Risk Matrix"
                        subtitle="POF vs CoF heatmap — click a cell to filter assets"
                        action={
                            <div className="flex border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                                {["Total", "Vessel", "Piping"].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setRiskTab(tab)}
                                        className={`px-3 py-1 text-xs font-medium transition-colors ${riskTab === tab
                                            ? "bg-indigo-600 text-white"
                                            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        }
                    >
                        <RiskMatrixHeatmap onCellClick={handleCellClick} selectedCell={selectedCell} />
                        {filterRisk && (
                            <div className="flex items-center gap-2">
                                <RiskBadge level={filterRisk} />
                                <span className="text-xs text-slate-400 dark:text-slate-500">risk zone selected</span>
                                <button
                                    onClick={() => { setSelectedCell(null); setFilterRisk(null); }}
                                    className="ml-auto text-xs text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 underline underline-offset-2"
                                >
                                    Clear filter
                                </button>
                            </div>
                        )}
                    </DashboardCard>

                    {/* RIGHT — stacked cards */}
                    <div className="flex flex-col gap-5">

                        {/* Risk Distribution Chart */}
                        <DashboardCard title="Risk Distribution" className="flex-1">
                            <div className="h-[160px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={riskDistribution} barSize={32} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.12)" />
                                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: "currentColor" }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fontSize: 10, fill: "currentColor" }} axisLine={false} tickLine={false} />
                                        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(148,163,184,0.08)" }} />
                                        <Bar dataKey="value" radius={[6, 6, 0, 0]} label={{ position: "top", fontSize: 11, fontWeight: 600, fill: "currentColor" }}>
                                            {riskDistribution.map((entry, i) => (
                                                <Cell key={i} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </DashboardCard>

                        {/* Top Risk Drivers */}
                        <DashboardCard title="Top Risk Drivers" className="flex-1">
                            <div className="space-y-2">
                                {topDrivers.map((d, i) => (
                                    <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: d.color }} />
                                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{d.text}</p>
                                    </div>
                                ))}
                            </div>
                        </DashboardCard>

                    </div>
                </div>

                {/* ════════════════════════════════════════ */}
                {/* SECTION 3 — INSPECTION STRATEGY          */}
                {/* ════════════════════════════════════════ */}
                <SectionHeader label="Inspection Strategy" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                    {/* IRP Methods */}
                    <DashboardCard title="Inspection Planning Recommendations" subtitle="Recommended methods based on RBI assessment">
                        <div className="space-y-3">
                            {irpMethods.map(({ name, interval, lastDate, nextDate, icon: Icon, color }) => (
                                <div key={name} className="flex items-center gap-4 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                                    <div className="p-2.5 rounded-xl flex-shrink-0" style={{ backgroundColor: `${color}18` }}>
                                        <Icon size={18} style={{ color }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{name}</p>
                                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Interval: {interval}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                                            <Clock size={10} />
                                            <span>Last: {lastDate}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-semibold mt-0.5" style={{ color }}>
                                            <CalendarClock size={10} />
                                            <span>Next: {nextDate}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 size={13} className="text-emerald-500" />
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">Recommendations are based on current RBI risk levels</p>
                        </div>
                    </DashboardCard>

                    {/* Upcoming Inspection Timeline */}
                    <DashboardCard title="Upcoming Inspection Timeline" subtitle="Inspections grouped by schedule window">
                        <div className="h-[220px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={inspectionTimeline} barSize={40} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.12)" />
                                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "currentColor" }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 11, fill: "currentColor" }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={tooltipStyle}
                                        cursor={{ fill: "rgba(148,163,184,0.08)" }}
                                        formatter={(value) => [`${value} inspections`, ""]}
                                    />
                                    <Bar dataKey="value" radius={[6, 6, 0, 0]} label={{ position: "top", fontSize: 11, fontWeight: 600, fill: "currentColor" }}>
                                        {inspectionTimeline.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {inspectionTimeline.map(({ name, color }) => (
                                <div key={name} className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
                                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{name}</span>
                                </div>
                            ))}
                        </div>
                    </DashboardCard>

                </div>

                {/* ════════════════════════════════════════ */}
                {/* SECTION 4 — CRITICAL EQUIPMENT           */}
                {/* ════════════════════════════════════════ */}
                <SectionHeader label="Critical Equipment" />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

                    {/* High / Very High Risk Equipment */}
                    <DashboardCard
                        title="High / Very High Risk Equipment"
                        subtitle={`${highVeryHighAssets.length} assets requiring priority attention`}
                        action={
                            <button className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                                View All <ChevronRight size={13} />
                            </button>
                        }
                    >
                        <div className="rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                            <table className="w-full text-xs">
                                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800">
                                    <tr>
                                        {["Asset Tag", "Name", "Risk", "POF", "COF", "Next Inspection"].map(h => (
                                            <th key={h} className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {highVeryHighAssets.slice(0, 5).map(a => (
                                        <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer" onClick={() => setSelectedAsset(a)}>
                                            <td className="px-3 py-2.5 font-mono font-semibold text-slate-800 dark:text-slate-200">{a.id}</td>
                                            <td className="px-3 py-2.5 text-slate-600 dark:text-slate-300 max-w-[120px] truncate">{a.name}</td>
                                            <td className="px-3 py-2.5"><RiskLevelBadge level={a.riskLevel} /></td>
                                            <td className="px-3 py-2.5 font-mono text-slate-600 dark:text-slate-400">{a.pof}</td>
                                            <td className="px-3 py-2.5 font-mono text-slate-600 dark:text-slate-400">{a.cof}</td>
                                            <td className="px-3 py-2.5 text-slate-500 dark:text-slate-400 whitespace-nowrap">{a.nextInspectionDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </DashboardCard>

                    {/* Low Remaining Life Equipment */}
                    <DashboardCard
                        title="Low Remaining Life Equipment"
                        subtitle={`${LOW_REMAINING_LIFE.length} components below 5-year threshold`}
                        action={
                            <button className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                                View All <ChevronRight size={13} />
                            </button>
                        }
                    >
                        <div className="rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                            <table className="w-full text-xs">
                                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800">
                                    <tr>
                                        {["Asset Tag", "Component", "Rem. Life", "Risk", "Next Insp."].map(h => (
                                            <th key={h} className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {LOW_REMAINING_LIFE.slice(0, 5).map(a => (
                                        <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                            <td className="px-3 py-2.5 font-mono font-semibold text-slate-800 dark:text-slate-200">{a.id}</td>
                                            <td className="px-3 py-2.5 text-slate-600 dark:text-slate-300 max-w-[110px] truncate">{a.component}</td>
                                            <td className="px-3 py-2.5">
                                                <span className={`font-bold ${a.remainingLife < 2 ? "text-red-500" : a.remainingLife < 3 ? "text-orange-500" : "text-amber-500"}`}>
                                                    {a.remainingLife} yrs
                                                </span>
                                            </td>
                                            <td className="px-3 py-2.5"><RiskLevelBadge level={a.riskLevel} /></td>
                                            <td className="px-3 py-2.5 text-slate-500 dark:text-slate-400 whitespace-nowrap">{a.nextInspection}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </DashboardCard>

                </div>

                {/* ════════════════════════════════════════ */}
                {/* SECTION 5 — RBI ANALYTICS                */}
                {/* ════════════════════════════════════════ */}
                <SectionHeader label="RBI Analytics" />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

                    {/* Risk Reduction Trend */}
                    <DashboardCard title="Risk Reduction Trend (12 Months)" subtitle="Aggregate risk score improving over time">
                        <div className="h-[220px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={riskTrend} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
                                    <defs>
                                        <linearGradient id="rbiTrendGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.12)" />
                                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "currentColor" }} axisLine={false} tickLine={false} />
                                    <YAxis domain={[30, 70]} tick={{ fontSize: 11, fill: "currentColor" }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Risk Score"]} />
                                    <Line
                                        type="monotone"
                                        dataKey="risk"
                                        stroke="#ef4444"
                                        strokeWidth={2.5}
                                        dot={{ fill: "#ef4444", r: 3, strokeWidth: 0 }}
                                        activeDot={{ r: 5, fill: "#ef4444", strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">Risk score declining — programme is effective</p>
                            <div className="flex items-center gap-1.5">
                                <TrendingUp size={13} className="text-emerald-500" />
                                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">−24 pts YTD</span>
                            </div>
                        </div>
                    </DashboardCard>

                    {/* Data Completeness */}
                    <DashboardCard title="Data Completeness" subtitle="Input completeness affects RBI calculation reliability">
                        <div className="space-y-5 pt-1">
                            {dataCompleteness.map(({ label, pct, color }) => (
                                <div key={label}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{label}</span>
                                        <span className="text-sm font-bold" style={{ color }}>{pct}%</span>
                                    </div>
                                    <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-700"
                                            style={{ width: `${pct}%`, backgroundColor: color }}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-1">
                                        <span className="text-[10px] text-slate-400 dark:text-slate-500">0%</span>
                                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                                            {pct >= 90 ? "✓ Excellent" : pct >= 75 ? "✓ Acceptable" : "⚠ Needs improvement"}
                                        </span>
                                        <span className="text-[10px] text-slate-400 dark:text-slate-500">100%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20">
                            <CheckCircle2 size={14} className="text-indigo-500 flex-shrink-0" />
                            <p className="text-[11px] text-indigo-700 dark:text-indigo-300">POF completeness below 80% — review input data quality</p>
                        </div>
                    </DashboardCard>

                </div>

                {/* ════════════════════════════════════════ */}
                {/* ASSET REGISTER (existing functionality)  */}
                {/* ════════════════════════════════════════ */}
                <SectionHeader label="Asset Register" />

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5">
                    <FilterChips
                        filters={activeChips}
                        onRemove={() => { setSelectedCell(null); setFilterRisk(null); }}
                        onClearAll={() => { setSelectedCell(null); setFilterRisk(null); }}
                    />
                    <div className="mt-3">
                        <AssetRiskTable assets={MOCK_ASSETS} filterRisk={filterRisk} onViewAsset={setSelectedAsset} />
                    </div>
                </div>

            </div>

            {/* Slide Panel */}
            <SlidePanel isOpen={!!selectedAsset} onClose={() => setSelectedAsset(null)} title={selectedAsset?.id ?? ""} subtitle={selectedAsset?.name} width="md">
                {selectedAsset && <AssetDetailPanel asset={selectedAsset} />}
            </SlidePanel>
        </>
    );
}
