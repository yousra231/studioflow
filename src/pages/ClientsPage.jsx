import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  LayoutGrid, 
  List, 
  Mail, 
  Phone
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import ClientModal from '../components/clients/ClientModal';
import Modal from '../components/common/Modal';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency } from '../utils/formatters';

const ClientsPage = () => {
  const { clients, deleteClient } = useData();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Filter clients
  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.company.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleEdit = (client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setEditingClient(null);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (deletingId) {
      const clientToDelete = clients.find(c => c.id === deletingId);
      deleteClient(deletingId);
      addToast(`Client "${clientToDelete ? clientToDelete.name : ''}" deleted.`);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Client Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage your agency accounts, leads, and billing contacts.
          </p>
        </div>

        <Button variant="primary" icon={Plus} onClick={handleCreateNew} className="shadow-glow">
          Add Client
        </Button>
      </div>

      {/* Controls Bar: Search + Filter + View Toggle */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients by name, company or email..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Lead">Lead</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
              <button
                onClick={() => setViewMode('table')}
                aria-label="Switch to table view"
                className={`p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  viewMode === 'table' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Switch to grid view"
                className={`p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Content Rendering */}
      {filteredClients.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No clients found"
          description={search ? `No client results matching "${search}".` : 'Start building your directory by adding your first client.'}
          actionLabel="Add Client"
          onAction={handleCreateNew}
        />
      ) : viewMode === 'table' ? (
        /* Table View */
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-400 font-semibold uppercase">
                  <th className="py-3.5 px-6">Client Name</th>
                  <th className="py-3.5 px-4">Company</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Active Projects</th>
                  <th className="py-3.5 px-4 text-right">Total Revenue</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={client.avatar}
                          alt={client.name}
                          className="w-9 h-9 rounded-full object-cover shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">
                            {client.name}
                          </p>
                          <p className="text-slate-500 text-[11px]">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700 dark:text-slate-300">
                      {client.company}
                    </td>
                    <td className="py-4 px-4">
                      <Badge status={client.status} size="sm" />
                    </td>
                    <td className="py-4 px-4 text-center font-semibold text-slate-700 dark:text-slate-300">
                      {client.activeProjectsCount || 0}
                    </td>
                    <td className="py-4 px-4 text-right font-extrabold text-slate-900 dark:text-white">
                      {formatCurrency(client.totalRevenue)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEdit(client)}
                          aria-label={`Edit ${client.name}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingId(client.id)}
                          aria-label={`Delete ${client.name}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} hover className="flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                        {client.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">{client.company}</p>
                    </div>
                  </div>
                  <Badge status={client.status} size="sm" />
                </div>

                <div className="space-y-2 text-xs text-slate-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{client.phone || 'N/A'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-xs mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Projects</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{client.activeProjectsCount || 0} Active</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Revenue</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(client.totalRevenue)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <Button variant="ghost" size="sm" icon={Edit3} onClick={() => handleEdit(client)}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" icon={Trash2} onClick={() => setDeletingId(client.id)} className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10">
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Client Modal */}
      <ClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        clientToEdit={editingClient}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        title="Confirm Client Deletion"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <p>
            Are you sure you want to delete this client profile? All associated projects and record histories will be detached.
          </p>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeletingId(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete Client
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ClientsPage;
