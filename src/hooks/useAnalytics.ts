// Analytics Hook for Grand Zawiyah
// This provides React hooks for analytics tracking

import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsService } from '@/services/analyticsService';

export const useAnalytics = () => {
  const location = useLocation();

  // Track page views on route changes
  useEffect(() => {
    analyticsService.trackPageView(location.pathname, document.title);
  }, [location]);

  // Track custom event
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    analyticsService.trackEvent(eventName, properties);
  }, []);

  // Track donation funnel events
  const trackDonationFunnel = useCallback((step: string, properties?: Record<string, any>) => {
    analyticsService.trackDonationFunnelEvent(step as any, properties);
  }, []);

  // Track user engagement
  const trackEngagement = useCallback((action: string, element: string, properties?: Record<string, any>) => {
    analyticsService.trackUserEngagement(action as any, element, properties);
  }, []);

  // Track donation amount selection
  const trackDonationAmount = useCallback((amount: number, currency: string = 'USD') => {
    analyticsService.trackDonationAmountSelected(amount, currency);
  }, []);

  // Track payment method selection
  const trackPaymentMethod = useCallback((method: string) => {
    analyticsService.trackPaymentMethodSelected(method);
  }, []);

  // Track donation success
  const trackDonationSuccess = useCallback((amount: number, currency: string, campaign: string, transactionId: string) => {
    analyticsService.trackDonationSuccess(amount, currency, campaign, transactionId);
  }, []);

  // Track donation failure
  const trackDonationFailure = useCallback((amount: number, currency: string, campaign: string, error: string) => {
    analyticsService.trackDonationFailure(amount, currency, campaign, error);
  }, []);

  // Track lesson view
  const trackLessonView = useCallback((lessonId: string, lessonTitle: string, isPremium: boolean) => {
    analyticsService.trackLessonView(lessonId, lessonTitle, isPremium);
  }, []);

  // Track lesson completion
  const trackLessonCompletion = useCallback((lessonId: string, lessonTitle: string, duration: number) => {
    analyticsService.trackLessonCompletion(lessonId, lessonTitle, duration);
  }, []);

  // Track event registration
  const trackEventRegistration = useCallback((eventId: string, eventTitle: string) => {
    analyticsService.trackEventRegistration(eventId, eventTitle);
  }, []);

  // Track round-up settings change
  const trackRoundUpSettings = useCallback((settings: {
    enabled: boolean;
    monthlyCap: number;
    linkedCard: boolean;
  }) => {
    analyticsService.trackRoundUpSettingsChange(settings);
  }, []);

  return {
    trackEvent,
    trackDonationFunnel,
    trackEngagement,
    trackDonationAmount,
    trackPaymentMethod,
    trackDonationSuccess,
    trackDonationFailure,
    trackLessonView,
    trackLessonCompletion,
    trackEventRegistration,
    trackRoundUpSettings,
  };
};

// Hook for tracking page views
export const usePageTracking = (pageName?: string) => {
  const location = useLocation();

  useEffect(() => {
    const page = pageName || location.pathname;
    analyticsService.trackPageView(page, document.title);
  }, [location, pageName]);
};

// Hook for tracking user engagement on specific elements
export const useElementTracking = (elementName: string) => {
  const trackEngagement = useCallback((action: string, properties?: Record<string, any>) => {
    analyticsService.trackUserEngagement(action as any, elementName, properties);
  }, [elementName]);

  return trackEngagement;
};

// Hook for tracking donation funnel
export const useDonationTracking = () => {
  const trackDonationFunnel = useCallback((step: string, properties?: Record<string, any>) => {
    analyticsService.trackDonationFunnelEvent(step as any, properties);
  }, []);

  const trackAmount = useCallback((amount: number, currency: string = 'USD') => {
    analyticsService.trackDonationAmountSelected(amount, currency);
  }, []);

  const trackPayment = useCallback((method: string) => {
    analyticsService.trackPaymentMethodSelected(method);
  }, []);

  const trackSuccess = useCallback((amount: number, currency: string, campaign: string, transactionId: string) => {
    analyticsService.trackDonationSuccess(amount, currency, campaign, transactionId);
  }, []);

  const trackFailure = useCallback((amount: number, currency: string, campaign: string, error: string) => {
    analyticsService.trackDonationFailure(amount, currency, campaign, error);
  }, []);

  return {
    trackDonationFunnel,
    trackAmount,
    trackPayment,
    trackSuccess,
    trackFailure,
  };
};

// Hook for tracking lesson engagement
export const useLessonTracking = () => {
  const trackView = useCallback((lessonId: string, lessonTitle: string, isPremium: boolean) => {
    analyticsService.trackLessonView(lessonId, lessonTitle, isPremium);
  }, []);

  const trackCompletion = useCallback((lessonId: string, lessonTitle: string, duration: number) => {
    analyticsService.trackLessonCompletion(lessonId, lessonTitle, duration);
  }, []);

  return {
    trackView,
    trackCompletion,
  };
};

// Hook for tracking event engagement
export const useEventTracking = () => {
  const trackRegistration = useCallback((eventId: string, eventTitle: string) => {
    analyticsService.trackEventRegistration(eventId, eventTitle);
  }, []);

  return {
    trackRegistration,
  };
};

// Hook for tracking round-up settings
export const useRoundUpTracking = () => {
  const trackSettingsChange = useCallback((settings: {
    enabled: boolean;
    monthlyCap: number;
    linkedCard: boolean;
  }) => {
    analyticsService.trackRoundUpSettingsChange(settings);
  }, []);

  return {
    trackSettingsChange,
  };
};
