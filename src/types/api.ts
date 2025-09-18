// API Types for Grand Zawiyah
// This file defines all the TypeScript interfaces and types used across the API layer

// Base API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  isEmailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
  preferences: UserPreferences;
  profile: UserProfile;
}

export interface UserPreferences {
  notifications: boolean;
  newsletter: boolean;
  language: string;
  timezone: string;
  privacy: {
    showDonations: boolean;
    showProfile: boolean;
  };
}

export interface UserProfile {
  bio?: string;
  location?: string;
  website?: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
  interests: string[];
  volunteerInterests: string[];
}

// Donation Types
export interface Donation {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  frequency: 'one-time' | 'monthly' | 'annual';
  campaign: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethodId: string;
  isAnonymous: boolean;
  message?: string;
  createdAt: string;
  updatedAt: string;
  receiptUrl?: string;
  metadata: Record<string, any>;
}

export interface DonationCampaign {
  id: string;
  name: string;
  description: string;
  goal: number;
  raised: number;
  currency: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  imageUrl?: string;
  category: string;
  tags: string[];
  donorCount: number;
  createdAt: string;
  updatedAt: string;
}

// Payment Types
export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'card' | 'bank' | 'wallet';
  provider: 'stripe' | 'paypal' | 'apple_pay' | 'google_pay';
  last4: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  metadata: Record<string, any>;
}

export interface Transaction {
  id: string;
  userId: string;
  donationId?: string;
  amount: number;
  currency: string;
  type: 'donation' | 'refund' | 'fee';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  paymentMethodId: string;
  providerTransactionId: string;
  createdAt: string;
  processedAt?: string;
  metadata: Record<string, any>;
}

// Round-up Types
export interface RoundUpSettings {
  id: string;
  userId: string;
  isEnabled: boolean;
  monthlyCap: number;
  linkedCardId?: string;
  isPaused: boolean;
  totalRoundUp: number;
  thisMonthRoundUp: number;
  createdAt: string;
  updatedAt: string;
}

export interface RoundUpTransaction {
  id: string;
  userId: string;
  amount: number;
  originalAmount: number;
  roundedAmount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  processedAt?: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  isVirtual: boolean;
  virtualLink?: string;
  capacity: number;
  registeredCount: number;
  price: number;
  currency: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  organizerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'attended';
  registeredAt: string;
  checkedInAt?: string;
  metadata: Record<string, any>;
}

// Lesson Types
export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  audioUrl?: string;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  isPremium: boolean;
  instructorId: string;
  instructorName: string;
  thumbnailUrl?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  progress: number; // percentage 0-100
  completedAt?: string;
  lastWatchedAt: string;
  watchTime: number; // in seconds
}

// Analytics Types
export interface AnalyticsEvent {
  id: string;
  userId?: string;
  event: string;
  properties: Record<string, any>;
  timestamp: string;
  sessionId: string;
  page: string;
  userAgent: string;
  ip?: string;
}

export interface DonationAnalytics {
  totalDonations: number;
  totalAmount: number;
  averageDonation: number;
  monthlyDonations: Array<{
    month: string;
    count: number;
    amount: number;
  }>;
  topCampaigns: Array<{
    campaignId: string;
    campaignName: string;
    amount: number;
    count: number;
  }>;
  donorRetention: {
    newDonors: number;
    returningDonors: number;
    retentionRate: number;
  };
}

// API Request Types
export interface CreateDonationRequest {
  amount: number;
  currency: string;
  frequency: 'one-time' | 'monthly' | 'annual';
  campaign: string;
  paymentMethodId: string;
  isAnonymous: boolean;
  message?: string;
}

export interface UpdateUserRequest {
  name?: string;
  phone?: string;
  preferences?: Partial<UserPreferences>;
  profile?: Partial<UserProfile>;
}

export interface CreateEventRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: Event['location'];
  isVirtual: boolean;
  virtualLink?: string;
  capacity: number;
  price: number;
  currency: string;
  category: string;
  tags: string[];
  imageUrl?: string;
}

// API Configuration
export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  apiKey?: string;
  environment: 'development' | 'staging' | 'production';
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

// Cache Types
export interface CacheConfig {
  ttl: number; // time to live in seconds
  maxSize: number;
  strategy: 'lru' | 'fifo' | 'ttl';
}

export interface CacheEntry<T> {
  key: string;
  value: T;
  expiresAt: number;
  createdAt: number;
}

// Adapter Types
export interface ApiAdapter {
  name: string;
  config: ApiConfig;
  get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>>;
  post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>>;
  put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>>;
  delete<T>(endpoint: string): Promise<ApiResponse<T>>;
  patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>>;
}

// Service Types
export interface ServiceConfig {
  adapter: ApiAdapter;
  cache?: CacheConfig;
  retryConfig?: {
    maxRetries: number;
    retryDelay: number;
    backoffMultiplier: number;
  };
}
