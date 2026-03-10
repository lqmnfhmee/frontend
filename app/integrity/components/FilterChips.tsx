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
                <span key={f.key} className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-[var(--color-brand-primary-soft)] dark:bg-[var(--color-brand-primary)]/15 text-[var(--color-brand-primary)] dark:text-brand-secondary border border-[var(--color-brand-primary-soft)] dark:border-[var(--color-brand-primary-soft)] rounded-full">
                    {f.label}
                    <button onClick={() => onRemove(f.key)} className="ml-0.5 text-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] dark:hover:text-white transition-colors"><X size={11} /></button>
                </span>
            ))}
            <button onClick={onClearAll} className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline underline-offset-2 transition-colors">Clear all</button>
        </div>
    );
}
