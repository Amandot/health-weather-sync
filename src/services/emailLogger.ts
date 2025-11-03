export interface EmailLog {
  id: string;
  email: string;
  userName: string;
  timestamp: Date;
  status: 'sent' | 'failed' | 'pending';
  type: 'daily' | 'test' | 'demo';
  cities: string[];
  error?: string;
  emailData?: any;
  deliveryTime?: number; // Time taken to send in milliseconds
}

export class EmailLogger {
  private static readonly STORAGE_KEY = 'climatewatch_email_logs';
  private static readonly MAX_LOGS = 1000; // Keep last 1000 logs

  /**
   * Log an email attempt
   */
  static logEmail(log: Omit<EmailLog, 'id' | 'timestamp'>): string {
    const emailLog: EmailLog = {
      ...log,
      id: this.generateId(),
      timestamp: new Date()
    };

    const logs = this.getLogs();
    logs.unshift(emailLog); // Add to beginning

    // Keep only the most recent logs
    if (logs.length > this.MAX_LOGS) {
      logs.splice(this.MAX_LOGS);
    }

    this.saveLogs(logs);
    
    console.log(`📧 Email logged: ${log.status} - ${log.email} - ${log.type}`);
    return emailLog.id;
  }

  /**
   * Update an existing log entry
   */
  static updateLog(id: string, updates: Partial<EmailLog>): void {
    const logs = this.getLogs();
    const index = logs.findIndex(log => log.id === id);
    
    if (index >= 0) {
      logs[index] = { ...logs[index], ...updates };
      this.saveLogs(logs);
      console.log(`📧 Email log updated: ${id}`);
    }
  }

  /**
   * Get all email logs
   */
  static getLogs(): EmailLog[] {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const logs = JSON.parse(saved);
        // Convert timestamp strings back to Date objects
        return logs.map((log: any) => ({
          ...log,
          timestamp: new Date(log.timestamp)
        }));
      }
    } catch (error) {
      console.error('Error loading email logs:', error);
    }
    return [];
  }

  /**
   * Get logs for a specific user
   */
  static getLogsForUser(email: string): EmailLog[] {
    return this.getLogs().filter(log => log.email === email);
  }

  /**
   * Get logs by status
   */
  static getLogsByStatus(status: EmailLog['status']): EmailLog[] {
    return this.getLogs().filter(log => log.status === status);
  }

  /**
   * Get logs from the last N days
   */
  static getRecentLogs(days: number = 7): EmailLog[] {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return this.getLogs().filter(log => log.timestamp >= cutoffDate);
  }

  /**
   * Get email statistics
   */
  static getStats(days: number = 7): {
    total: number;
    sent: number;
    failed: number;
    pending: number;
    successRate: number;
    dailyBreakdown: Record<string, { sent: number; failed: number; total: number }>;
    userBreakdown: Record<string, { sent: number; failed: number; total: number }>;
  } {
    const logs = this.getRecentLogs(days);
    
    const stats = {
      total: logs.length,
      sent: logs.filter(log => log.status === 'sent').length,
      failed: logs.filter(log => log.status === 'failed').length,
      pending: logs.filter(log => log.status === 'pending').length,
      successRate: 0,
      dailyBreakdown: {} as Record<string, { sent: number; failed: number; total: number }>,
      userBreakdown: {} as Record<string, { sent: number; failed: number; total: number }>
    };

    // Calculate success rate
    if (stats.total > 0) {
      stats.successRate = (stats.sent / (stats.sent + stats.failed)) * 100;
    }

    // Daily breakdown
    logs.forEach(log => {
      const dateKey = log.timestamp.toDateString();
      if (!stats.dailyBreakdown[dateKey]) {
        stats.dailyBreakdown[dateKey] = { sent: 0, failed: 0, total: 0 };
      }
      stats.dailyBreakdown[dateKey].total++;
      if (log.status === 'sent') stats.dailyBreakdown[dateKey].sent++;
      if (log.status === 'failed') stats.dailyBreakdown[dateKey].failed++;
    });

    // User breakdown
    logs.forEach(log => {
      if (!stats.userBreakdown[log.email]) {
        stats.userBreakdown[log.email] = { sent: 0, failed: 0, total: 0 };
      }
      stats.userBreakdown[log.email].total++;
      if (log.status === 'sent') stats.userBreakdown[log.email].sent++;
      if (log.status === 'failed') stats.userBreakdown[log.email].failed++;
    });

    return stats;
  }

  /**
   * Clear all logs
   */
  static clearLogs(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('📧 All email logs cleared');
  }

  /**
   * Clear logs older than specified days
   */
  static clearOldLogs(days: number = 30): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const logs = this.getLogs().filter(log => log.timestamp >= cutoffDate);
    this.saveLogs(logs);
    
    console.log(`📧 Cleared email logs older than ${days} days`);
  }

  /**
   * Export logs as JSON
   */
  static exportLogs(): string {
    return JSON.stringify(this.getLogs(), null, 2);
  }

  /**
   * Get the last email sent for a user
   */
  static getLastEmailForUser(email: string): EmailLog | null {
    const userLogs = this.getLogsForUser(email)
      .filter(log => log.status === 'sent')
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    return userLogs.length > 0 ? userLogs[0] : null;
  }

  /**
   * Check if user has received email today
   */
  static hasReceivedEmailToday(email: string): boolean {
    const today = new Date().toDateString();
    const userLogs = this.getLogsForUser(email);
    
    return userLogs.some(log => 
      log.status === 'sent' && 
      log.timestamp.toDateString() === today
    );
  }

  private static saveLogs(logs: EmailLog[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logs));
    } catch (error) {
      console.error('Error saving email logs:', error);
    }
  }

  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}