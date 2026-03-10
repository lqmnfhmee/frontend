"use client";

import { useState } from "react";
import { Plus, Search, Eye, Edit2, Trash2, ChevronRight, Filter } from "lucide-react";
import Link from "next/link";

interface AnomalyRequest {
    id: string;
    anomalyNo: string;
    equipment: string;
    priority: string;
    status: string;
    selfVerified: string;
}

const MOCK_REQUESTS: AnomalyRequest[] = [
    {
        id: "1",
        anomalyNo: "LRA-2026-AN-0002",
        equipment: "2HX-215",
        priority: "P3",
        status: "DRAFT",
        selfVerified: "-",
    },
    {
        id: "2",
        anomalyNo: "LRA-2026-AN-0001",
        equipment: "1V-110 - Test Separator",
        priority: "P3",
        status: "DRAFT",
        selfVerified: "-",
    },
];

export default function AnomalyRequestsPage() {
    const [activeTab, setActiveTab] = useState("Draft");

    const tabs = [
        { name: "Draft", count: 2 },
        { name: "Verify", count: 0 },
        { name: "Approval", count: 0 },
        { name: "Execute", count: 0 },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Anomaly Requests</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Internal anomaly workflow - Create, Verify, Approve, Execute
                    </p>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Internal Requests</h2>
                        <Link href="/anomalies/requests/create">
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 rounded-lg transition-colors shadow-sm">
                                <Plus size={16} /> Create Request
                            </button>
                        </Link>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search by anomaly no, equipment..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                            />
                        </div>
                        <div className="relative">
                            <select className="appearance-none pl-4 pr-10 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-700 dark:text-slate-300">
                                <option>All</option>
                            </select>
                            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" size={14} />
                        </div>
                    </div>

                    {/* Workflow Tabs */}
                    <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`
                  flex-1 py-3 text-sm font-medium transition-all relative
                  ${activeTab === tab.name
                                        ? "text-sky-500 bg-sky-500/5"
                                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}
                `}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    {tab.name}
                                    {tab.count > 0 && (
                                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-500 text-white text-[10px]">
                                            {tab.count}
                                        </span>
                                    )}
                                </div>
                                {activeTab === tab.name && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="text-slate-400 dark:text-slate-500 bg-transparent border-b border-slate-200 dark:border-slate-800">
                                <tr>
                                    <th className="px-5 py-4 font-medium first:pl-0">Anomaly No</th>
                                    <th className="px-5 py-4 font-medium">Equipment</th>
                                    <th className="px-5 py-4 font-medium text-center">Priority</th>
                                    <th className="px-5 py-4 font-medium text-center">Status</th>
                                    <th className="px-5 py-4 font-medium text-center">Self-Verified</th>
                                    <th className="px-5 py-4 font-medium text-right last:pr-0">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {MOCK_REQUESTS.map((request) => (
                                    <tr key={request.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-5 py-4 font-medium text-sky-500 first:pl-0">
                                            <Link href={`/anomalies/${request.anomalyNo}`} className="hover:underline">
                                                {request.anomalyNo}
                                            </Link>
                                        </td>
                                        <td className="px-5 py-4 text-slate-700 dark:text-slate-300">{request.equipment}</td>
                                        <td className="px-5 py-4 text-center">
                                            <span className="inline-flex px-2.5 py-1 rounded text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                                {request.priority}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold border border-sky-500/50 text-sky-500 uppercase">
                                                {request.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-center text-slate-400 dark:text-slate-500">{request.selfVerified}</td>
                                        <td className="px-5 py-4 text-right last:pr-0">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sky-500 hover:bg-sky-500/10 transition-colors">
                                                    <Eye size={14} />
                                                </button>
                                                <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-blue-500 hover:bg-blue-500/10 transition-colors">
                                                    <Edit2 size={14} />
                                                </button>
                                                <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-red-500 hover:bg-red-500/10 transition-colors">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
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
