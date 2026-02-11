// ── API Response Types ──

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiSuccessResponse<T> {
  data: T;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, string>;
  };
}

// ── Auth Types ──

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    role: string;
    businessId: string;
    businessName: string;
    permissions: import('./entities').Permission[];
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// ── Filter Types ──

export interface BaseFilters {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface LeadFilters extends BaseFilters {
  statusId?: string;
  assignedToId?: string;
  source?: string;
}

export interface CustomerFilters extends BaseFilters {
  statusId?: string;
  assignedToId?: string;
}

export interface TaskFilters extends BaseFilters {
  statusId?: string;
  assignedToId?: string;
  priority?: string;
  taskTypeId?: string;
  customerId?: string;
  leadId?: string;
  dueDateFrom?: string;
  dueDateTo?: string;
}

export interface SaleFilters extends BaseFilters {
  statusId?: string;
  customerId?: string;
  soldById?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface ProductFilters extends BaseFilters {
  categoryId?: string;
  isRetainer?: boolean;
}

export interface MeetingFilters {
  startDate: string;
  endDate: string;
  organizerId?: string;
  customerId?: string;
}

export interface UserFilters extends BaseFilters {
  isActive?: boolean;
  role?: string;
}

// ── Input Types ──

export interface CreateLeadInput {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  source?: string;
  notes?: string;
  statusId: string;
  assignedToId?: string;
  customFieldValues?: { fieldId: string; value: string }[];
}

export interface CreateCustomerInput {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
  notes?: string;
  dateOfBirth?: string;
  statusId: string;
  assignedToId?: string;
  customFieldValues?: { fieldId: string; value: string }[];
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  statusId: string;
  taskTypeId?: string;
  assignedToId?: string;
  customerId?: string;
  leadId?: string;
}

export interface CreateSaleInput {
  customerId: string;
  statusId: string;
  notes?: string;
  lineItems: {
    productId: string;
    quantity: number;
    unitPrice: number;
    isRetainer: boolean;
    retainerFrequency?: 'weekly' | 'monthly' | 'yearly';
    retainerStartDate?: string;
    retainerEndDate?: string;
  }[];
}

export interface CreateProductInput {
  name: string;
  description?: string;
  priceBeforeVat: number;
  isRetainer: boolean;
  retainerFrequency?: 'weekly' | 'monthly' | 'yearly';
  details?: string;
  termsOfService?: string;
  avgDeliveryTime?: string;
  paymentTerms?: string;
  categoryIds?: string[];
}

export interface CreateMeetingInput {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  meetingFormat: 'in_person' | 'phone' | 'zoom';
  meetingTypeId?: string;
  customerId?: string;
  inviteeIds?: string[];
}

export interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  role?: string;
  isActive?: boolean;
  permissions?: {
    entity: string;
    canView: boolean;
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    ownOnly: boolean;
  }[];
}
