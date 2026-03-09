"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { X, Settings2, RotateCcw } from "lucide-react";
import { WIDGET_REGISTRY, SECTIONS, type WidgetDef } from "../utils/widget-registry";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CustomizeModalProps {
    open: boolean;
    prefs: Record<string, boolean>;
    onSave: (prefs: Record<string, boolean>) => void;
    onClose: () => void;
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function Toggle({
    id,
    checked,
    onChange,
}: {
    id: string;
    checked: boolean;
    onChange: (val: boolean) => void;
}) {
    return (
        <button
            role="switch"
            aria-checked={checked}
            aria-labelledby={`widget-label-${id}`}
            onClick={() => onChange(!checked)}
            className={`
        relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
        transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2
        focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
        ${checked ? "bg-indigo-500" : "bg-slate-700"}
      `}
        >
            <span className="sr-only">{checked ? "Hide widget" : "Show widget"}</span>
            <span
                className={`
          pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg
          ring-0 transition duration-200 ease-in-out
          ${checked ? "translate-x-5" : "translate-x-0"}
        `}
            />
        </button>
    );
}

// ─── Empty Section Notice ─────────────────────────────────────────────────────

function SectionEmptyNotice() {
    return (
        <p className="py-2 text-xs text-amber-400/80 italic">
            ⚠ All widgets in this section are hidden — the section header will be omitted on the dashboard.
        </p>
    );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export default function CustomizeModal({
    open,
    prefs,
    onSave,
    onClose,
}: CustomizeModalProps) {
    // Local copy of prefs — only committed on "Save"
    const [local, setLocal] = React.useState<Record<string, boolean>>(prefs);
    const panelRef = useRef<HTMLDivElement>(null);

    // Sync local state whenever the modal opens
    useEffect(() => {
        if (open) setLocal(prefs);
    }, [open, prefs]);

    // ESC to close
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open, onClose]);

    // Trap focus inside modal
    useEffect(() => {
        if (open) panelRef.current?.focus();
    }, [open]);

    const toggle = useCallback((id: string, val: boolean) => {
        setLocal((prev) => ({ ...prev, [id]: val }));
    }, []);

    const handleReset = useCallback(() => {
        const defaults: Record<string, boolean> = {};
        WIDGET_REGISTRY.forEach((w) => (defaults[w.id] = w.defaultEnabled));
        setLocal(defaults);
    }, []);

    const handleSave = useCallback(() => {
        onSave(local);
        onClose();
    }, [local, onSave, onClose]);

    // Derived counts
    const isWidgetOn = (w: WidgetDef) => local[w.id] !== false;
    const enabledCount = WIDGET_REGISTRY.filter(isWidgetOn).length;
    const totalCount = WIDGET_REGISTRY.length;

    if (!open) return null;

    return (
        <>
            {/* ── Backdrop ───────────────────────────────────────────────────── */}
            <div
                aria-hidden="true"
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[3px]"
                onClick={onClose}
            />

            {/* ── Dialog panel ───────────────────────────────────────────────── */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Customize Dashboard"
                ref={panelRef}
                tabIndex={-1}
                className="
          fixed inset-0 z-50 flex items-center justify-center p-4
          focus:outline-none
        "
                onClick={(e) => {
                    // Close when clicking the centering wrapper (outside the card)
                    if (e.target === e.currentTarget) onClose();
                }}
            >
                <div
                    className="
            relative w-full max-w-lg max-h-[90vh] flex flex-col
            bg-slate-900 border border-slate-700/80 rounded-2xl
            shadow-2xl shadow-black/60
            ring-1 ring-white/5
          "
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* ── Header ─────────────────────────────────────────────────── */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/60 flex-shrink-0">
                        <div className="flex items-center gap-2.5">
                            <div className="p-1.5 rounded-lg bg-indigo-500/15">
                                <Settings2 size={15} className="text-indigo-400" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-white">Customize Dashboard</h2>
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                    <span className="font-semibold text-indigo-400">{enabledCount}</span>
                                    {" of "}
                                    <span className="font-semibold text-slate-300">{totalCount}</span>
                                    {" widgets enabled"}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            aria-label="Close customize dialog"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* ── Body — scrollable ───────────────────────────────────────── */}
                    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                        {SECTIONS.map((section) => {
                            const widgets = WIDGET_REGISTRY.filter((w) => w.section === section);
                            const allHidden = widgets.every((w) => !isWidgetOn(w));

                            return (
                                <div key={section}>
                                    {/* Section heading */}
                                    <div className="flex items-center gap-3 mb-2.5">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 whitespace-nowrap">
                                            {section}
                                        </span>
                                        <div className="flex-1 h-px bg-slate-700/60" />
                                        <span className="text-[10px] text-slate-600">
                                            {widgets.filter(isWidgetOn).length}/{widgets.length}
                                        </span>
                                    </div>

                                    {/* Widget rows */}
                                    <div className="space-y-1.5">
                                        {widgets.map((w) => (
                                            <div
                                                key={w.id}
                                                className={`
                          flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all duration-150
                          ${isWidgetOn(w)
                                                        ? "bg-slate-800/50 border-slate-700/60"
                                                        : "bg-slate-800/20 border-slate-700/30 opacity-60"
                                                    }
                        `}
                                            >
                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <p
                                                        id={`widget-label-${w.id}`}
                                                        className={`text-xs font-semibold leading-snug transition-colors ${isWidgetOn(w) ? "text-slate-200" : "text-slate-400"
                                                            }`}
                                                    >
                                                        {w.title}
                                                    </p>
                                                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                                                        {w.description}
                                                    </p>
                                                </div>
                                                {/* Toggle */}
                                                <Toggle
                                                    id={w.id}
                                                    checked={isWidgetOn(w)}
                                                    onChange={(val) => toggle(w.id, val)}
                                                />
                                            </div>
                                        ))}
                                        {allHidden && <SectionEmptyNotice />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* ── Footer ─────────────────────────────────────────────────── */}
                    <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-slate-700/60 flex-shrink-0">
                        {/* Reset */}
                        <button
                            onClick={handleReset}
                            className="
                flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
                text-slate-400 hover:text-white
                rounded-lg border border-slate-700 hover:border-slate-600
                hover:bg-slate-700/40
                transition-all
              "
                        >
                            <RotateCcw size={12} />
                            Reset to default
                        </button>

                        {/* Cancel / Save */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onClose}
                                className="
                  px-4 py-1.5 text-xs font-medium text-slate-400 hover:text-white
                  rounded-lg border border-slate-700 hover:border-slate-600
                  hover:bg-slate-700/40 transition-all
                "
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="
                  px-4 py-1.5 text-xs font-semibold text-white
                  rounded-lg bg-indigo-600 hover:bg-indigo-500
                  shadow-sm shadow-indigo-900/50
                  transition-all hover:-translate-y-0.5
                  focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
                "
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
