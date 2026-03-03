"use client";

import { useState } from "react";
import RiskBadge, { RiskLevel } from "./RiskBadge";
import SparklineChart from "./SparklineChart";
import { ChevronUp, ChevronDown, Eye } from "lucide-react";

export type Asset = {
    id: string;
    name: string;
    type: string;
    riskLevel: RiskLevel;
    cof: number;
    pof: number;
    nextInspectionDate: string;
    trend: { value: number }[];
};

type SortKey = keyof Pick<Asset, "id" | "type" | "riskLevel" | "cof" | "pof" | "nextInspectionDate">;

const riskOrder: Record<RiskLevel, number> = { Critical: 4, High: 3, Medium: 2, Low: 1, None: 0 };

interface AssetRiskTableProps {
    assets: Asset[];
    filterRisk?: RiskLevel | null;
    onViewAsset: (asset: Asset) => void;
}

export default function AssetRiskTable({ assets, filterRisk, onViewAsset }: AssetRiskTableProps) {
    const [sortKey, setSortKey] = useState<SortKey>("riskLevel");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
    const [search, setSearch] = useState("");

    const handleSort = (key: SortKey) => {
        if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        else { setSortKey(key); setSortDir("desc"); }
    };

    const filtered = assets
        .filter((a) => (!filterRisk || a.riskLevel === filterRisk))
        .filter((a) => search === "" || a.id.toLowerCase().includes(search.toLowerCase()) || a.name.toLowerCase().includes(search.toLowerCase()) || a.type.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            let v = 0;
            if (sortKey === "riskLevel") v = riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
            else if (sortKey === "cof" || sortKey === "pof") v = a[sortKey] - b[sortKey];
            else v = String(a[sortKey]).localeCompare(String(b[sortKey]));
            return sortDir === "asc" ? v : -v;
        });

    const SortIcon = ({ col }: { col: SortKey }) => {
        if (sortKey !== col) return <ChevronUp size={12} className="text-slate-300 dark:text-slate-600" />;
        return sortDir === "asc" ? <ChevronUp size={12} className="text-indigo-500" /> : <ChevronDown size={12} className="text-indigo-500" />;
    };

    const hClass = "px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 transition-colors select-none";

    return (
        <div className="flex flex-col gap-3">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search assets…"
                className="w-full sm:w-72 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition" />
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className={hClass} onClick={() => handleSort("id")}><span className="flex items-center gap-1">Asset ID <SortIcon col="id" /></span></th>
                                <th className={`${hClass} hidden md:table-cell`} onClick={() => handleSort("type")}><span className="flex items-center gap-1">Type <SortIcon col="type" /></span></th>
                                <th className={hClass} onClick={() => handleSort("riskLevel")}><span className="flex items-center gap-1">Risk <SortIcon col="riskLevel" /></span></th>
                                <th className={`${hClass} hidden lg:table-cell`} onClick={() => handleSort("cof")}><span className="flex items-center gap-1">CoF <SortIcon col="cof" /></span></th>
                                <th className={`${hClass} hidden lg:table-cell`} onClick={() => handleSort("pof")}><span className="flex items-center gap-1">PoF <SortIcon col="pof" /></span></th>
                                <th className={`${hClass} hidden xl:table-cell`} onClick={() => handleSort("nextInspectionDate")}><span className="flex items-center gap-1">Next Inspection <SortIcon col="nextInspectionDate" /></span></th>
                                <th className="px-4 py-3 w-24 hidden sm:table-cell"><span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Trend</span></th>
                                <th className="px-4 py-3 w-10" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filtered.length === 0 ? (
                                <tr><td colSpan={8} className="py-10 text-center text-sm text-slate-400 dark:text-slate-500">No assets match the current filters.</td></tr>
                            ) : (
                                filtered.map((asset) => (
                                    <tr key={asset.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-slate-900 dark:text-white text-sm">{asset.id}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[140px]">{asset.name}</div>
                                        </td>
                                        <td className="px-4 py-3 hidden md:table-cell text-slate-600 dark:text-slate-300 text-sm">{asset.type}</td>
                                        <td className="px-4 py-3"><RiskBadge level={asset.riskLevel} /></td>
                                        <td className="px-4 py-3 hidden lg:table-cell font-mono text-sm text-slate-700 dark:text-slate-300">{asset.cof}</td>
                                        <td className="px-4 py-3 hidden lg:table-cell font-mono text-sm text-slate-700 dark:text-slate-300">{asset.pof}</td>
                                        <td className="px-4 py-3 hidden xl:table-cell text-sm text-slate-600 dark:text-slate-400">{asset.nextInspectionDate}</td>
                                        <td className="px-4 py-3 w-24 hidden sm:table-cell">
                                            <SparklineChart data={asset.trend} color={asset.riskLevel === "Critical" || asset.riskLevel === "High" ? "#ef4444" : asset.riskLevel === "Medium" ? "#eab308" : "#22c55e"} height={32} />
                                        </td>
                                        <td className="px-4 py-3">
                                            <button onClick={() => onViewAsset(asset)} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400 transition-all" title="View detail">
                                                <Eye size={15} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                    <span className="text-xs text-slate-400 dark:text-slate-500">{filtered.length} of {assets.length} assets{filterRisk ? ` · Filtered by: ${filterRisk}` : ""}</span>
                </div>
            </div>
        </div>
    );
}
