import { useEffect, useState } from "react";
import { Users, Heart, Globe, BookOpen } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
}

const StatCard = ({ icon, value, label, delay = 0 }: StatCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`text-center transform transition-all duration-700 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`}>
      <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-elegant">
        <div className="text-primary-foreground">
          {icon}
        </div>
      </div>
      <div className="counter-animate">
        <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{value}</div>
        <div className="text-muted-foreground font-medium">{label}</div>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      icon: <Heart className="h-8 w-8" />,
      value: "450+",
      label: "Events Completed",
      delay: 100,
    },
    {
      icon: <Globe className="h-8 w-8" />,
      value: "34+",
      label: "Countries Reached",
      delay: 200,
    },
    {
      icon: <Users className="h-8 w-8" />,
      value: "24K+",
      label: "Community Members",
      delay: 300,
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      value: "1000+",
      label: "Lessons Shared",
      delay: 400,
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Global Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Through the grace of Allah, we continue to grow and serve the ummah worldwide, 
            following the teachings and legacy of our beloved scholars.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              delay={stat.delay}
            />
          ))}
        </div>
        
        {/* Decorative Islamic pattern */}
        <div className="mt-16 flex justify-center">
          <div className="w-32 h-1 bg-legacy rounded-full opacity-60"></div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;