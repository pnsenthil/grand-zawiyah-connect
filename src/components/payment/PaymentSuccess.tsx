import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, Share2, Heart } from "lucide-react";

interface PaymentSuccessProps {
  transactionId: string;
  amount: number;
  campaign: string;
  onClose: () => void;
}

const PaymentSuccess = ({ transactionId, amount, campaign, onClose }: PaymentSuccessProps) => {
  const handleDownloadReceipt = () => {
    // In a real app, this would download the actual receipt
    console.log('Downloading receipt for transaction:', transactionId);
    // For demo purposes, we'll just show an alert
    alert('Receipt download started! (This is a demo)');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'I just donated to Grand Zawiyah!',
        text: `I just donated $${amount} to ${campaign}. Join me in supporting this important cause!`,
        url: window.location.origin
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `I just donated $${amount} to ${campaign} at Grand Zawiyah! Join me in supporting this important cause: ${window.location.origin}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Share text copied to clipboard!');
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Success Message */}
          <div className="text-center">
            <p className="text-lg font-medium text-foreground mb-2">
              Thank you for your generous donation!
            </p>
            <p className="text-muted-foreground">
              Your contribution of <span className="font-semibold text-legacy">${amount}</span> to{' '}
              <span className="font-semibold">{campaign}</span> has been processed successfully.
            </p>
          </div>

          {/* Transaction Details */}
          <div className="p-4 bg-legacy/5 rounded-lg border border-legacy/20">
            <h3 className="font-semibold text-foreground mb-3">Transaction Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-mono text-xs">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">${amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Campaign:</span>
                <span className="font-medium">{campaign}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Impact Message */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 text-center">
            <Heart className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-sm text-primary font-medium">
              Your donation will help us continue our mission of serving the community and preserving Islamic knowledge.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleDownloadReceipt}
              variant="outline" 
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            
            <Button 
              onClick={handleShare}
              variant="outline" 
              className="w-full"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Your Impact
            </Button>
            
            <Button 
              onClick={onClose}
              className="w-full"
            >
              Continue to Dashboard
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              A confirmation email has been sent to your registered email address.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
