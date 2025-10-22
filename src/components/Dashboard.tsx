import { useState } from "react";
import { motion } from "framer-motion";
import { StaggeredAnimation } from "@/components/ui/staggered-animation";
import { UserProfileDropdown } from "@/components/ui/user-profile-dropdown";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Activity, 
  RefreshCw, 
  Globe,
  Gauge,
  Clock,
  Wifi,
  WifiOff,
  Heart,
  Users,
  AlertTriangle,
  TrendingUp,
  CloudRain,
  Cloud,
  CloudDrizzle,
  Sun
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { MetricCard } from "./MetricCard";
import { ChartCard } from "./ChartCard";
import { AlertBanner, AlertLevel } from "./AlertBanner";
import { CitySelector, IndianCity } from "./CitySelector";
import { useWeatherData } from "@/hooks/useWeatherData";

// Default city (Mumbai)
const DEFAULT_CITY: IndianCity = {
  name: "Mumbai",
  state: "Maharashtra", 
  code: "MUM",
  coordinates: { lat: 19.0760, lon: 72.8777 }
};

const generateHealthData = () => ({
  respiratoryIncidents: Math.round(10 + Math.random() * 20),
  heatStress: Math.round(5 + Math.random() * 15),
  allergicReactions: Math.round(8 + Math.random() * 12),
  overallRisk: Math.round(30 + Math.random() * 40),
});

const Dashboard = () => {
  const [selectedCity, setSelectedCity] = useState<IndianCity>(DEFAULT_CITY);
  const [healthData, setHealthData] = useState(generateHealthData());
  
  const { 
    currentWeather, 
    trendData, 
    loading, 
    error, 
    lastUpdated, 
    refetch 
  } = useWeatherData(selectedCity);

  const refreshData = () => {
    setHealthData(generateHealthData());
    refetch();
  };

  // Generate alerts based on current weather
  const generateAlerts = () => {
    if (!currentWeather) return [];
    
    const alerts = [];
    
    if (currentWeather.temperature > 35) {
      alerts.push({
        id: "heat-1",
        message: `Extreme heat alert: ${currentWeather.temperature}°C in ${selectedCity.name}`,
        level: "critical" as AlertLevel,
        type: "heatwave" as const,
        timestamp: new Date(),
      });
    } else if (currentWeather.temperature > 32) {
      alerts.push({
        id: "heat-2", 
        message: `High temperature alert: ${currentWeather.temperature}°C detected`,
        level: "high" as AlertLevel,
        type: "heatwave" as const,
        timestamp: new Date(),
      });
    }
    
    if (currentWeather.airQuality > 150) {
      alerts.push({
        id: "aqi-1",
        message: "Poor air quality detected - AQI above 150",
        level: "high" as AlertLevel,
        type: "air-quality" as const,
        timestamp: new Date(),
      });
    } else if (currentWeather.airQuality > 100) {
      alerts.push({
        id: "aqi-2",
        message: "Moderate air quality - AQI above normal levels", 
        level: "medium" as AlertLevel,
        type: "air-quality" as const,
        timestamp: new Date(),
      });
    }
    
    if (currentWeather.humidity < 40) {
      alerts.push({
        id: "humid-1",
        message: "Low humidity levels - stay hydrated",
        level: "low" as AlertLevel,
        type: "humidity" as const,
        timestamp: new Date(),
      });
    }
    
    return alerts;
  };

  const alerts = generateAlerts();

  const getApiHealthStatus = () => {
    if (error) return { status: "error", message: "API Connection Failed" };
    if (loading) return { status: "loading", message: "Connecting..." };
    return { status: "online", message: "All Systems Operational" };
  };

  const getWeatherIcon = (desc?: string) => {
    const d = desc?.toLowerCase() || "";
    if (d.includes("thunder")) return AlertTriangle;
    if (d.includes("rain")) return CloudRain;
    if (d.includes("drizzle")) return CloudDrizzle;
    if (d.includes("cloud")) return Cloud;
    if (d.includes("wind")) return Wind;
    return Sun;
  };

  return (
    <div className="bg-background">
      {/* Header */}
      <header className="border-b bg-gradient-subtle backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-xl hover-scale">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-text bg-clip-text text-transparent">
                  India Weather Dashboard
                </h1>
                <p className="text-muted-foreground">
                  {lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString('en-IN')}` : 'Loading...'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <CitySelector 
                selectedCity={selectedCity}
                onCityChange={setSelectedCity}
              />
              <Button 
                onClick={refreshData} 
                disabled={loading}
                className="flex items-center space-x-2 hover-glow"
                size="sm"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </Button>
              <UserProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Alert Banner */}
        <div className="mb-8">
          <AlertBanner alerts={alerts} />
        </div>

        {/* Main Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
        <Tabs defaultValue="climate" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="climate">Climate Monitoring</TabsTrigger>
            <TabsTrigger value="health">Health Tracking</TabsTrigger>
            <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          </TabsList>

          <TabsContent value="climate" className="space-y-8">
            {/* Weather Metrics */}
            <StaggeredAnimation 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variant="fadeInScale"
              staggerDelay={0.15}
            >
              {[
                <MetricCard
                  title="Temperature"
                  value={currentWeather?.temperature || "--"}
                  unit="°C"
                  icon={Thermometer}
                  description={currentWeather?.temperature && currentWeather.temperature > 30 ? 
                    "+2.1° from normal" : "Within normal range"}
                  severity={currentWeather?.temperature && currentWeather.temperature > 35 ? "critical" : 
                           currentWeather?.temperature && currentWeather.temperature > 32 ? "warning" : "normal"}
                />,
                
                <MetricCard
                  title="Humidity"
                  value={currentWeather?.humidity || "--"}
                  unit="%"
                  icon={Droplets}
                  description={currentWeather?.humidity && currentWeather.humidity < 40 ? 
                    "Low humidity" : "Normal levels"}
                />,
                
                <MetricCard
                  title="Air Quality Index"
                  value={currentWeather?.airQuality || "--"}
                  unit="AQI"
                  icon={Wind}
                  description={currentWeather?.airQuality && currentWeather.airQuality > 100 ? 
                    "Poor quality" : "Good quality"}
                  severity={currentWeather?.airQuality && currentWeather.airQuality > 150 ? "critical" : 
                           currentWeather?.airQuality && currentWeather.airQuality > 100 ? "warning" : "normal"}
                />,
                
                <MetricCard
                  title="Pressure"
                  value={currentWeather?.pressure || "--"}
                  unit="hPa"
                  icon={Gauge}
                  description="Atmospheric pressure"
                />
              ]}
            </StaggeredAnimation>
            
            {/* Weather Summary */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <MetricCard
                title="Weather"
                value={currentWeather?.description || "--"}
                icon={getWeatherIcon(currentWeather?.description)}
                description={`Current conditions in ${selectedCity.name}`}
                severity={currentWeather?.description?.toLowerCase().includes("thunder") ? "critical" : 
                          currentWeather?.description?.toLowerCase().includes("rain") ? "warning" : "normal"}
              />
              
              <MetricCard
                title="Last Updated"
                value={lastUpdated ? lastUpdated.toLocaleTimeString('en-IN', { 
                  hour: '2-digit', minute: '2-digit' 
                }) : "--"}
                icon={Clock}
                description={`Data for ${selectedCity.name}`}
              />
              
              <MetricCard
                title="Data Source"
                value="OpenWeather"
                icon={Globe}
                description="Weather API provider"
              />
            </motion.div>

            {/* Weather Trend Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="Temperature Trend (24h)"
                description={`Real-time temperature monitoring for ${selectedCity.name}`}
                data={trendData.map(item => ({ ...item, value: item.temperature }))}
                dataKey="temperature"
                color="hsl(var(--primary))"
                unit="°C"
              />
              
              <ChartCard
                title="Humidity Trend (24h)"
                description={`Humidity levels over time for ${selectedCity.name}`}
                data={trendData.map(item => ({ ...item, value: item.humidity }))}
                dataKey="humidity"
                color="hsl(var(--accent))"
                unit="%"
              />
            </div>
          </TabsContent>

          <TabsContent value="health" className="space-y-8">
            {/* Health Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-medium">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Respiratory Issues</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthData.respiratoryIncidents}</div>
                  <p className="text-xs text-muted-foreground">Cases this week</p>
                </CardContent>
              </Card>

              <Card className="shadow-medium">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Heat Stress</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthData.heatStress}</div>
                  <p className="text-xs text-muted-foreground">Reported incidents</p>
                </CardContent>
              </Card>

              <Card className="shadow-medium">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Allergic Reactions</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthData.allergicReactions}</div>
                  <p className="text-xs text-muted-foreground">Pollen-related cases</p>
                </CardContent>
              </Card>

              <Card className="shadow-medium">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Risk</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthData.overallRisk}%</div>
                  <Progress value={healthData.overallRisk} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Health Trend Chart */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Health Impact Correlation</CardTitle>
                <CardDescription>Relationship between environmental factors and health outcomes for {selectedCity.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="temperature" stroke="hsl(var(--alert-danger))" strokeWidth={2} />
                    <Line type="monotone" dataKey="humidity" stroke="hsl(var(--accent))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-8">
            {/* Prediction Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-medium border-alert-warning/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-alert-warning" />
                    <span>Heatwave Prediction</span>
                  </CardTitle>
                  <CardDescription>AI-powered weather forecasting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Risk Level</span>
                      <Badge variant="secondary">Medium</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Probability</span>
                      <span className="font-bold">68%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Timeline</span>
                      <span>Next 3-5 days</span>
                    </div>
                    <Progress value={68} className="mt-4" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-medium border-alert-info/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-alert-info" />
                    <span>Disease Outbreak Risk</span>
                  </CardTitle>
                  <CardDescription>Epidemiological modeling</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Risk Level</span>
                      <Badge variant="outline">Low</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Probability</span>
                      <span className="font-bold">23%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Primary Factor</span>
                      <span>Air Quality</span>
                    </div>
                    <Progress value={23} className="mt-4" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ML Model Performance */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Model Performance Metrics</CardTitle>
                <CardDescription>Real-time accuracy and confidence intervals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">94.2%</div>
                    <p className="text-sm text-muted-foreground">Heatwave Accuracy</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">87.8%</div>
                    <p className="text-sm text-muted-foreground">Health Prediction</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-alert-success">99.1%</div>
                    <p className="text-sm text-muted-foreground">Data Ingestion</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;