"use client";

import { useState } from "react";
import { AlertTriangle, AlertCircle, ShieldAlert, Timer, Download, Calendar, ArrowRight, User, Hash } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

// Types
type Priority = "P1" | "P2" | "P3" | "P4";
type RiskLevel = "Critical" | "High" | "Medium" | "Low";
type Status = "Open" | "In Progress" | "Deferred" | "Closed";

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
        reportedDate: "2026-03-08"
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
        reportedDate: "2026-03-09"
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
        reportedDate: "2026-02-28"
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
        reportedDate: "2026-01-20"
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
        reportedDate: "2026-03-05"
    },
];

const TREND_DATA = [
    { month: "Apr 2025", newRegister: 0, completed: 0, active: 0 },
    { month: "May 2025", newRegister: 0, completed: 0, active: 0 },
    { month: "Jun 2025", newRegister: 0, completed: 0, active: 0 },
    { month: "Jul 2025", newRegister: 0, completed: 0, active: 0 },
    { month: "Aug 2025", newRegister: 0, completed: 0, active: 0 },
    { month: "Sep 2025", newRegister: 0, completed: 0, active: 0 },
    { month: "Oct 2025", newRegister: 0, completed: 0, active: 0 },
    { month: "Nov 2025", newRegister: 0, completed: 0, active: 0 },
    { month: "Dec 2025", newRegister: 0, completed: 3, active: 0 },
    { month: "Jan 2026", newRegister: 0, completed: 0, active: 0 },
    { month: "Feb 2026", newRegister: 0, completed: 0, active: 0 },
    { month: "Mar 2026", newRegister: 0, completed: 0, active: 0 },
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Anomalies Dashboard</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Operational view of equipment defects and repair actions</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] rounded-lg transition-colors shadow-sm">
                    <Download size={15} /> Export Report
                </button>
            </div>

            {/* 1. TOP SECTION: Critical Anomalies Panel */}
            <section className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl overflow-hidden shadow-sm flex flex-col">
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

            {/* 2. MIDDLE SECTION: Risk Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                {/* Priority Distribution */}
                <section className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm xl:col-span-3 flex flex-col">
                    <div className="p-5 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] flex items-center gap-2 text-orange-500">
                        <Hash size={18} />
                        <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Priority Distribution</h2>
                    </div>
                    <div className="p-5 overflow-x-auto">
                        <table className="w-full text-center text-sm border-collapse border border-slate-300 dark:border-[var(--color-brand-darkBorder)] min-w-[600px]">
                            <thead>
                                <tr>
                                    <th colSpan={8} className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-semibold bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Priority</th>
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
                                <tr className="bg-slate-50 dark:bg-slate-800/50">
                                    <th className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-semibold text-slate-700 dark:text-slate-300 w-[12.5%]">Active</th>
                                    <th className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-semibold text-slate-700 dark:text-slate-300 w-[12.5%]">Completed</th>
                                    <th className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-semibold text-slate-700 dark:text-slate-300 w-[12.5%]">Active</th>
                                    <th className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-semibold text-slate-700 dark:text-slate-300 w-[12.5%]">Completed</th>
                                    <th className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-semibold text-slate-700 dark:text-slate-300 w-[12.5%]">Active</th>
                                    <th className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-semibold text-slate-700 dark:text-slate-300 w-[12.5%]">Completed</th>
                                    <th className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-semibold text-slate-700 dark:text-slate-300 w-[12.5%]">Active</th>
                                    <th className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-semibold text-slate-700 dark:text-slate-300 w-[12.5%]">Completed</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white dark:bg-[var(--color-brand-darkCard)]">
                                    <td className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-medium text-slate-600 dark:text-slate-400">{pStats.P1.active}</td>
                                    <td className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-medium text-slate-600 dark:text-slate-400">{pStats.P1.completed}</td>
                                    <td className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-medium text-slate-600 dark:text-slate-400">{pStats.P2.active}</td>
                                    <td className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-medium text-slate-600 dark:text-slate-400">{pStats.P2.completed}</td>
                                    <td className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-medium text-slate-600 dark:text-slate-400">{pStats.P3.active}</td>
                                    <td className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-medium text-slate-600 dark:text-slate-400">{pStats.P3.completed}</td>
                                    <td className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-medium text-slate-600 dark:text-slate-400">{pStats.P4.active}</td>
                                    <td className="p-3 border border-slate-300 dark:border-[var(--color-brand-darkBorder)] font-medium text-slate-600 dark:text-slate-400">{pStats.P4.completed}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* High Risk Equipment List */}
                <section className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm xl:col-span-2 flex flex-col">
                    <div className="p-5 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)]">
                        <h2 className="font-semibold text-slate-900 dark:text-white text-sm">High Risk Equipment List</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Asset defects ranked by risk (P1 & P2)</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30">
                                <tr>
                                    <th className="px-5 py-3 font-medium">Equipment</th>
                                    <th className="px-5 py-3 font-medium">Finding</th>
                                    <th className="px-5 py-3 font-medium text-center">Priority</th>
                                    <th className="px-5 py-3 font-medium">Risk Level</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {criticalAnomalies.map(anomaly => (
                                    <tr key={`high-risk-${anomaly.id}`} className="hover:bg-slate-50 dark:hover:bg-[var(--color-brand-darkHover)]/50 transition-colors">
                                        <td className="px-5 py-3 font-medium text-slate-900 dark:text-slate-200">{anomaly.equipment}</td>
                                        <td className="px-5 py-3 text-slate-600 dark:text-slate-300 truncate max-w-[200px]">{anomaly.finding}</td>
                                        <td className="px-5 py-3 text-center">
                                            <span className={`inline-flex px-1.5 py-0.5 rounded text-xs font-semibold border ${getPriorityColor(anomaly.priority)}`}>
                                                {anomaly.priority}
                                            </span>
                                        </td>
                                        <td className={`px-5 py-3 font-semibold ${getRiskColor(anomaly.risk)}`}>
                                            {anomaly.risk}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            {/* NEW TREND GRAPH SECTION */}
            <section className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm overflow-hidden flex flex-col mt-6">
                <div className="p-5 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)]">
                    <h2 className="font-semibold text-slate-900 dark:text-white text-base">Monthly Trend (Last 12 Months)</h2>
                </div>
                <div className="p-5 overflow-hidden">
                    <div className="h-[300px] w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={TREND_DATA}
                                margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.2)" />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fill: "#64748b", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    angle={-45}
                                    textAnchor="end"
                                    dy={10}
                                />
                                <YAxis
                                    tick={{ fill: "#64748b", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    domain={[0, 3]}
                                    tickCount={5}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#ffffff",
                                        borderRadius: "6px",
                                        border: "1px solid #e2e8f0",
                                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                                        fontSize: "12px",
                                        padding: "12px"
                                    }}
                                    labelStyle={{ color: "#334155", fontWeight: 600, marginBottom: "8px", fontSize: "12px" }}
                                    itemStyle={{ paddingBottom: "4px" }}
                                    formatter={(value, name) => {
                                        switch (name) {
                                            case 'newRegister': return [value, 'New Anomaly Register'];
                                            case 'completed': return [value, 'Anomaly Completed'];
                                            case 'active': return [value, 'Total Active Anomaly'];
                                            default: return [value, name];
                                        }
                                    }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={20}
                                    iconType="circle"
                                    iconSize={6}
                                    wrapperStyle={{
                                        fontSize: "12px",
                                        paddingTop: "20px",
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: "8px"
                                    }}
                                    formatter={(value) => {
                                        switch (value) {
                                            case 'newRegister': return <span className="text-blue-500 font-medium mr-4">New Anomaly Register</span>;
                                            case 'completed': return <span className="text-green-500 font-medium mr-4">Anomaly Completed</span>;
                                            case 'active': return <span className="text-orange-500 font-medium">Total Active Anomaly</span>;
                                            default: return <span>{value}</span>;
                                        }
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="newRegister"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="completed"
                                    stroke="#22c55e"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: "#22c55e", strokeWidth: 0 }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="active"
                                    stroke="#f97316"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: "#f97316", strokeWidth: 0 }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>

            {/* 3. LOWER SECTION: Operational Management */}
            <div className="space-y-6">

                {/* Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Equipment Issues Table (60%) */}
                    <section className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm lg:col-span-3 overflow-hidden flex flex-col">
                        <div className="p-5 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)]">
                            <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Equipment Issues</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">What equipment has problems and what type of defects exist</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30">
                                    <tr>
                                        <th className="px-5 py-3 font-medium">Equipment</th>
                                        <th className="px-5 py-3 font-medium">Finding</th>
                                        <th className="px-5 py-3 font-medium">Cause</th>
                                        <th className="px-5 py-3 font-medium">Area</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {MOCK_ANOMALIES.map(anomaly => (
                                        <tr key={`issue-${anomaly.id}`} className="hover:bg-slate-50 dark:hover:bg-[var(--color-brand-darkHover)]/50 transition-colors">
                                            <td className="px-5 py-3 font-medium text-slate-900 dark:text-slate-200">{anomaly.equipment}</td>
                                            <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{anomaly.finding}</td>
                                            <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{anomaly.cause}</td>
                                            <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{anomaly.area}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Top Anomaly Types (40%) */}
                    <section className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl p-5 shadow-sm lg:col-span-2">
                        <div className="mb-4">
                            <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Top Anomaly Types</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Most common defect mechanisms</p>
                        </div>
                        <div className="space-y-4 mt-6">
                            {[
                                { cause: "External corrosion / CUI", count: 12, percent: 40 },
                                { cause: "Coating deterioration", count: 8, percent: 26 },
                                { cause: "Mechanical defect", count: 6, percent: 20 },
                                { cause: "Physical damage", count: 4, percent: 14 },
                            ].map(item => (
                                <div key={item.cause} className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-slate-700 dark:text-slate-300">{item.cause}</span>
                                        <span className="text-slate-500">{item.count} cases</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-[var(--color-brand-primary-soft)]0 dark:bg-[var(--color-brand-primary)]"
                                            style={{ width: `${item.percent}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Pending Actions Table (60%) */}
                    <section className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm lg:col-span-3 overflow-hidden flex flex-col">
                        <div className="p-5 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)]">
                            <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Pending Actions</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Required maintenance actions and responsibilities</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30">
                                    <tr>
                                        <th className="px-5 py-3 font-medium">Equipment</th>
                                        <th className="px-5 py-3 font-medium">Action</th>
                                        <th className="px-5 py-3 font-medium">Responsible</th>
                                        <th className="px-5 py-3 font-medium">Due</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {MOCK_ANOMALIES.filter(a => a.status !== "Closed" && a.status !== "Deferred").map(anomaly => (
                                        <tr key={`action-${anomaly.id}`} className="hover:bg-slate-50 dark:hover:bg-[var(--color-brand-darkHover)]/50 transition-colors">
                                            <td className="px-5 py-3 font-medium text-slate-900 dark:text-slate-200">{anomaly.equipment}</td>
                                            <td className="px-5 py-3 text-slate-700 dark:text-slate-300">{anomaly.action}</td>
                                            <td className="px-5 py-3 text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                                                <User size={13} /> {anomaly.responsible}
                                            </td>
                                            <td className={`px-5 py-3 ${anomaly.dueDate.includes("2026-03") ? "text-red-500 font-medium" : "text-slate-500 dark:text-slate-400"}`}>
                                                <div className="flex items-center gap-1.5"><Calendar size={13} /> {anomaly.dueDate}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Action Status Summary & Upcoming Deadlines (40%) */}
                    <section className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm lg:col-span-2 flex flex-col">
                        <div className="p-5 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)]">
                            <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Action Status & Deadlines</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Resolution progress and upcoming repair milestones</p>
                        </div>

                        <div className="p-5 flex-1 flex flex-col gap-6">
                            {/* Status Pills */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg p-3 text-center">
                                    <div className="text-2xl font-bold text-slate-900 dark:text-white">18</div>
                                    <div className="text-xs text-slate-500 font-medium mt-1">Active</div>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg p-3 text-center">
                                    <div className="text-2xl font-bold text-slate-900 dark:text-white">5</div>
                                    <div className="text-xs text-slate-500 font-medium mt-1">Deferred</div>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg p-3 text-center">
                                    <div className="text-2xl font-bold text-slate-900 dark:text-white opacity-50">42</div>
                                    <div className="text-xs text-slate-500 font-medium mt-1 opacity-50">Completed</div>
                                </div>
                            </div>

                            {/* Upcoming Deadlines */}
                            <div>
                                <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Upcoming Deadlines</h3>
                                <div className="space-y-3">
                                    {[
                                        { eq: "Deck Plate", date: "10 Mar 2026", status: "Overdue soon" },
                                        { eq: "Pipe Support (PS-2041)", date: "15 Mar 2026", status: "On track" },
                                        { eq: "P-302A", date: "20 Mar 2026", status: "On track" },
                                    ].map(dl => (
                                        <div key={dl.eq} className="flex justify-between items-center text-sm border-l-2 border-indigo-500 pl-3">
                                            <div>
                                                <div className="font-medium text-slate-800 dark:text-slate-200">{dl.eq}</div>
                                                <div className="text-xs text-slate-500">{dl.status}</div>
                                            </div>
                                            <div className="font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs">{dl.date}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </div>
    );
}
