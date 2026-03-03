"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

type Props = {
  title: string;
  value: number;
  growth?: number;
  icon: ReactNode;
  live?: boolean;
  tooltip?: string;
  trendData?: { value: number }[];
};

export default function KpiCard({
  title,
  value,
  growth,
  icon,
  live = false,
  tooltip,
  trendData = [],
}: Props) {
  const isPositive = growth !== undefined && growth >= 0;

  const iconBg = isPositive
    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
    : growth !== undefined
      ? "bg-red-500/10 text-red-600 dark:text-red-400"
      : "bg-blue-500/10 text-blue-600 dark:text-blue-400";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="
        relative
        bg-white dark:bg-slate-900
        rounded-2xl
        p-6
        border border-slate-200 dark:border-slate-800
        shadow-md shadow-slate-200/50 dark:shadow-none hover:shadow-lg hover:shadow-slate-200 dark:hover:shadow-none
        transition-all duration-300
      "
    >
      {/* Tooltip */}
      {tooltip && (
        <div className="
          absolute -top-10 left-4
          opacity-0 group-hover:opacity-100
          transition
          bg-white dark:bg-slate-800
          text-xs
          text-slate-600 dark:text-slate-300
          px-3 py-2
          rounded-lg
          border border-slate-200 dark:border-slate-700
          shadow-md
        ">
          {tooltip}
        </div>
      )}

      {/* Live Indicator */}
      {live && (
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400">
            Live
          </span>
        </div>
      )}

      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl ${iconBg}`}>
          {icon}
        </div>

        {growth !== undefined && (
          <span
            className={`text-sm font-medium ${isPositive
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400"
              }`}
          >
            {isPositive ? "+" : ""}
            {growth}%
          </span>
        )}
      </div>

      {/* Animated Value */}
      <p className="text-2xl font-semibold text-slate-900 dark:text-white mt-4">
        <CountUp end={value} duration={1.2} separator="," />
      </p>

      {/* Title */}
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        {title}
      </p>

      {/* Sparkline */}
      {trendData.length > 0 && (
        <div className="h-[50px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={
                  isPositive ? "#22c55e" : "#ef4444"
                }
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}