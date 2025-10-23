import { useState, useEffect } from "react";
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
import { useAirQualityData } from "@/hooks/useAirQualityData";
import { useForecastData } from "@/hooks/useForecastData";
import { WeatherCharts } from "./WeatherCharts";
import { formatTimestamp, formatChartTime } from "@/lib/utils";

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
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);
  
  // Fetch weather data using the city name
  const { 
    data: weatherData, 
    isLoading: isLoadingWeather, 
    isError: isErrorWeather,
    refetch: refetchWeather
  } = useWeatherData(selectedCity.name);

  // Get coordinates from weather data for air quality
  const lat = weatherData?.coord?.lat;
  const lon = weatherData?.coord?.lon;

  // Fetch air quality data
  const { 
    data: aqiData, 
    isLoading: isLoadingAqi, 
    isError: isErrorAqi,
    refetch: refetchAqi
  } = useAirQualityData(lat, lon);

  // Fetch forecast data
  const { 
    data: forecastData, 
    isLoading: isLoadingForecast, 
    isError: isErrorForecast,
    refetch: refetchForecast
  } = useForecastData(selectedCity.name);

  const refreshData = async () => {
    setHealthData(generateHealthData());
    // Refetch all weather data simultaneously
    await Promise.all([
      refetchWeather(),
      refetchAqi(),
      refetchForecast()
    ]);
    // Update the last fetch time to current time
    setLastFetchTime(new Date());
  };

  // Set initial fetch time when data is first loaded
  useEffect(() => {
    if (weatherData && !lastFetchTime) {
      setLastFetchTime(new Date());
    }
  }, [weatherData, lastFetchTime]);

  // Loading and error states
  const isLoading = isLoadingWeather || isLoadingAqi || isLoadingForecast;
  const isError = isErrorWeather || isErrorAqi || isErrorForecast;

  // Process forecast data for charts (first 8 entries for ~24 hours)
  const chartData = forecastData?.list?.slice(0, 8).map(item => ({
    time: formatChartTime(item.dt),
    temperature: Math.round(item.main.temp),
    humidity: item.main.humidity
  })) || [];

  // Generate alerts based on current weather
  const generateAlerts = () => {
    if (!weatherData) return [];
    
    const alerts = [];
    const temperature = weatherData.main.temp;
    const airQuality = aqiData?.list?.[0]?.main?.aqi;
    const humidity = weatherData.main.humidity;
    
    if (temperature > 35) {
      alerts.push({
        id: "heat-1",
        message: `Extreme heat alert: ${Math.round(temperature)}°C in ${selectedCity.name}`,
        level: "critical" as AlertLevel,
        type: "heatwave" as const,
        timestamp: new Date(),
      });
    } else if (temperature > 32) {
      alerts.push({
        id: "heat-2", 
        message: `High temperature alert: ${Math.round(temperature)}°C detected`,
        level: "high" as AlertLevel,
        type: "heatwave" as const,
        timestamp: new Date(),
      });
    }
    
    if (airQuality && airQuality > 4) { // AQI scale 1-5, where 5 is very poor
      alerts.push({
        id: "aqi-1",
        message: "Poor air quality detected - AQI level 5",
        level: "high" as AlertLevel,
        type: "air-quality" as const,
        timestamp: new Date(),
      });
    } else if (airQuality && airQuality > 3) {
      alerts.push({
        id: "aqi-2",
        message: "Moderate air quality - AQI above normal levels", 
        level: "medium" as AlertLevel,
        type: "air-quality" as const,
        timestamp: new Date(),
      });
    }
    
    if (humidity < 40) {
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
    if (isError) return { status: "error", message: "API Connection Failed" };
    if (isLoading) return { status: "loading", message: "Connecting..." };
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg">Loading weather data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 mx-auto mb-4 text-destructive" />
          <p className="text-lg mb-4">Failed to load weather data</p>
          <Button onClick={refreshData}>Try Again</Button>
        </div>
      </div>
    );
  }

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
                  {lastFetchTime ? `Last updated: ${lastFetchTime.toLocaleTimeString('en-US', { 
                    hour: '2-digit', minute: '2-digit', hour12: true 
                  })}` : 'Loading...'}
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
                disabled={isLoading}
                className="flex items-center space-x-2 hover-glow"
                size="sm"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
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
                  value={weatherData ? Math.round(weatherData.main.temp) : "--"}
                  unit="°C"
                  icon={Thermometer}
                  description={weatherData?.main.temp && weatherData.main.temp > 30 ? 
                    "+2.1° from normal" : "Within normal range"}
                  severity={weatherData?.main.temp && weatherData.main.temp > 35 ? "critical" : 
                           weatherData?.main.temp && weatherData.main.temp > 32 ? "warning" : "normal"}
                />,
                
                <MetricCard
                  title="Humidity"
                  value={weatherData?.main.humidity || "--"}
                  unit="%"
                  icon={Droplets}
                  description={weatherData?.main.humidity && weatherData.main.humidity < 40 ? 
                    "Low humidity" : "Normal levels"}
                />,
                
                <MetricCard
                  title="Air Quality Index"
                  value={aqiData?.list?.[0]?.main?.aqi || "--"}
                  unit="AQI"
                  icon={Wind}
                  description={aqiData?.list?.[0]?.main?.aqi && aqiData.list[0].main.aqi > 3 ? 
                    "Poor quality" : "Good quality"}
                  severity={aqiData?.list?.[0]?.main?.aqi && aqiData.list[0].main.aqi > 4 ? "critical" : 
                           aqiData?.list?.[0]?.main?.aqi && aqiData.list[0].main.aqi > 3 ? "warning" : "normal"}
                />,
                
                <MetricCard
                  title="Pressure"
                  value={weatherData?.main.pressure || "--"}
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
                value={weatherData?.weather?.[0]?.main || "--"}
                icon={getWeatherIcon(weatherData?.weather?.[0]?.main)}
                description={`Current conditions in ${selectedCity.name}`}
                severity={weatherData?.weather?.[0]?.main?.toLowerCase().includes("thunder") ? "critical" : 
                          weatherData?.weather?.[0]?.main?.toLowerCase().includes("rain") ? "warning" : "normal"}
              />
              
              <MetricCard
                title="Last Updated"
                value={lastFetchTime ? lastFetchTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', minute: '2-digit', hour12: true 
                }) : "--"}
                icon={Clock}
                description={`Data fetched for ${selectedCity.name}`}
              />
              
              <MetricCard
                title="Data Source"
                value="OpenWeather"
                icon={Globe}
                description="Weather API provider"
              />
            </motion.div>

            {/* Weather Trend Charts */}
            <WeatherCharts data={chartData} cityName={selectedCity.name} />
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
                  <LineChart data={chartData}>
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