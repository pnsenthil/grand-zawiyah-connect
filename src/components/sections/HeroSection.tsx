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
      <div className="absolute inset-0 hero-gradient opacity-95"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-block mb-4">
              <span className="text-sm font-medium text-primary-foreground/80 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                In Honor of Shaykh Hassan Cisse (RA)
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
              Transform Small Gifts into{" "}
              <span className="text-yellow-300">
                Lasting Sadaqah Jariyah
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl animate-slide-up">
              Unite worship, learning, and service inspired by Shaykh Hassan Cisse’s vision. 
              Enable secure giving, track your impact, and access exclusive Tariqa content—all in one place.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-scale-in">
              <Button variant="hero" size="lg" className="group" onClick={() => navigate('/payments')}>
                Donate
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                <Play className="mr-2 h-4 w-4" />
                Watch Our Story
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm text-primary-foreground/70 mb-3">Trusted by the global Muslim community</p>
              <div className="flex items-center justify-center lg:justify-start gap-6 text-primary-foreground/80">
                <div className="text-center">
                  <div className="font-bold text-lg">50K+</div>
                  <div className="text-xs">Donors</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">$2M+</div>
                  <div className="text-xs">Raised</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">100+</div>
                  <div className="text-xs">Countries</div>
                </div>
              </div>
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
      
      {/* Bottom wave with enhanced curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L50 110C100 100 200 80 300 70C400 60 500 60 600 65C700 70 800 80 900 85C1000 90 1100 90 1150 90L1200 90V120H1150C1100 120 1000 120 900 120C800 120 700 120 600 120C500 120 400 120 300 120C200 120 100 120 50 120H0Z" fill="currentColor" className="text-background"/>
        </svg>
      </div>
      
      {/* Additional curve layer for smoother transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 80L50 75C100 70 200 60 300 55C400 50 500 50 600 52.5C700 55 800 60 900 62.5C1000 65 1100 65 1150 65L1200 65V80H1150C1100 80 1000 80 900 80C800 80 700 80 600 80C500 80 400 80 300 80C200 80 100 80 50 80H0Z" fill="currentColor" className="text-background opacity-80"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;