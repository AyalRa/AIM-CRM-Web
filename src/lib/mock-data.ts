import type { Lead, Customer, Task, Sale, Product, User, Status } from '@/types';

// ── Mock Statuses ──
export const mockStatuses: Status[] = [
    { id: 'status-new', name: 'New', color: '#3b82f6', entity: 'leads', order: 1 },
    { id: 'status-contacted', name: 'Contacted', color: '#f59e0b', entity: 'leads', order: 2 },
    { id: 'status-qualified', name: 'Qualified', color: '#10b981', entity: 'leads', order: 3 },
    { id: 'status-lost', name: 'Lost', color: '#ef4444', entity: 'leads', order: 4 },
    { id: 'status-active', name: 'Active', color: '#10b981', entity: 'customers', order: 1 },
    { id: 'status-inactive', name: 'Inactive', color: '#6b7280', entity: 'customers', order: 2 },
];

// ── Mock Users ──
export const mockUsers: User[] = [
    {
        id: 'user-1',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        isActive: true,
        businessId: 'business-1',
        businessName: 'My Business',
        permissions: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'user-2',
        email: 'sales@example.com',
        firstName: 'Sarah',
        lastName: 'Sales',
        role: 'user',
        isActive: true,
        businessId: 'business-1',
        businessName: 'My Business',
        permissions: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

// ── Mock Leads ──
export const mockLeads: Lead[] = [
    {
        id: 'lead-1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 555-0101',
        company: 'Acme Corp',
        status: mockStatuses[0], // New
        statusId: 'status-new',
        assignedTo: { id: 'user-2', firstName: 'Sarah', lastName: 'Sales' },
        assignedToId: 'user-2',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'lead-2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1 555-0102',
        company: 'TechStart Inc',
        status: mockStatuses[1], // Contacted
        statusId: 'status-contacted',
        assignedTo: { id: 'user-1', firstName: 'Admin', lastName: 'User' },
        assignedToId: 'user-1',
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'lead-3',
        firstName: 'Robert',
        lastName: 'Johnson',
        email: 'robert.j@example.com',
        phone: '+1 555-0103',
        company: 'Global Solutions',
        status: mockStatuses[2], // Qualified
        statusId: 'status-qualified',
        assignedTo: { id: 'user-2', firstName: 'Sarah', lastName: 'Sales' },
        assignedToId: 'user-2',
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
        updatedAt: new Date().toISOString(),
    },
];

// ── Mock Customers ──
export const mockCustomers: Customer[] = [
    {
        id: 'cust-1',
        firstName: 'Alice',
        lastName: 'Williams',
        email: 'alice.w@example.com',
        phone: '+1 555-0201',
        company: 'Big Enterprise',
        status: mockStatuses[4], // Active
        statusId: 'status-active',
        assignedTo: { id: 'user-2', firstName: 'Sarah', lastName: 'Sales' },
        assignedToId: 'user-2',
        createdAt: new Date(Date.now() - 86400000 * 30).toISOString(), // 30 days ago
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'cust-2',
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'm.brown@example.com',
        company: 'Freelance Design',
        status: mockStatuses[5], // Inactive
        statusId: 'status-inactive',
        assignedTo: { id: 'user-1', firstName: 'Admin', lastName: 'User' },
        assignedToId: 'user-1',
        createdAt: new Date(Date.now() - 86400000 * 60).toISOString(), // 60 days ago
        updatedAt: new Date().toISOString(),
    },
];

// ── Mock Tasks ──
export const mockTasks: Task[] = [
    {
        id: 'task-1',
        title: 'Follow up with John Doe',
        description: 'Check if they reviewed the proposal',
        priority: 'high',
        dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        status: { id: 'task-pending', name: 'Pending', entity: 'tasks' },
        statusId: 'task-pending',
        assignedTo: { id: 'user-2', firstName: 'Sarah', lastName: 'Sales' },
        assignedToId: 'user-2',
        lead: { id: 'lead-1', firstName: 'John', lastName: 'Doe', company: 'Acme Corp' },
        leadId: 'lead-1',
        createdBy: { id: 'user-1', firstName: 'Admin', lastName: 'User' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-2',
        title: 'Prepare invoice for Alice',
        priority: 'medium',
        status: { id: 'task-done', name: 'Done', entity: 'tasks' },
        statusId: 'task-done',
        assignedTo: { id: 'user-1', firstName: 'Admin', lastName: 'User' },
        assignedToId: 'user-1',
        customer: { id: 'cust-1', firstName: 'Alice', lastName: 'Williams', company: 'Big Enterprise' },
        customerId: 'cust-1',
        createdBy: { id: 'user-1', firstName: 'Admin', lastName: 'User' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];
