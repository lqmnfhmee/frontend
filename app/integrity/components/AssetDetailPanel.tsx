"use client";

import { Asset } from "./AssetRiskTable";
import RiskBadge from "./RiskBadge";
import SparklineChart from "./SparklineChart";
import { Calendar, Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface AssetDetailPanelProps { asset: Asset; }

const linkedInspections = [
    { id: "INSP-2024-001", date: "2024-03-15", status: "Completed", type: "Visual" },
    { id: "INSP-2024-002", date: "2024-06-20", status: "Overdue", type: "Thickness" },
    { id: "INSP-2025-001", date: "2025-02-01", status: "Scheduled", type: "Radiographic" },
];

const activityLog = [
    { action: "Risk level updated to High", user: "A. Rahman", time: "2h ago" },
    { action: "Inspection INSP-2024-002 marked overdue", user: "System", time: "3d ago" },
    { action: "CoF recalculated", user: "J. Tan", time: "1w ago" },
];

export default function AssetDetailPanel({ asset }: AssetDetailPanelProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
                {[
                    { label: "Risk Level", value: <RiskBadge level={asset.riskLevel} size="md" /> },
                    { label: "Type", value: asset.type },
                    { label: "Consequence of Failure", value: asset.cof },
                    { label: "Probability of Failure", value: asset.pof },
                    { label: "Next Inspection", value: asset.nextInspectionDate },
                    { label: "Asset ID", value: asset.id },
                ].map(({ label, value }) => (
                    <div key={label} className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1">{label}</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{value}</p>
                    </div>
                ))}
            </div>
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Risk Trend (6 months)</p>
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3">
                    <SparklineChart data={asset.trend} color={asset.riskLevel === "Critical" || asset.riskLevel === "High" ? "#ef4444" : asset.riskLevel === "Medium" ? "#eab308" : "#22c55e"} height={60} />
                </div>
            </div>
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Linked Inspections</p>
                <div className="space-y-2">
                    {linkedInspections.map((insp) => (
                        <div key={insp.id} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 rounded-xl px-3 py-2.5 text-sm">
                            <div className="flex items-center gap-2">
                                {insp.status === "Completed" ? <CheckCircle size={14} className="text-emerald-500" /> : insp.status === "Overdue" ? <AlertTriangle size={14} className="text-red-500" /> : <Clock size={14} className="text-[var(--color-brand-primary)]" />}
                                <span className="text-slate-700 dark:text-slate-300 font-medium">{insp.id}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                <span>{insp.type}</span>
                                <span className="flex items-center gap-1"><Calendar size={11} /> {insp.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Activity Log</p>
                <div className="space-y-2">
                    {activityLog.map((entry, i) => (
                        <div key={i} className="flex gap-3 text-sm">
                            <Activity size={13} className="text-[var(--color-brand-primary)] mt-0.5 shrink-0" />
                            <div>
                                <p className="text-slate-700 dark:text-slate-300">{entry.action}</p>
                                <p className="text-xs text-slate-400 dark:text-slate-500">{entry.user} · {entry.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-[var(--color-brand-darkBorder)]">
                <button className="flex-1 py-2 text-sm font-medium text-white bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] rounded-lg transition-colors">Schedule Inspection</button>
                <button className="flex-1 py-2 text-sm font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">Escalate</button>
            </div>
        </div>
    );
}
