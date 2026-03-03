"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Folder, ChevronDown, ChevronRight } from "lucide-react";

interface SubItem {
    label: string;
    href: string;
}

interface Props {
    label: string;
    baseHref: string;
    subItems: SubItem[];
    collapsed?: boolean;
}

export default function SidebarAccordion({
    label,
    baseHref,
    subItems,
    collapsed = false,
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

    // If collapsed, we probably don't want to show the full accordion.
    // We can just show the icon, and maybe a popover if hovered. For now, basic support.

    return (
        <div className="flex flex-col">
            {/* Header Item */}
            <div
                onClick={() => !collapsed && setIsOpen(!isOpen)}
                className={`
          group relative flex items-center
          ${collapsed ? "justify-center px-0" : "justify-between px-5"}
          h-12 rounded-xl cursor-pointer
          transition-all duration-300 ease-in-out
          ${isActive
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }
        `}
            >
                <div className="flex items-center justify-center relative">
                    <span className="relative z-10">
                        <Folder size={18} />
                    </span>

                    <span
                        className={`
              relative z-10 text-sm font-medium tracking-tight
              transition-all duration-300 whitespace-nowrap
              ${collapsed
                                ? "opacity-0 w-0 ml-0 overflow-hidden"
                                : "opacity-100 ml-3"
                            }
            `}
                    >
                        {label}
                    </span>
                </div>

                {!collapsed && (
                    <span className="relative z-10">
                        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </span>
                )}
            </div>

            {/* Sub Items */}
            {!collapsed && isOpen && (
                <div className="mt-1 ml-7 pl-4 border-l-2 border-slate-200 dark:border-slate-800 flex flex-col space-y-1">
                    {subItems.map((item) => {
                        const isSubActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                  relative px-2 py-2 text-sm rounded-md transition-colors
                  ${isSubActive
                                        ? "text-indigo-600 dark:text-indigo-400 font-medium"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                                    }
                `}
                            >
                                {/* Custom active indicator for sub items */}
                                {isSubActive && (
                                    <div className="absolute left-[-18px] top-1/2 -translate-y-1/2 w-[2px] h-full bg-indigo-600 rounded-r" />
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
