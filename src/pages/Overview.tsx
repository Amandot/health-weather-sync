import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StaggeredAnimation } from '@/components/ui/staggered-animation';
import { 
  Globe, 
  Activity, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  Users,
  ArrowRight,
  Thermometer,
  Droplets,
  Wind,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Overview = () => {
  const quickStats = [
    {
      icon: Thermometer,
      title: 'Temperature',
      value: '28°C',
      change: '+2.1°',
      trend: 'up',
      color: 'text-red-500'
    },
    {
      icon: Droplets,
      title: 'Humidity',
      value: '65%',
      change: 'Normal',
      trend: 'stable',
      color: 'text-blue-500'
    },
    {
      icon: Wind,
      title: 'Air Quality',
      value: 'Good',
      change: 'AQI 42',
      trend: 'down',
      color: 'text-green-500'
    },
    {
      icon: Heart,
      title: 'Health Risk',
      value: 'Low',
      change: '15%',
      trend: 'down',
      color: 'text-green-500'
    }
  ];

  const features = [
    {
      icon: Globe,
      title: "Global Monitoring",
      description: "Track climate data from multiple cities worldwide",
      href: "/dashboard"
    },
    {
      icon: Activity,
      title: "Health Tracking",
      description: "Monitor public health metrics and correlations",
      href: "/health"
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "AI-powered forecasting and risk assessment",
      href: "/analytics"
    },
    {
      icon: AlertTriangle,
      title: "Alert System",
      description: "Real-time notifications for critical conditions",
      href: "/alerts"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Welcome to ClimateWatch
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive platform for climate monitoring and public health tracking. 
          Monitor real-time data, get AI-powered insights, and protect communities worldwide.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-6">Current Conditions</h2>
        <StaggeredAnimation
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variant="fadeInScale"
          staggerDelay={0.1}
        >
          {quickStats.map((stat, index) => (
            <Card key={index} className="shadow-medium hover:shadow-strong transition-all duration-300 border-0 bg-card/80 backdrop-blur hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
                    </div>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.change}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </StaggeredAnimation>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-6">Platform Features</h2>
        <StaggeredAnimation
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variant="fadeInUp"
          staggerDelay={0.15}
        >
          {features.map((feature, index) => (
            <Link key={index} to={feature.href}>
              <Card className="shadow-medium hover:shadow-strong transition-all duration-300 border-0 bg-card/80 backdrop-blur hover:scale-105 group h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                        <feature.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </StaggeredAnimation>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Recent Activity</h2>
          <Link to="/alerts">
            <Button variant="outline" className="flex items-center space-x-2">
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <Card className="shadow-medium border-0 bg-card/80 backdrop-blur">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-primary/5 rounded-lg">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="font-medium">System Status: All systems operational</p>
                  <p className="text-sm text-muted-foreground">Data streams are active and monitoring is running smoothly</p>
                </div>
                <span className="text-sm text-muted-foreground">Just now</span>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-amber/5 rounded-lg">
                <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">Temperature alert for Mumbai</p>
                  <p className="text-sm text-muted-foreground">Temperature exceeded 30°C threshold</p>
                </div>
                <span className="text-sm text-muted-foreground">2 min ago</span>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">New location added</p>
                  <p className="text-sm text-muted-foreground">Chennai monitoring station is now online</p>
                </div>
                <span className="text-sm text-muted-foreground">1 hour ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Overview;