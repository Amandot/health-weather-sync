import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import DailyEmailScheduler from '@/components/DailyEmailScheduler';
import DailyEmailDemo from '@/components/DailyEmailDemo';

import EmailActivityLog from '@/components/EmailActivityLog';
import EmailDebugPanel from '@/components/EmailDebugPanel';

import EmailClickGuide from '@/components/EmailClickGuide';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Thermometer,
  Droplets,
  Wind,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Volume2,
  VolumeX,
  Trash2,
  Calendar
} from 'lucide-react';

const Notifications = () => {
  const { user } = useAuth();
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      enabled: true,
      frequency: 'immediate',
      types: {
        alerts: true,
        reports: true,
        updates: false,
        marketing: false
      }
    },
    push: {
      enabled: true,
      sound: true,
      types: {
        alerts: true,
        reports: false,
        updates: true,
        marketing: false
      }
    },
    sms: {
      enabled: false,
      number: '+91 98765 43210',
      types: {
        criticalAlerts: true,
        emergencies: true
      }
    }
  });

  const [notifications] = useState([
    {
      id: '1',
      type: 'alert',
      icon: AlertTriangle,
      title: 'High Temperature Alert',
      message: 'Temperature in Mumbai has exceeded 35°C. Heat-related health risks may be elevated.',
      time: '2 minutes ago',
      severity: 'high',
      read: false,
      location: 'Mumbai'
    },
    {
      id: '2',
      type: 'info',
      icon: Droplets,
      title: 'Humidity Update',
      message: 'Humidity levels have normalized to 65% in your monitored locations.',
      time: '15 minutes ago',
      severity: 'low',
      read: false,
      location: 'Delhi'
    },
    {
      id: '3',
      type: 'success',
      icon: CheckCircle,
      title: 'System Status',
      message: 'All monitoring stations are operational. Data collection is running smoothly.',
      time: '1 hour ago',
      severity: 'info',
      read: true,
      location: 'All Locations'
    },
    {
      id: '4',
      type: 'warning',
      icon: Wind,
      title: 'Air Quality Alert',
      message: 'Air Quality Index has reached 150 in Chennai. Consider limiting outdoor activities.',
      time: '2 hours ago',
      severity: 'medium',
      read: true,
      location: 'Chennai'
    },
    {
      id: '5',
      type: 'info',
      icon: Bell,
      title: 'Weekly Report Ready',
      message: 'Your weekly climate monitoring report is ready for download.',
      time: '1 day ago',
      severity: 'info',
      read: true,
      location: 'Dashboard'
    }
  ]);

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
    
    toast({
      title: "Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleTypeChange = (category: string, type: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        types: {
          ...prev[category as keyof typeof prev].types,
          [type]: value
        }
      }
    }));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return <Badge variant="destructive">Critical</Badge>;
      case 'medium': return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Warning</Badge>;
      case 'low': return <Badge variant="secondary" className="bg-green-100 text-green-800">Info</Badge>;
      default: return <Badge variant="outline">Normal</Badge>;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            Manage your alerts and notification preferences
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Bell className="h-3 w-3" />
            <span>{unreadCount} unread</span>
          </Badge>
          <Button variant="outline" size="sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </motion.div>

      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="alerts">Recent Alerts</TabsTrigger>
          <TabsTrigger value="daily">Daily Reports</TabsTrigger>
          <TabsTrigger value="activity">Email Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Recent Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="shadow-medium">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">3</p>
                    <p className="text-sm text-muted-foreground">Critical Alerts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Bell className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Total Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">89%</p>
                    <p className="text-sm text-muted-foreground">Response Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">2m</p>
                    <p className="text-sm text-muted-foreground">Avg Response</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications List */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Recent Notifications</span>
              </CardTitle>
              <CardDescription>Latest alerts and updates from your monitoring system</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <motion.div
                      key={notification.id}
                      className={`p-6 hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-full ${getSeverityColor(notification.severity)}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <div className="flex items-center space-x-2">
                              {getSeverityBadge(notification.severity)}
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <span>{notification.time}</span>
                              <span>•</span>
                              <span>{notification.location}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Daily Reports Tab */}
        <TabsContent value="daily" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {user && (
              <>
                <EmailClickGuide />
                <DailyEmailDemo 
                  userEmail={user.email || ''} 
                  userName={user.displayName || 'User'} 
                />
                <DailyEmailScheduler 
                  userEmail={user.email || ''} 
                  userName={user.displayName || 'User'} 
                />
                <EmailDebugPanel userEmail={user.email || ''} />
              </>
            )}
          </motion.div>
        </TabsContent>

        {/* Email Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {user && (
              <EmailActivityLog userEmail={user.email || ''} />
            )}
          </motion.div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          {/* Email Notifications */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Email Notifications</span>
              </CardTitle>
              <CardDescription>Configure how you receive email alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Enable Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={notificationSettings.email.enabled}
                  onCheckedChange={(checked) => handleSettingChange('email', 'enabled', checked)}
                />
              </div>

              {notificationSettings.email.enabled && (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Email Frequency</Label>
                      <Select 
                        value={notificationSettings.email.frequency}
                        onValueChange={(value) => handleSettingChange('email', 'frequency', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="hourly">Hourly Digest</SelectItem>
                          <SelectItem value="daily">Daily Summary</SelectItem>
                          <SelectItem value="weekly">Weekly Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Email Types</Label>
                      {Object.entries(notificationSettings.email.types).map(([type, enabled]) => (
                        <div key={type} className="flex items-center justify-between">
                          <Label className="text-sm capitalize">{type.replace(/([A-Z])/g, ' $1').trim()}</Label>
                          <Switch
                            checked={enabled}
                            onCheckedChange={(checked) => handleTypeChange('email', type, checked)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Push Notifications */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5" />
                <span>Push Notifications</span>
              </CardTitle>
              <CardDescription>Browser and mobile push notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Enable Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive real-time push alerts</p>
                </div>
                <Switch
                  checked={notificationSettings.push.enabled}
                  onCheckedChange={(checked) => handleSettingChange('push', 'enabled', checked)}
                />
              </div>

              {notificationSettings.push.enabled && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Sound Notifications</Label>
                      <p className="text-sm text-muted-foreground">Play sound with notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.push.sound}
                      onCheckedChange={(checked) => handleSettingChange('push', 'sound', checked)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Push Notification Types</Label>
                    {Object.entries(notificationSettings.push.types).map(([type, enabled]) => (
                      <div key={type} className="flex items-center justify-between">
                        <Label className="text-sm capitalize">{type.replace(/([A-Z])/g, ' $1').trim()}</Label>
                        <Switch
                          checked={enabled}
                          onCheckedChange={(checked) => handleTypeChange('push', type, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* SMS Notifications */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>SMS Notifications</span>
              </CardTitle>
              <CardDescription>Critical alerts via text message</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Enable SMS Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                </div>
                <Switch
                  checked={notificationSettings.sms.enabled}
                  onCheckedChange={(checked) => handleSettingChange('sms', 'enabled', checked)}
                />
              </div>

              {notificationSettings.sms.enabled && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Phone Number</Label>
                    <p className="text-sm text-muted-foreground mt-1">{notificationSettings.sms.number}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Update Number
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">SMS Alert Types</Label>
                    {Object.entries(notificationSettings.sms.types).map(([type, enabled]) => (
                      <div key={type} className="flex items-center justify-between">
                        <Label className="text-sm capitalize">{type.replace(/([A-Z])/g, ' $1').trim()}</Label>
                        <Switch
                          checked={enabled}
                          onCheckedChange={(checked) => handleTypeChange('sms', type, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;