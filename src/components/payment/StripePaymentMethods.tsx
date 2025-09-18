import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Loader2, 
  Shield, 
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { stripeService } from "@/services/stripeService";

interface PaymentMethod {
  id: string;
  type: string;
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

interface StripePaymentMethodsProps {
  customerId?: string;
  onPaymentMethodAdded?: (paymentMethod: PaymentMethod) => void;
  onPaymentMethodRemoved?: (paymentMethodId: string) => void;
}

const StripePaymentMethods = ({ 
  customerId, 
  onPaymentMethodAdded, 
  onPaymentMethodRemoved 
}: StripePaymentMethodsProps) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newCardData, setNewCardData] = useState({
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
    name: ''
  });

  useEffect(() => {
    if (customerId) {
      loadPaymentMethods();
    }
  }, [customerId]);

  const loadPaymentMethods = async () => {
    if (!customerId) return;
    
    setIsLoading(true);
    setError('');

    try {
      const result = await stripeService.getPaymentMethods(customerId);
      if (result.success && result.paymentMethods) {
        setPaymentMethods(result.paymentMethods);
      } else {
        setError(result.error || 'Failed to load payment methods');
      }
    } catch (error) {
      setError('Failed to load payment methods');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPaymentMethod = async () => {
    if (!customerId) {
      setError('Customer ID is required');
      return;
    }

    setIsAdding(true);
    setError('');
    setSuccess('');

    try {
      // In a real implementation, you would use Stripe Elements
      // For demo purposes, we'll simulate adding a payment method
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newPaymentMethod: PaymentMethod = {
        id: `pm_mock_${Date.now()}`,
        type: 'card',
        card: {
          brand: getCardBrand(newCardData.number),
          last4: newCardData.number.slice(-4),
          exp_month: parseInt(newCardData.expiryMonth),
          exp_year: parseInt(newCardData.expiryYear)
        }
      };

      setPaymentMethods(prev => [...prev, newPaymentMethod]);
      setSuccess('Payment method added successfully');
      setNewCardData({ number: '', expiryMonth: '', expiryYear: '', cvc: '', name: '' });
      
      onPaymentMethodAdded?.(newPaymentMethod);
    } catch (error) {
      setError('Failed to add payment method');
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemovePaymentMethod = async (paymentMethodId: string) => {
    setIsLoading(true);
    setError('');

    try {
      // In a real implementation, you would call Stripe API to detach the payment method
      await new Promise(resolve => setTimeout(resolve, 1000));

      setPaymentMethods(prev => prev.filter(pm => pm.id !== paymentMethodId));
      setSuccess('Payment method removed successfully');
      
      onPaymentMethodRemoved?.(paymentMethodId);
    } catch (error) {
      setError('Failed to remove payment method');
    } finally {
      setIsLoading(false);
    }
  };

  const getCardBrand = (number: string): string => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'visa';
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'mastercard';
    if (cleanNumber.startsWith('3')) return 'amex';
    if (cleanNumber.startsWith('6')) return 'discover';
    return 'unknown';
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

  const getCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      case 'discover':
        return '💳';
      default:
        return '💳';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Methods
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Success/Error Messages */}
        {success && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Existing Payment Methods */}
        <div className="space-y-3">
          <h3 className="font-semibold">Saved Payment Methods</h3>
          {isLoading ? (
            <div className="text-center py-4">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Loading payment methods...</p>
            </div>
          ) : paymentMethods.length > 0 ? (
            <div className="space-y-2">
              {paymentMethods.map((pm) => (
                <div
                  key={pm.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getCardIcon(pm.card.brand)}</span>
                    <div>
                      <p className="font-medium">
                        {pm.card.brand.toUpperCase()} •••• {pm.card.last4}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expires {pm.card.exp_month}/{pm.card.exp_year}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemovePaymentMethod(pm.id)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No payment methods saved</p>
            </div>
          )}
        </div>

        {/* Add New Payment Method */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Payment Method
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={newCardData.number}
                onChange={(e) => setNewCardData(prev => ({ ...prev, number: formatCardNumber(e.target.value) }))}
                maxLength={19}
                disabled={isAdding}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="card-name">Cardholder Name</Label>
              <Input
                id="card-name"
                placeholder="John Doe"
                value={newCardData.name}
                onChange={(e) => setNewCardData(prev => ({ ...prev, name: e.target.value }))}
                disabled={isAdding}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry-month">Month</Label>
              <Input
                id="expiry-month"
                placeholder="MM"
                value={newCardData.expiryMonth}
                onChange={(e) => setNewCardData(prev => ({ ...prev, expiryMonth: e.target.value.replace(/\D/g, '').slice(0, 2) }))}
                maxLength={2}
                disabled={isAdding}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiry-year">Year</Label>
              <Input
                id="expiry-year"
                placeholder="YYYY"
                value={newCardData.expiryYear}
                onChange={(e) => setNewCardData(prev => ({ ...prev, expiryYear: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                maxLength={4}
                disabled={isAdding}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={newCardData.cvc}
                onChange={(e) => setNewCardData(prev => ({ ...prev, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                maxLength={4}
                disabled={isAdding}
              />
            </div>
          </div>

          <Button
            onClick={handleAddPaymentMethod}
            disabled={isAdding || !newCardData.number || !newCardData.name || !newCardData.expiryMonth || !newCardData.expiryYear || !newCardData.cvc}
            className="w-full"
          >
            {isAdding ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Adding Payment Method...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </>
            )}
          </Button>
        </div>

        {/* Security Notice */}
        <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800">Secure Storage</h4>
            <p className="text-sm text-blue-700">
              Your payment methods are securely stored and encrypted. We never store your full card details.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StripePaymentMethods;
