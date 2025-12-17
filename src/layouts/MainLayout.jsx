import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useMemo } from 'react';
import { logout } from '../features/auth/authSlice';
import { useTheme } from '../hooks/useTheme';
import Sidebar from '../components/layout/Sidebar';

function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean).slice(1); // skip "app"

  const crumbs = useMemo(() => {
    const mapping = {
      dashboard: 'Dashboard',
      voters: 'Voter Management',
      volunteers: 'Volunteer Management',
      campaigns: 'Campaign & Event Management',
      funds: 'Fund Management',
      grievances: 'Grievance & Feedback',
      analytics: 'Analytics & Reports',
      media: 'Media & Content Management',
      settings: 'Settings'
    };

    const paths = [];
    let currentPath = '/app';
    segments.forEach((seg) => {
      currentPath += `/${seg}`;
      paths.push({
        name: mapping[seg] || seg[0]?.toUpperCase() + seg.slice(1),
        path: currentPath
      });
    });
    return paths;
  }, [segments]);

  if (!crumbs.length) {
    return (
      <nav className="text-xs text-slate-500 dark:text-slate-400">
        <span>Dashboard</span>
      </nav>
    );
  }

  return (
    <nav className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
      <Link to="/app" className="hover:text-primary-500">
        Dashboard
      </Link>
      <span>/</span>
      {crumbs.map((crumb, idx) => (
        <span key={crumb.path} className="flex items-center gap-1">
          {idx < crumbs.length - 1 ? (
            <>
              <Link to={crumb.path} className="hover:text-primary-500">
                {crumb.name}
              </Link>
              <span>/</span>
            </>
          ) : (
            <span className="font-medium text-slate-700 dark:text-slate-200">{crumb.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />

      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-14 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex md:hidden items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <span className="sr-only">Toggle navigation</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Breadcrumbs />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707 8.001 8.001 0 1017.293 13.293z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3.5a1 1 0 011 1V6a1 1 0 11-2 0V4.5a1 1 0 011-1zM10 12a2 2 0 100-4 2 2 0 000 4zM4.636 5.636a1 1 0 011.414 0L7 6.586A1 1 0 015.586 8L4.636 7.05a1 1 0 010-1.414zM3.5 10a1 1 0 011-1H6a1 1 0 110 2H4.5a1 1 0 01-1-1zm1.136 4.364A1 1 0 015.586 13L7 14.414A1 1 0 015.586 15.83l-0.95-0.95a1 1 0 010-1.414zM10 14a1 1 0 011 1v1.5a1 1 0 11-2 0V15a1 1 0 011-1zm4.414-1a1 1 0 011.414 0l0.95 0.95A1 1 0 0115.83 15.83L14.414 14.414A1 1 0 0114.414 13zM14 10a1 1 0 011-1h1.5a1 1 0 110 2H15a1 1 0 01-1-1zm-8 0a1 1 0 011-1h1.5a1 1 0 110 2H7a1 1 0 01-1-1z" />
                </svg>
              )}
            </button>
            <div className="hidden sm:flex flex-col items-end text-xs leading-tight">
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                {user?.name ?? 'Campaign Admin'}
              </span>
              <span className="uppercase tracking-wide text-[10px] text-primary-600 dark:text-primary-400">
                {user?.role ?? 'admin'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1 rounded-md bg-primary-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-primary-700 transition"
            >
              <span>Logout</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6 scrollbar-thin">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


