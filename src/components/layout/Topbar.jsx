import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  Plus, 
  FileText, 
  UserPlus, 
  FolderPlus,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import SearchModal from '../common/SearchModal';
import Button from '../common/Button';

const Topbar = ({ setIsMobileOpen, onOpenNewInvoice, onOpenNewClient, onOpenNewProject }) => {
  const { theme, toggleTheme } = useTheme();
  const { settings } = useData();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-[#0b0f19]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 flex items-center justify-between transition-colors">
        {/* Left Side: Mobile Menu + Search Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open mobile menu"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Quick Search Input trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open search dialog (Command+K)"
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm w-44 sm:w-64 md:w-80 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate text-xs sm:text-sm">Search clients, projects...</span>
            <span className="hidden sm:inline-block ml-auto text-[10px] px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-400 font-mono">
              ⌘K
            </span>
          </button>
        </div>

        {/* Right Side: Quick Action + Theme Toggle + Notifications + Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Action Dropdown */}
          <div className="relative">
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setIsQuickActionOpen(!isQuickActionOpen)}
              aria-label="Create new item"
              className="hidden sm:flex"
            >
              <span>Create</span>
              <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
            </Button>

            {isQuickActionOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsQuickActionOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-1.5 z-20 animate-slide-up">
                  <button
                    onClick={() => {
                      setIsQuickActionOpen(false);
                      onOpenNewInvoice && onOpenNewInvoice();
                    }}
                    className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-amber-500" />
                    New Invoice
                  </button>
                  <button
                    onClick={() => {
                      setIsQuickActionOpen(false);
                      onOpenNewClient && onOpenNewClient();
                    }}
                    className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <UserPlus className="w-4 h-4 text-blue-500" />
                    New Client
                  </button>
                  <button
                    onClick={() => {
                      setIsQuickActionOpen(false);
                      onOpenNewProject && onOpenNewProject();
                    }}
                    className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <FolderPlus className="w-4 h-4 text-indigo-500" />
                    New Project
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              aria-label="View notifications"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-white dark:ring-slate-900" />
            </button>

            {isNotificationsOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsNotificationsOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-4 z-20 animate-slide-up">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Notifications</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold">2 New</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Invoice #INV-2024-001 Paid</p>
                        <p className="text-[11px] text-slate-500">$12,800 received from Hyperion Labs</p>
                        <span className="text-[10px] text-slate-400">2 hours ago</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-brand-500 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Project Milestone Updated</p>
                        <p className="text-[11px] text-slate-500">Brand Identity is now 75% completed</p>
                        <span className="text-[10px] text-slate-400">5 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

          {/* User Profile avatar */}
          <div className="flex items-center gap-3 pl-1">
            <img
              src={settings.profile.avatar}
              alt={settings.profile.name}
              className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
            />
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-slate-900 dark:text-white leading-none mb-1">
                {settings.profile.name}
              </p>
              <p className="text-[11px] text-slate-500 leading-none">
                {settings.profile.title}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Topbar;
