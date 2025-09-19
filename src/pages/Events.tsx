import { useState } from "react";
import { Calendar, MapPin, Users, Clock, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventDetailsModal from "@/components/ui/EventDetailsModal";
import EventRegistrationModal from "@/components/ui/EventRegistrationModal";
import RegistrationSuccessModal from "@/components/ui/RegistrationSuccessModal";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'spiritual' | 'educational' | 'charity' | 'community';
  capacity: number;
  registered: number;
  isOnline: boolean;
  featured: boolean;
  image?: string;
  longDescription?: string;
  agenda?: { time: string; activity: string; }[];
  requirements?: string[];
  benefits?: string[];
  organizer?: string;
  cost?: number;
  isFree?: boolean;
  tags?: string[];
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Weekly Dhikr Circle',
    description: 'Join us for our traditional dhikr gathering with recitation of the Tijani wird.',
    date: '2024-09-20',
    time: '7:00 PM',
    location: 'Grand Zawiyah Main Hall',
    type: 'spiritual',
    capacity: 50,
    registered: 23,
    isOnline: false,
    featured: true,
    organizer: 'Shaykh Hassan Cisse Foundation',
    isFree: true,
    longDescription: 'Join our weekly spiritual gathering where we come together to recite the beautiful Tijani wird, share in dhikr, and strengthen our spiritual bonds as a community. This is a time for reflection, remembrance, and connection with Allah and our fellow believers.',
    agenda: [
      { time: '7:00 PM', activity: 'Welcome and Opening Prayer' },
      { time: '7:15 PM', activity: 'Recitation of Tijani Wird' },
      { time: '7:45 PM', activity: 'Community Dhikr' },
      { time: '8:15 PM', activity: 'Spiritual Reflection and Discussion' },
      { time: '8:45 PM', activity: 'Closing Prayer and Dua' }
    ],
    benefits: [
      'Strengthen your spiritual practice',
      'Connect with like-minded community members',
      'Learn proper recitation techniques',
      'Experience the power of collective dhikr'
    ],
    requirements: [
      'Basic understanding of Islamic prayers',
      'Respectful and reverent attitude',
      'Willingness to participate in group activities'
    ],
    tags: ['dhikr', 'spiritual', 'community', 'weekly']
  },
  {
    id: '2',
    title: 'Islamic Finance Workshop',
    description: 'Learn about halal investment principles and Islamic banking in modern times.',
    date: '2024-09-25',
    time: '2:00 PM',
    location: 'Online via Zoom',
    type: 'educational',
    capacity: 100,
    registered: 67,
    isOnline: true,
    featured: false,
    organizer: 'Islamic Finance Institute',
    cost: 25,
    isFree: false,
    longDescription: 'This comprehensive workshop covers the fundamental principles of Islamic finance, including halal investment strategies, Islamic banking products, and how to align your financial decisions with Islamic values in today\'s modern economy.',
    agenda: [
      { time: '2:00 PM', activity: 'Introduction to Islamic Finance Principles' },
      { time: '2:30 PM', activity: 'Halal Investment Options and Strategies' },
      { time: '3:15 PM', activity: 'Islamic Banking Products and Services' },
      { time: '4:00 PM', activity: 'Q&A Session and Case Studies' },
      { time: '4:30 PM', activity: 'Closing and Resources' }
    ],
    benefits: [
      'Understand Islamic financial principles',
      'Learn about halal investment opportunities',
      'Navigate Islamic banking products',
      'Make informed financial decisions aligned with Islamic values'
    ],
    requirements: [
      'Basic understanding of financial concepts',
      'Interest in Islamic finance',
      'Access to Zoom for online participation'
    ],
    tags: ['finance', 'education', 'halal', 'investment']
  },
  {
    id: '3',
    title: 'Community Iftar',
    description: 'Breaking fast together during Ramadan with the local Muslim community.',
    date: '2024-10-05',
    time: '6:30 PM', 
    location: 'Community Center',
    type: 'community',
    capacity: 200,
    registered: 145,
    isOnline: false,
    featured: true
  },
  {
    id: '4',
    title: 'Charity Drive for Yemen',
    description: 'Collecting donations and supplies for our brothers and sisters in Yemen.',
    date: '2024-09-30',
    time: '10:00 AM',
    location: 'Zawiyah Courtyard',
    type: 'charity',
    capacity: 75,
    registered: 34,
    isOnline: false,
    featured: false
  }
];

const getTypeColor = (type: Event['type']) => {
  switch (type) {
    case 'spiritual': return 'bg-legacy/10 text-legacy border border-legacy/20';
    case 'educational': return 'bg-blue-100 text-blue-800';
    case 'charity': return 'bg-green-100 text-green-800';
    case 'community': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const EventCard = ({ event, onLearnMore, onRegister }: { event: Event; onLearnMore: (event: Event) => void; onRegister: (event: Event) => void }) => {
  const availableSpots = event.capacity - event.registered;
  const isAlmostFull = availableSpots <= 5;
  
  return (
    <Card className={`p-6 card-elegant ${event.featured ? 'ring-2 ring-primary/20' : ''}`}>
      {event.featured && (
        <Badge className="mb-3 bg-gradient-primary text-primary-foreground">
          Featured Event
        </Badge>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-2">{event.title}</h3>
          <p className="text-muted-foreground mb-4">{event.description}</p>
        </div>
        <Badge className={getTypeColor(event.type)}>
          {event.type}
        </Badge>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {new Date(event.date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {event.time}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {event.location}
          {event.isOnline && <Badge variant="secondary" className="ml-2">Online</Badge>}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          {event.registered}/{event.capacity} registered
          {isAlmostFull && <Badge variant="destructive" className="ml-2">Almost Full</Badge>}
        </div>
      </div>
      
        <div className="flex gap-3">
          <Button variant="primary" className="flex-1" onClick={() => onRegister(event)}>
            Register Now
          </Button>
        <Button variant="outline" onClick={() => onLearnMore(event)}>
          Learn More
        </Button>
      </div>
      
      {event.featured && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            ⭐ This is a featured event - don't miss out!
          </p>
        </div>
      )}
    </Card>
  );
};

const Events = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>(null);
  
  const filteredEvents = mockEvents.filter(event => {
    const matchesTab = selectedTab === 'all' || event.type === selectedTab;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const featuredEvents = mockEvents.filter(event => event.featured);
  const upcomingEvents = mockEvents.slice(0, 3);

  const handleLearnMore = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleRegister = (event: Event) => {
    setSelectedEvent(event);
    setIsRegistrationModalOpen(true);
  };

  const handleRegistrationConfirm = (data: any) => {
    setRegistrationData(data);
    setIsRegistrationModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleCloseRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
    setSelectedEvent(null);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setRegistrationData(null);
    setSelectedEvent(null);
  };

  const handleShare = (event: Event) => {
    // Create share content
    const shareText = `Join me at "${event.title}" on ${event.date} at ${event.time}! ${event.description.substring(0, 100)}... #GrandZawiyah #CommunityEvents`;
    const shareUrl = window.location.origin;
    
    // Check if Web Share API is supported
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: shareText,
        url: shareUrl
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      const shareContent = `${shareText}\n\n${shareUrl}`;
      navigator.clipboard.writeText(shareContent).then(() => {
        alert('Event details copied to clipboard!');
      }).catch(() => {
        // Final fallback: show share content
        alert(`Share this:\n\n${shareContent}`);
      });
    }
    
    console.log('Sharing event:', event.id);
  };

  return (
    <>
      {/* Header */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Community Events
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join us for spiritual gatherings, educational workshops, and community service
            </p>
            <Button variant="hero" size="lg">
              Create New Event
            </Button>
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
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Events List */}
            <div className="lg:col-span-3">
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8">
                  <TabsTrigger value="all">All Events</TabsTrigger>
                  <TabsTrigger value="spiritual">Spiritual</TabsTrigger>
                  <TabsTrigger value="educational">Educational</TabsTrigger>
                  <TabsTrigger value="charity">Charity</TabsTrigger>
                  <TabsTrigger value="community">Community</TabsTrigger>
                </TabsList>
                
                <TabsContent value={selectedTab}>
                  <div className="space-y-6">
                      {filteredEvents.map((event) => (
                        <EventCard key={event.id} event={event} onLearnMore={handleLearnMore} onRegister={handleRegister} />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Featured Events */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Featured Events</h3>
                <div className="space-y-4">
                  {featuredEvents.map(event => (
                    <div key={event.id} className="border-l-4 border-primary pl-4">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Calendar
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    My Registrations
                  </Button>
                  <Button variant="primary" className="w-full justify-start">
                    Create Event
                  </Button>
                </div>
              </Card>

              {/* Upcoming Events */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Coming Up</h3>
                <div className="space-y-3">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="text-sm">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Modal */}
      <EventDetailsModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onRegister={handleRegister}
        onShare={handleShare}
      />

      {/* Event Registration Modal */}
      <EventRegistrationModal
        event={selectedEvent}
        isOpen={isRegistrationModalOpen}
        onClose={handleCloseRegistrationModal}
        onConfirm={handleRegistrationConfirm}
      />

      {/* Registration Success Modal */}
      <RegistrationSuccessModal
        event={selectedEvent}
        registrationData={registrationData}
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        onDownloadConfirmation={() => console.log('Confirmation downloaded')}
      />
    </>
  );
};

export default Events;