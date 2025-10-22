import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { StaggeredAnimation } from '@/components/ui/staggered-animation';
import { 
  Heart, 
  Activity, 
  Users, 
  AlertTriangle,
  TrendingUp,
  Thermometer
} from 'lucide-react';

const Health = () => {
  const healthMetrics = [
    {
      icon: Activity,
      title: 'Respiratory Issues',
      value: 23,
      unit: 'cases',
      change: '+12%',
      trend: 'up',
      color: 'text-red-500'
    },
    {
      icon: Heart,
      title: 'Heat Stress',
      value: 8,
      unit: 'incidents',
      change: '-5%',
      trend: 'down',
      color: 'text-orange-500'
    },
    {
      icon: Users,
      title: 'Affected Population',
      value: 1250,
      unit: 'people',
      change: '+3%',
      trend: 'up',
      color: 'text-blue-500'
    },
    {
      icon: AlertTriangle,
      title: 'Risk Level',
      value: 'Medium',
      unit: '',
      change: 'Stable',
      trend: 'stable',
      color: 'text-amber-500'
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-2">Public Health Monitoring</h1>
        <p className="text-muted-foreground">
          Track health impacts correlated with environmental conditions and climate changes.
        </p>
      </motion.div>

      {/* Health Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <StaggeredAnimation
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variant="fadeInScale"
          staggerDelay={0.1}
        >
          {healthMetrics.map((metric, index) => (
            <Card key={index} className="shadow-medium hover:shadow-strong transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metric.value} {metric.unit}
                </div>
                <p className="text-xs text-muted-foreground">
                  {metric.change} from last week
                </p>
              </CardContent>
            </Card>
          ))}
        </StaggeredAnimation>
      </motion.div>

      {/* Health Risk Assessment */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Current Health Risks</CardTitle>
            <CardDescription>Risk levels based on environmental conditions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Heat-related illness</span>
                <span>65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Air quality impact</span>
                <span>30%</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Vector-borne diseases</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Allergic reactions</span>
                <span>20%</span>
              </div>
              <Progress value={20} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Vulnerable Populations</CardTitle>
            <CardDescription>Groups at higher risk from climate impacts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">Children (0-12 years)</p>
                  <p className="text-sm text-muted-foreground">High susceptibility to heat stress</p>
                </div>
                <span className="text-sm font-medium">32%</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-accent/5 rounded-lg">
                <Heart className="h-5 w-5 text-accent" />
                <div className="flex-1">
                  <p className="font-medium">Elderly (65+ years)</p>
                  <p className="text-sm text-muted-foreground">Respiratory and cardiovascular risks</p>
                </div>
                <span className="text-sm font-medium">28%</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                <Activity className="h-5 w-5 text-amber-600" />
                <div className="flex-1">
                  <p className="font-medium">Outdoor Workers</p>
                  <p className="text-sm text-muted-foreground">Extended heat exposure risks</p>
                </div>
                <span className="text-sm font-medium">25%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Coming Soon Notice */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="shadow-medium bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Advanced Health Analytics Coming Soon</h3>
            <p className="text-muted-foreground">
              Real-time health correlation mapping, predictive disease outbreak modeling, 
              and AI-powered risk assessment tools are in development.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Health;