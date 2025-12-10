
export enum ViewState {
  ONBOARDING = 'ONBOARDING',
  AUTH = 'AUTH',
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  FACILITY_DETAILS = 'FACILITY_DETAILS',
  PROFILE = 'PROFILE', // Kept for direct doctor access if needed, though flow favors Facility now
  DASHBOARD = 'DASHBOARD'
}

export type UserRole = 'PATIENT' | 'PROVIDER';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface Review {
  id: string;
  facilityId: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Facility {
  id: string;
  name: string;
  location: string;
  address: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  services: Service[];
  openingHours: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string; // Display name
  facilityId: string; // Link to Facility
  location: string;
  price: number; // Base consultation fee (fallback)
  rating: number;
  reviews: number;
  verified: boolean;
  image: string;
  description: string;
  availableDays: string[];
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  hospitalName: string;
  facilityId?: string; // Added for linking reviews
  serviceName: string;
  price: number;
  time: string;
  date: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'unpaid';
  reviewed?: boolean; // Track if review has been left
}

export interface SearchFilters {
  specialty: string;
  location: string;
}
