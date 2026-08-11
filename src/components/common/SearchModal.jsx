import React, { useState, useEffect } from 'react';
import { Search, Users, FolderKanban, FileText, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { clients, projects, invoices } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open search modal (trigger passed from parent)
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredClients = query ? clients.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.company.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3) : [];

  const filteredProjects = query ? projects.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) || 
    p.clientName.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3) : [];

  const filteredInvoices = query ? invoices.filter(i => 
    i.number.toLowerCase().includes(query.toLowerCase()) || 
    i.clientName.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3) : [];

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  const hasResults = filteredClients.length > 0 || filteredProjects.length > 0 || filteredInvoices.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div 
        className="fixed inset-0 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-xl z-10 overflow-hidden animate-slide-up">
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clients, projects, invoices..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-base"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400 font-mono">
            ESC
          </span>
        </div>

        <div className="p-3 max-h-96 overflow-y-auto">
          {!query && (
            <div className="p-6 text-center text-sm text-slate-400">
              Type to search across <span className="font-semibold text-slate-700 dark:text-slate-200">Clients</span>, <span className="font-semibold text-slate-700 dark:text-slate-200">Projects</span>, or <span className="font-semibold text-slate-700 dark:text-slate-200">Invoices</span>...
            </div>
          )}

          {query && !hasResults && (
            <div className="p-6 text-center text-sm text-slate-400">
              No results found matching "{query}"
            </div>
          )}

          {filteredClients.length > 0 && (
            <div className="mb-4">
              <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Clients
              </div>
              {filteredClients.map(c => (
                <div
                  key={c.id}
                  onClick={() => handleSelect('/clients')}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={c.avatar} alt={c.name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{c.name}</p>
                      <p className="text-xs text-slate-500">{c.company}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          )}

          {filteredProjects.length > 0 && (
            <div className="mb-4">
              <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FolderKanban className="w-3.5 h-3.5" /> Projects
              </div>
              {filteredProjects.map(p => (
                <div
                  key={p.id}
                  onClick={() => handleSelect('/projects')}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 cursor-pointer transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{p.title}</p>
                    <p className="text-xs text-slate-500">{p.clientName} • {p.status}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          )}

          {filteredInvoices.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Invoices
              </div>
              {filteredInvoices.map(i => (
                <div
                  key={i.id}
                  onClick={() => handleSelect('/invoices')}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 cursor-pointer transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{i.number}</p>
                    <p className="text-xs text-slate-500">{i.clientName} • ${i.amount.toLocaleString()}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
