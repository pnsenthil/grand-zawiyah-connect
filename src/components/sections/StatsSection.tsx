import { useEffect, useState } from "react";
import { Users, Heart, Globe, BookOpen, TrendingUp, Award, Target, GraduationCap, Cross, Home } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`transform transition-all duration-700 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`}>
      <div className="bg-legacy rounded-lg border border-legacy-dark/30 p-6 hover:bg-legacy-dark transition-all duration-300">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0">
            <div className="text-white">
              {icon}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-white/90 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const features = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Education for All",
      description: "Grand Zawiyah is dedicated to ensuring that every seeker has access to authentic Islamic knowledge and spiritual guidance.",
      delay: 100,
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Community Wellness",
      description: "Our strong commitment to spiritual and community wellness extends across global borders, nurturing hearts and minds.",
      delay: 200,
    },
    {
      icon: <Home className="h-6 w-6" />,
      title: "Crisis Support",
      description: "In times of need, Grand Zawiyah responds swiftly to provide spiritual guidance, community support, and charitable relief.",
      delay: 300,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Left Column - Mission Statement and Feature Cards */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                The mission of our organization
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                At Grand Zawiyah, we prioritize transparency, integrity, and inclusivity. These values guide our actions as we work tirelessly to bridge the gap between seekers of knowledge and authentic Islamic teachings.
              </p>
            </div>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={feature.delay}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Supporting Image */}
          <div className="relative h-full">
            <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/donation.png"
                alt="Hands placing items into a donation box"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              {/* Overlay content */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground font-semibold">Support Our Mission</p>
                      <p className="text-muted-foreground text-sm">Your sadaqah impacts lives</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;