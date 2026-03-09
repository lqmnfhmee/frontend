/**
 * Dashboard widget preference persistence.
 *
 * Currently backed by localStorage.
 * To swap to an API, replace the three functions below — the call-sites
 * in the page component remain identical.
 *
 * Shape: { [widgetId: string]: boolean }
 * true  = widget is shown  (default)
 * false = widget is hidden
 */

const STORAGE_KEY = "integrity-dashboard-prefs";

/**
 * Load saved widget preferences.
 * Returns an empty object if nothing is saved yet
 * (callers fall back to `defaultEnabled` from the registry).
 */
export function loadPreferences(): Record<string, boolean> {
    if (typeof window === "undefined") return {};
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        return JSON.parse(raw) as Record<string, boolean>;
    } catch {
        return {};
    }
}

/**
 * Persist widget preferences.
 */
export function savePreferences(prefs: Record<string, boolean>): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
        // Storage quota exceeded — silently ignore
    }
}

/**
 * Clear saved preferences so the dashboard reverts to its defaults.
 */
export function resetPreferences(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
}
