"use client";

import { useState } from "react";
import {
    Search, Plus, Pencil, Trash2, X, ChevronDown, Download, Upload, Info, ChevronLeft, ChevronRight
} from "lucide-react";

interface ProcessLine {
    id: string;
    name: string;
    code: string;
    facility: string;
    created: string;
    status: "Active" | "Inactive";
}

const mockProcessLinesPage1: ProcessLine[] = [
    { id: "1", name: "STRUCTURE/SUPPORT", code: "N/A", facility: "LARUT", created: "30/12/2025", status: "Active" },
    { id: "2", name: "OTHERS - GENERAL", code: "OTHERS", facility: "LARUT", created: "30/12/2025", status: "Active" },
    { id: "3", name: "WW - WATER, WASTE / SEWAGE", code: "WW", facility: "LARUT", created: "30/12/2025", status: "Active" },
    { id: "4", name: "WT - WATER, TREATED (DE-IONOZED)", code: "WT", facility: "LARUT", created: "30/12/2025", status: "Active" },
    { id: "5", name: "WS - WATER, SEA", code: "WS", facility: "LARUT", created: "30/12/2025", status: "Active" },
    { id: "6", name: "WR - WATER, RAW/WASH (NON-CORROSIVE)", code: "WR", facility: "LARUT", created: "30/12/2025", status: "Active" },
    { id: "7", name: "WQ - WATER, RAW/WASH (CORROSIVE)", code: "WQ", facility: "LARUT", created: "30/12/2025", status: "Active" },
    { id: "8", name: "WP - WATER, POTABLE", code: "WP", facility: "LARUT", created: "30/12/2025", status: "Active" },
    { id: "9", name: "WO - WATER, OILY", code: "WO", facility: "LARUT", created: "30/12/2025", status: "Active" },
    { id: "10", name: "WI - WATER, DEOXYGENATED SEAWATER FOR INJECTION", code: "WI", facility: "LARUT", created: "30/12/2025", status: "Active" },
    { id: "11", name: "WH - WATER / HOT (DOMESTIC PLUMBING)", code: "WH", facility: "LARUT", created: "30/12/2025", status: "Active" },
    { id: "12", name: "WG - WATER / GLYCOL MIXTURE", code: "WG", facility: "LARUT", created: "30/12/2025", status: "Active" },
    { id: "13", name: "WF - WATER, FIRE", code: "WF", facility: "LARUT", created: "30/12/2025", status: "Active" },
    { id: "14", name: "FD - FUEL, DIESEL", code: "FD", facility: "LARUT", created: "30/12/2025", status: "Active" },
    { id: "15", name: "DO - DRAIN, OPEN", code: "DO", facility: "LARUT", created: "30/12/2025", status: "Active" },
];

const mockProcessLinesPage2: ProcessLine[] = [
    { id: "16", name: "DC - DRAIN, CLOSED", code: "DC", facility: "LARUT", created: "30/12/2025", status: "Active" },
    { id: "17", name: "AI - AIR, INSTRUMENT", code: "AI", facility: "LARUT", created: "30/12/2025", status: "Active" },
    { id: "18", name: "WD - WATER, DISPOSAL (CORROSIVE)", code: "WD", facility: "LARUT", created: "08/12/2025", status: "Active" },
    { id: "19", name: "WC - WATER, PROCESS (CORROSIVE)", code: "WC", facility: "LARUT", created: "08/12/2025", status: "Active" },
    { id: "20", name: "VC - FLARE & VENT, CORROSIVE", code: "VC", facility: "LARUT", created: "08/12/2025", status: "Active" },
    { id: "21", name: "V - FLARE & VENT, SWEET", code: "V", facility: "LARUT", created: "08/12/2025", status: "Active" },
    { id: "22", name: "PC - HYDROCARBON, LIQUID, CORROSIVE", code: "PC", facility: "LARUT", created: "08/12/2025", status: "Active" },
    { id: "23", name: "P - HYDROCARBON, LIQUID, SWEET", code: "P", facility: "LARUT", created: "08/12/2025", status: "Active" },
    { id: "24", name: "LS - LUBE/SEAL OIL", code: "LS", facility: "LARUT", created: "08/12/2025", status: "Active" },
    { id: "25", name: "HY - HYDRAULIC OIL", code: "HY", facility: "LARUT", created: "08/12/2025", status: "Active" },
    { id: "26", name: "HM - HEATING MEDIUM (HOT OIL)", code: "HM", facility: "LARUT", created: "08/12/2025", status: "Active" },
    { id: "27", name: "GF - CO2 & HALON", code: "GF", facility: "LARUT", created: "08/12/2025", status: "Active" },
    { id: "28", name: "GC - PROCESS GAS, CORROSIVE", code: "GC", facility: "LARUT", created: "08/12/2025", status: "Active" },
    { id: "29", name: "G - PROCESS GAS, SWEET", code: "G", facility: "LARUT", created: "08/12/2025", status: "Active" },
    { id: "30", name: "FJ - FUEL, JET", code: "FJ", facility: "LARUT", created: "08/12/2025", status: "Active" },
];

const mockProcessLinesPage3: ProcessLine[] = [
    { id: "31", name: "C - CHEMICALS, LIQUID", code: "C", facility: "LARUT", created: "08/11/2025", status: "Active" },
    { id: "32", name: "AS - AIR, SERVICE/STARTING", code: "AS", facility: "LARUT", created: "08/12/2025", status: "Active" },
];

export default function ProcessLinesManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

    const pages = [mockProcessLinesPage1, mockProcessLinesPage2, mockProcessLinesPage3];
    const currentItems = pages[currentPage - 1];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Process Lines Management</h1>
            </div>

            {/* Main Container Card */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm overflow-hidden">
                {/* Toolbar Section */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest flex items-center">Process Lines</h2>

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="relative min-w-[140px]">
                                <select className="w-full pl-4 pr-10 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-600 dark:text-slate-300">
                                    <option>All Status</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            </div>

                            <div className="relative flex-1 min-w-[300px]">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by process name, code, or description..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                                />
                            </div>

                            <button
                                onClick={() => setIsBulkModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 text-sky-500 border border-sky-500 rounded-lg hover:bg-sky-500/5 transition-colors text-xs font-bold"
                            >
                                <Upload size={14} /> Bulk Upload
                            </button>

                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-xs font-bold shadow-md shadow-sky-500/20"
                            >
                                <Plus size={14} /> Add Process Line
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card Grid Content */}
                <div className="p-6 bg-slate-50/30 dark:bg-slate-900/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentItems.map((line) => (
                            <div key={line.id} className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 relative group hover:border-sky-500/50 transition-all shadow-sm hover:shadow-md">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">{line.name}</h3>
                                            <span className="px-2 py-0.5 rounded-full bg-sky-500 text-[9px] font-bold text-white uppercase">{line.status}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1 text-sky-500 hover:bg-sky-500/10 rounded">
                                            <Pencil size={14} />
                                        </button>
                                        <button className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                                        <span>Code: <span className="text-slate-700 dark:text-slate-200">{line.code}</span></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                                        <span>{line.facility}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                                        <span>Created: {line.created}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Footer */}
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <span className="text-xs text-slate-500 font-medium italic">
                            Showing {((currentPage - 1) * 15) + 1} to {Math.min(currentPage * 15, 32)} of 32 process lines
                        </span>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-sky-500 hover:bg-sky-500/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={14} /> Previous
                            </button>
                            <div className="text-xs font-bold text-slate-600 dark:text-slate-400">
                                Page <span className="text-slate-900 dark:text-white">{currentPage}</span> of 3
                            </div>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, 3))}
                                disabled={currentPage === 3}
                                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-sky-500 hover:bg-sky-500/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add New Process Line Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-slate-900">
                    <div className="bg-white border border-slate-200 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Add New Process Line</h3>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            <p className="text-xs text-slate-500 font-medium">Create a new process line for anomaly management. All fields marked with * are required.</p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Process Name *</label>
                                    <input
                                        type="text"
                                        placeholder="Enter process name (e.g., Main Process Line A, Separator Process)"
                                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Process Code *</label>
                                    <input
                                        type="text"
                                        placeholder="Enter process code (e.g., PL-01, SEP-A)"
                                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Description</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Enter optional description or notes"
                                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 resize-none"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Status</label>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-slate-400">Inactive</span>
                                        <div className="w-10 h-5 bg-indigo-500 rounded-full relative p-1 cursor-pointer">
                                            <div className="w-3 h-3 bg-white rounded-full absolute right-1" />
                                        </div>
                                        <span className="text-xs font-bold text-indigo-500">Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-gray-50/50 flex justify-end gap-3">
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="px-6 py-2 text-xs font-bold text-indigo-600 border border-indigo-200 bg-white hover:bg-indigo-50 rounded-lg transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-2 text-xs font-bold text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-all shadow-md shadow-indigo-500/10"
                            >
                                Create Process Line
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Bulk Upload Modal */}
            {isBulkModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-slate-900">
                    <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Bulk Upload Process Lines</h3>
                            <button
                                onClick={() => setIsBulkModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-8 space-y-8">
                            <div className="bg-indigo-500 rounded-xl p-6 text-white space-y-4 shadow-lg shadow-indigo-500/20">
                                <div className="flex items-center gap-2">
                                    <Info size={16} />
                                    <h4 className="text-xs font-bold uppercase tracking-wider">Instructions:</h4>
                                </div>
                                <ol className="space-y-1.5 text-[11px] font-medium opacity-90 list-decimal list-inside px-1">
                                    <li>Download the Excel template below</li>
                                    <li>Fill in your process lines data</li>
                                    <li>Process Code: Required, max 10 characters (e.g., PROC-001)</li>
                                    <li>Process Name: Optional, max 50 characters</li>
                                    <li>Description: Optional, max 255 characters</li>
                                    <li>Is Active: Optional, defaults to Yes (Yes/No)</li>
                                    <li>Upload the completed file</li>
                                    <li>All process lines will be added to your current site</li>
                                    <li>If a process code already exists in your site, it will be updated</li>
                                </ol>
                            </div>

                            <div className="space-y-6">
                                <button className="w-full py-3 flex items-center justify-center gap-2 border border-indigo-200 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors bg-white shadow-sm font-bold text-xs">
                                    <Download size={16} /> Download Template
                                </button>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Upload File *</label>
                                    <div className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-400 cursor-pointer flex justify-between items-center hover:border-indigo-500 transition-colors">
                                        <span>Choose File <span className="text-slate-300">No file chosen</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-gray-50/50 flex justify-end gap-3">
                            <button
                                onClick={() => setIsBulkModalOpen(false)}
                                className="px-6 py-2 text-xs font-bold text-indigo-600 border border-indigo-200 bg-white hover:bg-indigo-50 rounded-lg transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                disabled
                                className="px-8 py-2 text-xs font-bold text-white bg-indigo-300 rounded-lg cursor-not-allowed uppercase tracking-wider"
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
