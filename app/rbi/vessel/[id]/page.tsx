"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VesselPropertiesTab from "@/app/rbi/vessel/[id]/components/VesselPropertiesTab";

interface PageProps {
    params: {
        id: string;
    }
}

export default function RbiVesselDetailPage({ params }: PageProps) {
    const { id } = params;

    return (
        <div className="space-y-6">
            {/* 🔹 HEADER */}
            <div className="flex items-start gap-4">
                <Link
                    href="/rbi/vessel"
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors mt-0.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white uppercase">
                            Test Separator
                        </h1>
                        <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-600 text-white rounded-full">
                            Available
                        </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Asset Tag: 1V-110
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
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Asset Name</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Test Separator</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Asset Tag</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">1V-110</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Status</p>
                            <div>
                                <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-600 text-white rounded-full">
                                    Available
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
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Larut-A</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">System</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Crude Test Seperation Unit</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Package</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Not assigned</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Location Area</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Not specified</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔹 TAB CONTENT */}
            <VesselPropertiesTab />
        </div>
    );
}
