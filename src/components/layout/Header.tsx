import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuth();

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Premium", href: "/lessons" },
    { label: "Round‑Up", href: "/roundup" },
    { label: "Donate", href: "/donate" },
    { label: "Events", href: "/events" },
    { label: "Payments", href: "/payments" },
  ];

  return (
    <header 
      className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">GZ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Grand Zawiyah</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Growth & Legacy through Sadaqah Jariyah</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href === "/" && location.pathname === "/") ||
                (item.href !== "/" && location.pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-sm font-medium transition-all duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-legacy focus-visible:outline-offset-2 ${
                    isActive 
                      ? "text-legacy-dark font-bold text-base underline decoration-2 underline-offset-4" 
                      : "text-legacy hover:text-legacy-dark"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button & User Menu & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/dashboard?tab=profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/dashboard?tab=profile')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="primary" 
                size="sm" 
                className="hidden sm:inline-flex"
                onClick={() => navigate('/auth')}
              >
                Sign In
              </Button>
            )}
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden py-4 border-t border-border animate-fade-in"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href === "/" && location.pathname === "/") ||
                  (item.href !== "/" && location.pathname.startsWith(item.href));
                
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`text-base font-medium transition-colors px-3 py-2 rounded-md hover:bg-accent focus-visible:outline-2 focus-visible:outline-legacy focus-visible:outline-offset-2 ${
                      isActive 
                        ? "text-legacy-dark font-bold bg-legacy/10 border-l-4 border-legacy" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-3 px-3">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>
                          {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="primary" 
                    className="w-full"
                    onClick={() => {
                      navigate('/auth');
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
      
      {/* Breadcrumbs */}
      <div className="border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <Breadcrumbs />
        </div>
      </div>
    </header>
  );
};

export default Header;