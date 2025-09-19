import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  BookOpen, 
  Lock, 
  Star, 
  Download, 
  Share2,
  CheckCircle,
  User as UserIcon,
  List,
  Target,
  Award
} from "lucide-react";
import { LoadingSpinner, ErrorDisplay } from "@/components/ui/LoadingStates";

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'audio' | 'text' | 'interactive';
  level: 'beginner' | 'intermediate' | 'advanced';
  isPremium: boolean;
  isCompleted: boolean;
  rating: number;
  thumbnail?: string;
  instructor?: string;
  longDescription?: string;
  modules?: { title: string; duration: string; isCompleted?: boolean; }[];
  prerequisites?: string[];
  learningObjectives?: string[];
  resources?: { title: string; type: 'pdf' | 'video' | 'audio' | 'link'; url: string; }[];
  relatedLessons?: { id: string; title: string; thumbnail?: string; }[];
}

const mockLesson: Lesson = {
  id: '1',
  title: 'Introduction to Tariqa Tijaniyya',
  description: 'Learn about the foundations and principles of the Tijaniyya spiritual path.',
  duration: '45 min',
  type: 'video',
  level: 'beginner',
  isPremium: false,
  isCompleted: true,
  rating: 4.8,
  instructor: 'Shaykh Hassan Cisse Foundation',
  thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=center',
  longDescription: 'This comprehensive introduction covers the historical origins, spiritual principles, and foundational practices of the Tijaniyya tariqa. Perfect for those beginning their spiritual journey or seeking to understand this beautiful path. You will learn about the life of Shaykh Ahmad al-Tijani, the establishment of the tariqa, and its core teachings that have guided millions of believers worldwide.',
  modules: [
    { title: 'Historical Origins', duration: '15 min', isCompleted: true },
    { title: 'Core Principles', duration: '20 min', isCompleted: true },
    { title: 'Basic Practices', duration: '10 min', isCompleted: false }
  ],
  prerequisites: ['Basic understanding of Islam', 'Open heart and mind'],
  learningObjectives: [
    'Understand the historical context of Tijaniyya',
    'Learn the core spiritual principles',
    'Identify basic daily practices',
    'Recognize the significance of the Tijani wird'
  ],
  resources: [
    { title: 'Tijani Wird Text', type: 'pdf', url: '#' },
    { title: 'Audio Recitation', type: 'audio', url: '#' },
    { title: 'Historical Timeline', type: 'pdf', url: '#' }
  ],
  relatedLessons: [
    { id: '2', title: 'The Life of Shaykh Hassan Cisse (RA)', thumbnail: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop&crop=center' },
    { id: '3', title: 'Daily Wird and Spiritual Practices', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&crop=center' }
  ]
};

const LessonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadLesson = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Remove artificial delay for better performance
        // await new Promise(resolve => setTimeout(resolve, 1000));
        setLesson(mockLesson);
      } catch (err) {
        setError("Failed to load lesson details.");
      } finally {
        setIsLoading(false);
      }
    };

    loadLesson();
  }, [id]);

  const getTypeIcon = () => {
    switch (lesson?.type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'audio': return <BookOpen className="h-4 w-4" />;
      case 'text': return <BookOpen className="h-4 w-4" />;
      case 'interactive': return <List className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const completedModules = lesson?.modules?.filter(m => m.isCompleted).length || 0;
  const totalModules = lesson?.modules?.length || 0;
  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorDisplay message={error || "Lesson not found"} />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="py-8 bg-gradient-to-r from-primary/5 to-legacy/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={() => navigate('/lessons')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Lessons
            </Button>
          </div>

          {/* Hero Image Section */}
          {lesson.thumbnail && (
            <div className="mb-8">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={lesson.thumbnail} 
                  alt={lesson.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{lesson.title}</h1>
                  <p className="text-lg opacity-90 max-w-2xl">{lesson.description}</p>
                </div>
                {/* Play button overlay for video lessons */}
                {lesson.type === 'video' && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Badge className={getLevelColor(lesson.level)}>
                  {lesson.level}
                </Badge>
                {lesson.isPremium && (
                  <Badge variant="legacy">
                    <Lock className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  {getTypeIcon()}
                  {lesson.type}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {lesson.duration}
                </div>
              </div>

              {!lesson.thumbnail && (
                <>
                  <h1 className="text-4xl font-bold text-foreground mb-4">{lesson.title}</h1>
                  <p className="text-lg text-muted-foreground mb-6">{lesson.description}</p>
                </>
              )}

              {lesson.instructor && (
                <div className="flex items-center gap-3 mb-6 p-4 bg-muted/30 rounded-lg">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
                      alt="Instructor"
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Instructor</span>
                    <p className="font-medium">{lesson.instructor}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">{lesson.rating}</span>
                </div>
                {lesson.isCompleted && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Completed</span>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                {lesson.isPremium && !lesson.isCompleted ? (
                  <Button variant="legacy" size="lg" onClick={() => navigate('/premium-pricing')}>
                    <Lock className="h-5 w-5 mr-2" />
                    Upgrade to Premium
                  </Button>
                ) : (
                  <Button variant="primary" size="lg">
                    <Play className="h-5 w-5 mr-2" />
                    {lesson.isCompleted ? 'Review Lesson' : 'Start Learning'}
                  </Button>
                )}
                <Button variant="outline" size="lg">
                  <Download className="h-5 w-5 mr-2" />
                  Download Resources
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Progress Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Modules Completed</span>
                        <span>{completedModules}/{totalModules}</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {progressPercentage === 100 
                        ? "Congratulations! You've completed this lesson."
                        : `${Math.round(progressPercentage)}% complete`
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{lesson.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <span className="font-medium capitalize">{lesson.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium capitalize">{lesson.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{lesson.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="related">Related</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      About This Lesson
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <img 
                        src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop&crop=center"
                        alt="Islamic learning"
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {lesson.longDescription}
                    </p>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-primary" />
                          What You'll Learn
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {lesson.learningObjectives.map((objective, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-primary" />
                              <span className="text-sm">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {lesson.prerequisites && lesson.prerequisites.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Prerequisites</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {lesson.prerequisites.map((prereq, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="text-primary">•</span>
                              <span className="text-sm">{prereq}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="modules" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <List className="h-5 w-5 text-primary" />
                    Lesson Modules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lesson.modules?.map((module, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            module.isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {module.isCompleted ? (
                              <CheckCircle className="h-6 w-6" />
                            ) : (
                              <span className="text-sm font-bold">{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-lg">{module.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {module.duration}
                              {module.isCompleted && (
                                <>
                                  <span className="mx-2">•</span>
                                  <span className="text-green-600 font-medium">Completed</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant={module.isCompleted ? "outline" : "primary"}
                          size="sm"
                        >
                          {module.isCompleted ? 'Review' : 'Start'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Downloadable Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lesson.resources?.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded">
                            <Download className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{resource.title}</h4>
                            <p className="text-sm text-muted-foreground capitalize">{resource.type}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="related" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lesson.relatedLessons?.map((relatedLesson) => (
                  <Card key={relatedLesson.id} className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
                    {relatedLesson.thumbnail && (
                      <div className="relative">
                        <img 
                          src={relatedLesson.thumbnail} 
                          alt={relatedLesson.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white/20 text-white border-white/30">
                            <Play className="h-3 w-3 mr-1" />
                            Video
                          </Badge>
                        </div>
                      </div>
                    )}
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3 line-clamp-2">{relatedLesson.title}</h4>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => navigate(`/lessons/${relatedLesson.id}`)}
                        className="w-full"
                      >
                        View Lesson
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default LessonDetail;
