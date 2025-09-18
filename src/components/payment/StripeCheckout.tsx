import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CreditCard, Shield, CheckCircle, DollarSign } from "lucide-react";
import { stripeService } from "@/services/stripeService";

interface StripeCheckoutProps {
  amount: number;
  currency?: string;
  description: string;
  onSuccess: (sessionId: string) => void;
  onError: (error: string) => void;
  onCancel?: () => void;
  allowAmountChange?: boolean;
  campaign?: {
    name: string;
    description: string;
  };
}

const StripeCheckout = ({ 
  amount, 
  currency = 'usd', 
  description, 
  onSuccess, 
  onError, 
  onCancel,
  allowAmountChange = false,
  campaign
}: StripeCheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState('');
  const [currentAmount, setCurrentAmount] = useState(amount || 0);

  useEffect(() => {
    setCurrentAmount(amount || 0);
  }, [amount]);

  useEffect(() => {
    initializeStripe();
  }, []);

  const initializeStripe = async () => {
    try {
      const success = await stripeService.initialize();
      setIsInitialized(success);
      if (!success) {
        setError('Failed to initialize payment system');
      }
    } catch (error) {
      setError('Failed to initialize payment system');
    }
  };

  const handleCheckout = async () => {
    if (!isInitialized) {
      setError('Payment system not ready');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Create checkout session
      const result = await stripeService.createCheckoutSession({
        line_items: [
          {
            price_data: {
              currency: currency,
              product_data: {
                name: description,
                description: `Donation to Grand Zawiyah`
              },
              unit_amount: currentAmount * 100, // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${window.location.origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/donate`,
        metadata: {
          campaign: 'Grand Zawiyah',
          type: 'donation'
        }
      });

      if (result.success && result.session) {
        // Redirect to Stripe Checkout
        const redirectResult = await stripeService.redirectToCheckout(result.session.id);
        
        if (redirectResult.success) {
          onSuccess(result.session.id);
        } else {
          onError(redirectResult.error || 'Failed to redirect to checkout');
        }
      } else {
        onError(result.error || 'Failed to create checkout session');
      }
    } catch (error) {
      onError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Secure Checkout
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Amount Input */}
        {allowAmountChange && (
          <div className="space-y-2">
            <Label htmlFor="donation-amount" className="text-base">Donation Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="donation-amount"
                type="number"
                value={currentAmount === 0 ? '' : currentAmount}
                onChange={(e) => setCurrentAmount(Number(e.target.value) || 0)}
                min="1"
                step="1"
                placeholder="Enter amount"
                className="pl-10 pr-3 py-2 text-lg"
              />
            </div>
          </div>
        )}

        {/* Payment Summary */}
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-foreground mb-2">Payment Summary</h3>
          <div className="space-y-2 text-sm">
            {campaign && (
              <div className="mb-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Supporting:</span>
                  <div className="text-right">
                    <span className="font-semibold text-primary">{campaign.name}</span>
                    <p className="text-xs text-muted-foreground mt-1">{campaign.description}</p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Description:</span>
              <span className="font-medium">{description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-bold text-lg">
                {currentAmount === 0 ? 'Enter amount above' : formatAmount(currentAmount, currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Currency:</span>
              <span className="font-medium">{currency.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Security Notice */}
        <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <Shield className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-800">Secure Payment</h4>
            <p className="text-sm text-green-700">
              Your payment is processed securely by Stripe. We never store your payment information.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>256-bit SSL encryption</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>PCI DSS compliant</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Instant confirmation</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleCheckout}
            className="w-full"
            size="lg"
            disabled={isLoading || !isInitialized || !!error || currentAmount <= 0}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                {currentAmount === 0 ? 'Enter amount to continue' : `Pay ${formatAmount(currentAmount, currency)}`}
              </>
            )}
          </Button>
          
          {onCancel && (
            <Button
              variant="outline"
              className="w-full"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
        </div>

        {/* Loading State */}
        {!isInitialized && (
          <div className="text-center py-4">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Initializing payment system...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StripeCheckout;
