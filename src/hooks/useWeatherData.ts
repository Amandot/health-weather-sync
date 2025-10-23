import { useQuery } from "@tanstack/react-query";

export interface WeatherData {
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  dt: number;
  name: string;
}

const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error("OpenWeatherMap API key not found. Please set VITE_OPENWEATHER_API_KEY in your environment variables.");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
  );

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const useWeatherData = (city: string) => {
  return useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeatherData(city),
    staleTime: 60000, // 1 minute
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};