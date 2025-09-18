// Base API Adapter for Grand Zawiyah
// This provides the foundation for all API adapters

import { ApiResponse, ApiConfig, ApiError } from '@/types/api';

export abstract class BaseAdapter {
  protected config: ApiConfig;
  protected baseHeaders: Record<string, string>;

  constructor(config: ApiConfig) {
    this.config = config;
    this.baseHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (config.apiKey) {
      this.baseHeaders['Authorization'] = `Bearer ${config.apiKey}`;
    }
  }

  // Abstract methods that must be implemented by concrete adapters
  abstract get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>>;
  abstract post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>>;
  abstract put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>>;
  abstract delete<T>(endpoint: string): Promise<ApiResponse<T>>;
  abstract patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>>;

  // Common utility methods
  protected buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.config.baseUrl);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return url.toString();
  }

  protected buildHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    return {
      ...this.baseHeaders,
      ...customHeaders,
    };
  }

  protected createErrorResponse(error: any, message?: string): ApiResponse {
    const apiError: ApiError = {
      code: error.code || 'UNKNOWN_ERROR',
      message: message || error.message || 'An unexpected error occurred',
      details: error.details || {},
      timestamp: new Date().toISOString(),
    };

    return {
      success: false,
      error: apiError.message,
      timestamp: new Date().toISOString(),
    };
  }

  protected createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  protected async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  protected async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = this.config.retries,
    delay: number = 1000
  ): Promise<T> {
    let lastError: any;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        if (attempt === maxRetries) {
          throw error;
        }
        
        // Exponential backoff
        const waitTime = delay * Math.pow(2, attempt);
        await this.delay(waitTime);
      }
    }
    
    throw lastError;
  }

  protected async withTimeout<T>(
    operation: Promise<T>,
    timeoutMs: number = this.config.timeout
  ): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request timeout after ${timeoutMs}ms`));
      }, timeoutMs);
    });

    return Promise.race([operation, timeoutPromise]);
  }

  // Configuration getters
  getConfig(): ApiConfig {
    return { ...this.config };
  }

  updateConfig(newConfig: Partial<ApiConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Update headers if API key changed
    if (newConfig.apiKey !== undefined) {
      if (newConfig.apiKey) {
        this.baseHeaders['Authorization'] = `Bearer ${newConfig.apiKey}`;
      } else {
        delete this.baseHeaders['Authorization'];
      }
    }
  }

  // Health check method
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.get('/health');
      return response.success;
    } catch (error) {
      return false;
    }
  }
}
