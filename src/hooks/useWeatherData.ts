import { useState, useEffect, useCallback } from "react";
import { IndianCity } from "@/components/CitySelector";

export interface WeatherData {
  temperature: number;
  humidity: number;
  pressure: number;
  airQuality: number;
  description: string;
  timestamp: Date;
}

export interface WeatherTrend {
  time: string;
  temperature: number;
  humidity: number;
  value: number; // For ChartCard compatibility
}

// Mock data generator for demonstration
const generateMockWeatherData = (city: IndianCity): WeatherData => {
  // Base temperatures for different cities (realistic ranges)
  const baseTempMap: Record<string, number> = {
    MUM: 28, // Mumbai - warm coastal
    DEL: 25, // Delhi - continental
    BLR: 22, // Bengaluru - pleasant climate
    CHE: 30, // Chennai - hot coastal
    KOL: 27, // Kolkata - humid
    HYD: 26, // Hyderabad - dry heat
    PUN: 24, // Pune - moderate
    AMD: 29, // Ahmedabad - hot
  };

  const baseTemp = baseTempMap[city.code] || 25;
  const variation = Math.random() * 6 - 3; // ±3°C variation

  const temperature = Math.round(baseTemp + variation);
  const humidity = Math.round(50 + Math.random() * 40); // 50-90%
  const pressure = Math.round(1010 + Math.random() * 20); // 1010-1030 hPa
  const airQuality = Math.round(50 + Math.random() * 100); // 50-150 AQI

  // Derive a realistic condition description based on humidity + randomness
  const r = Math.random();
  let description = "Clear";
  if (humidity > 85) {
    description = r > 0.2 ? "Rain" : "Thunderstorm";
  } else if (humidity > 70) {
    description = r > 0.5 ? "Cloudy" : "Drizzle";
  } else if (r < 0.15) {
    description = "Windy";
  } else {
    description = "Clear";
  }

  return {
    temperature,
    humidity,
    pressure,
    airQuality,
    description,
    timestamp: new Date(),
  };
};

const generateMockTrendData = (): WeatherTrend[] => {
  const data: WeatherTrend[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const temp = 20 + Math.sin(i * 0.3) * 8 + Math.random() * 4;
    const humid = 50 + Math.cos(i * 0.2) * 20 + Math.random() * 10;
    data.push({
      time: time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      temperature: temp,
      humidity: humid,
      value: temp, // Default value for chart
    });
  }
  
  return data;
};

export const useWeatherData = (city: IndianCity) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [trendData, setTrendData] = useState<WeatherTrend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchWeatherData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Replace with actual API call to OpenWeatherMap
      // const response = await fetch(
      //   `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates.lat}&lon=${city.coordinates.lon}&appid=${API_KEY}&units=metric`
      // );
      
      // For now, use mock data
      const mockData = generateMockWeatherData(city);
      const mockTrend = generateMockTrendData();
      
      setCurrentWeather(mockData);
      setTrendData(mockTrend);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  }, [city]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchWeatherData]);

  return {
    currentWeather,
    trendData,
    loading,
    error,
    lastUpdated,
    refetch: fetchWeatherData,
  };
};