import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StaggerContainer, StaggerItem, MagneticElement } from '@/components/ui/enhanced-page-transition';
import { 
  MousePointer2, 
  Mail, 
  ToggleLeft,
  Clock,
  Send,
  CheckCircle,
  ArrowDown,
  Zap,
  Sparkles,
  Target,
  Rocket
} from 'lucide-react';

const EmailClickGuide = () => {
  const steps = [
    {
      number: 1,
      icon: Zap,
      title: "Test the System",
      description: "Scroll down and find the Daily Email Demo card (blue dashed border)",
      action: "Click the Send Demo Email button",
      tip: "Check your email inbox - you should receive a sample email in 1-2 minutes",
      color: "blue",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      number: 2,
      icon: ToggleLeft,
      title: "Enable Daily Emails",
      description: "Find the Daily Health & Weather Email card",
      action: "Click the toggle switch next to Enable Daily Email Reports",
      tip: "The switch will turn green and show Active badge",
      color: "emerald",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      number: 3,
      icon: Clock,
      title: "Set Your Time",
      description: "In the Schedule Settings section",
      action: "Click the time field and select when you want emails (e.g., 08:00)",
      tip: "Choose Daily, Weekdays Only, or Weekends Only",
      color: "purple",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      number: 4,
      icon: Send,
      title: "Final Test",
      description: "In the Test Email section at the bottom",
      action: "Click Send Test Email button",
      tip: "You should receive an email immediately with your configured settings",
      color: "orange",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const features = [
    { icon: Mail, text: "Daily emails at your chosen time" },
    { icon: CheckCircle, text: "Weather data for your cities" },
    { icon: CheckCircle, text: "AI-powered health insights" },
    { icon: CheckCircle, text: "Air quality and UV protection tips" }
  ];

  const quickRef = [
    { color: "blue", text: "Send Demo Email - Test system" },
    { color: "emerald", text: "Toggle Switch - Enable daily emails" },
    { color: "purple", text: "Time Field - Set delivery time" },
    { color: "orange", text: "Send Test Email - Final verification" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-emerald-50/30 border-2 border-dashed border-emerald-200/60 shadow-xl">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{ 
              rotate: [360, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-xl"
          />
        </div>

        <CardHeader className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <MagneticElement>
                <div className="relative">
                  <MousePointer2 className="h-7 w-7 text-emerald-600" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles className="h-4 w-4 text-blue-500" />
                  </motion.div>
                </div>
              </MagneticElement>
              <span className="gradient-text">📧 How to Receive Emails</span>
              <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-0 shadow-lg">
                <Target className="h-3 w-3 mr-1" />
                Follow These Steps
              </Badge>
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Click on these buttons in order to start receiving daily health and weather emails
            </CardDescription>
          </motion.div>
        </CardHeader>
        
        <CardContent className="relative space-y-6">
          <StaggerContainer className="space-y-6">
            {/* Steps */}
            {steps.map((step, index) => (
              <StaggerItem key={step.number}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border-2 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    step.color === 'blue' ? 'border-blue-200/60' :
                    step.color === 'emerald' ? 'border-emerald-200/60' :
                    step.color === 'purple' ? 'border-purple-200/60' :
                    'border-orange-200/60'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />
                  <div className="relative p-6">
                    <div className="flex items-start space-x-4">
                      <MagneticElement>
                        <div className={`flex items-center justify-center w-12 h-12 text-white rounded-full font-bold text-lg shadow-lg ${
                          step.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                          step.color === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                          step.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                          'bg-gradient-to-r from-orange-500 to-red-500'
                        }`}>
                          {step.number}
                        </div>
                      </MagneticElement>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <step.icon className={`h-5 w-5 ${
                            step.color === 'blue' ? 'text-blue-600' :
                            step.color === 'emerald' ? 'text-emerald-600' :
                            step.color === 'purple' ? 'text-purple-600' :
                            'text-orange-600'
                          }`} />
                          <h3 className={`font-bold text-lg ${
                            step.color === 'blue' ? 'text-blue-900' :
                            step.color === 'emerald' ? 'text-emerald-900' :
                            step.color === 'purple' ? 'text-purple-900' :
                            'text-orange-900'
                          }`}>
                            {step.title}
                          </h3>
                        </div>
                        <p className={`mb-3 leading-relaxed ${
                          step.color === 'blue' ? 'text-blue-800' :
                          step.color === 'emerald' ? 'text-emerald-800' :
                          step.color === 'purple' ? 'text-purple-800' :
                          'text-orange-800'
                        }`}>
                          {step.description}
                        </p>
                        <div className="flex items-center space-x-2 mb-3">
                          <MousePointer2 className={`h-4 w-4 ${
                            step.color === 'blue' ? 'text-blue-600' :
                            step.color === 'emerald' ? 'text-emerald-600' :
                            step.color === 'purple' ? 'text-purple-600' :
                            'text-orange-600'
                          }`} />
                          <span className={`font-semibold ${
                            step.color === 'blue' ? 'text-blue-900' :
                            step.color === 'emerald' ? 'text-emerald-900' :
                            step.color === 'purple' ? 'text-purple-900' :
                            'text-orange-900'
                          }`}>
                            👆 {step.action}
                          </span>
                        </div>
                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${
                          step.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                          step.color === 'emerald' ? 'bg-emerald-50 border-emerald-200' :
                          step.color === 'purple' ? 'bg-purple-50 border-purple-200' :
                          'bg-orange-50 border-orange-200'
                        }`}>
                          <CheckCircle className={`h-3 w-3 ${
                            step.color === 'blue' ? 'text-blue-600' :
                            step.color === 'emerald' ? 'text-emerald-600' :
                            step.color === 'purple' ? 'text-purple-600' :
                            'text-orange-600'
                          }`} />
                          <span className={`text-xs font-medium ${
                            step.color === 'blue' ? 'text-blue-700' :
                            step.color === 'emerald' ? 'text-emerald-700' :
                            step.color === 'purple' ? 'text-purple-700' :
                            'text-orange-700'
                          }`}>
                            {step.tip}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {index < steps.length - 1 && (
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex justify-center"
                  >
                    <ArrowDown className="h-6 w-6 text-muted-foreground/60" />
                  </motion.div>
                )}
              </StaggerItem>
            ))}

            {/* Success Step */}
            <StaggerItem>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 border-2 border-emerald-300/60 shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 via-blue-100/20 to-purple-100/20" />
                <div className="relative p-6">
                  <div className="flex items-start space-x-4">
                    <MagneticElement>
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full font-bold text-lg shadow-lg">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                    </MagneticElement>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Rocket className="h-6 w-6 text-emerald-600" />
                        <h3 className="font-bold text-xl text-emerald-900">
                          You're All Set! 🎉
                        </h3>
                      </div>
                      <p className="text-emerald-800 mb-4 text-lg leading-relaxed">
                        You'll now receive daily health and weather emails automatically at your scheduled time
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="flex items-center space-x-3 p-2 bg-white/60 rounded-lg"
                          >
                            <feature.icon className="h-4 w-4 text-emerald-600" />
                            <span className="text-sm font-medium text-emerald-700">
                              {feature.text}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Quick Reference */}
            <StaggerItem>
              <div className="p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl border border-blue-200/60 shadow-lg">
                <h4 className="font-bold text-lg mb-4 flex items-center space-x-2 text-blue-900">
                  <MousePointer2 className="h-5 w-5" />
                  <span>Quick Reference - What to Click:</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {quickRef.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center space-x-3 p-3 bg-white/70 rounded-lg hover:bg-white/90 transition-all duration-200"
                    >
                      <div className={`w-3 h-3 rounded-full shadow-sm ${
                        item.color === 'blue' ? 'bg-blue-500' :
                        item.color === 'emerald' ? 'bg-emerald-500' :
                        item.color === 'purple' ? 'bg-purple-500' :
                        'bg-orange-500'
                      }`} />
                      <span className="text-sm font-medium text-gray-700">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </StaggerItem>

            {/* Monitoring Notice */}
            <StaggerItem>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200/60 rounded-xl shadow-md"
              >
                <h4 className="font-semibold text-yellow-900 mb-2 flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>📊 Monitor Your Emails:</span>
                </h4>
                <p className="text-sm text-yellow-800 leading-relaxed">
                  After setup, check the <strong>"Email Activity"</strong> tab to see delivery status, 
                  and the <strong>"Debug Panel"</strong> to monitor real-time scheduler information.
                </p>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmailClickGuide;