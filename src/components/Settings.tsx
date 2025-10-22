import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  MapPin, 
  Thermometer,
  Droplets,
  Wind,
  AlertTriangle,
  Globe,
  Save
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const [thresholds, setThresholds] = useState({
    temperature: [30],
    humidity: [80],
    airQuality: [100],
  });

  const [locations, setLocations] = useState([
    { id: 1, name: "New York", lat: 40.7128, lng: -74.0060, active: true },
    { id: 2, name: "Los Angeles", lat: 34.0522, lng: -118.2437, active: true },
    { id: 3, name: "Chicago", lat: 41.8781, lng: -87.6298, active: false },
  ]);

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleNotificationChange = (type: string, enabled: boolean) => {
    setNotifications(prev => ({ ...prev, [type]: enabled }));
  };

  const handleThresholdChange = (type: string, value: number[]) => {
    setThresholds(prev => ({ ...prev, [type]: value }));
  };

  const toggleLocation = (id: number) => {
    setLocations(prev => 
      prev.map(loc => 
        loc.id === id ? { ...loc, active: !loc.active } : loc
      )
    );
  };

  return (
    <div className="bg-background">
      {/* Header */}
      <header className="border-b bg-gradient-subtle backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-xl hover-scale">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-text bg-clip-text text-transparent">Settings</h1>
              <p className="text-muted-foreground">
                Configure your monitoring preferences and alert thresholds
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="notifications" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="thresholds">Alert Thresholds</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>
                  Choose how you want to receive alerts and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts and reports via email
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                  />
                </div>

                <Separator />

                {/* SMS Notifications */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-base">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get critical alerts via text message
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                  />
                </div>

                <Separator />

                {/* Push Notifications */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-base">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Browser and mobile push notifications
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                  />
                </div>

                {/* Email Settings */}
                {notifications.email && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <Label className="text-base">Email Settings</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email" className="text-sm">Email Address</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="your@email.com"
                            defaultValue="user@example.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="frequency" className="text-sm">Report Frequency</Label>
                          <Select defaultValue="daily">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="realtime">Real-time</SelectItem>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="thresholds" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Alert Thresholds</span>
                </CardTitle>
                <CardDescription>
                  Set custom thresholds for environmental alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Temperature Threshold */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-4 w-4 text-alert-danger" />
                    <Label className="text-base">Temperature Alert (°C)</Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Slider
                      value={thresholds.temperature}
                      onValueChange={(value) => handleThresholdChange('temperature', value)}
                      max={50}
                      min={0}
                      step={1}
                      className="flex-1"
                    />
                    <span className="min-w-16 text-sm font-medium">
                      {thresholds.temperature[0]}°C
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Alert when temperature exceeds this value
                  </p>
                </div>

                <Separator />

                {/* Humidity Threshold */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-accent" />
                    <Label className="text-base">Humidity Alert (%)</Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Slider
                      value={thresholds.humidity}
                      onValueChange={(value) => handleThresholdChange('humidity', value)}
                      max={100}
                      min={0}
                      step={5}
                      className="flex-1"
                    />
                    <span className="min-w-16 text-sm font-medium">
                      {thresholds.humidity[0]}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Alert when humidity exceeds this percentage
                  </p>
                </div>

                <Separator />

                {/* Air Quality Threshold */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Wind className="h-4 w-4 text-alert-warning" />
                    <Label className="text-base">Air Quality Index Alert</Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Slider
                      value={thresholds.airQuality}
                      onValueChange={(value) => handleThresholdChange('airQuality', value)}
                      max={300}
                      min={0}
                      step={10}
                      className="flex-1"
                    />
                    <span className="min-w-16 text-sm font-medium">
                      {thresholds.airQuality[0]} AQI
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Alert when air quality index exceeds this value
                  </p>
                </div>

                {/* Threshold Summary */}
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Current Alert Thresholds:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>Temperature: ≥{thresholds.temperature[0]}°C</div>
                    <div>Humidity: ≥{thresholds.humidity[0]}%</div>
                    <div>Air Quality: ≥{thresholds.airQuality[0]} AQI</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Monitoring Locations</span>
                </CardTitle>
                <CardDescription>
                  Manage the cities and regions you want to monitor
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New Location */}
                <div className="p-4 border border-dashed border-muted-foreground/25 rounded-lg">
                  <h4 className="font-medium mb-3">Add New Location</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input placeholder="City name" />
                    <Input placeholder="Latitude" type="number" />
                    <Input placeholder="Longitude" type="number" />
                  </div>
                  <Button className="mt-3">Add Location</Button>
                </div>

                {/* Current Locations */}
                <div className="space-y-4">
                  <h4 className="font-medium">Current Locations</h4>
                  {locations.map((location) => (
                    <div key={location.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{location.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                          </div>
                        </div>
                      </div>
                      <Switch
                        checked={location.active}
                        onCheckedChange={() => toggleLocation(location.id)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Save All Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;