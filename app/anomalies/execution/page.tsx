"use client";

import { Eye } from "lucide-react";

const mockExecutionData = [
    { id: "AN-478 (B)", equipment: "N/A", finding: "Badly corroded. Corrosion on deck plate, cais...", priority: "P2", status: "deferred", lafd: "N/A" },
    { id: "AN-477", equipment: "N/A", finding: "To install new plate lighting support and painti...", priority: "P3", status: "deferred", lafd: "N/A" },
    { id: "AN-476", equipment: "N/A", finding: "The piping parted due to bad weather conditio...", priority: "P2", status: "deferred", lafd: "N/A" },
    { id: "AN-475", equipment: "N/A", finding: "Badly corroded and parted support", priority: "P2", status: "deferred", lafd: "N/A" },
    { id: "AN-474", equipment: "N/A", finding: "Badly corroded pipe support", priority: "P3", status: "deferred", lafd: "N/A" },
];

export default function ExecutionPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Anomaly Execution</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage and execute assigned anomalies</p>
            </div>

            {/* Pending Execution Card */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200">Pending Execution</h2>
                </div>
                <div className="p-6">
                    <div className="border border-slate-100 dark:border-slate-800 rounded-lg overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-slate-900/40 text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                                    <th className="px-6 py-4">Anomaly No</th>
                                    <th className="px-6 py-4">Equipment</th>
                                    <th className="px-6 py-4">Finding</th>
                                    <th className="px-6 py-4">Priority</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-center">LAFD Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                                {mockExecutionData.map((row) => (
                                    <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                                        <td className="px-6 py-4 text-sm font-mono text-sky-500">{row.id}</td>
                                        <td className="px-6 py-4 text-sm">{row.equipment}</td>
                                        <td className="px-6 py-4 text-sm truncate max-w-xs">{row.finding}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-4 py-1 rounded-full text-[10px] font-bold text-white ${row.priority === "P2" ? "bg-orange-500" : "bg-amber-500"
                                                }`}>
                                                {row.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-4 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold border border-amber-500/20 uppercase tracking-tight">
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-center">{row.lafd}</td>
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
            </div>
        </div>
    );
}
