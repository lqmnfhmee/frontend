"use client";

import { Eye, Trash2, Search, Download, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const VESSELS = [
    {
        tag: "1V-110",
        name: "Test Separator",
        facility: "Larut-A\nLRA",
        system: "Crude Test Seperation Unit\nLRA-CSU",
        package: "—",
    },
    {
        tag: "1V-210",
        name: "VESSEL, PRODUCTION SEPARATOR, 1V-210",
        facility: "Central Processing Platform\nCPP",
        system: "CRUDE SEPARATION UNIT\nCPP-CSU",
        package: "PRODUCTION SEPARATOR, 1V-210\nCPP-1V210-SKD",
    },
    {
        tag: "2HX-215",
        name: "EXCHANGER, ASSOCIATED GAS COOLER, 2HX-215",
        facility: "Central Processing Platform\nCPP",
        system: "CRUDE SEPARATION UNIT\nCPP-CSU",
        package: "ASSOCIATED GAS COOLER, 2HX-215\nCPP-2HX215-SKD",
    },
];

export default function VesselListPage() {
    const [search, setSearch] = useState("");

    const filteredVessels = VESSELS.filter(
        (v) =>
            v.tag.toLowerCase().includes(search.toLowerCase()) ||
            v.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* 🔹 PAGE HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Equipment Integrity</h1>
            </div>

            {/* 🔹 MAIN CONTAINER */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-[var(--color-brand-darkCard)]/50">
                    <div className="relative w-full sm:w-80">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            size={16}
                        />
                        <input
                            type="text"
                            placeholder="Search by asset tag or name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-[var(--color-brand-darkBg)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-[var(--color-brand-darkBg)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                            <Download size={16} />
                            Bulk Import
                        </button>
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-500/20">
                            <Plus size={16} />
                            Add Asset
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] bg-slate-50 dark:bg-[var(--color-brand-darkCard)]/50 text-slate-500 dark:text-slate-400">
                                <th className="px-6 py-4 font-semibold">Asset Tag</th>
                                <th className="px-6 py-4 font-semibold">Asset Name</th>
                                <th className="px-6 py-4 font-semibold">Facility</th>
                                <th className="px-6 py-4 font-semibold">System</th>
                                <th className="px-6 py-4 font-semibold">Package</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {filteredVessels.map((vessel) => (
                                <tr
                                    key={vessel.tag}
                                    className="hover:bg-slate-50/50 dark:hover:bg-[var(--color-brand-darkHover)]/50 transition-colors group"
                                >
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                                        {vessel.tag}
                                    </td>
                                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                                        {vessel.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {vessel.facility.split("\n").map((line, i) => (
                                            <div
                                                key={i}
                                                className={
                                                    i === 0
                                                        ? "text-slate-900 dark:text-white font-medium"
                                                        : "text-slate-500 dark:text-slate-400 text-xs mt-0.5"
                                                }
                                            >
                                                {line}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4">
                                        {vessel.system.split("\n").map((line, i) => (
                                            <div
                                                key={i}
                                                className={
                                                    i === 0
                                                        ? "text-slate-900 dark:text-white font-medium"
                                                        : "text-slate-500 dark:text-slate-400 text-xs mt-0.5"
                                                }
                                            >
                                                {line}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4">
                                        {vessel.package.split("\n").map((line, i) => (
                                            <div
                                                key={i}
                                                className={
                                                    i === 0
                                                        ? "text-slate-900 dark:text-white font-medium"
                                                        : "text-slate-500 dark:text-slate-400 text-xs mt-0.5"
                                                }
                                            >
                                                {line}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link
                                                href={`/inspection-management/vessel/${vessel.tag.toLowerCase()}`}
                                                className="p-1 text-slate-400 hover:text-blue-500 transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                            <button
                                                className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                                                title="Delete Asset"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredVessels.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                        No vessels found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
