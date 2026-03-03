"use client";

import { AreaChart, Area, ResponsiveContainer } from "recharts";

interface SparklineChartProps {
    data: { value: number }[];
    color?: string;
    height?: number;
}

export default function SparklineChart({ data, color = "#6366f1", height = 40 }: SparklineChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
                <defs>
                    <linearGradient id={`sg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke={color} strokeWidth={1.5} fill={`url(#sg-${color.replace("#", "")})`} dot={false} />
            </AreaChart>
        </ResponsiveContainer>
    );
}
