import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, CreditCard, Shield, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import StripeCheckout from "@/components/payment/StripeCheckout";
import StripeSubscription from "@/components/payment/StripeSubscription";
import { useAuth } from "@/contexts/AuthContext";

const predefinedAmounts = [25, 50, 100, 250, 500];

const campaigns = [
  {
    id: 'zawiyah',
    name: 'Grand Zawiyah Construction',
    description: 'Building the main zawiyah for community gatherings and education',
    raised: 125000,
    goal: 500000,
    donors: 234
  },
  {
    id: 'education', 
    name: 'Islamic Education Fund',
    description: 'Supporting online and in-person Islamic education programs',
    raised: 45000,
    goal: 100000,
    donors: 156
  },
  {
    id: 'charity',
    name: 'Community Support',
    description: 'Helping families in need within our global community',
    raised: 78000,
    goal: 150000,
    donors: 189
  }
];

const Donate = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState('zawiyah');
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getCurrentAmount = () => {
    return selectedAmount || parseFloat(customAmount) || 0;
  };

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

  const clearMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const selectedCampaignData = campaigns.find(c => c.id === selectedCampaign);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
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
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Support Our Mission
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Help us build the Grand Zawiyah and continue spreading the teachings of Islam
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-4">
              <Shield className="h-6 w-6 mx-auto mb-2 text-legacy" />
              <h3 className="font-semibold text-sm">Secure</h3>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <CheckCircle className="h-6 w-6 mx-auto mb-2 text-legacy" />
              <h3 className="font-semibold text-sm">Tax Deductible</h3>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <Heart className="h-6 w-6 mx-auto mb-2 text-legacy" />
              <h3 className="font-semibold text-sm">Transparent</h3>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <CreditCard className="h-6 w-6 mx-auto mb-2 text-legacy" />
              <h3 className="font-semibold text-sm">Instant</h3>
            </CardContent>
          </Card>
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Donation Form */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Make a Donation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Campaign Selection */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Choose Campaign</Label>
                  <select 
                    value={selectedCampaign} 
                    onChange={(e) => setSelectedCampaign(e.target.value)}
                    className="w-full p-3 border border-border rounded-lg bg-background"
                  >
                    {campaigns.map(campaign => (
                      <option key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount Selection */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Donation Amount</Label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {predefinedAmounts.map(amount => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "legacy" : "outline"}
                        onClick={() => handleAmountSelect(amount)}
                        className="h-12"
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                  <Input
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    type="number"
                    min="1"
                  />
                </div>

                {/* Impact Preview */}
                {getCurrentAmount() > 0 && (
                  <div className="p-4 bg-legacy/5 rounded-lg border border-legacy/20">
                    <h4 className="font-medium text-legacy mb-2">Your Impact</h4>
                    <p className="text-sm text-muted-foreground">
                      Your ${getCurrentAmount()} donation will help support community programs and education.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Campaign Progress */}
            {selectedCampaignData && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{selectedCampaignData.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{selectedCampaignData.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">${selectedCampaignData.raised.toLocaleString()} raised</span>
                      <span className="text-muted-foreground">${selectedCampaignData.goal.toLocaleString()} goal</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-legacy h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((selectedCampaignData.raised / selectedCampaignData.goal) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-legacy font-medium">
                        {((selectedCampaignData.raised / selectedCampaignData.goal) * 100).toFixed(1)}% complete
                      </span>
                      <span className="text-muted-foreground">{selectedCampaignData.donors} donors</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Payment Options */}
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="one-time" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  One-time
                </TabsTrigger>
                <TabsTrigger value="recurring" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Recurring
                </TabsTrigger>
              </TabsList>

              {/* One-time Donation */}
              <TabsContent value="one-time" className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    One-time Donation
                  </h2>
                  <p className="text-muted-foreground">
                    Support our mission with a single, secure payment
                  </p>
                </div>
                
                <StripeCheckout
                  amount={getCurrentAmount()}
                  description={`Donation to ${selectedCampaignData?.name || 'Grand Zawiyah'}`}
                  onSuccess={handleCheckoutSuccess}
                  onError={handleCheckoutError}
                  onCancel={() => setActiveTab("recurring")}
                  allowAmountChange={true}
                  campaign={selectedCampaignData ? {
                    name: selectedCampaignData.name,
                    description: selectedCampaignData.description
                  } : undefined}
                />
              </TabsContent>

              {/* Recurring Donation */}
              <TabsContent value="recurring" className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Recurring Support
                  </h2>
                  <p className="text-muted-foreground">
                    Provide consistent support with monthly donations
                  </p>
                </div>
                
                <StripeSubscription
                  onSuccess={handleSubscriptionSuccess}
                  onError={handleSubscriptionError}
                  onCancel={() => setActiveTab("one-time")}
                  planData={{
                    amount: getCurrentAmount(),
                    description: `Monthly donation to ${selectedCampaignData?.name || 'Grand Zawiyah'}`,
                    type: 'donation'
                  }}
                />
              </TabsContent>
            </Tabs>

            {/* Benefits */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Why Donate?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-legacy/20 rounded-full flex items-center justify-center mt-0.5">
                      <Heart className="h-3 w-3 text-legacy" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Sadaqah Jariyah</h4>
                      <p className="text-xs text-muted-foreground">Create lasting charity that continues to benefit the community</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-legacy/20 rounded-full flex items-center justify-center mt-0.5">
                      <Shield className="h-3 w-3 text-legacy" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Tax Deductible</h4>
                      <p className="text-xs text-muted-foreground">All donations are tax-deductible with receipt provided</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-legacy/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-3 w-3 text-legacy" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Transparent</h4>
                      <p className="text-xs text-muted-foreground">See exactly how your donation is used</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;