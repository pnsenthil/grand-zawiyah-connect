import { useState, useEffect, memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Lock, Clock, BookOpen, Star, Download, Video, Volume2, FileText, Users, Award, Heart, Globe, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner, ErrorDisplay, EmptyState, SkeletonCard, SkeletonList } from "@/components/ui/LoadingStates";
import { useToast } from "@/components/ui/Toast";
import LessonDetailsModal from "@/components/ui/LessonDetailsModal";

// YouTube Embed Component
const YouTubeEmbed = ({ videoId, title }: { videoId: string; title: string }) => (
  <div className="aspect-video w-full">
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="rounded-lg"
    />
  </div>
);

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'audio' | 'text' | 'interactive' | 'live' | 'course';
  level: 'beginner' | 'intermediate' | 'advanced';
  isPremium: boolean;
  isCompleted: boolean;
  rating: number;
  thumbnail?: string;
  videoId?: string;
  instructor?: string;
  longDescription?: string;
  modules?: { title: string; duration: string; }[];
  prerequisites?: string[];
  learningObjectives?: string[];
  views?: number;
  category?: string;
  isLive?: boolean;
  nextSession?: string;
}

const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Quran Recitation and Tajweed - Complete Course',
    description: 'Master the beautiful art of Quran recitation with proper tajweed rules and pronunciation.',
    duration: '2h 30min',
    type: 'video',
    level: 'beginner',
    isPremium: false,
    isCompleted: false,
    rating: 4.9,
    videoId: '1gdi1W_HSRk',
    instructor: 'Quran Academy',
    category: 'Quran Studies',
    views: 12500,
    thumbnail: 'https://img.youtube.com/vi/1gdi1W_HSRk/maxresdefault.jpg',
    longDescription: 'A comprehensive course covering all aspects of Quran recitation including proper pronunciation, tajweed rules, and beautiful recitation techniques. Perfect for beginners and those looking to improve their recitation.',
    modules: [
      { title: 'Basic Pronunciation', duration: '45 min' },
      { title: 'Tajweed Rules', duration: '60 min' },
      { title: 'Practice Sessions', duration: '45 min' }
    ],
    prerequisites: ['Basic Arabic reading ability', 'Commitment to practice'],
    learningObjectives: [
      'Master proper Arabic pronunciation',
      'Learn essential tajweed rules',
      'Develop beautiful recitation skills'
    ]
  },
  {
    id: '2',
    title: 'Advanced Quran Memorization Techniques',
    description: 'Learn effective methods for memorizing the Holy Quran with proven techniques.',
    duration: '1h 45min',
    type: 'video',
    level: 'intermediate',
    isPremium: true,
    isCompleted: false,
    rating: 4.8,
    videoId: 'VL4S7LlJe1k',
    instructor: 'Hafiz Academy',
    category: 'Quran Studies',
    views: 8900,
    thumbnail: 'https://img.youtube.com/vi/VL4S7LlJe1k/maxresdefault.jpg',
    longDescription: 'Advanced techniques and strategies for memorizing the Quran effectively. This course covers memory techniques, revision schedules, and maintaining memorized portions.',
    modules: [
      { title: 'Memory Techniques', duration: '35 min' },
      { title: 'Revision Strategies', duration: '40 min' },
      { title: 'Maintenance Methods', duration: '30 min' }
    ],
    prerequisites: ['Basic Quran reading', 'Previous memorization experience'],
    learningObjectives: [
      'Master effective memorization techniques',
      'Develop consistent revision habits',
      'Maintain memorized portions long-term'
    ]
  },
  {
    id: '3',
    title: 'Introduction to Tariqa Tijaniyya',
    description: 'Learn about the foundations and principles of the Tijaniyya spiritual path.',
    duration: '45 min',
    type: 'video',
    level: 'beginner',
    isPremium: false,
    isCompleted: true,
    rating: 4.8,
    instructor: 'Shaykh Hassan Cisse Foundation',
    category: 'Spiritual Development',
    views: 5600,
    thumbnail: '/api/placeholder/400/225',
    longDescription: 'This comprehensive introduction covers the historical origins, spiritual principles, and foundational practices of the Tijaniyya tariqa. Perfect for those beginning their spiritual journey.',
    modules: [
      { title: 'Historical Origins', duration: '15 min' },
      { title: 'Core Principles', duration: '20 min' },
      { title: 'Basic Practices', duration: '10 min' }
    ],
    prerequisites: ['Basic understanding of Islam', 'Open heart and mind'],
    learningObjectives: [
      'Understand the historical context of Tijaniyya',
      'Learn the core spiritual principles',
      'Identify basic daily practices'
    ]
  },
  {
    id: '4',
    title: 'Daily Wird and Spiritual Practices',
    description: 'Essential daily practices for spiritual development and connection.',
    duration: '30 min',
    type: 'audio',
    level: 'beginner',
    isPremium: true,
    isCompleted: false,
    rating: 4.7,
    instructor: 'Shaykh Hassan Cisse Foundation',
    category: 'Spiritual Development',
    views: 3200,
    longDescription: 'Learn the essential daily spiritual practices including the Tijani wird, dhikr, and other foundational practices that form the core of spiritual development.',
    modules: [
      { title: 'Understanding Wird', duration: '10 min' },
      { title: 'Daily Practice Routine', duration: '15 min' },
      { title: 'Common Mistakes', duration: '5 min' }
    ],
    prerequisites: ['Introduction to Tariqa Tijaniyya'],
    learningObjectives: [
      'Learn proper wird recitation',
      'Establish daily spiritual routine',
      'Avoid common practice mistakes'
    ]
  },
  {
    id: '5',
    title: 'Live Weekly Halaqa - Islamic Jurisprudence',
    description: 'Join our live weekly study circle on Islamic jurisprudence and contemporary issues.',
    duration: '1h 30min',
    type: 'live',
    level: 'intermediate',
    isPremium: false,
    isCompleted: false,
    rating: 4.9,
    instructor: 'Dr. Ahmed Al-Mansouri',
    category: 'Islamic Studies',
    views: 4500,
    isLive: true,
    nextSession: 'Every Sunday, 7:00 PM EST',
    longDescription: 'Interactive live sessions covering various topics in Islamic jurisprudence, contemporary issues, and spiritual guidance. Q&A sessions included.',
    modules: [
      { title: 'Fiqh Discussion', duration: '60 min' },
      { title: 'Q&A Session', duration: '30 min' }
    ],
    prerequisites: ['Basic Islamic knowledge', 'Interest in jurisprudence'],
    learningObjectives: [
      'Understand contemporary fiqh issues',
      'Learn from qualified scholars',
      'Ask questions and get guidance'
    ]
  },
  {
    id: '6',
    title: 'Islamic History and Civilization',
    description: 'Explore the rich history of Islamic civilization and its contributions to humanity.',
    duration: '2h 15min',
    type: 'course',
    level: 'intermediate',
    isPremium: true,
    isCompleted: false,
    rating: 4.6,
    instructor: 'Islamic History Institute',
    category: 'Islamic Studies',
    views: 7800,
    thumbnail: '/api/placeholder/400/225',
    longDescription: 'A comprehensive course covering the golden age of Islamic civilization, scientific contributions, and the spread of Islamic knowledge across the world.',
    modules: [
      { title: 'Early Islamic Period', duration: '45 min' },
      { title: 'Golden Age of Science', duration: '45 min' },
      { title: 'Cultural Contributions', duration: '45 min' }
    ],
    prerequisites: ['Basic Islamic knowledge', 'Interest in history'],
    learningObjectives: [
      'Understand Islamic historical periods',
      'Learn about scientific contributions',
      'Appreciate cultural achievements'
    ]
  },
  {
    id: '7',
    title: 'Arabic Language for Beginners',
    description: 'Learn Arabic language fundamentals for better understanding of Islamic texts.',
    duration: '3h 20min',
    type: 'course',
    level: 'beginner',
    isPremium: false,
    isCompleted: false,
    rating: 4.7,
    instructor: 'Arabic Language Center',
    category: 'Language Learning',
    views: 12000,
    thumbnail: '/api/placeholder/400/225',
    longDescription: 'Complete beginner course in Arabic language covering alphabet, basic grammar, vocabulary, and reading skills essential for Islamic studies.',
    modules: [
      { title: 'Arabic Alphabet', duration: '60 min' },
      { title: 'Basic Grammar', duration: '80 min' },
      { title: 'Reading Practice', duration: '60 min' }
    ],
    prerequisites: ['No prior Arabic knowledge required'],
    learningObjectives: [
      'Master Arabic alphabet and pronunciation',
      'Learn basic grammar rules',
      'Develop reading skills'
    ]
  },
  {
    id: '8',
    title: 'Sufism and Spiritual Psychology',
    description: 'Understanding the psychological aspects of spiritual development in Islam.',
    duration: '1h 50min',
    type: 'video',
    level: 'advanced',
    isPremium: true,
    isCompleted: false,
    rating: 4.8,
    instructor: 'Dr. Fatima Al-Zahra',
    category: 'Spiritual Development',
    views: 2100,
    thumbnail: '/api/placeholder/400/225',
    longDescription: 'Advanced course exploring the psychological dimensions of Islamic spirituality, including concepts of the nafs, spiritual purification, and inner transformation.',
    modules: [
      { title: 'Understanding the Nafs', duration: '35 min' },
      { title: 'Spiritual Purification', duration: '40 min' },
      { title: 'Inner Transformation', duration: '35 min' }
    ],
    prerequisites: ['Advanced Islamic knowledge', 'Previous spiritual study'],
    learningObjectives: [
      'Understand spiritual psychology concepts',
      'Learn purification methods',
      'Develop deeper self-awareness'
    ]
  }
];

const LessonCard = ({ lesson, onLearnMore, onViewLesson }: { lesson: Lesson; onLearnMore: (lesson: Lesson) => void; onViewLesson: (lesson: Lesson) => void }) => {
  const getTypeIcon = () => {
    switch (lesson.type) {
      case 'video': return <Video className="h-4 w-4 text-legacy" />;
      case 'audio': return <Volume2 className="h-4 w-4 text-legacy" />;
      case 'live': return <Users className="h-4 w-4 text-red-500" />;
      case 'course': return <BookOpen className="h-4 w-4 text-legacy" />;
      default: return <FileText className="h-4 w-4 text-legacy" />;
    }
  };

  const getLevelColor = () => {
    switch (lesson.level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Quran Studies': return 'bg-legacy/10 text-legacy border border-legacy/20';
      case 'Spiritual Development': return 'bg-purple-100 text-purple-800';
      case 'Islamic Studies': return 'bg-blue-100 text-blue-800';
      case 'Language Learning': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 card-elegant">
      {/* Video Thumbnail */}
      {lesson.thumbnail && (
        <div className="relative aspect-video bg-gray-100">
          <img 
            src={lesson.thumbnail} 
            alt={lesson.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
              <Play className="h-6 w-6 text-legacy ml-1" />
            </div>
          </div>
          {lesson.isLive && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-red-500 text-white animate-pulse">
                LIVE
              </Badge>
            </div>
          )}
          {lesson.isPremium && (
            <div className="absolute top-2 right-2">
              <Lock className="h-4 w-4 text-white bg-black/50 rounded p-1" />
            </div>
          )}
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {getTypeIcon()}
            <Badge variant="secondary" className={getLevelColor()}>
              {lesson.level}
            </Badge>
            {lesson.category && (
              <Badge className={getCategoryColor(lesson.category)}>
                {lesson.category}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm text-muted-foreground">{lesson.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{lesson.title}</h3>
        <p className="text-muted-foreground mb-3 text-sm line-clamp-2">{lesson.description}</p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {lesson.duration}
            </div>
            {lesson.views && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {lesson.views.toLocaleString()} views
              </div>
            )}
          </div>
          {lesson.instructor && (
            <span className="text-xs">{lesson.instructor}</span>
          )}
        </div>

        {lesson.isLive && lesson.nextSession && (
          <div className="mb-4 p-2 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-red-500" />
              <span className="text-red-700 font-medium">Next: {lesson.nextSession}</span>
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          {lesson.isPremium && !lesson.isCompleted ? (
            <Button variant="legacy" size="sm" className="flex-1" onClick={() => navigate('/premium-pricing')}>
              <Lock className="h-4 w-4 mr-2" />
              Upgrade to Premium
            </Button>
          ) : (
            <Button variant="legacy" size="sm" className="flex-1" onClick={() => onViewLesson(lesson)}>
              {lesson.isCompleted ? 'Review' : lesson.isLive ? 'Join Live' : 'Start Learning'}
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => onLearnMore(lesson)}>
            Learn More
          </Button>
        </div>
        
        {lesson.isCompleted && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600 font-medium">✓ Completed</span>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4 mr-1 text-green-600" />
                Certificate
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Lessons = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const toast = useToast();

  const handleLearnMore = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const handleViewLesson = (lesson: Lesson) => {
    if (lesson.videoId) {
      // Open YouTube video in a new tab
      window.open(`https://www.youtube.com/watch?v=${lesson.videoId}`, '_blank');
    } else {
      navigate(`/lessons/${lesson.id}`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLesson(null);
  };

  const handleUpgradeToPremium = () => {
    navigate('/premium-pricing');
  };

  // Simulate loading lessons data
  useEffect(() => {
    const loadLessons = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Remove artificial delay for better performance
        // await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, you would fetch data from your API here
        setLessons(mockLessons);
        
      } catch (err) {
        const errorMessage = 'Failed to load lessons';
        setError(errorMessage);
        toast.error('Error', errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadLessons();
  }, []); // Remove toast dependency to prevent unnecessary re-renders
  
  const categories = ['all', 'Quran Studies', 'Spiritual Development', 'Islamic Studies', 'Language Learning'];
  
  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      const matchesTab = selectedTab === 'all' || 
        (selectedTab === 'free' && !lesson.isPremium) ||
        (selectedTab === 'premium' && lesson.isPremium) ||
        (selectedTab === 'completed' && lesson.isCompleted) ||
        (selectedTab === 'live' && lesson.isLive);
      
      const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
      
      return matchesTab && matchesCategory;
    });
  }, [lessons, selectedTab, selectedCategory]);

  if (isLoading) {
    return (
      <>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Islamic Lessons</h1>
          <p className="text-muted-foreground">
            Deepen your understanding with our comprehensive curriculum
          </p>
        </div>

        {/* Loading State */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Islamic Lessons</h1>
          <p className="text-muted-foreground">
            Deepen your understanding with our comprehensive curriculum
          </p>
        </div>

        {/* Error State */}
        <ErrorDisplay 
          error={error}
          title="Failed to load lessons"
          onRetry={() => window.location.reload()}
        />
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-legacy/5 to-legacy/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Islamic Learning Center
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Master Quran recitation, Islamic studies, and spiritual development with our comprehensive curriculum
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="legacy" size="lg" onClick={() => navigate('/premium-pricing')}>
                <Award className="h-5 w-5 mr-2" />
                Upgrade to Premium
              </Button>
              <Button variant="outline" size="lg" className="border-legacy text-legacy hover:bg-legacy hover:text-legacy-foreground">
                <BookOpen className="h-5 w-5 mr-2" />
                Browse Free Content
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Videos Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Quran Lessons</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master the beautiful art of Quran recitation with our comprehensive video courses
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Quran Recitation Course */}
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100">
                <YouTubeEmbed 
                  videoId="1gdi1W_HSRk" 
                  title="Quran Recitation and Tajweed - Complete Course"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-legacy/10 text-legacy border border-legacy/20">Quran Studies</Badge>
                  <Badge variant="secondary">Beginner</Badge>
                  <div className="flex items-center gap-1 ml-auto">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-muted-foreground">4.9</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Quran Recitation and Tajweed - Complete Course
                </h3>
                <p className="text-muted-foreground mb-4">
                  Master the beautiful art of Quran recitation with proper tajweed rules and pronunciation.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      2h 30min
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      12.5K views
                    </div>
                  </div>
                  <Button variant="legacy" onClick={() => window.open('https://www.youtube.com/watch?v=1gdi1W_HSRk', '_blank')}>
                    <Play className="h-4 w-4 mr-2" />
                    Watch Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Memorization Course */}
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100">
                <YouTubeEmbed 
                  videoId="VL4S7LlJe1k" 
                  title="Advanced Quran Memorization Techniques"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-legacy/10 text-legacy border border-legacy/20">Quran Studies</Badge>
                  <Badge variant="secondary">Intermediate</Badge>
                  <div className="flex items-center gap-1 ml-auto">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-muted-foreground">4.8</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Advanced Quran Memorization Techniques
                </h3>
                <p className="text-muted-foreground mb-4">
                  Learn effective methods for memorizing the Holy Quran with proven techniques.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      1h 45min
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      8.9K views
                    </div>
                  </div>
                  <Button variant="legacy" onClick={() => window.open('https://www.youtube.com/watch?v=VL4S7LlJe1k', '_blank')}>
                    <Play className="h-4 w-4 mr-2" />
                    Watch Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="all">All Lessons</TabsTrigger>
              <TabsTrigger value="free">Free Content</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
              <TabsTrigger value="live">Live Sessions</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Browse by Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "legacy" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            <TabsContent value={selectedTab}>
              {filteredLessons.length === 0 ? (
                <EmptyState
                  title="No lessons found"
                  description={`No lessons match your current filter. Try selecting a different category or type.`}
                  icon={<BookOpen className="h-16 w-16 text-gray-400" />}
                  action={{
                    label: "View All Lessons",
                    onClick: () => {
                      setSelectedTab('all');
                      setSelectedCategory('all');
                    }
                  }}
                />
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">
                      {selectedCategory === 'all' ? 'All' : selectedCategory} Lessons
                      <span className="text-lg font-normal text-muted-foreground ml-2">
                        ({filteredLessons.length} {filteredLessons.length === 1 ? 'lesson' : 'lessons'})
                      </span>
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLessons.map((lesson) => (
                      <LessonCard key={lesson.id} lesson={lesson} onLearnMore={handleLearnMore} onViewLesson={handleViewLesson} />
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Premium Upgrade CTA */}
          <div className="mt-16 text-center">
            <Card className="p-8 bg-gradient-accent">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Unlock Premium Content
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get unlimited access to exclusive video lessons, audio teachings, and downloadable resources from the Tariqa tradition.
              </p>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => {
                  navigate('/premium-pricing');
                  // Scroll to top of the page after navigation
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
              >
                Subscribe for $19/month
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Lesson Details Modal */}
      <LessonDetailsModal
        lesson={selectedLesson}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpgradeToPremium={handleUpgradeToPremium}
      />
    </>
  );
};

export default Lessons;