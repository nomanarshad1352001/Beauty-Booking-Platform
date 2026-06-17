// ─── User / Auth Types ───────────────────────────────────────
export type UserRole = 'admin' | 'manager';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

// ─── Location Types ──────────────────────────────────────────
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  imageUrl: string;
  isActive: boolean;
  hours: BusinessHours;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  open: string;
  close: string;
  isClosed: boolean;
}

// ─── Service Types ───────────────────────────────────────────
export type ServiceCategorySlug =
  | 'permanent-makeup'
  | 'facials'
  | 'injectables'
  | 'lashes'
  | 'body-treatments'
  | 'skincare';

export interface ServiceCategory {
  id: string;
  name: string;
  slug: ServiceCategorySlug;
  description: string;
  icon: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  categoryId: string;
  locationIds: string[];
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  depositAmount: number;
  imageUrl: string;
  isActive: boolean;
  isPopular: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Provider Types ──────────────────────────────────────────
export interface Provider {
  id: string;
  locationId: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  serviceIds: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Client Types ────────────────────────────────────────────
export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isNewClient: boolean;
  totalBookings: number;
  totalSpent: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Booking Types ───────────────────────────────────────────
export type BookingStatus =
  | 'confirmed'
  | 'pending'
  | 'completed'
  | 'cancelled'
  | 'no-show';

export interface Booking {
  id: string;
  clientId: string;
  providerId: string;
  serviceId: string;
  locationId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  totalPrice: number;
  depositPaid: number;
  notes?: string;
  source: 'website' | 'admin' | 'api';
  createdAt: string;
  updatedAt: string;
}

// ─── Booking Flow Types ──────────────────────────────────────
export type BookingStep =
  | 'client-type'
  | 'location'
  | 'category'
  | 'service'
  | 'provider'
  | 'datetime'
  | 'details'
  | 'payment'
  | 'confirmation';

export interface BookingFlowState {
  currentStep: BookingStep;
  isNewClient: boolean | null;
  selectedLocationId: string | null;
  selectedCategoryId: string | null;
  selectedServiceId: string | null;
  selectedProviderId: string | null;
  selectedDate: string | null;
  selectedTime: string | null;
  clientDetails: ClientDetails | null;
  paymentCompleted: boolean;
}

export interface ClientDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
}

// ─── Branding Types ──────────────────────────────────────────
export interface BrandSettings {
  businessName: string;
  tagline: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontPrimary: string;
  fontSecondary: string;
  heroImageUrl: string;
  aboutText: string;
}

// ─── Integration Types ───────────────────────────────────────
export type IntegrationProvider =
  | 'stripe'
  | 'mangomint'
  | 'boulevard'
  | 'vagaro'
  | 'glossgenius'
  | 'klaviyo';

export type IntegrationStatus = 'connected' | 'disconnected' | 'error';

export interface Integration {
  id: string;
  provider: IntegrationProvider;
  name: string;
  description: string;
  status: IntegrationStatus;
  icon: string;
  apiKeySet: boolean;
  lastSyncAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Analytics Types ─────────────────────────────────────────
export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  newClients: number;
  avgRating: number;
  bookingsTrend: number;
  revenueTrend: number;
  clientsTrend: number;
  ratingTrend: number;
}

export interface ChartDataPoint {
  name: string;
  bookings: number;
  revenue: number;
}

// ─── Toast / Notification Types ──────────────────────────────
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

// ─── Table / List Types ──────────────────────────────────────
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}
