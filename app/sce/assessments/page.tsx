import { Search, Upload, Eye, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export default function SCEAssessmentsPage() {
    const equipments = [
        { tag: "FDGD366", name: "(TOS)DAMPER, FIRE, ENCL, GD-366, ALL", type: "—", system: "POWER GENERATION\nCPP-PWG", package: "MAIN GENERATOR #3\n—", status: "SCE", group: "IC001" },
        { tag: "FD3305A", name: "(TOS)DETECTOR, FLAME UV, G-366", type: "—", system: "FIRE & GAS SYSTEM\nCPP-FNG", package: "UV / INFRA RED FLAME DETECTORS\n—", status: "SCE", group: "PC003" },
        { tag: "FD3305B", name: "(TOS)DETECTOR, FLAME UV, G-366", type: "—", system: "FIRE & GAS SYSTEM\nCPP-FNG", package: "UV / INFRA RED FLAME DETECTORS\n—", status: "SCE", group: "PC003" },
        { tag: "FD3305C", name: "(TOS)DETECTOR, FLAME UV, G-366", type: "—", system: "FIRE & GAS SYSTEM\nCPP-FNG", package: "UV / INFRA RED FLAME DETECTORS\n—", status: "SCE", group: "PC003" },
        { tag: "FD3305D", name: "(TOS)DETECTOR, FLAME UV, G-366", type: "—", system: "FIRE & GAS SYSTEM\nCPP-FNG", package: "UV / INFRA RED FLAME DETECTORS\n—", status: "SCE", group: "PC003" },
        { tag: "GD3301", name: "(TOS)DETECTOR, GAS, G-366", type: "—", system: "FIRE & GAS SYSTEM\nCPP-FNG", package: "GAS DETECTORS\n—", status: "SCE", group: "PC003" },
        { tag: "GD3302", name: "(TOS)DETECTOR, GAS, G-366", type: "—", system: "FIRE & GAS SYSTEM\nCPP-FNG", package: "GAS DETECTORS\n—", status: "SCE", group: "PC003" },
        { tag: "GD3303", name: "(TOS)DETECTOR, GAS, G-366", type: "—", system: "FIRE & GAS SYSTEM\nCPP-FNG", package: "GAS DETECTORS\n—", status: "SCE", group: "PC003" },
        { tag: "GD3304", name: "(TOS)DETECTOR, GAS, G-366", type: "—", system: "FIRE & GAS SYSTEM\nCPP-FNG", package: "GAS DETECTORS\n—", status: "SCE", group: "PC003" },
        { tag: "GD3305", name: "(TOS)DETECTOR, GAS, G-366", type: "—", system: "FIRE & GAS SYSTEM\nCPP-FNG", package: "GAS DETECTORS\n—", status: "SCE", group: "PC003" },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    SCE Assessments
                </h1>
            </div>

            {/* Main Container Card */}
            <div className="bg-white dark:bg-[var(--color-brand-darkBg)] rounded-xl border border-slate-200 dark:border-[var(--color-brand-darkBorder)] shadow-md shadow-slate-200/50 dark:shadow-none overflow-hidden min-h-[calc(100vh-140px)] flex flex-col">

                {/* Card Header */}
                <div className="p-4 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Equipment Summary</h2>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--color-brand-primary)] bg-white dark:bg-[var(--color-brand-darkCard)] border border-[var(--color-brand-primary-soft)] dark:border-[var(--color-brand-primary)] rounded-lg hover:bg-slate-50 dark:hover:bg-[var(--color-brand-darkHover)] transition-colors">
                        <Upload size={16} />
                        Bulk Upload
                    </button>
                </div>

                {/* Toolbar (Filters) */}
                <div className="p-4 border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)] flex flex-wrap gap-4 items-center bg-slate-50/50 dark:bg-[var(--color-brand-darkCard)]/20">

                    {/* Search */}
                    <div className="relative flex-1 min-w-[250px]">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Search size={16} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search by tag, name, type, system, package, or group..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg bg-white dark:bg-[var(--color-brand-darkBg)] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
                        />
                    </div>

                    {/* Dropdown Filters */}
                    <div className="flex gap-4 flex-wrap">
                        {['All Types', 'All Systems', 'All Packages', 'All Status', 'All Groups'].map((filter, idx) => (
                            <div key={idx} className="relative">
                                <select className="appearance-none pl-4 pr-10 py-2 text-sm border border-slate-200 dark:border-[var(--color-brand-darkBorder)] rounded-lg bg-white dark:bg-[var(--color-brand-darkBg)] text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer min-w-[130px]">
                                    <option>{filter}</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 flex items-center gap-1">
                                    <span className="text-xs">×</span>
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Data Table */}
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 dark:bg-[var(--color-brand-darkCard)]/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-[var(--color-brand-darkBorder)]">
                            <tr>
                                <th className="px-6 py-4 whitespace-nowrap">Equipment Tag</th>
                                <th className="px-6 py-4">Equipment Name</th>
                                <th className="px-6 py-4">Equipment Type</th>
                                <th className="px-6 py-4">System</th>
                                <th className="px-6 py-4">Package</th>
                                <th className="px-6 py-4 text-center">SCE Status</th>
                                <th className="px-6 py-4">SCE Group</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                            {equipments.map((item, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-400 whitespace-nowrap">{item.tag}</td>
                                    <td className="px-6 py-4 text-[var(--color-brand-primary)] dark:text-[var(--color-brand-primary)] font-medium min-w-[250px]">{item.name}</td>
                                    <td className="px-6 py-4">{item.type}</td>

                                    {/* Multiline cells (System/Package) */}
                                    <td className="px-6 py-4">
                                        {item.system.split('\n').map((line, i) => (
                                            <div key={i} className={i === 0 ? "text-[var(--color-brand-primary)] dark:text-[var(--color-brand-primary)] font-medium whitespace-nowrap" : "text-slate-400 text-xs mt-1"}>
                                                {line}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.package.split('\n').map((line, i) => (
                                            <div key={i} className={i === 0 ? "text-[var(--color-brand-primary)] dark:text-[var(--color-brand-primary)] font-medium whitespace-nowrap" : "text-slate-400 text-xs mt-1"}>
                                                {line}
                                            </div>
                                        ))}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-sm">
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{item.group}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end">
                                            <button className="p-1.5 text-[var(--color-brand-primary)] hover:bg-slate-100 dark:hover:bg-[var(--color-brand-darkHover)] rounded-md border border-slate-200 dark:border-[var(--color-brand-darkBorder)] transition-colors">
                                                <Eye size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="p-4 border-t border-slate-200 dark:border-[var(--color-brand-darkBorder)] flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-[var(--color-brand-darkBg)] mt-auto">
                    <div>Showing 1 to 10 of 1000 equipment</div>
                    <div className="flex items-center gap-1">
                        <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-[var(--color-brand-darkHover)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] mr-1 disabled:opacity-50"><ChevronLeft size={16} /></button>
                        <button className="px-3 py-1 rounded bg-[var(--color-brand-primary)] text-white font-medium">1</button>
                        <button className="px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-[var(--color-brand-darkHover)] text-[var(--color-brand-primary)] dark:text-[var(--color-brand-primary)] font-medium border border-slate-200 dark:border-[var(--color-brand-darkBorder)]">2</button>
                        <button className="px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-[var(--color-brand-darkHover)] text-[var(--color-brand-primary)] dark:text-[var(--color-brand-primary)] font-medium border border-slate-200 dark:border-[var(--color-brand-darkBorder)]">3</button>
                        <span className="px-2 font-medium">...</span>
                        <button className="px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-[var(--color-brand-darkHover)] text-[var(--color-brand-primary)] dark:text-[var(--color-brand-primary)] font-medium border border-slate-200 dark:border-[var(--color-brand-darkBorder)]">100</button>
                        <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-[var(--color-brand-darkHover)] border border-slate-200 dark:border-[var(--color-brand-darkBorder)] ml-1"><ChevronRight size={16} /></button>
                    </div>
                </div>

            </div>
        </div>
    );
}
