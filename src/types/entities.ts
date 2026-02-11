// ── Core Entities ──

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  source?: string;
  notes?: string;
  status: Status;
  statusId: string;
  assignedTo?: UserSummary;
  assignedToId?: string;
  createdBy?: UserSummary;
  convertedToCustomerId?: string;
  convertedAt?: string;
  customFieldValues?: CustomFieldValue[];
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
  notes?: string;
  dateOfBirth?: string;
  status: Status;
  statusId: string;
  assignedTo?: UserSummary;
  assignedToId?: string;
  customFieldValues?: CustomFieldValue[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: Status;
  statusId: string;
  taskType?: TaskType;
  taskTypeId?: string;
  assignedTo?: UserSummary;
  assignedToId?: string;
  customer?: CustomerSummary;
  customerId?: string;
  lead?: LeadSummary;
  leadId?: string;
  createdBy: UserSummary;
  timeEntries?: TaskTimeEntry[];
  customFieldValues?: CustomFieldValue[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskType {
  id: string;
  name: string;
  color?: string;
}

export interface TaskTimeEntry {
  id: string;
  userId: string;
  user: UserSummary;
  startTime: string;
  endTime?: string;
  durationMinutes?: number;
  notes?: string;
}

export interface Sale {
  id: string;
  saleNumber: string;
  status: Status;
  statusId: string;
  customer: CustomerSummary;
  customerId: string;
  soldBy: UserSummary;
  soldById: string;
  lineItems: SaleLineItem[];
  subtotal: number;
  vatAmount: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SaleLineItem {
  id: string;
  product: ProductSummary;
  productId: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  isRetainer: boolean;
  retainerFrequency?: 'weekly' | 'monthly' | 'yearly';
  retainerStartDate?: string;
  retainerEndDate?: string;
  nextBillingDate?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  priceBeforeVat: number;
  isRetainer: boolean;
  retainerFrequency?: 'weekly' | 'monthly' | 'yearly';
  details?: string;
  termsOfService?: string;
  avgDeliveryTime?: string;
  paymentTerms?: string;
  categories: ProductCategory[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  meetingFormat: 'in_person' | 'phone' | 'zoom';
  meetingType?: MeetingType;
  meetingTypeId?: string;
  organizer: UserSummary;
  organizerId: string;
  customer?: CustomerSummary;
  customerId?: string;
  invitees: UserSummary[];
  createdAt: string;
  updatedAt: string;
}

export interface MeetingType {
  id: string;
  name: string;
  color?: string;
  defaultDuration?: number;
}

export interface Documentation {
  id: string;
  content: string;
  type: DocumentationType;
  typeId: string;
  entityType: 'lead' | 'customer' | 'task' | 'sale';
  entityId: string;
  createdBy: UserSummary;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentationType {
  id: string;
  name: string;
}

// ── Supporting Types ──

export interface Status {
  id: string;
  name: string;
  color?: string;
  entity: string;
  order?: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: string;
  isActive: boolean;
  businessId: string;
  businessName: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export interface UserSummary {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface CustomerSummary {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
}

export interface LeadSummary {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
}

export interface ProductSummary {
  id: string;
  name: string;
  priceBeforeVat: number;
}

export interface CustomFieldValue {
  id: string;
  value: string;
  field: CustomFieldDefinition;
}

export interface CustomFieldDefinition {
  id: string;
  name: string;
  label: string;
  fieldType: 'text' | 'number' | 'date' | 'select' | 'multiselect' | 'boolean' | 'textarea';
  entity: string;
  section?: string;
  options?: string[];
  isRequired: boolean;
  order?: number;
}

export interface Permission {
  entity: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  ownOnly: boolean;
}

export interface Automation {
  id: string;
  name: string;
  description?: string;
  triggerType: string;
  triggerConfig: Record<string, unknown>;
  actionType: string;
  actionConfig: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  details?: Record<string, unknown>;
  user: UserSummary;
  createdAt: string;
}

export interface Business {
  id: string;
  name: string;
  logo?: string;
  settings: Record<string, unknown>;
}
