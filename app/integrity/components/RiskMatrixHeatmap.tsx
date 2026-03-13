"use client";

import { RiskLevel } from "./RiskBadge";

type Zone = { level: RiskLevel };

const MATRIX: Zone[][] = [
    [{ level: "Low" }, { level: "Low" }, { level: "Low" }, { level: "Medium" }, { level: "Medium" }],
    [{ level: "Low" }, { level: "Low" }, { level: "Medium" }, { level: "Medium" }, { level: "High" }],
    [{ level: "Low" }, { level: "Medium" }, { level: "Medium" }, { level: "High" }, { level: "High" }],
    [{ level: "Medium" }, { level: "Medium" }, { level: "High" }, { level: "High" }, { level: "Critical" }],
    [{ level: "Medium" }, { level: "High" }, { level: "High" }, { level: "Critical" }, { level: "Critical" }],
];

const cellStyles: Record<RiskLevel, string> = {
    Critical: "bg-red-500/80 hover:bg-red-500 text-white border-red-400 dark:bg-red-500/60 dark:hover:bg-red-500/90",
    High: "bg-orange-400/80 hover:bg-orange-400 text-white border-orange-300 dark:bg-orange-500/60 dark:hover:bg-orange-500/90",
    Medium: "bg-yellow-400/70 hover:bg-yellow-400 text-yellow-900 border-yellow-300 dark:bg-yellow-500/50 dark:hover:bg-yellow-500/80 dark:text-yellow-100",
    Low: "bg-emerald-400/70 hover:bg-emerald-400 text-emerald-900 border-emerald-300 dark:bg-emerald-500/50 dark:hover:bg-emerald-500/80 dark:text-emerald-100",
    None: "bg-slate-200 text-slate-500 border-slate-300 dark:bg-slate-700 dark:text-slate-400",
};

const assetCounts: number[][] = [
    [12, 8, 5, 3, 1],
    [9, 14, 7, 4, 2],
    [6, 11, 10, 6, 3],
    [3, 7, 8, 5, 2],
    [1, 4, 6, 3, 1],
];

interface RiskMatrixHeatmapProps {
    onCellClick?: (consequence: number, likelihood: number, level: RiskLevel) => void;
    selectedCell?: { c: number; l: number } | null;
}

export default function RiskMatrixHeatmap({ onCellClick, selectedCell }: RiskMatrixHeatmapProps) {
    const likelihoods = ["A", "B", "C", "D", "E"];
    const consequences = ["1", "2", "3", "4", "5"];

    return (
        <div className="flex flex-col gap-3 flex-1">
            <div className="flex gap-3 flex-1">
                <div className="flex flex-col items-center gap-1" style={{ writingMode: "vertical-rl" }}>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500" style={{ transform: "rotate(180deg)" }}>Consequence →</span>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                    {[...MATRIX].reverse().map((row, rowIdx) => {
                        const c = 4 - rowIdx;
                        return (
                            <div key={rowIdx} className="flex gap-1 flex-1 items-stretch">
                                <span className="w-4 text-[10px] text-slate-400 dark:text-slate-500 font-mono shrink-0">{consequences[c]}</span>
                                {row.map((cell, colIdx) => {
                                    const isSelected = selectedCell?.c === c && selectedCell?.l === colIdx;
                                    return (
                                        <button key={colIdx} onClick={() => onCellClick?.(c, colIdx, cell.level)}
                                            className={`flex-1 min-h-[44px] rounded border text-[10px] font-bold transition-all duration-150 ${cellStyles[cell.level]} ${isSelected ? "ring-2 ring-offset-1 ring-slate-900 dark:ring-white scale-105" : ""}`}
                                            title={`${cell.level} — ${assetCounts[c][colIdx]} assets`}
                                        >
                                            {assetCounts[c][colIdx]}
                                        </button>
                                    );
                                })}
                            </div>
                        );
                    })}
                    <div className="flex gap-1 mt-1">
                        <div className="w-4" />
                        {likelihoods.map((l) => <span key={l} className="flex-1 text-center text-[10px] font-mono text-slate-400 dark:text-slate-500">{l}</span>)}
                    </div>
                </div>
            </div>
            <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Likelihood →</p>
            <div className="flex flex-wrap gap-3 justify-center pt-1">
                {(["Critical", "High", "Medium", "Low"] as RiskLevel[]).map((level) => (
                    <div key={level} className="flex items-center gap-1.5">
                        <div className={`w-3 h-3 rounded-sm border ${level === "Critical" ? "bg-red-500/80 border-red-400" : level === "High" ? "bg-orange-400/80 border-orange-300" : level === "Medium" ? "bg-yellow-400/70 border-yellow-300" : "bg-emerald-400/70 border-emerald-300"}`} />
                        <span className="text-xs text-slate-600 dark:text-slate-400">{level}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
