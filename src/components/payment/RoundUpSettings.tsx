import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Pause, Play, Settings, TrendingUp } from "lucide-react";
import { mockPaymentService, RoundUpSettings, PaymentMethod } from "@/services/mockPaymentService";

const RoundUpSettings = () => {
  const [settings, setSettings] = useState<RoundUpSettings>({
    isEnabled: false,
    monthlyCap: 50,
    isPaused: false,
    totalRoundUp: 0,
    thisMonthRoundUp: 0
  });
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [settingsData, paymentMethodsData] = await Promise.all([
        mockPaymentService.getRoundUpSettings(),
        mockPaymentService.getPaymentMethods()
      ]);
      setSettings(settingsData);
      setPaymentMethods(paymentMethodsData);
    } catch (error) {
      console.error('Failed to load round-up data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleRoundUp = async (enabled: boolean) => {
    setIsUpdating(true);
    try {
      const updatedSettings = await mockPaymentService.updateRoundUpSettings({
        isEnabled: enabled,
        isPaused: enabled ? false : settings.isPaused
      });
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Failed to update round-up settings:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleTogglePause = async (paused: boolean) => {
    setIsUpdating(true);
    try {
      const updatedSettings = await mockPaymentService.updateRoundUpSettings({
        isPaused: paused
      });
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Failed to update pause status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCapChange = async (cap: number) => {
    setIsUpdating(true);
    try {
      const updatedSettings = await mockPaymentService.updateRoundUpSettings({
        monthlyCap: cap
      });
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Failed to update monthly cap:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLinkCard = async (cardId: string) => {
    setIsUpdating(true);
    try {
      const updatedSettings = await mockPaymentService.updateRoundUpSettings({
        linkedCardId: cardId
      });
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Failed to link card:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-legacy mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading round-up settings...</p>
        </CardContent>
      </Card>
    );
  }

  const progressPercentage = settings.monthlyCap > 0 ? (settings.thisMonthRoundUp / settings.monthlyCap) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Round-Up Settings</h1>
        <p className="text-muted-foreground">
          Automatically round up your purchases and donate the change to support our mission.
        </p>
      </div>

      {/* Main Settings Card */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Round-Up Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h3 className="font-semibold text-foreground">Enable Round-Up</h3>
              <p className="text-sm text-muted-foreground">
                Automatically round up purchases to the next dollar
              </p>
            </div>
            <Switch
              checked={settings.isEnabled}
              onCheckedChange={handleToggleRoundUp}
              disabled={isUpdating}
            />
          </div>

          {/* Pause/Resume Toggle */}
          {settings.isEnabled && (
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h3 className="font-semibold text-foreground">Pause Round-Up</h3>
                <p className="text-sm text-muted-foreground">
                  Temporarily stop round-up donations
                </p>
              </div>
              <Switch
                checked={settings.isPaused}
                onCheckedChange={handleTogglePause}
                disabled={isUpdating}
              />
            </div>
          )}

          {/* Monthly Cap */}
          {settings.isEnabled && (
            <div className="space-y-3">
              <Label htmlFor="monthly-cap">Monthly Cap</Label>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">$</span>
                <Input
                  id="monthly-cap"
                  type="number"
                  min="0"
                  max="1000"
                  value={settings.monthlyCap}
                  onChange={(e) => handleCapChange(parseInt(e.target.value) || 0)}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground">per month</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Set a maximum amount to donate through round-ups each month
              </p>
            </div>
          )}

          {/* Linked Card */}
          {settings.isEnabled && (
            <div className="space-y-3">
              <Label>Linked Payment Method</Label>
              {paymentMethods.length > 0 ? (
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                        settings.linkedCardId === method.id
                          ? 'border-legacy bg-legacy/5'
                          : 'border-border hover:border-legacy/50'
                      }`}
                      onClick={() => handleLinkCard(method.id)}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            {method.brand} •••• {method.last4}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Expires {method.expiryMonth}/{method.expiryYear}
                          </p>
                        </div>
                      </div>
                      {settings.linkedCardId === method.id && (
                        <div className="w-2 h-2 bg-legacy rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 border border-dashed border-border rounded-lg text-center">
                  <CreditCard className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No payment methods found. Add a payment method to enable round-up.
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistics Card */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Your Round-Up Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Monthly Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">This Month</span>
              <span className="text-sm text-muted-foreground">
                ${settings.thisMonthRoundUp} / ${settings.monthlyCap}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {progressPercentage.toFixed(1)}% of monthly cap reached
            </p>
          </div>

          {/* Total Impact */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-legacy/5 rounded-lg border border-legacy/20">
              <h3 className="font-semibold text-legacy mb-1">Total Round-Up</h3>
              <p className="text-2xl font-bold text-foreground">${settings.totalRoundUp}</p>
              <p className="text-xs text-muted-foreground">All time</p>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <h3 className="font-semibold text-primary mb-1">This Month</h3>
              <p className="text-2xl font-bold text-foreground">${settings.thisMonthRoundUp}</p>
              <p className="text-xs text-muted-foreground">Current month</p>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-muted">
            {settings.isEnabled ? (
              settings.isPaused ? (
                <>
                  <Pause className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-600">Round-Up Paused</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Round-Up Active</span>
                </>
              )
            ) : (
              <>
                <Pause className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Round-Up Disabled</span>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>How Round-Up Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-legacy text-legacy-foreground rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-medium">Link Your Card</h4>
                <p className="text-sm text-muted-foreground">
                  Connect your debit or credit card to enable round-up donations.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-legacy text-legacy-foreground rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-medium">Automatic Rounding</h4>
                <p className="text-sm text-muted-foreground">
                  When you make a purchase, we round up to the next dollar and donate the difference.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-legacy text-legacy-foreground rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-medium">Track Your Impact</h4>
                <p className="text-sm text-muted-foreground">
                  Monitor your round-up donations and see how your small change makes a big difference.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoundUpSettings;
