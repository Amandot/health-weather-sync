import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Globe, Shield, TrendingUp, AlertTriangle, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/climate-hero.jpg";

const LandingPage = () => {
  const features = [
    {
      icon: Globe,
      title: "Real-time Climate Data",
      description: "Monitor temperature, humidity, air quality, and weather patterns from multiple locations globally.",
    },
    {
      icon: Activity,
      title: "Health Monitoring",
      description: "Track disease outbreaks, health indicators, and correlate with environmental factors.",
    },
    {
      icon: AlertTriangle,
      title: "Intelligent Alerts",
      description: "AI-powered predictions and early warning system for climate and health risks.",
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Machine learning models for heatwave and disease outbreak risk assessment.",
    },
    {
      icon: Shield,
      title: "Public Health Protection",
      description: "Comprehensive monitoring tools to protect communities from environmental health threats.",
    },
    {
      icon: Users,
      title: "Multi-location Support",
      description: "Monitor and manage multiple cities and regions from a single unified dashboard.",
    },
  ];

  return (
    <div className="bg-background">{/* Navigation removed - now handled globally */}

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">{/* Increased height since no nav */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-float">
              Climate & Public Health
              <span className="block text-accent-foreground">Monitoring Platform</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Real-time environmental monitoring, predictive analytics, and early warning systems 
              to protect communities from climate-related health risks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="text-lg px-8 py-6 shadow-glow">
                  View Live Dashboard
                </Button>
              </Link>
              <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-earth">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive Environmental Monitoring
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced technology stack combining real-time data ingestion, machine learning predictions, 
              and intuitive visualizations for actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-medium hover:shadow-strong transition-all duration-300 border-0 bg-card/80 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Monitoring Today
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join organizations worldwide using ClimateWatch to protect their communities 
              from environmental health threats.
            </p>
            <Link to="/dashboard">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Access Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Globe className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">ClimateWatch</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 ClimateWatch. Protecting communities through environmental intelligence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;