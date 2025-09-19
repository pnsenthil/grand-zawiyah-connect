import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { 
  Play, 
  Clock, 
  Star, 
  BookOpen, 
  Users, 
  Download,
  Lock,
  CheckCircle,
  ArrowRight,
  X
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'text' | 'interactive';
  duration: string;
  isPremium: boolean;
  isCompleted: boolean;
  rating: number;
  instructor?: string;
  longDescription?: string;
  modules?: { title: string; duration: string; }[];
  prerequisites?: string[];
  learningObjectives?: string[];
}

interface LessonDetailsModalProps {
  lesson: Lesson | null;
  isOpen: boolean;
  onClose: () => void;
  onUpgradeToPremium: () => void;
}

const LessonDetailsModal = ({ lesson, isOpen, onClose, onUpgradeToPremium }: LessonDetailsModalProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  if (!lesson) return null;

  const getTypeIcon = () => {
    switch (lesson.type) {
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'audio':
        return <BookOpen className="h-4 w-4" />;
      case 'text':
        return <BookOpen className="h-4 w-4" />;
      case 'interactive':
        return <Users className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = () => {
    switch (lesson.type) {
      case 'video':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'audio':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'text':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'interactive':
        return 'bg-legacy/10 text-legacy border-legacy/20 border';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStartLearning = () => {
    if (lesson.isPremium && !lesson.isCompleted) {
      onUpgradeToPremium();
    } else {
      // Navigate to lesson content
      navigate(`/lessons/${lesson.id}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground mb-2">
            {lesson.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {lesson.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lesson Info */}
          <div className="flex flex-wrap items-center gap-4">
            <Badge className={`${getTypeColor()} flex items-center gap-1`}>
              {getTypeIcon()}
              {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {lesson.duration}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {lesson.rating}
            </div>
            {lesson.instructor && (
              <div className="text-sm text-muted-foreground">
                by {lesson.instructor}
              </div>
            )}
            {lesson.isPremium && (
              <Badge variant="secondary" className="bg-legacy/10 text-legacy border-legacy/20">
                <Lock className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            )}
            {lesson.isCompleted && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="prerequisites">Prerequisites</TabsTrigger>
              <TabsTrigger value="objectives">Objectives</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>About This Lesson</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {lesson.longDescription || lesson.description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lesson Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium capitalize">{lesson.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{lesson.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{lesson.rating}</span>
                    </div>
                  </div>
                  {lesson.instructor && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Instructor:</span>
                      <span className="font-medium">{lesson.instructor}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Modules</CardTitle>
                  <CardDescription>
                    This lesson is divided into the following modules:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {lesson.modules && lesson.modules.length > 0 ? (
                    <div className="space-y-3">
                      {lesson.modules.map((module, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                              {index + 1}
                            </div>
                            <span className="font-medium">{module.title}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {module.duration}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No modules available for this lesson.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prerequisites" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                  <CardDescription>
                    What you should know before starting this lesson:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {lesson.prerequisites && lesson.prerequisites.length > 0 ? (
                    <ul className="space-y-2">
                      {lesson.prerequisites.map((prerequisite, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{prerequisite}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No prerequisites required for this lesson.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="objectives" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Objectives</CardTitle>
                  <CardDescription>
                    What you will learn from this lesson:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {lesson.learningObjectives && lesson.learningObjectives.length > 0 ? (
                    <ul className="space-y-2">
                      {lesson.learningObjectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No learning objectives specified for this lesson.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button 
              onClick={handleStartLearning}
              className="flex-1"
              variant={lesson.isPremium && !lesson.isCompleted ? "outline" : "default"}
            >
              {lesson.isPremium && !lesson.isCompleted ? (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Upgrade to Access
                </>
              ) : lesson.isCompleted ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Review Lesson
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Learning
                </>
              )}
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Resources
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LessonDetailsModal;
