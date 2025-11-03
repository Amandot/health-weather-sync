import { motion } from "framer-motion";
import { Loader2, Globe, Sparkles } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "dots" | "pulse" | "orbit" | "climate";
  className?: string;
  text?: string;
}

export const LoadingSpinner = ({ 
  size = "md", 
  variant = "default", 
  className = "",
  text 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg"
  };

  if (variant === "dots") {
    return (
      <div className={`flex items-center space-x-1 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`bg-primary rounded-full ${size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : "w-3 h-3"}`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
        {text && (
          <span className={`ml-2 text-muted-foreground ${textSizes[size]}`}>
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={`flex flex-col items-center space-y-2 ${className}`}>
        <motion.div
          className={`bg-gradient-primary rounded-full ${sizeClasses[size]}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {text && (
          <span className={`text-muted-foreground ${textSizes[size]}`}>
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === "orbit") {
    return (
      <div className={`flex flex-col items-center space-y-3 ${className}`}>
        <div className="relative">
          <motion.div
            className={`border-2 border-primary/20 rounded-full ${sizeClasses[size]}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-0 left-0 w-2 h-2 bg-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${size === "sm" ? "8px" : size === "md" ? "12px" : size === "lg" ? "16px" : "24px"} ${size === "sm" ? "8px" : size === "md" ? "12px" : size === "lg" ? "16px" : "24px"}` }}
          />
        </div>
        {text && (
          <span className={`text-muted-foreground ${textSizes[size]}`}>
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === "climate") {
    return (
      <div className={`flex flex-col items-center space-y-3 ${className}`}>
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Globe className={`text-primary ${sizeClasses[size]}`} />
          </motion.div>
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-3 h-3 text-accent" />
          </motion.div>
        </div>
        {text && (
          <span className={`text-muted-foreground ${textSizes[size]} text-center max-w-xs`}>
            {text}
          </span>
        )}
      </div>
    );
  }

  // Default spinner
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Loader2 className={`animate-spin text-primary ${sizeClasses[size]}`} />
      {text && (
        <span className={`text-muted-foreground ${textSizes[size]}`}>
          {text}
        </span>
      )}
    </div>
  );
};

// Full page loading component
export const PageLoader = ({ text = "Loading ClimateWatch..." }: { text?: string }) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner variant="climate" size="xl" text={text} />
      </div>
    </div>
  );
};

// Inline loading component
export const InlineLoader = ({ 
  text = "Loading...", 
  variant = "default",
  size = "sm" 
}: { 
  text?: string; 
  variant?: LoadingSpinnerProps["variant"];
  size?: LoadingSpinnerProps["size"];
}) => {
  return (
    <div className="flex items-center justify-center py-4">
      <LoadingSpinner variant={variant} size={size} text={text} />
    </div>
  );
};