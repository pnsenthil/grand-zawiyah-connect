// HTTP API Adapter for Grand Zawiyah
// This provides real HTTP API communication for production use

import { BaseAdapter } from './BaseAdapter';
import { ApiResponse, ApiConfig } from '@/types/api';

export class HttpAdapter extends BaseAdapter {
  constructor(config: ApiConfig) {
    super(config);
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint, params);
    const headers = this.buildHeaders();

    try {
      const response = await this.withTimeout(
        fetch(url, {
          method: 'GET',
          headers,
        }),
        this.config.timeout
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return this.createSuccessResponse(data);
    } catch (error) {
      return this.createErrorResponse(error, 'Failed to fetch data');
    }
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    const headers = this.buildHeaders();

    try {
      const response = await this.withTimeout(
        fetch(url, {
          method: 'POST',
          headers,
          body: data ? JSON.stringify(data) : undefined,
        }),
        this.config.timeout
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json();
      return this.createSuccessResponse(responseData);
    } catch (error) {
      return this.createErrorResponse(error, 'Failed to create resource');
    }
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    const headers = this.buildHeaders();

    try {
      const response = await this.withTimeout(
        fetch(url, {
          method: 'PUT',
          headers,
          body: data ? JSON.stringify(data) : undefined,
        }),
        this.config.timeout
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json();
      return this.createSuccessResponse(responseData);
    } catch (error) {
      return this.createErrorResponse(error, 'Failed to update resource');
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    const headers = this.buildHeaders();

    try {
      const response = await this.withTimeout(
        fetch(url, {
          method: 'DELETE',
          headers,
        }),
        this.config.timeout
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const responseData = response.status === 204 ? null : await response.json();
      return this.createSuccessResponse(responseData);
    } catch (error) {
      return this.createErrorResponse(error, 'Failed to delete resource');
    }
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    const headers = this.buildHeaders();

    try {
      const response = await this.withTimeout(
        fetch(url, {
          method: 'PATCH',
          headers,
          body: data ? JSON.stringify(data) : undefined,
        }),
        this.config.timeout
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json();
      return this.createSuccessResponse(responseData);
    } catch (error) {
      return this.createErrorResponse(error, 'Failed to update resource');
    }
  }

  // Override health check for HTTP adapter
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.get('/health');
      return response.success;
    } catch (error) {
      return false;
    }
  }
}
