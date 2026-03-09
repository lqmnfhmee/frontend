"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";

export default function TrendingTab() {
    const [activeTab, setActiveTab] = useState<"dashboard" | "degradation" | "measurement">("dashboard");
    const [animateChart, setAnimateChart] = useState(false);

    useEffect(() => {
        if (activeTab === "dashboard") {
            const timer = setTimeout(() => setAnimateChart(true), 100);
            return () => clearTimeout(timer);
        } else {
            setAnimateChart(false);
        }
    }, [activeTab]);

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            {/* 🔹 SUB NAVIGATION */}
            <div className="flex bg-slate-100 dark:bg-slate-800/50 rounded-lg p-1.5 overflow-x-auto no-scrollbar">
                <button
                    onClick={() => setActiveTab("dashboard")}
                    className={`flex-1 min-w-[120px] py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "dashboard"
                            ? "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                        }`}
                >
                    Dashboard
                </button>
                <button
                    onClick={() => setActiveTab("degradation")}
                    className={`flex-1 min-w-[120px] py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "degradation"
                            ? "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                        }`}
                >
                    Degradation Analysis
                </button>
                <button
                    onClick={() => setActiveTab("measurement")}
                    className={`flex-1 min-w-[120px] py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "measurement"
                            ? "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                        }`}
                >
                    Measurement Points
                </button>
            </div>

            {activeTab === "dashboard" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                    {/* Chart Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 opacity-70">
                                    <path d="M3 3v18h18" />
                                    <polyline points="18 9 12 15 8 11 3 16" />
                                </svg>
                                Degradation Analysis
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                                    <Download size={16} />
                                    Export Excel
                                </button>
                                <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-lg transition-colors border border-blue-200/50 dark:border-blue-800/50">
                                    Calculate CR (DEV)
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    Thickness Trend - Critical Points
                                    <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">(Highest CR)</span>
                                </h3>
                            </div>

                            {/* Animated SVG Chart Area */}
                            <div className="w-full border border-slate-100 dark:border-slate-800 rounded-lg bg-slate-50/30 dark:bg-slate-900/30 p-6 flex flex-col items-center">
                                <svg width="100%" viewBox="0 0 1000 380" className="overflow-visible">
                                    {/* Grid Lines */}
                                    <g className="text-slate-200 dark:text-slate-700/50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4">
                                        <line x1="80" y1="50" x2="980" y2="50" />
                                        <line x1="80" y1="170" x2="980" y2="170" />
                                        <line x1="80" y1="235" x2="980" y2="235" />
                                        <line x1="80" y1="300" x2="980" y2="300" />
                                    </g>

                                    {/* Tmin Line */}
                                    <g className="text-red-500">
                                        <line
                                            x1="80" y1="279" x2="980" y2="279"
                                            stroke="currentColor" strokeWidth="2" strokeDasharray="6 4"
                                            className={`transition-all duration-1000 ease-in-out origin-left ${animateChart ? 'scale-x-100 opacity-50' : 'scale-x-0 opacity-0'}`}
                                        />
                                        <text x="530" y="272" fill="currentColor" fontSize="13" fontWeight="500" textAnchor="middle" className="opacity-80">
                                            Required Thickness (Tmin)
                                        </text>
                                    </g>

                                    {/* Vertical Markers */}
                                    <g className="text-emerald-500/50" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4">
                                        <line x1="750" y1="50" x2="750" y2="330" />
                                    </g>

                                    {/* Y Axis Labels */}
                                    <g fill="currentColor" className="text-slate-500 dark:text-slate-400 text-sm">
                                        <text x="70" y="54" textAnchor="end">114</text>
                                        <text x="70" y="174" textAnchor="end">77</text>
                                        <text x="70" y="239" textAnchor="end">57</text>
                                        <text x="70" y="304" textAnchor="end">37</text>
                                    </g>
                                    <text x="-175" y="30" transform="rotate(-90)" fill="currentColor" className="text-slate-400 text-sm tracking-widest uppercase">Thickness (mm)</text>

                                    {/* X Axis Labels */}
                                    <g fill="currentColor" className="text-slate-500 dark:text-slate-400 text-sm font-medium" textAnchor="middle">
                                        <text x="100" y="330">Jan 2001</text>
                                        <text x="400" y="330">Nov 2022</text>
                                        <text x="650" y="330">Apr 2025</text>
                                        <text x="750" y="348" className="text-emerald-600 dark:text-emerald-500 font-bold">Sep 2060</text>
                                        <text x="950" y="330">Mar 2096</text>
                                    </g>

                                    <mask id="dash-mask">
                                        <rect x="0" y="0" width="1000" height="400" fill="white" className={`transition-all duration-[1500ms] ease-out delay-[800ms] ${animateChart ? 'translate-x-0' : '-translate-x-[400px]'}`} />
                                    </mask>

                                    {/* Actual Thickness Line (Purple) */}
                                    <path
                                        d="M 100 128 L 400 71 L 650 78"
                                        fill="none"
                                        stroke="#8b5cf6"
                                        strokeWidth="3.5"
                                        className="transition-all duration-[1500ms] ease-out"
                                        strokeDasharray="1500"
                                        strokeDashoffset={animateChart ? 0 : 1500}
                                    />

                                    {/* Projection Line (Orange Dashed) */}
                                    <path
                                        d="M 650 78 L 950 279"
                                        fill="none"
                                        stroke="#f97316"
                                        strokeWidth="2.5"
                                        strokeDasharray="8 4"
                                        mask="url(#dash-mask)"
                                    />

                                    {/* Data Points */}
                                    <g className={`transition-opacity duration-700 delay-500 ${animateChart ? 'opacity-100' : 'opacity-0'}`}>
                                        <circle cx="100" cy="128" r="5" fill="#8b5cf6" className="dark:fill-[#a78bfa]" />
                                        <circle cx="400" cy="71" r="5" fill="#8b5cf6" className="dark:fill-[#a78bfa]" />
                                        <circle cx="650" cy="78" r="6" fill="#f97316" className="dark:fill-[#fb923c]" />
                                    </g>

                                    {/* End Data Point */}
                                    <circle
                                        cx="950" cy="279" r="6" fill="#f97316" className="dark:fill-[#fb923c]"
                                        style={{ opacity: animateChart ? 1 : 0, transition: "opacity 500ms ease-in-out 2000ms" }}
                                    />
                                </svg>

                                {/* Legend */}
                                <div className="flex justify-center gap-8 text-sm mt-4">
                                    <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-medium">
                                        <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                                        Actual Thickness
                                    </div>
                                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-medium">
                                        <div className="w-3 h-0.5 border-t-2 border-dashed border-orange-500"></div>
                                        End of Life Projection
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Calculation Summary Table */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Calculation Summary - PIPE01_SEG 01 / CML-T1-Clock 0 Deg
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                                        <th className="px-6 py-4 font-semibold">Parameter</th>
                                        <th className="px-6 py-4 font-semibold">Design</th>
                                        <th className="px-6 py-4 font-semibold">Short Term Corrosion Rate</th>
                                        <th className="px-6 py-4 font-semibold">Long Term Corrosion Rate</th>
                                        <th className="px-6 py-4 font-semibold text-right">Notes</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors text-slate-700 dark:text-slate-300">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Rate</td>
                                        <td className="px-6 py-4 text-slate-500">N/A</td>
                                        <td className="px-6 py-4">0.0732 mm/year</td>
                                        <td className="px-6 py-4">0.0732 mm/year</td>
                                        <td className="px-6 py-4 text-right">-</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors text-slate-700 dark:text-slate-300">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Remaining Life</td>
                                        <td className="px-6 py-4 text-slate-500">N/A</td>
                                        <td className="px-6 py-4">70.90 years</td>
                                        <td className="px-6 py-4">70.90 years</td>
                                        <td className="px-6 py-4 text-right">-</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors text-slate-700 dark:text-slate-300">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">End of Life (Failure Date)</td>
                                        <td className="px-6 py-4 text-slate-500">N/A</td>
                                        <td className="px-6 py-4">Mar 2096</td>
                                        <td className="px-6 py-4">Mar 2096</td>
                                        <td className="px-6 py-4 text-right">-</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors text-slate-700 dark:text-slate-300">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Next Inspection Date</td>
                                        <td className="px-6 py-4 text-slate-500">N/A</td>
                                        <td className="px-6 py-4">Sep 2060</td>
                                        <td className="px-6 py-4">Sep 2060</td>
                                        <td className="px-6 py-4 text-right">-</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors text-slate-700 dark:text-slate-300">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Expected Remaining Thickness</td>
                                        <td className="px-6 py-4 text-slate-500">N/A</td>
                                        <td className="px-6 py-4">74.50 mm</td>
                                        <td className="px-6 py-4">74.50 mm</td>
                                        <td className="px-6 py-4 text-right">-</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors text-slate-700 dark:text-slate-300">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Remaining Life Difference</td>
                                        <td className="px-6 py-4 text-slate-500">N/A</td>
                                        <td className="px-6 py-4">0.00 years</td>
                                        <td className="px-6 py-4">0.00 years</td>
                                        <td className="px-6 py-4 text-right">-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Inspection History Table */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Inspection History
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                                        <th className="px-6 py-4 font-semibold">Date</th>
                                        <th className="px-6 py-4 font-semibold text-center">Thickness (Mm)</th>
                                        <th className="px-6 py-4 font-semibold text-right">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors text-slate-700 dark:text-slate-300">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Jan 2001</td>
                                        <td className="px-6 py-4 text-center font-medium">101.00</td>
                                        <td className="px-6 py-4 text-right text-slate-500">Nominal (Commission)</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors text-slate-700 dark:text-slate-300">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Nov 2022</td>
                                        <td className="px-6 py-4 text-center font-medium">107.57</td>
                                        <td className="px-6 py-4 text-right text-slate-500">Inspection</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors text-slate-700 dark:text-slate-300">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Apr 2025</td>
                                        <td className="px-6 py-4 text-center font-medium opacity-80">105.46</td>
                                        <td className="px-6 py-4 text-right text-slate-500">Inspection</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "degradation" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Degradation Analysis - TML List</h3>
                        <input
                            type="text"
                            placeholder="Search by component or measurement point..."
                            className="w-80 px-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                        />
                    </div>

                    {[
                        {
                            group: "PIPE01_SEG 01",
                            points: [
                                { id: "TML-S1-Clock 0 Deg", thick: "49.63", stcr: "0.2194", ltcr: "0.0124" },
                                { id: "TML-S1-Clock 180 Deg", thick: "44.95", stcr: "-0.2855", ltcr: "-0.2855" },
                                { id: "TML-S1-Clock 270 Deg", thick: "50.18", stcr: "0.0810", ltcr: "0.0810" },
                                { id: "TML-S1-Clock 90 Deg", thick: "54.76", stcr: "-0.1573", ltcr: "-0.1573" },
                            ]
                        },
                        {
                            group: "PIPE01_VALVE V1",
                            points: [
                                { id: "TML-V1-Clock 0 Deg", thick: "135.80", stcr: "0.4880", ltcr: "0.4880" },
                                { id: "TML-V1-Clock 180 Deg", thick: "127.46", stcr: "0.0706", ltcr: "0.0706" },
                                { id: "TML-V1-Clock 270 Deg", thick: "127.67", stcr: "0.1224", ltcr: "0.1224" },
                                { id: "TML-V1-Clock 90 Deg", thick: "127.44", stcr: "0.2110", ltcr: "0.2110" },
                            ]
                        },
                        {
                            group: "PIPE01_ELBOW E1",
                            points: [
                                { id: "TML-E1-Clock 0 Deg", thick: "52.07", stcr: "-0.0405", ltcr: "-0.0405" },
                                { id: "TML-E1-Clock 180 Deg", thick: "55.31", stcr: "-0.1062", ltcr: "-0.1062" },
                                { id: "TML-E1-Clock 270 Deg", thick: "58.01", stcr: "-0.0041", ltcr: "-0.0041" },
                                { id: "TML-E1-Clock 90 Deg", thick: "56.05", stcr: "0.1491", ltcr: "0.1491" },
                            ]
                        }
                    ].map(section => (
                        <div key={section.group} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in duration-300">
                            <div className="bg-blue-600 dark:bg-blue-700 px-4 py-2 inline-block rounded-br-lg rounded-tl-xl">
                                <span className="text-xs font-bold text-white uppercase tracking-wider">{section.group}</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm mt-2">
                                    <thead>
                                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                                            <th className="px-6 py-3 font-semibold w-[35%]">Measurement Point</th>
                                            <th className="px-6 py-3 font-semibold w-[20%] text-right">Latest Thickness (Mm)</th>
                                            <th className="px-6 py-3 font-semibold w-[20%] text-right">STCR (Mm/Year)</th>
                                            <th className="px-6 py-3 font-semibold w-[25%] text-right">LTCR (Mm/Year)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                        {section.points.map((pt, i) => (
                                            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors text-slate-700 dark:text-slate-300">
                                                <td className="px-6 py-3 font-medium text-slate-900 dark:text-slate-200">{pt.id}</td>
                                                <td className="px-6 py-3 text-right">{pt.thick}</td>
                                                <td className="px-6 py-3 text-right">{pt.stcr}</td>
                                                <td className="px-6 py-3 text-right text-slate-500">{pt.ltcr}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === "measurement" && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-12 text-center animate-in fade-in duration-300">
                    <p className="text-slate-500 dark:text-slate-400">Measurement points plot and mappings goes here.</p>
                </div>
            )}
        </div>
    );
}
