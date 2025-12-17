import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from './authSlice';
import { mockRequest } from '../../services/apiClient';

const roles = [
  { value: 'admin', label: 'Admin (Full Access)' },
  { value: 'manager', label: 'Campaign Manager' },
  { value: 'staff', label: 'Field Staff' }
];

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@campaign.org');
  const [password, setPassword] = useState('password');
  const [role, setRole] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await mockRequest(
        {
          token: 'mock-jwt-token-123',
          user: {
            id: 1,
            name: 'Hon. A. Candidate',
            email,
            role
          }
        },
        800
      );

      dispatch(loginSuccess(response.data));
      navigate('/app', { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-primary-900 px-4">
      <div className="max-w-4xl w-full grid md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-3 text-slate-100 space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] tracking-wide uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Constituency Intelligence
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Politician <span className="text-primary-300">Admin Panel</span>
          </h1>
          <p className="text-sm text-slate-300 max-w-md">
            Coordinate voter outreach, volunteers, campaigns, funds, media and grievances from a single command
            center. Designed for fast-moving political campaigns.
          </p>
          <div className="hidden md:flex gap-4 text-xs text-slate-300">
            <div className="flex-1 rounded-lg bg-white/5 p-3 border border-white/10 backdrop-blur">
              <p className="font-semibold mb-1">Voter Pulse</p>
              <p className="text-[11px]">
                Track booth-level turnout, sentiment and unresolved issues in real time.
              </p>
            </div>
            <div className="flex-1 rounded-lg bg-white/5 p-3 border border-white/10 backdrop-blur">
              <p className="font-semibold mb-1">Ground Force</p>
              <p className="text-[11px]">
                Orchestrate thousands of volunteers across rallies, door-to-door and digital campaigns.
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white/95 dark:bg-slate-950/95 rounded-xl shadow-xl border border-white/10 p-6 space-y-4"
          >
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                Sign in to command center
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Demo credentials pre-filled. Choose a role to preview access levels.
              </p>
            </div>

            {error && (
              <div className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-[11px] text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 dark:text-slate-200">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/70 focus:border-primary-500"
                placeholder="you@campaign.org"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 dark:text-slate-200">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/70 focus:border-primary-500"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 dark:text-slate-200">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500/70 focus:border-primary-500"
              >
                {roles.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-md bg-primary-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-700 disabled:opacity-70 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Signing in...' : 'Enter Command Center'}
            </button>

            <p className="text-[10px] text-slate-500 text-center">
              By continuing, you agree to maintain confidentiality of voter and volunteer data.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}


