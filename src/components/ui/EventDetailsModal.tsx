import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Globe, Video, CheckCircle, Star, Share2 } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  isOnline: boolean;
  maxAttendees?: number;
  currentAttendees?: number;
  category?: string;
  organizer?: string;
  longDescription?: string;
  agenda?: { time: string; activity: string; }[];
  requirements?: string[];
  benefits?: string[];
  registrationDeadline?: string;
  cost?: number;
  isFree?: boolean;
  imageUrl?: string;
  tags?: string[];
}

interface EventDetailsModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister?: (event: Event) => void;
  onShare?: (event: Event) => void;
}

const EventDetailsModal = ({ event, isOpen, onClose, onRegister, onShare }: EventDetailsModalProps) => {
  if (!event) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isRegistrationOpen = () => {
    if (!event.registrationDeadline) return true;
    return new Date(event.registrationDeadline) > new Date();
  };

  const getSpotsRemaining = () => {
    if (!event.maxAttendees || !event.currentAttendees) return null;
    return event.maxAttendees - event.currentAttendees;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">{event.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {event.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {event.imageUrl && (
            <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover rounded-md" />
          )}
          
          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-medium">{formatTime(event.time)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {event.isOnline ? (
                  <Globe className="h-4 w-4 text-primary" />
                ) : (
                  <MapPin className="h-4 w-4 text-primary" />
                )}
                <span className="font-medium">{event.location}</span>
                {event.isOnline && <Badge variant="secondary" className="ml-2">Online</Badge>}
              </div>
              {event.organizer && (
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-medium">Organized by {event.organizer}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              {event.category && (
                <div>
                  <Badge variant="outline" className="capitalize">{event.category}</Badge>
                </div>
              )}
              {event.cost !== undefined && (
                <div className="text-sm">
                  <span className="font-medium">
                    {event.isFree ? 'Free Event' : `$${event.cost}`}
                  </span>
                </div>
              )}
              {event.maxAttendees && (
                <div className="text-sm">
                  <span className="font-medium">
                    {event.currentAttendees || 0} / {event.maxAttendees} attendees
                  </span>
                  {getSpotsRemaining() !== null && getSpotsRemaining()! > 0 && (
                    <span className="text-muted-foreground ml-2">
                      ({getSpotsRemaining()} spots remaining)
                    </span>
                  )}
                </div>
              )}
              {event.registrationDeadline && (
                <div className="text-sm">
                  <span className="font-medium">
                    Registration closes: {formatDate(event.registrationDeadline)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Long Description */}
          {event.longDescription && (
            <div>
              <h4 className="font-semibold text-foreground mb-2">About This Event</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{event.longDescription}</p>
            </div>
          )}

          {/* Agenda */}
          {event.agenda && event.agenda.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-2">Event Agenda</h4>
              <div className="space-y-2">
                {event.agenda.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className="w-16 text-muted-foreground font-medium">{item.time}</div>
                    <div className="flex-1">{item.activity}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {event.benefits && event.benefits.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-2">What You'll Gain</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                {event.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" /> {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {event.requirements && event.requirements.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-2">Requirements</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                {event.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" /> {requirement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div className="flex gap-2">
            {onShare && (
              <Button 
                variant="outline" 
                onClick={() => onShare(event)}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share Event
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            {onRegister && isRegistrationOpen() && (
              <Button 
                variant="primary" 
                onClick={() => onRegister(event)}
                disabled={event.maxAttendees && getSpotsRemaining() === 0}
              >
                {event.maxAttendees && getSpotsRemaining() === 0 ? 'Event Full' : 'Register Now'}
              </Button>
            )}
            {!isRegistrationOpen() && (
              <Button variant="outline" disabled>
                Registration Closed
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
