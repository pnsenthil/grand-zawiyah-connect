import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Play, BookOpen, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Premium = () => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate('/premium-pricing');
  };

  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Premium</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Tariqa Content</h1>
            <p className="text-lg md:text-xl opacity-90">
              Deepen your spiritual journey with lessons, dhikr recordings, and lectures inspired by Shaykh Hassan Cisse’s tradition.
            </p>
          </div>
        </div>
      </section>

      {/* Gated Sections */}
      <section className="py-16">
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



