"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Shield, Cog, Activity, Thermometer, Bell, PowerSquare, BriefcaseMedical, LifeBuoy, ChevronDown, ChevronRight, Download } from "lucide-react";

// Mock Data
const kpiData = {
    total: 8357,
    sce: 2421,
    nonSce: 5892,
    notAssessed: 34
};

const donutData = [
    { name: "SCE", value: 2421, color: "#ef4444" }, // Red-500
    { name: "Non-SCE", value: 5892, color: "#22c55e" }, // Green-500
    { name: "Not Assessed", value: 34, color: "#94a3b8" } // Slate-400
];

const progressData = [
    { label: "Fail", value: 28.7, raw: 800, color: "bg-red-500" },
    { label: "Pass", value: 70.8, raw: 1974, color: "bg-emerald-500" },
    { label: "Not Assessed", value: 0.4, raw: 12, color: "bg-slate-300 dark:bg-slate-600" }
];

const barrierGroups = [
    {
        icon: <Shield className="text-blue-500" size={20} />,
        title: "Structural Integrity (SI)",
        total: 714,
        items: [
            { code: "C0201", desc: "(TOS) Site Surface Contact, Support & Guide (Structural / Condition & Function Assessment)", value: 714 }
        ]
    },
    {
        icon: <Activity className="text-emerald-500" size={20} />,
        title: "Process Containment (PC)",
        total: 995,
        items: [
            { code: "C0301", desc: "Pressure Vessels", value: 231 },
            { code: "C0302", desc: "Heat Exchangers", value: 96 },
            { code: "C0303", desc: "Rotating Equipment", value: 114 },
            { code: "C0304", desc: "In-line Non-rotating Equipment (e.g. Strainer, Filter etc.)", value: 6 },
            { code: "C0305", desc: "Piping Systems", value: 483 },
            { code: "C0306", desc: "Onshore / Offshore Pipelines", value: 12 },
            { code: "C0307", desc: "Steel Riser for Onshore / Offshore Pipelines", value: 24 },
            { code: "C0308", desc: "Flexible Riser / Subsea Installation", value: 29 }
        ]
    },
    {
        icon: <Thermometer className="text-amber-500" size={20} />,
        title: "Ignition Control (IC)",
        total: 394,
        items: [
            { code: "C0401", desc: "Hazardous Area Equipment", value: 6 },
            { code: "C0402", desc: "Gas Compression Equipments", value: 115 },
            { code: "C0403", desc: "Gas Fired / Heating Utilities Equipments", value: 25 },
            { code: "C0404", desc: "Electrical Earthing & Bonding / Anti-Static Mating", value: 190 },
            { code: "C0406", desc: "Flare/Purge System", value: 8 },
            { code: "C0407", desc: "Miscellaneous Ignition Control Equipments", value: 2 },
            { code: "C0408", desc: "Exhaust / Flame / Spark Arrestor (Internal Combustions etc.)", value: 48 }
        ]
    },
    {
        icon: <Bell className="text-indigo-500" size={20} />,
        title: "Detection Systems (DS)",
        total: 75,
        items: [
            { code: "C0501", desc: "Fire and Gas Detection", value: 75 }
        ]
    },
    {
        icon: <BriefcaseMedical className="text-teal-500" size={20} />,
        title: "Protection Systems (PS)",
        total: 106,
        items: [
            { code: "C0601", desc: "Deluge Systems", value: 14 },
            { code: "C0602", desc: "Foam / Dry Chemical / Gas Extinguishing Systems", value: 4 },
            { code: "C0603", desc: "Hydrant / Monitors / Hose Reels", value: 6 },
            { code: "C0604", desc: "Fire Water Pump Set (including Pump, Engine / Driver / Panel)", value: 8 },
            { code: "C0606", desc: "Fire / Smoke Damper / Baffle", value: 29 },
            { code: "C0607", desc: "Passive Fire Protection (e.g. Enclosure, Coat, Wall, Barrier, etc.)", value: 4 },
            { code: "C0608", desc: "Fire / Gas / Smoke Detectors", value: 12 },
            { code: "C0615", desc: "Rupture Disk / Bursting", value: 14 },
            { code: "C0616", desc: "Emergency Vent / Depressurizing Valve / Pressure Venting Valve", value: 9 },
            { code: "C0617", desc: "Subsea Isolation Valves (SSIV) / Boarding Valve", value: 6 }
        ]
    },
    {
        icon: <PowerSquare className="text-slate-500" size={20} />,
        title: "Shutdown Systems (SS)",
        total: 114,
        items: [
            { code: "C0701", desc: "Emergency Shutdown (ESD) System", value: 19 },
            { code: "C0702", desc: "Emergency Depressurization (EDP) System", value: 4 },
            { code: "C0703", desc: "Fire and Gas (F&G) System", value: 68 },
            { code: "C0704", desc: "High Integrity Pressure Protection System (HIPPS)", value: 8 },
            { code: "C0705", desc: "Subsea Emergency Shutdown System", value: 15 }
        ]
    },
    {
        icon: <Cog className="text-purple-500" size={20} />,
        title: "Emergency Response (ER)",
        total: 21,
        items: [
            { code: "C0801", desc: "Temporary Refuge (TR) / Personal Survival Craft", value: 3 },
            { code: "C0802", desc: "Rescue Boats", value: 4 },
            { code: "C0803", desc: "Emergency Escape Route", value: 2 },
            { code: "C0804", desc: "Muster Location and Emergency Control Center", value: 6 },
            { code: "C0805", desc: "Uninterruptible Power Supply (UPS)", value: 4 },
            { code: "C0806", desc: "Helicopter Facilities (e.g. Helideck, Refueling systems, Crash Equipment)", value: 2 }
        ]
    },
    {
        icon: <LifeBuoy className="text-orange-500" size={20} />,
        title: "Lifesaving (LS)",
        total: 2,
        items: [
            { code: "C0901", desc: "Personal Survival Equipment", value: 1 },
            { code: "C0902", desc: "Lifeboat / Liferaft", value: 1 }
        ]
    }
];

export default function SCEDashboard() {
    const [expandedGroups, setExpandedGroups] = useState<string[]>(barrierGroups.map(g => g.title));

    const toggleGroup = (title: string) => {
        setExpandedGroups(prev =>
            prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
                        SCE Dashboard
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Safety Critical Equipment Overview
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
                    <Download size={16} />
                    Export Report
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Equipment</div>
                    <div className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{kpiData.total.toLocaleString()}</div>
                    <div className="mt-1 text-xs text-slate-500">Across all categories</div>
                </div>

                <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-red-200 dark:hover:border-red-500/30 transition-colors">
                    <div className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">SCE Count</div>
                    <div className="mt-2 text-3xl font-bold text-red-600 dark:text-red-500">{kpiData.sce.toLocaleString()}</div>
                    <div className="mt-1 text-xs text-slate-500">Safety critical equipment</div>
                </div>

                <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-emerald-200 dark:hover:border-emerald-500/30 transition-colors">
                    <div className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Non-SCE Count</div>
                    <div className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-500">{kpiData.nonSce.toLocaleString()}</div>
                    <div className="mt-1 text-xs text-slate-500">Standard equipment</div>
                </div>

                <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                    <div className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full bg-slate-400"></div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Not Assessed</div>
                    <div className="mt-2 text-3xl font-bold text-slate-700 dark:text-slate-300">{kpiData.notAssessed}</div>
                    <div className="mt-1 text-xs text-slate-500">Pending classification</div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Donut Chart */}
                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-6">SCE Distribution</h2>
                    <div className="flex-1 min-h-[250px] relative flex flex-col items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={donutData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={2}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {donutData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: any) => value?.toLocaleString() ?? ""}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-slate-900 dark:text-white">28.9%</span>
                            <span className="text-xs text-slate-500">SCE Proportion</span>
                        </div>
                    </div>
                    {/* Legend */}
                    <div className="flex justify-center gap-6 mt-4">
                        {donutData.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <span className="text-slate-600 dark:text-slate-400">{item.name}</span>
                                <span className="font-medium text-slate-900 dark:text-white">{item.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Bars */}
                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-6">Assessment Progress</h2>

                    <div className="space-y-8 flex-1 flex flex-col justify-center">
                        {progressData.map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-end mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${item.color.split(' ')[0]}`}></div>
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-lg font-bold text-slate-900 dark:text-white">{item.value}%</span>
                                        <span className="text-xs text-slate-500 ml-2">({item.raw.toLocaleString()} equipments)</span>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className={`h-2.5 rounded-full ${item.color}`}
                                        style={{ width: `${item.value}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Barrier Groups */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">SCE by Barrier Group</h2>

                <div className="space-y-4">
                    {barrierGroups.map((group, idx) => {
                        const isExpanded = expandedGroups.includes(group.title);

                        return (
                            <div key={idx} className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-200">
                                {/* Accordion Header */}
                                <button
                                    onClick={() => toggleGroup(group.title)}
                                    className="w-full px-5 py-4 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/20 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                            {group.icon}
                                        </div>
                                        <span className="font-semibold text-slate-900 dark:text-white text-base">
                                            {group.title}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="flex flex-col items-end sm:flex-row sm:items-center gap-1 sm:gap-2">
                                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total SCE Equipment:</span>
                                            <span className="px-2.5 py-0.5 rounded-md text-sm font-bold bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20">
                                                {group.total}
                                            </span>
                                        </div>
                                        <div className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                            <ChevronDown size={20} />
                                        </div>
                                    </div>
                                </button>

                                {/* Accordion Content (Table) */}
                                {isExpanded && (
                                    <div className="border-t border-slate-200 dark:border-slate-800 pb-2">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-slate-500 dark:text-slate-400 font-medium">
                                                <tr>
                                                    <th className="px-6 py-3 w-32 border-b border-slate-100 dark:border-slate-800/60">SCE Code</th>
                                                    <th className="px-6 py-3 border-b border-slate-100 dark:border-slate-800/60">Description</th>
                                                    <th className="px-6 py-3 text-right border-b border-slate-100 dark:border-slate-800/60 w-24">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                                                {group.items.map((item, itemIdx) => (
                                                    <tr key={itemIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                                                        <td className="px-6 py-3 font-medium text-slate-600 dark:text-slate-400">{item.code}</td>
                                                        <td className="px-6 py-3 text-slate-700 dark:text-slate-300">{item.desc}</td>
                                                        <td className="px-6 py-3 text-right">
                                                            <span className="inline-flex items-center justify-center min-w-[2rem] px-2 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-100 dark:border-red-500/20">
                                                                {item.value}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
