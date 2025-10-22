import { motion, AnimatePresence, Variants } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  variant?: "slide" | "fade" | "scale" | "slideUp";
  duration?: number;
}

const variants: Record<string, Variants> = {
  slide: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 }
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  },
  slideUp: {
    initial: { y: "100vh", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100vh", opacity: 0 }
  }
};

export const PageTransition = ({ 
  children, 
  className = "", 
  variant = "fade",
  duration = 0.6
}: PageTransitionProps) => {
  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ 
        duration, 
        ease: [0.16, 1, 0.3, 1] // Smooth cubic-bezier
      }}
    >
      {children}
    </motion.div>
  );
};

// Higher-order component for route transitions
export const withPageTransition = (
  Component: React.ComponentType<any>,
  transitionProps?: Partial<PageTransitionProps>
) => {
  return function WrappedComponent(props: any) {
    return (
      <PageTransition {...transitionProps}>
        <Component {...props} />
      </PageTransition>
    );
  };
};

// Container for handling page transitions with AnimatePresence
export const PageTransitionContainer = ({ children }: { children: ReactNode }) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {children}
    </AnimatePresence>
  );
};