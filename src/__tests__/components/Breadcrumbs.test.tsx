// Breadcrumbs Component Tests
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { TEST_IDS } from '@/utils/testUtils';

// Mock useLocation hook
const mockLocation = {
  pathname: '/dashboard/profile',
  search: '',
  hash: '',
  state: null,
  key: 'test'
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockLocation,
}));

describe('Breadcrumbs Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Breadcrumbs />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('displays correct breadcrumb items for dashboard profile page', () => {
    render(
      <BrowserRouter>
        <Breadcrumbs />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('shows home icon for home breadcrumb', () => {
    render(
      <BrowserRouter>
        <Breadcrumbs />
      </BrowserRouter>
    );
    
    const homeLink = screen.getByText('Home');
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('marks the last item as active', () => {
    render(
      <BrowserRouter>
        <Breadcrumbs />
      </BrowserRouter>
    );
    
    const profileItem = screen.getByText('Profile');
    expect(profileItem).toHaveAttribute('aria-current', 'page');
  });

  it('renders custom breadcrumb items when provided', () => {
    const customItems = [
      { label: 'Custom Home', href: '/custom' },
      { label: 'Custom Page', isActive: true }
    ];

    render(
      <BrowserRouter>
        <Breadcrumbs items={customItems} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Custom Home')).toBeInTheDocument();
    expect(screen.getByText('Custom Page')).toBeInTheDocument();
  });

  it('does not render when only one item', () => {
    const singleItem = [
      { label: 'Only Item', isActive: true }
    ];

    const { container } = render(
      <BrowserRouter>
        <Breadcrumbs items={singleItem} />
      </BrowserRouter>
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('applies custom className', () => {
    const { container } = render(
      <BrowserRouter>
        <Breadcrumbs className="custom-class" />
      </BrowserRouter>
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('can hide home breadcrumb', () => {
    render(
      <BrowserRouter>
        <Breadcrumbs showHome={false} />
      </BrowserRouter>
    );
    
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
