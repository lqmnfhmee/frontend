"use client";

import { use, useState } from "react";
import {
    ArrowLeft, Edit, FileText, Paperclip, Clock, CheckCircle2,
    MapPin, AlertTriangle, User, ShieldAlert, Thermometer, Gauge,
    Search, Download, Trash2, Info
} from "lucide-react";
import Link from "next/link";

export default function AnomalyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [activeTab, setActiveTab] = useState("Details");

    const tabs = ["Details", "Attachment"];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link
                        href="/anomalies/requests"
                        className="p-2 bg-slate-100 dark:bg-sky-500/10 text-sky-500 rounded-lg hover:bg-sky-500/20 transition-colors"
                    >
                        <ArrowLeft size={16} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Anomaly Details</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">{id}</p>
                    </div>
                </div>
                <Link href={`/anomalies/${id}/edit`}>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 rounded-lg transition-colors shadow-sm">
                        <Edit size={16} /> Edit
                    </button>
                </Link>
            </div>

            {/* Draft Info Bar */}
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-3">
                <FileText size={18} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Draft - Not yet submitted</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content (3/4) */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Tabs Container */}
                    <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl shadow-sm">
                        <div className="p-1 flex border-b border-slate-200 dark:border-slate-800">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`
                    flex-1 py-2 text-sm font-medium rounded-lg transition-all
                    ${activeTab === tab
                                            ? "bg-slate-800 text-white dark:bg-sky-900/30 dark:text-sky-400"
                                            : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}
                  `}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="p-6">
                            {activeTab === "Details" ? <DetailsView /> : <AttachmentView />}
                        </div>
                    </div>
                </div>

                {/* Sidebar Tracking (1/4) */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-xl p-6 shadow-sm">
                        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Request Tracking</h2>
                        <div className="space-y-8 relative">
                            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-800" />
                            <div className="flex gap-4 relative">
                                <div className="w-4 h-4 rounded-full bg-slate-400 z-10 border-4 border-white dark:border-[var(--color-brand-darkCard)]" />
                                <div className="flex-1 -mt-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-bold text-slate-900 dark:text-slate-200">Request Created</span>
                                        <span className="text-[10px] text-slate-500 font-medium">29 Jan 2026</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400">Administrator</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailsView() {
    return (
        <div className="space-y-10">
            {/* Anomaly Identification */}
            <section>
                <h3 className="text-sm font-bold text-sky-500 uppercase tracking-widest mb-6 py-2 border-b border-sky-500/10">Anomaly Identification</h3>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Onshore Anomaly No.</label>
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-200">LRA-2026-AN-0002</div>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Offshore Anomaly No.</label>
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-200 text-slate-400">N/A</div>
                    </div>
                </div>
            </section>

            {/* General Information */}
            <section>
                <h3 className="text-sm font-bold text-sky-500 uppercase tracking-widest mb-6 py-2 border-b border-sky-500/10">General Information</h3>
                <div className="grid grid-cols-3 gap-8">
                    <InfoCard label="Facility" value="Central Processing Platform" />
                    <InfoCard label="Owner" value="Topside" isBadge />
                    <InfoCard label="System" value="CPP-CSU - CRUDE SEPARATION UNIT" />
                    <InfoCard label="Package" value="N/A" />
                    <InfoCard label="Area" value="N/A" />
                    <InfoCard label="Equipment Type" value="Flange" />
                    <div className="col-span-2">
                        <InfoCard label="Equipment" value="2HX-215 - EXCHANGER, ASSOCIATED GAS COOLER, 2HX-215" />
                    </div>
                    <InfoCard label="P&ID Number" value="N/A" />
                    <InfoCard label="Safety Critical Element" value="No" isStatus />
                </div>
            </section>

            {/* Operating Details */}
            <section>
                <h3 className="text-sm font-bold text-sky-500 uppercase tracking-widest mb-6 py-2 border-b border-sky-500/10">Operating Details</h3>
                <div className="grid grid-cols-3 gap-8">
                    <InfoCard label="Process Line" value="N/A" />
                    <InfoCard label="Material" value="N/A" />
                    <InfoCard label="Shutdown Requirement" value="Not Required" isStatus />
                    <InfoCard label="Pressure (barg)" value="N/A" />
                    <InfoCard label="Temperature (°C)" value="N/A" />
                </div>
            </section>

            {/* Summary */}
            <section>
                <h3 className="text-sm font-bold text-sky-500 uppercase tracking-widest mb-6 py-2 border-b border-sky-500/10">Summary</h3>
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Finding</label>
                        <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                            - Coating deterioration with appearance of atmospheric corrosion less than 30% of the bolt nuts surface
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <InfoCard label="Causes" value="CD" isBadge />
                        <InfoCard label="Recommendation" value="N/A" isBadge />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Note</label>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Refer to report LARUT-A-PV-2HX215-SEP-24-03</div>
                    </div>
                </div>
            </section>

            {/* Impact of Failure */}
            <section>
                <h3 className="text-sm font-bold text-sky-500 uppercase tracking-widest mb-6 py-2 border-b border-sky-500/10">Impact of Failure</h3>
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-4">POF (PROBABILITY OF FAILURE)</label>
                        <InfoCard label="Likelihood" value="N/A" isBadge />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-4">COF (CONSEQUENCE OF FAILURE)</label>
                        <div className="grid grid-cols-2 gap-4">
                            <InfoCard label="People" value="N/A" isBadge />
                            <InfoCard label="Asset" value="N/A" isBadge />
                            <InfoCard label="Environment" value="N/A" isBadge />
                            <InfoCard label="Reputation" value="N/A" isBadge />
                            <InfoCard label="Overall COF" value="N/A" isBadge />
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Priority Risk Ranking</label>
                    <span className="inline-flex px-3 py-1 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">P3</span>
                </div>
            </section>

            {/* Record Information */}
            <section>
                <h3 className="text-sm font-bold text-sky-500 uppercase tracking-widest mb-6 py-2 border-b border-sky-500/10">Record Information</h3>
                <div className="grid grid-cols-3 gap-8">
                    <InfoCard label="Raised By" value="N/A" />
                    <InfoCard label="Verified By" value="N/A" />
                    <InfoCard label="Approved By" value="N/A" />
                    <InfoCard label="Created At" value="January 29, 2026 at 02:11 PM" />
                    <InfoCard label="Last Updated" value="January 29, 2026 at 02:11 PM" />
                </div>
            </section>
        </div>
    );
}

function AttachmentView() {
    return (
        <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <Paperclip size={24} className="text-slate-400 rotate-45" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No attachments</h3>
            <p className="text-sm text-slate-400 max-w-[280px]">No attachments found for this anomaly.</p>
        </div>
    );
}

function InfoCard({ label, value, isBadge = false, isStatus = false }: { label: string, value: string, isBadge?: boolean, isStatus?: boolean }) {
    return (
        <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">{label}</label>
            {isBadge ? (
                <span className="inline-flex px-2.5 py-1 rounded text-[10px] font-bold bg-sky-500/10 text-sky-500 border border-sky-500/20 min-w-[60px] justify-center uppercase">
                    {value}
                </span>
            ) : isStatus ? (
                <span className={`inline-flex px-2.5 py-1 rounded text-[10px] font-bold border justify-center uppercase
          ${value === 'No' || value === 'Not Required' ? 'bg-sky-500/10 text-sky-500 border-sky-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}
        `}>
                    {value}
                </span>
            ) : (
                <div className={`text-sm font-semibold ${value === 'N/A' ? 'text-slate-400' : 'text-slate-900 dark:text-slate-200'}`}>
                    {value}
                </div>
            )}
        </div>
    );
}
