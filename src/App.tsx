import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import Overview from "./pages/Overview";
import Health from "./pages/Health";
import Profile from "./pages/Profile";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageTransitionContainer, EnhancedPageTransition } from "@/components/ui/enhanced-page-transition";
import Navigation from "./components/Navigation";

const queryClient = new QueryClient();

const RoutesWithTransitions = () => {
  const location = useLocation();
  return (
    <PageTransitionContainer>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<EnhancedPageTransition variant="blur"><LandingPage /></EnhancedPageTransition>} />
        <Route path="/login" element={<EnhancedPageTransition variant="scale"><Login /></EnhancedPageTransition>} />
        <Route 
          path="/overview" 
          element={
            <ProtectedRoute>
              <EnhancedPageTransition variant="slideUp"><Overview /></EnhancedPageTransition>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <EnhancedPageTransition variant="slide"><Dashboard /></EnhancedPageTransition>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/health" 
          element={
            <ProtectedRoute>
              <EnhancedPageTransition variant="rotate"><Health /></EnhancedPageTransition>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/notifications" 
          element={
            <ProtectedRoute>
              <EnhancedPageTransition variant="slide"><Notifications /></EnhancedPageTransition>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <EnhancedPageTransition variant="scale"><Profile /></EnhancedPageTransition>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <EnhancedPageTransition variant="slideUp"><Settings /></EnhancedPageTransition>
            </ProtectedRoute>
          } 
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<EnhancedPageTransition variant="fade"><NotFound /></EnhancedPageTransition>} />
      </Routes>
    </PageTransitionContainer>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-surface">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <main className="relative">
              <RoutesWithTransitions />
            </main>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
