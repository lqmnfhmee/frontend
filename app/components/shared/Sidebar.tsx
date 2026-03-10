"use client";

import SidebarItem from "./SidebarItem";
import SidebarAccordion from "./SidebarAccordion";
import { useEffect } from "react";
import Image from "next/image";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ collapsed, mobileOpen, setMobileOpen }: SidebarProps) {

  // Close mobile sidebar on resize to desktop, or when path changes (optional)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMobileOpen]);

  return (
    <>
      {/* 🔹 MOBILE BACKDROP OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 🔹 SIDEBAR CONTAINER */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          h-full flex flex-col
          transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
          ${collapsed ? "lg:w-[88px]" : "lg:w-[280px]"}
          ${mobileOpen ? "w-[280px] translate-x-0" : "w-[280px] -translate-x-full lg:translate-x-0"}
          bg-white dark:bg-[var(--color-brand-darkBg)]
          border-r border-slate-200 dark:border-[var(--color-brand-darkBorder)]
          overflow-hidden
        `}
      >
        {/* 🔹 FIXED TOP SECTION */}
        <div
          className={`
          py-6
          border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)]
          transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
          ${collapsed ? "px-3" : "px-6"}
        `}
        >
          {/* Logo */}
          <div
            className={`
            flex items-center
            transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
            ${collapsed ? "justify-center" : "gap-3"}
          `}
          >
            <div className={`relative shrink-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${collapsed ? "w-8 h-8" : "w-7 h-7"}`}>
              <Image
                src="/logo.png"
                alt="EAIMS Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            {!collapsed && (
              <span className="text-xl font-bold tracking-wide text-sky-500 uppercase">
                EAIMS
              </span>
            )}
          </div>

          {/* Plant Card */}
          {!collapsed && (
            <div className="mt-6">
              <div
                className="
                rounded-2xl p-5
                bg-slate-50 dark:bg-[var(--color-brand-darkCard)]
                border border-slate-200 dark:border-[var(--color-brand-darkBorder)]
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
          transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
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
                  { label: "Dashboard", href: "/inspection-management" },
                  { label: "Vessel", href: "/inspection-management/vessel" },
                  { label: "Piping", href: "/inspection-management/piping" }
                ]}
              />
              <SidebarAccordion
                label="Risk-Based Inspection"
                baseHref="/rbi"
                collapsed={collapsed}
                subItems={[
                  { label: "Dashboard", href: "/rbi" },
                  { label: "Vessel", href: "/rbi/vessel" },
                  { label: "Piping", href: "/rbi/piping" }
                ]}
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
    </>
  );
}