import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Check, 
  Star, 
  Crown, 
  BookOpen, 
  Users, 
  Shield,
  ArrowLeft,
  Zap
} from "lucide-react";

const PremiumPricing = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const pricingPlans = [
    {
      id: "basic",
      name: "Basic Premium",
      price: 9.99,
      period: "month",
      description: "Essential premium content and features",
      popular: false,
      features: [
        "Access to premium lessons",
        "Downloadable resources",
        "Community forum access",
        "Email support",
        "Basic analytics"
      ],
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      id: "premium",
      name: "Premium Plus",
      price: 19.99,
      period: "month",
      description: "Complete premium experience with advanced features",
      popular: true,
      features: [
        "Everything in Basic Premium",
        "Live Q&A sessions",
        "Personalized learning paths",
        "Priority support",
        "Advanced analytics",
        "Exclusive content library",
        "Mobile app access"
      ],
      icon: <Star className="h-6 w-6" />
    },
    {
      id: "family",
      name: "Family Plan",
      price: 39.99,
      period: "month",
      description: "Perfect for families and small groups",
      popular: false,
      features: [
        "Everything in Premium Plus",
        "Up to 5 family members",
        "Family dashboard",
        "Child-safe content",
        "Group learning sessions",
        "Family progress tracking",
        "Dedicated family support"
      ],
      icon: <Users className="h-6 w-6" />
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    const plan = pricingPlans.find(p => p.id === planId);
    if (plan) {
      navigate('/payments', { 
        state: { 
          type: 'premium',
          plan: plan,
          amount: plan.price,
          description: `${plan.name} - ${plan.period}ly subscription`
        }
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Choose Your Premium Plan
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Unlock exclusive Islamic content, advanced learning features, and join our premium community. 
                All plans include access to our complete library of Tariqa teachings.
              </p>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative transition-all duration-200 hover:shadow-lg ${
                  plan.popular ? 'ring-2 ring-primary shadow-lg scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      {plan.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                  
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                      <span className="text-muted-foreground ml-1">/{plan.period}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {plan.popular ? (
                      <>
                        <Crown className="h-4 w-4 mr-2" />
                        Choose Premium Plus
                      </>
                    ) : (
                      `Choose ${plan.name}`
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Zap className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Exclusive Content</h4>
                      <p className="text-sm text-muted-foreground">
                        Access to premium Islamic lessons, lectures, and spiritual guidance not available elsewhere
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Advanced Learning</h4>
                      <p className="text-sm text-muted-foreground">
                        Personalized learning paths, progress tracking, and interactive study tools
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Community Access</h4>
                      <p className="text-sm text-muted-foreground">
                        Join our exclusive community of learners and connect with like-minded individuals
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Why Choose Premium?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Support Our Mission</h4>
                      <p className="text-sm text-muted-foreground">
                        Your subscription directly supports Islamic education and community building
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Flexible & Cancel Anytime</h4>
                      <p className="text-sm text-muted-foreground">
                        No long-term commitments. Cancel or change your plan at any time
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Secure & Private</h4>
                      <p className="text-sm text-muted-foreground">
                        Your data is protected with bank-level security and privacy standards
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Can I change my plan later?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Is there a free trial?</h4>
                  <p className="text-sm text-muted-foreground">
                    We offer a 7-day free trial for all premium plans. No credit card required to start.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">What payment methods do you accept?</h4>
                  <p className="text-sm text-muted-foreground">
                    We accept all major credit cards, PayPal, and bank transfers. All payments are secure and encrypted.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Can I cancel anytime?</h4>
                  <p className="text-sm text-muted-foreground">
                    Absolutely. You can cancel your subscription at any time with no cancellation fees.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PremiumPricing;
