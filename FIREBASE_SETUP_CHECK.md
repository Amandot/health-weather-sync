# 🔥 Firebase Setup Verification for ClimateWatch

Your Firebase configuration has been added! Now let's make sure everything is set up correctly.

## ✅ **Configuration Added**

Your Firebase project details:
- **Project ID**: climatewatch-e81b3
- **Auth Domain**: climatewatch-e81b3.firebaseapp.com
- **App ID**: 1:565616126915:web:6b6b395aee073f30ab2b76

## 🚀 **Next Steps to Complete Setup**

### Step 1: Enable Google Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your **ClimateWatch** project
3. Click **Authentication** in the left sidebar
4. Click **Get started** (if first time)
5. Go to **Sign-in method** tab
6. Find **Google** in the providers list
7. Click the **Google** row
8. Toggle **Enable** to ON
9. Add your **support email** (your Gmail address)
10. Click **Save**

### Step 2: Add Authorized Domains

1. Still in Authentication > Settings
2. Scroll to **Authorized domains**
3. You should see `localhost` already listed
4. If not, click **Add domain** and add:
   - `localhost`
   - `127.0.0.1`

### Step 3: Test Your Setup

1. **Restart your development server**:
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

2. **Open your browser** to `http://localhost:8080`

3. **Test the flow**:
   - Click "Sign In" or "Get Started" on the landing page
   - You should see the login page WITHOUT the demo banner
   - Click "Continue with Google"
   - A Google sign-in popup should appear
   - Sign in with your Google account
   - You should be redirected to the dashboard with a welcome message

## 🎯 **What Should Happen**

✅ **Landing Page**: Sign In/Get Started buttons for guests  
✅ **Login Page**: No demo banner, working Google button  
✅ **Authentication**: Google popup sign-in works  
✅ **Dashboard**: Protected route, requires login  
✅ **User Profile**: Shows your name, avatar, and dropdown menu  
✅ **Logout**: Works and redirects to landing page  

## 🐛 **Troubleshooting**

### If you see "Demo Mode" still:
- Make sure you restarted the development server
- Check that `.env.local` has the correct values
- Verify no spaces or extra characters in the env file

### If Google sign-in doesn't work:
1. **Check Firebase Console** > Authentication > Sign-in method
2. **Ensure Google is enabled** and has a support email
3. **Check browser console** for specific error messages
4. **Try incognito mode** to rule out browser cache issues

### Common Error Messages:

**"Firebase: Error (auth/configuration-not-found)"**
- Environment variables not loaded properly
- Restart development server

**"Firebase: Error (auth/unauthorized-domain)"** 
- Add `localhost` to Authorized domains in Firebase Console

**"Firebase: Error (auth/popup-blocked)"**
- Allow popups in your browser
- Try incognito mode

## 🎉 **Success Indicators**

When everything is working correctly, you should see:

1. **Console message**: "Firebase initialized successfully"
2. **No demo warnings** in browser console
3. **Working Google sign-in** popup
4. **User profile dropdown** with your Google account info
5. **Protected routes** requiring authentication
6. **Smooth redirects** between login and dashboard

## 📞 **Need Help?**

If you encounter any issues:

1. **Check browser console** for error messages
2. **Verify Firebase Console** settings match the instructions
3. **Ensure development server** was restarted after env changes
4. **Try different browsers** or incognito mode

---

**Ready to test?** Restart your development server and visit `http://localhost:8080`! 🚀