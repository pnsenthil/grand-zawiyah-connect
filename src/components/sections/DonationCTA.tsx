import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart, Shield, TrendingUp, Gift } from "lucide-react";

const DonationCTA = () => {
  const navigate = useNavigate();
  const donationOptions = [
    { amount: "$25", label: "Feed a Family", popular: false },
    { amount: "$50", label: "Monthly Support", popular: true },
    { amount: "$100", label: "Education Fund", popular: false },
    { amount: "$250", label: "Community Project", popular: false },
  ];

  const benefits = [
    {
      icon: <Shield className="h-5 w-5" />,
      text: "100% Secure Payments",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      text: "Real-time Impact Tracking",
    },
    {
      icon: <Gift className="h-5 w-5" />,
      text: "Tax-deductible Receipts",
    },
    {
      icon: <Heart className="h-5 w-5" />,
      text: "Transparent Fund Usage",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Your Donation Creates{" "}
              <span className="text-legacy">
                Lasting Impact
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every contribution helps us preserve Islamic knowledge, support community members, 
              and honor the legacy of Shaykh Hassan Cisse (RA).
            </p>
          </div>

          {/* Simplified Donation Card */}
          <Card className="card-elegant border-0 shadow-elegant">
            <CardContent className="p-8 md:p-12">
              {/* Amount Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-6 text-center">Choose Your Contribution</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {donationOptions.map((option, index) => (
                    <button
                      key={index}
                      className={`relative p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                        option.popular
                          ? 'border-legacy bg-legacy text-legacy-foreground shadow-md'
                          : 'border-border bg-background hover:border-legacy/50'
                      }`}
                    >
                      {option.popular && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <span className="text-xs font-medium bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full">
                            Popular
                          </span>
                        </div>
                      )}
                      <div className={`text-2xl font-bold ${option.popular ? 'text-legacy-foreground' : 'text-foreground'}`}>
                        {option.amount}
                      </div>
                      <div className={`text-sm ${option.popular ? 'text-legacy-foreground/80' : 'text-muted-foreground'}`}>
                        {option.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="text-legacy">
                      {benefit.icon}
                    </div>
                    <span>{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button variant="legacy" size="lg" className="w-full text-lg py-6" onClick={() => navigate('/donate')}>
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </Button>

              {/* Trust Note */}
              <p className="text-center text-sm text-muted-foreground mt-4">
                Your donation is secure and will be processed immediately. 
                You'll receive a receipt via email for tax purposes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DonationCTA;