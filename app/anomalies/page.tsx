"use client";

import { useState } from "react";
import AnomalyFeed, { Anomaly } from "@/app/integrity/components/AnomalyFeed";
import AgingBarChart from "@/app/integrity/components/AgingBarChart";
import { RiskLevel } from "@/app/integrity/components/RiskBadge";
import { AlertTriangle, AlertCircle, ShieldAlert, Timer, Download } from "lucide-react";

const ANOMALIES: Anomaly[] = [
    { id: "ANM-2025-001", assetId: "RE-5001", assetName: "Gas Compressor K101", description: "Unusual vibration detected on compressor shaft bearing — amplitude exceeding 8mm/s threshold", severity: "Critical", assignee: "J. Tan", reportedDate: "2025-02-27", age: "4d ago", status: "Open" },
    { id: "ANM-2025-002", assetId: "V-1001", assetName: "HP Separator Vessel", description: "External corrosion observed on lower shell (25% wall loss in 150mm diameter patch)", severity: "Critical", assignee: "A. Rahman", reportedDate: "2025-02-25", age: "6d ago", status: "In Progress" },
    { id: "ANM-2025-003", assetId: "P-2001", assetName: "Gas Export Riser", description: "Coating degradation found at splash zone — CP readings below nominal threshold", severity: "High", assignee: "J. Tan", reportedDate: "2025-02-20", age: "11d ago", status: "Open" },
    { id: "ANM-2025-004", assetId: "V-1002", assetName: "LP Flash Drum", description: "Inlet nozzle weld showing hairline crack, UT confirmed depth 2.8mm", severity: "High", assignee: "S. Lee", reportedDate: "2025-02-15", age: "16d ago", status: "In Progress" },
    { id: "ANM-2025-005", assetId: "HE-3001", assetName: "Feed/Effluent Exchanger", description: "Tube-to-tubesheet leak on shell side — moderate fouling contributing to thinning", severity: "Medium", assignee: "A. Rahman", reportedDate: "2025-02-10", age: "21d ago", status: "Deferred" },
    { id: "ANM-2025-006", assetId: "P-2002", assetName: "Condensate Transfer Line", description: "CUI found at pipe support clamp — estimated metal loss 18%", severity: "Medium", assignee: "J. Tan", reportedDate: "2025-02-05", age: "26d ago", status: "Open" },
    { id: "ANM-2025-007", assetId: "TK-4001", assetName: "Crude Storage Tank", description: "Minor leak at roof seal — rainwater ingress suspected, no product loss", severity: "Low", assignee: "S. Lee", reportedDate: "2025-01-28", age: "1mo ago", status: "Closed" },
    { id: "ANM-2025-008", assetId: "P-2003", assetName: "Fuel Gas Header", description: "Small pit corrosion at 6 o'clock position, depth 1.2mm, below design limit", severity: "Low", assignee: "A. Rahman", reportedDate: "2025-01-20", age: "1mo ago", status: "Closed" },
];

const severityLevels: (RiskLevel | null)[] = [null, "Critical", "High", "Medium", "Low"];

const kpis = [
    { label: "Total Anomalies", value: ANOMALIES.length, Icon: ShieldAlert, color: "text-slate-600 dark:text-slate-300", bg: "bg-slate-100 dark:bg-slate-800" },
    { label: "Critical", value: ANOMALIES.filter((a) => a.severity === "Critical").length, Icon: AlertTriangle, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10" },
    { label: "Open + In Progress", value: ANOMALIES.filter((a) => a.status === "Open" || a.status === "In Progress").length, Icon: AlertCircle, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10" },
    { label: "Avg. Age (days)", value: 16, Icon: Timer, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
];

export default function AnomaliesPage() {
    const [filterSeverity, setFilterSeverity] = useState<RiskLevel | null>(null);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Anomalies Management</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Active defects and deviations · LARUT-A (LRA)</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
                    <Download size={15} /> Export
                </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map(({ label, value, Icon, color, bg }) => (
                    <div key={label} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex items-center gap-4 shadow-sm">
                        <div className={`p-2.5 rounded-xl ${bg}`}><Icon size={20} className={color} /></div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Anomaly Feed</h2>
                        <div className="flex flex-wrap gap-2">
                            {severityLevels.map((level) => (
                                <button key={level ?? "All"} onClick={() => setFilterSeverity(level)}
                                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${filterSeverity === level ? "bg-indigo-600 text-white border-indigo-600" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500"}`}>
                                    {level === null ? "All" : level}
                                </button>
                            ))}
                        </div>
                    </div>
                    <AnomalyFeed anomalies={ANOMALIES} filterSeverity={filterSeverity} />
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Anomaly Aging</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Count by severity × age bucket</p>
                    <AgingBarChart />
                    <div className="mt-6 space-y-2">
                        {[
                            { label: "Critical + Open > 7d", value: 2, color: "bg-red-500" },
                            { label: "High unresolved", value: 2, color: "bg-orange-400" },
                            { label: "Deferred items", value: ANOMALIES.filter((a) => a.status === "Deferred").length, color: "bg-slate-400" },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${item.color}`} /><span className="text-slate-600 dark:text-slate-400">{item.label}</span></div>
                                <span className="font-semibold text-slate-900 dark:text-white">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
