import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  Bell,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const UserProfileDropdown = () => {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // Check if Firebase is configured
  const isDemo = import.meta.env.VITE_FIREBASE_API_KEY === undefined || 
                 import.meta.env.VITE_FIREBASE_API_KEY === "demo-api-key";

  // Show demo button in demo mode
  if (isDemo) {
    return (
      <Button 
        variant="outline" 
        className="h-12 px-4 bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100"
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium">Demo Mode</span>
        </div>
      </Button>
    );
  }
  
  if (!user) return null;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="ghost" 
            className="relative h-12 w-auto px-4 bg-card/50 backdrop-blur border hover:bg-card/80 transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {getInitials(user.displayName || user.email || 'User')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium truncate max-w-32">
                  {user.displayName || 'User'}
                </span>
                <span className="text-xs text-muted-foreground truncate max-w-32">
                  {user.email}
                </span>
              </div>
              
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
            
            {/* Online indicator */}
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background">
              <div className="h-full w-full bg-green-400 rounded-full animate-pulse" />
            </div>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-64 p-2 bg-card/95 backdrop-blur border shadow-2xl" 
        align="end"
      >
        {/* User Info Header */}
        <DropdownMenuLabel className="p-3 bg-primary/5 rounded-lg mb-2">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
              <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                {getInitials(user.displayName || user.email || 'User')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <p className="font-semibold text-sm truncate">
                  {user.displayName || 'User'}
                </p>
                <Sparkles className="h-3 w-3 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        <DropdownMenuItem className="p-3 cursor-pointer hover:bg-primary/5 transition-colors">
          <User className="mr-3 h-4 w-4 text-primary" />
          <div className="flex-1">
            <div className="font-medium">View Profile</div>
            <div className="text-xs text-muted-foreground">Manage your account</div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="p-3 cursor-pointer hover:bg-primary/5 transition-colors">
          <Settings className="mr-3 h-4 w-4 text-primary" />
          <div className="flex-1">
            <div className="font-medium">Settings</div>
            <div className="text-xs text-muted-foreground">Preferences & configuration</div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="p-3 cursor-pointer hover:bg-primary/5 transition-colors">
          <Bell className="mr-3 h-4 w-4 text-primary" />
          <div className="flex-1">
            <div className="font-medium">Notifications</div>
            <div className="text-xs text-muted-foreground">Manage alerts</div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="p-3 cursor-pointer hover:bg-primary/5 transition-colors">
          <Shield className="mr-3 h-4 w-4 text-primary" />
          <div className="flex-1">
            <div className="font-medium">Privacy</div>
            <div className="text-xs text-muted-foreground">Security settings</div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout Button */}
        <DropdownMenuItem 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="p-3 cursor-pointer hover:bg-destructive/5 text-destructive hover:text-destructive transition-colors"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <div className="flex-1">
            <div className="font-medium">
              {isLoggingOut ? 'Signing out...' : 'Sign Out'}
            </div>
            <div className="text-xs opacity-70">
              {isLoggingOut ? 'Please wait' : 'Return to login page'}
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};