import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, CheckCircle, Mail, Download } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  maxAttendees?: number;
  registered?: number;
  organizer: string;
  cost?: number;
  isFree?: boolean;
  imageUrl?: string;
  tags?: string[];
}

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  dietaryRestrictions: string;
  accessibilityNeeds: string;
  additionalNotes: string;
  agreeToTerms: boolean;
  agreeToPhotos: boolean;
}

interface RegistrationSuccessModalProps {
  event: Event | null;
  registrationData: RegistrationData | null;
  isOpen: boolean;
  onClose: () => void;
  onDownloadConfirmation: () => void;
}

const RegistrationSuccessModal = ({ 
  event, 
  registrationData, 
  isOpen, 
  onClose, 
  onDownloadConfirmation 
}: RegistrationSuccessModalProps) => {
  if (!event || !registrationData) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const generateConfirmationContent = () => {
    return `
GRAND ZAWIYAH CONNECT
Event Registration Confirmation

Registration ID: ${event.id}-${Date.now()}
Event: ${event.title}
Date: ${formatDate(event.date)}
Time: ${formatTime(event.time)}
Location: ${event.location}

REGISTRANT INFORMATION:
Name: ${registrationData.firstName} ${registrationData.lastName}
Email: ${registrationData.email}
Phone: ${registrationData.phone}

EMERGENCY CONTACT:
Name: ${registrationData.emergencyContact}
Phone: ${registrationData.emergencyPhone}

ADDITIONAL INFORMATION:
${registrationData.dietaryRestrictions ? `Dietary Restrictions: ${registrationData.dietaryRestrictions}` : ''}
${registrationData.accessibilityNeeds ? `Accessibility Needs: ${registrationData.accessibilityNeeds}` : ''}
${registrationData.additionalNotes ? `Additional Notes: ${registrationData.additionalNotes}` : ''}

IMPORTANT REMINDERS:
- Please arrive 15 minutes before the event starts
- Bring a valid ID for verification
- Contact us if you need to cancel or make changes
- Check your email for any updates or changes

Thank you for registering with Grand Zawiyah Connect!
For questions, contact: events@grandzawiyah.org

This confirmation was generated on ${new Date().toLocaleString()}
    `.trim();
  };

  const handleDownloadConfirmation = () => {
    const content = generateConfirmationContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `event-registration-${event.id}-${registrationData.firstName}-${registrationData.lastName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onDownloadConfirmation();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-6 w-6" />
            Registration Successful!
          </DialogTitle>
          <DialogDescription>
            You have successfully registered for "{event.title}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-800">Registration Confirmed</h3>
                <p className="text-sm text-green-700 mt-1">
                  Thank you, {registrationData.firstName}! Your registration has been confirmed. 
                  You will receive a confirmation email shortly at {registrationData.email}.
                </p>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-3">Event Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{formatTime(event.time)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>Confirmation sent to {registrationData.email}</span>
              </div>
            </div>
          </div>

          {/* Important Reminders */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Important Reminders</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Please arrive 15 minutes before the event starts</li>
              <li>• Bring a valid ID for verification</li>
              <li>• Contact us if you need to cancel or make changes</li>
              <li>• Check your email for any updates or changes</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-center text-sm text-muted-foreground">
            <p>For questions or changes, contact us at:</p>
            <p className="font-medium">events@grandzawiyah.org</p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={handleDownloadConfirmation}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Confirmation
          </Button>
          <Button onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationSuccessModal;
