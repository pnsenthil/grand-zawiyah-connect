import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Crown
} from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingStates";

const PremiumPayments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState(location.state?.plan || null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If no plan is selected, redirect to premium page
    if (!selectedPlan) {
      navigate('/premium');
    }
  }, [selectedPlan, navigate]);

  const handleContinueToConfirmation = () => {
    navigate('/premium-confirmation', { state: { plan: selectedPlan } });
  };

  const handleGoBack = () => {
    navigate('/premium');
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
            Back to Plans
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Complete Your Premium Subscription
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You're about to unlock exclusive Islamic educational content and join our premium community.
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
                {selectedPlan.name} Plan
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
                  <h3 className="font-semibold text-foreground mb-3">What's included:</h3>
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

          {/* Payment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
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
                    <Separator />
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total</span>
                      <span>{selectedPlan.price}</span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Benefits of Premium Membership</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Cancel anytime</li>
                    <li>• 7-day free trial</li>
                    <li>• Instant access to all content</li>
                    <li>• Priority support</li>
                  </ul>
                </div>

                {/* Security */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secure payment processing powered by Stripe</span>
                </div>

                {/* Continue Button */}
                <Button
                  onClick={handleContinueToConfirmation}
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner />
                      Processing...
                    </>
                  ) : (
                    <>
                      Continue to Confirmation
                      <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                    </>
                  )}
                </Button>

                {/* Trust Indicators */}
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Instant Access</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>50K+ Members</span>
                    </div>
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

export default PremiumPayments;
