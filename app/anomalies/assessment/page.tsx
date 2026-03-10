"use client";

import { useState } from "react";
import { Search, Filter, FilterX } from "lucide-react";

export default function AssessmentPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Anomaly Assessments</h1>
                <p className="text-slate-500 dark:text-slate-400">View and manage anomalies</p>
            </div>

            {/* Filters & Search Card */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    <Filter size={16} className="text-slate-400" />
                    <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200">Filters & Search</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2">
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search anomalies..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500/20">
                                <option>All Priorities</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500/20">
                                <option>All Facilities</option>
                            </select>
                        </div>
                        <div>
                            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-sky-500 border border-sky-500/20 rounded-lg hover:bg-sky-500/10 transition-colors">
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pending Anomaly List Card */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200">Pending Anomaly List</h2>
                </div>
                <div className="p-6">
                    <div className="border border-slate-100 dark:border-slate-800 rounded-lg overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-slate-900/40 text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                                    <th className="px-6 py-4">Offshore Anomaly No.</th>
                                    <th className="px-6 py-4">Equipment Type</th>
                                    <th className="px-6 py-4">Priority</th>
                                    <th className="px-6 py-4">Recommendation</th>
                                    <th className="px-6 py-4">Facility</th>
                                    <th className="px-6 py-4">Created</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr>
                                    <td colSpan={7} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <p className="text-sm">No anomalies found</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
