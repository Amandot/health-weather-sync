import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Mail, User, Calendar, MapPin, Shield, Activity, TrendingUp } from 'lucide-react';

interface EmailTemplatePreviewProps {
  userName?: string;
  userEmail?: string;
  loginTime?: string;
  userPhoto?: string;
}

export const EmailTemplatePreview = ({ 
  userName = 'John Doe',
  userEmail = 'john@example.com', 
  loginTime = 'Friday, September 27, 2024 at 2:30 PM IST',
  userPhoto
}: EmailTemplatePreviewProps) => {
  return (
    <div className="max-w-2xl mx-auto bg-white text-gray-900">
      {/* Email Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <Globe className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">ClimateWatch</h1>
            <p className="text-blue-100">Climate & Health Monitoring Platform</p>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Welcome to ClimateWatch! 🌍</h2>
          <p className="text-xl text-blue-100">Your journey to climate awareness starts here</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Personal Greeting */}
        <div className="flex items-center space-x-4 mb-6 p-4 bg-blue-50 rounded-lg">
          {userPhoto ? (
            <img 
              src={userPhoto} 
              alt={userName}
              className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
          )}
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Hello, {userName}!</h3>
            <p className="text-gray-600">Welcome to our climate monitoring community</p>
          </div>
        </div>

        {/* Login Details */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-green-600" />
            Login Confirmation
          </h4>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Email: {userEmail}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Login Time: {loginTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Location: Secure connection verified</span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="mb-6">
          <h4 className="text-xl font-bold text-gray-800 mb-4">What you can do with ClimateWatch:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <h5 className="font-semibold">Real-time Monitoring</h5>
              </div>
              <p className="text-sm text-gray-600">Track climate data and health metrics from cities worldwide</p>
            </div>
            <div className="p-4 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h5 className="font-semibold">AI Predictions</h5>
              </div>
              <p className="text-sm text-gray-600">Get AI-powered insights and predictive analytics</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-6">
          <h4 className="text-xl font-bold text-gray-800 mb-2">Ready to explore?</h4>
          <p className="text-gray-600 mb-4">
            Start monitoring climate data and get insights that matter to your community.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
            Open ClimateWatch Dashboard
          </Button>
        </div>

        {/* Features Highlight */}
        <div className="border-t pt-6">
          <h4 className="font-semibold text-gray-800 mb-3">🌟 Platform Highlights:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Real-time weather data</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Health impact tracking</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Predictive analytics</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Smart alerts system</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 p-6 text-center text-sm text-gray-600">
        <p className="mb-2">
          <strong>ClimateWatch Team</strong> - Protecting communities through environmental intelligence
        </p>
        <p>
          If you have any questions, reply to this email or visit our support center.
        </p>
        <div className="mt-4 pt-4 border-t border-gray-300">
          <p className="text-xs text-gray-500">
            This email was sent because you signed in to ClimateWatch. 
            If this wasn't you, please contact our support team immediately.
          </p>
        </div>
      </div>
    </div>
  );
};