// Service Factory for Grand Zawiyah
// This manages all API services and provides a unified interface

import { ApiService, createApiService, defaultConfigs } from './api/ApiService';
import { UserService } from './UserService';
import { DonationService } from './DonationService';
import { ServiceConfig } from '@/types/api';

export class ServiceFactory {
  private static instance: ServiceFactory;
  private apiService: ApiService;
  private userService: UserService;
  private donationService: DonationService;

  private constructor(config?: ServiceConfig) {
    // Use provided config or default to mock adapter
    const serviceConfig = config || defaultConfigs.mock;
    this.apiService = createApiService(serviceConfig);
    
    // Initialize domain services
    this.userService = new UserService(this.apiService);
    this.donationService = new DonationService(this.apiService);
  }

  // Singleton pattern
  static getInstance(config?: ServiceConfig): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory(config);
    }
    return ServiceFactory.instance;
  }

  // Reset instance (useful for testing)
  static resetInstance(): void {
    ServiceFactory.instance = null as any;
  }

  // Get API service
  getApiService(): ApiService {
    return this.apiService;
  }

  // Get user service
  getUserService(): UserService {
    return this.userService;
  }

  // Get donation service
  getDonationService(): DonationService {
    return this.donationService;
  }

  // Switch to different adapter (useful for switching between mock and real API)
  switchAdapter(adapterName: 'mock' | 'http', customConfig?: Partial<ServiceConfig>): void {
    const config = customConfig || defaultConfigs[adapterName];
    this.apiService = createApiService(config);
    
    // Reinitialize domain services with new API service
    this.userService = new UserService(this.apiService);
    this.donationService = new DonationService(this.apiService);
  }

  // Health check for all services
  async healthCheck(): Promise<{
    api: boolean;
    overall: boolean;
  }> {
    const apiHealth = await this.apiService.healthCheck();
    
    return {
      api: apiHealth,
      overall: apiHealth,
    };
  }

  // Get service configuration
  getConfig(): ServiceConfig {
    return {
      adapter: this.apiService.getConfig(),
      cache: {
        ttl: 300,
        maxSize: 100,
        strategy: 'lru',
      },
    };
  }

  // Update service configuration
  updateConfig(newConfig: Partial<ServiceConfig>): void {
    if (newConfig.adapter) {
      this.apiService.updateConfig(newConfig.adapter);
    }
  }

  // Clear all caches
  clearCaches(): void {
    this.apiService.clearCache();
  }

  // Get cache statistics
  getCacheStats(): {
    api: { size: number; maxSize: number; hitRate: number };
  } {
    return {
      api: this.apiService.getCacheStats(),
    };
  }
}

// Convenience functions for direct service access
export const getServiceFactory = (config?: ServiceConfig): ServiceFactory => {
  return ServiceFactory.getInstance(config);
};

export const getUserService = (): UserService => {
  return ServiceFactory.getInstance().getUserService();
};

export const getDonationService = (): DonationService => {
  return ServiceFactory.getInstance().getDonationService();
};

export const getApiService = (): ApiService => {
  return ServiceFactory.getInstance().getApiService();
};

// Environment-based service initialization
export const initializeServices = (): ServiceFactory => {
  const environment = process.env.NODE_ENV || 'development';
  
  let config: ServiceConfig;
  
  switch (environment) {
    case 'production':
      config = defaultConfigs.http;
      break;
    case 'staging':
      config = defaultConfigs.http;
      break;
    default:
      config = defaultConfigs.mock;
  }
  
  return ServiceFactory.getInstance(config);
};

// Export default instance
export const serviceFactory = initializeServices();
