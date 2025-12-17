import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

// Minimal Heroicons-style SVG icons for a professional look
const iconClass = 'h-4 w-4';

const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={iconClass}>
    <path
      d="M3.75 4.5A2.25 2.25 0 0 1 6 2.25h3A2.25 2.25 0 0 1 11.25 4.5v3A2.25 2.25 0 0 1 9 9.75H6A2.25 2.25 0 0 1 3.75 7.5v-3Z"
      className="fill-current opacity-90"
    />
    <path
      d="M12.75 4.5A2.25 2.25 0 0 1 15 2.25h3A2.25 2.25 0 0 1 20.25 4.5v3A2.25 2.25 0 0 1 18 9.75h-3a2.25 2.25 0 0 1-2.25-2.25v-3Z"
      className="fill-current opacity-80"
    />
    <path
      d="M3.75 13.5A2.25 2.25 0 0 1 6 11.25h3A2.25 2.25 0 0 1 11.25 13.5v3A2.25 2.25 0 0 1 9 18.75H6A2.25 2.25 0 0 1 3.75 16.5v-3Z"
      className="fill-current opacity-80"
    />
    <path
      d="M12.75 13.5A2.25 2.25 0 0 1 15 11.25h3A2.25 2.25 0 0 1 20.25 13.5v3A2.25 2.25 0 0 1 18 18.75h-3a2.25 2.25 0 0 1-2.25-2.25v-3Z"
      className="fill-current opacity-90"
    />
  </svg>
);

const VoterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={iconClass}>
    <path
      d="M9 3.75a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Z"
      className="fill-current opacity-90"
    />
    <path
      d="M3.75 18.5A5.75 5.75 0 0 1 9.5 12.75h-.5a5.75 5.75 0 0 0-5.75 5.75v.75c0 .414.336.75.75.75H12"
      className="stroke-current opacity-90"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M14.25 10.5h4.19c.58 0 .94.63.64 1.13l-2.1 3.5a.75.75 0 0 1-1.28 0l-.67-1.12-.8 1.34a.75.75 0 0 1-1.28 0l-1.12-1.87"
      className="stroke-current"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const VolunteerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={iconClass}>
    <path
      d="M7.5 7.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"
      className="fill-current opacity-90"
    />
    <path
      d="M4.5 17.25A3.75 3.75 0 0 1 8.25 13.5h1.5A3.75 3.75 0 0 1 13.5 17.25v1.5a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75v-1.5Z"
      className="stroke-current opacity-90"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M15.75 6.75a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Z"
      className="fill-current opacity-80"
    />
    <path
      d="M15.75 12.75h1.125A2.625 2.625 0 0 1 19.5 15.375V18"
      className="stroke-current opacity-80"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const CampaignIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={iconClass}>
    <path
      d="M5.25 5.25 12 3.25l6.75 2v12.5L12 15.75l-6.75 2V5.25Z"
      className="stroke-current opacity-90"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 7.25 9.75 9.5l1.5 1.5L15 7.25"
      className="stroke-current opacity-90"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FundsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={iconClass}>
    <path
      d="M4.5 7.5A2.25 2.25 0 0 1 6.75 5.25h10.5A2.25 2.25 0 0 1 19.5 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-12"
      className="stroke-current opacity-90"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.5 9.75h9A1.5 1.5 0 0 1 15 11.25v3a1.5 1.5 0 0 1-1.5 1.5h-9V9.75Z"
      className="stroke-current opacity-90"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 12.75h.007v.007H12v-.007Z"
      className="stroke-current"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GrievanceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={iconClass}>
    <path
      d="M4.5 6.75A2.25 2.25 0 0 1 6.75 4.5h10.5A2.25 2.25 0 0 1 19.5 6.75v10.5a.75.75 0 0 1-1.2.6L15 15.75H6.75A2.25 2.25 0 0 1 4.5 13.5v-6.75Z"
      className="stroke-current opacity-90"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AnalyticsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={iconClass}>
    <path
      d="M4.5 19.5h15"
      className="stroke-current opacity-90"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M6.75 16.5v-6M12 16.5V7.5M17.25 16.5v-9"
      className="stroke-current opacity-90"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const MediaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={iconClass}>
    <path
      d="M5.25 5.25h13.5v13.5H5.25V5.25Z"
      className="stroke-current opacity-90"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.25 9.75h7.5M8.25 12.75h4.5M8.25 15.75h3"
      className="stroke-current opacity-90"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={iconClass}>
    <path
      d="M10.5 3.75h3l.53 2.12a1 1 0 0 0 .63.72l1.95.73 1.5-1.5 2.12 2.12-1.5 1.5.73 1.95a1 1 0 0 0 .72.63L21.75 13.5v3l-2.12.53a1 1 0 0 0-.72.63l-.73 1.95 1.5 1.5-2.12 2.12-1.5-1.5-1.95.73a1 1 0 0 0-.63.63L13.5 21.75h-3l-.53-2.12a1 1 0 0 0-.63-.72l-1.95-.73-1.5 1.5-2.12-2.12 1.5-1.5-.73-1.95a1 1 0 0 0-.63-.63L2.25 16.5v-3l2.12-.53a1 1 0 0 0 .72-.63l.73-1.95-1.5-1.5 2.12-2.12 1.5 1.5 1.95-.73a1 1 0 0 0 .63-.72L10.5 3.75Z"
      className="stroke-current opacity-80"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 9.75a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Z"
      className="stroke-current opacity-90"
      strokeWidth="1.6"
    />
  </svg>
);

const navItems = [
  { to: '/app/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { to: '/app/voters', label: 'Voters', icon: VoterIcon },
  { to: '/app/volunteers', label: 'Volunteers', icon: VolunteerIcon },
  { to: '/app/campaigns', label: 'Campaigns / Events', icon: CampaignIcon },
  { to: '/app/funds', label: 'Funds', icon: FundsIcon },
  { to: '/app/grievances', label: 'Grievances', icon: GrievanceIcon },
  { to: '/app/analytics', label: 'Analytics', icon: AnalyticsIcon },
  { to: '/app/media', label: 'Media', icon: MediaIcon },
  { to: '/app/settings', label: 'Settings', icon: SettingsIcon }
];

export default function Sidebar({ open, onToggle }) {
  return (
    <aside
      className={clsx(
        'relative z-20 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur transition-all duration-300',
        'h-screen',
        open ? 'w-60' : 'w-16'
      )}
    >
      <div className="flex items-center justify-between h-14 px-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="h-7 w-7 rounded-full bg-slate-900 dark:bg-slate-50 flex items-center justify-center shadow overflow-hidden">
            <img
              src="https://m.media-amazon.com/images/I/61OgrIEL7EL.jpg"
              alt="Campaign logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className={clsx(
              'flex flex-col transition-opacity duration-200',
              open ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
          >
            <span className="text-xs font-semibold tracking-wide text-slate-800 dark:text-slate-100">
              Politician
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">
              Command Center
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="hidden md:inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={clsx('h-3.5 w-3.5 transition-transform', open ? '' : 'rotate-180')}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.293 15.707a1 1 0 010-1.414L14.586 12H4a1 1 0 110-2h10.586l-2.293-2.293a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        <ul className="space-y-1 px-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium transition-colors',
                    'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                    'dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
                    isActive &&
                      'bg-gradient-to-r from-primary-600/90 to-accent-600/90 text-white shadow-sm hover:bg-primary-700'
                  )
                }
              >
                <span className="text-base flex items-center justify-center">
                  <item.icon />
                </span>
                <span
                  className={clsx(
                    'whitespace-nowrap transition-all duration-200',
                    open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
                  )}
                >
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={clsx(
          'px-3 pb-4 pt-2 border-t border-slate-200 dark:border-slate-800 transition-opacity duration-200',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="rounded-lg bg-gradient-to-r from-primary-600/90 to-accent-600/90 px-3 py-3 text-[11px] text-white shadow">
          <p className="font-semibold mb-1">Today&apos;s Focus</p>
          <p className="text-xs opacity-90">
            Increase voter outreach in <span className="font-semibold">Ward 12 &amp; 14</span>. Schedule evening
            rallies and engage local volunteers.
          </p>
        </div>
      </div>
    </aside>
  );
}


