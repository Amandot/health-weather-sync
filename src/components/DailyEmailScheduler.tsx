import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { DailyEmailService } from '@/services/dailyEmailService';
import { EmailScheduler, UserEmailPreferences } from '@/services/emailScheduler';
import EmailStatusIndicator from '@/components/EmailStatusIndicator';
import { 
  Clock, 
  Mail, 
  MapPin, 
  Calendar,
  Settings,
  Send,
  CheckCircle,
  AlertCircle,
  Plus,
  X
} from 'lucide-react';

interface DailyEmailSettings {
  enabled: boolean;
  time: string; // HH:MM format
  cities: string[];
  frequency: 'daily' | 'weekdays' | 'weekends';
  lastSent: string | null;
}

const INDIAN_CITIES = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Kolkata', 
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
  'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad'
];

interface DailyEmailSchedulerProps {
  userEmail: string;
  userName: string;
}

const DailyEmailScheduler: React.FC<DailyEmailSchedulerProps> = ({ userEmail, userName }) => {
  const [settings, setSettings] = useState<DailyEmailSettings>({
    enabled: false,
    time: '08:00',
    cities: ['Mumbai', 'Delhi'],
    frequency: 'daily',
    lastSent: null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [testEmailSent, setTestEmailSent] = useState(false);
  const [newCity, setNewCity] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem(`dailyEmail_${userEmail}`);
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
      } catch (error) {
        console.error('Error loading daily email settings:', error);
      }
    }
    setIsInitialLoad(false);
  }, [userEmail]);

  // Save settings to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem(`dailyEmail_${userEmail}`, JSON.stringify(settings));
  }, [settings, userEmail]);

  // Update email scheduler when settings change
  useEffect(() => {
    // Skip showing toast on initial load
    if (isInitialLoad) return;

    if (settings.enabled) {
      const preferences: UserEmailPreferences = {
        email: userEmail,
        name: userName,
        cities: settings.cities,
        enabled: settings.enabled,
        time: settings.time,
        frequency: settings.frequency,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      
      EmailScheduler.addUser(preferences);
      
      // Show confirmation that settings were saved (debounced)
      const timeoutId = setTimeout(() => {
        toast({
          title: "Settings Updated",
          description: `Daily emails scheduled for ${settings.time} (${settings.frequency})`,
        });
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      EmailScheduler.removeUser(userEmail);
      
      toast({
        title: "Daily Emails Disabled",
        description: "You will no longer receive scheduled daily emails.",
      });
    }
  }, [settings, userEmail, userName, isInitialLoad]);

  // Get scheduler status for display
  const getSchedulerStatus = () => {
    return EmailScheduler.getStatus();
  };

  const shouldSendToday = (): boolean => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday

    switch (settings.frequency) {
      case 'weekdays':
        return dayOfWeek >= 1 && dayOfWeek <= 5; // Monday to Friday
      case 'weekends':
        return dayOfWeek === 0 || dayOfWeek === 6; // Saturday and Sunday
      case 'daily':
      default:
        return true;
    }
  };

  const sendScheduledEmail = async () => {
    try {
      const success = await DailyEmailService.sendDailyEmail({
        userEmail,
        userName,
        cities: settings.cities,
        type: 'daily'
      });

      if (success) {
        setSettings(prev => ({
          ...prev,
          lastSent: new Date().toISOString()
        }));
        
        toast({
          title: "Daily Email Sent",
          description: "Your daily health and weather report has been delivered.",
        });
      }
    } catch (error) {
      console.error('Error sending scheduled email:', error);
      toast({
        title: "Email Failed",
        description: "There was an error sending your daily email.",
        variant: "destructive"
      });
    }
  };

  const handleTestEmail = async () => {
    setIsLoading(true);
    try {
      const success = await DailyEmailService.sendDailyEmail({
        userEmail,
        userName,
        cities: settings.cities,
        type: 'test'
      });

      if (success) {
        setTestEmailSent(true);
        toast({
          title: "Test Email Sent",
          description: "Check your inbox for the daily health and weather report.",
        });
      } else {
        throw new Error('Failed to send test email');
      }
    } catch (error) {
      toast({
        title: "Test Email Failed",
        description: "There was an error sending the test email. Please check your configuration.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addCity = () => {
    if (newCity && !settings.cities.includes(newCity)) {
      setSettings(prev => ({
        ...prev,
        cities: [...prev.cities, newCity]
      }));
      setNewCity('');
    }
  };

  const removeCity = (cityToRemove: string) => {
    setSettings(prev => ({
      ...prev,
      cities: prev.cities.filter(city => city !== cityToRemove)
    }));
  };

  const getNextScheduledTime = (): string => {
    if (!settings.enabled) return 'Not scheduled';
    
    const nextTime = EmailScheduler.getNextEmailTime(userEmail);
    if (!nextTime) return 'Not scheduled';

    return nextTime.toLocaleString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Mail className="h-5 w-5" />
          <span>Daily Health & Weather Email</span>
          {settings.enabled && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Active
            </Badge>
          )}
          <EmailStatusIndicator userEmail={userEmail} />
        </CardTitle>
        <CardDescription>
          Get comprehensive daily reports with weather data, health insights, and AI-powered recommendations
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Enable/Disable Toggle */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <Label className="text-base font-medium">Enable Daily Email Reports</Label>
            <p className="text-sm text-muted-foreground">
              Receive daily health and weather insights powered by AI
            </p>
          </div>
          <Switch
            checked={settings.enabled}
            onCheckedChange={(checked) => 
              setSettings(prev => ({ ...prev, enabled: checked }))
            }
          />
        </div>

        {settings.enabled && (
          <>
            {/* Schedule Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Delivery Time</Label>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="time"
                    value={settings.time}
                    onChange={(e) => 
                      setSettings(prev => ({ ...prev, time: e.target.value }))
                    }
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Frequency</Label>
                <Select 
                  value={settings.frequency}
                  onValueChange={(value: 'daily' | 'weekdays' | 'weekends') => 
                    setSettings(prev => ({ ...prev, frequency: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekdays">Weekdays Only</SelectItem>
                    <SelectItem value="weekends">Weekends Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Cities Selection */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Monitored Cities</Label>
              
              {/* Selected Cities */}
              <div className="flex flex-wrap gap-2">
                {settings.cities.map((city) => (
                  <Badge key={city} variant="secondary" className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{city}</span>
                    <button
                      onClick={() => removeCity(city)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              {/* Add New City */}
              <div className="flex space-x-2">
                <Select value={newCity} onValueChange={setNewCity}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a city to add" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDIAN_CITIES.filter(city => !settings.cities.includes(city)).map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={addCity} 
                  disabled={!newCity || settings.cities.includes(newCity)}
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Schedule Info */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Schedule Information</span>
              </div>
              <div className="text-sm text-blue-800 space-y-1">
                <p>Next email: <strong>{getNextScheduledTime()}</strong></p>
                <p>Frequency: <strong>{settings.frequency}</strong></p>
                <p>Cities: <strong>{settings.cities.length} selected</strong></p>
                {settings.lastSent && (
                  <p>Last sent: <strong>{new Date(settings.lastSent).toLocaleString('en-IN')}</strong></p>
                )}
              </div>
            </div>

            {/* Test Email */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label className="text-base font-medium">Test Email</Label>
                <p className="text-sm text-muted-foreground">
                  Send a test email to verify your configuration
                </p>
              </div>
              <Button 
                onClick={handleTestEmail} 
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Test Email
                  </>
                )}
              </Button>
            </div>

            {testEmailSent && (
              <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">
                  Test email sent successfully! Check your inbox.
                </span>
              </div>
            )}

            {/* Important Notice */}
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-yellow-900 mb-1">📧 Email Delivery Schedule</h4>
                  <p className="text-sm text-yellow-800 mb-2">
                    Daily emails are sent automatically at your scheduled time. Updating settings will NOT send an immediate email.
                  </p>
                  <ul className="text-xs text-yellow-700 space-y-1">
                    <li>• Emails are sent only once per day at your chosen time</li>
                    <li>• Use "Send Test Email" button to test your configuration</li>
                    <li>• Check "Email Activity" tab to see delivery status</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature Info */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
              <h4 className="font-medium text-sm mb-2">What's included in your daily email:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Real-time weather data for your selected cities</li>
                <li>• Air quality index and health risk assessments</li>
                <li>• AI-powered health recommendations and tips</li>
                <li>• UV protection and exercise guidance</li>
                <li>• Personalized insights based on local conditions</li>
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyEmailScheduler;