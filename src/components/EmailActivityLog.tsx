import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmailLogger, EmailLog } from '@/services/emailLogger';
import { 
  Activity, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Clock,
  Download,
  Trash2,
  RefreshCw,
  Filter,
  Calendar,
  User,
  BarChart3,
  AlertCircle
} from 'lucide-react';

interface EmailActivityLogProps {
  userEmail?: string; // If provided, show only logs for this user
}

const EmailActivityLog: React.FC<EmailActivityLogProps> = ({ userEmail }) => {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<EmailLog[]>([]);
  const [filter, setFilter] = useState<'all' | 'sent' | 'failed' | 'pending'>('all');
  const [timeFilter, setTimeFilter] = useState<'1' | '7' | '30' | 'all'>('7');
  const [stats, setStats] = useState(EmailLogger.getStats());

  // Load logs on component mount and set up refresh interval
  useEffect(() => {
    refreshLogs();
    
    // Refresh logs every 30 seconds
    const interval = setInterval(refreshLogs, 30000);
    return () => clearInterval(interval);
  }, [userEmail]);

  // Apply filters when logs or filters change
  useEffect(() => {
    applyFilters();
  }, [logs, filter, timeFilter]);

  const refreshLogs = () => {
    const allLogs = userEmail ? EmailLogger.getLogsForUser(userEmail) : EmailLogger.getLogs();
    setLogs(allLogs);
    setStats(EmailLogger.getStats(parseInt(timeFilter) || 7));
  };

  const applyFilters = () => {
    let filtered = [...logs];

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(log => log.status === filter);
    }

    // Apply time filter
    if (timeFilter !== 'all') {
      const days = parseInt(timeFilter);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      filtered = filtered.filter(log => log.timestamp >= cutoffDate);
    }

    setFilteredLogs(filtered);
  };

  const handleClearLogs = () => {
    if (confirm('Are you sure you want to clear all email logs?')) {
      EmailLogger.clearLogs();
      refreshLogs();
    }
  };

  const handleExportLogs = () => {
    const data = EmailLogger.exportLogs();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `climatewatch-email-logs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: EmailLog['status']) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: EmailLog['status']) => {
    switch (status) {
      case 'sent':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Sent</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  const getTypeIcon = (type: EmailLog['type']) => {
    switch (type) {
      case 'daily':
        return <Calendar className="h-4 w-4 text-blue-600" />;
      case 'test':
        return <Mail className="h-4 w-4 text-purple-600" />;
      case 'demo':
        return <Activity className="h-4 w-4 text-orange-600" />;
    }
  };

  const formatTimestamp = (timestamp: Date): string => {
    return timestamp.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDeliveryTime = (deliveryTime?: number): string => {
    if (!deliveryTime) return 'N/A';
    return deliveryTime < 1000 ? `${deliveryTime}ms` : `${(deliveryTime / 1000).toFixed(1)}s`;
  };

  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>Email Activity Log</span>
          <Badge variant="outline">{filteredLogs.length} entries</Badge>
        </CardTitle>
        <CardDescription>
          {userEmail 
            ? `Email activity for ${userEmail}` 
            : 'Monitor all email delivery activity and performance'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs defaultValue="logs" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          {/* Activity Logs Tab */}
          <TabsContent value="logs" className="space-y-4">
            {/* Filters and Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="sent">Sent Only</SelectItem>
                    <SelectItem value="failed">Failed Only</SelectItem>
                    <SelectItem value="pending">Pending Only</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={timeFilter} onValueChange={(value: any) => setTimeFilter(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Last 24h</SelectItem>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Button onClick={refreshLogs} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button onClick={handleExportLogs} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button onClick={handleClearLogs} variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>

            {/* Logs List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Mail className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No email logs found</p>
                  <p className="text-sm">Email activity will appear here once emails are sent</p>
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(log.status)}
                        {getTypeIcon(log.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm truncate">{log.email}</span>
                          {getStatusBadge(log.status)}
                          <Badge variant="outline" className="text-xs">
                            {log.type}
                          </Badge>
                        </div>
                        
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>Cities: {log.cities.join(', ')}</p>
                          <p>Time: {formatTimestamp(log.timestamp)}</p>
                          {log.deliveryTime && (
                            <p>Delivery: {formatDeliveryTime(log.deliveryTime)}</p>
                          )}
                          {log.error && (
                            <p className="text-red-600">Error: {log.error}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-4">
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Total Emails</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Sent</span>
                </div>
                <p className="text-2xl font-bold text-green-900">{stats.sent}</p>
              </div>

              <div className="p-4 bg-red-50 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-red-900">Failed</span>
                </div>
                <p className="text-2xl font-bold text-red-900">{stats.failed}</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">Success Rate</span>
                </div>
                <p className="text-2xl font-bold text-purple-900">
                  {stats.successRate.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Daily Breakdown */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Daily Breakdown (Last {timeFilter} days)</span>
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {Object.entries(stats.dailyBreakdown)
                  .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                  .map(([date, data]) => (
                    <div key={date} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                      <span>{new Date(date).toLocaleDateString('en-IN')}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-green-600">{data.sent} sent</span>
                        <span className="text-red-600">{data.failed} failed</span>
                        <Badge variant="outline">{data.total} total</Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* User Breakdown */}
            {!userEmail && Object.keys(stats.userBreakdown).length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>User Breakdown</span>
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {Object.entries(stats.userBreakdown)
                    .sort(([, a], [, b]) => b.total - a.total)
                    .map(([email, data]) => (
                      <div key={email} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                        <span className="truncate">{email}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-green-600">{data.sent} sent</span>
                          <span className="text-red-600">{data.failed} failed</span>
                          <Badge variant="outline">{data.total} total</Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Real-time Status */}
        <div className="p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Real-time Monitoring</span>
          </div>
          <p className="text-xs text-muted-foreground">
            This log updates automatically every 30 seconds. All email activity is tracked and stored locally.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailActivityLog;