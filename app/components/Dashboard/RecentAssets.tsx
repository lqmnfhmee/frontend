"use client";

import { Box, ArrowUpRight } from "lucide-react";

type Asset = {
  name: string;
  tag: string;
  location: string;
  date: string;
};

export default function RecentAssets({ data }: { data: Asset[] }) {
  return (
    <div className="
      rounded-xl overflow-hidden
      bg-white dark:bg-slate-900/40
      border border-slate-200 dark:border-slate-800
    ">

      <div className="divide-y divide-slate-200 dark:divide-slate-800/60">
        {data.map((asset, i) => (
          <div
            key={i}
            className="
              group
              p-4
              transition-all duration-300
              hover:bg-slate-50 dark:hover:bg-slate-900
            "
          >
            <div className="flex items-center justify-between">

              {/* LEFT */}
              <div className="flex items-center gap-4">

                <div className="
                  h-10 w-10
                  flex items-center justify-center
                  rounded-lg
                  bg-blue-500/10
                  text-blue-500 dark:text-blue-400
                ">
                  <Box size={18} />
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {asset.name}
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {asset.tag} • {asset.location}
                  </div>
                </div>

              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4">

                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {asset.date}
                </div>

                <ArrowUpRight
                  size={16}
                  className="
                    text-slate-400 dark:text-slate-500
                    opacity-0 group-hover:opacity-100
                    transition
                  "
                />

              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}