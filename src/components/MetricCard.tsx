import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "stable";
  severity?: "normal" | "warning" | "critical";
}

export const MetricCard = ({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  description, 
  trend,
  severity = "normal" 
}: MetricCardProps) => {
  const getSeverityColor = () => {
    switch (severity) {
      case "warning": return "text-alert-warning";
      case "critical": return "text-alert-danger";
      default: return "text-primary";
    }
  };

  const getTrendIcon = () => {
    if (trend === "up") return "↗️";
    if (trend === "down") return "↘️";
    return "→";
  };

  return (
    <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${getSeverityColor()}`}>
          {value}
          {unit && <span className="text-sm ml-1">{unit}</span>}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            {trend && <span>{getTrendIcon()}</span>}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};