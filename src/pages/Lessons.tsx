import { useState, useEffect, memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Lock, Clock, BookOpen, Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner, ErrorDisplay, EmptyState, SkeletonCard, SkeletonList } from "@/components/ui/LoadingStates";
import { useToast } from "@/components/ui/Toast";
import LessonDetailsModal from "@/components/ui/LessonDetailsModal";

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
  modules?: { title: string; duration: string; }[];
  prerequisites?: string[];
  learningObjectives?: string[];
}

const mockLessons: Lesson[] = [
  {
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
    longDescription: 'This comprehensive introduction covers the historical origins, spiritual principles, and foundational practices of the Tijaniyya tariqa. Perfect for those beginning their spiritual journey or seeking to understand this beautiful path.',
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
    id: '2', 
    title: 'The Life of Shaykh Hassan Cisse (RA)',
    description: 'Discover the inspiring journey and teachings of our beloved Shaykh.',
    duration: '1h 20min',
    type: 'video',
    level: 'intermediate',
    isPremium: true,
    isCompleted: false,
    rating: 4.9,
    instructor: 'Shaykh Hassan Cisse Foundation',
    longDescription: 'An in-depth exploration of the life, teachings, and spiritual legacy of Shaykh Hassan Cisse (RA). This lesson provides profound insights into his journey, his impact on the global Muslim community, and his continued influence.',
    modules: [
      { title: 'Early Life and Education', duration: '25 min' },
      { title: 'Spiritual Journey', duration: '30 min' },
      { title: 'Global Impact', duration: '25 min' }
    ],
    prerequisites: ['Introduction to Tariqa Tijaniyya', 'Basic Islamic knowledge'],
    learningObjectives: [
      'Understand Shaykh Hassan Cisse\'s early life',
      'Learn about his spiritual development',
      'Appreciate his global humanitarian work'
    ]
  },
  {
    id: '3',
    title: 'Daily Wird and Spiritual Practices',
    description: 'Essential daily practices for spiritual development and connection.',
    duration: '30 min',
    type: 'audio',
    level: 'beginner',
    isPremium: true,
    isCompleted: false,
    rating: 4.7,
    instructor: 'Shaykh Hassan Cisse Foundation',
    longDescription: 'Learn the essential daily spiritual practices including the Tijani wird, dhikr, and other foundational practices that form the core of spiritual development in the Tijaniyya tradition.',
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
    id: '4',
    title: 'Understanding Islamic Finance',
    description: 'Principles of halal wealth and charitable giving in Islam.',
    duration: '55 min',
    type: 'video',
    level: 'intermediate',
    isPremium: false,
    isCompleted: false,
    rating: 4.6,
    instructor: 'Islamic Finance Institute',
    longDescription: 'A comprehensive guide to Islamic financial principles, including halal investment strategies, charitable giving (sadaqah and zakat), and how to align your financial decisions with Islamic values.',
    modules: [
      { title: 'Islamic Financial Principles', duration: '20 min' },
      { title: 'Halal Investment Options', duration: '20 min' },
      { title: 'Charitable Giving', duration: '15 min' }
    ],
    prerequisites: ['Basic understanding of Islam', 'Interest in financial planning'],
    learningObjectives: [
      'Understand Islamic financial principles',
      'Identify halal investment opportunities',
      'Learn proper charitable giving practices'
    ]
  }
];

const LessonCard = ({ lesson, onLearnMore, onViewLesson }: { lesson: Lesson; onLearnMore: (lesson: Lesson) => void; onViewLesson: (lesson: Lesson) => void }) => {
  const getTypeIcon = () => {
    switch (lesson.type) {
      case 'video': return <Play className="h-4 w-4 text-green-600" />;
      case 'audio': return <BookOpen className="h-4 w-4 text-green-600" />;
      default: return <BookOpen className="h-4 w-4 text-green-600" />;
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

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 card-elegant">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {getTypeIcon()}
          <Badge variant="secondary" className={getLevelColor()}>
            {lesson.level}
          </Badge>
          {lesson.isPremium && <Lock className="h-4 w-4 text-legacy" />}
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="text-sm text-muted-foreground">{lesson.rating}</span>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">{lesson.title}</h3>
      <p className="text-muted-foreground mb-4">{lesson.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 text-green-600" />
          {lesson.duration}
        </div>
        
        <div className="flex gap-2">
          {lesson.isPremium && !lesson.isCompleted ? (
            <Button variant="legacy" size="sm" onClick={() => navigate('/premium-pricing')}>
              Upgrade to Premium
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={() => onViewLesson(lesson)}>
              {lesson.isCompleted ? 'Review' : 'Start Learning'}
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => onLearnMore(lesson)}>
            Learn More
          </Button>
        </div>
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
    </Card>
  );
};

const Lessons = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('all');
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
    navigate(`/lessons/${lesson.id}`);
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
  
  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      if (selectedTab === 'free') return !lesson.isPremium;
      if (selectedTab === 'premium') return lesson.isPremium;
      if (selectedTab === 'completed') return lesson.isCompleted;
      return true;
    });
  }, [lessons, selectedTab]);

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
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Lessons from the Tariqa
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover the timeless wisdom of Shaykh Hassan Cisse (RA) and the sacred teachings of Tariqa Tijaniyya
            </p>
            <Button variant="hero" size="lg" onClick={() => navigate('/premium-pricing')}>
              Upgrade to Premium Access
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all">All Lessons</TabsTrigger>
              <TabsTrigger value="free">Free Content</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedTab}>
              {filteredLessons.length === 0 ? (
                <EmptyState
                  title="No lessons found"
                  description={`No lessons match your current filter. Try selecting a different category.`}
                  icon={<BookOpen className="h-16 w-16 text-gray-400" />}
                  action={{
                    label: "View All Lessons",
                    onClick: () => setSelectedTab('all')
                  }}
                />
              ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLessons.map((lesson) => (
                      <LessonCard key={lesson.id} lesson={lesson} onLearnMore={handleLearnMore} onViewLesson={handleViewLesson} />
                    ))}
                  </div>
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