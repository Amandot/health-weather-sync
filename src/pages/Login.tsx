import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner, LoadingOverlay } from '@/components/ui/enhanced-loading';
import { useAuth } from '@/contexts/AuthContext';
import { Globe, Shield, TrendingUp, Users, Chrome, ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '@/assets/climate-hero.jpg';

const Login = () => {
  const { user, loading, signInWithGoogle } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  
  // Check if Firebase is configured
  const isDemo = import.meta.env.VITE_FIREBASE_API_KEY === undefined || 
                 import.meta.env.VITE_FIREBASE_API_KEY === "demo-api-key";

  // Redirect if already authenticated
  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  const features = [
    {
      icon: Globe,
      title: "Global Monitoring",
      description: "Access real-time climate data from around the world"
    },
    {
      icon: Shield,
      title: "Health Protection",
      description: "Get early warnings for health-related climate risks"
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "AI-powered forecasting and trend analysis"
    },
    {
      icon: Users,
      title: "Community Insights",
      description: "Connect with other climate monitoring professionals"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      {/* Animated Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Side - Hero Content */}
          <motion.div
            className="text-center lg:text-left space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <motion.div
                className="p-3 bg-primary/10 rounded-full"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Globe className="h-8 w-8 text-primary" />
              </motion.div>
              <h1 className="text-3xl font-bold">ClimateWatch</h1>
            </div>

            <div className="space-y-4">
              <motion.h2 
                className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Welcome to the Future of Climate Monitoring
              </motion.h2>
              
              <motion.p 
                className="text-xl text-muted-foreground max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Join thousands of professionals using advanced analytics and AI-powered insights 
                to protect communities from climate-related health risks.
              </motion.p>
            </div>

            {/* Feature Highlights */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-card/50 backdrop-blur border"
                  whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--primary) / 0.05)" }}
                  transition={{ duration: 0.2 }}
                >
                  <feature.icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Login Card */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <LoadingOverlay 
              isLoading={loading} 
              message="Initializing authentication..."
              className="w-full max-w-md"
            >
              <Card className="w-full max-w-md shadow-2xl border-0 bg-card/80 backdrop-blur">
                <CardHeader className="space-y-4 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                      <CardTitle className="text-2xl">Sign In</CardTitle>
                      <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                    </div>
                  </motion.div>
                  
                  <CardDescription className="text-base">
                    Access your personalized climate monitoring dashboard
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Demo Mode Banner */}
                  {isDemo && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="text-amber-600">
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-amber-800">Demo Mode</h4>
                          <p className="text-sm text-amber-700 mt-1">
                            Firebase authentication is not configured. Please set up your Firebase project to enable Google sign-in.
                            <a href="#" className="underline ml-1">Setup Guide</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Google Sign In Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleGoogleSignIn}
                      disabled={isSigningIn}
                      className="w-full h-12 text-base font-medium bg-white hover:bg-gray-50 text-gray-900 border shadow-sm hover:shadow-md transition-all duration-200"
                      variant="outline"
                    >
                      {isSigningIn ? (
                        <LoadingSpinner size="sm" color="secondary" className="mr-3" />
                      ) : (
                        <Chrome className="h-5 w-5 mr-3 text-[#4285f4]" />
                      )}
                      {isSigningIn ? 'Signing in...' : 'Continue with Google'}
                      {!isSigningIn && <ArrowRight className="h-4 w-4 ml-2 opacity-60" />}
                    </Button>
                  </motion.div>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Secure Authentication</span>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <motion.div 
                    className="p-4 bg-primary/5 border border-primary/10 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Secure & Private</p>
                        <p className="text-xs text-muted-foreground">
                          Your data is protected with enterprise-grade security. 
                          We never share your personal information.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Terms and Privacy */}
                  <p className="text-xs text-center text-muted-foreground">
                    By signing in, you agree to our{' '}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
                    and{' '}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </p>
                </CardContent>
              </Card>
            </LoadingOverlay>
          </motion.div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Login;