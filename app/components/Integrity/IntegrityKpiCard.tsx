"use client";

import { ReactNode } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

type Variant = "default" | "danger" | "warning" | "info";

interface Props {
  title: string;
  value: number;
  icon?: ReactNode;
  variant?: Variant;
}

export default function IntegrityKpiCard({
  title,
  value,
  icon,
  variant = "default",
}: Props) {
  const variantStyles =
    variant === "danger"
      ? "border-red-500/40 bg-red-500/5"
      : variant === "warning"
      ? "border-amber-500/40 bg-amber-500/5"
      : variant === "info"
      ? "border-blue-500/40 bg-blue-500/5"
      : "border-slate-200 dark:border-slate-800";

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`
        rounded-2xl
        p-6
        border
        ${variantStyles}
        bg-white dark:bg-slate-900
        shadow-sm dark:shadow-black/20
        transition-all duration-300
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p className="text-2xl font-semibold text-slate-900 dark:text-white mt-2">
            <CountUp end={value} duration={1} separator="," />
          </p>
        </div>

        {icon && (
          <div className="text-slate-400 dark:text-slate-500">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}