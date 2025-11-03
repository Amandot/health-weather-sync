import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DailyEmailService } from '@/services/dailyEmailService';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Thermometer,
  Wind,
  Droplets,
  Sun,
  Activity,
  Shield
} from 'lucide-react';

interface DailyEmailDemoProps {
  userEmail: string;
  userName: string;
}

const DailyEmailDemo: React.FC<DailyEmailDemoProps> = ({ userEmail, userName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSendDemo = async () => {
    setIsLoading(true);
    try {
      const success = await DailyEmailService.sendDailyEmail({
        userEmail,
        userName,
        cities: ['Mumbai', 'Delhi', 'Bengaluru'],
        type: 'demo'
      });

      if (success) {
        setEmailSent(true);
      }
    } catch (error) {
      console.error('Demo email failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-medium border-2 border-dashed border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-primary" />
          <span>Daily Email Demo</span>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Try It Now
          </Badge>
        </CardTitle>
        <CardDescription>
          Experience the comprehensive daily health and weather report that will be sent to your inbox
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Feature Preview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
            <Thermometer className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm font-medium">Weather Data</p>
              <p className="text-xs text-muted-foreground">Real-time conditions</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
            <Wind className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Air Quality</p>
              <p className="text-xs text-muted-foreground">AQI & health risks</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-yellow-50 rounded-lg">
            <Sun className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium">UV Index</p>
              <p className="text-xs text-muted-foreground">Sun protection</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
            <Activity className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium">Exercise Tips</p>
              <p className="text-xs text-muted-foreground">Activity guidance</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg">
            <Shield className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm font-medium">Health Insights</p>
              <p className="text-xs text-muted-foreground">AI recommendations</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-teal-50 rounded-lg">
            <Droplets className="h-5 w-5 text-teal-600" />
            <div>
              <p className="text-sm font-medium">Wellness Tips</p>
              <p className="text-xs text-muted-foreground">Daily health advice</p>
            </div>
          </div>
        </div>

        {/* Sample Content Preview */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
          <h4 className="font-medium text-sm mb-3">📧 Sample Email Content:</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• <strong>Weather Summary:</strong> Mumbai 32°C, Delhi 35°C, Bengaluru 28°C</p>
            <p>• <strong>Health Risk:</strong> Moderate - Be mindful of outdoor activities</p>
            <p>• <strong>AI Recommendations:</strong> Stay hydrated, avoid 11 AM - 4 PM outdoor exposure</p>
            <p>• <strong>Air Quality:</strong> AQI 120 - Sensitive groups should limit outdoor time</p>
            <p>• <strong>Exercise Advice:</strong> Best times: 6-8 AM or 6-8 PM</p>
            <p>• <strong>UV Protection:</strong> Use SPF 30+ sunscreen, wear protective clothing</p>
          </div>
        </div>

        {/* Demo Action */}
        <div className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
          <div>
            <p className="font-medium text-sm">Ready to try it?</p>
            <p className="text-sm text-muted-foreground">
              Send a sample daily report to {userEmail}
            </p>
          </div>
          <Button 
            onClick={handleSendDemo} 
            disabled={isLoading || emailSent}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : emailSent ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Sent!
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Demo Email
              </>
            )}
          </Button>
        </div>

        {emailSent && (
          <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">Demo email sent successfully!</p>
              <p className="text-xs text-green-600">Check your inbox for the comprehensive daily report</p>
            </div>
          </div>
        )}

        {/* Gemini AI Notice */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-purple-900">🤖 AI-Powered Insights</p>
              <p className="text-xs text-purple-700 mt-1">
                For enhanced personalized recommendations, add your Gemini API key to get intelligent health insights based on current weather conditions.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyEmailDemo;