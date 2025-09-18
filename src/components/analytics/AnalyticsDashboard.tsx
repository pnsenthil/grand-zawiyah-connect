import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Users, 
  Eye, 
  MousePointer, 
  TrendingUp, 
  RefreshCw,
  Download,
  Filter
} from "lucide-react";
import { analyticsService } from "@/services/analyticsService";

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [sessionStats, setSessionStats] = useState<any>(null);
  const [funnelRates, setFunnelRates] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = () => {
    setIsLoading(true);
    
    // Remove artificial delay for better performance
    const data = analyticsService.getAnalyticsData();
    const stats = analyticsService.getSessionStats();
    const funnel = analyticsService.getFunnelConversionRates();
    
    setAnalyticsData(data);
    setSessionStats(stats);
    setFunnelRates(funnel);
    setIsLoading(false);
  };

  const exportAnalyticsData = () => {
    const data = {
      analytics: analyticsData,
      sessionStats,
      funnelRates,
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-legacy" />
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track user engagement and donation funnel performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadAnalyticsData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportAnalyticsData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(sessionStats?.totalSessions || 0)}</div>
            <p className="text-xs text-muted-foreground">
              Current session: {formatDuration(sessionStats?.currentSessionDuration || 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(sessionStats?.totalPageViews || 0)}</div>
            <p className="text-xs text-muted-foreground">
              Avg per session: {((sessionStats?.totalPageViews || 0) / (sessionStats?.totalSessions || 1)).toFixed(1)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(sessionStats?.totalEvents || 0)}</div>
            <p className="text-xs text-muted-foreground">
              Avg per session: {((sessionStats?.totalEvents || 0) / (sessionStats?.totalSessions || 1)).toFixed(1)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Session Duration</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatDuration(sessionStats?.averageSessionDuration || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Current: {formatDuration(sessionStats?.currentSessionDuration || 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Donation Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Donation Funnel Conversion Rates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Landing Page</span>
              <div className="flex items-center gap-2">
                <Progress value={100} className="w-24" />
                <Badge variant="secondary">100%</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Amount Selection</span>
              <div className="flex items-center gap-2">
                <Progress value={(funnelRates?.amountSelection || 0) * 100} className="w-24" />
                <Badge variant="secondary">{formatPercentage(funnelRates?.amountSelection || 0)}</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Payment Form</span>
              <div className="flex items-center gap-2">
                <Progress value={(funnelRates?.paymentForm || 0) * 100} className="w-24" />
                <Badge variant="secondary">{formatPercentage(funnelRates?.paymentForm || 0)}</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Payment Processing</span>
              <div className="flex items-center gap-2">
                <Progress value={(funnelRates?.paymentProcessing || 0) * 100} className="w-24" />
                <Badge variant="secondary">{formatPercentage(funnelRates?.paymentProcessing || 0)}</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Success</span>
              <div className="flex items-center gap-2">
                <Progress value={(funnelRates?.success || 0) * 100} className="w-24" />
                <Badge variant="secondary">{formatPercentage(funnelRates?.success || 0)}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Recent Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          {analyticsData?.events && analyticsData.events.length > 0 ? (
            <div className="space-y-2">
              {analyticsData.events.slice(-10).reverse().map((event: any) => (
                <div key={event.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">{event.event}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="outline">{event.page}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No events tracked yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Session Information */}
      <Card>
        <CardHeader>
          <CardTitle>Current Session</CardTitle>
        </CardHeader>
        <CardContent>
          {analyticsData?.currentSession ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Session ID:</span>
                  <p className="text-muted-foreground font-mono text-xs">
                    {analyticsData.currentSession.id}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Started:</span>
                  <p className="text-muted-foreground">
                    {new Date(analyticsData.currentSession.startTime).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Page Views:</span>
                  <p className="text-muted-foreground">{analyticsData.currentSession.pageViews}</p>
                </div>
                <div>
                  <span className="font-medium">Events:</span>
                  <p className="text-muted-foreground">{analyticsData.currentSession.events}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No active session</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
