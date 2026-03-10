import { FileText } from "lucide-react";

export default function DesignDataTab() {
    return (
        <div className="bg-white dark:bg-[var(--color-brand-darkCard)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-sm p-12 flex flex-col items-center justify-center text-center space-y-4">
            <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600" />
            <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">No design data available.</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Design data is managed in the Integrity module.</p>
            </div>
        </div>
    );
}
