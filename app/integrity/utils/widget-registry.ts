/**
 * Widget registry for the Integrity Dashboard.
 *
 * Add / remove entries here to change what appears in the Customize modal.
 * The `id` must match the string used in `isEnabled(id)` calls on the page.
 */

export type WidgetSection =
    | "Integrity Overview"
    | "Operational Status"
    | "Integrity Analytics"
    | "Integrity Monitoring"
    | "Program Performance";

export interface WidgetDef {
    id: string;
    title: string;
    description: string;
    section: WidgetSection;
    defaultEnabled: boolean;
}

/** Ordered list of sections as they appear on the dashboard. */
export const SECTIONS: WidgetSection[] = [
    "Integrity Overview",
    "Operational Status",
    "Integrity Analytics",
    "Integrity Monitoring",
    "Program Performance",
];

export const WIDGET_REGISTRY: WidgetDef[] = [
    // ── Integrity Overview ──────────────────────────────────────────────────────
    {
        id: "integrity-score",
        title: "Plant Integrity Score",
        description:
            "Overall integrity score gauge with status label, score ranges, and interactive breakdown drawer.",
        section: "Integrity Overview",
        defaultEnabled: true,
    },

    // ── Operational Status ──────────────────────────────────────────────────────
    {
        id: "stat-high-risk",
        title: "High Risk Equipment",
        description:
            "Count of equipment items flagged as high-risk in the latest RBI assessment.",
        section: "Operational Status",
        defaultEnabled: true,
    },
    {
        id: "stat-inspections-due",
        title: "Inspections Due Soon",
        description:
            "Number of inspections scheduled in the next 30 days, including overdue count.",
        section: "Operational Status",
        defaultEnabled: true,
    },
    {
        id: "stat-open-anomalies",
        title: "Open Anomalies",
        description:
            "Total open anomalies with a breakdown of critical P1/P2 priority items.",
        section: "Operational Status",
        defaultEnabled: true,
    },
    {
        id: "stat-remaining-life",
        title: "Low Remaining Life",
        description:
            "Assets with a remaining service life under 3 years requiring attention.",
        section: "Operational Status",
        defaultEnabled: true,
    },

    // ── Integrity Analytics ─────────────────────────────────────────────────────
    {
        id: "risk-distribution",
        title: "Risk Distribution Matrix",
        description:
            "5×5 POF/COF risk matrix showing equipment count per cell, with Total / Vessel / Piping tabs.",
        section: "Integrity Analytics",
        defaultEnabled: true,
    },
    {
        id: "inspection-compliance",
        title: "Inspection Compliance",
        description:
            "Animated donut chart breaking down inspection status: Completed, Scheduled, Due Soon, Overdue.",
        section: "Integrity Analytics",
        defaultEnabled: true,
    },

    // ── Integrity Monitoring ────────────────────────────────────────────────────
    {
        id: "inspection-timeline",
        title: "Upcoming Inspection Timeline",
        description:
            "Bar chart grouping upcoming inspections by schedule window (weeks / 90–180 days).",
        section: "Integrity Monitoring",
        defaultEnabled: true,
    },
    {
        id: "anomaly-priority",
        title: "Anomaly Priority Distribution",
        description:
            "Table showing active and completed anomaly counts across P1–P4 priority levels.",
        section: "Integrity Monitoring",
        defaultEnabled: true,
    },

    {
        id: "integrity-alerts",
        title: "Integrity Alerts",
        description:
            "Live alert feed highlighting high-risk, overdue, and attention items with severity labels.",
        section: "Program Performance",
        defaultEnabled: true,
    },
];
