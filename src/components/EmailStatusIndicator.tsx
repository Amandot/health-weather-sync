import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { EmailLogger } from '@/services/emailLogger';
import { 
  CheckCircle, 
  XCircle, 
  Clock,
  Mail,
  AlertTriangle
} from 'lucide-react';

interface EmailStatusIndicatorProps {
  userEmail: string;
  className?: string;
}

const EmailStatusIndicator: React.FC<EmailStatusIndicatorProps> = ({ userEmail, className = '' }) => {
  const [lastEmail, setLastEmail] = useState(EmailLogger.getLastEmailForUser(userEmail));
  const [hasEmailToday, setHasEmailToday] = useState(EmailLogger.hasReceivedEmailToday(userEmail));

  // Update status every 30 seconds
  useEffect(() => {
    const updateStatus = () => {
      setLastEmail(EmailLogger.getLastEmailForUser(userEmail));
      setHasEmailToday(EmailLogger.hasReceivedEmailToday(userEmail));
    };

    const interval = setInterval(updateStatus, 30000);
    return () => clearInterval(interval);
  }, [userEmail]);

  const getStatusInfo = () => {
    if (!lastEmail) {
      return {
        icon: <Mail className="h-3 w-3" />,
        text: 'No emails sent',
        variant: 'outline' as const,
        color: 'text-muted-foreground'
      };
    }

    if (hasEmailToday) {
      return {
        icon: <CheckCircle className="h-3 w-3" />,
        text: 'Email sent today',
        variant: 'secondary' as const,
        color: 'bg-green-100 text-green-800'
      };
    }

    const daysSinceLastEmail = Math.floor(
      (Date.now() - lastEmail.timestamp.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastEmail === 0) {
      return {
        icon: <CheckCircle className="h-3 w-3" />,
        text: 'Sent today',
        variant: 'secondary' as const,
        color: 'bg-green-100 text-green-800'
      };
    } else if (daysSinceLastEmail === 1) {
      return {
        icon: <Clock className="h-3 w-3" />,
        text: 'Sent yesterday',
        variant: 'secondary' as const,
        color: 'bg-yellow-100 text-yellow-800'
      };
    } else if (daysSinceLastEmail <= 7) {
      return {
        icon: <AlertTriangle className="h-3 w-3" />,
        text: `${daysSinceLastEmail} days ago`,
        variant: 'secondary' as const,
        color: 'bg-orange-100 text-orange-800'
      };
    } else {
      return {
        icon: <XCircle className="h-3 w-3" />,
        text: `${daysSinceLastEmail} days ago`,
        variant: 'destructive' as const,
        color: 'text-red-800'
      };
    }
  };

  const status = getStatusInfo();

  return (
    <Badge 
      variant={status.variant} 
      className={`flex items-center space-x-1 ${status.color} ${className}`}
    >
      {status.icon}
      <span className="text-xs">{status.text}</span>
    </Badge>
  );
};

export default EmailStatusIndicator;