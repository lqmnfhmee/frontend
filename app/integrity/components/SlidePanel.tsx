"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SlidePanelProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    width?: "sm" | "md" | "lg";
}

const widthMap = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

export default function SlidePanel({ isOpen, onClose, title, subtitle, children, width = "md" }: SlidePanelProps) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        if (isOpen) document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />
                    <motion.div key="panel" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 320, damping: 32 }} className={`fixed top-0 right-0 z-50 h-full w-full ${widthMap[width]} bg-white dark:bg-[var(--color-brand-darkCard)] border-l border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-2xl flex flex-col`}>
                        <div className="flex items-start justify-between p-6 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] shrink-0">
                            <div>
                                <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
                                {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
                            </div>
                            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[var(--color-brand-darkHover)] transition-colors">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">{children}</div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
