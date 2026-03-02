"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, RotateCcw } from "lucide-react";

const facilities = ["All", "LRA", "CPP"];
const assetTypes = ["All", "Vessel", "Piping", "Equipment"];
const riskLevels = ["All", "LOW", "MEDIUM", "HIGH", "VERY_HIGH"];
const dateRanges = ["Last 3 Months", "Last 6 Months", "YTD"];

export default function IntegrityFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [expanded, setExpanded] = useState(false);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "All") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`/integrity?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push("/integrity");
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
      
      {/* Top Row */}
      <div className="flex flex-wrap items-center gap-4">

        <FilterDropdown
          label="Facility"
          options={facilities}
          paramKey="facility"
          updateFilter={updateFilter}
          currentValue={searchParams.get("facility") ?? "All"}
        />

        <FilterDropdown
          label="Date Range"
          options={dateRanges}
          paramKey="date"
          updateFilter={updateFilter}
          currentValue={searchParams.get("date") ?? "Last 3 Months"}
        />

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition"
        >
          {expanded ? "Hide Filters" : "Advanced Filters"}
          <ChevronDown
            size={16}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        <button
          onClick={resetFilters}
          className="ml-auto flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      {/* Collapsible Section */}
      <div
        className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
          expanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            
            <FilterDropdown
              label="Asset Type"
              options={assetTypes}
              paramKey="type"
              updateFilter={updateFilter}
              currentValue={searchParams.get("type") ?? "All"}
            />

            <FilterDropdown
              label="Risk Level"
              options={riskLevels}
              paramKey="risk"
              updateFilter={updateFilter}
              currentValue={searchParams.get("risk") ?? "All"}
            />

          </div>
        </div>
      </div>
    </div>
  );
}

function FilterDropdown({
  label,
  options,
  paramKey,
  updateFilter,
  currentValue,
}: {
  label: string;
  options: string[];
  paramKey: string;
  updateFilter: (key: string, value: string) => void;
  currentValue: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-w-[180px]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-indigo-500 transition"
      >
        <span className="text-slate-600 dark:text-slate-300">
          {label}: <span className="font-medium">{currentValue}</span>
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg z-50 overflow-hidden">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                updateFilter(paramKey, option);
                setOpen(false);
              }}
              className="px-4 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-slate-800 cursor-pointer transition"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}