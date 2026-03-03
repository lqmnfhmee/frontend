import { Search, Plus, Pencil, Trash2 } from "lucide-react";

export default function AssetGroupsPage() {
    const groups = [
        { name: "Civil Infrastructure", desc: "Buildings, structures, roads, and civil engineering assets" },
        { name: "Electrical Systems", desc: "Electrical equipment including panels, transformers, and control systems" },
        { name: "HVAC Systems", desc: "Heating, ventilation, and air conditioning systems" },
        { name: "Instrumentation", desc: "Measurement and control instruments, sensors, and monitoring devices" },
        { name: "Piping Systems", desc: "Piping networks, valves, and fluid handling systems" },
        { name: "Process Equipment", desc: "Main process equipment for production operations" },
        { name: "Rotating Equipment", desc: "Equipment with rotating mechanical parts like pumps, compressors, and motors" },
        { name: "Safety Systems", desc: "Safety-related equipment including fire systems, emergency shutdown devices" },
        { name: "Static Equipment", desc: "Non-moving equipment such as vessels, tanks, and heat exchangers" },
        { name: "Utilities", desc: "Utility equipment like air compressors, cooling systems, and generators" },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    Asset Group Management
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Manage asset groups for classification
                </p>
            </div>

            {/* Toolbar & Table Card */}
            <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">

                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">
                    {/* Search */}
                    <div className="relative w-full md:max-w-md">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Search size={18} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search by name or description..."
                            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
                            <Plus size={16} />
                            Add Asset Group
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                            {groups.map((grp, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400">{grp.name}</td>
                                    <td className="px-6 py-4 text-indigo-600 dark:text-indigo-400">{grp.desc}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 text-slate-400">
                                            <button className="p-1.5 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-md border border-amber-200 dark:border-amber-500/30 transition-colors">
                                                <Pencil size={16} />
                                            </button>
                                            <button className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md border border-red-200 dark:border-red-500/30 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
