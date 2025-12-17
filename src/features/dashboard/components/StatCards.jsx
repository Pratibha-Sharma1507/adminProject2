const cards = [
  {
    label: 'Registered voters mapped',
    value: '1,24,580',
    delta: '+3.2%',
    deltaLabel: 'vs last week',
    accent: 'from-primary-500/90 to-primary-700/95'
  },
  {
    label: 'Active volunteers',
    value: '842',
    delta: '+68',
    deltaLabel: 'door-to-door today',
    accent: 'from-emerald-500/90 to-emerald-700/95'
  },
  {
    label: 'Campaign events',
    value: '27',
    delta: '5 live',
    deltaLabel: 'this week',
    accent: 'from-accent-500/90 to-accent-600/95'
  },
  {
    label: 'Grievances resolved',
    value: '91%',
    delta: '2.1 days',
    deltaLabel: 'avg. resolution time',
    accent: 'from-sky-500/90 to-sky-700/95'
  }
];

export default function StatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="relative overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-sm"
        >
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r opacity-80" />
          <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${card.accent}`} />
          <div className="px-4 py-3 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {card.label}
              </p>
              <div className="h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-[10px] text-slate-500 dark:text-slate-300">
                ●
              </div>
            </div>
            <div className="flex items-end justify-between gap-2">
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">{card.value}</p>
              <div className="text-right text-[11px]">
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">{card.delta}</p>
                <p className="text-slate-500 dark:text-slate-400">{card.deltaLabel}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


