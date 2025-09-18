// Dashboard Page Tests
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import { renderWithProviders, mockUser } from '@/utils/testUtils';

// Mock the analytics hook
jest.mock('@/hooks/useAnalytics', () => ({
  usePageTracking: jest.fn()
}));

// Mock the toast hook
jest.mock('@/components/ui/Toast', () => ({
  useToast: () => ({
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn()
  })
}));

describe('Dashboard Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithProviders(<Dashboard />);
    
    expect(screen.getByText('Welcome back, Ahmed')).toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    renderWithProviders(<Dashboard />);
    
    // Should show loading spinner initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows dashboard content after loading', async () => {
    renderWithProviders(<Dashboard />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Welcome back, Ahmed')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    expect(screen.getByText('Track your spiritual journey and community impact')).toBeInTheDocument();
  });

  it('displays dashboard tabs', async () => {
    renderWithProviders(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Overview')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    expect(screen.getByText('Donations')).toBeInTheDocument();
    expect(screen.getByText('Achievements')).toBeInTheDocument();
    expect(screen.getByText('Learning')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
  });

  it('shows donation statistics', async () => {
    renderWithProviders(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Total Donated')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    expect(screen.getByText('$1,480')).toBeInTheDocument();
    expect(screen.getByText('This Month')).toBeInTheDocument();
    expect(screen.getByText('$400')).toBeInTheDocument();
  });

  it('displays progress towards goal', async () => {
    renderWithProviders(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Goal Progress')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    expect(screen.getByText('$1,480 of $2,000')).toBeInTheDocument();
    expect(screen.getByText('74%')).toBeInTheDocument();
  });

  it('shows recent donations', async () => {
    renderWithProviders(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Recent Donations')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    expect(screen.getByText('General Fund')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
  });

  it('displays achievements', async () => {
    renderWithProviders(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Achievements')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    expect(screen.getByText('First Donation')).toBeInTheDocument();
    expect(screen.getByText('Monthly Supporter')).toBeInTheDocument();
  });

  it('shows learning progress', async () => {
    renderWithProviders(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Learning Progress')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    expect(screen.getByText('Lessons Completed')).toBeInTheDocument();
    expect(screen.getByText('3 of 12')).toBeInTheDocument();
  });

  it('handles tab switching', async () => {
    renderWithProviders(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Overview')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Click on Donations tab
    const donationsTab = screen.getByText('Donations');
    donationsTab.click();
    
    // Should show donations content
    expect(screen.getByText('Donation History')).toBeInTheDocument();
  });

  it('displays error state when loading fails', async () => {
    // Mock console.error to avoid noise in test output
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock a component that throws an error
    const ErrorDashboard = () => {
      throw new Error('Test error');
    };
    
    renderWithProviders(<ErrorDashboard />);
    
    // Should show error boundary content
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });
});
