import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-community.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary">
      {/* Background with Islamic geometric pattern */}
      <div className="absolute inset-0 geometric-pattern opacity-30"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
              Transform Small Gifts into{" "}
              <span className="text-yellow-300">
                Lasting Sadaqah Jariyah
              </span>
            </h1>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-scale-in">
              <Button variant="legacy" size="lg" className="group" onClick={() => navigate('/donate')}>
                Donate
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg" className="bg-legacy/10 border-legacy/30 text-legacy hover:bg-legacy hover:text-legacy-foreground backdrop-blur-sm">
                <Play className="mr-2 h-4 w-4" />
                Watch Our Story
              </Button>
            </div>
          </div>
          
          {/* Image/Visual */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={heroImage} 
                alt="Islamic community center with diverse people engaging in charitable activities and learning" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm hover:bg-white/30 transition-colors cursor-pointer">
                    <Play className="h-8 w-8" />
                  </div>
                  <p className="text-sm opacity-90 font-medium">Watch Our Mission</p>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
      
      {/* Straight bottom - removed curves */}
    </section>
  );
};

export default HeroSection;