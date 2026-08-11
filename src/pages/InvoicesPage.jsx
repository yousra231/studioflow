import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Trash2, 
  CheckCircle2
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import InvoiceModal from '../components/invoices/InvoiceModal';
import InvoiceDetailModal from '../components/invoices/InvoiceDetailModal';
import Modal from '../components/common/Modal';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency, formatDate } from '../utils/formatters';

const InvoicesPage = () => {
  const { invoices, updateInvoiceStatus, deleteInvoice } = useData();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Calculations for KPI Cards
  const totalInvoiced = invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0);
  const totalPaid = invoices.filter(i => i.status === 'Paid').reduce((sum, inv) => sum + (inv.amount || 0), 0);
  const totalPending = invoices.filter(i => i.status === 'Pending').reduce((sum, inv) => sum + (inv.amount || 0), 0);
  const totalOverdue = invoices.filter(i => i.status === 'Overdue').reduce((sum, inv) => sum + (inv.amount || 0), 0);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.number.toLowerCase().includes(search.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleMarkPaid = (inv) => {
    updateInvoiceStatus(inv.id, 'Paid');
    addToast(`Invoice ${inv.number} marked as Paid!`);
  };

  const confirmDelete = () => {
    if (deletingId) {
      const inv = invoices.find(i => i.id === deletingId);
      deleteInvoice(deletingId);
      addToast(`Invoice ${inv ? inv.number : ''} deleted.`);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Invoices & Billing
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Generate client billing, track payments, and export printable invoices.
          </p>
        </div>

        <Button variant="primary" icon={Plus} onClick={() => setIsCreateOpen(true)} className="shadow-glow">
          Create Invoice
        </Button>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Invoiced</p>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white">{formatCurrency(totalInvoiced)}</p>
          <span className="text-[10px] text-slate-400 font-medium">{invoices.length} invoices generated</span>
        </Card>

        <Card className="p-4">
          <p className="text-[11px] font-semibold text-emerald-500 uppercase tracking-wider mb-1">Total Paid</p>
          <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(totalPaid)}</p>
          <span className="text-[10px] text-emerald-500 font-medium">Cleared funds</span>
        </Card>

        <Card className="p-4">
          <p className="text-[11px] font-semibold text-amber-500 uppercase tracking-wider mb-1">Pending Payment</p>
          <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400">{formatCurrency(totalPending)}</p>
          <span className="text-[10px] text-amber-500 font-medium">Awaiting client action</span>
        </Card>

        <Card className="p-4">
          <p className="text-[11px] font-semibold text-rose-500 uppercase tracking-wider mb-1">Overdue Amount</p>
          <p className="text-xl font-extrabold text-rose-600 dark:text-rose-400">{formatCurrency(totalOverdue)}</p>
          <span className="text-[10px] text-rose-500 font-medium">Action required</span>
        </Card>
      </div>

      {/* Controls Bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by invoice number or client name..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="All">All Invoices</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Invoice Table */}
      {filteredInvoices.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No invoices found"
          description={search ? `No billing records match "${search}".` : 'Create your first automated invoice now.'}
          actionLabel="Create Invoice"
          onAction={() => setIsCreateOpen(true)}
        />
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-400 font-semibold uppercase">
                  <th className="py-3.5 px-6">Invoice #</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Issue Date</th>
                  <th className="py-3.5 px-4">Due Date</th>
                  <th className="py-3.5 px-4 text-right">Amount</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredInvoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-4 px-6 font-mono font-bold text-slate-900 dark:text-white">
                      {invoice.number}
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-800 dark:text-slate-200">
                      {invoice.clientName}
                    </td>
                    <td className="py-4 px-4 text-slate-500">
                      {formatDate(invoice.issueDate)}
                    </td>
                    <td className="py-4 px-4 text-slate-500">
                      {formatDate(invoice.dueDate)}
                    </td>
                    <td className="py-4 px-4 text-right font-extrabold text-slate-900 dark:text-white">
                      {formatCurrency(invoice.amount)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge status={invoice.status} size="sm" />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {invoice.status !== 'Paid' && (
                          <button
                            onClick={() => handleMarkPaid(invoice)}
                            aria-label={`Mark ${invoice.number} as paid`}
                            className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedInvoice(invoice)}
                          aria-label={`View ${invoice.number}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingId(invoice.id)}
                          aria-label={`Delete ${invoice.number}`}
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
      )}

      {/* Create Modal */}
      <InvoiceModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      {/* Detail Modal */}
      <InvoiceDetailModal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        invoice={selectedInvoice}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        title="Delete Invoice Record"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <p>Are you sure you want to permanently delete this invoice record?</p>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeletingId(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete Invoice
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InvoicesPage;
