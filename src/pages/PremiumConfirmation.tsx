import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Check, 
  ArrowLeft, 
  CreditCard, 
  Shield, 
  Clock, 
  Star,
  Users,
  BookOpen,
  Zap,
  Crown,
  AlertCircle
} from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingStates";

const PremiumConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState(location.state?.plan || null);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  useEffect(() => {
    // If no plan is selected, redirect to premium page
    if (!selectedPlan) {
      navigate('/premium');
    }
  }, [selectedPlan, navigate]);

  const handleConfirmPurchase = async () => {
    if (!termsAccepted || !privacyAccepted) {
      return;
    }

    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      navigate('/premium-success', { state: { plan: selectedPlan } });
    }, 2000);
  };

  const handleGoBack = () => {
    navigate('/premium-payments', { state: { plan: selectedPlan } });
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const getPlanFeatures = (planName: string) => {
    switch (planName) {
      case "Basic":
        return [
          "Access to basic video content",
          "Monthly dhikr sessions",
          "Community forum access",
          "Basic learning resources"
        ];
      case "Premium":
        return [
          "Full video library access",
          "Weekly live sessions",
          "Personalized learning path",
          "Advanced study materials",
          "Priority community support",
          "Downloadable content"
        ];
      case "Scholar":
        return [
          "Everything in Premium",
          "One-on-one mentorship",
          "Advanced certification programs",
          "Teaching resources",
          "Exclusive events access",
          "Custom study plans"
        ];
      default:
        return [];
    }
  };

  const getPlanIcon = (planName: string) => {
    switch (planName) {
      case "Basic":
        return <BookOpen className="h-6 w-6" />;
      case "Premium":
        return <Star className="h-6 w-6" />;
      case "Scholar":
        return <Crown className="h-6 w-6" />;
      default:
        return <BookOpen className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Payment
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Confirm Your Premium Subscription
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Please review your subscription details and confirm your purchase.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Plan Summary */}
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {getPlanIcon(selectedPlan.name)}
                </div>
                {selectedPlan.name} Plan - Final Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Pricing */}
                <div className="text-center py-6 bg-muted/50 rounded-lg">
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {selectedPlan.price}
                  </div>
                  <div className="text-muted-foreground">
                    per {selectedPlan.period}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">You'll get access to:</h3>
                  <ul className="space-y-2">
                    {getPlanFeatures(selectedPlan.name).map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Popular Badge */}
                {selectedPlan.popular && (
                  <Badge className="w-fit bg-primary text-primary-foreground">
                    Most Popular Choice
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Confirmation Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Purchase Confirmation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Order Summary */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        {selectedPlan.name} Plan ({selectedPlan.period}ly)
                      </span>
                      <span className="font-medium">{selectedPlan.price}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Billing cycle</span>
                      <span>Every {selectedPlan.period}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total</span>
                      <span>{selectedPlan.price}</span>
                    </div>
                  </div>
                </div>

                {/* Important Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-1">Important Information</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Your subscription starts immediately</li>
                        <li>• You can cancel anytime from your dashboard</li>
                        <li>• You'll be charged {selectedPlan.price} every {selectedPlan.period}</li>
                        <li>• Full access to all premium content included</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and 
                      understand that my subscription will automatically renew unless cancelled.
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="privacy"
                      checked={privacyAccepted}
                      onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                    />
                    <label htmlFor="privacy" className="text-sm text-muted-foreground cursor-pointer">
                      I agree to the <a href="#" className="text-primary hover:underline">Privacy Policy</a> and 
                      consent to the processing of my personal data.
                    </label>
                  </div>
                </div>

                {/* Confirm Purchase Button */}
                <Button
                  onClick={handleConfirmPurchase}
                  className="w-full"
                  size="lg"
                  disabled={isLoading || !termsAccepted || !privacyAccepted}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner />
                      Processing Purchase...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Confirm Purchase - {selectedPlan.price}
                    </>
                  )}
                </Button>

                {/* Security Notice */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3" />
                    <span>Secure payment processing • SSL encrypted</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PremiumConfirmation;
