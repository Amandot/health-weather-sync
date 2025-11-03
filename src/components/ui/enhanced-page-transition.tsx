import { motion, AnimatePresence, Variants } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "slideUp" | "scale" | "rotate" | "blur";
  className?: string;
}

const pageVariants: Record<string, Variants> = {
  fade: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    }
  },
  slide: {
    initial: { opacity: 0, x: 100 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.175, 0.885, 0.32, 1.275],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    }
  },
  slideUp: {
    initial: { opacity: 0, y: 60 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.175, 0.885, 0.32, 1.275],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -60,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.175, 0.885, 0.32, 1.275],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 1.1,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    }
  },
  rotate: {
    initial: { opacity: 0, rotate: -10, scale: 0.9 },
    animate: { 
      opacity: 1, 
      rotate: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.175, 0.885, 0.32, 1.275],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      rotate: 10, 
      scale: 0.9,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    }
  },
  blur: {
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.6, 
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      filter: "blur(10px)",
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    }
  }
};

const childVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  }
};

export const EnhancedPageTransition = ({ 
  children, 
  variant = "fade", 
  className = "" 
}: PageTransitionProps) => {
  return (
    <motion.div
      variants={pageVariants[variant]}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`min-h-screen pt-20 pb-8 ${className}`}
    >
      <motion.div
        variants={childVariants}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export const PageTransitionContainer = ({ children }: { children: ReactNode }) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {children}
    </AnimatePresence>
  );
};

// Staggered animation wrapper for lists and grids
export const StaggerContainer = ({ 
  children, 
  className = "",
  staggerDelay = 0.1 
}: { 
  children: ReactNode; 
  className?: string;
  staggerDelay?: number;
}) => {
  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Individual stagger item
export const StaggerItem = ({ 
  children, 
  className = "",
  delay = 0 
}: { 
  children: ReactNode; 
  className?: string;
  delay?: number;
}) => {
  const itemVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.4, 0, 0.2, 1],
        delay 
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Floating animation for decorative elements
export const FloatingElement = ({ 
  children, 
  className = "",
  duration = 6,
  amplitude = 10 
}: { 
  children: ReactNode; 
  className?: string;
  duration?: number;
  amplitude?: number;
}) => {
  return (
    <motion.div
      animate={{
        y: [-amplitude, amplitude, -amplitude],
        rotate: [-2, 2, -2]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Magnetic hover effect
export const MagneticElement = ({ 
  children, 
  className = "",
  strength = 0.3 
}: { 
  children: ReactNode; 
  className?: string;
  strength?: number;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1 + strength * 0.1 }}
      whileTap={{ scale: 1 - strength * 0.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};