"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    anomalyPriority: {
      P1: number;
      P2: number;
      P3: number;
      P4: number;
    };
    workcenterLoad: {
      name: string;
      count: number;
    }[];
    recommendationSummary: {
      type: string;
      count: number;
    }[];
  };
}

export default function IntegrityDistribution({ data }: Props) {
  const priorityData = [
    { name: "P1", value: data.anomalyPriority.P1 },
    { name: "P2", value: data.anomalyPriority.P2 },
    { name: "P3", value: data.anomalyPriority.P3 },
    { name: "P4", value: data.anomalyPriority.P4 },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-10">
      <h2 className="text-lg font-semibold">
        Integrity Distribution Overview
      </h2>

      {/* ===================== */}
      {/* Anomaly Priority */}
      {/* ===================== */}
      <div>
        <h3 className="text-sm font-medium mb-4 text-slate-500 dark:text-slate-400">
          Anomaly Priority Distribution
        </h3>

        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Bar dataKey="value" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===================== */}
      {/* Workcenter Load */}
      {/* ===================== */}
      <div>
        <h3 className="text-sm font-medium mb-4 text-slate-500 dark:text-slate-400">
          Workcenter Load
        </h3>

        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data.workcenterLoad}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis type="number" stroke="#94a3b8" fontSize={12} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#94a3b8"
                fontSize={12}
              />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===================== */}
      {/* Recommendation Summary */}
      {/* ===================== */}
      <div>
        <h3 className="text-sm font-medium mb-4 text-slate-500 dark:text-slate-400">
          Recommendation Summary
        </h3>

        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.recommendationSummary}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="type" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}