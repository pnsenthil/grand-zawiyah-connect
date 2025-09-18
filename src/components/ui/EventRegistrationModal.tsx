import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Clock, MapPin, Users, CheckCircle, X } from "lucide-react";

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

interface EventRegistrationModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (registrationData: RegistrationData) => void;
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

const EventRegistrationModal = ({ event, isOpen, onClose, onConfirm }: EventRegistrationModalProps) => {
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    emergencyContact: '',
    emergencyPhone: '',
    dietaryRestrictions: '',
    accessibilityNeeds: '',
    additionalNotes: '',
    agreeToTerms: false,
    agreeToPhotos: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<RegistrationData>>({});

  if (!event) return null;

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

  const getSpotsRemaining = () => {
    if (!event.maxAttendees) return null;
    return event.maxAttendees - (event.registered || 0);
  };

  const isRegistrationOpen = () => {
    const eventDate = new Date(event.date);
    const now = new Date();
    return eventDate > now;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegistrationData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency contact phone is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onConfirm(formData);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof RegistrationData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Register for Event
          </DialogTitle>
          <DialogDescription>
            Complete the form below to register for "{event.title}"
          </DialogDescription>
        </DialogHeader>

        {/* Event Summary */}
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-lg mb-3">{event.title}</h3>
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
            {event.maxAttendees && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span>{getSpotsRemaining()} spots remaining</span>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Emergency Contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  className={errors.emergencyContact ? 'border-red-500' : ''}
                />
                {errors.emergencyContact && <p className="text-sm text-red-500">{errors.emergencyContact}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                  className={errors.emergencyPhone ? 'border-red-500' : ''}
                />
                {errors.emergencyPhone && <p className="text-sm text-red-500">{errors.emergencyPhone}</p>}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Additional Information</h4>
            <div className="space-y-2">
              <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
              <Input
                id="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                placeholder="Any dietary restrictions or allergies"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accessibilityNeeds">Accessibility Needs</Label>
              <Input
                id="accessibilityNeeds"
                value={formData.accessibilityNeeds}
                onChange={(e) => handleInputChange('accessibilityNeeds', e.target.value)}
                placeholder="Any accessibility accommodations needed"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                placeholder="Any additional information or questions"
                rows={3}
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Terms and Conditions</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  I agree to the <a href="#" className="text-primary underline">Terms and Conditions</a> and <a href="#" className="text-primary underline">Privacy Policy</a> *
                </Label>
              </div>
              {errors.agreeToTerms && <p className="text-sm text-red-500">{errors.agreeToTerms}</p>}
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToPhotos"
                  checked={formData.agreeToPhotos}
                  onCheckedChange={(checked) => handleInputChange('agreeToPhotos', checked as boolean)}
                />
                <Label htmlFor="agreeToPhotos" className="text-sm">
                  I consent to being photographed or recorded during the event for promotional purposes
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !isRegistrationOpen() || (event.maxAttendees && getSpotsRemaining() === 0)}
              className="min-w-[120px]"
            >
              {isSubmitting ? 'Registering...' : 'Confirm Registration'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationModal;
