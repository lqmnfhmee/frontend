"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Folder, ChevronDown, ChevronRight } from "lucide-react";

interface SubItem {
    label: string;
    href: string;
    subItems?: SubItem[];
}

interface Props {
    label: string;
    baseHref: string;
    subItems: SubItem[];
    collapsed?: boolean;
    isNested?: boolean;
}

export default function SidebarAccordion({
    label,
    baseHref,
    subItems,
    collapsed = false,
    isNested = false,
}: Props) {
    const pathname = usePathname();
    const isActive = pathname.startsWith(baseHref);
    const [isOpen, setIsOpen] = useState(isActive);

    // Auto-expand if a subitem becomes active when not collapsed
    useEffect(() => {
        if (isActive && !collapsed) {
            setIsOpen(true);
        }
    }, [isActive, collapsed]);

    return (
        <div className="flex flex-col">
            {/* Header Item */}
            <div
                onClick={() => !collapsed && setIsOpen(!isOpen)}
                className={`
          group relative flex items-center
          ${collapsed ? "justify-center px-0" : "justify-between px-5"}
          ${isNested ? "h-10 pl-2" : "h-12"} rounded-xl cursor-pointer
          transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
          ${isActive && !isNested
                        ? "bg-[var(--color-brand-primary)] text-white shadow-sm"
                        : isActive && isNested
                            ? "text-[var(--color-brand-primary)] dark:text-[var(--color-brand-primary)] font-medium bg-slate-100/50 dark:bg-slate-800/30"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[var(--color-brand-darkHover)]"
                    }
        `}
            >
                <div className="flex items-center justify-center relative">
                    {!isNested && (
                        <span className="relative z-10 text-slate-400 group-hover:text-inherit">
                            <Folder size={18} />
                        </span>
                    )}

                    <span
                        className={`
              relative z-10 text-sm font-medium tracking-tight
              transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] whitespace-nowrap
              ${collapsed
                                ? "opacity-0 w-0 ml-0 overflow-hidden"
                                : isNested ? "opacity-100 ml-0" : "opacity-100 ml-3"
                            }
            `}
                    >
                        {label}
                    </span>
                </div>

                {!collapsed && (
                    <span className="relative z-10">
                        {isOpen ? <ChevronDown size={14} className="opacity-60" /> : <ChevronRight size={14} className="opacity-60" />}
                    </span>
                )}
            </div>

            {/* Sub Items */}
            {!collapsed && isOpen && (
                <div className={`mt-1 flex flex-col space-y-1 ${isNested ? "ml-4 pl-2" : "ml-7 pl-4 border-l-2 border-slate-200 dark:border-[var(--color-brand-darkBorder)]"}`}>
                    {subItems.map((item) => {
                        if (item.subItems) {
                            return (
                                <SidebarAccordion
                                    key={item.label}
                                    label={item.label}
                                    baseHref={item.href}
                                    subItems={item.subItems}
                                    collapsed={collapsed}
                                    isNested={true}
                                />
                            );
                        }

                        const isSubActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                  relative px-2 py-2 text-sm rounded-md transition-colors
                  ${isSubActive
                                        ? "text-[var(--color-brand-primary)] dark:text-[var(--color-brand-primary)] font-medium"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                                    }
                `}
                            >
                                {/* Custom active indicator for sub items */}
                                {isSubActive && !isNested && (
                                    <div className="absolute left-[-18px] top-1/2 -translate-y-1/2 w-[2px] h-full bg-[var(--color-brand-primary)] rounded-r" />
                                )}
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
