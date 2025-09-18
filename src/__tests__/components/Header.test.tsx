// Header Component Tests
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { mockAuthContext, mockUser } from '@/utils/testUtils';

// Mock the AuthContext
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => mockAuthContext
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/dashboard' }),
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays logo and brand name', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Grand Zawiyah')).toBeInTheDocument();
    expect(screen.getByText('Growth & Legacy through Sadaqah Jariyah')).toBeInTheDocument();
  });

  it('shows navigation items', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Donate')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
  });

  it('shows user menu when authenticated', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it('shows sign in button when not authenticated', () => {
    const mockUnauthenticatedContext = {
      ...mockAuthContext,
      user: null,
      isAuthenticated: false
    };

    jest.doMock('@/contexts/AuthContext', () => ({
      useAuth: () => mockUnauthenticatedContext
    }));

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('opens mobile menu when menu button is clicked', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('navigates to profile when profile menu item is clicked', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    // Open user menu
    const userButton = screen.getByRole('button');
    fireEvent.click(userButton);
    
    // Click profile menu item
    const profileItem = screen.getByText('Profile');
    fireEvent.click(profileItem);
    
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/profile');
  });

  it('calls signOut when logout is clicked', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    // Open user menu
    const userButton = screen.getByRole('button');
    fireEvent.click(userButton);
    
    // Click logout menu item
    const logoutItem = screen.getByText('Log out');
    fireEvent.click(logoutItem);
    
    expect(mockAuthContext.signOut).toHaveBeenCalled();
  });

  it('highlights active navigation item', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    const dashboardLink = screen.getByText('Dashboard');
    expect(dashboardLink.closest('a')).toHaveClass('text-legacy-dark', 'font-bold', 'underline');
  });

  it('displays breadcrumbs', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
  });
});
