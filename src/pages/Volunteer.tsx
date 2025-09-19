import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Users, 
  Heart, 
  BookOpen, 
  Globe, 
  Clock, 
  MapPin, 
  Calendar,
  Mail,
  Phone,
  User,
  Briefcase,
  GraduationCap,
  HandHeart,
  Star,
  ArrowRight,
  CheckCircle,
  Filter,
  Search
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Volunteer = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTimeCommitment, setSelectedTimeCommitment] = useState("all");

  const volunteerOpportunities = [
    {
      id: 1,
      title: "Community Education Assistant",
      category: "Education",
      description: "Help facilitate Islamic education classes and support students in their learning journey.",
      timeCommitment: "5-10 hours/week",
      location: "Local Community Centers",
      duration: "6 months minimum",
      requirements: ["Basic Islamic knowledge", "Patience with students", "Reliable transportation"],
      benefits: ["Teaching experience", "Community impact", "Spiritual growth"],
      icon: <GraduationCap className="h-6 w-6 text-green-600" />,
      urgent: false
    },
    {
      id: 2,
      title: "Food Distribution Coordinator",
      category: "Community Service",
      description: "Organize and coordinate food distribution programs for families in need.",
      timeCommitment: "8-12 hours/week",
      location: "Various locations",
      duration: "3 months minimum",
      requirements: ["Organizational skills", "Physical ability to lift", "Driver's license"],
      benefits: ["Leadership experience", "Direct community impact", "Team building"],
      icon: <HandHeart className="h-6 w-6 text-green-600" />,
      urgent: true
    },
    {
      id: 3,
      title: "Digital Content Creator",
      category: "Technology",
      description: "Create educational content, social media posts, and digital materials for our online platforms.",
      timeCommitment: "3-5 hours/week",
      location: "Remote",
      duration: "Flexible",
      requirements: ["Content creation skills", "Social media knowledge", "Creative thinking"],
      benefits: ["Portfolio building", "Remote work experience", "Creative freedom"],
      icon: <Globe className="h-6 w-6 text-green-600" />,
      urgent: false
    },
    {
      id: 4,
      title: "Event Planning Assistant",
      category: "Events",
      description: "Help organize community events, workshops, and special programs.",
      timeCommitment: "6-8 hours/week",
      location: "Event venues",
      duration: "Event-based",
      requirements: ["Event planning experience", "Communication skills", "Flexible schedule"],
      benefits: ["Event management skills", "Networking opportunities", "Creative input"],
      icon: <Calendar className="h-6 w-6 text-green-600" />,
      urgent: false
    },
    {
      id: 5,
      title: "Youth Mentor",
      category: "Mentorship",
      description: "Mentor young Muslims in their spiritual and personal development.",
      timeCommitment: "4-6 hours/week",
      location: "Community centers",
      duration: "1 year commitment",
      requirements: ["Strong Islamic foundation", "Patience", "Background check required"],
      benefits: ["Mentorship experience", "Youth development", "Long-term impact"],
      icon: <Users className="h-6 w-6 text-green-600" />,
      urgent: true
    },
    {
      id: 6,
      title: "Administrative Support",
      category: "Administration",
      description: "Provide administrative support for various programs and initiatives.",
      timeCommitment: "5-7 hours/week",
      location: "Office/Remote",
      duration: "Flexible",
      requirements: ["Computer skills", "Attention to detail", "Reliability"],
      benefits: ["Administrative experience", "Professional development", "Flexible hours"],
      icon: <Briefcase className="h-6 w-6 text-green-600" />,
      urgent: false
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Education", label: "Education" },
    { value: "Community Service", label: "Community Service" },
    { value: "Technology", label: "Technology" },
    { value: "Events", label: "Events" },
    { value: "Mentorship", label: "Mentorship" },
    { value: "Administration", label: "Administration" }
  ];

  const timeCommitments = [
    { value: "all", label: "All Time Commitments" },
    { value: "1-3 hours/week", label: "1-3 hours/week" },
    { value: "3-5 hours/week", label: "3-5 hours/week" },
    { value: "5-10 hours/week", label: "5-10 hours/week" },
    { value: "10+ hours/week", label: "10+ hours/week" }
  ];

  const filteredOpportunities = volunteerOpportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || opportunity.category === selectedCategory;
    const matchesTime = selectedTimeCommitment === "all" || opportunity.timeCommitment === selectedTimeCommitment;
    
    return matchesSearch && matchesCategory && matchesTime;
  });

  const handleApply = (opportunityId: number) => {
    // In a real app, this would open an application form or redirect to application page
    navigate('/volunteer/apply', { state: { opportunityId } });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              <Heart className="h-4 w-4 mr-2" />
              Volunteer Opportunities
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Make a Difference Through{" "}
              <span className="text-green-600">Service</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Join our community of dedicated volunteers who are making a positive impact 
              through education, charity, and community service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Users className="h-5 w-5 mr-2" />
                View Opportunities
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
                onClick={() => navigate('/about')}
              >
                Learn About Our Mission
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">500+</h3>
              <p className="text-muted-foreground">Active Volunteers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">50+</h3>
              <p className="text-muted-foreground">Programs Supported</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">25+</h3>
              <p className="text-muted-foreground">Cities Served</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">10K+</h3>
              <p className="text-muted-foreground">Lives Impacted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section id="opportunities" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Volunteer Opportunities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find the perfect opportunity to serve your community and grow spiritually
            </p>
          </div>

          {/* Filters */}
          <div className="bg-background rounded-lg p-6 shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search" className="flex items-center gap-2 mb-2">
                  <Search className="h-4 w-4" />
                  Search
                </Label>
                <Input
                  id="search"
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="category" className="flex items-center gap-2 mb-2">
                  <Filter className="h-4 w-4" />
                  Category
                </Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="time" className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4" />
                  Time Commitment
                </Label>
                <Select value={selectedTimeCommitment} onValueChange={setSelectedTimeCommitment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time commitment" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeCommitments.map((time) => (
                      <SelectItem key={time.value} value={time.value}>
                        {time.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedTimeCommitment("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Opportunities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                      {opportunity.icon}
                    </div>
                    {opportunity.urgent && (
                      <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground mb-2">
                    {opportunity.title}
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit">
                    {opportunity.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {opportunity.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="text-muted-foreground">Time: {opportunity.timeCommitment}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span className="text-muted-foreground">Location: {opportunity.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span className="text-muted-foreground">Duration: {opportunity.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Requirements:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {opportunity.requirements.slice(0, 2).map((req, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            {req}
                          </li>
                        ))}
                        {opportunity.requirements.length > 2 && (
                          <li className="text-xs text-muted-foreground">
                            +{opportunity.requirements.length - 2} more requirements
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleApply(opportunity.id)}
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredOpportunities.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No opportunities found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or check back later for new opportunities.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedTimeCommitment("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Volunteer With Us?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join a community that values service, growth, and making a meaningful impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Spiritual Growth</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Deepen your connection to Allah through service and community building
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Community Connection</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Build lasting relationships with like-minded individuals in your community
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Skill Development</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Gain valuable experience and develop new skills in various areas
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
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Join our community of volunteers and help continue the legacy of 
              Shaykh Hassan Cisse (RA) through service and education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-green-50"
                onClick={() => document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Users className="h-5 w-5 mr-2" />
                Browse Opportunities
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
                onClick={() => navigate('/contact')}
              >
                <Mail className="h-5 w-5 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Volunteer;
