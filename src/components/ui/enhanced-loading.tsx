import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent";
  className?: string;
}

export const LoadingSpinner = ({ 
  size = "md", 
  color = "primary", 
  className 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const colorClasses = {
    primary: "border-primary",
    secondary: "border-secondary",
    accent: "border-accent"
  };

  return (
    <motion.div
      className={cn(
        "rounded-full border-2 border-t-transparent animate-spin",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

interface ShimmerLoadingProps {
  className?: string;
  height?: string;
  width?: string;
}

export const ShimmerLoading = ({ 
  className, 
  height = "h-4", 
  width = "w-full" 
}: ShimmerLoadingProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded bg-muted",
        height,
        width,
        className
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
};

interface SkeletonCardProps {
  className?: string;
  showHeader?: boolean;
  lines?: number;
}

export const SkeletonCard = ({ 
  className, 
  showHeader = true, 
  lines = 3 
}: SkeletonCardProps) => {
  return (
    <motion.div
      className={cn("p-6 border rounded-lg bg-card", className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {showHeader && (
        <div className="space-y-2 mb-4">
          <ShimmerLoading height="h-6" width="w-3/4" />
          <ShimmerLoading height="h-4" width="w-1/2" />
        </div>
      )}
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <ShimmerLoading 
            key={i} 
            height="h-4" 
            width={i === lines - 1 ? "w-2/3" : "w-full"} 
          />
        ))}
      </div>
    </motion.div>
  );
};

interface PulseLoaderProps {
  count?: number;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent";
  className?: string;
}

export const PulseLoader = ({ 
  count = 3, 
  size = "md", 
  color = "primary",
  className 
}: PulseLoaderProps) => {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4"
  };

  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent"
  };

  return (
    <div className={cn("flex space-x-1", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            "rounded-full",
            sizeClasses[size],
            colorClasses[color]
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
  className?: string;
}

export const LoadingOverlay = ({ 
  isLoading, 
  children, 
  message = "Loading...",
  className 
}: LoadingOverlayProps) => {
  return (
    <div className={cn("relative", className)}>
      {children}
      {isLoading && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <LoadingSpinner size="lg" />
          {message && (
            <motion.p
              className="mt-4 text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {message}
            </motion.p>
          )}
        </motion.div>
      )}
    </div>
  );
};