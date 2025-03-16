export type SafetyStatus =
  | "MR Safe"
  | "MR Conditional"
  | "MR Unsafe"
  | "Unknown";

export interface Device {
  id: number;
  name: string;
  modelNumber?: string;
  manufacturerId: number;
  manufacturer?: Manufacturer;
  categoryId: number;
  category?: Category;
  safetyStatus: SafetyStatus;
  conditions?: string;
  fieldStrength?: string;
  additionalInfo?: string;
  documentationUrl?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Manufacturer {
  id: number;
  name: string;
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  categoryId?: number;
  manufacturerId?: number;
  safetyStatus?: SafetyStatus;
  query?: string;
}
