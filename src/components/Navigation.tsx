import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, Sparkles, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "@/components/UserMenu";
import MobileLogoutButton from "@/components/MobileLogoutButton";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { scrollY } = useScroll();
  
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const blur = useTransform(scrollY, [0, 100], [8, 20]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/", icon: "🏠" },
    { name: "Dashboard", href: "/dashboard", icon: "🌍" },
    { name: "Health", href: "/health", icon: "🏥" },
    { name: "Notifications", href: "/notifications", icon: "📧" },
    { name: "Profile", href: "/profile", icon: "👤" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.nav 
      variants={navVariants}
      initial="hidden"
      animate="visible"
      style={{ 
        backdropFilter: `blur(${blur}px)`,
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-black/95 shadow-lg border-b border-border/50' 
          : 'bg-white/80 dark:bg-black/80'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Globe className="h-8 w-8 text-primary transition-all duration-300 group-hover:rotate-12" />
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="h-3 w-3 text-accent" />
                </motion.div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold gradient-text">
                  ClimateWatch
                </span>
                <span className="text-xs text-muted-foreground -mt-1">
                  Environmental Intelligence
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link to={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className={`relative group transition-all duration-300 ${
                      isActive(item.href) 
                        ? 'bg-gradient-primary text-white shadow-glow' 
                        : 'hover:bg-muted/80'
                    }`}
                  >
                    <span className="mr-2 text-sm">{item.icon}</span>
                    {item.name}
                    {isActive(item.href) && (
                      <motion.div
                        className="absolute -bottom-1 left-1/2 w-1 h-1 bg-white rounded-full"
                        layoutId="navbar-dot"
                        initial={{ x: "-50%" }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {user && (
              <>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </Button>
                </motion.div>
                
                <UserMenu />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-border/50 mt-4 pt-4"
            >
              <div className="grid grid-cols-2 gap-2 pb-4">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={item.href} onClick={() => setIsOpen(false)}>
                      <Button
                        variant={isActive(item.href) ? "default" : "ghost"}
                        className={`w-full justify-start h-12 ${
                          isActive(item.href) 
                            ? 'bg-gradient-primary text-white' 
                            : ''
                        }`}
                      >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        {item.name}
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {user && <MobileLogoutButton />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;