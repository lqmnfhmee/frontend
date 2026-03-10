"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Folder,
  Settings,
  ShieldCheck,
  ClipboardList,
  AlertTriangle
} from "lucide-react";

interface Props {
  label: string;
  href: string;
  badge?: string;
  collapsed?: boolean;
}

export default function SidebarItem({
  label,
  href,
  badge,
  collapsed = false
}: Props) {

  const pathname = usePathname();

  // ✅ IMPROVED ACTIVE STATE
  const active =
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  const getIcon = () => {
    if (label.includes("Dashboard")) return <LayoutDashboard size={18} />;
    if (label.includes("Asset")) return <Folder size={18} />;
    if (label.includes("Inspection")) return <ClipboardList size={18} />;
    if (label.includes("SCE")) return <ShieldCheck size={18} />;
    if (label.includes("Anomal")) return <AlertTriangle size={18} />;
    if (label.includes("Settings")) return <Settings size={18} />;
    return <LayoutDashboard size={18} />;
  };

  return (
    <Link
      href={href}
      className={`
        group relative flex items-center
        ${collapsed ? "justify-center px-0" : "justify-between px-5"}
        h-12 rounded-xl cursor-pointer
        transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]

        ${active
          ? "bg-[var(--color-brand-primary)] text-white shadow-sm"
          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[var(--color-brand-darkHover)]"
        }
      `}
    >

      {!active && (
        <div
          className="
            absolute inset-0 rounded-xl
            opacity-0 group-hover:opacity-100
            transition duration-200
            bg-gradient-to-r
            from-indigo-500/5
            to-transparent
            pointer-events-none
          "
        />
      )}

      <div className="flex items-center justify-center relative">
        <span className="relative z-10">
          {getIcon()}
        </span>

        <span
          className={`
            relative z-10 text-sm font-medium tracking-tight
            transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] whitespace-nowrap
            ${collapsed
              ? "opacity-0 w-0 ml-0 overflow-hidden"
              : "opacity-100 ml-3"
            }
          `}
        >
          {label}
        </span>
      </div>

      {badge && !collapsed && (
        <span
          className={`
            relative z-10 text-xs font-semibold px-2 py-[3px] rounded-full
            ${active
              ? "bg-white/20 text-white"
              : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
            }
          `}
        >
          {badge}
        </span>
      )}

      {collapsed && (
        <div
          className="
            absolute left-full top-1/2 -translate-y-1/2 ml-3
            px-3 py-1 rounded-md
            bg-slate-900 text-white text-xs
            opacity-0 group-hover:opacity-100
            translate-x-2 group-hover:translate-x-0
            transition-all duration-200
            pointer-events-none whitespace-nowrap
            shadow-lg
            z-50
          "
        >
          {label}
        </div>
      )}

    </Link>
  );
}