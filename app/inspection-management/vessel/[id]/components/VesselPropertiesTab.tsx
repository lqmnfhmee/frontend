"use client";

import { useState } from "react";
import { Eye, Edit2, Copy, Trash2, Plus, Search } from "lucide-react";

const COMPONENTS = [
    { name: "1V-210_NZL N2" },
    { name: "1V-210_NZL N12" },
    { name: "1V-210_NZL N8A" },
    { name: "1V-210_NZL N7" },
    { name: "1V-210_NZL N5" },
    { name: "1V-210_NZL N4" },
    { name: "1V-210_NZL N3" },
    { name: "1V-210_NZL N1" },
    { name: "1V-210_DRUM Manway" },
    { name: "1V-210_DRUM Head" },
];

export default function VesselPropertiesTab() {
    const [activeSubTab, setActiveSubTab] = useState<"details" | "design">("details");

    return (
        <div className="space-y-6">
            {/* 🔹 ASSET DATA CARD */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 opacity-70">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                        </svg>
                        Asset Data
                    </div>
                    <button className="flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors w-full sm:w-auto">
                        <Edit2 size={16} />
                        Edit Design Data
                    </button>
                </div>

                {/* Asset Data Tabs */}
                <div className="flex border-b border-slate-200 dark:border-slate-800">
                    <button
                        onClick={() => setActiveSubTab("details")}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeSubTab === "details"
                            ? "border-blue-600 text-blue-600 dark:text-blue-500"
                            : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                            }`}
                    >
                        Component Details
                    </button>
                    <button
                        onClick={() => setActiveSubTab("design")}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeSubTab === "design"
                            ? "border-blue-600 text-blue-600 dark:text-blue-500"
                            : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                            }`}
                    >
                        Design Data
                    </button>
                </div>

                {/* Tab Content */}
                {activeSubTab === "details" && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Component Information</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Management System Score</p>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">720 (default)</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Installation Information</h3>
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
                                        C - Visual detection, cameras, or detectors with marginal coverage
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
                    <div className="text-sm text-slate-500 dark:text-slate-400 py-4 text-center">
                        Design data content goes here.
                    </div>
                )}
            </div>

            {/* 🔹 COMPONENTS TABLE CARD */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
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
                                className="w-full pl-9 pr-4 py-1.5 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                            />
                        </div>
                        <button className="flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                            <Plus size={16} />
                            Add Component
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                                <th className="px-6 py-4 font-semibold">Component Name</th>
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
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors" title="View">
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-md transition-colors" title="Edit">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="p-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors" title="Clone">
                                                <Copy size={16} />
                                            </button>
                                            <button className="p-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    Showing 1 to 10 of 11 components
                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            &lt;
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border-none bg-blue-600 text-white font-medium">
                            1
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            2
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
