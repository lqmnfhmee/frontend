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
          px-6 lg:px-8
          py-6
        ">

          {/* ⭐ CONTENT SURFACE (VERY IMPORTANT) */}
          <div className="
            min-h-full
            rounded-2xl
            bg-white
            dark:bg-slate-900
            border border-slate-200 dark:border-slate-800
            shadow-sm
            p-6
          ">
            {children}
          </div>

        </main>

      </div>
    </div>
  );
}