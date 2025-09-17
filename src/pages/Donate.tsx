import React from 'react';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { RoundUpGiving } from '@/components/financial/RoundUpGiving';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, CreditCard, Calendar, Target, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

const campaigns = [
  {
    id: 'zawiyah',
    name: 'Grand Zawiyah Construction',
    description: 'Building the main zawiyah for community gatherings and education',
    raised: 125000,
    goal: 500000,
    donors: 234
  },
  {
    id: 'education', 
    name: 'Islamic Education Fund',
    description: 'Supporting online and in-person Islamic education programs',
    raised: 45000,
    goal: 100000,
    donors: 156
  },
  {
    id: 'charity',
    name: 'Community Support',
    description: 'Helping families in need within our global community',
    raised: 78000,
    goal: 150000,
    donors: 189
  }
];

const DonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [selectedCampaign, setSelectedCampaign] = useState('zawiyah');

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getCurrentAmount = () => {
    return selectedAmount || parseFloat(customAmount) || 0;
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6">Make a Donation</h3>
      
      {/* Campaign Selection */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-3 block">Choose Campaign</Label>
        <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {campaigns.map(campaign => (
              <SelectItem key={campaign.id} value={campaign.id}>
                {campaign.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Amount Selection */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-3 block">Donation Amount</Label>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {predefinedAmounts.map(amount => (
            <Button
              key={amount}
              variant={selectedAmount === amount ? "default" : "outline"}
              onClick={() => handleAmountSelect(amount)}
              className="h-12"
            >
              ${amount}
            </Button>
          ))}
        </div>
        <div>
          <Input
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            type="number"
            min="1"
          />
        </div>
      </div>

      {/* Frequency Selection */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-3 block">Donation Frequency</Label>
        <Tabs value={frequency} onValueChange={setFrequency}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="one-time">One-time</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">Annual</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Impact Preview */}
      {getCurrentAmount() > 0 && (
        <div className="mb-6 p-4 bg-accent/10 rounded-lg">
          <h4 className="font-medium mb-2">Your Impact</h4>
          <p className="text-sm text-muted-foreground">
            Your ${getCurrentAmount()} {frequency === 'monthly' ? 'monthly' : frequency === 'annual' ? 'annual' : ''} donation will help:
          </p>
          <ul className="text-sm text-muted-foreground mt-2 space-y-1">
            <li>• Support community programs and education</li>
            <li>• Maintain zawiyah facilities and resources</li>
            <li>• Provide assistance to families in need</li>
          </ul>
        </div>
      )}

      <Button size="lg" className="w-full" disabled={getCurrentAmount() === 0}>
        <CreditCard className="h-5 w-5 mr-2" />
        Donate ${getCurrentAmount() || 0} {frequency !== 'one-time' ? `/${frequency.replace('ly', '')}` : ''}
      </Button>
    </Card>
  );
};

export default function Donate() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">Support Our Mission</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your generous donations help us build a stronger community and continue our spiritual journey together.
          </p>
        </div>
        
        <Tabs defaultValue="one-time" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="one-time">One-Time</TabsTrigger>
            <TabsTrigger value="recurring">Recurring</TabsTrigger>
            <TabsTrigger value="round-up">Round-Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="one-time" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <DonationForm />
              <div className="space-y-6">
                {campaigns.map(campaign => {
                  const progressPercentage = (campaign.raised / campaign.goal) * 100;
                  return (
                    <Card key={campaign.id} className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{campaign.name}</h3>
                      <p className="text-muted-foreground mb-4">{campaign.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">${campaign.raised.toLocaleString()} raised</span>
                          <span className="text-muted-foreground">${campaign.goal.toLocaleString()} goal</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3">
                          <div 
                            className="bg-primary h-3 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm mt-2">
                          <span className="text-primary font-medium">{progressPercentage.toFixed(1)}% complete</span>
                          <span className="text-muted-foreground">{campaign.donors} donors</span>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recurring" className="space-y-6">
            <div className="text-center py-20">
              <p className="text-muted-foreground">Recurring donation setup coming soon...</p>
            </div>
          </TabsContent>
          
          <TabsContent value="round-up" className="space-y-6">
            <RoundUpGiving />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}