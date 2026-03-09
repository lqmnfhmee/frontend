import { Info, Tag, Database, Calendar, FileCheck, Activity, BarChart2, ShieldAlert, Clock } from "lucide-react";

export default function OverviewTab() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Circuit Group Info */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium mb-4">
                    <Info className="w-5 h-5 opacity-70" />
                    Circuit Group Information
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Tag size={14} /> Circuit Group Name</div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Tag size={14} /> Circuit Group Number</div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Database size={14} /> Package</div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white uppercase">PIPING SYSTEM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Calendar size={14} /> Last Calculation Date</div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                </div>
            </div>

            {/* Inspection Status */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium mb-4">
                    <FileCheck className="w-5 h-5 opacity-70" />
                    Inspection Status
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Activity size={14} /> Inspection Status</div>
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">NOT CALCULATED</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Calendar size={14} /> Calculation Date</div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Calendar size={14} /> Last Inspection Date</div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                </div>
            </div>

            {/* Key Risk Metrics Container */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:col-span-2 space-y-6">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium mb-2">
                    <BarChart2 className="w-5 h-5 opacity-70" />
                    Key Risk Metrics
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {/* Probability Column */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">Probability Calculations</h4>
                        <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-800/60">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Total Damage Factor</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                        <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-800/60">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Management Systems Factor</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                        <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-800/60">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Generic Failure Frequency</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                        <div className="flex justify-between items-center py-2.5">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Probability of Failure Value</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                            <span className="text-sm font-semibold text-green-700 dark:text-green-500">POF Category</span>
                            <span className="text-sm font-bold text-green-700 dark:text-green-500">N/A</span>
                        </div>
                    </div>

                    {/* Consequence Column */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">Consequence Categories</h4>
                        <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-800/60">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Flammable Damage Category</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                        <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-800/60">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Flammable Injury Category</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                        <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-800/60">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Toxic Category</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                        <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-800/60">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Non-Flammable Category</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                        <div className="flex justify-between items-center py-2.5">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Financial Category</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                            <span className="text-sm font-semibold text-blue-700 dark:text-blue-500">Total Consequence (COF)</span>
                            <span className="text-sm font-bold text-blue-700 dark:text-blue-500">N/A</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Risk Assessment Summary */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium mb-4">
                    <ShieldAlert className="w-5 h-5 opacity-70" />
                    Risk Assessment
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><BarChart2 size={14} /> Risk Matrix</div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Info size={14} /> Inspection Planning Risk</div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Clock size={14} /> Inspection Interval (months)</div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Activity size={14} /> Inspection Effectiveness</div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Calendar size={14} /> Next Inspection Date</div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                </div>
            </div>

            {/* Next Inspection Summary */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium mb-4">
                    <Calendar className="w-5 h-5 opacity-70" />
                    Next Inspection
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Clock size={14} /> Intrusive Interval (years)</div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Clock size={14} /> Extrusive Interval (years)</div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/60">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Calendar size={14} /> Next Internal Inspection</div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Calendar size={14} /> Next External Inspection</div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">N/A</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
