import { Search, Upload, Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

export default function SystemsPage() {
    const systems = [
        { code: "CPP-WSP", name: "WORKSHOP EQUIPMENT", facility: "Central Processing Platform", status: "Active" },
        { code: "CPP-PRP", name: "PROCESS PIPING", facility: "Central Processing Platform", status: "Active" },
        { code: "CPP-RSR", name: "SUBSEA PIPELINE AND RISERS", facility: "Central Processing Platform", status: "Active" },
        { code: "CPP-WFF", name: "FIRE FIGHTING - WATER", facility: "Central Processing Platform", status: "Active" },
        { code: "CPP-OMT", name: "OIL METERING", facility: "Central Processing Platform", status: "Active" },
        { code: "CPP-OWF", name: "OIL WELL FACILITIES", facility: "Central Processing Platform", status: "Active" },
        { code: "CPP-LNR", name: "LAUNCHER RECEIVER", facility: "Central Processing Platform", status: "Active" },
        { code: "CPP-LVQ", name: "LIVING QUARTERS", facility: "Central Processing Platform", status: "Active" },
        { code: "CPP-CSU", name: "CRUDE SEPARATION UNIT", facility: "Central Processing Platform", status: "Active" },
        { code: "CPP-CRN", name: "CRANE", facility: "Central Processing Platform", status: "Active" },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    Systems Management
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Manage systems and their configurations
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
                            placeholder="Search by name, code, or number..."
                            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <select className="px-4 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                        <select className="px-4 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>All Facilities</option>
                            <option>Central Processing Platform</option>
                        </select>

                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-lg hover:bg-indigo-100 transition-colors">
                            <Upload size={16} />
                            Bulk Upload
                        </button>

                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
                            <Plus size={16} />
                            Add System
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">System Code</th>
                                <th className="px-6 py-4">System Name</th>
                                <th className="px-6 py-4">Facility</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                            {systems.map((sys, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{sys.code}</td>
                                    <td className="px-6 py-4">{sys.name}</td>
                                    <td className="px-6 py-4">{sys.facility}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-600 text-white">
                                            {sys.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
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

                {/* Pagination */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <div>Showing 1 to 10 of 42 systems</div>
                    <div className="flex items-center gap-1">
                        <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"><ChevronLeft size={16} /></button>
                        <button className="px-3 py-1 rounded bg-indigo-600 text-white">1</button>
                        <button className="px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">2</button>
                        <button className="px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">3</button>
                        <button className="px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">4</button>
                        <button className="px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">5</button>
                        <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
