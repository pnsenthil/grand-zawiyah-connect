// Donation Service for Grand Zawiyah
// This provides donation-related API operations

import { ApiService } from './api/ApiService';
import { Donation, DonationCampaign, CreateDonationRequest, PaginatedResponse } from '@/types/api';

export class DonationService {
  constructor(private apiService: ApiService) {}

  // Get all donations
  async getDonations(params?: {
    page?: number;
    limit?: number;
    userId?: string;
    campaign?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<PaginatedResponse<Donation>> {
    return this.apiService.get<PaginatedResponse<Donation>>('/donations', params);
  }

  // Get donation by ID
  async getDonationById(donationId: string): Promise<Donation> {
    return this.apiService.get<Donation>(`/donations/${donationId}`);
  }

  // Create a new donation
  async createDonation(donationData: CreateDonationRequest): Promise<Donation> {
    return this.apiService.post<Donation>('/donations', donationData);
  }

  // Update donation
  async updateDonation(donationId: string, updates: Partial<Donation>): Promise<Donation> {
    return this.apiService.put<Donation>(`/donations/${donationId}`, updates);
  }

  // Cancel donation
  async cancelDonation(donationId: string): Promise<Donation> {
    return this.apiService.patch<Donation>(`/donations/${donationId}/cancel`);
  }

  // Get user's donations
  async getUserDonations(userId: string, params?: {
    page?: number;
    limit?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<PaginatedResponse<Donation>> {
    return this.apiService.get<PaginatedResponse<Donation>>(`/users/${userId}/donations`, params);
  }

  // Get current user's donations
  async getCurrentUserDonations(params?: {
    page?: number;
    limit?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<PaginatedResponse<Donation>> {
    return this.apiService.get<PaginatedResponse<Donation>>('/users/me/donations', params);
  }

  // Get donation receipt
  async getDonationReceipt(donationId: string): Promise<{ receiptUrl: string }> {
    return this.apiService.get<{ receiptUrl: string }>(`/donations/${donationId}/receipt`);
  }

  // Download donation receipt
  async downloadDonationReceipt(donationId: string): Promise<Blob> {
    const response = await fetch(`/api/donations/${donationId}/receipt/download`, {
      headers: {
        'Authorization': `Bearer ${this.apiService.getConfig().apiKey}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to download receipt');
    }
    
    return response.blob();
  }

  // Get donation statistics
  async getDonationStats(params?: {
    userId?: string;
    campaign?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<{
    totalDonations: number;
    totalAmount: number;
    averageDonation: number;
    monthlyDonations: Array<{
      month: string;
      count: number;
      amount: number;
    }>;
    topCampaigns: Array<{
      campaignId: string;
      campaignName: string;
      amount: number;
      count: number;
    }>;
  }> {
    return this.apiService.get('/donations/stats', params);
  }

  // Get user donation statistics
  async getUserDonationStats(userId: string, params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<{
    totalDonations: number;
    totalAmount: number;
    averageDonation: number;
    monthlyDonations: Array<{
      month: string;
      count: number;
      amount: number;
    }>;
    topCampaigns: Array<{
      campaignId: string;
      campaignName: string;
      amount: number;
      count: number;
    }>;
  }> {
    return this.apiService.get(`/users/${userId}/donations/stats`, params);
  }

  // Get current user donation statistics
  async getCurrentUserDonationStats(params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<{
    totalDonations: number;
    totalAmount: number;
    averageDonation: number;
    monthlyDonations: Array<{
      month: string;
      count: number;
      amount: number;
    }>;
    topCampaigns: Array<{
      campaignId: string;
      campaignName: string;
      amount: number;
      count: number;
    }>;
  }> {
    return this.apiService.get('/users/me/donations/stats', params);
  }

  // Campaign operations
  async getCampaigns(params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
    search?: string;
  }): Promise<PaginatedResponse<DonationCampaign>> {
    return this.apiService.get<PaginatedResponse<DonationCampaign>>('/campaigns', params);
  }

  async getCampaignById(campaignId: string): Promise<DonationCampaign> {
    return this.apiService.get<DonationCampaign>(`/campaigns/${campaignId}`);
  }

  async createCampaign(campaignData: Omit<DonationCampaign, 'id' | 'createdAt' | 'updatedAt'>): Promise<DonationCampaign> {
    return this.apiService.post<DonationCampaign>('/campaigns', campaignData);
  }

  async updateCampaign(campaignId: string, updates: Partial<DonationCampaign>): Promise<DonationCampaign> {
    return this.apiService.put<DonationCampaign>(`/campaigns/${campaignId}`, updates);
  }

  async deleteCampaign(campaignId: string): Promise<void> {
    return this.apiService.delete<void>(`/campaigns/${campaignId}`);
  }

  // Get campaign donations
  async getCampaignDonations(campaignId: string, params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<Donation>> {
    return this.apiService.get<PaginatedResponse<Donation>>(`/campaigns/${campaignId}/donations`, params);
  }

  // Get campaign statistics
  async getCampaignStats(campaignId: string): Promise<{
    totalDonations: number;
    totalAmount: number;
    averageDonation: number;
    donorCount: number;
    progressPercentage: number;
    monthlyProgress: Array<{
      month: string;
      amount: number;
      count: number;
    }>;
  }> {
    return this.apiService.get(`/campaigns/${campaignId}/stats`);
  }

  // Recurring donation operations
  async getRecurringDonations(userId?: string): Promise<Donation[]> {
    const params = userId ? { userId, frequency: 'monthly,annual' } : { frequency: 'monthly,annual' };
    return this.apiService.get<Donation[]>('/donations/recurring', params);
  }

  async pauseRecurringDonation(donationId: string): Promise<Donation> {
    return this.apiService.patch<Donation>(`/donations/${donationId}/pause`);
  }

  async resumeRecurringDonation(donationId: string): Promise<Donation> {
    return this.apiService.patch<Donation>(`/donations/${donationId}/resume`);
  }

  async updateRecurringDonation(donationId: string, updates: {
    amount?: number;
    frequency?: 'monthly' | 'annual';
    paymentMethodId?: string;
  }): Promise<Donation> {
    return this.apiService.patch<Donation>(`/donations/${donationId}/recurring`, updates);
  }

  // Donation analytics
  async getDonationAnalytics(params?: {
    startDate?: string;
    endDate?: string;
    groupBy?: 'day' | 'week' | 'month' | 'year';
  }): Promise<{
    totalDonations: number;
    totalAmount: number;
    averageDonation: number;
    donorCount: number;
    newDonors: number;
    returningDonors: number;
    retentionRate: number;
    timeSeries: Array<{
      period: string;
      donations: number;
      amount: number;
      donors: number;
    }>;
    campaignBreakdown: Array<{
      campaignId: string;
      campaignName: string;
      amount: number;
      percentage: number;
    }>;
    paymentMethodBreakdown: Array<{
      method: string;
      amount: number;
      percentage: number;
    }>;
  }> {
    return this.apiService.get('/analytics/donations', params);
  }
}
