"use client";

import { useState } from "react";
import {
    Search, Plus, Pencil, X, ChevronDown, AlertCircle
} from "lucide-react";

const mockSystemData = [
    { code: "CPP-PRP", name: "PROCESS PIPING", facility: "Central Processing Platform", type: "Piping" },
];

export default function SystemConfigurationPage() {
    const [isPipingModalOpen, setIsPipingModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [selectedSystem, setSelectedSystem] = useState<{ code: string, name: string } | null>(null);

    const openRemoveModal = (system: { code: string, name: string }) => {
        setSelectedSystem(system);
        setIsRemoveModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">System Configuration</h1>
            </div>

            {/* Top Bar Card */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm p-4">
                <div className="flex justify-between items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by System Code or Name..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                    </div>
                    <button
                        onClick={() => setIsPipingModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm font-bold shadow-md shadow-sky-500/20 uppercase tracking-tight"
                    >
                        <Plus size={16} /> Set Systems as Piping
                    </button>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                                <th className="px-6 py-4">System Code</th>
                                <th className="px-6 py-4">System Name</th>
                                <th className="px-6 py-4">Facility</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                            {mockSystemData.map((row) => (
                                <tr key={row.code} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono">{row.code}</td>
                                    <td className="px-6 py-4 text-sm uppercase">{row.name}</td>
                                    <td className="px-6 py-4 text-sm">{row.facility}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-0.5 rounded-full bg-sky-500/10 text-sky-500 text-[10px] font-bold border border-sky-500/20">
                                            {row.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => openRemoveModal({ code: row.code, name: row.name })}
                                            className="p-1.5 text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors border border-amber-500/20 shadow-sm"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {/* Empty state filling space */}
                            <tr className="h-64">
                                <td colSpan={5}></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Set Systems as Piping Modal */}
            {isPipingModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-slate-900">
                    <div className="bg-white border border-slate-200 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-sm font-bold text-slate-800">Set Systems as Piping</h3>
                            <button
                                onClick={() => setIsPipingModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="space-y-2 text-slate-900">
                                <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Select Systems</label>
                                <div className="relative text-slate-900">
                                    <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700">
                                        <option>Select systems to mark as piping...</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                                <p className="text-[10px] text-slate-500 font-medium">Select one or more systems to mark them as piping systems</p>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-gray-50/50 flex justify-end gap-3">
                            <button
                                onClick={() => setIsPipingModalOpen(false)}
                                className="px-6 py-2 text-xs font-bold text-indigo-600 border border-indigo-200 bg-white hover:bg-indigo-50 rounded-lg transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-2 text-xs font-bold text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-all shadow-md shadow-indigo-500/10"
                            >
                                Set as Piping
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Remove System Modal */}
            {isRemoveModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-slate-900">
                    <div className="bg-white border border-slate-200 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-sm font-bold text-slate-800">Remove System from Piping</h3>
                            <button
                                onClick={() => setIsRemoveModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <p className="text-sm text-slate-600">Are you sure you want to remove this system from piping configuration?</p>

                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg space-y-3">
                                <div className="grid grid-cols-2 text-xs">
                                    <span className="font-bold text-slate-500">System Code:</span>
                                    <span className="font-mono text-slate-800">{selectedSystem?.code}</span>
                                </div>
                                <div className="grid grid-cols-2 text-xs">
                                    <span className="font-bold text-slate-500">System Name:</span>
                                    <span className="text-slate-800">{selectedSystem?.name}</span>
                                </div>
                            </div>

                            <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg flex gap-3">
                                <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
                                    This system will be removed from the piping configuration table and will no longer appear in piping circuit groups.
                                </p>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-gray-50/50 flex justify-end gap-3">
                            <button
                                onClick={() => setIsRemoveModalOpen(false)}
                                className="px-6 py-2 text-xs font-bold text-indigo-600 border border-indigo-200 bg-white hover:bg-indigo-50 rounded-lg transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-2 text-xs font-bold text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-all shadow-md shadow-indigo-500/10"
                            >
                                Remove from Piping
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
