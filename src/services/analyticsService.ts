// Analytics Service for Grand Zawiyah
// This provides analytics tracking for page views and donation funnel events

export interface AnalyticsEvent {
  id: string;
  userId?: string;
  event: string;
  properties: Record<string, any>;
  timestamp: string;
  sessionId: string;
  page: string;
  userAgent: string;
  ip?: string;
}

export interface PageViewEvent {
  page: string;
  title: string;
  url: string;
  referrer?: string;
  duration?: number;
  userId?: string;
  sessionId: string;
  timestamp: string;
}

export interface DonationFunnelEvent {
  step: 'landing' | 'amount_selection' | 'payment_form' | 'payment_processing' | 'success' | 'failure';
  amount?: number;
  currency?: string;
  campaign?: string;
  paymentMethod?: string;
  userId?: string;
  sessionId: string;
  timestamp: string;
  properties?: Record<string, any>;
}

export interface UserEngagementEvent {
  action: 'click' | 'scroll' | 'hover' | 'focus' | 'blur' | 'form_submit' | 'form_error';
  element: string;
  page: string;
  userId?: string;
  sessionId: string;
  timestamp: string;
  properties?: Record<string, any>;
}

export interface AnalyticsSession {
  id: string;
  userId?: string;
  startTime: string;
  lastActivity: string;
  pageViews: number;
  events: number;
  duration: number;
  referrer?: string;
  userAgent: string;
  ip?: string;
}

class AnalyticsService {
  private sessionId: string;
  private userId?: string;
  private events: AnalyticsEvent[] = [];
  private sessions: Map<string, AnalyticsSession> = new Map();
  private isInitialized = false;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initialize();
  }

  private initialize(): void {
    // Initialize session
    this.createSession();
    
    // Track initial page view
    this.trackPageView();
    
    // Set up event listeners
    this.setupEventListeners();
    
    this.isInitialized = true;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private createSession(): void {
    const session: AnalyticsSession = {
      id: this.sessionId,
      userId: this.userId,
      startTime: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      pageViews: 0,
      events: 0,
      duration: 0,
      referrer: document.referrer || undefined,
      userAgent: navigator.userAgent,
    };

    this.sessions.set(this.sessionId, session);
  }

  private setupEventListeners(): void {
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.trackEvent('page_visible', { timestamp: new Date().toISOString() });
      } else {
        this.trackEvent('page_hidden', { timestamp: new Date().toISOString() });
      }
    });

    // Track beforeunload
    window.addEventListener('beforeunload', () => {
      this.trackEvent('page_unload', { timestamp: new Date().toISOString() });
      this.flushEvents();
    });

    // Track clicks on donation buttons
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.matches('[data-analytics="donation-button"]')) {
        this.trackDonationFunnelEvent('landing', {
          buttonText: target.textContent,
          buttonLocation: target.closest('section')?.className || 'unknown',
        });
      }
    });

    // Track form submissions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      if (form.matches('[data-analytics="donation-form"]')) {
        this.trackDonationFunnelEvent('payment_form', {
          formId: form.id || 'unknown',
          formAction: form.action || 'unknown',
        });
      }
    });
  }

  // Set user ID for tracking
  setUserId(userId: string): void {
    this.userId = userId;
    const session = this.sessions.get(this.sessionId);
    if (session) {
      session.userId = userId;
    }
  }

  // Clear user ID
  clearUserId(): void {
    this.userId = undefined;
    const session = this.sessions.get(this.sessionId);
    if (session) {
      session.userId = undefined;
    }
  }

  // Track page view
  trackPageView(page?: string, title?: string): void {
    const pageView: PageViewEvent = {
      page: page || window.location.pathname,
      title: title || document.title,
      url: window.location.href,
      referrer: document.referrer || undefined,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
    };

    // Update session
    const session = this.sessions.get(this.sessionId);
    if (session) {
      session.pageViews++;
      session.lastActivity = new Date().toISOString();
    }

    // Track as event
    this.trackEvent('page_view', pageView);
  }

  // Track donation funnel event
  trackDonationFunnelEvent(step: DonationFunnelEvent['step'], properties?: Record<string, any>): void {
    const event: DonationFunnelEvent = {
      step,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      properties,
    };

    this.trackEvent('donation_funnel', event);
  }

  // Track user engagement
  trackUserEngagement(action: UserEngagementEvent['action'], element: string, properties?: Record<string, any>): void {
    const event: UserEngagementEvent = {
      action,
      element,
      page: window.location.pathname,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      properties,
    };

    this.trackEvent('user_engagement', event);
  }

  // Track custom event
  trackEvent(eventName: string, properties?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: this.userId,
      event: eventName,
      properties: properties || {},
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
    };

    this.events.push(event);

    // Update session
    const session = this.sessions.get(this.sessionId);
    if (session) {
      session.events++;
      session.lastActivity = new Date().toISOString();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }
  }

  // Track donation amount selection
  trackDonationAmountSelected(amount: number, currency: string = 'USD'): void {
    this.trackDonationFunnelEvent('amount_selection', {
      amount,
      currency,
      amountRange: this.getAmountRange(amount),
    });
  }

  // Track payment method selection
  trackPaymentMethodSelected(method: string): void {
    this.trackDonationFunnelEvent('payment_processing', {
      paymentMethod: method,
    });
  }

  // Track donation success
  trackDonationSuccess(amount: number, currency: string, campaign: string, transactionId: string): void {
    this.trackDonationFunnelEvent('success', {
      amount,
      currency,
      campaign,
      transactionId,
      amountRange: this.getAmountRange(amount),
    });
  }

  // Track donation failure
  trackDonationFailure(amount: number, currency: string, campaign: string, error: string): void {
    this.trackDonationFunnelEvent('failure', {
      amount,
      currency,
      campaign,
      error,
      amountRange: this.getAmountRange(amount),
    });
  }

  // Track lesson view
  trackLessonView(lessonId: string, lessonTitle: string, isPremium: boolean): void {
    this.trackEvent('lesson_view', {
      lessonId,
      lessonTitle,
      isPremium,
      category: 'education',
    });
  }

  // Track lesson completion
  trackLessonCompletion(lessonId: string, lessonTitle: string, duration: number): void {
    this.trackEvent('lesson_completion', {
      lessonId,
      lessonTitle,
      duration,
      category: 'education',
    });
  }

  // Track event registration
  trackEventRegistration(eventId: string, eventTitle: string): void {
    this.trackEvent('event_registration', {
      eventId,
      eventTitle,
      category: 'community',
    });
  }

  // Track round-up settings change
  trackRoundUpSettingsChange(settings: {
    enabled: boolean;
    monthlyCap: number;
    linkedCard: boolean;
  }): void {
    this.trackEvent('roundup_settings_change', {
      ...settings,
      category: 'donation',
    });
  }

  // Get amount range for analytics
  private getAmountRange(amount: number): string {
    if (amount < 25) return 'under_25';
    if (amount < 50) return '25_49';
    if (amount < 100) return '50_99';
    if (amount < 250) return '100_249';
    if (amount < 500) return '250_499';
    if (amount < 1000) return '500_999';
    return '1000_plus';
  }

  // Get analytics data
  getAnalyticsData(): {
    events: AnalyticsEvent[];
    sessions: AnalyticsSession[];
    currentSession: AnalyticsSession | undefined;
  } {
    return {
      events: [...this.events],
      sessions: Array.from(this.sessions.values()),
      currentSession: this.sessions.get(this.sessionId),
    };
  }

  // Get session statistics
  getSessionStats(): {
    totalSessions: number;
    totalEvents: number;
    totalPageViews: number;
    averageSessionDuration: number;
    currentSessionDuration: number;
  } {
    const sessions = Array.from(this.sessions.values());
    const totalSessions = sessions.length;
    const totalEvents = sessions.reduce((sum, session) => sum + session.events, 0);
    const totalPageViews = sessions.reduce((sum, session) => sum + session.pageViews, 0);
    
    const currentSession = this.sessions.get(this.sessionId);
    const currentSessionDuration = currentSession 
      ? Date.now() - new Date(currentSession.startTime).getTime()
      : 0;

    const averageSessionDuration = sessions.length > 0
      ? sessions.reduce((sum, session) => sum + session.duration, 0) / sessions.length
      : 0;

    return {
      totalSessions,
      totalEvents,
      totalPageViews,
      averageSessionDuration,
      currentSessionDuration,
    };
  }

  // Flush events (send to server)
  async flushEvents(): Promise<void> {
    if (this.events.length === 0) return;

    try {
      // In a real implementation, this would send events to your analytics server
      console.log('Flushing analytics events:', this.events);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Clear events after successful send
      this.events = [];
    } catch (error) {
      console.error('Failed to flush analytics events:', error);
    }
  }

  // Get funnel conversion rates
  getFunnelConversionRates(): {
    landing: number;
    amountSelection: number;
    paymentForm: number;
    paymentProcessing: number;
    success: number;
  } {
    const funnelEvents = this.events.filter(event => event.event === 'donation_funnel');
    
    const steps = {
      landing: funnelEvents.filter(e => e.properties.step === 'landing').length,
      amountSelection: funnelEvents.filter(e => e.properties.step === 'amount_selection').length,
      paymentForm: funnelEvents.filter(e => e.properties.step === 'payment_form').length,
      paymentProcessing: funnelEvents.filter(e => e.properties.step === 'payment_processing').length,
      success: funnelEvents.filter(e => e.properties.step === 'success').length,
    };

    const landing = steps.landing;
    
    return {
      landing: 1, // 100% of users who land
      amountSelection: landing > 0 ? steps.amountSelection / landing : 0,
      paymentForm: landing > 0 ? steps.paymentForm / landing : 0,
      paymentProcessing: landing > 0 ? steps.paymentProcessing / landing : 0,
      success: landing > 0 ? steps.success / landing : 0,
    };
  }

  // Check if analytics is initialized
  isReady(): boolean {
    return this.isInitialized;
  }

  // Get current session ID
  getSessionId(): string {
    return this.sessionId;
  }

  // Get current user ID
  getUserId(): string | undefined {
    return this.userId;
  }
}

export const analyticsService = new AnalyticsService();
