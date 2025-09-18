// Mock API Adapter for Grand Zawiyah
// This provides mock data and simulates API responses for development and testing

import { BaseAdapter } from './BaseAdapter';
import { ApiResponse, ApiConfig } from '@/types/api';
import { mockData } from './mockData';

export class MockAdapter extends BaseAdapter {
  private mockData: typeof mockData;

  constructor(config: ApiConfig) {
    super(config);
    this.mockData = { ...mockData };
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    await this.simulateNetworkDelay();
    
    try {
      const data = this.getMockData<T>(endpoint, params);
      return this.createSuccessResponse(data);
    } catch (error) {
      return this.createErrorResponse(error, 'Failed to fetch data');
    }
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    await this.simulateNetworkDelay();
    
    try {
      const result = this.postMockData<T>(endpoint, data);
      return this.createSuccessResponse(result);
    } catch (error) {
      return this.createErrorResponse(error, 'Failed to create resource');
    }
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    await this.simulateNetworkDelay();
    
    try {
      const result = this.putMockData<T>(endpoint, data);
      return this.createSuccessResponse(result);
    } catch (error) {
      return this.createErrorResponse(error, 'Failed to update resource');
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    await this.simulateNetworkDelay();
    
    try {
      const result = this.deleteMockData<T>(endpoint);
      return this.createSuccessResponse(result);
    } catch (error) {
      return this.createErrorResponse(error, 'Failed to delete resource');
    }
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    await this.simulateNetworkDelay();
    
    try {
      const result = this.patchMockData<T>(endpoint, data);
      return this.createSuccessResponse(result);
    } catch (error) {
      return this.createErrorResponse(error, 'Failed to update resource');
    }
  }

  private async simulateNetworkDelay(): Promise<void> {
    // Simulate network latency (100-500ms)
    const delay = Math.random() * 400 + 100;
    await this.delay(delay);
  }

  private getMockData<T>(endpoint: string, params?: Record<string, any>): T {
    const path = endpoint.replace(/^\//, '').split('/');
    
    switch (path[0]) {
      case 'users':
        return this.handleUsersGet(path, params) as T;
      case 'donations':
        return this.handleDonationsGet(path, params) as T;
      case 'campaigns':
        return this.handleCampaignsGet(path, params) as T;
      case 'events':
        return this.handleEventsGet(path, params) as T;
      case 'lessons':
        return this.handleLessonsGet(path, params) as T;
      case 'analytics':
        return this.handleAnalyticsGet(path, params) as T;
      case 'health':
        return { status: 'ok', timestamp: new Date().toISOString() } as T;
      default:
        throw new Error(`Unknown endpoint: ${endpoint}`);
    }
  }

  private postMockData<T>(endpoint: string, data?: any): T {
    const path = endpoint.replace(/^\//, '').split('/');
    
    switch (path[0]) {
      case 'users':
        return this.handleUsersPost(path, data) as T;
      case 'donations':
        return this.handleDonationsPost(path, data) as T;
      case 'events':
        return this.handleEventsPost(path, data) as T;
      case 'lessons':
        return this.handleLessonsPost(path, data) as T;
      default:
        throw new Error(`Unknown endpoint: ${endpoint}`);
    }
  }

  private putMockData<T>(endpoint: string, data?: any): T {
    const path = endpoint.replace(/^\//, '').split('/');
    
    switch (path[0]) {
      case 'users':
        return this.handleUsersPut(path, data) as T;
      case 'donations':
        return this.handleDonationsPut(path, data) as T;
      default:
        throw new Error(`Unknown endpoint: ${endpoint}`);
    }
  }

  private deleteMockData<T>(endpoint: string): T {
    const path = endpoint.replace(/^\//, '').split('/');
    
    switch (path[0]) {
      case 'users':
        return this.handleUsersDelete(path) as T;
      case 'donations':
        return this.handleDonationsDelete(path) as T;
      default:
        throw new Error(`Unknown endpoint: ${endpoint}`);
    }
  }

  private patchMockData<T>(endpoint: string, data?: any): T {
    const path = endpoint.replace(/^\//, '').split('/');
    
    switch (path[0]) {
      case 'users':
        return this.handleUsersPatch(path, data) as T;
      default:
        throw new Error(`Unknown endpoint: ${endpoint}`);
    }
  }

  // User handlers
  private handleUsersGet(path: string[], params?: Record<string, any>) {
    if (path.length === 1) {
      // GET /users
      return this.mockData.users;
    } else if (path.length === 2) {
      // GET /users/:id
      const userId = path[1];
      return this.mockData.users.find(user => user.id === userId);
    }
    throw new Error('Invalid user endpoint');
  }

  private handleUsersPost(path: string[], data?: any) {
    if (path.length === 1) {
      // POST /users
      const newUser = {
        id: `user_${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
      this.mockData.users.push(newUser);
      return newUser;
    }
    throw new Error('Invalid user endpoint');
  }

  private handleUsersPut(path: string[], data?: any) {
    if (path.length === 2) {
      // PUT /users/:id
      const userId = path[1];
      const userIndex = this.mockData.users.findIndex(user => user.id === userId);
      if (userIndex !== -1) {
        this.mockData.users[userIndex] = {
          ...this.mockData.users[userIndex],
          ...data,
          updatedAt: new Date().toISOString(),
        };
        return this.mockData.users[userIndex];
      }
      throw new Error('User not found');
    }
    throw new Error('Invalid user endpoint');
  }

  private handleUsersDelete(path: string[]) {
    if (path.length === 2) {
      // DELETE /users/:id
      const userId = path[1];
      const userIndex = this.mockData.users.findIndex(user => user.id === userId);
      if (userIndex !== -1) {
        this.mockData.users.splice(userIndex, 1);
        return { success: true };
      }
      throw new Error('User not found');
    }
    throw new Error('Invalid user endpoint');
  }

  private handleUsersPatch(path: string[], data?: any) {
    if (path.length === 2) {
      // PATCH /users/:id
      const userId = path[1];
      const userIndex = this.mockData.users.findIndex(user => user.id === userId);
      if (userIndex !== -1) {
        this.mockData.users[userIndex] = {
          ...this.mockData.users[userIndex],
          ...data,
          updatedAt: new Date().toISOString(),
        };
        return this.mockData.users[userIndex];
      }
      throw new Error('User not found');
    }
    throw new Error('Invalid user endpoint');
  }

  // Donation handlers
  private handleDonationsGet(path: string[], params?: Record<string, any>) {
    if (path.length === 1) {
      // GET /donations
      let donations = [...this.mockData.donations];
      
      if (params?.userId) {
        donations = donations.filter(d => d.userId === params.userId);
      }
      
      if (params?.campaign) {
        donations = donations.filter(d => d.campaign === params.campaign);
      }
      
      return donations;
    } else if (path.length === 2) {
      // GET /donations/:id
      const donationId = path[1];
      return this.mockData.donations.find(donation => donation.id === donationId);
    }
    throw new Error('Invalid donation endpoint');
  }

  private handleDonationsPost(path: string[], data?: any) {
    if (path.length === 1) {
      // POST /donations
      const newDonation = {
        id: `donation_${Date.now()}`,
        ...data,
        status: 'completed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.mockData.donations.push(newDonation);
      return newDonation;
    }
    throw new Error('Invalid donation endpoint');
  }

  private handleDonationsPut(path: string[], data?: any) {
    if (path.length === 2) {
      // PUT /donations/:id
      const donationId = path[1];
      const donationIndex = this.mockData.donations.findIndex(d => d.id === donationId);
      if (donationIndex !== -1) {
        this.mockData.donations[donationIndex] = {
          ...this.mockData.donations[donationIndex],
          ...data,
          updatedAt: new Date().toISOString(),
        };
        return this.mockData.donations[donationIndex];
      }
      throw new Error('Donation not found');
    }
    throw new Error('Invalid donation endpoint');
  }

  private handleDonationsDelete(path: string[]) {
    if (path.length === 2) {
      // DELETE /donations/:id
      const donationId = path[1];
      const donationIndex = this.mockData.donations.findIndex(d => d.id === donationId);
      if (donationIndex !== -1) {
        this.mockData.donations.splice(donationIndex, 1);
        return { success: true };
      }
      throw new Error('Donation not found');
    }
    throw new Error('Invalid donation endpoint');
  }

  // Campaign handlers
  private handleCampaignsGet(path: string[], params?: Record<string, any>) {
    if (path.length === 1) {
      // GET /campaigns
      return this.mockData.campaigns;
    } else if (path.length === 2) {
      // GET /campaigns/:id
      const campaignId = path[1];
      return this.mockData.campaigns.find(campaign => campaign.id === campaignId);
    }
    throw new Error('Invalid campaign endpoint');
  }

  // Event handlers
  private handleEventsGet(path: string[], params?: Record<string, any>) {
    if (path.length === 1) {
      // GET /events
      return this.mockData.events;
    } else if (path.length === 2) {
      // GET /events/:id
      const eventId = path[1];
      return this.mockData.events.find(event => event.id === eventId);
    }
    throw new Error('Invalid event endpoint');
  }

  private handleEventsPost(path: string[], data?: any) {
    if (path.length === 1) {
      // POST /events
      const newEvent = {
        id: `event_${Date.now()}`,
        ...data,
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.mockData.events.push(newEvent);
      return newEvent;
    }
    throw new Error('Invalid event endpoint');
  }

  // Lesson handlers
  private handleLessonsGet(path: string[], params?: Record<string, any>) {
    if (path.length === 1) {
      // GET /lessons
      return this.mockData.lessons;
    } else if (path.length === 2) {
      // GET /lessons/:id
      const lessonId = path[1];
      return this.mockData.lessons.find(lesson => lesson.id === lessonId);
    }
    throw new Error('Invalid lesson endpoint');
  }

  private handleLessonsPost(path: string[], data?: any) {
    if (path.length === 1) {
      // POST /lessons
      const newLesson = {
        id: `lesson_${Date.now()}`,
        ...data,
        publishedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.mockData.lessons.push(newLesson);
      return newLesson;
    }
    throw new Error('Invalid lesson endpoint');
  }

  // Analytics handlers
  private handleAnalyticsGet(path: string[], params?: Record<string, any>) {
    if (path.length === 1) {
      // GET /analytics
      return this.mockData.analytics;
    } else if (path.length === 2) {
      // GET /analytics/:type
      const analyticsType = path[1];
      return this.mockData.analytics[analyticsType as keyof typeof this.mockData.analytics];
    }
    throw new Error('Invalid analytics endpoint');
  }
}
