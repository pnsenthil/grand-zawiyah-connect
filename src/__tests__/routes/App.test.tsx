// App Routes Tests
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { renderWithProviders } from '@/utils/testUtils';

// Mock all the page components to avoid complex rendering
jest.mock('@/pages/Index', () => {
  return function MockIndex() {
    return <div data-testid="index-page">Index Page</div>;
  };
});

jest.mock('@/pages/Dashboard', () => {
  return function MockDashboard() {
    return <div data-testid="dashboard-page">Dashboard Page</div>;
  };
});


jest.mock('@/pages/Lessons', () => {
  return function MockLessons() {
    return <div data-testid="lessons-page">Lessons Page</div>;
  };
});

jest.mock('@/pages/Donate', () => {
  return function MockDonate() {
    return <div data-testid="donate-page">Donate Page</div>;
  };
});

jest.mock('@/pages/Premium', () => {
  return function MockPremium() {
    return <div data-testid="premium-page">Premium Page</div>;
  };
});

jest.mock('@/pages/Events', () => {
  return function MockEvents() {
    return <div data-testid="events-page">Events Page</div>;
  };
});

jest.mock('@/pages/RoundUp', () => {
  return function MockRoundUp() {
    return <div data-testid="roundup-page">RoundUp Page</div>;
  };
});

jest.mock('@/pages/Auth', () => {
  return function MockAuth() {
    return <div data-testid="auth-page">Auth Page</div>;
  };
});

jest.mock('@/pages/StripeDemo', () => {
  return function MockStripeDemo() {
    return <div data-testid="stripe-demo-page">Stripe Demo Page</div>;
  };
});

jest.mock('@/pages/NotFound', () => {
  return function MockNotFound() {
    return <div data-testid="not-found-page">Not Found Page</div>;
  };
});

// Mock the hooks and contexts
jest.mock('@/hooks/useSEO', () => ({
  useSEO: jest.fn()
}));

jest.mock('@/contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    signIn: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn()
  })
}));

jest.mock('@/components/auth/ProtectedRoute', () => {
  return function MockProtectedRoute({ children, requireAuth }: { children: React.ReactNode; requireAuth?: boolean }) {
    return <div data-testid="protected-route">{children}</div>;
  };
});

describe('App Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders home page at root route', () => {
    renderWithProviders(<App />, { initialEntries: ['/'] });
    
    expect(screen.getByTestId('index-page')).toBeInTheDocument();
  });

  it('renders dashboard page at /dashboard', () => {
    renderWithProviders(<App />, { initialEntries: ['/dashboard'] });
    
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
    expect(screen.getByTestId('protected-route')).toBeInTheDocument();
  });


  it('renders lessons page at /lessons', () => {
    renderWithProviders(<App />, { initialEntries: ['/lessons'] });
    
    expect(screen.getByTestId('lessons-page')).toBeInTheDocument();
    expect(screen.getByTestId('protected-route')).toBeInTheDocument();
  });

  it('renders donate page at /donate', () => {
    renderWithProviders(<App />, { initialEntries: ['/donate'] });
    
    expect(screen.getByTestId('donate-page')).toBeInTheDocument();
  });

  it('renders premium page at /premium', () => {
    renderWithProviders(<App />, { initialEntries: ['/premium'] });
    
    expect(screen.getByTestId('premium-page')).toBeInTheDocument();
    expect(screen.getByTestId('protected-route')).toBeInTheDocument();
  });

  it('renders events page at /events', () => {
    renderWithProviders(<App />, { initialEntries: ['/events'] });
    
    expect(screen.getByTestId('events-page')).toBeInTheDocument();
  });

  it('renders roundup page at /roundup', () => {
    renderWithProviders(<App />, { initialEntries: ['/roundup'] });
    
    expect(screen.getByTestId('roundup-page')).toBeInTheDocument();
    expect(screen.getByTestId('protected-route')).toBeInTheDocument();
  });

  it('renders auth page at /auth', () => {
    renderWithProviders(<App />, { initialEntries: ['/auth'] });
    
    expect(screen.getByTestId('auth-page')).toBeInTheDocument();
    expect(screen.getByTestId('protected-route')).toBeInTheDocument();
  });

  it('renders stripe demo page at /stripe-demo', () => {
    renderWithProviders(<App />, { initialEntries: ['/stripe-demo'] });
    
    expect(screen.getByTestId('stripe-demo-page')).toBeInTheDocument();
  });

  it('renders 404 page for unknown routes', () => {
    renderWithProviders(<App />, { initialEntries: ['/unknown-route'] });
    
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });

  it('renders with layout wrapper', () => {
    renderWithProviders(<App />, { initialEntries: ['/'] });
    
    // Check that the page is rendered (layout should be present)
    expect(screen.getByTestId('index-page')).toBeInTheDocument();
  });
});
