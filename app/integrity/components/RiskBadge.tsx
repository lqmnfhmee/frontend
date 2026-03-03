import { AlertTriangle, AlertCircle, Info, CheckCircle, Minus } from "lucide-react";

export type RiskLevel = "Critical" | "High" | "Medium" | "Low" | "None";

const config: Record<RiskLevel, { label: string; icon: React.ReactNode; className: string }> = {
    Critical: { label: "Critical", icon: <AlertTriangle size={11} />, className: "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/15 dark:text-red-400 dark:border-red-500/30" },
    High: { label: "High", icon: <AlertCircle size={11} />, className: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-500/15 dark:text-orange-400 dark:border-orange-500/30" },
    Medium: { label: "Medium", icon: <Info size={11} />, className: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/15 dark:text-yellow-400 dark:border-yellow-500/30" },
    Low: { label: "Low", icon: <CheckCircle size={11} />, className: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30" },
    None: { label: "None", icon: <Minus size={11} />, className: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700/40 dark:text-slate-400 dark:border-slate-600/40" },
};

interface RiskBadgeProps {
    level: RiskLevel;
    showIcon?: boolean;
    size?: "sm" | "md";
}

export default function RiskBadge({ level, showIcon = true, size = "md" }: RiskBadgeProps) {
    const { label, icon, className } = config[level];
    return (
        <span className={`inline-flex items-center gap-1 font-semibold border rounded-full ${size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-0.5"} ${className}`}>
            {showIcon && icon}
            {label}
        </span>
    );
}
