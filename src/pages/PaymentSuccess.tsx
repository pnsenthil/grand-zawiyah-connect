import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Share2, Home, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const sessionIdParam = searchParams.get('session_id');
    if (sessionIdParam) {
      setSessionId(sessionIdParam);
    }
  }, [searchParams]);

  const handleDownloadReceipt = () => {
    const receiptContent = `
GRAND ZAWIYAH CONNECT
Payment Receipt

Session ID: ${sessionId}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
Amount: $100.00
Campaign: Grand Zawiyah Construction
Status: Completed

Thank you for your generous donation to the Grand Zawiyah Construction project. 
Your contribution helps us build the main zawiyah for community gatherings and education.

May Allah reward you abundantly for your generosity.

---
Grand Zawiyah Connect
Building Community Through Faith
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `donation_receipt_${sessionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Grand Zawiyah Connect - Donation Complete',
      text: 'I just made a donation to support the Grand Zawiyah Construction project!',
      url: window.location.origin
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text + ' ' + shareData.url);
        alert('Donation message copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <Card className="text-center">
          <CardHeader className="pb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">
              Payment Successful!
            </CardTitle>
            <p className="text-muted-foreground">
              Thank you for your generous donation to Grand Zawiyah Construction
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Donation Details</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">$100.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Campaign:</span>
                  <span className="font-medium">Grand Zawiyah Construction</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
                {sessionId && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Session ID:</span>
                    <span className="font-mono text-xs">{sessionId}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Your donation will help us build the main zawiyah for community gatherings and education. 
                May Allah reward you abundantly for your generosity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                onClick={handleDownloadReceipt}
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="flex-1"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <div className="pt-4 border-t">
              <Button 
                variant="primary" 
                onClick={() => navigate('/')}
                className="w-full"
              >
                <Home className="h-4 w-4 mr-2" />
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
