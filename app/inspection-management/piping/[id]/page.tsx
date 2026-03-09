"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PipingPropertiesTab from "@/app/inspection-management/piping/[id]/components/PipingPropertiesTab";
import PipingInspectionTab from "@/app/inspection-management/piping/[id]/components/PipingInspectionTab";

export default function PipingDetailPage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState<"properties" | "inspection">("properties");

    return (
        <div className="space-y-6">
            {/* 🔹 HEADER */}
            <div className="flex items-start gap-4">
                <Link
                    href="/inspection-management/piping"
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors mt-0.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white uppercase">
                            PIPE01 - FULL WELLSTREAM PRODUCTION, CRUDE OIL
                        </h1>
                        <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-600 text-white rounded-full">
                            active
                        </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Asset Tag: PIPE01
                    </p>
                </div>
            </div>

            {/* 🔹 SUMMARY CARDS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* General Information */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium mb-2">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 opacity-70">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                        </svg>
                        General Information
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <div className="sm:col-span-2">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Asset Name</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">FULL WELLSTREAM PRODUCTION...</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Asset Tag</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">PIPE01</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Status</p>
                            <div>
                                <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-600 text-white rounded-full">
                                    active
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Manufacturing S/N</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Not set</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Active</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Yes</p>
                        </div>
                    </div>
                </div>

                {/* Location Hierarchy */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 md:p-6 space-y-4">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium mb-2">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 opacity-70">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Location Hierarchy
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Facility</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Central Processing Platform</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">System</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white uppercase">PROCESS PIPING</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Package</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white uppercase">PIPING SYSTEM</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Location Area</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Not specified</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔹 TABS */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-1.5 flex gap-1">
                <button
                    onClick={() => setActiveTab("properties")}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === "properties"
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                        }`}
                >
                    Properties
                </button>
                <button
                    onClick={() => setActiveTab("inspection")}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === "inspection"
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                        }`}
                >
                    Inspection
                </button>
            </div>

            {/* 🔹 TAB CONTENT */}
            {activeTab === "properties" && <PipingPropertiesTab />}
            {activeTab === "inspection" && <PipingInspectionTab />}
        </div>
    );
}
