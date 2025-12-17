import StatCards from './components/StatCards';
import ActivityStrip from './components/ActivityStrip';
import ChartsRow from './components/ChartsRow';

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Campaign Overview
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Live snapshot of voter outreach, volunteer strength and campaign momentum.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
          <span className="text-slate-500 dark:text-slate-400">
            Updated <span className="font-medium">2 min ago</span>
          </span>
        </div>
      </div>

      <StatCards />
      <ChartsRow />
      <ActivityStrip />
    </div>
  );
}


