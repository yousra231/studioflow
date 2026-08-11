import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  DollarSign, 
  FolderKanban, 
  Users, 
  FileText, 
  Plus, 
  Sparkles,
  UserPlus,
  FolderPlus
} from 'lucide-react';
import MetricCard from '../components/dashboard/MetricCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import ProjectStatusChart from '../components/dashboard/ProjectStatusChart';
import RecentProjects from '../components/dashboard/RecentProjects';
import RecentInvoices from '../components/dashboard/RecentInvoices';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import Button from '../components/common/Button';
import { useData } from '../context/DataContext';
import { formatCurrency } from '../utils/formatters';

const DashboardPage = () => {
  const { clients, projects, invoices, settings } = useData();
  const { openClientModal, openProjectModal, openInvoiceModal } = useOutletContext();

  // Metrics calculation
  const totalRevenue = clients.reduce((acc, c) => acc + (c.totalRevenue || 0), 0);
  const activeProjectsCount = projects.filter(p => p.status === 'In Progress' || p.status === 'Review').length;
  const totalClientsCount = clients.length;
  
  const pendingInvoices = invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue');
  const outstandingInvoicesAmount = pendingInvoices.reduce((acc, i) => acc + (i.amount || 0), 0);

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{todayStr}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Welcome back, {settings.profile.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Here is what's happening across your agency today.
          </p>
        </div>

        {/* Quick Actions Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            icon={UserPlus}
            onClick={openClientModal}
          >
            Client
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={FolderPlus}
            onClick={openProjectModal}
          >
            Project
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={openInvoiceModal}
            className="shadow-glow"
          >
            Invoice
          </Button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Total Billed Revenue"
          value={formatCurrency(totalRevenue || 91600)}
          change="+18.4%"
          trend="up"
          icon={DollarSign}
          color="emerald"
        />
        <MetricCard
          title="Active Projects"
          value={`${activeProjectsCount} Active`}
          change="+12.0%"
          trend="up"
          icon={FolderKanban}
          color="indigo"
        />
        <MetricCard
          title="Total Clients"
          value={`${totalClientsCount} Accounts`}
          change="+2 new"
          trend="up"
          icon={Users}
          color="blue"
        />
        <MetricCard
          title="Outstanding Invoices"
          value={formatCurrency(outstandingInvoicesAmount)}
          change="3 Pending"
          trend="down"
          icon={FileText}
          color="amber"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <ProjectStatusChart />
        </div>
      </div>

      {/* Recent Tables & Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RecentProjects />
        </div>
        <div className="lg:col-span-1">
          <RecentInvoices />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
