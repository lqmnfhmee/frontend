import { Search, Upload, Plus, Pencil, Trash2 } from "lucide-react";

export default function FacilitiesPage() {
    const facilities = [
        {
            id: "CPP",
            name: "Central Processing Platform",
            code: "CPP",
            status: "Active",
            created: "04/12/2025",
        },
        {
            id: "LRA",
            name: "Larut-A",
            code: "LRA",
            status: "Active",
            created: "04/12/2025",
        },
        {
            id: "SPTA",
            name: "SEPAT-A",
            code: "SPTA",
            location: "SEPAT-A PLATFORM WHSS",
            status: "Active",
            created: "28/01/2026",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    Facilities Management
                </h1>
            </div>

            {/* Toolbar */}
            <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* Left: Search */}
                <div className="relative w-full md:w-80">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Search size={18} />
                    </span>
                    <input
                        type="text"
                        placeholder="Search by name, code, or location..."
                        className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    />
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    {/* Status Filter */}
                    <select className="px-4 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>

                    {/* Buttons */}
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors">
                        <Upload size={16} />
                        Bulk Upload
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
                        <Plus size={16} />
                        Add Facility
                    </button>
                </div>
            </div>

            {/* Facilities Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {facilities.map((facility) => (
                    <div
                        key={facility.id}
                        className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
                    >
                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                    {facility.name}
                                </h3>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-600 text-white">
                                    {facility.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="p-1.5 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-md border border-amber-200 dark:border-amber-500/30 transition-colors">
                                    <Pencil size={16} />
                                </button>
                                <button className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md border border-red-200 dark:border-red-500/30 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-2">
                                <span className="text-slate-400">◆</span>
                                <span>Code: {facility.code}</span>
                            </div>
                            {facility.location && (
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-400">◆</span>
                                    <span>Location: {facility.location}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="text-slate-400">◆</span>
                                <span>Created: {facility.created}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
