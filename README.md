# 🌍 ClimateWatch - Health & Weather Sync Platform

A comprehensive **Climate & Public Health Monitoring Platform** built with modern React technologies. ClimateWatch monitors real-time weather data and health metrics across Indian cities, providing intelligent insights and automated daily email reports with AI-powered health recommendations.

## 📋 Project Info

**Status**: Production Ready  
**Version**: 1.0.0  
**License**: MIT

## 🎯 Core Features

### 🌡️ **Real-time Climate Monitoring**
- Live weather data for major Indian cities (Mumbai, Delhi, Bengaluru, Chennai, Kolkata, Hyderabad)
- Temperature, humidity, air quality index, and atmospheric pressure tracking
- Interactive 24-hour trend charts and visualizations
- Geographic mapping with city coordinates

### 🚨 **Intelligent Alert System**  
- Automatic heatwave and air quality alerts
- Risk level indicators (Low/Medium/High/Critical)
- Real-time notifications for health concerns
- Customizable alert thresholds and preferences

### 📊 **Dashboard & Analytics**
- Comprehensive overview with key metrics
- Interactive data visualization with Recharts
- Health correlation analysis
- Predictive insights and trend analysis

### 🔐 **Authentication & User Management**
- Firebase Google OAuth integration
- Protected routes and user sessions
- User profile management with preferences
- Secure email notifications system

### 📧 **Intelligent Daily Email System**
- **AI-powered daily reports** with comprehensive health and weather insights
- **Automated scheduling** with flexible delivery options (daily, weekdays, weekends)
- **Professional email templates** with mobile-responsive design
- **Real-time delivery tracking** and comprehensive logging
- **Google Gemini AI integration** for personalized health recommendations
- **Multi-city support** for monitoring multiple Indian cities

### 🎨 **Modern UI/UX**
- **Glass morphism design** with backdrop blur effects
- **Smooth 60fps animations** with Framer Motion
- **Professional navigation** with animated user menu and logout system
- **Mobile-first responsive design** with touch optimization
- **Nature-inspired color palette** with emerald greens and ocean blues
- **Advanced page transitions** with multiple animation variants

## 🏗️ Technology Stack

### **Frontend**
- **React 18** - Modern React with hooks and TypeScript
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### **UI Framework**
- **shadcn/ui** - Beautiful, accessible component library
- **Radix UI** - Low-level UI primitives
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library

### **Backend Services**
- **Firebase Auth** - Google OAuth authentication
- **EmailJS** - Email notification service
- **Google Gemini AI** - Intelligent health insights
- **OpenWeatherMap API** - Real-time weather data
- **Vercel Functions** - Server-side email scheduling
- **React Query** - Server state management

### **Data Visualization**
- **Recharts** - Responsive chart library
- **Interactive Charts** - Climate data visualization
- **Real-time Updates** - Live data monitoring

## 📁 Project Structure

```
health-weather-sync/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── DashboardLayout.tsx     # Main layout wrapper
│   │   ├── ui/                         # shadcn/ui components
│   │   ├── Dashboard.tsx               # Main dashboard
│   │   ├── LandingPage.tsx            # Landing page
│   │   └── [Various UI Components]
│   ├── pages/
│   │   ├── Login.tsx                  # Authentication page
│   │   ├── Overview.tsx               # Overview dashboard
│   │   ├── Health.tsx                 # Health tracking
│   │   ├── Profile.tsx                # User profile
│   │   ├── Notifications.tsx          # Alert management
│   │   └── NotFound.tsx               # 404 page
│   ├── contexts/
│   │   └── AuthContext.tsx            # Authentication context
│   ├── services/
│   │   └── emailService.ts            # Email functionality
│   ├── hooks/
│   │   ├── useWeatherData.ts          # Weather API hooks
│   │   └── use-toast.ts               # Toast notifications
│   └── lib/
│       ├── firebase.ts                # Firebase configuration
│       └── utils.ts                   # Utility functions
├── public/                            # Static assets
├── [Configuration Files]
└── [Documentation Files]
```

## 🔧 Implementation Status

### ✅ **Completed Features**
- [x] **Firebase Authentication** - Google OAuth with beautiful logout system
- [x] **Modern Navigation** - Animated navigation bar with user menu
- [x] **Daily Email System** - AI-powered automated email reports
- [x] **Email Tracking** - Real-time delivery monitoring and logging
- [x] **User Profile** - Complete profile management with preferences
- [x] **Notifications Page** - Email setup, activity tracking, and preferences
- [x] **Modern UI/UX** - Glass morphism design with smooth animations
- [x] **Mobile Optimization** - Perfect responsive design for all devices
- [x] **Production Ready** - Vercel deployment with server-side scheduling

### 🚧 **Future Enhancements**
- [ ] **Advanced Analytics** - Detailed reporting dashboard
- [ ] **Machine Learning** - Predictive health models
- [ ] **Mobile App** - React Native implementation
- [ ] **Multi-language** - Hindi and regional language support

### 🎯 **Navigation Flow**
1. **Landing Page** (`/`) - Introduction and sign-up
2. **Login Page** (`/login`) - Firebase Google authentication
3. **Overview** (`/overview`) - Dashboard home with quick stats
4. **Dashboard** (`/dashboard`) - Detailed climate monitoring
5. **Health** (`/health`) - Health metrics and correlations
6. **Profile** (`/profile`) - User profile and preferences
7. **Notifications** (`/notifications`) - Alert management
8. **Settings** (`/settings`) - System configuration

## 🔧 Setup & Configuration

### 📋 **Environment Variables**

Create a `.env.local` file in your project root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

# EmailJS Configuration  
VITE_EMAILJS_SERVICE_ID=service_your_service_id
VITE_EMAILJS_TEMPLATE_ID=template_your_template_id
VITE_EMAILJS_DAILY_TEMPLATE_ID=template_daily_id
VITE_EMAILJS_PUBLIC_KEY=user_your_public_key

# Google Gemini AI (for intelligent health insights)
VITE_GEMINI_API_KEY=your_gemini_api_key

# OpenWeatherMap API (for real-time weather data)
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

### 🚀 **Development Setup**

```bash
# Clone the repository
git clone https://github.com/yourusername/health-weather-sync.git
cd health-weather-sync

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### 🔥 **Firebase Setup**

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create new project: "ClimateWatch"
   - Enable Google Analytics (optional)

2. **Enable Authentication**
   - Go to Authentication > Sign-in method
   - Enable Google OAuth
   - Add support email
   - Add authorized domains (`localhost` for development)

3. **Get Configuration**
   - Go to Project Settings
   - Add web app
   - Copy configuration to `.env.local`

### 📧 **EmailJS Setup**

1. **Create Account**
   - Go to [EmailJS.com](https://www.emailjs.com/)
   - Create free account

2. **Configure Service**
   - Add email service (Gmail, Outlook, etc.)
   - Create email templates
   - Get Service ID, Template ID, and Public Key

## 🌐 API Integration

### **Current Implementation**
The dashboard currently uses mock data to demonstrate functionality. This allows you to see the complete interface and interactions without requiring API keys.

### **Weather API Integration (Future)**

For live weather data integration:

1. **OpenWeatherMap API**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get free API key (1000 calls/day)
   - Integrate with existing weather hooks

2. **Supabase Edge Functions (Recommended)**
   - Secure API key storage
   - No CORS issues
   - Rate limiting control
   - Centralized error handling

### **Health Data APIs**
- Government health databases
- WHO air quality standards
- Regional health advisories
- Predictive health models

## 🌟 Key Highlights

### 🎆 **Unique Selling Points**
- **Real-time Climate Data** with health correlation analysis
- **AI-powered Predictive Insights** for proactive health protection  
- **Professional Email Notifications** with beautiful templates
- **Responsive Modern UI** with smooth animations
- **Secure Authentication** with Firebase and Google OAuth
- **Indian Cities Focus** with localized weather monitoring

### 👥 **Target Users**
- **Health Professionals** - Monitor environmental health risks
- **Government Agencies** - Public health decision making
- **Researchers** - Climate and health correlation studies
- **General Public** - Personal health and safety awareness

### 🎨 **UI/UX Features**
- **Dashboard Layout** with responsive collapsible sidebar
- **Quick Stats** showing temperature and air quality indicators
- **Page Transitions** with smooth Framer Motion animations
- **Notification Center** with real-time alerts and preferences
- **User Profile Management** with customizable settings

## 📝 Development Guide

### 💻 **Local Development**

Requirements: Node.js 16+ & npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

```bash
# Clone repository
git clone https://github.com/yourusername/health-weather-sync.git
cd health-weather-sync

# Install dependencies
npm install

# Start development server
npm run dev
```

### ⚙️ **Development Options**
- **VS Code** - Recommended IDE with TypeScript support
- **GitHub Codespaces** - Full cloud development environment
- **Local Setup** - Clone and develop on your machine
- **Docker** - Containerized development (coming soon)

## 🛠️ Technical Dependencies

### **Core Technologies**
- **React 18** - Component-based UI framework
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Framer Motion** - Animation and transition library

### **Authentication & Backend**
- **Firebase Auth** - Google OAuth authentication
- **EmailJS** - Client-side email service
- **React Query** - Server state management

### **Data & Visualization**
- **Recharts** - React charting library
- **Lucide React** - Beautiful icon set
- **React Hook Form** - Form validation

## 🚀 Deployment

### **Vercel Deployment (Recommended)**
```bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```

### **Other Deployment Options**
```bash
# Netlify
ntl deploy --prod --dir=dist

# Firebase Hosting
firebase deploy

# GitHub Pages
npm run build && npm run deploy
```

### **Environment Variables**
Make sure to configure environment variables in your deployment platform:
- Firebase configuration
- EmailJS credentials
- API keys (when integrated)

## 📈 Future Roadmap

### **Phase 1: Core Enhancement**
- [ ] Complete Settings page implementation
- [ ] Advanced analytics dashboard
- [ ] Real-time weather API integration
- [ ] Health data correlation engine

### **Phase 2: Advanced Features**
- [ ] Machine learning predictions
- [ ] Mobile app development (React Native)
- [ ] Multi-language support (Hindi, Regional languages)
- [ ] Government data integration

### **Phase 3: Scale & Performance**
- [ ] Real-time data streaming
- [ ] Advanced user roles and permissions
- [ ] API rate limiting and caching
- [ ] Performance optimization

## 📚 Resources & Documentation

- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - Complete project overview and architecture
- [EMAIL_TEMPLATE_FIX_GUIDE.md](./EMAIL_TEMPLATE_FIX_GUIDE.md) - Fix email template issues
- [Component Documentation](./src/components/) - UI component library
- **Built-in Guides** - Visual setup guides within the application

---

## 🎆 **ClimateWatch - Protecting Communities Through Environmental Intelligence**

**Built with ❤️ using modern React technologies**  
**Powered by Firebase, Tailwind CSS, and shadcn/ui**  
**Designed for scalability and performance**

Ready to monitor climate and protect public health? Start with ClimateWatch today! 🌍
