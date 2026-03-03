"use client";

import { useState } from "react";
import Sidebar from "./components/shared/Sidebar";
import TopBar from "./components/shared/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-full relative">

      {/* 🌎 APP BACKGROUND SURFACE */}
      <div className="
        absolute inset-0 -z-10
        bg-slate-50 dark:bg-slate-950
      " />

      {/* SIDEBAR */}
      <Sidebar collapsed={collapsed} />

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 transition-all duration-300">

        {/* TOP BAR */}
        <TopBar onToggle={() => setCollapsed(!collapsed)} />

        {/* MAIN CONTENT AREA */}
        <main className="
          flex-1
          overflow-y-auto
          p-6
          lg:p-8
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