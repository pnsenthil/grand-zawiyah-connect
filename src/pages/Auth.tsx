import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthSuccess = () => {
    // Check if there's a redirect path in the location state
    const redirectTo = location.state?.redirectTo || '/dashboard';
    const paymentData = location.state?.paymentData;
    
    if (paymentData) {
      navigate(redirectTo, { state: paymentData });
    } else {
      navigate(redirectTo);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={handleGoBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>

          {/* Auth Forms */}
          {isSignUp ? (
            <SignUpForm
              onSwitchToSignIn={() => setIsSignUp(false)}
              onSuccess={handleAuthSuccess}
            />
          ) : (
            <SignInForm
              onSwitchToSignUp={() => setIsSignUp(true)}
              onSuccess={handleAuthSuccess}
            />
          )}

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              By signing in, you agree to our commitment to creating a safe and welcoming community
              for all members of the Grand Zawiyah family.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
