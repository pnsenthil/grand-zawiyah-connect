// Services Index for Grand Zawiyah
// This exports all services and provides a unified interface

// API Layer
export { BaseAdapter } from './api/BaseAdapter';
export { MockAdapter } from './api/MockAdapter';
export { HttpAdapter } from './api/HttpAdapter';
export { ApiService, createApiService, defaultConfigs } from './api/ApiService';

// Domain Services
export { UserService } from './UserService';
export { DonationService } from './DonationService';

// Service Factory
export {
  ServiceFactory,
  getServiceFactory,
  getUserService,
  getDonationService,
  getApiService,
  initializeServices,
  serviceFactory,
} from './ServiceFactory';

// Existing Services
export { mockAuthService } from './mockAuthService';
export { mockPaymentService } from './mockPaymentService';
export { stripeService } from './stripeService';

// Types
export * from '../types/api';
