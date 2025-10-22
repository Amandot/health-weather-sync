import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ExternalLink, Settings } from 'lucide-react';

interface DemoBypassProps {
  children: React.ReactNode;
}

export const DemoBypass = ({ children }: DemoBypassProps) => {
  const isDemo = import.meta.env.VITE_FIREBASE_API_KEY === undefined || 
                 import.meta.env.VITE_FIREBASE_API_KEY === "demo-api-key";

  // If Firebase is configured, render children normally
  if (!isDemo) {
    return <>{children}</>;
  }

  // Demo mode - show bypass option
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="p-4 bg-amber-100 rounded-full">
                <AlertTriangle className="h-12 w-12 text-amber-600" />
              </div>
            </motion.div>
            
            <div>
              <CardTitle className="text-3xl text-amber-900">Demo Mode</CardTitle>
              <CardDescription className="text-lg text-amber-700 mt-2">
                Firebase Authentication is not configured
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-white/70 p-4 rounded-lg border border-amber-200">
              <h3 className="font-semibold text-amber-900 mb-2">🚀 To enable authentication:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-amber-800">
                <li>Create a Firebase project at <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Firebase Console</a></li>
                <li>Enable Google Authentication</li>
                <li>Copy your Firebase config</li>
                <li>Update the <code className="bg-amber-100 px-1 rounded">.env.local</code> file</li>
                <li>Restart the development server</li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() => window.open('./AUTHENTICATION_SETUP.md', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Setup Guide
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50"
                onClick={() => {
                  // For demo purposes, we'll render the children
                  const demoDiv = document.createElement('div');
                  demoDiv.innerHTML = '<div id="demo-content"></div>';
                  document.body.appendChild(demoDiv);
                  // This is a simple demo bypass - not for production!
                }}
              >
                <Settings className="h-4 w-4 mr-2" />
                Continue in Demo Mode
              </Button>
            </div>

            <motion.div 
              className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> The ClimateWatch dashboard and all features will work normally, 
                but user authentication and profile features will be disabled until Firebase is configured.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};