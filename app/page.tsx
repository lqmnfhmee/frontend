import RiskExposureScore from "@/app/(home)/components/RiskExposureScore";
import AnomalyPriorityBreakdown from "@/app/(home)/components/AnomalyPriorityBreakdown";
import TotalRiskMatrix from "@/app/(home)/components/TotalRiskMatrix";
import RadialModuleCard from "@/app/(home)/components/RadialModuleCard";

export default function Home() {
  return (
    <div
      className="
        min-h-screen
        flex flex-col
        bg-slate-50
        dark:bg-[var(--color-brand-darkBg)]
        relative
      "
    >
      {/* Subtle Background Glow */}
      <div
        className="
          pointer-events-none
          absolute -top-40 -left-40
          w-[500px] h-[500px]
          bg-[var(--color-brand-primary-soft)]0/10
          blur-[120px]
          rounded-full
          dark:bg-[var(--color-brand-primary)]/15
        "
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 relative z-10">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-8 pt-6 pb-10 space-y-6">

          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Overall Plant Dashboard
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Executive summary across all modules
            </p>
          </div>

          <RiskExposureScore />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnomalyPriorityBreakdown />
            <TotalRiskMatrix />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

            <RadialModuleCard
              title="Asset Management"
              centerLabel="Total Assets"
              centerValue={8357}
              items={[
                { label: "Facilities", value: 3 },
                { label: "Systems", value: 42 },
                { label: "Packages", value: 366 }
              ]}
              buttonLabel="Asset Management Dashboard"
              linkHref="/asset-management"
            />

            <RadialModuleCard
              title="SCE Management"
              centerLabel="Total Equipment"
              centerValue={8357}
              items={[
                { label: "SCE Count", value: 2431 },
                { label: "Not SCE", value: 5892 },
                { label: "Not Assessed", value: 34 }
              ]}
              buttonLabel="SCE Dashboard"
              linkHref="/sce"
            />

            <RadialModuleCard
              title="Anomalies"
              centerLabel="Total Anomaly"
              centerValue={8}
              items={[
                { label: "Active", value: 5 },
                { label: "Completed", value: 3 },
                { label: "Deferred", value: 5 }
              ]}
              buttonLabel="Anomalies Dashboard"
              linkHref="/anomalies"
            />

            <RadialModuleCard
              title="Integrity"
              centerLabel="Total Assessed"
              centerValue={2}
              items={[
                { label: "Vessel", value: 2 },
                { label: "High Risk", value: 0 },
                { label: "Piping", value: 0 }
              ]}
              buttonLabel="Integrity Dashboard"
              linkHref="/integrity"
            />

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-[var(--color-brand-darkBorder)] bg-slate-100/60 dark:bg-[var(--color-brand-darkCard)]/40 backdrop-blur-sm">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-slate-600 dark:text-slate-400">

          <span>
            © {new Date().getFullYear()} EPOMS Global Solution Sdn. Bhd.
          </span>

          <div className="flex items-center gap-4">
            <span>EAIMS Dashboard v1.0</span>
            <span className="hidden md:inline">•</span>
            <span>All rights reserved</span>
          </div>

        </div>
      </footer>
    </div>
  );
}