"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

interface AssetIntegrityRow {
  assetId: string;
  assetTag: string;
  assetName: string;
  facility: string;

  rbi?: {
    riskLevel: "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
  };

  inspection?: {
    remainingLifeYears?: number;
    isOverdue?: boolean;
  };

  anomalies?: {
    activeCount: number;
    highPriorityCount: number;
  };
}

interface Props {
  data: AssetIntegrityRow[];
}

export default function CriticalAssetsTable({ data }: Props) {
  const getRiskBadge = (risk?: string) => {
    switch (risk) {
      case "VERY_HIGH":
        return "bg-red-500/10 text-red-600 dark:text-red-400";
      case "HIGH":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400";
      case "MEDIUM":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
      case "LOW":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
      default:
        return "bg-slate-500/10 text-slate-500";
    }
  };

  const getStatusBadge = (isOverdue?: boolean, anomalies?: number) => {
    if (isOverdue)
      return "bg-red-500/10 text-red-600 dark:text-red-400";
    if (anomalies && anomalies > 0)
      return "bg-orange-500/10 text-orange-600 dark:text-orange-400";
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  };

  return (
    <div
      className="
        rounded-2xl
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        shadow-sm dark:shadow-lg dark:shadow-black/20
        p-6
      "
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Assets Requiring Attention
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Assets flagged by RBI risk, overdue inspections, or active anomalies
        </p>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-14 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
          </div>

          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            No critical assets requiring attention
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
            All monitored assets are currently within acceptable risk and
            inspection thresholds.
          </p>
        </div>
      )}

      {/* Table */}
      {data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="text-left py-3">Asset</th>
                <th className="text-left py-3">Risk</th>
                <th className="text-left py-3">Remaining Life</th>
                <th className="text-left py-3">Anomalies</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map((asset) => {
                const risk = asset.rbi?.riskLevel;
                const life = asset.inspection?.remainingLifeYears;
                const anomalies = asset.anomalies?.activeCount ?? 0;
                const isOverdue = asset.inspection?.isOverdue;

                return (
                  <tr
                    key={asset.assetId}
                    className="
                      border-b border-slate-100 dark:border-slate-800
                      hover:bg-slate-50 dark:hover:bg-slate-800/40
                      transition-colors
                    "
                  >
                    {/* Asset */}
                    <td className="py-4">
                      <Link
                        href={`/assets/${asset.assetId}`}
                        className="font-medium text-slate-900 dark:text-slate-100 hover:underline"
                      >
                        {asset.assetTag}
                      </Link>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {asset.assetName}
                      </div>
                    </td>

                    {/* Risk */}
                    <td className="py-4">
                      <span
                        className={`
                          px-2 py-1 text-xs font-semibold rounded-full
                          ${getRiskBadge(risk)}
                        `}
                      >
                        {risk ?? "NOT ASSESSED"}
                      </span>
                    </td>

                    {/* Remaining Life */}
                    <td className="py-4">
                      {life !== undefined ? (
                        <span
                          className={`${
                            life < 3
                              ? "text-red-600 dark:text-red-400 font-medium"
                              : "text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {life} yrs
                        </span>
                      ) : (
                        <span className="text-slate-400">No Data</span>
                      )}
                    </td>

                    {/* Anomalies */}
                    <td className="py-4">
                      <span
                        className={`${
                          anomalies > 0
                            ? "text-orange-600 dark:text-orange-400 font-medium"
                            : "text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {anomalies}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4">
                      <span
                        className={`
                          px-2 py-1 text-xs font-semibold rounded-full
                          ${getStatusBadge(isOverdue, anomalies)}
                        `}
                      >
                        {isOverdue
                          ? "Overdue"
                          : anomalies > 0
                          ? "Active Issue"
                          : "Normal"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}