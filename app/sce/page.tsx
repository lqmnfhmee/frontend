"use client";

import React, { useState, useEffect } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    PieChart, Pie, Cell,
} from "recharts";
import {
    Shield, Cog, Activity, Thermometer, Bell, PowerSquare, BriefcaseMedical, LifeBuoy,
    FileText, FileSpreadsheet, ChevronRight, Database, CheckCircle2, BarChart2,
    ShieldAlert, AlertCircle, Layers, Target, X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type BarrierGroup = {
    icon: React.ElementType;
    color: string;
    colorBg: string;
    title: string;
    abbr: string;
    total: number;
    subGroups: number;
    desc: string;
    items: { code: string; desc: string; value: number }[];
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const kpiData = {
    total: 8357,
    sce: 2421,
    nonSce: 5892,
    notAssessed: 34,
    coveragePct: 99.6,
    barrierGroups: 8,
};

const donutData = [
    { name: "SCE", value: 2421, color: "#ef4444" },
    { name: "Not SCE", value: 5892, color: "#22c55e" },
    { name: "Not Assessed", value: 34, color: "#94a3b8" },
];

const progressData = [
    { label: "SCE Assessed", value: 28.9, raw: 2421, color: "#ef4444" },
    { label: "Not SCE Confirmed", value: 70.5, raw: 5892, color: "#22c55e" },
    { label: "Not Assessed", value: 0.4, raw: 34, color: "#94a3b8" },
];

const barrierGroups: BarrierGroup[] = [
    {
        icon: Shield,
        color: "#6366f1",
        colorBg: "bg-[var(--color-brand-primary-soft)] dark:bg-[var(--color-brand-primary)]/10",
        title: "Structural Integrity",
        abbr: "SI",
        total: 714,
        subGroups: 1,
        desc: "Site surface contact, support & guide elements",
        items: [
            { code: "C0201", desc: "(TOS) Site Surface Contact, Support & Guide (Structural / Condition & Function Assessment)", value: 714 },
        ],
    },
    {
        icon: Activity,
        color: "#22c55e",
        colorBg: "bg-emerald-50 dark:bg-emerald-500/10",
        title: "Process Containment",
        abbr: "PC",
        total: 995,
        subGroups: 8,
        desc: "Vessels, piping, rotating equipment, risers",
        items: [
            { code: "C0301", desc: "Pressure Vessels", value: 231 },
            { code: "C0302", desc: "Heat Exchangers", value: 96 },
            { code: "C0303", desc: "Rotating Equipment", value: 114 },
            { code: "C0304", desc: "In-line Non-rotating Equipment (e.g. Strainer, Filter etc.)", value: 6 },
            { code: "C0305", desc: "Piping Systems", value: 483 },
            { code: "C0306", desc: "Onshore / Offshore Pipelines", value: 12 },
            { code: "C0307", desc: "Steel Riser for Onshore / Offshore Pipelines", value: 24 },
            { code: "C0308", desc: "Flexible Riser / Subsea Installation", value: 29 },
        ],
    },
    {
        icon: Thermometer,
        color: "#f59e0b",
        colorBg: "bg-amber-50 dark:bg-amber-500/10",
        title: "Ignition Control",
        abbr: "IC",
        total: 394,
        subGroups: 7,
        desc: "Hazardous area, electrical earthing, flare systems",
        items: [
            { code: "C0401", desc: "Hazardous Area Equipment", value: 6 },
            { code: "C0402", desc: "Gas Compression Equipments", value: 115 },
            { code: "C0403", desc: "Gas Fired / Heating Utilities Equipments", value: 25 },
            { code: "C0404", desc: "Electrical Earthing & Bonding / Anti-Static Mating", value: 190 },
            { code: "C0406", desc: "Flare/Purge System", value: 8 },
            { code: "C0407", desc: "Miscellaneous Ignition Control Equipments", value: 2 },
            { code: "C0408", desc: "Exhaust / Flame / Spark Arrestor (Internal Combustions etc.)", value: 48 },
        ],
    },
    {
        icon: Bell,
        color: "#6366f1",
        colorBg: "bg-[var(--color-brand-primary-soft)] dark:bg-[var(--color-brand-primary)]/10",
        title: "Detection Systems",
        abbr: "DS",
        total: 75,
        subGroups: 1,
        desc: "Fire and gas detection instrumentation",
        items: [
            { code: "C0501", desc: "Fire and Gas Detection", value: 75 },
        ],
    },
    {
        icon: BriefcaseMedical,
        color: "#14b8a6",
        colorBg: "bg-teal-50 dark:bg-teal-500/10",
        title: "Protection Systems",
        abbr: "PS",
        total: 106,
        subGroups: 10,
        desc: "Deluge, foam, hydrant, PFP, rupture disk",
        items: [
            { code: "C0601", desc: "Deluge Systems", value: 14 },
            { code: "C0602", desc: "Foam / Dry Chemical / Gas Extinguishing Systems", value: 4 },
            { code: "C0603", desc: "Hydrant / Monitors / Hose Reels", value: 6 },
            { code: "C0604", desc: "Fire Water Pump Set (including Pump, Engine / Driver / Panel)", value: 8 },
            { code: "C0606", desc: "Fire / Smoke Damper / Baffle", value: 29 },
            { code: "C0607", desc: "Passive Fire Protection (e.g. Enclosure, Coat, Wall, Barrier, etc.)", value: 4 },
            { code: "C0608", desc: "Fire / Gas / Smoke Detectors", value: 12 },
            { code: "C0615", desc: "Rupture Disk / Bursting", value: 14 },
            { code: "C0616", desc: "Emergency Vent / Depressurizing Valve / Pressure Venting Valve", value: 9 },
            { code: "C0617", desc: "Subsea Isolation Valves (SSIV) / Boarding Valve", value: 6 },
        ],
    },
    {
        icon: PowerSquare,
        color: "#64748b",
        colorBg: "bg-slate-100 dark:bg-slate-700/30",
        title: "Shutdown Systems",
        abbr: "SS",
        total: 114,
        subGroups: 5,
        desc: "ESD, EDP, F&G system, HIPPS, subsea ESD",
        items: [
            { code: "C0701", desc: "Emergency Shutdown (ESD) System", value: 19 },
            { code: "C0702", desc: "Emergency Depressurization (EDP) System", value: 4 },
            { code: "C0703", desc: "Fire and Gas (F&G) System", value: 68 },
            { code: "C0704", desc: "High Integrity Pressure Protection System (HIPPS)", value: 8 },
            { code: "C0705", desc: "Subsea Emergency Shutdown System", value: 15 },
        ],
    },
    {
        icon: Cog,
        color: "#a855f7",
        colorBg: "bg-purple-50 dark:bg-purple-500/10",
        title: "Emergency Response",
        abbr: "ER",
        total: 21,
        subGroups: 6,
        desc: "TR, rescue boats, muster point, UPS, helideck",
        items: [
            { code: "C0801", desc: "Temporary Refuge (TR) / Personal Survival Craft", value: 3 },
            { code: "C0802", desc: "Rescue Boats", value: 4 },
            { code: "C0803", desc: "Emergency Escape Route", value: 2 },
            { code: "C0804", desc: "Muster Location and Emergency Control Center", value: 6 },
            { code: "C0805", desc: "Uninterruptible Power Supply (UPS)", value: 4 },
            { code: "C0806", desc: "Helicopter Facilities (e.g. Helideck, Refueling systems, Crash Equipment)", value: 2 },
        ],
    },
    {
        icon: LifeBuoy,
        color: "#f97316",
        colorBg: "bg-orange-50 dark:bg-orange-500/10",
        title: "Lifesaving",
        abbr: "LS",
        total: 2,
        subGroups: 2,
        desc: "Personal survival equipment and lifeboats",
        items: [
            { code: "C0901", desc: "Personal Survival Equipment", value: 1 },
            { code: "C0902", desc: "Lifeboat / Liferaft", value: 1 },
        ],
    },
];

const topCategories = [
    { name: "Piping Systems", value: 483, color: "#6366f1" },
    { name: "Electrical Earthing & Bonding", value: 190, color: "#22c55e" },
    { name: "Pressure Vessels", value: 231, color: "#ef4444" },
    { name: "Rotating Equipment", value: 114, color: "#f97316" },
    { name: "Fire & Gas (F&G) System", value: 68, color: "#eab308" },
    { name: "Gas Compression Equipment", value: 115, color: "#14b8a6" },
    { name: "Emergency Shutdown (ESD)", value: 19, color: "#a855f7" },
    { name: "Heat Exchangers", value: 96, color: "#64748b" },
];

const equipmentRegister = [
    { tag: "C0305-001", name: "Gas Export Piping – Section A", barrierGroup: "Process Containment", category: "Piping Systems", system: "Gas Export", status: "SCE" },
    { tag: "C0301-012", name: "HP Separator Vessel", barrierGroup: "Process Containment", category: "Pressure Vessels", system: "HP Separation", status: "SCE" },
    { tag: "C0404-003", name: "Earthing Bus Bar – MCC Room", barrierGroup: "Ignition Control", category: "Electrical Earthing", system: "Electrical", status: "SCE" },
    { tag: "C0501-001", name: "Gas Detector GD-101", barrierGroup: "Detection Systems", category: "Fire & Gas Detection", system: "F&G", status: "SCE" },
    { tag: "C0701-002", name: "ESD Valve XV-201", barrierGroup: "Shutdown Systems", category: "Emergency Shutdown", system: "ESD", status: "SCE" },
    { tag: "C0201-007", name: "Structural Frame – Platform A", barrierGroup: "Structural Integrity", category: "Structural Support", system: "Structure", status: "SCE" },
    { tag: "C0303-005", name: "Gas Compressor K-101", barrierGroup: "Process Containment", category: "Rotating Equipment", system: "Compression", status: "SCE" },
    { tag: "C0603-001", name: "Fire Hydrant Station 3", barrierGroup: "Protection Systems", category: "Hydrant / Monitors", system: "Firewater", status: "SCE" },
    { tag: "C0302-003", name: "Feed/Effluent Heat Exchanger", barrierGroup: "Process Containment", category: "Heat Exchangers", system: "Heat Transfer", status: "Not SCE" },
    { tag: "C0804-001", name: "Emergency Control Centre", barrierGroup: "Emergency Response", category: "Muster Location", system: "Emergency", status: "Not Assessed" },
];

const statusStyle: Record<string, string> = {
    "SCE": "bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30",
    "Not SCE": "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30",
    "Not Assessed": "bg-slate-100 dark:bg-slate-700/40 text-slate-500 border-slate-200 dark:border-[var(--color-brand-darkBorder)]",
};

const tooltipStyle = {
    borderRadius: "10px",
    border: "none",
    boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
    fontSize: 12,
    padding: "8px 12px",
    background: "#1e293b",
    color: "#e2e8f0",
};

// ─── Barrier Group Drawer ─────────────────────────────────────────────────────

function BarrierGroupDrawer({ group, open, onClose }: {
    group: BarrierGroup | null;
    open: boolean;
    onClose: () => void;
}) {
    // Close on Escape key
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open, onClose]);

    if (!group) return null;
    const Icon = group.icon;

    // Bar data for mini chart inside drawer
    const maxVal = Math.max(...group.items.map(i => i.value));

    return (
        <>
            {/* Backdrop */}
            <div
                aria-hidden
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
            />

            {/* Drawer panel */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label={`${group.title} Breakdown`}
                className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-slate-950 border-l border-slate-800 shadow-2xl shadow-black/60 flex flex-col transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div
                            className="p-2 rounded-xl"
                            style={{ backgroundColor: group.color + "20" }}
                        >
                            <Icon size={18} style={{ color: group.color }} />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-white">{group.title}</h2>
                            <p className="text-[11px] text-slate-400 mt-0.5">Barrier Group · {group.abbr}</p>
                        </div>
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
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

                    {/* Hero summary */}
                    <div
                        className="flex items-center gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900"
                        style={{ boxShadow: `0 0 24px ${group.color}20` }}
                    >
                        <div className="text-5xl font-bold" style={{ color: group.color }}>
                            {group.total}
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: group.color }}>
                                SCE Equipment
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">{group.subGroups} sub-group{group.subGroups !== 1 ? "s" : ""}</p>
                            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{group.desc}</p>
                        </div>
                    </div>

                    {/* SCE Breakdown label */}
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">SCE Category Breakdown</p>

                        {/* Item cards */}
                        <div className="space-y-2">
                            {group.items.map((item, i) => {
                                const barWidth = maxVal > 0 ? Math.round((item.value / maxVal) * 100) : 0;
                                return (
                                    <div
                                        key={i}
                                        className="p-3 rounded-xl border border-slate-800 bg-slate-900 flex flex-col gap-2"
                                    >
                                        {/* Code + count row */}
                                        <div className="flex items-center justify-between gap-2">
                                            <span
                                                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                                style={{
                                                    color: group.color,
                                                    backgroundColor: group.color + "18",
                                                }}
                                            >
                                                {item.code}
                                            </span>
                                            <span className="text-sm font-bold" style={{ color: group.color }}>
                                                {item.value}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-[11px] text-slate-300 leading-relaxed">{item.desc}</p>

                                        {/* Mini bar */}
                                        <div className="h-1 rounded-full bg-slate-700 overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-700"
                                                style={{ width: `${barWidth}%`, backgroundColor: group.color }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Total summary row */}
                    <div className="p-3 rounded-xl border border-slate-800 bg-slate-900 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">Total SCE in this group</span>
                        <span className="text-sm font-bold text-white">{group.total} equipment</span>
                    </div>
                </div>
            </div>
        </>
    );
}

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
        <div className={`bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 flex flex-col gap-4 ${className}`}>
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SCEDashboard() {
    const [barrierFilter, setBarrierFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedGroup, setSelectedGroup] = useState<BarrierGroup | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const openDrawer = (group: BarrierGroup) => {
        setSelectedGroup(group);
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const filteredEquipment = equipmentRegister.filter(e => {
        const matchBarrier = barrierFilter === "All" || e.barrierGroup.includes(barrierFilter);
        const matchStatus = statusFilter === "All" || e.status === statusFilter;
        return matchBarrier && matchStatus;
    });

    return (
        <>
            {/* Barrier Group Drawer */}
            <BarrierGroupDrawer group={selectedGroup} open={drawerOpen} onClose={closeDrawer} />

            <div className="space-y-5">

                {/* ── PAGE HEADER ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">SCE Dashboard</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                            Safety Critical Elements Assessment Overview ·{" "}
                            <span className="font-medium text-[var(--color-brand-primary)] dark:text-[var(--color-brand-primary)]">Larut-A (LRA)</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] hover:border-slate-300 dark:hover:border-slate-600 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                            <FileText size={14} className="text-red-500" /> Export PDF
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] hover:border-slate-300 dark:hover:border-slate-600 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                            <FileSpreadsheet size={14} className="text-emerald-500" /> Export Excel
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] rounded-lg shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                            <ShieldAlert size={14} /> View Assessments
                        </button>
                    </div>
                </div>

                {/* Filter Row */}
                <div className="flex items-center gap-2 flex-wrap">
                    {[
                        { label: "Facility", value: "Larut-A (LRA)" },
                        { label: "System", value: "All Systems" },
                        { label: "Barrier Group", value: "All Groups" },
                        { label: "Assessment Status", value: "All" },
                    ].map(({ label, value }) => (
                        <button key={label} className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg hover:border-[var(--color-brand-primary-soft)] dark:hover:border-[var(--color-brand-primary-soft)] transition-colors">
                            <span className="text-slate-400 dark:text-slate-500">{label}:</span>
                            <span>{value}</span>
                        </button>
                    ))}
                </div>

                {/* ════════════════════════════════════════ */}
                {/* SECTION 1 — SCE PROGRAM OVERVIEW         */}
                {/* ════════════════════════════════════════ */}
                <SectionHeader label="SCE Program Overview" />

                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">

                    {/* Total Equipment */}
                    <div className="relative bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[var(--color-brand-primary-soft)]0/8 dark:bg-[var(--color-brand-primary)]/10" />
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 rounded-xl bg-[var(--color-brand-primary-soft)] dark:bg-[var(--color-brand-primary)]/10">
                                <Database size={18} className="text-[var(--color-brand-primary)]" />
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--color-brand-primary-soft)] dark:bg-[var(--color-brand-primary)]/15 text-[var(--color-brand-primary)] dark:text-[var(--color-brand-primary)] border border-[var(--color-brand-primary-soft)] dark:border-[var(--color-brand-primary-soft)]">TOTAL</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">{kpiData.total.toLocaleString()}</p>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">Total Equipment</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">All registered assets</p>
                    </div>

                    {/* SCE Count */}
                    <div className="relative bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-red-500/8 dark:bg-red-500/10" />
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10">
                                <ShieldAlert size={18} className="text-red-500" />
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30">SCE</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">{kpiData.sce.toLocaleString()}</p>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">Safety Critical Elements</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Require safety assurance</p>
                    </div>

                    {/* Not SCE */}
                    <div className="relative bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-emerald-500/8 dark:bg-emerald-500/10" />
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
                                <CheckCircle2 size={18} className="text-emerald-500" />
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">NON-SCE</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">{kpiData.nonSce.toLocaleString()}</p>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">Not SCE</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Non-safety critical</p>
                    </div>

                    {/* Not Assessed */}
                    <div className="relative bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-amber-500/8 dark:bg-amber-500/10" />
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/10">
                                <AlertCircle size={18} className="text-amber-500" />
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">PENDING</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">{kpiData.notAssessed}</p>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">Not Assessed</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Pending classification</p>
                    </div>

                    {/* Assessment Coverage */}
                    <div className="relative bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-blue-500/8 dark:bg-blue-500/10" />
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10">
                                <BarChart2 size={18} className="text-blue-500" />
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">COVERAGE</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">{kpiData.coveragePct}%</p>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">Assessment Coverage</p>
                        <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${kpiData.coveragePct}%` }} />
                        </div>
                    </div>

                    {/* Total Barrier Groups */}
                    <div className="relative bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-purple-500/8 dark:bg-purple-500/10" />
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-500/10">
                                <Layers size={18} className="text-purple-500" />
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30">BARRIERS</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">{kpiData.barrierGroups}</p>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">Barrier Groups</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Safety barrier categories</p>
                    </div>

                </div>

                {/* ════════════════════════════════════════ */}
                {/* SECTION 2 — SCE DISTRIBUTION ANALYTICS   */}
                {/* ════════════════════════════════════════ */}
                <SectionHeader label="SCE Distribution Analytics" />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

                    {/* LEFT — Donut Chart */}
                    <DashboardCard title="SCE Distribution" subtitle="Equipment classification breakdown">
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative w-full min-h-[220px]">
                                <ResponsiveContainer width="100%" height={220}>
                                    <PieChart>
                                        <Pie
                                            data={donutData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={72}
                                            outerRadius={100}
                                            paddingAngle={2}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {donutData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={tooltipStyle}
                                            formatter={(value: string | number | undefined) => [value != null ? Number(value).toLocaleString() : "–", ""]}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                {/* Center Text */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-3xl font-bold text-slate-900 dark:text-white">28.9%</span>
                                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider mt-0.5">SCE Proportion</span>
                                </div>
                            </div>
                            {/* Legend */}
                            <div className="w-full grid grid-cols-3 gap-3 border-t border-slate-100 dark:border-[var(--color-brand-darkBorder)] pt-4">
                                {donutData.map((item, idx) => (
                                    <div key={idx} className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-[var(--color-brand-darkBorder)]">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium text-center">{item.name}</span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{item.value.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DashboardCard>

                    {/* RIGHT — Progress Bars */}
                    <DashboardCard title="Assessment Progress" subtitle="Distribution of assessment outcomes">
                        <div className="space-y-6 flex-1 flex flex-col justify-center py-2">
                            {progressData.map((item, idx) => (
                                <div key={idx}>
                                    <div className="flex items-center justify-between mb-2.5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-lg font-bold text-slate-900 dark:text-white">{item.value}%</span>
                                            <span className="text-xs text-slate-400 dark:text-slate-500 ml-2">({item.raw.toLocaleString()} items)</span>
                                        </div>
                                    </div>
                                    <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-700"
                                            style={{ width: `${item.value}%`, backgroundColor: item.color }}
                                        />
                                    </div>
                                </div>
                            ))}

                            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-[var(--color-brand-darkBorder)] mt-2">
                                <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                    99.6% of equipment has been assessed. Only <span className="font-semibold text-amber-500">34 items</span> remain unclassified.
                                </p>
                            </div>
                        </div>
                    </DashboardCard>

                </div>

                {/* ════════════════════════════════════════ */}
                {/* SECTION 3 — TOP SCE CATEGORIES           */}
                {/* ════════════════════════════════════════ */}
                <SectionHeader label="Top SCE Categories" />

                <DashboardCard
                    title="Top SCE Categories by Equipment Count"
                    subtitle="Largest safety-critical equipment categories — focus areas for safety assurance"
                    action={
                        <div className="flex items-center gap-1.5">
                            <Target size={13} className="text-[var(--color-brand-primary)]" />
                            <span className="text-[11px] font-medium text-[var(--color-brand-primary)] dark:text-[var(--color-brand-primary)]">Top 8 categories</span>
                        </div>
                    }
                >
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={topCategories}
                                layout="vertical"
                                margin={{ top: 4, right: 48, bottom: 0, left: 8 }}
                                barSize={20}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(148,163,184,0.12)" />
                                <XAxis
                                    type="number"
                                    tick={{ fontSize: 11, fill: "currentColor" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    tick={{ fontSize: 11, fill: "currentColor" }}
                                    axisLine={false}
                                    tickLine={false}
                                    width={180}
                                />
                                <Tooltip
                                    contentStyle={tooltipStyle}
                                    cursor={{ fill: "rgba(148,163,184,0.08)" }}
                                    formatter={(value) => [`${value} equipment`, "SCE Count"]}
                                />
                                <Bar dataKey="value" radius={[0, 6, 6, 0]} label={{ position: "right", fontSize: 11, fontWeight: 600, fill: "currentColor" }}>
                                    {topCategories.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap gap-3 border-t border-slate-100 dark:border-[var(--color-brand-darkBorder)] pt-3">
                        {topCategories.map(({ name, color }) => (
                            <div key={name} className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: color }} />
                                <span className="text-[10px] text-slate-500 dark:text-slate-400">{name}</span>
                            </div>
                        ))}
                    </div>
                </DashboardCard>

                {/* ════════════════════════════════════════ */}
                {/* SECTION 4 — SCE BY BARRIER GROUP         */}
                {/* ════════════════════════════════════════ */}
                <SectionHeader label="SCE by Barrier Group" />

                <p className="text-[11px] text-slate-400 dark:text-slate-500 -mt-3">
                    Click any card to view detailed SCE category breakdown.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {barrierGroups.map((group, idx) => {
                        const Icon = group.icon;
                        return (
                            <button
                                key={idx}
                                onClick={() => openDrawer(group)}
                                className="group relative bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 cursor-pointer overflow-hidden text-left w-full"
                                style={{
                                    // Subtle glow on hover via box-shadow
                                    ["--glow" as string]: group.color,
                                }}
                            >
                                {/* Background circle decoration */}
                                <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full opacity-40 dark:opacity-20" style={{ backgroundColor: group.color + "20" }} />

                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-2.5 rounded-xl ${group.colorBg}`}>
                                        <Icon size={20} style={{ color: group.color }} />
                                    </div>
                                    <span
                                        className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                                        style={{
                                            color: group.color,
                                            backgroundColor: group.color + "18",
                                            borderColor: group.color + "40",
                                        }}
                                    >
                                        {group.abbr}
                                    </span>
                                </div>

                                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug mb-1">
                                    {group.title}
                                </h3>
                                <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed mb-4 min-h-[32px]">
                                    {group.desc}
                                </p>

                                <div className="flex items-center justify-between border-t border-slate-100 dark:border-[var(--color-brand-darkBorder)] pt-3">
                                    <div>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">SCE Count</p>
                                        <p className="text-xl font-bold mt-0.5" style={{ color: group.color }}>{group.total}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">Sub-groups</p>
                                        <p className="text-xl font-bold text-slate-700 dark:text-slate-300 mt-0.5">{group.subGroups}</p>
                                    </div>
                                </div>

                                {/* View details hint */}
                                <div className="flex items-center justify-end mt-3 pt-2 border-t border-slate-100 dark:border-[var(--color-brand-darkBorder)]">
                                    <span className="text-[11px] font-medium flex items-center gap-1 transition-all group-hover:gap-2 duration-200" style={{ color: group.color }}>
                                        View Details <ChevronRight size={12} />
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* ════════════════════════════════════════ */}
                {/* SECTION 5 — SCE EQUIPMENT REGISTER       */}
                {/* ════════════════════════════════════════ */}
                <SectionHeader label="SCE Equipment Register" />

                <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5">
                    {/* Filter row */}
                    <div className="flex items-center gap-3 flex-wrap mb-4">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Filter:</span>
                        <div className="overflow-x-auto"><div className="flex border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg overflow-hidden min-w-max">
                            {["All", "Process Containment", "Structural Integrity", "Protection Systems"].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setBarrierFilter(f)}
                                    className={`px-3 py-1 text-xs font-medium transition-colors ${barrierFilter === f
                                        ? "bg-[var(--color-brand-primary)] text-white"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                        }`}
                                >
                                    {f === "All" ? "All Groups" : f.split(" ").slice(-1)[0]}
                                </button>
                            ))}
                        </div></div>
                        <div className="overflow-x-auto"><div className="flex border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg overflow-hidden min-w-max">
                            {["All", "SCE", "Not SCE", "Not Assessed"].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setStatusFilter(s)}
                                    className={`px-3 py-1 text-xs font-medium transition-colors ${statusFilter === s
                                        ? "bg-[var(--color-brand-primary)] text-white"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div></div>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 ml-auto">
                            Showing {filteredEquipment.length} of {equipmentRegister.length} records
                        </span>
                    </div>

                    <div className="rounded-xl border border-slate-100 dark:border-[var(--color-brand-darkBorder)] overflow-hidden overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-[var(--color-brand-darkBorder)]">
                                <tr>
                                    {["Asset Tag", "Equipment Name", "Barrier Group", "SCE Category", "System", "Status"].map(h => (
                                        <th key={h} className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredEquipment.map((eq, i) => (
                                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-[var(--color-brand-darkHover)]/40 transition-colors cursor-pointer group">
                                        <td className="px-3 py-2.5 font-mono font-semibold text-slate-800 dark:text-slate-200">{eq.tag}</td>
                                        <td className="px-3 py-2.5 text-slate-600 dark:text-slate-300 max-w-[180px]">
                                            <span className="group-hover:text-[var(--color-brand-primary)] dark:group-hover:text-[var(--color-brand-primary)] transition-colors truncate block">{eq.name}</span>
                                        </td>
                                        <td className="px-3 py-2.5 text-slate-500 dark:text-slate-400 max-w-[150px]">
                                            <span className="truncate block">{eq.barrierGroup}</span>
                                        </td>
                                        <td className="px-3 py-2.5 text-slate-500 dark:text-slate-400 max-w-[140px]">
                                            <span className="truncate block">{eq.category}</span>
                                        </td>
                                        <td className="px-3 py-2.5 text-slate-500 dark:text-slate-400">{eq.system}</td>
                                        <td className="px-3 py-2.5">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusStyle[eq.status] ?? statusStyle["Not Assessed"]}`}>
                                                {eq.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {filteredEquipment.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-400 dark:text-slate-500 italic">
                                            No equipment matches the selected filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3">
                        Click any row to open the asset detail view. Table shows sample data — connect to live API for full register.
                    </p>
                </div>

            </div>
        </>
    );
}
