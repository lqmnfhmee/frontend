"use client";

import SidebarItem from "./SidebarItem";
import SidebarAccordion from "./SidebarAccordion";

interface SidebarProps {
  collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  return (
    <aside
      className={`
        h-full flex flex-col
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-[88px]" : "w-[280px]"}
        bg-white dark:bg-slate-950
        border-r border-slate-200 dark:border-slate-800
        overflow-hidden
      `}
    >
      {/* 🔹 FIXED TOP SECTION */}
      <div
        className={`
          py-6
          border-b border-slate-200 dark:border-slate-800
          transition-all duration-300
          ${collapsed ? "px-3" : "px-6"}
        `}
      >
        {/* Logo */}
        <div
          className={`
            text-2xl font-semibold tracking-tight
            text-slate-900 dark:text-slate-100
            transition-all duration-300
            ${collapsed ? "text-center text-lg" : ""}
          `}
        >
          {collapsed ? "E" : "EAIMS"}
        </div>

        {/* Plant Card */}
        {!collapsed && (
          <div className="mt-6">
            <div
              className="
                rounded-2xl p-5
                bg-slate-50 dark:bg-slate-900
                border border-slate-200 dark:border-slate-800
                shadow-sm
                transition-colors duration-300
              "
            >
              <div className="text-sm text-slate-500 dark:text-slate-400">
                LARUT-A (LRA)
              </div>

              <div className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
                82
              </div>

              <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Low Risk
              </div>

              <div className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                Last Sync: 10:42
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🔹 SCROLLABLE NAVIGATION */}
      <div
        className={`
          flex-1 overflow-y-auto
          py-6 space-y-8 text-sm
          transition-all duration-300
          ${collapsed ? "px-3" : "px-6"}
        `}
      >
        {/* MENU */}
        <div>
          {!collapsed && (
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Menu
            </p>
          )}
          <SidebarItem label="Dashboard" href="/" collapsed={collapsed} />
        </div>

        {/* ASSET MANAGEMENT */}
        <div>
          {!collapsed && (
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Asset Management
            </p>
          )}
          <div className="space-y-2">
            <SidebarItem
              label="Dashboard"
              href="/asset-management"
              collapsed={collapsed}
            />
            <SidebarAccordion
              label="Asset Registration"
              baseHref="/asset-registration"
              collapsed={collapsed}
              subItems={[
                { label: "Facilities", href: "/asset-registration/facilities" },
                { label: "System", href: "/asset-registration/system" },
                { label: "Package", href: "/asset-registration/package" },
                { label: "Assets", href: "/asset-registration/assets" }
              ]}
            />
            <SidebarAccordion
              label="Asset Settings"
              baseHref="/asset-settings"
              collapsed={collapsed}
              subItems={[
                { label: "Asset Categories", href: "/asset-settings/asset-categories" },
                { label: "Asset Groups", href: "/asset-settings/asset-groups" },
                { label: "Processes", href: "/asset-settings/processes" },
                { label: "Deleted Items", href: "/asset-settings/deleted-items" }
              ]}
            />
          </div>
        </div>

        {/* ASSET ASSURANCE */}
        <div>
          {!collapsed && (
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Asset Assurance
            </p>
          )}
          <div className="space-y-2">
            <SidebarItem
              label="Dashboard"
              href="/sce"
              collapsed={collapsed}
            />
            <SidebarItem
              label="SCE Assessments"
              href="/sce/assessments"
              collapsed={collapsed}
            />
          </div>
        </div>

        {/* INTEGRITY MANAGEMENT */}
        <div>
          {!collapsed && (
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Integrity Management
            </p>
          )}
          <div className="space-y-2">
            <SidebarItem
              label="Integrity Dashboard"
              href="/integrity"   // ✅ Updated route
              collapsed={collapsed}
            />
            <SidebarAccordion
              label="Inspection Management"
              baseHref="/inspection-management"
              collapsed={collapsed}
              subItems={[
                { label: "Vessel", href: "/inspection-management/vessel" },
                { label: "Piping", href: "/inspection-management/piping" }
              ]}
            />
            <SidebarItem
              label="Risk-Based Inspection"
              href="/rbi"
              collapsed={collapsed}
            />
            <SidebarItem
              label="Anomalies"
              href="/anomalies"
              badge="5"
              collapsed={collapsed}
            />
            <SidebarItem
              label="Settings"
              href="/integrity-settings"
              collapsed={collapsed}
            />
            <SidebarItem
              label="Anomaly Settings"
              href="/anomaly-settings"
              collapsed={collapsed}
            />
          </div>
        </div>

        {/* SETTINGS */}
        <div>
          {!collapsed && (
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Settings
            </p>
          )}
          <div className="space-y-2">
            <SidebarItem
              label="Approvals"
              href="/approvals"
              collapsed={collapsed}
            />
            <SidebarItem
              label="General Data"
              href="/general-data"
              collapsed={collapsed}
            />
            <SidebarItem
              label="Settings"
              href="/settings"
              collapsed={collapsed}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}