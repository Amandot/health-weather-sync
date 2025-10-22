import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type AlertLevel = "low" | "medium" | "high" | "critical";

interface Alert {
  id: string;
  message: string;
  level: AlertLevel;
  type: "heatwave" | "air-quality" | "humidity" | "system";
  timestamp: Date;
}

interface AlertBannerProps {
  alerts: Alert[];
}

export const AlertBanner = ({ alerts }: AlertBannerProps) => {
  const getAlertIcon = (level: AlertLevel) => {
    switch (level) {
      case "critical": return XCircle;
      case "high": return AlertTriangle;
      case "medium": return Info;
      case "low": return CheckCircle;
    }
  };

  const getAlertVariant = (level: AlertLevel): "default" | "secondary" | "destructive" | "outline" => {
    switch (level) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
    }
  };

  const getAlertColor = (level: AlertLevel) => {
    switch (level) {
      case "critical": return "text-alert-danger";
      case "high": return "text-alert-danger";
      case "medium": return "text-alert-warning";
      case "low": return "text-alert-success";
    }
  };

  if (alerts.length === 0) {
    return (
      <Card className="border-alert-success/20 bg-gradient-subtle">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-alert-success" />
            <span className="text-sm text-muted-foreground">All systems normal - No active alerts</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const highestAlert = alerts.reduce((prev, current) => {
    const levels = { low: 1, medium: 2, high: 3, critical: 4 };
    return levels[current.level] > levels[prev.level] ? current : prev;
  });

  return (
    <Card className={`border-alert-danger/20 bg-gradient-alert/10 ${
      highestAlert.level === "critical" ? "animate-pulse" : ""
    }`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-alert-danger" />
          <span>Active Alerts ({alerts.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => {
            const Icon = getAlertIcon(alert.level);
            return (
              <div key={alert.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1">
                  <Icon className={`h-4 w-4 ${getAlertColor(alert.level)}`} />
                  <span className="text-sm">{alert.message}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getAlertVariant(alert.level)}>
                    {alert.level.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {alert.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};