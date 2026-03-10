"use client";

import { Upload, FileText } from "lucide-react";

export default function AttachmentsTab() {
    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            {/* P&ID Documents */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] pb-4">
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-white">P&ID Documents</h2>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                        <Upload size={16} />
                        Upload
                    </button>
                </div>
                <div className="py-12 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                    <FileText size={48} className="mb-4 opacity-50" strokeWidth={1} />
                    <p className="text-sm">No documents uploaded yet</p>
                </div>
            </div>

            {/* GA/ISO Documents */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] pb-4">
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-white">GA/ISO Documents</h2>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                        <Upload size={16} />
                        Upload
                    </button>
                </div>
                <div className="py-12 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                    <FileText size={48} className="mb-4 opacity-50" strokeWidth={1} />
                    <p className="text-sm">No documents uploaded yet</p>
                </div>
            </div>

            {/* SOE Documents */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] pb-4">
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-white">SOE Documents</h2>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                        <Upload size={16} />
                        Upload
                    </button>
                </div>
                <div className="py-12 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                    <FileText size={48} className="mb-4 opacity-50" strokeWidth={1} />
                    <p className="text-sm">No documents uploaded yet</p>
                </div>
            </div>
        </div>
    );
}
