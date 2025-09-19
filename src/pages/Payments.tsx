import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Heart, 
  Settings, 
  CheckCircle, 
  Check,
  ArrowLeft,
  Zap,
  Shield,
  Globe,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  Crown
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "@/components/payment/StripeCheckout";
import StripeSubscription from "@/components/payment/StripeSubscription";
import StripePaymentMethods from "@/components/payment/StripePaymentMethods";

const Payments = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("checkout");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentData, setPaymentData] = useState<any>(null);
  const navigate = useNavigate();

  // Handle state from navigation (e.g., from premium pricing or donations)
  useEffect(() => {
    if (location.state) {
      setPaymentData(location.state);
      if (location.state.type === 'premium') {
        setActiveTab("subscription");
      } else if (location.state.type === 'donation') {
        setActiveTab("checkout");
      }
    }
  }, [location.state]);

  const handleCheckoutSuccess = (sessionId: string) => {
    setSuccessMessage(`Payment processed successfully! Transaction ID: ${sessionId}`);
    setErrorMessage("");
  };

  const handleCheckoutError = (error: string) => {
    setErrorMessage(`Payment failed: ${error}`);
    setSuccessMessage("");
  };

  const handleSubscriptionSuccess = (subscriptionId: string) => {
    setSuccessMessage(`Recurring donation set up successfully! Subscription ID: ${subscriptionId}`);
    setErrorMessage("");
  };

  const handleSubscriptionError = (error: string) => {
    setErrorMessage(`Subscription setup failed: ${error}`);
    setSuccessMessage("");
  };

  const handlePaymentMethodAdded = (paymentMethod: any) => {
    setSuccessMessage(`Payment method added successfully!`);
    setErrorMessage("");
  };

  const handlePaymentMethodRemoved = (paymentMethodId: string) => {
    setSuccessMessage(`Payment method removed successfully!`);
    setErrorMessage("");
  };

  const clearMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-4 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Secure Payment Center
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Support the Grand Zawiyah community through secure, convenient payment options. 
                Your contributions help preserve the legacy of Shaykh Hassan Cisse (RA) and support Islamic education.
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Bank-Level Security</h3>
                <p className="text-sm text-muted-foreground">256-bit SSL encryption</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Globe className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Global Support</h3>
                <p className="text-sm text-muted-foreground">Accept payments worldwide</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Instant Processing</h3>
                <p className="text-sm text-muted-foreground">Real-time confirmation</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">PCI Compliant</h3>
                <p className="text-sm text-muted-foreground">Industry standards</p>
              </CardContent>
            </Card>
          </div>

          {/* Payment Details from Navigation */}
          {paymentData && (
            <Card className="mb-6 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {paymentData.type === 'premium' ? (
                    <>
                      <Crown className="h-5 w-5 text-primary" />
                      Premium Subscription
                    </>
                  ) : paymentData.type === 'donation' ? (
                    <>
                      <Heart className="h-5 w-5 text-primary" />
                      Campaign Donation
                    </>
                  ) : (
                    <>
                      <Crown className="h-5 w-5 text-primary" />
                      Payment Details
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {paymentData.type === 'donation' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Campaign Details</h4>
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-3">
                        <h5 className="font-semibold text-primary mb-1">Cause: {paymentData.campaign?.name}</h5>
                        <p className="text-sm text-muted-foreground">{paymentData.campaign?.description}</p>
                      </div>
                      <p className="text-lg font-semibold text-primary mt-1">
                        {paymentData.amount ? `$${paymentData.amount} donation` : 'Custom donation amount'}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Campaign Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Raised: ${paymentData.campaign?.raised?.toLocaleString()}</span>
                          <span>Goal: ${paymentData.campaign?.goal?.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${Math.min((paymentData.campaign?.raised / paymentData.campaign?.goal) * 100, 100)}%` }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {paymentData.campaign?.donors} donors
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Plan Details</h4>
                      <p className="text-sm text-muted-foreground">{paymentData.description}</p>
                      <p className="text-lg font-semibold text-primary mt-1">${paymentData.amount}/{paymentData.plan?.period}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">What's Included</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {paymentData.plan?.features?.slice(0, 3).map((feature: string, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Messages */}
          {(successMessage || errorMessage) && (
            <div className="mb-6">
              {successMessage && (
                <Alert className="mb-2">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}
              {errorMessage && (
                <Alert variant="destructive" className="mb-2">
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              <Button variant="outline" size="sm" onClick={clearMessages}>
                Clear Messages
              </Button>
            </div>
          )}

          {/* Payment Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="checkout" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                One-time Donation
              </TabsTrigger>
              <TabsTrigger value="roundup" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Round-up Giving
              </TabsTrigger>
              <TabsTrigger value="subscription" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Recurring Support
              </TabsTrigger>
              <TabsTrigger value="payment-methods" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Payment Methods
              </TabsTrigger>
            </TabsList>

            {/* One-time Donation Tab */}
            <TabsContent value="checkout" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Make a One-time Donation
                </h2>
                <p className="text-muted-foreground">
                  Support our mission with a single, secure payment
                </p>
              </div>

              {/* Campaign Cause Information */}
              {paymentData?.type === 'donation' && paymentData?.campaign && (
                <Card className="mb-6 border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Heart className="h-8 w-8 mx-auto mb-3 text-primary" />
                      <h3 className="text-xl font-bold text-primary mb-2">
                        Supporting: {paymentData.campaign.name}
                      </h3>
                      <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                        {paymentData.campaign.description}
                      </p>
                      <div className="flex justify-center items-center gap-4 text-sm">
                        <span className="text-primary font-semibold">
                          ${paymentData.campaign.raised?.toLocaleString()} raised
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">
                          {paymentData.campaign.donors} donors
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <StripeCheckout
                amount={paymentData?.amount || 0}
                description={paymentData?.description || "Grand Zawiyah Donation"}
                onSuccess={handleCheckoutSuccess}
                onError={handleCheckoutError}
                onCancel={() => setActiveTab("subscription")}
                allowAmountChange={true}
                campaign={paymentData?.campaign ? {
                  name: paymentData.campaign.name,
                  description: paymentData.campaign.description
                } : undefined}
              />

              {/* Impact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Your Donation Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">Community Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Help maintain our community center and educational programs
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Heart className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">Sadaqah Jariyah</h4>
                      <p className="text-sm text-muted-foreground">
                        Create lasting charity that continues to benefit the community
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Zap className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">Immediate Impact</h4>
                      <p className="text-sm text-muted-foreground">
                        Your contribution helps us respond quickly to community needs
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Round-up Giving Tab */}
            <TabsContent value="roundup" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Round-up Giving
                </h2>
                <p className="text-muted-foreground">
                  Automatically round up your everyday purchases to support our mission
                </p>
              </div>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    How Round-up Giving Works
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CreditCard className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">1. Connect Your Card</h4>
                      <p className="text-sm text-muted-foreground">
                        Securely link your debit or credit card to our platform
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Zap className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">2. Automatic Rounding</h4>
                      <p className="text-sm text-muted-foreground">
                        Every purchase gets rounded up to the nearest dollar
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Heart className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">3. Make a Difference</h4>
                      <p className="text-sm text-muted-foreground">
                        Small amounts add up to create meaningful impact
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-background rounded-lg p-6 border">
                    <h4 className="font-semibold mb-4">Example Round-up Impact</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Coffee purchase: $4.75</span>
                        <span className="text-sm text-primary font-medium">+$0.25</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Grocery shopping: $23.40</span>
                        <span className="text-sm text-primary font-medium">+$0.60</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Gas station: $31.20</span>
                        <span className="text-sm text-primary font-medium">+$0.80</span>
                      </div>
                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between items-center font-semibold">
                          <span>Daily total impact:</span>
                          <span className="text-primary">$1.65</span>
                        </div>
                        <div className="flex justify-between items-center font-semibold">
                          <span>Monthly impact:</span>
                          <span className="text-primary">~$50</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Set Up Round-up Giving</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Round-up Amount</h4>
                        <p className="text-sm text-muted-foreground">Choose how much to round up</p>
                      </div>
                      <Badge variant="secondary">$0.01 - $1.00</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Monthly Cap</h4>
                        <p className="text-sm text-muted-foreground">Set a maximum monthly donation</p>
                      </div>
                      <Badge variant="secondary">$25 - $100</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Donation Frequency</h4>
                        <p className="text-sm text-muted-foreground">When to process your round-ups</p>
                      </div>
                      <Badge variant="secondary">Weekly</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <Button className="w-full" size="lg">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Connect Card & Start Rounding Up
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Your card information is encrypted and secure. You can pause or stop anytime.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recurring Support Tab */}
            <TabsContent value="subscription" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Set Up Recurring Support
                </h2>
                <p className="text-muted-foreground">
                  Provide consistent support with monthly or yearly recurring donations
                </p>
              </div>
              
              <StripeSubscription
                onSuccess={handleSubscriptionSuccess}
                onError={handleSubscriptionError}
                onCancel={() => setActiveTab("checkout")}
                planData={paymentData}
              />

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Benefits of Recurring Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">Sustainable Impact</h4>
                        <p className="text-sm text-muted-foreground">
                          Regular support helps us plan long-term projects and maintain consistent community services
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <CreditCard className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">Convenience</h4>
                        <p className="text-sm text-muted-foreground">
                          Set it once and continue your charitable impact without remembering to donate each month
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Settings className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">Full Control</h4>
                        <p className="text-sm text-muted-foreground">
                          Easily modify, pause, or cancel your subscription at any time through your dashboard
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Methods Tab */}
            <TabsContent value="payment-methods" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Manage Payment Methods
                </h2>
                <p className="text-muted-foreground">
                  Securely store and manage your payment information for faster checkout
                </p>
              </div>
              
              <StripePaymentMethods
                customerId="cus_mock_demo"
                onPaymentMethodAdded={handlePaymentMethodAdded}
                onPaymentMethodRemoved={handlePaymentMethodRemoved}
              />

              {/* Security Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security & Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Encrypted Storage</h4>
                        <p className="text-sm text-muted-foreground">
                          All payment information is encrypted and stored securely using industry-standard protocols
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">PCI DSS Compliance</h4>
                        <p className="text-sm text-muted-foreground">
                          We maintain PCI DSS Level 1 compliance, the highest level of security certification
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Tokenization</h4>
                        <p className="text-sm text-muted-foreground">
                          Your actual card details are never stored on our servers - only secure tokens for processing
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Additional Information */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Tax Deductible Donations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  All donations to Grand Zawiyah are tax-deductible. You'll receive a receipt for your records.
                </p>
                <Badge variant="secondary">501(c)(3) Non-Profit</Badge>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Your support directly funds educational programs, community services, and the preservation of Islamic heritage.
                </p>
                <Badge variant="secondary">100% Transparent</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payments;
