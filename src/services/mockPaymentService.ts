// Mock Payment Service for Grand Zawiyah
// This simulates payment processing without real payment providers

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'wallet';
  last4: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface DonationData {
  amount: number;
  frequency: 'one-time' | 'monthly' | 'annual';
  campaign: string;
  donorInfo: {
    name: string;
    email: string;
    phone?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  paymentMethodId: string;
  isAnonymous: boolean;
  message?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  receiptUrl: string;
  error?: string;
}

export interface RoundUpSettings {
  isEnabled: boolean;
  monthlyCap: number;
  linkedCardId?: string;
  isPaused: boolean;
  totalRoundUp: number;
  thisMonthRoundUp: number;
}

class MockPaymentService {
  private mockPaymentMethods: PaymentMethod[] = [
    {
      id: 'pm_1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: 'pm_2',
      type: 'card',
      last4: '5555',
      brand: 'Mastercard',
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false
    }
  ];

  private mockRoundUpSettings: RoundUpSettings = {
    isEnabled: false,
    monthlyCap: 50,
    isPaused: false,
    totalRoundUp: 0,
    thisMonthRoundUp: 0
  };

  // Simulate payment processing delay
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get saved payment methods
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    await this.delay(500);
    return [...this.mockPaymentMethods];
  }

  // Add new payment method
  async addPaymentMethod(cardData: {
    number: string;
    expiryMonth: number;
    expiryYear: number;
    cvc: string;
    name: string;
  }): Promise<PaymentMethod> {
    await this.delay(1000);
    
    const newMethod: PaymentMethod = {
      id: `pm_${Date.now()}`,
      type: 'card',
      last4: cardData.number.slice(-4),
      brand: this.getCardBrand(cardData.number),
      expiryMonth: cardData.expiryMonth,
      expiryYear: cardData.expiryYear,
      isDefault: this.mockPaymentMethods.length === 0
    };

    this.mockPaymentMethods.push(newMethod);
    return newMethod;
  }

  // Process donation
  async processDonation(donationData: DonationData): Promise<PaymentResult> {
    await this.delay(2000); // Simulate processing time

    // Simulate occasional failures (5% chance)
    if (Math.random() < 0.05) {
      return {
        success: false,
        transactionId: '',
        amount: donationData.amount,
        status: 'failed',
        receiptUrl: '',
        error: 'Payment processing failed. Please try again.'
      };
    }

    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      success: true,
      transactionId,
      amount: donationData.amount,
      status: 'completed',
      receiptUrl: `/receipts/${transactionId}.pdf`
    };
  }

  // Get round-up settings
  async getRoundUpSettings(): Promise<RoundUpSettings> {
    await this.delay(300);
    return { ...this.mockRoundUpSettings };
  }

  // Update round-up settings
  async updateRoundUpSettings(settings: Partial<RoundUpSettings>): Promise<RoundUpSettings> {
    await this.delay(500);
    this.mockRoundUpSettings = { ...this.mockRoundUpSettings, ...settings };
    return { ...this.mockRoundUpSettings };
  }

  // Simulate round-up transaction
  async processRoundUp(amount: number): Promise<PaymentResult> {
    await this.delay(1000);
    
    const transactionId = `roundup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Update round-up totals
    this.mockRoundUpSettings.totalRoundUp += amount;
    this.mockRoundUpSettings.thisMonthRoundUp += amount;
    
    return {
      success: true,
      transactionId,
      amount,
      status: 'completed',
      receiptUrl: `/receipts/${transactionId}.pdf`
    };
  }

  // Get donation history
  async getDonationHistory(): Promise<Array<{
    id: string;
    amount: number;
    date: string;
    campaign: string;
    frequency: string;
    status: string;
    receiptUrl: string;
  }>> {
    await this.delay(800);
    
    return [
      {
        id: 'txn_1',
        amount: 100,
        date: '2024-01-15',
        campaign: 'Grand Zawiyah Construction',
        frequency: 'monthly',
        status: 'completed',
        receiptUrl: '/receipts/txn_1.pdf'
      },
      {
        id: 'txn_2',
        amount: 50,
        date: '2024-01-10',
        campaign: 'Islamic Education Fund',
        frequency: 'one-time',
        status: 'completed',
        receiptUrl: '/receipts/txn_2.pdf'
      },
      {
        id: 'roundup_1',
        amount: 2.50,
        date: '2024-01-08',
        campaign: 'Round-up Donation',
        frequency: 'round-up',
        status: 'completed',
        receiptUrl: '/receipts/roundup_1.pdf'
      }
    ];
  }

  // Helper method to determine card brand
  private getCardBrand(number: string): string {
    const cleanNumber = number.replace(/\s/g, '');
    
    if (cleanNumber.startsWith('4')) return 'Visa';
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'Mastercard';
    if (cleanNumber.startsWith('3')) return 'American Express';
    if (cleanNumber.startsWith('6')) return 'Discover';
    
    return 'Unknown';
  }

  // Validate card number (Luhn algorithm)
  validateCardNumber(number: string): boolean {
    const cleanNumber = number.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(cleanNumber)) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  }

  // Validate expiry date
  validateExpiryDate(month: number, year: number): boolean {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    if (month < 1 || month > 12) return false;
    
    return true;
  }
}

export const mockPaymentService = new MockPaymentService();
