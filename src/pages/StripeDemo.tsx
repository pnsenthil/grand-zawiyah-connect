import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CreditCard, 
  Heart, 
  Settings, 
  CheckCircle, 
  ArrowLeft,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "@/components/payment/StripeCheckout";
import StripeSubscription from "@/components/payment/StripeSubscription";
import StripePaymentMethods from "@/components/payment/StripePaymentMethods";

const StripeDemo = () => {
  const [activeTab, setActiveTab] = useState("checkout");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleCheckoutSuccess = (sessionId: string) => {
    setSuccessMessage(`Checkout session created successfully: ${sessionId}`);
    setErrorMessage("");
  };

  const handleCheckoutError = (error: string) => {
    setErrorMessage(`Checkout failed: ${error}`);
    setSuccessMessage("");
  };

  const handleSubscriptionSuccess = (subscriptionId: string) => {
    setSuccessMessage(`Subscription created successfully: ${subscriptionId}`);
    setErrorMessage("");
  };

  const handleSubscriptionError = (error: string) => {
    setErrorMessage(`Subscription failed: ${error}`);
    setSuccessMessage("");
  };

  const handlePaymentMethodAdded = (paymentMethod: any) => {
    setSuccessMessage(`Payment method added: ${paymentMethod.id}`);
    setErrorMessage("");
  };

  const handlePaymentMethodRemoved = (paymentMethodId: string) => {
    setSuccessMessage(`Payment method removed: ${paymentMethodId}`);
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
                Stripe Integration Demo
              </h1>
              <p className="text-muted-foreground">
                Test the payment processing capabilities with mock Stripe integration
              </p>
            </div>
          </div>

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

          {/* Demo Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="checkout" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                One-time Payment
              </TabsTrigger>
              <TabsTrigger value="subscription" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Recurring Donation
              </TabsTrigger>
              <TabsTrigger value="payment-methods" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Payment Methods
              </TabsTrigger>
            </TabsList>

            {/* One-time Payment Tab */}
            <TabsContent value="checkout" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  One-time Payment
                </h2>
                <p className="text-muted-foreground">
                  Process a single donation using Stripe Checkout
                </p>
              </div>
              
              <StripeCheckout
                amount={100}
                description="Grand Zawiyah Donation"
                onSuccess={handleCheckoutSuccess}
                onError={handleCheckoutError}
                onCancel={() => setActiveTab("subscription")}
              />

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Secure Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        PCI DSS compliant payment processing with 256-bit SSL encryption
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Multiple Payment Methods</h4>
                      <p className="text-sm text-muted-foreground">
                        Accept credit cards, debit cards, and digital wallets
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Instant Confirmation</h4>
                      <p className="text-sm text-muted-foreground">
                        Real-time payment confirmation and receipt generation
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Global Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Accept payments from customers worldwide
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recurring Donation Tab */}
            <TabsContent value="subscription" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Recurring Donation
                </h2>
                <p className="text-muted-foreground">
                  Set up monthly or yearly recurring donations
                </p>
              </div>
              
              <StripeSubscription
                onSuccess={handleSubscriptionSuccess}
                onError={handleSubscriptionError}
                onCancel={() => setActiveTab("checkout")}
              />

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Benefits of Recurring Donations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Heart className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">Consistent Impact</h4>
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
                        <h4 className="font-medium">Flexibility</h4>
                        <p className="text-sm text-muted-foreground">
                          Easily modify, pause, or cancel your subscription at any time
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
                  Payment Methods
                </h2>
                <p className="text-muted-foreground">
                  Manage your saved payment methods for faster checkout
                </p>
              </div>
              
              <StripePaymentMethods
                customerId="cus_mock_demo"
                onPaymentMethodAdded={handlePaymentMethodAdded}
                onPaymentMethodRemoved={handlePaymentMethodRemoved}
              />

              {/* Security Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
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
                        <h4 className="font-medium">PCI Compliance</h4>
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
                          Your actual card details are never stored on our servers - only secure tokens
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default StripeDemo;
