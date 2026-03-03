"use client";

import { useState } from "react";
import SlidePanel from "./SlidePanel";
import RiskBadge, { RiskLevel } from "./RiskBadge";
import { AlertTriangle, CheckCircle, ArrowRight, Clock, Link2, Activity } from "lucide-react";

export type Anomaly = {
    id: string;
    assetId: string;
    assetName: string;
    description: string;
    severity: RiskLevel;
    assignee: string;
    reportedDate: string;
    age: string;
    status: "Open" | "In Progress" | "Closed" | "Deferred";
};

const activityLog = [
    { action: "Anomaly reported", user: "System", time: "5d ago" },
    { action: "Assigned to J. Tan", user: "A. Rahman", time: "4d ago" },
    { action: "RBI re-assessment triggered", user: "System", time: "3d ago" },
    { action: "Interim containment applied", user: "J. Tan", time: "2d ago" },
];

function AnomalyDetailPanel({ anomaly }: { anomaly: Anomaly }) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
                {[
                    { label: "Anomaly ID", value: anomaly.id },
                    { label: "Asset ID", value: anomaly.assetId },
                    { label: "Severity", value: <RiskBadge level={anomaly.severity} /> },
                    { label: "Status", value: anomaly.status },
                    { label: "Assignee", value: anomaly.assignee },
                    { label: "Reported", value: anomaly.reportedDate },
                ].map(({ label, value }) => (
                    <div key={label} className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1">{label}</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{value}</p>
                    </div>
                ))}
            </div>
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Description</p>
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{anomaly.description}</div>
            </div>
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Linked RBI Item</p>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl px-4 py-3 text-sm">
                    <Link2 size={13} className="text-indigo-500" />
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">RBI-{anomaly.assetId}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-600 dark:text-slate-400">{anomaly.assetName}</span>
                </div>
            </div>
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Activity Log</p>
                <div className="space-y-2">
                    {activityLog.map((e, i) => (
                        <div key={i} className="flex gap-3 text-sm">
                            <Activity size={13} className="text-indigo-400 mt-0.5 shrink-0" />
                            <div><p className="text-slate-700 dark:text-slate-300">{e.action}</p><p className="text-xs text-slate-400">{e.user} · {e.time}</p></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                <button className="flex-1 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">Close Anomaly</button>
                <button className="flex-1 py-2 text-sm font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">Escalate</button>
            </div>
        </div>
    );
}

const statusStyles: Record<Anomaly["status"], string> = {
    Open: "bg-red-50 text-red-600 border-red-200 dark:bg-red-500/15 dark:text-red-400 dark:border-red-500/30",
    "In Progress": "bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-500/15 dark:text-orange-400 dark:border-orange-500/30",
    Closed: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30",
    Deferred: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700/40 dark:text-slate-400 dark:border-slate-600",
};

export default function AnomalyFeed({ anomalies, filterSeverity }: { anomalies: Anomaly[]; filterSeverity: RiskLevel | null }) {
    const [selected, setSelected] = useState<Anomaly | null>(null);
    const filtered = filterSeverity ? anomalies.filter((a) => a.severity === filterSeverity) : anomalies;

    return (
        <>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
                    {["Severity", "Description", "Asset", "Age", "Status"].map((h) => (
                        <span key={h} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">{h}</span>
                    ))}
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filtered.length === 0 ? (
                        <div className="py-10 text-center text-sm text-slate-400 dark:text-slate-500">No anomalies match the selected filter.</div>
                    ) : filtered.map((anomaly) => (
                        <button key={anomaly.id} onClick={() => setSelected(anomaly)} className="w-full grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors items-center">
                            <div className="shrink-0"><RiskBadge level={anomaly.severity} size="sm" /></div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{anomaly.description}</p>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{anomaly.id} · {anomaly.assignee}</p>
                            </div>
                            <div className="hidden md:block text-xs text-slate-600 dark:text-slate-300 shrink-0">{anomaly.assetId}</div>
                            <div className="hidden lg:flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 shrink-0"><Clock size={11} /> {anomaly.age}</div>
                            <div><span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full border ${statusStyles[anomaly.status]}`}>{anomaly.status}</span></div>
                        </button>
                    ))}
                </div>
                <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                    <span className="text-xs text-slate-400 dark:text-slate-500">{filtered.length} of {anomalies.length} anomalies{filterSeverity ? ` · Severity: ${filterSeverity}` : ""}</span>
                </div>
            </div>
            <SlidePanel isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.id ?? ""} subtitle={selected?.assetName} width="md">
                {selected && <AnomalyDetailPanel anomaly={selected} />}
            </SlidePanel>
        </>
    );
}
