"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "./components/shared/Sidebar";
import TopBar from "./components/shared/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track window width to know if we are on mobile or desktop
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = useCallback(() => {
    if (isMobile) {
      setMobileOpen(prev => !prev);
    } else {
      setCollapsed(prev => !prev);
    }
  }, [isMobile]);

  return (
    <div className="flex h-full w-full relative overflow-hidden">

      {/* 🌎 APP BACKGROUND SURFACE */}
      <div className="
        absolute inset-0 -z-10
        bg-slate-50 dark:bg-[var(--color-brand-darkMain)]
      " />

      {/* SIDEBAR */}
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 min-w-0 transition-all duration-300">

        {/* TOP BAR */}
        <TopBar onToggle={handleToggle} />

        {/* MAIN CONTENT AREA */}
        <main className="
          flex-1
          overflow-y-auto overflow-x-hidden
          p-4 sm:p-6 lg:p-8
        ">

          {/* ⭐ CONTENT SURFACE (VERY IMPORTANT) */}
          <div className="min-h-full">
            {children}
          </div>

        </main>

      </div>
    </div>
  );
}