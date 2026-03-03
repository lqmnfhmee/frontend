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
      rounded-xl p-5
      bg-white dark:bg-slate-900
      border border-slate-200 dark:border-slate-800
      shadow-md shadow-slate-200/50 dark:shadow-none
      hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200 dark:hover:shadow-none
      transition-all duration-300
    ">

      <h3 className="relative font-semibold mb-6 text-slate-900 dark:text-slate-100">
        Total Risk Matrix
        <span className="absolute -bottom-2 left-0 w-12 h-[2px] bg-indigo-500 rounded-full"></span>
      </h3>

      <table className="w-full table-fixed text-center text-sm border border-slate-300 dark:border-slate-700">

        <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700">

          <tr>
            <th className="w-16 py-2 text-xs text-slate-500 dark:text-slate-400 border-r border-slate-300 dark:border-slate-700">
              POF/COF
            </th>

            {columns.map(col => (
              <th
                key={col}
                className="py-2 border-r last:border-r-0 border-slate-300 dark:border-slate-700"
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

              <tr key={rowIndex} className="border-t border-slate-300 dark:border-slate-700">

                {/* LEFT LABEL COLUMN */}
                <td
                  className="
              w-16 py-2 font-semibold
              text-slate-600 dark:text-slate-400
              border-r border-slate-300 dark:border-slate-700
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
                border-slate-300 dark:border-slate-700
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

      <div className="flex justify-center gap-6 text-xs mt-5 text-slate-600 dark:text-slate-300">

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