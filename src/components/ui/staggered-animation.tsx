import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface StaggeredAnimationProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  variant?: "fadeInUp" | "fadeInScale" | "slideInLeft" | "slideInRight";
  duration?: number;
}

const itemVariants: Record<string, Variants> = {
  fadeInUp: {
    hidden: { 
      y: 40, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1 
    }
  },
  fadeInScale: {
    hidden: { 
      scale: 0.8, 
      opacity: 0 
    },
    visible: { 
      scale: 1, 
      opacity: 1 
    }
  },
  slideInLeft: {
    hidden: { 
      x: -50, 
      opacity: 0 
    },
    visible: { 
      x: 0, 
      opacity: 1 
    }
  },
  slideInRight: {
    hidden: { 
      x: 50, 
      opacity: 0 
    },
    visible: { 
      x: 0, 
      opacity: 1 
    }
  }
};

export const StaggeredAnimation = ({ 
  children, 
  className = "",
  staggerDelay = 0.1,
  variant = "fadeInUp",
  duration = 0.6
}: StaggeredAnimationProps) => {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={itemVariants[variant]}
          transition={{ 
            duration, 
            ease: [0.16, 1, 0.3, 1] 
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Hook for manual stagger control
export const useStaggeredAnimation = (delay = 0.1) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.1,
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return { container, item };
};