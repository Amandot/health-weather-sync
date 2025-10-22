import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { toast } from '@/components/ui/use-toast';
import { EmailService, formatLoginTime, getUserLocation } from '@/services/emailService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    // Check if we're using demo configuration
    const isDemo = import.meta.env.VITE_FIREBASE_API_KEY === undefined || import.meta.env.VITE_FIREBASE_API_KEY === "demo-api-key";
    
    if (isDemo) {
      toast({
        title: "Demo Mode 🚧",
        description: "Firebase is not configured. Please set up your Firebase project to enable authentication.",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      
      if (credential) {
        toast({
          title: "Welcome to ClimateWatch! 🌍",
          description: `Successfully signed in as ${result.user.displayName}`,
        });

        // Send welcome email
        try {
          const welcomeEmailSent = await EmailService.sendWelcomeEmail({
            userEmail: result.user.email || '',
            userName: result.user.displayName || 'User',
            loginTime: formatLoginTime(),
            userPhoto: result.user.photoURL || ''
          });

          if (welcomeEmailSent) {
            // Show success toast for email sent
            setTimeout(() => {
              toast({
                title: "Welcome Email Sent! 📬",
                description: `A welcome email has been sent to ${result.user.email}`,
              });
            }, 2000);
          }
        } catch (emailError) {
          console.error('Failed to send welcome email:', emailError);
          // Don't show error to user for email failures
        }
      }
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      
      let errorMessage = "Failed to sign in with Google. Please try again.";
      
      if (error.code === 'auth/configuration-not-found') {
        errorMessage = "Firebase configuration is incomplete. Please check your environment variables.";
      } else if (error.code === 'auth/unauthorized-domain') {
        errorMessage = "This domain is not authorized. Please add it to Firebase Console.";
      }
      
      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};