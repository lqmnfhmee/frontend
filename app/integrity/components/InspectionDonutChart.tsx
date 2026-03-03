"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface InspectionDonutChartProps {
    completed: number;
    overdue: number;
    scheduled: number;
}

export default function InspectionDonutChart({ completed, overdue, scheduled }: InspectionDonutChartProps) {
    const total = completed + overdue + scheduled;
    const compliancePct = total > 0 ? Math.round((completed / total) * 100) : 0;

    const data = [
        { name: "Completed", value: completed, color: "#22c55e" },
        { name: "Overdue", value: overdue, color: "#ef4444" },
        { name: "Scheduled", value: scheduled, color: "#6366f1" },
    ];

    return (
        <div className="relative flex flex-col items-center">
            <div className="relative w-full" style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={88} paddingAngle={2} dataKey="value" stroke="none">
                            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip formatter={(value: number | undefined) => value?.toLocaleString() ?? ""} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.15)", fontSize: 12 }} />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{compliancePct}%</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide">Compliance</span>
                </div>
            </div>
            <div className="flex gap-4 mt-2">
                {data.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-slate-600 dark:text-slate-400">{item.name}</span>
                        <span className="text-xs font-semibold text-slate-800 dark:text-white">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
