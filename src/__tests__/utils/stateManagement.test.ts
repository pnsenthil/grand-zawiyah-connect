// State Management Utilities Tests
import { StateManager, ToastManager, withAsyncState, withRetry, debounceAsync } from '@/utils/stateManagement';

describe('StateManager', () => {
  let stateManager: StateManager<string>;

  beforeEach(() => {
    stateManager = new StateManager<string>();
  });

  it('initializes with correct default state', () => {
    const state = stateManager.getState();
    
    expect(state.data).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.isEmpty).toBe(true);
  });

  it('initializes with provided data', () => {
    const initialState = new StateManager('initial data');
    const state = initialState.getState();
    
    expect(state.data).toBe('initial data');
    expect(state.isEmpty).toBe(false);
  });

  it('sets loading state correctly', () => {
    const listener = jest.fn();
    stateManager.subscribe(listener);
    
    stateManager.setLoading(true);
    
    expect(stateManager.getState().loading).toBe(true);
    expect(stateManager.getState().error).toBeNull();
    expect(listener).toHaveBeenCalled();
  });

  it('sets data correctly', () => {
    const listener = jest.fn();
    stateManager.subscribe(listener);
    
    stateManager.setData('test data');
    
    const state = stateManager.getState();
    expect(state.data).toBe('test data');
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.isEmpty).toBe(false);
    expect(listener).toHaveBeenCalled();
  });

  it('sets error correctly', () => {
    const listener = jest.fn();
    stateManager.subscribe(listener);
    
    stateManager.setError('test error');
    
    const state = stateManager.getState();
    expect(state.error).toBe('test error');
    expect(state.loading).toBe(false);
    expect(listener).toHaveBeenCalled();
  });

  it('updates data using updater function', () => {
    stateManager.setData('initial');
    stateManager.updateData(data => data ? data.toUpperCase() : null);
    
    expect(stateManager.getState().data).toBe('INITIAL');
  });

  it('resets state correctly', () => {
    stateManager.setData('test');
    stateManager.setError('error');
    stateManager.setLoading(true);
    
    stateManager.reset();
    
    const state = stateManager.getState();
    expect(state.data).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.isEmpty).toBe(true);
  });

  it('handles array data for isEmpty correctly', () => {
    const arrayManager = new StateManager<string[]>([]);
    expect(arrayManager.getState().isEmpty).toBe(true);
    
    arrayManager.setData(['item1', 'item2']);
    expect(arrayManager.getState().isEmpty).toBe(false);
  });

  it('unsubscribes listeners correctly', () => {
    const listener = jest.fn();
    const unsubscribe = stateManager.subscribe(listener);
    
    stateManager.setData('test');
    expect(listener).toHaveBeenCalledTimes(1);
    
    unsubscribe();
    stateManager.setData('test2');
    expect(listener).toHaveBeenCalledTimes(1); // Should not be called again
  });
});

describe('ToastManager', () => {
  let toastManager: ToastManager;

  beforeEach(() => {
    toastManager = new ToastManager();
  });

  it('initializes with empty toasts', () => {
    expect(toastManager.getToasts()).toEqual([]);
  });

  it('adds toast correctly', () => {
    const listener = jest.fn();
    toastManager.subscribe(listener);
    
    const id = toastManager.addToast({
      type: 'success',
      title: 'Success!',
      description: 'Operation completed'
    });
    
    expect(id).toBeDefined();
    expect(toastManager.getToasts()).toHaveLength(1);
    expect(toastManager.getToasts()[0].title).toBe('Success!');
    expect(listener).toHaveBeenCalled();
  });

  it('removes toast correctly', () => {
    const id = toastManager.addToast({
      type: 'error',
      title: 'Error!'
    });
    
    toastManager.removeToast(id);
    
    expect(toastManager.getToasts()).toHaveLength(0);
  });

  it('clears all toasts', () => {
    toastManager.addToast({ type: 'info', title: 'Info 1' });
    toastManager.addToast({ type: 'warning', title: 'Warning 1' });
    
    toastManager.clearAll();
    
    expect(toastManager.getToasts()).toHaveLength(0);
  });

  it('provides convenience methods', () => {
    const successId = toastManager.success('Success!', 'Description');
    const errorId = toastManager.error('Error!');
    const warningId = toastManager.warning('Warning!');
    const infoId = toastManager.info('Info!');
    
    const toasts = toastManager.getToasts();
    expect(toasts).toHaveLength(4);
    expect(toasts[0].type).toBe('success');
    expect(toasts[1].type).toBe('error');
    expect(toasts[2].type).toBe('warning');
    expect(toasts[3].type).toBe('info');
  });

  it('auto-removes toast after duration', async () => {
    jest.useFakeTimers();
    
    const id = toastManager.addToast({
      type: 'info',
      title: 'Auto remove',
      duration: 1000
    });
    
    expect(toastManager.getToasts()).toHaveLength(1);
    
    jest.advanceTimersByTime(1000);
    
    expect(toastManager.getToasts()).toHaveLength(0);
    
    jest.useRealTimers();
  });
});

describe('withAsyncState', () => {
  let stateManager: StateManager<string>;

  beforeEach(() => {
    stateManager = new StateManager<string>();
  });

  it('handles successful async operation', async () => {
    const operation = jest.fn().mockResolvedValue('success data');
    
    const result = await withAsyncState(stateManager, operation);
    
    expect(result).toBe('success data');
    expect(stateManager.getState().data).toBe('success data');
    expect(stateManager.getState().loading).toBe(false);
    expect(stateManager.getState().error).toBeNull();
  });

  it('handles failed async operation', async () => {
    const operation = jest.fn().mockRejectedValue(new Error('operation failed'));
    
    const result = await withAsyncState(stateManager, operation, 'Custom error message');
    
    expect(result).toBeNull();
    expect(stateManager.getState().error).toBe('operation failed');
    expect(stateManager.getState().loading).toBe(false);
  });

  it('uses custom error message for non-Error objects', async () => {
    const operation = jest.fn().mockRejectedValue('string error');
    
    const result = await withAsyncState(stateManager, operation, 'Custom error message');
    
    expect(result).toBeNull();
    expect(stateManager.getState().error).toBe('Custom error message');
  });
});

describe('withRetry', () => {
  it('succeeds on first attempt', async () => {
    const operation = jest.fn().mockResolvedValue('success');
    
    const result = await withRetry(operation);
    
    expect(result).toBe('success');
    expect(operation).toHaveBeenCalledTimes(1);
  });

  it('retries on failure and eventually succeeds', async () => {
    jest.useFakeTimers();
    
    const operation = jest.fn()
      .mockRejectedValueOnce(new Error('fail 1'))
      .mockRejectedValueOnce(new Error('fail 2'))
      .mockResolvedValue('success');
    
    const promise = withRetry(operation, 3, 100);
    
    // Advance timers to handle delays
    jest.advanceTimersByTime(100);
    jest.advanceTimersByTime(200);
    
    const result = await promise;
    
    expect(result).toBe('success');
    expect(operation).toHaveBeenCalledTimes(3);
    
    jest.useRealTimers();
  });

  it('fails after max retries', async () => {
    jest.useFakeTimers();
    
    const operation = jest.fn().mockRejectedValue(new Error('always fails'));
    
    const promise = withRetry(operation, 2, 100);
    
    // Advance timers
    jest.advanceTimersByTime(100);
    jest.advanceTimersByTime(200);
    
    await expect(promise).rejects.toThrow('always fails');
    expect(operation).toHaveBeenCalledTimes(3); // initial + 2 retries
    
    jest.useRealTimers();
  });
});

describe('debounceAsync', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('debounces async function calls', async () => {
    const operation = jest.fn().mockResolvedValue('result');
    const debouncedOperation = debounceAsync(operation, 100);
    
    const promise1 = debouncedOperation('arg1');
    const promise2 = debouncedOperation('arg2');
    const promise3 = debouncedOperation('arg3');
    
    jest.advanceTimersByTime(100);
    
    const result = await promise3;
    
    expect(result).toBe('result');
    expect(operation).toHaveBeenCalledTimes(1);
    expect(operation).toHaveBeenCalledWith('arg3');
  });

  it('handles errors in debounced operations', async () => {
    const operation = jest.fn().mockRejectedValue(new Error('operation failed'));
    const debouncedOperation = debounceAsync(operation, 100);
    
    const promise = debouncedOperation('arg');
    
    jest.advanceTimersByTime(100);
    
    await expect(promise).rejects.toThrow('operation failed');
  });
});
