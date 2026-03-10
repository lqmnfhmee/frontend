"use client";

import { useState } from "react";
import { Search, RotateCcw, Trash2 } from "lucide-react";

type Tab = "Facilities" | "Systems" | "Packages" | "Assets";

export default function DeletedItemsPage() {
    const [activeTab, setActiveTab] = useState<Tab>("Facilities");

    const tabs: Tab[] = ["Facilities", "Systems", "Packages", "Assets"];

    const deletedAssets = [
        { name: "Test Separator", tag: "1V-110", type: "-", facility: "Larut-A", system: "Crude Test Seperation Unit", site: "Larut-A", deletedAt: "04/12/2025, 11:08:35 am" },
        { name: "Test Separator", tag: "1V-110", type: "-", facility: "-", system: "-", site: "Larut-A", deletedAt: "04/12/2025, 11:08:32 am" },
        { name: "(TOS)DAMPER, FIRE, ENCL, GD-366, ALL", tag: "FDGD366", type: "-", facility: "Larut-A", system: "Crude Test Seperation Unit", site: "Larut-A", deletedAt: "04/12/2025, 10:52:54 am" }
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    Deleted Items
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Restore or permanently delete items
                </p>
            </div>

            {/* Main Container */}
            <div className="bg-white dark:bg-[var(--color-brand-darkBg)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm overflow-hidden p-6">

                {/* Tabs */}
                <div className="bg-slate-100 dark:bg-[var(--color-brand-darkCard)]/50 p-1 rounded-lg flex mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                flex-1 py-2 text-sm font-medium rounded-md transition-all
                ${activeTab === tab
                                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                                }
              `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Dynamic Header & Search */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Deleted {activeTab}
                    </h2>
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-2 text-sm border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg bg-slate-50 dark:bg-[var(--color-brand-darkCard)] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Tab Content Tables */}
                <div className="overflow-x-auto border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg">

                    {/* Facilities Tab */}
                    {activeTab === "Facilities" && (
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 dark:bg-[var(--color-brand-darkCard)]/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)]">
                                <tr>
                                    <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-slate-300" /></th>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Code</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Site</th>
                                    <th className="px-6 py-4">Deleted At</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                        No deleted facilities found
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}

                    {/* Systems Tab */}
                    {activeTab === "Systems" && (
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 dark:bg-[var(--color-brand-darkCard)]/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)]">
                                <tr>
                                    <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-slate-300" /></th>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Code</th>
                                    <th className="px-6 py-4">Number</th>
                                    <th className="px-6 py-4">Facility</th>
                                    <th className="px-6 py-4">Site</th>
                                    <th className="px-6 py-4">Deleted At</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                        No deleted systems found
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}

                    {/* Packages Tab */}
                    {activeTab === "Packages" && (
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 dark:bg-[var(--color-brand-darkCard)]/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)]">
                                <tr>
                                    <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-slate-300" /></th>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Number</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">System</th>
                                    <th className="px-6 py-4">Site</th>
                                    <th className="px-6 py-4">Deleted At</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                        No deleted packages found
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}

                    {/* Assets Tab */}
                    {activeTab === "Assets" && (
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 dark:bg-[var(--color-brand-darkCard)]/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)]">
                                <tr>
                                    <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-slate-300" /></th>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Tag</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Facility</th>
                                    <th className="px-6 py-4">System</th>
                                    <th className="px-6 py-4">Site</th>
                                    <th className="px-6 py-4">Deleted At</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                                {deletedAssets.map((asset, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                        <td className="px-6 py-4"><input type="checkbox" className="rounded border-slate-300" /></td>
                                        <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-300">{asset.name}</td>
                                        <td className="px-6 py-4">{asset.tag}</td>
                                        <td className="px-6 py-4">{asset.type}</td>
                                        <td className="px-6 py-4">{asset.facility}</td>
                                        <td className="px-6 py-4">{asset.system}</td>
                                        <td className="px-6 py-4">{asset.site}</td>
                                        <td className="px-6 py-4">{asset.deletedAt}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 text-slate-400">
                                                <button className="p-1.5 text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary-soft)] dark:hover:bg-[var(--color-brand-primary-soft)]0/10 rounded-md border border-[var(--color-brand-primary-soft)] dark:border-[var(--color-brand-primary-soft)] transition-colors tooltip" title="Restore">
                                                    <RotateCcw size={16} />
                                                </button>
                                                <button className="p-1.5 text-white bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] rounded-md transition-colors tooltip" title="Permanently Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                </div>

            </div>
        </div>
    );
}
