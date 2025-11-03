import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  User, 
  Settings, 
  LogOut, 
  Mail, 
  Activity,
  Shield,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoutConfirmDialog from '@/components/LogoutConfirmDialog';

const UserMenu = () => {
  const { user } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  if (!user) return null;

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const menuItems = [
    {
      icon: User,
      label: 'Profile',
      href: '/profile',
      description: 'Manage your account'
    },
    {
      icon: Mail,
      label: 'Notifications',
      href: '/notifications',
      description: 'Email preferences'
    },
    {
      icon: Activity,
      label: 'Dashboard',
      href: '/dashboard',
      description: 'Climate monitoring'
    },
    {
      icon: Settings,
      label: 'Settings',
      href: '/settings',
      description: 'App configuration'
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-auto px-3 rounded-full hover:bg-muted/80 transition-all duration-300"
        >
          <div className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Avatar className="h-8 w-8 ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                <AvatarFallback className="bg-gradient-primary text-white text-sm font-semibold">
                  {getInitials(user.displayName || user.email || 'User')}
                </AvatarFallback>
              </Avatar>
              
              {/* Online indicator */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
              />
            </motion.div>
            
            <div className="hidden md:flex flex-col items-start min-w-0">
              <span className="text-sm font-medium truncate max-w-32">
                {user.displayName || 'User'}
              </span>
              <span className="text-xs text-muted-foreground truncate max-w-32">
                {user.email}
              </span>
            </div>
            
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-80 p-2 z-50 bg-white border shadow-lg" 
        align="end" 
        sideOffset={8}
      >
        {/* User Info Header */}
        <DropdownMenuLabel className="p-0">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg mb-2"
          >
            <Avatar className="h-12 w-12 ring-2 ring-primary/20">
              <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
              <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                {getInitials(user.displayName || user.email || 'User')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-sm truncate">
                  {user.displayName || 'User'}
                </h4>
                <Shield className="h-3 w-3 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>
          </motion.div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <DropdownMenuItem asChild>
                <Link 
                  to={item.href}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/80 transition-all duration-200 cursor-pointer"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </Link>
              </DropdownMenuItem>
            </motion.div>
          ))}
        </div>

        <DropdownMenuSeparator />

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              onClick={() => setShowLogoutDialog(true)}
              className="w-full justify-start p-3 h-auto hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <div className="flex items-center space-x-3 w-full">
                <div className="p-2 bg-red-100 rounded-lg">
                  <LogOut className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">Sign out</p>
                  <p className="text-xs text-muted-foreground">End your session</p>
                </div>
              </div>
            </Button>
          </DropdownMenuItem>
        </motion.div>

        {/* Footer */}
        <div className="mt-2 p-2 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            <span>ClimateWatch v1.0</span>
          </div>
        </div>
      </DropdownMenuContent>
      
      {/* Logout Confirmation Dialog */}
      <LogoutConfirmDialog 
        open={showLogoutDialog} 
        onOpenChange={setShowLogoutDialog} 
      />
    </DropdownMenu>
  );
};

export default UserMenu;