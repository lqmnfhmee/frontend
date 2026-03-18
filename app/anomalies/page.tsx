"use client";

import { useState } from "react";
import { AlertTriangle, AlertCircle, ShieldAlert, Timer, Download, Calendar, ArrowRight, User, Hash, TrendingUp, TrendingDown, Minus, ShieldCheck, Clock, MapPin } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

// Types
type Priority = "P1" | "P2" | "P3" | "P4";
type RiskLevel = "Critical" | "High" | "Medium" | "Low";
type Status = "Open" | "In Progress" | "Deferred" | "Closed";
type RiskTrend = "increasing" | "stable" | "improving";

interface AnomalyData {
    id: string;
    equipment: string;
    finding: string;
    cause: string;
    area: string;
    priority: Priority;
    risk: RiskLevel;
    action: string;
    responsible: string;
    dueDate: string;
    status: Status;
    reportedDate: string;
    daysOpen: number;
    trend?: RiskTrend;
}

const MOCK_ANOMALIES: AnomalyData[] = [
    {
        id: "ANM-2026-001",
        equipment: "Pipe Support (PS-2041)",
        finding: "Severe corrosion on base plate",
        cause: "External corrosion / CUI",
        area: "Process Area 2",
        priority: "P2",
        risk: "High",
        action: "Replace support base",
        responsible: "Maintenance",
        dueDate: "2026-03-15",
        status: "Open",
        reportedDate: "2026-03-01",
        daysOpen: 9,
        trend: "stable"
    },
    {
        id: "ANM-2026-002",
        equipment: "Deck Plate",
        finding: "Structural damage, >50% wall loss",
        cause: "Physical damage / Corrosion",
        area: "Platform Level 1",
        priority: "P1",
        risk: "Critical",
        action: "Emergency patch repair",
        responsible: "Structural Team",
        dueDate: "2026-03-10",
        status: "In Progress",
        reportedDate: "2026-02-15",
        daysOpen: 23,
        trend: "increasing"
    },
    {
        id: "ANM-2026-003",
        equipment: "2HX-215",
        finding: "Bolt corrosion (<30% surface)",
        cause: "External corrosion",
        area: "CPP-CSU",
        priority: "P3",
        risk: "Medium",
        action: "Recoat bolts",
        responsible: "Maintenance",
        dueDate: "Next shutdown",
        status: "Open",
        reportedDate: "2026-02-28",
        daysOpen: 10,
        trend: "improving"
    },
    {
        id: "ANM-2026-004",
        equipment: "V-1004",
        finding: "Coating blister near inlet nozzle",
        cause: "Coating deterioration",
        area: "Separation",
        priority: "P4",
        risk: "Low",
        action: "Monitor during next Turnaround",
        responsible: "Inspection Team",
        dueDate: "2027-01-15",
        status: "Deferred",
        reportedDate: "2026-01-20",
        daysOpen: 49,
        trend: "stable"
    },
    {
        id: "ANM-2026-005",
        equipment: "P-302A",
        finding: "Seal leak, minor weepage",
        cause: "Mechanical defect",
        area: "Export Pumps",
        priority: "P2",
        risk: "High",
        action: "Replace mechanical seal",
        responsible: "Rotating Eq. Team",
        dueDate: "2026-03-20",
        status: "Open",
        reportedDate: "2026-03-05",
        daysOpen: 5,
        trend: "stable"
    },
    {
        id: "ANM-2026-006",
        equipment: "HPS-102",
        finding: "Broken spring leaf",
        cause: "Fatigue",
        area: "Process Area 2",
        priority: "P1",
        risk: "Critical",
        action: "Immediate replacement",
        responsible: "Maintenance",
        dueDate: "2026-03-11",
        status: "Open",
        reportedDate: "2026-02-05",
        daysOpen: 33,
        trend: "increasing"
    },
];

const TREND_DATA = [
    { month: "Apr 2025", newRegister: 5, completed: 3, active: 12 },
    { month: "May 2025", newRegister: 8, completed: 6, active: 14 },
    { month: "Jun 2025", newRegister: 4, completed: 7, active: 11 },
    { month: "Jul 2025", newRegister: 10, completed: 5, active: 16 },
    { month: "Aug 2025", newRegister: 6, completed: 8, active: 14 },
    { month: "Sep 2025", newRegister: 9, completed: 4, active: 19 },
    { month: "Oct 2025", newRegister: 7, completed: 10, active: 16 },
    { month: "Nov 2025", newRegister: 12, completed: 8, active: 20 },
    { month: "Dec 2025", newRegister: 5, completed: 12, active: 13 },
    { month: "Jan 2026", newRegister: 8, completed: 6, active: 15 },
    { month: "Feb 2026", newRegister: 10, completed: 9, active: 16 },
    { month: "Mar 2026", newRegister: 6, completed: 4, active: 18 },
];

// Utility functions for priority styling
const getPriorityColor = (priority: Priority) => {
    switch (priority) {
        case "P1": return "bg-red-500/10 text-red-500 border-red-500/20";
        case "P2": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
        case "P3": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
        case "P4": return "bg-green-500/10 text-green-500 border-green-500/20";
        default: return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    }
};

const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
        case "Critical": return "text-red-500";
        case "High": return "text-orange-500";
        case "Medium": return "text-yellow-500";
        case "Low": return "text-green-500";
        default: return "text-slate-500";
    }
};

const getBacklogSeverity = (days: number) => {
    if (days >= 30) return "bg-red-500/10 text-red-500 border-red-500/20";
    if (days >= 15) return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    return "bg-slate-500/10 text-slate-500 border-slate-500/20";
};

const renderTrendIcon = (trend?: RiskTrend) => {
    switch (trend) {
        case "increasing": return <TrendingUp size={14} className="text-red-500" />;
        case "improving": return <TrendingDown size={14} className="text-green-500" />;
        case "stable": return <Minus size={14} className="text-slate-400" />;
        default: return null;
    }
};

export default function AnomaliesPage() {
    const criticalAnomalies = MOCK_ANOMALIES.filter(a => a.priority === "P1" || a.priority === "P2");

    // Priority distribution calculation
    const getPriorityStats = (priority: Priority) => {
        const priorityAnomalies = MOCK_ANOMALIES.filter(a => a.priority === priority);
        const active = priorityAnomalies.filter(a => ["Open", "In Progress", "Deferred"].includes(a.status)).length;
        const completed = priorityAnomalies.filter(a => a.status === "Closed").length;
        return { total: priorityAnomalies.length, active, completed };
    };

    const pStats = {
        P1: getPriorityStats("P1"),
        P2: getPriorityStats("P2"),
        P3: getPriorityStats("P3"),
        P4: getPriorityStats("P4"),
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Anomalies Dashboard</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Operational view of equipment defects and repair actions</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] rounded-lg transition-colors shadow-sm">
                        <Download size={15} /> Export Report
                    </button>
                </div>

                {/* Situational Awareness Bar */}
                <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg p-3 flex flex-wrap items-center gap-x-6 gap-y-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                    <div className="flex items-center gap-2 px-3 border-r-0 sm:border-r border-slate-200 dark:border-slate-800">
                        <ShieldCheck className="text-green-500" size={18} />
                        <div>
                            <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none">Facility Status</span>
                            <span className="text-sm font-bold text-green-500 leading-tight">LOW RISK</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 border-r-0 sm:border-r border-slate-200 dark:border-slate-800">
                        <AlertTriangle className="text-red-500" size={18} />
                        <div>
                            <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none">Critical Anomalies</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">4 Pending</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 border-r-0 sm:border-r border-slate-200 dark:border-slate-800">
                        <Clock className="text-orange-500" size={18} />
                        <div>
                            <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none">Overdue Repairs</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">1 Action</span>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-4 py-1.5 rounded-md">
                        <Calendar className="text-[var(--color-brand-primary)]" size={16} />
                        <div>
                            <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none">Next Major Action</span>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Deck Plate Emergency Repair (Mar 10)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ROW 1: IMMEDIATE ACTION & SUMMARY */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Critical Anomalies Panel (75%) */}
                <section className="lg:col-span-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl overflow-hidden shadow-sm flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    <div className="bg-red-100 dark:bg-red-900/40 px-5 py-3 border-b border-red-200 dark:border-red-900/50 flex items-center gap-2">
                        <AlertTriangle className="text-red-600 dark:text-red-500" size={18} />
                        <h2 className="font-semibold text-red-900 dark:text-red-400 text-sm">CRITICAL ANOMALIES REQUIRES IMMEDIATE ACTION</h2>
                    </div>
                    <div className="p-0 overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-[var(--color-brand-darkCard)]/50">
                                <tr>
                                    <th className="px-5 py-3 font-medium">Equipment</th>
                                    <th className="px-5 py-3 font-medium">Issue</th>
                                    <th className="px-5 py-3 font-medium text-center">Priority</th>
                                    <th className="px-5 py-3 font-medium">Action Required</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-red-100 dark:divide-red-900/30">
                                {criticalAnomalies.map(anomaly => (
                                    <tr key={anomaly.id} className="bg-white dark:bg-[var(--color-brand-darkCard)] hover:bg-red-50/50 dark:hover:bg-red-900/10 transition-colors">
                                        <td className="px-5 py-3 font-semibold text-slate-900 dark:text-slate-200">{anomaly.equipment}</td>
                                        <td className="px-5 py-3 text-slate-700 dark:text-slate-300">{anomaly.finding}</td>
                                        <td className="px-5 py-3 text-center">
                                            <span className={`inline-flex items-center justify-center px-2 py-1 rounded text-xs font-bold border ${getPriorityColor(anomaly.priority)}`}>
                                                {anomaly.priority} - {anomaly.risk}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                                            <ArrowRight size={14} className="text-red-500" />
                                            {anomaly.action}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Integrity Summary (25%) */}
                <section className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl p-5 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    <div>
                        <h2 className="font-semibold text-slate-900 dark:text-white text-sm mb-4">Integrity Summary</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500 font-medium">Open Anomalies</span>
                                <span className="text-lg font-bold text-slate-900 dark:text-white">18</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500 font-medium">Critical Risk</span>
                                <span className="text-lg font-bold text-red-500">4</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500 font-medium">Avg Resolution Time</span>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">14 Days</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                            <TrendingDown size={12} className="text-green-500" />
                            Backlog Trend: Improving
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }} />
                        </div>
                    </div>
                </section>
            </div>

            {/* ROW 2: PRIORITY & HIGH RISK */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Priority Distribution */}
                <section className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm lg:col-span-3 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    <div className="p-5 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] flex items-center gap-2 text-orange-500">
                        <Hash size={18} />
                        <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Priority Distribution</h2>
                    </div>
                    <div className="p-5 overflow-x-auto">
                        <table className="w-full text-center text-sm border-collapse border border-slate-300 dark:border-[var(--color-brand-darkBorder)] min-w-[500px]">
                            <thead>
                                <tr>
                                    <th colSpan={8} className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-semibold bg-white dark:bg-slate-800 text-slate-900 dark:text-white uppercase tracking-wider text-xs">Priority Matrix</th>
                                </tr>
                                <tr>
                                    <th colSpan={2} className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-bold bg-[#ef4444] text-white">P1</th>
                                    <th colSpan={2} className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-bold bg-[#f97316] text-white">P2</th>
                                    <th colSpan={2} className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-bold bg-[#eab308] text-slate-900">P3</th>
                                    <th colSpan={2} className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-bold bg-[#22c55e] text-white">P4</th>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white">{pStats.P1.total}</td>
                                    <td colSpan={2} className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white">{pStats.P2.total}</td>
                                    <td colSpan={2} className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white">{pStats.P3.total}</td>
                                    <td colSpan={2} className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white">{pStats.P4.total}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-slate-50 dark:bg-slate-800/50">
                                    <td className="p-2 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-semibold text-slate-700 dark:text-slate-300 text-[10px] uppercase">Active</td>
                                    <td className="p-2 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-semibold text-slate-700 dark:text-slate-300 text-[10px] uppercase">Done</td>
                                    <td className="p-2 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-semibold text-slate-700 dark:text-slate-300 text-[10px] uppercase">Active</td>
                                    <td className="p-2 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-semibold text-slate-700 dark:text-slate-300 text-[10px] uppercase">Done</td>
                                    <td className="p-2 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-semibold text-slate-700 dark:text-slate-300 text-[10px] uppercase">Active</td>
                                    <td className="p-2 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-semibold text-slate-700 dark:text-slate-300 text-[10px] uppercase">Done</td>
                                    <td className="p-2 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-semibold text-slate-700 dark:text-slate-300 text-[10px] uppercase">Active</td>
                                    <td className="p-2 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-semibold text-slate-700 dark:text-slate-300 text-[10px] uppercase">Done</td>
                                </tr>
                                <tr className="bg-white dark:bg-[var(--color-brand-darkCard)]">
                                    <td className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-medium text-slate-600 dark:text-slate-400">{pStats.P1.active}</td>
                                    <td className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-medium text-slate-400 dark:text-slate-600">{pStats.P1.completed}</td>
                                    <td className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-medium text-slate-600 dark:text-slate-400">{pStats.P2.active}</td>
                                    <td className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-medium text-slate-400 dark:text-slate-600">{pStats.P2.completed}</td>
                                    <td className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-medium text-slate-600 dark:text-slate-400">{pStats.P3.active}</td>
                                    <td className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-medium text-slate-400 dark:text-slate-600">{pStats.P3.completed}</td>
                                    <td className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-medium text-slate-600 dark:text-slate-400">{pStats.P4.active}</td>
                                    <td className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-medium text-slate-400 dark:text-slate-600">{pStats.P4.completed}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* High Risk Equipment List */}
                <section className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm lg:col-span-2 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    <div className="p-5 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-slate-900 dark:text-white text-sm">High Risk Equipment</h2>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold mt-1">Asset defects ranked by risk (P1 & P2)</p>
                        </div>
                        <AlertCircle size={16} className="text-orange-500" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30">
                                <tr>
                                    <th className="px-5 py-3 font-medium">Equipment</th>
                                    <th className="px-5 py-3 font-medium text-center">Trend</th>
                                    <th className="px-5 py-3 font-medium">Risk Level</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {criticalAnomalies.map(anomaly => (
                                    <tr key={`high-risk-${anomaly.id}`} className="hover:bg-slate-50 dark:hover:bg-[var(--color-brand-darkHover)]/50 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="font-semibold text-slate-900 dark:text-slate-200">{anomaly.equipment}</div>
                                            <div className="text-[11px] text-slate-500 truncate max-w-[150px]">{anomaly.finding}</div>
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                            <div className="flex justify-center">
                                                {renderTrendIcon(anomaly.trend)}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className={`h-2.5 w-1 rounded-full ${anomaly.risk === 'Critical' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-orange-500'}`} />
                                                <span className={`font-bold ${getRiskColor(anomaly.risk)}`}>
                                                    {anomaly.risk}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            {/* ROW 3: ISSUES & PENDING ACTIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Equipment Issues Table (3/5) */}
                <section className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm lg:col-span-3 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    <div className="p-5 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)]">
                        <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Equipment Issues</h2>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold mt-1">Detailed defect mechanism by area</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30">
                                <tr>
                                    <th className="px-5 py-3 font-medium">Equipment</th>
                                    <th className="px-5 py-3 font-medium">Finding</th>
                                    <th className="px-5 py-3 font-medium">Area</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {MOCK_ANOMALIES.map(anomaly => (
                                    <tr key={`issue-${anomaly.id}`} className="hover:bg-slate-50 dark:hover:bg-[var(--color-brand-darkHover)]/50 transition-colors">
                                        <td className="px-5 py-3 font-semibold text-slate-900 dark:text-slate-200">{anomaly.equipment}</td>
                                        <td className="px-5 py-3">
                                            <div className="text-slate-700 dark:text-slate-300">{anomaly.finding}</div>
                                            <div className="text-[10px] text-slate-400">{anomaly.cause}</div>
                                        </td>
                                        <td className="px-5 py-3 text-slate-500 dark:text-slate-400">
                                            <div className="flex items-center gap-1">
                                                <MapPin size={12} /> {anomaly.area}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Pending Actions Registry (2/5) */}
                <section className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm lg:col-span-2 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    <div className="p-5 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)]">
                        <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Pending Actions Registry</h2>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold mt-1">Required maintenance actions</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30">
                                <tr>
                                    <th className="px-5 py-3 font-medium">Action</th>
                                    <th className="px-5 py-3 font-medium">Responsible</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {MOCK_ANOMALIES.filter(a => a.status !== "Closed" && a.status !== "Deferred").map(anomaly => (
                                    <tr key={`action-${anomaly.id}`} className="hover:bg-slate-50 dark:hover:bg-[var(--color-brand-darkHover)]/50 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="font-medium text-slate-900 dark:text-slate-200">{anomaly.action}</div>
                                            <div className="text-[10px] text-slate-500">{anomaly.equipment}</div>
                                        </td>
                                        <td className="px-5 py-3 text-slate-500 dark:text-slate-400">
                                            <div className="flex items-center gap-1.5 font-medium">
                                                <User size={12} /> {anomaly.responsible}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            {/* ROW 4: BACKLOG & DEADLINES */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Oldest Open Anomalies (3/5) */}
                <section className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm lg:col-span-3 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    <div className="p-5 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Oldest Open Anomalies</h2>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold mt-1">Monitoring long-running backlog items</p>
                        </div>
                        <Timer size={16} className="text-red-500" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30">
                                <tr>
                                    <th className="px-5 py-3 font-medium">Equipment</th>
                                    <th className="px-5 py-3 font-medium">Reported Date</th>
                                    <th className="px-5 py-3 font-medium text-right">Age (Days)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {[...MOCK_ANOMALIES].sort((a, b) => b.daysOpen - a.daysOpen).map(anomaly => (
                                    <tr key={`oldest-${anomaly.id}`} className="hover:bg-slate-50 dark:hover:bg-[var(--color-brand-darkHover)]/50 transition-colors">
                                        <td className="px-5 py-3 font-medium text-slate-900 dark:text-slate-200">{anomaly.equipment}</td>
                                        <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{anomaly.reportedDate}</td>
                                        <td className="px-5 py-3 text-right">
                                            <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-bold border ${getBacklogSeverity(anomaly.daysOpen)}`}>
                                                {anomaly.daysOpen}d
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Action Status & Deadlines (2/5) */}
                <section className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm lg:col-span-2 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    <div className="p-5 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)]">
                        <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Action Status & Deadlines</h2>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold mt-1">Resolution progress milestones</p>
                    </div>

                    <div className="p-5 flex-1 flex flex-col gap-6">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg p-3">
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">18</div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">Active Actions</div>
                            </div>
                            <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                                <div className="text-2xl font-bold text-red-500">1</div>
                                <div className="text-[10px] text-red-400 font-bold uppercase mt-1">Overdue</div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Critical Deadlines</h3>
                            <div className="space-y-3">
                                {[
                                    { eq: "Deck Plate", date: "10 Mar 2026", status: "CRITICAL" },
                                    { eq: "Pipe Support", date: "15 Mar 2026", status: "ON TRACK" },
                                    { eq: "P-302A Seal", date: "20 Mar 2026", status: "ON TRACK" },
                                ].map(dl => (
                                    <div key={dl.eq} className="flex justify-between items-center text-sm border-l-2 border-[var(--color-brand-primary)] dark:border-[var(--color-brand-primary)] pl-3">
                                        <div>
                                            <div className="font-bold text-slate-800 dark:text-slate-200 text-xs">{dl.eq}</div>
                                            <div className={`text-[10px] font-bold ${dl.status === 'CRITICAL' ? 'text-red-500' : 'text-slate-400'}`}>{dl.status}</div>
                                        </div>
                                        <div className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-[10px]">{dl.date}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ROW 5: TRENDS & ANALYTICS */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Anomaly Backlog Evolution (3/5) */}
                <section className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm overflow-hidden flex flex-col lg:col-span-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    <div className="p-5 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)]">
                        <h2 className="font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Anomaly Backlog Evolution</h2>
                        <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Supporting Analytics • Last 12 Months</p>
                    </div>
                    <div className="p-5">
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={TREND_DATA}
                                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                                    <XAxis
                                        dataKey="month"
                                        tick={{ fill: "#64748b", fontSize: 9 }}
                                        axisLine={false}
                                        tickLine={false}
                                        interval={1}
                                    />
                                    <YAxis
                                        tick={{ fill: "#64748b", fontSize: 9 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "rgba(30, 41, 59, 0.9)",
                                            borderRadius: "8px",
                                            border: "none",
                                            color: "#fff",
                                            fontSize: "10px"
                                        }}
                                    />
                                    <Line type="monotone" dataKey="active" stroke="var(--color-brand-primary)" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="newRegister" stroke="#3b82f6" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </section>

                {/* Top Anomaly Causes (1/5) */}
                <section className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl p-5 shadow-sm lg:col-span-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    <div className="mb-4">
                        <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Top Anomaly Causes</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { cause: "Corrosion / CUI", percent: 40, color: "bg-red-500" },
                            { cause: "Coating Failure", percent: 26, color: "bg-orange-500" },
                            { cause: "Fatigue", percent: 20, color: "bg-yellow-500" },
                            { cause: "Mechanical", percent: 14, color: "bg-green-500" },
                        ].map(item => (
                            <div key={item.cause} className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold uppercase">
                                    <span className="text-slate-500">{item.cause}</span>
                                    <span className="text-slate-900 dark:text-white">{item.percent}%</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${item.color}`}
                                        style={{ width: `${item.percent}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Risk Exposure by Area (1/5) */}
                <section className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl p-5 shadow-sm lg:col-span-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    <div className="mb-4">
                        <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Risk by Area</h2>
                    </div>
                    <div className="space-y-3">
                        {[
                            { area: "Process Area 2", count: 5, color: "bg-red-500" },
                            { area: "Platform Level 1", count: 4, color: "bg-orange-500" },
                            { area: "Export Pumps", count: 2, color: "bg-yellow-500" },
                            { area: "CPP-CSU", count: 1, color: "bg-green-500" },
                        ].map(item => (
                            <div key={item.area} className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold text-slate-500">
                                    <span>{item.area}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-sm overflow-hidden flex">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`flex-1 border-r border-white/10 dark:border-black/20 ${i < item.count ? item.color : ''}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-900 dark:text-white w-2">{item.count}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

        </div>
    );
}
