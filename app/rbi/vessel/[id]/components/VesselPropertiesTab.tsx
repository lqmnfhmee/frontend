"use client";

import { useState } from "react";
import { Eye, Edit2, Copy, Trash2, Plus, Search, CheckCircle2 } from "lucide-react";

export default function VesselPropertiesTab() {
    const [activeSubTab, setActiveSubTab] = useState<"details" | "design">("details");

    const renderGrid = () => {
        const rows = [5, 4, 3, 2, 1];
        const cols = ["A", "B", "C", "D", "E"];

        // Helper to determine the risk color for the 5x5 grid based on screenshot
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
                                        {row === 1 && col === "C" && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-5 h-5 bg-slate-900 rounded-full flex items-center justify-center text-white text-xs">
                                                    <CheckCircle2 size={12} />
                                                </div>
                                            </div>
                                        )}
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
            {/* 🔹 DESIGN DATA (VIEW ONLY) CARD */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 opacity-70">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                        </svg>
                        Design Data (View Only)
                    </div>
                </div>

                {/* Sub Tabs */}
                <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveSubTab("details")}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${activeSubTab === "details"
                            ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                            }`}
                    >
                        Component Details
                    </button>
                    <button
                        onClick={() => setActiveSubTab("design")}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${activeSubTab === "design"
                            ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                            }`}
                    >
                        Design Data
                    </button>
                </div>

                {/* Tab Content */}
                {activeSubTab === "details" && (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Installation Information</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                                These dates apply to the entire vessel. Component-specific information (component type, shape, etc.) is managed at the component level.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Installation Date</p>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">01/01/2001</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">External Coating Installation Date</p>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">Not set</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Detection and Safety Systems</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Type of Detection System</p>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        B - Suitably located detectors to determine when the material is present outside the pressure-containing envelope
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Type of Isolation System</p>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        B - Isolation or shutdown systems activated by operators in the control room or other suitable locations remote from the leak
                                    </p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Mitigation System</p>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        Fire water deluge system and monitors
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSubTab === "design" && (
                    <div className="space-y-6">
                        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 p-4 rounded-lg">
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                These fields apply to the entire vessel. Component-specific design data (material, pressure, temperature, etc.) are managed at the component level.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Vessel Design Data</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                                <div className="space-y-4 md:space-y-6">
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Design Code</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">ASME VIII DIV 1</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Approved Rerated Pressure Based on FFS</p>
                                        <div>
                                            <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-600 text-white rounded-full">
                                                No
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Minimum Design Metal Temperature</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">Not set</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Manhole Available</p>
                                        <div>
                                            <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-600 text-white rounded-full">
                                                Yes
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Cathodic Protection Available</p>
                                        <div>
                                            <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-600 text-white rounded-full">
                                                No
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4 md:space-y-6">
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Manufactured Year</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">2001</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Approved Rerated Pressure</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">Not set</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Length</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">5700 ft</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Internal Tube Accessible</p>
                                        <div>
                                            <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-600 text-white rounded-full">
                                                No
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 🔹 RBI RESULT CARD */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm overflow-hidden flex flex-col p-6 space-y-6">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 opacity-70">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <line x1="3" y1="9" x2="21" y2="9" />
                        <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                    RBI Result
                </div>
                {renderGrid()}

                <div className="flex items-center justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-green-500 text-xs font-bold font-mono border-green-600 flex items-center justify-center text-white" /> <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Low</span></div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-yellow-400 text-xs font-bold font-mono border-yellow-500 flex items-center justify-center text-white" /> <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Medium</span></div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-orange-500 text-xs font-bold font-mono border-orange-600 flex items-center justify-center text-white" /> <span className="text-xs font-medium text-slate-600 dark:text-slate-400">High</span></div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-red-500 text-xs font-bold font-mono border-red-600 flex items-center justify-center text-white" /> <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Very High</span></div>
                </div>
            </div>


            {/* 🔹 COMPONENTS TABLE CARD */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-[var(--color-brand-darkCard)]/50">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 opacity-70">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                            <line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                        Components
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative w-full sm:w-64">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                size={16}
                            />
                            <input
                                type="text"
                                placeholder="Search components..."
                                className="w-full pl-9 pr-4 py-1.5 text-sm bg-white dark:bg-[var(--color-brand-darkBg)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                            />
                        </div>
                        <button className="flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-[var(--color-brand-darkBg)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Bulk Import
                        </button>
                        <button className="flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                            <Plus size={16} />
                            Add Component
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] bg-slate-50 dark:bg-[var(--color-brand-darkCard)]/50 text-slate-500 dark:text-slate-400">
                                <th className="px-6 py-4 font-semibold w-8">
                                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                </th>
                                <th className="px-6 py-4 font-semibold">Component Name</th>
                                <th className="px-6 py-4 font-semibold text-center w-24">COF</th>
                                <th className="px-6 py-4 font-semibold text-center w-24">POF</th>
                                <th className="px-6 py-4 font-semibold text-center w-32">Risk</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            <tr className="hover:bg-slate-50/50 dark:hover:bg-[var(--color-brand-darkHover)]/50 transition-colors">
                                <td className="px-6 py-4">
                                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                </td>
                                <td className="px-6 py-4 text-slate-900 dark:text-slate-300">
                                    1V-110_DRUM
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full border text-xs font-bold border-blue-300 text-blue-600 bg-blue-50`}>
                                        C
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full border text-xs font-bold border-blue-300 text-blue-600 bg-blue-50`}>
                                        1
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex justify-center items-center px-2.5 py-1 text-[10px] font-bold uppercase rounded-full border w-full border-green-500 bg-green-500 text-white`}>
                                        Low
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1.5 opacity-100">
                                        <button className="p-1.5 border border-slate-200 dark:border-[var(--color-brand-darkBorder)] bg-white dark:bg-slate-800 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors" title="View">
                                            <Eye size={16} />
                                        </button>
                                        <button className="p-1.5 border border-slate-200 dark:border-[var(--color-brand-darkBorder)] bg-white dark:bg-slate-800 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded transition-colors" title="Edit">
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="p-1.5 border border-slate-200 dark:border-[var(--color-brand-darkBorder)] bg-white dark:bg-slate-800 text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/30 rounded transition-colors" title="Remove">
                                            <Trash2 size={16} />
                                        </button>
                                        <button className="p-1.5 border border-slate-200 dark:border-[var(--color-brand-darkBorder)] bg-white dark:bg-slate-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors" title="Delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
