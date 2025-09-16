import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, BookOpen, Users, TrendingUp, Shield, Zap } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Seamless Donations",
      description: "Make one-time or recurring donations with multiple payment options. Track your impact and receive instant receipts.",
      highlight: "New: Round-up giving",
      color: "primary",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Tariqa Lessons",
      description: "Access exclusive Islamic educational content, video lectures, and spiritual guidance from renowned scholars.",
      highlight: "Premium content",
      color: "legacy",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Hub",
      description: "Connect with fellow Muslims, join events, volunteer opportunities, and build lasting relationships.",
      highlight: "Join 50K+ members",
      color: "secondary",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Impact Tracking",
      description: "Visualize your contribution impact with detailed analytics and progress reports on funded projects.",
      highlight: "Real-time updates",
      color: "primary",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Transparent",
      description: "Your donations are protected with bank-level security. Full transparency on how funds are utilized.",
      highlight: "100% secure",
      color: "legacy",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Quick Actions",
      description: "Fast donation flows, instant access to lessons, and streamlined community engagement features.",
      highlight: "3-second donations",
      color: "secondary",
    },
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case "primary":
        return "text-primary bg-primary/10 border-primary/20";
      case "legacy":
        return "text-legacy bg-legacy/10 border-legacy/20";
      case "secondary":
        return "text-secondary bg-secondary/10 border-secondary/20";
      default:
        return "text-primary bg-primary/10 border-primary/20";
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              Platform Features
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Spiritual Growth
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform combines charitable giving, Islamic education, 
            and community building in one beautifully designed experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="card-elegant group border-0 hover:border-border/50 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${getColorClass(feature.color)}`}>
                  {feature.icon}
                </div>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getColorClass(feature.color)}`}>
                    {feature.highlight}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-accent rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Begin Your Journey?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of Muslims worldwide who are already part of our growing community. 
              Start with a donation or explore our educational content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Make Your First Donation
              </Button>
              <Button variant="outline" size="lg">
                Explore Lessons
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;