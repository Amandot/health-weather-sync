import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Shield, AlertTriangle } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface LogoutConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LogoutConfirmDialog = ({ open, onOpenChange }: LogoutConfirmDialogProps) => {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      await logout();
      
      // Close dialog
      onOpenChange(false);
      
      // Show success message
      toast({
        title: "👋 Goodbye!",
        description: "You've been successfully signed out. Thanks for using ClimateWatch!",
      });
      
      // Navigate to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1000);
      
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Failed",
        description: "There was an error signing you out. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-3"
          >
            <div className="p-3 bg-orange-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg font-semibold">
                Sign out of ClimateWatch?
              </AlertDialogTitle>
            </div>
          </motion.div>
        </AlertDialogHeader>
        
        <AlertDialogDescription className="text-base leading-relaxed">
          <div className="space-y-3">
            <p>
              Are you sure you want to sign out? You'll need to sign in again to access your 
              personalized dashboard and email notifications.
            </p>
            
            {user && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg"
              >
                <Shield className="h-4 w-4 text-primary" />
                <div className="text-sm">
                  <p className="font-medium">{user.displayName || 'User'}</p>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </motion.div>
            )}
          </div>
        </AlertDialogDescription>
        
        <AlertDialogFooter className="flex space-x-2">
          <AlertDialogCancel 
            disabled={isLoggingOut}
            className="flex-1"
          >
            Cancel
          </AlertDialogCancel>
          
          <AlertDialogAction
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoggingOut ? (
              <div className="flex items-center space-x-2">
                <LoadingSpinner size="sm" />
                <span>Signing out...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </div>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutConfirmDialog;