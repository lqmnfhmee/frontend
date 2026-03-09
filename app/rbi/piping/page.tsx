"use client";

import { Eye, Search, Download, Plus, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CIRCUIT_GROUPS = [
    {
        id: "CG-Group-1",
        name: "Piping G 1",
        package: "PIPING SYSTEM",
        asset: "PIPE01 - FULL WELLSTREAM PRODUCTION, CRUDE OIL",
        risk: "No calculation",
    },
];

export default function RbiPipingListPage() {
    const [search, setSearch] = useState("");

    const filteredGroups = CIRCUIT_GROUPS.filter(
        (g) =>
            g.id.toLowerCase().includes(search.toLowerCase()) ||
            g.package.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* 🔹 PAGE HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Circuit Group Management</h1>
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
                            placeholder="Search by Circuit ID or Package Name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                            <Download size={16} />
                            Bulk Import
                        </button>
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-500/20">
                            <Plus size={16} />
                            Create Circuit Group
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                                <th className="px-6 py-4 font-semibold w-8">
                                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                </th>
                                <th className="px-6 py-4 font-semibold">Circuit ID</th>
                                <th className="px-6 py-4 font-semibold">Circuit Name</th>
                                <th className="px-6 py-4 font-semibold">Package Name</th>
                                <th className="px-6 py-4 font-semibold">Representative Asset</th>
                                <th className="px-6 py-4 font-semibold text-center">Overall Risk Result</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {filteredGroups.map((group) => (
                                <tr
                                    key={group.id}
                                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                                        {group.id}
                                    </td>
                                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">
                                        {group.name}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 uppercase">
                                        {group.package}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                        {group.asset}
                                    </td>
                                    <td className="px-6 py-4 text-center text-slate-500 dark:text-slate-400">
                                        {group.risk}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-100 transition-opacity">
                                            <Link
                                                href={`/rbi/piping/${group.id.toLowerCase()}`}
                                                className="p-1.5 text-blue-500 border border-blue-200 rounded hover:bg-blue-50 transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </Link>
                                            <button
                                                className="p-1.5 text-purple-600 border border-purple-200 rounded hover:bg-purple-50 transition-colors"
                                                title="Clone Group"
                                            >
                                                <Copy size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredGroups.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                        No circuit groups found matching your search.
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
