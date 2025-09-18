import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Lock, Loader2, AlertCircle } from "lucide-react";
import { mockPaymentService, PaymentMethod, DonationData } from "@/services/mockPaymentService";
import { useToast } from "@/components/ui/Toast";
import { LoadingSpinner, ErrorDisplay } from "@/components/ui/LoadingStates";
import { StateManager, withAsyncState } from "@/utils/stateManagement";

interface PaymentFormProps {
  amount: number;
  frequency: 'one-time' | 'monthly' | 'annual';
  campaign: string;
  onSuccess: (result: any) => void;
  onError: (error: string) => void;
}

const PaymentForm = ({ amount, frequency, campaign, onSuccess, onError }: PaymentFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [useNewCard, setUseNewCard] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [savedPaymentMethods, setSavedPaymentMethods] = useState<PaymentMethod[]>([]);
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    }
  });
  const [cardData, setCardData] = useState({
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
    name: ''
  });
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoadingPaymentMethods, setIsLoadingPaymentMethods] = useState(true);
  const [paymentMethodsError, setPaymentMethodsError] = useState<string | null>(null);

  const toast = useToast();

  // Load saved payment methods on component mount
  useEffect(() => {
    const loadPaymentMethods = async () => {
      try {
        setIsLoadingPaymentMethods(true);
        setPaymentMethodsError(null);
        const methods = await mockPaymentService.getPaymentMethods();
        setSavedPaymentMethods(methods);
      } catch (error) {
        const errorMessage = 'Failed to load saved payment methods';
        setPaymentMethodsError(errorMessage);
        toast.error('Error', errorMessage);
      } finally {
        setIsLoadingPaymentMethods(false);
      }
    };

    loadPaymentMethods();
  }, [toast]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate payment method
    if (!useNewCard && !selectedPaymentMethod) {
      errors.paymentMethod = 'Please select a payment method';
    }

    // Validate new card data
    if (useNewCard) {
      if (!cardData.number || cardData.number.replace(/\s/g, '').length < 13) {
        errors.cardNumber = 'Please enter a valid card number';
      }
      if (!cardData.expiryMonth || !cardData.expiryYear) {
        errors.cardExpiry = 'Please select card expiry date';
      }
      if (!cardData.cvc || cardData.cvc.length < 3) {
        errors.cardCvc = 'Please enter a valid CVC';
      }
      if (!cardData.name.trim()) {
        errors.cardName = 'Please enter cardholder name';
      }
    }

    // Validate donor info if not anonymous
    if (!isAnonymous) {
      if (!donorInfo.name.trim()) {
        errors.donorName = 'Please enter your full name';
      }
      if (!donorInfo.email.trim()) {
        errors.donorEmail = 'Please enter your email address';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorInfo.email)) {
        errors.donorEmail = 'Please enter a valid email address';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Validation Error', 'Please fix the errors below and try again.');
      return;
    }

    setIsProcessing(true);
    setFormErrors({});

    try {
      let paymentMethodId = selectedPaymentMethod;

      // If using new card, add it first
      if (useNewCard) {
        const newMethod = await mockPaymentService.addPaymentMethod({
          number: cardData.number,
          expiryMonth: parseInt(cardData.expiryMonth),
          expiryYear: parseInt(cardData.expiryYear),
          cvc: cardData.cvc,
          name: cardData.name
        });
        paymentMethodId = newMethod.id;
      }

      const donationData: DonationData = {
        amount,
        frequency,
        campaign,
        donorInfo,
        paymentMethodId,
        isAnonymous,
        message: message || undefined
      };

      const result = await mockPaymentService.processDonation(donationData);
      
      if (result.success) {
        toast.success('Donation Successful!', 'Thank you for your generous contribution.');
        onSuccess(result);
      } else {
        const errorMessage = result.error || 'Payment failed';
        toast.error('Payment Failed', errorMessage);
        onError(errorMessage);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred. Please try again.';
      toast.error('Error', errorMessage);
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Donation Summary */}
          <div className="p-4 bg-legacy/5 rounded-lg border border-legacy/20">
            <h3 className="font-semibold text-foreground mb-2">Donation Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-medium">${amount}</span>
              </div>
              <div className="flex justify-between">
                <span>Frequency:</span>
                <span className="font-medium capitalize">{frequency}</span>
              </div>
              <div className="flex justify-between">
                <span>Campaign:</span>
                <span className="font-medium">{campaign}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Payment Method</Label>
            
            {isLoadingPaymentMethods ? (
              <div className="flex items-center gap-2 p-4">
                <LoadingSpinner size="sm" />
                <span className="text-sm text-gray-600">Loading saved payment methods...</span>
              </div>
            ) : paymentMethodsError ? (
              <ErrorDisplay 
                error={paymentMethodsError}
                title="Failed to load payment methods"
                onRetry={() => window.location.reload()}
              />
            ) : savedPaymentMethods.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="use-saved" 
                    checked={!useNewCard}
                    onCheckedChange={(checked) => setUseNewCard(!checked)}
                  />
                  <Label htmlFor="use-saved">Use saved payment method</Label>
                </div>
                
                {!useNewCard && (
                  <div className="space-y-2">
                    <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                      <SelectTrigger className={formErrors.paymentMethod ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select a payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        {savedPaymentMethods.map((method) => (
                          <SelectItem key={method.id} value={method.id}>
                            {method.brand} •••• {method.last4} (Expires {method.expiryMonth}/{method.expiryYear})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formErrors.paymentMethod && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {formErrors.paymentMethod}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="use-new" 
                checked={useNewCard}
                onCheckedChange={setUseNewCard}
              />
              <Label htmlFor="use-new">Add new payment method</Label>
            </div>

            {/* New Card Form */}
            {useNewCard && (
              <div className="space-y-4 p-4 border border-border rounded-lg">
                <div>
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={(e) => setCardData({...cardData, number: formatCardNumber(e.target.value)})}
                    maxLength={19}
                    className={formErrors.cardNumber ? 'border-red-500' : ''}
                  />
                  {formErrors.cardNumber && (
                    <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-4 w-4" />
                      {formErrors.cardNumber}
                    </p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry-month">Expiry Month</Label>
                    <Select value={cardData.expiryMonth} onValueChange={(value) => setCardData({...cardData, expiryMonth: value})}>
                      <SelectTrigger className={formErrors.cardExpiry ? 'border-red-500' : ''}>
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 12}, (_, i) => (
                          <SelectItem key={i+1} value={(i+1).toString().padStart(2, '0')}>
                            {(i+1).toString().padStart(2, '0')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="expiry-year">Expiry Year</Label>
                    <Select value={cardData.expiryYear} onValueChange={(value) => setCardData({...cardData, expiryYear: value})}>
                      <SelectTrigger className={formErrors.cardExpiry ? 'border-red-500' : ''}>
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 10}, (_, i) => {
                          const year = new Date().getFullYear() + i;
                          return (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {formErrors.cardExpiry && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {formErrors.cardExpiry}
                  </p>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      value={cardData.cvc}
                      onChange={(e) => setCardData({...cardData, cvc: e.target.value.replace(/\D/g, '')})}
                      maxLength={4}
                      className={formErrors.cardCvc ? 'border-red-500' : ''}
                    />
                    {formErrors.cardCvc && (
                      <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-4 w-4" />
                        {formErrors.cardCvc}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="card-name">Cardholder Name</Label>
                    <Input
                      id="card-name"
                      placeholder="John Doe"
                      value={cardData.name}
                      onChange={(e) => setCardData({...cardData, name: e.target.value})}
                      className={formErrors.cardName ? 'border-red-500' : ''}
                    />
                    {formErrors.cardName && (
                      <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-4 w-4" />
                        {formErrors.cardName}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Donor Information */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Donor Information</Label>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="anonymous" 
                checked={isAnonymous}
                onCheckedChange={setIsAnonymous}
              />
              <Label htmlFor="anonymous">Make this donation anonymous</Label>
            </div>

            {!isAnonymous && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                      required
                      className={formErrors.donorName ? 'border-red-500' : ''}
                    />
                    {formErrors.donorName && (
                      <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-4 w-4" />
                        {formErrors.donorName}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                      required
                      className={formErrors.donorEmail ? 'border-red-500' : ''}
                    />
                    {formErrors.donorEmail && (
                      <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-4 w-4" />
                        {formErrors.donorEmail}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    value={donorInfo.phone}
                    onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Optional Message */}
          <div>
            <Label htmlFor="message">Message (Optional)</Label>
            <Input
              id="message"
              placeholder="Add a personal message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Lock className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-800">
              Your payment information is secure and encrypted. We never store your full card details.
            </span>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isProcessing || (!useNewCard && !selectedPaymentMethod) || (useNewCard && !cardData.number)}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Donate ${amount}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
