import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmailScheduler } from '@/services/emailScheduler';
import { EmailLogger } from '@/services/emailLogger';
import { 
  Bug, 
  Clock, 
  Mail, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface EmailDebugPanelProps {
  userEmail: string;
}

const EmailDebugPanel: React.FC<EmailDebugPanelProps> = ({ userEmail }) => {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  const refreshDebugInfo = () => {
    const schedulerStatus = EmailScheduler.getStatus();
    const userLogs = EmailLogger.getLogsForUser(userEmail).slice(0, 5);
    const lastEmail = EmailLogger.getLastEmailForUser(userEmail);
    const hasEmailToday = EmailLogger.hasReceivedEmailToday(userEmail);
    
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setDebugInfo({
      currentTime,
      schedulerRunning: schedulerStatus.isRunning,
      userCount: schedulerStatus.userCount,
      enabledUsers: schedulerStatus.enabledUsers,
      lastEmail,
      hasEmailToday,
      nextEmailTime: EmailScheduler.getNextEmailTime(userEmail)
    });
    
    setRecentLogs(userLogs);
  };

  useEffect(() => {
    refreshDebugInfo();
    
    // Refresh every 10 seconds
    const interval = setInterval(refreshDebugInfo, 10000);
    return () => clearInterval(interval);
  }, [userEmail]);

  const formatTime = (date: Date | null): string => {
    if (!date) return 'N/A';
    return date.toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="h-3 w-3 text-green-600" />;
      case 'failed':
        return <XCircle className="h-3 w-3 text-red-600" />;
      case 'pending':
        return <Clock className="h-3 w-3 text-yellow-600" />;
      default:
        return <Mail className="h-3 w-3 text-gray-600" />;
    }
  };

  return (
    <Card className="shadow-medium border-dashed border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bug className="h-5 w-5 text-orange-600" />
          <span>Email Debug Panel</span>
          <Badge variant="outline" className="text-orange-600">Debug Mode</Badge>
        </CardTitle>
        <CardDescription>
          Real-time debugging information for email delivery system
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Current Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-blue-50 rounded border">
            <p className="text-xs text-blue-600 font-medium">Current Time</p>
            <p className="text-sm font-mono">{debugInfo.currentTime}</p>
          </div>
          
          <div className="p-3 bg-green-50 rounded border">
            <p className="text-xs text-green-600 font-medium">Scheduler</p>
            <p className="text-sm">{debugInfo.schedulerRunning ? '🟢 Running' : '🔴 Stopped'}</p>
          </div>
          
          <div className="p-3 bg-purple-50 rounded border">
            <p className="text-xs text-purple-600 font-medium">Users</p>
            <p className="text-sm">{debugInfo.enabledUsers}/{debugInfo.userCount}</p>
          </div>
          
          <div className="p-3 bg-yellow-50 rounded border">
            <p className="text-xs text-yellow-600 font-medium">Email Today</p>
            <p className="text-sm">{debugInfo.hasEmailToday ? '✅ Yes' : '❌ No'}</p>
          </div>
        </div>

        {/* Next Email Info */}
        <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded border">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Next Scheduled Email</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {debugInfo.nextEmailTime ? formatTime(debugInfo.nextEmailTime) : 'Not scheduled'}
          </p>
        </div>

        {/* Recent Email Activity */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Recent Email Activity</span>
            </h4>
            <Button onClick={refreshDebugInfo} variant="outline" size="sm">
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </Button>
          </div>
          
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {recentLogs.length === 0 ? (
              <p className="text-xs text-muted-foreground p-2 bg-muted/50 rounded">
                No recent email activity
              </p>
            ) : (
              recentLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-2 bg-muted/50 rounded text-xs">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(log.status)}
                    <span>{log.type}</span>
                    <Badge variant="outline" className="text-xs">
                      {log.status}
                    </Badge>
                  </div>
                  <span className="text-muted-foreground">
                    {new Date(log.timestamp).toLocaleTimeString('en-IN')}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Debug Tips */}
        <div className="p-3 bg-orange-50 border border-orange-200 rounded">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-900">Debug Tips:</p>
              <ul className="text-xs text-orange-700 mt-1 space-y-1">
                <li>• If emails are sent when updating settings, check if current time matches scheduled time</li>
                <li>• "Email Today" should be "Yes" only after a daily email is successfully sent</li>
                <li>• Scheduler runs every minute and checks for emails to send</li>
                <li>• Only "Test" emails should be sent immediately when you click buttons</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailDebugPanel;