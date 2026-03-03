"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  TrendingUp,
  ClipboardCheck,
  ShieldAlert,
  Activity,
  BarChart3
} from "lucide-react";

export default function RiskExposureScore() {

  const riskExposureData = {
    score: 82,
    factors: [
      { label: "Active High Priority Anomalies", total: 5, impact: -10, unit: "Active Items" },
      { label: "Anomaly Trend", total: 12, impact: -5, unit: "Trend Score" },
      { label: "Overdue Inspection", total: 3, impact: -10, unit: "Overdue Items" },
      { label: "SCE Assessment Coverage", total: 90, impact: 5, unit: "% Coverage" },
      { label: "High Risk Assets", total: 1, impact: -3, unit: "Assets" },
      { label: "Inspection Completion Rate", total: 95, impact: 5, unit: "% Completed" }
    ]
  };

  const factorIcons: Record<string, any> = {
    "Active High Priority Anomalies": AlertTriangle,
    "Anomaly Trend": TrendingUp,
    "Overdue Inspection": ClipboardCheck,
    "SCE Assessment Coverage": BarChart3,
    "High Risk Assets": ShieldAlert,
    "Inspection Completion Rate": Activity
  };

  // 🔥 NEW — Status Classification Logic
  const getFactorStatus = (impact: number) => {
    if (impact <= -8) {
      return { label: "Investigate", color: "text-red-400", bar: "bg-red-500" };
    }
    if (impact <= -4) {
      return { label: "Review", color: "text-orange-400", bar: "bg-orange-500" };
    }
    if (impact < 0) {
      return { label: "Monitor", color: "text-yellow-400", bar: "bg-yellow-500" };
    }
    return { label: "Stable", color: "text-emerald-400", bar: "bg-emerald-500" };
  };

  const leftFactors = riskExposureData.factors.slice(0, 3);
  const rightFactors = riskExposureData.factors.slice(3);

  const maxImpact = Math.max(
    ...riskExposureData.factors.map(f => Math.abs(f.impact))
  );

  const [score, setScore] = useState(0);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      setScore(current);
      if (current >= riskExposureData.score) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const getRiskStatus = (score: number) => {
    if (score >= 80) return { label: "LOW RISK", color: "#22c55e" };
    if (score >= 60) return { label: "MEDIUM RISK", color: "#facc15" };
    return { label: "HIGH RISK", color: "#ef4444" };
  };

  const status = getRiskStatus(score);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  return (

    <div
      className="
      w-full rounded-xl p-8
      bg-white dark:bg-slate-900
      border border-slate-200 dark:border-slate-800
      shadow-md shadow-slate-200/50 dark:shadow-none
      hover:shadow-lg hover:shadow-slate-200 dark:hover:shadow-none max-h-min
      transition-all duration-300
    ">

      <h2 className="text-lg font-semibold mb-6 text-slate-900 dark:text-slate-100">
        Risk Exposure Score
      </h2>

      <div className="grid grid-cols-[420px_1fr] gap-10 items-center">

        {/* LEFT KPI */}
        <div className="flex items-center gap-8">

          <div className="relative w-40 h-40">

            <svg className="w-full h-full -rotate-90">

              <circle
                cx="50%"
                cy="50%"
                r={radius}
                strokeWidth="20"
                stroke="rgb(226 232 240)"
                className="dark:stroke-slate-800"
                fill="transparent"
              />

              <circle
                cx="50%"
                cy="50%"
                r={radius}
                strokeWidth="20"
                stroke={status.color}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={(1 - score / 100) * circumference}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />

            </svg>

          </div>

          <div>

            <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {score}% Risk Exposure Level
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Current Risk Status:
              <span
                className="ml-2 font-bold"
                style={{ color: status.color }}
              >
                {status.label}
              </span>
            </p>

          </div>

        </div>

        {/* RIGHT FACTORS */}
        <div className="border-l border-slate-200 dark:border-slate-800 pl-10">

          <h3 className="text-sm font-semibold border-b border-slate-200 dark:border-slate-800 pb-2 mb-4 text-slate-700 dark:text-slate-300">
            FACTORS
          </h3>

          <div className="grid grid-cols-2 gap-x-12 text-sm">

            {[leftFactors, rightFactors].map((column, i) => (
              <div key={i} className="flex flex-col gap-4">

                {column.map((factor) => {

                  const Icon = factorIcons[factor.label];
                  const barWidth =
                    (Math.abs(factor.impact) / maxImpact) * 100;

                  const factorStatus = getFactorStatus(factor.impact);

                  return (

                    <div
                      key={factor.label}
                      className="
                        rounded-lg p-3
                        bg-slate-50 dark:bg-slate-800
                        border border-slate-200 dark:border-slate-700
                        hover:bg-white dark:hover:bg-slate-700
                        transition-colors duration-200
                      "
                    >

                      {/* TITLE */}
                      <div className="flex items-center gap-3 mb-2">

                        <div
                          className="
                            w-8 h-8 rounded-md
                            bg-white dark:bg-slate-700
                            border border-slate-200 dark:border-slate-600
                            flex items-center justify-center
                          "
                        >
                          <Icon size={16} className="text-slate-600 dark:text-slate-300" />
                        </div>

                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {factor.label}
                        </span>

                      </div>

                      {/* DATA */}
                      <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">

                        <span>
                          {factor.total} {factor.unit}
                        </span>

                        {/* 🔥 NEW STATUS DISPLAY */}
                        <span className={`font-semibold ${factorStatus.color}`}>
                          {factorStatus.label}
                        </span>

                      </div>

                      {/* BAR */}
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">

                        <div
                          className={`h-full ${factorStatus.bar}`}
                          style={{ width: `${barWidth}%` }}
                        />

                      </div>

                    </div>

                  );
                })}

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>

  );
}