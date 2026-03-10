type StatusItem = {
  label: string;
  value: number;
  color: string;
};

type Props = {
  items: StatusItem[];
};

export default function AssetStatusSummary({ items }: Props) {
  return (
    <div className="
      rounded-xl
      bg-white dark:bg-[var(--color-brand-darkCard)]/40
      border border-slate-200 dark:border-[var(--color-brand-darkBorder)]
      divide-y divide-slate-200 dark:divide-slate-800/60
      overflow-hidden
      shadow-md shadow-slate-200/50 dark:shadow-none
    ">
      {items.map((item) => (
        <div
          key={item.label}
          className="
            flex items-center justify-between
            px-4 py-3
            transition-all duration-200
            hover:bg-slate-50 dark:hover:bg-slate-900
          "
        >
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-slate-600 dark:text-slate-300">
              {item.label}
            </span>
          </div>

          {/* VALUE */}
          <span className="font-semibold text-slate-900 dark:text-white">
            {item.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}