export default function PlaceholderPage({ title }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center text-slate-500 dark:text-slate-400">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
        <span className="text-xl">🚧</span>
      </div>
      <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-1">
        {title} – coming soon
      </h2>
      <p className="text-xs max-w-md">
        This module will provide detailed controls for <span className="font-medium lowercase">{title}</span>, with
        advanced filters, analytics and campaign-ready workflows.
      </p>
    </div>
  );
}


