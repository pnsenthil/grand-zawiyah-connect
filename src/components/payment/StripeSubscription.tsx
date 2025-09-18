import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CreditCard, Calendar, Heart, Shield } from "lucide-react";
import { stripeService } from "@/services/stripeService";

interface StripeSubscriptionProps {
  onSuccess: (subscriptionId: string) => void;
  onError: (error: string) => void;
  onCancel?: () => void;
  planData?: any;
}

const StripeSubscription = ({ onSuccess, onError, onCancel, planData }: StripeSubscriptionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    amount: planData?.amount || 25,
    interval: (planData?.plan?.period || 'month') as 'month' | 'year',
    email: '',
    name: ''
  });

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

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

  const handleSubscription = async () => {
    if (!isInitialized) {
      setError('Payment system not ready');
      return;
    }

    if (!formData.email || !formData.name) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Create customer
      const customerResult = await stripeService.createCustomer({
        email: formData.email,
        name: formData.name,
        metadata: {
          type: 'donor',
          source: 'website'
        }
      });

      if (!customerResult.success || !customerResult.customer) {
        onError(customerResult.error || 'Failed to create customer');
        return;
      }

      // Create product
      const productResult = await stripeService.createProduct({
        name: `Monthly Donation - $${formData.amount}`,
        description: `Recurring donation to Grand Zawiyah`,
        metadata: {
          type: 'donation',
          campaign: 'Grand Zawiyah'
        }
      });

      if (!productResult.success || !productResult.product) {
        onError(productResult.error || 'Failed to create product');
        return;
      }

      // Create price
      const priceResult = await stripeService.createPrice({
        unit_amount: formData.amount * 100, // Convert to cents
        currency: 'usd',
        product: productResult.product.id,
        recurring: {
          interval: formData.interval
        },
        metadata: {
          type: 'donation',
          campaign: 'Grand Zawiyah'
        }
      });

      if (!priceResult.success || !priceResult.price) {
        onError(priceResult.error || 'Failed to create price');
        return;
      }

      // Create subscription
      const subscriptionResult = await stripeService.createSubscription({
        customer: customerResult.customer.id,
        items: [
          {
            price: priceResult.price.id,
            quantity: 1
          }
        ],
        metadata: {
          type: 'donation',
          campaign: 'Grand Zawiyah',
          amount: formData.amount.toString(),
          interval: formData.interval
        }
      });

      if (subscriptionResult.success && subscriptionResult.subscription) {
        onSuccess(subscriptionResult.subscription.id);
      } else {
        onError(subscriptionResult.error || 'Failed to create subscription');
      }
    } catch (error) {
      onError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getIntervalText = (interval: string) => {
    return interval === 'month' ? 'monthly' : 'yearly';
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Recurring Donation
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Amount Selection */}
        <div className="space-y-3">
          <Label>Donation Amount</Label>
          <div className="grid grid-cols-3 gap-2">
            {predefinedAmounts.map(amount => (
              <Button
                key={amount}
                variant={formData.amount === amount ? "primary" : "outline"}
                size="sm"
                onClick={() => setFormData(prev => ({ ...prev, amount }))}
                disabled={isLoading}
              >
                ${amount}
              </Button>
            ))}
          </div>
          <div>
            <Input
              type="number"
              placeholder="Custom amount"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: parseInt(e.target.value) || 0 }))}
              min="1"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Interval Selection */}
        <div className="space-y-3">
          <Label>Frequency</Label>
          <Select 
            value={formData.interval} 
            onValueChange={(value: 'month' | 'year') => setFormData(prev => ({ ...prev, interval: value }))}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Monthly</SelectItem>
              <SelectItem value="year">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Donor Information */}
        <div className="space-y-3">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            disabled={isLoading}
          />
        </div>

        {/* Subscription Summary */}
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-foreground mb-2">Subscription Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-medium">{formatAmount(formData.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frequency:</span>
              <span className="font-medium">{getIntervalText(formData.interval)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total per year:</span>
              <span className="font-bold">
                {formatAmount(formData.interval === 'year' ? formData.amount : formData.amount * 12)}
              </span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Benefits */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-green-600" />
            <span>Automatic recurring donations</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-green-600" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Heart className="h-4 w-4 text-green-600" />
            <span>Support our mission consistently</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleSubscription}
            className="w-full"
            size="lg"
            disabled={isLoading || !isInitialized || !formData.name || !formData.email || formData.amount <= 0}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Subscription...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Start {getIntervalText(formData.interval)} Donation
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

export default StripeSubscription;
