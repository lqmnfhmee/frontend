import { Info, BarChart2, ChevronUp, DollarSign, Target, List } from "lucide-react";

export default function COFTab() {
    return (
        <div className="space-y-6">
            <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/50 rounded-lg p-4 flex gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Consequence of Failure (COF) Details</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-300">This tab shows COF financial inputs, consequence areas, and consequence categories.</p>
                </div>
            </div>

            {/* COF Financial Input Accordion */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 cursor-pointer">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                        <DollarSign className="w-5 h-5 opacity-70" /> COF Financial Input
                    </div>
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                </div>
                <div className="p-6">
                    <p className="text-sm text-center text-slate-500 dark:text-slate-400 py-4">No COF financial input data available</p>
                </div>
            </div>

            {/* Consequence Areas Accordion */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 cursor-pointer">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                        <Target className="w-5 h-5 opacity-70" /> Consequence Areas
                    </div>
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                </div>
                <div className="p-6 space-y-1">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Flammable Damage Area (m²)</span>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Flammable Injury Area (m²)</span>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Toxic Area (m²)</span>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Non-Flammable Area (m²)</span>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Financial Value ($)</span>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                </div>
            </div>

            {/* Consequence Categories Accordion */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 cursor-pointer">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                        <List className="w-5 h-5 opacity-70" /> Consequence Categories
                    </div>
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                </div>
                <div className="p-6 space-y-1">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Flammable Damage Category</span>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Flammable Injury Category</span>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Toxic Category</span>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Non-Flammable Category</span>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Financial Category</span>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center p-3 mt-2 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                        <span className="text-sm font-semibold text-blue-700 dark:text-blue-500">Total Consequence (COF)</span>
                        <span className="text-sm font-bold text-blue-700 dark:text-blue-500">N/A</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
