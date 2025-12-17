export default function Pagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex items-center justify-between mt-3 text-[11px] text-slate-500 dark:text-slate-400">
      <p>
        Showing <span className="font-semibold">{(page - 1) * pageSize + 1}</span>-
        <span className="font-semibold">{Math.min(page * pageSize, total)}</span> of{' '}
        <span className="font-semibold">{total}</span> records
      </p>
      <div className="inline-flex items-center gap-1">
        <button
          type="button"
          disabled={!canPrev}
          onClick={() => canPrev && onPageChange(page - 1)}
          className="px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          Prev
        </button>
        <span className="px-2">
          Page <span className="font-semibold">{page}</span> / {totalPages}
        </span>
        <button
          type="button"
          disabled={!canNext}
          onClick={() => canNext && onPageChange(page + 1)}
          className="px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          Next
        </button>
      </div>
    </div>
  );
}


