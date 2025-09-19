import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Star,
  Users,
  BookOpen,
  Crown,
  Download,
  Share2,
  ArrowRight,
  Sparkles
} from "lucide-react";

const PremiumSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState(location.state?.plan || null);

  useEffect(() => {
    // If no plan is selected, redirect to premium page
    if (!selectedPlan) {
      navigate('/premium');
    }
  }, [selectedPlan, navigate]);

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const handleExploreContent = () => {
    navigate('/lessons');
  };

  const handleDownloadReceipt = () => {
    // Generate and download receipt
    const receiptData = {
      plan: selectedPlan.name,
      amount: selectedPlan.price,
      date: new Date().toLocaleDateString(),
      transactionId: `TXN-${Date.now()}`
    };

    const receiptContent = `
Grand Zawiyah - Premium Subscription Receipt

Plan: ${receiptData.plan}
Amount: ${receiptData.amount}
Date: ${receiptData.date}
Transaction ID: ${receiptData.transactionId}

Thank you for your support!
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `premium-subscription-receipt-${receiptData.transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Grand Zawiyah Premium',
      text: `I just upgraded to ${selectedPlan.name} Premium on Grand Zawiyah! Join me in supporting Islamic education and community.`,
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.log('Error copying to clipboard:', err);
      }
    }
  };

  if (!selectedPlan) {
    return null;
  }

  const getPlanIcon = (planName: string) => {
    switch (planName) {
      case "Basic":
        return <BookOpen className="h-8 w-8" />;
      case "Premium":
        return <Star className="h-8 w-8" />;
      case "Scholar":
        return <Crown className="h-8 w-8" />;
      default:
        return <BookOpen className="h-8 w-8" />;
    }
  };

  const getWelcomeMessage = (planName: string) => {
    switch (planName) {
      case "Basic":
        return "Welcome to your spiritual learning journey!";
      case "Premium":
        return "Welcome to the premium community of learners!";
      case "Scholar":
        return "Welcome to our elite scholar community!";
      default:
        return "Welcome to Grand Zawiyah Premium!";
    }
  };

  const getNextSteps = (planName: string) => {
    switch (planName) {
      case "Basic":
        return [
          "Explore basic video content",
          "Join monthly dhikr sessions",
          "Connect with the community forum",
          "Access learning resources"
        ];
      case "Premium":
        return [
          "Access full video library",
          "Join weekly live sessions",
          "Get personalized learning path",
          "Download study materials"
        ];
      case "Scholar":
        return [
          "Schedule one-on-one mentorship",
          "Access certification programs",
          "Join exclusive events",
          "Create custom study plans"
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Subscription Successful!
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {getWelcomeMessage(selectedPlan.name)}
          </p>
          <Badge className="bg-primary text-primary-foreground text-lg px-6 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            {selectedPlan.name} Member
          </Badge>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Subscription Details */}
          <Card className="border-2 border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  {getPlanIcon(selectedPlan.name)}
                </div>
                Your {selectedPlan.name} Subscription
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-4 bg-white rounded-lg">
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {selectedPlan.price}
                  </div>
                  <div className="text-muted-foreground">
                    per {selectedPlan.period}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction ID:</span>
                    <span className="font-mono text-sm">TXN-{Date.now()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Purchase Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Billing:</span>
                    <span>
                      {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                What's Next?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  Your premium subscription is now active! Here's what you can do:
                </p>
                
                <ul className="space-y-3">
                  {getNextSteps(selectedPlan.name).map((step, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    You can manage your subscription, access all content, and track your learning progress from your dashboard.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="max-w-2xl mx-auto mt-12">
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <Button
              onClick={handleGoToDashboard}
              className="w-full"
              size="lg"
            >
              <Users className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Button>
            
            <Button
              onClick={handleExploreContent}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Explore Premium Content
            </Button>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              onClick={handleDownloadReceipt}
              variant="ghost"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            
            <Button
              onClick={handleShare}
              variant="ghost"
              size="sm"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Welcome to the Grand Zawiyah Community!
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Thank you for supporting our mission to preserve and share the beautiful teachings of Shaykh Hassan Cisse (RA). 
                Your subscription helps us continue providing quality Islamic education and building a stronger community.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Join 50,000+ members worldwide</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PremiumSuccess;
