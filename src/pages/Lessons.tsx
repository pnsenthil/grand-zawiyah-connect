import { useState } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Play, Lock, Clock, BookOpen, Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'audio' | 'text';
  level: 'beginner' | 'intermediate' | 'advanced';
  isPremium: boolean;
  isCompleted: boolean;
  rating: number;
  thumbnail?: string;
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
    rating: 4.8
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
    rating: 4.9
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
    rating: 4.7
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
    rating: 4.6
  }
];

const LessonCard = ({ lesson }: { lesson: Lesson }) => {
  const getTypeIcon = () => {
    switch (lesson.type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'audio': return <BookOpen className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
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
          <Clock className="h-4 w-4" />
          {lesson.duration}
        </div>
        
        <div className="flex gap-2">
          {lesson.isPremium && !lesson.isCompleted ? (
            <Button variant="legacy" size="sm">
              Upgrade to Premium
            </Button>
          ) : (
            <Button variant="primary" size="sm">
              {lesson.isCompleted ? 'Review' : 'Start Learning'}
            </Button>
          )}
        </div>
      </div>
      
      {lesson.isCompleted && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600 font-medium">✓ Completed</span>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Certificate
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

const Lessons = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  
  const filteredLessons = mockLessons.filter(lesson => {
    if (selectedTab === 'free') return !lesson.isPremium;
    if (selectedTab === 'premium') return lesson.isPremium;
    if (selectedTab === 'completed') return lesson.isCompleted;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
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
            <Button variant="hero" size="lg">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLessons.map((lesson) => (
                  <LessonCard key={lesson.id} lesson={lesson} />
                ))}
              </div>
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
              <Button variant="primary" size="lg">
                Subscribe for $19/month
              </Button>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Lessons;