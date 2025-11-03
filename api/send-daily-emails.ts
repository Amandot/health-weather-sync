import type { VercelRequest, VercelResponse } from '@vercel/node';

// This is a Vercel serverless function for sending daily emails
// Deploy this to handle scheduled email sending in production

interface UserEmailPreferences {
  email: string;
  name: string;
  cities: string[];
  enabled: boolean;
  time: string;
  frequency: 'daily' | 'weekdays' | 'weekends';
  timezone: string;
}

interface WeatherData {
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

// Mock function - replace with actual database queries
async function getUserPreferences(): Promise<UserEmailPreferences[]> {
  // In production, fetch from your database (Firebase, Supabase, etc.)
  return [
    {
      email: 'user@example.com',
      name: 'Test User',
      cities: ['Mumbai', 'Delhi'],
      enabled: true,
      time: '08:00',
      frequency: 'daily',
      timezone: 'Asia/Kolkata'
    }
  ];
}

async function fetchWeatherData(cities: string[]): Promise<WeatherData[]> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    // Return mock data if no API key
    return cities.map(city => ({
      city,
      temperature: Math.floor(Math.random() * 15) + 25,
      humidity: Math.floor(Math.random() * 40) + 60,
      pressure: Math.floor(Math.random() * 50) + 1000,
      airQuality: Math.floor(Math.random() * 200) + 50,
      uvIndex: Math.floor(Math.random() * 10) + 1,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      description: 'partly cloudy',
      healthRisk: 'medium' as const
    }));
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
        windSpeed: Math.round(data.wind?.speed * 3.6) || 0,
        description: data.weather[0].description,
        healthRisk: calculateHealthRisk(data.main.temp, Math.floor(Math.random() * 200) + 50)
      };
    } catch (error) {
      console.error(`Error fetching weather for ${city}:`, error);
      return {
        city,
        temperature: 30,
        humidity: 70,
        pressure: 1013,
        airQuality: 100,
        uvIndex: 5,
        windSpeed: 10,
        description: 'data unavailable',
        healthRisk: 'medium' as const
      };
    }
  });

  return Promise.all(weatherPromises);
}

function calculateHealthRisk(temp: number, aqi: number): 'low' | 'medium' | 'high' | 'critical' {
  if (temp > 40 || aqi > 200) return 'critical';
  if (temp > 35 || aqi > 150) return 'high';
  if (temp > 30 || aqi > 100) return 'medium';
  return 'low';
}

async function sendEmailViaEmailJS(emailData: any): Promise<boolean> {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_DAILY_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error('EmailJS configuration missing');
    return false;
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: emailData
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending email via EmailJS:', error);
    return false;
  }
}

function shouldSendToday(frequency: string): boolean {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday

  switch (frequency) {
    case 'weekdays':
      return dayOfWeek >= 1 && dayOfWeek <= 5;
    case 'weekends':
      return dayOfWeek === 0 || dayOfWeek === 6;
    case 'daily':
    default:
      return true;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Verify this is a scheduled request (add authentication in production)
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('🚀 Starting daily email batch job');

    // Get all user preferences
    const users = await getUserPreferences();
    const enabledUsers = users.filter(user => user.enabled && shouldSendToday(user.frequency));

    console.log(`📧 Processing ${enabledUsers.length} users for daily emails`);

    let successCount = 0;
    let errorCount = 0;

    for (const user of enabledUsers) {
      try {
        // Fetch weather data for user's cities
        const weatherData = await fetchWeatherData(user.cities);

        // Prepare email data
        const emailData = {
          to_email: user.email,
          to_name: user.name,
          user_name: user.name,
          date: new Date().toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          summary: `Today's weather summary for ${user.cities.join(', ')}`,
          weather_data: weatherData.map(data => 
            `${data.city}: ${data.temperature}°C, ${data.description}, AQI: ${data.airQuality}, UV: ${data.uvIndex}`
          ).join('\n'),
          overall_risk: 'Moderate risk - Be mindful of outdoor activities',
          recommendations: [
            'Stay hydrated throughout the day',
            'Avoid outdoor activities during peak hours',
            'Use sunscreen when going outside'
          ].join('\n• '),
          health_tips: [
            'Start your day with a glass of water',
            'Take breaks in shade or AC every hour',
            'Monitor air quality before exercising'
          ].join('\n• '),
          air_quality_advice: 'Moderate air quality. Sensitive individuals should limit outdoor exposure.',
          uv_protection: 'Use SPF 30+ sunscreen and wear protective clothing.',
          exercise_recommendation: 'Best exercise times: 6-8 AM or 6-8 PM.',
          from_name: 'ClimateWatch Daily',
          reply_to: 'daily@climatewatch.com',
          subject: `🌍 Your Daily Health & Weather Report - ${new Date().toLocaleDateString('en-IN')}`
        };

        // Send email
        const success = await sendEmailViaEmailJS(emailData);
        
        if (success) {
          successCount++;
          console.log(`✅ Email sent to ${user.email}`);
        } else {
          errorCount++;
          console.error(`❌ Failed to send email to ${user.email}`);
        }

        // Add delay between emails
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        errorCount++;
        console.error(`❌ Error processing user ${user.email}:`, error);
      }
    }

    console.log(`📊 Daily email batch completed: ${successCount} sent, ${errorCount} failed`);

    res.status(200).json({
      success: true,
      processed: enabledUsers.length,
      sent: successCount,
      failed: errorCount,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Daily email batch job failed:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}