"use client";

export default function TotalRiskMatrix() {

  const matrix = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0]
  ];

  const columns = ["A", "B", "C", "D", "E"];

  const getColor = (row: number, col: number) => {

    const colorMap = [

      [
        "bg-yellow-400",
        "bg-orange-400 text-white",
        "bg-red-500 text-white",
        "bg-red-500 text-white",
        "bg-red-500 text-white"
      ],

      [
        "bg-green-600 text-white",
        "bg-yellow-400",
        "bg-orange-400 text-white",
        "bg-red-500 text-white",
        "bg-red-500 text-white"
      ],

      [
        "bg-green-600 text-white",
        "bg-green-600 text-white",
        "bg-yellow-400",
        "bg-orange-400 text-white",
        "bg-red-500 text-white"
      ],

      [
        "bg-green-600 text-white",
        "bg-green-600 text-white",
        "bg-green-600 text-white",
        "bg-yellow-400",
        "bg-orange-400 text-white"
      ],

      [
        "bg-green-600 text-white",
        "bg-green-600 text-white",
        "bg-green-600 text-white",
        "bg-green-600 text-white",
        "bg-yellow-400"
      ]
    ];

    return colorMap[row][col];
  };

  return (

    <div className="
      rounded-xl p-4 sm:p-5
      bg-white dark:bg-[var(--color-brand-darkCard)]
      border border-slate-200 dark:border-[var(--color-brand-darkBorder)]
      shadow-md shadow-slate-200/50 dark:shadow-none
      hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-none
      transition-all duration-300
      cursor-pointer
    ">

      <h3 className="relative font-semibold mb-6 text-slate-900 dark:text-slate-100">
        Total Risk Matrix
        <span className="absolute -bottom-2 left-0 w-12 h-[2px] bg-[var(--color-brand-primary-soft)]0 rounded-full"></span>
      </h3>

      <div className="overflow-x-auto -mx-1 px-1">
      <table className="w-full min-w-[280px] table-fixed text-center text-sm border border-slate-300 dark:border-[var(--color-brand-darkBorder)]">

        <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-300 dark:border-[var(--color-brand-darkBorder)]">

          <tr>
            <th className="w-16 py-2 text-xs text-slate-500 dark:text-slate-400 border-r border-slate-300 dark:border-[var(--color-brand-darkBorder)]">
              POF/COF
            </th>

            {columns.map(col => (
              <th
                key={col}
                className="py-2 border-r last:border-r-0 border-slate-300 dark:border-[var(--color-brand-darkBorder)]"
              >
                {col}
              </th>
            ))}
          </tr>

        </thead>

        <tbody>

          {matrix.map((row, rowIndex) => {

            const label = 5 - rowIndex;

            return (

              <tr key={rowIndex} className="border-t border-slate-300 dark:border-[var(--color-brand-darkBorder)]">

                {/* LEFT LABEL COLUMN */}
                <td
                  className="
              w-16 py-2 font-semibold
              text-slate-600 dark:text-slate-400
              border-r border-slate-300 dark:border-[var(--color-brand-darkBorder)]
            "
                >
                  {label}
                </td>

                {row.map((cell, colIndex) => (

                  <td
                    key={colIndex}
                    className={`
                py-4 font-bold
                border-r last:border-r-0
                border-slate-300 dark:border-[var(--color-brand-darkBorder)]
                ${getColor(rowIndex, colIndex)}
                transition-transform duration-200
                hover:scale-105
              `}
                  >
                    {cell}
                  </td>

                ))}

              </tr>

            );

          })}

        </tbody>

      </table>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-xs mt-5 text-slate-600 dark:text-slate-300">

        {[
          { label: "Low", color: "bg-green-600" },
          { label: "Medium", color: "bg-yellow-500" },
          { label: "High", color: "bg-orange-500" },
          { label: "Very High", color: "bg-red-600" }
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${item.color}`}></div>
            {item.label}
          </div>
        ))}

      </div>

    </div>
  );
}