import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../components/common/DataTable';
import SearchAndFilter from '../../components/common/SearchAndFilter';
import Pagination from '../../components/common/Pagination';
import Modal from '../../components/common/Modal';
import SkeletonTable from '../../components/common/SkeletonTable';
import { addVolunteer, updateVolunteer, deleteVolunteer } from './volunteersSlice';

const PAGE_SIZE = 5;

const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'Active', label: 'Active' },
  { value: 'On Duty', label: 'On Duty' },
  { value: 'Inactive', label: 'Inactive' }
];

export default function VolunteersPage() {
  const { items } = useSelector((state) => state.volunteers);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [loading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    ward: '',
    role: '',
    status: 'Active'
  });
  const [formError, setFormError] = useState('');

  const filtered = useMemo(() => {
    return items.filter((v) => {
      const matchesSearch =
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.phone.toLowerCase().includes(search.toLowerCase()) ||
        v.ward.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === 'all' ? true : v.status === status;
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
      name: '',
      phone: '',
      ward: '',
      role: '',
      status: 'Active'
    });
    setFormError('');
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setForm({
      name: row.name,
      phone: row.phone,
      ward: row.ward,
      role: row.role,
      status: row.status
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.ward) {
      setFormError('Name, phone and ward are required.');
      return;
    }
    const payload = {
      name: form.name,
      phone: form.phone,
      ward: form.ward,
      role: form.role,
      status: form.status
    };
    if (editing) {
      dispatch(updateVolunteer({ id: editing.id, updates: payload }));
    } else {
      dispatch(addVolunteer(payload));
    }
    setModalOpen(false);
  };

  const handleDelete = (row) => {
    if (window.confirm(`Delete volunteer "${row.name}"?`)) {
      dispatch(deleteVolunteer(row.id));
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'ward', label: 'Ward' },
    { key: 'role', label: 'Role' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span
          className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
            value === 'Active'
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
              : value === 'On Duty'
              ? 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300'
              : 'bg-slate-100 text-slate-700 dark:bg-slate-800/80 dark:text-slate-200'
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
            Volunteer management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Organise your ground force by ward, roles and availability.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center rounded-md bg-primary-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-primary-700"
        >
          + Add volunteer
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
            emptyMessage="No volunteers match your filters."
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
        title={editing ? 'Edit volunteer' : 'Add new volunteer'}
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
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-[11px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Ward</label>
              <input
                type="text"
                value={form.ward}
                onChange={(e) => setForm((f) => ({ ...f, ward: e.target.value }))}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-[11px]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Role</label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-[11px]"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-[11px]"
            >
              <option value="Active">Active</option>
              <option value="On Duty">On Duty</option>
              <option value="Inactive">Inactive</option>
            </select>
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
              {editing ? 'Save changes' : 'Create volunteer'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


