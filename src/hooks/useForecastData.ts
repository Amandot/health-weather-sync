import { useQuery } from "@tanstack/react-query";

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
      pressure: number;
    };
    weather: Array<{
      main: string;
      description: string;
    }>;
  }>;
  city: {
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
  };
}

const fetchForecastData = async (city: string): Promise<ForecastData> => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error("OpenWeatherMap API key not found. Please set VITE_OPENWEATHER_API_KEY in your environment variables.");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
  );

  if (!response.ok) {
    throw new Error(`Forecast API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const useForecastData = (city: string) => {
  return useQuery({
    queryKey: ['forecast', city],
    queryFn: () => fetchForecastData(city),
    staleTime: 60000, // 1 minute
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};