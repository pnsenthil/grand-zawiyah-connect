import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Heart, 
  BookOpen, 
  Globe, 
  Star,
  MessageSquare,
  Calendar,
  Briefcase,
  Home,
  GraduationCap,
  Handshake,
  TrendingUp,
  Award,
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Mail
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CommunityHub } from "@/components/community/CommunityHub";

const Community = () => {
  const navigate = useNavigate();

  const communityStats = [
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      number: "50,000+",
      label: "Active Members",
      description: "Muslims from around the world"
    },
    {
      icon: <Globe className="h-8 w-8 text-green-600" />,
      number: "120+",
      label: "Countries",
      description: "Global community presence"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-green-600" />,
      number: "1,000+",
      label: "Daily Discussions",
      description: "Active conversations"
    },
    {
      icon: <Heart className="h-8 w-8 text-green-600" />,
      number: "500+",
      label: "Volunteers",
      description: "Community service hours"
    }
  ];

  const communityFeatures = [
    {
      icon: <Users className="h-6 w-6 text-green-600" />,
      title: "Connect with Fellow Muslims",
      description: "Build meaningful relationships with Muslims from diverse backgrounds and cultures worldwide."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-green-600" />,
      title: "Share Knowledge & Resources",
      description: "Access educational content, job opportunities, housing, scholarships, and community resources."
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-green-600" />,
      title: "Engage in Discussions",
      description: "Participate in meaningful conversations about faith, community issues, and personal growth."
    },
    {
      icon: <Calendar className="h-6 w-6 text-green-600" />,
      title: "Join Events & Activities",
      description: "Attend virtual and local events, workshops, and community gatherings."
    },
    {
      icon: <Handshake className="h-6 w-6 text-green-600" />,
      title: "Support Each Other",
      description: "Offer and receive help, mentorship, and support from community members."
    },
    {
      icon: <Globe className="h-6 w-6 text-green-600" />,
      title: "Global Network",
      description: "Connect with Muslims worldwide and build an international support network."
    }
  ];

  const successStories = [
    {
      name: "Amina Hassan",
      location: "Toronto, Canada",
      story: "Through the community, I found my dream job at an Islamic fintech company and connected with amazing sisters who became my closest friends.",
      role: "Software Engineer",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Omar Al-Rashid",
      location: "London, UK",
      story: "The community helped me find halal housing near my workplace and introduced me to local Islamic scholars who guided my spiritual journey.",
      role: "Business Analyst",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Fatima Zahra",
      location: "New York, USA",
      story: "I received a scholarship through the community network and now volunteer to help other students find educational opportunities.",
      role: "Student & Volunteer",
      image: "/api/placeholder/80/80"
    }
  ];

  const upcomingEvents = [
    {
      title: "Weekly Virtual Halaqa",
      date: "Every Sunday, 7:00 PM EST",
      type: "Education",
      attendees: 150,
      description: "Join our weekly study circle focusing on Islamic jurisprudence and spiritual development."
    },
    {
      title: "Community Iftar Gathering",
      date: "March 20, 2024",
      type: "Social",
      attendees: 200,
      description: "Breaking fast together as one community with delicious food and meaningful conversations."
    },
    {
      title: "Islamic Finance Workshop",
      date: "March 25, 2024",
      type: "Education",
      attendees: 75,
      description: "Learn about halal investment strategies and Islamic banking principles."
    },
    {
      title: "Youth Leadership Summit",
      date: "April 5, 2024",
      type: "Leadership",
      attendees: 100,
      description: "Empowering young Muslims to become community leaders and change-makers."
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Education': return 'bg-blue-100 text-blue-800';
      case 'Social': return 'bg-green-100 text-green-800';
      case 'Leadership': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              <Users className="h-4 w-4 mr-2" />
              Global Community
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join Our{" "}
              <span className="text-green-600">Global Muslim Community</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Connect with Muslims worldwide, share resources, engage in meaningful discussions, 
              and support each other in our journey of faith and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => document.getElementById('community-hub')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Users className="h-5 w-5 mr-2" />
                Join Community
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
                onClick={() => navigate('/volunteer')}
              >
                <Heart className="h-5 w-5 mr-2" />
                Volunteer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
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

      {/* Community Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What You Can Do in Our Community
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover all the ways you can connect, learn, and grow with fellow Muslims
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Hub Component */}
      <section id="community-hub" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <CommunityHub />
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real stories from community members who found support, opportunities, and friendship
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{story.name}</h3>
                      <p className="text-sm text-muted-foreground">{story.role}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {story.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "{story.story}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Upcoming Community Events
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our regular events and special gatherings
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-foreground">{event.title}</h3>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.date}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        {event.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {event.attendees} attending
                        </div>
                        <Button variant="outline" size="sm">
                          RSVP
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Community Guidelines
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our shared values and principles that keep our community strong and welcoming
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Respect</h3>
                <p className="text-sm text-muted-foreground">
                  Treat all members with kindness and respect, regardless of background or beliefs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Share knowledge constructively and be open to learning from others.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Support</h3>
                <p className="text-sm text-muted-foreground">
                  Offer help when you can and seek support when you need it.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Excellence</h3>
                <p className="text-sm text-muted-foreground">
                  Strive for excellence in all your contributions to the community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Connect with Muslims worldwide, share resources, and grow together in faith and service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-green-50"
                onClick={() => document.getElementById('community-hub')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Users className="h-5 w-5 mr-2" />
                Join Community Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
                onClick={() => navigate('/about')}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Learn More
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Community;
