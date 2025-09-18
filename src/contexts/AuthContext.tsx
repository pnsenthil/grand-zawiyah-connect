import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { mockAuthService, User, SignUpData, SignInData } from '@/services/mockAuthService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (data: SignInData) => Promise<{ success: boolean; error?: string }>;
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyEmail: (token: string) => Promise<{ success: boolean; error?: string }>;
  deleteAccount: () => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = mockAuthService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (data: SignInData) => {
    try {
      const response = await mockAuthService.signIn(data);
      if (response.success && response.user) {
        setUser(response.user);
      }
      return { success: response.success, error: response.error };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signUp = async (data: SignUpData) => {
    try {
      const response = await mockAuthService.signUp(data);
      if (response.success && response.user) {
        setUser(response.user);
      }
      return { success: response.success, error: response.error };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signOut = async () => {
    try {
      await mockAuthService.signOut();
      setUser(null);
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      const response = await mockAuthService.updateProfile(updates);
      if (response.success && response.user) {
        setUser(response.user);
      }
      return { success: response.success, error: response.error };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const response = await mockAuthService.changePassword(currentPassword, newPassword);
      return { success: response.success, error: response.error };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      const response = await mockAuthService.requestPasswordReset(email);
      return { success: response.success, error: response.error };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      const response = await mockAuthService.verifyEmail(token);
      if (response.success && response.user) {
        setUser(response.user);
      }
      return { success: response.success, error: response.error };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await mockAuthService.deleteAccount();
      if (response.success) {
        setUser(null);
      }
      return { success: response.success, error: response.error };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    changePassword,
    requestPasswordReset,
    verifyEmail,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
