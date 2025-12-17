export default function SkeletonTable({ rows = 5, columns = 4 }) {
  const rowsArr = Array.from({ length: rows });
  const colsArr = Array.from({ length: columns });
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm animate-pulse">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-xs">
          <thead className="bg-slate-50 dark:bg-slate-900/80">
            <tr>
              {colsArr.map((_, idx) => (
                <th key={idx} className="px-3 py-2 text-left">
                  <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-700" />
                </th>
              ))}
              <th className="px-3 py-2 text-right">
                <div className="h-3 w-10 rounded bg-slate-200 dark:bg-slate-700" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {rowsArr.map((_, rIdx) => (
              <tr key={rIdx}>
                {colsArr.map((__, cIdx) => (
                  <td key={cIdx} className="px-3 py-2">
                    <div className="h-3 w-full max-w-[120px] rounded bg-slate-200 dark:bg-slate-700" />
                  </td>
                ))}
                <td className="px-3 py-2 text-right">
                  <div className="inline-flex gap-1">
                    <div className="h-6 w-10 rounded bg-slate-200 dark:bg-slate-700" />
                    <div className="h-6 w-10 rounded bg-slate-200 dark:bg-slate-700" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


