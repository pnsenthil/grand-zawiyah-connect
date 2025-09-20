import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { HeartHandshake, HandCoins, UsersRound, Building2 } from "lucide-react";

const FeaturesSection = () => {
  const navigate = useNavigate();

  const helps = [
    {
      icon: <HandCoins className="h-6 w-6" />,
      title: "Monetary Donations",
      description: "Your financial support is a lifeline for our projects and initiatives.",
    },
    {
      icon: <HeartHandshake className="h-6 w-6" />,
      title: "Become a Donor Today",
      description: "Consider becoming a monthly donor to ensure ongoing support.",
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Corporate Cooperation",
      description: "We welcome partnerships with organizations that share our mission.",
    },
    {
      icon: <UsersRound className="h-6 w-6" />,
      title: "Volunteer Your Time",
      description: "If you're passionate about creating positive change directly.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">How could you help?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              At Grand Zawiyah, we believe that compassion and generosity create meaningful change. Your support enables our mission to bring lasting benefit to communities in need.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {helps.map((h, i) => (
            <Card key={i} className="rounded-2xl border border-foreground/10">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-xl border border-legacy/20 flex items-center justify-center">
                  <span className="text-legacy">{h.icon}</span>
                </div>
                <CardTitle className="text-xl mt-4">{h.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-base">{h.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="primary" size="lg" onClick={() => navigate('/donate')}>Donate Now</Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;