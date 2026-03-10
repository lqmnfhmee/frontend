"use client";

import { use, useState } from "react";
import {
    ArrowLeft, X, Check, Save, Upload, Plus, AlertCircle, Info, ChevronDown, Edit, FileText
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EditAnomalyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("Details");

    const tabs = ["Details", "Attachments"];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link
                        href={`/anomalies/${id}`}
                        className="p-2 bg-slate-100 dark:bg-sky-500/10 text-sky-500 rounded-lg hover:bg-sky-500/20 transition-colors"
                    >
                        <ArrowLeft size={16} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Edit Anomaly</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">{id}</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm overflow-hidden">
                <div className="p-1 flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                flex-1 py-2.5 text-sm font-medium rounded-lg transition-all
                ${activeTab === tab
                                    ? "bg-slate-800 text-white dark:bg-sky-900/30 dark:text-sky-400"
                                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}
              `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="p-8">
                    {activeTab === "Details" ? <EditDetailsView id={id} /> : <EditAttachmentsView />}
                </div>
            </div>

            {/* Form Actions Footer */}
            {activeTab === "Details" && (
                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={() => router.back()}
                        className="px-6 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="px-6 py-2.5 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 rounded-lg transition-colors shadow-lg shadow-sky-500/20">
                        Save as Draft
                    </button>
                    <button className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-lg shadow-blue-500/20">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}

function EditDetailsView({ id }: { id: string }) {
    return (
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
                            <input
                                type="text"
                                defaultValue="EXCHANGER, ASSOCIATED GAS COOLER, 2HX-215 (2HX-215)"
                                className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
                            />
                            <X size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer" />
                        </div>
                        <div className="text-[10px] text-amber-500 flex items-center gap-1.5 font-medium">
                            <Info size={12} /> Type to search or click dropdown to browse hierarchy (Facility {'>'} System {'>'} Package)
                        </div>
                    </div>

                    <div className="bg-sky-500/5 border border-sky-500/10 rounded-xl p-4 flex flex-wrap gap-x-12 gap-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-sky-500/60 font-bold uppercase">Facility:</span>
                            <span className="text-xs font-semibold text-sky-500">CPP - Central Processing Platform</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-sky-500/60 font-bold uppercase">System:</span>
                            <span className="text-xs font-semibold text-sky-500">CPP-CSU - CRUDE SEPARATION UNIT</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-sky-500/60 font-bold uppercase">Package:</span>
                            <span className="text-xs font-semibold text-sky-500">Loading...</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <SelectField label="Owner *" options={["Topside", "Subsea"]} defaultValue="Topside" />
                        <SelectField label="Equipment Type *" options={["Flange", "Valve", "Pipe"]} defaultValue="Flange" />
                        <SelectField label="Area" options={["Select area", "Area 1", "Area 2"]} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Equipment Name</label>
                            <input
                                type="text"
                                defaultValue="2HX-215 - EXCHANGER, ASSOCIATED GAS COOLER, 2HX-215"
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
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Summary</h3>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-sky-500 border border-sky-500/20 rounded-lg hover:bg-sky-500/10 transition-colors uppercase">
                        <Edit size={12} /> View Matrix Reference
                    </button>
                </div>
                <div className="space-y-6">
                    <SelectField label="Finding *" options={["- Coating deterioration with appearance of atmospheric corrosion less than 30% of the bolt nuts surface"]} defaultValue="- Coating deterioration with appearance of atmospheric corrosion less than 30% of the bolt nuts surface" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectField label="Causes" options={["CD - Coating Damage"]} defaultValue="CD - Coating Damage" />
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
                    <SelectField label="Priority Risk Ranking" options={["P1", "P2", "P3", "P4"]} defaultValue="P3" />
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
        </div>
    );
}

function EditAttachmentsView() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Request Attachments</h3>
                <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-sky-500 border border-sky-500/20 rounded-lg hover:bg-sky-500/10 transition-colors uppercase">
                    <Upload size={14} /> Add Attachment
                </button>
            </div>

            <div className="bg-slate-50/50 dark:bg-slate-800/20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl py-20 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                    <FileText size={24} className="text-slate-300" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No attachments yet</h4>
                <p className="text-sm text-slate-400 mb-6">Upload files to document this anomaly</p>
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-400 rounded-full uppercase tracking-wider">0 files</span>
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
