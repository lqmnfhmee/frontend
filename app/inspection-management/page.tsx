"use client";

import InspectionDonutChart from "@/app/integrity/components/InspectionDonutChart";
import InspectionKanban, { Inspection } from "@/app/integrity/components/InspectionKanban";
import { CheckCircle, AlertTriangle, Clock, BarChart2, Download } from "lucide-react";

const INSPECTIONS: Inspection[] = [
    { id: "INSP-2025-001", assetId: "RE-5001", assetName: "Gas Compressor K101", type: "Vibration Analysis", priority: "Critical", assignee: "J. Tan", scheduledDate: "2024-12-20", status: "Overdue" },
    { id: "INSP-2025-002", assetId: "V-1001", assetName: "HP Separator Vessel", type: "Thickness Measurement", priority: "Critical", assignee: "A. Rahman", scheduledDate: "2025-01-15", status: "Overdue" },
    { id: "INSP-2025-003", assetId: "P-2001", assetName: "Gas Export Riser", type: "Visual Inspection", priority: "High", assignee: "J. Tan", scheduledDate: "2025-03-08", status: "Upcoming" },
    { id: "INSP-2025-004", assetId: "V-1002", assetName: "LP Flash Drum", type: "Internal Inspection", priority: "High", assignee: "S. Lee", scheduledDate: "2025-03-10", status: "Upcoming" },
    { id: "INSP-2025-005", assetId: "HE-3001", assetName: "Feed/Effluent Exchanger", type: "Tube Bundle Inspection", priority: "Medium", assignee: "A. Rahman", scheduledDate: "2025-04-05", status: "Scheduled" },
    { id: "INSP-2025-006", assetId: "P-2002", assetName: "Condensate Transfer Line", type: "CUI Inspection", priority: "Medium", assignee: "J. Tan", scheduledDate: "2025-05-20", status: "Scheduled" },
    { id: "INSP-2025-007", assetId: "TK-4001", assetName: "Crude Storage Tank", type: "API 653 Tank Inspection", priority: "Low", assignee: "S. Lee", scheduledDate: "2025-07-01", status: "Scheduled" },
    { id: "INSP-2024-001", assetId: "V-1003", assetName: "LP Separator", type: "Visual Inspection", priority: "Low", assignee: "A. Rahman", scheduledDate: "2024-11-01", status: "Completed" },
    { id: "INSP-2024-002", assetId: "HE-3002", assetName: "Aerial Cooler AC201", type: "Fin tube cleaning", priority: "Low", assignee: "J. Tan", scheduledDate: "2024-10-15", status: "Completed" },
    { id: "INSP-2024-003", assetId: "P-2003", assetName: "Fuel Gas Header", type: "Radiographic Testing", priority: "Medium", assignee: "S. Lee", scheduledDate: "2024-09-10", status: "Completed" },
];

const overdue = INSPECTIONS.filter((i) => i.status === "Overdue").length;
const upcoming = INSPECTIONS.filter((i) => i.status === "Upcoming").length;
const scheduled = INSPECTIONS.filter((i) => i.status === "Scheduled").length;
const completed = INSPECTIONS.filter((i) => i.status === "Completed").length;
const compliancePct = Math.round((completed / INSPECTIONS.length) * 100);

const kpis = [
    { label: "Overdue", value: overdue, Icon: AlertTriangle, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10" },
    { label: "Upcoming (7d)", value: upcoming, Icon: Clock, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10" },
    { label: "Scheduled", value: scheduled, Icon: BarChart2, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
    { label: "Compliance", value: `${compliancePct}%`, Icon: CheckCircle, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
];

export default function InspectionManagementPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Inspection Management</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Inspection status and scheduling · LARUT-A (LRA)</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
                    <Download size={15} /> Export
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
                <div className="grid grid-cols-2 gap-4">
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
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Compliance</h2>
                    <InspectionDonutChart completed={completed} overdue={overdue} scheduled={scheduled + upcoming} />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-5">Inspection Board</h2>
                <InspectionKanban inspections={INSPECTIONS} />
            </div>
        </div>
    );
}
