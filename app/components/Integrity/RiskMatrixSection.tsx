"use client";

import { useState } from "react";

type MatrixCell = {
  row: number;
  column: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
  count: number;
};

interface MatrixData {
  matrix: MatrixCell[];
}

interface Props {
  data: {
    total: MatrixData;
    vessel: MatrixData;
    piping: MatrixData;
  };
}

const tabs = ["total", "vessel", "piping"] as const;

export default function RiskMatrixSection({ data }: Props) {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("total");

  const matrix = data[activeTab].matrix;

  const getColor = (level: MatrixCell["riskLevel"]) => {
    switch (level) {
      case "LOW":
        return "bg-emerald-500/20 text-emerald-400";
      case "MEDIUM":
        return "bg-yellow-500/20 text-yellow-400";
      case "HIGH":
        return "bg-orange-500/20 text-orange-400";
      case "VERY_HIGH":
        return "bg-red-500/20 text-red-400";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-100">
          Portfolio Risk Matrix
        </h3>

        <div className="flex bg-slate-800 rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-4 py-1 text-sm rounded-lg capitalize transition
                ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-white"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Matrix */}
      <div className="relative">

        {/* COF label */}
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 rotate-[-90deg] text-xs text-slate-400 tracking-wider">
          COF →
        </div>

        {/* POF label */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-400 tracking-wider">
          POF →
        </div>

        <div className="grid grid-cols-6 gap-2 text-sm">

          {/* Empty corner */}
          <div></div>

          {/* Column headers A-E */}
          {["A", "B", "C", "D", "E"].map((col) => (
            <div key={col} className="text-center text-slate-400">
              {col}
            </div>
          ))}

          {/* Rows */}
          {[5, 4, 3, 2, 1].map((row) => (
            <>
              {/* Row label */}
              <div
                key={`row-${row}`}
                className="flex items-center justify-center text-slate-400"
              >
                {row}
              </div>

              {/* Cells */}
              {["A", "B", "C", "D", "E"].map((col) => {
                const cell = matrix.find(
                  (c) => c.row === row && c.column === col
                );

                return (
                  <div
                    key={`${row}-${col}`}
                    className={`
                      h-12 rounded-lg flex items-center justify-center
                      ${cell ? getColor(cell.riskLevel) : ""}
                    `}
                  >
                    {cell?.count ?? 0}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 text-xs text-slate-400">
        <Legend color="bg-emerald-500/40" label="Low" />
        <Legend color="bg-yellow-500/40" label="Medium" />
        <Legend color="bg-orange-500/40" label="High" />
        <Legend color="bg-red-500/40" label="Very High" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-sm ${color}`} />
      <span>{label}</span>
    </div>
  );
}