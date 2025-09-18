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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                Make a Difference Today
              </span>
            </div>
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

          {/* Donation Card */}
          <Card className="card-elegant border-0 shadow-elegant">
            <CardContent className="p-8 md:p-12">
              {/* Amount Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Choose Your Contribution</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {donationOptions.map((option, index) => (
                    <button
                      key={index}
                      className={`relative p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                        option.popular
                          ? 'border-primary bg-primary text-primary-foreground shadow-md'
                          : 'border-border bg-background hover:border-primary/50'
                      }`}
                    >
                      {option.popular && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <span className="text-xs font-medium bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full">
                            Popular
                          </span>
                        </div>
                      )}
                      <div className={`text-xl font-bold ${option.popular ? 'text-primary-foreground' : 'text-foreground'}`}>
                        {option.amount}
                      </div>
                      <div className={`text-sm ${option.popular ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                        {option.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Or enter a custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              {/* Donation Type */}
              <div className="mb-8">
                <div className="flex gap-4">
                  <button className="flex-1 p-3 rounded-lg border-2 border-primary bg-primary text-primary-foreground text-sm font-medium transition-all">
                    Monthly Donation
                  </button>
                  <button className="flex-1 p-3 rounded-lg border-2 border-border bg-background hover:border-primary/50 text-sm font-medium transition-all">
                    One-time Donation
                  </button>
                </div>
              </div>

              {/* Round-Up Feature */}
              <div id="roundup" className="mb-8 p-4 md:p-5 rounded-xl border border-primary/30 bg-primary/5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-foreground">Round‑Up Your Purchases</h4>
                    <p className="text-sm text-muted-foreground">Link your card to automatically round purchases to the next dollar and donate the change—set a monthly cap and track your impact.</p>
                  </div>
                  <Button variant="primary">Enable Round‑Up</Button>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="text-primary">
                      {benefit.icon}
                    </div>
                    <span>{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button variant="hero" size="lg" className="w-full text-lg py-6" onClick={() => navigate('/payments')}>
                <Heart className="mr-2 h-5 w-5" />
                Donate
              </Button>

              {/* Trust Note */}
              <p className="text-center text-sm text-muted-foreground mt-4">
                Your donation is secure and will be processed immediately. 
                You'll receive a receipt via email for tax purposes.
              </p>
            </CardContent>
          </Card>

          {/* Impact Preview */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-6">Your Impact in Numbers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="text-2xl font-bold text-primary mb-2">$50</div>
                <div className="text-sm text-muted-foreground">Provides 1 month of educational materials</div>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-legacy/10 to-legacy/5">
                <div className="text-2xl font-bold text-legacy mb-2">$100</div>
                <div className="text-sm text-muted-foreground">Supports 2 community events</div>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5">
                <div className="text-2xl font-bold text-secondary mb-2">$250</div>
                <div className="text-sm text-muted-foreground">Funds a scholarship opportunity</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationCTA;