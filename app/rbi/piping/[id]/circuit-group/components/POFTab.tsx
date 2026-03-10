import { Info, BarChart2, Zap, ChevronUp } from "lucide-react";

export default function POFTab() {
    return (
        <div className="space-y-6">
            <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/50 rounded-lg p-4 flex gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Probability of Failure (POF) Details</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-300">This tab shows POF calculations, inspection input data, and damage factor outputs.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Probability Calculations */}
                <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm p-6 space-y-4">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium mb-4">
                        <BarChart2 className="w-5 h-5 opacity-70" />
                        Probability Calculations
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-[var(--color-brand-darkBorder)]/60">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Total Damage Factor</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-[var(--color-brand-darkBorder)]/60">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Management Systems Factor</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-[var(--color-brand-darkBorder)]/60">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Generic Failure Frequency</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Probability of Failure Value</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                        <div className="flex justify-between items-center p-3 mt-2 bg-green-50 dark:bg-green-900/10 rounded-lg">
                            <span className="text-sm font-semibold text-green-700 dark:text-green-500">POF Category</span>
                            <span className="text-sm font-bold text-green-700 dark:text-green-500">N/A</span>
                        </div>
                    </div>
                </div>

                {/* Damage Factors */}
                <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm p-6 space-y-4">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium mb-4">
                        <Zap className="w-5 h-5 opacity-70" />
                        Damage Factors
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-[var(--color-brand-darkBorder)]/60">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Thinning Combined</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-[var(--color-brand-darkBorder)]/60">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Stress Corrosion Cracking (SCC)</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-[var(--color-brand-darkBorder)]/60">
                            <span className="text-xs text-slate-500 dark:text-slate-400">External</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-[var(--color-brand-darkBorder)]/60">
                            <span className="text-xs text-slate-500 dark:text-slate-400">High Temperature Hydrogen Attack (HTHA)</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-[var(--color-brand-darkBorder)]/60">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Brittle Fracture</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Fatigue</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Input Accordion */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm overflow-hidden">
                <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] bg-slate-50/50 dark:bg-slate-800/20 cursor-pointer">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                        <FileText className="w-5 h-5 opacity-70" /> Input
                    </div>
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                </div>
                <div className="p-6">
                    <div className="border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg p-8 flex flex-col items-center justify-center text-center">
                        <FileText className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-2" />
                        <p className="text-sm text-slate-500 dark:text-slate-400">No inspection data available</p>
                    </div>
                </div>
            </div>

            {/* Damage Factors Output Accordion */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm overflow-hidden">
                <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] bg-slate-50/50 dark:bg-slate-800/20 cursor-pointer">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                        <BarChart2 className="w-5 h-5 opacity-70" /> Damage Factors Output
                    </div>
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                </div>
                <div className="p-6">
                    <div className="border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg p-8 flex flex-col items-center justify-center text-center">
                        <Info className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-2" />
                        <p className="text-sm text-slate-500 dark:text-slate-400">No damage factor outputs available</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Ensure an import for FileText is present if I missed it, I'll add it to POFTab
import { FileText } from "lucide-react";
