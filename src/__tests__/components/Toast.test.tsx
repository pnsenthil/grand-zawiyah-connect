// Toast Component Tests
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ToastContainer, useToast } from '@/components/ui/Toast';
import { globalToastManager } from '@/utils/stateManagement';

// Mock the global toast manager
jest.mock('@/utils/stateManagement', () => ({
  globalToastManager: {
    subscribe: jest.fn((callback) => {
      // Simulate initial empty state
      callback([]);
      return () => {}; // unsubscribe function
    }),
    addToast: jest.fn(),
    removeToast: jest.fn(),
    clearAll: jest.fn()
  }
}));

describe('Toast System', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders toast container without crashing', () => {
    render(<ToastContainer />);
    
    // Toast container should be present but empty initially
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('useToast hook provides all necessary methods', () => {
    const TestComponent = () => {
      const toast = useToast();
      
      return (
        <div>
          <button onClick={() => toast.success('Success!')}>Success</button>
          <button onClick={() => toast.error('Error!')}>Error</button>
          <button onClick={() => toast.warning('Warning!')}>Warning</button>
          <button onClick={() => toast.info('Info!')}>Info</button>
          <button onClick={() => toast.remove('toast-1')}>Remove</button>
          <button onClick={() => toast.clearAll()}>Clear All</button>
        </div>
      );
    };

    render(<TestComponent />);
    
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
    expect(screen.getByText('Clear All')).toBeInTheDocument();
  });

  it('calls global toast manager methods when toast functions are used', () => {
    const TestComponent = () => {
      const toast = useToast();
      
      return (
        <button onClick={() => toast.success('Test success')}>
          Test Toast
        </button>
      );
    };

    render(<TestComponent />);
    
    const button = screen.getByText('Test Toast');
    fireEvent.click(button);
    
    expect(globalToastManager.addToast).toHaveBeenCalledWith({
      type: 'success',
      title: 'Test success',
      description: undefined,
      duration: undefined
    });
  });

  it('handles toast with description and duration', () => {
    const TestComponent = () => {
      const toast = useToast();
      
      return (
        <button onClick={() => toast.error('Error title', 'Error description', 5000)}>
          Test Error Toast
        </button>
      );
    };

    render(<TestComponent />);
    
    const button = screen.getByText('Test Error Toast');
    fireEvent.click(button);
    
    expect(globalToastManager.addToast).toHaveBeenCalledWith({
      type: 'error',
      title: 'Error title',
      description: 'Error description',
      duration: 5000
    });
  });

  it('calls removeToast when remove is called', () => {
    const TestComponent = () => {
      const toast = useToast();
      
      return (
        <button onClick={() => toast.remove('toast-123')}>
          Remove Toast
        </button>
      );
    };

    render(<TestComponent />);
    
    const button = screen.getByText('Remove Toast');
    fireEvent.click(button);
    
    expect(globalToastManager.removeToast).toHaveBeenCalledWith('toast-123');
  });

  it('calls clearAll when clearAll is called', () => {
    const TestComponent = () => {
      const toast = useToast();
      
      return (
        <button onClick={() => toast.clearAll()}>
          Clear All Toasts
        </button>
      );
    };

    render(<TestComponent />);
    
    const button = screen.getByText('Clear All Toasts');
    fireEvent.click(button);
    
    expect(globalToastManager.clearAll).toHaveBeenCalled();
  });
});

// Test individual toast component
describe('Toast Component', () => {
  const mockToast = {
    id: 'toast-1',
    type: 'success' as const,
    title: 'Success!',
    description: 'Operation completed successfully',
    duration: 5000
  };

  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders toast with correct content', () => {
    const { Toast } = require('@/components/ui/Toast');
    
    render(
      <Toast toast={mockToast} onRemove={mockOnRemove} />
    );
    
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Operation completed successfully')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('calls onRemove when close button is clicked', () => {
    const { Toast } = require('@/components/ui/Toast');
    
    render(
      <Toast toast={mockToast} onRemove={mockOnRemove} />
    );
    
    const closeButton = screen.getByLabelText('Close notification');
    fireEvent.click(closeButton);
    
    expect(mockOnRemove).toHaveBeenCalledWith('toast-1');
  });

  it('renders different toast types with correct styling', () => {
    const { Toast } = require('@/components/ui/Toast');
    
    const errorToast = { ...mockToast, type: 'error' as const, title: 'Error!' };
    
    render(
      <Toast toast={errorToast} onRemove={mockOnRemove} />
    );
    
    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-red-50', 'border-red-200');
  });
});
