import { Calendar, Clock, MapPin, Users, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface EventDetailsProps {
  event?: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    attendees: number;
    maxAttendees?: number;
    category: string;
    image?: string;
    organizer: string;
  };
}

export const EventDetails = ({ event }: EventDetailsProps) => {
  // Default event if none provided
  const defaultEvent = {
    id: '1',
    title: 'Weekly Dhikr Circle',
    description: 'Join us for our weekly dhikr gathering where we come together to remember Allah through traditional chants and spiritual reflection. This gathering is open to all levels of experience and provides a peaceful environment for spiritual growth.',
    date: '2024-09-20',
    time: '7:00 PM - 8:30 PM',
    location: 'Main Zawiyah Hall',
    attendees: 45,
    maxAttendees: 60,
    category: 'Spiritual',
    organizer: 'Shaykh Abdul Rahman'
  };

  const currentEvent = event || defaultEvent;

  return (
    <div className="space-y-8">
      {/* Event Header */}
      <Card className="p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Event Image Placeholder */}
          <div className="lg:w-1/3">
            <div className="aspect-video bg-gradient-primary rounded-lg flex items-center justify-center">
              <Calendar className="h-16 w-16 text-primary-foreground" />
            </div>
          </div>
          
          {/* Event Info */}
          <div className="lg:w-2/3 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{currentEvent.category}</Badge>
              <Badge variant="outline">
                <Users className="h-3 w-3 mr-1" />
                {currentEvent.attendees}/{currentEvent.maxAttendees || '∞'} attendees
              </Badge>
            </div>
            
            <h1 className="text-3xl font-bold text-black">{currentEvent.title}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{new Date(currentEvent.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{currentEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{currentEvent.location}</span>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              {currentEvent.description}
            </p>
            
            <div className="flex gap-3">
              <Button size="lg" className="flex-1 md:flex-none">
                Register for Event
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Event Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-black mb-4">About This Event</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our weekly dhikr circle is a cornerstone of our community's spiritual practice. 
                We gather every week to engage in the remembrance of Allah through traditional 
                chants, prayers, and collective meditation.
              </p>
              <p>
                This event is suitable for all levels of experience, from beginners who are 
                new to the tariqa to advanced practitioners. We provide guidance and support 
                to help everyone participate meaningfully.
              </p>
              <p>
                Please arrive 10 minutes early to allow for settling in and preparation. 
                Comfortable clothing and an open heart are all you need to bring.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-black mb-4">Schedule</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="font-medium">Opening & Greeting</span>
                <span className="text-muted-foreground">7:00 PM - 7:10 PM</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="font-medium">Dhikr & Chanting</span>
                <span className="text-muted-foreground">7:10 PM - 8:00 PM</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="font-medium">Reflection & Sharing</span>
                <span className="text-muted-foreground">8:00 PM - 8:20 PM</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Closing & Fellowship</span>
                <span className="text-muted-foreground">8:20 PM - 8:30 PM</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Event Organizer</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium">{currentEvent.organizer}</p>
                  <p className="text-sm text-muted-foreground">Spiritual Guide</p>
                </div>
              </div>
              <Separator />
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Location Details</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <div>
                  <p className="font-medium">{currentEvent.location}</p>
                  <p className="text-sm text-muted-foreground">
                    123 Community Center Drive<br />
                    City, State 12345
                  </p>
                </div>
              </div>
              <Separator />
              <Button variant="outline" className="w-full">
                Get Directions
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Attendees</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Registered</span>
                <span className="font-medium">{currentEvent.attendees}</span>
              </div>
              {currentEvent.maxAttendees && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available Spots</span>
                  <span className="font-medium">{currentEvent.maxAttendees - currentEvent.attendees}</span>
                </div>
              )}
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div 
                    key={i} 
                    className="w-8 h-8 bg-gradient-primary rounded-full border-2 border-background flex items-center justify-center text-xs text-primary-foreground font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
                {currentEvent.attendees > 5 && (
                  <div className="w-8 h-8 bg-muted rounded-full border-2 border-background flex items-center justify-center text-xs font-medium">
                    +{currentEvent.attendees - 5}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};