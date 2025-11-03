import { DailyEmailService } from './dailyEmailService';

export interface UserEmailPreferences {
  email: string;
  name: string;
  cities: string[];
  enabled: boolean;
  time: string; // HH:MM format
  frequency: 'daily' | 'weekdays' | 'weekends';
  timezone: string;
}

export class EmailScheduler {
  private static users: UserEmailPreferences[] = [];
  private static isRunning = false;
  private static intervalId: NodeJS.Timeout | null = null;

  /**
   * Add or update user email preferences
   */
  static addUser(preferences: UserEmailPreferences): void {
    const existingIndex = this.users.findIndex(user => user.email === preferences.email);
    
    if (existingIndex >= 0) {
      this.users[existingIndex] = preferences;
    } else {
      this.users.push(preferences);
    }

    // Save to localStorage for persistence
    this.saveToStorage();
    
    console.log(`📧 Updated email preferences for ${preferences.email}`);
  }

  /**
   * Remove user from email list
   */
  static removeUser(email: string): void {
    this.users = this.users.filter(user => user.email !== email);
    this.saveToStorage();
    console.log(`🗑️ Removed ${email} from daily emails`);
  }

  /**
   * Get all users with email preferences
   */
  static getUsers(): UserEmailPreferences[] {
    return this.users;
  }

  /**
   * Start the email scheduler
   */
  static start(): void {
    if (this.isRunning) {
      console.log('📧 Email scheduler is already running');
      return;
    }

    this.loadFromStorage();
    this.isRunning = true;

    // Check every minute for emails to send
    this.intervalId = setInterval(() => {
      this.checkAndSendEmails();
    }, 60000); // 1 minute

    console.log('🚀 Email scheduler started - checking every minute');
  }

  /**
   * Stop the email scheduler
   */
  static stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('⏹️ Email scheduler stopped');
  }

  /**
   * Check if any emails need to be sent now
   */
  private static async checkAndSendEmails(): Promise<void> {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday

    const usersToEmail = this.users.filter(user => {
      if (!user.enabled) return false;

      // Check if it's the right time
      if (user.time !== currentTime) return false;

      // Check if user already received email today to prevent duplicates
      if (this.hasReceivedEmailToday(user.email)) {
        console.log(`📧 Skipping ${user.email} - already received email today`);
        return false;
      }

      // Check if it's the right day based on frequency
      switch (user.frequency) {
        case 'weekdays':
          return currentDay >= 1 && currentDay <= 5; // Monday to Friday
        case 'weekends':
          return currentDay === 0 || currentDay === 6; // Saturday and Sunday
        case 'daily':
        default:
          return true;
      }
    });

    if (usersToEmail.length > 0) {
      console.log(`📧 Sending daily emails to ${usersToEmail.length} users at ${currentTime}`);
      
      for (const user of usersToEmail) {
        try {
          await DailyEmailService.sendDailyEmail({
            userEmail: user.email,
            userName: user.name,
            cities: user.cities,
            type: 'daily'
          });

          console.log(`✅ Daily email sent to ${user.email}`);
          
          // Add delay between emails to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 2000));
          
        } catch (error) {
          console.error(`❌ Failed to send daily email to ${user.email}:`, error);
        }
      }
    }
  }

  /**
   * Check if user has already received an email today
   */
  private static hasReceivedEmailToday(email: string): boolean {
    try {
      const logs = JSON.parse(localStorage.getItem('climatewatch_email_logs') || '[]');
      const today = new Date().toDateString();
      
      return logs.some((log: any) => 
        log.email === email && 
        log.status === 'sent' && 
        log.type === 'daily' &&
        new Date(log.timestamp).toDateString() === today
      );
    } catch (error) {
      console.error('Error checking daily email status:', error);
      return false;
    }
  }

  /**
   * Save user preferences to localStorage
   */
  private static saveToStorage(): void {
    try {
      localStorage.setItem('emailScheduler_users', JSON.stringify(this.users));
    } catch (error) {
      console.error('Error saving email preferences:', error);
    }
  }

  /**
   * Load user preferences from localStorage
   */
  private static loadFromStorage(): void {
    try {
      const saved = localStorage.getItem('emailScheduler_users');
      if (saved) {
        this.users = JSON.parse(saved);
        console.log(`📧 Loaded ${this.users.length} user email preferences`);
      }
    } catch (error) {
      console.error('Error loading email preferences:', error);
      this.users = [];
    }
  }

  /**
   * Get next scheduled email time for a user
   */
  static getNextEmailTime(userEmail: string): Date | null {
    const user = this.users.find(u => u.email === userEmail);
    if (!user || !user.enabled) return null;

    const now = new Date();
    const [hours, minutes] = user.time.split(':').map(Number);
    
    const nextEmail = new Date();
    nextEmail.setHours(hours, minutes, 0, 0);

    // If the time has passed today, schedule for tomorrow
    if (nextEmail <= now) {
      nextEmail.setDate(nextEmail.getDate() + 1);
    }

    // For weekdays/weekends, find the next valid day
    if (user.frequency !== 'daily') {
      while (!this.isValidDay(nextEmail.getDay(), user.frequency)) {
        nextEmail.setDate(nextEmail.getDate() + 1);
      }
    }

    return nextEmail;
  }

  /**
   * Check if a day is valid for the given frequency
   */
  private static isValidDay(dayOfWeek: number, frequency: string): boolean {
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

  /**
   * Get scheduler status
   */
  static getStatus(): {
    isRunning: boolean;
    userCount: number;
    enabledUsers: number;
    nextEmails: Array<{ email: string; nextTime: Date | null }>;
  } {
    return {
      isRunning: this.isRunning,
      userCount: this.users.length,
      enabledUsers: this.users.filter(u => u.enabled).length,
      nextEmails: this.users.map(user => ({
        email: user.email,
        nextTime: this.getNextEmailTime(user.email)
      }))
    };
  }

  /**
   * Send immediate test email to all enabled users
   */
  static async sendTestEmails(): Promise<void> {
    const enabledUsers = this.users.filter(user => user.enabled);
    
    console.log(`📧 Sending test emails to ${enabledUsers.length} users`);
    
    for (const user of enabledUsers) {
      try {
        await DailyEmailService.sendDailyEmail({
          userEmail: user.email,
          userName: user.name,
          cities: user.cities
        });
        console.log(`✅ Test email sent to ${user.email}`);
      } catch (error) {
        console.error(`❌ Failed to send test email to ${user.email}:`, error);
      }
    }
  }
}

// Auto-start the scheduler when the module is loaded
if (typeof window !== 'undefined') {
  // Start scheduler when page loads
  window.addEventListener('load', () => {
    EmailScheduler.start();
  });

  // Stop scheduler when page unloads
  window.addEventListener('beforeunload', () => {
    EmailScheduler.stop();
  });
}