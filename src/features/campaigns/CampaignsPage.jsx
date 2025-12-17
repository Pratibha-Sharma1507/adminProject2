import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../components/common/DataTable';
import SearchAndFilter from '../../components/common/SearchAndFilter';
import Pagination from '../../components/common/Pagination';
import Modal from '../../components/common/Modal';
import SkeletonTable from '../../components/common/SkeletonTable';
import { addCampaign, updateCampaign, deleteCampaign } from './campaignsSlice';

const PAGE_SIZE = 5;

const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'Planned', label: 'Planned' },
  { value: 'Scheduled', label: 'Scheduled' },
  { value: 'Ongoing', label: 'Ongoing' },
  { value: 'Completed', label: 'Completed' }
];

export default function CampaignsPage() {
  const { items } = useSelector((state) => state.campaigns);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [loading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '',
    type: '',
    ward: '',
    date: '',
    status: 'Planned'
  });
  const [formError, setFormError] = useState('');

  const filtered = useMemo(() => {
    return items.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.ward.toLowerCase().includes(search.toLowerCase()) ||
        c.type.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === 'all' ? true : c.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [items, search, status]);

  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const openCreate = () => {
    setEditing(null);
    setForm({
      title: '',
      type: '',
      ward: '',
      date: '',
      status: 'Planned'
    });
    setFormError('');
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setForm({
      title: row.title,
      type: row.type,
      ward: row.ward,
      date: row.date,
      status: row.status
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.ward || !form.date) {
      setFormError('Title, ward and date are required.');
      return;
    }
    const payload = {
      title: form.title,
      type: form.type,
      ward: form.ward,
      date: form.date,
      status: form.status
    };
    if (editing) {
      dispatch(updateCampaign({ id: editing.id, updates: payload }));
    } else {
      dispatch(addCampaign(payload));
    }
    setModalOpen(false);
  };

  const handleDelete = (row) => {
    if (window.confirm(`Delete campaign "${row.title}"?`)) {
      dispatch(deleteCampaign(row.id));
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'type', label: 'Type' },
    { key: 'ward', label: 'Ward' },
    {
      key: 'date',
      label: 'Date',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span
          className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
            value === 'Ongoing'
              ? 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300'
              : value === 'Completed'
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
              : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
          }`}
        >
          {value}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Campaign &amp; event management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Plan rallies, townhalls and door-to-door drives with clear ownership.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center rounded-md bg-primary-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-primary-700"
        >
          + Add campaign
        </button>
      </div>

      <SearchAndFilter
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        filterLabel="Status"
        filterOptions={statusOptions}
        filterValue={status}
        onFilterChange={(val) => {
          setStatus(val);
          setPage(1);
        }}
      />

      {loading ? (
        <SkeletonTable rows={5} columns={5} />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={pageData}
            emptyMessage="No campaigns match your filters."
            renderActions={(row) => (
              <>
                <button
                  type="button"
                  onClick={() => openEdit(row)}
                  className="px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(row)}
                  className="px-2 py-1 rounded-md border border-rose-200 dark:border-rose-800 text-[11px] text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/40"
                >
                  Delete
                </button>
              </>
            )}
          />
          <Pagination page={page} pageSize={PAGE_SIZE} total={filtered.length} onPageChange={setPage} />
        </>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit campaign' : 'Add new campaign'}
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          {formError && (
            <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-1.5 text-[11px] text-rose-700">
              {formError}
            </div>
          )}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-[11px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Type</label>
              <input
                type="text"
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-[11px]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Ward</label>
              <input
                type="text"
                value={form.ward}
                onChange={(e) => setForm((f) => ({ ...f, ward: e.target.value }))}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-[11px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-[11px]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-[11px]"
              >
                <option value="Planned">Planned</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-3 py-1.5 text-[11px] rounded-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-[11px] rounded-md bg-primary-600 text-white hover:bg-primary-700"
            >
              {editing ? 'Save changes' : 'Create campaign'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


