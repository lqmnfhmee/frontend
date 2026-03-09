"use client";

import { useState } from "react";
import { Edit2, Plus, Eye, Trash2 } from "lucide-react";
import TrendingTab from "./TrendingTab";
import AnomaliesTab from "./AnomaliesTab";
import AttachmentsTab from "./AttachmentsTab";

const INSPECTION_SUB_TABS = [
    { id: "properties", label: "Properties" },
    { id: "tasks", label: "Tasks" },
    { id: "trending", label: "Trending" },
    { id: "anomalies", label: "Anomalies" },
    { id: "attachments", label: "Attachments" },
];

const COMPONENTS = [
    { name: "1V-210_NZL N2", nominal: "44.00", required: "43.553967449953", cml: "1" },
    { name: "1V-210_NZL N12", nominal: "39.00", required: "43.553967449953", cml: "1" },
    { name: "1V-210_NZL N8A", nominal: "39.00", required: "43.553967449953", cml: "1" },
    { name: "1V-210_NZL N7", nominal: "39.00", required: "43.553967449953", cml: "1" },
    { name: "1V-210_NZL N5", nominal: "73.00", required: "43.553967449953", cml: "1" },
    { name: "1V-210_NZL N4", nominal: "82.00", required: "43.553967449953", cml: "1" },
    { name: "1V-210_NZL N3", nominal: "73.00", required: "43.553967449953", cml: "1" },
    { name: "1V-210_NZL N1", nominal: "101.00", required: "43.553967449953", cml: "1" },
    { name: "1V-210_DRUM Manway", nominal: "121.00", required: "43.553967449953", cml: "2" },
    { name: "1V-210_DRUM Head", nominal: "64.00", required: "43.553967449953", cml: "4" },
    { name: "1V-210_DRUM Shell", nominal: "54.18", required: "43.553967449953", cml: "3" },
];

const INSPECTION_TASKS = [
    { checksheet: "LRA-INSP-2026-0013", title: "April 2025", type: "UTTM", plannedStart: "Apr 1, 2025", status: "Completed" },
    { checksheet: "LRA-INSP-2026-0012", title: "November 2022", type: "UTTM", plannedStart: "Nov 1, 2022", status: "Completed" },
];

export default function VesselInspectionTab() {
    const [activeSubTab, setActiveSubTab] = useState("properties");

    return (
        <div className="space-y-6">
            {/* 🔹 SUB NAVIGATION */}
            <div className="bg-slate-100 dark:bg-slate-800/50 rounded-lg p-1.5 flex overflow-x-auto no-scrollbar">
                {INSPECTION_SUB_TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSubTab(tab.id)}
                        className={`flex-1 min-w-[120px] py-2 text-sm font-medium rounded-md transition-colors ${activeSubTab === tab.id
                            ? "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 🔹 PROPERTIES SUB-TAB */}
            {activeSubTab === "properties" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 opacity-70">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <polyline points="10 9 9 9 8 9" />
                                </svg>
                                Inspection Properties
                            </div>
                            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                                <Edit2 size={16} />
                                Edit Properties
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Elevation (m)</p>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">Not set</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Method</p>
                                <div className="flex gap-2">
                                    <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-full">
                                        UTTM
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Accessibility</p>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">Yes</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Anomaly</p>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">Yes</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 text-slate-900 dark:text-white font-medium bg-slate-50/50 dark:bg-slate-900/50">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 opacity-70">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                <line x1="12" y1="22.08" x2="12" y2="12" />
                            </svg>
                            Components
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                                        <th className="px-6 py-4 font-semibold">Component Name</th>
                                        <th className="px-6 py-4 font-semibold text-center">Nominal Thickness</th>
                                        <th className="px-6 py-4 font-semibold text-center">Required Thickness</th>
                                        <th className="px-6 py-4 font-semibold text-center">CML Point</th>
                                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                    {COMPONENTS.map((comp) => (
                                        <tr
                                            key={comp.name}
                                            className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                                        >
                                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                                {comp.name}
                                            </td>
                                            <td className="px-6 py-4 text-slate-700 dark:text-slate-300 text-center">
                                                {comp.nominal}
                                            </td>
                                            <td className="px-6 py-4 text-slate-700 dark:text-slate-300 text-center">
                                                {comp.required}
                                            </td>
                                            <td className="px-6 py-4 text-slate-700 dark:text-slate-300 text-center">
                                                {comp.cml}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end">
                                                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-lg transition-colors border border-blue-200/50 dark:border-blue-800/50">
                                                        <Edit2 size={12} />
                                                        Set CML
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
                            <span className="opacity-0">Filler</span> {/* Helps padding stay consistent */}
                        </div>
                    </div>
                </div>
            )}

            {/* 🔹 TASKS SUB-TAB */}
            {activeSubTab === "tasks" && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in duration-300">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Inspection Sessions</h2>
                        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                            <Plus size={16} />
                            New Session
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                                    <th className="px-6 py-4 font-semibold">Checksheet No.</th>
                                    <th className="px-6 py-4 font-semibold">Title</th>
                                    <th className="px-6 py-4 font-semibold text-center">Type</th>
                                    <th className="px-6 py-4 font-semibold text-center">Planned Start</th>
                                    <th className="px-6 py-4 font-semibold text-center">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {INSPECTION_TASKS.map((task) => (
                                    <tr
                                        key={task.checksheet}
                                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                            {task.checksheet}
                                        </td>
                                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                                            {task.title}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-full">
                                                {task.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300 text-center">
                                            {task.plannedStart}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-full">
                                                {task.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 text-slate-400">
                                                <button className="p-1 hover:text-blue-500 transition-colors"><Eye size={16} /></button>
                                                <button className="p-1 hover:text-purple-500 transition-colors"><Edit2 size={16} /></button>
                                                <button className="p-1 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 🔹 RENDER REMAINING TABS */}
            {activeSubTab === "trending" && <TrendingTab />}
            {activeSubTab === "anomalies" && <AnomaliesTab />}
            {activeSubTab === "attachments" && <AttachmentsTab />}
        </div>
    );
}
