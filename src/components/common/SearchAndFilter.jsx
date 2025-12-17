export default function SearchAndFilter({
  search,
  onSearchChange,
  filterLabel,
  filterOptions,
  filterValue,
  onFilterChange,
  rightSlot
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
      <div className="flex flex-1 gap-2">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute inset-y-0 left-2 flex items-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8.5 3.5a5 5 0 013.98 8.09l3.215 3.215a.75.75 0 11-1.06 1.06l-3.215-3.214A5 5 0 118.5 3.5zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-7 pr-2 py-1.5 text-xs text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/70 focus:border-primary-500"
          />
        </div>
        {filterOptions?.length ? (
          <div className="flex items-center gap-1">
            <label className="text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{filterLabel}</label>
            <select
              value={filterValue}
              onChange={(e) => onFilterChange(e.target.value)}
              className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-[11px] text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500/70 focus:border-primary-500"
            >
              {filterOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>
      {rightSlot ? <div className="flex justify-end">{rightSlot}</div> : null}
    </div>
  );
}


