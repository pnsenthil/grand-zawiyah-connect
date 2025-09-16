import { useState } from "react";
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

interface DonationData {
  month: string;
  amount: number;
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
  const [selectedTab, setSelectedTab] = useState('overview');

  const totalDonated = mockDonationData.reduce((sum, data) => sum + data.amount, 0);
  const currentGoal = 2000;
  const goalProgress = (totalDonated / currentGoal) * 100;

  return (
    <div className="min-h-screen bg-background">
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
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="donations">Donations</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
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
                    <Button variant="primary" className="w-full">
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
                  <Button variant="primary" className="h-20 flex-col gap-2">
                    <Heart className="h-6 w-6" />
                    Make a Donation
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <BookOpen className="h-6 w-6" />
                    Continue Learning
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
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
                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <div>
                          <p className="font-medium">Monthly Recurring</p>
                          <p className="text-sm text-muted-foreground">General Fund</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$100</p>
                          <p className="text-sm text-muted-foreground">June 15, 2024</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <div>
                          <p className="font-medium">One-time Donation</p>
                          <p className="text-sm text-muted-foreground">Zawiyah Construction</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$250</p>
                          <p className="text-sm text-muted-foreground">May 28, 2024</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <Download className="h-4 w-4 mr-2" />
                      Download Tax Receipt
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
                  <Button variant="primary" className="w-full mt-4">
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
                      <Button variant="outline" size="sm">Register</Button>
                    </div>
                  </div>
                  <Button variant="primary" className="w-full mt-4">
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
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;