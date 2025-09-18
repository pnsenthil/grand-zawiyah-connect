// API Service Manager for Grand Zawiyah
// This manages API adapters and provides a unified interface

import { BaseAdapter } from './BaseAdapter';
import { MockAdapter } from './MockAdapter';
import { HttpAdapter } from './HttpAdapter';
import { ApiConfig, ApiAdapter, ServiceConfig, CacheConfig, CacheEntry } from '@/types/api';

export class ApiService {
  private adapter: BaseAdapter;
  private cache: Map<string, CacheEntry<any>> = new Map();
  private cacheConfig: CacheConfig | null = null;

  constructor(config: ServiceConfig) {
    this.adapter = this.createAdapter(config.adapter);
    this.cacheConfig = config.cache || null;
  }

  private createAdapter(adapterConfig: ApiAdapter): BaseAdapter {
    switch (adapterConfig.name) {
      case 'mock':
        return new MockAdapter(adapterConfig.config);
      case 'http':
        return new HttpAdapter(adapterConfig.config);
      default:
        throw new Error(`Unknown adapter type: ${adapterConfig.name}`);
    }
  }

  // Generic API methods
  async get<T>(endpoint: string, params?: Record<string, any>, useCache: boolean = true): Promise<T> {
    const cacheKey = this.getCacheKey('GET', endpoint, params);
    
    if (useCache && this.cacheConfig) {
      const cached = this.getFromCache<T>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const response = await this.adapter.get<T>(endpoint, params);
    
    if (!response.success) {
      throw new Error(response.error || 'Request failed');
    }

    if (useCache && this.cacheConfig && response.data) {
      this.setCache(cacheKey, response.data);
    }

    return response.data!;
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.adapter.post<T>(endpoint, data);
    
    if (!response.success) {
      throw new Error(response.error || 'Request failed');
    }

    // Invalidate related cache entries
    this.invalidateCache(endpoint);

    return response.data!;
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.adapter.put<T>(endpoint, data);
    
    if (!response.success) {
      throw new Error(response.error || 'Request failed');
    }

    // Invalidate related cache entries
    this.invalidateCache(endpoint);

    return response.data!;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.adapter.delete<T>(endpoint);
    
    if (!response.success) {
      throw new Error(response.error || 'Request failed');
    }

    // Invalidate related cache entries
    this.invalidateCache(endpoint);

    return response.data!;
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.adapter.patch<T>(endpoint, data);
    
    if (!response.success) {
      throw new Error(response.error || 'Request failed');
    }

    // Invalidate related cache entries
    this.invalidateCache(endpoint);

    return response.data!;
  }

  // Cache management
  private getCacheKey(method: string, endpoint: string, params?: Record<string, any>): string {
    const paramsStr = params ? JSON.stringify(params) : '';
    return `${method}:${endpoint}:${paramsStr}`;
  }

  private getFromCache<T>(key: string): T | null {
    if (!this.cacheConfig) return null;

    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  private setCache<T>(key: string, value: T): void {
    if (!this.cacheConfig) return;

    // Check cache size limit
    if (this.cache.size >= this.cacheConfig.maxSize) {
      this.evictOldestEntry();
    }

    const entry: CacheEntry<T> = {
      key,
      value,
      expiresAt: Date.now() + (this.cacheConfig.ttl * 1000),
      createdAt: Date.now(),
    };

    this.cache.set(key, entry);
  }

  private evictOldestEntry(): void {
    if (!this.cacheConfig) return;

    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.createdAt < oldestTime) {
        oldestTime = entry.createdAt;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  private invalidateCache(endpoint: string): void {
    if (!this.cacheConfig) return;

    const keysToDelete: string[] = [];
    
    for (const key of this.cache.keys()) {
      if (key.includes(endpoint)) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.cache.delete(key));
  }

  // Utility methods
  async healthCheck(): Promise<boolean> {
    return this.adapter.healthCheck();
  }

  getConfig(): ApiConfig {
    return this.adapter.getConfig();
  }

  updateConfig(newConfig: Partial<ApiConfig>): void {
    this.adapter.updateConfig(newConfig);
  }

  // Cache management methods
  clearCache(): void {
    this.cache.clear();
  }

  getCacheStats(): { size: number; maxSize: number; hitRate: number } {
    return {
      size: this.cache.size,
      maxSize: this.cacheConfig?.maxSize || 0,
      hitRate: 0, // Would need to track hits/misses for accurate hit rate
    };
  }

  // Switch adapter at runtime
  switchAdapter(adapterConfig: ApiAdapter): void {
    this.adapter = this.createAdapter(adapterConfig);
    this.clearCache(); // Clear cache when switching adapters
  }
}

// Factory function to create API service instances
export function createApiService(config: ServiceConfig): ApiService {
  return new ApiService(config);
}

// Default configurations
export const defaultConfigs = {
  mock: {
    adapter: {
      name: 'mock' as const,
      config: {
        baseUrl: 'http://localhost:3000/api',
        timeout: 5000,
        retries: 3,
        environment: 'development' as const,
      },
    },
    cache: {
      ttl: 300, // 5 minutes
      maxSize: 100,
      strategy: 'lru' as const,
    },
  },
  
  http: {
    adapter: {
      name: 'http' as const,
      config: {
        baseUrl: process.env.REACT_APP_API_URL || 'https://api.grandzawiyah.org',
        timeout: 10000,
        retries: 3,
        apiKey: process.env.REACT_APP_API_KEY,
        environment: (process.env.NODE_ENV as 'development' | 'staging' | 'production') || 'development',
      },
    },
    cache: {
      ttl: 600, // 10 minutes
      maxSize: 200,
      strategy: 'lru' as const,
    },
  },
};
