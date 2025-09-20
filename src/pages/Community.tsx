import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Heart, 
  MessageSquare,
  TrendingUp,
  Award,
  ArrowRight,
  MapPin,
  Clock,
  Star,
  ThumbsUp,
  Reply,
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const navigate = useNavigate();

  const communityStats = [
    {
      icon: <Users className="h-8 w-8 text-legacy" />,
      number: "50,000+",
      label: "Active Members",
      description: "Muslims from around the world"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-legacy" />,
      number: "1,000+",
      label: "Daily Discussions",
      description: "Active conversations"
    },
    {
      icon: <Heart className="h-8 w-8 text-legacy" />,
      number: "500+",
      label: "Volunteers",
      description: "Community service hours"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-legacy" />,
      number: "95%",
      label: "Satisfaction Rate",
      description: "Member satisfaction"
    }
  ];

  const topMembers = [
    {
      name: "Amina Hassan",
      role: "Community Moderator",
      location: "Toronto, Canada",
      contributions: 1250,
      avatar: "/api/placeholder/60/60",
      badges: ["Top Contributor", "Mentor"]
    },
    {
      name: "Omar Al-Rashid",
      role: "Knowledge Expert",
      location: "London, UK",
      contributions: 980,
      avatar: "/api/placeholder/60/60",
      badges: ["Scholar", "Helper"]
    },
    {
      name: "Fatima Zahra",
      role: "Community Leader",
      location: "New York, USA",
      contributions: 1150,
      avatar: "/api/placeholder/60/60",
      badges: ["Leader", "Volunteer"]
    },
    {
      name: "Ahmed Ibrahim",
      role: "Tech Support",
      location: "Dubai, UAE",
      contributions: 890,
      avatar: "/api/placeholder/60/60",
      badges: ["Expert", "Helper"]
    }
  ];

  const discussions = [
    {
      id: 1,
      title: "How to maintain consistent prayer during busy work schedule?",
      author: "Sarah M.",
      authorRole: "Community Member",
      timeAgo: "2 hours ago",
      category: "Spiritual Growth",
      replies: 24,
      likes: 18,
      isPinned: true,
      tags: ["prayer", "work-life", "spirituality"]
    },
    {
      id: 2,
      title: "Best practices for teaching children about Islamic values",
      author: "Amina K.",
      authorRole: "Parent & Educator",
      timeAgo: "4 hours ago",
      category: "Family & Parenting",
      replies: 31,
      likes: 42,
      isPinned: false,
      tags: ["children", "education", "values"]
    },
    {
      id: 3,
      title: "Halal investment opportunities in 2024",
      author: "Omar R.",
      authorRole: "Financial Advisor",
      timeAgo: "6 hours ago",
      category: "Finance & Business",
      replies: 15,
      likes: 28,
      isPinned: false,
      tags: ["investment", "halal", "finance"]
    },
    {
      id: 4,
      title: "Community iftar planning for Ramadan 2024",
      author: "Community Team",
      authorRole: "Event Organizer",
      timeAgo: "1 day ago",
      category: "Community Events",
      replies: 45,
      likes: 67,
      isPinned: true,
      tags: ["ramadan", "iftar", "community"]
    },
    {
      id: 5,
      title: "Experiences with online Islamic courses",
      author: "Fatima A.",
      authorRole: "Student",
      timeAgo: "2 days ago",
      category: "Education",
      replies: 12,
      likes: 19,
      isPinned: false,
      tags: ["online-learning", "courses", "education"]
    },
    {
      id: 6,
      title: "Mental health and spiritual well-being",
      author: "Dr. Hassan M.",
      authorRole: "Counselor",
      timeAgo: "3 days ago",
      category: "Health & Wellness",
      replies: 38,
      likes: 52,
      isPinned: false,
      tags: ["mental-health", "wellness", "spirituality"]
    }
  ];

  const categories = [
    "All Discussions",
    "Spiritual Growth",
    "Family & Parenting", 
    "Finance & Business",
    "Community Events",
    "Education",
    "Health & Wellness",
    "General"
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Spiritual Growth': return 'bg-legacy/10 text-legacy border border-legacy/20';
      case 'Family & Parenting': return 'bg-pink-100 text-pink-800';
      case 'Finance & Business': return 'bg-green-100 text-green-800';
      case 'Community Events': return 'bg-orange-100 text-orange-800';
      case 'Education': return 'bg-blue-100 text-blue-800';
      case 'Health & Wellness': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-legacy/5 to-legacy/10">
        {/* Background Image */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #6C086F 0%, #4A0E4D 100%)',
            backgroundImage: 'url("https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="African Muslim community gathering for prayer and discussion"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Hide image if it fails to load, background will show
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-legacy/20 text-legacy border border-legacy/30 backdrop-blur-sm">
              <Users className="h-4 w-4 mr-2" />
              Global Community
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Join Our{" "}
              <span className="text-yellow-300">Community Discussions</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Connect with Muslims worldwide, share knowledge, ask questions, 
              and engage in meaningful conversations about faith, life, and community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-legacy hover:bg-legacy/90 text-white"
                onClick={() => document.getElementById('discussions')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Start Discussion
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-legacy bg-transparent"
                onClick={() => navigate('/events')}
              >
                <Calendar className="h-5 w-5 mr-2" />
                View Events
              </Button>
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-legacy/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-legacy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">{stat.number}</h3>
                <p className="text-lg font-semibold text-foreground mb-1">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Discussions */}
          <div className="lg:col-span-3">
            <div id="discussions" className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-foreground">Community Discussions</h2>
                <Button variant="legacy">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  New Discussion
                </Button>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <Badge 
                    key={category}
                    variant="outline" 
                    className="cursor-pointer hover:bg-legacy/10 hover:text-legacy"
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Discussions List */}
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-legacy/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="h-5 w-5 text-legacy" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-foreground mb-1">
                                {discussion.title}
                                {discussion.isPinned && (
                                  <Badge variant="secondary" className="ml-2">Pinned</Badge>
                                )}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                <span>By {discussion.author} • {discussion.authorRole}</span>
                                <span>•</span>
                                <span>{discussion.timeAgo}</span>
                              </div>
                            </div>
                            <Badge className={getCategoryColor(discussion.category)}>
                              {discussion.category}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Reply className="h-4 w-4" />
                              {discussion.replies} replies
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              {discussion.likes} likes
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {discussion.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Top Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-legacy" />
                  Top Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-legacy/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-legacy" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{member.name}</h4>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs text-muted-foreground">{member.contributions} contributions</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start Discussion
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Find Members
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Events
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Volunteer
                </Button>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Heart className="h-4 w-4 text-legacy mt-0.5" />
                    <span>Be respectful and kind to all members</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 text-legacy mt-0.5" />
                    <span>Share knowledge constructively</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-legacy mt-0.5" />
                    <span>Support and help each other</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="h-4 w-4 text-legacy mt-0.5" />
                    <span>Strive for excellence in contributions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;