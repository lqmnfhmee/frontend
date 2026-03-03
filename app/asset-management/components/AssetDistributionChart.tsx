"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = {
  data: { name: string; value: number }[];
};

export default function AssetDistributionChart({ data }: Props) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
        >
          {/* Grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#1e293b" : "#e2e8f0"}
            horizontal={false}
          />

          {/* X Axis */}
          <XAxis
            type="number"
            tick={{
              fill: isDark ? "#94a3b8" : "#64748b",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          {/* Y Axis */}
          <YAxis
            type="category"
            dataKey="name"
            width={120}
            tick={{
              fill: isDark ? "#cbd5e1" : "#334155",
              fontSize: 13,
            }}
            axisLine={false}
            tickLine={false}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#0f172a" : "#ffffff",
              border: isDark
                ? "1px solid #1e293b"
                : "1px solid #e2e8f0",
              borderRadius: "8px",
              color: isDark ? "#ffffff" : "#0f172a",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            cursor={{
              fill: isDark
                ? "rgba(59,130,246,0.1)"
                : "rgba(59,130,246,0.05)",
            }}
          />

          {/* Bars */}
          <Bar
            dataKey="value"
            fill={isDark ? "#3b82f6" : "#2563eb"}
            radius={[0, 8, 8, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}