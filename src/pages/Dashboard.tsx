import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { 
  TrendingUp, 
  Heart, 
  Calendar, 
  BookOpen, 
  Target, 
  Users,
  DollarSign,
  Award,
  Clock,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProfile from "@/components/auth/UserProfile";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import DonationAuthModal from "@/components/ui/DonationAuthModal";
import { usePageTracking } from "@/hooks/useAnalytics";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingSpinner, ErrorDisplay, EmptyState, SkeletonCard, SkeletonList } from "@/components/ui/LoadingStates";
import { StateManager, withAsyncState } from "@/utils/stateManagement";
import DonationDetailsModal from "@/components/ui/DonationDetailsModal";
import EventRegistrationModal from "@/components/ui/EventRegistrationModal";
import RegistrationSuccessModal from "@/components/ui/RegistrationSuccessModal";

interface DonationData {
  month: string;
  amount: number;
}

interface Donation {
  id: string;
  userId: string;
  amount: number;
  date: string;
  campaign: string;
  receiptUrl: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod?: string;
  frequency?: 'one-time' | 'monthly' | 'yearly';
  impact?: {
    description: string;
    beneficiaries: number;
    category: string;
  };
  taxDeductible?: boolean;
  transactionId?: string;
  notes?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  earnedDate: string;
  icon: React.ReactNode;
}

const mockDonationData: DonationData[] = [
  { month: 'Jan', amount: 150 },
  { month: 'Feb', amount: 200 },
  { month: 'Mar', amount: 180 },
  { month: 'Apr', amount: 300 },
  { month: 'May', amount: 250 },
  { month: 'Jun', amount: 400 }
];

const mockDonations: Donation[] = [
  {
    id: 'd1',
    userId: 'u1',
    amount: 50,
    date: '2023-01-15',
    campaign: 'Education Fund',
    receiptUrl: '#',
    status: 'completed',
    paymentMethod: 'Credit Card ending in 4242',
    frequency: 'one-time',
    impact: {
      description: 'Your donation helped provide educational materials for 5 children in need.',
      beneficiaries: 5,
      category: 'Education'
    },
    taxDeductible: true,
    transactionId: 'txn_123456789',
    notes: 'Thank you for supporting education in our community.'
  },
  {
    id: 'd2',
    userId: 'u1',
    amount: 100,
    date: '2023-02-20',
    campaign: 'Community Outreach',
    receiptUrl: '#',
    status: 'completed',
    paymentMethod: 'Credit Card ending in 4242',
    frequency: 'monthly',
    impact: {
      description: 'Your monthly contribution supports ongoing community programs and services.',
      beneficiaries: 25,
      category: 'Community Development'
    },
    taxDeductible: true,
    transactionId: 'txn_987654321',
    notes: 'Monthly recurring donation for community outreach programs.'
  },
  {
    id: 'd3',
    userId: 'u1',
    amount: 25,
    date: '2023-03-10',
    campaign: 'Orphan Support',
    receiptUrl: '#',
    status: 'completed',
    paymentMethod: 'PayPal',
    frequency: 'one-time',
    impact: {
      description: 'Your donation provided essential supplies for orphaned children.',
      beneficiaries: 3,
      category: 'Orphan Care'
    },
    taxDeductible: true,
    transactionId: 'txn_456789123',
    notes: 'One-time donation for orphan support program.'
  },
  {
    id: 'd4',
    userId: 'u1',
    amount: 75,
    date: '2023-04-05',
    campaign: 'Education Fund',
    receiptUrl: '#',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
    frequency: 'one-time',
    impact: {
      description: 'Your contribution helped fund a new classroom for underprivileged students.',
      beneficiaries: 15,
      category: 'Education'
    },
    taxDeductible: true,
    transactionId: 'txn_789123456',
    notes: 'Donation for classroom construction project.'
  }
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Donation',
    description: 'Made your first contribution to the community',
    earnedDate: '2024-01-15',
    icon: <Heart className="h-5 w-5" />
  },
  {
    id: '2',
    title: 'Consistent Giver',
    description: 'Donated for 3 consecutive months',
    earnedDate: '2024-03-20',
    icon: <Target className="h-5 w-5" />
  },
  {
    id: '3',
    title: 'Scholar',
    description: 'Completed 10 lessons from the Tariqa',
    earnedDate: '2024-04-10',
    icon: <BookOpen className="h-5 w-5" />
  }
];

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend 
}: { 
  title: string; 
  value: string; 
  subtitle: string; 
  icon: React.ReactNode; 
  trend?: { value: string; positive: boolean };
}) => (
  <Card className="p-6 card-elegant">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
        {trend && (
          <div className={`flex items-center mt-2 text-sm ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="h-4 w-4 mr-1" />
            {trend.value}
          </div>
        )}
      </div>
      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
        <div className="text-primary-foreground">
          {icon}
        </div>
      </div>
    </div>
  </Card>
);

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedTab, setSelectedTab] = useState(searchParams.get('tab') || 'overview');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingDonation, setPendingDonation] = useState<any>(null);

  // Handle tab changes and URL updates
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    setSearchParams({ tab });
  };

  // Update tab from URL on mount
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && tabFromUrl !== selectedTab) {
      setSelectedTab(tabFromUrl);
    }
  }, [searchParams, selectedTab]);
  
  // Track page view
  usePageTracking('dashboard');

  // Simulate loading dashboard data
  useEffect(() => {
    // Remove artificial delay for better performance
    setIsLoading(false);
  }, []);

  const totalDonated = mockDonations.reduce((sum, donation) => sum + donation.amount, 0);
  const currentGoal = 2000;
  const goalProgress = (totalDonated / currentGoal) * 100;

  const handleLearnMore = (donation: Donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDonation(null);
  };

  const handleDownloadReceipt = (donation: Donation) => {
    // Generate receipt content
    const receiptContent = `
GRAND ZAWIYAH CONNECT
Donation Receipt

Receipt ID: ${donation.id}
Date: ${donation.date}
Amount: $${donation.amount.toFixed(2)}
Campaign: ${donation.campaign}
Payment Method: ${donation.paymentMethod}
Status: ${donation.status}

Thank you for your generous contribution to the Grand Zawiyah community.
Your donation helps support Islamic education and community programs.

This receipt is tax-deductible to the extent allowed by law.
Grand Zawiyah Connect is a registered non-profit organization.

For questions, contact: support@grandzawiyah.org
    `.trim();

    // Create and download receipt
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `donation-receipt-${donation.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('Receipt downloaded for donation:', donation.id);
  };

  const handleShare = (donation: Donation) => {
    // Create share content
    const shareText = `I just donated $${donation.amount} to ${donation.campaign} through Grand Zawiyah Connect! Join me in supporting Islamic education and community programs. #GrandZawiyah #SadaqahJariyah`;
    const shareUrl = window.location.origin;
    
    // Check if Web Share API is supported
    if (navigator.share) {
      navigator.share({
        title: 'My Donation to Grand Zawiyah',
        text: shareText,
        url: shareUrl
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      const shareContent = `${shareText}\n\n${shareUrl}`;
      navigator.clipboard.writeText(shareContent).then(() => {
        alert('Share content copied to clipboard!');
      }).catch(() => {
        // Final fallback: show share content
        alert(`Share this:\n\n${shareContent}`);
      });
    }
    
    console.log('Sharing donation:', donation.id);
  };

  const handleEventRegister = (eventData: any) => {
    setSelectedEvent(eventData);
    setIsRegistrationModalOpen(true);
  };

  const handleRegistrationConfirm = (data: any) => {
    setRegistrationData(data);
    setIsRegistrationModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleCloseRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
    setSelectedEvent(null);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setRegistrationData(null);
    setSelectedEvent(null);
  };

  if (isLoading) {
    return (
      <>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your donations, achievements, and spiritual journey
          </p>
        </div>

        {/* Loading State */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your donations, achievements, and spiritual journey
          </p>
        </div>

        {/* Error State */}
        <ErrorDisplay 
          error={error}
          title="Failed to load dashboard"
          onRetry={() => window.location.reload()}
        />
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome back, Ahmed
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Track your spiritual journey and community impact
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-base">
                <Award className="h-5 w-5 mr-2" />
                3 Achievements
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-base">
                <Clock className="h-5 w-5 mr-2" />
                Member since Jan 2024
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="donations">Donations</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Donated"
                  value={`$${totalDonated}`}
                  subtitle="This year"
                  icon={<DollarSign className="h-6 w-6" />}
                  trend={{ value: "+23% from last month", positive: true }}
                />
                <StatCard
                  title="Lessons Completed"
                  value="12"
                  subtitle="In progress: 3"
                  icon={<BookOpen className="h-6 w-6" />}
                />
                <StatCard
                  title="Events Attended"
                  value="8"
                  subtitle="Next: Tomorrow"
                  icon={<Calendar className="h-6 w-6" />}
                />
                <StatCard
                  title="Community Rank"
                  value="#47"
                  subtitle="Top contributor"
                  icon={<Users className="h-6 w-6" />}
                  trend={{ value: "+5 positions", positive: true }}
                />
              </div>

              {/* Personal Goals */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Annual Donation Goal</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">${totalDonated} / ${currentGoal}</span>
                    </div>
                    <Progress value={goalProgress} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      {goalProgress.toFixed(1)}% complete • ${currentGoal - totalDonated} remaining
                    </p>
                    <Button variant="primary" className="w-full" onClick={() => navigate('/payments')}>
                      Make a Donation
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Recent Achievements</h3>
                  <div className="space-y-4">
                    {mockAchievements.slice(0, 3).map(achievement => (
                      <div key={achievement.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <div className="text-primary-foreground">
                            {achievement.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      View All Achievements
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="primary" className="h-20 flex-col gap-2" onClick={() => navigate('/payments')}>
                    <Heart className="h-6 w-6" />
                    Make a Donation
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/lessons')}>
                    <BookOpen className="h-6 w-6" />
                    Continue Learning
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/events')}>
                    <Calendar className="h-6 w-6" />
                    Browse Events
                  </Button>
                </div>
              </Card>
            </TabsContent>

            {/* Donations Tab */}
            <TabsContent value="donations" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Donation History</h3>
                    <div className="space-y-4">
                      {mockDonations.map((donation) => (
                        <div key={donation.id} className="flex justify-between items-center py-3 border-b border-border">
                          <div className="flex-1">
                            <p className="font-medium">{donation.campaign}</p>
                            <p className="text-sm text-muted-foreground">
                              {donation.frequency === 'monthly' ? 'Monthly Recurring' : 'One-time Donation'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(donation.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${donation.amount}</p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleLearnMore(donation)}
                              className="mt-1"
                            >
                              Learn More
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <Download className="h-4 w-4 mr-2" />
                      Download All Tax Receipts
                    </Button>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Impact Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Lifetime</span>
                        <span className="font-medium">$2,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">This Year</span>
                        <span className="font-medium">$1,180</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Recurring</span>
                        <span className="font-medium">$100/month</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-accent">
                    <h3 className="text-lg font-semibold mb-2">Your Impact</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your donations have helped fund 3 community programs and supported 12 families.
                    </p>
                    <Button variant="primary" size="sm" className="w-full">
                      View Impact Report
                    </Button>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Learning Tab */}
            <TabsContent value="learning" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Learning Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Tariqa Foundations</span>
                        <span className="text-sm text-muted-foreground">8/10 lessons</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Islamic Finance</span>
                        <span className="text-sm text-muted-foreground">3/6 lessons</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Community Leadership</span>
                        <span className="text-sm text-muted-foreground">1/8 lessons</span>
                      </div>
                      <Progress value={12.5} className="h-2" />
                    </div>
                  </div>
                  <Button variant="primary" className="w-full mt-4" onClick={() => navigate('/lessons')}>
                    Continue Learning
                  </Button>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Certificates Earned</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Award className="h-8 w-8 text-yellow-500" />
                      <div>
                        <p className="font-medium">Introduction to Tariqa</p>
                        <p className="text-sm text-muted-foreground">Completed March 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-8 w-8 text-yellow-500" />
                      <div>
                        <p className="font-medium">Islamic History</p>
                        <p className="text-sm text-muted-foreground">Completed February 2024</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificates
                  </Button>
                </Card>
              </div>
            </TabsContent>

            {/* Community Tab */}
            <TabsContent value="community" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <div>
                        <p className="font-medium">Weekly Dhikr Circle</p>
                        <p className="text-sm text-muted-foreground">Tomorrow, 7:00 PM</p>
                      </div>
                      <Badge>Registered</Badge>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <div>
                        <p className="font-medium">Islamic Finance Workshop</p>
                        <p className="text-sm text-muted-foreground">Sept 25, 2:00 PM</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEventRegister({
                          id: 'islamic-finance-workshop',
                          title: 'Islamic Finance Workshop',
                          description: 'Learn about Islamic banking principles and Sharia-compliant investments',
                          date: '2024-09-25',
                          time: '14:00',
                          location: 'Grand Zawiyah Conference Room',
                          type: 'workshop',
                          organizer: 'Shaykh Abdullah',
                          isFree: true
                        })}
                      >
                        Register
                      </Button>
                    </div>
                  </div>
                  <Button variant="primary" className="w-full mt-4" onClick={() => navigate('/events')}>
                    Browse All Events
                  </Button>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Community Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Events Attended</span>
                      <span className="font-medium">8 events</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Volunteer Hours</span>
                      <span className="font-medium">24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Community Rank</span>
                      <span className="font-medium">#47 of 1,200</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-8">
              <AnalyticsDashboard />
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-8">
              <UserProfile />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Donation Details Modal */}
      <DonationDetailsModal
        donation={selectedDonation}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDownloadReceipt={handleDownloadReceipt}
        onShare={handleShare}
      />

      {/* Event Registration Modal */}
      <EventRegistrationModal
        event={selectedEvent}
        isOpen={isRegistrationModalOpen}
        onClose={handleCloseRegistrationModal}
        onConfirm={handleRegistrationConfirm}
      />

      {/* Registration Success Modal */}
      <RegistrationSuccessModal
        event={selectedEvent}
        registrationData={registrationData}
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        onDownloadConfirmation={() => console.log('Confirmation downloaded')}
      />
    </>
  );
};

export default Dashboard;