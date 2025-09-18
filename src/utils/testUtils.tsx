// Test Utilities for Grand Zawiyah
// Provides common testing utilities and helpers

import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';

// Mock user for testing
export const mockUser = {
  id: 'test-user-1',
  name: 'Test User',
  email: 'test@example.com',
  avatar: 'https://example.com/avatar.jpg'
};

// Mock authentication context
export const mockAuthContext = {
  user: mockUser,
  isAuthenticated: true,
  signIn: jest.fn(),
  signUp: jest.fn(),
  signOut: jest.fn()
};

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
  user?: typeof mockUser | null;
  isAuthenticated?: boolean;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    initialEntries = ['/'],
    user = mockUser,
    isAuthenticated = true,
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            {children}
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Mock router for testing
export const mockNavigate = jest.fn();
export const mockLocation = {
  pathname: '/',
  search: '',
  hash: '',
  state: null,
  key: 'test'
};

// Mock React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

// Mock toast functions
export const mockToast = {
  success: jest.fn(),
  error: jest.fn(),
  warning: jest.fn(),
  info: jest.fn(),
  remove: jest.fn(),
  clearAll: jest.fn()
};

// Mock analytics
export const mockAnalytics = {
  trackPageView: jest.fn(),
  trackDonationFunnelEvent: jest.fn(),
  trackDonationSuccess: jest.fn(),
  trackDonationFailure: jest.fn()
};

// Mock payment service
export const mockPaymentService = {
  getPaymentMethods: jest.fn(),
  addPaymentMethod: jest.fn(),
  processDonation: jest.fn(),
  getRoundUpSettings: jest.fn(),
  updateRoundUpSettings: jest.fn(),
  validateCard: jest.fn()
};

// Mock API service
export const mockApiService = {
  getUsers: jest.fn(),
  getDonations: jest.fn(),
  getCampaigns: jest.fn(),
  getLessons: jest.fn(),
  getEvents: jest.fn(),
  getAchievements: jest.fn()
};

// Test data factories
export const createMockUser = (overrides = {}) => ({
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://example.com/avatar.jpg',
  ...overrides
});

export const createMockDonation = (overrides = {}) => ({
  id: 'donation-1',
  amount: 100,
  frequency: 'one-time' as const,
  campaign: 'General Fund',
  donorInfo: {
    name: 'John Doe',
    email: 'john@example.com'
  },
  paymentMethodId: 'pm-1',
  isAnonymous: false,
  message: 'Thank you for your work',
  createdAt: '2024-01-15T10:00:00Z',
  ...overrides
});

export const createMockCampaign = (overrides = {}) => ({
  id: 'campaign-1',
  title: 'General Fund',
  description: 'Support our general operations',
  goal: 10000,
  raised: 7500,
  donors: 150,
  image: 'https://example.com/campaign.jpg',
  isActive: true,
  createdAt: '2024-01-01T00:00:00Z',
  ...overrides
});

export const createMockLesson = (overrides = {}) => ({
  id: 'lesson-1',
  title: 'Introduction to Tariqa Tijaniyya',
  description: 'Learn about the foundations and principles',
  duration: '45 min',
  type: 'video' as const,
  level: 'beginner' as const,
  isPremium: false,
  isCompleted: false,
  rating: 4.5,
  thumbnail: 'https://example.com/lesson.jpg',
  ...overrides
});

export const createMockEvent = (overrides = {}) => ({
  id: 'event-1',
  title: 'Community Gathering',
  description: 'Monthly community gathering',
  date: '2024-02-15T18:00:00Z',
  location: 'Community Center',
  image: 'https://example.com/event.jpg',
  isFeatured: true,
  maxAttendees: 100,
  currentAttendees: 45,
  ...overrides
});

// Utility functions for testing
export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockFetch = (data: any, status = 200) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data)),
    })
  ) as jest.Mock;
};

export const mockFetchError = (message = 'Network error') => {
  global.fetch = jest.fn(() =>
    Promise.reject(new Error(message))
  ) as jest.Mock;
};

// Clean up function
export const cleanup = () => {
  jest.clearAllMocks();
  mockNavigate.mockClear();
  mockToast.success.mockClear();
  mockToast.error.mockClear();
  mockToast.warning.mockClear();
  mockToast.info.mockClear();
  mockAnalytics.trackPageView.mockClear();
  mockAnalytics.trackDonationFunnelEvent.mockClear();
  mockAnalytics.trackDonationSuccess.mockClear();
  mockAnalytics.trackDonationFailure.mockClear();
};

// Test constants
export const TEST_IDS = {
  LOADING_SPINNER: 'loading-spinner',
  ERROR_DISPLAY: 'error-display',
  EMPTY_STATE: 'empty-state',
  TOAST_CONTAINER: 'toast-container',
  BREADCRUMBS: 'breadcrumbs',
  NAVIGATION: 'main-navigation',
  USER_MENU: 'user-menu',
  DONATION_FORM: 'donation-form',
  PAYMENT_FORM: 'payment-form',
  LESSON_CARD: 'lesson-card',
  EVENT_CARD: 'event-card',
  CAMPAIGN_CARD: 'campaign-card'
} as const;

export const TEST_ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile',
  LESSONS: '/lessons',
  DONATE: '/donate',
  PREMIUM: '/premium',
  EVENTS: '/events',
  AUTH: '/auth',
  ROUNDUP: '/roundup',
  STRIPE_DEMO: '/stripe-demo'
} as const;
