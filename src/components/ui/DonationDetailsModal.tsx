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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  Calendar, 
  Receipt, 
  Heart, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Target,
  Download,
  Share2,
  ExternalLink
} from "lucide-react";

interface Donation {
  id: string;
  userId: string;
  amount: number;
  date: string;
  campaign: string;
  receiptUrl: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod?: string;
  frequency?: 'one-time' | 'monthly' | 'yearly';
  impact?: {
    description: string;
    beneficiaries: number;
    category: string;
  };
  taxDeductible?: boolean;
  transactionId?: string;
  notes?: string;
}

interface DonationDetailsModalProps {
  donation: Donation | null;
  isOpen: boolean;
  onClose: () => void;
  onDownloadReceipt?: (donation: Donation) => void;
  onShare?: (donation: Donation) => void;
}

const DonationDetailsModal = ({ 
  donation, 
  isOpen, 
  onClose, 
  onDownloadReceipt, 
  onShare 
}: DonationDetailsModalProps) => {
  if (!donation) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrequencyIcon = (frequency?: string) => {
    switch (frequency) {
      case 'monthly': return <Calendar className="h-4 w-4" />;
      case 'yearly': return <Calendar className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            Donation Details
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Transaction ID: {donation.transactionId || donation.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Donation Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Donation Summary</span>
                <Badge className={getStatusColor(donation.status)}>
                  {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-2xl font-bold text-primary">{formatAmount(donation.amount)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Campaign</p>
                  <p className="font-medium">{donation.campaign}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{formatDate(donation.date)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Frequency</p>
                  <div className="flex items-center gap-2">
                    {getFrequencyIcon(donation.frequency)}
                    <span className="font-medium capitalize">
                      {donation.frequency || 'One-time'}
                    </span>
                  </div>
                </div>
              </div>

              {donation.paymentMethod && (
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium">{donation.paymentMethod}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Impact Information */}
          {donation.impact && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Your Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{donation.impact.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">{donation.impact.beneficiaries}</p>
                    <p className="text-sm text-muted-foreground">Beneficiaries</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-lg font-semibold text-primary">{donation.impact.category}</p>
                    <p className="text-sm text-muted-foreground">Category</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tax Information */}
          {donation.taxDeductible && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Tax Deductible
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This donation is tax-deductible. You can use your receipt for tax purposes.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          {donation.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{donation.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Receipt Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Receipt & Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                {onDownloadReceipt && (
                  <Button 
                    variant="outline" 
                    onClick={() => onDownloadReceipt(donation)}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Receipt
                  </Button>
                )}
                
                {onShare && (
                  <Button 
                    variant="outline" 
                    onClick={() => onShare(donation)}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  onClick={() => window.open(donation.receiptUrl, '_blank')}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Receipt
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DonationDetailsModal;
