import AssetStatusSummary from "@/app/asset-management/components/AssetStatusSummary";
import AssetTrendChart from "@/app/asset-management/components/AssetTrendChart";
import { Factory, Boxes, Package, Layers } from "lucide-react";
import KpiCard from "@/app/components/shared/KpiCard";
import RecentAssets from "@/app/(home)/components/RecentAssets";

export default function AssetManagementPage() {

  const statusData = [
    { label: "Active", value: 8200, color: "#22c55e" },
    { label: "Available", value: 120, color: "#3b82f6" },
    { label: "Inactive", value: 18, color: "#facc15" },
    { label: "Decommissioned", value: 6, color: "#ef4444" },
    { label: "Preservation", value: 10, color: "#a855f7" },
  ];

  const trendData = [
    { month: "Jan", assets: 2500 },
    { month: "Feb", assets: 7500 },
    { month: "Mar", assets: 1000 },
    { month: "Apr", assets: 9000 },
    { month: "May", assets: 8600 },
    { month: "Jun", assets: 10000 },
  ];

  return (
    <div className="space-y-10">

      {/* 🔹 PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Asset Management Dashboard
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Overview of facilities, systems, packages and asset performance
        </p>
      </div>

      {/* 🔹 KPI ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <KpiCard
          title="Total Facilities"
          value={3}
          growth={2.3}
          icon={<Factory size={20} />}
          tooltip="Total number of registered facilities"
          trendData={[
            { value: 2 },
            { value: 2 },
            { value: 3 },
            { value: 3 },
            { value: 3 },
          ]}
        />

        <KpiCard
          title="Total Systems"
          value={42}
          growth={1.2}
          icon={<Boxes size={20} />}
          tooltip="Total systems currently tracked in the platform"
          trendData={[
            { value: 38 },
            { value: 40 },
            { value: 41 },
            { value: 42 },
            { value: 42 },
          ]}
        />

        <KpiCard
          title="Total Packages"
          value={366}
          growth={-0.8}
          icon={<Package size={20} />}
          tooltip="Grouped asset packages under systems"
          trendData={[
            { value: 370 },
            { value: 368 },
            { value: 367 },
            { value: 366 },
            { value: 366 },
          ]}
        />

        <KpiCard
          title="Total Assets"
          value={8357}
          growth={4.6}
          icon={<Layers size={20} />}
          live
          tooltip="Total registered assets across all platforms"
          trendData={[
            { value: 8100 },
            { value: 8200 },
            { value: 8300 },
            { value: 8400 },
            { value: 8357 },
          ]}
        />

      </div>

      {/* 🔹 ANALYTICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Asset Status */}
        <div className="
          relative
          bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950
          rounded-2xl
          p-6
          border border-slate-200 dark:border-slate-800
          shadow-sm dark:shadow-none
          transition-all duration-300
          dark:hover:shadow-none
          hover:-translate-y-1
        ">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
            Asset Status Summary
          </h2>
          <AssetStatusSummary items={statusData} />
        </div>

        {/* Trend */}
        <div className="
          relative
          bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950
          rounded-2xl
          p-6
          border border-slate-200 dark:border-slate-800
          shadow-sm dark:shadow-none
          transition-all duration-300
          dark:hover:shadow-none
          hover:-translate-y-1
        ">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Asset Growth Trend
          </h2>
          <AssetTrendChart data={trendData} />
        </div>

      </div>

      {/* 🔹 SECOND ROW */}
      <div className="grid grid-cols-1 gap-6">

        {/* Recent Assets */}
        <div className="
          relative
          bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950
          rounded-2xl
          p-6
          border border-slate-200 dark:border-slate-800
          shadow-sm dark:shadow-none
          transition-all duration-300
          dark:hover:shadow-none
          hover:-translate-y-1
        ">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Recent Assets
          </h2>

          <RecentAssets
            data={[
              {
                name: "VESSEL, PRODUCTION SEPARATOR, 1V-210",
                tag: "V210",
                location: "Central Processing Platform",
                date: "1/28/2026",
              },
              {
                name: "VESSEL, TEST SEPARATOR, 1V-110",
                tag: "V110",
                location: "Central Processing Platform",
                date: "1/28/2026",
              },
              {
                name: "EXCHANGER, ASSOCIATED GAS COOLER, 2HX-215",
                tag: "HX215",
                location: "Central Processing Platform",
                date: "1/28/2026",
              },
            ]}
          />
        </div>

      </div>

    </div>
  );
}