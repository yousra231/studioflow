import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  initialClients, 
  initialProjects, 
  initialInvoices, 
  initialActivities,
  initialSettings 
} from '../data/initialSeed';
import { loadFromStorage, saveToStorage, clearStorage } from '../utils/storage';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [clients, setClients] = useState(() => loadFromStorage('clients', initialClients));
  const [projects, setProjects] = useState(() => loadFromStorage('projects', initialProjects));
  const [invoices, setInvoices] = useState(() => loadFromStorage('invoices', initialInvoices));
  const [activities, setActivities] = useState(() => loadFromStorage('activities', initialActivities));
  const [settings, setSettings] = useState(() => loadFromStorage('settings', initialSettings));

  // Sync to localStorage
  useEffect(() => { saveToStorage('clients', clients); }, [clients]);
  useEffect(() => { saveToStorage('projects', projects); }, [projects]);
  useEffect(() => { saveToStorage('invoices', invoices); }, [invoices]);
  useEffect(() => { saveToStorage('activities', activities); }, [activities]);
  useEffect(() => { saveToStorage('settings', settings); }, [settings]);

  // Helper to log a new activity
  const logActivity = (type, title, description, icon = 'Bell', color = 'indigo') => {
    const newAct = {
      id: `act-${Date.now()}`,
      type,
      title,
      description,
      time: 'Just now',
      icon,
      color
    };
    setActivities(prev => [newAct, ...prev.slice(0, 15)]);
  };

  // Client Actions
  const addClient = (clientData) => {
    const newClient = {
      ...clientData,
      id: `cli-${Date.now()}`,
      totalRevenue: clientData.totalRevenue || 0,
      activeProjectsCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      avatar: clientData.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`
    };
    setClients(prev => [newClient, ...prev]);
    logActivity('client_added', 'New Client Added', `${newClient.name} (${newClient.company})`, 'UserPlus', 'blue');
    return newClient;
  };

  const updateClient = (id, clientData) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, ...clientData } : c));
    // Also update clientName in projects and invoices if changed
    if (clientData.company) {
      setProjects(prev => prev.map(p => p.clientId === id ? { ...p, clientName: clientData.company } : p));
      setInvoices(prev => prev.map(inv => inv.clientId === id ? { ...inv, clientName: clientData.company } : inv));
    }
    logActivity('client_updated', 'Client Updated', `Updated profile for ${clientData.name || 'client'}`, 'UserCheck', 'indigo');
  };

  const deleteClient = (id) => {
    const target = clients.find(c => c.id === id);
    setClients(prev => prev.filter(c => c.id !== id));
    logActivity('client_deleted', 'Client Removed', `Removed ${target ? target.name : 'client'}`, 'UserMinus', 'rose');
  };

  // Project Actions
  const addProject = (projectData) => {
    const client = clients.find(c => c.id === projectData.clientId);
    const newProject = {
      ...projectData,
      id: `proj-${Date.now()}`,
      clientName: client ? client.company : projectData.clientName || 'Unknown Client',
      progress: Number(projectData.progress || 0),
      budget: Number(projectData.budget || 0),
      team: projectData.team || ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100']
    };
    setProjects(prev => [newProject, ...prev]);
    
    // Update active project count on client
    if (client) {
      setClients(prev => prev.map(c => c.id === client.id ? { ...c, activeProjectsCount: c.activeProjectsCount + 1 } : c));
    }

    logActivity('project_created', 'New Project Created', `Created project "${newProject.title}"`, 'FolderPlus', 'indigo');
    return newProject;
  };

  const updateProject = (id, projectData) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...projectData } : p));
    logActivity('project_updated', 'Project Updated', `Updated "${projectData.title || 'Project'}"`, 'FolderKanban', 'emerald');
  };

  const deleteProject = (id) => {
    const target = projects.find(p => p.id === id);
    setProjects(prev => prev.filter(p => p.id !== id));
    logActivity('project_deleted', 'Project Deleted', `Deleted "${target ? target.title : 'Project'}"`, 'Trash2', 'rose');
  };

  // Invoice Actions
  const addInvoice = (invoiceData) => {
    const client = clients.find(c => c.id === invoiceData.clientId);
    const count = invoices.length + 1;
    const invNumber = `INV-2024-${String(count).padStart(3, '0')}`;
    
    const newInvoice = {
      ...invoiceData,
      id: `inv-${Date.now()}`,
      number: invNumber,
      clientName: client ? client.company : invoiceData.clientName || 'Unknown Client',
      issueDate: invoiceData.issueDate || new Date().toISOString().split('T')[0],
      amount: Number(invoiceData.amount || 0),
      status: invoiceData.status || 'Pending'
    };

    setInvoices(prev => [newInvoice, ...prev]);

    // If invoice is paid, update client total revenue
    if (newInvoice.status === 'Paid' && client) {
      setClients(prev => prev.map(c => c.id === client.id ? { ...c, totalRevenue: c.totalRevenue + newInvoice.amount } : c));
    }

    logActivity('invoice_created', 'Invoice Created', `Generated ${newInvoice.number} for ${newInvoice.clientName}`, 'FileText', 'amber');
    return newInvoice;
  };

  const updateInvoiceStatus = (id, newStatus) => {
    let invToUpdate = null;
    setInvoices(prev => prev.map(inv => {
      if (inv.id === id) {
        invToUpdate = { ...inv, status: newStatus };
        return invToUpdate;
      }
      return inv;
    }));

    if (invToUpdate && newStatus === 'Paid') {
      // Add to client revenue if paid
      setClients(prev => prev.map(c => c.id === invToUpdate.clientId ? { ...c, totalRevenue: c.totalRevenue + invToUpdate.amount } : c));
      logActivity('invoice_paid', 'Invoice Paid', `${invToUpdate.clientName} paid ${invToUpdate.number} ($${invToUpdate.amount.toLocaleString()})`, 'CheckCircle2', 'emerald');
    }
  };

  const deleteInvoice = (id) => {
    const target = invoices.find(inv => inv.id === id);
    setInvoices(prev => prev.filter(inv => inv.id !== id));
    logActivity('invoice_deleted', 'Invoice Deleted', `Deleted invoice ${target ? target.number : ''}`, 'Trash2', 'rose');
  };

  // Settings Actions
  const updateSettings = (newSettings) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  const resetAllData = () => {
    clearStorage();
    setClients(initialClients);
    setProjects(initialProjects);
    setInvoices(initialInvoices);
    setActivities(initialActivities);
    setSettings(initialSettings);
  };

  return (
    <DataContext.Provider value={{
      clients,
      projects,
      invoices,
      activities,
      settings,
      addClient,
      updateClient,
      deleteClient,
      addProject,
      updateProject,
      deleteProject,
      addInvoice,
      updateInvoiceStatus,
      deleteInvoice,
      updateSettings,
      resetAllData,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
