export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

export const getStatusBadgeColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
    case 'paid':
    case 'completed':
      return 'emerald';
    case 'in progress':
    case 'pending':
    case 'review':
      return 'indigo';
    case 'lead':
    case 'draft':
      return 'amber';
    case 'overdue':
    case 'inactive':
      return 'rose';
    case 'on hold':
      return 'slate';
    default:
      return 'slate';
  }
};
