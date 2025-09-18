// User Service for Grand Zawiyah
// This provides user-related API operations

import { ApiService } from './api/ApiService';
import { User, UpdateUserRequest, PaginatedResponse } from '@/types/api';

export class UserService {
  constructor(private apiService: ApiService) {}

  // Get all users (admin only)
  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<PaginatedResponse<User>> {
    return this.apiService.get<PaginatedResponse<User>>('/users', params);
  }

  // Get user by ID
  async getUserById(userId: string): Promise<User> {
    return this.apiService.get<User>(`/users/${userId}`);
  }

  // Get current user profile
  async getCurrentUser(): Promise<User> {
    return this.apiService.get<User>('/users/me');
  }

  // Update user profile
  async updateUser(userId: string, updates: UpdateUserRequest): Promise<User> {
    return this.apiService.put<User>(`/users/${userId}`, updates);
  }

  // Update current user profile
  async updateCurrentUser(updates: UpdateUserRequest): Promise<User> {
    return this.apiService.put<User>('/users/me', updates);
  }

  // Delete user account
  async deleteUser(userId: string): Promise<void> {
    return this.apiService.delete<void>(`/users/${userId}`);
  }

  // Delete current user account
  async deleteCurrentUser(): Promise<void> {
    return this.apiService.delete<void>('/users/me');
  }

  // Search users
  async searchUsers(query: string, params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<User>> {
    return this.apiService.get<PaginatedResponse<User>>('/users/search', {
      q: query,
      ...params,
    });
  }

  // Get user statistics
  async getUserStats(userId: string): Promise<{
    totalDonations: number;
    totalAmount: number;
    eventsAttended: number;
    lessonsCompleted: number;
    joinDate: string;
    lastActive: string;
  }> {
    return this.apiService.get(`/users/${userId}/stats`);
  }

  // Get current user statistics
  async getCurrentUserStats(): Promise<{
    totalDonations: number;
    totalAmount: number;
    eventsAttended: number;
    lessonsCompleted: number;
    joinDate: string;
    lastActive: string;
  }> {
    return this.apiService.get('/users/me/stats');
  }

  // Update user preferences
  async updateUserPreferences(userId: string, preferences: Partial<User['preferences']>): Promise<User> {
    return this.apiService.patch<User>(`/users/${userId}/preferences`, preferences);
  }

  // Update current user preferences
  async updateCurrentUserPreferences(preferences: Partial<User['preferences']>): Promise<User> {
    return this.apiService.patch<User>('/users/me/preferences', preferences);
  }

  // Update user profile
  async updateUserProfile(userId: string, profile: Partial<User['profile']>): Promise<User> {
    return this.apiService.patch<User>(`/users/${userId}/profile`, profile);
  }

  // Update current user profile
  async updateCurrentUserProfile(profile: Partial<User['profile']>): Promise<User> {
    return this.apiService.patch<User>('/users/me/profile', profile);
  }

  // Upload user avatar
  async uploadAvatar(userId: string, file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    
    return this.apiService.post<{ avatarUrl: string }>(`/users/${userId}/avatar`, formData);
  }

  // Upload current user avatar
  async uploadCurrentUserAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    
    return this.apiService.post<{ avatarUrl: string }>('/users/me/avatar', formData);
  }

  // Verify user email
  async verifyEmail(token: string): Promise<{ success: boolean }> {
    return this.apiService.post<{ success: boolean }>('/users/verify-email', { token });
  }

  // Resend verification email
  async resendVerificationEmail(): Promise<{ success: boolean }> {
    return this.apiService.post<{ success: boolean }>('/users/resend-verification');
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean }> {
    return this.apiService.post<{ success: boolean }>('/users/change-password', {
      currentPassword,
      newPassword,
    });
  }

  // Request password reset
  async requestPasswordReset(email: string): Promise<{ success: boolean }> {
    return this.apiService.post<{ success: boolean }>('/users/request-password-reset', { email });
  }

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean }> {
    return this.apiService.post<{ success: boolean }>('/users/reset-password', {
      token,
      newPassword,
    });
  }

  // Get user activity feed
  async getUserActivity(userId: string, params?: {
    page?: number;
    limit?: number;
    type?: 'donations' | 'events' | 'lessons' | 'all';
  }): Promise<PaginatedResponse<any>> {
    return this.apiService.get<PaginatedResponse<any>>(`/users/${userId}/activity`, params);
  }

  // Get current user activity feed
  async getCurrentUserActivity(params?: {
    page?: number;
    limit?: number;
    type?: 'donations' | 'events' | 'lessons' | 'all';
  }): Promise<PaginatedResponse<any>> {
    return this.apiService.get<PaginatedResponse<any>>('/users/me/activity', params);
  }
}
