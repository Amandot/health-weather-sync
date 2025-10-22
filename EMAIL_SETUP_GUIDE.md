# 📧 Email Notification Setup Guide

Your ClimateWatch application now includes a comprehensive email notification system that sends welcome emails when users login. Here's how to set it up!

## 🚀 **What's Already Implemented:**

✅ **EmailJS Integration**: Professional email service for sending emails from client-side  
✅ **Welcome Email System**: Automatic emails sent when users login  
✅ **Beautiful Email Templates**: Professional-looking HTML emails with ClimateWatch branding  
✅ **Error Handling**: Graceful fallbacks and proper error management  
✅ **Demo Mode**: Works without configuration for testing  

## 📋 **Current Features:**

### 📬 **Welcome Emails Include:**
- **Personal Greeting** with user's name and photo
- **Login Confirmation** with timestamp and security info
- **Platform Overview** highlighting key features
- **Call-to-Action** to explore the dashboard
- **Professional Branding** with ClimateWatch logo and styling

### 🔧 **Email Types Supported:**
1. **Welcome Emails** - Sent on successful login
2. **Alert Emails** - Climate/health alerts (ready for future use)
3. **Custom Emails** - Flexible system for any notifications

## 🛠️ **Setup Instructions:**

### Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click **"Sign Up"** and create a free account
3. Verify your email address

### Step 2: Set Up Email Service

1. **Add Email Service:**
   - In EmailJS dashboard, click **"Email Services"**
   - Click **"Add New Service"**
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
   - **Note down the Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. **Create Template:**
   - Click **"Email Templates"**
   - Click **"Create New Template"**
   - Use this HTML template:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ClimateWatch</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2563eb 0%, #16a34a 100%); padding: 40px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🌍 ClimateWatch</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Climate & Health Monitoring Platform</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Welcome, {{to_name}}! 🎉</h2>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                Thank you for joining ClimateWatch! We're excited to have you as part of our community working towards better climate awareness and public health protection.
            </p>
            
            <!-- Login Info -->
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #374151; margin-bottom: 15px;">🔐 Login Confirmation</h3>
                <p style="color: #6b7280; margin: 5px 0;"><strong>Email:</strong> {{user_email}}</p>
                <p style="color: #6b7280; margin: 5px 0;"><strong>Login Time:</strong> {{login_time}}</p>
                <p style="color: #6b7280; margin: 5px 0;"><strong>Status:</strong> Secure connection verified ✅</p>
            </div>
            
            <!-- Features -->
            <h3 style="color: #1f2937;">🌟 What you can do with ClimateWatch:</h3>
            <ul style="color: #4b5563; line-height: 1.8;">
                <li>🌡️ Monitor real-time climate data from cities worldwide</li>
                <li>❤️ Track health impacts and correlations</li>
                <li>🤖 Get AI-powered predictive insights</li>
                <li>🚨 Receive smart alerts for critical conditions</li>
            </ul>
            
            <!-- CTA Button -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://your-domain.com/dashboard" style="background-color: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    Open Your Dashboard 🚀
                </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                If you have any questions, feel free to reply to this email. We're here to help!
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f3f4f6; padding: 30px; text-align: center; color: #6b7280; font-size: 14px;">
            <p style="margin: 0;"><strong>ClimateWatch Team</strong></p>
            <p style="margin: 5px 0;">Protecting communities through environmental intelligence</p>
            <p style="margin: 15px 0 0 0; font-size: 12px; opacity: 0.8;">
                This email was sent because you signed in to ClimateWatch. If this wasn't you, please contact support immediately.
            </p>
        </div>
    </div>
</body>
</html>
```

2. **Template Variables:**
   - `{{to_name}}` - User's display name
   - `{{to_email}}` - User's email address  
   - `{{user_email}}` - User's email (for confirmation)
   - `{{login_time}}` - Login timestamp
   - `{{from_name}}` - ClimateWatch Team

3. **Save the template** and note the **Template ID**

### Step 4: Get Public Key

1. Go to **"Account"** in EmailJS dashboard
2. Find your **Public Key** (starts with `user_`)
3. Copy this key

### Step 5: Update Environment Variables

Update your `.env.local` file with the real values:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_your_service_id
VITE_EMAILJS_TEMPLATE_ID=template_your_template_id  
VITE_EMAILJS_PUBLIC_KEY=user_your_public_key
```

### Step 6: Test the Setup

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Test the email system:**
   - Go to `http://localhost:8080/login`
   - Sign in with Google
   - Check your email inbox
   - You should receive a welcome email!

## 🎯 **Email Flow:**

1. **User Signs In** with Google → Firebase Authentication
2. **Login Success** → AuthContext triggers email sending
3. **Email Service** → Formats user data and sends via EmailJS  
4. **User Receives** → Beautiful welcome email in their inbox
5. **Success Toast** → "Welcome Email Sent! 📬" appears in app

## 🎨 **Email Design Features:**

- **📱 Mobile Responsive** - Looks great on all devices
- **🎨 Professional Design** - ClimateWatch branding and colors
- **🔐 Security Info** - Login confirmation with timestamp
- **🚀 Call-to-Action** - Direct link back to dashboard
- **✨ Rich Content** - Feature highlights and welcome message

## 🔧 **Customization Options:**

### Email Templates:
- **Welcome Template** - User login emails
- **Alert Template** - Climate/health notifications  
- **Custom Template** - Flexible messaging system

### Available Functions:
```javascript
// Send welcome email
EmailService.sendWelcomeEmail({
  userEmail: 'user@example.com',
  userName: 'John Doe', 
  loginTime: 'Friday, Sept 27, 2024 at 2:30 PM',
  userPhoto: 'https://avatar-url.jpg'
});

// Send alert email  
EmailService.sendAlertEmail({
  userEmail: 'user@example.com',
  userName: 'John Doe',
  alertType: 'Heat Wave Alert',
  alertMessage: 'High temperature detected in your area',
  alertTime: 'Friday, Sept 27, 2024 at 3:45 PM'
});

// Send custom email
EmailService.sendCustomEmail(
  'user@example.com',
  'Custom Subject',
  'Your custom message here',
  'User Name'
);
```

## 🐛 **Troubleshooting:**

### Common Issues:

**"EmailJS is not configured"** 
- Check environment variables are set correctly
- Restart development server after changing `.env.local`

**"Failed to send email"**
- Verify EmailJS service ID, template ID, and public key
- Check EmailJS dashboard for quota limits
- Ensure email service is properly connected

**"Template not found"**
- Double-check template ID matches exactly
- Ensure template is published in EmailJS dashboard

**"Blocked by spam filters"**
- Use professional "from" addresses
- Avoid spam trigger words in templates
- Keep email content relevant and personal

## 📊 **Email Analytics:**

EmailJS provides analytics in their dashboard:
- **Delivery Status** - Success/failure rates
- **Usage Limits** - Monthly quota tracking  
- **Error Logs** - Detailed debugging information

## 🚀 **Next Steps:**

1. **Set up real EmailJS account** (takes 5 minutes)
2. **Test with your email** to see the beautiful welcome emails
3. **Customize templates** to match your branding
4. **Add more email types** for alerts and notifications

## 💡 **Pro Tips:**

- **Free Tier**: EmailJS offers 200 emails/month for free
- **Custom Domain**: Use your own domain for professional emails
- **Template Testing**: Use EmailJS test feature before going live
- **User Preferences**: Consider adding email preference settings

---

**🎉 Ready to send beautiful welcome emails?** Set up your EmailJS account and watch your users receive professional welcome messages every time they login to ClimateWatch!