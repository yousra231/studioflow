import React from 'react';
import { Printer, Download, CheckCircle2, Layers } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency, formatDate } from '../../utils/formatters';

const InvoiceDetailModal = ({ isOpen, onClose, invoice }) => {
  const { updateInvoiceStatus, settings } = useData();
  const { addToast } = useToast();

  if (!invoice) return null;

  const handleMarkAsPaid = () => {
    updateInvoiceStatus(invoice.id, 'Paid');
    addToast(`Invoice ${invoice.number} marked as Paid!`);
  };

  const handleDownload = () => {
    addToast(`Preparing PDF export for ${invoice.number}...`);
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Invoice Summary: ${invoice.number}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Top Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Status:</span>
            <Badge status={invoice.status} size="md" />
          </div>

          <div className="flex items-center gap-2">
            {invoice.status !== 'Paid' && (
              <Button variant="primary" size="sm" icon={CheckCircle2} onClick={handleMarkAsPaid}>
                Mark as Paid
              </Button>
            )}
            <Button variant="outline" size="sm" icon={Download} onClick={handleDownload}>
              Print / Save PDF
            </Button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-none">
                  {settings.company.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{settings.company.website}</p>
              </div>
            </div>

            <div className="sm:text-right">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">INVOICE</h2>
              <p className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400">{invoice.number}</p>
            </div>
          </div>

          {/* Billed To & Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div>
              <p className="font-semibold text-slate-400 uppercase tracking-wider mb-1">Billed To</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{invoice.clientName}</p>
              <p className="text-slate-500 mt-0.5">Tax ID: {settings.company.taxId}</p>
            </div>

            <div className="sm:text-right space-y-1">
              <p><span className="text-slate-400">Issue Date:</span> <strong className="text-slate-800 dark:text-slate-200">{formatDate(invoice.issueDate)}</strong></p>
              <p><span className="text-slate-400">Due Date:</span> <strong className="text-slate-800 dark:text-slate-200">{formatDate(invoice.dueDate)}</strong></p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase">
                  <th className="py-2.5">Description</th>
                  <th className="py-2.5 text-center">Qty</th>
                  <th className="py-2.5 text-right">Rate</th>
                  <th className="py-2.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {invoice.items?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 font-medium text-slate-800 dark:text-slate-200">{item.description}</td>
                    <td className="py-3 text-center text-slate-500">{item.qty}</td>
                    <td className="py-3 text-right text-slate-500">{formatCurrency(item.rate)}</td>
                    <td className="py-3 text-right font-bold text-slate-900 dark:text-white">{formatCurrency(item.qty * item.rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Total Amount:</span>
                <span className="text-base font-extrabold text-brand-600 dark:text-brand-400">
                  {formatCurrency(invoice.amount)}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-xs text-slate-500 border border-slate-200/60 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Notes: </span>
              {invoice.notes}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default InvoiceDetailModal;
