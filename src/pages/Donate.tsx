import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, CreditCard, Calendar, Target, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import PaymentForm from "@/components/payment/PaymentForm";
import PaymentSuccess from "@/components/payment/PaymentSuccess";
import DonationAuthModal from "@/components/ui/DonationAuthModal";
import { useDonationTracking } from "@/hooks/useAnalytics";
import { useAuth } from "@/contexts/AuthContext";

const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

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

const DonationForm = ({ onProceedToPayment }: { onProceedToPayment: (data: any) => void }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [selectedCampaign, setSelectedCampaign] = useState('zawiyah');
  const { trackDonationFunnel, trackAmount } = useDonationTracking();

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    trackAmount(amount);
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getCurrentAmount = () => {
    return selectedAmount || parseFloat(customAmount) || 0;
  };

  const handleProceed = () => {
    const selectedCampaignData = campaigns.find(c => c.id === selectedCampaign);
    const amount = getCurrentAmount();
    
    trackDonationFunnel('payment_form', {
      amount,
      frequency,
      campaign: selectedCampaignData?.name || 'General Fund'
    });
    
    onProceedToPayment({
      amount,
      frequency: frequency as 'one-time' | 'monthly' | 'annual',
      campaign: selectedCampaignData?.name || 'General Fund'
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6">Make a Donation</h3>
      
      {/* Campaign Selection */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-3 block">Choose Campaign</Label>
        <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {campaigns.map(campaign => (
              <SelectItem key={campaign.id} value={campaign.id}>
                {campaign.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Amount Selection */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-3 block">Donation Amount</Label>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {predefinedAmounts.map(amount => (
            <Button
              key={amount}
              variant={selectedAmount === amount ? "primary" : "outline"}
              onClick={() => handleAmountSelect(amount)}
              className="h-12"
            >
              ${amount}
            </Button>
          ))}
        </div>
        <div>
          <Input
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            type="number"
            min="1"
          />
        </div>
      </div>

      {/* Frequency Selection */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-3 block">Donation Frequency</Label>
        <Tabs value={frequency} onValueChange={setFrequency}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="one-time">One-time</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">Annual</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Impact Preview */}
      {getCurrentAmount() > 0 && (
        <div className="mb-6 p-4 bg-accent rounded-lg">
          <h4 className="font-medium text-accent-foreground mb-2">Your Impact</h4>
          <p className="text-sm text-muted-foreground">
            Your ${getCurrentAmount()} {frequency === 'monthly' ? 'monthly' : frequency === 'annual' ? 'annual' : ''} donation will help:
          </p>
          <ul className="text-sm text-muted-foreground mt-2 space-y-1">
            <li>• Support community programs and education</li>
            <li>• Maintain zawiyah facilities and resources</li>
            <li>• Provide assistance to families in need</li>
          </ul>
        </div>
      )}

      <Button 
        variant="primary" 
        size="lg" 
        className="w-full" 
        disabled={getCurrentAmount() === 0}
        onClick={handleProceed}
      >
        <CreditCard className="h-5 w-5 mr-2" />
        Proceed to Payment
      </Button>
    </Card>
  );
};

const CampaignCard = ({ campaign, onDonate }: { campaign: typeof campaigns[0]; onDonate: (campaign: typeof campaigns[0]) => void }) => {
  const progressPercentage = (campaign.raised / campaign.goal) * 100;

  return (
    <Card className="p-6 card-elegant">
      <h3 className="text-xl font-semibold mb-2">{campaign.name}</h3>
      <p className="text-muted-foreground mb-4">{campaign.description}</p>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">${campaign.raised.toLocaleString()} raised</span>
          <span className="text-muted-foreground">${campaign.goal.toLocaleString()} goal</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-gradient-primary h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-primary font-medium">{progressPercentage.toFixed(1)}% complete</span>
          <span className="text-muted-foreground">{campaign.donors} donors</span>
        </div>
      </div>
      
      <Button variant="primary" className="w-full" onClick={() => onDonate(campaign)}>
        <Heart className="h-4 w-4 mr-2" />
        Donate Now
      </Button>
    </Card>
  );
};

const Donate = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [successData, setSuccessData] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingDonation, setPendingDonation] = useState<any>(null);
  const { trackDonationFunnel, trackSuccess, trackFailure } = useDonationTracking();

  const handleProceedToPayment = (data: any) => {
    setPaymentData(data);
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = (result: any) => {
    setSuccessData(result);
    setShowPaymentForm(false);
    setShowSuccess(true);
    
    // Track successful donation
    trackSuccess(
      result.amount,
      'USD',
      paymentData?.campaign || 'General Fund',
      result.transactionId
    );
  };

  const handlePaymentError = (error: string) => {
    alert(`Payment failed: ${error}`);
    
    // Track failed donation
    trackFailure(
      paymentData?.amount || 0,
      'USD',
      paymentData?.campaign || 'General Fund',
      error
    );
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setShowPaymentForm(false);
    setPaymentData(null);
    setSuccessData(null);
  };

  const handleDonate = (campaign: typeof campaigns[0]) => {
    if (isAuthenticated) {
      // User is logged in, proceed directly to payments
      navigate('/payments', { 
        state: { 
          campaign: campaign,
          amount: null, // No default amount - let user input
          description: `Donation to ${campaign.name}`,
          type: 'donation'
        } 
      });
    } else {
      // User is not logged in, show auth modal
      setPendingDonation(campaign);
      setShowAuthModal(true);
    }
  };

  const handleLogin = () => {
    setShowAuthModal(false);
    navigate('/auth');
  };

  const handleContinueAsGuest = () => {
    setShowAuthModal(false);
    if (pendingDonation) {
      navigate('/payments', { 
        state: { 
          campaign: pendingDonation,
          amount: null,
          description: `Donation to ${pendingDonation.name}`,
          type: 'donation'
        } 
      });
    }
    setPendingDonation(null);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
    setPendingDonation(null);
  };

  if (showPaymentForm && paymentData) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Complete Your Donation</h1>
            <p className="text-muted-foreground">
              Secure payment processing for your ${paymentData.amount} donation
            </p>
          </div>
          <PaymentForm
            amount={paymentData.amount}
            frequency={paymentData.frequency}
            campaign={paymentData.campaign}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>
      </div>
    );
  }

  if (showSuccess && successData) {
    return (
      <PaymentSuccess
        transactionId={successData.transactionId}
        amount={successData.amount}
        campaign={paymentData?.campaign || 'General Fund'}
        onClose={handleCloseSuccess}
      />
    );
  }

  return (
    <>
      {/* Header */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Support Our Mission
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Help us build the Grand Zawiyah and continue spreading the teachings of Islam
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <Badge variant="secondary" className="px-4 py-2">
                <Target className="h-5 w-5 mr-2" />
                Goal: $750,000
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Users className="h-5 w-5 mr-2" />
                579 Donors
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Clock className="h-5 w-5 mr-2" />
                6 Months Left
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Donation Form */}
            <div className="lg:col-span-1">
              <DonationForm onProceedToPayment={handleProceedToPayment} />
              
              {/* Quick Stats */}
              <Card className="p-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This Month</span>
                    <span className="font-medium">$12,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Raised</span>
                    <span className="font-medium">$248,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg. Donation</span>
                    <span className="font-medium">$86</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Campaign Cards */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Active Campaigns</h2>
              <div className="space-y-6">
                {campaigns.map(campaign => (
                  <CampaignCard key={campaign.id} campaign={campaign} onDonate={handleDonate} />
                ))}
              </div>
              
              {/* Recurring Donation Benefits */}
              <Card className="p-6 mt-8 bg-gradient-accent">
                <h3 className="text-xl font-semibold mb-4">Why Choose Recurring Donations?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">Consistent Impact</h4>
                      <p className="text-sm text-muted-foreground">Regular support helps us plan long-term projects</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <Heart className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">Automatic Giving</h4>
                      <p className="text-sm text-muted-foreground">Set it once and continue your charitable impact</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Modal */}
      <DonationAuthModal
        isOpen={showAuthModal}
        onClose={handleCloseAuthModal}
        onLogin={handleLogin}
        onContinueAsGuest={handleContinueAsGuest}
        campaign={pendingDonation}
      />
    </>
  );
};

export default Donate;