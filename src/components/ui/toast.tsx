// Toast Component for Grand Zawiyah
// Provides a comprehensive toast notification system

import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { globalToastManager, ToastState } from '@/utils/stateManagement';

interface ToastProps {
  toast: ToastState;
  onRemove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsLeaving(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" />;
      default:
        return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-lg border shadow-lg transition-all duration-300 ease-in-out',
        getBackgroundColor(),
        isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        'min-w-[320px] max-w-md'
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex-shrink-0 mt-0.5">
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 mb-1">
          {toast.title}
        </h4>
        {toast.description && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {toast.description}
          </p>
        )}
        {toast.action && (
          <div className="mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={toast.action.onClick}
              className="text-xs"
            >
              {toast.action.label}
            </Button>
          </div>
        )}
      </div>
      
      <button
        onClick={handleRemove}
        className="flex-shrink-0 p-1 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="Close notification"
      >
        <X className="h-4 w-4 text-gray-500" />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  maxToasts?: number;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ 
  position = 'top-right',
  maxToasts = 5 
}) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  useEffect(() => {
    const unsubscribe = globalToastManager.subscribe((newToasts) => {
      setToasts(newToasts.slice(-maxToasts));
    });

    return unsubscribe;
  }, [maxToasts]);

  const handleRemove = (id: string) => {
    globalToastManager.removeToast(id);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      default:
        return 'top-4 right-4';
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col gap-2 pointer-events-none',
        getPositionClasses()
      )}
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} onRemove={handleRemove} />
        </div>
      ))}
    </div>
  );
};

// Hook for using toasts in components
export const useToast = () => {
  return {
    success: (title: string, description?: string, duration?: number) =>
      globalToastManager.success(title, description, duration),
    error: (title: string, description?: string, duration?: number) =>
      globalToastManager.error(title, description, duration),
    warning: (title: string, description?: string, duration?: number) =>
      globalToastManager.warning(title, description, duration),
    info: (title: string, description?: string, duration?: number) =>
      globalToastManager.info(title, description, duration),
    remove: (id: string) => globalToastManager.removeToast(id),
    clearAll: () => globalToastManager.clearAll()
  };
};

// Loading Spinner Component
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className,
  text 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-gray-300 border-t-primary',
          sizeClasses[size]
        )}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <span className="text-sm text-gray-600 animate-pulse">
          {text}
        </span>
      )}
    </div>
  );
};

// Error Display Component
interface ErrorDisplayProps {
  error: string | null;
  title?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
  error, 
  title = 'Something went wrong',
  onRetry,
  className 
}) => {
  if (!error) return null;

  return (
    <div className={cn('p-4 rounded-lg bg-red-50 border border-red-200', className)}>
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-red-800 mb-1">
            {title}
          </h3>
          <p className="text-sm text-red-700 mb-3">
            {error}
          </p>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="text-red-700 border-red-300 hover:bg-red-100"
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Empty State Component
interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  description, 
  icon,
  action,
  className 
}) => {
  return (
    <div className={cn('text-center py-12 px-4', className)}>
      {icon && (
        <div className="flex justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

// Loading State Component
interface LoadingStateProps {
  text?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  text = 'Loading...',
  className 
}) => {
  return (
    <div className={cn('flex items-center justify-center py-12', className)}>
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
};

export { ToastContainer };
export default ToastContainer;