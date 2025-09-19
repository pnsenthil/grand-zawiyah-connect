import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Users, 
  BookOpen, 
  Globe, 
  Star, 
  Award,
  Target,
  Eye,
  History,
  Building,
  Handshake,
  GraduationCap,
  MapPin,
  Calendar,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const missionVision = [
    {
      icon: <Target className="h-8 w-8 text-green-600" />,
      title: "Our Mission",
      content: "To preserve and share the spiritual legacy of Shaykh Hassan Cisse (RA) through educational programs, charitable initiatives, and community building that fosters Islamic values and humanitarian service worldwide.",
      highlight: "Preserving Legacy"
    },
    {
      icon: <Eye className="h-8 w-8 text-green-600" />,
      title: "Our Vision",
      content: "A global community where Islamic education, spiritual growth, and charitable giving unite to create lasting positive impact, honoring the teachings and humanitarian work of Shaykh Hassan Cisse (RA).",
      highlight: "Global Impact"
    }
  ];

  const history = [
    {
      year: "1945",
      title: "Birth of Shaykh Hassan Cisse (RA)",
      description: "Born in Kaolack, Senegal, into the distinguished Cisse family, known for their spiritual leadership and Islamic scholarship."
    },
    {
      year: "1960s-70s",
      title: "Early Education & Spiritual Journey",
      description: "Studied under his grandfather, Shaykh Ibrahim Niasse (RA), and became a prominent scholar and spiritual leader in the Tijaniyya tradition."
    },
    {
      year: "1980s",
      title: "Global Outreach Begins",
      description: "Established the African American Islamic Institute and began extensive travels to spread Islamic education and humanitarian work across Africa and the Americas."
    },
    {
      year: "1990s-2000s",
      title: "Educational & Humanitarian Expansion",
      description: "Founded numerous schools, clinics, and community centers, while continuing to guide thousands of Muslims worldwide in their spiritual journey."
    },
    {
      year: "2008",
      title: "Passing of Shaykh Hassan Cisse (RA)",
      description: "After decades of service, Shaykh Hassan Cisse (RA) passed away, leaving behind a legacy of education, charity, and spiritual guidance."
    },
    {
      year: "Present",
      title: "Grand Zawiyah Connect",
      description: "Continuing his legacy through modern technology, connecting Muslims worldwide for education, charity, and community building."
    }
  ];

  const orgChart = [
    {
      title: "Medina by Nasrul Ilm",
      description: "Educational foundation focused on Islamic learning and spiritual development",
      role: "Educational Partner",
      icon: <GraduationCap className="h-6 w-6 text-green-600" />
    },
    {
      title: "African-American Islamic Institute",
      description: "Community organization serving African-American Muslims with education and social services",
      role: "Community Partner",
      icon: <Users className="h-6 w-6 text-green-600" />
    },
    {
      title: "Feeding Programs",
      description: "Food security initiatives providing meals to families in need across multiple communities",
      role: "Humanitarian Partner",
      icon: <Heart className="h-6 w-6 text-green-600" />
    },
    {
      title: "Donation Runs",
      description: "Charitable campaigns supporting various causes from education to healthcare",
      role: "Fundraising Partner",
      icon: <Handshake className="h-6 w-6 text-green-600" />
    }
  ];

  const values = [
    {
      icon: <BookOpen className="h-6 w-6 text-green-600" />,
      title: "Education",
      description: "Committed to providing quality Islamic education and spiritual guidance"
    },
    {
      icon: <Heart className="h-6 w-6 text-green-600" />,
      title: "Service",
      description: "Dedicated to serving humanity through charitable works and community support"
    },
    {
      icon: <Users className="h-6 w-6 text-green-600" />,
      title: "Community",
      description: "Building strong, supportive communities that foster spiritual growth"
    },
    {
      icon: <Globe className="h-6 w-6 text-green-600" />,
      title: "Unity",
      description: "Promoting unity among Muslims worldwide regardless of background or location"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              <History className="h-4 w-4 mr-2" />
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Honoring the Legacy of{" "}
              <span className="text-green-600">Shaykh Hassan Cisse (RA)</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Grand Zawiyah Connect continues the noble mission of our beloved Shaykh, 
              combining traditional Islamic values with modern technology to serve the global Muslim community.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mission & Vision
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Guided by the teachings and example of Shaykh Hassan Cisse (RA)
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {missionVision.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground mb-2">
                    {item.title}
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">
                    {item.highlight}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-center">
                    {item.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our History
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The lineage of Baye Niasse (RA) and the journey of Shaykh Hassan Cisse (RA)
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 w-0.5 h-full bg-green-200"></div>
            
            <div className="space-y-12">
              {history.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-600 rounded-full border-4 border-background z-10"></div>
                  
                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <Calendar className="h-3 w-3 mr-1" />
                            {item.year}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organizational Chart */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Network
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Intersectionality with key organizations and initiatives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {orgChart.map((org, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    {org.icon}
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground">
                    {org.title}
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">
                    {org.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {org.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Be part of continuing the legacy of Shaykh Hassan Cisse (RA) through 
              education, charity, and community building.
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
                onClick={() => navigate('/lessons')}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Explore Education
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
