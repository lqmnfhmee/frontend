"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Edit2, Play, FileCheck, Info, Tag, Calendar, Database, Activity, ShieldAlert, Clock, BarChart2 } from "lucide-react";

import OverviewTab from "./components/OverviewTab";
import DesignDataTab from "./components/DesignDataTab";
import POFTab from "./components/POFTab";
import COFTab from "./components/COFTab";
import ScreeningTab from "./components/ScreeningTab";
import HistoryTab from "./components/HistoryTab";

export default function CircuitGroupCalculationPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const [activeTab, setActiveTab] = useState("overview");
    const [activeRiskMatrixTab, setActiveRiskMatrixTab] = useState("current");

    const renderGrid = () => {
        const rows = [5, 4, 3, 2, 1];
        const cols = ["A", "B", "C", "D", "E"];

        // Helper to determine the risk color for the 5x5 grid
        const getCellColorClass = (pof: number, cofIndex: number) => {
            // High risk colors
            if ((pof === 5 && cofIndex >= 2) || (pof === 4 && cofIndex >= 3) || (pof === 3 && cofIndex >= 4) || (pof === 2 && cofIndex === 4)) return "bg-red-500 border-red-600";
            // Medium-High risk colors
            if ((pof === 5 && cofIndex === 1) || (pof === 4 && cofIndex === 2) || (pof === 3 && cofIndex === 3) || (pof === 2 && cofIndex === 3) || (pof === 1 && cofIndex === 4)) return "bg-orange-500 border-orange-600";
            // Medium risk colors
            if ((pof === 5 && cofIndex === 0) || (pof === 4 && cofIndex === 1) || (pof === 3 && cofIndex === 2)) return "bg-yellow-400 border-yellow-500";
            // Low risk colors
            return "bg-green-500 border-green-600";
        }

        return (
            <div className="w-full max-w-4xl mx-auto overflow-hidden border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg shadow-sm">
                <table className="w-full text-center border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-600 dark:text-slate-300">
                            <th className="py-3 px-2 border-b border-r border-slate-200 dark:border-[var(--color-brand-darkBorder)] w-24">POF/COF</th>
                            {cols.map(c => (
                                <th key={c} className="py-3 px-2 border-b border-r border-slate-200 dark:border-[var(--color-brand-darkBorder)]">{c}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(row => (
                            <tr key={row}>
                                <td className="py-4 px-2 border-b border-r border-slate-200 dark:border-[var(--color-brand-darkBorder)] font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50">{row}</td>
                                {cols.map((col, index) => (
                                    <td key={col} className={`py-4 px-2 border-b border-r border-slate-200 dark:border-[var(--color-brand-darkBorder)] relative group transition-colors ${getCellColorClass(row, index)}`}>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* 🔹 HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    <Link
                        href={`/rbi/piping/${id}`}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-[var(--color-brand-darkHover)] rounded-lg transition-colors mt-0.5 border border-slate-200 dark:border-[var(--color-brand-darkBorder)] bg-white dark:bg-[var(--color-brand-darkCard)]"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white uppercase">
                            Circuit Group
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Circuit Group ID: 1
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button className="flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-[var(--color-brand-darkBg)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                        <Edit2 size={16} />
                        Edit Inspection
                    </button>
                    <button className="flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-500/20">
                        <Play size={16} fill="currentColor" />
                        Calculate
                    </button>
                    <button className="flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-[var(--color-brand-darkBg)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                        <FileCheck size={16} />
                        Override Results
                    </button>
                </div>
            </div>

            {/* 🔹 KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* COF Card */}
                <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm p-6">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">Consequence of Failure (COF)</p>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Category</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">N/A</p>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                            N/A
                        </span>
                    </div>
                </div>

                {/* POF Card */}
                <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm p-6">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">Probability of Failure (POF)</p>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Category</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">N/A</p>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                            N/A
                        </span>
                    </div>
                </div>

                {/* Risk Assessment Card */}
                <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm p-6">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">Risk Assessment</p>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Risk Level</p>
                            <div className="flex items-end gap-2">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">N/A</p>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Metric: N/A</p>
                            </div>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                            N/A
                        </span>
                    </div>
                </div>
            </div>

            {/* 🔹 RISK MATRIX */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm overflow-hidden flex flex-col p-6 space-y-6">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium pb-2 border-b border-slate-100 dark:border-[var(--color-brand-darkBorder)]">
                    Risk Matrix
                </div>

                {/* Matrix Tabs */}
                <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveRiskMatrixTab("current")}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${activeRiskMatrixTab === "current" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"}`}
                    >
                        Current Risk
                    </button>
                    <button
                        onClick={() => setActiveRiskMatrixTab("future_no")}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${activeRiskMatrixTab === "future_no" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"}`}
                    >
                        Future Risk (No Inspection)
                    </button>
                    <button
                        onClick={() => setActiveRiskMatrixTab("future_with")}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${activeRiskMatrixTab === "future_with" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"}`}
                    >
                        Future Risk (With Inspection)
                    </button>
                </div>

                <div className="flex justify-center text-sm text-slate-500 dark:text-slate-400">
                    Risk Plot: <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">N/A</span>
                </div>

                {renderGrid()}

                <div className="flex items-center justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-green-500 text-xs font-bold font-mono border-green-600 flex items-center justify-center text-white" /> <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Low</span></div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-yellow-400 text-xs font-bold font-mono border-yellow-500 flex items-center justify-center text-white" /> <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Medium</span></div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-orange-500 text-xs font-bold font-mono border-orange-600 flex items-center justify-center text-white" /> <span className="text-xs font-medium text-slate-600 dark:text-slate-400">High</span></div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-red-500 text-xs font-bold font-mono border-red-600 flex items-center justify-center text-white" /> <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Very High</span></div>
                </div>
            </div>

            {/* 🔹 INSPECTION PLANNING RECOMMENDATIONS (IRP) */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm overflow-hidden p-6 space-y-6">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium pb-2 border-b border-slate-100 dark:border-[var(--color-brand-darkBorder)]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 opacity-70">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                    </svg>
                    Inspection Planning Recommendations (IRP)
                </div>
                <div className="py-12 flex flex-col items-center justify-center text-center">
                    <Info className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">No data available</p>
                </div>
            </div>

            {/* 🔹 INFO TABS */}
            <div className="flex border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] bg-white dark:bg-[var(--color-brand-darkCard)] rounded-t-xl px-2">
                <button
                    onClick={() => setActiveTab("overview")}
                    className={`px-6 py-3.5 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors ${activeTab === "overview"
                        ? "border-blue-600 text-blue-600 dark:text-blue-500"
                        : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                        }`}
                >
                    <Info size={16} /> Overview
                </button>
                <button
                    onClick={() => setActiveTab("design")}
                    className={`px-6 py-3.5 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors ${activeTab === "design"
                        ? "border-blue-600 text-blue-600 dark:text-blue-500"
                        : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                        }`}
                >
                    <FileCheck size={16} /> Design Data
                </button>
                <button
                    onClick={() => setActiveTab("pof")}
                    className={`px-6 py-3.5 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors ${activeTab === "pof"
                        ? "border-blue-600 text-blue-600 dark:text-blue-500"
                        : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                        }`}
                >
                    <BarChart2 size={16} /> POF
                </button>
                <button
                    onClick={() => setActiveTab("cof")}
                    className={`px-6 py-3.5 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors ${activeTab === "cof"
                        ? "border-blue-600 text-blue-600 dark:text-blue-500"
                        : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                        }`}
                >
                    <ShieldAlert size={16} /> COF
                </button>
                <button
                    onClick={() => setActiveTab("screening")}
                    className={`px-6 py-3.5 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors ${activeTab === "screening"
                        ? "border-blue-600 text-blue-600 dark:text-blue-500"
                        : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                        }`}
                >
                    <Activity size={16} /> Screening
                </button>
                <button
                    onClick={() => setActiveTab("history")}
                    className={`px-6 py-3.5 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors ${activeTab === "history"
                        ? "border-blue-600 text-blue-600 dark:text-blue-500"
                        : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                        }`}
                >
                    <Clock size={16} /> History
                </button>
            </div>

            {/* TAB CONTENT */}
            <div className="mt-6">
                {activeTab === "overview" && <OverviewTab />}
                {activeTab === "design" && <DesignDataTab />}
                {activeTab === "pof" && <POFTab />}
                {activeTab === "cof" && <COFTab />}
                {activeTab === "screening" && <ScreeningTab />}
                {activeTab === "history" && <HistoryTab />}
            </div>

        </div>
    );
}
