import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { useData } from '../../context/DataContext';
import { formatCurrency, formatDate } from '../../utils/formatters';

const RecentInvoices = () => {
  const { invoices } = useData();
  const recent = invoices.slice(0, 4);

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Invoices</h3>
          <p className="text-xs text-slate-500">Billing history & outstanding payments</p>
        </div>
        <NavLink
          to="/invoices"
          className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </NavLink>
      </div>

      <div className="space-y-3">
        {recent.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {invoice.number}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {invoice.clientName} • Due {formatDate(invoice.dueDate)}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0 ml-3">
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                {formatCurrency(invoice.amount)}
              </p>
              <div className="mt-0.5">
                <Badge status={invoice.status} size="sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentInvoices;
