import emailjs from '@emailjs/browser';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { EmailLogger } from './emailLogger';

// Configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'demo_service';
const EMAILJS_DAILY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_DAILY_TEMPLATE_ID || 'daily_template';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'demo_key';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize services
emailjs.init(EMAILJS_PUBLIC_KEY);
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

export interface DailyWeatherData {
  city: string;
  temperature: number;
  humidity: number;
  pressure: number;
  airQuality: number;
  uvIndex: number;
  windSpeed: number;
  description: string;
  healthRisk: 'low' | 'medium' | 'high' | 'critical';
}

export interface HealthInsights {
  overallRisk: string;
  recommendations: string[];
  healthTips: string[];
  airQualityAdvice: string;
  uvProtection: string;
  exerciseRecommendation: string;
}

export interface DailyEmailData {
  userEmail: string;
  userName: string;
  date: string;
  weatherData: DailyWeatherData[];
  healthInsights: HealthInsights;
  summary: string;
}

export class DailyEmailService {
  /**
   * Generate AI-powered health insights using Gemini
   */
  private static async generateHealthInsights(weatherData: DailyWeatherData[]): Promise<HealthInsights> {
    if (!genAI) {
      // Fallback insights when Gemini is not available
      return this.getFallbackInsights(weatherData);
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `
        Based on the following weather and environmental data for Indian cities, provide comprehensive health insights:
        
        ${weatherData.map(data => `
        City: ${data.city}
        Temperature: ${data.temperature}°C
        Humidity: ${data.humidity}%
        Air Quality Index: ${data.airQuality}
        UV Index: ${data.uvIndex}
        Wind Speed: ${data.windSpeed} km/h
        Conditions: ${data.description}
        `).join('\n')}
        
        Please provide:
        1. Overall health risk assessment
        2. 3-4 specific health recommendations
        3. 3-4 practical health tips for today
        4. Air quality advice
        5. UV protection guidance
        6. Exercise recommendations
        
        Format as JSON with keys: overallRisk, recommendations (array), healthTips (array), airQualityAdvice, uvProtection, exerciseRecommendation
        Keep responses concise and actionable for Indian climate conditions.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to parse JSON response
      try {
        const insights = JSON.parse(text);
        return insights;
      } catch {
        // If JSON parsing fails, create structured response from text
        return this.parseTextToInsights(text, weatherData);
      }
    } catch (error) {
      console.error('Error generating AI insights:', error);
      return this.getFallbackInsights(weatherData);
    }
  }

  /**
   * Parse text response to structured insights
   */
  private static parseTextToInsights(text: string, weatherData: DailyWeatherData[]): HealthInsights {
    const lines = text.split('\n').filter(line => line.trim());
    
    return {
      overallRisk: this.extractSection(lines, 'overall') || this.calculateOverallRisk(weatherData),
      recommendations: this.extractListItems(lines, 'recommendation') || this.getDefaultRecommendations(weatherData),
      healthTips: this.extractListItems(lines, 'tip') || this.getDefaultHealthTips(),
      airQualityAdvice: this.extractSection(lines, 'air quality') || this.getAirQualityAdvice(weatherData),
      uvProtection: this.extractSection(lines, 'uv') || this.getUVAdvice(weatherData),
      exerciseRecommendation: this.extractSection(lines, 'exercise') || this.getExerciseAdvice(weatherData)
    };
  }

  /**
   * Extract section from text lines
   */
  private static extractSection(lines: string[], keyword: string): string {
    const relevantLines = lines.filter(line => 
      line.toLowerCase().includes(keyword.toLowerCase())
    );
    return relevantLines.join(' ').trim();
  }

  /**
   * Extract list items from text
   */
  private static extractListItems(lines: string[], keyword: string): string[] {
    const items: string[] = [];
    let inSection = false;
    
    for (const line of lines) {
      if (line.toLowerCase().includes(keyword.toLowerCase())) {
        inSection = true;
        continue;
      }
      
      if (inSection && (line.startsWith('-') || line.startsWith('•') || line.match(/^\d+\./))) {
        items.push(line.replace(/^[-•\d.]\s*/, '').trim());
      } else if (inSection && line.trim() === '') {
        break;
      }
    }
    
    return items.length > 0 ? items : [];
  }

  /**
   * Fallback insights when AI is not available
   */
  private static getFallbackInsights(weatherData: DailyWeatherData[]): HealthInsights {
    const avgTemp = weatherData.reduce((sum, data) => sum + data.temperature, 0) / weatherData.length;
    const maxAQI = Math.max(...weatherData.map(data => data.airQuality));
    const maxUV = Math.max(...weatherData.map(data => data.uvIndex));

    return {
      overallRisk: this.calculateOverallRisk(weatherData),
      recommendations: this.getDefaultRecommendations(weatherData),
      healthTips: this.getDefaultHealthTips(),
      airQualityAdvice: this.getAirQualityAdvice(weatherData),
      uvProtection: this.getUVAdvice(weatherData),
      exerciseRecommendation: this.getExerciseAdvice(weatherData)
    };
  }

  /**
   * Calculate overall health risk
   */
  private static calculateOverallRisk(weatherData: DailyWeatherData[]): string {
    const avgTemp = weatherData.reduce((sum, data) => sum + data.temperature, 0) / weatherData.length;
    const maxAQI = Math.max(...weatherData.map(data => data.airQuality));
    const maxUV = Math.max(...weatherData.map(data => data.uvIndex));

    if (avgTemp > 40 || maxAQI > 200 || maxUV > 8) {
      return "High risk day - Take extra precautions for heat, air quality, and UV exposure";
    } else if (avgTemp > 35 || maxAQI > 100 || maxUV > 6) {
      return "Moderate risk - Be mindful of outdoor activities and sun exposure";
    } else {
      return "Low to moderate risk - Generally safe conditions with normal precautions";
    }
  }

  /**
   * Get default recommendations based on weather data
   */
  private static getDefaultRecommendations(weatherData: DailyWeatherData[]): string[] {
    const recommendations: string[] = [];
    const avgTemp = weatherData.reduce((sum, data) => sum + data.temperature, 0) / weatherData.length;
    const maxAQI = Math.max(...weatherData.map(data => data.airQuality));

    if (avgTemp > 35) {
      recommendations.push("Stay hydrated - drink water every 30 minutes");
      recommendations.push("Avoid outdoor activities during 11 AM - 4 PM");
    }

    if (maxAQI > 100) {
      recommendations.push("Wear N95 masks when outdoors");
      recommendations.push("Keep windows closed and use air purifiers indoors");
    }

    recommendations.push("Monitor elderly and children for heat-related symptoms");
    
    return recommendations;
  }

  /**
   * Get default health tips
   */
  private static getDefaultHealthTips(): string[] {
    return [
      "Start your day with a glass of water and light stretching",
      "Eat cooling foods like cucumber, watermelon, and yogurt",
      "Take breaks in shade or AC every hour if working outdoors",
      "Check air quality before planning outdoor exercise"
    ];
  }

  /**
   * Get air quality advice
   */
  private static getAirQualityAdvice(weatherData: DailyWeatherData[]): string {
    const maxAQI = Math.max(...weatherData.map(data => data.airQuality));
    
    if (maxAQI > 200) {
      return "Very unhealthy air quality. Avoid all outdoor activities. Use air purifiers and keep windows closed.";
    } else if (maxAQI > 100) {
      return "Unhealthy for sensitive groups. Limit outdoor exposure and wear masks when outside.";
    } else if (maxAQI > 50) {
      return "Moderate air quality. Sensitive individuals should consider limiting prolonged outdoor exertion.";
    } else {
      return "Good air quality. Safe for all outdoor activities.";
    }
  }

  /**
   * Get UV protection advice
   */
  private static getUVAdvice(weatherData: DailyWeatherData[]): string {
    const maxUV = Math.max(...weatherData.map(data => data.uvIndex));
    
    if (maxUV > 8) {
      return "Very high UV levels. Use SPF 30+ sunscreen, wear protective clothing, and seek shade between 10 AM - 4 PM.";
    } else if (maxUV > 6) {
      return "High UV levels. Apply SPF 15+ sunscreen and wear a hat when outdoors.";
    } else if (maxUV > 3) {
      return "Moderate UV levels. Use sunscreen during midday hours.";
    } else {
      return "Low UV levels. Minimal sun protection required.";
    }
  }

  /**
   * Get exercise recommendations
   */
  private static getExerciseAdvice(weatherData: DailyWeatherData[]): string {
    const avgTemp = weatherData.reduce((sum, data) => sum + data.temperature, 0) / weatherData.length;
    const maxAQI = Math.max(...weatherData.map(data => data.airQuality));

    if (avgTemp > 35 || maxAQI > 150) {
      return "Exercise indoors today. Try yoga, indoor cycling, or gym workouts with good ventilation.";
    } else if (avgTemp > 30 || maxAQI > 100) {
      return "Exercise early morning (6-8 AM) or evening (6-8 PM). Stay hydrated and take frequent breaks.";
    } else {
      return "Good conditions for outdoor exercise. Morning and evening are ideal times.";
    }
  }

  /**
   * Fetch current weather data for cities
   */
  private static async fetchWeatherData(cities: string[]): Promise<DailyWeatherData[]> {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      // Return mock data for demo
      return this.getMockWeatherData(cities);
    }

    const weatherPromises = cities.map(async (city) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
        );
        
        if (!response.ok) throw new Error(`Weather API error for ${city}`);
        
        const data = await response.json();
        
        return {
          city,
          temperature: Math.round(data.main.temp),
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          airQuality: Math.floor(Math.random() * 200) + 50, // Mock AQI
          uvIndex: Math.floor(Math.random() * 10) + 1, // Mock UV
          windSpeed: Math.round(data.wind?.speed * 3.6) || 0, // Convert m/s to km/h
          description: data.weather[0].description,
          healthRisk: this.calculateHealthRisk(data.main.temp, Math.floor(Math.random() * 200) + 50)
        };
      } catch (error) {
        console.error(`Error fetching weather for ${city}:`, error);
        return this.getMockCityData(city);
      }
    });

    return Promise.all(weatherPromises);
  }

  /**
   * Calculate health risk based on temperature and AQI
   */
  private static calculateHealthRisk(temp: number, aqi: number): 'low' | 'medium' | 'high' | 'critical' {
    if (temp > 40 || aqi > 200) return 'critical';
    if (temp > 35 || aqi > 150) return 'high';
    if (temp > 30 || aqi > 100) return 'medium';
    return 'low';
  }

  /**
   * Get mock weather data for demo
   */
  private static getMockWeatherData(cities: string[]): DailyWeatherData[] {
    return cities.map(city => this.getMockCityData(city));
  }

  /**
   * Get mock data for a specific city
   */
  private static getMockCityData(city: string): DailyWeatherData {
    const baseTemp = city === 'Mumbai' ? 32 : city === 'Delhi' ? 35 : 30;
    const temp = baseTemp + Math.floor(Math.random() * 8) - 4;
    const aqi = Math.floor(Math.random() * 200) + 50;
    
    return {
      city,
      temperature: temp,
      humidity: Math.floor(Math.random() * 40) + 60,
      pressure: Math.floor(Math.random() * 50) + 1000,
      airQuality: aqi,
      uvIndex: Math.floor(Math.random() * 10) + 1,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      description: temp > 35 ? 'hot and sunny' : temp > 25 ? 'warm and clear' : 'pleasant',
      healthRisk: this.calculateHealthRisk(temp, aqi)
    };
  }

  /**
   * Send daily health and weather email
   */
  static async sendDailyEmail(params: {
    userEmail: string;
    userName: string;
    cities: string[];
    type?: 'daily' | 'test' | 'demo';
  }): Promise<boolean> {
    const startTime = Date.now();
    const emailType = params.type || 'daily';
    
    // Log the email attempt
    const logId = EmailLogger.logEmail({
      email: params.userEmail,
      userName: params.userName,
      status: 'pending',
      type: emailType,
      cities: params.cities
    });

    try {
      // Fetch weather data
      const weatherData = await this.fetchWeatherData(params.cities);
      
      // Generate AI insights
      const healthInsights = await this.generateHealthInsights(weatherData);
      
      // Create email data
      const emailData: DailyEmailData = {
        userEmail: params.userEmail,
        userName: params.userName,
        date: new Date().toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        weatherData,
        healthInsights,
        summary: `Today's weather summary for ${params.cities.join(', ')}: ${healthInsights.overallRisk}`
      };

      // Prepare email template parameters - Clean and simple
      const templateParams = {
        to_email: params.userEmail || 'user@example.com',
        user_name: params.userName || 'User',
        date: emailData.date || new Date().toLocaleDateString('en-IN'),
        summary: emailData.summary || 'Daily weather and health report',
        overall_risk: healthInsights.overallRisk || 'Moderate risk conditions',
        recommendations: this.cleanText(healthInsights.recommendations.join('\n• ')),
        health_tips: this.cleanText(healthInsights.healthTips.join('\n• ')),
        air_quality_advice: this.cleanText(healthInsights.airQualityAdvice),
        uv_protection: this.cleanText(healthInsights.uvProtection),
        exercise_recommendation: this.cleanText(healthInsights.exerciseRecommendation),
        weather_data: this.formatWeatherData(weatherData)
      };

      // Send email
      if (EMAILJS_SERVICE_ID === 'demo_service') {
        console.warn('⚠️ EmailJS is not configured. Would send daily email to:', params.userEmail);
        console.log('Daily email content:', templateParams);
        return true;
      }

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_DAILY_TEMPLATE_ID,
        templateParams
      );

      if (result.status === 200) {
        const deliveryTime = Date.now() - startTime;
        
        // Update log with success
        EmailLogger.updateLog(logId, {
          status: 'sent',
          deliveryTime,
          emailData: templateParams
        });
        
        console.log('✅ Daily email sent successfully to:', params.userEmail);
        return true;
      } else {
        throw new Error(`EmailJS returned status: ${result.status}`);
      }

    } catch (error) {
      const deliveryTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Update log with failure
      EmailLogger.updateLog(logId, {
        status: 'failed',
        deliveryTime,
        error: errorMessage
      });
      
      console.error('❌ Error sending daily email:', error);
      return false;
    }
  }

  /**
   * Format weather data for email template
   */
  private static formatWeatherData(weatherData: DailyWeatherData[]): string {
    return weatherData.map(data => 
      `${data.city}: ${data.temperature}°C, ${data.description}, AQI: ${data.airQuality}, UV: ${data.uvIndex}`
    ).join('\n');
  }

  /**
   * Clean text to prevent EmailJS variable corruption
   */
  private static cleanText(text: string): string {
    if (!text) return 'Information not available';
    
    return text
      .replace(/[{}]/g, '') // Remove curly braces that might interfere with templates
      .replace(/\n{3,}/g, '\n\n') // Limit consecutive newlines
      .replace(/\s{3,}/g, ' ') // Limit consecutive spaces
      .trim() // Remove leading/trailing whitespace
      .substring(0, 1000); // Limit length to prevent issues
  }

  /**
   * Schedule daily emails (to be called by a scheduler)
   */
  static async scheduleDailyEmails(users: Array<{
    email: string;
    name: string;
    cities: string[];
    enabled: boolean;
  }>): Promise<void> {
    console.log(`📧 Starting daily email batch for ${users.length} users`);
    
    const enabledUsers = users.filter(user => user.enabled);
    
    for (const user of enabledUsers) {
      try {
        await this.sendDailyEmail({
          userEmail: user.email,
          userName: user.name,
          cities: user.cities
        });
        
        // Add delay between emails to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`Failed to send daily email to ${user.email}:`, error);
      }
    }
    
    console.log(`✅ Daily email batch completed`);
  }
}