import { X } from "lucide-react";

interface Filter { key: string; label: string; }

interface FilterChipsProps {
    filters: Filter[];
    onRemove: (key: string) => void;
    onClearAll: () => void;
}

export default function FilterChips({ filters, onRemove, onClearAll }: FilterChipsProps) {
    if (filters.length === 0) return null;
    return (
        <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
                <span key={f.key} className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 rounded-full">
                    {f.label}
                    <button onClick={() => onRemove(f.key)} className="ml-0.5 text-indigo-400 hover:text-indigo-700 dark:hover:text-white transition-colors"><X size={11} /></button>
                </span>
            ))}
            <button onClick={onClearAll} className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline underline-offset-2 transition-colors">Clear all</button>
        </div>
    );
}
