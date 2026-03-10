"use client";

import { useState } from "react";
import SlidePanel from "./SlidePanel";
import RiskBadge, { RiskLevel } from "./RiskBadge";
import { Calendar, User, CheckCircle, AlertTriangle, Clock, ArrowRight } from "lucide-react";

export type Inspection = {
    id: string;
    assetId: string;
    assetName: string;
    type: string;
    priority: RiskLevel;
    assignee: string;
    scheduledDate: string;
    status: "Overdue" | "Upcoming" | "Scheduled" | "Completed";
};

const history = [
    { date: "2024-06-10", type: "Visual", result: "Pass", inspector: "J. Tan" },
    { date: "2023-12-01", type: "Thickness", result: "Pass", inspector: "A. Rahman" },
    { date: "2023-05-20", type: "Visual", result: "Minor finding", inspector: "J. Tan" },
];

const activityLog = [
    { action: "Inspection scheduled", user: "System", time: "3d ago" },
    { action: "Assigned to J. Tan", user: "A. Rahman", time: "3d ago" },
    { action: "Preparation checklist completed", user: "J. Tan", time: "1d ago" },
];

function InspectionDetailPanel({ inspection }: { inspection: Inspection }) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
                {[
                    { label: "Inspection ID", value: inspection.id },
                    { label: "Asset ID", value: inspection.assetId },
                    { label: "Asset Name", value: inspection.assetName },
                    { label: "Inspection Type", value: inspection.type },
                    { label: "Priority", value: <RiskBadge level={inspection.priority} /> },
                    { label: "Scheduled Date", value: inspection.scheduledDate },
                    { label: "Assignee", value: inspection.assignee },
                    { label: "Status", value: inspection.status },
                ].map(({ label, value }) => (
                    <div key={label} className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1">{label}</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{value}</p>
                    </div>
                ))}
            </div>
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Inspection History</p>
                <div className="space-y-2">
                    {history.map((h, i) => (
                        <div key={i} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 rounded-xl px-3 py-2.5 text-sm">
                            <div className="flex items-center gap-2"><CheckCircle size={13} className="text-emerald-500" /><span className="text-slate-700 dark:text-slate-300">{h.type}</span></div>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                <span>{h.result}</span><span>{h.inspector}</span>
                                <span className="flex items-center gap-1"><Calendar size={11} /> {h.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Activity</p>
                <div className="space-y-2">
                    {activityLog.map((e, i) => (
                        <div key={i} className="flex gap-3 text-sm">
                            <ArrowRight size={13} className="text-[var(--color-brand-primary)] mt-0.5 shrink-0" />
                            <div><p className="text-slate-700 dark:text-slate-300">{e.action}</p><p className="text-xs text-slate-400">{e.user} · {e.time}</p></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-[var(--color-brand-darkBorder)]">
                <button className="flex-1 py-2 text-sm font-medium text-white bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] rounded-lg transition-colors">Mark Complete</button>
                <button className="flex-1 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[var(--color-brand-darkBorder)] hover:bg-slate-50 dark:hover:bg-[var(--color-brand-darkHover)] rounded-lg transition-colors">Reschedule</button>
            </div>
        </div>
    );
}

const COLUMNS: { key: Inspection["status"]; label: string; color: string }[] = [
    { key: "Overdue", label: "Overdue", color: "border-red-400 dark:border-red-500" },
    { key: "Upcoming", label: "Upcoming (7d)", color: "border-orange-400 dark:border-orange-500" },
    { key: "Scheduled", label: "Scheduled", color: "border-indigo-400 dark:border-indigo-500" },
    { key: "Completed", label: "Completed", color: "border-emerald-400 dark:border-emerald-500" },
];

const statusIcon: Record<Inspection["status"], React.ReactNode> = {
    Overdue: <AlertTriangle size={13} className="text-red-500" />,
    Upcoming: <Clock size={13} className="text-orange-500" />,
    Scheduled: <Calendar size={13} className="text-[var(--color-brand-primary)]" />,
    Completed: <CheckCircle size={13} className="text-emerald-500" />,
};

export default function InspectionKanban({ inspections }: { inspections: Inspection[] }) {
    const [selected, setSelected] = useState<Inspection | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {COLUMNS.map((col) => {
                    const items = inspections.filter((i) => i.status === col.key);
                    return (
                        <div key={col.key} className="flex flex-col gap-3">
                            <div className={`flex items-center justify-between pb-2 border-b-2 ${col.color}`}>
                                <div className="flex items-center gap-2">{statusIcon[col.key]}<span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{col.label}</span></div>
                                <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">{items.length}</span>
                            </div>
                            {items.length === 0 ? (
                                <p className="text-xs text-slate-400 dark:text-slate-600 text-center py-4">Empty</p>
                            ) : items.map((insp) => (
                                <button key={insp.id} onClick={() => setSelected(insp)} className="text-left bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] p-4 hover:border-[var(--color-brand-primary-soft)] dark:hover:border-indigo-500/40 hover:shadow-md transition-all group">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <span className="text-xs font-bold text-slate-700 dark:text-white">{insp.assetId}</span>
                                        <RiskBadge level={insp.priority} size="sm" showIcon={false} />
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">{insp.assetName}</p>
                                    <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                                        <span className="flex items-center gap-1"><Calendar size={10} /> {insp.scheduledDate}</span>
                                        <span className="flex items-center gap-1"><User size={10} /> {insp.assignee.split(" ")[0]}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{insp.type}</p>
                                </button>
                            ))}
                        </div>
                    );
                })}
            </div>
            <SlidePanel isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.id ?? ""} subtitle={`${selected?.assetName} · ${selected?.type}`} width="md">
                {selected && <InspectionDetailPanel inspection={selected} />}
            </SlidePanel>
        </>
    );
}
