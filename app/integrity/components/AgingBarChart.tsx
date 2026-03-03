"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
    { bucket: "0–7 days", Critical: 3, High: 5, Medium: 8, Low: 4 },
    { bucket: "7–30 days", Critical: 2, High: 7, Medium: 12, Low: 6 },
    { bucket: "30+ days", Critical: 1, High: 4, Medium: 9, Low: 3 },
];

const COLORS = { Critical: "#ef4444", High: "#f97316", Medium: "#eab308", Low: "#22c55e" };

export default function AgingBarChart() {
    return (
        <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data} barSize={18} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.15)" />
                <XAxis dataKey="bucket" tick={{ fontSize: 11, fill: "currentColor" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "currentColor" }} axisLine={false} tickLine={false} width={24} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.15)", fontSize: 12 }} cursor={{ fill: "rgba(148,163,184,0.08)" }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                {(["Critical", "High", "Medium", "Low"] as const).map((key) => (
                    <Bar key={key} dataKey={key} stackId="a" fill={COLORS[key]} radius={key === "Critical" ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
}
