// State Management Utilities for Grand Zawiyah
// This provides utilities for managing loading, error, and empty states

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
}

export interface ToastState {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export class StateManager<T> {
  private state: AsyncState<T>;
  private listeners: Set<(state: AsyncState<T>) => void> = new Set();

  constructor(initialData: T | null = null) {
    this.state = {
      data: initialData,
      loading: false,
      error: null,
      isEmpty: initialData === null || (Array.isArray(initialData) && initialData.length === 0)
    };
  }

  getState(): AsyncState<T> {
    return { ...this.state };
  }

  subscribe(listener: (state: AsyncState<T>) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  setLoading(loading: boolean): void {
    this.state.loading = loading;
    if (loading) {
      this.state.error = null;
    }
    this.notify();
  }

  setData(data: T | null): void {
    this.state.data = data;
    this.state.loading = false;
    this.state.error = null;
    this.state.isEmpty = data === null || (Array.isArray(data) && data.length === 0);
    this.notify();
  }

  setError(error: string | null): void {
    this.state.error = error;
    this.state.loading = false;
    this.notify();
  }

  updateData(updater: (data: T | null) => T | null): void {
    const newData = updater(this.state.data);
    this.setData(newData);
  }

  reset(): void {
    this.state = {
      data: null,
      loading: false,
      error: null,
      isEmpty: true
    };
    this.notify();
  }
}

// Toast Management
export class ToastManager {
  private toasts: ToastState[] = [];
  private listeners: Set<(toasts: ToastState[]) => void> = new Set();
  private nextId = 1;

  getToasts(): ToastState[] {
    return [...this.toasts];
  }

  subscribe(listener: (toasts: ToastState[]) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach(listener => listener(this.getToasts()));
  }

  addToast(toast: Omit<ToastState, 'id'>): string {
    const id = `toast-${this.nextId++}`;
    const newToast: ToastState = {
      id,
      duration: 5000,
      ...toast
    };

    this.toasts.push(newToast);
    this.notify();

    // Auto-remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        this.removeToast(id);
      }, newToast.duration);
    }

    return id;
  }

  removeToast(id: string): void {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.notify();
  }

  clearAll(): void {
    this.toasts = [];
    this.notify();
  }

  // Convenience methods
  success(title: string, description?: string, duration?: number): string {
    return this.addToast({ type: 'success', title, description, duration });
  }

  error(title: string, description?: string, duration?: number): string {
    return this.addToast({ type: 'error', title, description, duration });
  }

  warning(title: string, description?: string, duration?: number): string {
    return this.addToast({ type: 'warning', title, description, duration });
  }

  info(title: string, description?: string, duration?: number): string {
    return this.addToast({ type: 'info', title, description, duration });
  }
}

// Global instances
export const globalToastManager = new ToastManager();

// Async operation wrapper
export async function withAsyncState<T>(
  stateManager: StateManager<T>,
  operation: () => Promise<T>,
  errorMessage: string = 'An error occurred'
): Promise<T | null> {
  try {
    stateManager.setLoading(true);
    const result = await operation();
    stateManager.setData(result);
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : errorMessage;
    stateManager.setError(message);
    return null;
  }
}

// Retry mechanism
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt === maxRetries) {
        throw lastError;
      }

      // Exponential backoff
      const waitTime = delay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw lastError!;
}

// Debounced async operation
export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
  func: T,
  delay: number
): T {
  let timeoutId: NodeJS.Timeout;
  let currentPromise: Promise<any> | null = null;

  return ((...args: any[]) => {
    return new Promise((resolve, reject) => {
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(async () => {
        try {
          if (currentPromise) {
            await currentPromise;
          }
          currentPromise = func(...args);
          const result = await currentPromise;
          currentPromise = null;
          resolve(result);
        } catch (error) {
          currentPromise = null;
          reject(error);
        }
      }, delay);
    });
  }) as T;
}

// Loading state helpers
export const createLoadingState = <T>(initialData: T | null = null): StateManager<T> => {
  return new StateManager(initialData);
};

// Error boundary state
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

export const createErrorBoundaryState = (): ErrorBoundaryState => ({
  hasError: false,
  error: null,
  errorInfo: null
});

// Form state management
export interface FormState<T> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

export class FormStateManager<T extends Record<string, any>> {
  private state: FormState<T>;
  private listeners: Set<(state: FormState<T>) => void> = new Set();
  private validators: Partial<Record<keyof T, (value: any) => string | null>> = {};

  constructor(initialData: T) {
    this.state = {
      data: initialData,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: true
    };
  }

  getState(): FormState<T> {
    return { ...this.state };
  }

  subscribe(listener: (state: FormState<T>) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  setField<K extends keyof T>(field: K, value: T[K]): void {
    this.state.data[field] = value;
    this.state.touched[field] = true;
    
    // Validate field
    const validator = this.validators[field];
    if (validator) {
      const error = validator(value);
      if (error) {
        this.state.errors[field] = error;
      } else {
        delete this.state.errors[field];
      }
    }

    this.state.isValid = Object.keys(this.state.errors).length === 0;
    this.notify();
  }

  setFieldError<K extends keyof T>(field: K, error: string | null): void {
    if (error) {
      this.state.errors[field] = error;
    } else {
      delete this.state.errors[field];
    }
    this.state.isValid = Object.keys(this.state.errors).length === 0;
    this.notify();
  }

  setSubmitting(isSubmitting: boolean): void {
    this.state.isSubmitting = isSubmitting;
    this.notify();
  }

  setValidator<K extends keyof T>(field: K, validator: (value: any) => string | null): void {
    this.validators[field] = validator;
  }

  validateAll(): boolean {
    const errors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(this.state.data).forEach(key => {
      const field = key as keyof T;
      const validator = this.validators[field];
      if (validator) {
        const error = validator(this.state.data[field]);
        if (error) {
          errors[field] = error;
          isValid = false;
        }
      }
    });

    this.state.errors = errors;
    this.state.isValid = isValid;
    this.notify();
    return isValid;
  }

  reset(): void {
    this.state = {
      data: this.state.data,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: true
    };
    this.notify();
  }
}

// Export utilities
export const stateUtils = {
  createLoadingState,
  createErrorBoundaryState,
  withAsyncState,
  withRetry,
  debounceAsync,
  globalToastManager
};
