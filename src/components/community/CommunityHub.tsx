import React, { useState } from 'react';
import { Users, Calendar, Briefcase, Home, GraduationCap, Heart, MessageSquare, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CommunityResource {
  id: string;
  title: string;
  description: string;
  type: 'job' | 'housing' | 'scholarship' | 'health' | 'marketplace';
  location?: string;
  postedBy: string;
  postedDate: string;
  status: 'active' | 'filled' | 'expired';
  applications?: number;
}

interface CommunityMember {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  location: string;
  skills: string[];
  joinDate: string;
}

export function CommunityHub() {
  const [activeTab, setActiveTab] = useState('resources');

  const mockResources: CommunityResource[] = [
    {
      id: '1',
      title: 'Software Engineer - Remote',
      description: 'Looking for a senior software engineer to join our Islamic fintech startup...',
      type: 'job',
      location: 'Remote',
      postedBy: 'Ahmad Hassan',
      postedDate: '2 days ago',
      status: 'active',
      applications: 12
    },
    {
      id: '2',
      title: '2BR Apartment Near Mosque',
      description: 'Beautiful apartment for rent, walking distance to Islamic Center...',
      type: 'housing',
      location: 'Toronto, ON',
      postedBy: 'Fatima Ali',
      postedDate: '1 week ago',
      status: 'active'
    },
    {
      id: '3',
      title: 'Islamic Studies Scholarship',
      description: 'Full scholarship available for Islamic studies program at local university...',
      type: 'scholarship',
      location: 'New York, NY',
      postedBy: 'Dr. Omar Ibrahim',
      postedDate: '3 days ago',
      status: 'active',
      applications: 8
    },
    {
      id: '4',
      title: 'Muslim-Friendly Family Doctor',
      description: 'Experienced family physician accepting new patients, understands Islamic practices...',
      type: 'health',
      location: 'London, UK',
      postedBy: 'Dr. Aisha Khan',
      postedDate: '5 days ago',
      status: 'active'
    }
  ];

  const mockMembers: CommunityMember[] = [
    {
      id: '1',
      name: 'Ahmad Hassan',
      role: 'Software Engineer',
      location: 'Toronto, Canada',
      skills: ['React', 'Node.js', 'Islamic Finance'],
      joinDate: 'Jan 2024'
    },
    {
      id: '2',
      name: 'Fatima Al-Zahra',
      role: 'Community Organizer',
      location: 'London, UK',
      skills: ['Event Planning', 'Public Speaking', 'Arabic'],
      joinDate: 'Dec 2023'
    },
    {
      id: '3',
      name: 'Omar Ibn Khattab',
      role: 'Islamic Scholar',
      location: 'New York, USA',
      skills: ['Quran Recitation', 'Hadith Studies', 'Counseling'],
      joinDate: 'Nov 2023'
    }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'job': return <Briefcase className="h-4 w-4" />;
      case 'housing': return <Home className="h-4 w-4" />;
      case 'scholarship': return <GraduationCap className="h-4 w-4" />;
      case 'health': return <Heart className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'job': return 'bg-blue-100 text-blue-800';
      case 'housing': return 'bg-green-100 text-green-800';
      case 'scholarship': return 'bg-purple-100 text-purple-800';
      case 'health': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Community Hub</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Connect with fellow community members, find opportunities, and support each other 
          in our shared journey of faith and growth.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="resources" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Community Resources</h2>
            <Button>Post Resource</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge 
                      variant="secondary" 
                      className={`${getResourceColor(resource.type)} flex items-center gap-1`}
                    >
                      {getResourceIcon(resource.type)}
                      {resource.type}
                    </Badge>
                    <Badge 
                      variant={resource.status === 'active' ? 'default' : 'secondary'}
                    >
                      {resource.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  {resource.location && (
                    <CardDescription>{resource.location}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>By {resource.postedBy}</span>
                    <span>{resource.postedDate}</span>
                  </div>
                  
                  {resource.applications && (
                    <div className="text-xs text-muted-foreground">
                      {resource.applications} applications
                    </div>
                  )}
                  
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Community Members</h2>
            <Button>Join Community</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      <p className="text-xs text-muted-foreground">{member.location}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Joined {member.joinDate}
                    </span>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="discussions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Community Discussions</h2>
            <Button>Start Discussion</Button>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Best practices for Islamic investment",
                author: "Ahmad Hassan",
                replies: 12,
                lastActivity: "2 hours ago",
                category: "Finance"
              },
              {
                title: "Organizing community Iftar events",
                author: "Fatima Al-Zahra",
                replies: 8,
                lastActivity: "1 day ago",
                category: "Events"
              },
              {
                title: "Teaching children Quran recitation",
                author: "Omar Ibn Khattab",
                replies: 15,
                lastActivity: "3 days ago",
                category: "Education"
              }
            ].map((discussion, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{discussion.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {discussion.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>By {discussion.author}</span>
                        <span>{discussion.replies} replies</span>
                        <span>Last activity {discussion.lastActivity}</span>
                      </div>
                    </div>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Upcoming Community Events</h2>
            <Button>Create Event</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Weekly Dhikr Circle",
                date: "Every Friday, 7:00 PM",
                location: "Community Center",
                attendees: 45,
                description: "Join us for our weekly remembrance gathering..."
              },
              {
                title: "Youth Islamic Leadership Workshop",
                date: "March 15, 2024",
                location: "Grand Zawiyah",
                attendees: 23,
                description: "Empowering young Muslims to become community leaders..."
              },
              {
                title: "Community Iftar",
                date: "March 20, 2024",
                location: "Main Hall",
                attendees: 120,
                description: "Breaking fast together as one ummah..."
              }
            ].map((event, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{event.date}</p>
                      <p className="text-sm text-muted-foreground mb-2">{event.location}</p>
                      <p className="text-sm mb-4">{event.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {event.attendees} attending
                        </div>
                        <Button variant="outline" size="sm">
                          RSVP
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}