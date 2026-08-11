import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  FileText, 
  Settings, 
  Layers,
  X,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Clients', path: '/clients', icon: Users },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Invoices', path: '/invoices', icon: FileText },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 dark:bg-black/75 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white dark:bg-[#0b0f19] border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header & Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100 dark:border-slate-800/60">
            <NavLink to="/dashboard" className="flex items-center gap-2.5 group focus:outline-none">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  StudioFlow
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold border border-brand-500/20">PRO</span>
                </span>
              </div>
            </NavLink>

            {/* Mobile close button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close menu"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 lg:hidden focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5" aria-label="Sidebar Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-500/15 text-brand-600 dark:text-brand-400 font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Banner & Landing Page Link */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/60">
          <div className="p-4 rounded-xl bg-gradient-to-br from-brand-600/10 via-indigo-600/5 to-purple-600/10 border border-brand-500/20 dark:border-brand-500/10 mb-3">
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Unlimited Plan
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              You are managing 5 active clients with automated invoicing enabled.
            </p>
          </div>

          <NavLink
            to="/"
            className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <span>Back to Marketing Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
