import { useQuery } from "@tanstack/react-query";

export interface AirQualityData {
  list: Array<{
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
  }>;
}

const fetchAirQualityData = async (lat: number, lon: number): Promise<AirQualityData> => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error("OpenWeatherMap API key not found. Please set VITE_OPENWEATHER_API_KEY in your environment variables.");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );

  if (!response.ok) {
    throw new Error(`Air Quality API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const useAirQualityData = (lat?: number, lon?: number) => {
  return useQuery({
    queryKey: ['airQuality', lat, lon],
    queryFn: () => fetchAirQualityData(lat!, lon!),
    enabled: !!lat && !!lon,
    staleTime: 60000, // 1 minute
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};