import React, { useState } from 'react';
import { CreditCard, DollarSign, TrendingUp, Settings, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface RoundUpStats {
  totalRoundedUp: number;
  transactionsThisMonth: number;
  averageRoundUp: number;
  multiplier: number;
  isActive: boolean;
}

export function RoundUpGiving() {
  const [stats, setStats] = useState<RoundUpStats>({
    totalRoundedUp: 247.83,
    transactionsThisMonth: 156,
    averageRoundUp: 0.47,
    multiplier: 1,
    isActive: true
  });

  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const handleBankConnection = async () => {
    setIsConnecting(true);
    // Simulate bank connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsConnected(true);
    setIsConnecting(false);
  };

  const handleMultiplierChange = (newMultiplier: number) => {
    setStats(prev => ({ ...prev, multiplier: newMultiplier }));
  };

  const toggleRoundUp = () => {
    setStats(prev => ({ ...prev, isActive: !prev.isActive }));
  };

  const monthlyProjection = stats.averageRoundUp * stats.transactionsThisMonth * stats.multiplier;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Round-Up Giving</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Turn your everyday purchases into meaningful donations by automatically rounding up 
          transactions and donating the spare change to Grand Zawiyah.
        </p>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Bank Account Connection
          </CardTitle>
          <CardDescription>
            Securely connect your bank account to enable automatic round-up donations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="font-medium">Bank account not connected</p>
                  <p className="text-sm text-muted-foreground">
                    Connect your account to start round-up giving
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleBankConnection}
                disabled={isConnecting}
                className="w-full"
              >
                {isConnecting ? 'Connecting...' : 'Connect Bank Account'}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                We use bank-level security and never store your banking credentials. 
                Powered by Plaid.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Chase Checking ****1234</p>
                    <p className="text-sm text-muted-foreground">Connected and monitoring</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Active
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Round-up donations</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically round up purchases
                  </p>
                </div>
                <Switch checked={stats.isActive} onCheckedChange={toggleRoundUp} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Overview */}
      {isConnected && stats.isActive && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Donated</p>
                  <p className="text-2xl font-bold">${stats.totalRoundedUp.toFixed(2)}</p>
                </div>
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Lifetime round-up donations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">{stats.transactionsThisMonth}</p>
                </div>
                <div className="h-8 w-8 bg-secondary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-secondary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Transactions processed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Round-Up</p>
                  <p className="text-2xl font-bold">${stats.averageRoundUp.toFixed(2)}</p>
                </div>
                <div className="h-8 w-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <Settings className="h-4 w-4 text-accent" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Per transaction
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Multiplier Settings */}
      {isConnected && stats.isActive && (
        <Card>
          <CardHeader>
            <CardTitle>Round-Up Multiplier</CardTitle>
            <CardDescription>
              Increase your impact by multiplying your round-up amounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((multiplier) => (
                <Button
                  key={multiplier}
                  variant={stats.multiplier === multiplier ? "default" : "outline"}
                  onClick={() => handleMultiplierChange(multiplier)}
                  className="flex flex-col gap-2 h-auto p-4"
                >
                  <span className="text-lg font-bold">{multiplier}x</span>
                  <span className="text-xs">
                    ${(stats.averageRoundUp * multiplier).toFixed(2)} avg
                  </span>
                </Button>
              ))}
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Monthly Projection</span>
                <span className="text-lg font-bold">${monthlyProjection.toFixed(2)}</span>
              </div>
              <Progress value={monthlyProjection / 100 * 100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Based on current spending patterns with {stats.multiplier}x multiplier
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Transactions */}
      {isConnected && stats.isActive && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Round-Ups</CardTitle>
            <CardDescription>
              Your latest transactions and round-up donations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { merchant: 'Whole Foods Market', amount: 47.23, roundUp: 0.77, date: '2 hours ago' },
                { merchant: 'Shell Gas Station', amount: 32.45, roundUp: 0.55, date: '1 day ago' },
                { merchant: 'Target', amount: 89.12, roundUp: 0.88, date: '2 days ago' },
                { merchant: 'Starbucks', amount: 6.75, roundUp: 0.25, date: '3 days ago' },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div>
                    <p className="font-medium">{transaction.merchant}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">${transaction.amount.toFixed(2)}</p>
                    <p className="text-sm font-medium text-primary">
                      +${(transaction.roundUp * stats.multiplier).toFixed(2)} donated
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}