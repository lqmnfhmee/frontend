"use client";

import Link from "next/link";
import RiskBadge from "@/app/integrity/components/RiskBadge";
import { ShieldAlert, AlertTriangle, CalendarClock, AlertCircle, ArrowRight, CheckCircle, Activity } from "lucide-react";

const globalKpis = [
    { label: "Overall Risk Score", value: "82", sub: "Low Risk", Icon: ShieldAlert, iconColor: "text-emerald-600 dark:text-emerald-400", iconBg: "bg-emerald-50 dark:bg-emerald-500/10", badge: <RiskBadge level="Low" /> },
    { label: "Open Anomalies", value: "6", sub: "+2 vs last week", Icon: AlertCircle, iconColor: "text-red-600 dark:text-red-400", iconBg: "bg-red-50 dark:bg-red-500/10", badge: <RiskBadge level="High" /> },
    { label: "Overdue Inspections", value: "2", sub: "Require immediate action", Icon: AlertTriangle, iconColor: "text-orange-600 dark:text-orange-400", iconBg: "bg-orange-50 dark:bg-orange-500/10", badge: null },
    { label: "Next Critical Inspection", value: "12d", sub: "V-1001 · HP Separator", Icon: CalendarClock, iconColor: "text-indigo-600 dark:text-indigo-400", iconBg: "bg-indigo-50 dark:bg-indigo-500/10", badge: null },
];

const modules = [
    {
        title: "Risk-Based Inspection",
        description: "Asset risk profiles, risk matrix heatmap, and inspection scheduling drivers.",
        href: "/rbi",
        stats: [
            { label: "Total Assets", value: "10" },
            { label: "High + Critical", value: "4", urgent: true },
            { label: "Overdue", value: "2", urgent: true },
        ],
        icon: <Activity size={18} className="text-indigo-500" />,
    },
    {
        title: "Inspection Management",
        description: "Inspection status board, scheduling, compliance tracking, and sign-offs.",
        href: "/inspection-management",
        stats: [
            { label: "Total Inspections", value: "10" },
            { label: "Overdue", value: "2", urgent: true },
            { label: "Compliance", value: "30%", urgent: false },
        ],
        icon: <CheckCircle size={18} className="text-emerald-500" />,
    },
    {
        title: "Anomalies Management",
        description: "Active defects, deviations, and aging analysis by severity.",
        href: "/anomalies",
        stats: [
            { label: "Total Anomalies", value: "8" },
            { label: "Critical", value: "2", urgent: true },
            { label: "Open + In Progress", value: "5", urgent: true },
        ],
        icon: <AlertTriangle size={18} className="text-red-500" />,
    },
];

export default function IntegrityPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Integrity Dashboard</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Plant-wide integrity overview · LARUT-A (LRA)</p>
            </div>

            {/* Global KPI Strip */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {globalKpis.map(({ label, value, sub, Icon, iconColor, iconBg, badge }) => (
                    <div key={label} className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-md shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200 dark:hover:shadow-none transition-all duration-300 overflow-hidden">
                        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 opacity-40" />
                        <div className="relative flex items-center justify-between mb-4">
                            <div className={`p-2.5 rounded-xl ${iconBg}`}><Icon size={20} className={iconColor} /></div>
                            {badge}
                        </div>
                        <p className="relative text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
                        <p className="relative text-xs font-semibold text-slate-700 dark:text-slate-200 mt-0.5">{label}</p>
                        <p className="relative text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>
                    </div>
                ))}
            </div>

            {/* Module Cards */}
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Modules</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {modules.map((mod) => (
                        <div key={mod.title} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md shadow-slate-200/50 dark:shadow-none flex flex-col justify-between gap-5 hover:border-indigo-200 dark:hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200 dark:hover:shadow-none transition-all duration-300">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">{mod.icon}</div>
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{mod.title}</h3>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{mod.description}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {mod.stats.map(({ label, value, urgent }) => (
                                    <div key={label} className={`rounded-xl p-3 text-center ${urgent && value !== "0" ? "bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20" : "bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700"}`}>
                                        <p className={`text-lg font-bold ${urgent && value !== "0" ? "text-red-600 dark:text-red-400" : "text-slate-900 dark:text-white"}`}>{value}</p>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{label}</p>
                                    </div>
                                ))}
                            </div>
                            <Link href={mod.href} className="flex items-center justify-center gap-2 w-full py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 border border-indigo-100 dark:border-indigo-500/20 rounded-xl transition-colors">
                                Open Module <ArrowRight size={14} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
