// Mock Authentication Service for Grand Zawiyah
// This simulates authentication without real backend integration

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  isEmailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    language: string;
  };
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  acceptTerms: boolean;
  newsletter: boolean;
}

export interface SignInData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

class MockAuthService {
  private currentUser: User | null = null;
  private authToken: string | null = null;
  private mockUsers: User[] = [
    {
      id: 'user_1',
      email: 'demo@example.com',
      name: 'Demo User',
      phone: '+1 (555) 123-4567',
      isEmailVerified: true,
      createdAt: '2024-01-01T00:00:00Z',
      lastLoginAt: new Date().toISOString(),
      preferences: {
        notifications: true,
        newsletter: true,
        language: 'en'
      }
    }
  ];

  // Simulate network delay
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Generate mock JWT token
  private generateToken(userId: string): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ 
      sub: userId, 
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    }));
    const signature = btoa('mock-signature');
    return `${header}.${payload}.${signature}`;
  }

  // Validate email format
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate password strength
  private isValidPassword(password: string): boolean {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  }

  // Sign up new user
  async signUp(data: SignUpData): Promise<AuthResponse> {
    await this.delay(1500);

    // Validation
    if (!data.name.trim()) {
      return { success: false, error: 'Name is required' };
    }

    if (!this.isValidEmail(data.email)) {
      return { success: false, error: 'Please enter a valid email address' };
    }

    if (!this.isValidPassword(data.password)) {
      return { 
        success: false, 
        error: 'Password must be at least 8 characters with uppercase letter and number' 
      };
    }

    if (!data.acceptTerms) {
      return { success: false, error: 'You must accept the terms and conditions' };
    }

    // Check if user already exists
    const existingUser = this.mockUsers.find(user => user.email === data.email);
    if (existingUser) {
      return { success: false, error: 'An account with this email already exists' };
    }

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: data.email,
      name: data.name,
      phone: data.phone,
      isEmailVerified: false,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      preferences: {
        notifications: true,
        newsletter: data.newsletter,
        language: 'en'
      }
    };

    this.mockUsers.push(newUser);
    this.currentUser = newUser;
    this.authToken = this.generateToken(newUser.id);

    // Store in localStorage for persistence
    localStorage.setItem('auth_token', this.authToken);
    localStorage.setItem('current_user', JSON.stringify(newUser));

    return {
      success: true,
      user: newUser,
      token: this.authToken
    };
  }

  // Sign in existing user
  async signIn(data: SignInData): Promise<AuthResponse> {
    await this.delay(1000);

    // Validation
    if (!this.isValidEmail(data.email)) {
      return { success: false, error: 'Please enter a valid email address' };
    }

    if (!data.password) {
      return { success: false, error: 'Password is required' };
    }

    // Find user (mock validation - any password works for demo)
    const user = this.mockUsers.find(u => u.email === data.email);
    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Update last login
    user.lastLoginAt = new Date().toISOString();
    this.currentUser = user;
    this.authToken = this.generateToken(user.id);

    // Store in localStorage for persistence
    localStorage.setItem('auth_token', this.authToken);
    localStorage.setItem('current_user', JSON.stringify(user));

    return {
      success: true,
      user: user,
      token: this.authToken
    };
  }

  // Sign out user
  async signOut(): Promise<void> {
    await this.delay(500);
    this.currentUser = null;
    this.authToken = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
  }

  // Get current user
  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    // Try to restore from localStorage
    const storedUser = localStorage.getItem('current_user');
    const storedToken = localStorage.getItem('auth_token');
    
    if (storedUser && storedToken) {
      try {
        this.currentUser = JSON.parse(storedUser);
        this.authToken = storedToken;
        return this.currentUser;
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('auth_token');
        localStorage.removeItem('current_user');
      }
    }

    return null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  // Get auth token
  getAuthToken(): string | null {
    return this.authToken || localStorage.getItem('auth_token');
  }

  // Update user profile
  async updateProfile(updates: Partial<User>): Promise<AuthResponse> {
    await this.delay(800);

    if (!this.currentUser) {
      return { success: false, error: 'Not authenticated' };
    }

    // Update user data
    this.currentUser = { ...this.currentUser, ...updates };
    
    // Update in mock users array
    const userIndex = this.mockUsers.findIndex(u => u.id === this.currentUser!.id);
    if (userIndex !== -1) {
      this.mockUsers[userIndex] = this.currentUser;
    }

    // Update localStorage
    localStorage.setItem('current_user', JSON.stringify(this.currentUser));

    return {
      success: true,
      user: this.currentUser
    };
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<AuthResponse> {
    await this.delay(1000);

    if (!this.currentUser) {
      return { success: false, error: 'Not authenticated' };
    }

    if (!this.isValidPassword(newPassword)) {
      return { 
        success: false, 
        error: 'New password must be at least 8 characters with uppercase letter and number' 
      };
    }

    // In a real app, you'd verify the current password
    // For demo purposes, we'll accept any current password
    
    return {
      success: true,
      user: this.currentUser
    };
  }

  // Request password reset
  async requestPasswordReset(email: string): Promise<AuthResponse> {
    await this.delay(1000);

    if (!this.isValidEmail(email)) {
      return { success: false, error: 'Please enter a valid email address' };
    }

    const user = this.mockUsers.find(u => u.email === email);
    if (!user) {
      // Don't reveal if email exists or not
      return { success: true };
    }

    // In a real app, you'd send an email
    console.log(`Password reset email would be sent to ${email}`);
    
    return { success: true };
  }

  // Verify email
  async verifyEmail(token: string): Promise<AuthResponse> {
    await this.delay(1000);

    if (!this.currentUser) {
      return { success: false, error: 'Not authenticated' };
    }

    // Mock email verification
    this.currentUser.isEmailVerified = true;
    localStorage.setItem('current_user', JSON.stringify(this.currentUser));

    return {
      success: true,
      user: this.currentUser
    };
  }

  // Delete account
  async deleteAccount(): Promise<AuthResponse> {
    await this.delay(1500);

    if (!this.currentUser) {
      return { success: false, error: 'Not authenticated' };
    }

    // Remove user from mock data
    this.mockUsers = this.mockUsers.filter(u => u.id !== this.currentUser!.id);
    
    // Clear authentication
    this.currentUser = null;
    this.authToken = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');

    return { success: true };
  }
}

export const mockAuthService = new MockAuthService();
