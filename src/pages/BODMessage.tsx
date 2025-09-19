import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Quote,
  Users,
  Heart,
  BookOpen,
  Globe,
  Star,
  ArrowRight,
  Calendar,
  MapPin,
  Award,
  Handshake,
  Lightbulb
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const BODMessage = () => {
  const navigate = useNavigate();

  const boardMembers = [
    {
      name: "Dr. Amina Cisse",
      title: "Chairperson",
      role: "Daughter of Shaykh Hassan Cisse (RA)",
      image: "/api/placeholder/100/100",
      message: "Continuing my father's legacy of education and service is not just a duty, but a blessing. Through Grand Zawiyah Connect, we're bringing his vision of global Islamic unity into the digital age.",
      credentials: "Ph.D. in Islamic Studies, Harvard University"
    },
    {
      name: "Imam Abdullah Niasse",
      title: "Vice Chairperson",
      role: "Spiritual Leader",
      image: "/api/placeholder/100/100",
      message: "The teachings of our beloved Shaykh Hassan Cisse (RA) continue to guide us. This platform ensures that his wisdom reaches every corner of the world, touching hearts and transforming lives.",
      credentials: "Grandson of Shaykh Ibrahim Niasse (RA)"
    },
    {
      name: "Dr. Fatima Al-Zahra",
      title: "Education Director",
      role: "Academic Advisor",
      image: "/api/placeholder/100/100",
      message: "Education is the foundation of our community. Through this platform, we're making quality Islamic education accessible to all, regardless of location or circumstance.",
      credentials: "Professor of Islamic History, Al-Azhar University"
    }
  ];

  const keyInitiatives = [
    {
      icon: <BookOpen className="h-6 w-6 text-green-600" />,
      title: "Digital Education Platform",
      description: "Making Islamic education accessible worldwide through technology",
      impact: "10,000+ students reached"
    },
    {
      icon: <Heart className="h-6 w-6 text-green-600" />,
      title: "Global Charity Network",
      description: "Connecting donors with causes that matter most",
      impact: "$2M+ raised for community projects"
    },
    {
      icon: <Users className="h-6 w-6 text-green-600" />,
      title: "Community Building",
      description: "Fostering connections among Muslims worldwide",
      impact: "50,000+ community members"
    },
    {
      icon: <Globe className="h-6 w-6 text-green-600" />,
      title: "International Outreach",
      description: "Extending our mission to underserved communities globally",
      impact: "25+ countries served"
    }
  ];

  const values = [
    {
      icon: <Lightbulb className="h-6 w-6 text-green-600" />,
      title: "Innovation",
      description: "Embracing technology to serve traditional values"
    },
    {
      icon: <Handshake className="h-6 w-6 text-green-600" />,
      title: "Unity",
      description: "Bringing together Muslims from all backgrounds"
    },
    {
      icon: <Award className="h-6 w-6 text-green-600" />,
      title: "Excellence",
      description: "Maintaining the highest standards in all our programs"
    },
    {
      icon: <Heart className="h-6 w-6 text-green-600" />,
      title: "Service",
      description: "Putting the needs of our community first"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              <Quote className="h-4 w-4 mr-2" />
              Board of Directors
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              A Message from Our{" "}
              <span className="text-green-600">Board of Directors</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Honoring the legacy of Shaykh Hassan Cisse (RA) through dedicated leadership 
              and unwavering commitment to our community's growth and prosperity.
            </p>
          </div>
        </div>
      </section>

      {/* Main Message */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Quote className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
                  Our Commitment to You
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <div className="text-center mb-8">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    "In the name of Allah, the Most Gracious, the Most Merciful. As members of the Board of Directors 
                    of Grand Zawiyah Connect, we are deeply honored to serve this community and continue the noble 
                    mission of our beloved Shaykh Hassan Cisse (RA)."
                  </p>
                </div>

                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    Our beloved Shaykh Hassan Cisse (RA) dedicated his life to education, charity, and community service. 
                    He traveled the world, touching countless lives and spreading the beautiful teachings of Islam. 
                    Today, we carry forward his vision through Grand Zawiyah Connect, a platform that combines 
                    traditional Islamic values with modern technology.
                  </p>

                  <p>
                    We believe that in this digital age, we have a unique opportunity to reach Muslims worldwide, 
                    providing them with access to quality Islamic education, meaningful charitable opportunities, 
                    and a supportive community. Our platform is designed to honor the legacy of Shaykh Hassan Cisse (RA) 
                    while meeting the needs of today's global Muslim community.
                  </p>

                  <p>
                    As your Board of Directors, we are committed to transparency, accountability, and excellence in 
                    everything we do. We work tirelessly to ensure that your donations are used effectively, that 
                    our educational content maintains the highest standards, and that our community remains a 
                    welcoming space for all Muslims.
                  </p>

                  <p>
                    We invite you to join us in this journey of service and growth. Together, we can continue 
                    the beautiful legacy of Shaykh Hassan Cisse (RA) and make a lasting impact on our community 
                    and the world.
                  </p>

                  <div className="text-center mt-8 pt-6 border-t">
                    <p className="text-lg font-medium text-foreground">
                      "May Allah bless our efforts and guide us in serving His creation."
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      — The Board of Directors, Grand Zawiyah Connect
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Board Members */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Board Members
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dedicated leaders committed to continuing the legacy of Shaykh Hassan Cisse (RA)
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {boardMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="text-lg font-bold bg-green-100 text-green-800">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {member.name}
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">
                    {member.title}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {member.role}
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    {member.credentials}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                    <Quote className="h-5 w-5 text-green-600 mb-2" />
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "{member.message}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Initiatives */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Key Initiatives
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Strategic programs designed to maximize our impact and serve our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyInitiatives.map((initiative, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {initiative.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {initiative.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {initiative.description}
                  </p>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {initiative.impact}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide our decisions and actions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Us in Our Mission
            </h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Together, we can continue the beautiful legacy of Shaykh Hassan Cisse (RA) 
              and make a lasting impact on our community and the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-green-50"
                onClick={() => navigate('/payments')}
              >
                <Heart className="h-5 w-5 mr-2" />
                Support Our Mission
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
                onClick={() => navigate('/about')}
              >
                <Users className="h-5 w-5 mr-2" />
                Learn More About Us
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BODMessage;
