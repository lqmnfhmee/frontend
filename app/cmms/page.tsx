"use client";

import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell
} from "recharts";
import {
  Wrench, CheckCircle2, AlertTriangle, Clock, FileText, FileSpreadsheet,
  ChevronRight, PlaySquare, RotateCcw, ThumbsDown, ListChecks, ArrowRight,
  ClipboardList,
} from "lucide-react";
import CMMSPerformanceScore from "./components/CMMSPerformanceScore";

// ─── Mock Data ──────────────────────────────────────────────────────────────

const woSummary = {
  total: 214,
  open: 38,
  closed: 154,
  overdue: 12,
  deferred: 10,
};

const pmData = {
  totalRegister: 96,
  open: 18,
  closed: 68,
  deferred: 6,
  backlog: 10,
};

const cmData = {
  totalRegister: 118,
  open: 20,
  closed: 86,
  deferred: 4,
  backlog: 14,
};

const executionStatus = [
  {
    label: "Onshore Execute",
    value: 22,
    icon: <PlaySquare size={18} />,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    badge: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30",
    badgeLabel: "EXECUTING",
    description: "Work orders currently in execution phase",
  },
  {
    label: "Request to Defer",
    value: 10,
    icon: <ThumbsDown size={18} />,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    badge: "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30",
    badgeLabel: "DEFERRED",
    description: "WOs with active deferral requests pending review",
  },
  {
    label: "Approval Pending",
    value: 6,
    icon: <Clock size={18} />,
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-500/10",
    badge: "bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30",
    badgeLabel: "PENDING",
    description: "WOs waiting for work order approval before execution",
  },
];

const woTrendData = [
  { month: "Oct", open: 52, closed: 41 },
  { month: "Nov", open: 48, closed: 44 },
  { month: "Dec", open: 45, closed: 48 },
  { month: "Jan", open: 42, closed: 50 },
  { month: "Feb", open: 40, closed: 52 },
  { month: "Mar", open: 38, closed: 45 },
];

const tooltipStyle = {
  borderRadius: "10px",
  border: "none",
  boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
  fontSize: 12,
  padding: "8px 12px",
  background: "#1e293b",
  color: "#e2e8f0",
};

// ─── Shared Components ───────────────────────────────────────────────────────

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700/70" />
    </div>
  );
}

function DashboardCard({
  title,
  subtitle,
  children,
  className = "",
  action,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={`bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 flex flex-col gap-4 ${className}`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between">
          <div>
            {title && (
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 tracking-wide">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

// PM/CM Column
function WoTypeColumn({
  type,
  color,
  icon,
  data,
}: {
  type: "PM" | "CM";
  color: string;
  icon: React.ReactNode;
  data: typeof pmData;
}) {
  const colorMap = {
    PM: {
      badge: "bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30",
      value: "text-blue-600 dark:text-blue-400",
      bar: "#2F80ED",
    },
    CM: {
      badge: "bg-orange-100 dark:bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/30",
      value: "text-orange-600 dark:text-orange-400",
      bar: "#f97316",
    },
  };
  const c = colorMap[type];

  const rows = [
    { label: "WO Register", value: data.totalRegister, note: "Total registered" },
    { label: "WO Open", value: data.open, note: "Active & unresolved" },
    { label: "WO Closed", value: data.closed, note: "Completed" },
    { label: "WO Deferred", value: data.deferred, note: "Postponed" },
    { label: "WO Backlog", value: data.backlog, note: "Accumulated backlog" },
  ];

  const completionPct = Math.round((data.closed / data.totalRegister) * 100);

  return (
    <div className="flex-1 bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Column header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl ${type === "PM" ? "bg-blue-50 dark:bg-blue-500/10 text-blue-500" : "bg-orange-50 dark:bg-orange-500/10 text-orange-500"}`}>
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {type === "PM" ? "PM Performance" : "CM Performance"}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {type === "PM" ? "Preventive Maintenance" : "Corrective Maintenance"}
            </p>
          </div>
        </div>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${c.badge}`}>
          {type}
        </span>
      </div>

      {/* Completion progress */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Completion Rate</span>
          <span className={`text-sm font-bold ${c.value}`}>{completionPct}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${completionPct}%`, backgroundColor: c.bar }}
          />
        </div>
      </div>

      {/* Stats table */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-2">
            <div>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{row.label}</span>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">{row.note}</p>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function CMMSDashboard() {
  const completionRate = Math.round((woSummary.closed / woSummary.total) * 100);

  return (
    <div className="space-y-5">

      {/* ── PAGE HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            CMMS Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Maintenance Work Order Performance ·{" "}
            <span className="font-medium text-[var(--color-brand-primary)]">
              Larut-A (LRA)
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] hover:border-slate-300 dark:hover:border-slate-600 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <FileText size={14} className="text-red-500" /> Export PDF
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] hover:border-slate-300 dark:hover:border-slate-600 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <FileSpreadsheet size={14} className="text-emerald-500" /> Export Excel
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-[var(--color-brand-primary)] rounded-lg shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <ClipboardList size={14} /> View Work Orders
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-2 flex-wrap">
        {[
          { label: "Facility", value: "Larut-A (LRA)" },
          { label: "WO Type", value: "All Types" },
          { label: "Period", value: "YTD 2025" },
          { label: "Status", value: "All" },
        ].map(({ label, value }) => (
          <button
            key={label}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg hover:border-[var(--color-brand-primary-soft)] transition-colors"
          >
            <span className="text-slate-400 dark:text-slate-500">{label}:</span>
            <span>{value}</span>
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════════ */}
      {/* SECTION 1 — CMMS Performance Score      */}
      {/* ════════════════════════════════════════ */}
      <SectionHeader label="CMMS Performance Score" />
      <CMMSPerformanceScore />

      {/* ════════════════════════════════════════ */}
      {/* SECTION 2 — Work Order Status Overview  */}
      {/* ════════════════════════════════════════ */}
      <SectionHeader label="Work Order Status Overview" />

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        {/* Total WOs */}
        <div className="relative bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[var(--color-brand-primary-soft)]/20 dark:bg-[var(--color-brand-primary)]/10" />
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-[var(--color-brand-primary-soft)] dark:bg-[var(--color-brand-primary)]/10">
              <Wrench size={18} className="text-[var(--color-brand-primary)]" />
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--color-brand-primary-soft)] text-[var(--color-brand-primary)] border border-[var(--color-brand-primary-soft)]">
              TOTAL
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{woSummary.total}</p>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">Total Work Orders</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">All registered WOs</p>
        </div>

        {/* Open WOs */}
        <div className="relative bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-amber-500/10" />
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/10">
              <ListChecks size={18} className="text-amber-500" />
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
              OPEN
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{woSummary.open}</p>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">Open Work Orders</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Pending action</p>
        </div>

        {/* Closed WOs */}
        <div className="relative bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-emerald-500/10" />
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
              <CheckCircle2 size={18} className="text-emerald-500" />
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
              CLOSED
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{woSummary.closed}</p>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">Closed Work Orders</p>
          <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${completionRate}%` }} />
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">{completionRate}% completion rate</p>
        </div>

        {/* Overdue WOs */}
        <div className="relative bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-red-500/10" />
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10">
              <AlertTriangle size={18} className="text-red-500" />
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30">
              OVERDUE
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{woSummary.overdue}</p>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">Overdue Work Orders</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Immediate action required</p>
        </div>

        {/* Deferred WOs */}
        <div className="relative bg-white dark:bg-[var(--color-brand-darkCard)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-2xl shadow-md shadow-slate-200/50 dark:shadow-none p-5 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-slate-500/10" />
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700/30">
              <RotateCcw size={18} className="text-slate-500" />
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/40 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[var(--color-brand-darkBorder)]">
              DEFERRED
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{woSummary.deferred}</p>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">Deferred Work Orders</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Postponed by approval</p>
        </div>
      </div>

      {/* ════════════════════════════════════════ */}
      {/* SECTION 3 — PM vs CM Performance        */}
      {/* ════════════════════════════════════════ */}
      <SectionHeader label="PM vs CM Performance" />

      <div className="flex flex-col lg:flex-row gap-5">
        <WoTypeColumn type="PM" color="blue" icon={<Wrench size={18} />} data={pmData} />
        <WoTypeColumn type="CM" color="orange" icon={<RotateCcw size={18} />} data={cmData} />
      </div>

      {/* ════════════════════════════════════════ */}
      {/* SECTION 4 — WO Trend & Execution Status */}
      {/* ════════════════════════════════════════ */}
      <SectionHeader label="Execution Status & Trend" />

      <div className="flex flex-col lg:flex-row gap-5">

        {/* WO Open/Closed Trend — LEFT 60% */}
        <div className="w-full lg:flex-[6] min-w-0">
          <DashboardCard
            title="Work Order Trend"
            subtitle="Open vs Closed WOs over last 6 months"
            className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          >
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={woTrendData} barSize={18} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.15)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "currentColor" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "currentColor" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(148,163,184,0.08)" }} />
                  <Bar dataKey="open" name="Open" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="closed" name="Closed" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-5 border-t border-slate-100 dark:border-[var(--color-brand-darkBorder)] pt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Open WOs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Closed WOs</span>
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* Execution Status — RIGHT 40% */}
        <div className="w-full lg:flex-[4] min-w-0">
          <DashboardCard
            title="Execution Status"
            subtitle="Operational bottleneck indicators"
            className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          >
            <div className="space-y-3 flex-1">
              {executionStatus.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border border-transparent ${item.bg} hover:border-slate-200 dark:hover:border-slate-700 transition-colors`}
                >
                  <div className={`${item.color} shrink-0`}>{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {item.label}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.badge}`}>
                        {item.badgeLabel}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {item.description}
                    </p>
                  </div>
                  <span className={`text-xl font-bold shrink-0 ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Bottleneck note */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
              <AlertTriangle size={13} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                <span className="font-semibold text-red-500">6 WOs</span> blocked on approval — resolve to unblock execution pipeline.
              </p>
            </div>
          </DashboardCard>
        </div>
      </div>

      {/* ════════════════════════════════════════ */}
      {/* SECTION 5 — Work Order Reference Access  */}
      {/* ════════════════════════════════════════ */}
      <div className="pt-2">
        <button className="w-full flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-[var(--color-brand-primary)]/5 to-transparent border border-[var(--color-brand-primary)]/10 hover:border-[var(--color-brand-primary)]/30 hover:from-[var(--color-brand-primary)]/10 transition-all group text-left shadow-sm hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--color-brand-primary)] text-white shadow-lg group-hover:scale-105 transition-transform">
              <ClipboardList size={22} />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                View Work Orders
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Access the full work order register — reference source for all maintenance records
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[var(--color-brand-primary)] text-sm font-bold group-hover:gap-3 transition-all">
            <span className="hidden sm:block">Open Register</span>
            <ArrowRight size={18} />
          </div>
        </button>
      </div>

    </div>
  );
}
