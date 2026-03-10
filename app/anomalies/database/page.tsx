"use client";

import { useState } from "react";
import {
    Download, Upload, Eye, Search, Filter, ChevronDown, Calendar, X, AlertCircle
} from "lucide-react";

const mockDatabaseData = [
    { id: "AN-478 (B)", offshore: "AN-05-VES-LRT-2024", equipment: "N/A", priority: "P2", lafd: "-", status: "Deferred" },
    { id: "AN-478", offshore: "AN-05-VES-LRT-2024", equipment: "N/A", priority: "P3", lafd: "-", status: "Completed" },
    { id: "AN-477", offshore: "AN-04-VES-LRT-2024", equipment: "N/A", priority: "P3", lafd: "-", status: "Deferred" },
    { id: "AN-476", offshore: "AN-03-VES-LRT-2024", equipment: "N/A", priority: "P2", lafd: "-", status: "Deferred" },
    { id: "AN-475", offshore: "AN-02-VES-LRT-2024", equipment: "EDC-P6 125V DC, Emergency Lighting", priority: "P2", lafd: "-", status: "Deferred" },
    { id: "AN-474", offshore: "AN-01-VES-LRT-2024", equipment: "N/A", priority: "P3", lafd: "-", status: "Deferred" },
    { id: "AN-473", offshore: "AN-89-VES-LRT-2023", equipment: "N/A", priority: "P2", lafd: "-", status: "Completed" },
    { id: "AN-472", offshore: "AN-88-VES-LRT-2023", equipment: "N/A", priority: "P2", lafd: "-", status: "Completed" },
];

export default function DatabasePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">All Requests</h1>
                    <p className="text-slate-500 dark:text-slate-400">View all requests submitted to executor</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-bold border border-slate-200 dark:border-slate-700 shadow-sm">
                        <Download size={16} /> Export
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm font-bold shadow-md shadow-sky-500/20"
                    >
                        <Upload size={16} /> Bulk Import
                    </button>
                </div>
            </div>

            {/* Filters Card */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Filters</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <SelectField label="Status" options={["All Statuses", "Deferred", "Completed"]} />
                        <SelectField label="Priority" options={["All Priorities", "P1", "P2", "P3"]} />
                        <SelectField label="Action Workcenter" options={["All Workcenters"]} />
                        <SelectField label="Recommendation" options={["All Recommendations"]} />
                        <DateField label="Handover Date From" />
                        <DateField label="Handover Date To" />
                        <DateField label="LAFD Date From" />
                        <DateField label="LAFD Date To" />
                    </div>
                </div>
            </div>

            {/* Requests Table Card */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 overflow-x-auto text-slate-700 dark:text-slate-300">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-900/40 text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                                <th className="px-6 py-4">Onshore No.</th>
                                <th className="px-6 py-4">Offshore No.</th>
                                <th className="px-6 py-4">Equipment</th>
                                <th className="px-6 py-4">Priority</th>
                                <th className="px-6 py-4 text-center">LAFD Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {mockDatabaseData.map((row) => (
                                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono text-sky-500 uppercase">{row.id}</td>
                                    <td className="px-6 py-4 text-sm font-mono">{row.offshore}</td>
                                    <td className="px-6 py-4 text-sm truncate max-w-[200px]">{row.equipment}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-4 py-1 rounded-full text-[10px] font-bold text-white ${row.priority === "P2" ? "bg-orange-500" : "bg-amber-500"
                                            }`}>
                                            {row.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center">{row.lafd}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-4 py-1 rounded-full text-[10px] font-bold border uppercase tracking-tight ${row.status === "Completed"
                                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                                : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1.5 text-sky-500 hover:bg-sky-500/10 rounded-lg transition-colors">
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bulk Import Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#1e2533] border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">Bulk Import Anomalies</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8 space-y-8">
                            <p className="text-sm text-slate-300">Download the template, fill in your data, and upload the file</p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-1.5 bg-sky-500/10 text-sky-500 rounded-lg mt-0.5">
                                        <AlertCircle size={16} />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Instructions:</h4>
                                        <ul className="space-y-1.5 text-xs text-slate-400 font-medium list-decimal list-inside">
                                            <li>Download the Excel template below</li>
                                            <li>Fill in your anomaly data (<span className="text-red-400">RED columns are required</span>)</li>
                                            <li>Asset Tag: Use exact tag number from asset database</li>
                                            <li>Status: OPEN (assessed), CLOSE (completed), DEFERRED</li>
                                            <li>Executor Email: Optional (leave empty if unknown)</li>
                                            <li>Upload the completed file</li>
                                            <li>Review validation results before importing</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-transparent border border-white text-white rounded-lg hover:bg-white/5 transition-colors text-sm font-bold">
                                        <Download size={16} /> Download Template
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1">
                                    Upload File <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="bulk-import-file"
                                    />
                                    <div
                                        onClick={() => document.getElementById('bulk-import-file')?.click()}
                                        className="w-full px-4 py-3 bg-[#111827] border border-slate-700 rounded-lg text-sm text-slate-500 cursor-pointer flex justify-between items-center hover:border-slate-500 transition-colors"
                                    >
                                        <span>Choose File No file chosen</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-700 bg-slate-900/50 flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2 text-sm font-bold text-white bg-slate-600 hover:bg-slate-700 rounded-lg transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                disabled
                                className="px-8 py-2 text-sm font-bold text-slate-500 bg-slate-700 rounded-lg cursor-not-allowed border border-slate-600"
                            >
                                Validate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function SelectField({ label, options }: { label: string, options: string[] }) {
    return (
        <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</label>
            <div className="relative">
                <select className="w-full pl-4 pr-10 py-2.5 bg-slate-50/50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-700 dark:text-slate-300">
                    {options.map(opt => <option key={opt}>{opt}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
        </div>
    );
}

function DateField({ label }: { label: string }) {
    return (
        <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</label>
            <div className="relative">
                <input
                    type="text"
                    placeholder="dd/mm/yyyy"
                    className="w-full pl-4 pr-10 py-2.5 bg-slate-50/50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
                <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
        </div>
    );
}
