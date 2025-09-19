import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Play, BookOpen, Crown, Clock, Users, Star, ArrowRight, Image as ImageIcon, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Premium = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleUpgrade = () => {
    navigate('/premium-pricing');
  };

  const handleSelectPlan = (plan: any) => {
    if (isAuthenticated) {
      navigate('/premium-payments', { state: { plan } });
    } else {
      navigate('/auth', { state: { redirectTo: '/premium-payments', paymentData: { plan } } });
    }
  };

  const premiumPlans = [
    {
      name: "Basic",
      price: "$9",
      period: "month",
      description: "Perfect for individuals starting their spiritual journey",
      features: [
        "Access to basic video content",
        "Monthly dhikr sessions",
        "Community forum access",
        "Basic learning resources"
      ],
      popular: false
    },
    {
      name: "Premium",
      price: "$19",
      period: "month",
      description: "Most popular choice for dedicated learners",
      features: [
        "Full video library access",
        "Weekly live sessions",
        "Personalized learning path",
        "Advanced study materials",
        "Priority community support",
        "Downloadable content"
      ],
      popular: true
    },
    {
      name: "Scholar",
      price: "$39",
      period: "month",
      description: "For serious students and teachers",
      features: [
        "Everything in Premium",
        "One-on-one mentorship",
        "Advanced certification programs",
        "Teaching resources",
        "Exclusive events access",
        "Custom study plans"
      ],
      popular: false
    }
  ];

  const sampleVideos = [
    {
      id: 1,
      title: "The Life and Legacy of Shaykh Hassan Cisse (RA)",
      description: "A comprehensive documentary exploring the spiritual journey and humanitarian work of our beloved Shaykh.",
      duration: "45:30",
      thumbnail: "/api/placeholder/400/225",
      views: "12.5K",
      rating: 4.9,
      isPremium: true
    },
    {
      id: 2,
      title: "Daily Wird Recitation with Translation",
      description: "Beautiful recitation of the Tijani wird with English translation and spiritual commentary.",
      duration: "25:15",
      thumbnail: "/api/placeholder/400/225",
      views: "8.2K",
      rating: 4.8,
      isPremium: true
    },
    {
      id: 3,
      title: "Understanding Islamic Finance Principles",
      description: "Learn about halal investment strategies and Islamic banking from renowned scholars.",
      duration: "38:45",
      thumbnail: "/api/placeholder/400/225",
      views: "15.1K",
      rating: 4.7,
      isPremium: true
    },
    {
      id: 4,
      title: "Spiritual Development in Modern Times",
      description: "Guidance on maintaining spiritual growth while navigating contemporary challenges.",
      duration: "32:20",
      thumbnail: "/api/placeholder/400/225",
      views: "9.8K",
      rating: 4.9,
      isPremium: true
    }
  ];

  const learningResources = [
    {
      title: "Tariqa Tijaniyya Foundations",
      description: "Comprehensive guide to the spiritual path and practices",
      image: "/api/placeholder/300/200",
      type: "Study Guide",
      pages: 120
    },
    {
      title: "Dhikr Collection",
      description: "Beautiful collection of remembrance practices and supplications",
      image: "/api/placeholder/300/200",
      type: "Audio Book",
      duration: "3 hours"
    },
    {
      title: "Islamic Art Gallery",
      description: "Inspiring collection of Islamic calligraphy and geometric patterns",
      image: "/api/placeholder/300/200",
      type: "Visual Gallery",
      items: 50
    }
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Premium</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Tariqa Content</h1>
            <p className="text-lg md:text-xl opacity-90">
              Deepen your spiritual journey with lessons, dhikr recordings, and lectures inspired by Shaykh Hassan Cisse's tradition.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Premium Plan
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Select the plan that best fits your spiritual learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {premiumPlans.map((plan, index) => (
              <Card key={index} className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                plan.popular ? 'ring-2 ring-primary scale-105' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/90'}`}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    {isAuthenticated ? 'Subscribe Now' : 'Get Started'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              All plans include a 7-day free trial. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Video Content Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Premium Video Content
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Exclusive video lectures, documentaries, and spiritual guidance from renowned scholars
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {sampleVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                        <Play className="h-8 w-8" />
                      </div>
                      <p className="text-sm font-medium">Premium Content</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-red-600 text-white">
                      <Lock className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      <Clock className="h-3 w-3 mr-1" />
                      {video.duration}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-foreground mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {video.views} views
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      {video.rating}
                    </div>
                  </div>
                  <Button 
                    variant="primary" 
                    className="w-full"
                    onClick={handleUpgrade}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Unlock with Membership
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Resources Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Premium Learning Resources
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive study materials, visual galleries, and interactive content
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {learningResources.map((resource, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <img 
                    src={resource.image} 
                    alt={resource.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-600 text-white">
                      <ImageIcon className="h-3 w-3 mr-1" />
                      {resource.type}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-foreground mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {resource.description}
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    {resource.pages && `${resource.pages} pages`}
                    {resource.duration && `Duration: ${resource.duration}`}
                    {resource.items && `${resource.items} items`}
                  </div>
                  <Button 
                    variant="primary" 
                    className="w-full"
                    onClick={handleUpgrade}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Unlock with Membership
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gated Sections */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 card-elegant">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Foundations of Tariqa</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Structured lessons with references and reflections.</p>
            <Button variant="primary" className="w-full" onClick={handleUpgrade}>
              <Lock className="h-4 w-4 mr-2" /> Unlock with Membership
            </Button>
          </Card>

          <Card className="p-6 card-elegant">
            <div className="flex items-center gap-3 mb-3">
              <Play className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Dhikr & Lectures</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Audio/video library for weekly practice and learning.</p>
            <Button variant="primary" className="w-full" onClick={handleUpgrade}>
              <Lock className="h-4 w-4 mr-2" /> Unlock with Membership
            </Button>
          </Card>

          <Card className="p-6 card-elegant">
            <div className="flex items-center gap-3 mb-3">
              <Crown className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Community Q&A</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Guidance from teachers and community moderators.</p>
            <Button variant="primary" className="w-full" onClick={handleUpgrade}>
              <Lock className="h-4 w-4 mr-2" /> Unlock with Membership
            </Button>
          </Card>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-6 md:p-8 card-elegant">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h3 className="text-xl font-semibold mb-2">Support the Mission • Access Premium</h3>
                <p className="text-muted-foreground">Become a member to sustain Sadaqah Jariyah and unlock exclusive teachings. Cancel anytime.</p>
              </div>
              <Button variant="hero" size="lg" onClick={handleUpgrade}>Become a Member</Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Premium;



