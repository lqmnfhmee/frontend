"use client";

import { Eye, Trash2, Search, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const PIPING_DATA = [
    {
        tag: "PIPE01",
        name: "FULL WELLSTREAM PRODUCTION, CRUDE OIL",
        facility: "Central Processing Platform\nCPP",
        system: "PROCESS PIPING\nCPP-PRP",
        package: "PIPING SYSTEM\nCPP-PIPING-PKG",
    },
];

export default function PipingListPage() {
    const [search, setSearch] = useState("");

    const filteredPiping = PIPING_DATA.filter(
        (p) =>
            p.tag.toLowerCase().includes(search.toLowerCase()) ||
            p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* 🔹 PAGE HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Piping Integrity</h1>
            </div>

            {/* 🔹 MAIN CONTAINER */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
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
                            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-500/20">
                            <Plus size={16} />
                            Add Asset to Piping
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                                <th className="px-6 py-4 font-semibold w-[15%]">Asset Tag</th>
                                <th className="px-6 py-4 font-semibold w-[35%]">Asset Name</th>
                                <th className="px-6 py-4 font-semibold w-[20%]">Facility</th>
                                <th className="px-6 py-4 font-semibold w-[10%]">System</th>
                                <th className="px-6 py-4 font-semibold w-[15%]">Package</th>
                                <th className="px-6 py-4 font-semibold text-right w-[5%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {filteredPiping.map((pipe) => (
                                <tr
                                    key={pipe.tag}
                                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group"
                                >
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                                        {pipe.tag}
                                    </td>
                                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                                        {pipe.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pipe.facility.split("\n").map((line, i) => (
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
                                        {pipe.system.split("\n").map((line, i) => (
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
                                        {pipe.package.split("\n").map((line, i) => (
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
                                                href={`/inspection-management/piping/${pipe.tag.toLowerCase()}`}
                                                className="p-1 px-2 border border-blue-200 dark:border-blue-800/50 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </Link>
                                            <button
                                                className="p-1 px-2 border border-red-200 dark:border-red-800/50 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                                                title="Delete Asset"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredPiping.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                        No piping found matching your search.
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
