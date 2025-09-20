import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Download, 
  ExternalLink, 
  Search, 
  Filter,
  FileText,
  Video,
  Volume2,
  Image,
  Users,
  GraduationCap,
  Briefcase,
  Home,
  Heart,
  Globe,
  Star,
  Calendar,
  MapPin,
  Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Resources = () => {
  const navigate = useNavigate();

  const resourceCategories = [
    {
      id: 'education',
      name: 'Education',
      icon: <GraduationCap className="h-6 w-6" />,
      count: 45,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'jobs',
      name: 'Job Opportunities',
      icon: <Briefcase className="h-6 w-6" />,
      count: 23,
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'housing',
      name: 'Housing',
      icon: <Home className="h-6 w-6" />,
      count: 18,
      color: 'bg-orange-100 text-orange-800'
    },
    {
      id: 'scholarships',
      name: 'Scholarships',
      icon: <Award className="h-6 w-6" />,
      count: 12,
      color: 'bg-legacy/10 text-legacy border border-legacy/20'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: <Heart className="h-6 w-6" />,
      count: 8,
      color: 'bg-red-100 text-red-800'
    },
    {
      id: 'business',
      name: 'Business',
      icon: <Globe className="h-6 w-6" />,
      count: 15,
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  const resources = [
    {
      id: 1,
      title: 'Islamic Studies Online Course - Advanced Level',
      description: 'Comprehensive course covering advanced Islamic jurisprudence, theology, and Arabic language.',
      type: 'Course',
      category: 'Education',
      format: 'Video',
      duration: '12 weeks',
      rating: 4.8,
      downloads: 1250,
      isFeatured: true,
      tags: ['islamic-studies', 'arabic', 'jurisprudence'],
      author: 'Dr. Ahmed Al-Mansouri',
      organization: 'Islamic University of Medina',
      language: 'Arabic/English',
      cost: 'Free'
    },
    {
      id: 2,
      title: 'Software Engineer Position - Remote',
      description: 'Full-stack developer position at a halal fintech startup. Remote work, competitive salary.',
      type: 'Job',
      category: 'Job Opportunities',
      format: 'Document',
      location: 'Remote',
      salary: '$80,000 - $120,000',
      rating: 4.6,
      downloads: 890,
      isFeatured: false,
      tags: ['software', 'remote', 'fintech'],
      author: 'HalalTech Solutions',
      organization: 'HalalTech Solutions',
      language: 'English',
      cost: 'Free'
    },
    {
      id: 3,
      title: 'Muslim Student Housing Directory',
      description: 'Comprehensive directory of halal housing options near universities and colleges.',
      type: 'Directory',
      category: 'Housing',
      format: 'Document',
      pages: '45 pages',
      rating: 4.7,
      downloads: 2100,
      isFeatured: true,
      tags: ['housing', 'students', 'halal'],
      author: 'Muslim Student Association',
      organization: 'MSA National',
      language: 'English',
      cost: 'Free'
    },
    {
      id: 4,
      title: 'Islamic Finance Masterclass',
      description: 'Learn about halal investment strategies, Islamic banking, and Sharia-compliant financial products.',
      type: 'Course',
      category: 'Education',
      format: 'Video',
      duration: '8 weeks',
      rating: 4.9,
      downloads: 980,
      isFeatured: false,
      tags: ['finance', 'investment', 'halal'],
      author: 'Sheikh Ibrahim Hassan',
      organization: 'Islamic Finance Institute',
      language: 'English',
      cost: '$99'
    },
    {
      id: 5,
      title: 'Muslim Healthcare Provider Network',
      description: 'Directory of Muslim-friendly healthcare providers, including doctors, dentists, and specialists.',
      type: 'Directory',
      category: 'Healthcare',
      format: 'Document',
      pages: '32 pages',
      rating: 4.5,
      downloads: 1560,
      isFeatured: false,
      tags: ['healthcare', 'doctors', 'muslim-friendly'],
      author: 'Muslim Healthcare Network',
      organization: 'MHN',
      language: 'English',
      cost: 'Free'
    },
    {
      id: 6,
      title: 'Quran Recitation - Complete Audio Collection',
      description: 'High-quality audio recordings of the complete Quran with multiple reciters and translations.',
      type: 'Audio',
      category: 'Education',
      format: 'Audio',
      duration: '25 hours',
      rating: 4.9,
      downloads: 3200,
      isFeatured: true,
      tags: ['quran', 'audio', 'recitation'],
      author: 'Various Reciters',
      organization: 'Quran Foundation',
      language: 'Arabic',
      cost: 'Free'
    }
  ];

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'Video': return <Video className="h-4 w-4" />;
      case 'Audio': return <Volume2 className="h-4 w-4" />;
      case 'Document': return <FileText className="h-4 w-4" />;
      case 'Image': return <Image className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const categoryData = resourceCategories.find(cat => cat.name === category);
    return categoryData?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-legacy/5 to-legacy/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-legacy/10 text-legacy border border-legacy/20">
              <BookOpen className="h-4 w-4 mr-2" />
              Community Resources
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Share & Discover{" "}
              <span className="text-legacy">Community Resources</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Access educational content, job opportunities, housing, scholarships, 
              and other valuable resources shared by our community members.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="legacy">
              <BookOpen className="h-4 w-4 mr-2" />
              Share Resource
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Filters */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Browse by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {resourceCategories.map((category) => (
                  <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 bg-legacy/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                      <p className="text-xs text-muted-foreground">{category.count} resources</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Resources List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">All Resources</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select className="text-sm border border-border rounded px-2 py-1">
                    <option>Most Popular</option>
                    <option>Newest</option>
                    <option>Rating</option>
                    <option>Downloads</option>
                  </select>
                </div>
              </div>

              {resources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-legacy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getFormatIcon(resource.format)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">
                              {resource.title}
                              {resource.isFeatured && (
                                <Badge variant="secondary" className="ml-2">Featured</Badge>
                              )}
                            </h3>
                            <p className="text-muted-foreground mb-2">{resource.description}</p>
                          </div>
                          <Badge className={getCategoryColor(resource.category)}>
                            {resource.category}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span>By {resource.author}</span>
                          <span>•</span>
                          <span>{resource.organization}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            {resource.rating}
                          </div>
                          <span>•</span>
                          <span>{resource.downloads} downloads</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            {getFormatIcon(resource.format)}
                            {resource.format}
                          </span>
                          {resource.duration && <span>{resource.duration}</span>}
                          {resource.pages && <span>{resource.pages}</span>}
                          {resource.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {resource.location}
                            </span>
                          )}
                          <span className="font-semibold text-legacy">{resource.cost}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          {resource.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Button variant="legacy" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Resource Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Resources</span>
                    <span className="font-semibold">121</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">This Month</span>
                    <span className="font-semibold">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Downloads</span>
                    <span className="font-semibold">9,850</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Contributors</span>
                    <span className="font-semibold">45</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Dr. Ahmed Al-Mansouri', resources: 12 },
                    { name: 'Muslim Student Association', resources: 8 },
                    { name: 'Islamic Finance Institute', resources: 6 },
                    { name: 'Quran Foundation', resources: 5 }
                  ].map((contributor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{contributor.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {contributor.resources}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Sharing Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <BookOpen className="h-4 w-4 text-legacy mt-0.5" />
                    <span>Share only halal and beneficial content</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-legacy mt-0.5" />
                    <span>Ensure content is helpful to community</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Heart className="h-4 w-4 text-legacy mt-0.5" />
                    <span>Respect intellectual property rights</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Globe className="h-4 w-4 text-legacy mt-0.5" />
                    <span>Include proper attribution</span>
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

export default Resources;
