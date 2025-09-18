import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, CreditCard, Heart, Shield } from 'lucide-react';

interface DonationAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onContinueAsGuest: () => void;
  campaign?: {
    name: string;
    description: string;
  };
}

const DonationAuthModal = ({ 
  isOpen, 
  onClose, 
  onLogin, 
  onContinueAsGuest, 
  campaign 
}: DonationAuthModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Continue Your Donation
          </DialogTitle>
          <DialogDescription>
            {campaign ? `You're about to donate to "${campaign.name}"` : 'You\'re about to make a donation'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {campaign && (
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-primary">
                  {campaign.name}
                </CardTitle>
                <CardDescription className="text-xs">
                  {campaign.description}
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          <div className="space-y-3">
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={onLogin}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">Sign In to Your Account</h3>
                    <p className="text-xs text-muted-foreground">
                      Track your donations, view history, and manage your giving
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={onContinueAsGuest}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CreditCard className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">Continue as Guest</h3>
                    <p className="text-xs text-muted-foreground">
                      Make your donation without creating an account
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Your payment information is secure and encrypted
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DonationAuthModal;
