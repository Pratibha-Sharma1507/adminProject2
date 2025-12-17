import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../components/common/DataTable';
import SearchAndFilter from '../../components/common/SearchAndFilter';
import Pagination from '../../components/common/Pagination';
import Modal from '../../components/common/Modal';
import SkeletonTable from '../../components/common/SkeletonTable';
import { addVoter, updateVoter, deleteVoter } from './votersSlice';

const PAGE_SIZE = 5;

const priorities = [
  { value: 'all', label: 'All priorities' },
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' }
];

export default function VotersPage() {
  const { items } = useSelector((state) => state.voters);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('all');
  const [page, setPage] = useState(1);
  const [loading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: 'Male',
    booth: '',
    phone: '',
    priority: 'Medium'
  });
  const [formError, setFormError] = useState('');

  const filtered = useMemo(() => {
    return items.filter((v) => {
      const matchesSearch =
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.booth.toLowerCase().includes(search.toLowerCase()) ||
        v.phone.toLowerCase().includes(search.toLowerCase());
      const matchesPriority = priority === 'all' ? true : v.priority === priority;
      return matchesSearch && matchesPriority;
    });
  }, [items, search, priority]);

  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const openCreate = () => {
    setEditing(null);
    setForm({
      name: '',
      age: '',
      gender: 'Male',
      booth: '',
      phone: '',
      priority: 'Medium'
    });
    setFormError('');
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setForm({
      name: row.name,
      age: row.age,
      gender: row.gender,
      booth: row.booth,
      phone: row.phone,
      priority: row.priority
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.booth || !form.phone) {
      setFormError('Name, booth and phone are required.');
      return;
    }
    const payload = {
      name: form.name,
      age: Number(form.age) || '',
      gender: form.gender,
      booth: form.booth,
      phone: form.phone,
      priority: form.priority
    };
    if (editing) {
      dispatch(updateVoter({ id: editing.id, updates: payload }));
    } else {
      dispatch(addVoter(payload));
    }
    setModalOpen(false);
  };

  const handleDelete = (row) => {
    if (window.confirm(`Delete voter "${row.name}"?`)) {
      dispatch(deleteVoter(row.id));
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    {
      key: 'gender',
      label: 'Gender'
    },
    { key: 'booth', label: 'Booth' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'priority',
      label: 'Priority',
      render: (value) => (
        <span
          className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
            value === 'High'
              ? 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
              : value === 'Medium'
              ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
              : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
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
            Voter management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Maintain ward &amp; booth-wise voter profiles, priorities and contact history.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center rounded-md bg-primary-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-primary-700"
        >
          + Add voter
        </button>
      </div>

      <SearchAndFilter
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        filterLabel="Priority"
        filterOptions={priorities}
        filterValue={priority}
        onFilterChange={(val) => {
          setPriority(val);
          setPage(1);
        }}
      />

      {loading ? (
        <SkeletonTable rows={5} columns={6} />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={pageData}
            emptyMessage="No voters match your filters."
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
        title={editing ? 'Edit voter' : 'Add new voter'}
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          {formError && (
            <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-1.5 text-[11px] text-rose-700">
              {formError}
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-[11px]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Age</label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-[11px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Gender</label>
              <select
                value={form.gender}
                onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-[11px]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-[11px]"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Booth</label>
            <input
              type="text"
              value={form.booth}
              onChange={(e) => setForm((f) => ({ ...f, booth: e.target.value }))}
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-[11px]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-[11px]"
            />
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
              {editing ? 'Save changes' : 'Create voter'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


