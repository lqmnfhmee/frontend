"use client";

import { useState } from "react";
import RiskMatrixHeatmap from "@/app/integrity/components/RiskMatrixHeatmap";
import AssetRiskTable, { Asset } from "@/app/integrity/components/AssetRiskTable";
import AssetDetailPanel from "@/app/integrity/components/AssetDetailPanel";
import SlidePanel from "@/app/integrity/components/SlidePanel";
import RiskBadge, { RiskLevel } from "@/app/integrity/components/RiskBadge";
import FilterChips from "@/app/integrity/components/FilterChips";
import { ShieldAlert, AlertTriangle, CalendarClock, Activity, Download } from "lucide-react";

const MOCK_ASSETS: Asset[] = [
    { id: "V-1001", name: "HP Separator Vessel", type: "Pressure Vessel", riskLevel: "Critical", cof: 5, pof: 4, nextInspectionDate: "2025-01-15", trend: [{ value: 2 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 4 }, { value: 5 }] },
    { id: "V-1002", name: "LP Flash Drum", type: "Pressure Vessel", riskLevel: "High", cof: 4, pof: 3, nextInspectionDate: "2025-03-01", trend: [{ value: 2 }, { value: 3 }, { value: 3 }, { value: 3 }, { value: 4 }, { value: 4 }] },
    { id: "P-2001", name: "Gas Export Pipeline Riser", type: "Piping", riskLevel: "High", cof: 4, pof: 2, nextInspectionDate: "2025-04-10", trend: [{ value: 3 }, { value: 3 }, { value: 3 }, { value: 4 }, { value: 3 }, { value: 4 }] },
    { id: "HE-3001", name: "Feed/Effluent Exchanger", type: "Heat Exchanger", riskLevel: "Medium", cof: 3, pof: 2, nextInspectionDate: "2025-06-15", trend: [{ value: 2 }, { value: 2 }, { value: 2 }, { value: 3 }, { value: 2 }, { value: 3 }] },
    { id: "P-2002", name: "Condensate Transfer Line", type: "Piping", riskLevel: "Medium", cof: 3, pof: 3, nextInspectionDate: "2025-05-20", trend: [{ value: 1 }, { value: 2 }, { value: 2 }, { value: 2 }, { value: 3 }, { value: 3 }] },
    { id: "TK-4001", name: "Crude Storage Tank", type: "Storage Tank", riskLevel: "Low", cof: 2, pof: 1, nextInspectionDate: "2026-01-01", trend: [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 2 }, { value: 1 }] },
    { id: "RE-5001", name: "Gas Compressor K101", type: "Rotating Equipment", riskLevel: "Critical", cof: 5, pof: 5, nextInspectionDate: "2024-12-20", trend: [{ value: 3 }, { value: 3 }, { value: 4 }, { value: 4 }, { value: 5 }, { value: 5 }] },
    { id: "V-1003", name: "LP Separator", type: "Pressure Vessel", riskLevel: "Low", cof: 2, pof: 2, nextInspectionDate: "2026-03-01", trend: [{ value: 2 }, { value: 2 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 2 }] },
    { id: "P-2003", name: "Fuel Gas Header", type: "Piping", riskLevel: "Medium", cof: 3, pof: 2, nextInspectionDate: "2025-08-10", trend: [{ value: 2 }, { value: 2 }, { value: 2 }, { value: 2 }, { value: 3 }, { value: 2 }] },
    { id: "HE-3002", name: "Aerial Cooler AC201", type: "Heat Exchanger", riskLevel: "Low", cof: 2, pof: 1, nextInspectionDate: "2026-07-01", trend: [{ value: 1 }, { value: 1 }, { value: 2 }, { value: 1 }, { value: 1 }, { value: 1 }] },
];

const kpis = [
    { label: "Total Assets", value: MOCK_ASSETS.length, Icon: Activity, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
    { label: "High + Critical Risk", value: MOCK_ASSETS.filter((a) => a.riskLevel === "Critical" || a.riskLevel === "High").length, Icon: ShieldAlert, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10" },
    { label: "Overdue Inspections", value: 2, Icon: AlertTriangle, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10" },
    { label: "Next Due (days)", value: 12, Icon: CalendarClock, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
];

export default function RbiPage() {
    const [selectedCell, setSelectedCell] = useState<{ c: number; l: number } | null>(null);
    const [filterRisk, setFilterRisk] = useState<RiskLevel | null>(null);
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

    const handleCellClick = (c: number, l: number, level: RiskLevel) => {
        if (selectedCell?.c === c && selectedCell?.l === l) { setSelectedCell(null); setFilterRisk(null); }
        else { setSelectedCell({ c, l }); setFilterRisk(level); }
    };

    const activeChips = filterRisk ? [{ key: "risk", label: `Risk: ${filterRisk}` }] : [];

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Risk-Based Inspection</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Asset risk profiles · LARUT-A (LRA)</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
                        <Download size={15} /> Export
                    </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {kpis.map(({ label, value, Icon, color, bg }) => (
                        <div key={label} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex items-center gap-4 shadow-sm">
                            <div className={`p-2.5 rounded-xl ${bg}`}><Icon size={20} className={color} /></div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6">
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Risk Matrix</h2>
                            {selectedCell && (
                                <button onClick={() => { setSelectedCell(null); setFilterRisk(null); }} className="text-xs text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 underline underline-offset-2">
                                    Clear filter
                                </button>
                            )}
                        </div>
                        <RiskMatrixHeatmap onCellClick={handleCellClick} selectedCell={selectedCell} />
                        {filterRisk && (
                            <div className="mt-3 text-center">
                                <RiskBadge level={filterRisk} />
                                <span className="text-xs text-slate-400 dark:text-slate-500 ml-2">risk zone selected</span>
                            </div>
                        )}
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Asset Register</h2>
                        </div>
                        <FilterChips filters={activeChips} onRemove={() => { setSelectedCell(null); setFilterRisk(null); }} onClearAll={() => { setSelectedCell(null); setFilterRisk(null); }} />
                        <div className="mt-3">
                            <AssetRiskTable assets={MOCK_ASSETS} filterRisk={filterRisk} onViewAsset={setSelectedAsset} />
                        </div>
                    </div>
                </div>
            </div>

            <SlidePanel isOpen={!!selectedAsset} onClose={() => setSelectedAsset(null)} title={selectedAsset?.id ?? ""} subtitle={selectedAsset?.name} width="md">
                {selectedAsset && <AssetDetailPanel asset={selectedAsset} />}
            </SlidePanel>
        </>
    );
}
