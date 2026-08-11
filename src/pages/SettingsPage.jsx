import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Sun, 
  Moon, 
  Bell, 
  Database, 
  Check, 
  RefreshCw,
  Save
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

const SettingsPage = () => {
  const { settings, updateSettings, resetAllData } = useData();
  const { theme, setTheme } = useTheme();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('profile');

  // Profile Form state
  const [profileForm, setProfileForm] = useState(settings.profile);
  // Company Form state
  const [companyForm, setCompanyForm] = useState(settings.company);
  // Notifications state
  const [notifForm, setNotifForm] = useState(settings.notifications);

  // Confirm Reset Modal
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateSettings({ profile: profileForm });
    addToast('Profile preferences updated successfully.');
  };

  const handleSaveCompany = (e) => {
    e.preventDefault();
    updateSettings({ company: companyForm });
    addToast('Company details updated.');
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    updateSettings({ notifications: notifForm });
    addToast('Notification settings saved.');
  };

  const handleConfirmReset = () => {
    resetAllData();
    addToast('All demo data restored to factory defaults.', 'info');
    setIsResetModalOpen(false);
    setTimeout(() => window.location.reload(), 300);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'company', label: 'Company Info', icon: Building2 },
    { id: 'appearance', label: 'Appearance', icon: theme === 'dark' ? Moon : Sun },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'data', label: 'Data Management', icon: Database },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Application Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Configure profile details, company invoice headers, theme preferences, and data backups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Tabs Column (Horizontal scroll on mobile, vertical stack on desktop) */}
        <Card className="p-2 md:col-span-1 h-fit overflow-x-auto">
          <nav className="flex md:flex-col gap-1 min-w-max md:min-w-0" aria-label="Settings navigation">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-selected={isActive}
                  role="tab"
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                    isActive
                      ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </Card>

        {/* Content Pane */}
        <div className="md:col-span-3 space-y-6">
          {/* 1. Profile Tab */}
          {activeTab === 'profile' && (
            <Card>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Personal Profile</h3>
              <p className="text-xs text-slate-500 mb-6">Manage your user identity and public contact details.</p>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={profileForm.avatar}
                    alt={profileForm.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-brand-500/30 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Profile Picture</p>
                    <p className="text-[11px] text-slate-400">Avatar syncs across your studio activity feeds.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={profileForm.title}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Professional Bio
                  </label>
                  <textarea
                    rows="3"
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <Button type="submit" variant="primary" icon={Save}>
                    Save Profile
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* 2. Company Info Tab */}
          {activeTab === 'company' && (
            <Card>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Company & Billing Details</h3>
              <p className="text-xs text-slate-500 mb-6">This information appears automatically on generated client invoices.</p>

              <form onSubmit={handleSaveCompany} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={companyForm.name}
                      onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Tax Identification Number
                    </label>
                    <input
                      type="text"
                      value={companyForm.taxId}
                      onChange={(e) => setCompanyForm({ ...companyForm, taxId: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={companyForm.website}
                    onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Registered Business Address
                  </label>
                  <input
                    type="text"
                    value={companyForm.address}
                    onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <Button type="submit" variant="primary" icon={Save}>
                    Save Company Info
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* 3. Appearance Tab */}
          {activeTab === 'appearance' && (
            <Card>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Appearance & Theme</h3>
              <p className="text-xs text-slate-500 mb-6">Customize the application look and dark mode preferences.</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Color Theme Mode
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                    <button
                      type="button"
                      onClick={() => setTheme('light')}
                      className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                        theme === 'light'
                          ? 'border-brand-600 bg-brand-50/20 text-slate-900 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Sun className="w-5 h-5 text-amber-500" />
                        <div>
                          <p className="text-xs font-bold">Light Mode</p>
                          <p className="text-[10px] text-slate-500">Clean slate look</p>
                        </div>
                      </div>
                      {theme === 'light' && <Check className="w-4 h-4 text-brand-600" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setTheme('dark')}
                      className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                        theme === 'dark'
                          ? 'border-brand-600 bg-slate-900 text-white shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Moon className="w-5 h-5 text-indigo-400" />
                        <div>
                          <p className="text-xs font-bold">Dark Mode</p>
                          <p className="text-[10px] text-slate-400">Pro fintech aesthetic</p>
                        </div>
                      </div>
                      {theme === 'dark' && <Check className="w-4 h-4 text-brand-400" />}
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* 4. Notifications Tab */}
          {activeTab === 'notifications' && (
            <Card>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Notification Preferences</h3>
              <p className="text-xs text-slate-500 mb-6">Choose how and when StudioFlow alerts you.</p>

              <form onSubmit={handleSaveNotifications} className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 cursor-pointer">
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Invoice Payment Alerts</p>
                      <p className="text-[11px] text-slate-500">Receive instant notifications when clients pay invoices.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifForm.emailInvoices}
                      onChange={(e) => setNotifForm({ ...notifForm, emailInvoices: e.target.checked })}
                      className="w-4 h-4 rounded accent-brand-600"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 cursor-pointer">
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Project Deadline Reminders</p>
                      <p className="text-[11px] text-slate-500">Get alerts 48 hours before project milestones are due.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifForm.emailProjectUpdates}
                      onChange={(e) => setNotifForm({ ...notifForm, emailProjectUpdates: e.target.checked })}
                      className="w-4 h-4 rounded accent-brand-600"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 cursor-pointer">
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Weekly Performance Summary</p>
                      <p className="text-[11px] text-slate-500">Weekly email breakdown of total revenue and client retainers.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifForm.weeklyDigest}
                      onChange={(e) => setNotifForm({ ...notifForm, weeklyDigest: e.target.checked })}
                      className="w-4 h-4 rounded accent-brand-600"
                    />
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <Button type="submit" variant="primary" icon={Save}>
                    Save Preferences
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* 5. Data Management Tab */}
          {activeTab === 'data' && (
            <Card>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Data Storage & Demo Reset</h3>
              <p className="text-xs text-slate-500 mb-6">Manage your browser localStorage data persistence or restore sample demo content.</p>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6 text-xs text-amber-700 dark:text-amber-300">
                <p className="font-bold mb-1">Local Storage Notice</p>
                <p>StudioFlow persists all client directory, project states, and generated invoices inside your browser's localStorage.</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Reset Demo Data</h4>
                  <p className="text-[11px] text-slate-500">Restore default clients, sample projects, and sample invoices.</p>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  icon={RefreshCw}
                  onClick={() => setIsResetModalOpen(true)}
                  className="shrink-0"
                >
                  Reset Demo Data
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Reset All Data"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <p>
            Are you sure you want to reset all stored state? All custom clients, projects, and invoices created will be cleared and restored to default initial demo seed data.
          </p>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsResetModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmReset}>
              Confirm Reset
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsPage;
