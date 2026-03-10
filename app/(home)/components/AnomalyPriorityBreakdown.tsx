"use client";

export default function AnomalyPriorityBreakdown() {

  const data = {
    P1: { total: 0, active: 0, completed: 0 },
    P2: { total: 5, active: 3, completed: 2 },
    P3: { total: 3, active: 2, completed: 1 },
    P4: { total: 0, active: 0, completed: 0 }
  };

  return (

    <div className="
      rounded-xl p-5
      bg-white dark:bg-[var(--color-brand-darkCard)]
      border border-slate-200 dark:border-[var(--color-brand-darkBorder)]
      shadow-md shadow-slate-200/50 dark:shadow-none
      hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200 dark:hover:shadow-none
      transition-all duration-300
    ">
      <h3 className="relative font-semibold mb-6 text-slate-900 dark:text-slate-100">
        Anomaly Priority Breakdown
        <span className="absolute -bottom-2 left-0 w-12 h-[2px] bg-[var(--color-brand-primary-soft)]0 rounded-full"></span>
      </h3>

      <table className="w-full text-center text-sm border border-slate-400 dark:border-slate-600 border-collapse">

        <thead>

          {/* Priority Title */}
          <tr>
            <th
              colSpan={8}
              className="py-2 font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-400 dark:border-slate-600"
            >
              Priority
            </th>
          </tr>

          {/* Color Row */}
          <tr>

            <th colSpan={2} className="bg-red-500 text-white py-2 border border-slate-400 dark:border-slate-600">
              P1
            </th>

            <th colSpan={2} className="bg-orange-400 text-white py-2 border border-slate-400 dark:border-slate-600">
              P2
            </th>

            <th colSpan={2} className="bg-yellow-400 py-2 border border-slate-400 dark:border-slate-600">
              P3
            </th>

            <th colSpan={2} className="bg-emerald-600 text-white py-2 border border-slate-400 dark:border-slate-600">
              P4
            </th>

          </tr>

          {/* Totals Row */}
          <tr>

            <th colSpan={2} className="py-2 border border-slate-400 dark:border-slate-600">
              {data.P1.total}
            </th>

            <th colSpan={2} className="py-2 border border-slate-400 dark:border-slate-600">
              {data.P2.total}
            </th>

            <th colSpan={2} className="py-2 border border-slate-400 dark:border-slate-600">
              {data.P3.total}
            </th>

            <th colSpan={2} className="py-2 border border-slate-400 dark:border-slate-600">
              {data.P4.total}
            </th>

          </tr>

          {/* Active / Completed Header */}
          <tr className="text-xs text-slate-500 dark:text-slate-400">

            {Array(4).fill(null).map((_, i) => (
              <>
                <th key={`a-${i}`} className="py-2 border border-slate-400 dark:border-slate-600">
                  Active
                </th>
                <th key={`c-${i}`} className="py-2 border border-slate-400 dark:border-slate-600">
                  Completed
                </th>
              </>
            ))}

          </tr>

        </thead>

        <tbody>

          <tr>

            <td className="py-3 border border-slate-400 dark:border-slate-600">
              {data.P1.active}
            </td>
            <td className="py-3 border border-slate-400 dark:border-slate-600">
              {data.P1.completed}
            </td>

            <td className="py-3 border border-slate-400 dark:border-slate-600">
              {data.P2.active}
            </td>
            <td className="py-3 border border-slate-400 dark:border-slate-600">
              {data.P2.completed}
            </td>

            <td className="py-3 border border-slate-400 dark:border-slate-600">
              {data.P3.active}
            </td>
            <td className="py-3 border border-slate-400 dark:border-slate-600">
              {data.P3.completed}
            </td>

            <td className="py-3 border border-slate-400 dark:border-slate-600">
              {data.P4.active}
            </td>
            <td className="py-3 border border-slate-400 dark:border-slate-600">
              {data.P4.completed}
            </td>

          </tr>

        </tbody>

      </table>
      <div className="
        mt-4 rounded-md px-3 py-2 text-xs
        bg-slate-100 dark:bg-slate-800/80
        backdrop-blur-sm
        border border-slate-200 dark:border-[var(--color-brand-darkBorder)]
        text-slate-600 dark:text-slate-300
      ">
        Open: Approved, Office Submitted, Deferred |
        Close: Completed
      </div>

    </div>
  );
}