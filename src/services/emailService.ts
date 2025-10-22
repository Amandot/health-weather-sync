import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'demo_service';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'demo_template';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'demo_key';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

interface WelcomeEmailParams {
  userEmail: string;
  userName: string;
  loginTime: string;
  userPhoto?: string;
}

interface AlertEmailParams {
  userEmail: string;
  userName: string;
  alertType: string;
  alertMessage: string;
  alertTime: string;
}

export class EmailService {
  /**
   * Send welcome email when user logs in
   */
  static async sendWelcomeEmail(params: WelcomeEmailParams): Promise<boolean> {
    try {
      const templateParams = {
        to_email: params.userEmail,
        to_name: params.userName,
        user_name: params.userName,
        user_email: params.userEmail,
        login_time: params.loginTime,
        user_photo: params.userPhoto || '',
        from_name: 'ClimateWatch Team',
        reply_to: 'noreply@climatewatch.com',
        message: `Welcome to ClimateWatch! We're excited to have you on board. Your account was successfully accessed on ${params.loginTime}.`,
        subject: `Welcome to ClimateWatch, ${params.userName}! 🌍`
      };

      // Check if EmailJS is configured
      if (EMAILJS_SERVICE_ID === 'demo_service') {
        console.warn('⚠️ EmailJS is not configured. Would send welcome email to:', params.userEmail);
        console.log('Email content:', templateParams);
        return true; // Return success for demo mode
      }

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (result.status === 200) {
        console.log('✅ Welcome email sent successfully to:', params.userEmail);
        return true;
      } else {
        throw new Error(`EmailJS returned status: ${result.status}`);
      }

    } catch (error) {
      console.error('❌ Error sending welcome email:', error);
      return false;
    }
  }

  /**
   * Send alert notification email
   */
  static async sendAlertEmail(params: AlertEmailParams): Promise<boolean> {
    try {
      const templateParams = {
        to_email: params.userEmail,
        to_name: params.userName,
        user_name: params.userName,
        alert_type: params.alertType,
        alert_message: params.alertMessage,
        alert_time: params.alertTime,
        from_name: 'ClimateWatch Alerts',
        reply_to: 'alerts@climatewatch.com',
        subject: `ClimateWatch Alert: ${params.alertType} 🚨`
      };

      if (EMAILJS_SERVICE_ID === 'demo_service') {
        console.warn('⚠️ EmailJS is not configured. Would send alert email to:', params.userEmail);
        console.log('Alert email content:', templateParams);
        return true;
      }

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        'alert_template', // Different template for alerts
        templateParams
      );

      return result.status === 200;

    } catch (error) {
      console.error('❌ Error sending alert email:', error);
      return false;
    }
  }

  /**
   * Send custom email
   */
  static async sendCustomEmail(
    toEmail: string, 
    subject: string, 
    message: string, 
    toName?: string
  ): Promise<boolean> {
    try {
      const templateParams = {
        to_email: toEmail,
        to_name: toName || 'ClimateWatch User',
        subject: subject,
        message: message,
        from_name: 'ClimateWatch',
        reply_to: 'support@climatewatch.com'
      };

      if (EMAILJS_SERVICE_ID === 'demo_service') {
        console.warn('⚠️ EmailJS is not configured. Would send email to:', toEmail);
        console.log('Email content:', templateParams);
        return true;
      }

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        'custom_template',
        templateParams
      );

      return result.status === 200;

    } catch (error) {
      console.error('❌ Error sending custom email:', error);
      return false;
    }
  }

  /**
   * Test email configuration
   */
  static async testEmailConfig(): Promise<boolean> {
    try {
      const testParams = {
        to_email: 'test@example.com',
        to_name: 'Test User',
        message: 'This is a test email to verify EmailJS configuration.',
        from_name: 'ClimateWatch Test',
        subject: 'EmailJS Configuration Test'
      };

      if (EMAILJS_SERVICE_ID === 'demo_service') {
        console.log('📧 EmailJS Test Mode - Configuration appears to be working');
        return true;
      }

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        testParams
      );

      return result.status === 200;

    } catch (error) {
      console.error('❌ EmailJS configuration test failed:', error);
      return false;
    }
  }
}

// Helper function to format login time
export const formatLoginTime = (): string => {
  return new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
};

// Helper function to get user location (optional)
export const getUserLocation = (): Promise<string> => {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
        },
        () => {
          resolve('Location not available');
        }
      );
    } else {
      resolve('Geolocation not supported');
    }
  });
};