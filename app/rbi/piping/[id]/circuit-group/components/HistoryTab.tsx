import { Clock } from "lucide-react";

export default function HistoryTab() {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-12 flex flex-col items-center justify-center text-center space-y-4">
            <Clock className="w-12 h-12 text-slate-300 dark:text-slate-600" />
            <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">No historical records available</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Past calculations and assessments will appear here.</p>
            </div>
        </div>
    );
}
