import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ClientModal from '../clients/ClientModal';
import ProjectModal from '../projects/ProjectModal';
import InvoiceModal from '../invoices/InvoiceModal';

const AppLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Modals state
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 flex flex-col lg:flex-row transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <Topbar 
          setIsMobileOpen={setIsMobileOpen}
          onOpenNewClient={() => setIsClientModalOpen(true)}
          onOpenNewProject={() => setIsProjectModalOpen(true)}
          onOpenNewInvoice={() => setIsInvoiceModalOpen(true)}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto animate-fade-in">
          <Outlet context={{
            openClientModal: () => setIsClientModalOpen(true),
            openProjectModal: () => setIsProjectModalOpen(true),
            openInvoiceModal: () => setIsInvoiceModalOpen(true),
          }} />
        </main>
      </div>

      {/* Global Modals */}
      <ClientModal isOpen={isClientModalOpen} onClose={() => setIsClientModalOpen(false)} />
      <ProjectModal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} />
      <InvoiceModal isOpen={isInvoiceModalOpen} onClose={() => setIsInvoiceModalOpen(false)} />
    </div>
  );
};

export default AppLayout;
