import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">GZ</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Grand Zawiyah</h3>
                <p className="text-sm text-muted-foreground">In honor of Shaykh Hassan Cisse (RA)</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              A comprehensive platform for Islamic education, community building, and charitable giving. 
              Join us in preserving the legacy of spiritual learning and community service.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-legacy focus-visible:outline-offset-2"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-legacy focus-visible:outline-offset-2"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-legacy focus-visible:outline-offset-2"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-legacy focus-visible:outline-offset-2"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Mission & Vision", href: "/about#mission" },
                { label: "History & Lineage", href: "/about#history" },
                { label: "Community Events", href: "/community" },
                { label: "Volunteer", href: "/volunteer" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">info@grandzawiyah.org</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="text-sm font-medium">123 Community Center<br />Islamic District, NY 10001</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4 md:mb-0">
              <span>© {currentYear} Grand Zawiyah Foundation. All rights reserved.</span>
              <Heart className="h-4 w-4 text-primary" />
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="/transparency" className="text-muted-foreground hover:text-primary transition-colors">
                Financial Transparency
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;