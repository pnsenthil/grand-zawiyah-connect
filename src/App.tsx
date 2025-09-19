import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { AuthProvider } from "@/contexts/AuthContext";
import { useSEO } from "@/hooks/useSEO";
import ErrorBoundary from "@/components/ErrorBoundary";
import ToastContainer from "@/components/ui/Toast";
import { LoadingSpinner } from "@/components/ui/LoadingStates";

// Lazy load heavy components for better performance
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Lessons = lazy(() => import("./pages/Lessons"));
const LessonDetail = lazy(() => import("./pages/LessonDetail"));
const Donate = lazy(() => import("./pages/Donate"));
const Premium = lazy(() => import("./pages/Premium"));
const Events = lazy(() => import("./pages/Events"));
const Auth = lazy(() => import("./pages/Auth"));
const Payments = lazy(() => import("./pages/Payments"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PremiumPricing = lazy(() => import("./pages/PremiumPricing"));
const About = lazy(() => import("./pages/About"));
const Volunteer = lazy(() => import("./pages/Volunteer"));
const BODMessage = lazy(() => import("./pages/BODMessage"));
const Community = lazy(() => import("./pages/Community"));
const PremiumPayments = lazy(() => import("./pages/PremiumPayments"));
const PremiumConfirmation = lazy(() => import("./pages/PremiumConfirmation"));
const PremiumSuccess = lazy(() => import("./pages/PremiumSuccess"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  // Initialize SEO for the app
  useSEO();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Sonner />
            <ToastContainer />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/auth" element={<ProtectedRoute requireAuth={false}><Auth /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
              <Route path="/lessons" element={<ProtectedRoute><Layout><Lessons /></Layout></ProtectedRoute>} />
              <Route path="/lessons/:id" element={<ProtectedRoute><Layout><LessonDetail /></Layout></ProtectedRoute>} />
              <Route path="/premium" element={<ProtectedRoute><Layout><Premium /></Layout></ProtectedRoute>} />
              <Route path="/donate" element={<Layout><Donate /></Layout>} />
              <Route path="/events" element={<Layout><Events /></Layout>} />
              <Route path="/payments" element={<Layout><Payments /></Layout>} />
              <Route path="/donate/success" element={<Layout><PaymentSuccess /></Layout>} />
              <Route path="/premium-pricing" element={<Layout><PremiumPricing /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/volunteer" element={<Layout><Volunteer /></Layout>} />
              <Route path="/bod-message" element={<Layout><BODMessage /></Layout>} />
              <Route path="/community" element={<Layout><Community /></Layout>} />
              <Route path="/premium-payments" element={<ProtectedRoute><Layout><PremiumPayments /></Layout></ProtectedRoute>} />
              <Route path="/premium-confirmation" element={<ProtectedRoute><Layout><PremiumConfirmation /></Layout></ProtectedRoute>} />
              <Route path="/premium-success" element={<ProtectedRoute><Layout><PremiumSuccess /></Layout></ProtectedRoute>} />
              <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </Suspense>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
