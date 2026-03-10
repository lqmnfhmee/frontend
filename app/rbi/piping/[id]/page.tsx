"use client";

import Link from "next/link";
import { ArrowLeft, FileText, BarChart2, CheckCircle2, Star, Eye, Edit2, Settings } from "lucide-react";

interface PageProps {
    params: {
        id: string;
    }
}

const ASSETS = [
    {
        tag: "PIPE01",
        name: "FULL WELLSTREAM PRODUCTION, CRUDE OIL",
        facility: "Central Processing Platform\nCPP",
        system: "PROCESS PIPING\nCPP-PRP",
        package: "PIPING SYSTEM\nCPP-PIPING-PKG",
        status: "Active",
        isRepresentative: true,
    },
    {
        tag: "PIPE02",
        name: "GAS, NAG FULL WELLSTREAM",
        facility: "Central Processing Platform\nCPP",
        system: "PROCESS PIPING\nCPP-PRP",
        package: "PIPING SYSTEM\nCPP-PIPING-PKG",
        status: "Active",
        isRepresentative: false,
    },
    {
        tag: "PIPE03",
        name: "PRODUCED WATER, OILY WATER, DRAINS",
        facility: "Central Processing Platform\nCPP",
        system: "PROCESS PIPING\nCPP-PRP",
        package: "PIPING SYSTEM\nCPP-PIPING-PKG",
        status: "Active",
        isRepresentative: false,
    },
];

export default function RbiPipingDetailPage({ params }: PageProps) {
    const { id } = params;

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
                        href="/rbi/piping"
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-[var(--color-brand-darkHover)] rounded-lg transition-colors mt-0.5 border border-slate-200 dark:border-[var(--color-brand-darkBorder)] bg-white dark:bg-[var(--color-brand-darkCard)]"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white uppercase">
                                Piping G 1
                            </h1>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Circuit ID: CG-Group-1
                        </p>
                    </div>
                </div>
                <Link
                    href={`/rbi/piping/${id}/circuit-group`}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-500/20"
                >
                    <BarChart2 size={16} />
                    View Inspection Results
                </Link>
            </div>

            {/* 🔹 SUMMARY CARDS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* General Information */}
                <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm p-6 space-y-4">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium mb-4">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 opacity-70">
                            <rect x="3" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="14" width="7" height="7" rx="1" />
                            <rect x="3" y="14" width="7" height="7" rx="1" />
                        </svg>
                        General Information
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Circuit ID</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">CG-Group-1</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Circuit Name</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Piping G 1</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Package</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">PIPING SYSTEM</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Package Number</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white uppercase">CPP-PIPING-PKG</p>
                        </div>
                    </div>
                </div>

                {/* Representative Asset */}
                <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm p-6 space-y-4">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium mb-4">
                        <Star className="w-5 h-5 opacity-70" />
                        Representative Asset
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Asset Tag</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">PIPE01</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Asset Name</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">FULL WELLSTREAM PRODUCTION, CRUDE OIL</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔹 PIPING DESIGN DATA (EMPTY STATE) */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm overflow-hidden p-6 space-y-6">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                    <FileText className="w-5 h-5 opacity-70" />
                    Piping Design Data
                </div>
                <div className="py-12 flex flex-col items-center justify-center text-center">
                    <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Design data not found for representative asset</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Design data must be created in the Piping Integrity module for the representative asset</p>
                </div>
            </div>

            {/* 🔹 CURRENT RISK MATRIX */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm overflow-hidden flex flex-col p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                        <BarChart2 className="w-5 h-5" />
                        Current Risk Matrix
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        Risk Plot: <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border border-slate-200 dark:border-[var(--color-brand-darkBorder)] text-slate-600 dark:text-slate-300">N/A</span>
                    </div>
                </div>

                {renderGrid()}

                <div className="flex items-center justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-green-500 text-xs font-bold font-mono border-green-600 flex items-center justify-center text-white" /> <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Low</span></div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-yellow-400 text-xs font-bold font-mono border-yellow-500 flex items-center justify-center text-white" /> <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Medium</span></div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-orange-500 text-xs font-bold font-mono border-orange-600 flex items-center justify-center text-white" /> <span className="text-xs font-medium text-slate-600 dark:text-slate-400">High</span></div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-red-500 text-xs font-bold font-mono border-red-600 flex items-center justify-center text-white" /> <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Very High</span></div>
                </div>
            </div>

            {/* 🔹 ASSETS IN CIRCUIT GROUP TABLE */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-[var(--color-brand-darkCard)]/50">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium mb-4 sm:mb-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 opacity-70">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                            <line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                        Assets in Circuit Group (3)
                    </div>
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-[var(--color-brand-darkBg)] border border-blue-200 dark:border-blue-900/50 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                            <Eye size={16} />
                            View Inspection
                        </button>
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-[var(--color-brand-darkBg)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                            <Edit2 size={16} />
                            Edit Inspection
                        </button>
                        <button className="flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-500/20">
                            <Settings size={16} />
                            Manage Assets
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] bg-slate-50 dark:bg-[var(--color-brand-darkCard)]/50 text-slate-500 dark:text-slate-400">
                                <th className="px-5 py-4 font-semibold">Asset Tag</th>
                                <th className="px-5 py-4 font-semibold">Asset Name</th>
                                <th className="px-5 py-4 font-semibold">Facility</th>
                                <th className="px-5 py-4 font-semibold">System</th>
                                <th className="px-5 py-4 font-semibold">Package</th>
                                <th className="px-5 py-4 font-semibold text-center">Status</th>
                                <th className="px-5 py-4 font-semibold text-center">Representative</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {ASSETS.map((asset) => (
                                <tr
                                    key={asset.tag}
                                    className="hover:bg-slate-50/50 dark:hover:bg-[var(--color-brand-darkHover)]/50 transition-colors"
                                >
                                    <td className="px-5 py-4 text-slate-900 dark:text-slate-300 font-medium">
                                        {asset.tag}
                                    </td>
                                    <td className="px-5 py-4 text-slate-600 dark:text-slate-400 text-xs">
                                        {asset.name}
                                    </td>
                                    <td className="px-5 py-4">
                                        {asset.facility.split("\n").map((line, i) => (
                                            <div
                                                key={i}
                                                className={
                                                    i === 0
                                                        ? "text-slate-900 dark:text-white text-xs"
                                                        : "text-slate-500 dark:text-slate-400 text-[10px] mt-0.5"
                                                }
                                            >
                                                {line}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-5 py-4">
                                        {asset.system.split("\n").map((line, i) => (
                                            <div
                                                key={i}
                                                className={
                                                    i === 0
                                                        ? "text-slate-900 dark:text-white text-xs"
                                                        : "text-slate-500 dark:text-slate-400 text-[10px] mt-0.5"
                                                }
                                            >
                                                {line}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-5 py-4">
                                        {asset.package.split("\n").map((line, i) => (
                                            <div
                                                key={i}
                                                className={
                                                    i === 0
                                                        ? "text-slate-900 dark:text-white text-xs"
                                                        : "text-slate-500 dark:text-slate-400 text-[10px] mt-0.5"
                                                }
                                            >
                                                {line}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full">
                                            {asset.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        {asset.isRepresentative && (
                                            <div className="flex justify-center">
                                                <Star className="text-yellow-500 fill-yellow-500" size={16} />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
