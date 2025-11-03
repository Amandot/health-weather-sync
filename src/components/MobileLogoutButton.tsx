import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import LogoutConfirmDialog from '@/components/LogoutConfirmDialog';

const MobileLogoutButton = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pt-2 border-t border-border/50"
      >
        <Button
          variant="ghost"
          onClick={() => setShowLogoutDialog(true)}
          className="w-full justify-start h-12 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign out
        </Button>
      </motion.div>
      
      <LogoutConfirmDialog 
        open={showLogoutDialog} 
        onOpenChange={setShowLogoutDialog} 
      />
    </>
  );
};

export default MobileLogoutButton;