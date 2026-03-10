"use client";

import { use, useState } from "react";
import {
    ArrowLeft, X, Check, Search, Info, ChevronDown, Edit, FileText, Upload
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateAnomalyPage() {
    const router = useRouter();

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 bg-slate-100 dark:bg-sky-500/10 text-sky-500 rounded-lg hover:bg-sky-500/20 transition-colors"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Create New Anomaly</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Fill in all required information to create a new anomaly record</p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm overflow-hidden p-8">
                <div className="space-y-12 max-w-6xl">
                    {/* Anomaly Identification */}
                    <section className="space-y-6">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Anomaly Identification</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Offshore Anomaly No. *</label>
                                <input
                                    type="text"
                                    placeholder="Enter offshore anomaly number"
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all font-mono"
                                />
                            </div>
                        </div>
                    </section>

                    {/* General Information */}
                    <section className="space-y-6">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">General Information</h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Equipment *</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                        <Search size={16} />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Type equipment name/tag or browse..."
                                        className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
                                    />
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                                <div className="text-[10px] text-amber-500 flex items-center gap-1.5 font-medium">
                                    <Info size={12} /> Type to search or click dropdown to browse hierarchy (Facility {'>'} System {'>'} Package)
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <SelectField label="Owner *" options={["Select owner", "Topside", "Subsea"]} />
                                <SelectField label="Equipment Type *" options={["Select equipment type", "Flange", "Valve", "Pipe"]} />
                                <SelectField label="Area" options={["Select area", "Area 1", "Area 2"]} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Equipment Name</label>
                                    <input
                                        type="text"
                                        placeholder="Auto-filled from equipment selection"
                                        disabled
                                        className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-500 cursor-not-allowed"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">P&ID Number</label>
                                    <input
                                        type="text"
                                        placeholder="Enter P&ID number"
                                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <input type="checkbox" id="sce" className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500/20 bg-white dark:bg-slate-800" />
                                <label htmlFor="sce" className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase select-none">Safety Critical Element (SCE)</label>
                            </div>
                        </div>
                    </section>

                    {/* Operating Details */}
                    <section className="space-y-6">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Operating Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <SelectField label="Process Line" options={["Select process line"]} />
                            <SelectField label="Material" options={["Select material"]} />
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Pressure (barg)</label>
                                <input type="text" placeholder="Enter pressure" className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Temperature (°C)</label>
                                <input type="text" placeholder="Enter temperature" className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                            <input type="checkbox" id="shutdown" className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500/20 bg-white dark:bg-slate-800" />
                            <label htmlFor="shutdown" className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase select-none">Shutdown Requirement</label>
                        </div>
                    </section>

                    {/* Summary */}
                    <section className="space-y-6">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Summary</h3>
                        <div className="space-y-6">
                            <SelectField label="Finding *" options={["Select finding"]} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <SelectField label="Causes" options={["Select causes"]} />
                                <SelectField label="Recommendation" options={["Select recommendation"]} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Details, Finding & Recommendation</label>
                                <textarea
                                    placeholder="Enter details, finding & recommendation"
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all resize-none"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Impact of Failure */}
                    <section className="space-y-6">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Impact of Failure</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">POF (PROBABILITY OF FAILURE)</label>
                                <SelectField label="Likelihood" options={["Select likelihood"]} />
                            </div>
                            <div className="space-y-6">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">COF (CONSEQUENCE OF FAILURE)</label>
                                <div className="grid grid-cols-2 gap-6">
                                    <SelectField label="People" options={["Select people"]} />
                                    <SelectField label="Asset" options={["Select asset"]} />
                                    <SelectField label="Environment" options={["Select environment"]} />
                                    <SelectField label="Reputation" options={["Select reputation"]} />
                                    <div className="col-span-2">
                                        <SelectField label="Overall COF" options={["Select overall COF"]} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 max-w-xs">
                            <SelectField label="Priority Risk Ranking" options={["Select ranking", "P1", "P2", "P3", "P4"]} />
                        </div>
                    </section>

                    {/* Assignment */}
                    <section className="space-y-6">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Assignment</h3>
                        <div className="space-y-6">
                            <SelectField label="Select Verifier * (Required for submission)" options={["Select verifier"]} />
                            <div className="space-y-1 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                <p className="text-[11px] text-slate-500">• Verifier selection is required for submission</p>
                                <p className="text-[11px] text-slate-500">• You can save as draft without selecting a verifier</p>
                                <p className="text-[11px] text-slate-500">• The selected verifier will verify this request</p>
                                <p className="text-[11px] text-slate-500">• The approver will be assigned by the verifier during verification</p>
                            </div>
                        </div>
                    </section>

                    {/* Footer Instruction */}
                    <div className="p-6 bg-slate-900/20 border border-slate-800 rounded-xl space-y-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider underline">Step 1 of 2: Request Details</h4>
                        <p className="text-[11px] text-slate-500">• Fill in all required information marked with *</p>
                        <p className="text-[11px] text-slate-500">• Click <span className="text-slate-300 font-bold">Next</span> to proceed to attachment upload</p>
                        <p className="text-[11px] text-slate-500">• You can add attachments in the next step</p>
                    </div>
                </div>
            </div>

            {/* Form Action Buttons */}
            <div className="flex justify-end gap-3 mt-8">
                <button
                    onClick={() => router.back()}
                    className="px-8 py-2.5 text-sm font-bold text-sky-500 dark:text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 rounded-lg transition-all border border-sky-500/20"
                >
                    Cancel
                </button>
                <button className="px-10 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-lg shadow-blue-500/20">
                    Next
                </button>
            </div>
        </div>
    );
}

function SelectField({ label, options, defaultValue }: { label: string, options: string[], defaultValue?: string }) {
    return (
        <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">{label}</label>
            <div className="relative">
                <select
                    defaultValue={defaultValue}
                    className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-slate-700 dark:text-slate-300"
                >
                    {options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
        </div>
    );
}
