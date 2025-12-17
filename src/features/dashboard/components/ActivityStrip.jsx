const activities = [
  {
    type: 'event',
    title: 'Town hall meeting',
    location: 'Ward 9 Community Center',
    time: 'Starts in 45 mins'
  },
  {
    type: 'volunteer',
    title: 'New volunteers onboarded',
    location: 'Booth 42–47',
    time: '+32 today'
  },
  {
    type: 'grievance',
    title: 'Water supply issue escalated',
    location: 'Ward 12, Street 4',
    time: 'Pending resolution'
  }
];

const colors = {
  event: 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-primary-100 dark:border-primary-900',
  volunteer:
    'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-900',
  grievance:
    'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border-rose-100 dark:border-rose-900'
};

export default function ActivityStrip() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {activities.map((item) => (
        <div
          key={item.title}
          className={`rounded-lg border px-3 py-2.5 text-[11px] flex flex-col gap-1 ${colors[item.type]}`}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold truncate">{item.title}</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/60 dark:bg-slate-950/40 px-2 py-0.5 text-[10px] uppercase tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {item.type}
            </span>
          </div>
          <p className="text-[11px] opacity-80 truncate">{item.location}</p>
          <p className="text-[11px] font-medium opacity-90">{item.time}</p>
        </div>
      ))}
    </div>
  );
}


