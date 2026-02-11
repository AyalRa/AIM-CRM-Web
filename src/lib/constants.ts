export const APP_NAME = 'AIM CRM';

export const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
] as const;

export const PRIORITY_COLORS: Record<string, string> = {
  low: 'bg-slate-100 text-slate-700',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-amber-100 text-amber-700',
  urgent: 'bg-red-100 text-red-700',
};

export const MEETING_FORMAT_OPTIONS = [
  { value: 'in_person', label: 'In Person' },
  { value: 'phone', label: 'Phone' },
  { value: 'zoom', label: 'Zoom / Video' },
] as const;

export const RETAINER_FREQUENCY_OPTIONS = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
] as const;

export const DEFAULT_PAGE_SIZE = 20;

export const ENTITY_NAMES = {
  leads: 'Leads',
  customers: 'Customers',
  tasks: 'Tasks',
  sales: 'Sales',
  products: 'Products',
  meetings: 'Meetings',
  users: 'Users',
} as const;

export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/', icon: 'LayoutDashboard', entity: null },
  { label: 'Leads', href: '/leads', icon: 'UserPlus', entity: 'leads' },
  { label: 'Customers', href: '/customers', icon: 'Users', entity: 'customers' },
  { label: 'Tasks', href: '/tasks', icon: 'CheckSquare', entity: 'tasks' },
  { label: 'Calendar', href: '/calendar', icon: 'Calendar', entity: 'meetings' },
  { label: 'Sales', href: '/sales', icon: 'Receipt', entity: 'sales' },
  { label: 'Products', href: '/products', icon: 'Package', entity: 'products' },
  { label: 'Reports', href: '/reports', icon: 'BarChart3', entity: null },
] as const;

export const SETTINGS_NAV_ITEMS = [
  { label: 'General', href: '/settings' },
  { label: 'Users', href: '/settings/users' },
  { label: 'Permissions', href: '/settings/permissions' },
  { label: 'Statuses', href: '/settings/statuses' },
  { label: 'Custom Fields', href: '/settings/custom-fields' },
  { label: 'Integrations', href: '/settings/integrations' },
] as const;
