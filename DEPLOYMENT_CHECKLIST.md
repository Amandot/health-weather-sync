# 🚀 PWA Deployment Checklist

## Pre-Deployment

- [ ] Replace placeholder icons in `/public/icons/` with actual PNG files
  - Use https://www.pwabuilder.com/imageGenerator
  - Or create 192x192 and 512x512 PNG files manually
  
- [ ] Test locally with `npm run dev` or `npm run preview`
  - Open http://localhost:5173/test-pwa.html
  - Check all tests pass
  
- [ ] Run Lighthouse audit in Chrome DevTools
  - Open DevTools (F12)
  - Go to Lighthouse tab
  - Run PWA audit
  - Aim for 100% score

## Deployment Steps

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Build your app**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Note your deployment URL**
   - Example: `https://your-app.vercel.app`

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build and deploy**
   ```bash
   npm run build
   netlify deploy --prod
   ```

### Option 3: GitHub Pages / Other

- Follow your hosting provider's deployment guide
- Ensure the `dist` folder is deployed
- Verify HTTPS is enabled

## Post-Deployment Testing

- [ ] Visit your deployed URL
- [ ] Open Chrome DevTools Console
  - Check for Service Worker registration message
  - Look for any errors
  
- [ ] Test install prompt
  - Look for install icon in address bar (Chrome/Edge)
  - Click to install
  - Verify app opens in standalone mode
  
- [ ] Test on mobile
  - Open site on mobile browser
  - Tap "Add to Home Screen"
  - Open installed app
  - Verify it looks like a native app
  
- [ ] Test offline functionality
  - Open app
  - Turn off internet/enable airplane mode
  - Navigate around
  - Should show offline page for new pages
  - Should load cached pages

## PWABuilder Steps

1. **Go to PWABuilder**
   - Visit https://www.pwabuilder.com/

2. **Enter your URL**
   - Paste your deployed URL (e.g., `https://your-app.vercel.app`)
   - Click "Start"

3. **Review PWA Score**
   - Should see high scores for:
     - Manifest
     - Service Worker
     - Security (HTTPS)
   - Fix any issues if score is low

4. **Generate App Packages**
   - Click "Package For Stores"
   - Select platforms:
     - ✅ Android (Google Play)
     - ✅ iOS (App Store)
     - ✅ Windows (Microsoft Store)
   
5. **Download Packages**
   - Android: APK or AAB file
   - iOS: Follow instructions for App Store
   - Windows: MSIX package

6. **Publish to Stores**
   - **Google Play**: Upload AAB to Play Console
   - **Apple App Store**: Follow Apple's guidelines
   - **Microsoft Store**: Upload MSIX package

## Common Issues & Fixes

### Service Worker Not Registering
- ✅ Ensure you're on HTTPS (or localhost)
- ✅ Check browser console for errors
- ✅ Clear cache and hard reload (Ctrl+Shift+R)

### Install Prompt Not Showing
- ✅ Must be on HTTPS
- ✅ Visit site at least twice
- ✅ Wait 5 minutes between visits
- ✅ Engage with the site (click around)

### Icons Not Loading
- ✅ Verify PNG files exist in `/public/icons/`
- ✅ Check file names match manifest exactly
- ✅ Ensure icons are proper PNG format (not SVG)

### Low PWA Score
- ✅ Check all manifest fields are filled
- ✅ Verify service worker is registered
- ✅ Ensure HTTPS is enabled
- ✅ Add proper icons (192x192 and 512x512)

## Your Deployment URL

After deploying, your URL will be something like:
- Vercel: `https://climatewatch-[random].vercel.app`
- Netlify: `https://climatewatch-[random].netlify.app`

**Paste this URL into PWABuilder to generate your mobile app packages!**

## Resources

- [PWABuilder](https://www.pwabuilder.com/)
- [Vercel Deployment](https://vercel.com/docs)
- [Netlify Deployment](https://docs.netlify.com/)
- [Google Play Console](https://play.google.com/console)
- [Apple App Store Connect](https://appstoreconnect.apple.com/)

---

**Ready to deploy?** Follow the steps above and you'll have your mobile app ready in no time! 🎉
