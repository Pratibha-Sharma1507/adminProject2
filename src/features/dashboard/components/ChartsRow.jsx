const mockTurnout = [42, 51, 48, 55, 62, 59, 68];
const mockSentiment = [
  { label: 'Positive', value: 62, color: 'bg-emerald-500' },
  { label: 'Neutral', value: 23, color: 'bg-slate-400' },
  { label: 'Negative', value: 15, color: 'bg-rose-500' }
];

export default function ChartsRow() {
  const maxTurnout = Math.max(...mockTurnout);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
              Daily booth turnout coverage
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Field visits logged this week across high-priority booths.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-1 text-[10px] text-slate-600 dark:text-slate-300">
            Ward 7–14 focus
          </span>
        </div>
        <div className="relative mt-2 h-40 flex items-end gap-2">
          {mockTurnout.map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1">
              <div className="flex-1 flex items-end w-full">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-primary-600 to-primary-400/90 dark:from-primary-500 dark:to-primary-300/90"
                  style={{ height: `${(val / maxTurnout) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                D{idx + 1}
              </span>
            </div>
          ))}
          <div className="absolute inset-x-0 bottom-6 border-t border-dashed border-slate-200 dark:border-slate-700" />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-4 shadow-sm flex flex-col">
        <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 mb-1">
          Voter sentiment index
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">
          Based on door-to-door feedback, grievance closure quality and social listening.
        </p>
        <div className="space-y-2">
          {mockSentiment.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-300">{item.label}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100">
                  {item.value}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-md bg-slate-50 dark:bg-slate-800/80 px-3 py-2 text-[11px] text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">Action:</span> Focus quick
          grievance resolution in booths with negative sentiment; deploy senior volunteers for follow-up visits.
        </div>
      </div>
    </div>
  );
}


