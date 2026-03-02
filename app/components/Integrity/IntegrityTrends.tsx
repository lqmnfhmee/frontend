"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    monthly: {
      month: string;
      newAnomalies: number;
      inspectionsCompleted: number;
      riskLevelChanges: number;
    }[];
  };
}

export default function IntegrityTrends({ data }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">
          Integrity Operational Trends
        </h2>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.monthly}>
            <CartesianGrid
              strokeDasharray="3 3"
              strokeOpacity={0.2}
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              fontSize={12}
            />

            <YAxis
              stroke="#94a3b8"
              fontSize={12}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "12px",
              }}
              labelStyle={{ color: "#e2e8f0" }}
              itemStyle={{ color: "#e2e8f0" }}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="newAnomalies"
              stroke="#f97316"
              strokeWidth={2}
              dot={false}
              name="New Anomalies"
            />

            <Line
              type="monotone"
              dataKey="inspectionsCompleted"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name="Inspections Completed"
            />

            <Line
              type="monotone"
              dataKey="riskLevelChanges"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              name="Risk Level Changes"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}